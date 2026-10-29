import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/**
 * The browser client, or null when the project has no Supabase configured —
 * the site then runs on its bundled content and the admin explains what is missing.
 * Only the publishable key ever reaches the browser; writes are gated by RLS.
 */
export const supabase = url && key ? createClient(url, key) : null

export const MEDIA_BUCKET = 'media'
