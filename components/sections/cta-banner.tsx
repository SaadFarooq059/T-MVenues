'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Eyebrow } from '@/components/ui/atoms'

export interface CtaBannerProps {
  eyebrow?: string
  heading?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  images?: string[]
}

const DEFAULT_IMAGES = [
  '/images/gallery-3.png',
  '/images/gallery-5.png',
  '/images/gallery-7.png',
  '/images/gallery-9.png',
]

// Grid cell area classes matching the inspiration mosaic layout
const AREA_CLASSES = [
  'col-start-2 col-end-3 row-start-1 row-end-3',
  'col-start-1 col-end-2 row-start-2 row-end-4',
  'col-start-1 col-end-2 row-start-4 row-end-6',
  'col-start-2 col-end-3 row-start-3 row-end-5',
]

export function CtaBanner({
  eyebrow = 'Begin The Conversation',
  heading = "Let's Style Your Perfect Day",
  body = 'Tell us about your celebration and we will craft a styling scheme made entirely for you.',
  ctaLabel = 'Enquire Now',
  ctaHref = '/contact',
  images = DEFAULT_IMAGES,
}: CtaBannerProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-background text-foreground"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-8 md:py-28">

        {/* ── Left: text ── */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <Eyebrow className="text-gold">{eyebrow}</Eyebrow>

          <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl">
            {heading}
          </h2>

          <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {body}
          </p>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-dark hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* ── Right: staggered mosaic grid ── */}
        <div
          className="grid grid-cols-2 gap-3"
          style={{ gridTemplateRows: '50px 150px 50px 150px 50px' }}
        >
          {images.slice(0, 4).map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-xl shadow-xl ${AREA_CLASSES[i]} transition-all duration-700 ease-out`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: visible ? `${0.1 + i * 0.12}s` : '0s',
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
