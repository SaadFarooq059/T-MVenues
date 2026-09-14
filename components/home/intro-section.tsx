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
              We make your vision feel real
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-ink/65">
              <p>There&apos;s nothing quite like seeing your venue come together for the first time.</p>
              <p>
                At T&amp;M Venue Styling, we work with you to create a space that feels beautiful,
                personal and right for your day. Whether you already know exactly what you want or
                you&apos;re not sure where to start, we&apos;re here to help.
              </p>
              <p>
                From draping and florals to table styling, centrepieces and those all-important
                finishing touches, we take care of the details so you can enjoy the moment.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-sm font-medium uppercase tracking-[0.16em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink"
            >
              Meet T&amp;M <span aria-hidden="true">&rarr;</span>
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
                  src="/images/gallery-7.jpg"
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
