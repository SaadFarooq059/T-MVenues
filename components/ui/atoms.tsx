import { cn } from '@/lib/utils'

/**
 * Site-wide heading tokens — one Fraunces style everywhere.
 * Use these instead of one-off font-size / tracking classes.
 */

/** Standard page / section hero (h1) on light backgrounds */
export const headingHero =
  'text-balance font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl'

/** Same scale as headingHero, champagne for dark / photo heroes */
export const headingHeroHome =
  'text-balance font-serif text-4xl leading-[1.05] tracking-tight text-champagne sm:text-5xl md:text-6xl lg:text-7xl'

/** Main section titles (h2) — every component block */
export const headingSection =
  'text-balance font-serif text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl'

/** Nested titles inside cards / steps (h3) */
export const headingCard =
  'font-serif text-2xl leading-tight tracking-tight text-ink md:text-3xl'

export const bodyLead =
  'text-pretty text-base leading-relaxed text-ink/65 sm:text-lg'

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
        'inline-flex max-w-full items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] sm:tracking-[0.28em]',
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
