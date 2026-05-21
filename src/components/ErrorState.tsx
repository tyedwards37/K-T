import { AlertCircle } from 'lucide-react'
import { Button } from './ui/Button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Something went wrong loading your activities.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="alert">
      <AlertCircle className="h-10 w-10 text-red-400 mb-4" />
      <p className="text-stone-600 dark:text-stone-400 mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
