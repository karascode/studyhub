import type { SupabaseClient } from '@supabase/supabase-js'
import { cloudConfigured } from './identity'
import type { Remote } from './sync'

/** Loaded on demand so people without a cloud account never download the Supabase library. */
let client: Promise<SupabaseClient> | null = null

export function getClient(): Promise<SupabaseClient> {
  if (!cloudConfigured) return Promise.reject(new Error('Cloud accounts are not configured'))
  client ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    }),
  )
  return client
}

/** Set while the login screen is mid-flow, so global auth listeners don't reload the page under it. */
export const authFlow = { busy: false }

export async function realRemote(): Promise<Remote> {
  const c = await getClient()
  const { data } = await c.auth.getSession()
  const userId = data.session?.user.id
  if (!userId) throw new Error('Not signed in')
  return {
    userId,
    async upsert(table, rows, onConflict) {
      const { error } = await c.from(table).upsert(rows, { onConflict })
      if (error) throw new Error(error.message)
    },
    async pull(table, since, limit) {
      let q = c.from(table).select('*').order('synced_at', { ascending: true }).limit(limit)
      if (since) q = q.gte('synced_at', since)
      const { data: rows, error } = await q
      if (error) throw new Error(error.message)
      return rows ?? []
    },
  }
}

/** Delete this account's study data in the cloud (the account itself is kept). */
export async function wipeRemote(): Promise<void> {
  const c = await getClient()
  const { data } = await c.auth.getSession()
  const uid = data.session?.user.id
  if (!uid) throw new Error('Not signed in')
  for (const t of ['attempts', 'cards', 'note_state', 'activity', 'docs']) {
    const { error } = await c.from(t).delete().eq('user_id', uid)
    if (error) throw new Error(error.message)
  }
}

export async function cloudSignOut() {
  try {
    const c = await getClient()
    await c.auth.signOut()
  } catch {
    /* already signed out or offline: the local session is cleared below by the caller */
  }
}
