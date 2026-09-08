import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json, Tables, TablesInsert } from "@/lib/db/types";
import { loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { buildAccountingLines } from "./build-accounting-lines";
import { formatBatchCode, nextSeqForDate } from "./batch-code";
import { TAX_RATE_BPS, TAX_BASIS } from "./tax";

const MAX_SEQ_RETRIES = 5; // lot-code.ts's own 23505-retry idiom, widened to 5 (plan §Architecture step 7)
const UNIQUE_VIOLATION = "23505";

export type CreateExportBatchReason = "DAY_NOT_LOCKED" | "SEQ_RACE_EXHAUSTED";
export type CreateExportBatchResult =
  | { ok: true; batch: Tables<"accounting_export_batch"> }
  | { ok: false; reason: CreateExportBatchReason };

/**
 * IF-ACC-01 write path. RFP §08-03: "Dữ liệu trao đổi là dữ liệu đối chiếu
 * ngày SAU KHI ĐÃ LOCK" -- an unlocked day refuses export outright (the
 * caller, phase-03's route, turns DAY_NOT_LOCKED into a 409, not 422/423).
 *
 * QĐ-5 (no cross-table transaction): everything is read and computed BEFORE
 * the one INSERT below runs, so there is exactly one write -- no partial
 * multi-row state is possible. The only failure window left is "INSERT
 * succeeded but the caller never saw the response"; that is accepted on
 * purpose (phase-02 §Architecture "Không có transaction"): the orphaned
 * batch is visible and harmless, and the fix is simply exporting again.
 */
export async function createExportBatch(
  client: SupabaseClient<Database>,
  businessDate: string,
  actorId: string,
): Promise<CreateExportBatchResult> {
  const lock = await loadLockStatus(client, businessDate);
  if (!lock.locked) {
    return { ok: false, reason: "DAY_NOT_LOCKED" };
  }

  const lines = await buildAccountingLines(client, businessDate);
  const totalNetAmountJpy = lines.reduce((sum, line) => sum + line.netAmountJpy, 0);
  const totalTaxJpy = lines.reduce((sum, line) => sum + line.taxJpy, 0);
  // `lines` is a plain array of primitive-field objects -- always a safe
  // Json value (same "as unknown as Json" idiom as
  // src/lib/participants/audit-json.ts, inlined here since this is its only
  // call site in this domain).
  const linesJson = lines as unknown as Json;

  for (let attempt = 0; attempt < MAX_SEQ_RETRIES; attempt += 1) {
    const seq = await nextSeqForDate(client, businessDate);
    const insertRow: TablesInsert<"accounting_export_batch"> = {
      batch_code: formatBatchCode(businessDate, seq),
      business_date: businessDate,
      seq,
      kind: seq === 1 ? "full" : "re-export",
      tax_rate_bps: TAX_RATE_BPS,
      tax_basis: TAX_BASIS,
      row_count: lines.length,
      total_net_amount_jpy: totalNetAmountJpy,
      total_tax_jpy: totalTaxJpy,
      lines: linesJson,
      exported_by: actorId,
    };

    const { data, error } = await client.from("accounting_export_batch").insert(insertRow).select().single();

    if (!error && data) {
      await writeAuditLog(client, {
        actorId,
        action: "create_accounting_export_batch",
        entity: "accounting_export_batch",
        entityId: data.id,
        before: null,
        after: {
          batch_code: data.batch_code,
          row_count: data.row_count,
          total_net_amount_jpy: data.total_net_amount_jpy,
          total_tax_jpy: data.total_tax_jpy,
          tax_rate_bps: data.tax_rate_bps,
        } as unknown as Json,
      });
      return { ok: true, batch: data };
    }

    if (error?.code !== UNIQUE_VIOLATION) {
      throw new Error(`createExportBatch(${businessDate}) failed: ${error?.message}`);
    }
    // 23505 -- another export raced the same seq; loop and try the next one.
  }

  return { ok: false, reason: "SEQ_RACE_EXHAUSTED" };
}
