// TBL-ACTOR-01 / FR-PARTY-01: the 4 participant categories are 4 distinct
// legal boundaries -- never collapse them into a generic "partner" enum
// (phase-05 Key Insight #1). Each category requires exactly one
// `license_type` value; this table is the single source of truth both the
// create/update API and the form UI read from.
export type ParticipantCategory = "卸売業者" | "仲卸" | "売買参加者" | "買出人";

export const PARTICIPANT_CATEGORIES: readonly ParticipantCategory[] = [
  "卸売業者",
  "仲卸",
  "売買参加者",
  "買出人",
];

// Values match what is already live in `participant.license_type`
// (supabase/seed.sql) -- NOT the ASCII placeholders (dang_ky/kyoka/shounin)
// sketched in phase-05's Architecture section, which do not match the
// already-migrated/seeded data. 仲卸 -> 許可 (giấy phép), 売買参加者 -> 承認
// (chấp thuận); 卸売業者/買出人 only register, no approval workflow.
export const CATEGORY_LICENSE_TYPE: Record<ParticipantCategory, string> = {
  卸売業者: "đăng ký",
  仲卸: "giấy phép", // 許可
  売買参加者: "chấp thuận", // 承認
  買出人: "đăng ký",
};

export function isParticipantCategory(value: string): value is ParticipantCategory {
  return (PARTICIPANT_CATEGORIES as readonly string[]).includes(value);
}

/** FR-PARTY-01: the (category, license_type) pair must match the table above exactly. */
export function isValidCategoryLicensePair(category: string, licenseType: string): boolean {
  return isParticipantCategory(category) && CATEGORY_LICENSE_TYPE[category] === licenseType;
}

/** The single license_type value required for a given category. */
export function requiredLicenseType(category: ParticipantCategory): string {
  return CATEGORY_LICENSE_TYPE[category];
}
