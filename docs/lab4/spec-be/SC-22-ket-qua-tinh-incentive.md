# SC-22 — Kết quả tính 完納奨励金 · Spec BE

| | |
|---|---|
| FE liên quan | FE-030 (Engine tính 完納奨励金), FE-032 (Delta tiền thưởng kỳ tiếp theo), FE-043 (Hiển thị version rule đã áp dụng) |
| FN | FN-09 (Tính 完納奨励金 và quản lý phiên bản quy tắc), FN-13 (Kiểm toán và truy vết) |
| Ưu tiên | P0 (FE-030, FE-032) · P1 (FE-043) |
| Yêu cầu khách | BR-INC-01, FR-INC-01, FR-INC-03, FR-AUDIT-03, FR-AUDIT-01, NFR-PERF-02, NFR-OPS-01 |
| Miền dữ liệu | D-INCENTIVE, D-SETTLE |
| State machine | FIG-013 (RFP:665) — nhánh quyết toán → tính thưởng |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

BE của màn này **chỉ đọc**: trả kết quả tính 完納奨励金 của một kỳ (một ngày nghiệp vụ JST đã
chốt), mỗi dòng kèm phiên bản biểu suất đã áp dụng, kỳ gốc và nguyên nhân.

**Không** làm ở màn này: engine tính thưởng không được kích hoạt từ đây. Engine chạy do hai sự
kiện của màn khác — chốt ngày nghiệp vụ (SC-18, `FR-SETTLE-02`) và phê duyệt yêu cầu điều chỉnh
(SC-21, `FR-CORR-02`). Màn này cũng không có bất kỳ đường ghi nào cho người dùng đăng nhập: bảng
kết quả chỉ nhận thêm dòng từ engine. Quản lý phiên bản biểu suất thuộc SC-23/SC-24.

## 2. Hợp đồng API

### `GET /api/incentive-results`

| | |
|---|---|
| Thoả yêu cầu | FE-030 · FE-032 · FE-043 · FR-INC-01 · FR-INC-03 · FR-AUDIT-03 |
| Xác thực | bắt buộc |
| Vai trò được gọi | ROLE-SETTLEMENT |
| Idempotent | có — chỉ đọc, không ghi |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `period` | query | date `YYYY-MM-DD` | có | ngày lịch thật; **không** ở tương lai; hiểu theo JST | BR-INC-01 (mốc JST/ngày nghiệp vụ) |
| `participantId` | query | uuid | không | rỗng = toàn kỳ | FE-030 (một dòng mỗi người tham gia) |

Server tự quyết, **không nhận từ client**: danh tính người gọi và vai trò (lấy từ session),
múi giờ dùng để giải nghĩa `period` (luôn JST), và tập dòng trả về (không có tham số nào cho
phép client bỏ dòng `amount_jpy = 0`).

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `period` | date | kỳ của dòng — ngày nghiệp vụ JST |
| `participantId` / `participantName` | uuid / string | người tham gia; `participantName` là tên hiển thị hoặc mã, **không bao giờ email** |
| `amountJpy` | integer | số tiền thưởng; JPY nguyên, có thể âm với dòng delta |
| `kind` | enum `normal` \| `delta` | loại dòng |
| `ruleVersionNo` / `ruleEffectiveFrom` | integer / date | phiên bản biểu suất đã áp dụng và ngày hiệu lực của nó — **không bao giờ null** (FR-AUDIT-03) |
| `originPeriod` | date \| null | kỳ gốc mà dòng delta điều chỉnh; null với `normal` |
| `reason` | object | `{ code, correctionCode? }` — `paid_on_time` \| `overdue_zero` \| `correction_delta`; `correctionCode` bắt buộc khi `code = correction_delta` (FR-INC-03 "delta có nguyên nhân rõ ràng") |
| `deltaInPeriods` | date[] | với dòng `normal`: các kỳ sau đã phát sinh delta trỏ về kỳ này — chiều truy vết thứ hai mà FE-032 đòi |

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 422 | `PERIOD_INVALID_FORMAT` | `period` thiếu, sai dạng `YYYY-MM-DD`, hoặc không phải ngày lịch thật | BR-INC-01 |
| 422 | `PERIOD_IN_FUTURE` | `period` lớn hơn ngày nghiệp vụ JST hiện tại | BR-INC-01 |
| 422 | `PARTICIPANT_ID_INVALID` | `participantId` có mặt nhưng không phải uuid | FR-INC-01 |
| 404 | `NOT_FOUND` | vai trò người gọi ≠ ROLE-SETTLEMENT (không lộ sự tồn tại tài nguyên) | TBL-ROLE-01 |
| 409 | `NO_ACTIVE_RULE_VERSION` | kỳ đã chốt nhưng không có phiên bản biểu suất nào hiệu lực tại `period` nên engine đã bỏ qua toàn kỳ | FR-INC-01, FR-INC-02 |
| 500 | `INTERNAL_ERROR` | truy vấn thất bại | — |

Không có mã nào cho "kỳ chưa chốt" và "kỳ rỗng": cả hai trả 200 với danh sách rỗng kèm
`periodLocked: boolean` để màn phân biệt hai nguyên nhân.

**Tác dụng phụ** — không ghi bảng nào; không phát thông báo. Đọc **không** ghi audit
(`FR-AUDIT-01` giới hạn ở tạo · sửa · phê duyệt · lock · đổi quyền).

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `incentive_result` | `participant_id`, `period`, `amount_jpy`, `kind`, `origin_period`, `source_correction_id`, `rule_version_id` | `rule_version_id` NOT NULL (FR-AUDIT-03); `kind ∈ {normal, delta}`; append-only | tầng 1 (NOT NULL + CHECK); append-only ở tầng 1b "không có policy ghi" | có |
| `incentive_result` | `(participant_id, period, kind)` | duy nhất cho `kind='normal'` — một người tham gia không có hai dòng thường trong một kỳ | tầng 1 (unique partial index) | **chưa** |
| `incentive_result` | `origin_period`, `source_correction_id` | NOT NULL khi `kind='delta'`; NULL khi `kind='normal'` | tầng 1 (CHECK theo `kind`) | **chưa** |
| `incentive_rule_version` | `version_no`, `effective_from` | đọc để hiển thị phiên bản của từng dòng | tầng 1 (FK) | có |
| `participant` | `id`, `name` | đọc để hiển thị tên | tầng 1 (FK) | có |
| Nguồn `eligible_amount_jpy` / `paid_on_time` | — | phải là dữ liệu thanh toán thật, khớp test vector Phụ lục C (RFP:1337-1343) | tầng 1 | **chưa** — xem mục 9 |

Ba tầng theo `10-database-diagram.md` § 3: tầng 1 Postgres constraint · tầng 2 trigger · tầng 3
tầng ứng dụng. Hai ràng buộc P0 đang thiếu ở trên (`unique` cho dòng thường, CHECK theo `kind`)
đều là CHECK/index trên cùng một dòng nên **thuộc tầng 1** — không cần trigger.

## 4. Vòng đời trạng thái

`FIG-013` (RFP:665-671):

```
Chốt mua bán → Quyết toán ngày → [Trong hạn thanh toán?]
   ├─ Trong hạn  → Tính 完納奨励金 (theo phiên bản biểu suất có hiệu lực)
   └─ Quá hạn    → 完納奨励金 = 0
                → Audit log
```

Dòng `incentive_result` **không có trạng thái** — nó là bản ghi append-only. Vòng đời ở đây là
vòng đời của **kỳ**:

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Kỳ chưa chốt | Lock ngày nghiệp vụ (SC-18) | Kỳ có dòng `normal` | có phiên bản biểu suất `active` với `effective_from <= period`; mỗi người tham gia có dữ liệu thanh toán của kỳ | ROLE-SETTLEMENT | `409 NO_ACTIVE_RULE_VERSION` |
| Kỳ đã chốt | Duyệt yêu cầu điều chỉnh (SC-21) | Kỳ **sau** có dòng `delta` | yêu cầu đã được duyệt; kỳ gốc đã có dòng `normal`; **kỳ gốc không bị tính lại** | ROLE-SETTLEMENT (người duyệt ≠ người tạo) | `409 ORIGIN_PERIOD_HAS_NO_RESULT` |
| Kỳ đã chốt | Sửa trực tiếp dòng kết quả | — (bị chặn) | không tồn tại đường ghi nào | không ai | `403 READ_ONLY_RESULT` |

Guard dễ mất nhất: cạnh thứ hai đòi dòng delta **gắn được với kỳ gốc theo cả hai chiều**. Chỉ
ghi `origin_period` là một chiều; người mở kỳ gốc vẫn tưởng chưa có điều chỉnh nào (FE-032).

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| BR-INC-01 (RFP:598, §B.5 RFP:1276-1287) | "Hệ số thuế của 完納奨励金 là **110/100**; sau khi tính thì **làm tròn xuống (cắt phần lẻ) theo đơn vị JPY**" | engine tính thưởng | test vector `INC-EDGE-03` (RFP:1343) — giá trị lẻ sau khi nhân hệ số phải bị cắt |
| BR-INC-01 | "**Không có thời gian gia hạn**" | engine | không tồn tại cột/tham số hạn gia hạn ở bất kỳ tầng nào |
| FR-INC-01 (RFP:678) | "chỉ tính các khoản thanh toán trong hạn, nếu quá hạn thì 完納奨励金 = **0**" | engine | dòng 0 JPY vẫn được ghi, kèm `reason.code = overdue_zero`; không chia tỷ lệ |
| BR-INC-01 | "dùng JST/ngày nghiệp vụ" | tầng ứng dụng (giải nghĩa `period`) | `period` của mọi dòng là ngày nghiệp vụ JST, không phải thời điểm engine chạy |
| BR-INC-01 · FR-INC-03 (RFP:680) | "điều chỉnh phải tạo phần chênh lệch (delta) ở kỳ tiếp theo"; "Báo cáo kỳ trước giữ nguyên" | engine + append-only ở tầng 1b | mở kỳ gốc sau khi có điều chỉnh: số không đổi, và thấy `deltaInPeriods` |
| BR-INC-01 · FR-AUDIT-03 (RFP:712) | "Version áp dụng: theo version quy tắc/biểu suất có ngày hiệu lực" | `rule_version_id` NOT NULL | mọi dòng đều có phiên bản; dòng delta mang phiên bản **của kỳ gốc** |
| GOV-RULE-01 (RFP:601) | "Thay đổi không được làm biến dạng dữ liệu đã chốt trước ngày hiệu lực" | engine (delta đọc lại phiên bản của kỳ gốc) | đổi biểu suất hôm nay: số của kỳ cũ không đổi |

Số duy nhất trong mục này là **110/100** và **0**, cả hai dẫn RFP:598 và RFP:678. "Tỷ lệ chi trả"
mà FR-INC-01 nhắc tới **không có giá trị trong RFP** → mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang `/incentive` | Đọc `GET /api/incentive-results` | Ghi dòng kết quả |
|---|---|---|---|
| ROLE-SETTLEMENT | cho phép | cho phép | từ chối — `403 READ_ONLY_RESULT` |
| ROLE-INTAKE | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `403 READ_ONLY_RESULT` |
| ROLE-JUDGE | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `403 READ_ONLY_RESULT` |
| ROLE-TRADE | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `403 READ_ONLY_RESULT` |
| ROLE-DELIVERY | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `403 READ_ONLY_RESULT` |
| ROLE-RULE-ADMIN | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `403 READ_ONLY_RESULT` |
| ROLE-SYS-ADMIN | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `403 READ_ONLY_RESULT` |

Ba điểm phải khai đúng:

- **Đọc ở tầng dữ liệu khác đọc qua màn.** Phạm vi đọc rộng — **đề xuất thiết kế của LAB-3, không phải yêu cầu khách** (RFP:311 giao bên dự thầu tự đề xuất cơ chế phân tách quyền) — cho mọi vai trò đang hoạt động **đọc** được
  `incentive_result`. Chặn ở SC-22 là chặn **vào trang** và chặn **endpoint của màn** — không
  phải chặn ở tầng dữ liệu. Một tài khoản ROLE-TRADE vẫn đọc được bảng qua đường dữ liệu chung.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên.
- **Không vai trò nào ghi được.** Đây là màn duy nhất trong nhóm FN-09 mà cột "ghi" trống cho cả
  bảy vai trò: dòng kết quả chỉ do engine ghi bằng danh tính hệ thống. Maker-checker
  (`GOV-RULE-01`) **không áp** ở màn này — nó áp ở SC-21 (duyệt điều chỉnh) và SC-24 (duyệt
  phiên bản), là hai cửa duy nhất sinh ra dòng ở đây.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Engine ghi dòng `normal` khi chốt kỳ | `incentive_calculated` | after: `{period, participantCount, ruleVersionId}`; reason: `business_day_lock` | FR-AUDIT-01, FIG-013 ("→ Audit log") |
| Engine ghi dòng `delta` khi duyệt điều chỉnh | `incentive_delta_created` | before: `{originPeriod, amountOld}`, after: `{period, amountNew, correctionId}`; reason: mã yêu cầu điều chỉnh | FR-AUDIT-01, FR-INC-03 |
| Engine bỏ qua kỳ vì không có phiên bản hiệu lực | `incentive_skipped_no_rule` | after: `{period}`; reason: `no_active_rule_version` | FR-AUDIT-01, NFR-OPS-01 |
| Engine lỗi | `incentive_engine_error` | after: `{period, error}` | NFR-OPS-01 |
| Đọc kết quả | — | **không ghi** | FR-AUDIT-01 chỉ liệt tạo · sửa · phê duyệt · lock · đổi quyền |

`FR-AUDIT-03` được thoả không bằng audit log mà bằng `rule_version_id` NOT NULL trên chính dòng
kết quả: mở một bản ghi là thấy version, không cần tra log.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-PERF-02 (RFP:808) | "xử lý được profile tải FIG-LOAD-01 mà không làm chậm các tác vụ giao dịch cốt lõi" | Engine phải chạy **tách khỏi request chốt kỳ**: 180 tài khoản × số người tham gia mỗi kỳ (RFP:1357) làm request lock dài ra tuyến tính. Chốt kỳ là tác vụ cốt lõi trong khung 08:00–10:00 (RFP:304) |
| NFR-PERF-01 (RFP:807) | "Tìm kiếm thông thường ở p95 không vượt 2 giây" | Index theo `(participant_id, period)`; `deltaInPeriods` phải lấy được bằng một truy vấn theo `origin_period`, không phải N+1 |
| NFR-OPS-01 (RFP:814) | "giám sát được: health, lỗi batch/xuất dữ liệu…" | Ba `action` audit của engine ở mục 7 là nguồn alert; riêng `incentive_skipped_no_rule` phải bắn alert vì nó nghĩa là cả kỳ không có tiền thưởng |
| DR-RET-01 (RFP:813) | dữ liệu nghiệp vụ tra cứu online **7 năm** | `incentive_result` không được xoá theo kỳ; kể cả dòng 0 JPY |

## 9. Câu hỏi cho chủ đầu tư

- **"Tỷ lệ chi trả" trong FR-INC-01 là gì, và phần nào của công thức được phiên bản hoá?**
  BR-INC-01 (RFP:598) và §B.5 (RFP:1278) **cố định** hệ số 110/100. Nhưng FR-INC-01 (RFP:678)
  liệt "số tiền đủ điều kiện, **tỷ lệ chi trả** và phiên bản rule" như ba yếu tố riêng, CAP-06
  (RFP:546) đòi "quản lý được **công thức, biểu suất** và ngày áp dụng", và NFR-OPS-02 (RFP:815)
  đòi đổi được "bằng thay đổi cấu hình có kiểm soát". Hai phía chống nhau: nếu 110/100 đã cố
  định thì phiên bản biểu suất đang quản lý tham số nào? Cần trước khi code vì nó quyết định
  engine đọc hằng số hay đọc bảng biểu suất — hai kiến trúc khác nhau. Chọn sai: hoặc dựng cả
  tầng cấu hình không ai dùng, hoặc không nghiệm thu được NFR-OPS-02. **Không chọn hộ khách.**
- **Nguồn `eligible_amount_jpy` và `paid_on_time` là hệ thống nào?** FR-INC-01 nói "số tiền đủ
  điều kiện" và "khoản thanh toán trong hạn" nhưng không tài liệu nào định nghĩa sổ thanh toán.
  IF-ACC-01 (RFP:1391-1401) chỉ khai chiều **đi** sang kế toán, không khai chiều về. Cần trước
  khi code vì đây là đầu vào của toàn bộ engine.
- **"Trong hạn thanh toán" đo từ mốc nào?** Ngày nghiệp vụ của giao dịch, ngày chốt kỳ, hay một
  hạn thanh toán riêng theo hợp đồng từng người tham gia? BR-INC-01 chỉ nói "không có thời gian
  gia hạn", không nói hạn tính từ đâu. Chọn sai làm toàn bộ dòng 0 JPY sai.
- **Chiều truy vết thứ hai trình bày ra sao?** FE-032 đòi từ kỳ gốc thấy được delta đã phát
  sinh. `deltaInPeriods` là một cách; khách có muốn nó nằm cả trong RPT-07 không?
- **Tập giá trị `reason` của dòng thường** có cần là danh mục cố định để xuất báo cáo không, hay
  là câu tự do?

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Biểu suất | đổi được bằng cấu hình có kiểm soát, không cần deploy (NFR-OPS-02 RFP:815, CAP-06 RFP:546) | hệ số **110/100 là hằng trong code**; `rate_table` chỉ là metadata hiển thị/audit, engine **không đọc** → tạo phiên bản mới **không làm số thưởng đổi** | `src/lib/incentive/calculate-incentive.ts:15`, `src/lib/incentive/create-rule-version.ts:24-26,53` | cần khách chốt (đúng BR-INC-01, chưa đạt NFR-OPS-02) |
| Kỳ của dòng delta | delta gắn với kỳ gốc, mở kỳ gốc là thấy (FE-032, FR-INC-03 RFP:680) | `period = todayJst()`; chỉ có `origin_period` trỏ về. Mở kỳ gốc **không thấy delta** — truy vết một chiều | `src/lib/incentive/run-incentive-delta.ts:110-118` | khác không chủ đích |
| Nguyên nhân của delta | "delta có nguyên nhân rõ ràng" (FR-INC-03) | `source_correction_id` được ghi nhưng **không đưa lên màn**; không có cột nguyên nhân | `supabase/migrations/20260904090700_incentive.sql:29`; `src/components/incentive/incentive-result-table.tsx:24-29` (6 cột, không có Nguyên nhân) | khác không chủ đích |
| Nguồn thanh toán | dữ liệu thật, khớp test vector Phụ lục C (RFP:1337-1343) | `payment_record` là **bảng mock** tự khai trong migration; chưa có bộ đối chiếu test vector | `supabase/migrations/20260904090700_incentive.sql:39-42,55-57` | khác có chủ đích (đã khai) |
| Engine tách khỏi chốt kỳ | NFR-PERF-02 (RFP:808) | engine chạy **đồng bộ trong request lock và request duyệt**; engine lỗi chỉ để lại dòng audit, lock vẫn thành công | `src/lib/incentive/run-incentive-for-period.ts:14-20`; `src/app/api/reconciliation/[businessDate]/lock/route.ts:57`; `src/app/api/corrections/[id]/approve/route.ts:92` | khác có chủ đích (đã khai ở `20-architecture-design.md` § 9.1) |
| Kỳ nhập sai | báo lỗi, không đổi kỳ | `?period=` sai định dạng **âm thầm rơi về hôm nay**, không thông báo | `src/app/(app)/incentive/page.tsx:24`; `src/lib/incentive/is-valid-period.ts:8-12` | khác không chủ đích |
| Lọc theo người tham gia | có trên màn | chỉ tồn tại ở API `?participantId=`, **không có ô nhập nào trên màn**; không kiểm định dạng uuid | `src/app/api/incentive-results/route.ts:17` | thiếu |
| Ràng buộc tầng 1 | unique cho `kind='normal'`; CHECK `origin_period`/`source_correction_id` theo `kind` | không có unique, không có CHECK theo `kind` | `supabase/migrations/20260904090700_incentive.sql:21-30` | thiếu |
| Audit khi engine thành công | `incentive_calculated` (FR-AUDIT-01) | **chỉ ghi audit khi bỏ qua hoặc khi lỗi**; chạy thành công không ghi gì | `src/lib/incentive/run-incentive-for-period.ts:41-49,61-79` | khác không chủ đích |

## 11. Dẫn chứng

- RFP:598 · BR-INC-01 — hệ số 110/100, làm tròn xuống JPY, không gia hạn, JST, delta kỳ sau
- RFP:665-671 · FIG-013 — quyết toán → trong hạn/quá hạn → audit log
- RFP:678 · FR-INC-01 — số tiền đủ điều kiện, tỷ lệ chi trả, phiên bản rule; quá hạn = 0
- RFP:680 · FR-INC-03 — delta ở kỳ tiếp theo, báo cáo kỳ trước giữ nguyên
- RFP:710 · FR-AUDIT-01 — audit cho tạo/sửa/phê duyệt/lock/đổi quyền
- RFP:712 · FR-AUDIT-03 — mở bản ghi thưởng là thấy version và ngày hiệu lực
- RFP:601 · GOV-RULE-01 — thay đổi không làm biến dạng dữ liệu đã chốt
- RFP:546 · CAP-06 · RFP:815 · NFR-OPS-02 — quản lý công thức/biểu suất không cần deploy
- RFP:807-808 · NFR-PERF-01/02 · RFP:813 · DR-RET-01 · RFP:814 · NFR-OPS-01
- RFP:1276-1287 · §B.5 — bảng bảy yếu tố đã cố định của BR-INC-01
- RFP:1337-1343 · §C.3 DS-INC-EDGE-01 — ba test vector INC-EDGE-01/02/03
- RFP:1357 · §C.5 — 180 tài khoản đăng ký; RFP:304 — khung giờ chốt 08:00–10:00
- Feature List `FE-030` / `FE-032` / `FE-043` — `plans/260909-1355-lab4-thiet-ke-chi-tiet/chi-muc-sc-fe-yeu-cau.md:211-221`
- `docs/lab4/10-database-diagram.md` § 3 — ba tầng thực thi ràng buộc
- `docs/lab4/20-architecture-design.md` § 9.1 — engine đồng bộ, divergence kiến trúc
- *(chỉ cho mục 10)* `src/lib/incentive/calculate-incentive.ts:15`, `create-rule-version.ts:24-26,53`, `run-incentive-delta.ts:110-118`, `run-incentive-for-period.ts:14-20,41-49,61-79`, `is-valid-period.ts:8-12`, `src/app/(app)/incentive/page.tsx:24`, `src/app/api/incentive-results/route.ts:17`, `src/components/incentive/incentive-result-table.tsx:24-29`, `supabase/migrations/20260904090700_incentive.sql:21-30,39-42,55-57`
