import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, logActivity, type OrgDoc } from '../lib/db'
import { subjects } from '../content/subjects'
import { Empty, Md } from '../components/ui'

const MAX_FILE = 50 * 1024 * 1024
const fmtSize = (n = 0) => (n > 1_048_576 ? `${(n / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`)
const textLike = (f: File) => /^text\//.test(f.type) || /\.(md|txt|markdown)$/i.test(f.name)

export default function OrganizerPage() {
  const [params, setParams] = useSearchParams()
  const [subject, setSubject] = useState('')
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<OrgDoc | 'new' | null>(null)
  const [error, setError] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const docs = useLiveQuery(() => db.docs.orderBy('updated').reverse().toArray(), [], []) ?? []
  const openId = Number(params.get('doc')) || null
  const open = docs.find((d) => d.id === openId) ?? null

  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return docs.filter((d) => {
      if (subject && d.subject !== subject) return false
      const hay = `${d.title} ${d.tags.join(' ')} ${d.text ?? ''} ${d.fileName ?? ''}`.toLowerCase()
      return words.every((w) => hay.includes(w))
    })
  }, [docs, subject, q])

  // sliding indicator for the subject tabs
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null)
  const tabIdx = subject ? subjects.findIndex((s) => s.id === subject) + 1 : 0
  useLayoutEffect(() => {
    const b = tabRefs.current[tabIdx]
    if (b) setInd({ x: b.offsetLeft, w: b.offsetWidth })
  }, [tabIdx, docs.length, editing])

  async function addFiles(files: FileList | File[]) {
    setError('')
    for (const f of Array.from(files)) {
      if (f.size > MAX_FILE) {
        setError(`"${f.name}" is over 50 MB and was skipped.`)
        continue
      }
      const now = Date.now()
      const base: Omit<OrgDoc, 'id'> = {
        subject: subject || subjects[0].id,
        topic: '',
        title: f.name.replace(/\.[^.]+$/, ''),
        kind: 'file',
        file: f,
        mime: f.type,
        fileName: f.name,
        size: f.size,
        tags: [],
        created: now,
        updated: now,
      }
      if (textLike(f)) {
        // plain text files become editable notes
        await db.docs.add({ ...base, kind: 'text', file: undefined, text: await f.text() })
      } else {
        await db.docs.add(base)
      }
      await logActivity()
    }
  }

  if (editing) {
    return (
      <Editor
        doc={editing === 'new' ? null : editing}
        defaultSubject={subject}
        onClose={(id) => {
          setEditing(null)
          if (id) setParams({ doc: String(id) })
        }}
      />
    )
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
    >
      <div className="row between wrap gap">
        <div>
          <h1 className="flush">My notes</h1>
          <p className="muted flush">Your own notes and uploads, organised by subject. Stored only on this device.</p>
        </div>
        <div className="row gap">
          <button className="btn" onClick={() => setEditing('new')}>New note</button>
          <button className="btn ghost" onClick={() => fileInput.current?.click()}>Upload files</button>
          <input ref={fileInput} type="file" multiple hidden accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.txt,.md,.markdown,image/*,application/pdf" onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }} />
        </div>
      </div>
      {error && <p className="chip warn">{error}</p>}

      <div className="row gap wrap filters">
        <div className="tabs" role="tablist">
          {ind && <span className="ind" aria-hidden style={{ width: ind.w, transform: `translateX(${ind.x}px)` }} />}
          <button ref={(el) => { tabRefs.current[0] = el }} role="tab" aria-selected={!subject} className={!subject ? 'on' : ''} onClick={() => setSubject('')}>All</button>
          {subjects.map((s, i) => (
            <button key={s.id} ref={(el) => { tabRefs.current[i + 1] = el }} role="tab" aria-selected={subject === s.id} className={subject === s.id ? 'on' : ''} onClick={() => setSubject(s.id)}>
              {s.short} <span className="muted small">{docs.filter((d) => d.subject === s.id).length}</span>
            </button>
          ))}
        </div>
        <input className="grow" placeholder="Filter by title, tag or text…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter notes" />
      </div>

      <div className={`drop ${dragging ? 'over' : ''}`}>
        {dragging ? 'Drop files to add them' : 'Tip: drag PDFs, images or .txt / .md files anywhere on this page'}
      </div>

      <div className="org">
        <div className="org-list">
          {shown.length === 0 && (
            <Empty>{docs.length ? 'Nothing matches your filter.' : 'No notes yet. Write one or upload a file to get started.'}</Empty>
          )}
          {shown.map((d) => (
            <button key={d.id} className={`org-item ${d.id === openId ? 'on' : ''}`} onClick={() => setParams({ doc: String(d.id) })}>
              <span className="ico" aria-hidden>{d.kind === 'text' ? 'NOTE' : d.mime?.startsWith('image/') ? 'IMG' : d.mime === 'application/pdf' ? 'PDF' : 'FILE'}</span>
              <span className="grow">
                <strong>{d.title}</strong>
                <span className="small muted">
                  {subjects.find((s) => s.id === d.subject)?.short}
                  {d.topic && ` · ${subjects.find((s) => s.id === d.subject)?.topics.find((t) => t.id === d.topic)?.title}`}
                  {d.kind === 'file' && ` · ${fmtSize(d.size)}`}
                </span>
                {d.tags.length > 0 && <span className="tags">{d.tags.map((t) => <span key={t} className="tag">#{t}</span>)}</span>}
              </span>
            </button>
          ))}
        </div>

        <div className="org-view">
          {open ? <Viewer key={open.id} doc={open} onEdit={() => setEditing(open)} onDeleted={() => setParams({})} /> : <Empty>Select a note to view it here.</Empty>}
        </div>
      </div>
    </div>
  )
}

function Viewer({ doc, onEdit, onDeleted }: { doc: OrgDoc; onEdit: () => void; onDeleted: () => void }) {
  const [url, setUrl] = useState<string | null>(null)
  const [confirm, setConfirm] = useState(false)
  useEffect(() => {
    if (!doc.file) return setUrl(null)
    const u = URL.createObjectURL(doc.file)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [doc.id, doc.file])
  useEffect(() => {
    setConfirm(false)
  }, [doc.id])

  const s = subjects.find((x) => x.id === doc.subject)
  return (
    <div className="fade-in">
      <div className="row between wrap gap">
        <h2 className="flush">{doc.title}</h2>
        <div className="row gap">
          <button className="btn ghost small-btn" onClick={onEdit}>{doc.kind === 'text' ? 'Edit' : 'Details'}</button>
          {url && <a className="btn ghost small-btn" href={url} download={doc.fileName}>Download</a>}
          {confirm ? (
            <button className="btn danger small-btn" onClick={async () => { await db.docs.delete(doc.id!); onDeleted() }}>Confirm delete</button>
          ) : (
            <button className="btn ghost small-btn" onClick={() => setConfirm(true)}>Delete</button>
          )}
        </div>
      </div>
      <p className="muted small">
        {s?.title}
        {doc.topic && ` · ${s?.topics.find((t) => t.id === doc.topic)?.title}`} · updated {new Date(doc.updated).toLocaleDateString()}
        {doc.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
      </p>
      {doc.kind === 'text' && <Md>{doc.text || '*Empty note*'}</Md>}
      {doc.kind === 'file' && url && doc.mime?.startsWith('image/') && <img className="preview-img" src={url} alt={doc.title} />}
      {doc.kind === 'file' && url && doc.mime === 'application/pdf' && <iframe className="preview-pdf" src={url} title={doc.title} />}
      {doc.kind === 'file' && url && !doc.mime?.startsWith('image/') && doc.mime !== 'application/pdf' && (
        <Empty>No preview for this file type. Use Download to open it.</Empty>
      )}
    </div>
  )
}

function Editor({ doc, defaultSubject, onClose }: { doc: OrgDoc | null; defaultSubject: string; onClose: (id?: number) => void }) {
  const [title, setTitle] = useState(doc?.title ?? '')
  const [subject, setSubject] = useState(doc?.subject ?? (defaultSubject || subjects[0].id))
  const [topic, setTopic] = useState(doc?.topic ?? '')
  const [tags, setTags] = useState(doc?.tags.join(', ') ?? '')
  const [text, setText] = useState(doc?.text ?? '')
  const [preview, setPreview] = useState(false)
  const isFile = doc?.kind === 'file'
  const sub = subjects.find((s) => s.id === subject)!

  const save = async () => {
    const now = Date.now()
    const data = {
      title: title.trim() || 'Untitled note',
      subject,
      topic,
      tags: tags.split(/[,\s]+/).map((t) => t.replace(/^#/, '').trim().toLowerCase()).filter(Boolean),
      updated: now,
    }
    if (doc?.id) {
      await db.docs.update(doc.id, isFile ? data : { ...data, text })
      onClose(doc.id)
    } else {
      const id = await db.docs.add({ ...data, kind: 'text', text, created: now })
      await logActivity()
      onClose(id)
    }
  }

  return (
    <>
      <h1>{doc ? 'Edit' : 'New'} {isFile ? 'details' : 'note'}</h1>
      <div className="card form">
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Motion graphs summary" autoFocus /></label>
        <div className="row gap wrap">
          <label>Subject
            <select value={subject} onChange={(e) => { setSubject(e.target.value); setTopic('') }}>
              {subjects.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </label>
          <label>Topic
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">General</option>
              {sub.topics.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </label>
          <label className="grow">Tags (comma separated)<input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="formulae, revise-again" /></label>
        </div>
        {!isFile && (
          <>
            <div className="row between">
              <span className="muted small">Markdown supported. Maths: <code>{'$v = s/t$'}</code> or <code>{'$$a=\\frac{v-u}{t}$$'}</code></span>
              <button className="btn ghost small-btn" onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            </div>
            {preview ? <div className="card inset"><Md>{text || '*Nothing to preview*'}</Md></div> : (
              <textarea className="ans tall" value={text} onChange={(e) => setText(e.target.value)} placeholder="Start typing your notes…" />
            )}
          </>
        )}
        <div className="row gap">
          <button className="btn" onClick={save}>Save</button>
          <button className="btn ghost" onClick={() => onClose(doc?.id)}>Cancel</button>
        </div>
      </div>
    </>
  )
}
