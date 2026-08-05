'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type BentoCard = {
  title: string
  description?: string
  href?: string
}

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    aria-hidden="true"
    className={cn('size-5 text-gold', className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -left-2.5 -top-2.5" />
    <PlusIcon className="absolute -right-2.5 -top-2.5" />
    <PlusIcon className="absolute -bottom-2.5 -left-2.5" />
    <PlusIcon className="absolute -right-2.5 -bottom-2.5" />
  </>
)

function PlusCard({
  className,
  title,
  description,
  href,
}: BentoCard & { className?: string }) {
  const body = (
    <div className="relative z-10 space-y-2">
      <h3 className="font-serif text-xl leading-tight tracking-tight text-ink md:text-2xl">
        {title}
      </h3>
      {description ? (
        <p className="text-pretty text-sm leading-relaxed text-ink/65 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )

  return (
    <div
      className={cn(
        'relative flex min-h-[9rem] flex-col justify-between rounded-lg border border-dashed border-gold/40 bg-background p-5 transition-colors sm:min-h-[11rem] sm:p-6',
        href && 'hover:border-gold/70',
        className,
      )}
    >
      <CornerPlusIcons />
      {href ? (
        <Link href={href} className="block">
          {body}
        </Link>
      ) : (
        body
      )}
    </div>
  )
}

/**
 * Asymmetric “plus corner” bento grid with a right-aligned closing statement.
 * Expects five cards; extra cards flow into the grid without breaking the layout.
 */
export default function RuixenBentoCards({
  eyebrow,
  cards,
  heading,
  body,
  className,
}: {
  eyebrow?: string
  cards: BentoCard[]
  heading: string
  body?: string
  className?: string
}) {
  if (cards.length === 0) return null

  const spans = [
    'lg:col-span-3 lg:row-span-2',
    'lg:col-span-2 lg:row-span-2',
    'lg:col-span-4',
    'lg:col-span-2',
    'lg:col-span-2',
  ]

  return (
    <section className={cn('border-y border-gold/15 bg-cream', className)}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-8 md:py-24">
        {eyebrow ? (
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.18em] text-gold sm:tracking-[0.28em]">
            {eyebrow}
          </p>
        ) : null}

        <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {cards.map((card, i) => (
            <PlusCard
              key={card.title}
              {...card}
              className={spans[i % spans.length]}
            />
          ))}
        </div>

        <div className="ml-auto mt-10 max-w-2xl text-left sm:text-right lg:-mt-16">
          <h2 className="text-balance font-serif text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          {body ? (
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink/65 sm:text-lg">
              {body}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
