import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { ReportRow } from "../report-row";
import { buildAccountingLines, type AccountingLine } from "@/lib/accounting/build-accounting-lines";
import { loadBatchByCode } from "@/lib/accounting/export-batch-queries";

interface BatchProvenance {
  batchCode: string;
  exportedAt: string;
  exportedByName: string;
}

// One row per participant per RFP §08-03/§08-05 -- `batchCode`/`exportedAt`/
// `exportedBy` are properties of the BATCH, not the line, but are repeated
// onto every row here (phase-03 §Architecture "Ghép cột batch vào từng
// dòng CSV") so a CSV opened standalone in Excel still carries every
// mandatory field with no separate metadata sheet to lose.
function toRow(line: AccountingLine, provenance: BatchProvenance): ReportRow {
  return {
    batchCode: provenance.batchCode,
    businessDate: line.businessDate,
    participantId: line.participantId,
    participantName: line.participantName,
    participantCategory: line.participantCategory,
    grossAmountJpy: line.grossAmountJpy,
    adjustmentAmountJpy: line.adjustmentAmountJpy,
    netAmountJpy: line.netAmountJpy,
    taxJpy: line.taxJpy,
    totalWithTaxJpy: line.totalWithTaxJpy,
    status: line.status,
    exportedAt: provenance.exportedAt,
    exportedBy: provenance.exportedByName,
  };
}

/**
 * Resolves `app_user.display_name` (falls back to `email`) for a set of ids
 * -- shared by this file's own "exportedBy" column and by the RPT-06 viewer
 * page's batch list "người tạo" column. Empty input runs no query.
 */
export async function loadUserDisplayNames(
  client: SupabaseClient<Database>,
  ids: string[],
): Promise<Map<string, string>> {
  const uniqueIds = Array.from(new Set(ids));
  if (uniqueIds.length === 0) return new Map();
  const { data, error } = await client.from("app_user").select("id, display_name, email").in("id", uniqueIds);
  if (error) throw new Error(`loadUserDisplayNames failed: ${error.message}`);
  return new Map((data ?? []).map((u) => [u.id, u.display_name ?? u.email]));
}

/**
 * RPT-06 / IF-ACC-01 -- two modes (phase-03 §Overview #3):
 * - `batchCode` given -> read the immutable snapshot off
 *   `accounting_export_batch.lines` (§08-05: "dữ liệu đã gửi"). A batch
 *   that doesn't exist, or belongs to a different business_date than the
 *   one asked for, returns no rows -- the caller (export.csv route) makes
 *   that a 404, not this function's job to decide HTTP status.
 * - no `batchCode` -> live preview via `buildAccountingLines` (§Overview:
 *   "số hiện tại, chưa phải số đã gửi"). `batchCode`/`exportedAt`/
 *   `exportedBy` are empty strings in this mode -- there is no batch yet.
 */
export async function loadAccountingExportRows(
  client: SupabaseClient<Database>,
  businessDate: string,
  batchCode: string | undefined,
): Promise<ReportRow[]> {
  if (batchCode) {
    const batch = await loadBatchByCode(client, batchCode);
    if (!batch || batch.business_date !== businessDate) return [];

    const namesById = await loadUserDisplayNames(client, batch.exported_by ? [batch.exported_by] : []);
    const provenance: BatchProvenance = {
      batchCode: batch.batch_code,
      exportedAt: batch.exported_at,
      exportedByName: batch.exported_by ? (namesById.get(batch.exported_by) ?? "") : "",
    };
    const lines = batch.lines as unknown as AccountingLine[];
    return lines.map((line) => toRow(line, provenance));
  }

  const lines = await buildAccountingLines(client, businessDate);
  const provenance: BatchProvenance = { batchCode: "", exportedAt: "", exportedByName: "" };
  return lines.map((line) => toRow(line, provenance));
}
