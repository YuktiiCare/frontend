
import { createClient } from '@supabase/supabase-js';

// Load environment variables or use fallback values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nbilmxvtsrtkffvaeysq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iaWxteHZ0c3J0a2ZmdmFleXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzczNTAsImV4cCI6MjA1ODA1MzM1MH0._-twDE8x62Xqu5hpMw4bIDTz25KvfjxHIOKhmVart3I';

// Create the Supabase client with retry logic
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials are missing. Please check your environment variables.');
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: 'public',
      },
    });
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
};

export const supabase = createSupabaseClient();

// Function to check if the Supabase connection is working
export const checkSupabaseConnection = async (retries = 3): Promise<boolean> => {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return false;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data, error } = await supabase.from('jobs').select('count').limit(1);
      
      if (error) {
        console.error(`Supabase connection error (attempt ${attempt}/${retries}):`, error);
        if (attempt === retries) return false;
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        continue;
      }
      
      console.log('Supabase connection successful');
      return true;
    } catch (error) {
      console.error(`Supabase connection test failed (attempt ${attempt}/${retries}):`, error);
      if (attempt === retries) return false;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  return false;
};

// Initialize connection check
checkSupabaseConnection().then(isConnected => {
  if (isConnected) {
    console.log('Successfully connected to Supabase');
  } else {
    console.error('Failed to connect to Supabase. Please check your credentials and network connection.');
  }
});
