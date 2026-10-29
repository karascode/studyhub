import { useEffect, useMemo, useRef, useState } from 'react'
import { createProfile, listProfiles, startSession, verifyProfile } from '../lib/auth'
import { authFlow, getClient } from '../lib/cloud'
import { cloudConfigured } from '../lib/identity'
import { MoonIcon, SunIcon } from '../components/ui'

type Mode = 'in' | 'up' | 'recover'
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

/** Turn Supabase's messages into something kind and specific. */
function friendly(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'That email and password don’t match'
  if (m.includes('already registered') || m.includes('already been registered')) return 'That email already has an account. Try signing in.'
  if (m.includes('email not confirmed')) return 'Confirm your email first. We sent you a link.'
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many attempts. Wait a minute and try again.'
  if (m.includes('failed to fetch') || m.includes('network')) return 'Can’t reach the server. Check your connection.'
  if (m.includes('password should be')) return 'Use at least 6 characters for your password'
  return msg
}

const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export default function AuthPage({ dark, setDark, recover = false }: { dark: boolean; setDark: (v: boolean) => void; recover?: boolean }) {
  const cloud = cloudConfigured
  const profiles = useMemo(() => (cloud ? [] : listProfiles()), [cloud])
  const [mode, setMode] = useState<Mode>(recover ? 'recover' : profiles.length || cloud ? 'in' : 'up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errorText, setErrorText] = useState('')
  const [errorOpen, setErrorOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const panel = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ;(mode === 'recover' ? pwRef : cloud && mode === 'in' ? emailRef : nameRef).current?.focus()
  }, [])

  const shake = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    panel.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }],
      { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }
  const fail = (msg: string, focus?: HTMLInputElement | null) => {
    authFlow.busy = false
    setNotice('')
    setErrorText(msg)
    setErrorOpen(true)
    setPhase('idle')
    shake()
    focus?.focus()
  }

  const switchMode = (m: Mode) => {
    setMode(m)
    setErrorOpen(false)
    setNotice('')
    setPw('')
    setShow(false)
  }

  const finish = () => {
    setPhase('done')
    // let the check and the exit finish, then load this account's data
    setTimeout(() => {
      window.location.hash = '#/'
      window.location.reload()
    }, 520)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phase !== 'idle') return
    const n = name.trim()
    const em = email.trim()
    setNotice('')

    if (mode === 'recover') {
      if (pw.length < 6) return fail('Use at least 6 characters for your password', pwRef.current)
    } else if (cloud) {
      if (mode === 'up' && !n) return fail('Enter your name to continue', nameRef.current)
      if (!validEmail(em)) return fail('Enter a valid email address', emailRef.current)
      if (!pw) return fail('Enter your password', pwRef.current)
      if (mode === 'up' && pw.length < 6) return fail('Use at least 6 characters for your password', pwRef.current)
    } else {
      if (!n) return fail('Enter your name to continue', nameRef.current)
      if (!pw) return fail('Enter your password', pwRef.current)
      if (mode === 'up' && pw.length < 6) return fail('Use at least 6 characters for your password', pwRef.current)
    }

    setErrorOpen(false)
    setPhase('busy')
    authFlow.busy = true
    try {
      if (cloud) {
        const c = await getClient()
        if (mode === 'recover') {
          const { error } = await c.auth.updateUser({ password: pw })
          if (error) throw error
        } else if (mode === 'up') {
          const { data, error } = await c.auth.signUp({ email: em, password: pw, options: { data: { display_name: n } } })
          if (error) throw error
          if (!data.session) {
            // email confirmation is switched on for this project
            authFlow.busy = false
            setPhase('idle')
            setMode('in')
            setPw('')
            setNotice('Check your email and confirm your address, then sign in.')
            return
          }
        } else {
          const { error } = await c.auth.signInWithPassword({ email: em, password: pw })
          if (error) throw error
        }
        authFlow.busy = true
        return finish()
      }
      const profile = mode === 'up' ? await createProfile(n, pw) : await verifyProfile(n, pw)
      if (!profile) return fail('That name and password don’t match', pwRef.current)
      startSession(profile.id, remember)
      finish()
    } catch (err) {
      fail(friendly((err as Error).message), mode === 'up' && !cloud ? nameRef.current : pwRef.current)
    }
  }

  const forgot = async () => {
    const em = email.trim()
    if (!validEmail(em)) return fail('Enter your email above first, then tap “Forgot password?”', emailRef.current)
    try {
      const c = await getClient()
      const { error } = await c.auth.resetPasswordForEmail(em, { redirectTo: `${location.origin}${location.pathname}` })
      if (error) throw error
      setErrorOpen(false)
      setNotice('If that email has an account, a reset link is on its way.')
    } catch (err) {
      fail(friendly((err as Error).message), emailRef.current)
    }
  }

  const heading = { in: 'Welcome back', up: 'Create your profile', recover: 'Choose a new password' }[mode]
  const sub = {
    in: 'Sign in to pick up where you left off.',
    up: cloud ? 'Your progress then follows you to any device.' : 'It takes ten seconds and stays on this device.',
    recover: 'Pick something you’ll remember. You’ll be signed in right after.',
  }[mode]
  const submitLabel = { in: 'Sign in', up: 'Create account', recover: 'Save password' }[mode]
  const busyLabel = { in: 'Signing in…', up: 'Creating…', recover: 'Saving…' }[mode]

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
            <li>{cloud ? 'Your progress syncs across all your devices' : 'Your progress and notes stay on this device'}</li>
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
                <h1>{heading}</h1>
                <p className="muted">{sub}</p>
              </div>
            </div>

            {mode !== 'recover' ? (
              <div className="seg" data-mode={mode} role="tablist" aria-label="Sign in or create account">
                <span className="seg-ind" aria-hidden />
                <button type="button" role="tab" aria-selected={mode === 'in'} onClick={() => switchMode('in')}>Sign in</button>
                <button type="button" role="tab" aria-selected={mode === 'up'} onClick={() => switchMode('up')}>Create account</button>
              </div>
            ) : (
              <span />
            )}

            <div className="collapse" data-open={!cloud && mode === 'in' && profiles.length > 0} inert={!(!cloud && mode === 'in' && profiles.length > 0)}>
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
              {/* name: identifies a device profile, or personalises a new cloud account */}
              {mode !== 'recover' && (
                <div className={cloud ? 'collapse in-form' : ''} data-open={cloud ? mode === 'up' : undefined} inert={cloud ? mode !== 'up' : undefined}>
                  <div className={cloud ? 'collapse-inner' : ''}>
                    <label className="field">
                      <span>Name</span>
                      <input
                        ref={nameRef}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          setErrorOpen(false)
                        }}
                        autoComplete={cloud ? 'name' : 'username'}
                        autoCapitalize="words"
                        spellCheck={false}
                        placeholder={mode === 'up' ? 'What should we call you?' : 'Your name'}
                      />
                    </label>
                  </div>
                </div>
              )}
              {cloud && mode !== 'recover' && (
                <label className="field">
                  <span>Email</span>
                  <input
                    ref={emailRef}
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setErrorOpen(false)
                    }}
                    autoComplete="email"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="you@example.com"
                  />
                </label>
              )}
              <label className="field">
                <span className="row between">
                  {mode === 'recover' ? 'New password' : 'Password'}
                  {cloud && mode === 'in' && (
                    <button type="button" className="linkish" onClick={forgot}>Forgot password?</button>
                  )}
                </span>
                <div className="pw">
                  <input
                    ref={pwRef}
                    type={show ? 'text' : 'password'}
                    value={pw}
                    onChange={(e) => {
                      setPw(e.target.value)
                      setErrorOpen(false)
                    }}
                    autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
                    placeholder={mode === 'in' ? 'Your password' : 'At least 6 characters'}
                  />
                  <button type="button" className="icon-btn pw-toggle" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>
                    <Eye off={show} />
                  </button>
                </div>
              </label>

              <div className="collapse" data-open={errorOpen || !!notice}>
                <div className="collapse-inner">
                  <p className={notice && !errorOpen ? 'auth-notice' : 'auth-error'} role={errorOpen ? 'alert' : 'status'}>{errorOpen ? errorText : notice}</p>
                </div>
              </div>

              {!cloud && (
                <label className="check remember">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Keep me signed in on this device
                </label>
              )}

              <button className={`btn auth-submit ${phase !== 'idle' ? 'busy' : ''} ${phase === 'done' ? 'ok' : ''}`} type="submit" disabled={phase !== 'idle'}>
                <span className="submit-content" key={`${phase}-${mode}`}>
                  {phase === 'busy' ? (
                    <><Spinner /> {busyLabel}</>
                  ) : phase === 'done' ? (
                    <><Check /> You’re in</>
                  ) : (
                    submitLabel
                  )}
                </span>
              </button>
            </form>

            <p className="auth-note small muted">
              {cloud
                ? 'Your study data is private to your account and also kept on this device so the app works offline.'
                : 'Profiles live only in this browser. Your password is hashed here and never sent anywhere.'}
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
