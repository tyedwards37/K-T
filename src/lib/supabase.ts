import { createClient } from '@supabase/supabase-js'
import type { Activity } from '../types/activity'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: Activity
        Insert: Omit<Activity, 'id' | 'created_at' | 'updated_at' | 'completed_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: Partial<Activity>
      }
    }
  }
}
