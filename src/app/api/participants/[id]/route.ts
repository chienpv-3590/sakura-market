import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/require-role";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import type { Database, TablesUpdate } from "@/lib/db/types";
import { isValidCategoryLicensePair } from "@/lib/participants/category-rules";
import { toAuditSnapshot } from "@/lib/participants/audit-json";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A2 · FR-PARTY-01 · US001. `category` is immutable after create -- any
 * request that even carries a `category` key is rejected outright, matching
 * technical-spec § A2 Request shape (`{ name?, license_type?, valid_from?,
 * valid_to? }`, no `category`). `reason` is mandatory (technical-spec § A2
 * Result: "audit_log(..., reason bắt buộc)").
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const user = await requireRole(["ROLE-SYS-ADMIN"]);
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const input = body as Record<string, unknown> | null;

  if (input && "category" in input) {
    return NextResponse.json({ error: "category_immutable" }, { status: 422 });
  }
  const reason = typeof input?.reason === "string" ? input.reason.trim() : "";
  if (reason.length === 0) {
    return NextResponse.json({ error: "reason_required" }, { status: 422 });
  }

  try {
    const supabase: SupabaseClient<Database> = await createClient();
    const { data: before, error: beforeError } = await supabase
      .from("participant")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (beforeError) {
      throw new Error(`PATCH /api/participants/${id}: lookup failed: ${beforeError.message}`);
    }
    if (!before) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const patch: TablesUpdate<"participant"> = {};
    const beforeSnapshot: Record<string, unknown> = {};
    const afterSnapshot: Record<string, unknown> = {};

    if (typeof input?.name === "string" && input.name.trim().length > 0) {
      patch.name = input.name.trim();
      beforeSnapshot.name = before.name;
      afterSnapshot.name = patch.name;
    }
    if (typeof input?.license_type === "string") {
      if (!isValidCategoryLicensePair(before.category, input.license_type)) {
        return NextResponse.json({ error: "category_license_mismatch" }, { status: 422 });
      }
      patch.license_type = input.license_type;
      beforeSnapshot.license_type = before.license_type;
      afterSnapshot.license_type = patch.license_type;
    }
    if (typeof input?.valid_from === "string") {
      if (!DATE_PATTERN.test(input.valid_from)) {
        return NextResponse.json({ error: "invalid_valid_from" }, { status: 422 });
      }
      patch.valid_from = input.valid_from;
      beforeSnapshot.valid_from = before.valid_from;
      afterSnapshot.valid_from = patch.valid_from;
    }
    if (input && "valid_to" in input) {
      const validTo = input.valid_to;
      if (validTo !== null && typeof validTo !== "string") {
        return NextResponse.json({ error: "invalid_valid_to" }, { status: 422 });
      }
      if (typeof validTo === "string" && !DATE_PATTERN.test(validTo)) {
        return NextResponse.json({ error: "invalid_valid_to" }, { status: 422 });
      }
      patch.valid_to = validTo;
      beforeSnapshot.valid_to = before.valid_to;
      afterSnapshot.valid_to = validTo;
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "no_fields_to_update" }, { status: 422 });
    }

    const { data: updated, error: updateError } = await supabase
      .from("participant")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (updateError) {
      throw new Error(`PATCH /api/participants/${id}: update failed: ${updateError.message}`);
    }

    await writeAuditLog(supabase, {
      actorId: user.id,
      action: "update",
      entity: "participant",
      entityId: id,
      before: toAuditSnapshot(beforeSnapshot),
      after: toAuditSnapshot(afterSnapshot),
      reason,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(`[api/participants/${id}] PATCH failed`, err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
