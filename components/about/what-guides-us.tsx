'use client'

import Image from 'next/image'
import { Eye, Heart, Sparkles, Users } from 'lucide-react'
import { Eyebrow, headingSection, headingCard } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

const values = [
  {
    icon: Eye,
    title: 'Considered',
    description:
      'Nothing is placed by accident. Every choice of texture, tone and light serves the feeling of the room.',
  },
  {
    icon: Heart,
    title: 'Warm',
    description:
      'We style for people, not just photographs. A space should feel as good to stand in as it looks.',
  },
  {
    icon: Sparkles,
    title: 'Meticulous',
    description:
      'From ceiling drapes to the final candle, we sweat the smallest details so you never have to.',
  },
  {
    icon: Users,
    title: 'Bespoke',
    description:
      "We don't offer set packages. Your quote is built around your vision — and flexible until 8 weeks before the day.",
  },
]

export function WhatGuidesUs() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 md:px-8">
        <Reveal className="mb-12 flex flex-col items-center gap-5 text-center">
          <Eyebrow tone="sage" className="justify-center">
            What Guides Us
          </Eyebrow>
          <h2 className={headingSection}>Three things we never compromise</h2>
          <div
            className="h-0.5 w-[200px] rounded-full bg-gradient-to-r from-gold via-gold to-gold/30"
            aria-hidden="true"
          />
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink/65">
            Our values aren&apos;t a branding exercise — they&apos;re the practical
            standards we hold ourselves to on every single job.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mb-12 max-w-5xl overflow-hidden rounded-3xl shadow-2xl">
          <div className="relative aspect-video max-h-[500px] w-full">
            <Image
              src="/AboutUs/about1.jpg"
              alt="A beautifully styled wedding venue table with flowers and candlelight"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </Reveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Reveal
                key={value.title}
                delay={0.08 * index}
                className="flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-champagne/40 p-6 text-center transition-all duration-500 hover:border-gold/50 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-gold text-ink shadow-md">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className={headingCard}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/65">
                  {value.description}
                </p>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-ink/65">
            These principles shape every decision we make — from the first
            conversation to the moment we hand the room back to you.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
