import { useRef, useState } from 'react'
import { exportAll, importAll, resetAll } from '../lib/db'
import { activeProfile, endSession } from '../lib/auth'

export default function SettingsPage() {
  const [msg, setMsg] = useState('')
  const [confirm, setConfirm] = useState(false)
  const file = useRef<HTMLInputElement>(null)

  const doExport = async () => {
    const blob = new Blob([await exportAll()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `studyhub-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMsg('Backup downloaded.')
  }
  const doImport = async (f: File) => {
    try {
      await importAll(await f.text())
      setMsg('Backup restored.')
    } catch (e) {
      setMsg(`Could not restore: ${(e as Error).message}`)
    }
  }

  return (
    <>
      <h1>Settings</h1>
      <div className="card">
        <h3>Account</h3>
        <div className="row between wrap gap">
          <div className="row gap">
            <span className="avatar big-avatar">{activeProfile()?.name.charAt(0).toUpperCase()}</span>
            <div>
              <strong>{activeProfile()?.name}</strong>
              <div className="muted small">Profile stored on this device only</div>
            </div>
          </div>
          <button
            className="btn ghost"
            onClick={() => {
              endSession()
              window.location.hash = '#/'
              window.location.reload()
            }}
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="card">
        <h3>Your data</h3>
        <p className="muted">Everything — progress, flashcard schedule and your own notes — is stored in this browser on this device. Clearing site data would erase it, so take a backup now and then.</p>
        <div className="row gap wrap">
          <button className="btn" onClick={doExport}>Export backup</button>
          <button className="btn ghost" onClick={() => file.current?.click()}>Restore from backup…</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) doImport(f); e.target.value = '' }} />
        </div>
        {msg && <p className="chip">{msg}</p>}
      </div>
      <div className="card">
        <h3>Reset</h3>
        <p className="muted">Delete all progress and all of your notes from this device. This cannot be undone.</p>
        {confirm ? (
          <div className="row gap">
            <button className="btn danger" onClick={async () => { await resetAll(); setConfirm(false); setMsg('All data cleared.') }}>Yes, delete everything</button>
            <button className="btn ghost" onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        ) : (
          <button className="btn ghost" onClick={() => setConfirm(true)}>Reset all data…</button>
        )}
      </div>
      <div className="card">
        <h3>About</h3>
        <p className="muted">StudyHub works offline once loaded. Notes and questions are original study material written to the public syllabus outlines (Cambridge IGCSE Physics 0625 and International Mathematics 0607). Always check against the current official syllabus and past papers. StudyHub is an independent resource and is not affiliated with or endorsed by Cambridge University Press &amp; Assessment.</p>
        <p className="muted small">Shortcuts: <span className="kbd">/</span> search · <span className="kbd">space</span> reveal flashcard · <span className="kbd">1–4</span> grade card.</p>
      </div>
    </>
  )
}
