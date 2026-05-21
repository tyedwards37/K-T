import type {
  Activity,
  ActivityCategory,
  FilterOption,
  SortOption,
} from '../types/activity'

export function filterActivities(
  activities: Activity[],
  options: {
    category?: ActivityCategory
    filter: FilterOption
    search: string
    favoritesOnly?: boolean
  }
): Activity[] {
  let result = [...activities]

  if (options.category) {
    result = result.filter((a) => a.category === options.category)
  }

  if (options.filter === 'active') {
    result = result.filter((a) => !a.completed)
  } else if (options.filter === 'completed') {
    result = result.filter((a) => a.completed)
  }

  if (options.favoritesOnly) {
    result = result.filter((a) => a.favorite)
  }

  const q = options.search.trim().toLowerCase()
  if (q) {
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.notes?.toLowerCase().includes(q) ?? false) ||
        (a.location?.toLowerCase().includes(q) ?? false)
    )
  }

  return result
}

export function sortActivities(
  activities: Activity[],
  sort: SortOption
): Activity[] {
  const sorted = [...activities]

  switch (sort) {
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    case 'oldest':
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    case 'alphabetical':
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      )
    default:
      return sorted
  }
}

export function getCategoryStats(activities: Activity[], category: ActivityCategory) {
  const items = activities.filter((a) => a.category === category)
  const completed = items.filter((a) => a.completed).length
  const total = items.length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0
  return { total, completed, percent }
}

export function getGlobalStats(activities: Activity[]) {
  const total = activities.length
  const completed = activities.filter((a) => a.completed).length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0
  const favorites = activities.filter((a) => a.favorite).length
  const active = total - completed

  const byTag = activities.reduce<Record<string, number>>((acc, a) => {
    acc[a.tag] = (acc[a.tag] ?? 0) + 1
    return acc
  }, {})

  const recentlyCompleted = activities
    .filter((a) => a.completed && a.completed_at)
    .sort(
      (a, b) =>
        new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime()
    )
    .slice(0, 5)

  return { total, completed, percent, favorites, active, byTag, recentlyCompleted }
}