export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Button({ className = '', children, type = 'button', ...props }: any) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus-ring disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input({ className = '', ...props }: any) {
  return (
    <input
      className={cn(
        'flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
        className
      )}
      {...props}
    />
  )
}

export function Textarea({ className = '', ...props }: any) {
  return (
    <textarea
      className={cn(
        'flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
        className
      )}
      {...props}
    />
  )
}

export function Card({ className = '', children }: any) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm p-6 card-hover', className)}>
      {children}
    </div>
  )
}

export function Badge({ className = '', children }: any) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100', className)}>
      {children}
    </span>
  )
}
