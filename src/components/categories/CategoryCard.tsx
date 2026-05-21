import { Link } from 'react-router-dom'
import { ArrowRight, Mountain, Palmtree, Shuffle } from 'lucide-react'
import { CATEGORY_LABELS, type ActivityCategory } from '../../types/activity'
import { ProgressBar } from '../ui/ProgressBar'

const ICONS: Record<ActivityCategory, typeof Mountain> = {
  north_cali: Mountain,
  south_cali: Palmtree,
  either: Shuffle,
}

const GRADIENTS: Record<ActivityCategory, string> = {
  north_cali: 'from-sky-100 to-emerald-50 dark:from-sky-950/40 dark:to-emerald-950/30',
  south_cali: 'from-amber-100 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30',
  either: 'from-violet-100 to-rose-50 dark:from-violet-950/40 dark:to-rose-950/30',
}

interface CategoryCardProps {
  category: ActivityCategory
  total: number
  completed: number
  percent: number
}

export function CategoryCard({ category, total, completed, percent }: CategoryCardProps) {
  const Icon = ICONS[category]

  return (
    <Link
      to={`/category/${category}`}
      className={`group block rounded-2xl bg-gradient-to-br ${GRADIENTS[category]} border border-white/60 dark:border-stone-800 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/80 dark:bg-stone-800/80 p-2.5 shadow-sm">
            <Icon className="h-5 w-5 text-stone-600 dark:text-stone-300" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-100">
              {CATEGORY_LABELS[category]}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {completed} of {total} done
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-stone-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
      </div>
      <ProgressBar percent={percent} />
      <p className="mt-2 text-right text-xs font-medium text-rose-600 dark:text-rose-400">
        {percent}% complete
      </p>
    </Link>
  )
}
