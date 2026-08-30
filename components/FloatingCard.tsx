'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { tiltSpring } from '@/lib/animations'
import { useIsTouch, useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt in degrees. */
  intensity?: number
  /** Enable the slow idle float loop. */
  float?: boolean
}

/**
 * Wraps content in a card that subtly tilts toward the cursor (desktop only)
 * and gently floats. Movement is spring-smoothed and capped.
 */
export function FloatingCard({
  children,
  className,
  intensity = 5,
  float = true,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isTouch = useIsTouch()
  const reduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), tiltSpring)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), tiltSpring)
  const translateX = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), tiltSpring)
  const translateY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), tiltSpring)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || reduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function reset() {
    mx.set(0)
    my.set(0)
  }

  const enableTilt = !isTouch && !reduced

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn('[perspective:1200px]', className)}
    >
      <motion.div
        style={
          enableTilt
            ? { rotateX, rotateY, x: translateX, y: translateY, transformStyle: 'preserve-3d' }
            : undefined
        }
        animate={
          float && !reduced
            ? { y: [0, -12, 0], rotate: [0, 0.6, 0] }
            : undefined
        }
        transition={
          float && !reduced
            ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
