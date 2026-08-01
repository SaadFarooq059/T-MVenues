'use client'

import HowItWorks, { type Step } from '@/components/ui/how-it-works'
import { Eyebrow, headingSection, bodyLead } from '@/components/ui/atoms'

const STEPS: Step[] = [
  {
    title: 'Enquiry',
    description:
      'Tell us about your day, your venue and the feeling you want to create. We listen first — no templates, no rush. Every enquiry is read personally and answered with care.',
  },
  {
    title: 'Consultation',
    description:
      'We design a bespoke styling scheme with mood boards, material selections and a clear plan tailored entirely to you. This is where your day starts to take shape.',
  },
  {
    title: 'Styling Day',
    description:
      'Our team arrives early and dresses your venue with precision and care, handling every last detail so you never have to. You simply arrive to something beautiful.',
  },
  {
    title: 'The Reveal',
    description:
      'You step into a space transformed — composed, warm, and unmistakably yours. This is the moment we work toward from that very first conversation.',
  },
]

/**
 * About “How We Work” — pinned process cards with a dashed connecting path.
 */
export function AboutHowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-5 pt-20 text-center sm:px-6 md:px-8 md:pt-28">
        <Eyebrow className="justify-center">How We Work</Eyebrow>
        <h2 className={`mt-5 ${headingSection}`}>
          From first hello to the final reveal
        </h2>
        <p className={`mx-auto mt-5 max-w-2xl ${bodyLead}`}>
          Four quiet stages from that first conversation to the moment you walk
          into a room that feels entirely yours.
        </p>
      </div>

      <HowItWorks features={STEPS} />
    </section>
  )
}
