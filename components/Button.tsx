import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const button = cva(
  'group inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        dark: 'bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-soft',
        green: 'bg-green text-surface hover:bg-green-dark shadow-[0_10px_30px_rgba(22,166,90,0.28)]',
        outline: 'border border-border-strong bg-surface text-foreground hover:border-green/40 hover:text-green',
        ghost: 'text-foreground hover:text-green',
        light: 'bg-surface text-foreground hover:bg-light-green hover:text-dark-green shadow-soft',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-13 px-7 text-base',
      },
    },
    defaultVariants: { variant: 'dark', size: 'md' },
  },
)

type BaseProps = VariantProps<typeof button> & { className?: string; children: React.ReactNode }

type AsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }

export function Button(props: AsButton | AsLink) {
  const { variant, size, className, children } = props

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <Link href={href} className={cn(button({ variant, size }), className)} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as AsButton
  return (
    <button className={cn(button({ variant, size }), className)} {...rest}>
      {children}
    </button>
  )
}
