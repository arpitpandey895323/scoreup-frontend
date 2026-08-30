'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  tag: string
  title: string
  body: string
  children?: React.ReactNode
  className?: string
}

export function FeatureCard({ tag, title, body, children, className }: FeatureCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        'group flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift',
        className,
      )}
    >
      <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
        {tag}
      </span>
      <h3 className="font-display mt-3 text-xl font-medium tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{body}</p>
      {children && <div className="mt-6">{children}</div>}
    </motion.article>
  )
}
