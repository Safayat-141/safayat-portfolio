import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: any) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const c = await cookies()
    const session = c.get('admin_session')?.value
    if (session !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
