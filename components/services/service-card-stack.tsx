'use client'

import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import type { Service } from '@/lib/content'
import type { ServiceSliderImage } from '@/lib/contentful'

function buildItems(
  service: Service,
  images: ServiceSliderImage[],
): CardStackItem[] {
  return images.map((img, i) => {
    const titleSource = img.caption?.trim() || img.alt
    return {
      id: img.id,
      title:
        titleSource.length > 48
          ? `${titleSource.slice(0, 45)}…`
          : titleSource,
      description: `${service.title} — styled moments from our portfolio`,
      imageSrc: img.imageUrl,
      href: '/gallery',
      tag: service.title,
      ctaLabel: i === 0 ? 'View gallery' : undefined,
    }
  })
}

/**
 * In Focus card stack on each service page.
 * Images come from Contentful "Service Slider Image" entries for that service.
 */
export function ServiceCardStack({
  service,
  images,
}: {
  service: Service
  images: ServiceSliderImage[]
}) {
  const items = buildItems(service, images)
  if (items.length === 0) return null

  return (
    <section className="border-t border-border/60 bg-champagne/40 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="mb-10 text-center md:mb-14">
          <Eyebrow>In Focus</Eyebrow>
          <h2 className={`mt-4 ${headingSection}`}>
            Moments from our {service.title} work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink/65">
            Swipe to explore related styling — use the arrows, drag the active
            card, tap a neighbour to bring it forward, or use the dots below.
          </p>
        </div>

        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={3200}
          pauseOnHover
          showDots
          showArrows
          cardWidth={480}
          cardHeight={360}
          overlap={0.58}
          spreadDeg={34}
        />
      </div>
    </section>
  )
}
