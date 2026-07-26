import { Suspense } from 'react'
import { Hero } from '@/components/home/hero'
import { IntroSection } from '@/components/home/intro-section'
import { ServicesPreview } from '@/components/home/services-preview'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { LoveNote } from '@/components/home/love-note'
import {
  FeaturedGallery,
  FeaturedGallerySkeleton,
} from '@/components/home/featured-gallery'
import { QuotesMarquee } from '@/components/home/quotes-marquee'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/sections/cta-banner'
import { services, testimonials } from '@/lib/content'
import { getJourneyImages, getPageHeroes } from '@/lib/contentful'

/** Revalidate so CMS heroes / journey images refresh without a redeploy. */
export const revalidate = 60

async function HomeHeroFromCms() {
  const slides = await getPageHeroes('Home')
  return <Hero slides={slides} />
}

async function JourneyFromCms() {
  const images = await getJourneyImages()
  return <FeaturedGallery images={images} />
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={null}>
        <HomeHeroFromCms />
      </Suspense>
      <QuotesMarquee />
      <IntroSection />
      <ServicesPreview services={services} />
      <WhyChooseUs />
      <LoveNote />
      <Suspense fallback={<FeaturedGallerySkeleton />}>
        <JourneyFromCms />
      </Suspense>
      <Testimonials testimonials={testimonials} />
      <div className="h-16 bg-background md:h-24" aria-hidden="true" />
      <CtaBanner />
    </main>
  )
}
