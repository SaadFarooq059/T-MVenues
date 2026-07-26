'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import type { JourneyImage } from '@/lib/contentful'

const TAGLINE = 'T&M Venue Styling — Crafting Spaces, Creating Memories'

function splitImages(images: JourneyImage[]) {
  const mid = Math.ceil(images.length / 2)
  return [images.slice(0, mid), images.slice(mid)] as const
}

function MarqueeImage({ image, priority }: { image: JourneyImage; priority?: boolean }) {
  return (
    <div className="relative aspect-square w-[clamp(10rem,1rem+28vmin,20rem)] shrink-0 overflow-hidden rounded-[1rem]">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="20rem"
        quality={90}
        priority={priority}
        className="object-cover"
        crossOrigin="anonymous"
      />
    </div>
  )
}

function ImageMarquee({
  images,
  reverse = false,
}: {
  images: JourneyImage[]
  reverse?: boolean
}) {
  const groupClass = reverse
    ? 'marquee-group-reverse flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)]'
    : 'marquee-group flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)]'

  return (
    <div
      className="flex gap-[var(--marquee-gap)] overflow-hidden"
      style={
        {
          '--marquee-duration': '60s',
          transform: 'skewY(-3deg)',
          margin: '2.5rem 0',
        } as React.CSSProperties
      }
    >
      <div className={groupClass}>
        {images.map((img, i) => (
          <MarqueeImage key={img.id} image={img} priority={i === 0 && reverse} />
        ))}
      </div>
      <div className={groupClass} aria-hidden="true">
        {images.map((img) => (
          <MarqueeImage key={`dup-${img.id}`} image={img} />
        ))}
      </div>
    </div>
  )
}

function TaglinePhrases({ duplicate }: { duplicate?: boolean }) {
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <p
          key={`${duplicate ? 'b' : 'a'}-${i}`}
          className="shrink-0 whitespace-nowrap bg-gradient-to-r from-gold-dark via-gold to-[#c4a46a] bg-clip-text text-xl font-bold text-transparent md:text-2xl"
          aria-hidden={duplicate || i > 0 ? true : undefined}
        >
          {TAGLINE}
        </p>
      ))}
    </>
  )
}

function TextMarquee() {
  return (
    <div
      className="flex gap-[var(--marquee-gap)] overflow-hidden border-y-[3px] border-gold py-3"
      style={
        {
          '--marquee-duration': '100s',
          '--marquee-text-duration': '100s',
          transform: 'skewY(-3deg)',
          margin: '2.5rem 0',
        } as React.CSSProperties
      }
    >
      <div className="marquee-text-group flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)]">
        <TaglinePhrases />
      </div>
      <div
        className="marquee-text-group flex min-w-full shrink-0 items-center justify-around gap-[var(--marquee-gap)]"
        aria-hidden="true"
      >
        <TaglinePhrases duplicate />
      </div>
    </div>
  )
}

function SectionHeader() {
  return (
    <div className="mx-auto mb-10 flex max-w-7xl flex-col items-center px-6 text-center md:mb-12">
      <Reveal>
        <Eyebrow>Selected Work</Eyebrow>
        <h2 className={`mt-4 ${headingSection}`}>Our Journey</h2>
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold" aria-hidden="true" />
        <Link
          href="/gallery"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-dark"
        >
          View Full Gallery <span aria-hidden="true">&rarr;</span>
        </Link>
      </Reveal>
    </div>
  )
}

export function FeaturedGallerySkeleton() {
  return (
    <section
      className="overflow-hidden py-16 md:py-24"
      aria-busy="true"
      aria-label="Loading our journey"
    >
      <SectionHeader />
      <div className="container mx-auto space-y-10 px-4" style={{ transform: 'skewY(-3deg)' }}>
        {[0, 1].map((row) => (
          <div key={row} className="flex gap-8 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square w-[clamp(10rem,1rem+28vmin,20rem)] shrink-0 animate-pulse rounded-[1rem] bg-gradient-to-br from-champagne via-cream to-champagne"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export function FeaturedGallery({ images }: { images: JourneyImage[] }) {
  if (images.length === 0) return null

  const [rowA, rowB] = splitImages(images)

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <SectionHeader />

      <div
        className="marquee-track container mx-auto px-4"
        style={{ '--marquee-gap': '2rem' } as React.CSSProperties}
      >
        <ImageMarquee images={rowA} />
        <TextMarquee />
        <ImageMarquee images={rowB} reverse />
      </div>
    </section>
  )
}
