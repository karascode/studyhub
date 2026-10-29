import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { insights } from '../lib/lessons'
import { useLiveQuery } from 'dexie-react-hooks'
import { subjects } from '../content/subjects'
import { notes, noteKey, questions } from '../content'
import { liveDocs } from '../lib/db'
import { currentIdentity } from '../lib/identity'
import { subjectNoteProgress, useAttempts, useDueCards, useMastery, useNoteStates } from '../lib/progress'
import { ProgressBar } from '../components/ui'

export default function Home() {
  const mastery = useMastery()
  const states = useNoteStates()
  const attempts = useAttempts()
  const lessonPick = useMemo(() => insights(attempts, states)[0], [attempts, states])
  const { due, total } = useDueCards()
  const docCount = useLiveQuery(() => liveDocs().count(), [], 0)

  const last = [...states.values()].filter((s) => s.lastOpened).sort((a, b) => b.lastOpened! - a.lastOpened!)[0]
  const lastNote = last && notes.find((n) => noteKey(n) === last.key)

  // weakest topics: attempted, lowest mastery
  const weak = [...mastery.entries()]
    .filter(([, m]) => m.attempted > 0 && m.pct < 70)
    .sort((a, b) => a[1].pct - b[1].pct)
    .slice(0, 3)

  return (
    <>
      <h1>Welcome back{currentIdentity() ? `, ${currentIdentity()!.name}` : ''}</h1>
      <p className="muted">Offline revision for IGCSE Physics (0625) and International Mathematics (0607).</p>

      <div className="grid cols-3 gap-top">
        <div className="card">
          <h3>Continue</h3>
          {lastNote ? (
            <>
              <p>{lastNote.meta.title}</p>
              <Link className="btn" to={`/s/${lastNote.subject}/n/${lastNote.slug}`}>Resume reading</Link>
            </>
          ) : (
            <>
              <p className="muted">Pick a subject below to start your first note.</p>
              <Link className="btn" to="/s/physics">Start with Physics</Link>
            </>
          )}
        </div>
        {lessonPick && (
          <div className="card">
            <h3>Today’s lesson</h3>
            <p>{lessonPick.note.meta.title}</p>
            <Link className="btn" to={`/lessons?n=${lessonPick.note.subject}/${lessonPick.note.slug}`}>Start lesson</Link>
          </div>
        )}
        <div className="card">
          <h3>Flashcards due</h3>
          <p className="big">{due.length}<span className="muted small"> / {total}</span></p>
          <Link className="btn" to="/flashcards">{due.length ? 'Review now' : 'Browse decks'}</Link>
        </div>
        <div className="card">
          <h3>Practice</h3>
          <p className="muted">{questions.length} questions across both subjects.</p>
          <Link className="btn" to="/practice">Build a quiz</Link>
        </div>
      </div>

      <h2>Subjects</h2>
      <div className="grid cols-2">
        {subjects.map((s) => {
          const np = subjectNoteProgress(s.id, states)
          const qs = [...mastery.entries()].filter(([k]) => k.startsWith(s.id + '/'))
          const attempted = qs.reduce((a, [, m]) => a + m.attempted, 0)
          const total = qs.reduce((a, [, m]) => a + m.total, 0)
          return (
            <Link key={s.id} to={`/s/${s.id}`} className="card subject-card" style={{ '--c': s.color } as React.CSSProperties}>
              <div className="eyebrow">{s.code}</div>
              <h3>{s.title}</h3>
              <p className="muted">{s.blurb}</p>
              <div className="small">Notes confident: {np.done}/{np.total}</div>
              <ProgressBar value={np.total ? (np.done / np.total) * 100 : 0} color={s.color} />
              <div className="small">Questions attempted: {attempted}/{total}</div>
              <ProgressBar value={total ? (attempted / total) * 100 : 0} color={s.color} />
            </Link>
          )
        })}
      </div>

      <div className="grid cols-2 gap-top">
        <div className="card">
          <h3>Weak topics</h3>
          {weak.length ? (
            <ul className="plain">
              {weak.map(([k, m]) => {
                const [sid, tid] = k.split('/')
                const s = subjects.find((x) => x.id === sid)!
                const t = s.topics.find((x) => x.id === tid)!
                return (
                  <li key={k}>
                    <Link to={`/practice?s=${sid}&t=${tid}`}>{s.short}: {t.title}</Link> <span className="muted small">({Math.round(m.pct)}%)</span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="muted">Answer some practice questions and your weakest topics show up here.</p>
          )}
        </div>
        <div className="card">
          <h3>My notes</h3>
          <p className="muted">{docCount ? `${docCount} item${docCount > 1 ? 's' : ''} in your organizer.` : 'Upload or write your own notes, sorted by subject.'}</p>
          <Link className="btn" to="/organizer">Open organizer</Link>
        </div>
      </div>
    </>
  )
}
