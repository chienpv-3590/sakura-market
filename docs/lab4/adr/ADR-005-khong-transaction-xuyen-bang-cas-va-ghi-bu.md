# ADR-005 — Không có transaction xuyên bảng: CAS + ghi bù

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | `lot.available_qty`; `reserveLotQty`/`releaseLotQty`; xác nhận và huỷ giao dịch (F004), nhập kết quả せり (F005), ghi lần giao (F006), đính kèm chứng từ (F003); mọi chỗ gọi `writeAuditLog()` |

## Bối cảnh

Ràng buộc nghiệp vụ `BR-LOT-02`: `lot.available_qty` không bao giờ âm. Cách chuẩn
là một câu SQL nguyên tử:

```sql
UPDATE lot SET available_qty = available_qty - :qty
 WHERE id = :id AND available_qty >= :qty
```

Không viết được qua stack này. PostgREST chỉ nhận **giá trị literal** cho cột trong
payload UPDATE, nên biểu thức `available_qty - :qty` không tồn tại. Và PostgREST
không cấp `BEGIN`/`COMMIT` xuyên nhiều lệnh cho client — mỗi request REST là một
statement tự commit. Nghĩa là mọi thao tác chạm hai bảng (trừ số lượng lô **và**
ghi dòng giao dịch) không có transaction nào để dựa vào.

## Lựa chọn

Vòng lặp **compare-and-swap** ở tầng ứng dụng, cộng **ghi bù** cho việc chạm hai
bảng:

- Đọc `available_qty` hiện tại → tính giá trị mới trong JS → ghi lại với điều kiện
  `available_qty` vẫn đúng bằng giá trị vừa đọc (`.eq("available_qty", current)`).
  Thua CAS thì đọc lại và thử tiếp, tối đa 25 lần.
- Postgres tự khoá dòng ở mức row cho UPDATE, nên mỗi vòng chỉ một người thắng;
  người thua thấy 0 dòng bị ảnh hưởng và thử lại trên giá trị mới.
- `CHECK (available_qty >= 0)` giữ nguyên làm tuyến phòng thứ hai.
- Chạm hai bảng thì bù bằng tay: huỷ giao dịch gọi `releaseLotQty()` trả lại số
  lượng; upload file xong mà insert `lot_attachment` lỗi thì route tự xoá object
  vừa upload.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| `BEGIN`/`COMMIT` qua client PostgREST | PostgREST không cấp transaction xuyên nhiều lệnh cho client. Không phải chọn — không có |
| `SELECT ... FOR UPDATE` (pessimistic lock) | Cũng không gọi được qua PostgREST client; nó cần một session SQL giữ mở |
| Database function PL/pgSQL `security definer` gói cả cặp ghi trong một transaction Postgres thật | **Đây là phương án đúng cho bản thật** và đã ghi vào việc của LAB-5. Bỏ ở LAB-3 vì đẩy logic nghiệp vụ xuống SQL và hết ngân sách để viết + kiểm PL/pgSQL trong vòng này |
| Optimistic lock bằng cột `version` hoặc `updated_at` | Thêm một cột chỉ để làm đúng việc mà `.eq("available_qty", current)` đã làm. CAS trên chính cột số lượng vừa là điều kiện tương tranh vừa là ràng buộc nghiệp vụ — một cột, hai việc |
| Hàng đợi tuần tự hoá mọi lần đặt chỗ trên cùng một lô | Không có hạ tầng queue trên stack này (cùng lý do ADR-008), và tuần tự hoá làm chậm đúng khung giờ cao điểm 02:30–05:00 |

## Hệ quả

**Chấp nhận được:** oversell bị chặn thật, kiểm bằng số trên database sống — 20
request đặt chỗ đồng thời trên cùng một lô cho đúng **10 request thành công**,
`available_qty` không bao giờ âm; 8 request xác nhận đồng thời trên cùng một giao
dịch cho đúng **1 request thành công**, số lượng chỉ bị trừ một lần. Không thêm
hạ tầng nào.

**Phải chịu:** `writeAuditLog()` chạy **SAU** khi nghiệp vụ đã commit, và không
rollback được — **nghiệp vụ thành công mà audit thất bại là trạng thái có thật**,
không phải giả thiết. Nặng hơn: nếu server crash đúng giữa hai lệnh ghi (đã trừ
`available_qty` nhưng chưa ghi được dòng `transaction`), cặp ghi lệch nhau và phải
dọn bằng tay — không có gì tự phát hiện. Ghi bù cũng chỉ bù được khi tiến trình
còn sống để chạy nó. Và CAS thua 25 vòng thì `reserveLotQty` ném lỗi, biểu hiện
với người dùng là 500 chứ không phải "lô hết hàng".

## Dẫn chứng

- `src/lib/lots/availability-service.ts:6-31` — lý do không viết được câu UPDATE nguyên tử; `MAX_CAS_ATTEMPTS = 25`
- `src/lib/lots/availability-service.ts:57-76` — vòng CAS, `.eq("available_qty", current)` làm guard, ném lỗi khi hết lượt
- `src/lib/lots/availability-service.ts:80-109` — `releaseLotQty()`, đường ghi bù khi huỷ giao dịch
- `src/lib/lots/attach-intake-doc.ts:20,46-58` — ghi bù phía Storage: xoá lại object khi insert lỗi
- `src/lib/audit/write-audit-log.ts:14-28` — audit là một write riêng, feature tự quyết có rollback hay không
- `supabase/migrations/20260904090200_lot.sql:2-4,11` — `CHECK (available_qty >= 0)` là tuyến phòng thứ hai
- `docs/pham-vi-va-phan-mock.md:152-159,215-223,269-272` — QĐ-5, hệ quả đã ghi vết, và số kiểm sống
