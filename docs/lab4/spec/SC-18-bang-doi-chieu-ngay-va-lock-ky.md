# SC-18 — Bảng đối chiếu ngày và lock kỳ

| | |
|---|---|
| Mã thi công | SCR018_ReconcileAndLock |
| Route | `/reconciliation` |
| Loại | Detail |
| Actor chính | Bộ phận đối chiếu (ROLE-SETTLEMENT) |
| FE- / FR- | FE-024, FE-025, FE-026 / FR-001, FR-101, FR-201, FR-401, FR-402, FR-601, BR-001, BR-002 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Trung tâm của hệ thống. ROLE-SETTLEMENT xem toàn bộ giao dịch 相対取引, kết quả せり và các lần
giao của một ngày nghiệp vụ gộp thành một bảng, đối chiếu số lượng đặt với số lượng đã giao lũy
kế, rồi **lock** ngày đó để chốt chính thức. Theo khung giờ vận hành RFP §02-07, đây là màn của
đoạn 08:00–10:00 (chốt và xuất); đoạn 05:00–08:00 dùng nó ở chế độ đối chiếu tạm.

> **Lock là một chiều.** Không có endpoint unlock nào trong toàn bộ codebase — không cho
> ROLE-SYS-ADMIN, không cho service_role, không có gì. Lock rồi là không sửa được nữa; muốn sửa
> phải đi đường điều chỉnh `correction_request` + maker-checker (SC-20/SC-21).

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc. `requireUser()` → không session / `is_active = false` thì redirect
  `/login?reason=inactive`.
- Vai trò được vào: cả 7. Trang **không** gọi `requireRole()` — FR-601 cho vai trò khác xem bảng
  ở chế độ chỉ đọc. Chặn nằm ở **nút lock**, không ở cửa.
- Mã lỗi khi thiếu quyền: **404** khi gọi `POST /api/reconciliation/{date}/lock` bằng vai trò
  khác (`requireRole()` → `notFound()`; có chủ đích, không lộ sự tồn tại tài nguyên).
- Tiền đề dữ liệu: không có. Ngày không có hàng nào thì bảng ra empty state, và **vẫn lock được** —
  xem mục 7.

## 3. Bảng field

### 3.A Chọn ngày và trạng thái lock

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `date` | Ngày nghiệp vụ | 業務日 | date `YYYY-MM-DD` | Không (mặc định `todayJst()`) | chỉ UI → tham số query `?date=` | `<input type="date" max={todayJst()}>` — chặn chọn ngày tương lai qua widget | `isValidBusinessDate()`: đúng `^\d{4}-\d{2}-\d{2}$`, là ngày thật (kiểm quay vòng qua `Date.UTC`), và `<= todayJst()`. Ở **trang**: sai thì **âm thầm rơi về `todayJst()`**. Ở **API**: sai thì **400** `invalid_business_date` | Không có thông báo ở trang — người dùng không biết mình bị đổi ngày. **chưa có — đề xuất** |
| 2 | Trạng thái lock | Đã lock / Chưa lock | ロック済み / 未ロック | boolean + timestamp | — | `business_day_lock` có hàng cho `business_date` hay không; `locked_at` | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 3 | Thời điểm lock | — (nối sau nhãn "Đã lock") | — | timestamptz | — | `business_day_lock.locked_at` (`default now()`) | render qua `toLocaleString()` — theo múi giờ **của trình duyệt**, không phải JST | không áp dụng (chỉ đọc) | — |
| 4 | `locked_by` | **chưa có — đề xuất** | **chưa có key JA** | uuid | — | `business_day_lock.locked_by` — API trả về trong `lock.lockedBy` nhưng UI **không hiển thị** | không áp dụng | không áp dụng | — |

### 3.B Bảng đối chiếu — nguồn là view `reconciliation_line`

Toàn bộ 5 cột là **chỉ đọc**; validation client và server không áp dụng cho cả 5.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Nguồn |
|---|---|---|---|---|---|
| 5 | Nguồn | Nguồn — `相対取引 (Thỏa thuận)` / `せり (Đấu giá)` / `Giao hàng` | 区分 — `相対取引` / `せり` / `配送` | text | `reconciliation_line.source_type`, dẫn xuất từ `union all` 3 nhánh |
| 6 | Số lượng | Số lượng | 数量 | numeric(12,2) | `transaction.qty` · `seri_result.qty` · `delivery_shipment.qty` tuỳ nhánh |
| 7 | Thành tiền (JPY) | Thành tiền (JPY) | 金額 (JPY) | integer, nullable | dẫn xuất `(qty * unit_price)::integer`. Nhánh `delivery` là `null` → hiện `—` |
| 8 | Chênh lệch | Chênh lệch | 差異 | numeric, nullable | dẫn xuất **chỉ cho nhánh `aitai`**: `t.qty - coalesce(sum(ds.qty), 0)` = số lượng đặt trừ lũy kế đã giao. Nhánh `seri` và `delivery` là `null` → hiện `—` |
| 9 | Truy vết | Xem giao hàng | 配送を見る | button | dẫn xuất — chỉ render khi `source_type == 'aitai'` và có `source_id` |

**Về view:** `reconciliation_line` là **view tính khi gọi, không phải bảng vật lý** — không nhân
bản dữ liệu `transaction` / `seri_result` / `delivery_shipment`. Nó `union all` 3 nhánh, dựng với
`security_invoker = true` nên chạy bằng RLS **của người gọi**, không của chủ view. Nhánh `aitai`
loại giao dịch `status = 'cancelled'`; hai nhánh kia không có điều kiện loại nào.

### 3.C Hộp xác nhận lock — hành động không thể hoàn tác

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 10 | Nút mở hộp | Lock ngày nghiệp vụ | 業務日をロック | button `danger` | — | chỉ UI — chỉ render khi `role == 'ROLE-SETTLEMENT' && !lock.locked` | mở hộp, chưa gọi API | — | — |
| 11 | Cảnh báo | "Hành động này không thể hoàn tác" + "Sau khi lock, mọi bản ghi thuộc ngày nghiệp vụ này chỉ có thể sửa qua yêu cầu điều chỉnh. Không có cách nào để mở lock lại." | 「この操作は取り消せません」+「ロック後、この業務日の記録は修正依頼を通じてのみ変更できます。ロック解除の方法はありません。」 | text | — | i18n | không áp dụng | không áp dụng | — |
| 12 | Gõ lại ngày | Gõ lại "{date}" để xác nhận | 確認のため「{date}」を再入力してください | text | **Có** | chỉ UI | `typed.trim() === businessDate` mới bật nút xác nhận — bước xác nhận tách rời khỏi thao tác xem bảng, đúng FR-401 | **chưa có — đề xuất**: server **không** nhận và không kiểm chuỗi gõ lại; ai gọi thẳng API là lock được ngay bằng một request | Không có |
| 13 | Nút xác nhận | Xác nhận lock | ロックを確定 | button `danger` | — | — | `disabled` khi `pending || !canConfirm`, có `aria-busy` | `requireRole(['ROLE-SETTLEMENT'])` → 404; `isValidBusinessDate()` → 400 | "Có lỗi xảy ra, vui lòng thử lại." — **một thông báo duy nhất cho mọi mã lỗi**, xem mục 7 |
| 14 | Nút hủy | Hủy | キャンセル | button | — | — | đóng hộp, không gọi API | — | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| Chưa lock, có dữ liệu | `!lock.locked`, `lines.length > 0` | Bảng + dòng "Chưa lock" + nút lock (nếu đúng vai trò) | Đổi ngày · truy vết · lock |
| Chưa lock, rỗng | `!lock.locked`, `lines.length == 0` | `EmptyState` "Chưa có giao dịch nào cho ngày nghiệp vụ này." + nút lock **vẫn hiện** | Đổi ngày · lock (ngày rỗng) |
| **Đã lock — read-only vì ngày đã lock** | `business_day_lock` có hàng cho ngày đang xem | Dòng "Đã lock — {thời điểm}". Nút lock và `HandoffCaption` **cùng biến mất**. Bảng vẫn hiện đủ (đọc không bị chặn — FR-601) | Chỉ xem và truy vết. Mọi ghi vào `transaction` / `seri_result` / `mekiki_record` / `delivery_shipment` của ngày đó bị `trg_block_after_lock` chặn với `P0001`, route dịch thành **423**. Đường sửa duy nhất còn lại: `correction_request` + maker-checker (SC-20/SC-21) |
| Đang mở hộp xác nhận | `open == true` | Hộp cảnh báo đỏ + input gõ lại ngày | Xác nhận (khi gõ đúng) · hủy |
| Đang gửi lock | `pending == true` | Hai nút `disabled`, `aria-busy`, input `disabled` | Không |
| Gửi lock lỗi | Response không `ok` | `<p role="alert">` "Có lỗi xảy ra, vui lòng thử lại." | Thử lại |
| Đang tải bảng | Server Component render trên server | **chưa có — đề xuất**: không có `loading.tsx` | Không |
| Lỗi tải bảng | `loadReconciliationLines()` / `loadLockStatus()` throw | **chưa có — đề xuất**: không có `error.tsx`; API trả `500 internal_error` | Tải lại |
| Đang tải truy vết | Đang gọi `GET /api/deliveries/by-transaction/{id}` | Hàng phụ hiện "Đang tải..." | Không |
| Truy vết rỗng / lỗi | Trả `[]`, hoặc fetch throw | Hàng phụ hiện "Chưa có lần giao nào cho giao dịch này." — **lỗi mạng và không có dữ liệu hiện giống nhau** | Đóng/mở lại |
| Không có quyền lock | Vai trò khác ROLE-SETTLEMENT và ngày chưa lock | `HandoffCaption` nói rõ hành động thuộc ROLE-SETTLEMENT | Chỉ xem |
| Ngoài khung giờ 08:00–10:00 | — | **chưa có — đề xuất**: không có kiểm khung giờ nào trong code. RFP §02-07 là ràng buộc vận hành thật nhưng chưa thành ràng buộc kỹ thuật | Lock được bất kỳ giờ nào |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | ✓ (landing page) | Đủ 14 | Đổi ngày · truy vết · **lock** | 409 `ALREADY_LOCKED` nếu lock hai lần · 400 nếu ngày sai |
| ROLE-TRADE · ROLE-DELIVERY · ROLE-INTAKE · ROLE-JUDGE · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | ✓ | Field 1–9 (hộp lock không render) | Đổi ngày · truy vết | **404** khi gọi thẳng route lock |

RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) — không vai trò nào
bị chặn đọc bảng đối chiếu. Chặn nằm ở **ghi** (`business_day_lock` chỉ ROLE-SETTLEMENT insert) và
ở **vào trang** (không áp dụng cho màn này). `permissions-matrix.md` PERM012 khai giống code.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Đổi ngày | Không — form `GET` về chính route | Không ghi | Không | Không (ngày sai rơi về hôm nay, im lặng) |
| Xem bảng | `GET /api/reconciliation/{date}` — `requireUser()` | Không ghi | Không | 400 `invalid_business_date` · 500 |
| Truy vết lần giao | `GET /api/deliveries/by-transaction/{transactionId}` — `requireUser()` | Không ghi | Không | 500 (UI hiển thị như rỗng) |
| **Lock ngày nghiệp vụ** | `POST /api/reconciliation/{date}/lock` — `requireRole(['ROLE-SETTLEMENT'])` | INSERT `business_day_lock` (1 hàng, insert-only) | `lock_business_day` trên entity `business_day_lock`, `entityId = business_date` | 200 `{status:'locked'}` · 400 `invalid_business_date` · 409 `ALREADY_LOCKED` · 404 sai vai trò · 500 |
| ↳ **hệ quả kéo theo: engine 完納奨励金** | Cùng request, gọi `runIncentiveForPeriod()` **đồng bộ ngay sau khi lock commit** | INSERT `incentive_result` (một hàng / một `payment_record` của ngày đó), qua **service_role** vì `incentive_result` không có policy ghi cho `authenticated` | `incentive_skipped_no_rule` nếu không có phiên bản biểu suất phủ ngày đó; `incentive_engine_error` nếu engine throw | **Không mã lỗi nào.** Engine lỗi bị nuốt — lock vẫn trả 200. Lock là hành động chính, phải thành công bất kể engine |

**Vì sao đồng bộ:** QĐ-5 — stack Vercel không có queue, nên "background job" của spec thành lệnh
gọi trực tiếp trong request lock. Một cú bấm lock kéo theo: ghi `business_day_lock` → ghi audit →
giải phiên bản biểu suất → đọc `payment_record` của ngày → tính và INSERT `incentive_result`. Không
có transaction database xuyên bảng (QĐ-5); `writeAuditLog()` chạy **sau** khi nghiệp vụ commit và
không rollback được (audit lỗi → 500 trong khi ngày **đã lock thật**).

**Vì sao lock đặt ở trigger chứ không ở RLS (QĐ-4):** điều kiện lock nằm trong `USING` của RLS thì
RLS lọc hàng ra khỏi lệnh UPDATE **trước khi** trigger BEFORE ROW chạy, nên client `authenticated`
nhận `200 []` — không phân biệt được "ngày đã lock" với "không có hàng đó" hay "sai vai trò". Đã
kiểm sống. Bản sửa bỏ hẳn điều kiện lock khỏi RLS (RLS chỉ còn kiểm vai trò) và để trigger làm việc
đó độc quyền, nên `P0001` phát ra cho **mọi** người gọi: `authenticated`, `service_role` (có
BYPASSRLS), và cả `psql` trực tiếp.

## 7. Edge case

- **Không có đường lùi.** Không endpoint, không hàm, không migration nào xoá hàng
  `business_day_lock`; bảng chỉ có policy INSERT — không UPDATE, không DELETE, kể cả cho
  ROLE-SETTLEMENT. Lock sai ngày là hỏng thật, chỉ còn đường `correction_request`.
- **Lock hai lần đồng thời.** Điểm tuần tự hoá là khoá chính trên `business_date`: hai request INSERT
  cùng lúc, Postgres nhận đúng một; người thua nhận `23505` → dịch thành **409** `ALREADY_LOCKED`.
  Không cần khoá ứng dụng.
- **UI gom mọi lỗi lock thành một câu.** Client chỉ kiểm `!response.ok` rồi đặt một key i18n duy
  nhất, nên 400 (ngày sai) · 409 (đã lock) · 404 (mất quyền) · 500 (engine/audit) hiện y như nhau.
  **chưa có — đề xuất**: map `reason` → key riêng, giống cách `deliveries` đã làm.
- **Ngày rỗng vẫn lock được.** Không kiểm "phải có ít nhất một dòng" — lock một ngày trắng là khoá
  vĩnh viễn một ngày trắng. **chưa có — đề xuất**: cảnh báo trước khi lock ngày rỗng.
- **Xác nhận gõ lại ngày chỉ có ở client.** Server không nhận chuỗi đó. Gọi thẳng
  `POST /api/reconciliation/2026-09-09/lock` là lock được bằng một request — FR-401 đòi "bước xác
  nhận rõ ràng" và bước đó hiện chỉ nằm ở UI. **chưa có — đề xuất**: buộc body mang lại
  `business_date` để server kiểm.
- **Số của ngày đã lock vẫn có thể đổi.** Trigger chỉ đặt BEFORE UPDATE OR DELETE, không bao giờ
  INSERT; policy INSERT của `delivery_shipment` chỉ kiểm vai trò. ROLE-DELIVERY ghi lần giao mới sau
  08:00 vẫn vào được với `business_date` đã lock. **chưa có — đề xuất** (xem SC-16 mục 7).
- **Chênh lệch chỉ có nghĩa cho `aitai`.** Nhánh `seri` và `delivery` trả `null` và hiện `—`, dễ đọc
  thành "không lệch" thay vì "không tính được". **chưa có — đề xuất**: phân biệt hai cái đó trên UI.
- **`transaction` bị hủy biến khỏi bảng.** View loại `status = 'cancelled'`: hủy trước lock là dòng
  mất hẳn, không thành dòng gạch; hủy sau lock thì bị trigger chặn (423).
- **Ngày chưa lock nhưng đã trưa.** Không ràng buộc khung giờ nào trong code (xem mục 4).
- **Không có phiên bản biểu suất phủ ngày đó.** Engine dừng, ghi audit `incentive_skipped_no_rule`,
  không đoán số. Lock vẫn thành công, nhưng ngày đó **không có** `incentive_result` — và vì không
  unlock được, chỉ chạy lại engine bằng đường riêng.
- **Engine không có khoá chống chạy lại** — `runIncentiveForPeriod()` chỉ INSERT. Trong luồng hiện
  tại nó chỉ được gọi từ route lock, mà lock chỉ thành công một lần; bảo vệ đó đến từ khoá chính của
  `business_day_lock`, không từ engine.
- **Thời điểm lock hiện theo múi giờ trình duyệt** (`toLocaleString()`) trong khi mọi ngày nghiệp vụ
  neo vào JST. **chưa có — đề xuất**: hiện kèm JST.
- **Quyền bị thu hồi giữa phiên.** Hộp xác nhận đã render vẫn còn; bấm xác nhận nhận 404 và hiện
  thông báo chung.

## 8. Dẫn chứng

- `src/app/(app)/reconciliation/page.tsx:23` — `requireUser()`, không chặn vai trò ở cửa
- `src/app/(app)/reconciliation/page.tsx:26` — ngày sai âm thầm rơi về `todayJst()`
- `src/app/(app)/reconciliation/page.tsx:29-32` — nguồn dữ liệu: `loadReconciliationLines` + `loadLockStatus`
- `src/app/(app)/reconciliation/page.tsx:34` — `canLock = role === 'ROLE-SETTLEMENT' && !lock.locked`
- `src/app/(app)/reconciliation/page.tsx:51` — `max={todayJst()}` trên input ngày
- `src/app/(app)/reconciliation/page.tsx:62-66` — dòng "Đã lock — {thời điểm}" / "Chưa lock"
- `src/app/(app)/reconciliation/page.tsx:70-73` — nút lock và `HandoffCaption` cùng mất khi đã lock
- `src/components/reconciliation/lock-confirm-dialog.tsx:7-11` — FR-401: xác nhận tách rời, không có unlock
- `src/components/reconciliation/lock-confirm-dialog.tsx:20` — `canConfirm = typed.trim() === businessDate`
- `src/components/reconciliation/lock-confirm-dialog.tsx:28-31` — gom mọi lỗi thành một thông báo
- `src/components/reconciliation/reconcile-table.tsx:42-46` — 5 cột bảng
- `src/components/reconciliation/reconcile-table.tsx:60-61` — `amount_jpy` / `variance` null → `—`
- `src/components/reconciliation/reconcile-table.tsx:63-71` — nút truy vết chỉ cho `aitai`
- `src/components/reconciliation/reconcile-table.tsx:25-30` — fetch truy vết; lỗi và rỗng cho ra cùng UI
- `src/app/api/reconciliation/[businessDate]/route.ts:18-20` — API: ngày sai → **400** (khác trang)
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:45` — `requireRole(['ROLE-SETTLEMENT'])` → 404
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:39-40` — "No unlock endpoint exists anywhere in this codebase"
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:56-60` — lock ok → chạy engine → 200; không ok → 409
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:12-37` — engine đồng bộ, lỗi bị nuốt và chỉ ghi audit `incentive_engine_error`
- `src/lib/reconciliation/lock-business-day.ts:9-15` — khoá chính là điểm tuần tự hoá; cấm thêm đường unlock
- `src/lib/reconciliation/lock-business-day.ts:29-34` — `23505` → `ALREADY_LOCKED`
- `src/lib/reconciliation/lock-business-day.ts:36-43` — audit ghi **sau** khi lock commit
- `src/lib/reconciliation/reconciliation-queries.ts:8-22` — đọc thẳng view, không bản sao vật lý
- `src/lib/reconciliation/business-date-validation.ts:10-18` — định dạng + ngày thật + `<= todayJst()`
- `src/lib/reconciliation/handle-locked-write.ts:5-9,41` — `P0001` → **423** + ghi `locked_write_attempt`
- `src/lib/incentive/run-incentive-for-period.ts:13-31` — QĐ-5: không queue nên gọi trực tiếp; phải dùng service_role
- `src/lib/incentive/run-incentive-for-period.ts:37-51` — không có biểu suất → `incentive_skipped_no_rule`
- `supabase/migrations/20260904090800_reconciliation_view.sql:1-7` — view tính khi gọi, `security_invoker = true`
- `supabase/migrations/20260904090800_reconciliation_view.sql:8-46` — `union all` 3 nhánh; `variance` = đặt trừ lũy kế đã giao; loại `cancelled`
- `supabase/migrations/20260904090500_business_day_lock.sql:12-20` — `business_day_lock`: khoá chính, insert-only
- `supabase/migrations/20260904090500_business_day_lock.sql:37-54` — trigger `P0001`, chặn mọi người gọi kể cả service_role
- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — QĐ-3: đúng 4 bảng mang trigger, **không** `lot`, **không** `delivery`
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:12-22` — QĐ-4: RLS trả `200 []` im lặng, nên bỏ kiểm lock khỏi RLS và để trigger độc quyền
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:1-10` — service_role trước đó vấp `42501` thay vì `P0001`; đã sửa bằng grant
- `supabase/migrations/20260904091000_rls_ops.sql:43-46` — `business_day_lock` chỉ có policy INSERT cho ROLE-SETTLEMENT
- `supabase/migrations/20260904091000_rls_ops.sql:48-59` — `correction_request` không bao giờ bị trigger chạm: đường ghi hợp lệ duy nhất sau lock (BR-001/BR-002)
- `src/app/api/corrections/route.ts:67` · `src/app/api/corrections/[id]/approve/route.ts:66` — SC-20/SC-21, cùng `requireRole(['ROLE-SETTLEMENT'])`, maker-checker ở tầng app
- `src/lib/i18n/dictionaries/vi/reconciliation.json:2-25` · `ja/reconciliation.json:2-25` — đủ nhãn VI/JA, trừ `locked_by`
- `docs/generated/permissions-matrix.md:500-533` — PERM012 `BusinessDayLock`, khai đúng "one-way, no unlock endpoint"; `:1414` PERM036 cho tầng RLS
