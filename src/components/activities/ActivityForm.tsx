import { useState, type FormEvent } from 'react'
import {
  CATEGORY_LABELS,
  TAG_LABELS,
  type Activity,
  type ActivityCategory,
  type ActivityInput,
  type ActivityTag,
} from '../../types/activity'
import { Button } from '../ui/Button'

const TAGS = Object.keys(TAG_LABELS) as ActivityTag[]
const CATEGORIES = Object.keys(CATEGORY_LABELS) as ActivityCategory[]

interface ActivityFormProps {
  initial?: Activity | null
  defaultCategory?: ActivityCategory
  onSubmit: (data: ActivityInput) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ActivityForm({
  initial,
  defaultCategory = 'either',
  onSubmit,
  onCancel,
  isLoading,
}: ActivityFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [location, setLocation] = useState(initial?.location ?? '')
  const [estimatedCost, setEstimatedCost] = useState(initial?.estimated_cost ?? '')
  const [tag, setTag] = useState<ActivityTag>(initial?.tag ?? 'other')
  const [category, setCategory] = useState<ActivityCategory>(
    initial?.category ?? defaultCategory
  )
  const [favorite, setFavorite] = useState(initial?.favorite ?? false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setError('')
    await onSubmit({
      title: title.trim(),
      notes: notes.trim() || null,
      location: location.trim() || null,
      estimated_cost: estimatedCost.trim() || null,
      tag,
      category,
      favorite,
    })
  }

  const inputClass =
    'w-full rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-4 py-2.5 text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-shadow'

  const labelClass = 'block text-sm font-medium text-stone-600 dark:text-stone-400 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className={labelClass}>
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="What do we want to do?"
          required
          autoFocus
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} resize-none`}
          rows={3}
          placeholder="Any details to remember..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className={labelClass}>Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
            placeholder="Where?"
          />
        </div>
        <div>
          <label htmlFor="cost" className={labelClass}>Estimated Cost</label>
          <input
            id="cost"
            type="text"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
            className={inputClass}
            placeholder="e.g. $50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tag" className={labelClass}>Tag</label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value as ActivityTag)}
            className={inputClass}
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>{TAG_LABELS[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ActivityCategory)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) => setFavorite(e.target.checked)}
          className="h-4 w-4 rounded border-stone-300 text-rose-500 focus:ring-rose-400"
        />
        <span className="text-sm text-stone-600 dark:text-stone-400">Mark as favorite</span>
      </label>

      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          {initial ? 'Save changes' : 'Add activity'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
