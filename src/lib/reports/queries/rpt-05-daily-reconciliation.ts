import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { ReportRow } from "../report-row";

/**
 * RPT-05 "Bảng đối chiếu ngày" -- reads the `reconciliation_line` view
 * (F007) directly, same view SCR013 already reads. The view carries no FK
 * metadata (it's a view, not a table -- see src/lib/db/types.ts), so
 * participant names are resolved with a second lookup rather than an
 * embedded select, same pattern transactions/page.tsx already uses.
 */
export async function loadDailyReconciliationRows(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<ReportRow[]> {
  const { data, error } = await client.from("reconciliation_line").select("*").eq("business_date", businessDate);
  if (error) {
    throw new Error(`loadDailyReconciliationRows(${businessDate}) failed: ${error.message}`);
  }
  const lines = data ?? [];

  const participantIds = Array.from(
    new Set(lines.map((l) => l.participant_id).filter((id): id is string => id !== null)),
  );
  const { data: participants } =
    participantIds.length > 0
      ? await client.from("participant").select("id, name").in("id", participantIds)
      : { data: [] as { id: string; name: string }[] };
  const nameById = new Map((participants ?? []).map((p) => [p.id, p.name]));

  return lines.map((l) => ({
    businessDate: l.business_date,
    participant: l.participant_id ? (nameById.get(l.participant_id) ?? l.participant_id) : "",
    sourceType: l.source_type ?? "",
    sourceId: l.source_id ?? "",
    qty: l.qty ?? 0,
    amountJpy: l.amount_jpy ?? 0,
    variance: l.variance ?? 0,
  }));
}
