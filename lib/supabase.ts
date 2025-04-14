import { createClient } from '@supabase/supabase-js'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

export const checkSupabaseConnection = async (retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { error } = await supabase
        .from('jobs')
        .select('count')
        .limit(1)
      
      if (!error) return true
      
      console.error(`Supabase connection error (attempt ${attempt}/${retries}):`, error)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    } catch (error) {
      console.error(`Supabase connection error (attempt ${attempt}/${retries}):`, error)
      if (attempt === retries) return false
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
  return false
}