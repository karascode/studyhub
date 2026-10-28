import Dexie, { type Table } from 'dexie'
import { activeDbName } from './auth'

export interface Attempt {
  id?: number
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
}
export interface NoteState {
  key: string // subject/slug
  subject: string
  status?: 'learning' | 'confident'
  bookmarked?: boolean
  lastOpened?: number
}
export interface OrgDoc {
  id?: number
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
}
export interface Activity {
  day: string // yyyy-mm-dd
  count: number
}

class StudyDB extends Dexie {
  attempts!: Table<Attempt, number>
  cards!: Table<CardState, string>
  noteState!: Table<NoteState, string>
  docs!: Table<OrgDoc, number>
  activity!: Table<Activity, string>

  constructor() {
    super(activeDbName())
    this.version(1).stores({
      attempts: '++id, qid, subject, topic, ts',
      cards: 'id, subject, topic, due',
      noteState: 'key, subject, status, bookmarked, lastOpened',
      docs: '++id, subject, topic, updated',
      activity: 'day',
    })
  }
}

export const db = new StudyDB()

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export async function logActivity(n = 1) {
  const day = dayKey()
  const cur = await db.activity.get(day)
  await db.activity.put({ day, count: (cur?.count ?? 0) + n })
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
    version: 1,
    exported: new Date().toISOString(),
    attempts: await db.attempts.toArray(),
    cards: await db.cards.toArray(),
    noteState: await db.noteState.toArray(),
    activity: await db.activity.toArray(),
    docs,
  })
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
  await db.transaction('rw', [db.attempts, db.cards, db.noteState, db.docs, db.activity], async () => {
    await Promise.all([db.attempts.clear(), db.cards.clear(), db.noteState.clear(), db.docs.clear(), db.activity.clear()])
    await db.attempts.bulkAdd(data.attempts ?? [])
    await db.cards.bulkAdd(data.cards ?? [])
    await db.noteState.bulkAdd(data.noteState ?? [])
    await db.activity.bulkAdd(data.activity ?? [])
    await db.docs.bulkAdd(docs)
  })
}

export async function resetAll() {
  await Promise.all([db.attempts.clear(), db.cards.clear(), db.noteState.clear(), db.docs.clear(), db.activity.clear()])
}
