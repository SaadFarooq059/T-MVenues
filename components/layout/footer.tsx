'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { navLinks, siteMeta, type NavLink } from '@/lib/content'

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function Footer({
  links = navLinks,
  meta = siteMeta,
}: {
  links?: NavLink[]
  meta?: typeof siteMeta
}) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter signup is UI-only for now; wire to an email provider later.
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-ink text-champagne">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-6">
            <Link href="/" aria-label="T&M Venue Styling — Home" className="inline-block">
              <Image
                src="/logo.png"
                alt="T&M Venue Styling"
                width={200}
                height={200}
                className="h-20 w-auto brightness-0 invert md:h-32"
              />
            </Link>
            <p className="mt-4 max-w-xs text-pretty leading-relaxed text-champagne/60">
              {meta.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-champagne/70 transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-champagne/70">
              <li>
                <a href={`tel:${meta.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-3 transition-colors hover:text-champagne">
                  <Phone className="size-4 text-gold" />
                  {meta.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${meta.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-champagne">
                  <Mail className="size-4 text-gold" />
                  {meta.email}
                </a>
              </li>
              <li>
                <a href={meta.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 transition-colors hover:text-champagne">
                  <InstagramGlyph className="size-4 text-gold" />
                  {meta.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
              Newsletter
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-champagne/60">
              Styling inspiration and seasonal ideas, occasionally.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center border-b border-champagne/25 focus-within:border-gold">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent py-2 text-base text-champagne placeholder:text-champagne/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 pl-3 text-xs font-medium uppercase tracking-[0.16em] text-gold transition-colors hover:text-champagne"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 text-xs text-sage" role="status">
                  Thank you — you&apos;re on the list.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-champagne/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {meta.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
