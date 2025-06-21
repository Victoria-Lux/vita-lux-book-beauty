
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Customer = {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  referral_source?: string
  auth_user_id: string
  created_at: string
  updated_at: string
}

export type Appointment = {
  id: string
  customer_id: string
  service_name: string
  provider_name: string
  appointment_date: string
  appointment_time: string
  duration_minutes: number
  price: number
  status: 'confirmed' | 'cancelled' | 'completed'
  special_preferences?: string
  created_at: string
  updated_at: string
}
