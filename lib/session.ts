// Edge-safe session helpers (used by middleware AND server code).
// The cookie holds "<expiry>.<HMAC(expiry, ADMIN_SECRET)>" — never the secret itself.

export const COOKIE_NAME = 'admin_session'
export const SESSION_SECONDS = 60 * 60 * 24 * 7 // 7 days

const enc = new TextEncoder()

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Returns a signed session token, or null if ADMIN_SECRET is not configured. */
export async function createSession(): Promise<string | null> {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return null
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  return `${exp}.${await hmac(String(exp), secret)}`
}

/** Fails closed: returns false if ADMIN_SECRET is missing or the token is invalid/expired. */
export async function verifySession(token?: string | null): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET
  if (!secret || !token) return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig) return false
  const expNum = Number(exp)
  if (!Number.isFinite(expNum) || expNum < Math.floor(Date.now() / 1000)) return false
  return safeEqual(sig, await hmac(exp, secret))
}

/** Constant-time password check. Fails closed if ADMIN_PASSWORD is missing. */
export async function passwordMatches(input: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const [a, b] = await Promise.all([hmac(input, 'pw-check'), hmac(expected, 'pw-check')])
  return safeEqual(a, b)
}
