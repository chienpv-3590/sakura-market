# SC-17 — Ghi nhận ngoại lệ giao hàng

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/deliveries/[id]/exceptions/new`) |
| Loại | Form |
| Actor chính | Bộ phận vận chuyển |
| FE- / FR- | FE-023 · `FR-DEL-03` · `RPT-04` · RFP §07-04 (FIG-014, FIG-029) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Cho bộ phận vận chuyển ghi lý do khi một lần giao không đúng như chỉ thị — **giao thiếu, giao thừa,
hoàn trả, hủy một phần** (bốn loại `FR-DEL-03` liệt, RFP dòng 683) — cùng người xác nhận, để bộ
phận đối chiếu có dữ liệu làm việc thay vì gọi điện.

**Đây là khoảng trống đang chặn một báo cáo:** `delivery.status` cho phép giá trị `'ngoại lệ'` ở
tầng CHECK (`20260904090400_delivery.sql:10-11`) nhưng **không một đường ghi nào** trong
`src/lib/deliveries/` đặt được giá trị đó — `recordShipment` chỉ đặt `'đang giao'`
(`record-shipment.ts:96`), `completeDelivery` chỉ đặt `'hoàn tất'` (`complete-delivery.ts:66`) — và
không bảng nào có cột `reason`. Vì thế `RPT-04` phải để `isMock: true`
(`src/lib/reports/registry.ts:89-96`). Màn này là điều kiện để RPT-04 chạy thật.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc
- Vai trò được vào: đề xuất **ROLE-DELIVERY** — vai trò duy nhất ghi được `delivery_shipment`
  (`20260904091000_rls_ops.sql:37-38`) và là actor `FE-023`. **ROLE-SETTLEMENT** cũng ghi được
  `delivery` (`:29-33`) nên là ứng viên thứ hai, xem giả định #4
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: phải có một `delivery` chưa ở trạng thái `hoàn tất`; nếu ngoại lệ gắn vào một lần
  giao cụ thể thì phải có `delivery_shipment` của lần đó

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Giao hàng | Giao hàng | 配送 (`nav.deliveries`) | ẩn / readonly | Có | `delivery.id` (từ route) | chưa có — đề xuất: uuid | chưa có — đề xuất: không tồn tại → 404 | chưa có — đề xuất |
| 2 | Lần giao liên quan | Lần giao | chưa có key JA | select | Không | `delivery_shipment.id` + `.seq` của cùng `delivery_id` | chưa có — đề xuất: chỉ lần giao thuộc chính `delivery` này | chưa có — đề xuất: `shipment.delivery_id` phải khớp → 422 | chưa có — đề xuất |
| 3 | Loại ngoại lệ | Loại ngoại lệ | chưa có key JA | select | Có | **cột chưa có — đề xuất** `delivery_exception.kind` | chưa có — đề xuất: đúng 4 giá trị `FR-DEL-03` (giao thiếu / giao thừa / hoàn trả / hủy một phần) | chưa có — đề xuất: CHECK 4 giá trị, ngoài tập → 422 | chưa có — đề xuất |
| 4 | Số lượng liên quan | Số lượng | 行数 — không dùng lại được, chưa có key JA | numeric(12,2) | Tuỳ loại | **cột chưa có — đề xuất** `.qty` | chưa có — đề xuất: `> 0`, 2 chữ số thập phân như `delivery_shipment.qty` | chưa có — đề xuất: CHECK `> 0`; với "giao thiếu"/"hoàn trả" không vượt phần đã giao → 422 | chưa có — đề xuất |
| 5 | Lý do | Lý do | 理由 (`participants.detail.historyHeaderReason`) | textarea | Có | **cột chưa có — đề xuất** `.reason` | chưa có — đề xuất: trim, không rỗng | chưa có — đề xuất: rỗng sau trim → 422 | `participants.detail.transitionReasonRequired` là key cùng nghĩa đã có |
| 6 | Người xác nhận | Người xác nhận | 実施者 (`participants.detail.historyHeaderChangedBy`) | readonly | Có | **cột chưa có — đề xuất** `.confirmed_by` ← người đăng nhập | không áp dụng — lấy từ session | chưa có — đề xuất: luôn ghi từ session, **không** nhận từ body | — |
| 7 | Ngày nghiệp vụ | Ngày nghiệp vụ | 営業日 (`reports.filter.businessDate`) | readonly | Có | **cột chưa có — đề xuất** `.business_date` ← `todayJst()` | không áp dụng — server quyết | chưa có — đề xuất: server đặt bằng `todayJst()`, **không** nhận từ body | — |
| 8 | Chứng từ đính kèm | Ảnh/chứng từ | chưa có key JA | file | Không | Bucket đính kèm (xem SC-31); `DR-IMAGE-01` | chưa có — đề xuất: 5MB, 4 loại MIME như `intake-doc-upload.ts:4-10` | chưa có — đề xuất: kiểm ở **server**, `accept` của client chỉ là gợi ý | `INVALID_TYPE` / `TOO_LARGE` (tên lý do đã có ở `intake-doc-upload.ts:12`) |
| 9 | Trạng thái giao hàng sau ghi | Trạng thái sau khi ghi | 状態 (`reports.column.status`) | readonly | — | `delivery.status` → `'ngoại lệ'` (giá trị CHECK **đã có**, chưa đường nào ghi) | không áp dụng — chỉ đọc | chưa có — đề xuất: CAS trên `status` hiện tại | chưa có — đề xuất |

`business_date` và `confirmed_by` **không bao giờ** nhận từ request body — cùng nguyên tắc
`recordShipment` đang giữ (`record-shipment.ts` lấy `user.id` từ `requireRole`, không từ body).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Giao hàng chưa có lần giao nào | Vẫn cho ghi ngoại lệ cấp `delivery` (ví dụ hủy một phần trước khi giao), field #2 để trống | Gửi |
| đang tải | Đang nạp `delivery` và các lần giao | Skeleton form | Không |
| lỗi tải | Nạp lỗi | Khối lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò không được vào | Trang **404** | Không |
| đang gửi | Đã bấm gửi, chưa có response | Nút bị vô hiệu (`participants.form.submitting` là key cùng nghĩa đã có) | Không |
| gửi lỗi | Response lỗi | Thông báo lỗi trên form, giữ nguyên dữ liệu đã nhập | Sửa và gửi lại |
| giao hàng đã hoàn tất | `delivery.status = 'hoàn tất'` | Form ở chế độ đọc, kèm lời giải thích | Đi qua SC-20 (yêu cầu điều chỉnh) |
| **read-only vì ngày đã lock** | Ngoại lệ gắn vào một `delivery_shipment` thuộc ngày đã lock | Form ở chế độ đọc, thông báo ngày đã lock | Đi qua SC-20; mã **423** |

Dòng cuối là bắt buộc và là chỗ thiết kế phải nói rõ **ngoại lệ gắn vào cấp nào** — xem mục 7 và
mục 9.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-DELIVERY | Có (đề xuất) | Toàn bộ | Ghi ngoại lệ | — |
| ROLE-SETTLEMENT | Cần quyết định (giả định #4) | Chỉ đọc nếu không được cấp quyền ghi | — | **404** nếu không được cấp |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-TRADE, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | Không (đề xuất) | — | — | **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) —
`delivery`/`delivery_shipment` cũng vậy. Chặn ở đây là chặn **vào trang** và chặn **ghi**.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Ghi ngoại lệ | `POST /api/deliveries/{id}/exceptions` — **chưa có, đề xuất** | `delivery_exception` (bảng chưa có) + `delivery.status` → `'ngoại lệ'` | Đề xuất `action: "delivery_exception_record"`, `entity: "delivery"` — cùng lối `delivery_shipment_record` đang dùng (`record-shipment.ts:142-143`) | 404 (sai vai trò / không có giao hàng), 409 (đã hoàn tất), 422 (thiếu lý do, số lượng sai), **423** (lần giao thuộc ngày đã lock), 500 |
| Đính kèm chứng từ | Cùng endpoint, multipart | Bucket đính kèm | Đề xuất `attach_document` như `attach-intake-doc.ts:67` | 422 `INVALID_TYPE` / `TOO_LARGE` |
| Sửa ngoại lệ đã ghi | **Không đề xuất** | — | — | — |

Không đề xuất sửa: `FR-CORR-02` (dòng 657) yêu cầu điều chỉnh phải tạo bản ghi reverse/delta thay vì
ghi đè lịch sử. Ngoại lệ ghi sai thì ghi một bản ngoại lệ mới đính chính, hoặc đi qua SC-20 — đúng
lối `correction_request`/`transaction_adjustment` đã dựng.

## 7. Edge case

- **Ngoại lệ gắn vào cấp nào — `delivery` hay `delivery_shipment`.** Đây là quyết định trung tâm của
  màn. Hai cấp có chế độ lock **khác nhau**: `delivery` **không** mang trigger khoá ngày (QĐ-3,
  `20260904090500_business_day_lock.sql:56-59`; `20260904090400_delivery.sql:2-6, 16-17`), còn
  `delivery_shipment` **có** (`business_day_lock.sql:73-75`) và trigger đó là `BEFORE UPDATE OR
  DELETE` (`:61-75`) nên raise `P0001` (`:42-46`) → route trả **423**. Hệ quả: một ngoại lệ mô tả
  một **lần giao** của ngày đã lock thì không sửa được lần giao đó, nhưng lại vẫn cập nhật được
  `delivery.status`. Thiết kế phải đóng khe này lại (xem giả định #1), kẻo `'ngoại lệ'` lại thành
  giá trị UI hiện được mà dữ liệu không giải thích được — đúng lỗi niềm tin đã bị bắt một lần rồi
  (`../../pham-vi-va-phan-mock.md` § 3).
- **Không có transaction xuyên bảng (PostgREST)** — ghi `delivery_exception` và cập nhật
  `delivery.status` là hai lần ghi. Thứ tự đề xuất: insert bản ghi ngoại lệ **trước** (nó là bằng
  chứng), rồi CAS `delivery.status` — cùng lối `recordShipment` đang dùng (`record-shipment.ts:96-99`
  CAS trên cả `delivered_qty` và `status`). Nếu CAS thất bại thì bản ghi ngoại lệ vẫn còn và hiện ra
  được, không mất bằng chứng.
- **Giao hàng đã `hoàn tất`** — `completeDelivery` từ chối `ALREADY_COMPLETED`
  (`complete-delivery.ts:43`); ngoại lệ sau khi hoàn tất phải đi qua SC-20, không phải màn này.
- **Giao thừa** — `recordShipment` đã trả `OVER_DELIVERY` (422) khi vượt số lượng
  (`api/deliveries/[id]/shipments/route.ts` `STATUS_BY_REASON`), nên "giao thừa" **không** ghi được
  bằng một lần giao mới; nó chỉ tồn tại như một bản ghi ngoại lệ. Đây là lý do loại này phải có
  trong tập giá trị #3.
- **Ảnh hưởng lên đối chiếu** — `reconciliation_line.variance` = `transaction.qty` trừ tổng
  `delivery_shipment.qty` (`20260904090800_reconciliation_view.sql:15-20`). Ngoại lệ **không** ghi
  vào `delivery_shipment` nên `variance` không đổi. Bảng đối chiếu SC-18 phải đọc thêm ngoại lệ,
  nếu không cùng một chênh lệch sẽ có hai cách giải thích. Xem giả định #3.
- **Quyền bị thu hồi giữa phiên** — `getCurrentUser` trả `null` khi `is_active = false`
  (`require-role.ts:47`) → **404** ở lần điều hướng sau.

## 8. Dẫn chứng

- `supabase/migrations/20260904090400_delivery.sql:10-11` — CHECK `delivery.status` **đã** cho phép
  `'ngoại lệ'`; `:2-6, 16-17` — `delivery` không bị lock (QĐ-3); `:21-36` — `delivery_shipment` mang
  `business_date` và **bị** lock; cả hai bảng **không có** cột `reason`
- `supabase/migrations/20260904090500_business_day_lock.sql:42-46` (raise `P0001`), `:56-59` (đúng 4
  bảng mang trigger, **không** `lot`/`delivery`), `:61-75` (trigger là `BEFORE UPDATE OR DELETE`)
- `supabase/migrations/20260904091000_rls_ops.sql:29-33` (ghi `delivery`: ROLE-DELIVERY +
  ROLE-SETTLEMENT), `:37-41` (ghi `delivery_shipment`: chỉ ROLE-DELIVERY, update còn chặn theo lock)
- `src/lib/deliveries/record-shipment.ts:96-99, 142-143` — chỉ đặt `'đang giao'`; CAS; audit
  `delivery_shipment_record`
- `src/lib/deliveries/complete-delivery.ts:43, 66, 88-92` — chỉ đặt `'hoàn tất'`; chặn khi đã hoàn tất
- `src/lib/reports/registry.ts:89-96` — `RPT-04` `isMock: true`, `filterFields`/`columns` rỗng
- `supabase/migrations/20260904090800_reconciliation_view.sql:15-20` — `variance` tính từ
  `delivery_shipment`, không biết gì về ngoại lệ
- `src/lib/lots/intake-doc-upload.ts:4-12` — giới hạn upload dùng lại được cho field #8
- `../../pham-vi-va-phan-mock.md` § 2b (`RPT-04`/`FR-DEL-03` = **KHÔNG DỰNG ĐƯỢC**) và § 3 (lý do
  đầy đủ)
- RFP `../../../../RFP_He-thong-ho-tro-nghiep-vu-cho-ban-buon-thuy-san_VI_v1.0.md`: dòng 683
  (`FR-DEL-03`, 4 loại lý do + "người xác nhận ngoại lệ"), 681 (`FR-DEL-01`, 4 trạng thái giao
  hàng), 691 (lưu ý phải làm rõ giới hạn số lần chia, quyền xác nhận, thời điểm phản ánh vào quyết
  toán), 693-701 (FIG-014), 714-720 (FIG-029), 794 (§08-07 `DR-IMAGE-01`)

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | Bảng mới `delivery_exception`: `id`, `delivery_id` (NOT NULL, FK), `shipment_id` (nullable, FK), `kind` (CHECK 4 giá trị `FR-DEL-03`), `qty` (nullable, CHECK `> 0`), `reason` (NOT NULL), `confirmed_by` (FK `app_user`), `business_date`, `created_at` | Không bảng nào hiện lưu được lý do ngoại lệ. Ghi vào `../10-database-diagram.md` § bảng cần thêm |
| Bảng/cột | Quyết định lock cho bảng mới: có mang `trg_block_after_lock` hay không | Bảng append-only (không policy update/delete) là đủ cho `FR-CORR-02`. Nhưng nếu nó mang `business_date` thì phải chọn: theo QĐ-2 nó là event của một ngày (→ nên bị lock), hay theo lối `correction_request` nó là bản ghi **về** một ngày (→ miễn). Xem giả định #1 |
| Bảng/cột | Policy RLS cho bảng mới: read mở như 17 bảng còn lại, insert theo vai trò chốt ở giả định #4 | Giữ nguyên khuôn `read_all_active_users` + một policy ghi |
| Hạ tầng | Bucket đính kèm cho chứng từ ngoại lệ (nếu bật field #8) | Dùng lại khuôn bucket private + signed URL của SC-31; `DR-IMAGE-01` xếp nhóm này vào diện lưu 3 năm (RFP dòng 774) |
| Màn/API phụ thuộc | `POST /api/deliveries/{id}/exceptions` (chưa có) | Không endpoint nào hiện ghi được `'ngoại lệ'` |
| Màn/API phụ thuộc | SC-15, SC-16 (đã dựng) — nơi mở màn này; SC-18 (đối chiếu) và `RPT-04` — nơi tiêu thụ dữ liệu | `RPT-04` chỉ bỏ được `isMock` sau khi bảng này có dữ liệu thật |

### Giả định cần chốt

1. **Ngoại lệ gắn vào `delivery` hay vào một `delivery_shipment` cụ thể, và bảng mới có bị lock hay
   không.** RFP `FR-DEL-03` (dòng 683) chỉ nói "lưu lý do" và "người xác nhận", không nói cấp nào.
   *Ảnh hưởng nếu sai:* gắn vào cấp `delivery` thì không truy được ngoại lệ về đúng lần giao nào và
   `RPT-04` mất chiều phân tích; gắn vào `delivery_shipment` mà không xử lý lock thì một ngoại lệ
   phát hiện sau khi lock **không ghi được**, buộc phải đi đường F008 cho mọi trường hợp muộn.
   *Đề xuất của spec này:* `delivery_id` bắt buộc, `shipment_id` tuỳ chọn, bảng append-only, và
   **cùng một guard** cho cả bản ghi ngoại lệ và việc cập nhật `delivery.status` — để không có trạng
   thái nào hiện trên UI mà dữ liệu không giải thích được.
   *Nơi sửa:* migration bảng mới, `../10-database-diagram.md`, mục 4 dòng 423 của file này.
2. **Tập giá trị `kind`.** Đề xuất đúng 4 giá trị `FR-DEL-03` gọi tên. RFP không cho mã dữ liệu, và
   không nói có cho phép loại "khác" hay không.
   *Ảnh hưởng nếu sai:* thiếu một loại thì người dùng nhét vào ô `reason` và `RPT-04` không nhóm
   được; thêm ô "khác" tự do thì báo cáo mất tác dụng phân loại.
   *Nơi sửa:* CHECK của bảng mới, field #3 mục 3.
3. **Ngoại lệ ảnh hưởng thế nào tới đối chiếu và 完納奨励金.** RFP dòng 691 nêu thẳng đây là điều
   kiện để chốt estimate: "thời điểm phản ánh vào quyết toán và 完納奨励金". `FR-SETTLE-01` (dòng
   659) đòi bảng đối chiếu tổng hợp cả **ngoại lệ**, nhưng `reconciliation_line` hiện không biết gì
   về chúng.
   *Ảnh hưởng nếu sai:* cùng một chênh lệch bị giải thích hai lần (một lần qua `variance`, một lần
   qua ngoại lệ) hoặc không lần nào — và số vào kế toán qua `IF-ACC-01` lệch theo.
   *Nơi sửa:* `20260904090800_reconciliation_view.sql`, SC-18, và `../10-database-diagram.md`.
4. **Ai được ghi ngoại lệ.** `FE-023` nêu bộ phận vận chuyển. RLS hiện cho ROLE-SETTLEMENT cũng ghi
   `delivery` (`rls_ops.sql:29-33`), nên nếu ngoại lệ đổi `delivery.status` thì vai trò đó cũng làm
   được ở tầng dữ liệu.
   *Ảnh hưởng nếu sai:* mở cho cả hai thì mất tách trách nhiệm §02-08 (dòng 311); chỉ ROLE-DELIVERY
   thì bộ phận đối chiếu phát hiện ngoại lệ khi rà số lại không tự ghi được.
   *Nơi sửa:* `requireRole` của route mới, policy ghi của bảng mới, mục 5 của file này.
5. **Giới hạn số lần giao và số lần ghi ngoại lệ trên một giao hàng.** RFP dòng 691 đòi làm rõ "giới
   hạn số lần chia" nhưng **không cho con số**.
   *Ảnh hưởng nếu sai:* không có trần thì một giao hàng có thể sinh vô hạn lần giao và ngoại lệ, làm
   đối chiếu ngày không đóng được trong khung giờ 08:00–10:00 (RFP dòng 304).
   *Nơi sửa:* kiểm tra ở `record-shipment.ts` và ở route mới; không phải ở CHECK của DB.
