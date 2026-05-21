import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  isLoading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-400 shadow-sm',
  secondary:
    'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:bg-cream-100 dark:hover:bg-stone-700',
  ghost:
    'bg-transparent text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800',
  danger:
    'bg-transparent text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
}
