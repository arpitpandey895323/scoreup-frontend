import Link from 'next/link'
import { ScoreUpLogo } from './ScoreUpLogo'
import { FOOTER_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="text-lg" aria-label="ScoreUp Today home">
            <ScoreUpLogo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Personal finance for everyone. Apna CIBIL score check karo, sawaal pucho, aur cheaper
            loans dhundo — bilkul free.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group}>
            <h4 className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted uppercase">
              {group}
            </h4>
            <ul className="mt-4 space-y-3">
              {links.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-sm text-foreground/80 transition-colors hover:text-green"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ScoreUp Today. All rights reserved.</p>
          <p>app.scoreup.today</p>
        </div>
      </div>
    </footer>
  )
}
