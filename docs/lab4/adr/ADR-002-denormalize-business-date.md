# ADR-002 — Denormalize `business_date` để trigger đọc không JOIN

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | Bảng `lot`, `mekiki_record`, `transaction`, `seri_result`, `delivery_shipment`; hàm `private.block_writes_when_locked()`; mọi đường ghi có đóng dấu ngày nghiệp vụ |

## Bối cảnh

Trigger khoá ngày chạy `BEFORE UPDATE OR DELETE ... FOR EACH ROW`. Muốn biết dòng
đang bị sửa thuộc ngày nghiệp vụ nào, trigger phải có ngày ngay tại dòng đó.

Theo quan hệ gốc thì không có: `mekiki_record` và `seri_result` chỉ có `lot_id`,
`delivery_shipment` chỉ có `delivery_id` → `transaction` → mới tới ngày. Để trigger
JOIN ngược lên bảng cha thì mỗi lần sửa một dòng là một truy vấn phụ, với
`delivery_shipment` là JOIN hai tầng — và việc này chạy trong khung giờ cao điểm
02:30–05:00 (RFP §02-07).

## Lựa chọn

Mang `business_date` xuống thành cột của chính bảng con. Trigger đọc
`coalesce(new.business_date, old.business_date)` — một cột, không quan hệ nào.

**Khai đúng con số, đừng khai gọn:** hiện có **6 bảng** mang cột `business_date`
(`lot`, `mekiki_record`, `transaction`, `seri_result`, `delivery_shipment`,
`accounting_export_batch`; `payment_record` mang vì lý do khác hẳn). Trong 4 bảng
bị lock, đúng **3 bảng** có comment nói rõ cột này là *vì trigger* —
`mekiki_record`, `seri_result`, `delivery_shipment`. `transaction.business_date`
không có comment đó vì nó là ngày nghiệp vụ tự nhiên của giao dịch, cần có dù
không tồn tại cơ chế lock nào. `lot.business_date` cũng gắn nhãn QĐ-2 nhưng `lot`
không phải bảng bị lock (ADR-003), nên nó không denormalize "vì trigger" theo cùng
nghĩa.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Trigger JOIN ngược lên bảng cha lấy `business_date` | Một truy vấn phụ cho mỗi dòng bị sửa, hai tầng với `delivery_shipment`; và trigger trở thành thứ phụ thuộc vào quan hệ — đổi khoá ngoại là đổi trigger |
| Một hàm `private.business_date_of(...)` gọi trong trigger | Vẫn là JOIN, chỉ đổi chỗ đặt. Thêm một hàm `security definer` nữa phải cấp quyền tường minh cho cả `authenticated` lẫn `service_role` — đúng loại lỗi đã phải sửa ở ADR-004 |
| Đặt `business_date` ở duy nhất `lot` rồi suy ra cho toàn hệ | Suy ra là **sai**, không phải chậm: `delivery_shipment.business_date` là ngày lần giao đó thật sự xảy ra, hoàn toàn có thể khác ngày của lô và khác ngày của giao dịch cha |
| Cột generated / view materialized giữ ngày | Postgres không cho generated column tham chiếu bảng khác; view materialized thì trigger đọc dữ liệu cũ tới lần refresh sau |

## Hệ quả

**Chấp nhận được:** trigger là một hàm đọc một cột, không phụ thuộc quan hệ nào —
đưa thêm bảng vào phạm vi lock chỉ cần bảng đó có `business_date`.
`delivery_shipment` bị lock theo ngày của chính lần giao, độc lập với ngày của
giao dịch cha, và đó là đúng nghiệp vụ.

**Phải chịu:** dữ liệu trùng lặp, và nguy cơ lệch giữa `business_date` của bảng
con với bảng cha là thật vì **không có ràng buộc nào chặn** — không FK tổ hợp,
không trigger đồng bộ. Đường ghi ở tầng ứng dụng là chỗ duy nhất giữ hai giá trị
khớp nhau; một lần ghi đi vòng qua tầng đó sẽ tạo dòng mang ngày sai, và dòng đó
sẽ bị lock theo ngày sai — sai êm, không báo lỗi gì. Bốn bảng khai cùng một khái
niệm bằng bốn cột riêng, nên sửa định nghĩa "ngày nghiệp vụ" là sửa bốn chỗ.

## Dẫn chứng

- `supabase/migrations/20260904090500_business_day_lock.sql:42` — `coalesce(new.business_date, old.business_date)`, trigger đọc cột tại dòng
- `supabase/migrations/20260904090200_lot.sql:28` — `mekiki_record`: "QĐ-2: trigger reads this column directly, no JOIN"
- `supabase/migrations/20260904090300_transaction.sql:39` — `seri_result`: "QĐ-2 denormalization"
- `supabase/migrations/20260904090400_delivery.sql:28` — `delivery_shipment`: "the day THIS shipment happened"
- `supabase/migrations/20260904090300_transaction.sql:15` — `transaction.business_date` **không** mang comment đó
- `docs/generated/entities.md:446` — bản soát đã sửa "3 bảng" thành "3 trong 4 bảng bị lock", và đếm ra 6 bảng có cột này
- `src/lib/db/business-date.ts:23-30` — `todayJst()`, chỗ duy nhất được phép đóng dấu ngày
