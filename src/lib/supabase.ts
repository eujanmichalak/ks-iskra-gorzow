import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xndpbhblywygqxgfidqx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZHBiaGJseXd5Z3F4Z2ZpZHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MDIxMzksImV4cCI6MjA4NDE3ODEzOX0.zwXyg7-8p6Z4CGyASDgIJaYgxjLm_Vj8sLaBq1OFSY4';


// Dodajemy zabezpieczenie, żeby build nie wywalał błędu
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("UWAGA: Brak kluczy Supabase w zmiennych środowiskowych!");
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);