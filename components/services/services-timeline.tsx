'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import type { Service } from '@/lib/content'

export function ServicesTimeline({ services }: { services: Service[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineTrackRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)
  const [trackHeight, setTrackHeight] = useState(0)

  // Measure the track height once on mount
  useEffect(() => {
    if (lineTrackRef.current) {
      setTrackHeight(lineTrackRef.current.getBoundingClientRect().height)
    }
  }, [])

  // Drive line fill via scroll position — works in Firefox and iframes
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current
      if (!el || trackHeight === 0) return
      const { top, height } = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // How far we've scrolled through the section (0 → 1)
      const progress = Math.min(1, Math.max(0, (-top + windowH * 0.2) / (height * 0.9)))
      setLineHeight(progress * trackHeight)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [trackHeight])

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative mx-auto max-w-7xl px-6 pb-24">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="flex flex-col gap-8 pt-16 md:flex-row md:gap-16 md:pt-28"
          >
            {/* ── Sticky left: number + title ── */}
            <div className="flex items-start gap-4 md:sticky md:top-32 md:w-64 md:shrink-0 md:self-start md:flex-col md:gap-3">
              {/* Timeline dot + vertical rail */}
              <div className="relative z-40 mt-1 shrink-0">
                {/* Vertical line track (only on md+) */}
                <div
                  ref={index === 0 ? lineTrackRef : undefined}
                  className="absolute left-1/2 top-10 hidden h-[calc(100vh)] w-px -translate-x-1/2 bg-gold/15 md:block"
                  aria-hidden="true"
                />
                <div className="flex size-10 items-center justify-center rounded-full bg-champagne shadow-[0_0_0_4px_rgba(176,141,87,0.15)] ring-1 ring-gold/30">
                  <div className="size-3 rounded-full bg-gold" />
                </div>
              </div>
              {/* Service number + name */}
              <div>
                <span className="font-mono text-xs font-medium tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 font-serif text-2xl leading-tight tracking-tight text-ink md:text-3xl">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* ── Right: photo + description + included ── */}
            <div className="flex-1 space-y-6 pb-4 md:pl-4">
              {/* Single photo */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-[0_0_24px_rgba(34,42,53,0.08),0_1px_1px_rgba(0,0,0,0.04),0_0_0_1px_rgba(34,42,53,0.04),0_16px_68px_rgba(47,48,55,0.05)]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Description */}
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>

              {/* Included list */}
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">
                  What&apos;s included
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/60">
                        <Check className="size-3 text-gold" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* ── Scroll-driven gold progress line — spans the full left rail ── */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 hidden w-px overflow-hidden md:block"
          style={{ left: 'calc(1.5rem + 1.25rem)' }}
          aria-hidden="true"
        >
          {/* Track */}
          <div className="absolute inset-0 bg-gold/15" />
          {/* Fill */}
          <div
            className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-gold via-gold to-gold/20 transition-[height] duration-150 ease-out"
            style={{ height: lineHeight }}
          />
        </div>
      </div>
    </div>
  )
}
