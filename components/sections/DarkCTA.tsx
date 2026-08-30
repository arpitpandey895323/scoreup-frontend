'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/Button'

const conversation = [
  { role: 'assistant', text: 'Aapka score abhi 694 hai. 3 quick fixes se 60 din mein 750+ ho sakta hai.' },
  { role: 'user', text: 'Sach mein? Batao kya karna hai.' },
  {
    role: 'assistant',
    text: 'Pehle HDFC card ka ₹4,200 overdue clear karo — instant +12 points. Phir utilization 30% se neeche le aao. Plan bhej doon?',
  },
] as const

export function DarkCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-dark-green px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(22,166,90,0.5), transparent 70%)' }}
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
              Hamesha aapke saath
            </span>
            <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-surface text-balance sm:text-4xl lg:text-[2.9rem]">
              Ek dost jo aapki <span className="text-green">credit</span> samajhta hai.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-surface/70">
              Sawaal pucho, report upload karo, aur ScoreUp se ek clear plan lo — bilkul ek dost ki
              tarah jo aapki poori financial picture samajhta hai.
            </p>
            <div className="mt-8">
              <Button href="/#chat" variant="green" size="lg">
                Try ScoreUp free <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.3 + i * 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <p
                  className={
                    msg.role === 'user'
                      ? 'max-w-[80%] rounded-3xl rounded-br-md bg-green px-4 py-3 text-sm leading-relaxed text-surface'
                      : 'max-w-[85%] rounded-3xl rounded-bl-md bg-surface/10 px-4 py-3 text-sm leading-relaxed text-surface backdrop-blur'
                  }
                >
                  {msg.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
