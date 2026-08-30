import { ScoreUpLogo } from './ScoreUpLogo'

/**
 * The chat interface rendered on the 3D phone screen. Kept as plain,
 * self-contained DOM so it can be embedded via drei's <Html transform>.
 */
export function PhoneChat() {
  return (
    <div
      className="flex flex-col gap-2 rounded-[26px] bg-light-green p-3"
      style={{ width: 200, height: 408, fontFamily: 'var(--font-inter)' }}
    >
      <div className="flex items-center justify-between px-1 pt-1">
        <span className="text-[8px]">
          <ScoreUpLogo className="text-[9px]" />
        </span>
        <span className="text-[8px] font-medium text-muted">9:41</span>
      </div>

      <div className="mt-1 flex flex-1 flex-col gap-2">
        <Bubble>Hi there 👋</Bubble>
        <Bubble user>How do I improve my CIBIL score?</Bubble>
        <Bubble>
          Your score is <b className="text-green">614</b>. Quick fixes can push it above{' '}
          <b>750</b> in 90 days.
        </Bubble>
        <Bubble>
          Also — your current home loan rate <b>(8.2%)</b> is beatable. Cheaper options dekhein?
        </Bubble>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-2">
        <span className="text-[8px] text-muted">Ask me anything…</span>
        <span className="ml-auto flex size-4 items-center justify-center rounded-full bg-green text-surface text-[9px]">
          ↑
        </span>
      </div>
    </div>
  )
}

function Bubble({ children, user = false }: { children: React.ReactNode; user?: boolean }) {
  return (
    <div className={user ? 'flex justify-end' : 'flex justify-start'}>
      <p
        className={
          user
            ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-2.5 py-1.5 text-[9px] leading-snug text-surface'
            : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-surface px-2.5 py-1.5 text-[9px] leading-snug text-foreground shadow-sm'
        }
      >
        {children}
      </p>
    </div>
  )
}
