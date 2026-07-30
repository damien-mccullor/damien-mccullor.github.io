/*
 * LOGIC BRIEFING:
 * supabaseClient — Supabase client singleton
 * Initializes and exports the Supabase JS client using VITE_ environment variables.
 * Imported by any file that makes Supabase calls (contact form, login, back office).
 * Returns null when env vars are absent so the app degrades gracefully in preview.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/* SECTION: FALLBACK — returns null when env vars are missing (required by R1) */
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export default supabase
