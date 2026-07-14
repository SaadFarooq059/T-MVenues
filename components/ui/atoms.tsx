import { cn } from '@/lib/utils'

/** Small gold/sage eyebrow label used above headings site-wide. */
export function Eyebrow({
  children,
  className,
  tone = 'gold',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'gold' | 'sage'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em]',
        tone === 'gold' ? 'text-gold' : 'text-sage',
        className,
      )}
    >
      <span
        className={cn(
          'h-px w-8',
          tone === 'gold' ? 'bg-gold' : 'bg-sage',
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}

/** Thin gold "seam line" divider used instead of a plain <hr>. */
export function SeamDivider({
  className,
  align = 'center',
}: {
  className?: string
  align?: 'center' | 'left'
}) {
  return (
    <div
      className={cn('flex items-center gap-2', align === 'center' && 'justify-center', className)}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="size-1.5 rotate-45 border border-gold/70" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  )
}
