# ADR-004 — Đặt lock ở trigger chứ không ở RLS

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | RLS policy trên `transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`; hàm `private.is_business_day_locked()`, `private.block_writes_when_locked()`; `respondLockedWrite()`; mọi script quản trị chạy bằng `service_role` |

## Bối cảnh

Supabase có sẵn RLS, và đặt điều kiện lock vào `USING` của policy là cách viết
ngắn nhất. Bản đầu làm đúng như thế, rồi kiểm sống thì vỡ ở hai chỗ:

1. **RLS lọc dòng trước khi trigger `BEFORE ROW` chạy.** Điều kiện lock nằm trong
   `USING` nghĩa là dòng bị loại khỏi tập ứng viên của UPDATE, và client
   `authenticated` nhận `200 []` — im lặng. Không phân biệt được "ngày đã lock"
   với "không có dòng nào" hay "sai vai trò". Cả tầng ứng dụng phía trên dựa vào
   việc phân biệt ba trường hợp đó để trả 423 chứ không phải 404.
2. **`service_role` mang thuộc tính `BYPASSRLS` của Postgres.** Nó bỏ qua mọi
   policy. Một Route Handler dùng admin client, hay một phiên psql, ghi xuyên qua
   ngày đã lock mà RLS không thấy gì.

`FR-402` đòi ghi sau lock bị chặn — không phải "bị chặn với người dùng bình thường".

## Lựa chọn

RLS chỉ giữ **điều kiện vai trò**. Điều kiện lock là việc riêng của trigger
`trg_block_after_lock`, nên nó bắn cùng một lỗi `P0001`
(`ERR_LOCKED_BUSINESS_DAY`) cho mọi loại caller — `authenticated`, `service_role`,
psql trực tiếp, như nhau.

Kèm theo: `service_role` phải được `grant usage` tường minh lên schema `private`
và `grant execute` lên hàm tra lock. `BYPASSRLS` chỉ bỏ qua RLS, nó **không** tự
cấp quyền schema/hàm — thiếu grant thì trigger chết ở chính lệnh tra lock và trả
`42501 permission denied` thay vì `P0001`.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Điều kiện lock trong `USING` của RLS policy (bản đầu, đã deploy rồi rút) | RLS trả `200 []` im lặng thay vì lỗi phân biệt được, và `service_role` bỏ qua policy hoàn toàn. Kiểm sống xác nhận cả hai |
| Giữ lock ở cả RLS lẫn trigger cho "hai lớp" | Lớp RLS lọc dòng trước, nên trigger không bao giờ chạy với `authenticated` — người dùng thường vẫn nhận `200 []`. Hai lớp mà lớp ngoài che mất lớp trong thì không phải hai lớp |
| Chặn ở tầng ứng dụng: tra `business_day_lock` trước mỗi lần ghi | Race window giữa lúc tra và lúc ghi; và mọi đường ghi mới phải nhớ tra. `cancel-transaction.ts:16-17` ghi thẳng là **không** tự tra, cứ để trigger bắn rồi dịch lỗi |
| Thu hồi quyền ghi của `service_role` trên 4 bảng | Cùng key đó cần cho seed, cho engine 完納奨励金 (ADR-008), cho ghi audit khi chưa có session. Rút quyền ghi là chặn luôn những việc đó |
| Bỏ `service_role` khỏi hệ, chỉ dùng `authenticated` | Có việc không có session người dùng nào để mượn — ghi `audit_log` lúc đăng nhập thất bại là ví dụ |

## Hệ quả

**Chấp nhận được:** đúng một cơ chế thực thi ràng buộc, một mã lỗi, mọi caller như
nhau. Kiểm sống xác nhận: cả client `authenticated` lẫn client `service_role`
(BYPASSRLS) đều nhận `P0001` giống nhau. Tầng ứng dụng dịch `P0001` thành
`423 LOCKED_BUSINESS_DATE` ở một chỗ duy nhất, kèm ghi `audit_log`
`action='locked_write_attempt'`.

**Phải chịu:** trigger chặn cả `service_role`, nên **script quản trị hợp lệ CŨNG
bị chặn**. Không có cửa sau nào: muốn sửa dữ liệu của một ngày đã lock thì phải đi
đường điều chỉnh sau lock (F008 — tạo yêu cầu, người khác duyệt), kể cả khi việc
cần sửa là một lỗi kỹ thuật hiển nhiên. Đó là chủ đích, nhưng nó có giá: một sự cố
cần vá gấp lúc 03:00 không vá được bằng một câu UPDATE. Thêm nữa, bản thân trigger
**không tự ghi audit** — Postgres không có autonomous transaction để giữ một INSERT
sống sót song song với statement vừa bị rollback — nên một lần ghi bị chặn mà đi
vòng qua tầng ứng dụng vẫn bị chặn đúng nhưng **không để lại vết nào**.

Và hệ quả nặng nhất chỉ lộ ra khi soát lại ở LAB-4: **dồn lock vào trigger thì phạm vi
trigger trở thành phạm vi bảo vệ** — RLS không còn kiểm lock ở đâu nữa, nên bất cứ thao
tác nào trigger không xét là không còn tầng nào chặn. Phạm vi đó thiếu INSERT (ADR-003).
Xem **ADR-012**, quyết định sửa.

## Dẫn chứng

- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:1-8` — Fix #1: `BYPASSRLS` không cấp quyền schema; kiểm thực nghiệm trả `42501` chứ không phải `P0001`
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:12-22` — Fix #2: RLS lọc dòng trước trigger, `authenticated` nhận `200 []`
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:24-46` — policy còn lại chỉ kiểm vai trò
- `supabase/migrations/20260904090500_business_day_lock.sql:37-54` — hàm trigger, `errcode = 'P0001'`, comment "fires for every caller including service_role/BYPASSRLS clients and raw psql"
- `src/lib/reconciliation/handle-locked-write.ts:17-23,41` — 423 + audit, và lý do dùng client mới: không có autonomous transaction
- `src/lib/transactions/cancel-transaction.ts:16-17` — tầng ứng dụng cố ý không tự tra lock
- `docs/pham-vi-va-phan-mock.md:204-214,267-268` — QĐ-4 và kết quả kiểm sống
