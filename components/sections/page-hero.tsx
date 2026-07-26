import Image from 'next/image'
import Link from 'next/link'
import {
  getPageHero,
  type PageHeroPage,
} from '@/lib/contentful'
import { headingHeroHome } from '@/components/ui/atoms'

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

const ctaClassName =
  'mt-8 inline-flex items-center justify-center rounded-sm bg-gold px-7 py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne'

/**
 * CMS-driven full-bleed page hero.
 * Pass the exact Contentful "page" dropdown value, e.g. page="Home".
 * Renders nothing when no matching published entry exists.
 */
export async function PageHero({ page }: { page: PageHeroPage }) {
  const hero = await getPageHero(page)
  if (!hero) return null

  const showCta = Boolean(hero.ctaText && hero.ctaLink)
  const hasMobileImage = Boolean(hero.mobileHeroImageUrl)

  return (
    <section
      className="relative flex min-h-[75svh] w-full items-center justify-center overflow-hidden bg-ink text-champagne md:min-h-[90svh]"
      aria-label={`${page} hero`}
    >
      {hasMobileImage ? (
        <>
          <Image
            src={hero.mobileHeroImageUrl!}
            alt={hero.mobileHeroImageAlt || hero.heading}
            fill
            priority
            quality={92}
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src={hero.heroImageUrl}
            alt={hero.heroImageAlt}
            fill
            priority
            quality={92}
            sizes="100vw"
            className="hidden object-cover object-center md:block"
          />
        </>
      ) : (
        <Image
          src={hero.heroImageUrl}
          alt={hero.heroImageAlt}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}

      <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-28 text-center sm:px-6 md:px-8 md:pb-20 md:pt-32">
        <h1
          className={`${headingHeroHome} max-w-[18ch] text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]`}
        >
          {hero.heading}
        </h1>

        {hero.subheading ? (
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-champagne/85 sm:text-lg">
            {hero.subheading}
          </p>
        ) : null}

        {showCta ? (
          isInternalHref(hero.ctaLink!) ? (
            <Link href={hero.ctaLink!} className={ctaClassName}>
              {hero.ctaText}
            </Link>
          ) : (
            <a
              href={hero.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              {hero.ctaText}
            </a>
          )
        ) : null}
      </div>
    </section>
  )
}
