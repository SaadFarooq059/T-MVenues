import { Eyebrow, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

const HATS_EMBED_SRC =
  'https://tmvenuestyling.17hats.com/p#/embed/kfchwwvhzwbvnwrvvwzkdfrwrrspzcnn'

/**
 * 17hats enquiry form — cream, centred, with a shorter iframe on small screens
 * so the tall Hats layout doesn't dominate a phone viewport.
 */
export function HatsInquiryForm() {
  return (
    <section className="border-t border-gold/15 bg-cream py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Enquire</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`mt-5 ${headingSection}`}>We&apos;d love to hear from you</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink/65 sm:text-lg">
              Share a few details about your date, venue and the feeling you want
              to create. We read every enquiry personally and will be in touch soon.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-background shadow-[0_18px_50px_rgba(42,37,33,0.08)] sm:mt-12">
            <iframe
              src={HATS_EMBED_SRC}
              title="Contact T&M Venue Styling"
              width="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0 bg-background h-[36rem] sm:h-[44rem] md:h-[52rem] lg:h-[56rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
