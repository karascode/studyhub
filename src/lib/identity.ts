import { activeProfile } from './auth'

/**
 * Who is using the app right now. With Supabase configured this is the cloud account (read from the
 * session that supabase-js keeps in localStorage, so it is available synchronously at startup);
 * otherwise it is a device-local profile. Deliberately free of any import of the Supabase library.
 */
export const cloudConfigured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

export interface Identity {
  id: string
  name: string
  email?: string
  /** IndexedDB database holding this person's data on this device */
  dbName: string
  cloud: boolean
}

function storedCloudUser(): { id: string; email?: string; user_metadata?: { display_name?: string } } | null {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!
      if (k.startsWith('sb-') && k.endsWith('-auth-token')) {
        const v = JSON.parse(localStorage.getItem(k) ?? 'null')
        const u = v?.user ?? v?.currentSession?.user
        if (u?.id) return u
      }
    }
  } catch {
    /* storage unavailable or corrupt */
  }
  return null
}

export function currentIdentity(): Identity | null {
  if (cloudConfigured) {
    const u = storedCloudUser()
    if (!u) return null
    return {
      id: u.id,
      email: u.email,
      name: u.user_metadata?.display_name?.trim() || u.email?.split('@')[0] || 'Student',
      dbName: `studyhub-u-${u.id}`,
      cloud: true,
    }
  }
  const p = activeProfile()
  return p ? { id: p.id, name: p.name, dbName: p.dbName, cloud: false } : null
}

export const activeDbName = () => currentIdentity()?.dbName ?? 'studyhub'
