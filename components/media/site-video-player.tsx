'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SiteVideoData } from '@/lib/contentful'
import { toVideoEmbedUrl } from '@/components/media/site-video-utils'

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
    // Vertical padding gives the 4px track a finger-sized hit area without
    // affecting the horizontal maths used to seek.
    <div
      className={cn('relative w-full cursor-pointer py-3', className)}
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
      <div className="relative h-1 w-full rounded-full bg-ink/15">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gold"
          style={{ width: `${value}%` }}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  )
}

function NativeVideoPlayer({
  src,
  poster,
  title,
}: {
  src: string
  poster?: string
  title: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  // Starts muted so the autoplay below is allowed on iOS and Android.
  const [volume, setVolume] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
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
        muted={isMuted}
        aria-label={title}
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
                  className="size-11 text-ink hover:bg-gold/20 hover:text-ink"
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
                    className="size-11 text-ink hover:bg-gold/20 hover:text-ink"
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
                      'size-9 text-ink hover:bg-gold/20 hover:text-ink',
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

/** Modal / player surface for Site Video — embed or native file. */
export function SiteVideoPlayer({
  video,
  source,
  className,
}: {
  video: SiteVideoData
  source: { kind: 'embed' | 'file'; src: string }
  className?: string
}) {
  if (source.kind === 'embed') {
    const embedSrc =
      toVideoEmbedUrl(video.videoUrl!, { autoplay: true }) ?? source.src

    return (
      <motion.div
        className={cn(
          'relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-gold/25 bg-ink shadow-[0_0_40px_rgba(42,37,33,0.18)]',
          className,
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <iframe
          src={embedSrc}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full border-0"
        />
        {video.caption ? (
          <p className="px-4 py-3 text-center text-sm text-champagne/80">
            {video.caption}
          </p>
        ) : null}
      </motion.div>
    )
  }

  return (
    <div className={className}>
      <NativeVideoPlayer
        src={source.src}
        poster={video.posterUrl}
        title={video.title}
      />
      {video.caption ? (
        <p className="mt-3 text-center text-sm text-ink/70">{video.caption}</p>
      ) : null}
    </div>
  )
}
