import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { ReportRow } from "../report-row";

/**
 * RPT-01 "Tổng hợp giao dịch theo từng ngày nghiệp vụ" -- reads directly
 * from `transaction` (相対取引) + `seri_result` (せり), no copy of either
 * (technical-spec §4.2: "F010 không sở hữu bảng dữ liệu nghiệp vụ nào").
 * Every status is included (not just 'confirmed') so the report is an
 * honest daily summary, not a filtered subset -- the `status` column itself
 * communicates which rows were cancelled.
 */
export async function loadDailyTransactionRows(
  client: SupabaseClient<Database>,
  businessDate: string,
): Promise<ReportRow[]> {
  const [{ data: txns, error: txnError }, { data: seriResults, error: seriError }] = await Promise.all([
    client.from("transaction").select("*").eq("business_date", businessDate),
    client.from("seri_result").select("*").eq("business_date", businessDate),
  ]);
  if (txnError) throw new Error(`loadDailyTransactionRows(${businessDate}): transaction lookup failed: ${txnError.message}`);
  if (seriError) throw new Error(`loadDailyTransactionRows(${businessDate}): seri_result lookup failed: ${seriError.message}`);

  const lotIds = new Set<string>();
  const participantIds = new Set<string>();
  for (const t of txns ?? []) {
    lotIds.add(t.lot_id);
    participantIds.add(t.buyer_participant_id);
  }
  for (const s of seriResults ?? []) {
    lotIds.add(s.lot_id);
    participantIds.add(s.winner_participant_id);
  }

  const [{ data: lots }, { data: participants }] = await Promise.all([
    lotIds.size > 0
      ? client.from("lot").select("id, lot_code, item").in("id", Array.from(lotIds))
      : Promise.resolve({ data: [] as { id: string; lot_code: string; item: string }[] }),
    participantIds.size > 0
      ? client.from("participant").select("id, name, category").in("id", Array.from(participantIds))
      : Promise.resolve({ data: [] as { id: string; name: string; category: string }[] }),
  ]);
  const lotById = new Map((lots ?? []).map((l) => [l.id, l]));
  const participantById = new Map((participants ?? []).map((p) => [p.id, p]));

  const rows: ReportRow[] = [];
  for (const t of txns ?? []) {
    const lot = lotById.get(t.lot_id);
    const participant = participantById.get(t.buyer_participant_id);
    rows.push({
      businessDate: t.business_date,
      sourceType: "aitai",
      code: t.txn_code,
      item: lot?.item ?? "",
      participant: participant?.name ?? t.buyer_participant_id,
      // Category carries the original Japanese term (仲卸/卸売業者/...) --
      // combined with `item`'s Vietnamese diacritics, this is the row that
      // proves CSV export (§ to-csv.ts) survives both scripts intact.
      participantCategory: participant?.category ?? "",
      qty: t.qty,
      unitPrice: t.unit_price,
      amountJpy: t.qty * t.unit_price,
      status: t.status,
    });
  }
  for (const s of seriResults ?? []) {
    const lot = lotById.get(s.lot_id);
    const participant = participantById.get(s.winner_participant_id);
    rows.push({
      businessDate: s.business_date,
      sourceType: "seri",
      code: lot?.lot_code ?? s.lot_id,
      item: lot?.item ?? "",
      participant: participant?.name ?? s.winner_participant_id,
      participantCategory: participant?.category ?? "",
      qty: s.qty,
      unitPrice: s.unit_price,
      amountJpy: s.qty * s.unit_price,
      status: "confirmed",
    });
  }

  rows.sort((a, b) => String(a.code).localeCompare(String(b.code)));
  return rows;
}
