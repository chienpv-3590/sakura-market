# SC-22 — Kết quả tính 完納奨励金

| | |
|---|---|
| Mã thi công | SCR021_IncentiveResult |
| Route | `/incentive` |
| Loại | List (read-only, không có hành động ghi nào) |
| Actor chính | Bộ phận quyết toán (ROLE-SETTLEMENT) |
| FE- / FR- | FE-030, FE-032, FE-043 / FR-303, ALG-001, ALG-002, BR-INC-01, FR-AUDIT-03 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Xem kết quả tính thưởng hoàn nạp (完納奨励金) của một kỳ — mỗi kỳ là **một ngày nghiệp vụ đã
lock**. Mỗi dòng luôn mang **version biểu suất đã áp dụng cho chính dòng đó** kèm ngày hiệu lực,
để truy vết được số tiền sinh ra từ quy tắc nào. Đây là yêu cầu truy vết (FR-AUDIT-03), không
phải chi tiết trình bày: cột này luôn hiện, không phải bấm mở chi tiết mới thấy.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc (`src/app/(app)/layout.tsx:11`)
- Vai trò được vào: chỉ **ROLE-SETTLEMENT** (`incentive/page.tsx:21`)
- Mã lỗi khi thiếu quyền: **404** (`require-role.ts:72-77`)
- Tiền đề dữ liệu: `incentive_result` chỉ có dòng sau khi engine chạy. Engine chạy ở hai chỗ:
  (a) ngay trong request lock ngày (`reconciliation/[businessDate]/lock/route.ts:57`), (b) ngay
  trong request phê duyệt điều chỉnh (`corrections/[id]/approve/route.ts:92`). Ngày chưa lock →
  màn rỗng.
- Cần có một `incentive_rule_version` `status='active'` với `effective_from <= period`, nếu không
  engine bỏ qua toàn kỳ (`resolve-rule-version.ts:22-26`, `run-incentive-for-period.ts:38-51`)

**Divergence phải khai:** spec gốc mô tả engine là **job nền**. Thi công chạy **đồng bộ trong
request khoá/duyệt** — Vercel không có queue trong phạm vi LAB-3
(`run-incentive-for-period.ts:14-20`, `lock/route.ts:12-16`). Hệ quả: lock ngày chậm thêm theo
số người tham gia, và lỗi engine chỉ để lại dòng audit chứ không làm lock thất bại.

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `period` (bộ lọc) | Kỳ (ngày nghiệp vụ) | 対象期間(営業日) | date | Có — mặc định `todayJst()` | không lưu — tham số URL, lọc trên `incentive_result.period` | `type="date"` + `max={todayJst()}` chặn ngày tương lai ở picker (`incentive/page.tsx:44-47`) | `isValidPeriod()`: đúng `YYYY-MM-DD` và là ngày lịch thật; sai → **âm thầm rơi về `todayJst()`**, không báo lỗi (`incentive/page.tsx:24`, `is-valid-period.ts:8-12`) | không có — không báo gì, chỉ đổi dữ liệu hiển thị |
| 2 | Kỳ | Kỳ | 対象期間 | date — chỉ đọc | — | `incentive_result.period` NOT NULL (`20260904090700_incentive.sql:24`) | không có input | không có input | — |
| 3 | Người tham gia | Người tham gia | 参加者 | text — chỉ đọc | — | `participant.name` join qua `participant_id`; rơi về `participant_id` nếu join rỗng (`incentive-result-queries.ts:38`) | không có input | không có input | — |
| 4 | Số tiền | Số tiền (JPY) | 金額(JPY) | integer JPY — chỉ đọc | — | `incentive_result.amount_jpy` NOT NULL; `floor(eligible * 110 / 100)`, trả **đúng 0** nếu trả trễ, không chia tỷ lệ (`calculate-incentive.ts:13-15`) | không có input | không có input | — |
| 5 | Loại | Bình thường / Chênh lệch (delta) | 通常 / 差額(delta) | enum — chỉ đọc | — | `incentive_result.kind` DEFAULT `'normal'` CHECK in (normal/delta) (`…incentive.sql:27`) | không có input | không có input | — |
| 6 | **Phiên bản biểu suất** | Phiên bản biểu suất | 適用ルールバージョン | text dẫn xuất — chỉ đọc | — | `incentive_rule_version.version_no` + `effective_from`, join qua `incentive_result.rule_version_id` NOT NULL; hiển thị `v{no} ({effective_from})` (`incentive-result-table.tsx:43-45`) | không có input | không có input — cột NOT NULL nên không dòng nào thiếu version | — |
| 7 | Kỳ gốc | Kỳ gốc (nếu là delta) | 元の対象期間(差額の場合) | date nullable — chỉ đọc | — | `incentive_result.origin_period`; `—` nếu null (`incentive-result-table.tsx:46`) | không có input | không có input | — |
| 8 | `participantId` (bộ lọc API) | *không có UI trên màn* | `chưa có key JA` | uuid | Không | tham số `?participantId=` của `GET /api/incentive-results` | **không có input nào ở màn** — chỉ API nhận (`incentive-results/route.ts:17`) | không kiểm định dạng uuid; giá trị lạ → 0 dòng | `chưa có — đề xuất` |
| 9 | `source_correction_id` | *không hiện trên màn* | `chưa có key JA` | uuid nullable | Không | `incentive_result.source_correction_id` FK `correction_request(id)` (`…incentive.sql:29`) | không có input | server gán khi engine chạy delta (`run-incentive-delta.ts:118`) | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | `rows.length === 0` | `EmptyState` "Chưa có kết quả tính thưởng cho kỳ này." | Đổi kỳ |
| đang tải | Server Component đang render | streaming `PageFrame` | không |
| lỗi tải | `listIncentiveResults` throw (`incentive-result-queries.ts:69-71`) | error boundary Next.js | Tải lại |
| không có quyền | vai trò ≠ ROLE-SETTLEMENT | trang 404 | không |
| kỳ không hợp lệ | `?period=` sai định dạng hoặc không phải ngày thật | rơi về hôm nay, **không có thông báo** | Đổi kỳ |
| **ngày chưa lock** | `business_day_lock` chưa có dòng cho kỳ đó | rỗng — engine chưa từng chạy cho kỳ đó | Lock ngày ở SC-18 |
| không có rule đang hiệu lực | `resolveRuleVersion()` trả null | rỗng; dấu vết duy nhất là audit `incentive_skipped_no_rule` (`run-incentive-for-period.ts:41-49`) | Duyệt một `incentive_rule_version` ở SC-24 |
| đang gửi / gửi lỗi | **không áp dụng** — màn không có hành động ghi nào; toàn bộ ghi vào `incentive_result` đi qua service-role trong request lock/duyệt | — | — |
| read-only vì ngày đã lock (423) | **không áp dụng** — `incentive_result` không nằm trong 4 bảng mang `trg_block_after_lock` (`business_day_lock.sql:56-75`); ngược lại, dữ liệu chỉ **xuất hiện** sau khi lock | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | ✓ | toàn bộ 6 cột | chỉ đọc, đổi bộ lọc kỳ | không có mã lỗi nghiệp vụ |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | ✗ | không | không | trang **404**; `GET /api/incentive-results` **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được** `incentive_result` và
`incentive_rule_version` (FR-601, `rls_core.sql:29,57,59`). Chặn là ở **vào trang** và ở
**ghi**: `incentive_result` cố ý **không có policy ghi cho `authenticated`** — chỉ service-role
ghi được (`rls_ops.sql:69-72`). Cùng lý do đó, `payment_record` cũng không có policy ghi
(`rls_ops.sql:74-75`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Đổi kỳ | không có API — form `method="GET"` về chính trang (`incentive/page.tsx:40`) | không ghi | không | không |
| Đọc qua API | `GET /api/incentive-results?period=&participantId=` | không ghi | không | 404 khi sai vai trò · 500 `internal_error` |
| *(gián tiếp)* Lock ngày ở SC-18 | `POST /api/reconciliation/[businessDate]/lock` | `business_day_lock` INSERT, rồi `incentive_result` INSERT `kind='normal'` hàng loạt bằng service-role | `incentive_skipped_no_rule` hoặc `incentive_engine_error` khi lỗi; **không có audit khi thành công** (`lock/route.ts:23-35`, `run-incentive-for-period.ts:61-79`) | lock: 400 · 409 · 500. Engine lỗi **không** làm lock thất bại |
| *(gián tiếp)* Duyệt điều chỉnh ở SC-21 | `POST /api/corrections/[id]/approve` | `incentive_result` INSERT một dòng `kind='delta'`, `period = todayJst()`, `origin_period` = ngày nghiệp vụ gốc | chỉ ghi khi bỏ qua: `incentive_delta_skipped_no_origin`, `incentive_delta_skipped_no_payment_record` | engine lỗi bị bắt và chỉ log, phê duyệt vẫn đứng |

## 7. Edge case

- **`payment_record` là bảng MOCK**, thêm bởi kế hoạch LAB-3, không có trong bất kỳ spec F00x nào
  — nó cấp hai đầu vào của ALG-002 (`eligible_amount_jpy`, `paid_on_time`)
  (`20260904090700_incentive.sql:39-42,55-57`). Số tiền trên màn này chỉ thật ở mức bảng mock đó
  thật. **Đừng đọc như sổ thanh toán thật.**
- **Dòng delta rơi vào kỳ hôm nay, không phải kỳ gốc**: `period = todayJst()`,
  `origin_period` giữ kỳ gốc (`run-incentive-delta.ts:110-118`). Xem kỳ gốc sẽ **không** thấy
  dòng delta — phải xem kỳ hôm nay. Kỳ gốc đã lock nên không được sửa (FR-401), đúng thiết kế,
  nhưng dễ đọc lệch.
- **Delta dùng rule của kỳ gốc, không phải rule hôm nay**: đọc `rule_version_id` từ dòng
  `kind='normal'` của kỳ gốc, không gọi lại `resolveRuleVersion()`
  (`run-incentive-delta.ts:24-30,52-58`). Đổi biểu suất hôm nay không rỉ vào kỳ cũ.
- **Chạy lock hai lần cho cùng một ngày**: `business_day_lock` chặn ở tầng lock (409), nên engine
  không chạy lần hai. Nhưng `incentive_result` **không có unique** trên
  `(participant_id, period, kind)` — nếu có đường nào gọi engine lại thì sinh dòng trùng.
  `chưa có — đề xuất`: unique partial index cho `kind='normal'`.
- **Trả trễ = đúng 0, không chia tỷ lệ** (`calculate-incentive.ts:14`). Dòng 0 JPY vẫn được ghi,
  không bị bỏ — đừng lọc mất khi đối chiếu.
- **Làm tròn luôn xuống** `Math.floor`, không `Math.round` (`calculate-incentive.ts:15`). JPY
  không có đơn vị nhỏ hơn 1 yên.
- **Biểu suất 110/100 cố định trong code**, không đọc từ `rate_table` — `rate_table` chỉ là
  metadata hiển thị/audit (`create-rule-version.ts:24-26,53`). Đổi biểu suất thật phải sửa code,
  không phải tạo version mới. Đây là divergence so với ý nghĩa "phiên bản biểu suất".
- **`eligible` âm bị chặn ở 0**: adjustment `reverse` có thể kéo baseline xuống âm, engine kẹp
  về 0 (`run-incentive-delta.ts:107`).
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → 307 `/login?reason=inactive`; đổi vai trò → 404.

## 8. Dẫn chứng

- `src/app/(app)/incentive/page.tsx:14-15,21,24,40-50,59` — chú thích SCR, `requireRole`, `isValidPeriod`, form lọc, bảng
- `src/components/incentive/incentive-result-table.tsx:4-7,24-29,43-46` — cột version luôn hiện (FR-AUDIT-03), **6 cột** (Kỳ · Người tham gia · Số tiền · Loại · Phiên bản biểu suất · Kỳ gốc — đếm `<th>` ở dòng 24-29; cẩn thận `grep '<th'` vì nó khớp cả `<thead>` dòng 22), `—` cho kỳ gốc
- `src/lib/incentive/incentive-result-queries.ts:38,50-56,61-72` — rơi về `participant_id`, join version, lỗi query
- `src/lib/incentive/calculate-incentive.ts:13-15` — `floor(eligible*110/100)`, trễ = 0
- `src/lib/incentive/resolve-rule-version.ts:4-13,19-26` — ALG-001 chọn version đang hiệu lực
- `src/lib/incentive/run-incentive-for-period.ts:14-20,32-51,61-79` — engine đồng bộ, bỏ qua khi không có rule
- `src/lib/incentive/run-incentive-delta.ts:18-33,52-58,107,110-120` — delta dùng rule kỳ gốc, kẹp 0, `period=todayJst()`
- `src/app/api/reconciliation/[businessDate]/lock/route.ts:12-16,17-37,57` — engine chạy trong request lock
- `src/app/api/corrections/[id]/approve/route.ts:12-30,92` — engine delta chạy trong request duyệt
- `src/app/api/incentive-results/route.ts:10-11,12,17-18` — API read-only, `requireRole`
- `supabase/migrations/20260904090700_incentive.sql:21-42,43-57` — DDL `incentive_result`, bảng mock `payment_record`
- `supabase/migrations/20260904091000_rls_ops.sql:69-75` — không có policy ghi cho `authenticated`
- `supabase/migrations/20260904090900_rls_core.sql:29,57,59` — FR-601, mọi vai trò đọc được
- `docs/generated/permissions-matrix.md:842-855` — PERM021, ROLE-SETTLEMENT độc quyền
