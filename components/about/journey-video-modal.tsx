'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Pause, Play, Volume1, Volume2, VolumeX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ShaderBackground } from '@/components/ui/shader-background'

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function CustomSlider({
  value,
  onChange,
  className,
}: {
  value: number
  onChange: (value: number) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative h-1 w-full cursor-pointer rounded-full bg-ink/15',
        className,
      )}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = (x / rect.width) * 100
        onChange(Math.min(Math.max(percentage, 0), 100))
      }}
      role="slider"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-gold"
        style={{ width: `${value}%` }}
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  )
}

function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      void video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current
    if (!video) return
    const newVolume = value / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const next = (video.currentTime / video.duration) * 100
    setProgress(isFinite(next) ? next : 0)
    setCurrentTime(video.currentTime)
    setDuration(video.duration)
  }

  const handleSeek = (value: number) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const time = (value / 100) * video.duration
    if (isFinite(time)) {
      video.currentTime = time
      setProgress(value)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    const next = !isMuted
    video.muted = next
    setIsMuted(next)
    if (next) {
      setVolume(0)
    } else {
      setVolume(1)
      video.volume = 1
    }
  }

  const setSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = speed
    setPlaybackSpeed(speed)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    void video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false))
  }, [])

  return (
    <motion.div
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-gold/25 bg-champagne/80 shadow-[0_0_40px_rgba(42,37,33,0.18)] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="aspect-video w-full bg-ink object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        src={src}
        poster={poster}
        onClick={togglePlay}
        playsInline
      />

      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute right-0 bottom-0 left-0 m-2 mx-auto max-w-xl rounded-2xl border border-gold/20 bg-champagne/90 p-4 backdrop-blur-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-ink/70">{formatTime(currentTime)}</span>
              <CustomSlider
                value={progress}
                onChange={handleSeek}
                className="flex-1"
              />
              <span className="text-sm text-ink/70">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="icon"
                  className="text-ink hover:bg-gold/20 hover:text-ink"
                >
                  {isPlaying ? (
                    <Pause className="size-5" />
                  ) : (
                    <Play className="size-5" />
                  )}
                </Button>
                <div className="flex items-center gap-x-1">
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="icon"
                    className="text-ink hover:bg-gold/20 hover:text-ink"
                  >
                    {isMuted ? (
                      <VolumeX className="size-5" />
                    ) : volume > 0.5 ? (
                      <Volume2 className="size-5" />
                    ) : (
                      <Volume1 className="size-5" />
                    )}
                  </Button>
                  <div className="hidden w-24 sm:block">
                    <CustomSlider
                      value={volume * 100}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <Button
                    key={speed}
                    onClick={() => setSpeed(speed)}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'text-ink hover:bg-gold/20 hover:text-ink',
                      playbackSpeed === speed && 'bg-gold/25',
                    )}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function JourneyVideoModal({
  open,
  onClose,
  src,
  poster,
}: {
  open: boolean
  onClose: () => void
  src: string
  poster?: string
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
              <VideoPlayer src={src} poster={poster} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
