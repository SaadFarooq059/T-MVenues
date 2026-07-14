'use client'

import { WavyBackground } from '@/components/ui/wavy-background'
import { Eyebrow, SeamDivider } from '@/components/ui/atoms'

export function ServicesHero() {
  return (
    <WavyBackground
      containerClassName="pt-20"
      className="mx-auto max-w-4xl px-6 pb-16 text-center"
      backgroundFill="#f3ecdf"
      colors={['#b08d57', '#c9a86c', '#d4b483', '#8f7245', '#e0c9a0']}
      speed="slow"
      waveOpacity={0.6}
      blur={12}
    >
      <Eyebrow className="justify-center">Our Services</Eyebrow>
      <h1 className="mt-6 text-balance font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
        Styling shaped around your occasion
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink/65 md:text-lg">
        From weddings to brand shoots, every project begins with your vision and
        ends with a space that feels considered, warm and complete.
      </p>
      <SeamDivider className="mt-8" />
    </WavyBackground>
  )
}
