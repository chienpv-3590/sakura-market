import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB, same ceiling as F008 evidence uploads
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export type IntakeDocReason = "INVALID_TYPE" | "TOO_LARGE";
export type IntakeDocCheck = { ok: true; extension: string } | { ok: false; reason: IntakeDocReason };
export type UploadIntakeDocResult = { ok: true; path: string } | { ok: false; reason: IntakeDocReason };

/**
 * Pure, no I/O -- lets the route reject every file up front (before the lot
 * row, or any other file's upload, is written) instead of leaving a partial
 * lot behind a single bad attachment.
 */
export function checkIntakeDocFile(file: File): IntakeDocCheck {
  const extension = ALLOWED_TYPES[file.type];
  if (!extension) return { ok: false, reason: "INVALID_TYPE" };
  if (file.size > MAX_BYTES) return { ok: false, reason: "TOO_LARGE" };
  return { ok: true, extension };
}

/**
 * FR-LOT-01 chứng từ tiếp nhận. Mirrors F008's uploadEvidence
 * (src/lib/corrections/evidence-upload.ts): same 5MB cap and type
 * allow-list, enforced server-side only -- the client's `accept` attribute
 * is a UX hint, never trusted. Stored under `{lotId}/...` in the private
 * `lot-attachment` bucket seeded by
 * supabase/migrations/20260907090000_lot_attachment.sql; read back only
 * through a server-generated signed URL (see lot-attachment-queries.ts),
 * never a public one.
 */
export async function uploadIntakeDoc(
  client: SupabaseClient<Database>,
  lotId: string,
  file: File,
): Promise<UploadIntakeDocResult> {
  const check = checkIntakeDocFile(file);
  if (!check.ok) return check;

  const path = `${lotId}/${Date.now()}-${crypto.randomUUID()}.${check.extension}`;
  const { error } = await client.storage.from("lot-attachment").upload(path, file, {
    contentType: file.type,
  });
  if (error) {
    throw new Error(`uploadIntakeDoc(${lotId}): upload failed: ${error.message}`);
  }
  return { ok: true, path };
}
