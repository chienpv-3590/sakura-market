import { NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE_NAME } from "@/lib/i18n/config";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Sets the persisted locale cookie. Validates the body strictly to only
// "vi" | "ja" — this cookie is not httpOnly (the client needs to read it),
// so we never trust it blindly on the way in either.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const candidate = (body as { locale?: unknown } | null)?.locale;
  if (typeof candidate !== "string" || !isLocale(candidate)) {
    return NextResponse.json(
      { error: "`locale` must be exactly 'vi' or 'ja'" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ locale: candidate });
  response.cookies.set(LOCALE_COOKIE_NAME, candidate, {
    httpOnly: false,
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
