'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createNoise3D } from 'simplex-noise'

type WavyBackgroundProps = {
  children?: ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: 'slow' | 'fast'
  waveOpacity?: number
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = '#f3ecdf',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef(0)
  const noise = useRef(createNoise3D()).current
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'),
    )
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let nt = 0

    const getSpeed = () => (speed === 'fast' ? 0.002 : 0.001)

    const waveColors = colors ?? [
      '#b08d57',
      '#c9a86c',
      '#d4b483',
      '#8f7245',
      '#e0c9a0',
    ]

    const resize = () => {
      const parent = canvas.parentElement
      w = ctx.canvas.width = parent?.clientWidth || window.innerWidth
      h = ctx.canvas.height = parent?.clientHeight || window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }

    const drawWave = (n: number) => {
      nt += getSpeed()
      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth || 50
        ctx.strokeStyle = waveColors[i % waveColors.length]
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100
          ctx.lineTo(x, y + h * 0.5)
        }
        ctx.stroke()
        ctx.closePath()
      }
    }

    const render = () => {
      ctx.fillStyle = backgroundFill
      ctx.globalAlpha = waveOpacity
      ctx.fillRect(0, 0, w, h)
      drawWave(5)
      animationRef.current = requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [backgroundFill, blur, colors, noise, speed, waveOpacity, waveWidth])

  return (
    <div
      className={cn(
        'relative flex h-[85vh] min-h-[520px] flex-col items-center justify-center overflow-hidden',
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0 size-full"
        ref={canvasRef}
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
      <div className={cn('relative z-10', className)}>{children}</div>
    </div>
  )
}
