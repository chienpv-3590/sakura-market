import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import type { Role } from "@/lib/auth/role-landing";
import { countLotsByStatus } from "@/lib/lots/lot-queries";
import { countTransactionsByStatus } from "@/lib/transactions/txn-queries";
import { countDeliveriesByStatus } from "@/lib/deliveries/delivery-queries";
import { countCorrectionsByStatus } from "@/lib/corrections/correction-queries";
import { countSeriResults } from "@/lib/seri/seri-queries";
import { loadLockStatus } from "@/lib/reconciliation/reconciliation-queries";
import type { PipelineStageDef } from "./pipeline-stage-config";

export type StageCardValue =
  | { kind: "count"; value: number }
  | { kind: "lock"; locked: boolean }
  | { kind: "forbidden" }
  // Chang co that trong nghiep vu nhung ban nay chua dung duoc.
  // Khac han "dem ra 0": 0 nghia la hom nay khong co, notBuilt
  // nghia la he thong khong ghi duoc.
  | { kind: "notBuilt" };

/**
 * Resolves one dashboard card's real value.
 *
 * The permission check happens here, BEFORE any query runs, by comparing the
 * signed-in role against `stage.allowedRoles` -- not by running the query and
 * inspecting whether it came back empty. That distinction matters: every one
 * of these tables carries the same "read_all_active_users" RLS policy (any
 * active role may SELECT), so an empty result here always means "there are
 * genuinely none", never "not permitted". The one real access boundary is
 * app-level (requireRole on the destination screen), which is exactly what
 * `allowedRoles` mirrors -- inferring from emptiness could never detect it.
 */
export async function resolvePipelineStageValue(
  client: SupabaseClient<Database>,
  stage: PipelineStageDef,
  role: Role,
  todayBusinessDate: string,
): Promise<StageCardValue> {
  if (!stage.allowedRoles.includes(role)) {
    return { kind: "forbidden" };
  }

  switch (stage.id) {
    case "lots-received":
      return { kind: "count", value: await countLotsByStatus(client, "received") };
    case "lots-published":
      return { kind: "count", value: await countLotsByStatus(client, "published") };
    case "transactions-draft":
      return { kind: "count", value: await countTransactionsByStatus(client, "draft") };
    case "transactions-confirmed":
      return { kind: "count", value: await countTransactionsByStatus(client, "confirmed") };
    case "transactions-cancelled":
      return { kind: "count", value: await countTransactionsByStatus(client, "cancelled") };
    case "seri-results":
      return { kind: "count", value: await countSeriResults(client) };
    case "deliveries-in-progress":
      return { kind: "count", value: await countDeliveriesByStatus(client, "đang giao") };
    case "deliveries-exception":
      // Khong goi countDeliveriesByStatus: FR-DEL-03 ngoai pham vi, khong
      // duong nao set status="ngoại lệ", nen con dem se vinh vien la 0.
      return { kind: "notBuilt" };
    case "business-day-lock": {
      const status = await loadLockStatus(client, todayBusinessDate);
      return { kind: "lock", locked: status.locked };
    }
    case "corrections-pending":
      return { kind: "count", value: await countCorrectionsByStatus(client, "pending") };
  }
}
