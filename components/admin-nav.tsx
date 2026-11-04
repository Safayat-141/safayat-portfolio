'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { handleLogout } from '@/app/admin/actions'

const TABS: [string, string][] = [
  ['settings', 'Settings'],
  ['education', 'Education'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
]

export default function AdminNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // No navigation on the login screen.
  if (pathname === '/admin/login') return null

  const active = searchParams.get('tab') || 'settings'

  return (
    <nav className="flex flex-wrap justify-between items-center gap-2 mb-6 border-b border-slate-200 pb-3 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex flex-wrap gap-3">
        {TABS.map(([key, label]) => (
          <a
            key={key}
            href={`/admin?tab=${key}`}
            className={
              active === key
                ? 'px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg'
                : 'px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors'
            }
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex gap-2">
        <a href="/" className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">
          View Site
        </a>
        <form action={handleLogout}>
          <button className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors">
            Logout
          </button>
        </form>
      </div>
    </nav>
  )
}
