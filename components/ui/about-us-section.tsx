'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle,
  Home,
  PaintBucket,
  Pen,
  PenTool,
  Ruler,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import { headingSection, headingCard } from '@/components/ui/atoms'

export type AboutUsPillar = {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  position: 'left' | 'right'
}

export type AboutUsStat = {
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
}

export type AboutUsSectionProps = {
  eyebrow?: string
  title?: string
  description?: string
  imageSrc?: string
  imageAlt?: string
  portfolioHref?: string
  portfolioLabel?: string
  pillars?: AboutUsPillar[]
  stats?: AboutUsStat[]
  ctaHeading?: string
  ctaBody?: string
  ctaHref?: string
  ctaLabel?: string
}

const defaultPillars: AboutUsPillar[] = [
  {
    icon: <Pen className="size-6" />,
    secondaryIcon: (
      <Sparkles className="absolute -top-1 -right-1 size-4 text-gold/70" />
    ),
    title: 'Concept',
    description:
      'We listen closely to your story, venue and mood, then sketch a styling direction that feels personal — never packaged.',
    position: 'left',
  },
  {
    icon: <Home className="size-6" />,
    secondaryIcon: (
      <CheckCircle className="absolute -top-1 -right-1 size-4 text-gold/70" />
    ),
    title: 'Venue',
    description:
      'Every room has its own architecture and light. We dress spaces so drapery, florals and furniture work with the venue — not against it.',
    position: 'left',
  },
  {
    icon: <PenTool className="size-6" />,
    secondaryIcon: (
      <Star className="absolute -top-1 -right-1 size-4 text-gold/70" />
    ),
    title: 'Design',
    description:
      'Colour, texture and scale are considered together so the room feels cohesive from the ceremony aisle to the last table detail.',
    position: 'left',
  },
  {
    icon: <PaintBucket className="size-6" />,
    secondaryIcon: (
      <Sparkles className="absolute -top-1 -right-1 size-4 text-gold/70" />
    ),
    title: 'Styling',
    description:
      'From linens and candlelight to finishing accents, we layer the soft details that make a celebration feel considered and complete.',
    position: 'right',
  },
  {
    icon: <Ruler className="size-6" />,
    secondaryIcon: (
      <CheckCircle className="absolute -top-1 -right-1 size-4 text-gold/70" />
    ),
    title: 'Planning',
    description:
      'Timelines, logistics and on-the-day flow are mapped carefully so install day stays calm and the design lands exactly as planned.',
    position: 'right',
  },
  {
    icon: <Building2 className="size-6" />,
    secondaryIcon: (
      <Star className="absolute -top-1 -right-1 size-4 text-gold/70" />
    ),
    title: 'Delivery',
    description:
      'Our team installs with precision and care, then stays present so every corner is ready when guests arrive.',
    position: 'right',
  },
]

const defaultStats: AboutUsStat[] = [
  { icon: <Award className="size-6" />, value: 200, label: 'Events Styled', suffix: '+' },
  { icon: <Users className="size-6" />, value: 180, label: 'Happy Couples & Clients', suffix: '+' },
  { icon: <Calendar className="size-6" />, value: 7, label: 'Years of Craft', suffix: '' },
  { icon: <TrendingUp className="size-6" />, value: 98, label: 'Would Recommend', suffix: '%' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AboutUsSection({
  eyebrow = 'Discover Our Story',
  title = 'How We Work',
  description = 'Katie & Lucie style venues with care, creativity and calm — transforming blank rooms into spaces that feel as unique as the people celebrating in them.',
  imageSrc = '/images/about-detail.png',
  imageAlt = 'T&M Venue Styling — dressed venue detail',
  portfolioHref = '/gallery',
  portfolioLabel = 'Our Portfolio',
  pillars = defaultPillars,
  stats = defaultStats,
  ctaHeading = 'Ready to transform your space?',
  ctaBody = "Let's create something beautiful together.",
  ctaHref = '/contact',
  ctaLabel = 'Get Started',
}: AboutUsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

  const leftPillars = pillars.filter((p) => p.position === 'left')
  const rightPillars = pillars.filter((p) => p.position === 'right')

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-champagne to-cream px-4 py-24 text-ink"
    >
      <motion.div
        className="absolute top-20 left-10 size-64 rounded-full bg-gold/10 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute right-10 bottom-20 size-80 rounded-full bg-gold-dark/10 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 size-4 rounded-full bg-gold/30"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/3 size-6 rounded-full bg-gold-dark/25"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        className="relative z-10 container mx-auto max-w-6xl"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div className="mb-6 flex flex-col items-center" variants={itemVariants}>
          <motion.span
            className="mb-2 flex items-center gap-2 text-sm font-medium tracking-[0.14em] text-gold uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="size-4" />
            {eyebrow}
          </motion.span>
          <h2 className={`mb-4 text-center ${headingSection}`}>
            {title}
          </h2>
          <motion.div
            className="h-1 bg-gold"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="mx-auto mb-16 max-w-2xl text-center text-ink/75"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-16">
            {leftPillars.map((pillar, index) => (
              <ServiceItem
                key={`left-${pillar.title}`}
                icon={pillar.icon}
                secondaryIcon={pillar.secondaryIcon}
                title={pillar.title}
                description={pillar.description}
                variants={itemVariants}
                delay={index * 0.2}
                direction="left"
              />
            ))}
          </div>

          <div className="order-first mb-8 flex items-center justify-center md:order-none md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="overflow-hidden rounded-md shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="320px"
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/50 to-transparent p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link
                    href={portfolioHref}
                    className="flex items-center gap-2 rounded-full bg-champagne px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-gold"
                  >
                    {portfolioLabel} <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute inset-0 -m-3 z-[-1] rounded-md border-4 border-gold/40"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              <motion.div
                className="absolute -top-4 -right-8 size-16 rounded-full bg-gold/15"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-10 size-20 rounded-full bg-gold-dark/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />

              <motion.div
                className="absolute -top-10 left-1/2 size-3 -translate-x-1/2 rounded-full bg-gold"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-12 left-1/2 size-2 -translate-x-1/2 rounded-full bg-gold-dark"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>
          </div>

          <div className="space-y-16">
            {rightPillars.map((pillar, index) => (
              <ServiceItem
                key={`right-${pillar.title}`}
                icon={pillar.icon}
                secondaryIcon={pillar.secondaryIcon}
                title={pillar.title}
                description={pillar.description}
                variants={itemVariants}
                delay={index * 0.2}
                direction="right"
              />
            ))}
          </div>
        </div>

        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={isStatsInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-20 flex flex-col items-center justify-between gap-6 rounded-xl bg-ink p-8 text-champagne md:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className={`mb-2 ${headingCard} text-champagne`}>{ctaHeading}</h3>
            <p className="text-champagne/75">{ctaBody}</p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-medium text-ink transition-colors hover:bg-gold-dark hover:text-champagne"
          >
            {ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  variants,
  delay,
  direction,
}: {
  icon: React.ReactNode
  secondaryIcon?: React.ReactNode
  title: string
  description: string
  variants: Variants
  delay: number
  direction: 'left' | 'right'
}) {
  return (
    <motion.div
      className="group flex flex-col"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-3 flex items-center gap-3"
        initial={{ x: direction === 'left' ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="relative rounded-lg bg-gold/10 p-3 text-gold transition-colors duration-300 group-hover:bg-gold/20"
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-ink transition-colors duration-300 group-hover:text-gold">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="pl-12 text-sm leading-relaxed text-ink/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <div className="mt-3 flex items-center pl-12 text-xs font-medium text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="size-3" />
        </span>
      </div>
    </motion.div>
  )
}

function StatCounter({
  icon,
  value,
  label,
  suffix,
  delay,
}: {
  icon: React.ReactNode
  value: number
  label: string
  suffix: string
  delay: number
}) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: false })
  const [hasAnimated, setHasAnimated] = useState(false)

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value)
      setHasAnimated(true)
    } else if (!isInView && hasAnimated) {
      springValue.set(0)
      setHasAnimated(false)
    }
  }, [isInView, value, springValue, hasAnimated])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      className="group flex flex-col items-center rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-champagne"
      variants={{
        hidden: { opacity: 1, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="mb-4 flex size-14 items-center justify-center rounded-full bg-ink/5 text-gold transition-colors duration-300 group-hover:bg-gold/10"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="flex items-center text-3xl font-bold text-ink"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="mt-1 text-sm text-ink/70">{label}</p>
      <motion.div className="mt-3 h-0.5 w-10 bg-gold transition-all duration-300 group-hover:w-16" />
    </motion.div>
  )
}
