import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useActivities } from '../hooks/useActivities'
import { getCategoryStats, getGlobalStats } from '../utils/activityFilters'
import { CATEGORY_LABELS, type ActivityCategory } from '../types/activity'
import { Header } from '../components/layout/Header'
import { CategoryCard } from '../components/categories/CategoryCard'
import { StatsDashboard } from '../components/StatsDashboard'
import { RecentlyCompleted } from '../components/RecentlyCompleted'
import { ActivityForm } from '../components/activities/ActivityForm'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { LoadingState } from '../components/LoadingState'
import { ErrorState } from '../components/ErrorState'
import { useTheme } from '../hooks/useTheme'

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ActivityCategory[]

export function HomePage() {
  const { isDark, toggle } = useTheme()
  const {
    activities,
    isLoading,
    isError,
    isDemoMode,
    createActivity,
    isCreating,
  } = useActivities()

  const [showAddModal, setShowAddModal] = useState(false)
  const stats = getGlobalStats(activities)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />

  return (
    <div className="space-y-8 animate-fade-in">
      <Header
        total={stats.total}
        completed={stats.completed}
        percent={stats.percent}
        isDark={isDark}
        onToggleTheme={toggle}
        isDemoMode={isDemoMode}
      />

      <div className="flex justify-end">
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4" />
          Add activity
        </Button>
      </div>

      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const catStats = getCategoryStats(activities, category)
            return (
              <CategoryCard
                key={category}
                category={category}
                total={catStats.total}
                completed={catStats.completed}
                percent={catStats.percent}
              />
            )
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <StatsDashboard
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          favorites={stats.favorites}
          percent={stats.percent}
          byTag={stats.byTag}
        />
        <RecentlyCompleted activities={stats.recentlyCompleted} />
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="New adventure"
      >
        <ActivityForm
          onSubmit={async (data) => {
            await createActivity(data)
            setShowAddModal(false)
          }}
          onCancel={() => setShowAddModal(false)}
          isLoading={isCreating}
        />
      </Modal>
    </div>
  )
}
