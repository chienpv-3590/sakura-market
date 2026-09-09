# SC-21 — Phê duyệt yêu cầu điều chỉnh

| | |
|---|---|
| Mã thi công | SCR020_CorrectionApproval |
| Route | `/corrections` |
| Loại | List-Detail (roster ghi Detail; code là danh sách + panel duyệt theo từng dòng) |
| Actor chính | Bộ phận quyết toán — vai người duyệt (ROLE-SETTLEMENT) |
| FE- / FR- | FE-029 / FR-301, FR-401, BR-002, DEC-001, SM-001 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Người duyệt xem danh sách yêu cầu điều chỉnh, mở bằng chứng đính kèm, chọn kiểu điều chỉnh
(đảo ngược toàn bộ hoặc chỉ chênh lệch) rồi duyệt/từ chối. Duyệt xong hệ thống ghi một dòng
`transaction_adjustment` — **không bao giờ sửa `transaction` gốc** (BR-002) — và chạy luôn engine
完納奨励金 để phát sinh dòng delta cho kỳ gốc.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc (`src/app/(app)/layout.tsx:11`)
- Vai trò được vào: chỉ **ROLE-SETTLEMENT** (`corrections/page.tsx:25`)
- Mã lỗi khi thiếu quyền: **404** (`require-role.ts:72-77`)
- Tiền đề dữ liệu: có ít nhất một `correction_request`. Mặc định lọc `status='pending'`
  (`corrections/page.tsx:31`)
- **Ma trận quyền của màn này trong thiết kế gốc còn để mở** — Screen List LAB-1 ghi "Ma trận
  quyền chưa chốt — xem Q1". Code đã quyết: cả người tạo và người duyệt đều là ROLE-SETTLEMENT,
  tách nhau bằng maker-checker theo `requested_by` chứ không theo vai trò
  (`corrections/page.tsx:15-17`). Spec khai theo code.

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `status` (lọc) | *không có nhãn — chỉ qua URL* | `chưa có key JA` | query string | Không | `correction_request.status` | `chưa có — đề xuất` — không có UI lọc, chỉ đọc `?status=` | không kiểm giá trị: `status ?? "pending"` đưa thẳng vào `.eq()`; giá trị lạ → 0 dòng (`correction-queries.ts:17`) | không có — hiện trạng thái rỗng |
| 2 | Mã giao dịch | *tiêu đề dòng* | 取引番号 | text — chỉ đọc | — | `transaction.txn_code` join qua `target_txn_id`; rơi về `target_txn_id` nếu join rỗng (`correction-queries.ts:27`) | không có input | không có input | — |
| 3 | Lý do | Lý do | 理由 | text — chỉ đọc | — | `correction_request.reason` | không có input | không có input | — |
| 4 | Trạng thái | Chờ duyệt / Đã duyệt / Bị từ chối | 承認待ち / 承認済み / 却下 | badge — chỉ đọc | — | `correction_request.status` | không có input | không có input | — |
| 5 | Bằng chứng | Xem bằng chứng đính kèm | 添付証拠を見る | link — signed URL 300s | — | Storage `correction-evidence`, `createSignedUrl(evidence_path, 300)` (`corrections/page.tsx:13,35-37`) | link chỉ render khi `evidenceUrl !== null` | signed URL do server sinh, không bao giờ là URL public (bucket `public=false`, `…correction.sql:39-41`) | không có — link biến mất nếu tạo signed URL lỗi |
| 6 | `decision` | Duyệt / Từ chối | 承認 / 却下 | enum (nút) | Có | không lưu cột riêng — quyết định `status` đích | hai nút riêng, `disabled` khi `pending` (`correction-approval-panel.tsx:98-116`) | phải là `"approve"` hoặc `"reject"` → **422 `invalid_request`** (`approve/route.ts:50,76`) | "Có lỗi xảy ra, vui lòng thử lại." |
| 7 | `adjustmentKind` | Đảo ngược toàn bộ / Chỉ chỉnh phần chênh lệch | 全体を取消 / 差額のみ修正 | radio enum | Có khi duyệt | `transaction_adjustment.kind` CHECK in (reverse/delta) (`…correction.sql:23`) | mặc định `"reverse"`, luôn có giá trị (`correction-approval-panel.tsx:17`) | thiếu khi `decision='approve'` → **422 `INVALID_ADJUSTMENT`** (`approve-correction.ts:81`) | "Cần chọn loại điều chỉnh và nhập chênh lệch hợp lệ." |
| 8 | `qtyDelta` | Chênh lệch số lượng | 数量の差分 | numeric(12,2) | Có khi `kind='delta'` | `transaction_adjustment.qty_delta` NOT NULL | `type="number" step="0.01"`, `Number(...) \|\| 0` (`correction-approval-panel.tsx:34,76-82`) | `Number.isFinite` mới nhận, else `undefined`; `qtyDelta=0 && unitPriceDelta=0` khi `kind='delta'` → **422 `INVALID_ADJUSTMENT`** (`approve/route.ts:53`, `approve-correction.ts:82-88`) | "Cần chọn loại điều chỉnh và nhập chênh lệch hợp lệ." |
| 9 | `unitPriceDelta` | Chênh lệch đơn giá | 単価の差分 | integer JPY | Có khi `kind='delta'` | `transaction_adjustment.unit_price_delta` NOT NULL | `type="number" step="1"` — **không chặn số thập phân** ở client | `Number.isFinite` mới nhận; không có kiểm số nguyên ở tầng route — cột `integer` của Postgres mới từ chối (`…correction.sql:25`) | lỗi DB nổi lên thành 500 `internal_error` — **xem § 7** |
| 10 | `note` | *không có UI* | `chưa có key JA` | text | Không | `audit_log.reason` (không lưu vào `correction_request`) | **không có input nào gửi `note`** (`correction-approval-panel.tsx:30-37`) | nhận và `trim()` nếu có (`approve/route.ts:56`) | — |
| 11 | `amount_delta` | *không hiện trên màn* | `chưa có key JA` | integer JPY — dẫn xuất | Có | `transaction_adjustment.amount_delta`; `reverse`: `-round(qty*unit_price)`; `delta`: `round((qty+Δqty)*(price+Δprice) - qty*price)` (`build-adjustment.ts:39-53`) | không có input | server tự tính từ `transaction.qty`/`unit_price` đọc lại tại thời điểm duyệt (`approve-correction.ts:90-106`) | — |
| 12 | `approved_by` | *không hiện trên màn* | `chưa có key JA` | uuid — server gán | Có | `correction_request.approved_by` FK `app_user(id)` | không có input | `user.id` từ `requireRole` (`approve/route.ts:66`) | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | `rows.length === 0` | `EmptyState` "Không có yêu cầu điều chỉnh nào." | Tạo yêu cầu (link SC-20) |
| đang tải | Server Component đang render | streaming `PageFrame` | không |
| lỗi tải | `listCorrections` throw (`correction-queries.ts:20-22`) | error boundary Next.js | Tải lại |
| không có quyền | vai trò ≠ ROLE-SETTLEMENT | trang 404 | không |
| **tự tạo — không được duyệt** | `status='pending'` và `requested_by === user.id` | ghi chú "Bạn không thể phê duyệt yêu cầu do chính mình tạo."; panel không render | không |
| chờ duyệt, được duyệt | `status='pending'` và `requested_by !== user.id` | panel duyệt/từ chối | Duyệt · Từ chối |
| đã xử lý | `status ∈ {approved, rejected}` | badge trạng thái, không panel | không |
| đang gửi | `pending === true` trong panel | hai nút `disabled` + `aria-busy` | không |
| gửi lỗi | response không ok | `<p role="alert">` theo mã lỗi | Thử lại |
| **read-only vì ngày đã lock (mã 423)** | ngày nghiệp vụ của giao dịch đích đã lock — **luôn đúng**, vì SC-20 chỉ nhận giao dịch thuộc ngày đã lock (`create-correction.ts:33-41`) | không hiện gì đặc biệt: hai bảng ghi của màn này (`correction_request`, `transaction_adjustment`) cố ý **không** mang `trg_block_after_lock` (`…correction.sql:1-3`), nên duyệt vẫn ghi được | Duyệt · Từ chối. Ngược lại, mọi cố gắng sửa trực tiếp `transaction` cùng ngày đó trả **423 `LOCKED_BUSINESS_DATE`** (`handle-locked-write.ts:41`, `business_day_lock.sql:37-49`) |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT **và** `requested_by !== user.id` | ✓ | toàn bộ, kể cả link bằng chứng | Duyệt · Từ chối | 404 `NOT_FOUND` · 409 `ALREADY_DECIDED` · 422 `INVALID_ADJUSTMENT` |
| ROLE-SETTLEMENT **và** `requested_by === user.id` | ✓ | toàn bộ, nhưng panel bị ẩn | không — **tự phê duyệt bị từ chối 403 `SELF_APPROVAL`** kể cả khi gọi API trực tiếp | **403** |
| 6 vai trò còn lại | ✗ | không | không | trang **404**; `POST /api/corrections/:id/approve` **404** |

**Maker-checker (GOV-RULE-01 / DEC-001):** người duyệt phải khác người tạo, tự duyệt là **403**.
Hai tầng: FE tính `canDecide = status==='pending' && requested_by !== user.id`
(`corrections/page.tsx:44`) và ẩn panel; server so `requested_by` với `actorId` rồi trả
`SELF_APPROVAL` → **403** (`approve-correction.ts:51-53`, `approve/route.ts:34`). Tầng FE chỉ là
gợi ý; **403 mới là biên giới thật**. Hai tài khoản demo tách đôi (settlement /
settlement-lead) là cố ý, không phải trùng lặp.

**Lưu ý về đọc:** RLS cho mọi vai trò đang hoạt động đọc `correction_request` và
`transaction_adjustment` (FR-601, `rls_core.sql:29,53,55`). Chặn ở **ghi**
(`rls_ops.sql:53-59`, chỉ ROLE-SETTLEMENT) và ở **vào trang**. File bằng chứng thì chặn cả đọc
(`…correction.sql:43-46`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Duyệt | `POST /api/corrections/[id]/approve` `{decision:"approve", adjustmentKind, qtyDelta?, unitPriceDelta?}` | `correction_request` CAS `pending→approved` (điểm serialize), rồi `transaction_adjustment` INSERT; INSERT lỗi → bù ngược CAS về `pending` (`approve-correction.ts:108-143`) | `approve_correction`, `before {status:pending}`, `after {status:approved, ...adjustment}` | 400 `invalid_json` · 422 `invalid_request`/`INVALID_ADJUSTMENT` · **403 `SELF_APPROVAL`** · 404 `NOT_FOUND` · 409 `ALREADY_DECIDED` · 500 |
| Duyệt → chạy tiếp engine 完納奨励金 | cùng request, gọi `runIncentiveDelta` bằng service-role client | `incentive_result` INSERT `kind='delta'`, `period = todayJst()`, `origin_period` = ngày nghiệp vụ của giao dịch đích (`run-incentive-delta.ts:110-120`) | **không ghi audit khi thành công**; chỉ ghi khi bỏ qua: `incentive_delta_skipped_no_origin` (dòng 67), `incentive_delta_skipped_no_payment_record` (dòng 89). Lỗi engine bị bắt và **chỉ log console**, không lật ngược phê duyệt (`approve/route.ts:19-30`) | không đổi mã trả về — engine lỗi vẫn trả 200 |
| Từ chối | cùng route, `{decision:"reject"}` | `correction_request` CAS `pending→rejected` (`approve-correction.ts:56-79`) | `reject_correction` | như trên, trừ `INVALID_ADJUSTMENT` |
| Mở bằng chứng | không có API — signed URL tạo lúc render trang | không ghi | không | link hết hạn sau 300s → Storage trả lỗi của nó |

`writeAuditLog()` chạy **sau** khi nghiệp vụ commit và không rollback được (QĐ-5,
`write-audit-log.ts:44-50`).

## 7. Edge case

- **Hai người duyệt cùng lúc**: CAS `.eq("status","pending")` là điểm serialize; người thứ hai
  nhận `ALREADY_DECIDED` → **409** (`approve-correction.ts:118`).
- **`unitPriceDelta` thập phân**: client `step="1"` nhưng không chặn; route chỉ kiểm
  `Number.isFinite`. `Math.round` chỉ áp cho `amountDelta`, còn `unit_price_delta` đi thẳng vào
  cột `integer` → Postgres từ chối, nổi lên **500** thay vì 422. `chưa có — đề xuất`: thêm
  `Number.isInteger` ở `approve/route.ts:54-55`.
- **`note` chết một nửa**: route đọc và trim `note` (`approve/route.ts:56`) nhưng panel không
  bao giờ gửi, nên `audit_log.reason` của mọi lần duyệt/từ chối luôn `null`. `chưa có — đề xuất`.
- **Giao dịch đích biến mất giữa phiên**: đọc lại `transaction` trước khi build adjustment,
  không thấy → `NOT_FOUND` **404** (`approve-correction.ts:98`).
- **INSERT adjustment lỗi sau khi CAS thành công**: bù ngược về `pending` rồi throw → **500**.
  Đây là bù trừ thủ công, không phải transaction (QĐ-5).
- **Engine delta không tìm được kỳ gốc**: `NO_ORIGIN_RESULT` / `NO_PAYMENT_RECORD` → bỏ qua, ghi
  audit, phê duyệt vẫn đứng (`run-incentive-delta.ts:7-10`). Kế toán và thưởng lệch nhau một dòng
  cho tới khi có người dò audit.
- **Lọc `?status=` giá trị lạ** (ví dụ `?status=xxx`) → 0 dòng, không lỗi. Trạng thái rỗng
  không phân biệt "hết việc" với "lọc sai".
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → 307 `/login?reason=inactive`; đổi vai trò → 404.

## 8. Dẫn chứng

- `src/app/(app)/corrections/page.tsx:13,15-17,25,31,35-37,44,48` — TTL signed URL, chú thích ma trận quyền, `requireRole`, lọc, `canDecide`, `isOwnPendingRequest`
- `src/components/corrections/correction-list-table.tsx:33-41` — link bằng chứng, ghi chú tự tạo
- `src/components/corrections/correction-approval-panel.tsx:17,23,30-37,63-95` — mặc định `reverse`, ẩn panel, body request, input delta
- `src/app/api/corrections/[id]/approve/route.ts:19-30,32-37,50-58,66` — engine sau duyệt, bảng mã lỗi, parse body, `requireRole`
- `src/lib/corrections/approve-correction.ts:51-53,54,81-88,108-143,145-153` — 403, 409, 422, CAS + bù trừ, audit
- `src/lib/corrections/build-adjustment.ts:39-53` — công thức `amount_delta`
- `src/lib/corrections/correction-queries.ts:13-28` — join `txn_code`, rơi về `target_txn_id`
- `supabase/migrations/20260904090600_correction.sql:1-3,19-32,39-46` — hai bảng append-only ngoài trigger lock, bucket private
- `supabase/migrations/20260904090500_business_day_lock.sql:37-49,61-75` — `P0001`, đúng 4 bảng
- `src/lib/reconciliation/handle-locked-write.ts:41` — `P0001` → **423**
- `supabase/migrations/20260904091000_rls_ops.sql:48-59` — RLS ghi ROLE-SETTLEMENT
- `supabase/migrations/20260904090900_rls_core.sql:29,53,55` — FR-601, mọi vai trò đọc được
- `docs/generated/permissions-matrix.md:627-637` — PERM015 khai đúng maker-checker này
