'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './horizontal-parallax-gallery.module.css'

const images = [
  { src: '/images/gallery-1.png', alt: 'Styled wedding ceremony aisle', className: styles.slower },
  { src: '/images/gallery-2.png', alt: 'Reception tablescape detail', className: styles.faster },
  { src: '/images/gallery-3.png', alt: 'Ceiling drapery installation', className: `${styles.slower} ${styles.vertical}` },
  { src: '/images/gallery-4.png', alt: 'Candlelit venue styling', className: `${styles.slower} ${styles.slowerDown}` },
  { src: '/images/gallery-5.png', alt: 'Floral centrepiece detail', className: '' },
  { src: '/images/hero-1.png', alt: 'Fully dressed wedding venue', className: styles.slower },
  { src: '/images/gallery-6.png', alt: 'Corporate event styling', className: styles.faster1 },
  { src: '/images/gallery-7.png', alt: 'Gold and floral tablescape', className: `${styles.slower} ${styles.slower2}` },
  { src: '/images/gallery-8.png', alt: 'Intimate barn wedding styling', className: styles.slower1 },
  { src: '/images/hero-2.png', alt: 'Evening venue atmosphere', className: styles.faster },
  { src: '/images/gallery-9.png', alt: 'Styled shoot backdrop', className: `${styles.slower} ${styles.last}` },
]

/** How many viewport heights of page scroll to finish the whole strip */
const SCROLL_VIEWPORTS = 1.25
const LERP = 0.22

/**
 * Template CSS parallax gallery. A short vertical scroll finishes the full
 * image strip smoothly, then the page continues.
 */
export function HorizontalParallaxGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [sectionHeight, setSectionHeight] = useState('225vh')

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

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

    const pageTravel = () => Math.max(window.innerHeight * SCROLL_VIEWPORTS, 1)

    const measure = () => {
      setSectionHeight(`${pageTravel() + window.innerHeight}px`)
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
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-champagne"
      style={{ height: sectionHeight }}
      aria-label="Journey gallery"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-champagne">
        <div className={styles.galleryContainer}>
          <p className={styles.scrollInfo}>Scroll to explore</p>
          <div ref={wrapperRef} className={styles.horizontalScrollWrapper}>
            {images.map((image) => (
              <div
                key={image.src}
                className={`${styles.imgWrapper} ${image.className}`}
              >
                <span className={styles.imgLink}>
                  <Image
                    src={image.src}
                    alt={image.alt}
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
