'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { TimelineMilestone } from '@/lib/contentful'
import styles from './horizontal-parallax-gallery.module.css'

/**
 * Depth rhythm of the strip. Cycled by position so any number of milestones
 * keeps the original staggering; the closing offset is added to the last one.
 */
const PARALLAX_CLASSES = [
  styles.slower,
  styles.faster,
  `${styles.slower} ${styles.vertical}`,
  `${styles.slower} ${styles.slowerDown}`,
  '',
  styles.slower,
  styles.faster1,
  `${styles.slower} ${styles.slower2}`,
  styles.slower1,
  styles.faster,
  styles.slower,
]

function parallaxClass(index: number, total: number) {
  const base = PARALLAX_CLASSES[index % PARALLAX_CLASSES.length]
  return index === total - 1 ? `${base} ${styles.last}` : base
}

/** How many viewport heights of page scroll to finish the whole strip */
const SCROLL_VIEWPORTS = 1.25
const LERP = 0.22

/**
 * Template CSS parallax gallery. A short vertical scroll finishes the full
 * image strip smoothly, then the page continues.
 * Images come from Contentful "Timeline Milestone" entries.
 */
export function HorizontalParallaxGallery({
  milestones,
}: {
  milestones: TimelineMilestone[]
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [sectionHeight, setSectionHeight] = useState('225vh')

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const wrapper = wrapperRef.current
    if (!section || !stage || !wrapper) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setSectionHeight('auto')
      return
    }

    let target = 0
    let current = 0
    let raf = 0
    let running = true

    const galleryTravel = () => Math.max(wrapper.scrollHeight - wrapper.clientHeight, 0)

    // Measured from the sticky stage rather than window.innerHeight: on mobile
    // the two differ (browser chrome), which left dead scroll after the strip.
    const stageHeight = () => stage.getBoundingClientRect().height || window.innerHeight

    const pageTravel = () => Math.max(stageHeight() * SCROLL_VIEWPORTS, 1)

    const measure = () => {
      setSectionHeight(`${pageTravel() + stageHeight()}px`)
    }

    const readTarget = () => {
      const gTravel = galleryTravel()
      if (gTravel <= 0) {
        target = 0
        return
      }
      const rect = section.getBoundingClientRect()
      const pTravel = pageTravel()
      const progress = Math.min(Math.max(-rect.top / pTravel, 0), 1)
      target = progress * gTravel
    }

    const tick = () => {
      if (!running) return
      current += (target - current) * LERP
      if (Math.abs(target - current) < 0.6) current = target
      wrapper.scrollTop = current
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => readTarget()

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' })
    }

    measure()
    readTarget()
    current = target
    wrapper.scrollTop = current
    raf = requestAnimationFrame(tick)

    const t1 = window.setTimeout(() => {
      measure()
      readTarget()
    }, 150)
    const t2 = window.setTimeout(() => {
      measure()
      readTarget()
    }, 700)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('resize', readTarget)
    wrapper.addEventListener('wheel', onWheel, { passive: false })

    const ro = new ResizeObserver(() => {
      measure()
      readTarget()
    })
    ro.observe(wrapper)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('resize', readTarget)
      wrapper.removeEventListener('wheel', onWheel)
      ro.disconnect()
    }
  }, [milestones.length])

  if (milestones.length === 0) return null

  return (
    <section
      ref={sectionRef}
      className="relative bg-champagne"
      style={{ height: sectionHeight }}
      aria-label="Journey gallery"
    >
      <div ref={stageRef} className={styles.stickyStage}>
        <div className={styles.galleryContainer}>
          <p className={styles.scrollInfo}>Scroll to explore</p>
          <div ref={wrapperRef} className={styles.horizontalScrollWrapper}>
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`${styles.imgWrapper} ${parallaxClass(index, milestones.length)}`}
              >
                <span className={styles.imgLink}>
                  <Image
                    src={milestone.imageUrl}
                    alt={milestone.imageAlt}
                    width={400}
                    height={500}
                    className={styles.galleryImage}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
