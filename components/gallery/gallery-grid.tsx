'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { galleryCategories, galleryImages, type GalleryImage } from '@/lib/content'
import { Eyebrow } from '@/components/ui/atoms'
import { cn } from '@/lib/utils'

type Category = (typeof galleryCategories)[number]

export function GalleryGrid() {
  const [active, setActive] = useState<Category>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState<Set<string>>(new Set())

  const filtered = active === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === active)

  // Stagger-reveal cards on filter change
  useEffect(() => {
    setVisible(new Set())
    filtered.forEach((img, i) => {
      setTimeout(() => {
        setVisible((prev) => new Set([...prev, img.id]))
      }, i * 60)
    })
  }, [active])

  // Keyboard nav for lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => ((i ?? 0) + 1) % filtered.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length)
    },
    [lightboxIndex, filtered.length],
  )
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const lightboxImage: GalleryImage | undefined =
    lightboxIndex !== null ? filtered[lightboxIndex] : undefined

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <Eyebrow>Our Portfolio</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
            A Gallery of <span className="text-gold">Dressed Rooms</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Explore a selection of the celebrations, events and shoots we have had the joy of styling.
          </p>
        </div>

        {/* Filter pills */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Gallery categories"
        >
          {galleryCategories.map((cat) => (
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

        {/* Grid */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Gallery images"
        >
          {filtered.map((img, i) => (
            <div
              key={img.id}
              role="listitem"
              className={cn(
                'group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-muted transition-all duration-500',
                visible.has(img.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
              )}
              style={{ transitionDelay: `${i * 40}ms` }}
              onClick={() => setLightboxIndex(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i) } }}
              tabIndex={0}
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                crossOrigin="anonymous"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/0 backdrop-blur-0 transition-all duration-300 group-hover:bg-ink/50 group-hover:backdrop-blur-sm">
                <ZoomIn className="h-8 w-8 text-champagne opacity-0 transition-all duration-300 group-hover:opacity-100" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-champagne opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {img.category}
                </span>
              </div>
              {/* Gold corner accent */}
              <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[3px] border-r-[3px] border-transparent transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:border-gold" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox — CSS transitions only, no Motion */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
          lightboxIndex !== null ? 'visible bg-ink/95 opacity-100' : 'invisible opacity-0',
        )}
        onClick={() => setLightboxIndex(null)}
        role="dialog"
        aria-modal="true"
        aria-label={lightboxImage?.alt ?? 'Image lightbox'}
      >
        {lightboxImage && (
          <div
            className={cn(
              'relative flex max-h-[90vh] max-w-5xl flex-col items-center transition-all duration-300',
              lightboxIndex !== null ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:-right-12 md:top-0"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image */}
            <div className="relative max-h-[75vh] w-full overflow-hidden rounded-xl">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={1200}
                height={800}
                className="max-h-[75vh] w-auto rounded-xl object-contain mx-auto"
                crossOrigin="anonymous"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-gold">
                {lightboxImage.category}
              </p>
              <p className="mt-1 text-pretty text-sm text-champagne/70">
                {lightboxImage.alt}
              </p>
            </div>

            {/* Prev / Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => ((i ?? 0) - 1 + filtered.length) % filtered.length) }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:left-0 md:-translate-x-12"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => ((i ?? 0) + 1) % filtered.length) }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:right-0 md:translate-x-12"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Counter */}
            <p className="mt-3 text-xs tracking-widest text-champagne/40">
              {(lightboxIndex ?? 0) + 1} / {filtered.length}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
