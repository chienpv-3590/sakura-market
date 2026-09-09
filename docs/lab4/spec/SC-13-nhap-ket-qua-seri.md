# SC-13 — Nhập kết quả せり

| | |
|---|---|
| Mã thi công | SCR013_SeriEntry |
| Route | `/seri/new` |
| Loại | Form |
| Actor chính | Người điều hành đấu giá (thi công gán cho ROLE-TRADE) |
| FE- / FR- | FE-018 / FR-SERI-01, FR-SERI-02 |
| Trạng thái | Đã dựng |

> **QĐ-1: `seri_result` là bảng RIÊNG.** せり không phải một giá trị của `transaction.type` — cột đó
> có `check (type = 'aitai')` ghim đúng một literal (`20260904090300_transaction.sql:10`), là cột
> chết. Màn này ghi vào `public.seri_result`, đi đường dữ liệu hoàn toàn tách khỏi `transaction`.

## 1. Mục đích

Sau khi một lô hàng đấu giá xong, người vận hành **nhập tay kết quả cuối cùng**: ai thắng, số lượng,
đơn giá, thời điểm quyết định, ai xác nhận. **Không OCR, không nhận dạng ký hiệu tay 手やり** —
SCOPE-OUT-02 và FR-SERI-01 cấm thẳng, form không có `input[type=file]` nào
(`src/components/seri/seri-entry-form.tsx:40-43`).

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc.
- Vai trò được vào: **chỉ ROLE-TRADE** (`src/app/(app)/seri/new/page.tsx:16`). Thi công gán せり cho
  cùng vai với 相対取引, không tách vai "người điều hành đấu giá" riêng.
- Mã lỗi khi thiếu quyền: **404** — `requireRole()` gọi `notFound()` (`require-role.ts:75`),
  không phải 403.
- Tiền đề dữ liệu: phải còn lô hàng **chưa có** bản ghi せり. Dropdown loại bỏ mọi `lot_id` đã xuất
  hiện trong `seri_result` (`page.tsx:28-31`); lọc này chạy ở tầng app, không có UNIQUE ở DB.

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Lô hàng | Lô hàng | ロット | select (uuid) | Có | `seri_result.lot_id` → `lot.id` | Luôn có giá trị (`lots[0].id`); option = mọi `lot` **trừ** những lô đã có `seri_result` (`page.tsx:22-31`). **Không lọc theo `lot.status`** — khác SC-11 vốn chỉ nhận `published` | String non-empty sau trim (`seri-results/route.ts:26,33`) → 422 `invalid_request`; lô phải tồn tại → không thì **404 `lot_not_found`** (`:55-61`). **Không kiểm `lot.status`**, không kiểm `available_qty`, **không trừ số lượng** | Client hiện `seri.create.error.invalidRequest` — "Dữ liệu không hợp lệ, vui lòng kiểm tra lại các trường." |
| 2 | Người thắng | Người thắng | 落札者 | select (uuid) | Có | `seri_result.winner_participant_id` → `participant.id` | Luôn có giá trị; danh sách **không lọc hiệu lực** (`page.tsx:24`) | String non-empty (`route.ts:27,33`) → 422; FK `23503` → 422 (`:80`). **Không gọi `checkParticipantEligibility` ở bất kỳ đâu trong luồng せり** — khác hẳn SC-11 | **chưa có — đề xuất**: thêm cửa hiệu lực người thắng, hoặc khai rõ trong ADR rằng せり cố tình không kiểm |
| 3 | Số lượng | Số lượng | 数量 | number (numeric 12,2) | Có | `seri_result.qty` | `required`, `min=0.01`, `step=0.01` (`seri-form-fields.tsx:70-80`) | `typeof number` và finite và `> 0` (`route.ts:35`) → 422. DB `check (qty > 0)` (`transaction.sql:35`) | Như field 1 |
| 4 | Đơn giá | Đơn giá (JPY) | 単価 (JPY) | number (integer) | Có | `seri_result.unit_price` | `required`, `min=1`, `step=1` (`seri-form-fields.tsx:86-96`) | `Number.isInteger` và `> 0` (`route.ts:35`) → 422. DB `integer check (unit_price > 0)` (`transaction.sql:36`) | Như field 1 |
| 5 | Thời điểm quyết định | Thời điểm quyết định | 決定時刻 | datetime-local → timestamptz | Có | `seri_result.decided_at` | `required` (`seri-form-fields.tsx:102-110`); mặc định là "bây giờ" theo giờ trình duyệt (`seri-entry-form.tsx:55-57`); **không có min/max** | Parse `new Date(...)`, `NaN` → 422; rỗng thì lấy `new Date()` server (`route.ts:37-38`). **Không chặn thời điểm tương lai, không chặn ngày quá khứ xa** | **chưa có — đề xuất**: chặn `decided_at` ở tương lai và ràng buộc cùng ngày nghiệp vụ |
| 6 | Người xác nhận | Người xác nhận | 確認者 | select (uuid) | Có | `seri_result.confirmed_by` → `app_user.id` | Mặc định là người đang đăng nhập; option = mọi `app_user` có `is_active=true` (`page.tsx:25,44-45`). Là FK thật, không phải text tự do | String non-empty (`route.ts:28,33`) → 422; FK `23503` → 422 | Như field 1 |
| 7 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date | Server sinh | `seri_result.business_date` = `todayJst()` (`route.ts:75`) | Không có trên form | **Không nhận từ client.** Denormalize theo QĐ-2 để trigger lock đọc trực tiếp, không JOIN (`transaction.sql:39`). Lưu ý: `business_date` bám **ngày gửi form**, không bám `decided_at` — nhập kết quả hôm qua vào hôm nay thì rơi vào ngày nghiệp vụ hôm nay | — |

Nhãn JA lấy từ `src/lib/i18n/dictionaries/ja/transactions.json:82-87`; `business_date` dùng key
`transactions.list.columns.businessDate` (`:10`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | mọi lô hàng đều đã có `seri_result` → `availableLots` rỗng | **chưa có — đề xuất**: form vẫn render với select lô hàng **không có option nào**, `lotId` là chuỗi rỗng, bấm Lưu → 422. Khác SC-11 vốn có nhánh `EmptyState` (`aitai-create-form.tsx:61-63`); `SeriEntryForm` không có nhánh đó | Bấm được nhưng chắc chắn lỗi |
| đang tải | — | **chưa có — đề xuất**: không có `loading.tsx` nào trong `src/app` | — |
| lỗi tải | query lot/participant/app_user lỗi | **chưa có — đề xuất**: `page.tsx:21-26` chỉ destructuring `data`, bỏ `error` → lỗi thành danh sách rỗng, im lặng | Không |
| không có quyền | `role !== 'ROLE-TRADE'` | Trang 404 (`page.tsx:16`) | Không |
| đang gửi | `submitting === true` | Mọi field `disabled`, nút `aria-busy` + "Đang lưu..." (`seri-entry-form.tsx:62,160,184-195`) | Không — guard `if (submitting) return` (dòng 68) |
| trùng bản ghi | lô đã có `seri_result` | 409 `already_recorded` → client hiện `seri.create.error.duplicate` — "Lô hàng này đã có kết quả せり. Vui lòng chỉnh sửa thay vì tạo mới." (`route.ts:63-66`, `seri-entry-form.tsx:90`) | Chuyển sang SC-14 để sửa |
| gửi lỗi | `!response.ok` và không phải 409 | Một message duy nhất `seri.create.error.invalidRequest`; 404 `lot_not_found` và 422 và 500 đều ra cùng câu (`seri-entry-form.tsx:89-93`) | Sửa rồi gửi lại |
| gửi lỗi mạng | `fetch` throw | `seri.create.error.network` (`seri-entry-form.tsx:119-122`) | Gửi lại |
| **read-only vì ngày đã lock** | `business_day_lock` có dòng cho `todayJst()` | **Màn này KHÔNG chặn.** `trg_block_after_lock` trên `seri_result` là `before update or delete`, **không bao giờ INSERT** (`business_day_lock.sql:65-67`), và route không tra `business_day_lock` → vẫn ghi được bản ghi mới vào ngày đã lock. Mã **423** chỉ xuất hiện khi **SỬA** ở SC-14 (`seri-results/[id]/route.ts:101`). **chưa có — đề xuất**: chặn INSERT trên ngày đã lock bằng 423, hoặc khai rõ đây là quyết định có chủ đích | Ghi được, nhưng sửa lại thì 423 |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-TRADE | ✓ | 1-6 (7 server sinh) | Lưu kết quả せり | 422 dữ liệu sai · 404 lô không tồn tại · 409 đã có bản ghi · 500 |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-SETTLEMENT, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | ✗ | — | — | **404** ở cả trang (`page.tsx:16`) và API (`route.ts:112`) |

Chú ý ROLE-SETTLEMENT: **không tạo được** bản ghi mới nhưng **sửa được** bản ghi đã có (SC-14). Đó là
allowlist 2 vai có chủ đích, khớp policy `write_trade_settlement_update`
(`20260904091100_lock_enforcement_fix.sql:38-41`) và `permissions-matrix.md` PERM008/PERM009.

**Lưu ý về đọc:** RLS `read_all_active_users` mở đọc `seri_result` cho mọi vai trò đang hoạt động
(`20260904090900_rls_core.sql:45`, FR-601). `judge@` không vào được `/seri/new` nhưng vẫn đọc hết dữ
liệu せり qua `/seri` và `GET /api/seri-results`. Chặn là ở **ghi** và ở **vào trang**.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Lưu kết quả せり | `POST /api/seri-results` | `seri_result` INSERT | `action='create'`, entity `seri_result`, `after` = cả dòng vừa insert (`route.ts:84-91`) | 201 · 400 `invalid_json` · 404 `lot_not_found` · 409 `already_recorded` · 422 `invalid_request` · 404 sai vai · 500 |
| Sau khi lưu | — | — | — | `router.push('/seri/{id}')` sang SC-14 chi tiết (`seri-entry-form.tsx:94`) |

Không có hành động nào của màn này chạm tới `lot.available_qty` — **luồng せり không trừ số lượng**,
khác hẳn SC-11. Nếu một lô vừa bán 相対 vừa ghi せり thì hai con số đứng độc lập, không ai đối chiếu.
**chưa có — đề xuất**: khai giả định này thành ADR hoặc bổ sung ràng buộc.

`writeAuditLog()` chạy **sau** khi INSERT đã commit, không rollback được (QĐ-5,
`write-audit-log.ts:44-50`) — audit lỗi thì bản ghi せり vẫn tồn tại dù route trả 500.

## 7. Edge case

- **Hai người nhập kết quả cho cùng một lô gần như đồng thời** → cửa duy nhất là
  `findSeriResultByLot()` đọc trước rồi mới INSERT (`route.ts:63-66`, `seri-queries.ts:50-59`).
  **Không có CAS, không có UNIQUE `(lot_id)` ở DB** → khoảng hở TOCTOU thật: cả hai đều đọc thấy
  "chưa có" rồi cả hai đều INSERT thành công, lô hàng có **hai** bản ghi せり. `technical-spec.md:123`
  của LAB-3 đã ghi đây là câu hỏi bỏ ngỏ và thi công cũng chưa chốt. **Đề xuất cho LAB-5**: thêm
  `unique (lot_id)` trên `seri_result` — task riêng, có migration.
- **Người thắng đã mất hiệu lực** → vẫn ghi được, không có cửa nào chặn (mục 3 field 2).
- **Ghi kết quả せり trên ngày đã lock** → INSERT thành công vì trigger không bắt INSERT (mục 4); bản
  ghi vừa tạo lập tức thành read-only, sửa lại sẽ 423.
- **`decided_at` lệch ngày nghiệp vụ** → `business_date` lấy theo `todayJst()` lúc gửi form, không
  theo `decided_at`. Nhập bù kết quả hôm qua thì bản ghi rơi vào ngày hôm nay và vào đúng kỳ đối
  chiếu hôm nay (SC-18). Đây là hệ quả thật của `route.ts:75`, không phải bug hiển thị.
- **`decided_at` ở tương lai** → không bị chặn (mục 3 field 5).
- **Không còn lô nào để chọn** → form vẫn render với select rỗng rồi 422 (mục 4).
- **Quyền bị thu hồi giữa phiên** → `getCurrentUser()` đọc lại `app_user` mỗi request, `is_active=false`
  → 404 ngay request kế tiếp (`require-role.ts:47`).
- **Không có OCR nào để đua** — SCOPE-OUT-02. Nếu LAB-5 thấy đề xuất "tự nhận dạng 手やり" thì đó là
  mở rộng phạm vi, không phải hoàn thiện màn này.

## 8. Dẫn chứng

- `src/app/(app)/seri/new/page.tsx:16` — `requireRole(["ROLE-TRADE"])`, cửa vào màn
- `src/app/(app)/seri/new/page.tsx:21-31` — 4 query song song, lọc lô đã có bản ghi, bỏ `error`
- `src/app/(app)/seri/new/page.tsx:44-45` — option người xác nhận, mặc định người đang đăng nhập
- `src/app/api/seri-results/route.ts:10-13` — ghi chú "no OCR, no image recognition" (SCOPE-OUT-02)
- `src/app/api/seri-results/route.ts:23-41` — `parseCreateBody`, validation server đủ 6 field
- `src/app/api/seri-results/route.ts:55-66` — 404 `lot_not_found`, 409 `already_recorded`
- `src/app/api/seri-results/route.ts:75,84-91,112` — `todayJst()`, audit `create`, `requireRole`
- `src/lib/seri/seri-queries.ts:45-59` — `findSeriResultByLot`, ghi chú "app-level rule, not a DB
  unique constraint"
- `src/components/seri/seri-entry-form.tsx:40-43` — cấm field file, dùng chung cho create và edit
- `src/components/seri/seri-entry-form.tsx:55-57,89-94,119-122` — mặc định `decided_at`, map 409,
  điều hướng sau khi lưu
- `src/components/seri/seri-form-fields.tsx:70-96,102-110,116-128` — validation client 5 field
- `supabase/migrations/20260904090300_transaction.sql:10` — `check (type='aitai')`, cột chết (QĐ-1)
- `supabase/migrations/20260904090300_transaction.sql:31-47` — DDL `seri_result`, QĐ-2 denormalize
- `supabase/migrations/20260904090500_business_day_lock.sql:65-67` — trigger trên `seri_result` chỉ
  `before update or delete`
- `supabase/migrations/20260904091000_rls_ops.sql:15-16` — policy insert `write_trade`
- `supabase/migrations/20260904090900_rls_core.sql:45` — đọc mở cho mọi vai trò đang hoạt động
- `docs/generated/permissions-matrix.md:355-390` — PERM008, khớp code
