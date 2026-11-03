import { Card, Badge } from '@/components/ui'

export default function EducationCard({ item }: any) {
  return (
    <Card className="p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900">{item.institution}</h3>
          <p className="text-slate-600 text-sm">{item.degree}</p>
        </div>
        <div className="flex gap-2">
          {item.cgpa && (
            <Badge>CGPA: {item.cgpa}</Badge>
          )}
          <span className="text-xs text-slate-400">{item.expected_grad || ''}</span>
        </div>
      </div>
      {item.details && (
        <p className="mt-3 text-sm text-slate-500 leading-relaxed">{item.details}</p>
      )}
    </Card>
  )
}
