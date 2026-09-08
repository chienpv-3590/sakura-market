// Shared env/session boilerplate for scripts/verify-*.mjs -- pulled out so
// the verify script itself stays under the project's 200-line file limit
// (development-rules.md "File Size Management": pull utility functions out
// into their own modules). Not a new external dependency: same
// @supabase/supabase-js + hand-rolled .env parser every other script here
// already uses (seed-demo-users.mjs), just not copy-pasted a third time.
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

function parseEnvFile(filePath) {
  const values = {};
  for (const raw of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i === -1) continue;
    values[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return values;
}

/** Reads NEXT_PUBLIC_SUPABASE_URL / _PUBLISHABLE_KEY / SUPABASE_SECRET_KEY from process.env, falling back to `.env.local` at `envPath`. Never logs values. */
export function loadEnv(envPath) {
  const file = existsSync(envPath) ? parseEnvFile(envPath) : {};
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? file.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? file.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? file.SUPABASE_SECRET_KEY;
  if (!url || !publishableKey || !secretKey) throw new Error(`Missing Supabase env vars -- checked ${envPath}`);
  return { url, publishableKey, secretKey };
}

export function createAdminClient(url, secretKey) {
  return createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

/** Signs in one demo account (password from SEED_DEMO_PASSWORD, default matches seed-demo-users.mjs) and returns its own RLS-bound client + app_user id. */
export async function signInAs(url, publishableKey, email) {
  const password = process.env.SEED_DEMO_PASSWORD ?? "SakuraDemo@2026";
  const client = createClient(url, publishableKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw new Error(`sign-in failed for ${email}: ${error?.message}`);
  return { client, userId: data.user.id };
}

/** One pass/fail counter + logger shared by every check across a verify script's own functions. */
export function createChecker() {
  let failures = 0;
  function check(cond, passMsg, failMsg) {
    if (cond) console.log(`OK    ${passMsg}`);
    else {
      failures += 1;
      console.error(`FAIL  ${failMsg}`);
    }
  }
  return {
    check,
    get failures() {
      return failures;
    },
  };
}

/** Signs in via the APP's own /api/auth/sign-in (not raw Supabase Auth) -- returns the session's Cookie header, for scripts that exercise Route Handlers over real HTTP. */
export async function signInHttp(baseUrl, email, password = process.env.SEED_DEMO_PASSWORD ?? "SakuraDemo@2026") {
  const res = await fetch(`${baseUrl}/api/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (res.status !== 200) throw new Error(`sign-in ${email} failed: ${res.status}`);
  const setCookies = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  return setCookies.map((c) => c.split(";")[0]).join("; ");
}

const DICT_NAMESPACES = [
  "common", "nav", "participants", "lots", "transactions",
  "deliveries", "reconciliation", "corrections", "incentive", "reports",
];

/** vi/ja dictionary key-set parity across all 10 namespaces (phase-01 §Success Criteria #4) -- reused by every later phase's own verify script instead of re-copying the namespace list. */
export function verifyDictionaryParity(check) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "src", "lib", "i18n", "dictionaries");
  for (const ns of DICT_NAMESPACES) {
    const vi = Object.keys(JSON.parse(readFileSync(path.join(root, "vi", `${ns}.json`), "utf8"))).sort();
    const ja = Object.keys(JSON.parse(readFileSync(path.join(root, "ja", `${ns}.json`), "utf8"))).sort();
    check(
      vi.length === ja.length && vi.every((k, i) => k === ja[i]),
      `${ns}.json vi/ja key parity (${vi.length} keys)`,
      `${ns}.json vi/ja key mismatch`,
    );
  }
}
