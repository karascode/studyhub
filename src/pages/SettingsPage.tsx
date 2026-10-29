import { useEffect, useRef, useState } from 'react'
import { exportAll, importAll, importLegacy, legacyCount, resetAll } from '../lib/db'
import { endSession } from '../lib/auth'
import { cloudSignOut, wipeRemote } from '../lib/cloud'
import { currentIdentity } from '../lib/identity'
import { queueSync, syncNow, useSyncState } from '../lib/sync'

const ago = (t: number | null) => {
  if (!t) return 'not yet'
  const s = Math.round((Date.now() - t) / 1000)
  if (s < 10) return 'just now'
  if (s < 60) return `${s} seconds ago`
  if (s < 3600) return `${Math.round(s / 60)} minutes ago`
  return new Date(t).toLocaleString()
}

export default function SettingsPage() {
  const me = currentIdentity()
  const sync = useSyncState()
  const [msg, setMsg] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [legacy, setLegacy] = useState(0)
  const file = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (me?.cloud) legacyCount().then(setLegacy)
  }, [me?.cloud])

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
      queueSync(300)
      setMsg('Backup restored.')
    } catch (e) {
      setMsg(`Could not restore: ${(e as Error).message}`)
    }
  }
  const signOut = async () => {
    if (me?.cloud) await cloudSignOut()
    else endSession()
    window.location.hash = '#/'
    window.location.reload()
  }

  return (
    <>
      <h1>Settings</h1>
      <div className="card">
        <h3>Account</h3>
        <div className="row between wrap gap">
          <div className="row gap">
            <span className="avatar big-avatar">{me?.name.charAt(0).toUpperCase()}</span>
            <div>
              <strong>{me?.name}</strong>
              <div className="muted small">{me?.cloud ? me.email : 'Profile stored on this device only'}</div>
            </div>
          </div>
          <button className="btn ghost" onClick={signOut}>Sign out</button>
        </div>
        {me?.cloud && (
          <div className="row between wrap gap sync-row">
            <span className="muted small">
              {sync.status === 'syncing' ? 'Syncing…' : sync.status === 'offline' ? 'Offline: changes will sync when you reconnect' : sync.status === 'error' ? `Sync paused: ${sync.error}` : `Synced ${ago(sync.last)}`}
            </span>
            <button className="btn ghost small-btn" disabled={sync.status === 'syncing'} onClick={() => void syncNow()}>Sync now</button>
          </div>
        )}
      </div>

      {me?.cloud && legacy > 0 && (
        <div className="card">
          <h3>Progress from before accounts</h3>
          <p className="muted">This device holds {legacy} study record{legacy > 1 ? 's' : ''} from the old on-device profile. Add them to your account so they sync everywhere.</p>
          <button
            className="btn"
            onClick={async () => {
              const n = await importLegacy()
              setLegacy(0)
              queueSync(300)
              setMsg(`Added ${n} record${n === 1 ? '' : 's'} to your account.`)
            }}
          >
            Add to my account
          </button>
        </div>
      )}

      <div className="card">
        <h3>Your data</h3>
        <p className="muted">
          {me?.cloud
            ? 'Your progress, flashcard schedule and written notes sync to your account and are also kept on this device so the app works offline. Uploaded files stay on this device only, so back them up.'
            : 'Everything (progress, flashcard schedule and your own notes) is stored in this browser on this device. Clearing site data would erase it, so take a backup now and then.'}
        </p>
        <div className="row gap wrap">
          <button className="btn" onClick={doExport}>Export backup</button>
          <button className="btn ghost" onClick={() => file.current?.click()}>Restore from backup…</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) doImport(f); e.target.value = '' }} />
        </div>
        {msg && <p className="chip">{msg}</p>}
      </div>
      <div className="card">
        <h3>Reset</h3>
        <p className="muted">
          {me?.cloud ? 'Delete all progress and written notes from this device and from your account. Your login stays. This cannot be undone.' : 'Delete all progress and all of your notes from this device. This cannot be undone.'}
        </p>
        {confirm ? (
          <div className="row gap">
            <button
              className="btn danger"
              onClick={async () => {
                try {
                  if (me?.cloud) await wipeRemote()
                  await resetAll()
                  setMsg('All data cleared.')
                } catch (e) {
                  setMsg(`Could not clear everything: ${(e as Error).message}`)
                }
                setConfirm(false)
              }}
            >
              Yes, delete everything
            </button>
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
