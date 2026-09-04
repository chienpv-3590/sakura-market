import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

// BR-LOT-02's core primitive. F004 (Aitai)/F005 (Seri)/F006 (Delivery) call
// these whenever they confirm or cancel a deal against a lot's
// available_qty. This module owns exactly one invariant: available_qty must
// never go negative, even with N callers racing the same lot_id.
//
// DEVIATION FROM phase-06's literal SQL (documented for Phase 07/08):
// the phase file's pattern is a single statement --
//   UPDATE lot SET available_qty = available_qty - :qty
//    WHERE id = :id AND available_qty >= :qty
// -- which assumes the write path can send Postgres an expression that
// references the column's own current value. This app talks to Postgres
// only through PostgREST (via @supabase/supabase-js) -- there is no raw `pg`
// driver and no stored procedure wired up (adding one needs a migration,
// which sits outside this phase's file ownership). PostgREST's update
// payload only accepts literal column values, so "available_qty - qty"
// cannot be expressed server-side in one call.
//
// The safe substitute is optimistic concurrency (compare-and-swap): read the
// current value, compute the next value in application code, then write it
// back conditioned on available_qty still matching exactly what was just
// read. Postgres serializes the competing UPDATE statements at the row
// level, so at most one concurrent CAS matches per round; every loser sees
// 0 rows affected and retries against a freshly read value. This is not the
// naive "read, compare, write" TOCTOU the spec warns against -- the
// write-time condition on the exact prior value is what removes the race.
// The CHECK (available_qty >= 0) constraint remains the second line of
// defense regardless of which of the two ever ships a bug.
const MAX_CAS_ATTEMPTS = 25;

async function readAvailableQty(client: SupabaseClient<Database>, lotId: string): Promise<number> {
  const { data, error } = await client.from("lot").select("available_qty").eq("id", lotId).single();

  if (error) {
    throw new Error(`readAvailableQty(${lotId}) failed: ${error.message}`);
  }
  return data.available_qty;
}

/**
 * Atomically decrements `available_qty` by `qty`, never letting it go
 * negative. Returns `false` (never throws for this case) when there is not
 * enough quantity at the moment the decrement would apply -- the caller
 * decides the user-facing message (BR-LOT-02 / US003 error scenario).
 */
export async function reserveLotQty(
  client: SupabaseClient<Database>,
  lotId: string,
  qty: number,
): Promise<boolean> {
  if (!Number.isFinite(qty) || qty <= 0) {
    throw new Error(`reserveLotQty: qty must be > 0, got ${qty}`);
  }

  for (let attempt = 0; attempt < MAX_CAS_ATTEMPTS; attempt++) {
    const current = await readAvailableQty(client, lotId);
    if (current < qty) return false;

    const next = current - qty;
    const { data, error } = await client
      .from("lot")
      .update({ available_qty: next })
      .eq("id", lotId)
      .eq("available_qty", current) // CAS guard: fails if changed since read
      .select("id");

    if (error) {
      throw new Error(`reserveLotQty(${lotId}, ${qty}) update failed: ${error.message}`);
    }
    if (data && data.length > 0) return true; // this attempt won the CAS
    // Lost the CAS to a concurrent writer -- retry with a fresh read.
  }

  throw new Error(`reserveLotQty(${lotId}, ${qty}): gave up after ${MAX_CAS_ATTEMPTS} CAS retries`);
}

/**
 * Atomically restores `available_qty` by exactly `qty` -- undoes a prior
 * successful reserveLotQty (e.g. cancelling a not-yet-locked transaction).
 * Always succeeds unless the lot row itself cannot be read/written.
 */
export async function releaseLotQty(
  client: SupabaseClient<Database>,
  lotId: string,
  qty: number,
): Promise<void> {
  if (!Number.isFinite(qty) || qty <= 0) {
    throw new Error(`releaseLotQty: qty must be > 0, got ${qty}`);
  }

  for (let attempt = 0; attempt < MAX_CAS_ATTEMPTS; attempt++) {
    const current = await readAvailableQty(client, lotId);
    const next = current + qty;
    const { data, error } = await client
      .from("lot")
      .update({ available_qty: next })
      .eq("id", lotId)
      .eq("available_qty", current)
      .select("id");

    if (error) {
      throw new Error(`releaseLotQty(${lotId}, ${qty}) update failed: ${error.message}`);
    }
    if (data && data.length > 0) return;
  }

  throw new Error(`releaseLotQty(${lotId}, ${qty}): gave up after ${MAX_CAS_ATTEMPTS} CAS retries`);
}
