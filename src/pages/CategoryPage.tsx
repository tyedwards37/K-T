import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { useActivities } from '../hooks/useActivities'
import { useCelebrateCompletion } from '../components/CompletionCelebration'
import {
  filterActivities,
  getCategoryStats,
  sortActivities,
} from '../utils/activityFilters'
import {
  CATEGORY_LABELS,
  type Activity,
  type ActivityCategory,
  type FilterOption,
  type SortOption,
} from '../types/activity'
import { ActivityCard } from '../components/activities/ActivityCard'
import { ActivityForm } from '../components/activities/ActivityForm'
import { ActivityFilters } from '../components/ActivityFilters'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { LoadingState } from '../components/LoadingState'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: ActivityCategory }>()
  const category = categoryId as ActivityCategory

  const {
    activities,
    isLoading,
    isError,
    createActivity,
    updateActivity,
    deleteActivity,
    isCreating,
    isUpdating,
  } = useActivities()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterOption>('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null)
  const celebrateCompletion = useCelebrateCompletion()

  if (!category || !CATEGORY_LABELS[category]) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-500">Category not found.</p>
        <Link to="/" className="text-rose-500 hover:underline mt-2 inline-block">
          Back home
        </Link>
      </div>
    )
  }

  const catStats = getCategoryStats(activities, category)
  const filtered = sortActivities(
    filterActivities(activities, {
      category,
      filter,
      search,
      favoritesOnly,
    }),
    sort
  )

  const handleToggleComplete = async (activity: Activity) => {
    const newCompleted = !activity.completed
    await updateActivity(activity.id, { completed: newCompleted })
    if (newCompleted) celebrateCompletion()
  }

  const handleToggleFavorite = async (activity: Activity) => {
    await updateActivity(activity.id, { favorite: !activity.favorite })
  }

  const handleDelete = async () => {
    if (!deletingActivity) return
    await deleteActivity(deletingActivity.id)
    setDeletingActivity(null)
  }

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-rose-500 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div>
          <h1 className="font-display text-4xl font-bold text-stone-800 dark:text-stone-50">
            {CATEGORY_LABELS[category]}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            {catStats.completed} of {catStats.total} completed
          </p>
        </div>
        <ProgressBar percent={catStats.percent} className="mt-4" />
        <div className="w-full flex justify-center mt-4">
          <Button
            onClick={() => setShowAddModal(true)}
            className="w-full max-w-2xl py-3 text-base"
          >
            <Plus className="h-5 w-5" />
            Add activity
          </Button>
        </div>
      </div>

      <ActivityFilters
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        showFavoritesOnly={favoritesOnly}
        onFavoritesToggle={() => setFavoritesOnly((v) => !v)}
      />

      {filtered.length === 0 ? (
        <EmptyState
          onAdd={() => setShowAddModal(true)}
          message={
            search || filter !== 'all' || favoritesOnly
              ? 'No activities match your filters.'
              : `No activities in ${CATEGORY_LABELS[category]} yet.`
          }
        />
      ) : (
        <ul className="space-y-3" role="list">
          {filtered.map((activity) => (
            <li key={activity.id}>
              <ActivityCard
                activity={activity}
                onToggleComplete={handleToggleComplete}
                onToggleFavorite={handleToggleFavorite}
                onEdit={setEditingActivity}
                onDelete={setDeletingActivity}
                isUpdating={isUpdating}
              />
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="New adventure">
        <ActivityForm
          defaultCategory={category}
          onSubmit={async (data) => {
            await createActivity(data)
            setShowAddModal(false)
          }}
          onCancel={() => setShowAddModal(false)}
          isLoading={isCreating}
        />
      </Modal>

      <Modal
        isOpen={!!editingActivity}
        onClose={() => setEditingActivity(null)}
        title="Edit activity"
      >
        {editingActivity && (
          <ActivityForm
            initial={editingActivity}
            onSubmit={async (data) => {
              await updateActivity(editingActivity.id, data)
              setEditingActivity(null)
            }}
            onCancel={() => setEditingActivity(null)}
            isLoading={isUpdating}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!deletingActivity}
        onClose={() => setDeletingActivity(null)}
        title="Delete activity?"
      >
        {deletingActivity && (
          <div>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Are you sure you want to delete &ldquo;{deletingActivity.title}&rdquo;? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="danger" onClick={handleDelete} className="flex-1 bg-red-600 text-white hover:bg-red-700">
                Delete
              </Button>
              <Button variant="secondary" onClick={() => setDeletingActivity(null)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
