export default function ExperienceCard({ item }: any) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white card-hover">
      <span className="shrink-0 text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full whitespace-nowrap">
        {item.start_date} — {item.end_date || 'Present'}
      </span>
      <div>
        <h3 className="font-bold text-slate-900">{item.role_title}</h3>
        <p className="text-sm text-slate-500">{item.organization}</p>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}
