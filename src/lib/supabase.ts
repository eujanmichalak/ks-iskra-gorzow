import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Jeśli brakuje kluczy, createClient wywali błąd, co jest lepsze niż działanie na "placeholderach"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);