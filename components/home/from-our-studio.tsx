'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow, headingSection, bodyLead } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { GlowingEffect } from '@/components/ui/glowing-effect'

const images = [
  {
    src: '/Home/s7.jpg',
    alt: 'Ceremony aisle lined with florals',
    height: 'h-48',
  },
  {
    src: '/Home/s4.jpg',
    alt: 'Elegant wedding place setting',
    height: 'h-72',
  },
  {
    src: '/Home/s3.jpg',
    alt: 'Ceiling drapery and floral installation',
    height: 'h-72',
  },
  {
    src: '/Home/s1.jpg',
    alt: 'Outdoor marquee wedding at dusk',
    height: 'h-72',
  },
  {
    src: '/Home/s5.jpg  ',
    alt: 'Styled shoot with draped fabric',
    height: 'h-52',
  },
  {
    src: '/Home/s2.jpg',
    alt: 'Floral centrepiece with candlelight',
    height: 'h-52',
  },
  {
    src: '/Home/s6.jpg',
    alt: 'Venue styling detail',
    height: 'h-52',
  },
]

const columns = [
  images.slice(0, 2),
  images.slice(2, 4),
  images.slice(4, 7),
]

function StudioPhoto({
  src,
  alt,
  height,
}: {
  src: string
  alt: string
  height: string
}) {
  return (
    <div className={`group relative ${height}`}>
      <div className="relative h-full w-full rounded-xl p-px transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 30vw, 15vw"
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Split “from our studio” block — copy left, masonry photo grid right.
 */
export function FromOurStudio() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>From Our Studio</Eyebrow>
            <h2 className={`mt-5 ${headingSection}`}>
              Every celebration deserves a room that feels like you
            </h2>
            <p className={`mt-5 max-w-xl ${bodyLead}`}>
              Explore the spaces we&apos;ve dressed — weddings, galas and styled
              shoots composed with drapery, florals and quiet, considered detail.
            </p>
            <Link
              href="/gallery"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-dark hover:text-champagne"
            >
              View Full Gallery
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              Work across{' '}
              <Link href="/services/weddings" className="text-gold hover:underline">
                weddings
              </Link>
              ,{' '}
              <Link
                href="/services/corporate-events"
                className="text-gold hover:underline"
              >
                corporate events
              </Link>{' '}
              and{' '}
              <Link
                href="/services/commercial-shoots"
                className="text-gold hover:underline"
              >
                commercial shoots
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex gap-2 sm:gap-3">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3">
                  {col.map((image) => (
                    <StudioPhoto
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      height={image.height}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
