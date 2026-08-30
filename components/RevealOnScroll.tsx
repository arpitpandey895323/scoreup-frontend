'use client'

import { motion, type Variants } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Delay before the reveal starts. */
  delay?: number
  variants?: Variants
  /** When true, stagger direct children that use RevealItem. */
  stagger?: boolean
  as?: 'div' | 'section' | 'ul' | 'li' | 'span'
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  variants,
  stagger = false,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger ? staggerContainer(0.1, delay) : variants ?? fadeUp}
      transition={stagger ? undefined : { delay }}
    >
      {children}
    </MotionTag>
  )
}

/** A single item to place inside a `stagger` RevealOnScroll container. */
export function RevealItem({
  children,
  className,
  variants,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  variants?: Variants
  as?: 'div' | 'li' | 'span'
}) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag className={cn(className)} variants={variants ?? fadeUp}>
      {children}
    </MotionTag>
  )
}
