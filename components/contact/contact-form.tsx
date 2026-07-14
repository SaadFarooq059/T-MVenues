'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Commercial Shoot',
  'Collaboration',
  'Other',
]

const inputClass =
  'w-full rounded-sm border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

const labelClass =
  'mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-foreground/70'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Simulate an async submission. Wire to a Server Action or API route later.
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-sm border border-gold/30 bg-card px-6 py-16 text-center"
          >
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold text-ink">
              <Check className="size-7" />
            </span>
            <h3 className="mt-6 font-serif text-3xl text-foreground">
              Thank you
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-foreground/65">
              Your enquiry is with us. We&apos;ll be in touch very soon to start
              planning something beautiful together.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5"
          >
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
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-dark hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Sending…' : 'Send Enquiry'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
