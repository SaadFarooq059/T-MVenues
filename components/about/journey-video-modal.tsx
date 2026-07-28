'use client'

import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { ShaderBackground } from '@/components/ui/shader-background'

export function JourneyVideoModal({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children?: ReactNode
}) {
  useEffect(() => {
    if (!open) return
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
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Journey video"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <ShaderBackground className="absolute inset-0 size-full" />
            <div className="absolute inset-0 bg-champagne/30" />
          </div>

          <button
            type="button"
            className="absolute inset-0 z-10"
            aria-label="Close video overlay"
            onClick={onClose}
          />

          <button
            type="button"
            aria-label="Close video"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 flex size-11 items-center justify-center rounded-full border border-gold/30 bg-champagne/90 text-ink shadow-md transition-colors hover:bg-gold hover:text-ink sm:top-6 sm:right-6"
          >
            <X className="size-5" />
          </button>

          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-8">
            <div
              className="pointer-events-auto w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
