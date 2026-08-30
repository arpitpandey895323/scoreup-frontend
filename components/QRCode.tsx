import { qrModules } from '@/lib/qr'
import { cn } from '@/lib/utils'

const APP_URL = 'https://scoreuptoday.app'

/**
 * Scannable QR code for the ScoreUp app link.
 */
export function QRCode({
  value = APP_URL,
  className,
  size = 168,
}: {
  value?: string
  className?: string
  size?: number
}) {
  const modules = qrModules(value)
  const n = modules.length
  const pad = 4

  return (
    <svg
      role="img"
      aria-label={`QR code linking to ${value}`}
      viewBox={`${-pad} ${-pad} ${n + pad * 2} ${n + pad * 2}`}
      width={size}
      height={size}
      className={cn('block', className)}
      shapeRendering="crispEdges"
    >
      <rect
        x={-pad}
        y={-pad}
        width={n + pad * 2}
        height={n + pad * 2}
        fill="#ffffff"
      />
      {modules.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#07140b" />
          ) : null,
        ),
      )}
    </svg>
  )
}
