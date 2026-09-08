import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { ReportFilterOptionsKey } from "./report-filter-field";

export interface FilterOption {
  value: string;
  label: string;
}

// F002's 4 fixed participant eligibility statuses (`participant.status` CHECK
// constraint, supabase/migrations/20260904090100_participant.sql) -- a closed
// enum, never queried from the DB.
const ELIGIBILITY_STATUS_VALUES = ["có hiệu lực", "tạm ngừng", "mất hiệu lực", "xét lại"] as const;

// `transaction.status` CHECK constraint -- also a closed enum.
const TXN_STATUS_VALUES = ["draft", "confirmed", "cancelled"] as const;

async function loadParticipantOptions(client: SupabaseClient<Database>): Promise<FilterOption[]> {
  const { data, error } = await client.from("participant").select("id, name").order("name", { ascending: true });
  if (error) throw new Error(`loadFilterOptions(participants) failed: ${error.message}`);
  return (data ?? []).map((p) => ({ value: p.id, label: p.name }));
}

async function loadLotOptions(client: SupabaseClient<Database>): Promise<FilterOption[]> {
  const { data, error } = await client.from("lot").select("id, lot_code").order("lot_code", { ascending: true });
  if (error) throw new Error(`loadFilterOptions(lots) failed: ${error.message}`);
  return (data ?? []).map((l) => ({ value: l.id, label: l.lot_code }));
}

async function loadActorOptions(client: SupabaseClient<Database>): Promise<FilterOption[]> {
  const { data, error } = await client
    .from("app_user")
    .select("id, display_name, email")
    .order("display_name", { ascending: true });
  if (error) throw new Error(`loadFilterOptions(actors) failed: ${error.message}`);
  return (data ?? []).map((u) => ({ value: u.id, label: u.display_name ?? u.email }));
}

/**
 * Populates every `select`-type filter's dropdown (SCR020). Only queries the
 * `optionsKey`s a report's `definition.filterFields` actually declares --
 * never preloads every participant/lot/user for a report that doesn't ask
 * (Security Considerations: don't leak a full list through an unrelated
 * screen). The two static enums never touch the DB; their raw values are
 * translated at render time (same `dict["reports.<x>.<value>"]` pattern
 * ReportResultTable already uses for column values), not here.
 */
export async function loadFilterOptions(
  client: SupabaseClient<Database>,
  keys: ReportFilterOptionsKey[],
): Promise<Record<ReportFilterOptionsKey, FilterOption[]>> {
  const result: Record<ReportFilterOptionsKey, FilterOption[]> = {
    participants: [],
    lots: [],
    actors: [],
    txnStatus: [],
    eligibilityStatus: [],
  };

  await Promise.all(
    Array.from(new Set(keys)).map(async (key) => {
      switch (key) {
        case "participants":
          result.participants = await loadParticipantOptions(client);
          return;
        case "lots":
          result.lots = await loadLotOptions(client);
          return;
        case "actors":
          result.actors = await loadActorOptions(client);
          return;
        case "txnStatus":
          result.txnStatus = TXN_STATUS_VALUES.map((v) => ({ value: v, label: v }));
          return;
        case "eligibilityStatus":
          result.eligibilityStatus = ELIGIBILITY_STATUS_VALUES.map((v) => ({ value: v, label: v }));
          return;
      }
    }),
  );

  return result;
}
