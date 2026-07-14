'use client'

import { useEffect, useState } from 'react'

const SPLASH_MS = 1100
const FADE_MS = 450

export function SplashScreen() {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in')

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const hide = window.setTimeout(() => {
      setPhase('out')
      document.documentElement.style.overflow = ''
    }, SPLASH_MS)

    return () => {
      window.clearTimeout(hide)
      document.documentElement.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (phase !== 'out') return
    const remove = window.setTimeout(() => setPhase('gone'), FADE_MS)
    return () => window.clearTimeout(remove)
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3ecdf',
        opacity: phase === 'out' ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-in-out`,
        pointerEvents: phase === 'out' ? 'none' : 'auto',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="T&M Venue Styling"
        width={280}
        height={280}
        style={{
          width: 'min(60vw, 16rem)',
          height: 'auto',
          animation: 'tm-splash-logo-in 0.9s ease-out forwards',
        }}
      />
    </div>
  )
}
