'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { HeroSlide } from '@/lib/content'

const AUTO_ADVANCE_MS = 6000

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((i: number) => setActive(i), [])

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % slides.length)
    }, AUTO_ADVANCE_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused, slides.length])

  const slide = slides[active]

  return (
    <section
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-ink text-champagne md:min-h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured styling work"
    >
      {/* Slides */}
      <AnimatePresence>
          <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduceMotion ? 1 : 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: AUTO_ADVANCE_MS / 1000 + 2, ease: 'linear' }}
          >
            <Image
              src={slide.image || '/placeholder.svg'}
              alt={slide.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              crossOrigin="anonymous"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/30"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Text anchored bottom-left */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-[max(5rem,env(safe-area-inset-bottom))] sm:px-6 md:pb-28">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-text'}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <motion.span
                className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-gold"
                variants={{
                  hidden: { opacity: 1, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
              >
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                {slide.eyebrow}
              </motion.span>

              <h1 className="mt-5 font-serif text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-7xl lg:text-8xl">
                {slide.headline.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      variants={{
                        hidden: { y: '30%', opacity: 1 },
                        show: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.9,
                            delay: 0.15 + i * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mt-6 max-w-md text-pretty leading-relaxed text-champagne/80"
                variants={{
                  hidden: { opacity: 1, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } },
                }}
              >
                {slide.subtext}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 1, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.65 } },
                }}
              >
                <Link
                  href={slide.ctaHref}
                  className="mt-9 inline-flex items-center justify-center rounded-sm bg-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-dark hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {slide.ctaLabel}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Vertical "fabric swatch" navigator */}
      <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
            aria-current={i === active}
            className="group relative flex items-center"
          >
            <span
              className={cn(
                'block w-2.5 rounded-full border border-champagne/50 transition-all duration-500',
                i === active
                  ? 'h-16 border-gold bg-gold'
                  : 'h-8 bg-champagne/20 group-hover:h-10 group-hover:border-champagne',
              )}
            />
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-sm text-champagne/70 md:flex">
        <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>
        <span className="h-px w-6 bg-champagne/40" />
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
