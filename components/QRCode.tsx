import { cn } from '@/lib/utils'

/**
 * A stylised, decorative QR-style mark for the "point your camera here" panel.
 * Deterministic pattern (not a scannable code) — real deep-link QR is injected
 * by the backend at runtime.
 */
export function QRCode({ className, size = 15 }: { className?: string; size?: number }) {
  const cells: boolean[] = []
  // simple deterministic pseudo-random fill
  for (let i = 0; i < size * size; i++) {
    const x = i % size
    const y = Math.floor(i / size)
    const v = (x * 37 + y * 17 + x * y * 7) % 5
    cells.push(v < 2)
  }

  const isFinder = (x: number, y: number) => {
    const inTL = x < 4 && y < 4
    const inTR = x >= size - 4 && y < 4
    const inBL = x < 4 && y >= size - 4
    return inTL || inTR || inBL
  }

  return (
    <div
      className={cn('grid aspect-square w-full', className)}
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      aria-hidden
    >
      {cells.map((on, i) => {
        const x = i % size
        const y = Math.floor(i / size)
        const finder = isFinder(x, y)
        const filled = finder ? false : on
        return (
          <span
            key={i}
            className={cn(
              'aspect-square rounded-[2px]',
              filled ? 'bg-dark-green' : 'bg-transparent',
            )}
          />
        )
      })}
      {/* finder squares overlaid */}
      <Finder className="top-0 left-0" />
      <Finder className="top-0 right-0" />
      <Finder className="bottom-0 left-0" />
    </div>
  )
}

function Finder({ className }: { className?: string }) {
  return (
    <span
      className={cn('absolute flex size-[26%] items-center justify-center rounded-lg bg-dark-green', className)}
    >
      <span className="flex size-[62%] items-center justify-center rounded-md bg-surface">
        <span className="size-[55%] rounded-sm bg-dark-green" />
      </span>
    </span>
  )
}
