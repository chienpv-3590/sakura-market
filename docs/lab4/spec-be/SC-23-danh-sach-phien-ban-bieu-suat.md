# SC-23 — Danh sách phiên bản biểu suất · Spec BE

| | |
|---|---|
| FE liên quan | FE-031 (Quản lý phiên bản biểu suất) |
| FN | FN-09 (Tính 完納奨励金 và quản lý phiên bản quy tắc) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-INC-02, FR-RULE-01, GOV-RULE-01, NFR-OPS-02, TBL-RATE-01, CAP-06, FR-AUDIT-01 |
| Miền dữ liệu | D-INCENTIVE |
| State machine | không có `FIG-*` riêng — vòng đời suy từ GOV-RULE-01 (RFP:601) + §B.6 TBL-RATE-01 (RFP:1289-1296) |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

BE của màn này **chỉ đọc**: trả danh sách phiên bản biểu suất 完納奨励金 kèm bốn dữ kiện mà
`FR-RULE-01` đòi (người tạo · người phê duyệt · ngày hiệu lực · trạng thái), nội dung biểu suất
của từng phiên bản, cùng hai chỉ số cấp màn — **số lần đổi rule đã dùng trong năm**
(`GOV-RULE-01`) và **phiên bản đang có hiệu lực**.

**Không** làm ở màn này: mọi thao tác ghi. Tạo bản nháp, phê duyệt và rollback thuộc SC-24 và
chịu maker-checker ở đó. Màn này cũng không tính tiền thưởng — engine ở SC-22.

## 2. Hợp đồng API

### `GET /api/incentive-rules`

| | |
|---|---|
| Thoả yêu cầu | FE-031 · FR-RULE-01 · FR-INC-02 · GOV-RULE-01 · NFR-OPS-02 |
| Xác thực | bắt buộc |
| Vai trò được gọi | ROLE-RULE-ADMIN |
| Idempotent | có — chỉ đọc, không ghi |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `status` | query | enum | không | một trong `pending_approval` · `approved` · `active` · `superseded` · `rolled_back`; rỗng = tất cả | FE-031 (lọc được cả 5 trạng thái) |

Server tự quyết, **không nhận từ client**: mốc năm dùng để đếm hạn mức, ngày nghiệp vụ JST dùng
để xác định phiên bản đang hiệu lực, và thứ tự trả về (`version_no` giảm dần — mới nhất lên
trước).

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `quota.used` / `quota.limit` | integer / integer | số phiên bản **đã được phê duyệt** trong năm hiện tại / hằng số 4 (GOV-RULE-01) |
| `quota.periodFrom` / `quota.periodTo` | date / date | khoảng thời gian đang được đếm — hiện ra để người dùng biết mốc năm nào đang áp |
| `activeVersion` | object \| null | `{versionNo, effectiveFrom}` của phiên bản đang chi phối cách tính; null là một sự cố vận hành, không phải trạng thái rỗng bình thường |
| `versions[].versionNo` | integer | số phiên bản; duy nhất toàn bảng |
| `versions[].rateTable` | object | nội dung biểu suất của phiên bản — **bắt buộc có** để nghiệm thu NFR-OPS-02 |
| `versions[].effectiveFrom` | date | ngày hiệu lực |
| `versions[].status` | enum | 1 trong 5 giá trị vòng đời |
| `versions[].createdByName` / `approvedByName` | string \| null | tên hiển thị hoặc **mã người dùng**; `approvedByName` null khi còn chờ duyệt. **Không bao giờ email** |

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 422 | `STATUS_INVALID` | `status` có mặt nhưng không thuộc 5 giá trị vòng đời | FE-031 |
| 404 | `NOT_FOUND` | vai trò người gọi ≠ ROLE-RULE-ADMIN | TBL-ROLE-01 |
| 500 | `INTERNAL_ERROR` | truy vấn thất bại | — |

Không có mã lỗi cho "rỗng": bảng rỗng và lọc-không-khớp đều trả 200; màn phân biệt bằng
`filterApplied: boolean` trong response. Hai nguyên nhân rỗng dẫn tới hai hành động khác nhau
(tạo phiên bản mới / bỏ lọc) nên **không được gộp**.

**Tác dụng phụ** — không ghi bảng nào; không phát thông báo; không ghi audit (đọc không thuộc 5
hành vi của `FR-AUDIT-01`).

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `incentive_rule_version` | `version_no` | duy nhất toàn bảng; server tự sinh tuần tự | tầng 1 (unique index) | có |
| `incentive_rule_version` | `effective_from` | NOT NULL | tầng 1 | có |
| `incentive_rule_version` | `status` | CHECK ∈ 5 giá trị `pending_approval` · `approved` · `active` · `superseded` · `rolled_back` | tầng 1 (CHECK) | **một phần** — hiện chỉ 3 giá trị |
| `incentive_rule_version` | `status` | **đúng một** dòng `active` tại mọi thời điểm | tầng 1 (unique partial index `where status = 'active'`) | **chưa** |
| `incentive_rule_version` | `rate_table` | NOT NULL — phiên bản không có nội dung biểu suất thì không nghiệm thu được NFR-OPS-02 | tầng 1 (NOT NULL) | **chưa** — hiện nullable |
| `incentive_rule_version` | `created_by`, `approved_by` | `approved_by <> created_by` (maker-checker) | tầng 1 (CHECK trên hai cột cùng dòng) | **chưa** — hiện ở tầng 3 |
| `incentive_rule_version` | dòng đã `superseded`/`rolled_back` | **không được xoá** — kết quả thưởng cũ ở SC-22 còn trỏ về | tầng 1 (FK `incentive_result.rule_version_id` NOT NULL) | có |
| `app_user` | `id`, `display_name` | đọc để hiển thị tên người lập/người duyệt | tầng 1 (FK) | có |
| Bộ đếm hạn mức năm | — | đếm phiên bản `approved` trong khoảng năm; hằng số 4 | tầng 3 (truy vấn đếm) + tầng 2 khi chặn ghi ở SC-24 | **chưa** |

Ba tầng theo `10-database-diagram.md` § 3: tầng 1 Postgres constraint · tầng 2 trigger · tầng 3
tầng ứng dụng. Bốn ràng buộc P0 đang thiếu ở trên đều đặt được ở **tầng 1**: `CHECK` mở rộng cho
`status`, `unique partial index` cho đúng-một-`active`, `NOT NULL` cho `rate_table`, và `CHECK
(approved_by is null or approved_by <> created_by)` cho maker-checker — không cần trigger.

## 4. Vòng đời trạng thái

RFP không có `FIG-*` cho vòng đời rule. Vòng đời dưới đây suy từ `GOV-RULE-01` (RFP:601),
`FR-INC-02` (RFP:679) và §B.6 `TBL-RATE-01` (RFP:1289-1296):

```
                                         ┌──────────────┐
chờ duyệt ──phê duyệt──► đã duyệt ──tới ngày hiệu lực──► đang hiệu lực ──►│ đã bị thay thế│
(pending)     (SC-24)    (approved)      (00:00 JST)         (active)      └──────────────┘
                                                                 │
                                                            rollback (SC-24)
                                                                 ▼
                                                           đã rollback
```

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | Tạo bản nháp (SC-24) | `pending_approval` | `effective_from` ở tương lai; hạn mức năm còn chỗ | ROLE-RULE-ADMIN | `422 EFFECTIVE_DATE_NOT_FUTURE` · `409 ANNUAL_QUOTA_EXCEEDED` |
| `pending_approval` | Phê duyệt (SC-24) | `approved` | **người duyệt ≠ người lập** | ROLE-RULE-ADMIN | `403 SELF_APPROVAL` |
| `approved` | Tới `effective_from` (00:00 JST) | `active` | đúng một dòng `active`; dòng `active` cũ chuyển `superseded` trong cùng một giao dịch | hệ thống | `409 ACTIVE_VERSION_CONFLICT` |
| `active` | Một phiên bản khác lên `active` | `superseded` | cùng giao dịch với cạnh trên | hệ thống | — |
| `active` | Rollback (SC-24) | `rolled_back` | người thao tác ≠ người lập; phiên bản đích **đã từng qua cổng maker-checker** | ROLE-RULE-ADMIN | `403 SELF_ROLLBACK` · `422 INVALID_TARGET` |
| `superseded` / `rolled_back` | bất kỳ | — | không có cạnh ra | không ai | `409 VERSION_NOT_ACTIONABLE` |

Guard dễ mất nhất là cạnh `approved → active`: nó phải **nguyên tử với** việc hạ cấp dòng
`active` cũ, nếu không sẽ có hai dòng `active` hoặc không dòng nào. Đây là chỗ `unique partial
index` ở mục 3 làm chốt chặn thật, không phải logic ứng dụng.

Cạnh `approved → active` cần một tác vụ định kỳ chạy đầu ngày nghiệp vụ JST. Vì mốc thời gian
của BR-INC-01 là JST/ngày nghiệp vụ (RFP:598), tác vụ chạy 00:00 JST. Engine ở SC-22 vẫn phải tự
kiểm `effective_from <= period` để một lần chạy tác vụ bị lỡ không sinh ra số tiền sai.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| GOV-RULE-01 (RFP:601) | "Thay đổi quy tắc/biểu suất tối đa **4 lần/năm**" | truy vấn đếm ở màn này (hiển thị) + chặn ghi ở SC-24 | `quota.used` hiện đúng số phiên bản `approved` trong khoảng `quota.periodFrom..periodTo` |
| GOV-RULE-01 · §B.6 (RFP:1294) | "phải có tách biệt người lập – người phê duyệt (maker-checker)" | tầng 1 (`CHECK approved_by <> created_by`) | hai cột `createdByName` và `approvedByName` của một dòng không bao giờ trùng |
| GOV-RULE-01 · §B.6 (RFP:1295) | "Ngày hiệu lực: có thể đặt ngày trong tương lai" | tầng 1 + tầng 3 ở SC-24 | dòng `approved` với `effective_from` tương lai tồn tại và **chưa** chi phối cách tính |
| GOV-RULE-01 · §B.6 (RFP:1296) | "Rollback: bắt buộc có rollback truy vết được" | `rolled_back` là trạng thái riêng, không xoá dòng | phiên bản đã rollback vẫn còn trong danh sách |
| FR-RULE-01 (RFP:689) | "ghi nhận với mọi phiên bản rule: người tạo, người phê duyệt, ngày hiệu lực và trạng thái" | tầng 1 (4 cột) | 4 cột đều có trên mọi dòng |
| FR-INC-02 (RFP:679) | "Bản nháp chưa có hiệu lực cho đến khi được phê duyệt" | vòng đời mục 4 | dòng `pending_approval` không bao giờ được engine chọn |
| NFR-OPS-02 (RFP:815) · CAP-06 (RFP:546) | "cập nhật được bằng thay đổi cấu hình có kiểm soát, không cần sửa dữ liệu lịch sử" | `rate_table` NOT NULL + engine đọc `rate_table` | đọc được nội dung biểu suất của từng phiên bản ngay trên màn |

Số nghiệp vụ duy nhất trong mục này là **4 lần/năm**, dẫn RFP:601 và RFP:1293. **Mốc "năm"**
không có trong RFP → mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang `/incentive/rules` | Đọc `GET /api/incentive-rules` | Ghi phiên bản (SC-24) |
|---|---|---|---|
| ROLE-RULE-ADMIN | cho phép | cho phép | cho phép — kèm maker-checker |
| ROLE-SETTLEMENT | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `404 NOT_FOUND` |
| ROLE-INTAKE | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `404 NOT_FOUND` |
| ROLE-JUDGE | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `404 NOT_FOUND` |
| ROLE-TRADE | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `404 NOT_FOUND` |
| ROLE-DELIVERY | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `404 NOT_FOUND` |
| ROLE-SYS-ADMIN | từ chối — **404** | từ chối — `404 NOT_FOUND` | từ chối — `404 NOT_FOUND` |

Ba điểm phải khai đúng:

- **Đọc ở tầng dữ liệu khác đọc qua màn.** Phạm vi đọc rộng — **đề xuất thiết kế của LAB-3, không phải yêu cầu khách** (RFP:311 giao bên dự thầu tự đề xuất cơ chế phân tách quyền) — cho mọi vai trò đang hoạt động **đọc** được
  `incentive_rule_version`. Chặn ở SC-23 là chặn **vào trang** và chặn **endpoint của màn**;
  tầng dữ liệu vẫn mở cho mọi vai trò đang hoạt động. Chặn thật nằm ở **ghi** — chỉ
  ROLE-RULE-ADMIN.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên.
- **Maker-checker là một ràng buộc riêng, không suy ra được từ vai trò.** Cả người lập và người
  duyệt đều là ROLE-RULE-ADMIN; điều kiện "người duyệt khác người tạo" (`GOV-RULE-01`) so **danh
  tính**, không so vai trò. Màn này chỉ hiển thị kết quả của cổng đó; cổng nằm ở SC-24.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Tạo phiên bản (SC-24, hiện lên màn này) | `create_rule_version` | after: `{versionNo, effectiveFrom, rateTable, createdBy}`; reason: lý do thay đổi (bắt buộc) | FR-AUDIT-01, FR-RULE-01 |
| Phê duyệt (SC-24) | `approve_rule_version` | before `{status: pending_approval}` → after `{status: approved, approvedBy}` | FR-AUDIT-01 |
| Chuyển sang đang hiệu lực (tác vụ 00:00 JST) | `activate_rule_version` | before `{active: <cũ>}` → after `{active: <mới>}`; reason: `effective_date_reached` | FR-AUDIT-01, GOV-RULE-01 |
| Rollback (SC-24) | `rollback_rule_version` | before `{active: <cũ>}` → after `{active: <đích>}`; reason bắt buộc | FR-AUDIT-01, GOV-RULE-01 |
| Đọc danh sách | — | **không ghi** | FR-AUDIT-01 chỉ liệt tạo · sửa · phê duyệt · lock · đổi quyền |

`FR-RULE-01` đòi "Trong audit hiển thị đầy đủ maker, checker và ngày hiệu lực" — nghĩa là dòng
audit của `approve_rule_version` phải mang cả `createdBy`, không chỉ `approvedBy`.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-OPS-02 (RFP:815) | "Quy tắc/biểu suất phải cập nhật được bằng thay đổi cấu hình có kiểm soát, **không cần sửa dữ liệu lịch sử**" | `rate_table` là dữ liệu, không phải hằng số biên dịch; và phiên bản cũ không bị ghi đè. Nghiệm thu: "demo thay đổi rule bằng version mới" — một demo tạo version mới mà số tiền không đổi thì **không** nghiệm thu được |
| NFR-PERF-01 (RFP:807) | "Tìm kiếm thông thường ở p95 không vượt 2 giây" | Danh sách nhỏ theo bản chất (trần 4 lần/năm) nhưng `quota.used` và `activeVersion` là hai phép tổng hợp — phải lấy trong cùng một vòng truy vấn, không N+1 |
| NFR-OPS-01 (RFP:814) | "giám sát được: health, lỗi batch…" | `activeVersion = null` phải bắn alert: SC-22 sẽ không tính được thưởng cho bất kỳ kỳ nào |
| DR-RET-01 (RFP:813) | dữ liệu nghiệp vụ tra cứu online **7 năm** | Phiên bản `superseded`/`rolled_back` không được xoá — kết quả thưởng cũ còn trỏ về (FR-AUDIT-03) |

## 9. Câu hỏi cho chủ đầu tư

- **Mốc "năm" của hạn mức 4 lần là năm dương lịch hay năm tài chính Nhật (01/4 – 31/3)?**
  GOV-RULE-01 (RFP:601) và §B.6 (RFP:1293) chỉ nói "4 lần/năm". Cần trước khi code vì nó quyết
  định `quota.periodFrom/periodTo` và do đó quyết định lúc nào SC-24 tắt biểu mẫu tạo. Chọn sai:
  hạn mức đặt lại lệch tới 3 tháng, có thể chặn một thay đổi rule mà khách coi là hợp lệ.
- **Rollback có tính là một lần đổi trong hạn mức không?** RFP không nói. Nếu tính thì một lần
  đổi sai rồi rollback ngốn 2 trong 4 suất của năm.
- **Bản nháp bị từ chối, hoặc bị huỷ trước khi duyệt, có tính vào hạn mức không?** Thiết kế hiện
  đếm theo phiên bản **đã được phê duyệt**; cần khách xác nhận đó là cách đếm khách muốn.
- **`rate_table` gồm những tham số nào — và 110/100 có nằm trong đó không?** BR-INC-01 (RFP:598,
  §B.5 RFP:1278) **cố định** hệ số 110/100, còn FR-INC-02 (RFP:679), CAP-06 (RFP:546) và
  NFR-OPS-02 (RFP:815) đòi quản lý được "công thức, biểu suất và ngày áp dụng" mà không cần
  deploy. Hai phía chống nhau: nếu hệ số đã cố định thì **một phiên bản biểu suất đang quản lý
  cái gì**? FR-INC-01 (RFP:678) nhắc "tỷ lệ chi trả" như một yếu tố riêng nhưng RFP không cho
  giá trị. Cần trước khi code vì nó quyết định hình dạng `rate_table` (NOT NULL của cột nào),
  hình dạng ô nhập ở SC-24, và cột "Nội dung biểu suất" của màn này. **Không chọn hộ khách.**
- **Khi đã hết hạn mức mà cần đổi rule gấp thì có đường ngoại lệ nào?** Nếu không, thiết kế chặn
  tuyệt đối; nếu có, ai phê duyệt ngoại lệ đó và audit ghi gì.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Nội dung biểu suất | `rate_table` NOT NULL, đọc được trên màn, engine đọc nó (NFR-OPS-02 RFP:815, CAP-06 RFP:546) | hệ số **110/100 là hằng trong code**; `rate_table` nullable và chỉ là **metadata** hiển thị/audit, engine **không đọc**; màn **không hiện** cột nội dung biểu suất → tạo phiên bản mới **không làm số thưởng đổi** | `src/lib/incentive/calculate-incentive.ts:15`, `src/lib/incentive/create-rule-version.ts:24-26,53`; `supabase/migrations/20260904090700_incentive.sql:8` | cần khách chốt (đúng BR-INC-01, chưa đạt NFR-OPS-02) |
| Hạn mức 4 lần/năm | đếm, hiện, và chặn (GOV-RULE-01 RFP:601) | **không đếm, không hiện, không chặn** — chỉ phần maker-checker được thi công | `docs/pham-vi-va-phan-mock.md:85`; `src/lib/incentive/create-rule-version.ts:34-73` | thiếu |
| Tập trạng thái | 5 giá trị lưu trong dữ liệu, lọc được cả 5 | CHECK chỉ 3 giá trị (`pending_approval`/`active`/`rolled_back`); `superseded` và `scheduled` là **nhãn tính lúc đọc** nên nhãn của một dòng **tự đổi khi qua ngày** và không lọc được | `supabase/migrations/20260904090700_incentive.sql:6-7`; `src/lib/incentive/rule-version-display-status.ts:9-18,19-41`; `src/app/(app)/incentive/rules/page.tsx:15` | khác có chủ đích (tránh job nền) — nhưng chưa đạt yêu cầu lọc |
| Đúng một phiên bản đang hiệu lực | unique partial index ở tầng 1 | nhiều dòng cùng mang `active`; hệ thống chọn dòng có `effective_from` lớn nhất đã tới lúc đọc, số còn lại chỉ được **dán nhãn** đã bị thay thế | `src/lib/incentive/resolve-rule-version.ts:19-26`; `src/lib/incentive/rule-version-display-status.ts:19-41` | thiếu ràng buộc tầng 1 |
| Audit khi tạo phiên bản | `create_rule_version` kèm lý do (FR-AUDIT-01 RFP:710) | **tạo không ghi audit**; duyệt và rollback thì có. Dấu vết "ai tạo" chỉ còn cột `created_by` | `src/lib/incentive/create-rule-version.ts:34-73` | khác không chủ đích |
| maker-checker ở tầng 1 | `CHECK (approved_by is null or approved_by <> created_by)` | chỉ ở **tầng 3**; migration tự khai *"enforced in the app layer, not a DB constraint"* → một tiến trình cầm khoá dịch vụ tự duyệt được bản mình tạo | `supabase/migrations/20260904090700_incentive.sql:14-17` | khác không chủ đích |
| Hiển thị tên người dùng | tên hiển thị, khuyết thì **mã người dùng** | `display_name ?? email` → **email nội bộ lộ ra UI**; lệch kỷ luật của RPT-08 (rơi về `id`) | `src/lib/incentive/rule-version-queries.ts:18-19` vs `src/lib/reports/queries/rpt-08-post-lock-adjustments.ts:28` | khác không chủ đích |
| Rỗng do lọc vs chưa có dữ liệu | phân biệt được | dùng chung một trạng thái rỗng; ngoài ra giá trị `status` lạ làm **trang bỏ lọc và hiện tất cả**, còn API trả 0 dòng — hai đường vào, hai hành vi | `src/app/(app)/incentive/rules/page.tsx:27`; `src/app/api/incentive-rules/route.ts:62` | khác không chủ đích |

## 11. Dẫn chứng

- RFP:601 · GOV-RULE-01 — 4 lần/năm, maker-checker, ngày hiệu lực, rollback
- RFP:679 · FR-INC-02 — ngày hiệu lực tương lai, bản nháp chưa hiệu lực, rollback theo version
- RFP:689 · FR-RULE-01 — người tạo/người phê duyệt/ngày hiệu lực/trạng thái; audit hiện maker và checker
- RFP:710 · FR-AUDIT-01 — audit cho tạo/sửa/phê duyệt/lock/đổi quyền
- RFP:815 · NFR-OPS-02 — đổi rule bằng cấu hình có kiểm soát; nghiệm thu bằng demo version mới
- RFP:546 · CAP-06 — quản lý được công thức, biểu suất và ngày áp dụng
- RFP:1289-1296 · §B.6 TBL-RATE-01 — tần suất 4 lần/năm, maker-checker, ngày hiệu lực tương lai, rollback truy vết được
- RFP:598 · §B.5 RFP:1278 · BR-INC-01 — hệ số 110/100 cố định, mốc JST
- RFP:678 · FR-INC-01 — "tỷ lệ chi trả" như một yếu tố riêng, không có giá trị
- RFP:807 · NFR-PERF-01 · RFP:813 · DR-RET-01 · RFP:814 · NFR-OPS-01
- Feature List `FE-031` — `plans/260909-1355-lab4-thiet-ke-chi-tiet/chi-muc-sc-fe-yeu-cau.md:223-227`
- `docs/lab4/10-database-diagram.md` § 3 — ba tầng thực thi ràng buộc
- `docs/lab4/20-architecture-design.md` § 5.4 — maker-checker là ràng buộc kiến trúc, ba khoảng hở
- *(chỉ cho mục 10)* `src/lib/incentive/calculate-incentive.ts:15`, `create-rule-version.ts:24-26,34-73,53`, `resolve-rule-version.ts:19-26`, `rule-version-display-status.ts:9-18,19-41`, `rule-version-queries.ts:18-19`, `src/app/(app)/incentive/rules/page.tsx:15,27`, `src/app/api/incentive-rules/route.ts:62`, `src/lib/reports/queries/rpt-08-post-lock-adjustments.ts:28`, `supabase/migrations/20260904090700_incentive.sql:6-8,14-17`, `docs/pham-vi-va-phan-mock.md:85`
