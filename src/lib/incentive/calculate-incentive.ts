// ALG-002 (FR-301, FR-302, BR-INC-01). Pure function -- no DB access -- so it
// can be exercised directly with `node -e` (phase-09 Success Criteria #1).
//
// Three failure modes the spec calls out explicitly, all guarded here:
//   (a) Math.round instead of Math.floor -- rounding must always go DOWN.
//   (b) prorating a late payment -- there is no grace period; late = exactly 0.
//   (c) letting a float leak out -- JPY has no sub-unit, result is always an
//       integer.
//
// Worked example from the spec (reproduced exactly by this function):
//   calculateIncentive(987654, true)  === 1086419  (987654 * 110/100 = 1086419.4, floored)
//   calculateIncentive(987654, false) === 0
export function calculateIncentive(eligibleAmountJpy: number, paidOnTime: boolean): number {
  if (!paidOnTime) return 0; // BR-002: late payment = exactly 0, never prorated.
  return Math.floor((eligibleAmountJpy * 110) / 100); // BR-001: floor, never round.
}
