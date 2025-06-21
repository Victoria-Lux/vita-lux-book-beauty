
import { createClient } from '@supabase/supabase-js'

// These environment variables should be set in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Supabase project settings.')
  console.log('1. Go to your Supabase dashboard')
  console.log('2. Navigate to Settings > API')
  console.log('3. Copy your Project URL and anon/public key')
  console.log('4. Set them as environment variables in Lovable')
}

// Create a fallback client to prevent app crashes during setup
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

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
