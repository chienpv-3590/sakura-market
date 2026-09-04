import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { requireRole, requireUser } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import type { Database, TablesInsert } from "@/lib/db/types";
import { isParticipantCategory, isValidCategoryLicensePair } from "@/lib/participants/category-rules";
import { isParticipantStatus } from "@/lib/participants/state-machine";
import { toAuditSnapshot } from "@/lib/participants/audit-json";

const PAGE_SIZE = 50;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A1 (GET half): any active app_user may list/filter participants -- matches
 * RLS `read_all_active_users`. `requireUser()` only, no role restriction.
 */
export async function GET(request: Request): Promise<NextResponse> {
  await requireUser();

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const status = url.searchParams.get("status");

  if (category !== null && !isParticipantCategory(category)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }
  if (status !== null && !isParticipantStatus(status)) {
    return NextResponse.json({ error: "invalid_status" }, { status: 400 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    let query = supabase
      .from("participant")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE);
    if (category) query = query.eq("category", category);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) {
      throw new Error(`GET /api/participants: query failed: ${error.message}`);
    }
    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("[api/participants] GET failed", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

/**
 * A1 (POST half) · FR-PARTY-01 · US001. Only ROLE-SYS-ADMIN may create
 * (functional-spec § 3 Open Decisions) -- RLS enforces the same rule at the
 * DB layer, this is the app-level gate on top of it (defense in depth).
 */
export async function POST(request: Request): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SYS-ADMIN"]);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = body as Record<string, unknown> | null;
  const category = typeof input?.category === "string" ? input.category : "";
  const name = typeof input?.name === "string" ? input.name.trim() : "";
  const licenseType = typeof input?.license_type === "string" ? input.license_type : "";
  const validFrom = typeof input?.valid_from === "string" ? input.valid_from : "";
  const validToRaw = input?.valid_to;
  const validTo = typeof validToRaw === "string" ? validToRaw : null;

  if (!isParticipantCategory(category)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 422 });
  }
  if (name.length === 0) {
    return NextResponse.json({ error: "invalid_name" }, { status: 422 });
  }
  // FR-PARTY-01: category <-> license_type pair must match category-rules.ts
  // exactly -- this is the check that stops 仲卸/売買参加者/etc from being
  // silently collapsed into one generic "partner" shape.
  if (!isValidCategoryLicensePair(category, licenseType)) {
    return NextResponse.json({ error: "category_license_mismatch" }, { status: 422 });
  }
  if (!DATE_PATTERN.test(validFrom)) {
    return NextResponse.json({ error: "invalid_valid_from" }, { status: 422 });
  }
  if (validTo !== null && !DATE_PATTERN.test(validTo)) {
    return NextResponse.json({ error: "invalid_valid_to" }, { status: 422 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const row: TablesInsert<"participant"> = {
      category,
      name,
      license_type: licenseType,
      valid_from: validFrom,
      valid_to: validTo,
    };
    const { data, error } = await supabase.from("participant").insert(row).select().single();
    if (error) {
      throw new Error(`POST /api/participants: insert failed: ${error.message}`);
    }

    await writeAuditLog(supabase, {
      actorId: user.id,
      action: "create",
      entity: "participant",
      entityId: data.id,
      after: toAuditSnapshot(data),
    });

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("[api/participants] POST failed", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
