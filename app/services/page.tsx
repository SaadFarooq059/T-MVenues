import type { Metadata } from 'next'
import { ServicesHero } from '@/components/services/services-hero'
import { ServicesTimeline } from '@/components/services/services-timeline'
import { CtaBanner } from '@/components/sections/cta-banner'
import { services } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services | T&M Venue Styling',
  description:
    'Wedding styling, corporate event styling, commercial shoots and creative collaborations from T&M Venue Styling.',
}

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />

      <ServicesTimeline services={services} />

      <CtaBanner
        eyebrow="Ready When You Are"
        heading="Bring Your Vision to Life"
        body="Share a few details about your event and we'll design a styling scheme made entirely for you."
      />
    </main>
  )
}
