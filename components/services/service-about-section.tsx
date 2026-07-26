'use client'

import {
  CheckCircle,
  Flower2,
  Layers,
  Lightbulb,
  Sparkles,
  Star,
  Tent,
} from 'lucide-react'
import AboutUsSection, {
  type AboutUsPillar,
} from '@/components/ui/about-us-section'
import type { Service } from '@/lib/content'

const icons = [
  <Lightbulb key="i1" className="size-6" />,
  <Tent key="i2" className="size-6" />,
  <Flower2 key="i3" className="size-6" />,
  <Layers key="i4" className="size-6" />,
  <Sparkles key="i5" className="size-6" />,
  <Star key="i6" className="size-6" />,
]

const secondary = [
  <Sparkles key="s1" className="absolute -top-1 -right-1 size-4 text-gold/70" />,
  <CheckCircle key="s2" className="absolute -top-1 -right-1 size-4 text-gold/70" />,
  <Star key="s3" className="absolute -top-1 -right-1 size-4 text-gold/70" />,
]

function pillarsFromService(service: Service): AboutUsPillar[] {
  const items = service.included.slice(0, 6)
  // Pad to 6 if a service has fewer than 6 included lines
  while (items.length < 6) {
    items.push(service.included[items.length % service.included.length]!)
  }

  return items.map((title, index) => ({
    icon: icons[index % icons.length],
    secondaryIcon: secondary[index % secondary.length],
    title: title.split(/[&,]/)[0]!.trim().slice(0, 28),
    description: `${title} — part of our ${service.title.toLowerCase()} styling, shaped around your venue and vision.`,
    position: index < 3 ? ('left' as const) : ('right' as const),
  }))
}

export function ServiceAboutSection({ service }: { service: Service }) {
  return (
    <AboutUsSection
      eyebrow="How We Deliver"
      title={`About ${service.title}`}
      description={service.longDescription}
      imageSrc={service.image}
      imageAlt={service.imageAlt}
      portfolioHref="/gallery"
      portfolioLabel="View Gallery"
      pillars={pillarsFromService(service)}
      ctaHeading={`Ready to plan your ${service.title.toLowerCase()}?`}
      ctaBody="Tell us about your date, venue and vision — we'll shape a styling scheme just for you."
      ctaHref="/contact"
      ctaLabel="Enquire Now"
    />
  )
}
