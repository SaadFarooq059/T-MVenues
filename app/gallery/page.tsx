import type { Metadata } from 'next'
import { GalleryHero } from '@/components/gallery/gallery-hero'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { CtaBanner } from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'Gallery | T&M Venue Styling',
  description:
    'A portfolio of styled weddings, corporate events and editorial shoots — drapery, florals and tablescapes composed with care.',
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
      <CtaBanner
        eyebrow="Inspired?"
        heading="Let's Create Yours"
        body="If something here speaks to you, we would love to hear about the day you are dreaming of."
      />
    </>
  )
}
