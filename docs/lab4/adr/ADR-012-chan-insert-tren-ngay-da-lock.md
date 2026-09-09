# ADR-012 — Chặn INSERT trên ngày đã lock

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — chưa thi công |
| Phạm vi ảnh hưởng | Trigger `trg_block_after_lock` trên `transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`; `POST /api/transactions`, `POST /api/seri-results`, `POST /api/lots/[id]/mekiki`, `recordShipment()`; view `reconciliation_line`; màn SC-18 (lock kỳ), SC-09 (目利き), SC-16 (chi tiết giao hàng) |

## Bối cảnh

Đây **không phải bốn bug lẻ trên bốn bảng** — nó là hệ quả chưa lường của một quyết
định kiến trúc có chủ đích. `lock_enforcement_fix.sql` cố ý **dồn toàn bộ việc thực thi lock vào trigger**. Lý
do ở comment dòng 12–22, kèm bằng chứng thực nghiệm: điều kiện lock trong `USING` của
RLS lọc hàng ra khỏi UPDATE **trước khi** trigger `BEFORE ROW` chạy, nên client
`authenticated` nhận `200 []` thay vì lỗi phân biệt được. Bản fix `drop` policy
`no_write_when_locked` trên **cả 4 bảng**, thay bằng policy chỉ kiểm vai trò (`:24-46`)
— nên **không còn bất kỳ kiểm lock nào trong RLS**, không phải "chỉ còn ở nhánh
update". Đó là QĐ-4 / ADR-004, và đúng cho mục tiêu của nó: một mã `P0001` phân biệt
được, chặn cả `service_role`, chặn cả psql.

**Nhưng nó biến trigger thành điểm thực thi DUY NHẤT. Và trigger chưa bao giờ phủ
INSERT** — cả 4 đều `before update or delete` (`business_day_lock.sql:61-75`). Nên
đường INSERT mất chỗ chặn cuối cùng: RLS không còn kiểm lock, trigger không xét INSERT,
route không tra `business_day_lock`. Ba tầng, không tầng nào canh.

| Bảng | Policy insert (chỉ vai trò) | Kiểm lock ở route |
|---|---|---|
| `delivery_shipment` | `write_delivery` (`rls_ops.sql:37-38`) | `record-shipment.ts` grep `lock`: **0** |
| `mekiki_record` | `write_judge` (`rls_core.sql:91-92`) | `mekiki/route.ts` không tra lock |
| `transaction` | `write_trade` (`rls_ops.sql:7-8`) | `transactions/route.ts` grep: **0** |
| `seri_result` | `write_trade` (`rls_ops.sql:15-16`) | `seri-results/route.ts` grep: **0** |

Nên trên ngày **đã lock** vẫn **tạo mới** được: giao dịch, bản ghi せり, bản ghi 目利き,
lần giao. Sửa thì bị chặn, tạo thì không. Đường 目利き còn kéo theo trạng thái: sau khi
chốt ngày, `ROLE-JUDGE` vẫn thêm được bản ghi **và** lô vẫn lật `received → published`
(`mekiki/route.ts:45-51`).

**Hệ quả đã kiểm, không phải suy đoán:** `reconciliation_line` đọc `delivery_shipment`
ở hai chỗ — luỹ kế đã giao để tính `variance` nhánh `aitai`
(`reconciliation_view.sql:15-20`, join ở dòng 17) và nhánh `delivery` (`:38-46`). Thêm
một dòng cho ngày đã lock là **số đối chiếu của ngày đó đổi**, dù mọi dòng cũ đều bất
biến đúng như lock hứa. ADR-003 khai hiện trạng này ở mục "Phải chịu"; ADR-004 là
quyết định tạo ra nó. **ADR-012 là quyết định sửa nó.**

## Lựa chọn

Mở rộng `trg_block_after_lock` thành `BEFORE INSERT OR UPDATE OR DELETE` trên đúng 4
bảng đó. Hàm trigger không cần đổi — nó đã đọc
`coalesce(new.business_date, old.business_date)`, và với INSERT thì `new` luôn có. Phạm
vi 4 bảng giữ nguyên theo ADR-003; `accounting_export_batch` **phải** tiếp tục miễn vì
nó chỉ nhận INSERT và lock chính là điều kiện để xuất (`create-export-batch.ts:12` →
`409 DAY_NOT_LOCKED`).

**Mẫu đã có sẵn trong repo — ba chỗ làm đúng, làm theo:** khi trigger bắn `P0001`,
route dịch thành `423` chứ không để lọt 500 — `seri-results/[id]/route.ts:101`,
`lots/[id]/route.ts:76`, `handle-locked-write.ts:41` (kèm ghi `audit_log`
`action='locked_write_attempt'`). Nên mở rộng trigger không cần cơ chế mới, chỉ cần
các route INSERT bắt `P0001` theo đúng ba mẫu này.

**Một căng thẳng ADR này KHÔNG tự quyết:** luồng "giao muộn, ghi bù" hiện đang chạy
được sẽ vỡ. Một lần giao xảy ra thật sau khi ngày đã lock, hôm nay ghi được vào
`delivery_shipment`; chặn cứng INSERT là chặn luôn nó. Hai đường — (i) ghi bù qua
`correction_request` như mọi chỉnh sửa sau lock, hay (ii) cho phép INSERT có kiểm soát
cho đúng `delivery_shipment` — **RFP không nói rõ**. RFP dòng 1313 nói lần giao "phải
được ghi nhận và đối chiếu **trước khi chốt**" và đòi mọi chỉnh sửa sau chốt qua
`FORM-CORR-01`; đọc chặt thì (i) đúng hơn, nhưng nó biến một lần giao thật thành một
yêu cầu phê duyệt. Phải hỏi chủ đầu tư, không tự chọn.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Thêm điều kiện lock vào RLS insert policy của 4 bảng | Dựng lại đúng thứ `lock_enforcement_fix.sql:12-22` vừa cố ý tháo ra, và tháo vì đã đo được là hỏng. Thêm nữa `service_role` mang `BYPASSRLS` nên bỏ qua policy hoàn toàn — RLS không bao giờ là chỗ chặn cuối được |
| Kiểm ở tầng ứng dụng: tra `business_day_lock` trước mỗi lần INSERT | Race window giữa lúc tra và lúc ghi, và mọi đường ghi mới phải nhớ tra. `cancel-transaction.ts:16-17` đã chọn ngược lại có chủ đích: để trigger bắn rồi dịch lỗi |
| Giữ nguyên, dựa vào việc `business_date` luôn do server đóng dấu | Đúng là không đường nào nhận `business_date` từ payload (`transactions/route.ts:63-65` ghi thẳng điều đó). Nhưng nó không chặn được đường không qua app, và không cứu hai ca thật ở mục "Phải chịu" — trong đó có một ca backdate được bằng UI bình thường |
| Chặn INSERT bằng `CHECK` trên cột `business_date` | `CHECK` không được đọc bảng khác, nên không tra được `business_day_lock`. Không phải chọn, mà là không làm được |
| Chặn INSERT cho cả nhóm bảng đang miễn trừ luôn cho gọn | `accounting_export_batch` chỉ nhận INSERT và **chỉ được** ghi khi ngày đã lock. Chặn là chặn luôn việc xuất kế toán — cùng lý do miễn trừ ở ADR-003 |

## Hệ quả

**Chấp nhận được:** lock giữ đúng điều nó hứa — số của ngày đã chốt không đổi, kể cả
bằng đường thêm dòng mới. Điểm thực thi duy nhất phủ đủ ba loại thao tác, nên "phạm vi
trigger = phạm vi bảo vệ" thành một câu đúng; một mã `P0001` cho cả ba, và ba mẫu dịch
lỗi đã có sẵn trong repo.

**Phải chịu:**

- **Hai kiểu rủi ro khác nhau, mở rộng trigger phải trả lời được cả hai:**
  - *Ba bảng đóng dấu `todayJst()`* (`transactions/route.ts:65`,
    `seri-results/route.ts:75`, `record-shipment.ts:131`): qua UI **không backdate
    được**. Lỗ hổng thật là **lock ngày HÔM NAY rồi vẫn ghi tiếp trong cùng ngày đó** —
    chốt buổi sáng 08:00–10:00, ghi tiếp lúc 11:00. Chặn INSERT đóng đúng ca này.
  - *`mekiki_record` khác hẳn*: nó thừa hưởng `lot.business_date`
    (`mekiki/route.ts:61`), không phải `todayJst()`. `lot` cố ý miễn lock (ADR-003) vì
    trải nhiều ngày, nên lô nhận ngày N mà chấm 目利き ngày N+1 sẽ ghi
    `business_date = N` — **backdate vào ngày quá khứ đã lock, bằng UI bình thường,
    không cần `service_role`**. Nặng hơn, và chặn INSERT sẽ làm việc chấm 目利き muộn
    **không còn ghi được**: phải quyết trước là đổi sang `todayJst()` (mất liên kết
    ngày với lô) hay cho đi qua đường điều chỉnh.
- **Luồng "giao muộn, ghi bù" vỡ nếu chặn cứng.** ADR này để ngỏ có chủ đích; cho tới
  khi chủ đầu tư quyết, phần `delivery_shipment` không triển khai được. Và một lần giao
  thật không ghi được nữa thì người vận hành sẽ ghi vào giấy hoặc bảng tính — đúng thứ
  RFP §02-06 đang muốn dẹp.
- **Sau ADR-012, ngày đã lock là đóng hoàn toàn**: không UPDATE/DELETE/INSERT, kể cả
  `service_role` — mọi thứ qua `correction_request` + phê duyệt, nên sự cố lúc 03:00
  phải chờ người thứ hai duyệt. Seed/backfill lịch sử cũng bị chặn: script seed phải
  lock **sau** khi seed, không lock trước.

## Dẫn chứng

- `20260904091100_lock_enforcement_fix.sql:12-22` — lý do dồn lock vào trigger, kèm bằng chứng thực nghiệm `200 []`
- `20260904091100_lock_enforcement_fix.sql:24-46` — `drop policy "no_write_when_locked"` trên **cả 4 bảng**, thay bằng policy chỉ kiểm vai trò → **RLS không còn kiểm lock ở đâu**
- `20260904090500_business_day_lock.sql:61-75` — cả 4 trigger `before update or delete`, không INSERT; `:42` hàm trigger đã đọc `coalesce(new..., old...)` nên dùng được cho INSERT không cần sửa
- `20260904091000_rls_ops.sql:7-8,15-16,37-38` và `20260904090900_rls_core.sql:91-92` — insert policy của cả 4 bảng chỉ kiểm vai trò (`rls_core.sql:93-97` có kiểm lock nhưng là `for update`/`for delete`, và đã bị drop)
- `src/app/api/lots/[id]/mekiki/route.ts:45-51,61` — lô lật `received → published` rồi ghi `business_date: lot.business_date`; `src/app/api/transactions/route.ts:63-65` ("never taken from" payload), `seri-results/route.ts:75`, `record-shipment.ts:131` — ba bảng kia đóng dấu `todayJst()`
- `src/app/api/seri-results/[id]/route.ts:101`, `src/app/api/lots/[id]/route.ts:76`, `src/lib/reconciliation/handle-locked-write.ts:41` — ba mẫu dịch `P0001` → `423` đã làm đúng
- `20260904090800_reconciliation_view.sql:15-20,38-46` — `reconciliation_line` đọc `delivery_shipment` ở hai chỗ; `src/lib/accounting/create-export-batch.ts:12` — `DAY_NOT_LOCKED`, `accounting_export_batch` phải giữ miễn trừ
- RFP dòng 1313 — lần giao ghi nhận "trước khi chốt"; mọi chỉnh sửa sau chốt qua `FORM-CORR-01`
- `docs/lab4/adr/ADR-003-pham-vi-trigger-khoa-ngay.md`, `ADR-004-lock-o-trigger-khong-o-rls.md` — ADR-003 khai hiện trạng, ADR-004 là quyết định tạo ra nó
