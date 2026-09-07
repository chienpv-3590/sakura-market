export interface CsvColumn {
  key: string;
  header: string;
}

// F010 §4.6 Configuration: UTF-8 WITH BOM, `,` delimiter, RFC 4180 quoting,
// CRLF line endings. Shift-JIS was ruled out (can't represent Vietnamese
// diacritics) and this app is VI/JA bilingual -- hand-rolled here rather
// than pulling in a CSV library, since package.json is out of this task's
// file scope (no new dependency can be added).
const BOM = String.fromCharCode(0xfeff); // U+FEFF BYTE ORDER MARK

function escapeField(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/["\r\n,]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Serializes `rows` (plain objects keyed by `columns[].key`) into one CSV string. */
export function toCsv(columns: CsvColumn[], rows: Array<Record<string, unknown>>): string {
  const headerLine = columns.map((c) => escapeField(c.header)).join(",");
  const dataLines = rows.map((row) => columns.map((c) => escapeField(row[c.key])).join(","));
  return BOM + [headerLine, ...dataLines].join("\r\n") + "\r\n";
}
