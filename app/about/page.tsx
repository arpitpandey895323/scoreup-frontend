import type { Metadata } from "next"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { RevealOnScroll } from "@/components/RevealOnScroll"
import { AnimatedNumber } from "@/components/AnimatedNumber"
import { FinalCTA } from "@/components/sections/FinalCTA"

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

export default function AboutPage() {
  return (
    <main className="min-h-dvh">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-36 pb-20 md:pt-44">
        <RevealOnScroll>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand">Our story</p>
          <h1 className="mt-4 max-w-3xl text-balance font-sans text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Credit shouldn&apos;t need a translator.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            ScoreUp Today ek chhoti si niyat se shuru hua — ki har Indian apna credit score samjhe, sudhaare aur uspe
            sasta loan paaye. Aaj hum lakhon logon ko har roz smarter financial decisions lene mein madad karte hain.
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
