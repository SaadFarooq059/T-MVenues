'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CtaProps = {
  ctaEnabled?: boolean
  text: string
  link: string
  variant?: 'default' | 'link' | 'outline' | 'secondary' | 'ghost' | 'destructive'
}

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled || !cta.text) return null

  const href = cta.link || '#'
  const variant = cta.variant ?? 'default'
  const isLink = variant === 'link'

  const className = cn(
    isLink
      ? 'inline-flex items-center gap-1.5 text-sm font-medium text-gold underline-offset-4 transition-colors hover:text-gold-dark hover:underline'
      : cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'rounded-full bg-gold px-7 text-xs font-semibold uppercase tracking-[0.16em] text-ink hover:bg-gold-dark hover:text-champagne',
        ),
  )

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
