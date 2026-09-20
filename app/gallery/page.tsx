import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GalleryHero } from '@/components/gallery/gallery-hero'
import {
  GalleryGrid,
  GalleryGridSkeleton,
} from '@/components/gallery/gallery-grid'
import { ColourGallery } from '@/components/gallery/colour-gallery'
import { CtaBanner } from '@/components/sections/cta-banner'
import {
  getColourThemedEvents,
  getGalleryEvents,
  getPageHeroes,
} from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Gallery | T&M Venue Styling',
  description:
    'A portfolio of styled weddings, corporate events and editorial shoots — drapery, florals and tablescapes composed with care.',
}

/** Revalidate gallery periodically once Contentful has entries. */
export const revalidate = 60

async function GalleryHeroFromCms() {
  const slides = await getPageHeroes('Gallery')
  return <GalleryHero slides={slides} />
}

async function GalleryFromCms() {
  const events = await getGalleryEvents()
  return <GalleryGrid events={events} />
}

async function ColourGalleryFromCms() {
  const events = await getColourThemedEvents()
  // ColourGallery renders nothing until an event carries a colour theme
  return <ColourGallery events={events} />
}

export default function GalleryPage() {
  return (
    <>
      <Suspense fallback={null}>
        <GalleryHeroFromCms />
      </Suspense>
      <Suspense fallback={<GalleryGridSkeleton />}>
        <GalleryFromCms />
      </Suspense>
      <Suspense fallback={null}>
        <ColourGalleryFromCms />
      </Suspense>
      <CtaBanner
        eyebrow="Inspired?"
        heading="Let's Create Yours"
        body="If something here speaks to you, we would love to hear about the day you are dreaming of."
      />
    </>
  )
}
