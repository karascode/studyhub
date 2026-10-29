import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { questions as allQuestions } from '../content'
import { subjects } from '../content/subjects'
import { db, logActivity, newUid } from '../lib/db'
import { latestByQuestion, useAttempts } from '../lib/progress'
import { Md } from '../components/ui'
import type { Question } from '../types'

type Mode = 'all' | 'new' | 'mistakes'
interface Config {
  subject: string // '' = both
  topics: string[]
  difficulty: 0 | 1 | 2 | 3
  level: 'all' | 'core' | 'extended'
  count: number
  mode: Mode
  minutes: number
  /** quick = multiple choice and calculations; written = exam-style structured questions */
  kind: 'any' | 'quick' | 'written'
}
interface Result {
  q: Question
  score: number
}

const shuffle = <T,>(a: T[]) => {
  const x = [...a]
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[x[i], x[j]] = [x[j], x[i]]
  }
  return x
}

export function checkNumeric(q: Question, input: string): boolean {
  if (!q.numeric) return false
  const v = parseFloat(input.replace(/[,\s$]/g, '').replace('−', '-'))
  if (Number.isNaN(v)) return false
  const { answer, tolerance } = q.numeric
  return Math.abs(v - answer) <= Math.abs(answer) * tolerance + 1e-9
}

export default function PracticePage() {
  const [params] = useSearchParams()
  const attempts = useAttempts()
  const [session, setSession] = useState<{ qs: Question[]; minutes: number } | null>(null)
  const [results, setResults] = useState<Result[] | null>(null)

  // deep link to a single question or note
  useEffect(() => {
    const qid = params.get('q')
    const q = qid && allQuestions.find((x) => x.id === qid)
    if (q) {
      setResults(null)
      setSession({ qs: [q], minutes: 0 })
    }
  }, [params])

  if (results) {
    return (
      <Results
        results={results}
        onRestart={() => {
          setResults(null)
          setSession(null)
        }}
        onRetry={(qs) => {
          setResults(null)
          setSession({ qs, minutes: 0 })
        }}
      />
    )
  }
  if (session) {
    return (
      <Session
        qs={session.qs}
        minutes={session.minutes}
        onFinish={setResults}
        onQuit={() => setSession(null)}
      />
    )
  }
  return <Setup params={params} attempts={attempts} onStart={(qs, minutes) => setSession({ qs, minutes })} />
}

/* ------------------------------ setup ------------------------------ */

function Setup({ params, attempts, onStart }: { params: URLSearchParams; attempts: ReturnType<typeof useAttempts>; onStart: (qs: Question[], minutes: number) => void }) {
  const noteSlug = params.get('n')
  const [cfg, setCfg] = useState<Config>(() => ({
    subject: params.get('s') ?? '',
    topics: params.get('t') ? [params.get('t')!] : [],
    difficulty: 0,
    level: 'all',
    count: 10,
    mode: 'all',
    minutes: 0,
    kind: params.get('k') === 'quick' || params.get('k') === 'written' ? (params.get('k') as Config['kind']) : 'any',
  }))
  const latest = useMemo(() => latestByQuestion(attempts), [attempts])

  const pool = useMemo(
    () =>
      allQuestions.filter((q) => {
        if (cfg.subject && q.subject !== cfg.subject) return false
        if (cfg.topics.length && !cfg.topics.includes(q.topic)) return false
        if (noteSlug && q.note !== noteSlug) return false
        if (cfg.difficulty && q.difficulty !== cfg.difficulty) return false
        if (cfg.kind === 'quick' && q.type === 'structured') return false
        if (cfg.kind === 'written' && q.type !== 'structured') return false
        if (cfg.level !== 'all' && q.level !== 'all' && q.level !== cfg.level) return false
        const a = latest.get(q.id)
        if (cfg.mode === 'new' && a) return false
        if (cfg.mode === 'mistakes' && !(a && a.score < a.max)) return false
        return true
      }),
    [cfg, latest, noteSlug],
  )
  const chosen = Math.min(cfg.count, pool.length)
  const sub = subjects.find((s) => s.id === cfg.subject)
  const set = <K extends keyof Config>(k: K, v: Config[K]) => setCfg((c) => ({ ...c, [k]: v }))

  return (
    <>
      <h1>Practice</h1>
      <p className="muted">Build a quiz from the question bank. Wrong answers are saved to your mistake log automatically.</p>
      {noteSlug && <p className="chip">Filtered to one note · <Link to="/practice">clear</Link></p>}

      <div className="card form">
        <label>
          Subject
          <select value={cfg.subject} onChange={(e) => setCfg({ ...cfg, subject: e.target.value, topics: [] })}>
            <option value="">Both subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </label>

        {sub && (
          <fieldset>
            <legend>Topics (none selected = all)</legend>
            <div className="row wrap gap">
              {sub.topics.map((t) => {
                const n = allQuestions.filter((q) => q.subject === sub.id && q.topic === t.id).length
                return (
                  <label key={t.id} className={`check ${n === 0 ? 'disabled' : ''}`}>
                    <input
                      type="checkbox"
                      disabled={n === 0}
                      checked={cfg.topics.includes(t.id)}
                      onChange={(e) => set('topics', e.target.checked ? [...cfg.topics, t.id] : cfg.topics.filter((x) => x !== t.id))}
                    />
                    {t.title} <span className="muted small">({n})</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )}

        <div className="row wrap gap">
          <label>
            Difficulty
            <select value={cfg.difficulty} onChange={(e) => set('difficulty', Number(e.target.value) as Config['difficulty'])}>
              <option value={0}>Any</option>
              <option value={1}>Easy</option>
              <option value={2}>Medium</option>
              <option value={3}>Hard</option>
            </select>
          </label>
          <label>
            Level
            <select value={cfg.level} onChange={(e) => set('level', e.target.value as Config['level'])}>
              <option value="all">Core + Extended</option>
              <option value="core">Core only</option>
              <option value="extended">Extended included</option>
            </select>
          </label>
          <label>
            Questions
            <select value={cfg.count} onChange={(e) => set('count', Number(e.target.value))}>
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <label>
            Timer
            <select value={cfg.minutes} onChange={(e) => set('minutes', Number(e.target.value))}>
              <option value={0}>Off</option>
              {[5, 10, 15, 30, 45].map((n) => (
                <option key={n} value={n}>{n} min</option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select value={cfg.kind} onChange={(e) => set('kind', e.target.value as Config['kind'])}>
              <option value="any">All types</option>
              <option value="quick">Quick quiz (MCQ + calculations)</option>
              <option value="written">Exam-style (written)</option>
            </select>
          </label>
          <label>
            Show
            <select value={cfg.mode} onChange={(e) => set('mode', e.target.value as Mode)}>
              <option value="all">All questions</option>
              <option value="new">Not attempted yet</option>
              <option value="mistakes">Mistakes only</option>
            </select>
          </label>
        </div>

        <div className="row between wrap gap">
          <span className="muted">{pool.length} question{pool.length === 1 ? '' : 's'} match{pool.length === 1 ? 'es' : ''}</span>
          <button className="btn" disabled={!pool.length} onClick={() => onStart(shuffle(pool).slice(0, chosen), cfg.minutes)}>
            Start {chosen ? `(${chosen})` : ''}
          </button>
        </div>
      </div>
    </>
  )
}

/* ----------------------------- session ----------------------------- */

function Session({ qs, minutes, onFinish, onQuit }: { qs: Question[]; minutes: number; onFinish: (r: Result[]) => void; onQuit: () => void }) {
  const [i, setI] = useState(0)
  const [results, setResults] = useState<Result[]>([])
  const [left, setLeft] = useState(minutes * 60)
  const resultsRef = useRef(results)
  resultsRef.current = results

  useEffect(() => {
    if (!minutes) return
    const id = setInterval(() => setLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [minutes])
  useEffect(() => {
    if (minutes && left <= 0) onFinish(resultsRef.current)
  }, [left])

  const q = qs[i]
  const record = async (score: number) => {
    await db.attempts.add({ uid: newUid(), qid: q.id, subject: q.subject, topic: q.topic, score, max: q.marks, ts: Date.now() })
    await logActivity()
    setResults((r) => [...r, { q, score }])
  }
  const next = () => {
    if (i + 1 >= qs.length) onFinish(results)
    else setI(i + 1)
  }

  return (
    <>
      <div className="row between wrap gap">
        <div>
          <strong>Question {i + 1}</strong> <span className="muted">of {qs.length}</span>
        </div>
        <div className="row gap">
          {minutes > 0 && <span className={`chip ${left < 60 ? 'warn' : ''}`}>⏱ {Math.floor(Math.max(left, 0) / 60)}:{String(Math.max(left, 0) % 60).padStart(2, '0')}</span>}
          <button className="btn ghost small-btn" onClick={() => (results.length ? onFinish(results) : onQuit())}>
            {results.length ? 'Finish early' : 'Quit'}
          </button>
        </div>
      </div>
      <div className="bar"><div style={{ transform: `scaleX(${i / qs.length})` }} /></div>

      <QuestionView key={q.id} q={q} onDone={record} onNext={next} last={i + 1 >= qs.length} />
    </>
  )
}

function QuestionView({ q, onDone, onNext, last }: { q: Question; onDone: (score: number) => Promise<void>; onNext: () => void; last: boolean }) {
  const [choice, setChoice] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<boolean[]>([])
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const submit = async (s: number) => {
    setScore(s)
    setRevealed(true)
    await onDone(s)
  }
  const finished = score !== null
  const diff = ['', 'Easy', 'Medium', 'Hard'][q.difficulty]

  return (
    <div className="card q">
      <div className="row gap small muted wrap">
        <span>{q.marks} mark{q.marks > 1 ? 's' : ''}</span>·<span>{diff}</span>·<span>{q.type === 'mcq' ? 'Multiple choice' : q.type === 'numeric' ? 'Calculation' : 'Written'}</span>
        {q.level === 'extended' && <span className="badge">Extended</span>}
      </div>
      <Md>{q.prompt}</Md>

      {q.type === 'mcq' && (
        <div className="options" role="radiogroup">
          {q.options!.map((o, k) => (
            <label key={k} onPointerDown={() => !finished && setChoice(k)} className={`option ${finished ? (k === q.answerIndex ? 'right' : k === choice ? 'wrong' : '') : choice === k ? 'sel' : ''}`}>
              <input type="radio" name={q.id} disabled={finished} checked={choice === k} onChange={() => setChoice(k)} />
              <span className="letter">{'ABCD'[k]}</span>
              <Md>{o}</Md>
            </label>
          ))}
        </div>
      )}

      {q.type === 'numeric' && (
        <div className="row gap wrap">
          <input
            className="num"
            inputMode="decimal"
            placeholder="Your answer"
            value={text}
            disabled={finished}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && text && !finished && submit(checkNumeric(q, text) ? q.marks : 0)}
            aria-label="Answer"
          />
          {q.numeric?.unit && <span className="muted">{q.numeric.unit}</span>}
        </div>
      )}

      {q.type === 'structured' && (
        <textarea
          className="ans"
          rows={4}
          placeholder="Write your answer here (optional — you mark it yourself)…"
          value={text}
          disabled={finished}
          onChange={(e) => setText(e.target.value)}
        />
      )}

      {!finished && q.type === 'mcq' && (
        <button className="btn" disabled={choice === null} onClick={() => submit(choice === q.answerIndex ? q.marks : 0)}>Check answer</button>
      )}
      {!finished && q.type === 'numeric' && (
        <button className="btn" disabled={!text} onClick={() => submit(checkNumeric(q, text) ? q.marks : 0)}>Check answer</button>
      )}
      {!finished && q.type === 'structured' && !revealed && (
        <button className="btn" onClick={() => { setRevealed(true); setChecked(q.markScheme!.map(() => false)) }}>Show mark scheme</button>
      )}

      {q.type === 'structured' && revealed && !finished && (
        <div className="scheme">
          <strong>Mark scheme — tick each point you earned</strong>
          {q.markScheme!.map((m, k) => (
            <label key={k} className="check">
              <input type="checkbox" checked={checked[k] ?? false} onChange={(e) => setChecked(checked.map((c, j) => (j === k ? e.target.checked : c)))} />
              <Md>{m}</Md>
            </label>
          ))}
          <button className="btn" onClick={() => submit(Math.min(q.marks, checked.filter(Boolean).length))}>Save marks</button>
        </div>
      )}

      {finished && (
        <div className={`feedback ${score === q.marks ? 'good' : score! > 0 ? 'part' : 'bad'}`}>
          <strong>{score}/{q.marks}</strong> {score === q.marks ? '— correct!' : score! > 0 ? '— partly there.' : '— not quite.'}
          {q.type === 'numeric' && score !== q.marks && <div>Answer: <strong>{q.numeric!.answer}</strong> {q.numeric!.unit}</div>}
          {q.type === 'structured' && (
            <ul>{q.markScheme!.map((m, k) => <li key={k}><Md>{m}</Md></li>)}</ul>
          )}
          {q.explanation && <Md>{q.explanation}</Md>}
        </div>
      )}

      {finished && (
        <div className="row right">
          <button className="btn" onClick={onNext}>{last ? 'See results' : 'Next question →'}</button>
        </div>
      )}
    </div>
  )
}

/* ----------------------------- results ----------------------------- */

function Results({ results, onRestart, onRetry }: { results: Result[]; onRestart: () => void; onRetry: (qs: Question[]) => void }) {
  const got = results.reduce((a, r) => a + r.score, 0)
  const max = results.reduce((a, r) => a + r.q.marks, 0)
  const pct = max ? Math.round((got / max) * 100) : 0
  const wrong = results.filter((r) => r.score < r.q.marks).map((r) => r.q)

  const byTopic = new Map<string, { got: number; max: number; title: string }>()
  for (const r of results) {
    const s = subjects.find((x) => x.id === r.q.subject)!
    const t = s.topics.find((x) => x.id === r.q.topic)!
    const k = `${s.id}/${t.id}`
    const cur = byTopic.get(k) ?? { got: 0, max: 0, title: `${s.short}: ${t.title}` }
    cur.got += r.score
    cur.max += r.q.marks
    byTopic.set(k, cur)
  }

  return (
    <div className="stagger">
      <h1>Results</h1>
      <div className="card center">
        <div className="big">{got}/{max}</div>
        <div className={`pct ${pct >= 70 ? 'good' : pct >= 40 ? 'part' : 'bad'}`}>{pct}%</div>
        <p className="muted">{results.length ? (pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good progress — review the misses below.' : 'Keep going — revisit the notes and try again.') : 'No questions answered.'}</p>
      </div>

      {byTopic.size > 0 && (
        <div className="card">
          <h3>By topic</h3>
          {[...byTopic.entries()].map(([k, v]) => (
            <div key={k} className="row between small">
              <span>{v.title}</span>
              <span>{v.got}/{v.max}</span>
            </div>
          ))}
        </div>
      )}

      {wrong.length > 0 && (
        <div className="card">
          <h3>Review</h3>
          <ul className="plain">
            {results.filter((r) => r.score < r.q.marks).map((r) => (
              <li key={r.q.id}>
                {r.score}/{r.q.marks} · {r.q.note ? <Link to={`/s/${r.q.subject}/n/${r.q.note}`}>read the note</Link> : 'no note'}
                <Md>{r.q.prompt.split('\n')[0]}</Md>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="row gap wrap">
        {wrong.length > 0 && <button className="btn" onClick={() => onRetry(wrong)}>Retry {wrong.length} missed</button>}
        <button className="btn ghost" onClick={onRestart}>New quiz</button>
      </div>
    </div>
  )
}
