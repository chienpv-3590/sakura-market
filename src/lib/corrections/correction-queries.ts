import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type CorrectionListRow = Tables<"correction_request"> & {
  txn_code: string;
};

/** A2 -- SCR015 list, joined with just the target transaction's code for display. */
export async function listCorrections(
  client: SupabaseClient<Database>,
  status?: string,
): Promise<CorrectionListRow[]> {
  let query = client
    .from("correction_request")
    .select("*, transaction:target_txn_id(txn_code)")
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    throw new Error(`listCorrections failed: ${error.message}`);
  }

  type Joined = Tables<"correction_request"> & { transaction: { txn_code: string } | null };
  return (data as unknown as Joined[]).map((row) => {
    const { transaction, ...rest } = row;
    return { ...rest, txn_code: transaction?.txn_code ?? row.target_txn_id };
  });
}

export async function loadCorrection(
  client: SupabaseClient<Database>,
  id: string,
): Promise<Tables<"correction_request"> | null> {
  const { data, error } = await client.from("correction_request").select("*").eq("id", id).maybeSingle();
  if (error) {
    throw new Error(`loadCorrection(${id}) failed: ${error.message}`);
  }
  return data;
}

/** transaction_adjustment rows produced by an approved correction, newest first. */
export async function loadAdjustmentsByCorrection(
  client: SupabaseClient<Database>,
  correctionId: string,
): Promise<Tables<"transaction_adjustment">[]> {
  const { data, error } = await client
    .from("transaction_adjustment")
    .select("*")
    .eq("source_correction_id", correctionId)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(`loadAdjustmentsByCorrection(${correctionId}) failed: ${error.message}`);
  }
  return data ?? [];
}
