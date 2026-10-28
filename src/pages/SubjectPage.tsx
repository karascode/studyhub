import { Link, useParams } from 'react-router-dom'
import { subjectById } from '../content/subjects'
import { notesForTopic, noteKey, questions, flashcards } from '../content'
import { useMastery, useNoteStates } from '../lib/progress'
import { ProgressBar } from '../components/ui'

export default function SubjectPage() {
  const { subject } = useParams()
  const s = subjectById(subject ?? '')
  const mastery = useMastery()
  const states = useNoteStates()
  if (!s) return <p>Subject not found.</p>

  return (
    <>
      <div className="small muted">{s.code}</div>
      <h1 style={{ color: s.color }}>{s.title}</h1>
      <p className="muted">{s.blurb}</p>

      <div className="stagger">
      {s.topics.map((t) => {
        const ns = notesForTopic(s.id, t.id)
        const m = mastery.get(`${s.id}/${t.id}`)
        const qn = questions.filter((q) => q.subject === s.id && q.topic === t.id).length
        const fn = flashcards.filter((f) => f.subject === s.id && f.topic === t.id).length
        return (
          <section key={t.id} className="card topic">
            <div className="row between">
              <div>
                <h2 className="flush">{t.title}</h2>
                <p className="muted flush">{t.blurb}</p>
              </div>
              {qn > 0 && (
                <div className="small right">
                  Mastery {m && m.attempted ? `${Math.round(m.pct)}%` : '—'}
                  <ProgressBar value={m?.pct ?? 0} color={s.color} />
                </div>
              )}
            </div>
            {ns.length ? (
              <ul className="plain notes-list">
                {ns.map((n) => {
                  const st = states.get(noteKey(n))
                  return (
                    <li key={n.slug}>
                      {n.meta.code && <span className="muted small code">{n.meta.code}</span>}
                      <Link to={`/s/${s.id}/n/${n.slug}`}>{n.meta.title}</Link>
                      {st?.status && <span className={`badge ${st.status}`}>{st.status}</span>}
                      {st?.bookmarked && <span className="badge" title="Bookmarked">saved</span>}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="muted small">Notes coming soon.</p>
            )}
            {(qn > 0 || fn > 0) && (
              <div className="row gap">
                {qn > 0 && <Link className="btn small-btn" to={`/practice?s=${s.id}&t=${t.id}`}>Practise ({qn})</Link>}
                {fn > 0 && <Link className="btn small-btn ghost" to={`/flashcards?s=${s.id}&t=${t.id}`}>Flashcards ({fn})</Link>}
              </div>
            )}
          </section>
        )
      })}
      </div>
    </>
  )
}
