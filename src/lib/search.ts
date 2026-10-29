import MiniSearch from 'minisearch'
import { notes, questions, flashcards, plain } from '../content'
import { db } from './db'

export interface Hit {
  id: string
  kind: 'note' | 'question' | 'card' | 'mine'
  subject: string
  title: string
  snippet: string
  to: string
}

/** Make markdown/LaTeX readable as a one-line title or snippet. */
const clean = (s: string) =>
  s
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\d?frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[${}*_^#\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const docs: (Hit & { text: string })[] = [
  ...notes.map((n) => ({
    id: `note:${n.subject}/${n.slug}`,
    kind: 'note' as const,
    subject: n.subject,
    title: n.meta.title,
    snippet: n.meta.summary,
    to: `/s/${n.subject}/n/${n.slug}`,
    text: `${n.meta.keywords.join(' ')} ${plain(n.raw)}`,
  })),
  ...questions.map((q) => ({
    id: `q:${q.id}`,
    kind: 'question' as const,
    subject: q.subject,
    title: clean(q.prompt.split('\n')[0]).slice(0, 90),
    snippet: `${q.marks} mark${q.marks > 1 ? 's' : ''} · ${q.type}`,
    to: `/practice?q=${q.id}`,
    text: q.prompt + ' ' + (q.explanation ?? ''),
  })),
  ...flashcards.map((f) => ({
    id: `fc:${f.id}`,
    kind: 'card' as const,
    subject: f.subject,
    title: clean(f.front),
    snippet: clean(f.back),
    to: `/flashcards?s=${f.subject}`,
    text: f.front + ' ' + f.back,
  })),
]

const opts = { fields: ['title', 'text'], storeFields: [] as string[], searchOptions: { prefix: true, fuzzy: 0.2, boost: { title: 3 } } }

const staticIndex = new MiniSearch<(typeof docs)[number]>(opts)
staticIndex.addAll(docs)
const byId = new Map(docs.map((d) => [d.id, d]))

export async function search(query: string): Promise<Hit[]> {
  const q = query.trim()
  if (!q) return []
  const hits: Hit[] = staticIndex.search(q).map((r) => byId.get(r.id)!)

  // organizer docs change at runtime: search them on the fly
  const mine = (await db.docs.toArray()).filter((d) => !d.deleted)
  const ql = q.toLowerCase()
  for (const d of mine) {
    const hay = `${d.title} ${d.tags.join(' ')} ${d.text ?? ''} ${d.fileName ?? ''}`.toLowerCase()
    if (ql.split(/\s+/).every((w) => hay.includes(w))) {
      hits.unshift({ id: `mine:${d.id}`, kind: 'mine', subject: d.subject, title: d.title, snippet: d.kind === 'file' ? d.fileName ?? 'file' : clean(d.text ?? '').slice(0, 100), to: `/organizer?doc=${d.id}` })
    }
  }
  return hits.slice(0, 40)
}
