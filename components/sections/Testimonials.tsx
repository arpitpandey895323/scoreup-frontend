import { Star } from 'lucide-react'
import { RevealOnScroll, RevealItem } from '@/components/RevealOnScroll'
import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
      <RevealOnScroll className="max-w-2xl">
        <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
          Reviews
        </span>
        <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          India bol chuka hai.
          <br />
          <span className="text-green">(Aur ScoreUp pasand hai.)</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <RevealItem key={t.name}>
            <figure className="flex h-full flex-col rounded-card border border-border bg-surface p-6 shadow-soft">
              <div className="flex gap-0.5 text-green">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-green" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-light-green font-display text-sm font-semibold text-green-dark">
                  {t.name.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-foreground">{t.name}</span>
                  <span className="block text-xs text-muted">
                    {t.city} · {t.source}
                  </span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealOnScroll>
    </section>
  )
}
