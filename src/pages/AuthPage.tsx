import { useEffect, useMemo, useRef, useState } from 'react'
import { createProfile, listProfiles, startSession, verifyProfile } from '../lib/auth'
import { MoonIcon, SunIcon } from '../components/ui'

type Mode = 'in' | 'up'
type Phase = 'idle' | 'busy' | 'done'

const FORMULAS = [
  { t: 'F = ma', x: '9%', y: '12%', d: '0s' },
  { t: 'E = ½mv²', x: '58%', y: '9%', d: '-3s' },
  { t: 'sin θ = opp / hyp', x: '12%', y: '23%', d: '-5s' },
  { t: 'p = mv', x: '68%', y: '24%', d: '-2s' },
  { t: 'Q = mcΔθ', x: '8%', y: '74%', d: '-6s' },
  { t: 'x = (−b ± √(b² − 4ac)) / 2a', x: '26%', y: '86%', d: '-4s' },
  { t: 'ρ = m / V', x: '72%', y: '74%', d: '-1s' },
]

const Eye = ({ off }: { off?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
)
const Spinner = () => (
  <svg className="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="9" opacity="0.25" />
    <path d="M21 12a9 9 0 00-9-9" />
  </svg>
)
const Check = () => (
  <svg className="draw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export default function AuthPage({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const profiles = useMemo(listProfiles, [])
  const [mode, setMode] = useState<Mode>(profiles.length ? 'in' : 'up')
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errorText, setErrorText] = useState('')
  const [errorOpen, setErrorOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const panel = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const shake = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    panel.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }],
      { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }
  const fail = (msg: string, focus?: HTMLInputElement | null) => {
    setErrorText(msg)
    setErrorOpen(true)
    setPhase('idle')
    shake()
    focus?.focus()
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    setErrorOpen(false)
    setPw('')
    setShow(false)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phase !== 'idle') return
    const n = name.trim()
    if (!n) return fail('Enter your name to continue', nameRef.current)
    if (!pw) return fail('Enter your password', pwRef.current)
    if (mode === 'up' && pw.length < 6) return fail('Use at least 6 characters for your password', pwRef.current)
    setErrorOpen(false)
    setPhase('busy')
    try {
      const profile = mode === 'up' ? await createProfile(n, pw) : await verifyProfile(n, pw)
      if (!profile) return fail('That name and password don’t match', pwRef.current)
      startSession(profile.id, remember)
      setPhase('done')
      // let the check and the exit finish, then load this profile's data
      setTimeout(() => {
        window.location.hash = '#/'
        window.location.reload()
      }, 520)
    } catch (err) {
      fail((err as Error).message, nameRef.current)
    }
  }

  return (
    <div className="auth">
      <aside className="auth-hero">
        <div className="hero-art" aria-hidden>
          {FORMULAS.map((f) => (
            <span key={f.t} className="formula" style={{ left: f.x, top: f.y, animationDelay: f.d }}>
              {f.t}
            </span>
          ))}
        </div>
        <div className="hero-brand">
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width="28" height="28" /> StudyHub
        </div>
        <div className="hero-copy">
          <h2>Revise smarter.<br />Even offline.</h2>
          <ul>
            <li>In-depth notes, quizzes and flashcards for IGCSE Physics and Maths</li>
            <li>Spaced repetition that brings back what you forget</li>
            <li>Your progress and notes stay on this device</li>
          </ul>
        </div>
        <div className="hero-foot">
          <span><i style={{ background: '#2563eb' }} />Physics 0625</span>
          <span><i style={{ background: '#0f766e' }} />Mathematics 0607</span>
        </div>
      </aside>

      <main className="auth-main">
        <button className="icon-btn theme-btn auth-theme" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className={`auth-panel ${phase === 'done' ? 'leaving' : ''}`} ref={panel}>
          <div className="auth-stack">
            <div className="auth-brand">
              <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width="26" height="26" /> StudyHub
            </div>

            <div>
              <div className="auth-head fade-in" key={mode}>
                <h1>{mode === 'in' ? 'Welcome back' : 'Create your profile'}</h1>
                <p className="muted">{mode === 'in' ? 'Sign in to pick up where you left off.' : 'It takes ten seconds and stays on this device.'}</p>
              </div>
            </div>

            <div className="seg" data-mode={mode} role="tablist" aria-label="Sign in or create account">
              <span className="seg-ind" aria-hidden />
              <button type="button" role="tab" aria-selected={mode === 'in'} onClick={() => switchMode('in')}>Sign in</button>
              <button type="button" role="tab" aria-selected={mode === 'up'} onClick={() => switchMode('up')}>Create account</button>
            </div>

            <div className="collapse" data-open={mode === 'in' && profiles.length > 0} inert={!(mode === 'in' && profiles.length > 0)}>
              <div className="collapse-inner">
                <div className="auth-label">On this device</div>
                <div className="pchips">
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`pchip ${name.trim().toLowerCase() === p.name.toLowerCase() ? 'on' : ''}`}
                      onClick={() => {
                        setName(p.name)
                        setErrorOpen(false)
                        pwRef.current?.focus()
                      }}
                    >
                      <span className="avatar">{p.name.charAt(0).toUpperCase()}</span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <form className="auth-form" onSubmit={submit} noValidate>
              <label className="field">
                <span>Name</span>
                <input
                  ref={nameRef}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setErrorOpen(false)
                  }}
                  autoComplete="username"
                  autoCapitalize="words"
                  spellCheck={false}
                  placeholder={mode === 'up' ? 'What should we call you?' : 'Your name'}
                />
              </label>
              <label className="field">
                <span>Password</span>
                <div className="pw">
                  <input
                    ref={pwRef}
                    type={show ? 'text' : 'password'}
                    value={pw}
                    onChange={(e) => {
                      setPw(e.target.value)
                      setErrorOpen(false)
                    }}
                    autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
                    placeholder={mode === 'up' ? 'At least 6 characters' : 'Your password'}
                  />
                  <button type="button" className="icon-btn pw-toggle" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>
                    <Eye off={show} />
                  </button>
                </div>
              </label>

              <div className="collapse" data-open={errorOpen}>
                <div className="collapse-inner">
                  <p className="auth-error" role="alert">{errorText}</p>
                </div>
              </div>

              <label className="check remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Keep me signed in on this device
              </label>

              <button className={`btn auth-submit ${phase !== 'idle' ? 'busy' : ''} ${phase === 'done' ? 'ok' : ''}`} type="submit" disabled={phase !== 'idle'}>
                <span className="submit-content" key={`${phase}-${mode}`}>
                  {phase === 'busy' ? (
                    <><Spinner /> {mode === 'up' ? 'Creating…' : 'Signing in…'}</>
                  ) : phase === 'done' ? (
                    <><Check /> You’re in</>
                  ) : mode === 'up' ? (
                    'Create account'
                  ) : (
                    'Sign in'
                  )}
                </span>
              </button>
            </form>

            <p className="auth-note small muted">
              Profiles live only in this browser. Your password is hashed here and never sent anywhere.
            </p>
            <p className="auth-note small muted legal">
              Independent study resource. Not affiliated with or endorsed by Cambridge University Press &amp; Assessment. IGCSE is a trademark of its owner.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
