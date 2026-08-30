'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

/**
 * A slow, breathing green wave field. Responds gently to the mouse and emits a
 * soft ripple on click. Not a chart — purely atmospheric. Uses a single 2D
 * canvas and rAF, paused when off-screen or when reduced motion is set.
 */
export function PulseWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let running = true
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const mouse = { x: 0.5, active: false }
    const ripples: { x: number; y: number; t: number }[] = []

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const layers = [
      { amp: 26, speed: 0.00022, freq: 0.006, alpha: 0.1, offset: 0 },
      { amp: 20, speed: 0.0003, freq: 0.009, alpha: 0.16, offset: 2 },
      { amp: 14, speed: 0.00042, freq: 0.013, alpha: 0.26, offset: 4 },
    ]

    function draw(now: number) {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      const mouseInfluence = mouse.active ? 1.5 : 1
      layers.forEach((layer, li) => {
        ctx.beginPath()
        const baseY = height * (0.55 + li * 0.06)
        for (let x = 0; x <= width; x += 6) {
          const phase = reduced ? 0 : now * layer.speed
          let y =
            baseY +
            Math.sin(x * layer.freq + phase + layer.offset) * layer.amp * mouseInfluence +
            Math.sin(x * layer.freq * 0.5 - phase * 0.7) * layer.amp * 0.4

          // ripple contribution
          for (const r of ripples) {
            const age = now - r.t
            const radius = age * 0.35
            const d = Math.abs(x - r.x)
            const band = Math.exp(-Math.pow(d - radius, 2) / 900)
            y -= band * 30 * Math.exp(-age / 1400)
          }
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        const grad = ctx.createLinearGradient(0, baseY - layer.amp, 0, height)
        grad.addColorStop(0, `rgba(22,166,90,${layer.alpha})`)
        grad.addColorStop(1, 'rgba(22,166,90,0)')
        ctx.fillStyle = grad
        ctx.fill()
      })

      // prune old ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].t > 3000) ripples.splice(i, 1)
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.active = true
    }
    function onLeave() {
      mouse.active = false
    }
    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: performance.now() })
    }

    // pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running && !reduced) {
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(draw)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('click', onClick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className={cn('h-full w-full cursor-crosshair', className)}
      aria-hidden
    />
  )
}
