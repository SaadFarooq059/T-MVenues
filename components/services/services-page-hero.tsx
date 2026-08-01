import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getPageHero } from '@/lib/contentful'
import { Reveal } from '@/components/motion/reveal'

const FALLBACK_HEADING = 'Bespoke Styling'
const FALLBACK_SUBHEADING =
  'Weddings, corporate events and commercial shoots — dressed with drapery, florals and quiet, considered detail. No set packages, just a scheme made entirely for you.'
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop'

/**
 * Editors control the two display lines with a "|" in the Contentful heading
 * ("Bespoke | Styling"). Without one, the words are split down the middle.
 */
function splitHeading(heading: string): [string, string] {
  const explicit = heading
    .split(/\s*[|\n]\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
  if (explicit.length >= 2) {
    return [explicit[0], explicit.slice(1).join(' ')]
  }

  const words = heading.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 1) return [heading.trim(), '']
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

/**
 * Display size is derived from the longest word so a heading of any length
 * still fits its column on every viewport instead of overflowing.
 */
function displaySize(text: string) {
  const longest = text
    .split(/\s+/)
    .reduce((max, word) => Math.max(max, word.length), 0)
  if (!longest) return 'clamp(2.5rem, 10vw, 10rem)'
  const vw = Math.min(13, Math.max(5.5, 86 / (longest * 0.62)))
  return `clamp(2.25rem, ${vw.toFixed(2)}vw, 10.5rem)`
}

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function GoldBloom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
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

function SealBadge({ label }: { label: string }) {
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

function HeroCta({ text, href }: { text: string; href: string }) {
  const className =
    'mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne sm:text-sm'

  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {text}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {text}
    </a>
  )
}

/**
 * Services page header — split editorial hero: oversized serif heading stacked
 * across the layout, seal motif and copy lower left, full-bleed image right.
 * Data from Contentful Page Hero (page = "Services").
 */
export async function ServicesPageHero() {
  const hero = await getPageHero('Services')

  const heading = hero?.heading?.trim() || FALLBACK_HEADING
  const [first, second] = splitHeading(heading)
  const imageSrc = hero?.heroImageUrl || FALLBACK_IMAGE
  const imageAlt = hero?.heroImageAlt || heading
  const mobileImageSrc = hero?.mobileHeroImageUrl || imageSrc
  const mobileImageAlt = hero?.mobileHeroImageAlt || imageAlt
  const subheading = hero?.subheading?.trim() || FALLBACK_SUBHEADING
  const sealLabel = 'Our Services'
  const showCta = Boolean(hero?.ctaText && hero?.ctaLink)

  const headingClass =
    'font-serif font-medium uppercase leading-[0.86] tracking-[-0.02em] text-ink'
  const firstSize = displaySize(first)
  const secondSize = displaySize(second)

  return (
    <section
      className="relative overflow-hidden bg-cream pt-24 md:pt-28"
      aria-label="Services hero"
    >
      {/* ── Mobile: stacked invitation ── */}
      <div className="px-5 pb-12 sm:px-8 md:hidden">
        <Reveal>
          <h1 className={headingClass} style={{ fontSize: firstSize }}>
            {first}
          </h1>
        </Reveal>

        {second ? (
          <Reveal delay={0.06}>
            <p
              className={`text-right ${headingClass}`}
              style={{ fontSize: secondSize, marginTop: '0.35em' }}
            >
              {second}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={0.12} className="mt-8 flex flex-col items-start gap-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-5">
          <SealBadge label={sealLabel} />
          <p className="text-pretty text-sm leading-relaxed text-ink/65">
            {subheading}
          </p>
        </Reveal>

        {showCta ? (
          <Reveal delay={0.16}>
            <HeroCta text={hero!.ctaText!} href={hero!.ctaLink!} />
          </Reveal>
        ) : null}

        <Reveal delay={0.2}>
          <div className="relative mt-10 aspect-[4/5] w-full overflow-hidden">
            <Image
              src={mobileImageSrc}
              alt={mobileImageAlt}
              fill
              priority
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>

      {/* ── Desktop: overlapping editorial split ── */}
      <div className="relative hidden md:block">
        {/* Image sits outside the centred grid so it stays flush to the viewport edge */}
        <div className="absolute inset-y-0 right-0 w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            quality={92}
            sizes="50vw"
            className="object-cover object-center"
          />
          {/* Keeps the overlapping heading legible on darker photography */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-cream/90 via-cream/30 to-transparent"
          />
        </div>

        <div
          className={cn(
            'relative mx-auto grid max-w-[1600px] grid-cols-2',
            second ? 'min-h-[80svh]' : 'min-h-[64svh]',
          )}
        >
          {/* Left copy column */}
          <div className="relative z-30 flex flex-col justify-end px-10 pb-16 lg:px-14 lg:pb-20">
            <Reveal delay={0.1}>
              <SealBadge label={sealLabel} />
            </Reveal>

            <Reveal delay={0.15} className="mt-6 max-w-sm">
              <p className="text-pretty text-sm leading-relaxed text-ink/65 lg:text-base">
                {subheading}
              </p>
              {showCta ? (
                <HeroCta text={hero!.ctaText!} href={hero!.ctaLink!} />
              ) : null}
            </Reveal>
          </div>

          <div aria-hidden />
        </div>

        {/* Heading layer — sits above the image so words break the column */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto max-w-[1600px] px-10 pt-8 lg:px-14 lg:pt-10">
          <Reveal>
            <h1
              className={headingClass}
              style={{ fontSize: firstSize }}
            >
              {first}
            </h1>
          </Reveal>

          {second ? (
            <Reveal delay={0.08} className="pr-[12%] lg:pr-[16%]">
              <p
                className={`text-right ${headingClass}`}
                style={{ fontSize: secondSize, marginTop: '0.85em' }}
              >
                {second}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
