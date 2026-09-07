import { EmptyState } from "@/components/ui/empty-state";
import type { LotAttachmentView } from "@/lib/lots/lot-attachment-queries";

// SCR006_LotDetail: FR-LOT-01 chứng từ tiếp nhận, now a real attachment list.
// Every link is a server-generated signed URL (loadLotAttachments), never the
// bare storage path -- the `lot-attachment` bucket is private (Security
// Considerations), so an unsigned request to the same path is refused.
function formatFileSize(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function LotAttachmentsCard({
  attachments,
  dict,
}: {
  attachments: LotAttachmentView[];
  dict: Record<string, string>;
}) {
  if (attachments.length === 0) {
    return <EmptyState description={dict["lots.detail.attachmentsEmpty"]} compact />;
  }

  return (
    <div className="cds-table__wrap">
      <table className="cds-table cds-table--default cds-table--hover">
        <thead>
          <tr>
            <th>{dict["lots.detail.attachmentsColumns.file"]}</th>
            <th>{dict["lots.detail.attachmentsColumns.size"]}</th>
            <th>{dict["lots.detail.attachmentsColumns.uploadedAt"]}</th>
          </tr>
        </thead>
        <tbody>
          {attachments.map((doc) => (
            <tr key={doc.id}>
              <td className="cds-table__wrapcell">
                {doc.signedUrl ? (
                  <a href={doc.signedUrl} target="_blank" rel="noreferrer" className="cds-link">
                    {doc.file_name}
                  </a>
                ) : (
                  <span title={dict["lots.detail.attachmentsLinkUnavailable"]}>{doc.file_name}</span>
                )}
              </td>
              <td className="cds-table__mono">{formatFileSize(doc.file_size)}</td>
              <td className="cds-table__mono">{new Date(doc.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
