import { createClient } from '@supabase/supabase-js'
import { SUPABASE_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://svjbkcptmawzzpqbtlek.supabase.co'
export const supabase = createClient(supabaseUrl, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage
  }
})