'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { SquareArrowOutUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CardStackItem = {
  id: string | number
  title: string
  description?: string
  imageSrc?: string
  href?: string
  ctaLabel?: string
  tag?: string
}

export type CardStackProps<T extends CardStackItem> = {
  items: T[]
  initialIndex?: number
  maxVisible?: number
  cardWidth?: number
  cardHeight?: number
  overlap?: number
  spreadDeg?: number
  perspectivePx?: number
  depthPx?: number
  tiltXDeg?: number
  activeLiftPx?: number
  activeScale?: number
  inactiveScale?: number
  springStiffness?: number
  springDamping?: number
  loop?: boolean
  autoAdvance?: boolean
  intervalMs?: number
  pauseOnHover?: boolean
  showDots?: boolean
  className?: string
  onChangeIndex?: (index: number, item: T) => void
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode
}

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0
  return ((n % len) + len) % len
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active
  if (!loop || len <= 1) return raw
  const alt = raw > 0 ? raw - len : raw + len
  return Math.abs(alt) < Math.abs(raw) ? alt : raw
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion()
  const len = items.length

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len))
  const [hovering, setHovering] = React.useState(false)
  const [width, setWidth] = React.useState(cardWidth)
  const [height, setHeight] = React.useState(cardHeight)
  const [tier, setTier] = React.useState<'sm' | 'md' | 'lg'>('lg')

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len))
  }, [len])

  React.useEffect(() => {
    if (!len) return
    onChangeIndex?.(active, items[active]!)
    // intentionally only when active changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  React.useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      if (vw < 480) {
        setWidth(Math.min(cardWidth, vw - 48))
        setHeight(Math.round(cardHeight * 0.72))
        setTier('sm')
      } else if (vw < 768) {
        setWidth(Math.min(cardWidth, vw - 64))
        setHeight(Math.round(cardHeight * 0.85))
        setTier('sm')
      } else if (vw < 1024) {
        setWidth(Math.min(cardWidth, vw - 96))
        setHeight(Math.round(cardHeight * 0.92))
        setTier('md')
      } else {
        setWidth(cardWidth)
        setHeight(cardHeight)
        setTier('lg')
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [cardWidth, cardHeight])

  // Fewer neighbours and a tighter fan on small screens, where wide spreads
  // push cards off-screen and out of reach.
  const visibleCards =
    tier === 'sm'
      ? Math.min(maxVisible, 3)
      : tier === 'md'
      ? Math.min(maxVisible, 5)
      : maxVisible
  const fanDeg =
    tier === 'sm' ? spreadDeg * 0.55 : tier === 'md' ? spreadDeg * 0.8 : spreadDeg

  const maxOffset = Math.max(0, Math.floor(visibleCards / 2))
  const cardSpacing = Math.max(10, Math.round(width * (1 - overlap)))
  const stepDeg = maxOffset > 0 ? fanDeg / maxOffset : 0

  const canGoPrev = loop || active > 0
  const canGoNext = loop || active < len - 1

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return
    setActive((a) => wrapIndex(a - 1, len))
  }, [canGoPrev, len])

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return
    setActive((a) => wrapIndex(a + 1, len))
  }, [canGoNext, len])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return
    if (pauseOnHover && hovering) return

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next()
    }, Math.max(700, intervalMs))

    return () => window.clearInterval(id)
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ])

  if (!len) return null

  const activeItem = items[active]!

  return (
    <div
      className={cn('w-full', className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="relative w-full overflow-hidden outline-none"
        style={{ height: Math.max(height + 72, 260) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Service highlights"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-ink/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-gold/10 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop)
              const abs = Math.abs(off)
              if (abs > maxOffset) return null

              const rotateZ = off * stepDeg
              const x = off * cardSpacing
              const y = abs * 10
              const z = -abs * depthPx
              const isActive = off === 0
              const scale = isActive ? activeScale : inactiveScale
              const lift = isActive ? -activeLiftPx : 0
              const rotateX = isActive ? 0 : tiltXDeg
              const zIndex = 100 - abs

              const dragProps = isActive
                ? {
                    drag: 'x' as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: MouseEvent | TouchEvent | PointerEvent,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return
                      const travel = info.offset.x
                      const v = info.velocity.x
                      const threshold = Math.min(160, width * 0.22)
                      if (travel > threshold || v > 650) prev()
                      else if (travel < -threshold || v < -650) next()
                    },
                  }
                : {}

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    'absolute bottom-0 overflow-hidden rounded-2xl border-4 border-gold/25 shadow-xl',
                    'will-change-transform select-none',
                    isActive
                      ? 'cursor-grab active:cursor-grabbing'
                      : 'cursor-pointer',
                  )}
                  style={{
                    width,
                    height,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 40,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {showDots ? (
        <div className="mt-4 flex items-center justify-center gap-1">
          <div className="flex items-center">
            {items.map((it, idx) => {
              const on = idx === active
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className="inline-flex size-10 items-center justify-center"
                  aria-label={`Go to ${it.title}`}
                  aria-current={on ? 'true' : undefined}
                >
                  <span
                    className={cn(
                      'block size-2 rounded-full transition',
                      on ? 'bg-gold' : 'bg-ink/25 hover:bg-ink/40',
                    )}
                  />
                </button>
              )
            })}
          </div>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              className="inline-flex size-10 items-center justify-center text-muted-foreground transition hover:text-gold"
              aria-label="Open related page"
            >
              <SquareArrowOutUpRight className="size-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function DefaultFanCard({
  item,
}: {
  item: CardStackItem
  active: boolean
}) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-muted">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 90vw, 520px"
            className="object-cover"
            draggable={false}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        {item.tag ? (
          <span className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-gold">
            {item.tag}
          </span>
        ) : null}
        <div className="truncate font-serif text-lg text-champagne md:text-xl">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-champagne/80">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  )
}
