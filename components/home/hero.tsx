'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { headingHeroHome } from '@/components/ui/atoms'
import type { PageHeroData } from '@/lib/contentful'

const AUTO_ADVANCE_MS = 7000
const EASE = [0.22, 1, 0.36, 1] as const

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function SlideCta({
  href,
  label,
}: {
  href: string
  label: string
}) {
  const className =
    'inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-dark hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold'

  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  )
}

/** Full-bleed home hero carousel, driven by Contentful Page Hero entries. */
export function Hero({ slides }: { slides: PageHeroData[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (i: number) => {
      if (slides.length === 0) return
      setActive(((i % slides.length) + slides.length) % slides.length)
    },
    [slides.length],
  )

  const goNext = useCallback(() => goTo(active + 1), [active, goTo])
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    if (paused || reduceMotion || slides.length <= 1) return

    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [active, paused, reduceMotion, goNext, slides.length])

  if (slides.length === 0) return null

  const slide = slides[active]
  const showCta = Boolean(slide.ctaText && slide.ctaLink)
  const imageSrc = slide.heroImageUrl
  const imageAlt = slide.heroImageAlt || slide.heading

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-champagne sm:min-h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null || slides.length <= 1) return
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
        touchStartX.current = null
        if (Math.abs(dx) < 48) return
        if (dx < 0) goNext()
        else goPrev()
      }}
      aria-roledescription="carousel"
      aria-label="Home hero"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduceMotion ? 1 : 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : AUTO_ADVANCE_MS / 1000 + 1.5,
              ease: 'linear',
            }}
          >
            {slide.mobileHeroImageUrl ? (
              <>
                <Image
                  src={slide.mobileHeroImageUrl}
                  alt={slide.mobileHeroImageAlt || imageAlt}
                  fill
                  priority
                  quality={92}
                  sizes="100vw"
                  className="object-cover object-center md:hidden"
                />
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  quality={92}
                  sizes="100vw"
                  className="hidden object-cover object-center md:block"
                />
              </>
            ) : (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                quality={92}
                sizes="100vw"
                className="object-cover object-center"
              />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_80%,rgba(42,37,33,0.78)_0%,rgba(42,37,33,0.35)_45%,rgba(42,37,33,0.2)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-[max(6.5rem,env(safe-area-inset-bottom))] pt-28 sm:px-6 md:pb-24 lg:px-8">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-copy'}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
                exit: { opacity: 0, transition: { duration: 0.25 } },
              }}
            >
              <motion.p
                className="font-serif text-2xl tracking-tight text-champagne sm:text-3xl md:text-4xl"
                variants={{
                  hidden: { y: 18, opacity: 1 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.75, ease: EASE } },
                }}
              >
                T&amp;M Venue Styling
              </motion.p>

              <h1 className={`mt-5 ${headingHeroHome}`}>
                <motion.span
                  className="block text-balance pb-[0.12em]"
                  variants={{
                    hidden: { y: 28, opacity: 1 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.85, ease: EASE },
                    },
                  }}
                >
                  {slide.heading}
                </motion.span>
              </h1>

              {slide.subheading ? (
                <motion.p
                  className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-champagne/75 sm:text-lg"
                  variants={{
                    hidden: { y: 14, opacity: 1 },
                    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
                  }}
                >
                  {slide.subheading}
                </motion.p>
              ) : null}

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                variants={{
                  hidden: { y: 14, opacity: 1 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                {showCta ? (
                  <SlideCta href={slide.ctaLink!} label={slide.ctaText!} />
                ) : null}
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-full border border-champagne/40 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-champagne/90 transition-colors hover:border-gold hover:text-gold"
                >
                  View gallery
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
