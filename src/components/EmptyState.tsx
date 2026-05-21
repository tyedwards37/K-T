import { Heart } from 'lucide-react'
import { Button } from './ui/Button'

interface EmptyStateProps {
  onAdd?: () => void
  message?: string
}

export function EmptyState({
  onAdd,
  message = 'No activities yet — add your first adventure!',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-rose-100 dark:bg-rose-900/30 p-4 mb-4">
        <Heart className="h-8 w-8 text-rose-400" />
      </div>
      <p className="text-stone-500 dark:text-stone-400 mb-4 max-w-xs">{message}</p>
      {onAdd && (
        <Button onClick={onAdd}>Add activity</Button>
      )}
    </div>
  )
}
