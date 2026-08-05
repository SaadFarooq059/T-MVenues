import RuixenBentoCards, { type BentoCard } from '@/components/ui/ruixen-bento-cards'
import type { Service } from '@/lib/content'

/**
 * “What's included” for a single service, laid out as a bento grid.
 * Falls back to the plain `included` list when a service has no highlight copy.
 */
export function ServiceHighlights({ service }: { service: Service }) {
  const cards: BentoCard[] =
    service.highlights && service.highlights.length > 0
      ? service.highlights
      : service.included.map((title) => ({ title }))

  if (cards.length === 0) return null

  return (
    <RuixenBentoCards
      eyebrow="What's Included"
      cards={cards}
      heading={`Every ${service.title.toLowerCase()} detail, handled for you.`}
      body={service.shortDescription}
    />
  )
}
