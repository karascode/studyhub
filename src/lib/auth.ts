/**
 * Device-local profiles. There is no server: a profile is a name + salted password hash kept in
 * localStorage, and each profile owns its own IndexedDB database. This keeps study data separate
 * for people who share a device. It is a convenience gate, not protection against someone with
 * access to the browser's storage.
 */

export interface Profile {
  id: string
  name: string
  salt: string
  hash: string
  /** 1 = PBKDF2-SHA256, 0 = fallback when WebCrypto is unavailable (non-secure context) */
  v: 0 | 1
  dbName: string
  created: number
}

const PROFILES = 'studyhub.profiles'
const SESSION = 'studyhub.session'
const ITERATIONS = 150_000

const enc = new TextEncoder()
const b64 = (buf: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(buf)))
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

function read(): Profile[] {
  try {
    return JSON.parse(localStorage.getItem(PROFILES) ?? '[]')
  } catch {
    return []
  }
}
function write(list: Profile[]) {
  try {
    localStorage.setItem(PROFILES, JSON.stringify(list))
  } catch {
    /* storage unavailable */
  }
}

async function derive(password: string, salt: Uint8Array, v: 0 | 1): Promise<string> {
  if (v === 1 && globalThis.crypto?.subtle) {
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: salt as BufferSource, iterations: ITERATIONS, hash: 'SHA-256' }, key, 256)
    return b64(bits)
  }
  // fallback (insecure context): iterated FNV-1a, just enough to avoid storing the password in plain text
  let h = 2166136261
  const data = [...salt, ...enc.encode(password)]
  for (let i = 0; i < 20_000; i++) for (const b of data) h = Math.imul(h ^ b, 16777619) >>> 0
  return h.toString(16)
}

export const listProfiles = (): Profile[] => read().sort((a, b) => a.created - b.created)

export async function createProfile(name: string, password: string): Promise<Profile> {
  const list = read()
  if (list.some((p) => p.name.toLowerCase() === name.toLowerCase())) throw new Error('That name is already taken on this device')
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const v: 0 | 1 = globalThis.crypto?.subtle ? 1 : 0
  const id = crypto.randomUUID?.() ?? String(Date.now())
  const profile: Profile = {
    id,
    name,
    salt: b64(salt),
    hash: await derive(password, salt, v),
    v,
    // the first profile adopts the data that existed before profiles were introduced
    dbName: list.length === 0 ? 'studyhub' : `studyhub-${id}`,
    created: Date.now(),
  }
  write([...list, profile])
  return profile
}

export async function verifyProfile(name: string, password: string): Promise<Profile | null> {
  const p = read().find((x) => x.name.toLowerCase() === name.toLowerCase())
  if (!p) {
    // spend similar time so a missing name is not distinguishable by speed
    await derive(password, new Uint8Array(16), 1)
    return null
  }
  const hash = await derive(password, unb64(p.salt), p.v)
  return hash === p.hash ? p : null
}

/** "Remember me" keeps the session across restarts; otherwise it ends when the tab closes. */
export function startSession(id: string, remember: boolean) {
  try {
    sessionStorage.removeItem(SESSION)
    localStorage.removeItem(SESSION)
    ;(remember ? localStorage : sessionStorage).setItem(SESSION, id)
  } catch {
    /* storage unavailable */
  }
}

export function endSession() {
  try {
    sessionStorage.removeItem(SESSION)
    localStorage.removeItem(SESSION)
  } catch {
    /* storage unavailable */
  }
}

export function activeProfile(): Profile | null {
  try {
    const id = sessionStorage.getItem(SESSION) ?? localStorage.getItem(SESSION)
    return read().find((p) => p.id === id) ?? null
  } catch {
    return null
  }
}

/** Name of the IndexedDB database for whoever is signed in. */
export const activeDbName = () => activeProfile()?.dbName ?? 'studyhub'
