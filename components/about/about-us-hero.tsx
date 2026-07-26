'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Eyebrow, headingHero, bodyLead } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { HorizontalParallaxGallery } from '@/components/about/horizontal-parallax-gallery'
import { JourneyVideoModal } from '@/components/about/journey-video-modal'

const THUMBNAIL = '/AboutUs/thumbnail.png'
const VIDEO_SRC = '/videos/intro.mp4'

export function AboutUsHero() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <section className="bg-background pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16 md:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12">
            <Reveal className="w-full shrink-0 space-y-6 lg:w-[38%]" y={24}>
              <Eyebrow>Our Story</Eyebrow>
              <h1 className={headingHero}>
                About Our Journey
              </h1>
              <p className={`max-w-xl ${bodyLead}`}>
                From styling Lucie&apos;s engagement celebrations in 2019 to dressing
                venues across the UK, Katie &amp; Lucie have built T&amp;M around one
                idea — every event should feel as unique as the people celebrating it.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-sm bg-gold px-7 py-3.5 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne"
                >
                  Start Your Story
                </Link>
              </div>
            </Reveal>

            <div
              className="hidden h-56 w-px shrink-0 bg-border lg:block"
              aria-hidden="true"
            />

            <Reveal className="w-full min-w-0 flex-1 lg:w-[62%]" delay={0.12} y={24}>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group relative w-full overflow-hidden rounded-2xl border border-gold/20 bg-muted text-left shadow-[0_8px_40px_rgba(34,42,53,0.14)]"
                aria-label="Play journey video"
              >
                <div className="relative aspect-[16/9] w-full sm:aspect-[16/8.5]">
                  <Image
                    src={THUMBNAIL}
                    alt="Katie and Lucie — T&M Venue Styling"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover:bg-ink/40">
                    <span className="flex size-16 items-center justify-center rounded-full bg-champagne text-ink shadow-md transition-transform duration-300 group-hover:scale-105 sm:size-20">
                      <Play
                        className="size-7 translate-x-0.5 sm:size-8"
                        fill="currentColor"
                      />
                    </span>
                  </span>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <HorizontalParallaxGallery />

      <JourneyVideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={VIDEO_SRC}
        poster={THUMBNAIL}
      />
    </>
  )
}
