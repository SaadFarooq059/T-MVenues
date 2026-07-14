'use client'

import { type ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'

const easeOut = [0.22, 1, 0.36, 1] as const

/**
 * Reveal wrapper — content is always visible (opacity starts at 1) so it
 * works in Firefox, iframes, and any environment where IntersectionObserver
 * or Motion's whileInView may not fire. The subtle y-translate still gives
 * a polished editorial feel on capable browsers.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 1, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 1, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}
