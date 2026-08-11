import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Eyebrow, headingSection } from '@/components/ui/atoms'

export type TestimonialBasicItem = {
  name: string
  role: string
  quote: string
  rating?: number
  /** Optional portrait; falls back to a gold monogram */
  image?: string
  /** Large visual on the image half of the row */
  photo: string
  photoAlt?: string
}

function Monogram({ name }: { name: string }) {
  const initials = name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <span
      className="flex size-full items-center justify-center bg-ink font-serif text-xl text-champagne"
      aria-hidden
    >
      {initials || 'T'}
    </span>
  )
}

/**
 * Alternating photo + quote rows for service (and other) pages.
 * Pass testimonials in via props — no hardcoded CMS / demos inside.
 */
export function TestimonialBasic({
  eyebrow = 'Testimonials',
  heading = 'What our clients say',
  testimonials,
  className,
}: {
  eyebrow?: string
  heading?: string
  testimonials: TestimonialBasicItem[]
  className?: string
}) {
  if (testimonials.length === 0) return null

  return (
    <section
      className={cn('border-y border-gold/15 bg-cream py-20 md:py-28', className)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
        <div className="mb-12 text-center md:mb-16">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <h2 className={`mt-4 ${headingSection}`}>{heading}</h2>
        </div>

        <div className="border-x border-gold/20">
          {testimonials.map((t, i) => {
            const flip = i % 2 === 1
            const rating = Math.min(5, Math.max(0, t.rating ?? 5))

            return (
              <div
                key={`${t.name}-${i}`}
                className={cn(
                  'grid grid-cols-1 border-y border-gold/20 lg:grid-cols-12',
                  flip && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1',
                )}
              >
                {/* Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted lg:col-span-7 lg:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={t.photo}
                    alt={t.photoAlt || `${t.name} — styled moment`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>

                {/* Quote */}
                <div
                  className={cn(
                    'flex flex-col lg:col-span-5',
                    flip ? 'lg:border-r lg:border-gold/20' : 'lg:border-l lg:border-gold/20',
                  )}
                >
                  <div className="flex items-center gap-3 border-b border-gold/20 bg-champagne/50 p-4 sm:p-5">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-cream bg-ink sm:size-16">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <Monogram name={t.name} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-xl tracking-tight text-ink sm:text-2xl">
                        {t.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-gold">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6 md:p-8">
                    <blockquote className="text-pretty font-serif text-xl leading-snug tracking-tight text-ink/90 sm:text-2xl md:text-[1.65rem] md:leading-[1.25]">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {rating > 0 ? (
                      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
                        {Array.from({ length: rating }, (_, star) => (
                          <Star
                            key={star}
                            className="size-5 fill-gold stroke-gold"
                            aria-hidden
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TestimonialBasic
