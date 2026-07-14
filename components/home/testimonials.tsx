'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { Testimonial } from '@/lib/content'

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for parallax on the large number
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { damping: 25, stiffness: 200 })
  const y = useSpring(mouseY, { damping: 25, stiffness: 200 })
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  const goNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % testimonials.length),
    [testimonials.length],
  )
  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(goNext, 6000)
    return () => clearInterval(t)
  }, [paused, goNext])

  const current = testimonials[activeIndex]

  return (
    <section className="bg-ink text-champagne overflow-hidden">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-5xl px-6 py-24 md:py-32"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Oversized index number bleeding off left edge */}
        <motion.div
          className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 select-none text-[22rem] font-bold leading-none tracking-tighter text-champagne/[0.04] md:text-[28rem]"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 1, scale: 0.85, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 1, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Asymmetric layout */}
        <div className="relative flex">
          {/* Left column — vertical label + progress line */}
          <div className="hidden flex-col items-center justify-center border-r border-champagne/15 pr-12 md:flex">
            <span
              className="font-mono text-xs uppercase tracking-widest text-champagne/40"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              Testimonials
            </span>
            <div className="relative mt-8 h-32 w-px bg-champagne/15">
              <motion.div
                className="absolute left-0 top-0 w-full origin-top bg-gold"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Centre — main content */}
          <div className="min-w-0 flex-1 py-4 md:pl-16">
            {/* Event type badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex + '-badge'}
                initial={{ opacity: 1, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-champagne/20 px-3 py-1 font-mono text-xs text-champagne/50">
                  <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {current.eventType}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote — word-by-word reveal */}
            <div className="relative mb-12 min-h-[130px] md:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex + '-quote'}
                  className="font-serif text-2xl font-light leading-[1.2] tracking-tight text-champagne sm:text-3xl md:text-4xl lg:text-5xl"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      className="mr-[0.25em] inline-block"
                      variants={{
                        hidden: { opacity: 1, y: 20, rotateX: 60 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 1,
                          y: -8,
                          transition: { duration: 0.15, delay: i * 0.015 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row + navigation */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex + '-author'}
                  initial={{ opacity: 1, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 1, y: -16 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="h-px bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="font-medium text-champagne">{current.name}</p>
                    <p className="mt-0.5 text-sm uppercase tracking-[0.15em] text-gold">
                      {current.eventType}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-champagne/20 transition-colors hover:border-gold"
                >
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="relative z-10 text-champagne transition-colors group-hover:text-ink">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-champagne/20 transition-colors hover:border-gold"
                >
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={{ x: '100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="relative z-10 text-champagne transition-colors group-hover:text-ink">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker — repeating names */}
        <div className="pointer-events-none absolute -bottom-8 left-0 right-0 overflow-hidden opacity-[0.06]">
          <motion.div
            className="flex whitespace-nowrap text-5xl font-bold tracking-tight text-champagne"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.name).join(' • ')} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
