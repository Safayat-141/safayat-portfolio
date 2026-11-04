'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME, SESSION_SECONDS, createSession, passwordMatches } from '@/lib/session'

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')

  if (await passwordMatches(password)) {
    const token = await createSession()
    if (token) {
      const c = await cookies()
      c.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_SECONDS,
      })
      redirect('/admin?tab=settings')
    }
  }

  // Wrong password (or server not configured): slow down brute-force attempts.
  await new Promise((resolve) => setTimeout(resolve, 1000))
  redirect('/admin/login?error=1')
}
