'use client'

import { WavyBackground } from '@/components/ui/wavy-background'
import { Eyebrow, SeamDivider, headingHero, bodyLead } from '@/components/ui/atoms'
import { Reveal } from '@/components/motion/reveal'

export function ServicesHero({
  eyebrow = 'Our Services',
  title = 'Styling shaped around your occasion',
  intro = 'From weddings to brand shoots, every project begins with your vision and ends with a space that feels considered, warm and complete.',
}: {
  eyebrow?: string
  title?: string
  intro?: string
}) {
  return (
    <WavyBackground
      containerClassName="pt-24 md:pt-28"
      className="mx-auto max-w-4xl px-5 pb-12 text-center sm:px-6 md:pb-16"
      backgroundFill="#f3ecdf"
      colors={['#b08d57', '#c9a86c', '#d4b483', '#8f7245', '#e0c9a0']}
      speed="medium"
      waveOpacity={0.6}
      blur={12}
    >
      <Reveal>
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className={`mt-6 ${headingHero}`}>{title}</h1>
      </Reveal>
      <Reveal delay={0.2}>
        <p className={`mx-auto mt-6 max-w-xl ${bodyLead}`}>{intro}</p>
      </Reveal>
      <Reveal delay={0.3}>
        <SeamDivider className="mt-8" />
      </Reveal>
    </WavyBackground>
  )
}
