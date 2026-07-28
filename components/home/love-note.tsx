'use client'

import Image from 'next/image'
import { Reveal } from '@/components/motion/reveal'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { headingSection } from '@/components/ui/atoms'

const images = [
  {
    src: '/Home/s12.jpg',
    alt: 'Ceremony aisle lined with florals leading to a floral arch',
    className: 'left-[1%] top-[1%] h-72 w-52 lg:h-[26rem] lg:w-72',
  },
  {
    src: '/Home/s11.jpg',
    alt: 'Elegant wedding place setting with gold cutlery and a floral posy',
    className: 'bottom-[6%] left-[4%] h-48 w-48 lg:h-64 lg:w-64',
  },
  {
    src: '/Home/s4.jpg',
    alt: 'Styled vignette with draped fabric, vintage furniture and florals',
    className: 'right-[3%] top-[4%] h-48 w-48 lg:h-60 lg:w-60',
  },
  {
    src: '/Home/s10.jpg',
    alt: 'Lush floral centrepiece with candlelight and gold accents',
    className: 'bottom-[2%] right-[1%] h-72 w-52 lg:h-[26rem] lg:w-72',
  },
]

function GoldBloom({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 6c1.2 6.8 4.2 11.2 9 14-4.8 2.8-7.8 7.2-9 14-1.2-6.8-4.2-11.2-9-14 4.8-2.8 7.8-7.2 9-14Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M24 18v18"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M18 28c2.5 1.2 4.5 1.8 6 1.8s3.5-.6 6-1.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Same rounded + glowing frame as About “Our Approach” cards. */
function PhotoFrame({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative h-full w-full ${className ?? ''}`}>
      <div className="relative h-full w-full rounded-2xl border border-gold/20 p-1.5 transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.02] md:rounded-3xl md:p-2">
        <GlowingEffect
          spread={40}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-gold/15 shadow-sm md:rounded-2xl">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 45vw, 28vw"
            quality={90}
            className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Editorial “love note” — centred quote framed by floating venue photographs.
 * Photo frames match the About Our Approach card hover / radius treatment.
 */
export function LoveNote() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible bg-cream py-20 md:py-28 lg:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 md:min-h-[48rem] lg:min-h-[54rem]">
        {/* Floating photos — desktop / tablet */}
        {images.map((image, i) => (
          <Reveal
            key={image.src}
            delay={0.08 + i * 0.06}
            className={`group absolute z-20 hidden md:block ${image.className}`}
          >
            <PhotoFrame src={image.src} alt={image.alt} />
          </Reveal>
        ))}

        {/* Mobile photo strip */}
        <div className="mb-10 grid grid-cols-2 gap-3 md:hidden">
          {images.map((image) => (
            <div key={`m-${image.src}`} className="group relative aspect-[3/4]">
              <PhotoFrame src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>

        {/* Centre copy */}
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center px-4 text-center md:absolute md:inset-0 md:min-h-[48rem] lg:min-h-[54rem]">
          <Reveal>
            <p className={headingSection}>
              <span className="text-gold" aria-hidden="true">
                &ldquo;
              </span>
              Every room tells a love story — we simply help it speak.
              <span className="text-gold" aria-hidden="true">
                &rdquo;
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-ink/65 sm:text-base">
              From the soft fall of silk to the glow of candlelight, we dress
              venues with warmth and quiet intention — so the space feels as
              considered as the moment itself.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <GoldBloom className="mt-8 size-10 text-gold md:mt-10 md:size-12" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
