import Image from 'next/image'
import Link from 'next/link'
import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { SiteVideo } from '@/components/media/site-video'

export async function IntroSection() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: text ── */}
          <Reveal>
            <Eyebrow>Welcome to T&amp;M</Eyebrow>
            <h2 className={`mt-6 ${headingSection}`}>
              Styling rooted in warmth,{' '}
              <span className="text-gold">texture</span>{' '}
              and quiet detail
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-ink/65">
              <p>
                T&amp;M Venue Styling is a UK-based studio dressing weddings and events with a
                considered, editorial hand. We believe a beautifully styled room is felt before
                it is seen — in the fall of a drape, the flicker of candlelight, the softness of
                a linen.
              </p>
              <p>
                From intimate celebrations to grand venue transformations, we bring the same care
                to every detail, composing spaces that feel intentional, elegant and unmistakably
                yours.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-sm font-medium uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              Our Story <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>

          {/* ── Right: CMS video with two floating corner images ── */}
          <Reveal delay={0.15}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <SiteVideo placement="Home Intro" variant="card" />

              <div className="group absolute -right-6 -top-6 h-28 w-28 rotate-6 overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:rotate-0 hover:scale-105 md:-right-8 md:-top-8 md:h-36 md:w-36">
                <Image
                  src="/corner1.jpg"
                  alt="Elegant wedding place setting detail"
                  fill
                  sizes="9rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gold/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="group absolute -bottom-6 -left-6 h-28 w-28 -rotate-6 overflow-hidden rounded-xl shadow-xl transition-all duration-500 hover:rotate-0 hover:scale-105 md:-bottom-8 md:-left-8 md:h-36 md:w-36">
                <Image
                  src="/images/gallery-7.png"
                  alt="Lush floral centrepiece with candlelight and gold accents"
                  fill
                  sizes="9rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gold/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
