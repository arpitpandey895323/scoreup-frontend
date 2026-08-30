"use client"

import { motion } from "framer-motion"
import { RevealOnScroll } from "@/components/RevealOnScroll"
import { QRCode } from "@/components/QRCode"
import { Button } from "@/components/Button"
import { Apple, Play } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand py-24 md:py-32">
      {/* soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, color-mix(in oklch, var(--color-brand-foreground) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-balance font-sans text-4xl font-semibold tracking-tight text-brand-foreground md:text-5xl">
            Your better financial life is one tap away
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-foreground/70">
            Scan the code or grab ScoreUp Today from your app store. Free to start, no card required.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-center gap-10 md:flex-row">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="rounded-3xl bg-brand-foreground p-5 shadow-2xl"
            >
              <QRCode value="https://scoreuptoday.app" size={168} />
            </motion.div>

            <div className="flex flex-col gap-3">
              <Button variant="onDark" size="lg" className="min-w-56 justify-start gap-3">
                <Apple className="size-5" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-normal opacity-70">Download on the</span>
                  <span className="text-base font-semibold">App Store</span>
                </span>
              </Button>
              <Button variant="onDark" size="lg" className="min-w-56 justify-start gap-3">
                <Play className="size-5" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-normal opacity-70">Get it on</span>
                  <span className="text-base font-semibold">Google Play</span>
                </span>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
