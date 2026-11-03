export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="h-px w-8 bg-blue-600"></span>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
    </div>
  )
}
