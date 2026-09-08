#!/usr/bin/env node
// Phase-02 verification ("Nen ke toan: bang batch, thue, tong hop dong").
// Proves the accounting foundation against the LIVE database, no mocks:
// lock gating, batch creation + re-export numbering, immutable snapshot,
// tax arithmetic (incl. one fractional-before-floor case), a real approved
// post-lock adjustment reflected in a NEW batch while the OLD batch keeps
// its original numbers, append-only RLS, and create -> audit_log pairing.
//
// Run: npx tsx scripts/verify-accounting-foundation.mjs -- this phase
// ships library code with no HTTP route yet (phase-03 adds that), so the
// real TS functions are exercised directly; plain `node` cannot resolve
// this project's "@/..." alias or run .ts, tsx honours tsconfig "paths".
//
// Every row created here (business_day_lock, correction_request,
// transaction_adjustment, accounting_export_batch, audit_log) is removed
// in `finally` via the service-role admin client -- RLS allows no
// authenticated UPDATE/DELETE on any of them, by design.

import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadEnv, createAdminClient, signInAs } from "./lib/supabase-test-clients.mjs";

import { createExportBatch } from "../src/lib/accounting/create-export-batch.ts";
import { loadBatchByCode, listBatchesForDate } from "../src/lib/accounting/export-batch-queries.ts";
import { calculateTaxJpy, TAX_RATE_BPS } from "../src/lib/accounting/tax.ts";
import { createCorrection } from "../src/lib/corrections/create-correction.ts";
import { approveCorrection } from "../src/lib/corrections/approve-correction.ts";

const BUSINESS_DATE = "2026-09-02"; // real seeded aitai transactions, currently unlocked

let failures = 0;
const fail = (m) => { failures += 1; console.error(`FAIL  ${m}`); };
const ok = (m) => console.log(`OK    ${m}`);

async function main() {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
  const { url, publishableKey, secretKey } = loadEnv(envPath);
  const admin = createAdminClient(url, secretKey);
  const settlement = await signInAs(url, publishableKey, "settlement@sakura-market.local");
  const settlementLead = await signInAs(url, publishableKey, "settlement-lead@sakura-market.local");
  const trade = await signInAs(url, publishableKey, "trade@sakura-market.local");

  const createdBatchIds = [];
  let createdLock = false;
  let correctionId = null;

  try {
    // #1 -- unlocked day refuses export, no row created.
    const beforeLock = await createExportBatch(settlement.client, BUSINESS_DATE, settlement.userId);
    if (!beforeLock.ok && beforeLock.reason === "DAY_NOT_LOCKED") ok("unlocked day -> DAY_NOT_LOCKED, no batch created");
    else fail(`expected DAY_NOT_LOCKED, got ${JSON.stringify(beforeLock)}`);
    if ((await listBatchesForDate(admin, BUSINESS_DATE)).length === 0) ok("no orphan batch row exists before lock");
    else fail("a batch row exists before the day was ever locked");

    const lockIns = { business_date: BUSINESS_DATE, locked_by: settlement.userId };
    const { error: lockError } = await settlement.client.from("business_day_lock").insert(lockIns);
    if (lockError) throw new Error(`failed to lock ${BUSINESS_DATE}: ${lockError.message}`);
    createdLock = true;

    // #2 -- first export: full, seq=1.
    const r1 = await createExportBatch(settlement.client, BUSINESS_DATE, settlement.userId);
    if (!r1.ok) throw new Error(`batch #1 creation failed: ${JSON.stringify(r1)}`);
    createdBatchIds.push(r1.batch.id);
    if (/^ACC-\d{8}-\d{2}$/.test(r1.batch.batch_code) && r1.batch.kind === "full" && r1.batch.seq === 1) {
      ok(`batch #1 ${r1.batch.batch_code} kind=full seq=1`);
    } else fail(`batch #1 shape wrong: ${JSON.stringify(r1.batch)}`);

    // #3 -- re-export: distinct code, batch #1 snapshot untouched.
    const r2 = await createExportBatch(settlement.client, BUSINESS_DATE, settlement.userId);
    if (!r2.ok) throw new Error(`batch #2 creation failed: ${JSON.stringify(r2)}`);
    createdBatchIds.push(r2.batch.id);
    if (r2.batch.batch_code !== r1.batch.batch_code && r2.batch.kind === "re-export" && r2.batch.seq === 2) {
      ok(`batch #2 ${r2.batch.batch_code} kind=re-export seq=2, distinct from #1`);
    } else fail(`batch #2 shape wrong: ${JSON.stringify(r2.batch)}`);
    const reloaded1 = await loadBatchByCode(admin, r1.batch.batch_code);
    if (JSON.stringify(reloaded1.lines) === JSON.stringify(r1.batch.lines)) ok("batch #1 lines snapshot unchanged after re-export");
    else fail("batch #1 lines snapshot CHANGED after a later re-export -- immutability broken");

    // #4/#5 -- cross-check sums + tax arithmetic against the real lines.
    const { data: reconLines } = await admin
      .from("reconciliation_line")
      .select("participant_id, amount_jpy")
      .eq("business_date", BUSINESS_DATE);
    const { data: participants } = await admin.from("participant").select("id, name");
    const handSum = new Map();
    for (const l of reconLines ?? []) {
      if (!l.participant_id || l.amount_jpy === null) continue;
      handSum.set(l.participant_id, (handSum.get(l.participant_id) ?? 0) + l.amount_jpy);
    }
    const handTotalNet = [...handSum.values()].reduce((a, b) => a + b, 0);
    if (handTotalNet === r1.batch.total_net_amount_jpy) ok(`total_net_amount_jpy matches hand-summed reconciliation_line (${handTotalNet})`);
    else fail(`total_net_amount_jpy=${r1.batch.total_net_amount_jpy}, hand sum=${handTotalNet}`);

    let allIntegers = true;
    console.log("--- Tax worked examples (batch #1, before any adjustment) ---");
    for (const line of r1.batch.lines) {
      const expectedTax = Math.floor((line.netAmountJpy * TAX_RATE_BPS) / 10000);
      if (line.taxJpy !== expectedTax) fail(`${line.participantName}: taxJpy=${line.taxJpy}, expected floor()=${expectedTax}`);
      if (!Number.isInteger(line.netAmountJpy) || !Number.isInteger(line.taxJpy)) allIntegers = false;
      console.log(`  ${line.participantName}: net=${line.netAmountJpy} tax=${calculateTaxJpy(line.netAmountJpy)} (exact=${(line.netAmountJpy * TAX_RATE_BPS) / 10000})`);
    }
    if (allIntegers) ok("every money field is Number.isInteger (no float leakage)");
    else fail("a money field was not an integer");

    // #6 -- approve a real post-lock correction, export again, verify it shows up.
    const suzuki = participants.find((p) => p.name === "Suzuki Kaidashi");
    const { data: txn } = await admin.from("transaction").select("id").eq("txn_code", "TXN-20260902-01").single();
    const createRes = await createCorrection(settlement.client, {
      targetTxnId: txn.id,
      reason: "Kiem tra xac minh phase-02 (script verify-accounting-foundation)",
      evidencePath: "verify-script/accounting-foundation-test-evidence.txt",
      actorId: settlement.userId,
    });
    if (!createRes.ok) throw new Error(`createCorrection failed: ${JSON.stringify(createRes)}`);
    correctionId = createRes.correction.id;
    const approveRes = await approveCorrection(settlementLead.client, {
      correctionId,
      actorId: settlementLead.userId,
      decision: "approve",
      adjustmentKind: "delta",
      qtyDelta: -0.02,
      unitPriceDelta: 0,
    });
    if (!approveRes.ok) throw new Error(`approveCorrection failed: ${JSON.stringify(approveRes)}`);
    ok(`correction approved -- amount_delta=${approveRes.adjustment.amount_delta} JPY on ${suzuki.name}`);

    const r3 = await createExportBatch(settlement.client, BUSINESS_DATE, settlement.userId);
    if (!r3.ok) throw new Error(`batch #3 creation failed: ${JSON.stringify(r3)}`);
    createdBatchIds.push(r3.batch.id);
    const suzukiLine = r3.batch.lines.find((l) => l.participantId === suzuki.id);
    const expectedNet = suzukiLine.grossAmountJpy + approveRes.adjustment.amount_delta;
    const expectedTax = Math.floor((expectedNet * TAX_RATE_BPS) / 10000);
    if (
      suzukiLine.adjustmentAmountJpy === approveRes.adjustment.amount_delta &&
      suzukiLine.status === "đã điều chỉnh" &&
      suzukiLine.netAmountJpy === expectedNet &&
      suzukiLine.taxJpy === expectedTax
    ) {
      ok(`batch #3 reflects the adjustment: net=${expectedNet} tax=${expectedTax} (fractional before floor: ${(expectedNet * TAX_RATE_BPS) / 10000})`);
    } else fail(`batch #3 line wrong: ${JSON.stringify(suzukiLine)}`);

    const reloaded1Again = await loadBatchByCode(admin, r1.batch.batch_code);
    const suzukiInBatch1 = reloaded1Again.lines.find((l) => l.participantId === suzuki.id);
    if (suzukiInBatch1.adjustmentAmountJpy === 0 && suzukiInBatch1.netAmountJpy === suzukiLine.grossAmountJpy) {
      ok("batch #1 still shows the pre-adjustment number -- old batch untouched");
    } else fail(`batch #1 was mutated by a later correction: ${JSON.stringify(suzukiInBatch1)}`);

    // #7 -- append-only: UPDATE/DELETE refused (no policy covers either op).
    const updQ = settlement.client.from("accounting_export_batch").update({ row_count: 999 }).eq("id", r1.batch.id);
    const { data: updRows } = await updQ.select();
    const afterUpd = await loadBatchByCode(admin, r1.batch.batch_code);
    if ((updRows ?? []).length === 0 && afterUpd.row_count === r1.batch.row_count) ok("UPDATE on accounting_export_batch is refused (no policy -> 0 rows)");
    else fail(`UPDATE was not refused: rows=${JSON.stringify(updRows)}`);

    const { data: delRows } = await settlement.client.from("accounting_export_batch").delete().eq("id", r1.batch.id).select();
    if ((delRows ?? []).length === 0 && (await loadBatchByCode(admin, r1.batch.batch_code))) ok("DELETE on accounting_export_batch is refused (no policy -> 0 rows)");
    else fail(`DELETE was not refused: rows=${JSON.stringify(delRows)}`);

    // Insert restricted to ROLE-SETTLEMENT -- wrong role rejected by RLS.
    let wrongRoleRejected = false;
    try {
      wrongRoleRejected = !(await createExportBatch(trade.client, BUSINESS_DATE, trade.userId)).ok;
    } catch (err) {
      wrongRoleRejected = /row-level security|42501/i.test(err.message);
    }
    if (wrongRoleRejected) ok("insert as ROLE-TRADE is rejected -- insert policy is ROLE-SETTLEMENT only");
    else fail("a non-ROLE-SETTLEMENT session was able to create a batch");

    const { data: auditRows } = await admin
      .from("audit_log")
      .select("entity_id")
      .eq("action", "create_accounting_export_batch")
      .in("entity_id", createdBatchIds);
    if ((auditRows ?? []).length === createdBatchIds.length) ok(`audit_log has exactly ${createdBatchIds.length} create_accounting_export_batch row(s)`);
    else fail(`expected ${createdBatchIds.length} audit_log rows, found ${(auditRows ?? []).length}`);
  } finally {
    if (createdBatchIds.length > 0) {
      await admin.from("audit_log").delete().in("entity_id", createdBatchIds).eq("action", "create_accounting_export_batch");
      await admin.from("accounting_export_batch").delete().in("id", createdBatchIds);
    }
    if (correctionId) {
      await admin.from("audit_log").delete().eq("entity", "correction_request").eq("entity_id", correctionId);
      await admin.from("transaction_adjustment").delete().eq("source_correction_id", correctionId);
      await admin.from("correction_request").delete().eq("id", correctionId);
    }
    if (createdLock) await admin.from("business_day_lock").delete().eq("business_date", BUSINESS_DATE);
  }

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error("[verify-accounting-foundation] unexpected failure:", err.message);
  process.exit(1);
});
