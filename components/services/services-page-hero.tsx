import { getPageHero } from '@/lib/contentful'
import { Hero07 } from '@/components/ui/hero-07'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop'

/**
 * Services page header — landscape media above a split editorial grid
 * (tagline left, title / copy / CTAs right). Data from Contentful Page Hero.
 */
export async function ServicesPageHero() {
  const hero = await getPageHero('Services')

  const title = hero?.heading?.trim() || 'Styling for every kind of gathering'
  const description =
    hero?.subheading?.trim() ||
    'Wedding styling, corporate events, commercial shoots and creative collaborations — composed with drapery, florals and quiet, considered detail.'
  const landscapeImage = hero?.heroImageUrl || FALLBACK_IMAGE
  const landscapeAlt = hero?.heroImageAlt || title

  const primaryEnabled = Boolean(hero?.ctaText && hero?.ctaLink)

  return (
    <div className="pt-20 md:pt-24">
      <Hero07
        tagline="Our Services"
        title={title}
        description={description}
        landscapeImage={landscapeImage}
        landscapeAlt={landscapeAlt}
        animation="subtle"
        primaryCTA={{
          ctaEnabled: primaryEnabled,
          text: hero?.ctaText || 'Get in Touch',
          link: hero?.ctaLink || '/contact',
          variant: 'default',
        }}
        secondaryCTA={{
          ctaEnabled: true,
          text: 'View Gallery',
          link: '/gallery',
          variant: 'link',
        }}
      />
    </div>
  )
}
