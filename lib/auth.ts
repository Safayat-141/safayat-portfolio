import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, verifySession } from './session'

export async function isAdmin() {
  const c = await cookies()
  return verifySession(c.get(COOKIE_NAME)?.value)
}

/** Call at the top of every admin Server Action (defense in depth beyond middleware). */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login')
}
