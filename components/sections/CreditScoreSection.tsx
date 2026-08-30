import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/Button'
import { FloatingCard } from '@/components/FloatingCard'
import { ScoreCard } from '@/components/ScoreCard'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { fadeUp } from '@/lib/animations'

export function CreditScoreSection() {
  return (
    <section id="chat" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <FloatingCard intensity={5}>
            <ScoreCard />
          </FloatingCard>
        </div>

        <RevealOnScroll variants={fadeUp} className="order-1 lg:order-2">
          <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
            Apna number jaano
          </span>
          <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Apna credit score samjho aur <span className="text-green">improve</span> karo.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            ScoreUp aapki poori credit report nikaalta hai, har factor plain language mein samjhata
            hai, aur ek step-by-step plan deta hai. Zyada users 90 din mein 40–80 points ka jump
            dekhte hain.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
            <Fact k="90 din" v="Avg. plan" />
            <Fact k="40–80" v="Points jump" />
            <Fact k="40+" v="Lenders scanned" />
          </dl>

          <div className="mt-8">
            <Button href="/#chat" variant="green" size="lg">
              Check my score free <ArrowRight className="size-4" />
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="font-display text-xl font-semibold text-foreground">{k}</p>
      <p className="mt-1 text-xs text-muted">{v}</p>
    </div>
  )
}
