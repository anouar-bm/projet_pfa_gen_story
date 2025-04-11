import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svjbkcptmawzzpqbtlek.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2amJrY3B0bWF3enpwcWJ0bGVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjY0MzcsImV4cCI6MjAyNTUwMjQzN30.7HC0ZKuPUl7J-8sEpowrp8mCRW4ZvbBh0aZjp_NlSUY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});