export default function Hero({ settings }: any) {
  return (
    <header className="text-center mb-12 pt-8">
      {settings.photo_url ? (
        <img
          src={settings.photo_url}
          alt="Profile"
          className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-blue-100"
        />
      ) : (
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl shadow-sm">
          ?
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{settings.name || 'Your Name'}</h1>
      <p className="text-lg text-slate-600 mb-3">{settings.tagline || 'Mathematics Undergraduate'}</p>
      {settings.location && <p className="text-sm text-slate-500 mb-6">{settings.location}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        {settings.contact_email && (
          <a href={`mailto:${settings.contact_email}`} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
            Email Me
          </a>
        )}
        {settings.linkedin_url && settings.linkedin_url !== '#' && (
          <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
            LinkedIn
          </a>
        )}
      </div>
    </header>
  )
}
