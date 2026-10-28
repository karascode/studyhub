import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'

/** Markdown + KaTeX renderer for questions, flashcards and organizer notes. */
export function Md({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

const callout = (cls: string, label: string) =>
  function Callout({ children }: { children?: ReactNode }) {
    return (
      <aside className={`callout ${cls}`}>
        <div className="callout-label">{label}</div>
        <div>{children}</div>
      </aside>
    )
  }

/** Components available inside every MDX note. */
export const mdxComponents = {
  Key: callout('key', 'Key idea'),
  Tip: callout('tip', 'Exam tip'),
  Mistake: callout('mistake', 'Common mistake'),
  Ext: callout('ext', 'Extended only'),
}

/** Animates with transform (scaleX) rather than width, so it stays off the layout path. */
export function ProgressBar({ value, color }: { value: number; color?: string }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="bar" role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100}>
      <div style={{ transform: `scaleX(${v / 100})`, background: color }} />
    </div>
  )
}

const icon = (d: string) =>
  function Icon() {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={d} />
      </svg>
    )
  }
export const SunIcon = icon('M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4L7 17M17 7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z')
export const MoonIcon = icon('M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z')
export const SettingsIcon = icon('M4 7h10M18 7h2M4 17h2M10 17h10M16 4v6M8 14v6')

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>
}
