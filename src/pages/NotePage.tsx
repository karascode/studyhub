import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { findNote, notesFor, noteKey, questions } from '../content'
import { subjectById } from '../content/subjects'
import { db, logActivity, type NoteState } from '../lib/db'
import { mdxComponents } from '../components/ui'

export default function NotePage() {
  const { subject = '', slug = '' } = useParams()
  const note = findNote(subject, slug)
  const s = subjectById(subject)
  const key = `${subject}/${slug}`
  const state = useLiveQuery(() => db.noteState.get(key), [key])

  useEffect(() => {
    if (!note) return
    db.noteState.get(key).then((cur) => {
      db.noteState.put({ ...(cur ?? { key, subject }), key, subject, lastOpened: Date.now(), updated: Date.now() })
    })
    logActivity()
    document.title = `${note.meta.title} · StudyHub`
    return () => {
      document.title = 'StudyHub'
    }
  }, [key])

  if (!note || !s) return <p>Note not found.</p>

  const patch = async (p: Partial<NoteState>) => {
    const cur = (await db.noteState.get(key)) ?? { key, subject }
    await db.noteState.put({ ...cur, ...p, updated: Date.now() })
  }
  const all = notesFor(subject)
  const i = all.findIndex((n) => noteKey(n) === key)
  const prev = all[i - 1]
  const next = all[i + 1]
  const topic = s.topics.find((t) => t.id === note.meta.topic)
  const own = questions.filter((q) => q.note === slug && q.subject === subject)
  const qn = own.length
  const quick = own.filter((q) => q.type !== 'structured').length
  const written = own.length - quick

  return (
    <article className="note">
      <div className="crumbs small">
        <Link to={`/s/${subject}`}>{s.title}</Link> › {topic?.title}{note.meta.code && ` › ${note.meta.code}`}
      </div>
      <div className="row between wrap gap">
        <div className="row gap">
          {(['learning', 'confident'] as const).map((st) => (
            <button
              key={st}
              className={`pill ${state?.status === st ? 'on ' + st : ''}`}
              onClick={() => patch({ status: state?.status === st ? undefined : st })}
              aria-pressed={state?.status === st}
            >
              {st === 'learning' ? 'Still learning' : 'Confident'}
            </button>
          ))}
        </div>
        <button className={`pill ${state?.bookmarked ? 'on bookmarked' : ''}`} onClick={() => patch({ bookmarked: !state?.bookmarked })} aria-pressed={!!state?.bookmarked}>
          {state?.bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      <div className="mdx">
        <note.Content components={mdxComponents} />
      </div>

      <div className="card cta">
        <strong>Want it explained step by step?</strong>
        <div className="row gap wrap" style={{ marginTop: 10 }}>
          <Link className="btn small-btn" to={`/lessons?n=${subject}/${slug}`}>Smart lesson on this topic</Link>
        </div>
      </div>

      {qn > 0 && (
        <div className="card cta">
          <strong>Test yourself</strong> — {qn} question{qn > 1 ? 's' : ''} on this note.
          <div className="row gap wrap" style={{ marginTop: 10 }}>
            {quick > 0 && <Link className="btn small-btn" to={`/practice?s=${subject}&n=${slug}&k=quick`}>Quick quiz ({quick})</Link>}
            {written > 0 && <Link className="btn small-btn ghost" to={`/practice?s=${subject}&n=${slug}&k=written`}>Exam-style ({written})</Link>}
          </div>
        </div>
      )}

      <div className="row between pager">
        {prev ? <Link className="btn ghost" to={`/s/${subject}/n/${prev.slug}`}>← {prev.meta.title}</Link> : <span />}
        {next ? <Link className="btn ghost" to={`/s/${subject}/n/${next.slug}`}>{next.meta.title} →</Link> : <span />}
      </div>
    </article>
  )
}
