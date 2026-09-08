import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

// ACC-YYYYMMDD-NN -- WORKING ASSUMPTION PENDING CUSTOMER CONFIRMATION
// (phase-02 §Key Insights #2). RFP §08-03/§08-05 require a batch code but
// never define its lifecycle. `seq` counts EXPORTS of `businessDate`, not
// calendar days -- re-exporting an already-exported day is a normal, valid
// action (a locked day can still change through transaction_adjustment,
// F008's one lawful post-lock write path), so batch code is deliberately
// NOT unique-per-day.
export function formatBatchCode(businessDate: string, seq: number): string {
  const compact = businessDate.replaceAll("-", "");
  return `ACC-${compact}-${String(seq).padStart(2, "0")}`;
}

/**
 * Next 1-based seq for `businessDate` -- max(seq) + 1, matching this phase's
 * plan data-flow exactly (not a row count, which would silently misbehave
 * if a gap ever appeared in an append-only table). `createExportBatch`
 * retries around the INSERT on a 23505 unique-violation (lot-code.ts's own
 * retry pattern) if two exports race the same seq.
 */
export async function nextSeqForDate(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<number> {
  const { data, error } = await client
    .from("accounting_export_batch")
    .select("seq")
    .eq("business_date", businessDate)
    .order("seq", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`nextSeqForDate(${businessDate}) failed: ${error.message}`);
  }
  return (data?.seq ?? 0) + 1;
}
