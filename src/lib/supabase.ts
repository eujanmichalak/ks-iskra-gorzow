import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Dodajemy zabezpieczenie, żeby build nie wywalał błędu
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("UWAGA: Brak kluczy Supabase w zmiennych środowiskowych!");
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);