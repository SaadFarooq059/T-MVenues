'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/ui/atoms'
import { Cta, type CtaProps } from '@/components/ui/hero-04-utils/cta'
import { ArtCollage } from '@/components/ui/hero-04-utils/art-collage'

export interface Hero04Props {
  eyebrow?: string
  title: string
  titleLine2?: string
  description: string
  washImage?: string
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  animation?: 'none' | 'subtle'
  primaryCTA: CtaProps
  secondaryCTA?: CtaProps
  variant?: 'standard' | 'compact'
  /** Heading tag — use h2 when the page already has an h1 */
  as?: 'h1' | 'h2'
  className?: string
}

const variantStyles = {
  standard: {
    section: 'py-20 sm:py-28',
    title: 'text-4xl sm:text-5xl md:text-6xl',
    description: 'max-w-md text-base sm:text-lg',
    header: 'gap-5',
    grid: 'gap-12 lg:gap-16',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-3xl sm:text-4xl md:text-5xl',
    description: 'max-w-sm text-sm sm:text-base',
    header: 'gap-4',
    grid: 'gap-10 lg:gap-12',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * Editorial split section: stacked serif headline and copy beside an
 * overlapping two-photo collage, over a soft blurred wash of the same imagery.
 */
export function Hero04({
  eyebrow,
  title,
  titleLine2,
  description,
  washImage,
  primaryImage,
  secondaryImage,
  primaryAlt = '',
  secondaryAlt = '',
  animation = 'none',
  primaryCTA,
  secondaryCTA,
  variant = 'standard',
  as = 'h1',
  className,
}: Readonly<Hero04Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]
  const Heading = as

  return (
    <section
      className={cn(
        'relative isolate w-full overflow-hidden bg-background',
        className,
      )}
    >
      {washImage ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 mask-radial-[75%_100%] mask-radial-from-45% mask-radial-to-75% mask-radial-at-top opacity-25 blur-2xl"
        >
          <Image
            src={washImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}

      <motion.div
        className={cn(
          'relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center px-5 sm:px-6 lg:grid-cols-2',
          vs.section,
          vs.grid,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        <Reveal
          active={animate}
          className={cn('flex flex-col items-start', vs.header)}
        >
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

          <Heading
            className={cn(
              'text-balance font-serif leading-[1.06] tracking-tight text-ink',
              vs.title,
            )}
          >
            <Balancer>{title}</Balancer>
            {titleLine2 ? (
              <>
                <br />
                <Balancer>{titleLine2}</Balancer>
              </>
            ) : null}
          </Heading>

          {description ? (
            <p className={cn('text-pretty leading-relaxed text-ink/65', vs.description)}>
              <Balancer>{description}</Balancer>
            </p>
          ) : null}

          {primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled ? (
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
              {primaryCTA?.ctaEnabled ? <Cta cta={primaryCTA} /> : null}
              {secondaryCTA?.ctaEnabled ? (
                <Cta
                  cta={{ ...secondaryCTA, variant: secondaryCTA.variant ?? 'link' }}
                />
              ) : null}
            </div>
          ) : null}
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full">
          <ArtCollage
            primaryImage={primaryImage}
            secondaryImage={secondaryImage}
            primaryAlt={primaryAlt}
            secondaryAlt={secondaryAlt}
          />
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero04
