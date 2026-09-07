import { todayJst } from "@/lib/db/business-date";

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

/**
 * F007 A1/A2 edge case (technical-spec §3.2): `businessDate` must be
 * "YYYY-MM-DD" and not later than today (JST) -- a reconciliation/lock
 * request for a day that has not happened yet in JST makes no sense.
 */
export function isValidBusinessDate(value: string): boolean {
  if (!DATE_FORMAT.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  if (parsed.getUTCFullYear() !== y || parsed.getUTCMonth() !== m - 1 || parsed.getUTCDate() !== d) {
    return false;
  }
  return value <= todayJst();
}
