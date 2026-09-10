# ADR-013 — Đường giao nhận cho せり

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — chưa thi công |
| Phạm vi ảnh hưởng | Bảng `delivery` (thêm `seri_result_id`, nới `transaction_id`), `delivery_shipment`; view `reconciliation_line`; `src/lib/deliveries/**`; màn SC-15, SC-16 (giao hàng), SC-18 (đối chiếu ngày) |

## Bối cảnh

RFP dòng 1312 mô tả luồng せり:

> *"tiếp nhận lô hàng → tổ chức đấu giá → người vận hành xác nhận kết quả cuối cùng
> theo FORM-SERI-01 → ghi nhận người thắng → **cập nhật giao nhận hàng** và đối
> chiếu theo cùng chu kỳ đối chiếu như 相対取引."*

Schema không có đường đó. `delivery.sql:9` là
`transaction_id uuid not null references public.transaction (id)` — **`not null`, và
grep `seri_result` trong toàn file `delivery.sql` cho 0 kết quả**. Không FK, không
cột thay thế, không bảng nào khác nối hai bên.

Nên một người thắng phiên せり **không thể có bản ghi giao nhận nào trong hệ
thống**. Không phải "chưa dựng màn" — không có chỗ để ghi.

Chỗ này lộ ra ở một con số dễ đọc nhầm: `reconciliation_line` trả
`variance = NULL` cho mọi dòng `source_type='seri'` (`reconciliation_view.sql:33`).
**Không phải vì せり không lệch, mà vì không có dữ liệu giao nhận để so.** Comment
của chính view nói đúng điều đó — "variance is only meaningful for
source_type=aitai" (`:49-50`) — nhưng người đọc bảng đối chiếu trên SC-18 chỉ thấy
một ô trống, và ô trống đọc dễ thành "khớp".

`FR-DEL-01` (RFP dòng 681, **P0**) đòi theo dõi trạng thái giao hàng của từng giao
dịch theo từng lần thực hiện; `FR-DEL-04` (RFP dòng 684, P1) đòi thể hiện quan hệ
giữa bản ghi giao hàng và giao dịch/quyết toán. Cả hai chưa đạt cho phần khối lượng
đi qua せり — tỷ trọng 90/10 theo FIG-009 (RFP dòng 363) và Phụ lục C.5 (dòng 1360).

Phát hiện này đã được khai ở `docs/lab4/20-architecture-design.md` **§ 5.2**
(相対取引 vs せり), kèm hai lựa chọn và một khuyến nghị. ADR này chốt lựa chọn đó — tài liệu
kiến trúc nói thẳng "phải chốt bằng ADR chứ không chọn im lặng".

## Lựa chọn

**Phương án (a) của § 4.2:** `delivery` mang hai FK nullable — `transaction_id` và
`seri_result_id` — cộng một `CHECK` đòi **đúng một** trong hai khác `NULL`.
`delivery_shipment` không đổi: nó đã trỏ vào `delivery`, nên toàn bộ cơ chế nhiều
lần giao, `unique (delivery_id, seq)`, và trigger khoá ngày dùng lại nguyên vẹn.

`reconciliation_line` đổi theo: nhánh `seri` tính được `variance` bằng đúng công
thức nhánh `aitai` — `qty` trừ luỹ kế `delivery_shipment.qty` — thay cho
`null::numeric`.

Lý do chọn (a): tỷ trọng 10% không nuôi được chi phí của (b), và
`reconciliation_line` vốn đã `UNION ALL` ba nhánh nên đã quen sống với hai nguồn.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Bảng `trade_record` làm cha chung cho `transaction` và `seri_result`, `delivery` trỏ vào cha (phương án (b) của § 4.2) | Đúng nhất về mô hình — một đường giao nhận, không nhánh. Nhưng là migration đổi khoá chính của hai bảng đang có dữ liệu cộng viết lại mọi query chạm `transaction`, cho 10% khối lượng. Và nó bào mòn ADR-001: dựng lại một tầng cha chung là quay về hướng gộp mà 3-vs-1 đã bác |
| Bảng giao nhận riêng cho せり (`seri_delivery` + `seri_delivery_shipment`) | Nhân đôi toàn bộ cơ chế nhiều-lần-giao: hai bảng shipment, hai `unique (…, seq)`, hai trigger khoá ngày, hai đường ghi, và `reconciliation_line` thành 4 nhánh. Vi phạm DRY ở đúng chỗ đắt nhất |
| Tạo một dòng `transaction` "ảo" cho mỗi `seri_result` để dùng lại `delivery` nguyên trạng | Trái ADR-001 trực tiếp: `transaction.type` bị `CHECK` ghim `'aitai'`, và dòng ảo sẽ chảy vào mọi báo cáo đếm giao dịch 相対取引. Sửa một chỗ bằng cách làm sai số ở mười chỗ khác |
| Bỏ `not null` khỏi `transaction_id` mà **không** thêm `CHECK` đúng-một-FK | Cho phép dòng `delivery` không trỏ vào đâu cả, hoặc trỏ vào cả hai. Ràng buộc "đúng một" là phần duy nhất làm hai FK nullable an toàn |
| Giữ nguyên, chỉ ghi chú trên SC-18 rằng `variance` của せり luôn trống | Chính là hiện trạng, và nó là cái bẫy: ô trống đọc thành "khớp". Một chú thích UI không làm `FR-DEL-01` đạt |

## Hệ quả

**Chấp nhận được:** せり có đường giao nhận thật, đúng như RFP dòng 1312 đòi.
`variance` tính được cho cả hai nguồn, nên bảng đối chiếu của SC-18 không còn cột
lệch nửa trống. Cơ chế nhiều lần giao, khoá ngày, và `unique (delivery_id, seq)`
dùng lại nguyên vẹn — không thêm bảng nào.

**Phải chịu:**

- **Mọi join tới `delivery` phải xử lý hai nhánh.** Đây là cái giá chính của (a):
  từ nay `delivery` là một bảng có hai hình dạng, và chỗ nào quên nhánh `seri` sẽ
  im lặng bỏ 10% khối lượng — đúng loại lỗi khó thấy vì nó không báo gì.
- **Migration bỏ `not null` trên `transaction_id` của bảng đang có dữ liệu**, rồi
  thêm `CHECK` đúng-một-FK. Dòng cũ đều hợp lệ nên không phải dò dữ liệu, nhưng
  `CHECK` mới sẽ chặn mọi đường ghi cũ nào đang dựa vào "cứ có `transaction_id` là
  xong".
- **`reconciliation_line` đổi nghĩa.** Dòng `source_type='seri'` chuyển từ
  `variance = NULL` sang một con số, nên báo cáo và ảnh chụp đối chiếu cũ không so
  được với mới. Người đọc thấy `variance` của せり đột ngột có số sẽ tưởng dữ liệu
  đổi, trong khi chỉ là phép tính vừa có nguồn.
- **Không có dữ liệu giao nhận lịch sử cho những phiên せり đã ghi.** Sau migration,
  `variance` của các dòng cũ sẽ bằng đúng `qty` — trông như "chưa giao gì cả", vì
  thật sự không có gì để backfill. Phải quyết hiển thị thế nào cho khoảng trước
  migration.
- **Chưa thi công.** Cho tới khi làm, `FR-DEL-01` (P0) vẫn chưa đạt cho phần khối
  lượng đi qua せり, và ô `variance` trống trên SC-18 vẫn dễ đọc thành "khớp".

## Dẫn chứng

- RFP dòng 1312 — luồng せり đòi "cập nhật giao nhận hàng và đối chiếu theo cùng chu kỳ đối chiếu như 相対取引"
- `supabase/migrations/20260904090400_delivery.sql:9` — `transaction_id uuid not null references public.transaction (id)`
- `supabase/migrations/20260904090400_delivery.sql` — grep `seri_result` toàn file: **0 kết quả**
- `supabase/migrations/20260904090800_reconciliation_view.sql:33` — `null::numeric as variance` cho nhánh `seri`
- `supabase/migrations/20260904090800_reconciliation_view.sql:15-20` — công thức `variance` của nhánh `aitai`, thứ nhánh `seri` sẽ dùng lại
- `supabase/migrations/20260904090800_reconciliation_view.sql:49-50` — "variance is only meaningful for source_type=aitai"
- `supabase/migrations/20260904090400_delivery.sql:21-31` — `delivery_shipment` trỏ vào `delivery`, `unique (delivery_id, seq)`: cơ chế dùng lại được
- RFP dòng 681 — `FR-DEL-01` (P0): theo dõi trạng thái giao hàng từng giao dịch, theo từng lần thực hiện
- RFP dòng 684 — `FR-DEL-04` (P1): thể hiện quan hệ giữa bản ghi giao hàng và giao dịch/quyết toán
- RFP dòng 363 (FIG-009) và dòng 1360 (Phụ lục C.5) — tỷ trọng 90/10
- `docs/lab4/20-architecture-design.md` § 5.2 (相対取引 vs せり) — phát hiện gốc, hai phương án (a)/(b) và khuyến nghị (a). Dẫn theo **số mục**, không theo số dòng: tài liệu đó đã được chèn thêm § 4 (vòng đời trạng thái) nên mọi số dòng cũ đều lệch
