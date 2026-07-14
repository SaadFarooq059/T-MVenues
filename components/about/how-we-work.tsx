'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Eyebrow } from '@/components/ui/atoms'

const SLIDE_DURATION = 6000

const steps = [
  {
    step: '01',
    title: 'Enquiry',
    subtitle: 'The First Conversation',
    description:
      'Tell us about your day, your venue and the feeling you want to create. We listen first — no templates, no rush. Every enquiry is read personally and answered with care.',
    image: '/images/gallery-1.png',
    alt: 'Wedding ceremony aisle lined with florals leading to a floral arch',
  },
  {
    step: '02',
    title: 'Consultation',
    subtitle: 'Your Vision, Designed',
    description:
      'We design a bespoke styling scheme with mood boards, material selections and a clear plan tailored entirely to you. This is where your day starts to take shape.',
    image: '/images/service-weddings.png',
    alt: 'Romantic wedding reception with ivory drapery and floral centrepieces',
  },
  {
    step: '03',
    title: 'Styling Day',
    subtitle: 'The Transformation',
    description:
      'Our team arrives early and dresses your venue with precision and care, handling every last detail so you never have to. You simply arrive to something beautiful.',
    image: '/images/gallery-3.png',
    alt: 'Ceiling silk drapery with hanging floral installation over a dance floor',
  },
  {
    step: '04',
    title: 'The Reveal',
    subtitle: 'The Moment We Live For',
    description:
      'You step into a space transformed — composed, warm, and unmistakably yours. This is the moment we work toward from that very first conversation.',
    image: '/images/gallery-7.png',
    alt: 'Lush wedding floral centrepiece with candlelight and gold accents',
  },
]

export function HowWeWork() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return
      setTransitioning(true)
      setProgress(0)
      setTimeout(() => {
        setCurrent(index)
        setTimeout(() => setTransitioning(false), 50)
      }, 400)
    },
    [transitioning, current]
  )

  const goNext = useCallback(() => {
    goTo((current + 1) % steps.length)
  }, [current, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + steps.length) % steps.length)
  }, [current, goTo])

  // Auto-advance + progress bar
  useEffect(() => {
    if (paused) return
    setProgress(0)
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + 100 / (SLIDE_DURATION / 50)))
    }, 50)
    intervalRef.current = setInterval(goNext, SLIDE_DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [current, paused, goNext])

  const slide = steps[current]

  return (
    <section
      className="overflow-hidden bg-background py-20 text-foreground md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14">
          <Eyebrow className="justify-start">How We Work</Eyebrow>
          <h2 className="mt-5 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
            From first hello to the{' '}
            <em className="not-italic text-gold">final reveal</em>
          </h2>
        </div>

        {/* Main card */}
        <div           className="grid gap-0 overflow-hidden rounded-2xl border border-border md:grid-cols-2">

          {/* Left: text */}
          <div className="flex flex-col justify-between bg-champagne/30 p-8 md:p-12">
            <div>
              {/* Step counter */}
              <div
                className="mb-8 flex items-center gap-3 transition-all duration-400"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <span className="h-px w-8 bg-gold/50" /              >
                <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
                  {String(current + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-serif text-4xl leading-tight text-foreground md:text-5xl"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? 'translateY(16px)' : 'translateY(0)',
                  transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
                }}
              >
                {slide.title}
              </h3>

              {/* Subtitle */}
              <p
                className="mt-2 font-sans text-sm uppercase tracking-[0.18em] text-gold"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? 'translateY(16px)' : 'translateY(0)',
                  transition: 'opacity 0.4s ease 0.08s, transform 0.4s ease 0.08s',
                }}
              >
                {slide.subtitle}
              </p>

              {/* Description */}
              <p
                className="mt-6 text-base leading-relaxed text-muted-foreground"
                style={{
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? 'translateY(16px)' : 'translateY(0)',
                  transition: 'opacity 0.4s ease 0.12s, transform 0.4s ease 0.12s',
                }}
              >
                {slide.description}
              </p>
            </div>

            {/* Nav arrows */}
            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={goPrev}
                aria-label="Previous step"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/50 transition-all duration-200 hover:border-gold hover:text-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Next step"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/50 transition-all duration-200 hover:border-gold hover:text-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative min-h-[380px] overflow-hidden md:min-h-[500px]">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
              style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'scale(1.04)' : 'scale(1)',
                transition: 'opacity 0.4s ease, transform 0.7s ease',
              }}
              crossOrigin="anonymous"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />

            {/* Decorative corner frames */}
            <span className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-gold/60" />
            <span className="absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-gold/60" />
          </div>
        </div>

        {/* Progress bars */}
        <div className="mt-6 flex gap-2">
          {steps.map((s, i) => (
            <button
              key={s.step}
              onClick={() => goTo(i)}
              aria-label={`Go to step ${s.step}`}
              className="group flex flex-1 flex-col gap-1.5"
            >
              <div className="h-px w-full overflow-hidden bg-border rounded-full">
                <div
                  className="h-full rounded-full bg-gold transition-none"
                  style={{
                    width: i === current ? `${progress}%` : i < current ? '100%' : '0%',
                  }}
                />
              </div>
              <span className="text-left text-xs tracking-wide text-muted-foreground/60 transition-colors group-hover:text-foreground">
                {s.step} — {s.title}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
