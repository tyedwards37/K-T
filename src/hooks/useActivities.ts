import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { DEMO_ACTIVITIES } from '../lib/demoData'
import type { Activity, ActivityInput } from '../types/activity'

const QUERY_KEY = ['activities'] as const

let demoStore = [...DEMO_ACTIVITIES]

async function fetchActivities(): Promise<Activity[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [...demoStore]
  }

  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Activity[]
}

async function createActivity(input: ActivityInput): Promise<Activity> {
  if (!isSupabaseConfigured || !supabase) {
    const activity: Activity = {
      id: `demo-${Date.now()}`,
      title: input.title,
      notes: input.notes ?? null,
      location: input.location ?? null,
      estimated_cost: input.estimated_cost ?? null,
      tag: input.tag,
      category: input.category,
      completed: false,
      favorite: input.favorite ?? false,
      created_at: new Date().toISOString(),
      completed_at: null,
      updated_at: new Date().toISOString(),
    }
    demoStore = [activity, ...demoStore]
    return activity
  }

  const { data, error } = await supabase
    .from('activities')
    .insert({
      title: input.title,
      notes: input.notes ?? null,
      location: input.location ?? null,
      estimated_cost: input.estimated_cost ?? null,
      tag: input.tag,
      category: input.category,
      favorite: input.favorite ?? false,
      completed: false,
    })
    .select()
    .single()

  if (error) throw error
  return data as Activity
}

async function updateActivity(
  id: string,
  updates: Partial<Activity>
): Promise<Activity> {
  if (!isSupabaseConfigured || !supabase) {
    demoStore = demoStore.map((a) =>
      a.id === id
        ? {
            ...a,
            ...updates,
            updated_at: new Date().toISOString(),
            completed_at:
              updates.completed === true
                ? new Date().toISOString()
                : updates.completed === false
                  ? null
                  : a.completed_at,
          }
        : a
    )
    const found = demoStore.find((a) => a.id === id)
    if (!found) throw new Error('Activity not found')
    return found
  }

  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Activity
}

async function deleteActivity(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    demoStore = demoStore.filter((a) => a.id !== id)
    return
  }

  const { error } = await supabase.from('activities').delete().eq('id', id)
  if (error) throw error
}

export function useActivities() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchActivities,
  })

  const createMutation = useMutation({
    mutationFn: createActivity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Activity> }) =>
      updateActivity(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })

  return {
    activities: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isDemoMode: !isSupabaseConfigured,
    createActivity: createMutation.mutateAsync,
    updateActivity: (id: string, updates: Partial<Activity>) =>
      updateMutation.mutateAsync({ id, updates }),
    deleteActivity: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
