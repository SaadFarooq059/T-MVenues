'use client'

import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import type { GalleryImage, Service } from '@/lib/content'

const categoryBySlug: Record<string, GalleryImage['category'] | null> = {
  weddings: 'Weddings',
  'corporate-events': 'Corporate',
  'commercial-shoots': 'Styled Shoots',
  collaborations: null,
}

function buildItems(
  service: Service,
  gallery: GalleryImage[],
): CardStackItem[] {
  const preferred = categoryBySlug[service.slug]
  const matched = preferred
    ? gallery.filter((g) => g.category === preferred)
    : gallery

  const pool =
    matched.length >= 3
      ? matched
      : [...matched, ...gallery.filter((g) => !matched.includes(g))]

  return pool.slice(0, 5).map((img, i) => ({
    id: img.id,
    title: img.alt.length > 48 ? `${img.alt.slice(0, 45)}…` : img.alt,
    description: `${service.title} — styled moments from our portfolio`,
    imageSrc: img.src,
    href: '/gallery',
    tag: img.category,
    ctaLabel: i === 0 ? 'View gallery' : undefined,
  }))
}

export function ServiceCardStack({
  service,
  gallery,
}: {
  service: Service
  gallery: GalleryImage[]
}) {
  const items = buildItems(service, gallery)
  if (items.length < 2) return null

  return (
    <section className="overflow-hidden border-t border-border/60 bg-champagne/40 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center md:mb-14">
          <Eyebrow>In Focus</Eyebrow>
          <h2 className={`mt-4 ${headingSection}`}>
            Moments from our {service.title} work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink/65">
            Swipe or use the arrows to explore related styling — drag the active
            card, or tap a neighbour to bring it forward.
          </p>
        </div>

        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={3200}
          pauseOnHover
          showDots
          cardWidth={520}
          cardHeight={320}
          overlap={0.48}
          spreadDeg={42}
        />
      </div>
    </section>
  )
}
