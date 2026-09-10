# ADR-001 — `seri_result` là bảng riêng, không dùng discriminator trên `transaction.type`

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | Bảng `transaction`, `seri_result`; spec F004, F005, F007, F010; màn SC-13, SC-14 (nhập và tra cứu せり), SC-18 (đối chiếu ngày) |

## Bối cảnh

Spec gốc của F004 mô tả `transaction.type` là một discriminator (`DISC-001`)
dùng chung cho cả 相対取引 và せり — một bảng, hai loại giao dịch, phân biệt bằng
cột `type`.

Đọc tiếp thì F005, F007, F010 đều viết như thể せり là một bảng độc lập: F005 nhập
kết quả せり với `winner_participant_id` mà 相対 không có, F007 đối chiếu hai nguồn
tách rời, F010 xuất báo cáo theo hai nhóm. Bốn spec, ba chọn tách, một chọn gộp.

Không có cách nào vừa gộp vừa tách. Phải chọn, và chọn xong thì ba hoặc một spec
phải sửa theo.

## Lựa chọn

Giữ `seri_result` thành bảng riêng — theo đa số 3-vs-1. `transaction.type` vẫn còn
trong schema nhưng bị `CHECK` ghim đúng một literal `'aitai'`, để chỗ lệch khỏi
thiết kế gốc nằm ngay trong schema chứ không biến mất.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Discriminator dùng chung trên `transaction.type` (`DISC-001`, đúng spec gốc F004) | Ba spec downstream đã viết theo giả định せり là bảng riêng. Chọn nó là phải sửa F005, F007, F010 — sửa ba để cứu một |
| Bảng chung + hai view `aitai_transaction` / `seri_transaction` | Cột hai loại không giao nhau: せり không có `buyer_participant_id`/`status`/`cancel_reason`, 相対 không có `winner_participant_id`/`decided_at`. Bảng chung phải để tất cả nullable rồi dựng `CHECK` điều kiện theo `type` — đẩy ràng buộc từ schema xuống biểu thức, khó đọc hơn tách bảng |
| Bỏ hẳn cột `transaction.type` | Mất dấu vết rằng thiết kế gốc từng có discriminator. Người đọc schema không còn manh mối nào để tìm ra ADR này |

## Hệ quả

**Chấp nhận được:** mỗi bảng chỉ mang cột của chính nó, không cột nullable theo
nhánh. Trigger khoá ngày gắn được riêng cho từng bảng, mỗi bảng một dòng
`create trigger` (ADR-003). Báo cáo và view đối chiếu join thẳng vào bảng cần,
không phải lọc `where type = ...` ở mọi truy vấn.

**Phải chịu:** `transaction.type` giờ là **cột chết**. `CHECK` ghim đúng một
literal, mọi dòng trong bảng có cùng một giá trị, không còn nhánh nào để rẽ —
cột tồn tại chỉ để làm dấu vết. Ai đọc schema mà không đọc ADR này sẽ tưởng hệ
thống có discriminator và đi tìm nhánh `type = 'seri'` không tồn tại ở đâu cả.
Và prototype lệch khỏi spec gốc F004 ở đúng chỗ này: `DISC-001` khai một
discriminator mà thi công không có — spec F004 chưa được sửa lại theo.

Nặng hơn cột chết, và ADR gốc chưa nói: **tách bảng rồi thì mất luôn vòng đời dùng
chung mà FIG-012 đòi.** `FIG-012 – Trạng thái giao dịch` (RFP dòng 637) ghi ngay trong
tiêu đề *"trạng thái của bản ghi 相対取引 **và** せり"* — thiết kế coi hai kênh đi cùng
một vòng đời. Nhưng `seri_result` **không có cột trạng thái nào**: khối
`create table public.seri_result` (`transaction.sql:31-41`) chỉ có `qty`, `unit_price`,
`decided_at`, `confirmed_by`, `business_date` — không `status`. Bản ghi せり insert xong
là xong: không nháp, không chờ xác nhận, không hủy, không đính chính. Quyết định tách
bảng bảo vệ được ở tầng **lưu trữ**, nhưng nó không tự bù lại phần vòng đời — đó là
hai việc khác nhau, và ADR này chỉ biện minh việc thứ nhất. Xem **ADR-015**.

## Dẫn chứng

- `supabase/migrations/20260904090300_transaction.sql:2-6` — lý do 3-vs-1 ghi ngay trong migration
- `supabase/migrations/20260904090300_transaction.sql:10` — `type text not null default 'aitai' check (type = 'aitai')`
- `supabase/migrations/20260904090300_transaction.sql:31-47` — `seri_result` là bảng riêng; cột `winner_participant_id`, `decided_at` không có ở `transaction`
- `docs/pham-vi-va-phan-mock.md:190-194` — QĐ-1, bản văn xuôi gốc
- RFP dòng 637 — `FIG-012 – Trạng thái giao dịch`, tiêu đề nói rõ "trạng thái của bản ghi 相対取引 **và** せり"; `transaction.sql:31-41` — `seri_result` không có cột `status`
