'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

export interface CtaBannerProps {
  eyebrow?: string
  heading?: string
  body?: string
  body2?: string
  ctaLabel?: string
  ctaHref?: string
  image?: string
  imageAlt?: string
}

const DEFAULT_IMAGE = '/Home/cta.jpg'

export function CtaBanner({
  eyebrow = 'Tell us what you have in mind',
  heading = 'Ready to start planning?',
  body = "Whether you've got a Pinterest board full of ideas or absolutely no idea where to begin, we'd love to hear from you.",
  body2,
  ctaLabel = 'Enquire Now',
  ctaHref = '/contact',
  image = DEFAULT_IMAGE,
  imageAlt = 'Styled venue detail by T&M Venue Styling',
}: CtaBannerProps) {
  return (
    <section className="bg-background text-ink">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 md:min-h-[520px] lg:min-h-[600px]">
        {/* Left — full image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[520px] lg:min-h-[600px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={92}
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Right — text */}
        <div className="flex items-center bg-[#B08D57] px-6 py-16 sm:px-10 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <Reveal className="w-full max-w-lg">
            <Eyebrow className="text-champagne">{eyebrow}</Eyebrow>
            <h2 className={`mt-5 ${headingSection}`}>{heading}</h2>
            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-ink/75">
              <p>{body}</p>
              {body2 ? <p>{body2}</p> : null}
            </div>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-champagne transition-colors duration-300 hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {ctaLabel}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
