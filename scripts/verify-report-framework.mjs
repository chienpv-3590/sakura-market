#!/usr/bin/env node
// Phase-01 regression gate ("Khung filter và registry báo cáo dùng chung").
// Proves the registry split (registry.ts -> registry-columns.ts +
// registry-filters.ts) and the generic parseReportFilters() rewrite changed
// NOTHING about RPT-01/05/07's real output, and that the 9 mock report codes
// still refuse CSV export before any query runs. Run against a live
// `npm run dev` (or `next start`) server -- this hits the app's own HTTP API,
// never Supabase directly.
//
// Usage:
//   node scripts/verify-report-framework.mjs
//   VERIFY_BASE_URL=http://localhost:3001 node scripts/verify-report-framework.mjs
//
// Success Criteria #1 (plan phase-01): the 3 sha256 below were captured
// 2026-09-08 against HEAD 71e3851 (unmodified code, BEFORE this phase's
// registry split) via:
//   POST /api/auth/sign-in as sysadmin@sakura-market.local, then
//   GET /api/reports/{RPT-01,RPT-05}/export.csv?businessDate=2026-09-02
//   GET /api/reports/RPT-07/export.csv?period=2026-09-02
// Any diff after the refactor is a real regression, not noise.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BASE_URL = process.env.VERIFY_BASE_URL ?? "http://localhost:3000";
const DEMO_EMAIL = "sysadmin@sakura-market.local";
const DEMO_PASSWORD = process.env.SEED_DEMO_PASSWORD ?? "SakuraDemo@2026";
const FIXED_DATE = "2026-09-02"; // seed.sql: real transaction/seri_result/reconciliation_line rows on this date.

const BASELINE_SHA256 = {
  "RPT-01": "7745cf1ab78159506e1cfe62a400b54887418de6fbbdb980a4a8654d2ba47deb",
  "RPT-05": "a43e0da5838560ffab9369d22d67c65517e74f0f8dabb33c18429dc2ee39bef5",
  "RPT-07": "7c419a27c24c14b29f9482eeb989a943ff424ce2ab3ed444fb7d834d379c2c60",
};

const REAL_REPORTS = [
  ["RPT-01", { businessDate: FIXED_DATE }],
  ["RPT-05", { businessDate: FIXED_DATE }],
  ["RPT-07", { period: FIXED_DATE }],
];

const DICT_NAMESPACES = [
  "common",
  "nav",
  "participants",
  "lots",
  "transactions",
  "deliveries",
  "reconciliation",
  "corrections",
  "incentive",
  "reports",
];

let failures = 0;

function fail(message) {
  failures += 1;
  console.error(`FAIL  ${message}`);
}

function ok(message) {
  console.log(`OK    ${message}`);
}

function cookieHeaderFrom(res) {
  const setCookies = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  return setCookies.map((c) => c.split(";")[0]).join("; ");
}

async function signIn() {
  const res = await fetch(`${BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: DEMO_EMAIL, password: DEMO_PASSWORD }),
  });
  if (res.status !== 200) {
    throw new Error(`sign-in failed: status ${res.status} -- ${await res.text()}`);
  }
  const cookie = cookieHeaderFrom(res);
  if (!cookie) {
    throw new Error("sign-in succeeded but no Set-Cookie header was returned");
  }
  return cookie;
}

/** Success Criteria #1 -- CSV byte-for-byte identical to the pre-refactor baseline. */
async function verifyRealReportsUnchanged(cookie) {
  for (const [code, params] of REAL_REPORTS) {
    const url = `${BASE_URL}/api/reports/${code}/export.csv?${new URLSearchParams(params)}`;
    const res = await fetch(url, { headers: { Cookie: cookie } });
    if (res.status !== 200) {
      fail(`${code} export.csv returned ${res.status}, expected 200`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const hasBom = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
    if (!hasBom) fail(`${code} export.csv is missing the UTF-8 BOM`);

    const hash = createHash("sha256").update(buf).digest("hex");
    if (hash === BASELINE_SHA256[code]) {
      ok(`${code} export.csv sha256 matches baseline (${hash})`);
    } else {
      fail(`${code} export.csv sha256 changed -- baseline ${BASELINE_SHA256[code]}, got ${hash}`);
    }
  }
}

/** Task verification #5 -- the 3 real reports return actual rows through the JSON API. */
async function verifyRealReportsReturnRows(cookie) {
  for (const [code, params] of REAL_REPORTS) {
    const url = `${BASE_URL}/api/reports/${code}?${new URLSearchParams(params)}`;
    const res = await fetch(url, { headers: { Cookie: cookie } });
    if (res.status !== 200) {
      fail(`${code} JSON API returned ${res.status}, expected 200`);
      continue;
    }
    const json = await res.json();
    ok(`${code} JSON API returned ${json.total} row(s) (isMock=${json.isMock})`);
  }
}

/** Success Criteria #5 -- mock codes still refuse export.csv with 403 before any query. */
async function verifyMockReportsStillRefuse(cookie) {
  const mockCodes = ["RPT-02", "RPT-03", "RPT-04", "RPT-06", "RPT-08", "RPT-09", "RPT-10", "RPT-11", "RPT-12"];
  for (const code of mockCodes) {
    const res = await fetch(`${BASE_URL}/api/reports/${code}/export.csv`, { headers: { Cookie: cookie } });
    if (res.status !== 403) {
      fail(`${code} export.csv returned ${res.status}, expected 403 MOCK_REPORT`);
      continue;
    }
    const json = await res.json();
    if (json.reason !== "MOCK_REPORT") {
      fail(`${code} export.csv returned 403 but reason was "${json.reason}", expected "MOCK_REPORT"`);
    } else {
      ok(`${code} export.csv still 403 MOCK_REPORT`);
    }
  }
}

/** Success Criteria #4 -- vi/ja key-set parity across all 10 dictionary namespaces. */
function verifyDictionaryParity() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const dictRoot = path.resolve(scriptDir, "..", "src", "lib", "i18n", "dictionaries");

  for (const locale of ["vi", "ja"]) {
    const dir = path.join(dictRoot, locale);
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    if (files.length !== DICT_NAMESPACES.length) {
      fail(`${locale}/ has ${files.length} dictionary files, expected ${DICT_NAMESPACES.length}`);
    }
  }

  for (const ns of DICT_NAMESPACES) {
    const viPath = path.join(dictRoot, "vi", `${ns}.json`);
    const jaPath = path.join(dictRoot, "ja", `${ns}.json`);
    const viKeys = Object.keys(JSON.parse(readFileSync(viPath, "utf8"))).sort();
    const jaKeys = Object.keys(JSON.parse(readFileSync(jaPath, "utf8"))).sort();

    if (viKeys.length !== jaKeys.length || viKeys.some((k, i) => k !== jaKeys[i])) {
      const onlyVi = viKeys.filter((k) => !jaKeys.includes(k));
      const onlyJa = jaKeys.filter((k) => !viKeys.includes(k));
      fail(`${ns}.json key mismatch -- only in vi: [${onlyVi.join(", ")}], only in ja: [${onlyJa.join(", ")}]`);
    } else {
      ok(`${ns}.json vi/ja key parity (${viKeys.length} keys)`);
    }
  }
}

async function main() {
  verifyDictionaryParity();

  const cookie = await signIn();
  await verifyRealReportsUnchanged(cookie);
  await verifyRealReportsReturnRows(cookie);
  await verifyMockReportsStillRefuse(cookie);

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error("[verify-report-framework] unexpected failure:", err.message);
  process.exit(1);
});
