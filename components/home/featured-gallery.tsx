'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import type { GalleryImage } from '@/lib/content'

/* Split images into two rows */
const splitImages = (images: GalleryImage[]) => {
  const mid = Math.ceil(images.length / 2)
  return [images.slice(0, mid), images.slice(mid)]
}

function MarqueeImage({ image }: { image: GalleryImage }) {
  return (
    <div className="relative aspect-square w-[clamp(9rem,20vmin,18rem)] shrink-0 overflow-hidden rounded-2xl">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="18rem"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        crossOrigin="anonymous"
      />
    </div>
  )
}

export function FeaturedGallery({ images }: { images: GalleryImage[] }) {
  const [rowA, rowB] = splitImages(images)

  return (
    <section className="overflow-hidden py-24 md:py-32">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="mt-4 max-w-xl text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl">
              A glimpse of the rooms we&apos;ve dressed
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-2.5 text-sm font-medium uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              View Full Gallery <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ── Marquee wrapper — skewed as a whole ── */}
      <div
        className="marquee-track mt-14 flex flex-col gap-5"
        style={{ '--marquee-gap': '1.25rem' } as React.CSSProperties}
      >
        {/* Row 1 — scrolls left */}
        <div
          className="-skew-y-2 flex gap-[var(--marquee-gap,1.25rem)] overflow-hidden"
          aria-hidden="false"
        >
          <div className="marquee-group flex shrink-0 items-center gap-[var(--marquee-gap,1.25rem)]"
            style={{ '--marquee-duration': '55s' } as React.CSSProperties}
          >
            {rowA.map((img) => <MarqueeImage key={img.id} image={img} />)}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="marquee-group flex shrink-0 items-center gap-[var(--marquee-gap,1.25rem)]"
            style={{ '--marquee-duration': '55s' } as React.CSSProperties}
            aria-hidden="true"
          >
            {rowA.map((img) => <MarqueeImage key={`a2-${img.id}`} image={img} />)}
          </div>
        </div>

        {/* Text ticker */}
        <div
          className="flex gap-[var(--marquee-gap,1.25rem)] overflow-hidden border-y border-gold/40 py-3"
          style={{ '--marquee-text-duration': '90s' } as React.CSSProperties}
        >
          <div className="marquee-text-group flex shrink-0 items-center gap-12 whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="font-serif text-xl italic text-gold/80">
                T&amp;M Venue Styling &mdash; Crafting Spaces, Creating Memories
              </span>
            ))}
          </div>
          <div className="marquee-text-group flex shrink-0 items-center gap-12 whitespace-nowrap" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="font-serif text-xl italic text-gold/80">
                T&amp;M Venue Styling &mdash; Crafting Spaces, Creating Memories
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div
          className="skew-y-2 flex gap-[var(--marquee-gap,1.25rem)] overflow-hidden"
          aria-hidden="false"
        >
          <div className="marquee-group-reverse flex shrink-0 items-center gap-[var(--marquee-gap,1.25rem)]"
            style={{ '--marquee-duration': '55s' } as React.CSSProperties}
          >
            {rowB.map((img) => <MarqueeImage key={img.id} image={img} />)}
          </div>
          <div className="marquee-group-reverse flex shrink-0 items-center gap-[var(--marquee-gap,1.25rem)]"
            style={{ '--marquee-duration': '55s' } as React.CSSProperties}
            aria-hidden="true"
          >
            {rowB.map((img) => <MarqueeImage key={`b2-${img.id}`} image={img} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
