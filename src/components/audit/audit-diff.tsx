"use client";

import { useT } from "@/lib/i18n/i18n-provider";

// Dùng chung cho mọi màn có lịch sử audit (lô hàng, giao dịch, せり).
//
// audit_log lưu before/after là JSON đầy đủ vì FR-AUDIT-01 đòi truy vết được.
// Nhưng đổ nguyên JSON ra bảng thì người đọc phải tự dịch, mà OBJ-03 (>=98%
// giao dịch có dấu vết) chỉ có giá trị khi dấu vết ĐỌC ĐƯỢC. Component này
// chỉ hiện những trường thực sự đổi, kèm nhãn tiếng người.

type JsonObject = Record<string, unknown>;

/** Cột nội bộ — không có nghĩa với người đọc nghiệp vụ. */
const HIDDEN_FIELDS = new Set([
  "id",
  "created_at",
  "updated_at",
  "assessor_id",
  "actor_id",
  "confirmed_by",
  "locked_by",
]);

function asObject(value: unknown): JsonObject | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonObject)
    : null;
}

export function AuditDiff({
  before,
  after,
  fieldLabels,
  statusPrefix,
  createFields,
}: {
  before: unknown;
  after: unknown;
  /** field DB -> khóa i18n. Trường không có trong map thì in nguyên tên cột. */
  fieldLabels: Record<string, string>;
  /** tiền tố khóa i18n cho giá trị cột `status`, ví dụ "lots.status." */
  statusPrefix?: string;
  /** khi before = null (tạo mới): chỉ tóm tắt các trường này, theo đúng thứ tự */
  createFields?: readonly string[];
}) {
  const t = useT();
  const b = asObject(before);
  const a = asObject(after);

  const label = (field: string) => {
    const key = fieldLabels[field];
    return key ? t(key, field) : field;
  };

  const display = (field: string, value: unknown): string => {
    if (value === null || value === undefined || value === "") return "—";
    if (field === "status" && statusPrefix) return t(`${statusPrefix}${String(value)}`, String(value));
    return String(value);
  };

  const Row = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <li key={field}>
      <span className="text-muted">{label(field)}:</span> {children}
    </li>
  );

  // TẠO MỚI: không có "trước" để so, nên tóm tắt vài trường chính thay vì đổ cả dòng.
  if (b === null && a !== null) {
    const fields = (createFields ?? Object.keys(a).filter((f) => !HIDDEN_FIELDS.has(f))).filter(
      (f) => f in a,
    );
    return (
      <ul className="space-y-0.5">
        {fields.map((f) => (
          <Row key={f} field={f}>
            <span className="sm-mono text-strong">{display(f, a[f])}</span>
          </Row>
        ))}
      </ul>
    );
  }

  if (a === null) return <span className="text-muted">—</span>;

  // SỬA: chỉ liệt kê trường có giá trị khác nhau.
  const changed = Object.keys(a).filter(
    (f) => !HIDDEN_FIELDS.has(f) && JSON.stringify(b?.[f]) !== JSON.stringify(a[f]),
  );

  if (changed.length === 0) return <span className="text-muted">{t("audit.noChange", "—")}</span>;

  return (
    <ul className="space-y-0.5">
      {changed.map((f) => (
        <Row key={f} field={f}>
          <span className="sm-mono text-muted line-through">{display(f, b?.[f])}</span>
          <span aria-hidden className="mx-1 text-subtle">→</span>
          <span className="sm-mono font-semibold text-strong">{display(f, a[f])}</span>
        </Row>
      ))}
    </ul>
  );
}
