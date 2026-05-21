import { Check, Heart, MapPin, Pencil, Trash2, DollarSign } from 'lucide-react'
import type { Activity } from '../../types/activity'
import { TagBadge } from './TagBadge'

interface ActivityCardProps {
  activity: Activity
  onToggleComplete: (activity: Activity) => void
  onToggleFavorite: (activity: Activity) => void
  onEdit: (activity: Activity) => void
  onDelete: (activity: Activity) => void
  isUpdating?: boolean
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ActivityCard({
  activity,
  onToggleComplete,
  onToggleFavorite,
  onEdit,
  onDelete,
  isUpdating,
}: ActivityCardProps) {
  return (
    <article
      className={`group relative rounded-2xl border bg-white dark:bg-stone-900 p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${
        activity.completed
          ? 'border-stone-200/80 dark:border-stone-800 opacity-75'
          : 'border-stone-200 dark:border-stone-800 shadow-sm'
      }`}
    >
      <div className="flex gap-3 sm:gap-4">
        <button
          onClick={() => onToggleComplete(activity)}
          disabled={isUpdating}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 ${
            activity.completed
              ? 'border-rose-500 bg-rose-500 text-white'
              : 'border-stone-300 dark:border-stone-600 hover:border-rose-400'
          }`}
          aria-label={activity.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {activity.completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-medium text-stone-800 dark:text-stone-100 text-base sm:text-lg leading-snug ${
                activity.completed ? 'line-through text-stone-500 dark:text-stone-500' : ''
              }`}
            >
              {activity.title}
            </h3>
            <button
              onClick={() => onToggleFavorite(activity)}
              disabled={isUpdating}
              className="shrink-0 p-1 text-stone-300 hover:text-rose-500 transition-colors"
              aria-label={activity.favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`h-5 w-5 ${activity.favorite ? 'fill-rose-500 text-rose-500' : ''}`}
              />
            </button>
          </div>

          {activity.notes && (
            <p
              className={`mt-1 text-sm text-stone-500 dark:text-stone-400 line-clamp-2 ${
                activity.completed ? 'line-through' : ''
              }`}
            >
              {activity.notes}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <TagBadge tag={activity.tag} />
            {activity.location && (
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {activity.location}
              </span>
            )}
            {activity.estimated_cost && (
              <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                <DollarSign className="h-3 w-3" aria-hidden="true" />
                {activity.estimated_cost}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-3 text-xs text-stone-400 dark:text-stone-500">
            <span>Added {formatDate(activity.created_at)}</span>
            {activity.completed && activity.completed_at && (
              <span>Completed {formatDate(activity.completed_at)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(activity)}
          className="rounded-lg p-2 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-600 transition-colors"
          aria-label={`Edit ${activity.title}`}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(activity)}
          className="rounded-lg p-2 text-stone-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-colors"
          aria-label={`Delete ${activity.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
