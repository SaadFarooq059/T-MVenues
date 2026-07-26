import type { Metadata } from 'next'
import { ServicesPageHero } from '@/components/services/services-page-hero'
import { ServicesTimeline } from '@/components/services/services-timeline'
import { CtaBanner } from '@/components/sections/cta-banner'
import { services } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services | T&M Venue Styling',
  description:
    'Wedding styling, corporate event styling, commercial shoots and creative collaborations from T&M Venue Styling.',
}

export const revalidate = 60

export default function ServicesPage() {
  return (
    <main>
      <ServicesPageHero />

      <ServicesTimeline services={services} />

      <CtaBanner
        eyebrow="Ready When You Are"
        heading="Bring Your Vision to Life"
        body="Share a few details about your event and we'll design a styling scheme made entirely for you."
      />
    </main>
  )
}
