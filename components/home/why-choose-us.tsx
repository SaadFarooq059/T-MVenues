'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Eyebrow } from '@/components/ui/atoms'

const reasons = [
  {
    number: '01',
    title: 'Considered Detail',
    body: 'Every element — from the fall of a drape to the flicker of a candle — is chosen with intention.',
    align: 'left',
  },
  {
    number: '02',
    title: 'Tailored to You',
    body: 'No two events are the same. We listen first, then design a scheme that feels unmistakably yours.',
    align: 'left',
  },
  {
    number: '03',
    title: 'Trusted by Venues',
    body: 'We work seamlessly alongside your venue team, planners and florists for a stress-free day.',
    align: 'right',
  },
  {
    number: '04',
    title: 'End-to-End Service',
    body: 'From initial consultation through to full install and breakdown — we handle everything.',
    align: 'right',
  },
]

export function WhyChooseUs() {
  const imageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  // Section visibility for stagger-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 },
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Scroll-driven scale + rotate on the centre image
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
    <section ref={sectionRef} className="overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div
          className={`mb-20 text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Eyebrow>Why T&amp;M</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl">
            The studio behind your{' '}
            <span className="text-gold">most memorable</span> moments
          </h2>
          {/* Gold underline */}
          <div className="mx-auto mt-5 h-px w-24 rounded-full bg-gold/60" />
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-6">

          {/* Left — 01 + 02 */}
          <div className="space-y-10 md:col-span-4 md:pr-4">
            {reasons.filter(r => r.align === 'left').map((r, i) => (
              <div
                key={r.number}
                className={`group relative cursor-default p-3 transition-all duration-700 hover:translate-x-1 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                {/* Ghost number */}
                <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-serif text-[7rem] font-bold leading-none text-gold/15 transition-colors duration-300 group-hover:text-gold/25">
                  {r.number}
                </div>
                <div className="relative z-10 pl-10">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Centre — circular image */}
          <div ref={imageRef} className="flex justify-center md:col-span-4">
            <div className="relative flex h-[420px] w-full max-w-[400px] items-center justify-center">
              {/* Decorative rings */}
              <div className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full border border-dashed border-gold/25" />
              <div className="absolute inset-0 m-auto h-[280px] w-[280px] rounded-full border border-gold/15" />
              <div className="absolute inset-0 m-auto h-[220px] w-[220px] rounded-full border border-gold/10" />

              {/* Scroll-driven image */}
              <div
                className="relative z-10 h-[290px] w-[290px] overflow-hidden rounded-full shadow-[0_8px_40px_rgba(34,42,53,0.18)] ring-4 ring-background"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.12}) rotate(${scrollProgress * 4}deg)`,
                  transition: 'transform 0.4s ease-out',
                }}
              >
                <Image
                  src="/images/gallery-5.png"
                  alt="T&M Venue Styling — detail of a beautifully dressed wedding table"
                  fill
                  sizes="290px"
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>

          {/* Right — 03 + 04 */}
          <div className="space-y-10 md:col-span-4 md:pl-4">
            {reasons.filter(r => r.align === 'right').map((r, i) => (
              <div
                key={r.number}
                className={`group relative cursor-default p-3 text-right transition-all duration-700 hover:-translate-x-1 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                {/* Ghost number */}
                <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-serif text-[7rem] font-bold leading-none text-gold/15 transition-colors duration-300 group-hover:text-gold/25">
                  {r.number}
                </div>
                <div className="relative z-10 pr-10">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
