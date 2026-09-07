import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

export interface ParticipantOption {
  id: string;
  name: string;
}

/** Populates RPT-07's optional "participant" filter dropdown (SCR020). */
export async function loadParticipantOptions(client: SupabaseClient<Database>): Promise<ParticipantOption[]> {
  const { data, error } = await client.from("participant").select("id, name").order("name", { ascending: true });
  if (error) {
    throw new Error(`loadParticipantOptions failed: ${error.message}`);
  }
  return data ?? [];
}
