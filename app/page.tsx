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
import { FromOurStudio } from '@/components/home/from-our-studio'
import { FollowAlong } from '@/components/home/follow-along'
import { CtaBanner } from '@/components/sections/cta-banner'
import { services } from '@/lib/content'
import {
  getJourneyImages,
  getPageHeroes,
  getSocialMediaItems,
  getTestimonials,
} from '@/lib/contentful'

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

async function TestimonialsFromCms() {
  const entries = await getTestimonials(true)
  return <Testimonials testimonials={entries} />
}

async function FollowAlongFromCms() {
  const items = await getSocialMediaItems()
  return <FollowAlong items={items} />
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
      <Suspense fallback={null}>
        <TestimonialsFromCms />
      </Suspense>
      <FromOurStudio />
      <Suspense fallback={null}>
        <FollowAlongFromCms />
      </Suspense>
      <div className="h-16 bg-background md:h-24" aria-hidden="true" />
      <CtaBanner />
    </main>
  )
}
