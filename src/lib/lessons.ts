import { notes, questions, noteKey } from '../content'
import type { Attempt, NoteState } from './db'
import { latestByQuestion } from './progress'
import type { Note, Question } from '../types'

export interface NoteInsight {
  note: Note
  attempted: number
  total: number
  /** average latest score on attempted questions, or null when none attempted */
  pct: number | null
  /** questions whose latest attempt lost marks */
  missed: Question[]
  status?: 'learning' | 'confident'
  priority: number
  reason: string
}

/**
 * Rank every note by how much a student would gain from a lesson on it, using only what the app
 * already knows (no AI): weak results first, then notes marked "still learning", then new ground.
 */
export function insights(attempts: Attempt[], states: Map<string, NoteState>): NoteInsight[] {
  const latest = latestByQuestion(attempts)
  return notes
    .map((note): NoteInsight => {
      const qs = questions.filter((q) => q.subject === note.subject && q.note === note.slug)
      const done = qs.filter((q) => latest.has(q.id))
      const pct = done.length ? (done.reduce((a, q) => a + latest.get(q.id)!.score / latest.get(q.id)!.max, 0) / done.length) * 100 : null
      const missed = done.filter((q) => latest.get(q.id)!.score < latest.get(q.id)!.max)
      const status = states.get(noteKey(note))?.status

      let priority = 0
      let reason = 'You’re doing well here. A refresher keeps it fresh.'
      if (pct !== null && pct < 70) {
        priority = 100 - pct + Math.min(done.length, 5)
        reason = `You got ${missed.length} of ${done.length} questions wrong here (${Math.round(pct)}% score).`
      } else if (status === 'learning') {
        priority = 60
        reason = 'You marked this as “still learning”.'
      } else if (pct === null && status !== 'confident') {
        priority = 40 - note.order / 100
        reason = 'You haven’t tried this topic yet.'
      } else if (status !== 'confident') {
        priority = 20
        reason = `You scored ${Math.round(pct ?? 0)}% here. A little more practice would lock it in.`
      }
      return { note, attempted: done.length, total: qs.length, pct, missed, status, priority, reason }
    })
    .sort((a, b) => b.priority - a.priority)
}
