import { cn } from '@/lib/utils'

interface ScoreUpLogoProps {
  className?: string
  /** Render on a dark surface. */
  onDark?: boolean
}

export function ScoreUpLogo({ className, onDark = false }: ScoreUpLogoProps) {
  return (
    <span
      className={cn(
        'font-display inline-flex items-baseline gap-1 leading-none tracking-tight select-none',
        className,
      )}
      aria-label="scoreup today"
    >
      <span className={cn('text-[1.15em] font-semibold', onDark ? 'text-surface' : 'text-foreground')}>
        scoreup
      </span>
      <span className="text-[0.82em] font-medium text-green">today</span>
    </span>
  )
}
