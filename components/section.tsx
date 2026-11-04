import { cn } from '@/components/ui'

export default function Section({ children, className = '', id }: any) {
  return (
    <section id={id} className={cn('max-w-5xl mx-auto px-4 py-12 scroll-mt-16', className)}>
      {children}
    </section>
  )
}
