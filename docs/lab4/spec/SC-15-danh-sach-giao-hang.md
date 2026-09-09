# SC-15 — Danh sách giao hàng

| | |
|---|---|
| Mã thi công | SCR016_DeliveryList |
| Route | `/deliveries` |
| Loại | List |
| Actor chính | Bộ phận vận chuyển (ROLE-DELIVERY) |
| FE- / FR- | FE-020 / FR-DEL-01, FR-DEL-05 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Cửa vào của khâu giao nhận, và là landing page của ROLE-DELIVERY. Mở màn này đầu ngày để biết
giao dịch nào còn phải giao, đã giao lũy kế bao nhiêu so với số lượng đặt. Màn không ghi gì —
mọi thao tác ghi nằm ở SC-16. Trong khung giờ vận hành RFP §02-07, đây là màn của đoạn
05:00–08:00 (cập nhật giao nhận), nhưng khung giờ đó **không được cài trong code**.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc. `requireUser()` — không có session, hoặc `app_user.is_active = false`,
  thì redirect `/login?reason=inactive`. Đây là redirect, không phải 404.
- Vai trò được vào: cả 7. Màn **không** gọi `requireRole()`, nên không vai trò nào bị chặn cửa.
- Mã lỗi khi thiếu quyền: không phát sinh ở màn này. Quy ước **404 thay vì 403** của LAB-3 chỉ
  áp cho màn/route có `requireRole()`; SC-15 không có.
- Tiền đề dữ liệu: có ít nhất một `delivery` mà join sang `transaction` trả về hàng. Không có
  thì màn ra empty state, không lỗi.

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `businessDate` (lọc) | Ngày nghiệp vụ | 業務日 | date, `YYYY-MM-DD` | Không | chỉ UI — lọc theo `transaction.business_date` | `<input type="date">`, **không** có `max`, nên ngày tương lai nhập được | chưa có — đề xuất: API nhận nguyên chuỗi query rồi so sánh `===` với `business_date`, không kiểm định dạng | Không có. Chuỗi sai chỉ cho ra danh sách rỗng — người dùng không phân biệt được "sai định dạng" với "ngày đó không có hàng" |
| 2 | `status` (lọc) | Trạng thái | 状態 | enum 3 giá trị | Không | chỉ UI — lọc `delivery.status` | `<select>` chỉ có 3 option: `chờ` · `đang giao` · `hoàn tất` | Whitelist `STATUSES`; giá trị lạ → `undefined` → bỏ lọc, trả cả bảng | Không có — bỏ lọc im lặng |
| 3 | Mã giao dịch | Mã giao dịch | 取引番号 | text | — | `transaction.txn_code` (`not null unique`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 4 | Ngày nghiệp vụ | Ngày nghiệp vụ | 業務日 | date | — | `transaction.business_date` (`not null`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 5 | Đã giao | Đã giao | 配送済み数量 | numeric(12,2) | — | `delivery.delivered_qty` (`not null default 0`, `>= 0`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 6 | Số lượng đặt | Số lượng đặt | 注文数量 | numeric(12,2) | — | `transaction.qty` (`not null`, `> 0`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |
| 7 | Trạng thái (badge) | Chờ / Đang giao / Hoàn tất / Ngoại lệ | 待機 / 配送中 / 完了 / 例外 | enum 4 giá trị | — | `delivery.status` (`check in ('chờ','đang giao','hoàn tất','ngoại lệ')`) | không áp dụng (chỉ đọc) | không áp dụng (chỉ đọc) | — |

**Lệch có chủ đích:** schema cho 4 trạng thái, filter chỉ đưa ra 3. `ngoại lệ` bị bỏ vì
FR-DEL-03 (ghi nhận ngoại lệ, tức SC-17) chưa dựng — không đường code nào set được nó, nên một
filter luôn trả rỗng sẽ gây hiểu sai. Nhãn `deliveries.status.ngoại lệ` vẫn có đủ VI/JA để badge
render được nếu sau này có hàng.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| Có dữ liệu | `deliveries.length > 0` | Bảng 5 cột, sắp theo `created_at` giảm dần | Lọc · mở chi tiết |
| Rỗng | Không có `delivery` nào, hoặc lọc không khớp | `EmptyState` — "Chưa có giao dịch nào cần giao." | Lọc lại |
| Đang tải | Server Component render trên server | **chưa có — đề xuất**: không có `loading.tsx` ở bất kỳ route nào trong `src/app`; người dùng thấy màn trắng cho tới khi HTML về | Không |
| Lỗi tải | `listDeliveries()` throw | **chưa có — đề xuất**: không có `error.tsx`; rơi về error boundary mặc định của Next. Route API tương ứng thì trả `500 {"error":"internal_error"}` | Tải lại trang |
| Không có quyền | Không phát sinh — màn không có `requireRole()` | — | — |
| Chưa đăng nhập / tài khoản bị vô hiệu | `getCurrentUser()` trả `null` | Redirect `/login?reason=inactive` | Đăng nhập lại |
| Đang gửi | Không áp dụng — form lọc là `method="GET"`, submit là điều hướng trang | — | — |
| Gửi lỗi | Không áp dụng — màn không ghi | — | — |
| Read-only vì ngày đã lock | **Không áp dụng.** Màn chỉ đọc `delivery` + `transaction`; `delivery` được QĐ-3 miễn trigger khoá ngày, và SC-15 không có đường ghi nào nên `423` không thể phát sinh. Đọc thì lock không chặn — RLS cho mọi vai trò đang hoạt động đọc mọi bảng (FR-601) | Bảng hiển thị bình thường kể cả ngày đã lock | Lọc · mở chi tiết |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-DELIVERY | ✓ (landing page) | Đủ 7 | Lọc · mở SC-16 | — |
| ROLE-SETTLEMENT | ✓ | Đủ 7 | Lọc · mở SC-16 | — |
| ROLE-TRADE | ✓ | Đủ 7 | Lọc · mở SC-16 | — |
| ROLE-INTAKE | ✓ | Đủ 7 | Lọc · mở SC-16 | — |
| ROLE-JUDGE | ✓ | Đủ 7 | Lọc · mở SC-16 | — |
| ROLE-RULE-ADMIN | ✓ | Đủ 7 | Lọc · mở SC-16 | — |
| ROLE-SYS-ADMIN | ✓ | Đủ 7 | Lọc · mở SC-16 | — |

Không có field nào bị ẩn theo vai trò ở màn này. Sự khác biệt giữa các vai trò chỉ xuất hiện khi
vào SC-16 — chỗ đó mới có nút.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Lọc theo ngày / trạng thái | Không gọi API — form `GET` tự submit về chính route, page đọc `searchParams` | Không ghi | Không | Không (giá trị sai bị bỏ im lặng) |
| Mở một dòng | Không — `<Link href="/deliveries/{id}">` | Không ghi | Không | 404 nếu `delivery` không tồn tại (xử ở SC-16) |
| `GET /api/deliveries` | Cùng nguồn dữ liệu, dùng cho client khác. `requireUser()` | Không ghi | Không | `500 internal_error` |

## 7. Edge case

- **Lọc chạy trong bộ nhớ, không ở SQL.** `listDeliveries()` `select` toàn bộ `delivery` rồi mới
  `.filter()` theo `status`/`businessDate` trong JS. Đúng với vài trăm hàng của prototype, nhưng
  là task tối ưu bắt buộc cho LAB-5 khi bảng lớn — không có `LIMIT`, không phân trang.
- **Hàng có `transaction` null bị loại im lặng.** `.filter((row) => row.transaction !== null)`.
  Với RLS hiện tại (mọi vai trò đọc mọi bảng) trường hợp này không xảy ra; nhưng nếu sau này siết
  RLS đọc thì danh sách sẽ tự rút ngắn mà không báo gì.
- **Không phân trang.** Bảng đổ toàn bộ hàng đã lọc. Không có `LIMIT`/cursor ở cả page và API.
- **Ngày đã lock không ảnh hưởng gì tới màn này.** Lock chặn ghi và chặn vào trang, không chặn
  đọc. Một `delivery` của ngày đã lock vẫn hiện đầy đủ, vẫn mở được chi tiết — đúng ý QĐ-3, vì
  `delivery` trải nhiều ngày nghiệp vụ.
- **Ngày tương lai nhập được.** Input lọc không có `max`, khác SC-18 (`max={todayJst()}`). Kết quả
  là danh sách rỗng, không phải lỗi. Chỗ lệch UX giữa hai màn, đáng đưa vào task LAB-5.
- **Quyền bị thu hồi giữa phiên.** `is_active` bị tắt trong lúc đang mở màn: lần điều hướng kế
  tiếp `getCurrentUser()` trả `null` → redirect `/login?reason=inactive`. Trang đang mở vẫn hiển
  thị dữ liệu cũ tới khi người dùng bấm tiếp — không có cơ chế đẩy về từ server.
- **Trạng thái `ngoại lệ` không lọc được** dù schema cho phép. Xem ghi chú ở mục 3.

## 8. Dẫn chứng

- `src/app/(app)/deliveries/page.tsx:25` — `requireUser()` chứ không `requireRole()`; cả 7 vai trò vào được
- `src/app/(app)/deliveries/page.tsx:12-17` — lý do bỏ `ngoại lệ` khỏi filter, whitelist `STATUSES`
- `src/app/(app)/deliveries/page.tsx:28` — `validStatus`: giá trị ngoài whitelist thành `undefined`
- `src/app/(app)/deliveries/page.tsx:39-70` — form lọc `method="GET"`, input `type="date"` không có `max`
- `src/components/deliveries/delivery-table.tsx:24-28` — 5 cột tiêu đề
- `src/components/deliveries/delivery-table.tsx:15-17` — empty state
- `src/components/deliveries/delivery-table.tsx:34-44` — nguồn từng ô: `txn_code`, `business_date`, `delivered_qty`, `transaction_qty`, `status`
- `src/lib/deliveries/delivery-queries.ts:16-19` — `select *` + join `transaction`, `order created_at desc`, không `LIMIT`
- `src/lib/deliveries/delivery-queries.ts:30` — loại hàng có `transaction` null
- `src/lib/deliveries/delivery-queries.ts:37-38` — lọc trong bộ nhớ, không ở SQL
- `src/app/api/deliveries/route.ts:11-24` — `requireUser()`, đọc `status`/`businessDate` không kiểm định dạng, `500 internal_error`
- `src/lib/auth/require-role.ts:58-64` — `requireUser()` redirect `/login?reason=inactive`
- `src/lib/auth/require-role.ts:72-78` — `requireRole()` gọi `notFound()` (404, không 403) — không dùng ở màn này
- `supabase/migrations/20260904090400_delivery.sql:10-13` — `status` check 4 giá trị, `delivered_qty >= 0`
- `supabase/migrations/20260904090300_transaction.sql:9-15` — `txn_code`, `qty > 0`, `business_date not null`
- `supabase/migrations/20260904090500_business_day_lock.sql:56-59` — QĐ-3: `delivery` và `lot` **không** mang trigger khoá ngày
- `src/lib/i18n/dictionaries/vi/deliveries.json:2-16` · `ja/deliveries.json:2-16` — đủ nhãn VI/JA cho toàn bộ field màn này
- `docs/generated/permissions-matrix.md:41-42` — PERM010/PERM011 là quyền của SC-16, không của SC-15
