# ADR-006 — Lưu file đính kèm thật qua Storage

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | Bảng `lot_attachment`; bucket riêng tư `lot-attachment`; màn SC-08 (tiếp nhận lô), SC-10 (chi tiết lô); miễn SC-31 (quản lý file theo policy lưu trữ) |

## Bối cảnh

`FR-LOT-01` / `D-LOT` / `TBL-ATTACH-01` đòi hệ thống lưu được chứng từ tiếp nhận
lô hàng. Bản phase-06 làm tạm: nhét tên chứng từ vào một trường text rồi smuggle
vào `audit_log.after` dưới khoá `intake_docs`. Chuỗi text đó không phải chứng từ —
không đọc lại được, không tải về được, và nó biến audit log thành nơi lưu dữ liệu
nghiệp vụ.

`TBL-ATTACH-01` liệt cả "phiếu tiếp nhận" lẫn ảnh/chứng từ phụ trợ dưới cùng một
domain, nghĩa là một lô mang được nhiều chứng từ.

F008 đã có sẵn tiền lệ chạy được: `correction_request.evidence_path` + bucket riêng
tư `correction-evidence`.

## Lựa chọn

File thật, upload và đọc lại được. Bảng riêng `lot_attachment` (1 lô — nhiều chứng
từ) + bucket riêng tư `lot-attachment`, mirror đúng pattern F008:

- Allow-list 4 MIME type (`image/jpeg`, `image/png`, `image/webp`,
  `application/pdf`), trần 5MB, kiểm ở **server** — không tin thuộc tính `accept`
  của client.
- Đọc lại chỉ qua signed URL do server ký, TTL 300 giây. Bucket không public.
- RLS: `ROLE-INTAKE` insert (họ là người tiếp nhận lô), mọi role active select.
  Không policy update/delete — append-only, cùng kiểu `audit_log`.
- Đính kèm là **tuỳ chọn**: tạo lô không kèm file vẫn `201`.
- Ghi `lot_attachment` là một write riêng có `audit_log` của chính nó
  (`action='attach_document'`), tách khỏi audit ghi nhận `lot`.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Giữ chuỗi text `intake_docs` trong `audit_log.after` (cách phase-06 đã làm) | Không phải file: không đọc lại được chứng từ. Và audit log là bản ghi *về* thao tác, không phải kho dữ liệu nghiệp vụ — nhét dữ liệu vào đó là làm hỏng cả hai vai |
| Một cột `lot.intake_docs` (text hoặc jsonb) trên chính bảng `lot` | Một lô mang nhiều chứng từ (`TBL-ATTACH-01`), mỗi chứng từ cần `uploaded_by`, `created_at`, `file_size` riêng. Một cột jsonb chứa được nhưng không truy vấn/ràng buộc được từng phần tử |
| Bucket công khai (public) cho tiện đọc lại | Chứng từ tiếp nhận là dữ liệu nghiệp vụ. Public bucket nghĩa là ai có URL là đọc được, mãi mãi — kiểm sống xác nhận đường gọi thẳng object không kèm chữ ký bị từ chối |
| Bắt buộc ít nhất 1 file mới cho tạo lô | `FR-LOT-01` chỉ đòi hệ thống *lưu được* chứng từ; không `BR-LOT` nào đặt số lượng tối thiểu như `BR-003` làm với bằng chứng của F008. Bắt buộc là tự thêm ràng buộc khách chưa yêu cầu |
| Chỉ kiểm MIME/kích thước ở client bằng `accept` và `max` | Client nào cũng bỏ qua được. Kiểm ở server là chỗ duy nhất đáng tin |

## Hệ quả

**Chấp nhận được:** kiểm end-to-end thật, không đọc code suy ra — tạo lô kèm 1 PNG
→ `201`, có đủ dòng `lot`, dòng `lot_attachment`, object thật trong bucket, và 2
dòng `audit_log`. Đọc lại bằng signed URL do một role **khác** người upload ký →
`200`, đúng `image/png`. File `text/plain` → `422 INVALID_TYPE`, file 6MB →
`422 TOO_LARGE`, cả hai đều không để lại lô mồ côi.

**Phải chịu:** màn quản lý file theo policy lưu trữ (`DR-RET-01` — 7 năm với phiếu
tiếp nhận, 3 năm rồi cold archive với ảnh phụ trợ) **vẫn ngoài phạm vi**: không
lifecycle rule, không job dọn hay chuyển file theo tuổi, file nằm vô thời hạn cho
tới khi ai đó xoá tay. `evidence_path` phải được chặn khỏi mọi bản xuất CSV bằng
**kỷ luật code** — comment và review — chứ không bằng ràng buộc: không có gì ở tầng
DB ngăn một truy vấn báo cáo mới select cột đó vào output. Và append-only nghĩa là
upload sai file thì không sửa, không xoá được qua ứng dụng; chỉ thêm được file mới.

## Dẫn chứng

- `supabase/migrations/20260907090000_lot_attachment.sql:1-13` — vì sao bảng riêng, vì sao không có `business_date`/trigger
- `supabase/migrations/20260907090000_lot_attachment.sql:25-27,33-41` — append-only, RLS insert `ROLE-INTAKE` / select mọi role active
- `supabase/migrations/20260907090000_lot_attachment.sql:46-54` — bucket `public = false`, policy storage
- `src/lib/lots/intake-doc-upload.ts:4-9,22-24` — trần 5MB, allow-list 4 MIME, kiểm ở server
- `src/lib/lots/lot-attachment-queries.ts:4,36` — signed URL TTL 300s
- `src/lib/corrections/adjustment-queries.ts:59-62` — "`evidence_path` is deliberately NEVER selected here" — ràng buộc bằng comment, không bằng schema
- `src/lib/reports/registry-columns.ts:104-107` — RPT-08: `evidence_path` và email cố ý không có trong cột xuất
- `docs/pham-vi-va-phan-mock.md:224-246,281-291` — QĐ-6 và kết quả kiểm end-to-end
- `docs/pham-vi-va-phan-mock.md:181-186` — `DR-RET-01` là policy vận hành, prototype không triển khai
