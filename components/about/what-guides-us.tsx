'use client'

import Image from 'next/image'
import { Eye, Heart, Sparkles, Users } from 'lucide-react'
import { Eyebrow, headingSection, headingCard } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

const values = [
  {
    icon: Eye,
    title: 'Thoughtful',
    description:
      'Nothing is there just for the sake of it. From the colours and textures to the tiniest finishing touches, everything has its place.',
  },
  {
    icon: Heart,
    title: 'Warm',
    description:
      'We want your space to feel just as good as it looks. Welcoming, relaxed and somewhere your guests genuinely want to be.',
  },
  {
    icon: Sparkles,
    title: 'Detail obsessed',
    description:
      "We're big on the little things. From the draping to the final candle, we'll fuss over every detail so you don't have to.",
  },
  {
    icon: Users,
    title: 'Made for you',
    description:
      "No one-size-fits-all packages here. We'll build everything around your ideas, your space and what matters most to you.",
  },
]

export function WhatGuidesUs() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden px-5 md:px-8">
        <Reveal className="mb-12 flex flex-col items-center gap-5 text-center">
          <Eyebrow tone="sage" className="justify-center">
            What Matters to Us
          </Eyebrow>
          <h2 className={headingSection}>The little things that make a big difference</h2>
          <div
            className="h-0.5 w-[200px] rounded-full bg-gradient-to-r from-gold via-gold to-gold/30"
            aria-hidden="true"
          />
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink/65">
            We like to keep things simple — listen to what you want, care about
            the details and make sure everything feels just right. It&apos;s how
            we approach every event, big or small.
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
            It&apos;s a simple approach: hear your ideas, manage the details and
            create a space that feels completely you.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
