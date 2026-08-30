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
    tag: "CIBIL / Credit Score",
    minutes: "4 min",
    title: "CIBIL score kya hota hai aur kaise banta hai?",
    body: "300 se 900 tak ka number jo batata hai lenders ke liye aap kitne bharose ke laayak ho. Iske paanch factors ko samjho.",
  },
  {
    tag: "Credit Utilization",
    minutes: "5 min",
    title: "Credit utilization kya hai — aur 30% rule kyun?",
    body: "Aap kitna credit use karte ho, woh score ka sabse bada factor hai. Neeche 30% rakhne ka simple math samjho.",
  },
  {
    tag: "Payment History",
    minutes: "4 min",
    title: "On-time payments score ko kaise badhate hain",
    body: "Ek missed EMI kitna nuksaan kar sakti hai, aur consistent on-time payments se score kaise wapas aata hai.",
  },
  {
    tag: "EMI",
    minutes: "6 min",
    title: "EMI ka math — principal, interest aur tenure",
    body: "EMI kaise calculate hoti hai, prepayment se interest kitna bachata hai, aur shorter tenure sasta kyun hota hai.",
  },
  {
    tag: "Loans",
    minutes: "5 min",
    title: "Loan switch karke lakhon kaise bachaayein",
    body: "Balance transfer ka math, hidden charges aur woh sahi waqt jab switch karna faayda deta hai.",
  },
  {
    tag: "Interest Rates",
    minutes: "5 min",
    title: "Fixed vs floating interest rate — kya chunein?",
    body: "Dono ke pros aur cons, kab fixed sasta padta hai, aur kab floating better rehta hai — simple comparison.",
  },
  {
    tag: "Loan Eligibility",
    minutes: "6 min",
    title: "Loan approval ke liye kya zaroori hai?",
    body: "Income, DTI ratio, credit score aur employment history — banks kya dekhte hain aur kaise improve karein.",
  },
  {
    tag: "Financial Planning",
    minutes: "7 min",
    title: "Pehla budget banao — 50/30/20 rule",
    body: "Needs, wants aur savings ka simple breakdown jo har mahine follow kar sakte ho — bina complex tools ke.",
  },
]

const TAG_STYLES: Record<string, string> = {
  "CIBIL / Credit Score": "bg-brand/12 text-brand",
  "Credit Utilization": "bg-emerald-500/12 text-emerald-600",
  "Payment History": "bg-sky-500/12 text-sky-600",
  EMI: "bg-amber-500/15 text-amber-600",
  Loans: "bg-rose-500/12 text-rose-600",
  "Interest Rates": "bg-violet-500/12 text-violet-600",
  "Loan Eligibility": "bg-teal-500/12 text-teal-600",
  "Financial Planning": "bg-indigo-500/12 text-indigo-600",
}

export default function LearnPage() {
  return (
    <main className="min-h-dvh">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-36 pb-16 md:pt-44">
        <RevealOnScroll>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand">Learn</p>
          <h1 className="mt-4 max-w-3xl text-balance font-sans text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Paise ko samjho.
            <br />
            Better decisions lo.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Credit, loans aur EMIs par short guides — bina jargon, seedhi Hinglish mein. Padho,
            samjho, aur behtar decisions lo.
          </p>
        </RevealOnScroll>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <RevealOnScroll key={g.title} delay={(i % 3) * 0.08}>
              <Link
                href="#"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
              >
                <div className="mb-5 flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-medium ${TAG_STYLES[g.tag] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {g.tag}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{g.minutes}</span>
                </div>
                <h3 className="text-balance font-sans text-lg font-semibold leading-snug text-card-foreground">
                  {g.title}
                </h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {g.body}
                </p>
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
