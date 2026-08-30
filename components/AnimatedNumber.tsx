'use client'

import { useEffect, useRef } from 'react'
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks'

interface AnimatedNumberProps {
  value: number
  className?: string
  /** Number of decimal places. */
  decimals?: number
}

export function AnimatedNumber({ value, className, decimals = 0 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 90, damping: 20, mass: 0.8 })
  const text = useTransform(spring, (latest) =>
    latest.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  )

  useEffect(() => {
    if (reduced) {
      mv.set(value)
    } else if (inView) {
      mv.set(value)
    }
  }, [inView, value, mv, reduced])

  return (
    <span ref={ref} className={className} aria-label={String(value)}>
      <motion.span aria-hidden>{reduced ? value.toLocaleString('en-IN') : text}</motion.span>
    </span>
  )
}
