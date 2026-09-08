#!/usr/bin/env node
// Phase-03 verification (RPT-06 = IF-ACC-01: batch creation + CSV export).
// Live HTTP against a running dev server, real sessions, no mocks: role/
// validation gating on batch creation (404/422/409/307/201), missing/
// malformed/unknown batchCode on export (422/404), BOM+CRLF+13-column CSV,
// all 10 RFP §08-03/§08-05 fields, a bilingual JA+VI data row, re-download
// immutability across a new approved adjustment, re-export producing a new
// code with changed numbers, viewer preview-vs-batch HTML, the 8 REMAINING
// mock codes still refusing 403, RPT-01/05/07 baselines unchanged
// (phase-01's own hashes), and vi/ja dictionary parity (10 namespaces).
//
// Run: VERIFY_BASE_URL=http://localhost:3001 node scripts/verify-rpt-06-accounting-export.mjs
// Every row this script creates is removed in `finally` via the admin client.

import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadEnv, createAdminClient, createChecker, signInHttp, verifyDictionaryParity } from "./lib/supabase-test-clients.mjs";

const BASE_URL = process.env.VERIFY_BASE_URL ?? "http://localhost:3000";
const BUSINESS_DATE = "2026-09-02"; // real seeded aitai rows, unlocked at rest
const REMAINING_MOCK_CODES = ["RPT-02", "RPT-03", "RPT-04", "RPT-08", "RPT-09", "RPT-10", "RPT-11", "RPT-12"];
// Captured 2026-09-08 by phase-01's verify-report-framework.mjs, pre-refactor. Unchanged here == no regression.
const BASELINE_SHA256 = {
  "RPT-01": "7745cf1ab78159506e1cfe62a400b54887418de6fbbdb980a4a8654d2ba47deb",
  "RPT-05": "a43e0da5838560ffab9369d22d67c65517e74f0f8dabb33c18429dc2ee39bef5",
  "RPT-07": "7c419a27c24c14b29f9482eeb989a943ff424ce2ab3ed444fb7d834d379c2c60",
};
const HEADER_VI = [
  "Batch code", "Ngày nghiệp vụ", "Mã người tham gia", "Tên người tham gia", "Loại hình tham gia",
  "Tổng gốc (JPY)", "Điều chỉnh (JPY)", "Tổng số tiền (JPY)", "Thuế (JPY)", "Tổng có thuế (JPY)",
  "Trạng thái", "Thời điểm tạo", "Người khởi tạo",
];

const checker = createChecker();
const { check } = checker;
async function createBatch(cookie, businessDate) {
  const res = await fetch(`${BASE_URL}/api/accounting/export-batches`, {
    method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json" }, body: JSON.stringify({ businessDate }),
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
}
async function downloadCsv(cookie, batchCode) {
  const url = `${BASE_URL}/api/reports/RPT-06/export.csv?businessDate=${BUSINESS_DATE}&batchCode=${batchCode}`;
  const res = await fetch(url, { headers: { Cookie: cookie } });
  return { status: res.status, buf: Buffer.from(await res.arrayBuffer()) };
}

async function verifyMocksAndBaselines(cookie) {
  for (const code of REMAINING_MOCK_CODES) {
    const res = await fetch(`${BASE_URL}/api/reports/${code}/export.csv`, { headers: { Cookie: cookie } });
    const json = await res.json().catch(() => ({}));
    check(res.status === 403 && json.reason === "MOCK_REPORT", `${code} still 403 MOCK_REPORT`, `${code} expected 403 MOCK_REPORT, got ${res.status}`);
  }
  const real = [["RPT-01", { businessDate: BUSINESS_DATE }], ["RPT-05", { businessDate: BUSINESS_DATE }], ["RPT-07", { period: BUSINESS_DATE }]];
  for (const [code, params] of real) {
    const res = await fetch(`${BASE_URL}/api/reports/${code}/export.csv?${new URLSearchParams(params)}`, { headers: { Cookie: cookie } });
    const hash = createHash("sha256").update(Buffer.from(await res.arrayBuffer())).digest("hex");
    check(hash === BASELINE_SHA256[code], `${code} sha256 unchanged`, `${code} sha256 changed -- baseline ${BASELINE_SHA256[code]}, got ${hash}`);
  }
}

function verifyCsvShape(buf, label) {
  check(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf, `${label}: BOM present`, `${label}: missing BOM`);
  const text = buf.toString("utf8");
  const lines = text.replace(/^﻿/, "").split("\r\n").filter((l) => l.length > 0);
  check(!/(?<!\r)\n/.test(text.slice(3)), `${label}: CRLF line endings`, `${label}: a line ending is bare \\n, not CRLF`);
  const header = lines[0].split(",");
  check(header.length === 13, `${label}: 13 columns`, `${label}: expected 13 columns, got ${header.length}`);
  check(HEADER_VI.every((h) => header.includes(h)), `${label}: all 10 RFP §08-03/§08-05 fields present`, `${label}: header missing an RFP field -- ${JSON.stringify(header)}`);
  const bilingual = lines.slice(1).some((l) => /卸売業者|仲卸|売買参加者|買出人/.test(l) && /đã (chốt|điều chỉnh)/.test(l));
  check(bilingual, `${label}: a data row carries both JA and VI text intact`, `${label}: no row with both JA category and VI status`);
}

async function main() {
  verifyDictionaryParity(check);

  const settlement = await signInHttp(BASE_URL, "settlement@sakura-market.local");
  const settlementLead = await signInHttp(BASE_URL, "settlement-lead@sakura-market.local");
  const judge = await signInHttp(BASE_URL, "judge@sakura-market.local");

  await verifyMocksAndBaselines(settlement);

  const noBatchRes = await fetch(`${BASE_URL}/api/reports/RPT-06/export.csv?businessDate=${BUSINESS_DATE}`, { headers: { Cookie: settlement } });
  const noBatchBody = await noBatchRes.json();
  check(noBatchRes.status === 422 && noBatchBody.reason === "BATCH_CODE_REQUIRED", "RPT-06 no longer MOCK_REPORT -- missing batchCode is 422", `expected 422 BATCH_CODE_REQUIRED, got ${noBatchRes.status}`);

  const wrongRole = await createBatch(judge, BUSINESS_DATE);
  check(wrongRole.status === 404, "wrong role (judge) create batch -> 404", `wrong role: expected 404, got ${wrongRole.status}`);

  const badDate = await createBatch(settlement, "2026-13-40");
  check(badDate.status === 422, "bad date format -> 422", `bad date: expected 422, got ${badDate.status}`);

  const notLocked = await createBatch(settlement, BUSINESS_DATE);
  check(notLocked.status === 409 && notLocked.body.reason === "DAY_NOT_LOCKED", "unlocked day -> 409 DAY_NOT_LOCKED", `unlocked day: expected 409, got ${notLocked.status}`);

  const noSession = await fetch(`${BASE_URL}/api/accounting/export-batches`, {
    method: "POST", redirect: "manual", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ businessDate: BUSINESS_DATE }),
  });
  check(noSession.status === 307, "no session -> 307", `no session: expected 307, got ${noSession.status}`);

  const { url, secretKey } = loadEnv(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.local"));
  const admin = createAdminClient(url, secretKey);
  const { data: settlementUser } = await admin.from("app_user").select("id").eq("email", "settlement@sakura-market.local").single();
  const { data: yamadaTxn } = await admin.from("transaction").select("id").eq("txn_code", "TXN-20260902-03").single();

  const createdBatchIds = [];
  let correctionId = null;
  try {
    await admin.from("business_day_lock").insert({ business_date: BUSINESS_DATE, locked_by: settlementUser.id });

    const batch1 = await createBatch(settlement, BUSINESS_DATE);
    if (batch1.status !== 201) throw new Error(`batch #1 creation failed: ${batch1.status} ${JSON.stringify(batch1.body)}`);
    console.log(`OK    batch #1 created: ${batch1.body.batchCode}`);

    const malformed = await downloadCsv(settlement, "NOT-A-CODE");
    check(malformed.status === 404, "malformed batchCode -> 404", `malformed batchCode: expected 404, got ${malformed.status}`);
    const unknown = await downloadCsv(settlement, "ACC-20260902-99");
    check(unknown.status === 404, "well-formed but unknown batchCode -> 404", `unknown batchCode: expected 404, got ${unknown.status}`);

    const download1 = await downloadCsv(settlement, batch1.body.batchCode);
    verifyCsvShape(download1.buf, "batch #1");
    const sha1Before = createHash("sha256").update(download1.buf).digest("hex");

    const form = new FormData();
    form.set("targetTxnId", yamadaTxn.id);
    form.set("reason", "Kiem tra xac minh phase-03 (verify-rpt-06-accounting-export)");
    form.set("evidence", new Blob([Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10])], { type: "image/png" }), "evidence.png");
    const createCorrRes = await fetch(`${BASE_URL}/api/corrections`, { method: "POST", headers: { Cookie: settlement }, body: form });
    const createCorrBody = await createCorrRes.json();
    if (createCorrRes.status !== 201) throw new Error(`create correction failed: ${JSON.stringify(createCorrBody)}`);
    correctionId = createCorrBody.correction.id;

    const approveRes = await fetch(`${BASE_URL}/api/corrections/${correctionId}/approve`, {
      method: "POST", headers: { Cookie: settlementLead, "Content-Type": "application/json" },
      body: JSON.stringify({ decision: "approve", adjustmentKind: "delta", qtyDelta: -0.01, unitPriceDelta: 0 }),
    });
    const approveBody = await approveRes.json();
    if (approveRes.status !== 200) throw new Error(`approve correction failed: ${JSON.stringify(approveBody)}`);
    console.log(`OK    correction approved -- amount_delta=${approveBody.adjustment.amount_delta} JPY on Yamada Trading`);

    const download1Again = await downloadCsv(settlement, batch1.body.batchCode);
    const sha1After = createHash("sha256").update(download1Again.buf).digest("hex");
    check(sha1After === sha1Before, "batch #1 re-download unchanged after new adjustment", "batch #1 CHANGED after a later adjustment -- immutability broken");

    const batch2 = await createBatch(settlement, BUSINESS_DATE);
    if (batch2.status !== 201) throw new Error(`batch #2 creation failed: ${JSON.stringify(batch2.body)}`);
    check(batch2.body.batchCode !== batch1.body.batchCode, `re-export got a new batch code: ${batch2.body.batchCode}`, "re-export reused the same batch code");

    const download2 = await downloadCsv(settlement, batch2.body.batchCode);
    verifyCsvShape(download2.buf, "batch #2");
    const rows2 = download2.buf.toString("utf8").split("\r\n").filter((l) => l.length > 0);
    const yamadaRow = rows2.find((l) => l.includes("Yamada Trading"));
    const yamadaRowBefore = download1.buf.toString("utf8").split("\r\n").find((l) => l.includes("Yamada Trading"));
    check(
      Boolean(yamadaRow && yamadaRowBefore && yamadaRow.split(",")[7] !== yamadaRowBefore.split(",")[7]),
      "batch #2's adjusted participant has a different netAmountJpy than batch #1",
      "adjusted participant's netAmountJpy did not change between batch #1 and #2",
    );

    const [previewHtml, batchHtml] = await Promise.all([
      fetch(`${BASE_URL}/reports/RPT-06?businessDate=${BUSINESS_DATE}`, { headers: { Cookie: settlement } }).then((r) => r.text()),
      fetch(`${BASE_URL}/reports/RPT-06?businessDate=${BUSINESS_DATE}&batchCode=${batch2.body.batchCode}`, { headers: { Cookie: settlement } }).then((r) => r.text()),
    ]);
    check(!previewHtml.includes("/api/reports/RPT-06/export.csv"), "preview mode (no batchCode) hides the CSV download link", "preview mode still shows a CSV download link");
    check(batchHtml.includes("/api/reports/RPT-06/export.csv"), "batch mode shows the CSV download link", "batch mode is missing the CSV download link");

    const { data: batchRows } = await admin.from("accounting_export_batch").select("id").eq("business_date", BUSINESS_DATE);
    createdBatchIds.push(...(batchRows ?? []).map((b) => b.id));
    const { data: auditRows } = await admin.from("audit_log").select("id").eq("action", "create_accounting_export_batch").in("entity_id", createdBatchIds);
    check(
      (auditRows ?? []).length === createdBatchIds.length,
      `audit_log has exactly one create_accounting_export_batch row per batch (${createdBatchIds.length})`,
      `expected ${createdBatchIds.length} audit_log rows, found ${(auditRows ?? []).length}`,
    );
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
    await admin.from("business_day_lock").delete().eq("business_date", BUSINESS_DATE);
  }

  if (checker.failures > 0) {
    console.error(`\n${checker.failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error("[verify-rpt-06-accounting-export] unexpected failure:", err.message);
  process.exit(1);
});
