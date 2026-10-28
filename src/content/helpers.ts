import type { Flashcard, Level, Question } from '../types'

type D = 1 | 2 | 3

/** Use r`...` for strings containing LaTeX so backslashes need no escaping. */
export const r = String.raw

/**
 * Compact authoring helpers. IDs are generated as `<subject>-<note>-<n>` in file order,
 * so append new items to the END of a note's list to keep saved progress valid.
 */
export function questionFactory(subject: string, topic: string) {
  const counts: Record<string, number> = {}
  const base = (note: string, difficulty: D, level: Level) => ({
    id: `${subject.slice(0, 3)}-${note}-${(counts[note] = (counts[note] ?? 0) + 1)}`,
    subject,
    topic,
    note,
    difficulty,
    level,
  })
  return {
    /** multiple choice, 1 mark */
    mcq: (note: string, d: D, prompt: string, options: string[], answerIndex: number, explanation?: string, level: Level = 'all'): Question => ({
      ...base(note, d, level), type: 'mcq', marks: 1, prompt, options, answerIndex, explanation,
    }),
    /** calculation with a single numeric answer; tolerance is relative (0.01 = 1%) */
    num: (note: string, d: D, marks: number, prompt: string, answer: number, tolerance: number, unit?: string, explanation?: string, level: Level = 'all'): Question => ({
      ...base(note, d, level), type: 'numeric', marks, prompt, numeric: { answer, tolerance, unit }, explanation,
    }),
    /** written / structured: one mark-scheme line per mark, self-marked */
    wr: (note: string, d: D, prompt: string, markScheme: string[], explanation?: string, level: Level = 'all'): Question => ({
      ...base(note, d, level), type: 'structured', marks: markScheme.length, prompt, markScheme, explanation,
    }),
  }
}

export function cardFactory(subject: string, topic: string) {
  const counts: Record<string, number> = {}
  return (note: string, front: string, back: string): Flashcard => ({
    id: `${subject.slice(0, 3)}-${note}-fc${(counts[note] = (counts[note] ?? 0) + 1)}`,
    subject,
    topic,
    front,
    back,
  })
}
