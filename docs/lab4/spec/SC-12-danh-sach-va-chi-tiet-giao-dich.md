# SC-12 — Danh sách và chi tiết giao dịch

| | |
|---|---|
| Mã thi công | SCR011_TransactionsList + SCR012_TransactionDetail |
| Route | `/transactions`, `/transactions/[id]` |
| Loại | List-Detail |
| Actor chính | Vận hành giao dịch (ROLE-TRADE); mọi vai trò khác chỉ tra cứu |
| FE- / FR- | FE-016, FE-017 / FR-AITAI-02, FR-AITAI-03 |
| Trạng thái | Đã dựng |

Một mã `SC-` ứng **hai SCR** (roster § 3.2) nên bảng field tách theo từng SCR con. `/transactions`
là landing page của ROLE-TRADE (`src/lib/auth/role-landing.ts:27`).

## 1. Mục đích

`/transactions` cho mọi vai trò tra cứu giao dịch trong ngày, lọc theo ngày nghiệp vụ và trạng thái.
`/transactions/[id]` là nơi **thật sự** bấm Chốt và Huỷ — hai hành động nặng nhất của luồng 相対取引.
Quy tắc CAS hai tầng đằng sau nút Chốt khai ở **SC-11 mục 6.1**, không lặp ở đây.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc — cả hai trang gọi `requireUser()`, **không** `requireRole()`
  (`transactions/page.tsx:23`, `transactions/[id]/page.tsx:26`).
- Vai trò được vào: **cả 7 vai trò** đều vào được và đều thấy đủ dữ liệu (FR-601).
- Mã lỗi khi thiếu quyền: không có 404 theo vai ở màn này. `requireUser()` chưa đăng nhập →
  `redirect('/login?reason=inactive')` (`require-role.ts:58-64`). Chặn theo vai chỉ nằm ở **hành
  động**: API confirm/cancel trả **404** cho 6 vai còn lại (`confirm/route.ts:24`, `cancel/route.ts:27`).
- Tiền đề dữ liệu: detail cần `transaction` tồn tại, không có → `notFound()` → **404**
  (`[id]/page.tsx:33`).

## 3. Bảng field

### 3.1 SCR011_TransactionsList — `/transactions`

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lọc ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | input date | Không | query `?businessDate` → `transaction.business_date` | `type="date"` (native picker), không có `required` (`page.tsx:76-81`) | **chưa có — đề xuất**: `page.tsx:30` truyền thẳng vào `.eq()` không validate định dạng; giá trị rác làm PostgREST lỗi → page throw → 500. Đề xuất parse `YYYY-MM-DD` rồi bỏ nếu sai | **chưa có — đề xuất**: hiện là trang lỗi 500 |
| 2 | Lọc trạng thái | Trạng thái | 状態 | select | Không | query `?status` → `transaction.status` | 4 option: rỗng + `draft`/`confirmed`/`cancelled` (`page.tsx:85-96`) | Whitelist `STATUSES`; giá trị lạ bị **bỏ im lặng**, danh sách trả về tất cả (`page.tsx:13,26`) | Không có thông báo — im lặng theo thiết kế |
| 3 | Mã giao dịch | Mã giao dịch | 取引番号 | text (link) | — | `transaction.txn_code` | Chỉ đọc, link tới detail (`transaction-table.tsx:54-58`) | — | — |
| 4 | Lô hàng | Lô hàng | ロット | text | — | dẫn xuất: `lot.lot_code` join theo `lot_id`; không tìm được thì hiện thẳng uuid (`page.tsx:44-47`, `transaction-table.tsx:59`) | Chỉ đọc | — | — |
| 5 | Người mua | Người mua | 買出人 | text | — | dẫn xuất: `participant.name` join theo `buyer_participant_id` (`page.tsx:48-51`) | Chỉ đọc | — | — |
| 6 | Số lượng | Số lượng | 数量 | numeric(12,2) | — | `transaction.qty` | Chỉ đọc, canh phải mono | — | — |
| 7 | Đơn giá | Đơn giá | 単価 | integer | — | `transaction.unit_price`, format `toLocaleString()` (`transaction-table.tsx:62`) | Chỉ đọc | — | — |
| 8 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date | — | `transaction.business_date` | Chỉ đọc | — | — |
| 9 | Trạng thái | Nháp / Đã chốt / Đã hủy | 下書き / 成立 / 取消 | badge | — | `transaction.status` (`transaction-table.tsx:65-68`) | Chỉ đọc | — | — |
| 10 | Thao tác | Thao tác | 操作 | cột nút | — | chỉ UI — `ConfirmCancelButtonGroup` nếu `canAct`, không thì `HandoffCaption` (`transaction-table.tsx:71-78`) | `canAct` tính server-side (`page.tsx:53`) | Cửa thật là `requireRole` trên API, không phải `canAct` (`transaction-table.tsx:28-31`) | — |

Danh sách giới hạn **100 dòng**, sắp `created_at` giảm dần, **không phân trang**
(`page.tsx:29`) — **chưa có — đề xuất**: thêm phân trang trước khi dữ liệu vượt 100 dòng/ngày.

### 3.2 SCR012_TransactionDetail — `/transactions/[id]`

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Tiến trình | Tiến trình xử lý | 処理状況 | thanh trạng thái | — | dẫn xuất từ `transaction.status` qua `StageProgressBar kind="transaction"` (`[id]/page.tsx:56`) | Chỉ đọc | — | — |
| 2 | Lô hàng | Lô hàng | ロット | text | — | `lot.lot_code` + `lot.item`, fallback về `lot_id` (`[id]/page.tsx:61-62`) | Chỉ đọc | — | — |
| 3 | Người mua | Người mua | 買出人 | text | — | `participant.name`, fallback uuid (`[id]/page.tsx:63`) | Chỉ đọc | — | — |
| 4 | Số lượng | Số lượng | 数量 | numeric(12,2) | — | `transaction.qty` | Chỉ đọc | — | — |
| 5 | Đơn giá | Đơn giá | 単価 | integer | — | `transaction.unit_price` | Chỉ đọc | — | — |
| 6 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date | — | `transaction.business_date` | Chỉ đọc | — | — |
| 7 | Trạng thái | Trạng thái | 状態 | badge | — | `transaction.status` | Chỉ đọc | — | — |
| 8 | Lý do huỷ | Nhập lý do hủy | 取消理由を入力 | input text | **Có** khi huỷ | `transaction.cancel_reason` | `disabled` khi pending; nút "Xác nhận hủy" disable khi `reason.trim()` rỗng (`confirm-cancel-button-group.tsx:126`) | `parseReason()` phải là string, trim còn > 0 ký tự, không thì **422 `reason_required`** (`cancel/route.ts:9-15,37`) | Client hiện `transactions.cancel.error.generic` — "Có lỗi xảy ra, vui lòng thử lại." vì 422 này không mang field `reason` để map i18n (`confirm-cancel-button-group.tsx:67-75`) |
| 9 | Lịch sử | Lịch sử | 履歴 | bảng audit | — | `audit_log` lọc `entity='transaction'` + `entity_id`, mới nhất trước (`txn-queries.ts:22-37`) | Chỉ đọc; diff before/after render qua `AuditDiff` với `TXN_FIELD_LABELS` (`audit-field-maps.ts:22-38`) | — | Rỗng → `transactions.detail.historyEmpty` |

Ba cột `confirmed_by`, `confirmed_at`, `cancelled_by`, `cancelled_at` **có trong DB**
(`transaction.sql:17-21`) nhưng **không hiển thị trên màn nào** — chỉ đọc lại được qua bảng lịch sử.
**chưa có — đề xuất**: đưa "ai chốt, chốt lúc nào" lên mục chi tiết.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | list: `transactions.length === 0` | `EmptyState` — `transactions.list.empty` "Chưa có giao dịch nào." (`transaction-table.tsx:32-34`) | Vẫn lọc lại được |
| đang tải | — | **chưa có — đề xuất**: không có `loading.tsx` nào trong `src/app` | — |
| lỗi tải | list: query lỗi | `throw new Error(...)` (`page.tsx:34-36`) → error boundary mặc định của Next. **chưa có — đề xuất**: không có `error.tsx` nào trong cây, nên người dùng thấy trang lỗi trần, không có nút thử lại |
| không tìm thấy | detail: `txn === null` | `notFound()` → **404** (`[id]/page.tsx:33`) | Không |
| không có quyền hành động | `role !== 'ROLE-TRADE'` | Vẫn thấy đủ field. Mục "Thao tác" thay bằng `HandoffCaption` chỉ đích ROLE-TRADE; riêng khi `status='cancelled'` thì **cả mục biến mất** vì không còn gì để chuyển tiếp (`[id]/page.tsx:79-86`) | Không |
| đang gửi | `pending === true` | Cả hai nút `disabled` + `aria-busy` (`confirm-cancel-button-group.tsx:97-98,126-127`) | Không — guard `if (pending) return` |
| gửi lỗi | `!response.ok` | `<p role="alert">` map theo `reason` qua `CONFIRM_REJECT_I18N_KEY` / `CANCEL_REJECT_I18N_KEY`; reason lạ → `...error.generic` (`reject-reasons.ts:16-26`, `confirm-cancel-button-group.tsx:39-48`) | Thử lại |
| **read-only vì ngày đã lock** | `business_day_lock` có dòng cho `transaction.business_date` | **Mã 423.** `trg_block_after_lock` bắt UPDATE và raise `P0001` (`business_day_lock.sql:42-46,61-63`); confirm map `LOCKED_BUSINESS_DATE` → 423 (`confirm/route.ts:17`), cancel gọi `respondLockedWrite()` → 423 + audit `locked_write_attempt` (`cancel/route.ts:46-48`). Message VI: "Ngày nghiệp vụ đã lock, không thể chốt trực tiếp — dùng luồng điều chỉnh sau chốt." **Nút vẫn hiện bình thường** — trạng thái lock chỉ lộ ra sau khi bấm. **chưa có — đề xuất**: đọc `business_day_lock` ở server và render mục Thao tác ở dạng read-only | Chỉ còn đường SC-20 / SC-21 (yêu cầu điều chỉnh) |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-TRADE | ✓ | Toàn bộ | Tạo mới (link) · Chốt · Huỷ | 409 sai trạng thái · 422 hiệu lực/số lượng/thiếu lý do · 423 ngày đã lock · 500 |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-SETTLEMENT, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✓ | Toàn bộ | Không — link tạo mới và mục Thao tác đổi thành `HandoffCaption` (`page.tsx:60-69`, `[id]/page.tsx:79-86`) | Gọi API trực tiếp → **404** (`confirm/route.ts:24`, `cancel/route.ts:27`) |

RLS `read_all_active_users` mở đọc `transaction` cho mọi vai trò đang hoạt động
(`20260904090900_rls_core.sql:43`); ghi chỉ ROLE-TRADE (`20260904091100_lock_enforcement_fix.sql:33-36`).
Khớp `permissions-matrix.md` PERM007, không thấy chỗ lệch.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Lọc danh sách | không (form `method="GET"`, server render lại) | — | — | 500 nếu `businessDate` rác |
| Mở chi tiết | không (điều hướng) | — | — | 404 |
| Chốt | `POST /api/transactions/[id]/confirm` | `transaction` UPDATE (CAS `status`) + `lot` UPDATE (`available_qty`, `status='traded'`) | `transaction_confirm` — chạy **sau** khi đã ghi xong, không rollback được (QĐ-5) | 200 · 409 `NOT_DRAFT` · 422 `INELIGIBLE_PARTY` / `INSUFFICIENT_QTY` · 423 · 404 · 500 |
| Huỷ | `POST /api/transactions/[id]/cancel` | `transaction` UPDATE (CAS trên status vừa đọc, `cancel-transaction.ts:52`) + hoàn `lot.available_qty` **chỉ khi** trước đó là `confirmed` (`:71-73`) | `transaction_cancel` kèm `reason`; nhánh 423 ghi `locked_write_attempt` bằng client mới | 200 · 400 `invalid_json` · 422 `reason_required` · 409 `NOT_CANCELLABLE` · 423 · 404 · 500 |
| Đọc danh sách qua API | `GET /api/transactions` | — | — | `requireUser()` — mọi vai trò đọc được (`route.ts:134`) |

Sau khi chốt/huỷ thành công, client chỉ gọi `router.refresh()`, không điều hướng
(`confirm-cancel-button-group.tsx:49,79`).

## 7. Edge case

- **Hai người bấm Chốt cùng lúc trên cùng giao dịch** → CAS tầng 1 cho đúng một người thắng, người
  còn lại 409 `NOT_DRAFT`. Xem SC-11 mục 6.1.
- **Huỷ đua với Chốt**: `cancelTransaction` đọc status rồi ghi kèm `.eq("status", priorStatus)`; nếu
  confirm chen vào giữa thì UPDATE khớp 0 dòng → 409 `NOT_CANCELLABLE`, **không hoàn số lượng lần
  hai** (`cancel-transaction.ts:30-66`).
- **Huỷ hai lần liên tiếp** → lần 2 nhận 409, số lượng chỉ hoàn đúng một lần.
- **Huỷ nháp so với huỷ đã chốt**: nháp chưa từng bị trừ số lượng nên không hoàn; chỉ `confirmed` mới
  gọi `releaseLotQty` (`cancel-transaction.ts:68-73`).
- **Ngày lock giữa lúc đang mở màn** → nút vẫn bấm được, nhận 423 kèm audit `locked_write_attempt`
  (chỉ ở nhánh huỷ; nhánh chốt không ghi — xem SC-11 mục 7).
- **`?status=` giá trị lạ** (ví dụ `?status=deleted`) → bị bỏ im lặng, người dùng tưởng đang lọc mà
  thật ra thấy tất cả (`page.tsx:26`).
- **`?businessDate=` rác** → PostgREST lỗi → page throw → 500, không phải "0 kết quả".
- **Vượt 100 dòng** → dòng thứ 101 trở đi mất khỏi màn, không có dấu hiệu nào cảnh báo bị cắt
  (`page.tsx:29`).
- **Đọc trúng trạng thái trung gian**: giữa CAS và bù trừ của một confirm đang fail, danh sách có thể
  hiện `Đã chốt` rồi đổi lại `Nháp` khi refresh. Xem SC-11 mục 7.
- **Quyền bị thu hồi giữa phiên** → `is_active=false` làm `getCurrentUser()` trả `null` →
  `redirect('/login?reason=inactive')` ngay request kế tiếp (`require-role.ts:47,58-64`).

## 8. Dẫn chứng

- `src/app/(app)/transactions/page.tsx:13,23,26` — whitelist `STATUSES`, `requireUser`, bỏ status lạ
- `src/app/(app)/transactions/page.tsx:29-36,44-51,53` — limit 100, throw khi lỗi, join, `canAct`
- `src/app/(app)/transactions/page.tsx:60-69,73-104` — link tạo mới theo vai, form lọc GET
- `src/app/(app)/transactions/[id]/page.tsx:26,33,41,79-86` — `requireUser`, `notFound`, `canAct`,
  ẩn mục Thao tác khi `cancelled`
- `src/components/transactions/transaction-table.tsx:28-34,54-78` — ghi chú `canAct` chỉ là mirror,
  cột thao tác
- `src/components/transactions/transaction-detail-fields.tsx:26-44` — 6 field chi tiết
- `src/components/transactions/transaction-audit-history-table.tsx:18-51` — bảng lịch sử, 4 cột
- `src/components/transactions/confirm-cancel-button-group.tsx:39-48,67-75,86-88,126-127` — map i18n
  theo reason, ẩn nút khi `cancelled`, disable khi thiếu lý do
- `src/lib/transactions/reject-reasons.ts:8-26` — enum reason và key i18n
- `src/lib/transactions/cancel-transaction.ts:30-73` — CAS huỷ, hoàn số lượng có điều kiện
- `src/app/api/transactions/[id]/cancel/route.ts:9-15,27,37,46-49` — `parseReason`, 404, 422, 423
- `src/app/api/transactions/[id]/confirm/route.ts:13-18,24` — bảng mã lỗi, `requireRole`
- `src/app/api/transactions/route.ts:108-121,134` — `GET` cho mọi vai trò, limit 100
- `src/lib/transactions/txn-queries.ts:10-37` — `loadTransaction`, `loadTransactionAuditHistory`
- `supabase/migrations/20260904090300_transaction.sql:16-21` — enum status, cột confirmed/cancelled
- `supabase/migrations/20260904090500_business_day_lock.sql:42-46,61-63` — P0001 và trigger
- `docs/generated/permissions-matrix.md:316-352` — PERM007, khớp code
