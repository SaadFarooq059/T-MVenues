'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryEvent } from '@/lib/contentful'
import { cn } from '@/lib/utils'

/**
 * Shared photo slider for a single Gallery Event — used by both the main
 * gallery grid and the "Browse by Colour" section so they behave identically.
 * CSS transitions only, no Motion.
 */
export function EventLightbox({
  event,
  onClose,
}: {
  event?: GalleryEvent
  onClose: () => void
}) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const open = event !== undefined
  const photos = event?.photos ?? []
  const photo = photos[photoIndex]

  // Start each event at its first photo
  useEffect(() => {
    setPhotoIndex(0)
  }, [event?.id])

  const goPrev = useCallback(() => {
    if (photos.length === 0) return
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  const goNext = useCallback(() => {
    if (photos.length === 0) return
    setPhotoIndex((i) => (i + 1) % photos.length)
  }, [photos.length])

  // Keyboard nav
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, goNext, goPrev])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keep the index in range if the photo set changes
  useEffect(() => {
    if (photos.length === 0) return
    if (photoIndex >= photos.length) setPhotoIndex(0)
  }, [photos.length, photoIndex])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
        open ? 'visible bg-ink/95 opacity-100' : 'invisible opacity-0',
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={event?.title ?? 'Event lightbox'}
    >
      {event && photo && (
        <div
          className={cn(
            'relative flex max-h-[90vh] max-w-5xl flex-col items-center transition-all duration-300',
            open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute right-2 top-2 z-10 flex size-11 items-center justify-center rounded-full bg-champagne/10 text-champagne ring-1 ring-champagne/20 transition-colors hover:bg-champagne hover:text-ink md:-right-12 md:top-0"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Image */}
          <div className="relative max-h-[58svh] w-full overflow-hidden rounded-xl sm:max-h-[75vh]">
            <Image
              src={photo.url}
              alt={photo.alt}
              width={1200}
              height={800}
              className="mx-auto max-h-[58svh] w-auto rounded-xl object-contain sm:max-h-[75vh]"
              crossOrigin="anonymous"
            />
          </div>

          {/* Caption — category is optional, so the eyebrow is conditional */}
          <div className="mt-4 text-center">
            {event.category ? (
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-gold">
                {event.category}
              </p>
            ) : null}
            <p className={cn(
              'text-pretty font-serif text-lg text-champagne',
              event.category && 'mt-1',
            )}>
              {event.title}
            </p>
          </div>

          {/* Prev / Next — within this event's photos only */}
          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
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
                  goNext()
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
            {photoIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  )
}
