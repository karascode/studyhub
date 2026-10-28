import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SubjectPage from './pages/SubjectPage'
import NotePage from './pages/NotePage'
import PracticePage from './pages/PracticePage'
import FlashcardsPage from './pages/FlashcardsPage'
import OrganizerPage from './pages/OrganizerPage'
import SearchPage from './pages/SearchPage'
import SettingsPage from './pages/SettingsPage'
import AuthPage from './pages/AuthPage'
import { activeProfile } from './lib/auth'
import { useStreak } from './lib/progress'
import { MoonIcon, SettingsIcon, SunIcon } from './components/ui'

const nav = [
  ['/', 'Dashboard'],
  ['/s/physics', 'Physics'],
  ['/s/maths', 'Maths'],
  ['/practice', 'Practice'],
  ['/flashcards', 'Flashcards'],
  ['/organizer', 'My notes'],
] as const

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const first = useRef(true)
  useEffect(() => {
    if (dark) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable */
    }
    // crossfade colours on a user toggle, not on first load
    if (first.current) {
      first.current = false
      return
    }
    const el = document.documentElement
    el.classList.add('theme-anim')
    const t = setTimeout(() => el.classList.remove('theme-anim'), 320)
    return () => clearTimeout(t)
  }, [dark])
  return [dark, setDark] as const
}

export default function App() {
  const [dark, setDark] = useTheme()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const loc = useLocation()
  const streak = useStreak()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loc.pathname])

  // scroll edge: the toolbar only gets a divider once content slides under it
  useEffect(() => {
    const bar = document.querySelector('.topbar')
    const onScroll = () => bar?.classList.toggle('scrolled', window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // "/" focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) {
        e.preventDefault()
        document.getElementById('global-search')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!activeProfile()) return <AuthPage dark={dark} setDark={setDark} />

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="topbar">
        <NavLink to="/" className="brand">
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width="26" height="26" /> StudyHub
        </NavLink>
        <nav className="nav" aria-label="Main">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </nav>
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault()
            if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
          }}
        >
          <input id="global-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search  ( / )" aria-label="Search" />
        </form>
        <span className="chip" title="Days in a row you've studied">{streak} day streak</span>
        <button className="icon-btn theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle dark mode" title="Toggle dark mode">
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <NavLink to="/settings" className="icon-btn" aria-label="Settings" title="Settings"><SettingsIcon /></NavLink>
      </header>
      <main id="main" className="page">
        <div key={loc.pathname} className="route">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s/:subject" element={<SubjectPage />} />
          <Route path="/s/:subject/n/:slug" element={<NotePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/organizer" element={<OrganizerPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
        </div>
      </main>
    </>
  )
}
