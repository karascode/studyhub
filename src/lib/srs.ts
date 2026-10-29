import type { CardState } from './db'

export type Grade = 0 | 1 | 2 | 3 // again, hard, good, easy
const DAY = 86_400_000

export function newCard(id: string, subject: string, topic: string): CardState {
  return { id, subject, topic, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, updated: 0 }
}

/** SM-2 variant with four buttons. */
export function review(c: CardState, grade: Grade, now = Date.now()): CardState {
  let { ease, interval, reps, lapses } = c
  if (grade === 0) {
    reps = 0
    lapses += 1
    interval = 0
    ease = Math.max(1.3, ease - 0.2)
    return { ...c, ease, interval, reps, lapses, due: now + 10 * 60_000, updated: now }
  }
  if (reps === 0) interval = grade === 3 ? 4 : 1
  else if (reps === 1) interval = grade === 1 ? 3 : grade === 3 ? 8 : 6
  else interval = Math.round(interval * ease * (grade === 1 ? 0.8 : grade === 3 ? 1.3 : 1))
  ease = Math.max(1.3, ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0))
  reps += 1
  return { ...c, ease, interval, reps, lapses, due: now + interval * DAY, updated: now }
}

export function previewInterval(c: CardState, grade: Grade): string {
  const n = review(c, grade, 0)
  if (grade === 0) return '10m'
  return n.interval === 1 ? '1d' : `${n.interval}d`
}
