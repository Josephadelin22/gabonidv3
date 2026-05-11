import { createClient } from "@supabase/supabase-js";

// Ces variables seront lues depuis le fichier .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Création du client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
