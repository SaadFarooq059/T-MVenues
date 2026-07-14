import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '@/lib/content'
import { PageHero } from '@/components/sections/page-hero'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Eyebrow, SeamDivider } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

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

  return (
    <main>
      <PageHero
        eyebrow="Our Services"
        title={service.title}
        intro={service.shortDescription}
      />

      {/* ── Full-width hero image ── */}
      <section className="relative h-[50vh] min-h-[320px] w-full overflow-hidden md:h-[60vh]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
      </section>

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

      {/* ── Prev / Next service navigation ── */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border/60">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="group flex flex-col gap-1 px-8 py-8 transition-colors hover:bg-cream"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                Previous
              </span>
              <span className="font-serif text-xl text-ink group-hover:text-gold">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/services/${next.slug}`}
              className="group flex flex-col items-end gap-1 px-8 py-8 transition-colors hover:bg-cream"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Next
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-serif text-xl text-ink group-hover:text-gold">{next.title}</span>
            </Link>
          ) : (
            <div />
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
