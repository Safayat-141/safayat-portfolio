import { cookies } from 'next/headers'

export async function isAdmin() {
  const c = await cookies()
  return c.get('admin_session')?.value === process.env.ADMIN_SECRET
}

export async function logout() {
  const c = await cookies()
  c.delete('admin_session')
}
