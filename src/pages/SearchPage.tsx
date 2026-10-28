import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { search, type Hit } from '../lib/search'
import { subjects } from '../content/subjects'
import { Empty } from '../components/ui'

const kindLabel = { note: 'Note', question: 'Question', card: 'Flashcard', mine: 'My notes' } as const

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const [hits, setHits] = useState<Hit[] | null>(null)

  useEffect(() => {
    let live = true
    setHits(null)
    search(q).then((h) => live && setHits(h))
    return () => {
      live = false
    }
  }, [q])

  return (
    <>
      <h1>Search</h1>
      <p className="muted">Results for “{q}”</p>
      {hits === null ? (
        <p className="muted">Searching…</p>
      ) : hits.length === 0 ? (
        <Empty>No results. Try a different word, e.g. “density” or “quadratic”.</Empty>
      ) : (
        <ul className="plain results stagger">
          {hits.map((h) => (
            <li key={h.id} className="card">
              <div className="small muted">
                <span className="badge">{kindLabel[h.kind]}</span> {subjects.find((s) => s.id === h.subject)?.short}
              </div>
              <Link to={h.to}><strong>{h.title}</strong></Link>
              <div className="muted small">{h.snippet}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
