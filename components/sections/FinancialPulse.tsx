import { PulseWave } from '@/components/PulseWave'
import { RevealOnScroll } from '@/components/RevealOnScroll'

export function FinancialPulse() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
      <RevealOnScroll className="mx-auto max-w-2xl text-center">
        <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-green uppercase">
          Your financial pulse
        </span>
        <h2 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Watch your money breathe.
        </h2>
        <p className="mt-4 text-base text-muted">Move your mouse. Click the wave.</p>
      </RevealOnScroll>

      <RevealOnScroll className="mt-10">
        <div className="relative h-64 w-full overflow-hidden rounded-card border border-border bg-surface sm:h-80">
          <PulseWave />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6">
            <Metric label="Utilisation" value="22%" note="Healthy" />
            <Metric label="On-time rate" value="100%" note="12 / 12 months" />
            <Metric label="Savings unlocked" value="₹3,840" note="This year" />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/80 px-4 py-3 backdrop-blur">
      <p className="text-[0.65rem] tracking-wide text-muted uppercase">{label}</p>
      <p className="font-display text-xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-green-dark">{note}</p>
    </div>
  )
}
