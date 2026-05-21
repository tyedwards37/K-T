import { Search } from 'lucide-react'
import type { FilterOption, SortOption } from '../types/activity'

interface ActivityFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  filter: FilterOption
  onFilterChange: (value: FilterOption) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
  showFavoritesOnly?: boolean
  onFavoritesToggle?: () => void
}

const FILTERS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetical', label: 'A–Z' },
]

export function ActivityFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
  showFavoritesOnly,
  onFavoritesToggle,
}: ActivityFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search title, notes, or location..."
          className="w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label="Search activities"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden" role="group" aria-label="Filter activities">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-rose-500 text-white'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-cream-100 dark:hover:bg-stone-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {onFavoritesToggle && (
          <button
            onClick={onFavoritesToggle}
            className={`rounded-xl px-3 py-2 text-sm font-medium border transition-colors ${
              showFavoritesOnly
                ? 'bg-rose-100 border-rose-300 text-rose-700 dark:bg-rose-900/40 dark:border-rose-800 dark:text-rose-300'
                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            ♥ Favorites
          </button>
        )}

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-600 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label="Sort activities"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
