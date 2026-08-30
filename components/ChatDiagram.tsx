'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { ScoreUpLogo } from './ScoreUpLogo'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface ChatDiagramProps {
  className?: string
  /** Disable the gentle floating loop. */
  float?: boolean
}

const conversation = [
  { role: 'assistant' as const, text: 'Hi there 👋' },
  { role: 'user' as const, text: 'How do I improve my CIBIL score?' },
  {
    role: 'assistant' as const,
    text: 'Your score is 614. Quick fixes can push it above 750 in 60 days.',
  },
  {
    role: 'assistant' as const,
    text: 'Also — your current home loan rate (8.2%) is beatable. Cheaper options dekhein?',
  },
]

export function ChatDiagram({ className, float = true }: ChatDiagramProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={cn('w-full max-w-sm', className)}
      animate={float && !reduced ? { y: [0, -10, 0] } : undefined}
      transition={
        float && !reduced
          ? { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      <div className="flex h-full flex-col rounded-card border border-border bg-light-green p-5 shadow-lift">
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <span className="text-sm">
            <ScoreUpLogo />
          </span>
          <span className="text-xs font-medium text-muted">9:41</span>
        </div>

        {/* Chat body */}
        <motion.div
          variants={reduced ? undefined : staggerContainer(0.5)}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 flex flex-1 flex-col gap-3"
        >
          {conversation.map((msg, i) => (
            <motion.div
              key={i}
              variants={reduced ? undefined : fadeUp}
              className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              <p
                className={
                  msg.role === 'user'
                    ? 'max-w-[82%] rounded-2xl rounded-br-md bg-foreground px-4 py-2.5 text-sm leading-snug text-surface'
                    : 'max-w-[85%] rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-2.5 text-sm leading-snug text-foreground shadow-soft'
                }
              >
                {msg.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Input bar */}
        <div className="mt-5 flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2.5 shadow-soft">
          <span className="flex-1 text-sm text-muted">Ask me anything…</span>
          <motion.span
            whileHover={reduced ? undefined : { scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green text-surface shadow-[0_6px_18px_rgba(22,166,90,0.4)]"
          >
            <ArrowUp className="size-4" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
