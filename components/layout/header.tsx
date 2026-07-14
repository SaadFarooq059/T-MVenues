'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks, type NavLink } from '@/lib/content'

/* ─────────────────────────────────────────────
   Regular nav item (no children)
───────────────────────────────────────────── */
function NavItem({ link, solid }: { link: NavLink; solid: boolean }) {
  const pathname = usePathname()
  const active = pathname === link.href || pathname.startsWith(link.href + '/')

  return (
    <Link
      href={link.href}
      className={cn(
        'relative px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200',
        solid
          ? active ? 'text-gold' : 'text-ink hover:text-gold'
          : active ? 'text-gold' : 'text-champagne/90 hover:text-champagne',
      )}
    >
      {link.label}
      {active && (
        <span
          className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-gold"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}

/* ─────────────────────────────────────────────
   Dropdown nav item (has children)
   Uses CSS transitions (not Motion) so it works
   reliably in Firefox and inside the preview iframe.
───────────────────────────────────────────── */
function DropdownNavItem({ link, solid }: { link: NavLink; solid: boolean }) {
  const pathname = usePathname()
  const active = pathname === link.href || pathname.startsWith(link.href + '/')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const openNow = () => {
    cancelClose()
    setOpen(true)
  }
  // Delay close so moving from the button to the panel never drops it (Firefox-safe)
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      cancelClose()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={link.href}
        onClick={() => setOpen(false)}
        onFocus={openNow}
        aria-expanded={open}
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200',
          solid
            ? active ? 'text-gold' : 'text-ink hover:text-gold'
            : active ? 'text-gold' : 'text-champagne/90 hover:text-champagne',
        )}
      >
        {link.label}
        <ChevronDown
          className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
        {active && (
          <span
            className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-gold"
            aria-hidden="true"
          />
        )}
      </Link>

      {/* Dropdown panel — CSS transition, always in DOM, toggled via opacity/visibility */}
      <div
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        className={cn(
          'absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 transition-all duration-200 ease-out',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <div className="overflow-hidden rounded-2xl bg-champagne shadow-[0_8px_32px_rgba(34,42,53,0.14),0_0_0_1px_rgba(34,42,53,0.06)]">
          {/* All services link */}
          <Link
            href={link.href}
            onClick={() => setOpen(false)}
            className="block border-b border-ink/8 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
          >
            All Services
          </Link>
          {link.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className={cn(
                'group flex flex-col gap-0.5 px-5 py-3.5 transition-colors hover:bg-ink/[0.04]',
                pathname === child.href && 'bg-ink/[0.04]',
              )}
            >
              <span
                className={cn(
                  'text-sm font-medium transition-colors group-hover:text-gold',
                  pathname === child.href ? 'text-gold' : 'text-ink',
                )}
              >
                {child.label}
              </span>
              {child.description && (
                <span className="text-xs leading-snug text-muted-foreground">
                  {child.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Root header
───────────────────────────────────────────── */
function splitLinks(links: NavLink[]): [NavLink[], NavLink[]] {
  const mid = Math.ceil(links.length / 2)
  return [links.slice(0, mid), links.slice(mid)]
}

export function Header({ links = navLinks }: { links?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = pathname === '/'
  const solid = scrolled || mobileOpen || !isHome
  const [leftLinks, rightLinks] = splitLinks(links)

  const renderDesktopLink = (link: NavLink) =>
    link.children ? (
      <DropdownNavItem key={link.href} link={link} solid={solid} />
    ) : (
      <NavItem key={link.href} link={link} solid={solid} />
    )

  return (
    <>
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-500',
          scrolled ? 'px-5 pt-3' : 'px-0 pt-0',
        )}
      >
        <div
          className={cn(
            'w-full transition-[border-radius,background-color,box-shadow,max-width] duration-500',
            scrolled ? 'rounded-full max-w-fit' : 'rounded-none max-w-none',
            scrolled
              ? 'bg-champagne/95 shadow-[0_2px_24px_rgba(34,42,53,0.10),0_0_0_1px_rgba(34,42,53,0.07)] backdrop-blur-md'
              : solid
              ? 'bg-champagne/95 border-b border-border/60 backdrop-blur'
              : 'bg-transparent border-b border-transparent',
            solid ? 'text-ink' : 'text-champagne',
          )}
        >
          <div
            className={cn(
              'relative flex items-center justify-center transition-[height,padding] duration-500',
              scrolled ? 'h-20 px-4' : 'h-24 px-8 md:h-28',
            )}
          >
            {/* Left links */}
            <nav className="hidden items-center lg:flex" aria-label="Primary">
              {leftLinks.map(renderDesktopLink)}
            </nav>

            {/* Centre logo */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="shrink-0 px-3 md:px-6"
              aria-label="T&M Venue Styling — Home"
            >
              <Image
                src="/logo.png"
                alt="T&M Venue Styling"
                width={280}
                height={280}
                priority
                className={cn(
                  'w-auto transition-[height,filter] duration-500',
                  scrolled ? 'h-14 md:h-16' : 'h-20 md:h-24',
                  !solid && 'brightness-0 invert',
                )}
              />
            </Link>

            {/* Right links */}
            <div className="hidden items-center lg:flex">
              {rightLinks.map(renderDesktopLink)}
            </div>

            {/* Mobile hamburger */}
            <div className="absolute right-4 flex lg:hidden">
              <button
                type="button"
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-full transition-colors',
                  solid ? 'text-ink hover:bg-ink/8' : 'text-champagne hover:bg-champagne/15',
                )}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile panel — CSS transitions, no Motion ── */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <nav
        className={cn(
          'fixed right-4 top-28 z-40 w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-champagne px-3 py-3 shadow-2xl transition-all duration-300 ease-out lg:hidden',
          mobileOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {links.map((link, i) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          if (link.children) {
            return (
              <div key={link.href}>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                >
                  <span className={active ? 'text-gold' : ''}>{link.label}</span>
                  <ChevronDown
                    className={cn(
                      'size-4 text-muted-foreground transition-transform duration-200',
                      mobileServicesOpen && 'rotate-180',
                    )}
                  />
                </button>
                {/* Sub-links — CSS grid-rows trick for smooth height animation */}
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-in-out',
                    mobileServicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="ml-4 mb-1 border-l-2 border-gold/30 pl-3">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground hover:text-gold"
                      >
                        All Services
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'block py-2.5 text-sm transition-colors hover:text-gold',
                            pathname === child.href ? 'text-gold' : 'text-ink/80',
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                {i < links.length - 1 && (
                  <div className="mx-4 h-px bg-ink/8" aria-hidden="true" />
                )}
              </div>
            )
          }

          return (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block rounded-xl px-4 py-3.5 text-sm font-medium transition-colors',
                  active ? 'text-gold' : 'text-ink hover:bg-ink/5',
                )}
              >
                {link.label}
              </Link>
              {i < links.length - 1 && (
                <div className="mx-4 h-px bg-ink/8" aria-hidden="true" />
              )}
            </div>
          )
        })}
        <div className="mx-3 mt-2 mb-1">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full rounded-xl bg-gold px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-dark"
          >
            Enquire Now
          </Link>
        </div>
      </nav>
    </>
  )
}
