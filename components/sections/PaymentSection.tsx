import { FloatingCard } from '@/components/FloatingCard'
import { EMIWidget } from '@/components/EMIWidget'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { fadeUp } from '@/lib/animations'

export function PaymentSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-light-green px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <RevealOnScroll variants={fadeUp}>
            <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
              Pay &amp; level up
            </span>
            <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-dark-green text-balance sm:text-4xl lg:text-[2.75rem]">
              EMI pay karo, <span className="text-green">cashback</span> kamao.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-green-dark/70">
              Loan EMIs aur card bills ScoreUp se time pe pay karo — har on-time payment se score
              improve hota hai aur rewards milte hain. Bharat Bill Pay (RBI–NPCI) integrated.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-green-dark">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-green" /> On-time payment = score points
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-green" /> Cashback har eligible bill par
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-green" /> Auto-pay reminders, zero miss
              </li>
            </ul>
          </RevealOnScroll>

          <div className="flex justify-center lg:justify-end">
            <FloatingCard intensity={4}>
              <EMIWidget />
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  )
}
