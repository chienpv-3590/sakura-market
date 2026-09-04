import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// This is the ONLY file in the app allowed to touch SUPABASE_SECRET_KEY.
// The "server-only" import above makes the build fail immediately if
// anything carrying "use client" ever imports this module. Only import
// from scripts and Route Handlers (never from Client Components).
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY environment variables",
    );
  }

  return createSupabaseClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
