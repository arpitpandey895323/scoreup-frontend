import { ArrowRight, BellRing, Coins, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/Button'
import { Phone3D } from '@/components/Phone3D'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { fadeUp } from '@/lib/animations'

const points = [
  { icon: BellRing, title: 'EMI reminders', body: 'Auto-pay on, kabhi due date miss na ho.' },
  { icon: Coins, title: 'Cashback rewards', body: 'Har on-time bill par points aur cashback.' },
  { icon: ShieldCheck, title: 'RBI–NPCI secure', body: 'Bharat Bill Pay integrated, fully safe.' },
]

export function EMISection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <RevealOnScroll variants={fadeUp}>
          <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
            Pay & level up
          </span>
          <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            EMI miss mat karo. <span className="text-green">Cashback</span> kamao.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Loan EMIs aur credit card bills ScoreUp se time pe pay karo. Har on-time payment se
            score improve hota hai aur rewards milte hain — sab kuch ek chat mein.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-light-green text-green">
                  <p.icon className="size-4" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{p.title}</p>
                  <p className="text-sm text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href="/#chat" variant="dark" size="lg">
              Get the app <ArrowRight className="size-4" />
            </Button>
          </div>
        </RevealOnScroll>

        <div className="relative mx-auto h-[440px] w-full max-w-sm sm:h-[520px]">
          <Phone3D />
        </div>
      </div>
    </section>
  )
}
