import { ArrowUpRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A self-contained EMI / cashback financial card used across payment sections. */
export function EMIWidget({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full max-w-sm rounded-card border border-border bg-surface p-5 shadow-lift',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-muted">
          <span className="size-2 rounded-full bg-green" />
          Auto-pay on
        </span>
        <span className="text-xs font-medium text-muted">NEXT EMI · 5 JUN</span>
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted">HDFC home loan · Bharat Bill Pay</p>
        <p className="font-display mt-1 text-3xl font-semibold tracking-tight text-foreground">
          ₹14,200
        </p>
      </div>

      <div className="mt-5 space-y-2">
        <Row label="Paid on time" value={<Check className="size-4 text-green" />} />
        <Row label="Cashback earned" value={<span className="font-medium text-green">+₹320</span>} />
        <Row label="Score impact" value={<span className="font-medium text-green">+12 pts</span>} />
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-light-green px-4 py-3">
        <div>
          <p className="text-[0.7rem] tracking-wide text-green-dark uppercase">This year total</p>
          <p className="font-display text-lg font-semibold text-dark-green">₹3,840</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-green-dark">
          Pay &amp; earn <ArrowUpRight className="size-4" />
        </span>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0 last:pb-0">
      <span className="text-muted">{label}</span>
      {value}
    </div>
  )
}
