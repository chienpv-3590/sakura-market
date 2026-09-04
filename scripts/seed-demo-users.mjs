#!/usr/bin/env node
// Seeds the 9 demo accounts (phase-03 §Implementation Steps #8-9) through the
// Supabase Auth Admin API -- never a raw SQL insert into auth.users, because
// that bypasses password hashing / auth.identities linkage and is documented
// to break silently on some Supabase setups (see research §2). Safe to re-run:
// existing accounts (matched by email) are reused, only app_user is upserted.
//
// Usage: node scripts/seed-demo-users.mjs
// Reads NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY from .env.local --
// never logs their values.

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DEMO_PASSWORD = process.env.SEED_DEMO_PASSWORD ?? "SakuraDemo@2026";

const DEMO_USERS = [
  { email: "intake@sakura-market.local", role: "ROLE-INTAKE", displayName: "Nhan vien tiep nhan (Demo)" },
  { email: "judge@sakura-market.local", role: "ROLE-JUDGE", displayName: "Nguoi danh gia 目利き (Demo)" },
  { email: "trade@sakura-market.local", role: "ROLE-TRADE", displayName: "Nhan vien giao dich (Demo)" },
  { email: "delivery@sakura-market.local", role: "ROLE-DELIVERY", displayName: "Nhan vien giao nhan (Demo)" },
  { email: "settlement@sakura-market.local", role: "ROLE-SETTLEMENT", displayName: "Bo phan doi chieu (Demo)" },
  {
    email: "settlement-lead@sakura-market.local",
    role: "ROLE-SETTLEMENT",
    displayName: "Truong bo phan doi chieu - nguoi duyet F008 (Demo)",
  },
  { email: "ruleadmin@sakura-market.local", role: "ROLE-RULE-ADMIN", displayName: "Quan ly quy tac bieu suat (Demo)" },
  {
    email: "rulechecker@sakura-market.local",
    role: "ROLE-RULE-ADMIN",
    displayName: "Nguoi phe duyet bieu suat - F009 (Demo)",
  },
  { email: "sysadmin@sakura-market.local", role: "ROLE-SYS-ADMIN", displayName: "Quan tri he thong (Demo)" },
];

/**
 * Minimal .env parser -- no "dotenv" dependency exists in package.json and
 * this phase does not own package.json, so we read the file by hand instead.
 * @param {string} filePath
 * @returns {Record<string, string>}
 */
function parseEnvFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  /** @type {Record<string, string>} */
  const values = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;
    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function loadSupabaseAdminEnv() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.resolve(scriptDir, "..", ".env.local");
  const fileEnv = existsSync(envPath) ? parseEnvFile(envPath) : {};

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? fileEnv.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? fileEnv.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      `Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY -- checked process.env and ${envPath}`,
    );
  }
  return { url, secretKey };
}

/** @param {import("@supabase/supabase-js").SupabaseClient} admin */
async function loadExistingUsersByEmail(admin) {
  /** @type {Map<string, string>} */
  const byEmail = new Map();
  let page = 1;
  const perPage = 200;
  // Loop defensively: 9 demo users fit in one page today, but this must not
  // silently miss accounts if the project ever accumulates more users.
  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw new Error(`auth.admin.listUsers failed: ${error.message}`);
    }
    for (const user of data.users) {
      if (user.email) byEmail.set(user.email.toLowerCase(), user.id);
    }
    if (data.users.length < perPage) break;
    page += 1;
  }
  return byEmail;
}

/**
 * @param {import("@supabase/supabase-js").SupabaseClient} admin
 * @param {{ email: string, role: string, displayName: string }} demoUser
 * @param {Map<string, string>} existingByEmail
 */
async function ensureAuthUser(admin, demoUser, existingByEmail) {
  const existingId = existingByEmail.get(demoUser.email.toLowerCase());
  if (existingId) {
    return { id: existingId, created: false };
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: demoUser.email,
    password: DEMO_PASSWORD,
    email_confirm: true, // required: project still has "Confirm email" enabled
  });
  if (error || !data.user) {
    throw new Error(`auth.admin.createUser(${demoUser.email}) failed: ${error?.message ?? "no user returned"}`);
  }
  return { id: data.user.id, created: true };
}

async function main() {
  const { url, secretKey } = loadSupabaseAdminEnv();
  const admin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const existingByEmail = await loadExistingUsersByEmail(admin);

  for (const demoUser of DEMO_USERS) {
    let authResult;
    try {
      authResult = await ensureAuthUser(admin, demoUser, existingByEmail);
    } catch (err) {
      console.error(`[seed-demo-users] FAILED creating auth user for ${demoUser.email}:`, err.message);
      process.exitCode = 1;
      continue;
    }

    const { error: upsertError } = await admin
      .from("app_user")
      .upsert(
        {
          id: authResult.id,
          email: demoUser.email,
          display_name: demoUser.displayName,
          role: demoUser.role,
          is_active: true,
        },
        { onConflict: "id" },
      );

    if (upsertError) {
      console.error(`[seed-demo-users] FAILED upserting app_user for ${demoUser.email}:`, upsertError.message);
      process.exitCode = 1;
      continue;
    }

    console.log(
      `[seed-demo-users] OK  ${demoUser.email}  role=${demoUser.role}  ${authResult.created ? "(created)" : "(already existed)"}`,
    );
  }

  if (process.exitCode === 1) {
    console.error("[seed-demo-users] Completed with errors -- see above.");
  } else {
    console.log("[seed-demo-users] Done -- all 9 demo accounts are present and active.");
  }
}

main().catch((err) => {
  console.error("[seed-demo-users] Unexpected failure:", err.message);
  process.exit(1);
});
