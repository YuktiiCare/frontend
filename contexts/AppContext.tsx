import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function AppProvider({ children }) {
  const [isSupabaseReady, setIsSupabaseReady] = useState(false)

  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          // Handle authenticated state
        }
        setIsSupabaseReady(true)
      } catch (error) {
        console.error('Error initializing Supabase:', error)
        setIsSupabaseReady(false)
      }
    }

    initSupabase()
  }, [])

  if (!isSupabaseReady) {
    return <div>Loading...</div>
  }

  return children
}