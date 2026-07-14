'use client'

import { useRef, useState } from 'react'

/**
 * Auto-playing looping video card with a play/pause toggle and a radial
 * gold spotlight on mouse-move — matching the inspiration design but using
 * our champagne/ink/gold palette instead of blue.
 *
 * Drop a file at /public/videos/intro.mp4 to replace the placeholder.
 * Until then it shows a polished fallback poster (the intro image).
 */
export function VideoCard({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    })
  }

  function togglePlay() {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div
      ref={cardRef}
      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl shadow-[0_4px_32px_rgba(34,42,53,0.18)] ${className ?? 'aspect-video'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={togglePlay}
    >
      {/* Video — replace src with your real file */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        poster="/images/intro.png"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />

      {/* Radial gold spotlight overlay on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${mousePos.x} ${mousePos.y}, rgba(176,141,87,0.35) 0%, rgba(0,0,0,0.15) 55%)`,
        }}
        aria-hidden="true"
      />

      {/* Play/pause button — visible on hover */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-champagne/80 bg-ink/40 backdrop-blur-sm">
          {playing ? (
            /* Pause icon */
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
