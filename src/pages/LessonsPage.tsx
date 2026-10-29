import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { noteKey, noteText } from '../content'
import { subjectById, subjects } from '../content/subjects'
import { db, dayKey } from '../lib/db'
import { useAttempts, useNoteStates } from '../lib/progress'
import { insights, type NoteInsight } from '../lib/lessons'
import { aiAvailable, AIError, askAI, fixMath, useAIQuota, type Lesson } from '../lib/ai'
import { Md } from '../components/ui'

const first = (s: string) => s.split('\n')[0].slice(0, 280)

export default function LessonsPage() {
  const [params, setParams] = useSearchParams()
  const attempts = useAttempts()
  const states = useNoteStates()
  const all = useMemo(() => insights(attempts, states), [attempts, states])
  const key = params.get('n') ?? ''
  const [subject, slug] = key.split('/')
  const chosen = subject && slug ? all.find((x) => x.note.subject === subject && x.note.slug === slug) : undefined

  if (chosen) return <LessonView info={chosen} onBack={() => setParams({})} />

  const [top, ...rest] = all
  const open = (n: NoteInsight) => setParams({ n: noteKey(n.note) })

  return (
    <>
      <h1>Smart lessons</h1>
      <p className="muted">Short lessons chosen from your own results: the topics you’re weakest on come first.</p>

      {top && (
        <div className="card lesson-hero stagger">
          <div className="eyebrow">Today’s lesson</div>
          <h2 className="flush">{top.note.meta.title}</h2>
          <p className="lesson-reason flush">{top.reason}</p>
          <div className="row gap wrap">
            <button className="btn" onClick={() => open(top)}>Start lesson</button>
            <Link className="btn ghost" to={`/s/${top.note.subject}/n/${top.note.slug}`}>Read the note</Link>
          </div>
        </div>
      )}

      <h2>Also worth a look</h2>
      <div className="grid cols-3">
        {rest.slice(0, 3).map((n) => (
          <button key={noteKey(n.note)} className="card org-item lesson-pick" onClick={() => open(n)}>
            <span className="grow">
              <span className="eyebrow">{subjectById(n.note.subject)?.short}</span>
              <strong>{n.note.meta.title}</strong>
              <span className="small muted">{n.reason}</span>
            </span>
          </button>
        ))}
      </div>

      <h2>Choose any topic</h2>
      {subjects.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.title}</h3>
          <ul className="plain">
            {all
              .filter((x) => x.note.subject === s.id)
              .sort((a, b) => a.note.order - b.note.order)
              .map((n) => (
                <li key={n.note.slug} className="row between gap">
                  <button className="linkish pick" onClick={() => open(n)}>{n.note.meta.title}</button>
                  <span className="small muted">
                    {n.status === 'confident' ? 'confident' : n.pct === null ? 'not started' : `${Math.round(n.pct)}%`}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ one lesson */
function LessonView({ info, onBack }: { info: NoteInsight; onBack: () => void }) {
  const { note } = info
  const ai = aiAvailable()
  const quota = useAIQuota()
  const cacheKey = `lesson:${noteKey(note)}:${dayKey()}`
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [shown, setShown] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)

  // a lesson generated earlier today is reused, so reopening costs nothing
  useEffect(() => {
    setLesson(null)
    setErr('')
    setShown(new Set())
    setDone(false)
    db.meta.get(cacheKey).then((m) => {
      if (m && typeof m.value === 'string') {
        try {
          setLesson(JSON.parse(m.value))
        } catch {
          /* ignore a corrupt cache entry */
        }
      }
    })
  }, [cacheKey])

  const generate = async () => {
    setBusy(true)
    setErr('')
    try {
      const l = await askAI<Lesson>('lesson', {
        title: note.meta.title,
        source: noteText(note, 5500),
        weak: info.missed.slice(0, 3).map((q) => first(q.prompt)),
      })
      setLesson(l)
      setShown(new Set())
      await db.meta.put({ key: cacheKey, value: JSON.stringify(l) })
    } catch (e) {
      setErr(e instanceof AIError ? e.message : 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }
  const toggle = (id: string) => setShown((s) => new Set(s).has(id) ? new Set([...s].filter((x) => x !== id)) : new Set(s).add(id))
  const markConfident = async () => {
    const k = noteKey(note)
    const cur = await db.noteState.get(k)
    await db.noteState.put({ ...(cur ?? { key: k, subject: note.subject }), key: k, subject: note.subject, status: 'confident', updated: Date.now() })
    setDone(true)
  }

  const s = subjectById(note.subject)
  return (
    <div className="lesson-body">
      <button className="linkish" onClick={onBack}>← All lessons</button>
      <div className="eyebrow" style={{ marginTop: 14 }}>{s?.title}</div>
      <h1>{lesson?.title || note.meta.title}</h1>
      <p className="lesson-reason">{info.reason}</p>

      <div className="card cta">
        <div className="eyebrow">Your plan</div>
        <ol className="plan">
          <li>{ai ? 'Read the AI mini-lesson below' : 'Read the note'} {ai && <span className="muted">(about 5 minutes)</span>}</li>
          <li><Link to={`/practice?s=${note.subject}&n=${note.slug}&k=quick`}>Check yourself with a quick quiz</Link></li>
          <li><Link to={`/flashcards?s=${note.subject}&t=${note.meta.topic}`}>Lock it in with flashcards</Link></li>
        </ol>
        <div className="row gap wrap">
          <Link className="btn ghost small-btn" to={`/s/${note.subject}/n/${note.slug}`}>Open the full note</Link>
        </div>
      </div>

      {!ai && (
        <p className="muted">AI-written lessons aren’t switched on yet. Follow the plan above: the note has everything you need.</p>
      )}

      {ai && !lesson && (
        <div className="card">
          <p className="flush">{info.missed.length ? 'This lesson will focus on the ideas behind the questions you missed.' : 'A short lesson built from your notes on this topic.'}</p>
          <div className="ai-actions">
            <button className="btn" disabled={busy} onClick={generate}>{busy ? 'Writing your lesson…' : 'Generate my lesson'}</button>
            {quota !== null && <span className="small muted">{quota} AI requests left today</span>}
          </div>
          {err && <p className="small" style={{ color: 'var(--bad)', margin: 0 }}>{err}</p>}
        </div>
      )}

      {lesson && (
        <article className="stagger">
          <p>{lesson.intro && <Md>{fixMath(lesson.intro)}</Md>}</p>
          {lesson.steps.map((st, i) => (
            <section key={i} className="lesson-step">
              <h3>{i + 1}. {st.heading}</h3>
              <Md>{fixMath(st.body)}</Md>
            </section>
          ))}

          {lesson.example && (
            <section className="card">
              <div className="eyebrow">Worked example</div>
              <Md>{fixMath(lesson.example.question)}</Md>
              {shown.has('ex') ? <div className="ai-box"><Md>{fixMath(lesson.example.solution)}</Md></div> : <button className="btn ghost small-btn" onClick={() => toggle('ex')}>Show the solution</button>}
            </section>
          )}

          {lesson.mistakes.length > 0 && (
            <aside className="callout mistake">
              <div className="callout-label">Common mistakes</div>
              <ul>{lesson.mistakes.map((m, i) => <li key={i}><Md>{fixMath(m)}</Md></li>)}</ul>
            </aside>
          )}

          {lesson.quiz.length > 0 && (
            <section>
              <h3>Try it yourself</h3>
              {lesson.quiz.map((q, i) => (
                <div key={i} className="quiz-item">
                  <Md>{fixMath(`**${i + 1}.** ${q.q}`)}</Md>
                  {shown.has(`q${i}`) ? <div className="ai-box"><Md>{fixMath(q.a)}</Md></div> : <button className="btn ghost small-btn reveal" onClick={() => toggle(`q${i}`)}>Show answer</button>}
                </div>
              ))}
            </section>
          )}

          {lesson.recap && <p className="callout key" style={{ padding: '12px 16px' }}><strong>In one line:</strong> {lesson.recap}</p>}

          <p className="small muted">AI-written from your notes. If anything looks different from your notes or syllabus, trust the notes.</p>

          <div className="row gap wrap">
            <Link className="btn" to={`/practice?s=${note.subject}&n=${note.slug}`}>Practise this topic</Link>
            <button className="btn ghost" onClick={markConfident} disabled={done}>{done ? 'Marked as confident' : 'I’ve got this'}</button>
            <button className="btn ghost" onClick={generate} disabled={busy}>{busy ? 'Writing…' : 'Write a different lesson'}</button>
          </div>
          {err && <p className="small" style={{ color: 'var(--bad)' }}>{err}</p>}
        </article>
      )}
    </div>
  )
}
