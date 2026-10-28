export type Level = 'core' | 'extended' | 'all'

export interface Topic {
  id: string
  title: string
  blurb: string
}

export interface Subject {
  id: string
  code: string
  title: string
  short: string
  color: string
  blurb: string
  topics: Topic[]
}

/** Exported from each note's MDX file as `export const meta`. */
export interface NoteMeta {
  /** syllabus reference shown beside the title, e.g. "1.2" */
  code?: string
  topic: string
  title: string
  summary: string
  keywords: string[]
  level: Level
}

export interface Note {
  subject: string
  slug: string
  order: number
  meta: NoteMeta
  Content: React.ComponentType<{ components?: Record<string, unknown> }>
  raw: string
}

export interface Question {
  id: string
  subject: string
  topic: string
  /** slug of the note that teaches this */
  note?: string
  type: 'mcq' | 'numeric' | 'structured'
  marks: number
  difficulty: 1 | 2 | 3
  level: Level
  prompt: string
  options?: string[]
  answerIndex?: number
  numeric?: { answer: number; tolerance: number; unit?: string }
  /** one entry per mark (structured questions are self-marked against these) */
  markScheme?: string[]
  explanation?: string
}

export interface Flashcard {
  id: string
  subject: string
  topic: string
  front: string
  back: string
}
