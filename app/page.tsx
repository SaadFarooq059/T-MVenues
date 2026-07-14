import { Hero } from '@/components/home/hero'
import { IntroSection } from '@/components/home/intro-section'
import { ServicesPreview } from '@/components/home/services-preview'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { FeaturedGallery } from '@/components/home/featured-gallery'
import { QuotesMarquee } from '@/components/home/quotes-marquee'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/sections/cta-banner'
import {
  galleryImages,
  heroSlides,
  services,
  testimonials,
} from '@/lib/content'

export default function HomePage() {
  return (
    <main>
      <Hero slides={heroSlides} />
      <QuotesMarquee />
      <IntroSection />
      <ServicesPreview services={services} />
      <WhyChooseUs />
      <FeaturedGallery images={galleryImages} />
      <Testimonials testimonials={testimonials} />
      <CtaBanner />
    </main>
  )
}
