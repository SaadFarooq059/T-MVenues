'use client'

import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import type { GalleryEvent } from '@/lib/contentful'
import { cn } from '@/lib/utils'

/**
 * Shared Gallery Event card — cover image, hover overlay and gold corner
 * accent. Used by the main gallery grid and the "Browse by Colour" section
 * so both read as one system.
 */
export function EventCard({
  event,
  onOpen,
  revealed,
  delayMs = 0,
}: {
  event: GalleryEvent
  onOpen: () => void
  revealed: boolean
  delayMs?: number
}) {
  return (
    <div
      role="listitem"
      className={cn(
        'group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-muted transition-all duration-500',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
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
      {/* Overlay — always legible on touch, reveals on hover with a pointer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-all duration-300 [@media(hover:hover)]:bg-ink/0 [@media(hover:hover)]:bg-none [@media(hover:hover)]:backdrop-blur-0 [@media(hover:hover)]:group-hover:bg-ink/50 [@media(hover:hover)]:group-hover:backdrop-blur-sm">
        <ZoomIn className="h-8 w-8 text-champagne transition-all duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />
        <span className="absolute bottom-4 px-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-champagne transition-all duration-300 [@media(hover:hover)]:static [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
          {event.title}
        </span>
      </div>
      {/* Gold corner accent */}
      <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[3px] border-r-[3px] border-transparent transition-all duration-300 group-hover:h-8 group-hover:w-8 group-hover:border-gold" />
    </div>
  )
}
