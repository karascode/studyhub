import Dexie, { type Table } from 'dexie'
import { activeDbName } from './identity'

export const newUid = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`

export interface Attempt {
  id?: number
  /** globally unique, lets devices recognise the same attempt */
  uid: string
  qid: string
  subject: string
  topic: string
  score: number
  max: number
  ts: number
}
export interface CardState {
  id: string // flashcard id
  subject: string
  topic: string
  ease: number
  interval: number // days
  reps: number
  lapses: number
  due: number // epoch ms
  /** last local change (epoch ms); the newest change wins when merging devices */
  updated: number
}
export interface NoteState {
  key: string // subject/slug
  subject: string
  status?: 'learning' | 'confident'
  bookmarked?: boolean
  lastOpened?: number
  updated: number
}
export interface OrgDoc {
  id?: number
  uid: string
  subject: string
  topic: string // '' = general
  title: string
  kind: 'text' | 'file'
  text?: string
  file?: Blob
  mime?: string
  fileName?: string
  size?: number
  tags: string[]
  created: number
  updated: number
  /** soft delete so the deletion can sync to other devices */
  deleted?: boolean
}
export interface Activity {
  day: string // yyyy-mm-dd
  count: number
  updated: number
}
export interface Meta {
  key: string
  value: string | number
}

class StudyDB extends Dexie {
  attempts!: Table<Attempt, number>
  cards!: Table<CardState, string>
  noteState!: Table<NoteState, string>
  docs!: Table<OrgDoc, number>
  activity!: Table<Activity, string>
  meta!: Table<Meta, string>

  constructor() {
    super(activeDbName())
    this.version(1).stores({
      attempts: '++id, qid, subject, topic, ts',
      cards: 'id, subject, topic, due',
      noteState: 'key, subject, status, bookmarked, lastOpened',
      docs: '++id, subject, topic, updated',
      activity: 'day',
    })
    this.version(2)
      .stores({
        attempts: '++id, uid, qid, subject, topic, ts',
        cards: 'id, subject, topic, due, updated',
        noteState: 'key, subject, status, bookmarked, lastOpened, updated',
        docs: '++id, uid, subject, topic, updated',
        activity: 'day, updated',
        meta: 'key',
      })
      .upgrade(async (tx) => {
        const now = Date.now()
        await tx.table('attempts').toCollection().modify((a: Attempt) => {
          a.uid ??= newUid()
        })
        await tx.table('cards').toCollection().modify((c: CardState) => {
          c.updated ??= now
        })
        await tx.table('noteState').toCollection().modify((n: NoteState) => {
          n.updated ??= n.lastOpened ?? now
        })
        await tx.table('docs').toCollection().modify((d: OrgDoc) => {
          d.uid ??= newUid()
        })
        await tx.table('activity').toCollection().modify((a: Activity) => {
          a.updated ??= now
        })
      })
  }
}

export const db = new StudyDB()

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export async function logActivity(n = 1) {
  const day = dayKey()
  const cur = await db.activity.get(day)
  await db.activity.put({ day, count: (cur?.count ?? 0) + n, updated: Date.now() })
}

export function streakFrom(days: Set<string>): number {
  let streak = 0
  const d = new Date()
  // allow today to be empty without breaking the streak
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1)
  while (days.has(dayKey(d))) {
    streak++
    d.setDate(d.getDate() - 1)
  }
  return streak
}

/** Organizer items that have not been deleted. */
export const liveDocs = () => db.docs.filter((d) => !d.deleted)

/* ---------- backup ---------- */
const blobToB64 = (b: Blob) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(String(r.result))
    r.onerror = rej
    r.readAsDataURL(b)
  })

export async function exportAll(): Promise<string> {
  const docs = await Promise.all(
    (await db.docs.toArray()).map(async (d) => ({ ...d, file: d.file ? await blobToB64(d.file) : undefined })),
  )
  return JSON.stringify({
    app: 'studyhub',
    version: 2,
    exported: new Date().toISOString(),
    attempts: await db.attempts.toArray(),
    cards: await db.cards.toArray(),
    noteState: await db.noteState.toArray(),
    activity: await db.activity.toArray(),
    docs,
  })
}

/** Fill in sync fields for data that predates them (older backups, the pre-account database). */
function backfill(data: { attempts?: Attempt[]; cards?: CardState[]; noteState?: NoteState[]; activity?: Activity[]; docs?: OrgDoc[] }) {
  const now = Date.now()
  for (const a of data.attempts ?? []) {
    a.uid ??= newUid()
    delete a.id
  }
  for (const c of data.cards ?? []) c.updated ??= now
  for (const n of data.noteState ?? []) n.updated ??= n.lastOpened ?? now
  for (const a of data.activity ?? []) a.updated ??= now
  for (const d of data.docs ?? []) {
    d.uid ??= newUid()
    delete d.id
  }
}

export async function importAll(json: string) {
  const data = JSON.parse(json)
  if (data.app !== 'studyhub') throw new Error('Not a StudyHub backup file')
  const docs: OrgDoc[] = await Promise.all(
    (data.docs ?? []).map(async (d: OrgDoc & { file?: string }) => ({
      ...d,
      file: d.file ? await (await fetch(d.file)).blob() : undefined,
    })),
  )
  const payload = { ...data, docs }
  backfill(payload)
  await db.transaction('rw', [db.attempts, db.cards, db.noteState, db.docs, db.activity], async () => {
    await Promise.all([db.attempts.clear(), db.cards.clear(), db.noteState.clear(), db.docs.clear(), db.activity.clear()])
    await db.attempts.bulkAdd(payload.attempts ?? [])
    await db.cards.bulkAdd(payload.cards ?? [])
    await db.noteState.bulkAdd(payload.noteState ?? [])
    await db.activity.bulkAdd(payload.activity ?? [])
    await db.docs.bulkAdd(payload.docs)
  })
  await resetPushCursors()
}

/** Forget what has been pushed, so every local record is sent again on the next sync. */
export async function resetPushCursors() {
  await db.meta.where('key').startsWith('push:').delete()
}

export async function resetAll() {
  await Promise.all([db.attempts.clear(), db.cards.clear(), db.noteState.clear(), db.docs.clear(), db.activity.clear(), db.meta.clear()])
}

/* ---------- progress from before accounts existed ---------- */
const LEGACY = 'studyhub'

/** How many study records the old on-device database holds (0 if none, or if it is the active one). */
export async function legacyCount(): Promise<number> {
  if (activeDbName() === LEGACY) return 0
  try {
    if (!(await Dexie.exists(LEGACY))) return 0
    const old = new Dexie(LEGACY)
    await old.open()
    const n = (await old.table('attempts').count()) + (await old.table('cards').count()) + (await old.table('docs').count())
    old.close()
    return n
  } catch {
    return 0
  }
}

/** Copy the old database into the active one (existing newer records are kept). */
export async function importLegacy(): Promise<number> {
  const old = new Dexie(LEGACY)
  await old.open()
  const data = {
    attempts: (await old.table('attempts').toArray()) as Attempt[],
    cards: (await old.table('cards').toArray()) as CardState[],
    noteState: (await old.table('noteState').toArray()) as NoteState[],
    activity: (await old.table('activity').toArray()) as Activity[],
    docs: (await old.table('docs').toArray()) as OrgDoc[],
  }
  old.close()
  backfill(data)
  let added = 0
  await db.transaction('rw', [db.attempts, db.cards, db.noteState, db.docs, db.activity], async () => {
    const haveAttempts = new Set((await db.attempts.toArray()).map((a) => a.uid))
    for (const a of data.attempts) {
      if (haveAttempts.has(a.uid)) continue
      await db.attempts.add(a)
      added++
    }
    for (const c of data.cards) {
      const cur = await db.cards.get(c.id)
      if (cur && cur.updated >= c.updated) continue
      await db.cards.put(c)
      added++
    }
    for (const n of data.noteState) {
      const cur = await db.noteState.get(n.key)
      if (!cur || cur.updated < n.updated) await db.noteState.put(n)
    }
    for (const a of data.activity) {
      const cur = await db.activity.get(a.day)
      if (!cur || cur.count < a.count) await db.activity.put(a)
    }
    for (const d of data.docs) {
      await db.docs.add(d)
      added++
    }
  })
  await resetPushCursors()
  return added
}
