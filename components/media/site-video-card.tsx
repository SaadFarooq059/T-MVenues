'use client'

import { useRef, useState } from 'react'
import type { SiteVideoData } from '@/lib/contentful'
import { toVideoEmbedUrl } from '@/components/media/site-video-utils'

/**
 * Autoplay looping video card (Home Intro behaviour) — same UI as the
 * previous VideoCard, fed by Contentful Site Video data.
 */
export function SiteVideoCard({
  video,
  source,
  className,
}: {
  video: SiteVideoData
  source: { kind: 'embed' | 'file'; src: string }
  className?: string
}) {
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
    if (source.kind === 'embed') return
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      void videoRef.current.play()
    }
    setPlaying(!playing)
  }

  const embedSrc =
    source.kind === 'embed'
      ? toVideoEmbedUrl(video.videoUrl!, {
          autoplay: true,
          loop: true,
          muted: true,
        }) ?? source.src
      : null

  return (
    <div
      ref={cardRef}
      className={`relative w-full overflow-hidden rounded-2xl shadow-[0_4px_32px_rgba(34,42,53,0.18)] ${className ?? 'aspect-video'} ${source.kind === 'file' ? 'cursor-pointer' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={source.kind === 'file' ? togglePlay : undefined}
    >
      {source.kind === 'embed' && embedSrc ? (
        <iframe
          src={embedSrc}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0 object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={source.src}
          poster={video.posterUrl}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      )}

      {source.kind === 'file' ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(circle at ${mousePos.x} ${mousePos.y}, rgba(176,141,87,0.35) 0%, rgba(0,0,0,0.15) 55%)`,
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
            aria-hidden="true"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-champagne/80 bg-ink/40 backdrop-blur-sm">
              {playing ? (
                <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>
        </>
      ) : null}

      {video.caption ? (
        <p className="sr-only">{video.caption}</p>
      ) : null}
    </div>
  )
}
