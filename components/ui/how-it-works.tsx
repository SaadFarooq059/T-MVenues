'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { cn } from '@/lib/utils'

interface CardProps {
  number: string
  title: string
  description: string
  className?: string
  rotate?: string
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
)

const Card = ({
  number,
  title,
  description,
  className,
  rotate,
}: CardProps) => {
  return (
    <div
      className={cn(
        'relative w-full max-w-md transition-transform duration-300 hover:z-30 hover:scale-[1.02] sm:max-w-lg lg:max-w-none lg:w-[340px] xl:w-[380px]',
        'rotate-0',
        rotate,
        className,
      )}
    >
      <div className="rounded-2xl border border-gold/20 bg-cream p-2.5 shadow-[0_20px_50px_-20px_rgba(176,141,87,0.35)] sm:rounded-[28px] sm:p-3">
        <Pin className="mx-auto mb-4 h-8 w-8 text-gold sm:mb-7 sm:h-10 sm:w-10" />
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/25 bg-champagne/60 p-4 sm:rounded-[18px] sm:p-6">
          <span className="mb-3 font-serif text-3xl font-medium text-gold sm:mb-6 sm:text-4xl md:text-5xl">
            {number}
          </span>
          <h3 className="mb-2 font-serif text-xl font-medium leading-tight tracking-tight text-ink sm:mb-3 sm:text-2xl md:text-3xl md:leading-none">
            {title}
          </h3>
          <p className="text-sm leading-relaxed tracking-tight text-ink/65 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export interface Step {
  title: string
  description: string
}

export interface StepPosition {
  className?: string
  rotate?: string
}

export interface HowItWorksProps {
  features?: Step[]
  className?: string
  stepPositions?: StepPosition[]
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  {
    className: 'mx-auto lg:absolute lg:top-0 lg:left-[8%] lg:mx-0',
    rotate: 'lg:rotate-6',
  },
  {
    className: 'mx-auto lg:absolute lg:top-[140px] lg:right-[8%] lg:mx-0',
    rotate: 'lg:-rotate-6',
  },
  {
    className: 'mx-auto lg:absolute lg:top-[520px] lg:left-[8%] lg:mx-0',
    rotate: 'lg:rotate-6',
  },
  {
    className: 'mx-auto lg:absolute lg:top-[660px] lg:right-[6%] lg:mx-0',
    rotate: 'lg:-rotate-6',
  },
  {
    className: 'mx-auto lg:absolute lg:top-[1000px] lg:left-[8%] lg:mx-0',
    rotate: 'lg:rotate-6',
  },
]

const STAGE_WIDTH = 1280

export default function HowItWorks({
  features,
  className,
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: 'Enquiry',
      description:
        'Tell us about your day, your venue and the feeling you want to create.',
    },
    {
      title: 'Consultation',
      description:
        'We design a bespoke styling scheme with mood boards and a clear plan.',
    },
    {
      title: 'Styling Day',
      description:
        'Our team dresses your venue with precision so you never have to.',
    },
    {
      title: 'The Reveal',
      description:
        'You step into a space transformed — composed, warm, and yours.',
    },
  ]

  const data = features && features.length > 0 ? features : defaultFeatures
  const positions = stepPositions || DEFAULT_CARD_POSITIONS

  let height = 1360
  if (data.length === 1) height = 480
  else if (data.length === 2) height = 560
  else if (data.length === 3) height = 960
  else if (data.length === 4) height = 1120
  else height = 1360

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          'relative bg-background px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 lg:py-24',
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'linear-gradient(#b08d57 1px, transparent 1px)',
            backgroundSize: '100% 36px',
            marginTop: '4px',
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background sm:w-1/3" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background sm:w-1/3" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div
            className="relative mx-auto flex h-auto w-full max-w-[1280px] flex-col items-stretch space-y-6 sm:space-y-8 lg:block lg:h-[var(--md-height)] lg:space-y-0"
            style={{ '--md-height': `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full lg:block"
                viewBox={`0 0 ${STAGE_WIDTH} ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc
                    if (index === 0)
                      return 'M 280 180 C 560 180, 720 320, 980 320'
                    if (index === 1)
                      return acc + ' C 1180 320, 640 420, 280 540'
                    if (index === 2)
                      return acc + ' C 280 720, 700 860, 1000 860'
                    if (index === 3)
                      return acc + ' C 1220 860, 640 980, 280 1040'
                    return acc
                  }, '')
                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-gold/40"
                      strokeWidth="2.5"
                      strokeDasharray="10 8"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -144 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length]

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  rotate={position.rotate}
                  className={position.className}
                />
              )
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
