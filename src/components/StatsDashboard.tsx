import { BarChart3 } from 'lucide-react'
import { TAG_LABELS, type ActivityTag } from '../types/activity'

interface StatsDashboardProps {
  total: number
  completed: number
  active: number
  favorites: number
  percent: number
  byTag: Record<string, number>
}

export function StatsDashboard({
  total,
  completed,
  active,
  favorites,
  percent,
  byTag,
}: StatsDashboardProps) {
  const topTags = Object.entries(byTag)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const maxCount = topTags[0]?.[1] ?? 1

  return (
    <section
      className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6"
      aria-labelledby="stats-heading"
    >
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="h-5 w-5 text-rose-500" />
        <h2 id="stats-heading" className="font-display text-xl font-semibold">
          Adventure Stats
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MiniStat label="Total" value={total} />
        <MiniStat label="Active" value={active} />
        <MiniStat label="Completed" value={completed} />
        <MiniStat label="Favorites" value={favorites} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-stone-500">Overall progress</span>
          <span className="font-medium text-rose-600 dark:text-rose-400">{percent}%</span>
        </div>
        <div className="h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {topTags.length > 0 && (
        <div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">Top tags</p>
          <div className="space-y-2">
            {topTags.map(([tag, count]) => (
              <div key={tag} className="flex items-center gap-3">
                <span className="w-24 text-sm text-stone-600 dark:text-stone-300 truncate">
                  {TAG_LABELS[tag as ActivityTag] ?? tag}
                </span>
                <div className="flex-1 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-rose-300 dark:bg-rose-700 transition-all duration-500"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-stone-400 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-cream-50 dark:bg-stone-800/50 px-3 py-2.5 text-center">
      <p className="text-xs text-stone-500 uppercase tracking-wide">{label}</p>
      <p className="font-display text-2xl font-semibold text-rose-600 dark:text-rose-400">{value}</p>
    </div>
  )
}
