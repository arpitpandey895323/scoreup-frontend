'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks'
import { AnimatedNumber } from './AnimatedNumber'
import { cn } from '@/lib/utils'

interface ScoreRingProps {
  /** CIBIL score, 300–900. */
  score: number
  size?: number
  stroke?: number
  className?: string
  label?: string
}

const MIN = 300
const MAX = 900

export function ScoreRing({
  score,
  size = 168,
  stroke = 12,
  className,
  label = 'CIBIL score',
}: ScoreRingProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(1, Math.max(0, (score - MIN) / (MAX - MIN)))
  // 3/4 arc gauge
  const arc = 0.75
  const dash = circumference * arc
  const target = dash * pct
  const animate = reduced || inView

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-[135deg]"
        role="img"
        aria-label={`${label}: ${score}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(11,15,12,0.08)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-green)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          initial={{ strokeDashoffset: dash }}
          animate={{ strokeDashoffset: animate ? dash - target : dash }}
          transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedNumber
          value={score}
          className="font-display text-4xl font-semibold tracking-tight text-foreground"
        />
        <span className="mt-0.5 text-[0.68rem] font-medium tracking-wide text-muted uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}
