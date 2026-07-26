'use client'

import { MeshGradient } from '@paper-design/shaders-react'
import { Eyebrow, SeamDivider, headingHero, bodyLead } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

export function ContactHero() {
  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden pt-24 md:pt-28">
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={['#f3ecdf', '#b08d57', '#f8f3ea', '#e0cfa8', '#d4b896']}
        speed={0.6}
        backgroundColor="#f3ecdf"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(42,37,33,0.18) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 md:py-28">
        <Reveal>
          <Eyebrow className="justify-center text-ink/60">Get In Touch</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className={`mt-5 ${headingHero}`}>
            Let&apos;s Begin
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className={`mx-auto mt-7 max-w-xl ${bodyLead}`}>
            Tell us about the day you&apos;re dreaming of. Every enquiry is read
            personally, and we&apos;ll reply with warmth and honesty.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <SeamDivider className="mt-10" />
        </Reveal>
      </div>
    </section>
  )
}
