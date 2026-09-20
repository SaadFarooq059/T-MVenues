'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { galleryCategories } from '@/lib/content'
import type { GalleryEvent, GalleryEventCategory } from '@/lib/contentful'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { EventCard } from '@/components/gallery/event-card'
import { EventLightbox } from '@/components/gallery/event-lightbox'
import { cn } from '@/lib/utils'

type Category = (typeof galleryCategories)[number]

export function GalleryGridSkeleton() {
  return (
    <section className="bg-background py-20 md:py-28" aria-busy="true" aria-label="Loading gallery">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="h-3 w-28 animate-pulse rounded-full bg-gold/25" />
          <div className="h-10 w-72 max-w-full animate-pulse rounded-sm bg-ink/10" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded-sm bg-ink/5" />
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-ink/5" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] animate-pulse rounded-2xl bg-gradient-to-br from-champagne via-cream to-champagne"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function GalleryGrid({ events }: { events: GalleryEvent[] }) {
  const [active, setActive] = useState<Category>('All')
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [visible, setVisible] = useState<Set<string>>(new Set())

  // Category is optional on Gallery Event — uncategorised events still show
  // under "All", they just never match a specific category chip.
  const availableCategories = useMemo(() => {
    const present = new Set(
      events
        .map((event) => event.category)
        .filter((cat): cat is GalleryEventCategory => cat !== undefined),
    )
    return galleryCategories.filter(
      (cat) => cat === 'All' || present.has(cat as GalleryEventCategory),
    )
  }, [events])

  const filtered = useMemo(
    () =>
      active === 'All'
        ? events
        : events.filter((event) => event.category === active),
    [active, events],
  )

  // Stagger-reveal cards on filter change
  useEffect(() => {
    setVisible(new Set())
    const timers = filtered.map((event, i) =>
      setTimeout(() => {
        setVisible((prev) => new Set([...prev, event.id]))
      }, i * 60),
    )
    return () => timers.forEach(clearTimeout)
  }, [filtered])

  const closeLightbox = useCallback(() => setActiveEventId(null), [])

  const activeEvent =
    activeEventId === null
      ? undefined
      : events.find((event) => event.id === activeEventId)

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        <Reveal className="mb-12 text-center">
          <Eyebrow className="justify-center">Our Portfolio</Eyebrow>
          <h2 className={`mt-4 ${headingSection}`}>
            A Gallery of <span className="text-gold">Dressed Rooms</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink/65">
            Explore a selection of the celebrations, events and shoots we have had the joy of styling.
          </p>
        </Reveal>

        {/* Filter pills */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Gallery categories"
        >
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={cat === active}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200',
                cat === active
                  ? 'border-gold bg-gold text-ink shadow-sm'
                  : 'border-border text-muted-foreground hover:border-gold/50 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-champagne/40 px-6 py-20 text-center">
            <p className="font-serif text-2xl tracking-tight text-ink">
              No images yet
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
              No gallery images are available right now — check back soon, or
              publish entries in Contentful.
            </p>
          </div>
        ) : (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Gallery events"
          >
            {filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                onOpen={() => setActiveEventId(event.id)}
                revealed={visible.has(event.id)}
                delayMs={i * 40}
              />
            ))}
          </div>
        )}
      </div>

      <EventLightbox event={activeEvent} onClose={closeLightbox} />
    </section>
  )
}
