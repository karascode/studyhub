import type { Flashcard, Note, NoteMeta, Question } from '../types'
import { physicsT1Questions } from './physics/questions-t1'
import { physicsT2Questions } from './physics/questions-t2'
import { physicsCards } from './physics/flashcards'
import { mathsQuestions } from './maths/questions'
import { mathsCards } from './maths/flashcards'

type MdxModule = { default: Note['Content']; meta: NoteMeta }

const mods = import.meta.glob<MdxModule>('./*/notes/*.mdx', { eager: true })
import raws from 'virtual:note-sources'

export const notes: Note[] = Object.entries(mods)
  .map(([path, m]) => {
    const [, subject, , file] = path.split('/')
    const base = file.replace(/\.mdx$/, '')
    const order = parseInt(base.split('-')[0], 10) || 0
    return { subject, slug: base.replace(/^\d+-/, ''), order, meta: m.meta, Content: m.default, raw: raws[path] ?? '' }
  })
  .sort((a, b) => a.subject.localeCompare(b.subject) || a.order - b.order)

export const questions: Question[] = [...physicsT1Questions, ...physicsT2Questions, ...mathsQuestions]
export const flashcards: Flashcard[] = [...physicsCards, ...mathsCards]

export const notesFor = (subject: string) => notes.filter((n) => n.subject === subject)
export const notesForTopic = (subject: string, topic: string) => notesFor(subject).filter((n) => n.meta.topic === topic)
export const findNote = (subject: string, slug: string) => notes.find((n) => n.subject === subject && n.slug === slug)
export const noteKey = (n: Pick<Note, 'subject' | 'slug'>) => `${n.subject}/${n.slug}`

/** A note's text with maths kept, for grounding the AI (callouts and the meta block removed). */
export function noteText(n: Note, max = 2600): string {
  return n.raw
    .replace(/\r/g, '')
    .replace(/export const meta[\s\S]*?\n}\n/, '')
    .replace(/<\/?(Key|Tip|Mistake|Ext)>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

/** Strip markdown/MDX syntax so search indexes plain words. */
export function plain(md: string): string {
  return md
    .replace(/export const meta[\s\S]*?\n}\n/, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\$\$?[^$]+\$\$?/g, ' ')
    .replace(/[#*_`>|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
