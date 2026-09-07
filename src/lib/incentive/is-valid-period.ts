// D001 (functional-spec §3): a "period" is 1 locked business day, so it is
// validated the same shape as any business_date -- "YYYY-MM-DD", a real
// calendar date. Kept as its own tiny copy rather than importing
// reconciliation's validator (out of this phase's file ownership) --
// deliberate, accepted duplication per the phase's own file-boundary rule.
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

export function isValidPeriod(value: string): boolean {
  if (!DATE_FORMAT.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  return parsed.getUTCFullYear() === y && parsed.getUTCMonth() === m - 1 && parsed.getUTCDate() === d;
}
