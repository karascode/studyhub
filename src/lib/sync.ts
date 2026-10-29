import { useSyncExternalStore } from 'react'
import { db, type Activity, type Attempt, type CardState, type NoteState, type OrgDoc } from './db'

/**
 * Local-first sync. IndexedDB stays the source of truth (so the app works offline); this module
 * pushes local changes to the cloud and merges remote ones back in.
 *
 *  - attempts: append-only, matched by `uid`
 *  - cards / note state / written notes: last write wins by the `updated` stamp
 *  - activity (streak days): the larger count wins
 *  - pull cursor is the server's `synced_at`, so a device that was offline never misses rows
 */

export interface Remote {
  userId: string
  upsert(table: string, rows: Record<string, unknown>[], onConflict: string): Promise<void>
  /** rows whose server timestamp is >= since, oldest first */
  pull(table: string, since: string | null, limit: number): Promise<Record<string, any>[]>
}

type Row = Record<string, any>
const BATCH = 200
const PAGE = 1000

/* ------------------------------------------------------------------ status */
export type SyncStatus = 'idle' | 'syncing' | 'error' | 'offline'
export interface SyncState {
  status: SyncStatus
  last: number | null
  error?: string
}
let state: SyncState = { status: 'idle', last: null }
const listeners = new Set<() => void>()
const setState = (s: Partial<SyncState>) => {
  state = { ...state, ...s }
  listeners.forEach((l) => l())
}
export const useSyncState = () => useSyncExternalStore((cb) => (listeners.add(cb), () => listeners.delete(cb)), () => state)

/* ------------------------------------------------------------------ table maps */
interface TableSpec {
  remote: string
  conflict: string
  /** local rows changed since `cursor`, as remote rows */
  changed(cursor: number): Promise<{ rows: Row[]; max: number }>
  /** merge one remote row into the local database */
  apply(r: Row): Promise<void>
}

const maxOf = (xs: number[], base: number) => xs.reduce((m, x) => (x > m ? x : m), base)

const specs = (uid: string): TableSpec[] => [
  {
    remote: 'attempts',
    conflict: 'user_id,uid',
    async changed(cursor) {
      const rows = await db.attempts.where('ts').aboveOrEqual(cursor).toArray()
      return { rows: rows.map((a) => ({ user_id: uid, uid: a.uid, qid: a.qid, subject: a.subject, topic: a.topic, score: a.score, max: a.max, ts: a.ts })), max: maxOf(rows.map((a) => a.ts), cursor) }
    },
    async apply(r) {
      if (await db.attempts.where('uid').equals(r.uid).first()) return
      const a: Attempt = { uid: r.uid, qid: r.qid, subject: r.subject, topic: r.topic, score: r.score, max: r.max, ts: Number(r.ts) }
      await db.attempts.add(a)
    },
  },
  {
    remote: 'cards',
    conflict: 'user_id,id',
    async changed(cursor) {
      const rows = await db.cards.where('updated').aboveOrEqual(cursor).toArray()
      return { rows: rows.map((c) => ({ user_id: uid, id: c.id, subject: c.subject, topic: c.topic, ease: c.ease, interval: c.interval, reps: c.reps, lapses: c.lapses, due: c.due, updated: c.updated })), max: maxOf(rows.map((c) => c.updated), cursor) }
    },
    async apply(r) {
      const cur = await db.cards.get(r.id)
      if (cur && cur.updated >= Number(r.updated)) return
      const c: CardState = { id: r.id, subject: r.subject, topic: r.topic, ease: r.ease, interval: r.interval, reps: r.reps, lapses: r.lapses, due: Number(r.due), updated: Number(r.updated) }
      await db.cards.put(c)
    },
  },
  {
    remote: 'note_state',
    conflict: 'user_id,key',
    async changed(cursor) {
      const rows = await db.noteState.where('updated').aboveOrEqual(cursor).toArray()
      return { rows: rows.map((n) => ({ user_id: uid, key: n.key, subject: n.subject, status: n.status ?? null, bookmarked: n.bookmarked ?? null, last_opened: n.lastOpened ?? null, updated: n.updated })), max: maxOf(rows.map((n) => n.updated), cursor) }
    },
    async apply(r) {
      const cur = await db.noteState.get(r.key)
      if (cur && cur.updated >= Number(r.updated)) return
      const n: NoteState = { key: r.key, subject: r.subject, status: r.status ?? undefined, bookmarked: r.bookmarked ?? undefined, lastOpened: r.last_opened == null ? undefined : Number(r.last_opened), updated: Number(r.updated) }
      await db.noteState.put(n)
    },
  },
  {
    remote: 'activity',
    conflict: 'user_id,day',
    async changed(cursor) {
      const rows = await db.activity.where('updated').aboveOrEqual(cursor).toArray()
      return { rows: rows.map((a) => ({ user_id: uid, day: a.day, count: a.count, updated: a.updated })), max: maxOf(rows.map((a) => a.updated), cursor) }
    },
    async apply(r) {
      const cur = await db.activity.get(r.day)
      if (cur && cur.count >= r.count) return
      const a: Activity = { day: r.day, count: r.count, updated: Number(r.updated) }
      await db.activity.put(a)
    },
  },
  {
    remote: 'docs',
    conflict: 'user_id,uid',
    async changed(cursor) {
      // uploaded files stay on the device; only written notes (and their deletions) sync
      const rows = (await db.docs.where('updated').aboveOrEqual(cursor).toArray()).filter((d) => d.kind === 'text')
      return { rows: rows.map((d) => ({ user_id: uid, uid: d.uid, subject: d.subject, topic: d.topic, title: d.title, body: d.text ?? '', tags: d.tags, created: d.created, updated: d.updated, deleted: !!d.deleted })), max: maxOf(rows.map((d) => d.updated), cursor) }
    },
    async apply(r) {
      const cur = await db.docs.where('uid').equals(r.uid).first()
      if (cur && cur.updated >= Number(r.updated)) return
      const d: OrgDoc = { uid: r.uid, subject: r.subject, topic: r.topic ?? '', title: r.title, kind: 'text', text: r.body ?? '', tags: r.tags ?? [], created: Number(r.created), updated: Number(r.updated), deleted: !!r.deleted }
      if (cur?.id != null) await db.docs.put({ ...d, id: cur.id })
      else await db.docs.add(d)
    },
  },
]

/* ------------------------------------------------------------------ push / pull */
const getMeta = async <T extends string | number>(key: string, fallback: T): Promise<T> => ((await db.meta.get(key))?.value as T) ?? fallback
const setMeta = (key: string, value: string | number) => db.meta.put({ key, value })

let applying = false

export async function push(remote: Remote) {
  for (const t of specs(remote.userId)) {
    const cursor = await getMeta<number>(`push:${t.remote}`, 0)
    const { rows, max } = await t.changed(cursor)
    for (let i = 0; i < rows.length; i += BATCH) await remote.upsert(t.remote, rows.slice(i, i + BATCH), t.conflict)
    if (rows.length) await setMeta(`push:${t.remote}`, max)
  }
}

export async function pull(remote: Remote) {
  for (const t of specs(remote.userId)) {
    let since = (await getMeta<string>(`pull:${t.remote}`, '')) || null
    for (;;) {
      const rows = await remote.pull(t.remote, since, PAGE)
      if (rows.length) {
        applying = true
        try {
          for (const r of rows) await t.apply(r)
        } finally {
          applying = false
        }
      }
      const newest = rows.reduce<string | null>((m, r) => (r.synced_at && (!m || r.synced_at > m) ? r.synced_at : m), since)
      // `since` is inclusive, so a page boundary that splits equal timestamps loses nothing
      if (rows.length < PAGE || newest === since) {
        if (newest) await setMeta(`pull:${t.remote}`, newest)
        break
      }
      since = newest
    }
  }
}

/* ------------------------------------------------------------------ orchestration */
let makeRemote: (() => Promise<Remote>) | null = null
let timer: ReturnType<typeof setTimeout> | undefined
let running = false
let again = false
let hooked = false

export async function syncNow(): Promise<void> {
  if (!makeRemote) return
  if (running) {
    again = true
    return
  }
  running = true
  setState({ status: 'syncing', error: undefined })
  try {
    const remote = await makeRemote()
    await pull(remote) // merge first so older local copies never overwrite newer remote ones
    await push(remote)
    setState({ status: 'idle', last: Date.now() })
  } catch (e) {
    setState({ status: navigator.onLine ? 'error' : 'offline', error: (e as Error)?.message ?? String(e) })
  } finally {
    running = false
    if (again) {
      again = false
      queueSync()
    }
  }
}

export function queueSync(delay = 2500) {
  if (!makeRemote) return
  clearTimeout(timer)
  timer = setTimeout(syncNow, delay)
}

/** Begin syncing for the signed-in user. Safe to call more than once. */
export function startSync(factory: () => Promise<Remote>) {
  makeRemote = factory
  if (!hooked) {
    hooked = true
    // any local write schedules a push; writes made by the sync itself are ignored
    const onWrite = () => {
      if (!applying) queueSync()
    }
    for (const t of [db.attempts, db.cards, db.noteState, db.docs, db.activity]) {
      t.hook('creating', onWrite)
      t.hook('updating', onWrite)
      t.hook('deleting', onWrite)
    }
    window.addEventListener('online', () => queueSync(300))
    document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && queueSync(500))
  }
  void syncNow()
}

export function stopSync() {
  makeRemote = null
  clearTimeout(timer)
}
