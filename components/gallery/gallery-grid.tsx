'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { galleryCategories } from '@/lib/content'
import type { GalleryEvent, GalleryEventCategory } from '@/lib/contentful'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
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
  const [photoIndex, setPhotoIndex] = useState(0)
  const [visible, setVisible] = useState<Set<string>>(new Set())

  const availableCategories = useMemo(() => {
    const present = new Set(events.map((event) => event.category))
    return galleryCategories.filter(
      (cat) => cat === 'All' || present.has(cat as GalleryEventCategory),
    )
  }, [events])

  const filtered = active === 'All'
    ? events
    : events.filter((event) => event.category === active)

  const activeEvent =
    activeEventId === null
      ? undefined
      : filtered.find((event) => event.id === activeEventId) ??
        events.find((event) => event.id === activeEventId)

  const lightboxPhotos = activeEvent?.photos ?? []
  const lightboxPhoto = lightboxPhotos[photoIndex]

  // Stagger-reveal cards on filter change
  useEffect(() => {
    const nextFiltered =
      active === 'All'
        ? events
        : events.filter((event) => event.category === active)

    setVisible(new Set())
    nextFiltered.forEach((event, i) => {
      setTimeout(() => {
        setVisible((prev) => new Set([...prev, event.id]))
      }, i * 60)
    })
  }, [active, events])

  const closeLightbox = useCallback(() => {
    setActiveEventId(null)
    setPhotoIndex(0)
  }, [])

  const openEvent = useCallback((eventId: string) => {
    setActiveEventId(eventId)
    setPhotoIndex(0)
  }, [])

  const goPrevPhoto = useCallback(() => {
    if (lightboxPhotos.length === 0) return
    setPhotoIndex((i) => (i - 1 + lightboxPhotos.length) % lightboxPhotos.length)
  }, [lightboxPhotos.length])

  const goNextPhoto = useCallback(() => {
    if (lightboxPhotos.length === 0) return
    setPhotoIndex((i) => (i + 1) % lightboxPhotos.length)
  }, [lightboxPhotos.length])

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!activeEventId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNextPhoto()
      if (e.key === 'ArrowLeft') goPrevPhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeEventId, closeLightbox, goNextPhoto, goPrevPhoto])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = activeEventId !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeEventId])

  // Keep photo index in range if photos change
  useEffect(() => {
    if (lightboxPhotos.length === 0) return
    if (photoIndex >= lightboxPhotos.length) setPhotoIndex(0)
  }, [lightboxPhotos.length, photoIndex])

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
                'rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200',
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
              <div
                key={event.id}
                role="listitem"
                className={cn(
                  'group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-muted transition-all duration-500',
                  visible.has(event.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => openEvent(event.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openEvent(event.id)
                  }
                }}
                tabIndex={0}
                aria-label={`View ${event.title}`}
              >
                <Image
                  src={event.coverImageUrl}
                  alt={event.coverImageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  crossOrigin="anonymous"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/0 backdrop-blur-0 transition-all duration-300 group-hover:bg-ink/50 group-hover:backdrop-blur-sm">
                  <ZoomIn className="h-8 w-8 text-champagne opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  <span className="px-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-champagne opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {event.title}
                  </span>
                </div>
                {/* Gold corner accent */}
                <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[3px] border-r-[3px] border-transparent transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:border-gold" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox — CSS transitions only, no Motion */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
          activeEventId !== null ? 'visible bg-ink/95 opacity-100' : 'invisible opacity-0',
        )}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label={activeEvent?.title ?? 'Event lightbox'}
      >
        {activeEvent && lightboxPhoto && (
          <div
            className={cn(
              'relative flex max-h-[90vh] max-w-5xl flex-col items-center transition-all duration-300',
              activeEventId !== null ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:-right-12 md:top-0"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image */}
            <div className="relative max-h-[75vh] w-full overflow-hidden rounded-xl">
              <Image
                src={lightboxPhoto.url}
                alt={lightboxPhoto.alt}
                width={1200}
                height={800}
                className="mx-auto max-h-[75vh] w-auto rounded-xl object-contain"
                crossOrigin="anonymous"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-gold">
                {activeEvent.category}
              </p>
              <p className="mt-1 text-pretty font-serif text-lg text-champagne">
                {activeEvent.title}
              </p>
            </div>

            {/* Prev / Next — within this event's photos only */}
            {lightboxPhotos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrevPhoto()
                  }}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:left-0 md:-translate-x-12"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNextPhoto()
                  }}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:right-0 md:translate-x-12"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            {/* Counter */}
            <p className="mt-3 text-xs tracking-widest text-champagne/40">
              {photoIndex + 1} / {lightboxPhotos.length}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
