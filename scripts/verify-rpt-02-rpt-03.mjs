#!/usr/bin/env node
// Phase-04 verification (RPT-02 lot/transaction history + RPT-03 participant
// eligibility). Live HTTP against a running dev server, real sessions, no
// mocks: each filter actually narrows the result (checked against ground
// truth queried straight off the live DB, not a fixture), the 30-day
// "sắp mất hiệu lực" warning window, null valid_to -> null (not NaN/
// Infinity) daysUntilExpiry, bilingual CSV, the 6 REMAINING mock codes still
// refusing 403, and RPT-01/05/06/07 baselines unchanged.
//
// Run: VERIFY_BASE_URL=http://localhost:3001 node scripts/verify-rpt-02-rpt-03.mjs
// The one row this script creates (a temp near-expiry participant) is
// removed in `finally` via the admin client.

import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadEnv, createAdminClient, createChecker, signInHttp, verifyDictionaryParity } from "./lib/supabase-test-clients.mjs";

const BASE_URL = process.env.VERIFY_BASE_URL ?? "http://localhost:3000";
const REMAINING_MOCK_CODES = ["RPT-04", "RPT-08", "RPT-09", "RPT-10", "RPT-11", "RPT-12"];
// Captured 2026-09-08 (phase-01/03's own hashes, RPT-01/05/07 unchanged since). Any diff here is a real regression.
const BASELINE_SHA256 = {
  "RPT-01": "7745cf1ab78159506e1cfe62a400b54887418de6fbbdb980a4a8654d2ba47deb",
  "RPT-05": "a43e0da5838560ffab9369d22d67c65517e74f0f8dabb33c18429dc2ee39bef5",
  "RPT-07": "7c419a27c24c14b29f9482eeb989a943ff424ce2ab3ed444fb7d834d379c2c60",
};
// RPT-06 without a batchCode is always 422 BATCH_CODE_REQUIRED (phase-03) -- captured 2026-09-08, before this phase touched anything.
const RPT06_NO_BATCH_SHA256 = "bb6d130c8204e3f84d533c2f38a11b89e8f1c1971de18cacf31ac221b90d43a3";
const EXPIRY_WARNING_DAYS = 30;
const ACTIVE_STATUS = "có hiệu lực";

const checker = createChecker();
const { check } = checker;

function todayJst() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());
}
function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date(Date.UTC(y, m - 1, d + days)));
}

async function verifyMocksAndBaselines(cookie) {
  for (const code of REMAINING_MOCK_CODES) {
    const res = await fetch(`${BASE_URL}/api/reports/${code}/export.csv`, { headers: { Cookie: cookie } });
    const json = await res.json().catch(() => ({}));
    check(res.status === 403 && json.reason === "MOCK_REPORT", `${code} still 403 MOCK_REPORT`, `${code} expected 403 MOCK_REPORT, got ${res.status}`);
  }
  const real = [["RPT-01", { businessDate: "2026-09-02" }], ["RPT-05", { businessDate: "2026-09-02" }], ["RPT-07", { period: "2026-09-02" }]];
  for (const [code, params] of real) {
    const res = await fetch(`${BASE_URL}/api/reports/${code}/export.csv?${new URLSearchParams(params)}`, { headers: { Cookie: cookie } });
    const hash = createHash("sha256").update(Buffer.from(await res.arrayBuffer())).digest("hex");
    check(hash === BASELINE_SHA256[code], `${code} sha256 unchanged`, `${code} sha256 changed -- baseline ${BASELINE_SHA256[code]}, got ${hash}`);
  }
  const rpt06 = await fetch(`${BASE_URL}/api/reports/RPT-06/export.csv?businessDate=2026-09-02`, { headers: { Cookie: cookie } });
  const rpt06Hash = createHash("sha256").update(Buffer.from(await rpt06.arrayBuffer())).digest("hex");
  check(rpt06Hash === RPT06_NO_BATCH_SHA256, "RPT-06 (no batchCode) unchanged", `RPT-06 changed -- baseline ${RPT06_NO_BATCH_SHA256}, got ${rpt06Hash}`);
}

function verifyCsvShape(buf, label, columnCount) {
  check(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf, `${label}: BOM present`, `${label}: missing BOM`);
  const text = buf.toString("utf8");
  const lines = text.replace(/^﻿/, "").split("\r\n").filter((l) => l.length > 0);
  check(!/(?<!\r)\n/.test(text.slice(3)), `${label}: CRLF line endings`, `${label}: a line ending is bare \\n, not CRLF`);
  check(lines[0].split(",").length === columnCount, `${label}: ${columnCount} columns`, `${label}: expected ${columnCount} columns, got ${lines[0].split(",").length}`);
  return lines;
}

async function verifyRpt02(admin, cookie) {
  const { count: txnCount } = await admin.from("transaction").select("*", { count: "exact", head: true });
  const { count: seriCount } = await admin.from("seri_result").select("*", { count: "exact", head: true });
  const noFilter = await (await fetch(`${BASE_URL}/api/reports/RPT-02`, { headers: { Cookie: cookie } })).json();
  check(noFilter.total === txnCount + seriCount, "RPT-02 no filter total == transaction + seri_result count", `expected ${txnCount + seriCount}, got ${noFilter.total}`);

  const { data: sampleTxn } = await admin.from("transaction").select("lot_id").limit(1).single();
  const { data: lot } = await admin.from("lot").select("lot_code").eq("id", sampleTxn.lot_id).single();
  const { count: lotTxnCount } = await admin.from("transaction").select("*", { count: "exact", head: true }).eq("lot_id", sampleTxn.lot_id);
  const { count: lotSeriCount } = await admin.from("seri_result").select("*", { count: "exact", head: true }).eq("lot_id", sampleTxn.lot_id);
  const byLot = await (await fetch(`${BASE_URL}/api/reports/RPT-02?lotId=${sampleTxn.lot_id}`, { headers: { Cookie: cookie } })).json();
  check(byLot.total === lotTxnCount + lotSeriCount, "RPT-02 lotId filter count matches DB", `expected ${lotTxnCount + lotSeriCount}, got ${byLot.total}`);
  check(byLot.rows.every((r) => r.lotCode === lot.lot_code), "RPT-02 lotId filter: every row belongs to the filtered lot", "a row belonged to a different lot");

  const { count: cancelledCount } = await admin.from("transaction").select("*", { count: "exact", head: true }).eq("status", "cancelled");
  const byStatus = await (await fetch(`${BASE_URL}/api/reports/RPT-02?txnStatus=cancelled`, { headers: { Cookie: cookie } })).json();
  check(byStatus.total === cancelledCount, "RPT-02 txnStatus=cancelled count matches DB", `expected ${cancelledCount}, got ${byStatus.total}`);
  check(byStatus.rows.every((r) => r.txnStatus === "cancelled" && String(r.reason).length > 0), "RPT-02 txnStatus=cancelled: every row is cancelled with a non-empty reason", "a row was not cancelled or had an empty reason");
  check(noFilter.total !== byLot.total && noFilter.total !== byStatus.total, "RPT-02 filters actually narrow the result (counts differ from the unfiltered total)", "a filter did not change the row count at all");

  const badUuid = await fetch(`${BASE_URL}/api/reports/RPT-02?lotId=not-a-uuid`, { headers: { Cookie: cookie } });
  check(badUuid.status === 500, "RPT-02 malformed lotId -> 500 internal_error, never a raw DB error", `expected 500, got ${badUuid.status}`);

  const csv = await fetch(`${BASE_URL}/api/reports/RPT-02/export.csv`, { headers: { Cookie: cookie } });
  const lines = verifyCsvShape(Buffer.from(await csv.arrayBuffer()), "RPT-02", 15);
  check(/目利き/.test(lines[0]) && /Mã|Ngày|Trạng thái/.test(lines[0]), "RPT-02 CSV: JA and VI-diacritic text intact in the same header row", "RPT-02 CSV header missing JA or VI text");
}

async function verifyRpt03(admin, cookie) {
  const today = todayJst();
  const cutoff = addDays(today, EXPIRY_WARNING_DAYS);
  const { data: all } = await admin.from("participant").select("id, status, valid_to");
  const expected = all.filter((p) => p.status !== ACTIVE_STATUS || (p.valid_to !== null && p.valid_to <= cutoff));
  const noFilter = await (await fetch(`${BASE_URL}/api/reports/RPT-03`, { headers: { Cookie: cookie } })).json();
  check(noFilter.total === expected.length, "RPT-03 no filter == (not active) UNION (active + valid_to within 30d)", `expected ${expected.length}, got ${noFilter.total}`);
  check(noFilter.rows.every((r) => r.daysUntilExpiry === null || typeof r.daysUntilExpiry === "number"), "RPT-03: daysUntilExpiry is never NaN/Infinity", "a row had a non-numeric, non-null daysUntilExpiry");
  const nullValidTo = noFilter.rows.find((r) => r.validTo === null);
  if (nullValidTo) check(nullValidTo.daysUntilExpiry === null, "RPT-03: valid_to=null -> daysUntilExpiry=null", `expected null, got ${JSON.stringify(nullValidTo.daysUntilExpiry)}`);

  const { count: statusCount } = await admin.from("participant").select("*", { count: "exact", head: true }).eq("status", "tạm ngừng");
  const byStatus = await (await fetch(`${BASE_URL}/api/reports/RPT-03?eligibilityStatus=${encodeURIComponent("tạm ngừng")}`, { headers: { Cookie: cookie } })).json();
  check(byStatus.total === statusCount && byStatus.rows.every((r) => r.status === "tạm ngừng"), "RPT-03 eligibilityStatus filter matches DB and narrows correctly", `expected ${statusCount} all 'tạm ngừng', got ${byStatus.total}`);
  check(noFilter.total !== byStatus.total, "RPT-03 eligibilityStatus filter actually narrows the result", "filter did not change the row count");

  const activeParticipant = all.find((p) => p.status === ACTIVE_STATUS && (p.valid_to === null || p.valid_to > cutoff));
  const byId = await (await fetch(`${BASE_URL}/api/reports/RPT-03?participantId=${activeParticipant.id}`, { headers: { Cookie: cookie } })).json();
  check(byId.total === 1 && byId.rows[0].participantId === activeParticipant.id, "RPT-03 participantId filter bypasses the default compound rule (shows an active, non-near-expiry participant on request)", `expected 1 row for ${activeParticipant.id}, got ${byId.total}`);

  const csv = await fetch(`${BASE_URL}/api/reports/RPT-03/export.csv`, { headers: { Cookie: cookie } });
  const lines = verifyCsvShape(Buffer.from(await csv.arrayBuffer()), "RPT-03", 13);
  const bilingualRow = lines.slice(1).some((l) => /卸売業者|仲卸|売買参加者|買出人/.test(l) && /(có hiệu lực|tạm ngừng|mất hiệu lực|xét lại|chấp thuận|giấy phép|đăng ký)/.test(l));
  check(bilingualRow, "RPT-03 CSV: a data row carries both JA category and VI text intact", "no data row with both JA category and VI text");
}

async function verifyExpiryWarningWindow(admin, cookie) {
  const testId = (await admin.from("participant").insert({
    category: "仲卸", name: "TEST-verify-rpt-03-near-expiry", license_type: "giấy phép",
    status: ACTIVE_STATUS, valid_from: "2020-01-01", valid_to: addDays(todayJst(), 15),
  }).select("id").single()).data.id;
  try {
    const res = await (await fetch(`${BASE_URL}/api/reports/RPT-03`, { headers: { Cookie: cookie } })).json();
    check(res.rows.some((r) => r.participantId === testId), "RPT-03: an active participant expiring in 15 days IS included (within the 30-day warning window)", "near-expiry test participant missing from the no-filter result");
  } finally {
    await admin.from("participant").delete().eq("id", testId);
  }
}

async function main() {
  verifyDictionaryParity(check);
  const settlement = await signInHttp(BASE_URL, "settlement@sakura-market.local");
  const judge = await signInHttp(BASE_URL, "judge@sakura-market.local");
  await verifyMocksAndBaselines(settlement);

  const noSession02 = await fetch(`${BASE_URL}/api/reports/RPT-02/export.csv`, { redirect: "manual" });
  check(noSession02.status === 307, "RPT-02 no session -> 307", `expected 307, got ${noSession02.status}`);
  const noSession03 = await fetch(`${BASE_URL}/api/reports/RPT-03/export.csv`, { redirect: "manual" });
  check(noSession03.status === 307, "RPT-03 no session -> 307", `expected 307, got ${noSession03.status}`);

  const judgeRpt02 = await fetch(`${BASE_URL}/api/reports/RPT-02`, { headers: { Cookie: judge } });
  check(judgeRpt02.status === 200, "RPT-02 open to every active role (no RLS exception), verified with a non-settlement role", `expected 200 for judge, got ${judgeRpt02.status}`);

  const { url, secretKey } = loadEnv(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.local"));
  const admin = createAdminClient(url, secretKey);

  await verifyRpt02(admin, settlement);
  await verifyRpt03(admin, settlement);
  await verifyExpiryWarningWindow(admin, settlement);

  if (checker.failures > 0) {
    console.error(`\n${checker.failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error("[verify-rpt-02-rpt-03] unexpected failure:", err.message);
  process.exit(1);
});
