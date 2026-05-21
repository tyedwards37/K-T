export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-3 border-rose-200 border-t-rose-500" />
      <p className="text-stone-500 dark:text-stone-400 text-sm">Loading adventures...</p>
    </div>
  )
}
