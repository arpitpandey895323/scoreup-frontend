'use client'

import { motion } from 'framer-motion'
import { ScoreUpLogo } from './ScoreUpLogo'
import { ScoreRing } from './ScoreRing'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const FACTORS = [
  { label: 'Payment history', status: 'Excellent' },
  { label: 'Credit utilization', status: 'Good' },
  { label: 'Credit age', status: 'Good' },
]

export function ScoreIllustration({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={cn('relative w-full max-w-sm', className)}
      animate={reduced ? undefined : { y: [0, -10, 0] }}
      transition={
        reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-2 h-16 rounded-full bg-green/18 blur-2xl"
      />

      <div className="relative rounded-card border border-border bg-surface p-6 shadow-lift">
        <div className="flex items-center justify-between gap-3">
          <ScoreUpLogo />
          <span className="rounded-pill bg-light-green px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.12em] text-green-dark uppercase">
            Credit Score
          </span>
        </div>

        <div className="mt-6 flex justify-center">
          <ScoreRing score={750} size={196} label="Excellent" />
        </div>

        <ul className="mt-6 space-y-3">
          {FACTORS.map((f) => (
            <li key={f.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-muted">
                <span className="size-1.5 shrink-0 rounded-full bg-green" />
                {f.label}
              </span>
              <span className="rounded-pill bg-light-green px-2.5 py-0.5 text-[0.7rem] font-medium text-green-dark">
                {f.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
