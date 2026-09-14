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

const APPROVED_HOME_HERO_COPY = {
  heading: 'Where Your Story Begins',
  subheading:
    'Beautifully styled spaces for weddings and events that feel completely you.',
  body: "From the big statement pieces to the little details that bring everything together, we'll help transform your venue into a space you'll love walking into.",
  ctaText: 'View Our Work',
  ctaLink: '/gallery',
} as const

const FALLBACK_HOME_HERO: Awaited<ReturnType<typeof getPageHeroes>>[number] = {
  id: 'home-fallback',
  page: 'Home',
  heading: APPROVED_HOME_HERO_COPY.heading,
  subheading: APPROVED_HOME_HERO_COPY.subheading,
  body: APPROVED_HOME_HERO_COPY.body,
  heroImageUrl: '/images/hero-1.jpg',
  heroImageAlt:
    'Elegant wedding reception hall dressed with ivory silk drapery and tall floral centerpieces',
  ctaText: APPROVED_HOME_HERO_COPY.ctaText,
  ctaLink: APPROVED_HOME_HERO_COPY.ctaLink,
}

async function HomeHeroFromCms() {
  const slides = await getPageHeroes('Home')
  const withApprovedCopy =
    slides.length > 0
      ? slides.map((slide) => ({
          ...slide,
          ...APPROVED_HOME_HERO_COPY,
        }))
      : [FALLBACK_HOME_HERO]
  return <Hero slides={withApprovedCopy} />
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
      <CtaBanner
        body2="Tell us a little about your date, venue and what you're dreaming of, and we'll take it from there."
      />
    </main>
  )
}
