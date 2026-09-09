# SC-20 — Tạo yêu cầu điều chỉnh

| | |
|---|---|
| Mã thi công | SCR019_CorrectionRequest |
| Route | `/corrections/new` |
| Loại | Form |
| Actor chính | Bộ phận quyết toán (ROLE-SETTLEMENT) |
| FE- / FR- | FE-028 / FR-001, FR-101, FR-201, BR-001, BR-003 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Điều chỉnh sau lock là **đường duy nhất** để sửa dữ liệu giao dịch của một ngày nghiệp vụ đã
lock. Người quyết toán tra mã giao dịch, nhập lý do, đính kèm bằng chứng rồi gửi cho người khác
duyệt. Bản ghi `transaction` gốc không bao giờ bị sửa — mọi thay đổi đi qua
`correction_request` + `transaction_adjustment`, cả hai append-only (BR-001).

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc — `src/app/(app)/layout.tsx:11` gọi `requireUser()` cho mọi trang `(app)/*`
- Vai trò được vào: chỉ **ROLE-SETTLEMENT** (`corrections/new/page.tsx:20`)
- Mã lỗi khi thiếu quyền: **404** — `require-role.ts:72-77` gọi `notFound()`, không phải 403, có
  chủ đích để không lộ sự tồn tại tài nguyên
- Tiền đề dữ liệu: giao dịch phải tồn tại theo `txn_code`, **và** `business_date` của nó phải đã
  có dòng trong `business_day_lock`. Ngày chưa lock → server trả **409 `NOT_LOCKED`**
  (`create-correction.ts:41`, `corrections/route.ts:13`) — sửa trực tiếp thay vì tạo yêu cầu

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `txnCode` | Mã giao dịch | 取引番号 | text (query GET) | Có — để tra ra giao dịch | `transaction.txn_code` (unique, `20260904090300_transaction.sql:9`) | `chưa có — đề xuất` (input không `required`, không `maxLength`, `new/page.tsx:39-45`) | `trim()` rồi `.eq("txn_code")` `maybeSingle()` — không thấy thì render lỗi inline (`new/page.tsx:24-26,54`) | "Không tìm thấy giao dịch với mã này." / 「この取引番号は見つかりません。」 |
| 2 | `targetTxnId` | *không hiện* | `chưa có key JA` | uuid (ẩn) | Có | `correction_request.target_txn_id` NOT NULL FK `transaction(id)` (`20260904090600_correction.sql:6`) | `chưa có — đề xuất` — truyền qua prop, người dùng không sửa được (`new/page.tsx:72`) | `typeof === "string"` và `trim().length > 0` → **422 `missing_target_txn_id`**; tồn tại trong `transaction` → **404 `TXN_NOT_FOUND`** (`corrections/route.ts:30-32`, `create-correction.ts:31`) | 422 → key `corrections.error.generic`; 404 → "Không tìm thấy giao dịch với mã này." |
| 3 | `reason` | Lý do | 理由 | textarea | Có | `correction_request.reason` text NOT NULL (`…correction.sql:7`) | `reason.trim().length > 0` mới bật nút gửi (`correction-request-form.tsx:25,85`) | `trim()`, rỗng → **422 `missing_reason`** (`corrections/route.ts:33-36`) | 422 `missing_reason` trả khoá `error` chứ không phải `reason`, nên client rơi về "Có lỗi xảy ra, vui lòng thử lại." — **lệch, xem § 7** |
| 4 | `evidence` | Bằng chứng đính kèm (ảnh hoặc PDF, tối đa 5MB) | 添付証拠（画像またはPDF、最大5MB） | file | **Có — Screen List LAB-1 ghi bắt buộc** | `correction_request.evidence_path` text NOT NULL + bucket private `correction-evidence` (`…correction.sql:8,39-41`) | `accept="image/jpeg,image/png,image/webp,application/pdf"` (chỉ gợi ý UX, không tin), `file !== null` mới bật nút (`correction-request-form.tsx:25,77`) | `instanceof File && size > 0` → **422 `missing_evidence`**; MIME thuộc 4 loại → **422 `INVALID_TYPE`**; `size ≤ 5MB` → **422 `TOO_LARGE`** (`corrections/route.ts:37-39`, `evidence-upload.ts:27-29`) | "Chỉ chấp nhận file ảnh (JPEG/PNG/WEBP) hoặc PDF." · "File bằng chứng vượt quá 5MB." |
| 5 | Số lượng gốc | Số lượng gốc | 元の数量 | numeric(12,2) — chỉ đọc | — | `transaction.qty` (`…transaction.sql:13`) | không có input | không có input | — |
| 6 | Đơn giá gốc | Đơn giá gốc | 元の単価 | integer JPY — chỉ đọc | — | `transaction.unit_price` (`…transaction.sql:14`) | không có input | không có input | — |
| 7 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date — chỉ đọc | — | `transaction.business_date` (`…transaction.sql:15`) | không có input | không có input | — |
| 8 | `status` | *không hiện* | `chưa có key JA` | enum — server gán | Có | `correction_request.status` DEFAULT `'pending'` CHECK in (pending/approved/rejected) (`…correction.sql:9`) | không có input | route ghi cứng `'pending'` (`create-correction.ts:47`) | — |
| 9 | `requested_by` | *không hiện* | `chưa có key JA` | uuid — server gán | Có | `correction_request.requested_by` FK `app_user(id)` (`…correction.sql:10`) | không có input | lấy `user.id` từ `requireRole` (`corrections/route.ts:67-69`) | — |
| 10 | `evidence_path` | *không hiện* | `chưa có key JA` | text — server sinh | Có | `correction_request.evidence_path`; đường dẫn `{targetTxnId}/{ts}-{uuid}.{ext}` (`evidence-upload.ts:31`) | không có input | server sinh, client không gửi được | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | chưa nhập `?txnCode=` | chỉ form tra mã | Tra mã |
| đang tải | Server Component đang render (`await` searchParams + Supabase) | streaming của `PageFrame` | không |
| lỗi tải | Supabase lỗi khi `.from("transaction")` | error boundary Next.js | Tải lại |
| không có quyền | vai trò ≠ ROLE-SETTLEMENT | trang 404 | không |
| không tìm thấy giao dịch | `txnCode` có nhưng `txn` null | lỗi inline `corrections.error.txnNotFound` | Sửa mã, tra lại |
| **ngày đã lock — điều kiện BẮT BUỘC của màn này** | `business_day_lock` có dòng cho `transaction.business_date` | form gửi yêu cầu hiện ra bình thường | Gửi yêu cầu |
| **read-only vì ngày đã lock (mã 423) — ở màn khác** | cùng ngày đó, sửa trực tiếp `transaction`/`seri_result`/`mekiki_record`/`delivery_shipment` | các màn kia trả **423 `LOCKED_BUSINESS_DATE`** và chỉ đường về SC-20 | không — SC-20 là đường thay thế duy nhất |
| ngày CHƯA lock | không có dòng trong `business_day_lock` | lỗi inline `corrections.error.notLocked` | không — sửa trực tiếp ở màn giao dịch |
| đang gửi | `pending === true` | nút `disabled` + `aria-busy` | không |
| gửi lỗi | response không ok | `<p role="alert">` với khoá lỗi tương ứng | Gửi lại |
| đã gửi | `done === true` | "Đã gửi yêu cầu điều chỉnh, đang chờ duyệt." | không (form bị thay thế) |

**Về 423:** trigger `trg_block_after_lock` nằm trên đúng 4 bảng và chỉ `BEFORE UPDATE OR DELETE`,
raise `P0001` (`20260904090500_business_day_lock.sql:37-49,61-75`); `respondLockedWrite()` dịch
`P0001` thành **423** (`handle-locked-write.ts:41`). Hai bảng của SC-20 —
`correction_request` và `transaction_adjustment` — **không** có trigger này, cố ý:
đây là đường ghi hợp lệ duy nhất sau khi lock (`20260904090600_correction.sql:1-3`).

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | ✓ | toàn bộ | Tra mã · Gửi yêu cầu | 422/404/409 theo § 3 |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | ✗ | không | không | trang **404**; `POST /api/corrections` cũng **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601,
`20260904090900_rls_core.sql:29,43,53`). Chặn là ở **ghi**
(`write_settlement_insert` trên `correction_request`, `20260904091000_rls_ops.sql:53-54`) và ở
**vào trang**. Riêng **file bằng chứng** trong bucket `correction-evidence` thì chặn cả đọc:
policy chỉ cho `ROLE-SETTLEMENT` (`20260904090600_correction.sql:43-46`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tra mã giao dịch | không có API — form `method="GET"` về chính trang (`new/page.tsx:36`) | không ghi | không | không có mã HTTP riêng; lỗi hiện inline |
| Gửi yêu cầu | `POST /api/corrections` (multipart) | Storage `correction-evidence` (upload trước), rồi `correction_request` INSERT | `writeAuditLog` action `correction_request_create` (`create-correction.ts:59-67`) | 400 `invalid_request` · 422 (`missing_target_txn_id`/`missing_reason`/`missing_evidence`/`INVALID_TYPE`/`TOO_LARGE`) · 404 `TXN_NOT_FOUND` · 409 `NOT_LOCKED` · 500 |

`writeAuditLog()` chạy **sau** khi INSERT đã commit và không rollback được (QĐ-5) — audit lỗi
thì yêu cầu vẫn tồn tại, chỉ mất dòng audit (`write-audit-log.ts:44-50`).

## 7. Edge case

- **Upload thành công nhưng INSERT lỗi** → file rác nằm lại trong bucket, không có
  `correction_request` trỏ tới. Không có bước dọn (`corrections/route.ts:43-56`). `chưa có — đề xuất`.
- **`missing_reason` lệch hợp đồng lỗi**: server trả `{ error: "missing_reason" }` còn client chỉ
  đọc `body.reason` (`correction-request-form.tsx:42-45`), nên người dùng thấy thông báo chung
  thay vì "thiếu lý do". Cùng lỗi này với `missing_target_txn_id` và `missing_evidence`.
- **Ngày lock ngay giữa phiên**: người dùng mở form khi ngày chưa lock (thấy `notLocked`), lock
  xong tải lại thì gửi được. Ngược lại không xảy ra — không có endpoint unlock nào trong repo
  (`reconciliation/[businessDate]/lock/route.ts:39-40`).
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → lần render sau `requireUser()` redirect
  `/login?reason=inactive` (`require-role.ts:58-64`); đổi vai trò → 404.
- **Nhiều yêu cầu cho cùng một giao dịch**: không bị chặn — không có unique nào trên
  `(target_txn_id, status)`. Người duyệt tự lọc. `chưa có — đề xuất` nếu muốn chặn.
- **`evidence_path` không bao giờ ra CSV**: RPT-08 (log điều chỉnh sau lock) cố ý không có cột
  này (`registry-columns.ts:103-122`). Chỉ đọc qua signed URL 300 giây ở SC-21.
- **`accept` không phải hàng rào**: người dùng bỏ qua được ở client; hàng rào thật là MIME +
  size ở server (`evidence-upload.ts:27-29`).

## 8. Dẫn chứng

- `src/app/(app)/corrections/new/page.tsx:20` — `requireRole(["ROLE-SETTLEMENT"])`
- `src/app/(app)/corrections/new/page.tsx:24-26,54` — tra `txn_code`, lỗi inline khi không thấy
- `src/components/corrections/correction-request-form.tsx:25,77,85` — gate client: lý do + file
- `src/app/api/corrections/route.ts:11-14,30-39,66-74` — bảng mã lỗi, validation server, `requireRole`
- `src/lib/corrections/create-correction.ts:31,41,43-49,59-67` — 404/409, INSERT, audit
- `src/lib/corrections/evidence-upload.ts:4-10,27-31` — 5MB, 4 MIME, đường dẫn file
- `src/lib/corrections/correction-reject-reasons.ts:8-16` — map mã lỗi → khoá i18n
- `supabase/migrations/20260904090600_correction.sql:4-13,39-46` — DDL + bucket private + policy
- `supabase/migrations/20260904090500_business_day_lock.sql:37-49,61-75` — `P0001`, 4 bảng có trigger
- `supabase/migrations/20260904091000_rls_ops.sql:48-54` — RLS ghi ROLE-SETTLEMENT
- `supabase/migrations/20260904090900_rls_core.sql:29,53` — FR-601, mọi vai trò đọc được
- `src/lib/reconciliation/handle-locked-write.ts:41` — `P0001` → **423**
- `src/lib/auth/require-role.ts:58-64,72-77` — 307 khi inactive, **404** khi sai vai trò
