import { cookies } from "next/headers";
import { cache } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isLocale, type Locale } from "./config";

// Reads the persisted `locale` cookie for the current request. Falls back
// to DEFAULT_LOCALE when absent or invalid. React.cache() dedupes repeated
// calls (layout + every page) within the same request.
export const getLocale = cache(async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
});
