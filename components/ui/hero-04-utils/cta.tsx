import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export type CtaProps = {
  ctaEnabled?: boolean
  text?: string
  link?: string
  variant?: 'default' | 'link'
}

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled || !cta.text) return null

  const href = cta.link || '#'
  const isLink = (cta.variant ?? 'default') === 'link'

  const className = isLink
    ? 'inline-flex min-h-11 items-center gap-1.5 text-sm font-medium uppercase tracking-[0.14em] text-gold underline-offset-4 transition-colors hover:text-gold-dark hover:underline'
    : 'inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne sm:text-sm'

  const content = (
    <>
      {cta.text}
      {isLink ? <ArrowRight className="size-3.5" aria-hidden /> : null}
    </>
  )

  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  )
}
