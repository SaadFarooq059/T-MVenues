'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const slides = [
  {
    headline: 'Every Room',
    sub: 'Tells a Story',
    img: '/images/hero-1.png',
    alt: 'Styled wedding venue interior',
  },
  {
    headline: 'Crafted With',
    sub: 'Quiet Intention',
    img: '/images/gallery-1.png',
    alt: 'Ceremony styling with florals',
  },
  {
    headline: 'Spaces That',
    sub: 'Feel Like You',
    img: '/images/hero-2.png',
    alt: 'Fully styled celebration venue',
  },
]

export function GalleryHero() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const section = Math.floor(window.scrollY / viewportHeight)
      setActiveSection(Math.min(Math.max(section, 0), slides.length - 1))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.visualViewport?.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.visualViewport?.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div
      className="relative"
      style={{ height: `${slides.length * 100}svh` }}
    >
      {slides.map((slide, index) => (
        <section
          key={slide.img}
          className="sticky top-0 h-svh w-full overflow-hidden bg-ink"
          aria-label={slide.headline}
        >
          <div className="absolute inset-0">
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/25" />
          </div>

          <div
            className={cn(
              'pointer-events-none absolute inset-0 flex items-center justify-center px-5 pt-24 transition-opacity duration-500 ease-in-out md:pt-28',
              activeSection === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            <h2 className="text-center font-serif leading-none tracking-tight text-champagne drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
              <span className="block text-[clamp(2.25rem,8vw,7rem)]">
                {slide.headline}
              </span>
              <span className="mt-1 block text-[clamp(2.25rem,8vw,7rem)] italic text-gold">
                {slide.sub}
              </span>
            </h2>
          </div>

          <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-5 font-mono text-sm tracking-[0.2em] text-champagne/70 sm:left-8">
            <span className="font-medium text-champagne">
              0{index + 1}
            </span>
            {' '}
            / 0{slides.length}
          </div>
        </section>
      ))}
    </div>
  )
}
