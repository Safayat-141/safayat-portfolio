import { Card } from '@/components/ui'

export default function ProjectCard({ item }: any) {
  return (
    <Card className="p-0 overflow-hidden flex flex-col h-full">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
          No image
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {(item.tools || []).map((t: string) => (
            <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2 text-xs">
          {item.github_link && (
            <a href={item.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline underline-offset-2">GitHub</a>
          )}
          {item.live_link && (
            <a href={item.live_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline underline-offset-2">Live</a>
          )}
        </div>
      </div>
    </Card>
  )
}
