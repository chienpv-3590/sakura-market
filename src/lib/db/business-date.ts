// All business dates in Sakura Market are anchored to Asia/Tokyo (JST) --
// never the browser's or the server's local timezone. The market operates on
// Japan business days regardless of where this code executes; using a bare
// `new Date()` / local-timezone format would silently shift rows to the
// wrong business_date near midnight JST (phase-08 Risk Assessment).
const BUSINESS_DAY_TIMEZONE = "Asia/Tokyo";

// en-CA formats as "YYYY-MM-DD" -- the exact string a Postgres `date` column
// (business_date on lot/mekiki_record/seri_result/delivery_shipment/
// transaction) accepts as input.
const jstDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: BUSINESS_DAY_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Converts any instant to its JST calendar date, formatted "YYYY-MM-DD". */
export function toJstDate(date: Date): string {
  return jstDateFormatter.format(date);
}

/**
 * Today's business date in JST. Every write path that stamps a
 * `business_date` (lot intake, mekiki, aitai/seri, delivery, reconciliation
 * default) must call this instead of `new Date()`.
 */
export function todayJst(): string {
  return toJstDate(new Date());
}
