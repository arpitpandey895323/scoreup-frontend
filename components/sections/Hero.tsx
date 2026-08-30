'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/Button'
import { ScoreIllustration } from '@/components/ScoreIllustration'
import { fadeUp, staggerContainer } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-xs font-medium tracking-wide text-green-dark"
          >
            <span className="size-1.5 rounded-full bg-green" />
            PERSONAL FINANCE FOR EVERYONE
          </motion.span>

          <h1 className="font-display mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <motion.span variants={fadeUp} className="block text-foreground">
              Finance ka koi bhi sawaal?
            </motion.span>
            <motion.span variants={fadeUp} className="block text-green">
              Pucho ScoreUp se.
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
          >
            Personalised guidance, saath mein loan process ki A-to-Z jaankari. Agar score mein koi
            dikkat ho — bas apni report upload karo aur pucho. ScoreUp sab samjha deta hai.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/#chat" variant="green" size="lg">
              Sawaal pucho — bilkul free <ArrowRight className="size-4" />
            </Button>
            <Button href="/#how" variant="outline" size="lg">
              See how it works
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center gap-6 text-sm text-muted"
          >
            <Stat value="10,000+" label="Loans guided" />
            <span className="h-8 w-px bg-border" />
            <Stat
              value={
                <span className="inline-flex items-center gap-1">
                  4.6
                  <Star className="size-4 fill-green text-green" />
                </span>
              }
              label="Play & App Store"
            />
            <span className="h-8 w-px bg-border" />
            <Stat value="100%" label="Free to ask" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md"
        >
          <ScoreIllustration />
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="font-display text-lg font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  )
}
