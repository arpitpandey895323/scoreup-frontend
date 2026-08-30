'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ScoreUpLogo } from './ScoreUpLogo'
import { Button } from './Button'
import { NAV_LINKS, CTA_LABEL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between gap-3 rounded-pill border border-border bg-surface/80 py-2 pr-2 pl-4 backdrop-blur-xl transition-shadow duration-300 sm:pl-5',
          scrolled ? 'shadow-lift' : 'shadow-soft',
        )}
      >
        <Link href="/" className="shrink-0 py-1.5 text-lg" aria-label="ScoreUp Today home">
          <ScoreUpLogo />
        </Link>

        {/* Center pill nav — desktop */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-pill bg-background/60 p-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative inline-flex rounded-pill px-4 py-1.5 text-sm font-medium transition-colors',
                    active ? 'text-foreground' : 'text-muted hover:text-foreground',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-pill bg-surface shadow-soft"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button href="/#chat" size="sm" variant="dark" className="hidden sm:inline-flex">
            {CTA_LABEL}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-pill border border-border bg-surface text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 right-4 left-4 z-40 rounded-3xl border border-border bg-surface p-4 shadow-lift md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-light-green text-dark-green'
                        : 'text-foreground hover:bg-background',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/#chat" variant="dark" size="md" className="mt-3 w-full">
              {CTA_LABEL}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
