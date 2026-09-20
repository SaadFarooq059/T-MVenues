'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  GALLERY_COLOURS,
  type GalleryColour,
  type GalleryEvent,
} from '@/lib/contentful'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { EventCard } from '@/components/gallery/event-card'
import { EventLightbox } from '@/components/gallery/event-lightbox'
import { cn } from '@/lib/utils'

type ColourFilter = 'All' | GalleryColour

/**
 * "Browse by Colour" — the same event cards as the main gallery, filtered by
 * the event's "colourThemes". Renders nothing when no event is tagged.
 */
export function ColourGallery({ events }: { events: GalleryEvent[] }) {
  const [active, setActive] = useState<ColourFilter>('All')
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [visible, setVisible] = useState<Set<string>>(new Set())

  // Only offer chips for colours that at least one event carries
  const availableColours = useMemo<ColourFilter[]>(() => {
    const present = new Set(events.flatMap((event) => event.colourThemes))
    return ['All', ...GALLERY_COLOURS.filter((colour) => present.has(colour))]
  }, [events])

  const filtered = useMemo(
    () =>
      active === 'All'
        ? events
        : events.filter((event) => event.colourThemes.includes(active)),
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

  // A chip that disappears from the CMS shouldn't strand the filter
  useEffect(() => {
    if (active !== 'All' && !availableColours.includes(active)) setActive('All')
  }, [active, availableColours])

  const closeLightbox = useCallback(() => setActiveEventId(null), [])

  // Nothing tagged yet — render no section at all rather than an empty state
  if (events.length === 0) return null

  const activeEvent =
    activeEventId === null
      ? undefined
      : events.find((event) => event.id === activeEventId)

  return (
    <section className="border-t border-border/60 bg-champagne/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        <Reveal className="mb-12 text-center">
          <Eyebrow className="justify-center">Inspiration</Eyebrow>
          <h2 className={`mt-4 ${headingSection}`}>
            Browse by <span className="text-gold">Colour</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink/65">
            Choose a palette and see the celebrations we have styled around it —
            from soft ivories to deep, rustic tones.
          </p>
        </Reveal>

        {/* Colour chips */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter events by colour"
        >
          {availableColours.map((colour) => (
            <button
              key={colour}
              type="button"
              onClick={() => setActive(colour)}
              aria-pressed={colour === active}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200',
                colour === active
                  ? 'border-gold bg-gold text-ink shadow-sm'
                  : 'border-border bg-background/60 text-muted-foreground hover:border-gold/50 hover:text-foreground',
              )}
            >
              {colour}
            </button>
          ))}
        </div>

        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Events by colour"
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
      </div>

      {/* Same slider the main gallery uses */}
      <EventLightbox event={activeEvent} onClose={closeLightbox} />
    </section>
  )
}
