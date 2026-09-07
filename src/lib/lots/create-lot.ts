import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { todayJst } from "@/lib/db/business-date";
import { formatLotCode, nextLotSeq } from "./lot-code";

const MAX_LOT_CODE_ATTEMPTS = 2; // 1 retry on a lot_code unique-violation race

export type CreateLotFields = { item: string; packageCount: number; initialQty: number };

/**
 * FR-LOT-01 A1: insert the lot row (retry once on a lot_code collision) and
 * write its creation audit row. Split out of the route handler so the
 * multipart-parsing/attachment loop in app/api/lots/route.ts stays readable.
 *
 * `after` is the bare inserted row -- no more smuggling the typed
 * `intake_docs` string in here (phase-06's workaround, now removed): the
 * receipt document is a real `lot_attachment` row with its own audit entry
 * (attach-intake-doc.ts), not lot-creation metadata.
 */
export async function createLot(
  client: SupabaseClient<Database>,
  fields: CreateLotFields,
  actorId: string,
): Promise<Tables<"lot">> {
  const businessDate = todayJst();
  let lastMessage = "";

  for (let attempt = 0; attempt < MAX_LOT_CODE_ATTEMPTS; attempt++) {
    const seq = await nextLotSeq(client, businessDate);
    const lotCode = formatLotCode(businessDate, seq);
    const insertRow: TablesInsert<"lot"> = {
      lot_code: lotCode,
      item: fields.item,
      package_count: fields.packageCount,
      initial_qty: fields.initialQty,
      available_qty: fields.initialQty,
      business_date: businessDate,
      status: "received",
    };

    const { data, error } = await client.from("lot").insert(insertRow).select().single();

    if (!error && data) {
      await writeAuditLog(client, {
        actorId,
        action: "create",
        entity: "lot",
        entityId: data.id,
        before: null,
        after: data,
      });
      return data;
    }

    if (error.code === "23505") {
      lastMessage = error.message;
      continue; // lot_code collision -- retry once against a fresh count
    }
    throw new Error(`createLot: insert failed: ${error.message}`);
  }

  throw new Error(`createLot: lot_code collision persisted after retry: ${lastMessage}`);
}
