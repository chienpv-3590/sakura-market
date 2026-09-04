import { createBrowserClient } from "@supabase/ssr";

// Browser client — safe to use from Client Components ("use client").
// Uses the publishable (public) key only; never the secret key.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
