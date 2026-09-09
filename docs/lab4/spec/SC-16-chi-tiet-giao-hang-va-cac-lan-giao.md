# SC-16 — Chi tiết giao hàng và các lần giao

| | |
|---|---|
| Mã thi công | SCR017_DeliveryDetail (composite) |
| Route | `/deliveries/[id]` |
| Loại | Detail |
| Actor chính | Bộ phận vận chuyển (ROLE-DELIVERY); bộ phận đối chiếu (ROLE-SETTLEMENT) chốt hoàn tất |
| FE- / FR- | FE-020, FE-021, FE-022, FE-024 / FR-DEL-01, FR-DEL-02, FR-DEL-04, FR-DEL-05, BR-DEL-03 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Nơi ghi nhận từng lần giao cho một giao dịch và theo dõi lũy kế đã giao / số lượng còn lại. Một
giao dịch có thể giao nhiều lần (FR-DEL-05); mỗi lần là một hàng `delivery_shipment`. Khi lũy kế
bằng đúng số lượng đặt thì ROLE-SETTLEMENT chốt "hoàn tất" (BR-DEL-03, không dung sai).

**Điểm phải hiểu đúng ngay:** `delivery` (phiếu giao hàng) **không** bị khoá ngày, còn
`delivery_shipment` (một lần giao) **thì bị**. Sửa phiếu giao hàng thì được, sửa một lần giao đã
thuộc ngày đã lock thì không. Xem mục 4 và mục 7.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc. `requireUser()` → không session / `is_active = false` thì redirect
  `/login?reason=inactive`.
- Vai trò được vào: cả 7. Màn không gọi `requireRole()` — phân quyền nằm ở nút, không ở cửa.
- Mã lỗi khi thiếu quyền: **404** ở tầng API (`requireRole()` gọi `notFound()`, có chủ đích —
  không lộ sự tồn tại tài nguyên). Ở tầng trang thì không phát sinh vì trang không chặn vai trò.
- Tiền đề dữ liệu: `delivery` tồn tại **và** join sang `transaction` ra hàng. Thiếu một trong hai
  → `notFound()` → 404.

## 3. Bảng field

### 3.A Khối đầu trang — chỉ đọc

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Mã giao dịch | Chi tiết giao hàng | 配送詳細 | text | — | `transaction.txn_code` | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 2 | Trạng thái | Chờ / Đang giao / Hoàn tất / Ngoại lệ | 待機 / 配送中 / 完了 / 例外 | enum 4 | — | `delivery.status` | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 3 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date | — | `transaction.business_date` — **của giao dịch**, không phải của lần giao | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 4 | Link đối chiếu | Xem bảng đối chiếu ngày này | この日の照合表を見る | link | — | dẫn xuất — chỉ hiện khi `business_day_lock` có hàng cho `transaction.business_date` | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |

### 3.B Khối tiến độ giao hàng — chỉ đọc + 1 nút

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 5 | Số lượng đặt | Số lượng đặt | 注文数量 | numeric(12,2) | — | `transaction.qty` (`> 0`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 6 | Đã giao lũy kế | Đã giao lũy kế | 配送済み累計 | numeric(12,2) | — | `delivery.delivered_qty` (`>= 0`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 7 | Còn lại | Còn lại | 残数量 | numeric | — | dẫn xuất: `max(0, round2(qty - delivered_qty))` | tính lại mỗi lần render từ prop, không giữ state riêng | server tính `remaining` độc lập trong vòng CAS trước khi cho ghi | — |
| 8 | Thanh tiến độ | — (`aria-hidden`) | — | % | — | dẫn xuất: `min(100, round(delivered/ordered*100))` | `orderedQty > 0` mới chia, tránh chia 0 | không áp dụng (chỉ UI) | — |

### 3.C Khối ghi nhận lần giao mới — form duy nhất của màn

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 9 | Số lượng lần này | Số lượng lần này | 今回の数量 | numeric(12,2) | **Có** | `delivery_shipment.qty` (`not null`, `> 0`) | `type=number` `min=0.01` `step=0.01`; submit bị chặn nếu rỗng hoặc `!Number.isFinite || <= 0` | `parseQty()`: phải là `number`, `Number.isFinite`, `> 0` → nếu không, **422** `invalid_request`. Thân request không phải JSON → **400** `invalid_json`. Guard tầng lib throw nếu `qty <= 0` | "Số lượng vượt quá số lượng còn lại." (422 `OVER_DELIVERY`) · "Giao dịch này đã hoàn tất, không thể ghi nhận thêm lần giao." (409) · "Không tìm thấy giao hàng này." (404) · "Có lỗi xảy ra, vui lòng thử lại." (mọi mã còn lại) |
| 10 | `seq` lần giao | Lần | 回数 | integer (`> 0`) | Có (server sinh) | `delivery_shipment.seq` — server đếm `count + 1` | không có trên form | `unique (delivery_id, seq)`; trùng `23505` → thử lại tối đa 5 lần với `count` mới | Không lộ ra UI; hết 5 lần thì throw → 500 |
| 11 | `business_date` lần giao | Ngày nghiệp vụ | 業務日 | date | Có (server sinh) | `delivery_shipment.business_date` = `todayJst()` — **hôm nay theo JST**, không lấy theo `transaction.business_date` | không có trên form | không có kiểm lock ở đường INSERT — xem mục 7 | — |
| 12 | `confirmed_by` | — (không hiện) | — | uuid | Không (`references app_user`) | `delivery_shipment.confirmed_by` = id người gọi | không có trên form | lấy từ session, client không gửi được | — |
| 13 | `shipped_at` | Thời điểm giao | 配送日時 | timestamptz | Có (`default now()`) | `delivery_shipment.shipped_at` | không có trên form | DB đặt mặc định | — |

### 3.D Khối các lần giao — bảng chỉ đọc

Bốn cột, sắp theo `seq` tăng: Lần (回数) · Số lượng (数量) · Thời điểm giao (配送日時) ·
Ngày nghiệp vụ (業務日). Nguồn: `delivery_shipment.seq / qty / shipped_at / business_date`.
Validation client và server: không áp dụng (chỉ đọc). Rỗng → "Chưa có lần giao nào được ghi nhận."

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| Đang giao | `status` ∈ {`chờ`, `đang giao`} | Đủ 4 khối | Ghi nhận lần giao (ROLE-DELIVERY) |
| Đủ số lượng, chờ chốt | `delivered_qty == qty` (so sánh `round2`) | Nút "Xác nhận hoàn tất" bật | Chốt hoàn tất (ROLE-SETTLEMENT) |
| Chưa đủ số lượng | `delivered_qty != qty` | Nút chốt bị `disabled` + hint "Chỉ bật khi lũy kế đã giao bằng đúng số lượng đặt." | Ghi nhận thêm lần giao |
| Hoàn tất | `status == 'hoàn tất'` | Khối "Ghi nhận lần giao mới" **biến mất hẳn**, không phải disabled. Nút chốt cũng mất | Chỉ xem |
| Rỗng (chưa có lần giao) | `shipments.length == 0` | `EmptyState` compact trong khối 3.D; ba khối kia vẫn đủ | Ghi nhận lần giao đầu |
| Đang tải | Server Component render trên server | **chưa có — đề xuất**: không có `loading.tsx` | Không |
| Lỗi tải | Query throw | **chưa có — đề xuất**: không có `error.tsx`, rơi về boundary mặc định Next | Tải lại |
| Không tìm thấy | `delivery` hoặc `transaction` của nó không đọc được | `notFound()` → 404, không có `not-found.tsx` riêng nên dùng trang 404 mặc định | Về `/deliveries` |
| Không có quyền | Vai trò không phải ROLE-DELIVERY / ROLE-SETTLEMENT | `HandoffCaption` nói rõ hành động đó thuộc vai trò nào. Nếu gọi thẳng API: **404** | Chỉ xem |
| Đang gửi | `pending == true` | Nút `disabled` + `aria-busy`, input `disabled` | Không |
| Gửi lỗi | Response không `ok` | `<p role="alert">` với thông báo map từ `reason` | Sửa số lượng, gửi lại |
| **Read-only vì ngày đã lock** | `business_day_lock` có hàng cho `delivery_shipment.business_date` của một lần giao | Bảng 3.D vẫn hiện đủ (đọc không bị chặn — FR-601). Hàng lần giao đó **bất biến ở tầng DB**: `trg_block_after_lock` chặn UPDATE/DELETE với `P0001`, chặn cả `authenticated` lẫn `service_role` | Không sửa/xoá được lần giao đó. Muốn sửa phải đi `correction_request` + maker-checker (SC-20/SC-21). Route dịch `P0001` → **423**, nhưng xem cảnh báo dưới |

> **Sự phân biệt cốt lõi.** `delivery` được QĐ-3 **miễn** khoá ngày (nó trải nhiều ngày nghiệp vụ:
> giao dịch của ngày đã lock thì hôm sau vẫn phải giao). `delivery_shipment` **bị** khoá, theo
> `business_date` của chính nó, độc lập với `business_date` của giao dịch mẹ. Hệ quả thực tế: hai
> hành động của màn này — CAS `delivered_qty` và chốt `status = 'hoàn tất'` — đều ghi vào
> `delivery`, nên **vẫn chạy được sau khi ngày của giao dịch đã lock**. Đó là hành vi có chủ đích,
> không phải lỗ hổng.
>
> **Nhưng: hiện chưa có đường nào trong codebase phát sinh 423 từ màn này.** Không route nào
> UPDATE hoặc DELETE `delivery_shipment`; hàm dịch `P0001` → 423 (`respondLockedWrite`) chỉ được
> `transactions/[id]/cancel` gọi. Nên dòng read-only ở trên mô tả **ràng buộc DB đang có thật**,
> chứ chưa phải mã lỗi mà UI hiện tại quan sát được.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-DELIVERY | ✓ | Đủ 13 | Ghi nhận lần giao mới (mất khi `status == 'hoàn tất'`) | 404 nếu gọi `POST .../complete` |
| ROLE-SETTLEMENT | ✓ | Đủ 13 | Xác nhận hoàn tất | 404 nếu gọi `POST .../shipments` |
| ROLE-TRADE · ROLE-INTAKE · ROLE-JUDGE · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | ✓ | Đủ 13 (đọc không bị chặn — FR-601) | Không có hành động; thấy `HandoffCaption` | 404 ở cả hai route ghi |

**Chỗ lệch phải khai:** LAB-3 `deliverytracking/technical-spec.md §5.2` nói "cả 2 role" đều được
chốt hoàn tất. Code chỉ cho ROLE-SETTLEMENT — vì `completeDelivery()` còn ghi `lot.status`, mà RLS
`write_lot_operational` **không** có ROLE-DELIVERY; để ROLE-DELIVERY qua thì lệnh ghi `lot` bị RLS
lọc hàng, không báo lỗi, và `delivery` thành "hoàn tất" trong khi `lot` vẫn "traded".
**Tin code.** `permissions-matrix.md` PERM011 khai giống code.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Ghi nhận lần giao mới | `POST /api/deliveries/{id}/shipments` — `requireRole(['ROLE-DELIVERY'])` | `delivery` (CAS `delivered_qty` + `status='đang giao'`) rồi INSERT `delivery_shipment` | `delivery_shipment_record` trên entity `delivery`, có `before`/`after` `delivered_qty` | 201 · 400 `invalid_json` · 422 `invalid_request` · 404 `NOT_FOUND` · 409 `ALREADY_COMPLETED` · 422 `OVER_DELIVERY` (kèm `remaining`) · 404 sai vai trò · 500 |
| Xác nhận hoàn tất | `POST /api/deliveries/{id}/complete` — `requireRole(['ROLE-SETTLEMENT'])` | `delivery.status='hoàn tất'` (CAS theo `status` cũ) rồi `lot.status='delivered'` | `delivery_complete`, có `before`/`after` | 200 · 404 `NOT_FOUND` · 409 `ALREADY_COMPLETED` · 422 `QTY_MISMATCH` (kèm `deliveredQty`/`orderedQty`) · 404 sai vai trò · 500 |
| Mở bảng đối chiếu ngày | Điều hướng `/reconciliation?date={business_date}` | Không ghi | Không | — |
| Xem lại danh sách | Điều hướng `/deliveries` | Không ghi | Không | — |

Cả hai hành động ghi đều **không có transaction database xuyên bảng** (QĐ-5, PostgREST không cho
`BEGIN/COMMIT`). Thay vào đó là CAS + ghi bù, và `writeAuditLog()` chạy **sau** khi nghiệp vụ đã
commit — audit lỗi thì không rollback được nghiệp vụ, chỉ throw ra 500 trong khi dữ liệu đã đổi.

## 7. Edge case

- **Ghi nhận lần giao cho ngày đã lock vẫn thành công — đây là gap thật.** Trigger chỉ đặt
  BEFORE UPDATE OR DELETE, không bao giờ INSERT; policy RLS insert của `delivery_shipment` chỉ
  kiểm vai trò, không kiểm lock. Nên nếu ROLE-SETTLEMENT lock hôm nay lúc 08:00, ROLE-DELIVERY ghi
  một lần giao lúc 09:00 thì hàng mới vào với `business_date` = hôm nay = ngày đã lock, và số liệu
  của view `reconciliation_line` cho ngày đã lock **thay đổi sau khi lock**. Đây là **chưa có —
  đề xuất**: cần chặn INSERT khi ngày đã lock, hoặc khai rõ ràng đây là hành vi được chấp nhận.
- **CAS thua thì thử lại 10 lần.** Hai người cùng ghi lần giao: người thua CAS đọc lại và kiểm lại
  `OVER_DELIVERY` với con số mới. Hết 10 lần thì throw → 500, không phải 409.
- **Ghi bù khi INSERT ledger thất bại.** CAS đã cộng `delivered_qty` rồi mà INSERT
  `delivery_shipment` không vào được, thì `revertDeliveredQty()` trừ lại, có điều kiện
  `.eq('delivered_qty', fromQty)` để không đè lên ghi của người khác. Ghi bù là best-effort — thất
  bại thì `delivered_qty` cao hơn tổng thật của ledger, không có cơ chế phát hiện lệch.
- **`seq` trùng.** `count + 1` không nguyên tử. Trùng `23505` → thử lại 5 lần với `count` mới; hết
  thì ghi bù rồi throw.
- **Bụi số thực.** `qty`/`delivered_qty` là `numeric(12,2)`, cộng trừ nhiều lần trong JS sinh dư
  (39.999999999 thay vì 40) khiến kiểm "bằng chính xác" của BR-DEL-03 hỏng. Mọi so sánh và mọi ghi
  đi qua `round2()` trước.
- **Chốt hoàn tất bị cạnh tranh.** CAS theo `status` cũ; người thua nhận 409 `ALREADY_COMPLETED`.
- **Cập nhật `lot` là tác dụng phụ best-effort.** Một `lot` về lý thuyết đỡ được nhiều
  `transaction`, nên `lot.status='delivered'` ở đây chỉ phản ánh một giao dịch. Đơn giản hoá đã
  biết, mang từ phase plan sang.
- **Nút chốt không tự bật lại.** `readyToComplete` tính từ prop mỗi lần render, nhưng prop chỉ mới
  sau `router.refresh()`. Người khác ghi lần giao ở tab khác thì tab này vẫn thấy số cũ tới khi
  refresh.
- **Link "Xem bảng đối chiếu ngày này" chỉ hiện khi ngày ĐÃ lock.** Trước lock không có link —
  ngược với trực giác, vì lúc đang đối chiếu tạm (05:00–08:00) mới là lúc cần nhảy qua đó nhất.
- **Quyền bị thu hồi giữa phiên.** Form vẫn còn trên màn đã render; submit sẽ nhận 404 từ
  `requireRole()`, và UI dịch thành thông báo chung "Có lỗi xảy ra" — không nói là mất quyền.
- **`status = 'ngoại lệ'` không đặt được.** Schema cho, nhưng FR-DEL-03 (SC-17) chưa dựng nên không
  đường code nào set. Badge render được nếu hàng có sẵn giá trị đó.

## 8. Dẫn chứng

- `src/app/(app)/deliveries/[id]/page.tsx:22` — `requireUser()`, không chặn vai trò ở cửa
- `src/app/(app)/deliveries/[id]/page.tsx:29` — `notFound()` khi không có `delivery`/`transaction`
- `src/app/(app)/deliveries/[id]/page.tsx:33-37` — tra `business_day_lock` theo `transaction.business_date`
- `src/app/(app)/deliveries/[id]/page.tsx:39-40` — `canRecordShipment` / `canComplete`
- `src/app/(app)/deliveries/[id]/page.tsx:64-71` — link đối chiếu chỉ hiện khi có hàng lock
- `src/app/(app)/deliveries/[id]/page.tsx:95-104` — `hoàn tất` là terminal: khối form biến mất, không disabled
- `src/components/deliveries/delivery-progress.tsx:33-35` — `remaining`, `pct`, `readyToComplete` dẫn xuất
- `src/components/deliveries/delivery-progress.tsx:83-91` — nút chốt `disabled` + hint
- `src/components/deliveries/shipment-form.tsx:20` — validation client: `Number.isFinite && > 0`
- `src/components/deliveries/shipment-form.tsx:52-54` — `type=number min=0.01 step=0.01`
- `src/components/deliveries/shipment-history-table.tsx:22-25` — 4 cột bảng 3.D
- `src/app/api/deliveries/[id]/shipments/route.ts:15-19,36` — `parseQty()` → 422 `invalid_request`
- `src/app/api/deliveries/[id]/shipments/route.ts:9-13,22,33` — map mã lỗi, `requireRole(['ROLE-DELIVERY'])`, 400 `invalid_json`
- `src/app/api/deliveries/[id]/complete/route.ts:9-13,22` — map mã lỗi, `requireRole(['ROLE-SETTLEMENT'])`
- `src/lib/deliveries/record-shipment.ts:79-110` — vòng CAS 10 lần, kiểm `OVER_DELIVERY` trong vòng
- `src/lib/deliveries/record-shipment.ts:116-131` — `seq = count + 1`, `business_date: todayJst()`
- `src/lib/deliveries/record-shipment.ts:151-160` — `23505` thử lại, ghi bù rồi throw
- `src/lib/deliveries/record-shipment.ts:19-35` — `revertDeliveredQty()` best-effort
- `src/lib/deliveries/complete-delivery.ts:55-62` — `qtyEquals` → `QTY_MISMATCH`
- `src/lib/deliveries/complete-delivery.ts:18-27` — lý do chỉ ROLE-SETTLEMENT được chốt (RLS `lot`)
- `src/lib/deliveries/complete-delivery.ts:76-84` — `lot.status='delivered'` là tác dụng phụ
- `src/lib/deliveries/qty-math.ts:7-13` — `round2` / `qtyEquals`
- `src/lib/deliveries/delivery-reject-reasons.ts:7-17` — map `reason` → key i18n
- `supabase/migrations/20260904090400_delivery.sql:1-6,16-17` — QĐ-3: `delivery` **không** bị lock
- `supabase/migrations/20260904090400_delivery.sql:21-31` — `delivery_shipment`: `seq > 0`, `qty > 0`, `business_date not null`, `unique (delivery_id, seq)`
- `supabase/migrations/20260904090400_delivery.sql:33-36` — `delivery_shipment` bị lock theo `business_date` **của chính nó**
- `supabase/migrations/20260904090500_business_day_lock.sql:37-49` — trigger chỉ BEFORE UPDATE OR DELETE, `P0001`
- `supabase/migrations/20260904090500_business_day_lock.sql:73-75` — trigger trên `delivery_shipment`
- `supabase/migrations/20260904091000_rls_ops.sql:29-33` — RLS `delivery`: không kiểm lock (QĐ-3)
- `supabase/migrations/20260904091000_rls_ops.sql:37-38` — RLS INSERT `delivery_shipment`: **chỉ kiểm vai trò**, không kiểm lock
- `src/lib/reconciliation/handle-locked-write.ts:41` — `P0001` → 423; không đường delivery nào gọi
- `src/lib/audit/write-audit-log.ts:30-50` — audit ghi sau nghiệp vụ, lỗi thì throw (QĐ-5)
- `docs/generated/permissions-matrix.md:427-461` — PERM010 `DeliveryShipmentRecording`
- `docs/generated/permissions-matrix.md:463-498` — PERM011, khai đúng chỗ lệch với `technical-spec.md §5.2`
- `docs/generated/permissions-matrix.md:1374-1412` — PERM035, tầng RLS của `delivery` / `delivery_shipment`
- `src/lib/i18n/dictionaries/vi/deliveries.json:17-39` · `ja/deliveries.json:17-39` — đủ nhãn VI/JA
