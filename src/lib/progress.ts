import { useLiveQuery } from 'dexie-react-hooks'
import { db, streakFrom, type Attempt } from './db'
import { questions, notesFor, noteKey, flashcards } from '../content'

export interface Mastery {
  attempted: number
  total: number
  pct: number // average of latest scores for attempted questions, 0-100
}

export function latestByQuestion(attempts: Attempt[]): Map<string, Attempt> {
  const m = new Map<string, Attempt>()
  for (const a of attempts) {
    const cur = m.get(a.qid)
    if (!cur || a.ts >= cur.ts) m.set(a.qid, a)
  }
  return m
}

export function computeMastery(attempts: Attempt[]): Map<string, Mastery> {
  const latest = latestByQuestion(attempts)
  const out = new Map<string, Mastery>()
  for (const q of questions) {
    const k = `${q.subject}/${q.topic}`
    const m = out.get(k) ?? { attempted: 0, total: 0, pct: 0 }
    m.total++
    const a = latest.get(q.id)
    if (a) {
      m.attempted++
      m.pct += (a.score / a.max) * 100
    }
    out.set(k, m)
  }
  for (const m of out.values()) m.pct = m.attempted ? m.pct / m.attempted : 0
  return out
}

export function useAttempts(): Attempt[] {
  return useLiveQuery(() => db.attempts.toArray(), [], []) ?? []
}

export function useMastery(): Map<string, Mastery> {
  const attempts = useAttempts()
  return computeMastery(attempts)
}

export function useStreak(): number {
  const days = useLiveQuery(() => db.activity.toArray(), [], []) ?? []
  return streakFrom(new Set(days.filter((d) => d.count > 0).map((d) => d.day)))
}

export function useNoteStates() {
  const rows = useLiveQuery(() => db.noteState.toArray(), [], []) ?? []
  return new Map(rows.map((r) => [r.key, r]))
}

/** Fraction of notes in a subject marked confident. */
export function subjectNoteProgress(subject: string, states: ReturnType<typeof useNoteStates>) {
  const ns = notesFor(subject)
  const done = ns.filter((n) => states.get(noteKey(n))?.status === 'confident').length
  return { done, total: ns.length }
}

export function useDueCards(subject?: string) {
  const now = Date.now()
  const states = useLiveQuery(() => db.cards.toArray(), [], []) ?? []
  const byId = new Map(states.map((s) => [s.id, s]))
  const pool = flashcards.filter((f) => !subject || f.subject === subject)
  const due = pool.filter((f) => {
    const s = byId.get(f.id)
    return !s || s.due <= now
  })
  const fresh = pool.filter((f) => !byId.has(f.id)).length
  return { due, fresh, total: pool.length }
}
