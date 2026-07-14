'use client'

import { motion } from 'motion/react'
import { Eyebrow } from '@/components/ui/atoms'
import { Reveal, staggerContainer, staggerItem } from '@/components/motion/reveal'
import type { Venue } from '@/lib/content'

export function Venues({ venues }: { venues: Venue[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="text-center">
        <Reveal>
          <Eyebrow className="justify-center" tone="sage">
            Trusted By
          </Eyebrow>
          <h2 className="mt-6 text-balance font-serif text-3xl leading-tight tracking-tight md:text-4xl">
            Venues we&apos;re proud to work alongside
          </h2>
        </Reveal>
      </div>

      <motion.ul
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {venues.map((venue) => (
          <motion.li
            key={venue.id}
            variants={staggerItem}
            className="group flex flex-col items-center justify-center gap-1 bg-background px-6 py-12 text-center transition-colors duration-500 hover:bg-card"
          >
            <span className="font-serif text-xl tracking-tight text-muted-foreground transition-colors duration-500 group-hover:text-ink md:text-2xl">
              {venue.name}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-sage/70 transition-colors duration-500 group-hover:text-gold">
              {venue.location}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
