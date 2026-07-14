import Image from 'next/image'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import type { Service } from '@/lib/content'

export function ServiceSection({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const flipped = index % 2 === 1

  return (
    <section id={service.slug} className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(flipped && 'lg:order-2')}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={service.image || '/placeholder.svg'}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12} className={cn(flipped && 'lg:order-1')}>
          <Eyebrow>{`0${index + 1}`}</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            {service.title}
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            {service.longDescription}
          </p>

          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">
              What&apos;s included
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/60">
                    <Check className="size-3 text-gold" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
