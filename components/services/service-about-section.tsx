import { Hero04 } from '@/components/ui/hero-04'
import { galleryImages, type GalleryImage, type Service } from '@/lib/content'

const categoryBySlug: Record<string, GalleryImage['category'] | null> = {
  weddings: 'Weddings',
  'corporate-events': 'Corporate',
  'commercial-shoots': 'Styled Shoots',
  collaborations: null,
}

function secondaryImageFor(service: Service): GalleryImage | undefined {
  const preferred = categoryBySlug[service.slug]
  const matched = preferred
    ? galleryImages.filter((image) => image.category === preferred)
    : galleryImages

  const pool = matched.length > 0 ? matched : galleryImages
  return pool.find((image) => image.src !== service.image) ?? pool[0]
}

export function ServiceAboutSection({ service }: { service: Service }) {
  const secondary = secondaryImageFor(service)
  if (!secondary) return null

  return (
    <Hero04
      as="h2"
      eyebrow="How We Deliver"
      title={`Every ${service.singularTitle} we style`}
      titleLine2="begins with your vision."
      description={service.longDescription}
      washImage={service.image}
      primaryImage={service.image}
      primaryAlt={service.imageAlt}
      secondaryImage={secondary.src}
      secondaryAlt={secondary.alt}
      animation="subtle"
      primaryCTA={{
        ctaEnabled: true,
        text: 'Enquire Now',
        link: '/contact',
      }}
      secondaryCTA={{
        ctaEnabled: true,
        text: 'View Gallery',
        link: '/gallery',
        variant: 'link',
      }}
    />
  )
}
