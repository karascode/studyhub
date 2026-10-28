import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { flashcards } from '../content'
import { subjects } from '../content/subjects'
import { db, logActivity, type CardState } from '../lib/db'
import { newCard, previewInterval, review, type Grade } from '../lib/srs'
import { Md } from '../components/ui'
import type { Flashcard } from '../types'

export default function FlashcardsPage() {
  const [params] = useSearchParams()
  const [subject, setSubject] = useState(params.get('s') ?? '')
  const [topic, setTopic] = useState(params.get('t') ?? '')
  const [queue, setQueue] = useState<Flashcard[] | null>(null)
  const [reviewed, setReviewed] = useState(0)

  const states = useLiveQuery(() => db.cards.toArray(), [], []) ?? []
  const byId = useMemo(() => new Map(states.map((s) => [s.id, s])), [states])
  const sub = subjects.find((s) => s.id === subject)

  const pool = flashcards.filter((f) => (!subject || f.subject === subject) && (!topic || f.topic === topic))
  const now = Date.now()
  const due = pool.filter((f) => (byId.get(f.id)?.due ?? 0) <= now)
  const learned = pool.filter((f) => (byId.get(f.id)?.reps ?? 0) >= 3).length

  if (queue) {
    return (
      <Review
        queue={queue}
        states={byId}
        onDone={(n) => {
          setReviewed(n)
          setQueue(null)
        }}
      />
    )
  }

  return (
    <>
      <h1>Flashcards</h1>
      <p className="muted">Spaced repetition: cards you find hard come back sooner, easy ones later.</p>
      {reviewed > 0 && <p className="chip good">Session complete: reviewed {reviewed} card{reviewed > 1 ? 's' : ''}.</p>}

      <div className="card form">
        <div className="row gap wrap">
          <label>
            Subject
            <select value={subject} onChange={(e) => { setSubject(e.target.value); setTopic('') }}>
              <option value="">Both</option>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </label>
          {sub && (
            <label>
              Topic
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value="">All topics</option>
                {sub.topics.filter((t) => flashcards.some((f) => f.subject === sub.id && f.topic === t.id)).map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="grid cols-3">
          <div><div className="big">{due.length}</div><div className="muted small">due now</div></div>
          <div><div className="big">{pool.length}</div><div className="muted small">in deck</div></div>
          <div><div className="big">{learned}</div><div className="muted small">well learned</div></div>
        </div>
        <button className="btn" disabled={!due.length} onClick={() => { setReviewed(0); setQueue(due.slice(0, 30)) }}>
          {due.length ? `Review ${Math.min(due.length, 30)} cards` : 'All caught up!'}
        </button>
        {!due.length && pool.length > 0 && (
          <button className="btn ghost" onClick={() => { setReviewed(0); setQueue([...pool].sort(() => Math.random() - 0.5).slice(0, 15)) }}>
            Practise anyway (15 random)
          </button>
        )}
      </div>
    </>
  )
}

function Review({ queue, states, onDone }: { queue: Flashcard[]; states: Map<string, CardState>; onDone: (n: number) => void }) {
  const [list, setList] = useState(queue)
  const [shown, setShown] = useState(false)
  const [count, setCount] = useState(0)
  const card = list[0]
  const cardEl = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; startX: number; base: number; moved: boolean; pts: { x: number; t: number }[] } | null>(null)
  const suppressClick = useRef(false)

  /** Pose the card at x and drive the Again/Good hint from how far it has travelled. */
  const pose = (x: number) => {
    const el = cardEl.current!
    el.style.transform = `translate3d(${x}px,0,0) rotate(${x * 0.02}deg)`
    el.style.setProperty('--p', String(Math.max(-1, Math.min(1, x / (el.offsetWidth * 0.4)))))
  }
  const resetCard = () => {
    const el = cardEl.current
    if (!el) return
    el.getAnimations().forEach((a) => a.cancel())
    el.style.transform = ''
    el.style.transition = ''
    el.style.setProperty('--p', '0')
    el.classList.remove('dragging')
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = cardEl.current!
    // start from the presentation value so grabbing a moving card never jumps
    const x = new DOMMatrix(getComputedStyle(el).transform).m41
    el.getAnimations().forEach((a) => a.cancel())
    el.style.transition = 'none'
    pose(x)
    el.style.transition = ''
    el.classList.add('dragging')
    el.setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, startX: e.clientX, base: x, moved: false, pts: [{ x, t: e.timeStamp }] }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || e.pointerId !== d.id) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) < 10) return // hysteresis before committing to a drag
    d.moved = true
    const w = cardEl.current!.offsetWidth
    let x = d.base + dx
    // before the answer is shown the card can't be graded: resist instead of stopping hard
    if (!shown) x = (x * w * 0.55) / (w + 0.55 * Math.abs(x))
    pose(x)
    d.pts.push({ x, t: e.timeStamp })
    while (d.pts.length > 2 && e.timeStamp - d.pts[0].t > 100) d.pts.shift()
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const el = cardEl.current!
    if (!d || e.pointerId !== d.id) return
    drag.current = null
    el.classList.remove('dragging')
    if (!d.moved) return
    suppressClick.current = true
    setTimeout(() => (suppressClick.current = false), 60)

    const w = el.offsetWidth
    const x = new DOMMatrix(getComputedStyle(el).transform).m41
    const a = d.pts[0]
    const b = d.pts[d.pts.length - 1]
    const v = b.t > a.t ? ((b.x - a.x) / (b.t - a.t)) * 1000 : 0 // px/s at release
    // momentum projection (exponential decay, 0.998): where the flick would come to rest
    const projected = x + (v / 1000) * (0.998 / (1 - 0.998))

    if (shown && Math.abs(projected) > w * 0.45) {
      const dir = projected > 0 ? 1 : -1
      const finish = async () => {
        await grade(dir > 0 ? 2 : 0) // right = Good, left = Again
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            resetCard()
            el.animate([{ opacity: 0, transform: 'scale(0.98)' }, { opacity: 1, transform: 'none' }], { duration: 200, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
          }),
        )
      }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        void finish()
        return
      }
      const target = dir * (window.innerWidth + w)
      // leave at (at least) the speed it was thrown
      const duration = Math.min(320, Math.max(160, (Math.abs(target - x) / Math.max(Math.abs(v), 1500)) * 1000))
      const anim = el.animate(
        [{ transform: el.style.transform, opacity: 1 }, { transform: `translate3d(${target}px,0,0) rotate(${dir * 14}deg)`, opacity: 0 }],
        { duration, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' },
      )
      anim.onfinish = () => void finish()
    } else {
      // not far enough: spring home (bounce is earned because the gesture carried momentum)
      el.style.transition = 'transform var(--spring-bounce-ms) var(--spring-bounce), --p 220ms ease'
      el.style.transform = 'translate3d(0,0,0) rotate(0deg)'
      el.style.setProperty('--p', '0')
    }
  }

  const grade = async (g: Grade) => {
    const cur = states.get(card.id) ?? newCard(card.id, card.subject, card.topic)
    await db.cards.put(review(cur, g))
    await logActivity()
    setCount((c) => c + 1)
    setShown(false)
    // "again" cards go to the back of this session's queue
    setList((l) => (g === 0 ? [...l.slice(1), card] : l.slice(1)))
  }

  useEffect(() => {
    if (!card) onDone(count)
  }, [card])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card) return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setShown(true)
      }
      if (shown && ['1', '2', '3', '4'].includes(e.key)) grade((Number(e.key) - 1) as Grade)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!card) return null
  const cur = states.get(card.id) ?? newCard(card.id, card.subject, card.topic)
  const labels: [Grade, string][] = [[0, 'Again'], [1, 'Hard'], [2, 'Good'], [3, 'Easy']]

  return (
    <>
      <div className="row between">
        <strong>{list.length} left</strong>
        <button className="btn ghost small-btn" onClick={() => onDone(count)}>End session</button>
      </div>
      <div
        ref={cardEl}
        className="flash card"
        onClick={() => {
          if (!suppressClick.current) setShown(true)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="muted small">{subjects.find((s) => s.id === card.subject)?.short}</div>
        <Md>{card.front}</Md>
        {shown && (
          <>
            <hr />
            <Md>{card.back}</Md>
          </>
        )}
      </div>
      {!shown ? (
        <div className="row center-x"><button className="btn" onClick={() => setShown(true)}>Show answer <span className="kbd">space</span></button></div>
      ) : (
        <div className="grades">
          {labels.map(([g, l]) => (
            <button key={g} className={`btn grade g${g}`} onClick={() => grade(g)}>
              {l}<span className="small">{previewInterval(cur, g)} · {g + 1}</span>
            </button>
          ))}
        </div>
      )}
      {shown && <div className="swipe-hint">Or drag the card: right for Good, left for Again</div>}
    </>
  )
}
