import { Mail, Phone } from 'lucide-react'
import { Eyebrow, SeamDivider, headingSection } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { siteMeta } from '@/lib/content'

const HATS_EMBED_SRC =
  'https://tmvenuestyling.17hats.com/p#/embed/kfchwwvhzwbvnwrvvwzkdfrwrrspzcnn'

const details = [
  {
    icon: Mail,
    label: 'Email',
    value: siteMeta.email,
    href: `mailto:${siteMeta.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: siteMeta.phone,
    href: `tel:${siteMeta.phone.replace(/\s/g, '')}`,
  },
]

/**
 * Branded T&M enquiry block — site heading and contact details above,
 * client's 17hats form iframe beneath. The form UI itself is controlled by Hats.
 */
export function HatsInquiryForm() {
  return (
    <section className="border-t border-gold/15 bg-cream py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Get In Touch</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={`mt-5 ${headingSection}`}>
              We&apos;d love to hear from you
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink/65 sm:text-lg">
              Share a few details about your date, venue and the feeling you want
              to create. We read every enquiry personally and will be in touch soon.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <SeamDivider className="mt-8" />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-5 sm:mt-12 sm:flex-row sm:justify-center sm:gap-10">
            {details.map((d) => (
              <li key={d.label} className="flex items-start gap-3 sm:justify-center">
                <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <d.icon className="size-4" aria-hidden />
                </span>
                <div className="text-left">
                  <span className="block text-xs font-medium uppercase tracking-[0.16em] text-ink/50">
                    {d.label}
                  </span>
                  <a
                    href={d.href}
                    className="mt-1 inline-flex min-h-11 items-center break-words text-base text-ink transition-colors hover:text-gold sm:text-lg"
                  >
                    {d.value}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gold/25 bg-background shadow-[0_18px_50px_rgba(42,37,33,0.08)] sm:mt-14">
            <div className="border-b border-gold/15 bg-champagne/60 px-5 py-3 text-center sm:px-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                Enquiry form
              </p>
            </div>
            <iframe
              src={HATS_EMBED_SRC}
              title="Contact T&M Venue Styling"
              width="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[36rem] w-full border-0 bg-background sm:h-[44rem] md:h-[52rem] lg:h-[56rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
