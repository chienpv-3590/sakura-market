import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

export type RuleVersionListRow = Tables<"incentive_rule_version"> & {
  createdByName: string | null;
  approvedByName: string | null;
};

type JoinedRow = Tables<"incentive_rule_version"> & {
  creator: { display_name: string | null; email: string } | null;
  approver: { display_name: string | null; email: string } | null;
};

function flatten(row: JoinedRow): RuleVersionListRow {
  const { creator, approver, ...rest } = row;
  return {
    ...rest,
    createdByName: creator?.display_name ?? creator?.email ?? null,
    approvedByName: approver?.display_name ?? approver?.email ?? null,
  };
}

/** A4 -- SCR017 list, optionally filtered by status. Read-only. */
export async function listRuleVersions(
  client: SupabaseClient<Database>,
  status?: string,
): Promise<RuleVersionListRow[]> {
  let query = client
    .from("incentive_rule_version")
    .select("*, creator:created_by(display_name, email), approver:approved_by(display_name, email)")
    .order("version_no", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    throw new Error(`listRuleVersions failed: ${error.message}`);
  }
  return (data as unknown as JoinedRow[]).map(flatten);
}

/** SCR018 detail -- single version by id, same join shape as the list. */
export async function loadRuleVersion(
  client: SupabaseClient<Database>,
  id: string,
): Promise<RuleVersionListRow | null> {
  const { data, error } = await client
    .from("incentive_rule_version")
    .select("*, creator:created_by(display_name, email), approver:approved_by(display_name, email)")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw new Error(`loadRuleVersion(${id}) failed: ${error.message}`);
  }
  return data ? flatten(data as unknown as JoinedRow) : null;
}
