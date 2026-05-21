import { CheckCircle2 } from 'lucide-react'
import type { Activity } from '../types/activity'
import { TagBadge } from './activities/TagBadge'

interface RecentlyCompletedProps {
  activities: Activity[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function RecentlyCompleted({ activities }: RecentlyCompletedProps) {
  if (activities.length === 0) return null

  return (
    <section
      className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6"
      aria-labelledby="recent-heading"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        <h2 id="recent-heading" className="font-display text-xl font-semibold">
          Recently Completed
        </h2>
      </div>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center justify-between gap-3 py-2 border-b border-stone-100 dark:border-stone-800 last:border-0"
          >
            <div className="min-w-0">
              <p className="font-medium text-stone-700 dark:text-stone-200 truncate line-through decoration-stone-400">
                {activity.title}
              </p>
              {activity.completed_at && (
                <p className="text-xs text-stone-400 mt-0.5">
                  {formatDate(activity.completed_at)}
                </p>
              )}
            </div>
            <TagBadge tag={activity.tag} />
          </li>
        ))}
      </ul>
    </section>
  )
}
