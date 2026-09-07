// Shared quantity rounding for F006. `qty`/`delivered_qty` are Postgres
// numeric(12,2) -- JS numbers represent them exactly enough at this scale,
// but repeated +/- across shipments can leave float dust (e.g. 39.999999999
// instead of 40). Every comparison and every write in this domain goes
// through round2() first so BR-DEL-03's "bằng chính xác" check never fails
// on a floating-point artifact instead of a real quantity mismatch.
export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function qtyEquals(a: number, b: number): boolean {
  return round2(a) === round2(b);
}
