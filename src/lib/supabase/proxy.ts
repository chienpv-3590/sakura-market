import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session cookie on every matched request.
 *
 * Phase 02 scope: cookie refresh only — no redirect. The
 * unauthenticated-user redirect belongs to Phase 04, which will read the
 * claims below and add a redirect right after the guarded comment block.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // WARNING — do not insert any code between createServerClient(...) above
  // and this call. Anything placed here can desync the refreshed cookie
  // from the returned response and randomly log users out. (Phase 04: add
  // the auth redirect AFTER this call, still before `return`.)
  await supabase.auth.getClaims();

  // Must return this exact object — it carries the refreshed session
  // cookie. Building a fresh NextResponse elsewhere drops the session.
  return supabaseResponse;
}
