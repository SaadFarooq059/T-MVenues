import { TestimonialBasic } from '@/components/ui/testimonial-basic'
import { galleryImages, type GalleryImage, type Service } from '@/lib/content'
import type { CmsTestimonial, ServiceSliderService } from '@/lib/contentful'

const eventTypeBySlug: Record<string, ServiceSliderService> = {
  weddings: 'Weddings',
  'corporate-events': 'Corporate Events',
  'commercial-shoots': 'Commercial Shoots',
  collaborations: 'Collaborations',
}

const categoryBySlug: Record<string, GalleryImage['category'] | null> = {
  weddings: 'Weddings',
  'corporate-events': 'Corporate',
  'commercial-shoots': 'Styled Shoots',
  collaborations: null,
}

function photosForService(service: Service): GalleryImage[] {
  const preferred = categoryBySlug[service.slug]
  const matched = preferred
    ? galleryImages.filter((image) => image.category === preferred)
    : galleryImages
  const pool = matched.length > 0 ? matched : galleryImages
  return pool.filter((image) => image.src !== service.image)
}

/**
 * Client testimonials on each service page — Contentful quotes for this
 * service, photos from the matching gallery category as visual backing.
 */
export function ServiceTestimonials({
  service,
  testimonials,
}: {
  service: Service
  testimonials: CmsTestimonial[]
}) {
  const eventType = eventTypeBySlug[service.slug]
  const matching = eventType
    ? testimonials.filter((t) => t.eventType === eventType)
    : testimonials

  const photos = photosForService(service)
  if (matching.length === 0 || photos.length === 0) return null

  const items = matching.map((t, i) => {
    const photo = photos[i % photos.length]!
    return {
      name: t.name,
      role: t.eventType,
      quote: t.quote,
      rating: t.rating ?? 5,
      image: t.clientPhotoUrl,
      photo: photo.src,
      photoAlt: photo.alt,
    }
  })

  return (
    <TestimonialBasic
      eyebrow="Kind Words"
      heading={`Loved by our ${service.singularTitle} clients`}
      testimonials={items}
    />
  )
}
