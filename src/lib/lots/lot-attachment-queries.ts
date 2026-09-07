import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/db/types";

const SIGNED_URL_TTL_SECONDS = 300; // short-lived, same TTL as F008 evidence (Security Considerations)

export type LotAttachmentView = Pick<
  Tables<"lot_attachment">,
  "id" | "file_name" | "mime_type" | "file_size" | "created_at"
> & { signedUrl: string | null };

/**
 * SCR006_LotDetail read-back: never a public URL, always a server-generated
 * signed one (same convention as `/corrections`'s evidence link). A signing
 * failure for one row does not fail the whole page -- it just shows that one
 * document with no link, since the row itself (name/size/date) is still
 * useful without a live URL.
 */
export async function loadLotAttachments(
  client: SupabaseClient<Database>,
  lotId: string,
): Promise<LotAttachmentView[]> {
  const { data, error } = await client
    .from("lot_attachment")
    .select("id, file_name, mime_type, file_size, file_path, created_at")
    .eq("lot_id", lotId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`loadLotAttachments(${lotId}) failed: ${error.message}`);
  }

  return Promise.all(
    (data ?? []).map(async (row) => {
      const { data: signed } = await client.storage
        .from("lot-attachment")
        .createSignedUrl(row.file_path, SIGNED_URL_TTL_SECONDS);
      return {
        id: row.id,
        file_name: row.file_name,
        mime_type: row.mime_type,
        file_size: row.file_size,
        created_at: row.created_at,
        signedUrl: signed?.signedUrl ?? null,
      };
    }),
  );
}
