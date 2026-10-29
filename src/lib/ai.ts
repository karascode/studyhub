import { useSyncExternalStore } from 'react'
import { getClient } from './cloud'
import { currentIdentity } from './identity'

/**
 * AI features need a cloud account (the model key lives on the server, behind sign-in and daily limits)
 * and are switched on with VITE_AI_ENABLED=true once the "ai" function has been deployed.
 */
export const aiAvailable = () => import.meta.env.VITE_AI_ENABLED === 'true' && !!currentIdentity()?.cloud

/* requests left today, as last reported by the server */
let remaining: number | null = null
const subs = new Set<() => void>()
const setRemaining = (n: number) => {
  remaining = n
  subs.forEach((s) => s())
}
export const useAIQuota = () => useSyncExternalStore((cb) => (subs.add(cb), () => subs.delete(cb)), () => remaining)

export type AIErrorKind = 'offline' | 'auth' | 'quota' | 'busy' | 'setup' | 'other'
export class AIError extends Error {
  constructor(message: string, public kind: AIErrorKind) {
    super(message)
  }
}

export interface MarkResult {
  points: { met: boolean; comment: string }[]
  score: number
  feedback: string
}
export interface Lesson {
  title: string
  intro: string
  steps: { heading: string; body: string }[]
  example: { question: string; solution: string } | null
  mistakes: string[]
  quiz: { q: string; a: string }[]
  recap: string
}
export interface TextResult {
  text: string
}

type Task = 'mark' | 'explain' | 'lesson' | 'chat'

export async function askAI<T>(task: Task, payload: object): Promise<T> {
  if (!navigator.onLine) throw new AIError('You’re offline. AI features need an internet connection.', 'offline')
  const c = await getClient()
  const { data, error } = await c.functions.invoke('ai', { body: { task, payload } })
  if (error) {
    const res = (error as { context?: Response }).context
    if (res && typeof res.json === 'function') {
      const body = await res.json().catch(() => null)
      if (typeof body?.remaining === 'number') setRemaining(body.remaining)
      if (res.status === 404) throw new AIError('AI isn’t switched on yet. The server function still needs to be deployed.', 'setup')
      if (res.status === 401) throw new AIError(body?.error ?? 'Please sign in again to use AI.', 'auth')
      if (res.status === 429) throw new AIError(body?.error ?? 'You’ve used today’s AI requests.', 'quota')
      if (res.status === 503) throw new AIError(body?.error ?? 'The AI service is busy. Try again in a minute.', 'busy')
      throw new AIError(body?.error ?? 'Something went wrong. Try again.', 'other')
    }
    throw new AIError('Can’t reach the AI service. Check your connection.', 'offline')
  }
  if (typeof data?.remaining === 'number') setRemaining(data.remaining)
  return data.result as T
}

/** Models sometimes write maths as \( \) or \[ \]; the renderer expects $ and $$. */
export const fixMath = (s: string) =>
  s.replace(/\\\[([\s\S]+?)\\\]/g, (_, m) => `$$${m}$$`).replace(/\\\((.+?)\\\)/g, (_, m) => `$${m}$`)
