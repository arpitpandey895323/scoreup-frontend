import { TrendingUp } from 'lucide-react'
import { ScoreRing } from './ScoreRing'
import { SCORE_FACTORS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function ScoreCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full max-w-sm rounded-card border border-border bg-surface p-6 shadow-lift',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] font-semibold tracking-[0.16em] text-muted uppercase">
          Your CIBIL score
        </span>
        <span className="inline-flex items-center gap-1 rounded-pill bg-light-green px-2.5 py-1 text-xs font-medium text-green-dark">
          <TrendingUp className="size-3.5" /> +47 pts
        </span>
      </div>

      <div className="mt-4 flex justify-center">
        <ScoreRing score={744} size={180} label="Updated today" />
      </div>

      <p className="mt-2 text-center text-xs text-muted">Target 800 · Improving</p>

      <ul className="mt-6 space-y-3">
        {SCORE_FACTORS.map((f) => (
          <li key={f.label} className="flex items-center justify-between text-sm">
            <span className="text-muted">{f.label}</span>
            <span className="flex items-center gap-2 font-medium text-foreground">
              {f.value}
              <span className="rounded-pill bg-background px-2 py-0.5 text-[0.65rem] font-medium text-green-dark">
                {f.status}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
