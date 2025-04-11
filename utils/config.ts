import { Platform } from 'react-native';

export const CONFIG = {
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://svjbkcptmawzzpqbtlek.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'your_anon_key_here',
  GROQ_API_KEY: process.env.GROQ_API_KEY || 'your_groq_api_key_here',
  IS_WEB: Platform.OS === 'web',
};