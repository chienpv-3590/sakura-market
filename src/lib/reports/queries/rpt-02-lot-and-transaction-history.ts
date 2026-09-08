import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { ReportRow } from "../report-row";

// RPT-02's own "trạng thái giao dịch" filter only ever matches `transaction`
// rows -- `seri_result` carries no status column (FIG-012: a せり decision is
// final the moment it's recorded, there is no draft/cancel state for it), so
// its rows are only kept when the filter is either absent or 'confirmed'
// (matches RPT-01's convention of reporting every seri_result as 'confirmed').
const SERI_IMPLICIT_STATUS = "confirmed";

interface LotRow {
  id: string;
  lot_code: string;
  item: string;
  status: string;
  business_date: string;
}

/** Latest `mekiki_record.grade` per lot -- rows come back unordered, so the last write per lot_id wins only after sorting by assessed_at ascending. */
function latestMekikiGradeByLot(
  records: { lot_id: string; grade: string; assessed_at: string }[],
): Map<string, string> {
  const sorted = [...records].sort((a, b) => a.assessed_at.localeCompare(b.assessed_at));
  const gradeByLot = new Map<string, string>();
  for (const r of sorted) gradeByLot.set(r.lot_id, r.grade);
  return gradeByLot;
}

/**
 * RPT-02 "Lịch sử lô hàng và log trạng thái giao dịch" (phase-04 §Architecture).
 * `transaction`'s own `confirmed_by/confirmed_at` + `cancelled_by/cancelled_at/
 * cancel_reason` columns ARE the "log trạng thái giao dịch" the RFP asks for --
 * no separate history table is read; one row per event (transaction row or
 * seri_result row), never one row per lot (a lot with zero events emits zero
 * rows -- see phase-04 Success Criteria #3).
 */
export async function loadLotAndTransactionHistoryRows(
  client: SupabaseClient<Database>,
  lotId: string | undefined,
  txnStatus: string | undefined,
): Promise<ReportRow[]> {
  let txnQuery = client.from("transaction").select("*");
  let seriQuery = client.from("seri_result").select("*");
  if (lotId) {
    txnQuery = txnQuery.eq("lot_id", lotId);
    seriQuery = seriQuery.eq("lot_id", lotId);
  }
  if (txnStatus) txnQuery = txnQuery.eq("status", txnStatus);

  const [{ data: txns, error: txnError }, { data: seriResults, error: seriError }] = await Promise.all([
    txnQuery,
    seriQuery,
  ]);
  if (txnError) throw new Error(`loadLotAndTransactionHistoryRows: transaction lookup failed: ${txnError.message}`);
  if (seriError) throw new Error(`loadLotAndTransactionHistoryRows: seri_result lookup failed: ${seriError.message}`);

  const keptSeriResults = (txnStatus && txnStatus !== SERI_IMPLICIT_STATUS) ? [] : (seriResults ?? []);

  const lotIds = new Set<string>();
  const participantIds = new Set<string>();
  const actorIds = new Set<string>();
  for (const t of txns ?? []) {
    lotIds.add(t.lot_id);
    participantIds.add(t.buyer_participant_id);
    if (t.confirmed_by) actorIds.add(t.confirmed_by);
    if (t.cancelled_by) actorIds.add(t.cancelled_by);
  }
  for (const s of keptSeriResults) {
    lotIds.add(s.lot_id);
    participantIds.add(s.winner_participant_id);
    if (s.confirmed_by) actorIds.add(s.confirmed_by);
  }

  const [{ data: lots }, { data: mekikiRecords }, { data: participants }, { data: actors }] = await Promise.all([
    lotIds.size > 0
      ? client.from("lot").select("id, lot_code, item, status, business_date").in("id", Array.from(lotIds))
      : Promise.resolve({ data: [] as LotRow[] }),
    lotIds.size > 0
      ? client.from("mekiki_record").select("lot_id, grade, assessed_at").in("lot_id", Array.from(lotIds))
      : Promise.resolve({ data: [] as { lot_id: string; grade: string; assessed_at: string }[] }),
    participantIds.size > 0
      ? client.from("participant").select("id, name").in("id", Array.from(participantIds))
      : Promise.resolve({ data: [] as { id: string; name: string }[] }),
    actorIds.size > 0
      ? client.from("app_user").select("id, display_name, email").in("id", Array.from(actorIds))
      : Promise.resolve({ data: [] as { id: string; display_name: string | null; email: string }[] }),
  ]);
  const lotById = new Map((lots ?? []).map((l) => [l.id, l]));
  const gradeByLot = latestMekikiGradeByLot(mekikiRecords ?? []);
  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));
  const actorNameById = new Map((actors ?? []).map((a) => [a.id, a.display_name ?? a.email]));

  const rows: ReportRow[] = [];
  for (const t of txns ?? []) {
    const lot = lotById.get(t.lot_id);
    const participant = participantById.get(t.buyer_participant_id);
    const eventAt = t.status === "cancelled" ? (t.cancelled_at ?? t.created_at) : (t.confirmed_at ?? t.created_at);
    const actorId = t.status === "cancelled" ? t.cancelled_by : t.confirmed_by;
    rows.push({
      lotCode: lot?.lot_code ?? t.lot_id,
      item: lot?.item ?? "",
      lotStatus: lot?.status ?? "",
      businessDate: t.business_date,
      mekikiGrade: gradeByLot.get(t.lot_id) ?? "",
      eventType: "aitai",
      txnCode: t.txn_code,
      participant: participant?.name ?? t.buyer_participant_id,
      qty: t.qty,
      unitPrice: t.unit_price,
      amountJpy: t.qty * t.unit_price,
      txnStatus: t.status,
      eventAt,
      actor: actorId ? (actorNameById.get(actorId) ?? actorId) : "",
      reason: t.cancel_reason ?? "",
    });
  }
  for (const s of keptSeriResults) {
    const lot = lotById.get(s.lot_id);
    const participant = participantById.get(s.winner_participant_id);
    rows.push({
      lotCode: lot?.lot_code ?? s.lot_id,
      item: lot?.item ?? "",
      lotStatus: lot?.status ?? "",
      businessDate: s.business_date,
      mekikiGrade: gradeByLot.get(s.lot_id) ?? "",
      eventType: "seri",
      txnCode: "",
      participant: participant?.name ?? s.winner_participant_id,
      qty: s.qty,
      unitPrice: s.unit_price,
      amountJpy: s.qty * s.unit_price,
      txnStatus: SERI_IMPLICIT_STATUS,
      eventAt: s.decided_at,
      actor: s.confirmed_by ? (actorNameById.get(s.confirmed_by) ?? s.confirmed_by) : "",
      reason: "",
    });
  }

  rows.sort((a, b) => {
    const byLotCode = String(a.lotCode).localeCompare(String(b.lotCode));
    return byLotCode !== 0 ? byLotCode : String(a.eventAt).localeCompare(String(b.eventAt));
  });
  return rows;
}
