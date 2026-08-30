import { FeatureCard } from '@/components/FeatureCard'
import { RevealOnScroll, RevealItem } from '@/components/RevealOnScroll'
import { HOW_IT_WORKS } from '@/lib/constants'

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 lg:py-28">
      <RevealOnScroll className="max-w-2xl">
        <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
          How ScoreUp works
        </span>
        <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Apne score ka <span className="text-green">control</span> le lo.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          ScoreUp har factor plain language mein samjhata hai — credit utilization, on-time
          payments, account mix — aur batata hai exactly next step kya hai.
        </p>
      </RevealOnScroll>

      <RevealOnScroll stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {HOW_IT_WORKS.map((item, i) => (
          <RevealItem key={item.tag}>
            <FeatureCard tag={item.tag} title={item.title} body={item.body}>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <span
                    key={j}
                    className={
                      j <= i
                        ? 'h-1.5 flex-1 rounded-full bg-green'
                        : 'h-1.5 flex-1 rounded-full bg-border'
                    }
                  />
                ))}
              </div>
            </FeatureCard>
          </RevealItem>
        ))}
      </RevealOnScroll>
    </section>
  )
}
