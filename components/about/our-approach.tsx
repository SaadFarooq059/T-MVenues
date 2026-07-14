'use client'

import { Box, HeartHandshake, Sparkles, Wand2 } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Eyebrow } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

const cards = [
  {
    icon: Sparkles,
    title: 'Décor & Backdrops',
    description:
      'Exquisite décor, backdrop options and personal touches to make your event a WOW.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalised Care',
    description:
      'A dedicated approach and high standards — we strive to exceed every expectation.',
  },
  {
    icon: Wand2,
    title: 'Truly Bespoke',
    description:
      'No set packages. Choose exactly what will make your day one to remember.',
  },
  {
    icon: Box,
    title: 'Flexible Quotes',
    description:
      'Chop, change and tweak your quote up until 8 weeks before your event.',
  },
]

function ApproachCard({
  icon: Icon,
  title,
  description,
}: (typeof cards)[number]) {
  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-2xl border border-gold/20 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-gold/15 bg-background/90 p-6 shadow-sm md:p-7">
          <div className="flex size-11 items-center justify-center rounded-lg border border-gold/30 bg-champagne text-gold">
            <Icon className="size-5" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-xl tracking-tight text-foreground md:text-2xl">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export function OurApproach() {
  return (
    <section className="bg-champagne/50 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:px-8">
        <Reveal>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {cards.map((card) => (
              <ApproachCard key={card.title} {...card} />
            ))}
          </ul>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow tone="sage">Our Approach</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
              Making your event a WOW
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 text-pretty leading-relaxed text-foreground/70">
              <p>
                At T&amp;M, we offer a wide range of stock and services to ensure
                your event is a WOW. From exquisite décor and backdrop options to
                bespoke signage and helping you with those personal touches, we
                have the expertise and creativity to bring your event to life.
                Our attention to detail and commitment to high standards are
                incredibly important to us.
              </p>
              <p>
                With our personalised approach and dedication to customer
                satisfaction, we will strive to exceed your expectations and
                create an experience that will be remembered by all.
              </p>
              <p>
                We believe we can bring each of our clients&apos; vision to life
                — and because of this we do not offer set packages. Instead, our
                service is truly bespoke to allow you to choose what will make
                your day one to remember. We also allow you to chop, change and
                tweak your quote up until 8 weeks before your event to give you
                flexibility in your choices and budget.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
