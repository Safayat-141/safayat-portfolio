'use server'

import { cookies } from 'next/headers'

export async function login(_prev: any, formData: FormData) {
  const password = formData.get('password') as string
  if (password === process.env.ADMIN_PASSWORD) {
    ;(await cookies()).set('admin_session', process.env.ADMIN_SECRET!, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return { success: true }
  }
  return { success: false, error: 'Wrong password' }
}
