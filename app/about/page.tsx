import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { RevealOnScroll } from "@/components/RevealOnScroll"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { TrendingUp, Landmark, PiggyBank, ChartLine as LineChart } from "lucide-react"

export const metadata: Metadata = {
  title: "About — ScoreUp Today",
  description:
    "We are on a mission to make credit simple, honest and affordable for every Indian. Meet the team behind ScoreUp Today.",
}

const VALUES = [
  {
    title: "Plain language, always",
    body: "Credit ki jargon hum tootke aam bhasha mein samjhaate hain. Koi asterisk, koi chhupi hui shart nahi.",
  },
  {
    title: "Your side of the table",
    body: "Hum lenders se commission ke liye kaam nahi karte. Sirf woh recommend karte hain jo aapke liye sasta ho.",
  },
  {
    title: "Privacy by default",
    body: "Aapka data bank-grade encryption mein rehta hai aur kabhi bina permission ke share nahi hota.",
  },
]

const STATS = [
  { value: 2.4, suffix: "M", label: "Users guided" },
  { value: 58, suffix: " pts", label: "Avg. score lift in 90 days" },
  { value: 40, suffix: "+", label: "Lenders scanned live" },
  { value: 4.8, decimals: 1, suffix: "★", label: "App store rating" },
]

const PILLARS = [
  {
    icon: TrendingUp,
    title: "Credit scores",
    body: "300 se 900 tak ka number, paanch factors, ek simple breakdown — taaki aap jaano kya badlega score.",
  },
  {
    icon: Landmark,
    title: "Loans",
    body: "Personal, home, auto — har loan ka sahi rate, hidden charges aur approval criteria ek jagah.",
  },
  {
    icon: LineChart,
    title: "EMIs",
    body: "EMI ka math, prepayment impact aur missed EMI ka recovery plan — sab step-by-step.",
  },
  {
    icon: PiggyBank,
    title: "Financial decisions",
    body: "Card switch karein ya nahi, balance transfer worth it hai ya nahi — ScoreUp clear jawaab deta hai.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-dvh">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-36 pb-16 md:pt-44">
        <RevealOnScroll>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand">Our story</p>
          <h1 className="mt-4 max-w-3xl text-balance font-sans text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Finance ko simple banana hai.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            ScoreUp Today ek chhoti si niyat se shuru hua — ki har Indian apna credit score samjhe,
            sudhaare aur uspe sasta loan paaye. Aaj hum lakhon logon ko har roz smarter financial
            decisions lene mein madad karte hain.
          </p>
        </RevealOnScroll>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-16 md:grid-cols-4">
          {STATS.map((s, i) => (
            <RevealOnScroll key={s.label} delay={i * 0.08}>
              <div className="text-center md:text-left">
                <div className="font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  <AnimatedNumber value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <RevealOnScroll className="max-w-2xl">
          <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
            ScoreUp kya karta hai?
          </span>
          <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Credit ko samjho.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Hum complex financial concepts ko plain Hinglish mein todte hain — taaki aap har number,
            rate aur term ki asli meaning samajh sakein.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <RevealOnScroll key={p.title} delay={(i % 4) * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-light-green text-green">
                  <p.icon className="size-5" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-card-foreground">{p.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-light-green px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <RevealOnScroll>
              <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
                Better financial decisions lo
              </span>
              <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-dark-green text-balance sm:text-4xl lg:text-[2.75rem]">
                Loan aur EMI ko <span className="text-green">simple</span> banao.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-green-dark/70">
                ScoreUp aapki poori financial picture ek jagah laata hai — taaki har decision
                guesswork na ho, data driven ho. Compare karo, switch karo, aur bachaao.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-green-dark">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green" /> 40+ lenders ka real-time comparison
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green" /> EMI reminders, zero missed payments
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green" /> Cashback har eligible bill par
                </li>
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <FlatScoreIllustration />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <RevealOnScroll>
          <h2 className="max-w-2xl text-balance font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            The principles we refuse to bend.
          </h2>
        </RevealOnScroll>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <RevealOnScroll key={v.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-card p-8">
                <div className="mb-5 flex size-10 items-center justify-center rounded-full bg-brand/12 font-mono text-sm text-brand">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-sans text-xl font-semibold text-card-foreground">{v.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  )
}

function FlatScoreIllustration() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-card border border-border bg-surface p-6 shadow-lift">
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
          Your CIBIL score
        </span>
        <span className="inline-flex items-center gap-1 rounded-pill bg-light-green px-2.5 py-1 text-xs font-medium text-green-dark">
          <TrendingUp className="size-3.5" /> +47 pts
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="font-display text-5xl font-semibold tracking-tight text-foreground">744</p>
          <p className="mt-1 text-xs text-muted">Target 800 · Improving</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-light-green">
          <span className="font-display text-lg font-semibold text-green-dark">Good</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {[
          { label: "Credit utilisation", value: "22%", pct: 22 },
          { label: "Payment history", value: "100%", pct: 100 },
          { label: "Age of credit", value: "4.2 yrs", pct: 55 },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">{row.label}</span>
              <span className="font-medium text-foreground">{row.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-green"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
