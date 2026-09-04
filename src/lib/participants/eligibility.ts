import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

export interface EligibilityResult {
  eligible: boolean;
  reason?: string;
}

/**
 * BR-PERM-01 / FR-PARTY-02 / A4 (technical-spec § 3.2). Phase 07 calls this
 * at transaction-CONFIRM time -- never at draft-create time -- passing the
 * business date it is confirming against (see lib/db/business-date.ts
 * todayJst()/toJstDate(); JST, never a bare `new Date()`).
 *
 * Stateless on purpose: no caching, no internal "now" default. Accepts the
 * caller's own SupabaseClient so Phase 07 can run this inside the same DB
 * transaction as its quantity-decrement step (INT-001 of F004).
 *
 * eligible = (status === 'có hiệu lực') AND (atDate ∈ [valid_from, valid_to]).
 * `valid_to` may be null (no expiry). Recomputed fresh from valid_from/
 * valid_to on every call -- there is no cron flipping status at valid_to, so
 * this must never trust a stale 'có hiệu lực' status by itself.
 */
export async function checkParticipantEligibility(
  client: SupabaseClient<Database>,
  participantId: string,
  atDate: string,
): Promise<EligibilityResult> {
  const { data, error } = await client
    .from("participant")
    .select("status, valid_from, valid_to")
    .eq("id", participantId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `checkParticipantEligibility: participant lookup failed for ${participantId}: ${error.message}`,
    );
  }
  if (!data) {
    return { eligible: false, reason: `Không tìm thấy người tham gia ${participantId}` };
  }
  if (data.status !== "có hiệu lực") {
    return {
      eligible: false,
      reason: `Trạng thái hiện tại là "${data.status}", không phải "có hiệu lực"`,
    };
  }
  if (atDate < data.valid_from) {
    return {
      eligible: false,
      reason: `Chưa tới ngày hiệu lực (bắt đầu từ ${data.valid_from})`,
    };
  }
  if (data.valid_to !== null && atDate > data.valid_to) {
    return {
      eligible: false,
      reason: `Đã hết hiệu lực từ ${data.valid_to}`,
    };
  }
  return { eligible: true };
}
