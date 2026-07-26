import Image from 'next/image'
import Link from 'next/link'
import { getPageHero } from '@/lib/contentful'
import { Reveal } from '@/components/motion/reveal'

function splitHeading(heading: string): [string, string] {
  const words = heading.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 1) return [heading.trim(), '']
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

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

function InviteSeal({ label }: { label: string }) {
  const text = label.toUpperCase()
  return (
    <div className="relative flex size-24 items-center justify-center sm:size-28 md:size-32">
      <svg viewBox="0 0 140 140" className="absolute inset-0 size-full text-ink/25">
        <defs>
          <path
            id="services-seal-path"
            d="M70,70 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
          />
        </defs>
        <circle
          cx="70"
          cy="70"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.5"
        />
        <text
          className="fill-ink/60 font-medium uppercase tracking-[0.32em]"
          style={{ fontSize: 8.5 }}
        >
          <textPath href="#services-seal-path" startOffset="0%">
            {`${text}  ·  ${text}  ·  `}
          </textPath>
        </text>
      </svg>
      <GoldBloom className="relative z-10 size-8 text-gold sm:size-9" />
    </div>
  )
}

/**
 * Services page header — split editorial layout:
 * left copy + seal, right full-bleed image, large overlapping heading.
 * Data from Contentful Page Hero (page = "Services").
 */
export async function ServicesPageHero() {
  const hero = await getPageHero('Services')
  if (!hero) return null

  const [left, right] = splitHeading(hero.heading)
  const imageSrc = hero.heroImageUrl
  const imageAlt = hero.heroImageAlt || hero.heading
  const sealLabel = hero.ctaText?.trim() || 'Our Services'
  const showCta = Boolean(hero.ctaText && hero.ctaLink)

  return (
    <section
      className="relative overflow-hidden bg-champagne pt-24 md:pt-28"
      aria-label="Services hero"
    >
      <div className="relative mx-auto grid min-h-[78svh] max-w-[1600px] grid-cols-1 md:min-h-[88svh] md:grid-cols-2">
        {/* Left panel */}
        <div className="relative z-20 flex flex-col justify-between px-5 pb-10 pt-8 sm:px-8 md:px-10 md:pb-14 md:pt-12 lg:px-14">
          <Reveal>
            <h1 className="font-serif text-[clamp(3.25rem,8vw+0.5rem,7.5rem)] font-medium uppercase leading-[0.88] tracking-tight text-ink">
              {left}
            </h1>
          </Reveal>

          <div className="mt-10 flex flex-1 flex-col justify-center md:mt-0">
            <Reveal delay={0.1} className="self-start md:self-center md:pl-[12%]">
              <InviteSeal label={sealLabel} />
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-10 max-w-sm md:mt-0">
            {hero.subheading ? (
              <p className="text-pretty text-sm leading-relaxed text-ink/65 sm:text-base">
                {hero.subheading}
              </p>
            ) : null}
            {showCta ? (
              isInternalHref(hero.ctaLink!) ? (
                <Link
                  href={hero.ctaLink!}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne sm:text-sm"
                >
                  {hero.ctaText}
                </Link>
              ) : (
                <a
                  href={hero.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne sm:text-sm"
                >
                  {hero.ctaText}
                </a>
              )
            ) : null}
          </Reveal>
        </div>

        {/* Right image — flush, no frame */}
        <div className="relative min-h-[55svh] md:min-h-full">
          {hero.mobileHeroImageUrl ? (
            <>
              <Image
                src={hero.mobileHeroImageUrl}
                alt={hero.mobileHeroImageAlt || imageAlt}
                fill
                priority
                quality={92}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center md:hidden"
              />
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                quality={92}
                sizes="50vw"
                className="hidden object-cover object-center md:block"
              />
            </>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              quality={92}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          )}
        </div>

        {/* Second heading word — overlaps into the image */}
        {right ? (
          <div className="pointer-events-none absolute inset-x-0 top-[42%] z-30 px-5 sm:px-8 md:top-[48%] md:px-10 lg:px-14">
            <Reveal delay={0.08}>
              <p className="ml-auto w-full max-w-[92%] text-right font-serif text-[clamp(3.25rem,8vw+0.5rem,7.5rem)] font-medium uppercase leading-[0.88] tracking-tight text-ink md:max-w-none md:pr-[8%] md:text-right lg:pr-[12%]">
                <span className="inline-block md:translate-x-[8%] lg:translate-x-[12%]">
                  {right}
                </span>
              </p>
            </Reveal>
          </div>
        ) : null}
      </div>
    </section>
  )
}
