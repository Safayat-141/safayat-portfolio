export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <nav className="flex flex-wrap justify-between items-center gap-2 mb-6 border-b border-slate-200 pb-3 bg-white p-4 rounded-xl shadow-sm">
        <div className="flex gap-3">
          <a href="/admin?tab=settings" className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">Settings</a>
          <a href="/admin?tab=education" className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">Education</a>
          <a href="/admin?tab=experience" className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">Experience</a>
          <a href="/admin?tab=skills" className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">Skills</a>
          <a href="/admin?tab=projects" className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">Projects</a>
        </div>
        <div className="flex gap-2">
          <a href="/" className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">View Site</a>
          <a href="/admin/logout" className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition-colors">Logout</a>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto">{children}</main>
    </div>
  )
}
