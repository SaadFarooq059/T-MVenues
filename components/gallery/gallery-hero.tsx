'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { headingHeroHome } from '@/components/ui/atoms'
import type { PageHeroData } from '@/lib/contentful'

export function GalleryHero({ slides }: { slides: PageHeroData[] }) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    if (slides.length === 0) return

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
  }, [slides.length])

  if (slides.length === 0) return null

  return (
    <div
      className="relative"
      style={{ height: `${slides.length * 100}svh` }}
    >
      {slides.map((slide, index) => {
        const mobileUrl = slide.mobileHeroImageUrl
        const imageAlt = slide.heroImageAlt || slide.heading

        return (
          <section
            key={slide.id}
            className="sticky top-0 h-svh w-full overflow-hidden bg-ink"
            aria-label={slide.heading}
          >
            <div className="absolute inset-0">
              {mobileUrl ? (
                <>
                  <Image
                    src={mobileUrl}
                    alt={slide.mobileHeroImageAlt || imageAlt}
                    fill
                    priority={index === 0}
                    quality={92}
                    sizes="100vw"
                    className="object-cover object-center md:hidden"
                  />
                  <Image
                    src={slide.heroImageUrl}
                    alt={imageAlt}
                    fill
                    priority={index === 0}
                    quality={92}
                    sizes="100vw"
                    className="hidden object-cover object-center md:block"
                  />
                </>
              ) : (
                <Image
                  src={slide.heroImageUrl}
                  alt={imageAlt}
                  fill
                  priority={index === 0}
                  quality={92}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-ink/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/25" />
            </div>

            <div
              className={cn(
                'pointer-events-none absolute inset-0 flex items-center justify-center px-5 pt-24 transition-opacity duration-500 ease-in-out md:pt-28',
                activeSection === index ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div className="max-w-5xl text-center">
                <h1
                  className={`mx-auto max-w-[18ch] text-center ${headingHeroHome} drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]`}
                >
                  {slide.heading}
                </h1>
                {slide.subheading ? (
                  <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-champagne/85 sm:text-lg">
                    {slide.subheading}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-5 text-sm tracking-[0.2em] text-champagne/70 sm:left-8">
              <span className="font-medium text-champagne">
                {String(index + 1).padStart(2, '0')}
              </span>
              {' '}
              / {String(slides.length).padStart(2, '0')}
            </div>
          </section>
        )
      })}
    </div>
  )
}
