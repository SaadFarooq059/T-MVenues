'use client'

import Image from 'next/image'
import { Eye, Heart, Sparkles, Users } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { Eyebrow } from '@/components/ui/atoms'

const values = [
  {
    icon: Eye,
    title: 'Considered',
    description: 'Nothing is placed by accident. Every choice of texture, tone and light serves the feeling of the room.',
  },
  {
    icon: Heart,
    title: 'Warm',
    description: 'We style for people, not just photographs. A space should feel as good to stand in as it looks.',
  },
  {
    icon: Sparkles,
    title: 'Meticulous',
    description: 'From ceiling drapes to the final candle, we sweat the smallest details so you never have to.',
  },
  {
    icon: Users,
    title: 'Bespoke',
    description:
      'We don’t offer set packages. Your quote is built around your vision — and flexible until 8 weeks before the day.',
  },
]

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Icon = value.icon

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-champagne/40 p-6 text-center transition-all duration-500 hover:border-gold/50 hover:shadow-lg"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-gold text-ink shadow-md">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-lg text-foreground">{value.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
    </div>
  )
}

export function WhatGuidesUs() {
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineVisible, setLineVisible] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLineVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 md:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-5 text-center">
          <Eyebrow tone="sage" className="justify-center">What Guides Us</Eyebrow>
          <h2 className="text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
            Three things we never compromise
          </h2>

          {/* Animated gold underline */}
          <div
            ref={lineRef}
            className="h-0.5 rounded-full bg-gradient-to-r from-gold via-gold to-gold/30"
            style={{
              width: lineVisible ? '200px' : '0px',
              transition: 'width 0.6s ease 0.3s',
            }}
            aria-hidden="true"
          />

          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Our values aren&apos;t a branding exercise — they&apos;re the practical standards we hold ourselves to on every single job.
          </p>
        </div>

        {/* Full-width image with gradient fade */}
        <div className="relative mx-auto mb-12 max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative aspect-video max-h-[500px] w-full">
            <Image
              src="/images/gallery-3.png"
              alt="A beautifully styled wedding venue table with flowers and candlelight"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
          {/* Bottom gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* 4-column feature cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>

        {/* Closing paragraph */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted-foreground">
            These principles shape every decision we make — from the first conversation to the moment we hand the room back to you.
          </p>
        </div>

      </div>
    </section>
  )
}
