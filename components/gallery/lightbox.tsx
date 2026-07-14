'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryImage } from '@/lib/content'

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  const open = index !== null

  const goPrev = useCallback(() => {
    if (index === null) return
    onIndexChange((index - 1 + images.length) % images.length)
  }, [index, images.length, onIndexChange])

  const goNext = useCallback(() => {
    if (index === null) return
    onIndexChange((index + 1) % images.length)
  }, [index, images.length, onIndexChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, goPrev, goNext])

  const current = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 inline-flex size-11 items-center justify-center text-champagne/80 transition-colors hover:text-gold"
          >
            <X className="size-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous image"
            className="absolute left-3 z-10 inline-flex size-12 items-center justify-center text-champagne/80 transition-colors hover:text-gold md:left-8"
          >
            <ChevronLeft className="size-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
            className="absolute right-3 z-10 inline-flex size-12 items-center justify-center text-champagne/80 transition-colors hover:text-gold md:right-8"
          >
            <ChevronRight className="size-8" />
          </button>

          <motion.figure
            key={current.id}
            className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={current.src || '/placeholder.svg'}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-champagne/70">
              <span className="text-gold">{current.category}</span>
              <span className="mx-2 text-champagne/30">/</span>
              {current.alt}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
