import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { RevealOnScroll } from "@/components/RevealOnScroll"
import { FAQSection } from "@/components/sections/FAQSection"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Learn — ScoreUp Today",
  description:
    "Simple guides on credit scores, loans, EMIs and cashback — explained in plain Hinglish so you can make smarter money moves.",
}

const GUIDES = [
  {
    tag: "Basics",
    minutes: "4 min",
    title: "CIBIL score kya hota hai aur kaise banta hai?",
    body: "300 se 900 tak ka number jo batata hai lenders ke liye aap kitne bharose ke laayak ho. Iske paanch factors ko samjho.",
  },
  {
    tag: "Improve",
    minutes: "6 min",
    title: "90 din mein score kaise badhaayein",
    body: "Utilization 30% se neeche, har EMI on time, aur purane accounts open — ek practical checklist.",
  },
  {
    tag: "Loans",
    minutes: "5 min",
    title: "Loan switch karke lakhon kaise bachaayein",
    body: "Balance transfer ka math, hidden charges aur woh sahi waqt jab switch karna faayda deta hai.",
  },
  {
    tag: "Cards",
    minutes: "5 min",
    title: "Sahi credit card kaise chunein",
    body: "Cashback vs reward points, annual fee ka break-even, aur apni spending se match karna.",
  },
  {
    tag: "Disputes",
    minutes: "7 min",
    title: "Galat entry ko dispute kaise karein",
    body: "Report mein error mile to bureau ke saath step-by-step dispute process aur letter template.",
  },
  {
    tag: "EMI",
    minutes: "4 min",
    title: "Missed EMI ke baad recovery plan",
    body: "Ek chhook se ghabraayein nahi — damage kitna hota hai aur agle mahino mein score wapas kaise laayein.",
  },
]

const TAG_STYLES: Record<string, string> = {
  Basics: "bg-brand/12 text-brand",
  Improve: "bg-emerald-500/12 text-emerald-600",
  Loans: "bg-amber-500/15 text-amber-600",
  Cards: "bg-sky-500/12 text-sky-600",
  Disputes: "bg-rose-500/12 text-rose-600",
  EMI: "bg-violet-500/12 text-violet-600",
}

export default function LearnPage() {
  return (
    <main className="min-h-dvh">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-36 pb-16 md:pt-44">
        <RevealOnScroll>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand">Learn</p>
          <h1 className="mt-4 max-w-3xl text-balance font-sans text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Money, samjhaya simple.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Credit, loans aur EMIs par short guides — bina jargon, seedhi Hinglish mein. Padho, samjho, aur behtar
            decisions lo.
          </p>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <RevealOnScroll key={g.title} delay={(i % 3) * 0.08}>
              <Link
                href="#"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-medium ${TAG_STYLES[g.tag] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {g.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{g.minutes}</span>
                </div>
                <h3 className="text-balance font-sans text-lg font-semibold leading-snug text-card-foreground">
                  {g.title}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">{g.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Read guide
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <FAQSection />
      <Footer />
    </main>
  )
}
