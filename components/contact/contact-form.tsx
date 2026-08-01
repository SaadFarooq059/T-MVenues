'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Mail, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { siteMeta } from '@/lib/content'
import { headingCard } from '@/components/ui/atoms'

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Commercial Shoot',
  'Collaboration',
  'Other',
]

const inputClass =
  'w-full rounded-sm border border-border bg-champagne px-4 py-3 text-base text-ink placeholder:text-ink/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

const labelClass =
  'mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-ink/60'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
  }

  function closeSuccess() {
    setSubmitted(false)
  }

  useEffect(() => {
    if (!submitted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSuccess()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [submitted])

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="eventType" className={labelClass}>
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Please select
              </option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>
              Event Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="venue" className={labelClass}>
            Venue / Location
          </label>
          <input
            id="venue"
            name="venue"
            type="text"
            placeholder="If you have one in mind"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Tell us about your day
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="The feeling you want to create, guest numbers, ideas..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-dark hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? 'Sending…' : 'Send Enquiry'}
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-success-title"
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
              aria-label="Close thank you message"
              onClick={closeSuccess}
            />

            <motion.div
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gold/25 bg-champagne shadow-[0_24px_80px_rgba(42,37,33,0.35)]"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-gold-dark via-gold to-[#c4a46a]" />

              <button
                type="button"
                onClick={closeSuccess}
                className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-ink/10 text-ink/50 transition-colors hover:border-gold hover:bg-gold/15 hover:text-ink"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              <div className="px-7 pt-10 pb-8 text-center sm:px-9 sm:pt-12 sm:pb-10">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold text-ink shadow-md">
                  <Check className="size-8" strokeWidth={2.5} />
                </span>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.22em] text-gold">
                  Enquiry received
                </p>

                <h3
                  id="enquiry-success-title"
                  className={`mt-3 ${headingCard}`}
                >
                  Thank you
                </h3>

                <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-ink/70">
                  Your message is with Katie &amp; Lucie. We&apos;ll reply soon
                  to start shaping something beautiful for your day.
                </p>

                <div className="mx-auto mt-7 max-w-xs space-y-3 rounded-xl border border-gold/20 bg-cream/80 px-5 py-4 text-left">
                  <a
                    href={`mailto:${siteMeta.email}`}
                    className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
                  >
                    <Mail className="size-4 shrink-0 text-gold" />
                    <span className="truncate">{siteMeta.email}</span>
                  </a>
                  <a
                    href={`tel:${siteMeta.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-sm text-ink transition-colors hover:text-gold"
                  >
                    <Phone className="size-4 shrink-0 text-gold" />
                    <span>{siteMeta.phone}</span>
                  </a>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={closeSuccess}
                    className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-dark hover:text-champagne"
                  >
                    Close
                  </button>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center justify-center rounded-full border border-ink/15 px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-ink/80 transition-colors hover:border-gold hover:text-gold"
                  >
                    View gallery
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
