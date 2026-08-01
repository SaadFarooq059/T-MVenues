'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'
import { headingCard, headingSection } from '@/components/ui/atoms'

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

function PortraitFrame({
  src,
  alt,
  rotate,
  className,
}: {
  src: string
  alt: string
  rotate: string
  className?: string
}) {
  return (
    <div
      className={`group relative aspect-[3/4] w-[11.5rem] overflow-hidden border-8 border-champagne bg-champagne shadow-[0_16px_40px_rgba(42,37,33,0.12)] transition-transform duration-500 ease-out will-change-transform sm:w-60 sm:border-[12px] md:w-72 lg:w-80 ${rotate} ${className ?? ''}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 320px"
        quality={92}
        className="object-cover object-center grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
      />
    </div>
  )
}

/**
 * Editorial love-story block — overlapping framed photos, side notes,
 * and a centred quote. Uses site background so it sits flush with About.
 */
export function LoveStory() {
  return (
    <section className="overflow-hidden bg-background py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:gap-10">
          <Reveal className="order-2 text-center md:order-1 md:text-left">
            <h3 className={headingCard}>
              Soft Beginnings
            </h3>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink/65 md:text-lg">
              A heart full of hope and a room dressed with care — the quiet
              details that make the first glance feel unforgettable.
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="relative order-1 mx-auto flex h-[20rem] w-full max-w-[21rem] items-center justify-center sm:h-[26rem] sm:max-w-[26rem] md:order-2 md:h-[32rem] md:max-w-[32rem] lg:h-[36rem] lg:max-w-[36rem]"
          >
            <div className="absolute left-0 top-4 z-10 transition-transform duration-500 ease-out hover:-translate-y-2 hover:rotate-3 sm:top-6">
              <PortraitFrame
                src="/AboutUs/about4.jpg"
                alt="Ceremony aisle with florals and a floral arch"
                rotate="rotate-[-8deg] group-hover:rotate-[-4deg]"
              />
            </div>
            <div className="absolute bottom-2 right-0 z-20 transition-transform duration-500 ease-out hover:-translate-y-2 hover:-rotate-3 sm:bottom-4">
              <PortraitFrame
                src="/AboutUs/about3.png"
                alt="Outdoor marquee wedding with draped ceiling at dusk"
                rotate="rotate-[8deg] group-hover:rotate-[4deg]"
              />
            </div>

            <div className="absolute left-1/2 top-1/2 z-30 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-champagne shadow-[0_8px_24px_rgba(42,37,33,0.1)] sm:size-[4.5rem]">
              <GoldBloom className="size-8 text-gold sm:size-9" />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="order-3 text-center md:text-right">
            <h3 className={headingCard}>
              Forever Rooms
            </h3>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink/65 md:ml-auto md:max-w-md md:text-lg">
              Candlelight, silk and soft florals — spaces composed so every
              guest feels the love the moment they walk in.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mx-auto mt-16 max-w-4xl text-center md:mt-24">
            <p className={cn(headingSection, 'text-3xl sm:text-4xl md:text-5xl')}>
              <span className="text-gold" aria-hidden="true">
                &ldquo;
              </span>
              Every love story is beautiful, but yours deserves a setting to
              match.
              <span className="text-gold" aria-hidden="true">
                &rdquo;
              </span>
            </p>
            <GoldBloom className="mx-auto mt-8 size-12 text-gold md:mt-10 md:size-14" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
