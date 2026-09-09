# ADR-008 — Engine 完納奨励金 chạy đồng bộ trong request thay vì job nền

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | Đã áp dụng |
| Phạm vi ảnh hưởng | `POST /api/reconciliation/[businessDate]/lock`, `POST /api/corrections/[id]/approve`; `runIncentiveForPeriod`, `runIncentiveDelta`; bảng `incentive_result`; màn SC-18 (lock kỳ), SC-21 (duyệt điều chỉnh), SC-22 (kết quả 完納奨励金) |

## Bối cảnh

F009 (`ALG-001`, `ALG-002`, `FR-301`, `FR-302`) đòi tính 完納奨励金 sau khi chốt
ngày nghiệp vụ, và tính lại phần chênh sau khi duyệt một điều chỉnh. Spec mô tả
việc này như một **job nền**.

Stack LAB-3 là Next.js trên Vercel, không có hạ tầng queue nào trong phạm vi: không
Redis, không worker, không job runner. Đây là cùng một khoảng trống hạ tầng khiến
`FR-NOTIFY-01..03` (SC-28/29) phải để ngoài phạm vi.

Kết quả tính phải có ngay: màn SC-22 mở ngay sau khi lock, và người vận hành mong
thấy số ở đó.

## Lựa chọn

Chạy **đồng bộ ngay trong request** — `runIncentiveAfterLock()` trong route lock,
`runIncentiveDeltaAfterApproval()` trong route duyệt điều chỉnh.

Cả hai bọc `try/catch`: lỗi engine **không bao giờ** làm thao tác chính thất bại.
Lock ngày là một chiều và không có endpoint unlock nào trong codebase, nên để một
tính toán phụ chặn được việc chốt ngày là sai thứ tự ưu tiên. Lỗi engine ở đường
lock được ghi `audit_log` với `action='incentive_engine_error'`.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Vercel Cron + endpoint chạy theo lịch | Cron nhỏ nhất là theo phút và chạy tách khỏi request. SC-22 mở ngay sau lock sẽ hiển thị rỗng trong khoảng chờ, mà không có gì trên màn nói vì sao rỗng |
| Queue ngoài (Upstash/QStash) | Thêm một service phải nuôi, một tài khoản nữa, một điểm hỏng nữa — cho một prototype ngân sách 10h |
| `pg_cron` + hàm PL/pgSQL trong Postgres | `ALG-002` là hàm thuần JS, kiểm được trực tiếp bằng `node -e`. Chuyển sang PL/pgSQL là viết lại phép làm tròn XUỐNG trong SQL và mất luôn cách kiểm đang có — đúng phần dễ sai nhất (`Math.round` thay `Math.floor`) |
| Để lỗi engine làm request lock thất bại (fail loud) | Lock ngày là thao tác chính và một chiều, không có unlock. Để engine chặn lock là để một tính toán phụ khoá mất việc chốt ngày |
| Bỏ tính tự động, thêm nút "Tính 完納奨励金" bấm tay | Người vận hành sẽ quên bấm, và không có gì phát hiện kỳ nào chưa tính. Tệ hơn chậm |

## Hệ quả

**Chấp nhận được:** kết quả có ngay khi lock xong, không thêm hạ tầng nào. Lỗi
engine không kéo thao tác lock chết theo, và ở đường lock nó để lại vết audit chứ
không im lặng hoàn toàn.

**Phải chịu:** request lock **kéo dài theo khối lượng tính** — số dòng
`payment_record` của kỳ; không có giới hạn hay phân trang nào trong code. Lỗi engine
ảnh hưởng trực tiếp thao tác lock ở chỗ nó nằm trong cùng một request: engine chậm
là người bấm lock phải chờ, và Vercel có trần thời gian cho một request. Khung giờ
cao điểm 02:30–05:00 (RFP §02-07) không chịu được tính toán nặng đồng bộ, và cửa
sổ chốt 08:00–10:00 còn hẹp hơn. Nặng nhất: vì lỗi bị nuốt bằng `try/catch`, một
kỳ có thể lock xong mà **không có dòng `incentive_result` nào** — đường duyệt điều
chỉnh còn không ghi audit, chỉ `console.error`. Không màn nào báo, và SC-30 (tra
cứu audit) thì ngoài phạm vi nên cũng chưa có chỗ để tra.

## Dẫn chứng

- `src/app/api/reconciliation/[businessDate]/lock/route.ts:12-37` — "runs synchronously right after the lock commits (QĐ-5: no queue on this stack)"; `try/catch` + `audit_log action='incentive_engine_error'`
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:39-40` — "No unlock endpoint exists anywhere in this codebase -- FR-401 makes this one-way"
- `src/app/api/corrections/[id]/approve/route.ts:11-30` — `runIncentiveDeltaAfterApproval`, lỗi chỉ `console.error`, không ghi audit
- `src/app/api/corrections/[id]/approve/route.ts:92` — gọi `await` ngay trong request duyệt
- `src/lib/incentive/calculate-incentive.ts:1-16` — hàm thuần, kiểm bằng `node -e`; ba lỗi spec cảnh báo, gồm `Math.round` thay `Math.floor`
- `docs/pham-vi-va-phan-mock.md:148-151` — quyết định gốc, dạng văn xuôi
- `docs/pham-vi-va-phan-mock.md:273-275` — kiểm sống: `987654 → 1086419`, quá hạn `→ 0`, `1235 → 1358` (chứng minh floor, round sẽ ra 1359)
- RFP `§02-07` dòng 297-305 — khung giờ cao điểm 02:30–05:00, cửa sổ chốt 08:00–10:00
