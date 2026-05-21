interface ProgressBarProps {
  percent: number
  className?: string
}

export function ProgressBar({ percent, className = '' }: ProgressBarProps) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700 ${className}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  )
}
