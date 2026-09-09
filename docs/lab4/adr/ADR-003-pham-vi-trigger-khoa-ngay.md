# ADR-003 — Phạm vi trigger khoá ngày: 4 bảng, miễn `lot` và `delivery`

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | Trigger `trg_block_after_lock` trên `transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`; miễn `lot`, `delivery`, `accounting_export_batch`, `correction_request`, `transaction_adjustment`, `lot_attachment`; màn SC-18 (lock kỳ), SC-20/21 (điều chỉnh sau lock) |

## Bối cảnh

`BR-001`/`BR-002`/`FR-402` đòi ngày nghiệp vụ đã lock thì không sửa được nữa.
Câu hỏi thật ở đây không phải "chặn bằng cơ chế gì" — đó là ADR-004 — mà **"chặn
ở bảng nào"**.

Chặn thiếu thì lock không có giá trị: khoá `transaction` mà để `delivery_shipment`
sửa được là số liệu đối chiếu của ngày đã chốt vẫn động. Chặn thừa thì đóng băng
nghiệp vụ đang chạy: một lô hàng nhận vào ngày hôm qua (đã lock) vẫn phải bán được
hôm nay.

## Lựa chọn

Trigger trên **đúng 4 bảng**: `transaction`, `seri_result`, `mekiki_record`,
`delivery_shipment` — bốn bảng sự-kiện-theo-ngày. `BEFORE UPDATE OR DELETE`,
**không bao giờ INSERT**.

Ba nhóm miễn, mỗi nhóm một lý do khác nhau:

- **`lot` và `delivery`** — cả hai trải nhiều ngày nghiệp vụ. Lô nhận ngày đã lock
  vẫn bán ngày sau; giao hàng của giao dịch thuộc ngày đã lock vẫn giao tiếp ngày
  sau. Lock hai bảng này là đóng băng nghiệp vụ sống, không phải bảo vệ lịch sử.
- **`accounting_export_batch`** — đây là bản ghi *về* một ngày đã lock, không phải
  ghi *vào* ngày đó. Nó còn phải ghi được **chỉ khi** ngày đã lock:
  `createExportBatch` từ chối `409 DAY_NOT_LOCKED` nếu chưa lock.
- **`correction_request`, `transaction_adjustment`, `lot_attachment`** — cùng loại
  với trên: append-only, ghi về một ngày, không phải sự kiện của ngày.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Trigger trên toàn bộ bảng nghiệp vụ (kể cả `lot`, `delivery`) | Đóng băng nghiệp vụ đang chạy. Sau khi lock ngày N, không nhập được lần giao mới cho lô của ngày N, không đổi trạng thái giao hàng — chợ dừng làm việc lúc 08:00 |
| Trigger trên `lot`/`delivery` nhưng chỉ chặn *một số cột* | Trigger phải biết cột nào "thuộc ngày" cột nào không, trên bảng mà bản chất là trải nhiều ngày. Thêm một bảng quy tắc cột chỉ để nói ra điều mà tách `delivery_shipment` khỏi `delivery` đã nói bằng schema |
| Thêm `BEFORE INSERT` vào cùng trigger | Chặn luôn đường ghi bù (ADR-005) và đường điều chỉnh sau lock (F008) — vốn phải ghi *về* ngày đã lock. Và `accounting_export_batch` chỉ nhận INSERT, chặn INSERT là chặn luôn việc xuất kế toán mà lock chính là điều kiện tiên quyết |
| Thay trigger bằng một cột `is_locked` trên từng dòng, cập nhật lúc lock | Lock một ngày là UPDATE hàng loạt trên 4 bảng — chậm, và bản thân UPDATE đó lại phải lách trigger của chính nó |

## Hệ quả

**Chấp nhận được:** lock bảo vệ đúng dữ liệu lịch sử của ngày, không chạm vào việc
đang chạy. `delivery_shipment` bị khoá theo ngày của chính lần giao, nên tách
`delivery` / `delivery_shipment` làm được cả hai việc một lúc: giao hàng tiếp tục,
lần giao đã ghi thì đóng.

**Phải chịu:** ranh giới này **không tự hiển nhiên từ schema**. Sửa một dòng `lot`
của ngày đã lock vẫn được, và đó là chủ đích — nhưng người kiểm thử nào không đọc
ADR này sẽ báo đó là bug, và người sửa "bug" đó sẽ làm chợ dừng lúc 08:00. Nặng
hơn: trigger **không chặn INSERT**, nên ở tầng DB một dòng `transaction` mới mang
`business_date` là ngày đã lock vẫn ghi được — chỗ duy nhất ngăn việc đó là tầng
ứng dụng đóng dấu ngày bằng `todayJst()` chứ không nhận từ payload. Đó là kỷ luật
code, không phải ràng buộc.

## Dẫn chứng

- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — 4 dòng `create trigger`, kèm comment vì sao không bao giờ `lot`/`delivery`
- `supabase/migrations/20260904090200_lot.sql:18-20` — `lot`: "NOT covered by trg_block_after_lock -- a lot received on a locked day still sells the next day"
- `supabase/migrations/20260904090400_delivery.sql:2-6,16-17` — `delivery` miễn, `delivery_shipment` mang trigger vì nó là ledger theo lần giao
- `supabase/migrations/20260908090000_accounting_export.sql:59-68` — "a record made ABOUT a locked day, not a write INTO that day's own business events"
- `src/lib/accounting/create-export-batch.ts:12` + `src/app/api/accounting/export-batches/route.ts:11` — `DAY_NOT_LOCKED` → 409
- `supabase/migrations/20260907090000_lot_attachment.sql:9-13` — `lot_attachment` miễn theo cùng lý do `lot` miễn
- `docs/pham-vi-va-phan-mock.md:199-203` — QĐ-3, bản văn xuôi gốc
