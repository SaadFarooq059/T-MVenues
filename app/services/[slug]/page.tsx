import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { galleryImages, services } from '@/lib/content'
import { CtaBanner } from '@/components/sections/cta-banner'
import { ServicesPageHero } from '@/components/services/services-page-hero'
import { ServiceCardStack } from '@/components/services/service-card-stack'
import { ServiceAboutSection } from '@/components/services/service-about-section'
import { ServiceHighlights } from '@/components/services/service-highlights'
import { Eyebrow, SeamDivider } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import type { PageHeroPage } from '@/lib/contentful'

const serviceHeroPageBySlug: Record<string, PageHeroPage> = {
  weddings: 'Services - Weddings',
  'corporate-events': 'Services - Corporate Events',
  'commercial-shoots': 'Services - Commercial Shoots',
  collaborations: 'Services - Collaborations',
}

export const revalidate = 60

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: `${service.title} | T&M Venue Styling`,
    description: service.shortDescription,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const currentIndex = services.indexOf(service)
  const prev = services[currentIndex - 1] ?? null
  const next = services[currentIndex + 1] ?? null
  const heroPage = serviceHeroPageBySlug[slug]

  return (
    <main>
      <ServicesPageHero
        page={heroPage ?? 'Services'}
        sealLabel={service.title}
        fallbackHeading={service.title}
        fallbackImage={service.image}
      />

      {/* ── Detail body ── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_340px] lg:gap-24">

          {/* Left: long description */}
          <Reveal>
            <Eyebrow>About This Service</Eyebrow>
            <p className="mt-6 text-pretty font-serif text-2xl leading-relaxed tracking-tight text-ink md:text-3xl">
              {service.longDescription}
            </p>
            <SeamDivider className="mt-10" />
          </Reveal>

          {/* Right: what's included card */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl bg-ink px-8 py-8 text-champagne">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
                What&apos;s included
              </p>
              <ul className="mt-6 space-y-4">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/60">
                      <Check className="size-3 text-gold" />
                    </span>
                    <span className="text-sm leading-relaxed text-champagne/80">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-champagne/10 pt-6">
                <Link
                  href="/contact"
                  className="block w-full rounded-full bg-gold px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-dark"
                >
                  Enquire About This Service
                </Link>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <ServiceHighlights service={service} />

      <ServiceAboutSection service={service} />

      <ServiceCardStack service={service} gallery={galleryImages} />

      {/* ── Prev / Next service navigation ── */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="group flex flex-col gap-1 px-5 py-6 transition-colors hover:bg-cream sm:px-8 sm:py-8"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="font-serif text-lg text-ink group-hover:text-gold sm:text-xl">{prev.title}</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next ? (
            <Link
              href={`/services/${next.slug}`}
              className="group flex flex-col items-start gap-1 px-5 py-6 transition-colors hover:bg-cream sm:items-end sm:px-8 sm:py-8"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Next
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-serif text-lg text-ink group-hover:text-gold sm:text-xl">{next.title}</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </section>

      <CtaBanner
        eyebrow="Ready When You Are"
        heading="Bring Your Vision to Life"
        body="Share a few details about your event and we'll design a styling scheme made entirely for you."
      />
    </main>
  )
}
