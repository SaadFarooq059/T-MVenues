'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Eyebrow, headingSection, headingCard } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

const reasons = [
  {
    number: '01',
    title: 'Considered Detail',
    body: 'Every element — from the fall of a drape to the flicker of a candle — is chosen with intention.',
    align: 'left' as const,
  },
  {
    number: '02',
    title: 'Tailored to You',
    body: 'No two events are the same. We listen first, then design a scheme that feels unmistakably yours.',
    align: 'left' as const,
  },
  {
    number: '03',
    title: 'Trusted by Venues',
    body: 'We work seamlessly alongside your venue team, planners and florists for a stress-free day.',
    align: 'right' as const,
  },
  {
    number: '04',
    title: 'End-to-End Service',
    body: 'From initial consultation through to full install and breakdown — we handle everything.',
    align: 'right' as const,
  },
]

export function WhyChooseUs() {
  const imageRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!imageRef.current) return
      const rect = imageRef.current.getBoundingClientRect()
      const trigger = window.innerHeight * 0.7
      if (rect.top <= trigger) {
        const progress = Math.min(1, (trigger - rect.top) / 400)
        requestAnimationFrame(() => setScrollProgress(progress))
      } else {
        setScrollProgress(0)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-20 text-center">
          <Eyebrow className="justify-center">Why T&amp;M</Eyebrow>
          <h2 className={`mx-auto mt-4 max-w-2xl ${headingSection}`}>
            The studio behind your{' '}
            <span className="text-gold">most memorable</span> moments
          </h2>
          <div className="mx-auto mt-5 h-px w-24 rounded-full bg-gold/60" />
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-6">
          <div className="space-y-10 md:col-span-4 md:pr-4">
            {reasons
              .filter((r) => r.align === 'left')
              .map((r, i) => (
                <Reveal
                  key={r.number}
                  delay={0.08 * i}
                  className="group relative cursor-default p-3 transition-transform duration-300 hover:translate-x-1"
                >
                  <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-serif text-[4.5rem] font-bold leading-none text-gold/15 transition-colors duration-300 group-hover:text-gold/25 sm:text-[7rem]">
                    {r.number}
                  </div>
                  <div className="relative z-10 pl-8 sm:pl-10">
                    <h3 className={headingCard}>
                      {r.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink/65">{r.body}</p>
                  </div>
                </Reveal>
              ))}
          </div>

          <div ref={imageRef} className="flex justify-center md:col-span-4">
            <Reveal className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px]">
              <div className="absolute inset-[6%] rounded-full border border-dashed border-gold/25" />
              <div className="absolute inset-[14%] rounded-full border border-gold/15" />
              <div className="absolute inset-[22%] rounded-full border border-gold/10" />
              <div
                className="absolute inset-[18%] z-10 overflow-hidden rounded-full shadow-[0_8px_40px_rgba(34,42,53,0.18)] ring-4 ring-background"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.12}) rotate(${scrollProgress * 4}deg)`,
                  transition: 'transform 0.4s ease-out',
                }}
              >
                <Image
                  src="/images/gallery-5.png"
                  alt="T&M Venue Styling — detail of a beautifully dressed wedding table"
                  fill
                  sizes="(max-width: 640px) 70vw, 290px"
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </Reveal>
          </div>

          <div className="space-y-10 md:col-span-4 md:pl-4">
            {reasons
              .filter((r) => r.align === 'right')
              .map((r, i) => (
                <Reveal
                  key={r.number}
                  delay={0.08 * i}
                  className="group relative cursor-default p-3 text-left transition-transform duration-300 hover:-translate-x-1 md:text-right"
                >
                  <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-serif text-[4.5rem] font-bold leading-none text-gold/15 transition-colors duration-300 group-hover:text-gold/25 sm:text-[7rem]">
                    {r.number}
                  </div>
                  <div className="relative z-10 pr-8 sm:pr-10">
                    <h3 className={headingCard}>
                      {r.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink/65">{r.body}</p>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
