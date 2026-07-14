import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/page-hero'
import { CtaBanner } from '@/components/sections/cta-banner'
import { Eyebrow, SeamDivider } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { siteMeta } from '@/lib/content'
import { HowWeWork } from '@/components/about/how-we-work'
import { WhatGuidesUs } from '@/components/about/what-guides-us'
import { OurApproach } from '@/components/about/our-approach'
import { FounderPortrait } from '@/components/about/founder-portrait'

export const metadata: Metadata = {
  title: 'About | T&M Venue Styling',
  description:
    'Meet Katie & Lucie — the sisters-in-law behind T&M Venue Styling. Truly bespoke venue styling with no set packages, flexible quotes and a wide range of décor, backdrops and signage.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="The Hands Behind the Styling"
        intro="We are Katie & Lucie — sisters-in-law who have always loved planning parties and finding any excuse to get the decorations up."
      />

      {/* Founder story */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <Reveal>
            <FounderPortrait />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Katie &amp; Lucie</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
                Sisters-in-law, co-founders, biggest supporters
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 space-y-4 leading-relaxed text-foreground/70">
                <p>
                  We are Katie &amp; Lucie — the faces behind T&amp;M! We have
                  known each other since 2004 and are sisters-in-law. We have
                  always loved planning parties and having any excuse to get the
                  decorations up.
                </p>
                <p>
                  Back in 2019, Lucie got engaged and the team that is now
                  T&amp;M was born! Being family, we believe, allows us to work
                  together in a way that is different to others. Each of us
                  brings our individuality to T&amp;M, and we believe each event
                  should be as unique as you are.
                </p>
                <p>
                  We love working together and are each other&apos;s biggest
                  supporters — not only in what we do within T&amp;M, but also
                  this thing called life.
                </p>
                <p>
                  Life is worth celebrating and we love to be part of those
                  special days. It is a true privilege when customers trust us
                  with their wedding or event. We understand you may feel
                  overwhelmed with the possibilities, but don&apos;t panic —
                  this is what we&apos;re here for. Let us know your venue,
                  colour palette or the vibe you&apos;re going for and we&apos;ll
                  do the rest.
                </p>
                <p>We can&apos;t wait to meet you!</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <SeamDivider align="left" className="mt-8" />
            </Reveal>
          </div>
        </div>
      </section>

      <OurApproach />

      <WhatGuidesUs />

      <HowWeWork />

      <CtaBanner
        eyebrow="Say Hello"
        heading="We Can't Wait to Meet You"
        body={`Reach us any time at ${siteMeta.email} — or send an enquiry and we'll be in touch soon.`}
      />
    </>
  )
}
