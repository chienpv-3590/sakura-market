import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session cookie on every matched request, then
 * gates unauthenticated access to every business route (Tầng 1 — see
 * phase-04 § Architecture). This layer only checks "does a session exist";
 * `is_active` and role checks live in `lib/auth/require-role.ts` (Tầng 2),
 * so this never pays a DB round trip for every asset/route it sees.
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
  // from the returned response and randomly log users out.
  const { data } = await supabase.auth.getClaims();

  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path.startsWith("/api/auth/");

  if (!data?.claims && !isPublicPath) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("reason", "unauthenticated");

    const redirectResponse = NextResponse.redirect(loginUrl);
    // Carry the refreshed cookies from supabaseResponse onto the redirect —
    // a bare NextResponse.redirect() here would drop the session cookie and
    // loop forever between "/login" and a refreshed-but-discarded session.
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  // Must return this exact object — it carries the refreshed session
  // cookie. Building a fresh NextResponse elsewhere drops the session.
  return supabaseResponse;
}
