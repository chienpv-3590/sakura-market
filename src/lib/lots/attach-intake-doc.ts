import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/lib/db/types";
import { writeAuditLog } from "@/lib/audit/write-audit-log";
import { uploadIntakeDoc, type IntakeDocReason } from "./intake-doc-upload";

export type AttachIntakeDocReason = IntakeDocReason | "ATTACH_FAILED";
export type AttachIntakeDocResult =
  | { ok: true; attachment: Tables<"lot_attachment"> }
  | { ok: false; reason: AttachIntakeDocReason };

/**
 * FR-LOT-01 + FR-AUDIT-01: upload one intake document and record its
 * `lot_attachment` row plus its own audit entry -- attaching a document is a
 * write in its own right, distinct from the lot-creation audit row
 * (create-lot.ts).
 *
 * There is no cross-table transaction in this stack (PostgREST only --
 * see docs/pham-vi-va-phan-mock.md § QĐ-5). If the storage upload succeeds
 * but the `lot_attachment` insert then fails, the upload has no DB row
 * pointing at it, so it is removed here as a compensating write rather than
 * left as an orphaned object.
 */
export async function attachIntakeDoc(
  client: SupabaseClient<Database>,
  lotId: string,
  uploadedBy: string,
  file: File,
): Promise<AttachIntakeDocResult> {
  const uploadResult = await uploadIntakeDoc(client, lotId, file);
  if (!uploadResult.ok) {
    return { ok: false, reason: uploadResult.reason };
  }

  const insertRow: TablesInsert<"lot_attachment"> = {
    lot_id: lotId,
    file_path: uploadResult.path,
    file_name: file.name,
    mime_type: file.type,
    file_size: file.size,
    uploaded_by: uploadedBy,
  };
  const { data, error } = await client.from("lot_attachment").insert(insertRow).select().single();

  if (error || !data) {
    try {
      const { error: removeError } = await client.storage
        .from("lot-attachment")
        .remove([uploadResult.path]);
      if (removeError) {
        console.error(
          `attachIntakeDoc(${lotId}): compensating remove failed for ${uploadResult.path}`,
          removeError,
        );
      }
    } catch (removeErr) {
      console.error(
        `attachIntakeDoc(${lotId}): compensating remove threw for ${uploadResult.path}`,
        removeErr,
      );
    }
    console.error(`attachIntakeDoc(${lotId}): lot_attachment insert failed`, error);
    return { ok: false, reason: "ATTACH_FAILED" };
  }

  await writeAuditLog(client, {
    actorId: uploadedBy,
    action: "attach_document",
    entity: "lot_attachment",
    entityId: data.id,
    before: null,
    after: data,
  });

  return { ok: true, attachment: data };
}
