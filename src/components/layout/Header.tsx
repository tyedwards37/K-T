import { Moon, Sun, Sparkles } from 'lucide-react'

interface HeaderProps {
  total: number
  completed: number
  percent: number
  isDark: boolean
  onToggleTheme: () => void
  isDemoMode?: boolean
}

export function Header({
  total,
  completed,
  percent,
  isDark,
  onToggleTheme,
  isDemoMode,
}: HeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-cream-100 to-rose-50 dark:from-rose-950/50 dark:via-stone-900 dark:to-stone-900 border border-rose-200/60 dark:border-rose-900/40 px-6 py-8 sm:px-10 sm:py-10 shadow-sm">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-300/20 blur-2xl" />
      <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-rose-400/10 blur-xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-rose-500 animate-pulse-soft" aria-hidden="true" />
            {isDemoMode && (
              <span className="text-xs font-medium uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-full">
                Demo mode
              </span>
            )}
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-stone-800 dark:text-stone-50">
            K + T
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400 text-lg">
            Being big and round, together
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <Stat label="Total" value={total} />
            <Stat label="Done" value={completed} />
            <Stat label="Progress" value={`${percent}%`} />
          </div>
          <button
            onClick={onToggleTheme}
            className="rounded-xl p-2.5 bg-white/70 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-700 transition-colors shadow-sm"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-white/60 dark:bg-stone-800/60 backdrop-blur px-3 py-2.5 sm:px-4 border border-white/80 dark:border-stone-700/50 min-w-[4.5rem]">
      <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">{label}</p>
      <p className="font-display text-2xl font-semibold text-rose-600 dark:text-rose-400">{value}</p>
    </div>
  )
}
