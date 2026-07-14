'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Eyebrow } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import type { Service } from '@/lib/content'

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative h-[480px] w-full overflow-hidden rounded-xl cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        {/* Image */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            crossOrigin="anonymous"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-ink/55 transition-opacity duration-500 group-hover:bg-ink/70" />
        </div>

        {/* Top-right number */}
        <div className="absolute top-5 right-5 z-10 font-serif text-5xl font-bold text-champagne/20 leading-none select-none">
          0{(['weddings','corporate','shoots','collaborations'].indexOf(service.id) + 1)}
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
          {/* Title */}
          <h3 className="font-serif text-4xl font-bold text-champagne leading-tight transition-all duration-300 group-hover:text-gold group-hover:scale-[1.03] origin-left">
            {service.title}
          </h3>

          {/* Bullet points — slide up on hover */}
          <div
            className={`transition-all duration-500 ${
              hovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <ul className="space-y-3">
              {service.included.slice(0, 4).map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-champagne">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gold transition-transform duration-300 group-hover:scale-110">
                    <Check className="size-3 text-ink" strokeWidth={3} />
                  </span>
                  <span className="text-base transition-colors duration-300 group-hover:text-gold/90">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA label */}
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Explore {service.title} &rarr;
            </p>
          </div>
        </div>

        {/* Gold bottom bar sweep */}
        <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
        {/* Gold right bar sweep */}
        <div className="absolute right-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />
      </Link>
    </div>
  )
}

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <Eyebrow className="justify-center">What We Do</Eyebrow>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl">
              Styling for every kind of gathering
            </h2>
          </div>
        </Reveal>

        {/* 2×2 card grid */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Reveal>

        {/* All services link */}
        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-8 py-3 text-sm font-medium uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              View All Services
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
