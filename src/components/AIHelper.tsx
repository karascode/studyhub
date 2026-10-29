import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { askAI, AIError, fixMath, useAIQuota, type TextResult } from '../lib/ai'
import { findNote, noteText } from '../content'
import { relatedNotes } from '../lib/search'
import { Md } from './ui'

interface Msg {
  role: 'user' | 'assistant'
  content: string
  sources?: { title: string; to: string }[]
  error?: boolean
}

const Sparkle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
  </svg>
)

/** A study helper that answers from the student's own notes, available on every page. */
export default function AIHelper() {
  const loc = useLocation()
  const quota = useAIQuota()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const list = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  const m = /^\/s\/([^/]+)\/n\/([^/]+)/.exec(loc.pathname)
  const current = m ? findNote(m[1], m[2]) : undefined

  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 60)
  }, [open])
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight })
  }, [msgs, busy])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && open && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = async (q: string) => {
    const question = q.trim()
    if (!question || busy) return
    setText('')
    const history = [...msgs.filter((x) => !x.error), { role: 'user' as const, content: question }]
    setMsgs([...msgs, { role: 'user', content: question }])
    setBusy(true)
    try {
      // ground the answer in the note being read, plus the notes that best match the question
      const picked = [...(current ? [current] : []), ...relatedNotes(`${question} ${current?.meta.title ?? ''}`, 3)]
      const unique = picked.filter((n, i) => picked.findIndex((x) => x.subject === n.subject && x.slug === n.slug) === i).slice(0, 3)
      const r = await askAI<TextResult>('chat', {
        messages: history.map((x) => ({ role: x.role, content: x.content })),
        sources: unique.map((n) => ({ title: n.meta.title, text: noteText(n, 2200) })),
      })
      setMsgs((cur) => [...cur, { role: 'assistant', content: r.text, sources: unique.map((n) => ({ title: n.meta.title, to: `/s/${n.subject}/n/${n.slug}` })) }])
    } catch (e) {
      setMsgs((cur) => [...cur, { role: 'assistant', content: e instanceof AIError ? e.message : 'Something went wrong. Try again.', error: true }])
    } finally {
      setBusy(false)
    }
  }

  const suggestions = current
    ? ['Explain this note in simple words', 'Give me a worked example', 'What mistakes should I avoid?']
    : ['Explain density with an example', 'How do I solve a quadratic equation?', 'What is the difference between speed and velocity?']

  return (
    <>
      <button className="ai-fab" data-hidden={open} onClick={() => setOpen(true)} aria-label="Open the AI study helper" tabIndex={open ? -1 : 0}>
        <Sparkle /> <span>Ask AI</span>
      </button>

      <aside className="ai-panel" data-open={open} inert={!open} role="dialog" aria-label="AI study helper">
        <header className="ai-head">
          <div>
            <strong>AI study helper</strong>
            <div className="small muted">{current ? `Reading: ${current.meta.title}` : 'Answers from your notes'}</div>
          </div>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>

        <div className="ai-list" ref={list} aria-live="polite">
          {msgs.length === 0 && (
            <div className="ai-empty">
              <p className="muted">Ask anything about your IGCSE Physics or Maths revision. I answer from your own notes and point to where I found it.</p>
              <div className="ai-chips">
                {suggestions.map((s) => (
                  <button key={s} className="pchip" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {msgs.map((x, i) => (
            <div key={i} className={`ai-msg ${x.role} ${x.error ? 'err' : ''}`}>
              {x.role === 'assistant' && !x.error ? <Md>{fixMath(x.content)}</Md> : <p>{x.content}</p>}
              {x.sources && x.sources.length > 0 && (
                <div className="ai-sources">
                  {x.sources.map((s) => (
                    <Link key={s.to} to={s.to} className="tag" onClick={() => window.innerWidth < 700 && setOpen(false)}>{s.title}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {busy && (
            <div className="ai-msg assistant" aria-label="Thinking">
              <span className="dots"><i /><i /><i /></span>
            </div>
          )}
        </div>

        <form
          className="ai-input"
          onSubmit={(e) => {
            e.preventDefault()
            void send(text)
          }}
        >
          <textarea
            ref={input}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void send(text)
              }
            }}
            placeholder="Ask a question…"
            aria-label="Your question"
            maxLength={800}
          />
          <button className="btn" type="submit" disabled={busy || !text.trim()}>Send</button>
        </form>
        <p className="ai-foot small muted">
          AI can make mistakes: check answers against your notes. Don’t share personal details.
          {quota !== null && <> · {quota} AI requests left today</>}
        </p>
      </aside>
    </>
  )
}
