import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB (Security Considerations)
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export type UploadEvidenceReason = "INVALID_TYPE" | "TOO_LARGE";
export type UploadEvidenceResult = { ok: true; path: string } | { ok: false; reason: UploadEvidenceReason };

/**
 * F008 BR-003. Server-side enforcement of type/size -- the client's `accept`
 * attribute is a UX hint only, never trusted (Security Considerations).
 * Stored under `{targetTxnId}/...` in the private `correction-evidence`
 * bucket seeded by supabase/migrations/20260904090600_correction.sql; SCR015
 * reads it back through a server-generated signed URL, never a public one.
 */
export async function uploadEvidence(
  client: SupabaseClient<Database>,
  targetTxnId: string,
  file: File,
): Promise<UploadEvidenceResult> {
  const extension = ALLOWED_TYPES[file.type];
  if (!extension) return { ok: false, reason: "INVALID_TYPE" };
  if (file.size > MAX_BYTES) return { ok: false, reason: "TOO_LARGE" };

  const path = `${targetTxnId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await client.storage.from("correction-evidence").upload(path, file, {
    contentType: file.type,
  });
  if (error) {
    throw new Error(`uploadEvidence(${targetTxnId}): upload failed: ${error.message}`);
  }
  return { ok: true, path };
}
