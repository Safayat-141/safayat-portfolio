import { Suspense } from 'react'
import AdminNav from '@/components/admin-nav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <Suspense fallback={null}>
        <AdminNav />
      </Suspense>
      <main className="max-w-4xl mx-auto">{children}</main>
    </div>
  )
}
