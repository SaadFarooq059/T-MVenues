'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BentoMediaItem = {
  id: number | string
  type: 'image' | 'video'
  title: string
  desc: string
  url: string
  span: string
}

function MediaItem({
  item,
  className,
  onClick,
  contain = false,
}: {
  item: BentoMediaItem
  className?: string
  onClick?: () => void
  contain?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isBuffering, setIsBuffering] = useState(true)

  useEffect(() => {
    if (item.type !== 'video') return
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { rootMargin: '50px', threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.type])

  useEffect(() => {
    if (item.type !== 'video') return
    const el = videoRef.current
    if (!el) return

    let cancelled = false

    const play = async () => {
      try {
        if (el.readyState >= 3) {
          setIsBuffering(false)
          await el.play()
        } else {
          setIsBuffering(true)
          await new Promise<void>((resolve) => {
            const onReady = () => {
              el.removeEventListener('canplay', onReady)
              resolve()
            }
            el.addEventListener('canplay', onReady)
          })
          if (!cancelled) {
            setIsBuffering(false)
            await el.play()
          }
        }
      } catch {
        // Autoplay can fail on some browsers — ignore quietly
      }
    }

    if (isInView) void play()
    else el.pause()

    return () => {
      cancelled = true
      el.pause()
    }
  }, [isInView, item.type])

  if (item.type === 'video') {
    return (
      <div className={cn('relative overflow-hidden bg-ink/10', className)}>
        <video
          ref={videoRef}
          className={cn(
            'h-full w-full',
            contain ? 'object-contain' : 'object-cover',
          )}
          onClick={onClick}
          playsInline
          muted
          loop
          preload="metadata"
          style={{ opacity: isBuffering ? 0.85 : 1 }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering ? (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/10">
            <div className="size-6 animate-spin rounded-full border-2 border-champagne/30 border-t-gold" />
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={cn('relative block overflow-hidden bg-ink/10', className)}
      onClick={onClick}
      aria-label={item.title}
    >
      <Image
        src={item.url}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={contain ? 'object-contain' : 'object-cover'}
      />
    </button>
  )
}

function GalleryModal({
  selectedItem,
  onClose,
  setSelectedItem,
  mediaItems,
}: {
  selectedItem: BentoMediaItem
  onClose: () => void
  setSelectedItem: (item: BentoMediaItem) => void
  mediaItems: BentoMediaItem[]
}) {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close gallery"
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col px-3 py-6 sm:px-6 sm:py-10"
        role="dialog"
        aria-modal="true"
        aria-label={selectedItem.title}
      >
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              className="relative aspect-[4/5] w-full max-w-3xl overflow-hidden rounded-xl border border-gold/25 bg-champagne shadow-2xl sm:aspect-[16/10] sm:max-h-[72vh]"
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            >
              <MediaItem
                item={selectedItem}
                className="absolute inset-0 h-full w-full"
                contain
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-4 sm:p-5">
                <h3 className="font-serif text-lg text-champagne sm:text-xl">
                  {selectedItem.title}
                </h3>
                <p className="mt-1 text-sm text-champagne/80">{selectedItem.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-gold/40 bg-champagne text-ink transition-colors hover:bg-gold sm:right-8 sm:top-8"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y,
          }))
        }}
        className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 touch-none"
      >
        <div className="cursor-grab rounded-full border border-gold/35 bg-champagne/90 px-3 py-2 shadow-lg backdrop-blur-md active:cursor-grabbing">
          <div className="flex items-center -space-x-2">
            {mediaItems.map((item, index) => {
              const active = selectedItem.id === item.id
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItem(item)
                  }}
                  style={{ zIndex: active ? 30 : mediaItems.length - index }}
                  className={cn(
                    'relative size-9 shrink-0 overflow-hidden rounded-lg border border-cream sm:size-10',
                    active
                      ? 'ring-2 ring-gold shadow-md'
                      : 'hover:ring-2 hover:ring-gold/40',
                  )}
                  initial={{ rotate: index % 2 === 0 ? -12 : 12 }}
                  animate={{
                    scale: active ? 1.18 : 1,
                    rotate: active ? 0 : index % 2 === 0 ? -12 : 12,
                    y: active ? -6 : 0,
                  }}
                  whileHover={{ scale: 1.25, rotate: 0, y: -8 }}
                  aria-label={`View ${item.title}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <MediaItem item={item} className="absolute inset-0" />
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export type InteractiveBentoGalleryProps = {
  mediaItems: BentoMediaItem[]
  title: string
  description: string
  className?: string
}

export default function InteractiveBentoGallery({
  mediaItems,
  title,
  description,
  className,
}: InteractiveBentoGalleryProps) {
  const reduceMotion = useReducedMotion()
  const [selectedItem, setSelectedItem] = useState<BentoMediaItem | null>(null)
  const [items, setItems] = useState(mediaItems)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setItems(mediaItems)
  }, [mediaItems])

  return (
    <div className={cn('mx-auto w-full max-w-5xl px-5 sm:px-6', className)}>
      <div className="mb-8 text-center md:mb-10">
        <motion.h2
          className="text-balance font-serif text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-5xl"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-ink/65 sm:text-base"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {description}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : (
          <motion.div
            className="grid auto-rows-[72px] grid-cols-2 gap-2.5 sm:auto-rows-[80px] sm:grid-cols-3 sm:gap-3 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
              },
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`media-${item.id}`}
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-xl border border-gold/20',
                  item.span,
                )}
                onClick={() => {
                  if (!isDragging) setSelectedItem(item)
                }}
                variants={{
                  hidden: { y: 28, scale: 0.96, opacity: 0 },
                  visible: {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 340,
                      damping: 26,
                      delay: reduceMotion ? 0 : index * 0.04,
                    },
                  },
                }}
                whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                drag={!reduceMotion}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.9}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false)
                  const moveDistance = info.offset.x + info.offset.y
                  if (Math.abs(moveDistance) <= 50) return
                  const next = [...items]
                  const dragged = next[index]!
                  const targetIndex =
                    moveDistance > 0
                      ? Math.min(index + 1, items.length - 1)
                      : Math.max(index - 1, 0)
                  next.splice(index, 1)
                  next.splice(targetIndex, 0, dragged)
                  setItems(next)
                }}
              >
                <MediaItem
                  item={item}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                  <h3 className="line-clamp-1 font-serif text-sm text-champagne sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-champagne/75 sm:text-xs">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
