# SC-11 — Tạo giao dịch 相対取引

| | |
|---|---|
| Mã thi công | SCR010_AitaiCreate |
| Route | `/transactions/new` |
| Loại | Form |
| Actor chính | Vận hành giao dịch (ROLE-TRADE) |
| FE- / FR- | FE-014, FE-015, FE-007 / FR-AITAI-01, FR-AITAI-02, FR-AITAI-03 |
| Trạng thái | Đã dựng |

> **Màn quan trọng nhất hệ thống.** 相対取引 gánh ~90% giá trị giao dịch của chợ và là landing page
> của ROLE-TRADE (`src/app/(app)/transactions/page.tsx:15-17`, `src/lib/auth/role-landing.ts:27`).
> Quy tắc CAS chống oversell khai đầy đủ ở mục 6.1 của file này; SC-12 — nơi đặt nút Chốt và Huỷ —
> dẫn về đây thay vì lặp lại.

## 1. Mục đích

Nhân viên giao dịch nhập lô hàng, người mua, số lượng và đơn giá đã thống nhất tại quầy, tạo ra một
**bản nháp** giao dịch. Bước tạo cố tình không trừ số lượng và không kiểm hiệu lực người mua — cả hai
cửa chỉ mở ở bước chốt (`src/app/api/transactions/route.ts:10-13`), vì "thời điểm giao dịch" trong
BR-PERM-01 nghĩa là lúc CHỐT, không phải lúc nhập nháp.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc — `requireUser()` nằm trong `requireRole()` (`src/lib/auth/require-role.ts:72-78`).
- Vai trò được vào: **chỉ ROLE-TRADE** (`src/app/(app)/transactions/new/page.tsx:16`).
- Mã lỗi khi thiếu quyền: **404** — `requireRole()` gọi `notFound()`, không phải 403, để không lộ sự
  tồn tại tài nguyên (`src/lib/auth/require-role.ts:75`).
- Tiền đề dữ liệu: phải có ≥ 1 `lot` với `status='published'` và `available_qty > 0`
  (`page.tsx:24-27`) và ≥ 1 `participant`. Thiếu bên nào thì form không render (mục 4).

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lô hàng | Lô hàng | ロット | select (uuid) | Có | `transaction.lot_id` → `lot.id` | Luôn có giá trị (`lots[0].id` preselect); option lọc `status='published'` AND `available_qty>0` (`page.tsx:24-27`); không có attr `required` vì select không rỗng được | String non-empty sau trim (`route.ts:24,29`) → 422 `invalid_request`; lô phải tồn tại **và** `status='published'` (`route.ts:53-61`) → 422 `lot_not_available`; FK sai `23503` → 422 (`route.ts:99-101`) | Client gộp mọi lỗi về `transactions.create.error.invalidRequest` — "Dữ liệu không hợp lệ, vui lòng kiểm tra lại các trường." |
| 2 | Người mua | Người mua (買出人) | 買出人 | select (uuid) | Có | `transaction.buyer_participant_id` → `participant.id` | Luôn có giá trị; **danh sách KHÔNG lọc hiệu lực** — `page.tsx:28` select thẳng `id, name`, người đã hết hiệu lực vẫn hiện trong dropdown. Có chủ đích: cửa hiệu lực đặt ở bước chốt | String non-empty (`route.ts:25,29`) → 422; FK `23503` → 422. **Không kiểm hiệu lực ở đây** (`route.ts:10-13`) | Như trên |
| 3 | Số lượng | Số lượng | 数量 | number (numeric 12,2) | Có | `transaction.qty` | `required`, `min=0.01`, `step=0.01` (`aitai-create-form.tsx:107-117`); **không so với `lot.available_qty`** | `typeof number` và finite và `> 0` (`route.ts:30`) → 422. DB `check (qty > 0)` (`20260904090300_transaction.sql:13`). Không chặn vượt available_qty — đúng thiết kế, bước tạo không trừ số lượng (FR-AITAI-01) | Như trên |
| 4 | Đơn giá | Đơn giá (JPY) | 単価 (JPY) | number (integer) | Có | `transaction.unit_price` | `required`, `min=1`, `step=1` (`aitai-create-form.tsx:123-133`) | `Number.isInteger` và `> 0` (`route.ts:31`) → 422. DB `integer check (unit_price > 0)`, JPY không thập phân (`transaction.sql:14`) | Như trên |
| 5 | Mã giao dịch | Mã giao dịch | 取引番号 | text unique | Server sinh | `transaction.txn_code` — dẫn xuất `TXN-{YYYYMMDD}-{NNN}`, `NNN` = số giao dịch đã có trong ngày + 1, pad 3 chữ số (`txn-code.ts:9-27`) | Không có trên form | UNIQUE ở DB là chốt cuối; trùng `23505` → retry đúng 1 lần với count mới, lần 2 vẫn trùng → throw → 500 (`route.ts:36,95-105`) | 500 `internal_error` |
| 6 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date | Server sinh | `transaction.business_date` = `todayJst()` (`route.ts:65`) | Không có trên form | **Không bao giờ nhận từ client** — luôn tính theo Asia/Tokyo (`business-date.ts:28-30`) | — |
| 7 | Trạng thái | Nháp | 下書き | text enum | Server sinh | `transaction.status` = `'draft'` (`route.ts:78`) | Không có trên form | DB `check (status in ('draft','confirmed','cancelled'))` (`transaction.sql:16`, DISC-005) | — |
| 8 | Loại | — | chưa có key JA | text hằng | Server sinh | `transaction.type` = `'aitai'` | Không có trên form | **Cột chết**: `check (type = 'aitai')` ghim đúng một literal (`transaction.sql:10`) — không còn nhánh nào để rẽ. QĐ-1: せり đi bảng `seri_result` riêng, không phải một giá trị của `type` | — |

Nhãn JA lấy từ `src/lib/i18n/dictionaries/ja/transactions.json:22-25` (field 1-4) và `:5,10,11,17`
(field 5-7). `transaction.type` không có key i18n ở cả hai locale.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | không còn lô hàng hoặc không có người tham gia nào | `EmptyState` với `transactions.create.noLots` — "Không có lô hàng đã công bố nào còn số lượng khả dụng để tạo giao dịch." Form biến mất hoàn toàn (`aitai-create-form.tsx:61-63`) | Không |
| đang tải | — | **chưa có — đề xuất**: không có `loading.tsx` nào trong `src/app` (tìm cả cây). Server Component render đồng bộ, người dùng thấy trang trắng khi chờ query. Đề xuất Suspense + skeleton | — |
| lỗi tải | query `lot`/`participant` lỗi | **chưa có — đề xuất**: `page.tsx:21-29` chỉ destructuring `data`, **bỏ `error`** → lỗi truy vấn thành `lots ?? []` và hiện y như "rỗng". Người dùng không phân biệt được "hết lô hàng" với "DB lỗi" | Không |
| không có quyền | `role !== 'ROLE-TRADE'` | Trang 404 của Next (`require-role.ts:75`) | Không |
| đang gửi | `submitting === true` | Mọi input/select `disabled`, nút `aria-busy` + nhãn "Đang tạo..." (`aitai-create-form.tsx:28,142-146`) | Không — guard `if (submitting) return` ở đầu handler (dòng 33) |
| gửi lỗi | `!response.ok` | `<p role="alert">` với một message duy nhất `transactions.create.error.invalidRequest`. **Mất phân biệt**: 422 `lot_not_available`, 422 `invalid_request`, 400 `invalid_json`, 500 đều ra cùng một câu (`aitai-create-form.tsx:49-53`) | Sửa rồi gửi lại |
| gửi lỗi mạng | `fetch` throw | `transactions.create.error.network` — "Có lỗi xảy ra, vui lòng thử lại." (`aitai-create-form.tsx:55-57`) | Gửi lại |
| **read-only vì ngày đã lock** | `business_day_lock` có dòng cho `todayJst()` | **Màn này KHÔNG chặn.** `trg_block_after_lock` là `before update or delete`, **không bao giờ INSERT** (`20260904090500_business_day_lock.sql:61-63`), và route không tra `business_day_lock` trước khi insert → vẫn tạo được nháp trên ngày đã lock. Mã **423** chỉ xuất hiện ở bước **chốt** và **huỷ** (mục 6). **chưa có — đề xuất**: chặn ngay đầu route bằng 423 để không sinh nháp không chốt được | Tạo được nháp, nhưng chốt sẽ 423 |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-TRADE | ✓ | 1-4 (5-8 server sinh) | Tạo nháp · Chốt · Huỷ | 422 / 409 / 423 / 500 tuỳ cửa |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-SETTLEMENT, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✗ | — | — | **404** ở cả trang (`page.tsx:16`) và API (`route.ts:124`) |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601,
`20260904090900_rls_core.sql:43,45`). `judge@` mở `/transactions` vẫn thấy đủ dữ liệu như `trade@`.
Chặn nằm ở **ghi** (policy `write_trade` insert, `20260904091000_rls_ops.sql:7-8`) và ở **vào trang**
(`requireRole`), không ở đọc.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tạo nháp | `POST /api/transactions` | `transaction` INSERT (`status='draft'`) | `action='create'`, entity `transaction`, `after` = cả dòng vừa insert (`route.ts:84-91`) | 201 · 400 `invalid_json` · 422 `invalid_request` / `lot_not_available` · 404 sai vai · 500 |
| Chốt (nút ở SC-12) | `POST /api/transactions/[id]/confirm` | `transaction` UPDATE + `lot` UPDATE (`available_qty`, `status='traded'`) | `action='transaction_confirm'`, `before={status:'draft'}` (`confirm-transaction.ts:93-100`) | 200 · 409 `NOT_DRAFT` · 422 `INELIGIBLE_PARTY` / `INSUFFICIENT_QTY` · 423 `LOCKED_BUSINESS_DATE` · 404 · 500 |
| Huỷ (nút ở SC-12) | `POST /api/transactions/[id]/cancel` | `transaction` UPDATE (+ hoàn `lot.available_qty` nếu trước đó `confirmed`) | `action='transaction_cancel'` kèm `reason`; nếu 423 thì ghi `action='locked_write_attempt'` bằng client mới (`handle-locked-write.ts:31-40`) | 200 · 400 · 422 `reason_required` · 409 `NOT_CANCELLABLE` · 423 · 404 · 500 |

`writeAuditLog()` chạy **sau khi** nghiệp vụ đã commit và không rollback được (QĐ-5,
`write-audit-log.ts:44-50`) — audit lỗi thì nghiệp vụ vẫn đã xảy ra, route trả 500 nhưng dữ liệu đã
ghi. Đây là task riêng cho LAB-5, không phải chi tiết cài đặt.

### 6.1 CAS chống oversell — quy tắc lõi

Không có DB transaction xuyên bảng: PostgREST không cấp `BEGIN/COMMIT` và không có
`SELECT ... FOR UPDATE`, nên `confirm-transaction.ts:23-41` thay bằng **hai tầng compare-and-swap**.

**Tầng 1 — CAS trên `transaction.status`** (`confirm-transaction.ts:47-53`):

```
UPDATE transaction SET status='confirmed', confirmed_by=:actor, confirmed_at=now()
 WHERE id = :id AND status = 'draft'        -- điều kiện CAS
```

- **Thắng race**: trả về đúng 1 dòng, đi tiếp hai cửa dưới.
- **Thua race**: 0 dòng → `NOT_DRAFT` → **409**, không chạm tới `lot` lần nào
  (`confirm-transaction.ts:61-68`). Hai request chốt cùng lúc trên cùng giao dịch thì đúng một
  request đi tiếp; double-click rơi vào đúng nhánh này.
- **Vì sao CAS đứng TRƯỚC hai cửa**: chạy cửa trước rồi CAS sau thì hai request đồng thời cùng qua
  cửa trước khi bên nào kịp đổi status — đúng lỗi trừ hai lần.

**Tầng 2 — CAS trên `lot.available_qty`** (`availability-service.ts:57-77`):

```
đọc current = lot.available_qty
nếu current < qty  → return false → INSUFFICIENT_QTY → 422
UPDATE lot SET available_qty = current - qty
 WHERE id = :lot AND available_qty = current   -- điều kiện CAS
0 dòng → đọc lại và thử lại, tối đa MAX_CAS_ATTEMPTS = 25 (dòng 31)
```

- **Thắng race**: 1 dòng, `qtyReserved = true`, rồi đổi `lot.status='traded'`.
- **Thua race**: 0 dòng → đọc lại giá trị mới rồi thử lại. Hai request chốt trên cùng lô mà tổng qty
  vượt số khả dụng thì chỉ đúng số request vừa số lượng ban đầu chốt được, phần còn lại nhận 422
  `INSUFFICIENT_QTY`. `available_qty` không bao giờ âm; `check (available_qty >= 0)`
  (`20260904090200_lot.sql:11`) là lớp chắn thứ hai.
- **Hết 25 lần thử**: throw → 500 (`availability-service.ts:76`). Không có backoff.

**Cửa hiệu lực người mua** nằm giữa hai tầng (`confirm-transaction.ts:72`) — đánh giá theo
`todayJst()`, tức **thời điểm chốt**, không phải `transaction.business_date`, nên một nháp tạo hôm
qua chốt hôm nay vẫn phải hợp lệ theo hôm nay. Không hiệu lực → `INELIGIBLE_PARTY` → **422**.

**Bù trừ khi cửa fail**: `revertToDraft()` ghi status về `draft` và xoá `confirmed_by/confirmed_at`
(`confirm-transaction.ts:13-21`). Nếu đã trừ số lượng rồi mới lỗi bất ngờ thì `releaseLotQty()` hoàn
lại trước rồi mới revert (`:108-112`). Không có rollback tự động — đây là bù trừ best-effort.

**Lệch với spec LAB-3**: `technical-spec.md:135-137` khai `INELIGIBLE_PARTY` và `INSUFFICIENT_QTY` là
**409**; code trả **422** (`confirm/route.ts:13-18`). Tin code. `permissions-matrix.md:346` khớp với
code (409 chỉ dành cho sai trạng thái).

## 7. Edge case

- **Hai request chốt cùng lô, tổng qty vượt available_qty** → chỉ đúng số request vừa số lượng thành
  công, còn lại 422 `INSUFFICIENT_QTY`. Xem 6.1 tầng 2.
- **Double-submit trên cùng giao dịch** → lần 2 nhận 409 `NOT_DRAFT` từ CAS tầng 1. Client còn
  disable nút trong lúc chờ (`confirm-cancel-button-group.tsx:33-34`) nhưng đó chỉ là lớp UI.
- **Người mua mất hiệu lực GIỮA phiên** — còn hiệu lực lúc tạo nháp, hết hiệu lực lúc bấm Chốt → 422
  `INELIGIBLE_PARTY`, giao dịch bị `revertToDraft` về `draft`, không bị trừ số lượng. Dropdown ở mục
  3 field 2 không lọc hiệu lực nên tình huống này đến từ luồng bình thường, không phải lỗi nhập.
- **Trạng thái trung gian nhìn thấy được**: giữa CAS tầng 1 và lúc bù trừ, mọi reader khác đọc ra
  `confirmed` (RLS cho đọc hết). Cửa sổ ngắn nhưng thật — SC-12 và SC-18 có thể đọc trúng.
- **Ngày bị lock GIỮA lúc chốt** (SC-18 lock song song): CAS tầng 1 trúng P0001 → 423 sạch. Nhưng nếu
  lock xảy ra **sau** CAS và trước `revertToDraft`, chính `revertToDraft` trúng P0001 và throw
  (`confirm-transaction.ts:18-20`) → 500, dòng đứng lại ở `confirmed` dù cửa đã fail. Cửa sổ rất hẹp,
  chưa có xử lý — đề xuất task riêng cho LAB-5.
- **423 ở chốt không ghi audit**, khác với huỷ: cancel gọi `respondLockedWrite()` để ghi
  `locked_write_attempt` (`cancel/route.ts:46-48`), confirm chỉ trả 423 trần
  (`confirm/route.ts:34-37`). Lệch nhìn thấy được, nên khai.
- **Tạo nháp trên ngày đã lock** vẫn thành công (mục 4) rồi chốt mới 423 — sinh ra nháp mồ côi.
- **`txn_code` trùng** khi hai nhân viên tạo cùng lúc: `nextTxnSeq` đếm rồi cộng 1, không phải
  sequence → UNIQUE bắt `23505`, retry đúng 1 lần; ba người cùng lúc thì người thứ ba có thể nhận 500
  (`route.ts:36,68,105`).
- **Quyền bị thu hồi giữa phiên**: `getCurrentUser()` đọc lại `app_user` mỗi request và fail closed
  khi `is_active=false` (`require-role.ts:47`) → request kế tiếp nhận 404, không cần logout.

## 8. Dẫn chứng

- `src/app/(app)/transactions/new/page.tsx:16` — `requireRole(["ROLE-TRADE"])`, cửa vào màn
- `src/app/(app)/transactions/new/page.tsx:21-29` — query lot/participant, bỏ `error`
- `src/app/api/transactions/route.ts:21-34` — `parseCreateBody`, validation server
- `src/app/api/transactions/route.ts:53-61` — cửa `lot.status='published'` → 422
- `src/app/api/transactions/route.ts:65,78,84-91` — `todayJst()`, `status='draft'`, audit
- `src/app/api/transactions/route.ts:95-105,124` — retry `23505`, `requireRole`
- `src/lib/transactions/confirm-transaction.ts:23-41` — lý do CAS phải đứng trước hai cửa
- `src/lib/transactions/confirm-transaction.ts:47-53,61-68` — CAS tầng 1 và nhánh thua race
- `src/lib/transactions/confirm-transaction.ts:72-83,93-112` — cửa hiệu lực, trừ số lượng, bù trừ
- `src/lib/lots/availability-service.ts:31,57-77` — CAS tầng 2, `MAX_CAS_ATTEMPTS=25`
- `src/app/api/transactions/[id]/confirm/route.ts:13-18` — bảng mã lỗi 409/422/422/423
- `src/app/api/transactions/[id]/cancel/route.ts:37,46-49` — `reason_required`, 423, 409
- `src/lib/reconciliation/handle-locked-write.ts:31-41` — audit `locked_write_attempt` + 423
- `src/components/transactions/aitai-create-form.tsx:49-63,107-133` — validation client, EmptyState
- `supabase/migrations/20260904090300_transaction.sql:7-23` — DDL, `check (type='aitai')`
- `supabase/migrations/20260904090500_business_day_lock.sql:37-49,61-63` — P0001, trigger chỉ
  `before update or delete`
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:33-36` — RLS chỉ còn kiểm vai, lock để
  trigger lo
- `src/lib/auth/require-role.ts:72-78` — `notFound()` → 404 thay vì 403
