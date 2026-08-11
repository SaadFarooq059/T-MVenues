import { TestimonialBasic } from '@/components/ui/testimonial-basic'
import {
  galleryImages,
  testimonials as siteTestimonials,
  type GalleryImage,
  type Service,
} from '@/lib/content'

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
  // Prefer gallery photos that are not the service hero itself
  return pool.filter((image) => image.src !== service.image)
}

/**
 * Client testimonials on each service page — same design, real site quotes,
 * photos drawn from the matching gallery category.
 */
export function ServiceTestimonials({ service }: { service: Service }) {
  const photos = photosForService(service)
  if (siteTestimonials.length === 0 || photos.length === 0) return null

  const items = siteTestimonials.map((t, i) => {
    const photo = photos[i % photos.length]!
    return {
      name: t.name,
      role: `${service.title} · ${t.eventType}`,
      quote: t.quote,
      rating: 5,
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
