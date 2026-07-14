import type { Metadata } from 'next'
import { Mail, Phone } from 'lucide-react'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'
import { Eyebrow, SeamDivider } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'
import { siteMeta } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact | T&M Venue Styling',
  description:
    'Start the conversation. Enquire about wedding, corporate and editorial styling with T&M Venue Styling.',
}

const details = [
  { icon: Mail, label: 'Email', value: siteMeta.email, href: `mailto:${siteMeta.email}` },
  { icon: Phone, label: 'Phone', value: siteMeta.phone, href: `tel:${siteMeta.phone.replace(/\s/g, '')}` },
]

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-[1fr_1.3fr] md:gap-20 md:px-8">
          {/* Details */}
          <div>
            <Reveal>
              <Eyebrow>Contact Details</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-balance font-serif text-4xl leading-tight tracking-tight text-foreground">
                We&apos;d love to hear from you
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 leading-relaxed text-foreground/65">
                Prefer to reach out directly? Use the details below, or fill in
                the form and we&apos;ll come back to you shortly.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <SeamDivider align="left" className="my-8" />
            </Reveal>

            <ul className="space-y-6">
              {details.map((d, i) => (
                <Reveal key={d.label} delay={0.3 + i * 0.08}>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <d.icon className="size-4" />
                    </span>
                    <div>
                      <span className="block text-xs font-medium uppercase tracking-[0.16em] text-foreground/50">
                        {d.label}
                      </span>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1 block text-lg text-foreground transition-colors hover:text-gold"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-lg text-foreground">
                          {d.value}
                        </span>
                      )}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Form */}
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
