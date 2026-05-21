export type ActivityCategory = 'north_cali' | 'south_cali' | 'either'

export type ActivityTag =
  | 'food'
  | 'outdoors'
  | 'adventure'
  | 'travel'
  | 'coffee'
  | 'date_night'
  | 'event'
  | 'creative'
  | 'other'

export type Activity = {
  id: string
  title: string
  notes: string | null
  location: string | null
  estimated_cost: string | null
  tag: ActivityTag
  category: ActivityCategory
  completed: boolean
  favorite: boolean
  created_at: string
  completed_at: string | null
  updated_at: string
}

export type ActivityInput = {
  title: string
  notes?: string | null
  location?: string | null
  estimated_cost?: string | null
  tag: ActivityTag
  category: ActivityCategory
  favorite?: boolean
}

export type SortOption = 'newest' | 'oldest' | 'alphabetical'
export type FilterOption = 'all' | 'active' | 'completed'

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  north_cali: 'North Cali',
  south_cali: 'South Cali',
  either: 'Either',
}

export const TAG_LABELS: Record<ActivityTag, string> = {
  food: 'Food',
  outdoors: 'Outdoors',
  adventure: 'Adventure',
  travel: 'Travel',
  coffee: 'Coffee',
  date_night: 'Date Night',
  event: 'Event',
  creative: 'Creative',
  other: 'Other',
}

export const TAG_COLORS: Record<ActivityTag, string> = {
  food: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  outdoors: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
  adventure: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200',
  travel: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200',
  coffee: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200',
  date_night: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
  event: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200',
  creative: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-200',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}
