# SC-24 — Tạo và phê duyệt phiên bản biểu suất · Spec BE

| | |
|---|---|
| FE liên quan | FE-031 (Quản lý phiên bản biểu suất) |
| FN | FN-09 (Tính 完納奨励金 và quản lý phiên bản quy tắc) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-INC-02, FR-RULE-01, GOV-RULE-01, NFR-OPS-02, TBL-RATE-01, FR-AUDIT-01, NFR-SEC-01 |
| Miền dữ liệu | D-INCENTIVE |
| State machine | không có `FIG-*` riêng — sơ đồ đầy đủ ở `SC-23-danh-sach-phien-ban-bieu-suat.md` § 4 |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

Đây là **cửa ghi duy nhất** của phần quy tắc trong miền `D-INCENTIVE`: tạo bản nháp phiên bản
biểu suất có ngày hiệu lực tương lai, phê duyệt bản nháp, và rollback phiên bản đang hiệu lực về
một phiên bản trước. Cả ba đường chịu maker-checker của `GOV-RULE-01` và đều ghi audit.
**Không** làm ở màn này: tính tiền thưởng (SC-22), liệt kê phiên bản (SC-23), và **không** sửa
được phiên bản đã tạo — đổi biểu suất nghĩa là tạo phiên bản mới (`NFR-OPS-02`: "không cần sửa
dữ liệu lịch sử"). Cạnh `approved → active` do tác vụ đầu ngày nghiệp vụ JST làm, không do người
dùng bấm.

## 2. Hợp đồng API

### `GET /api/incentive-rules/{id}`

Thoả `FE-031` · `FR-RULE-01` · xác thực bắt buộc · vai trò ROLE-RULE-ADMIN · idempotent.
**Request** — `id` (path, uuid, bắt buộc). **Response 2xx** — `versionNo`, `effectiveFrom`, `status`, `rateTable`, `changeReason`,
`createdByName`, `approvedByName` (tên hiển thị hoặc **mã người dùng**, không bao giờ email),
`rateTableDiff` (phần khác so với phiên bản đang hiệu lực — người duyệt phải đọc được cái mình
đang duyệt), `rollbackCandidates[]`, và ba cờ do **server** tính chứ không do client suy:
`canApprove`, `canRollback`, `isSelfCreated`. **Mã lỗi** — `422 ID_INVALID` (không phải uuid) ·
`404 NOT_FOUND` (`id` không tồn tại **hoặc** vai trò ≠ ROLE-RULE-ADMIN — cùng một mã, không lộ sự
tồn tại tài nguyên) · `500 INTERNAL_ERROR`. **Tác dụng phụ** — không ghi; không audit.

### `POST /api/incentive-rules`

Thoả `FE-031` · `FR-INC-02` · `GOV-RULE-01` · `NFR-OPS-02` · xác thực bắt buộc · vai trò
ROLE-RULE-ADMIN · **không idempotent**: chống gửi trùng bằng `unique(version_no)` — hai yêu cầu
đồng thời thì yêu cầu thứ hai vỡ ràng buộc và nhận `409 VERSION_CONFLICT`.

**Request** — server tự quyết và **không nhận từ client**: `version_no` (`max + 1`), `status`
(luôn `pending_approval`), `created_by` (danh tính session), `created_at`. Nhận `created_by` từ
client là mở đường lách cổng maker-checker. **Response 2xx** — `201` với
`{id, versionNo, status, effectiveFrom}`.

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `effectiveFrom` | body | date `YYYY-MM-DD` | có | ngày lịch thật; **> ngày nghiệp vụ JST hôm nay** | FR-INC-02 (RFP:679), §B.6 (RFP:1295) |
| `rateTable` | body | object | có | không rỗng — hình dạng còn chờ khách chốt (mục 9) | NFR-OPS-02, CAP-06 |
| `changeReason` | body | string | có | không rỗng sau khi cắt khoảng trắng | FR-AUDIT-01 (RFP:710) |

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 400 | `INVALID_JSON` | body không phải JSON hợp lệ | — |
| 422 | `EFFECTIVE_DATE_INVALID_FORMAT` | `effectiveFrom` thiếu, sai dạng, hoặc không phải ngày lịch thật | FR-INC-02 |
| 422 | `EFFECTIVE_DATE_NOT_FUTURE` | `effectiveFrom` ≤ ngày nghiệp vụ JST hôm nay | FR-INC-02, §B.6 RFP:1295 |
| 422 | `RATE_TABLE_REQUIRED` | `rateTable` thiếu hoặc rỗng | NFR-OPS-02 |
| 422 | `CHANGE_REASON_REQUIRED` | `changeReason` thiếu hoặc rỗng | FR-AUDIT-01 |
| 409 | `ANNUAL_QUOTA_EXCEEDED` | số phiên bản đã phê duyệt trong năm đã đạt **4** | GOV-RULE-01 RFP:601 |
| 409 | `VERSION_CONFLICT` | hai yêu cầu tạo đồng thời cùng đòi một `version_no` | GOV-RULE-01 |
| 404 | `NOT_FOUND` | vai trò ≠ ROLE-RULE-ADMIN | TBL-ROLE-01 |
| 500 | `INTERNAL_ERROR` | ghi thất bại | — |

**Tác dụng phụ** — ghi 1 dòng `incentive_rule_version` (`pending_approval`); ghi audit
`create_rule_version` kèm `changeReason`; **không** đổi số tiền thưởng của kỳ nào.

### `POST /api/incentive-rules/{id}/approve`

Thoả `FE-031` · `GOV-RULE-01` · `FR-RULE-01` · xác thực bắt buộc · vai trò ROLE-RULE-ADMIN **và**
`created_by <> actorId` · **không idempotent**: chống gửi trùng bằng chuyển trạng thái có điều
kiện `UPDATE … WHERE status = 'pending_approval'` — yêu cầu thứ hai nhận `409 ALREADY_DECIDED`.

**Request** — `id` (path, uuid, bắt buộc); không có body; `approved_by` do server gán từ session.
**Response 2xx** — `200` với `{id, versionNo, status: "approved", approvedByName, effectiveFrom}`.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| **403** | `SELF_APPROVAL` | `created_by` của phiên bản **bằng** danh tính người gọi | GOV-RULE-01 RFP:601, §B.6 RFP:1294 |
| 409 | `ALREADY_DECIDED` | `status` ≠ `pending_approval` tại thời điểm ghi | GOV-RULE-01 |
| 404 | `NOT_FOUND` | `id` không tồn tại, hoặc vai trò ≠ ROLE-RULE-ADMIN | TBL-ROLE-01 |
| 500 | `INTERNAL_ERROR` | ghi thất bại | — |

**Tác dụng phụ** — cập nhật `status` và `approved_by`; ghi audit `approve_rule_version` với
before/after; **không** đổi số tiền thưởng ngay (chỉ chi phối các kỳ từ `effective_from` trở đi).

### `POST /api/incentive-rules/{id}/rollback`

Thoả `FE-031` · `GOV-RULE-01` · `FR-INC-02` · xác thực bắt buộc · vai trò ROLE-RULE-ADMIN **và**
thoả maker-checker của rollback (mục 9) · **không idempotent**: chống gửi trùng bằng
`UPDATE … WHERE status = 'active'` — yêu cầu thứ hai nhận `409 NOT_ACTIVE`.

**Request** — `id` (path, uuid, bắt buộc); `targetVersionId` (body, uuid, bắt buộc);
`changeReason` (body, string, bắt buộc — `FR-AUDIT-01`).
**Response 2xx** — `200` với `{demoted: {id, status}, promoted: {id, versionNo, status}}`.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 400 | `INVALID_JSON` | body không phải JSON hợp lệ | — |
| 422 | `TARGET_VERSION_REQUIRED` | `targetVersionId` thiếu hoặc không phải uuid | FR-INC-02 |
| 422 | `INVALID_TARGET_SAME_VERSION` | `targetVersionId` trùng phiên bản đang hiệu lực | FR-INC-02 |
| 422 | `INVALID_TARGET_NOT_APPROVED` | phiên bản đích **chưa từng qua cổng maker-checker** — nếu cho, một bản chưa ai duyệt sẽ thành đang hiệu lực và bỏ qua hẳn cổng | GOV-RULE-01 |
| 422 | `CHANGE_REASON_REQUIRED` | `changeReason` thiếu hoặc rỗng | FR-AUDIT-01 |
| **403** | `SELF_ROLLBACK` | người gọi trùng người lập theo quy tắc ở mục 9 | GOV-RULE-01 |
| 409 | `NOT_ACTIVE` | phiên bản `{id}` không ở `status = active` tại thời điểm ghi | GOV-RULE-01 |
| 404 | `NOT_FOUND` | `id` hoặc `targetVersionId` không tồn tại, hoặc vai trò ≠ ROLE-RULE-ADMIN | TBL-ROLE-01 |
| 500 | `INTERNAL_ERROR` | ghi thất bại | — |

**Tác dụng phụ** — hạ cấp phiên bản hiện tại (`active → rolled_back`) và nâng cấp phiên bản đích
(`→ active`) **trong một giao dịch duy nhất**; ghi audit `rollback_rule_version`. Không xoá dòng
nào: bản bị hạ cấp vẫn còn trong SC-23 (`GOV-RULE-01`: "rollback truy vết được").

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `incentive_rule_version` | `version_no` | duy nhất; server sinh tuần tự | tầng 1 (unique index) | có |
| `incentive_rule_version` | `effective_from` | NOT NULL; **> ngày tạo** | tầng 1 (NOT NULL) + tầng 3 (so với hôm nay) | một phần |
| `incentive_rule_version` | `status` | CHECK ∈ 5 giá trị vòng đời; **đúng một** dòng `active` | tầng 1 (CHECK + unique partial index) | **chưa** — hiện CHECK 3 giá trị, không có unique |
| `incentive_rule_version` | `created_by`, `approved_by` | `approved_by <> created_by` | tầng 1 (CHECK trên hai cột cùng dòng) | **chưa** — hiện tầng 3 |
| `incentive_rule_version` | `rate_table`, `change_reason` | cả hai NOT NULL — `NFR-OPS-02` đòi nội dung biểu suất, `FR-AUDIT-01` đòi lý do cho thao tác tạo | tầng 1 | **chưa** — `rate_table` nullable, `change_reason` chưa có cột |
| `incentive_rule_version` | dòng đã tạo | không sửa được nội dung/ngày hiệu lực; chỉ đổi `status`/`approved_by` | tầng 2 (trigger `BEFORE UPDATE`) | **chưa** |
| `audit_log` | `action`, actor, `before`, `after`, `reason` | cả ba thao tác của màn đều ghi | tầng 3 | một phần — tạo chưa ghi |

Ba tầng theo `10-database-diagram.md` § 3: tầng 1 Postgres constraint · tầng 2 trigger · tầng 3
tầng ứng dụng. **maker-checker là ràng buộc P0 và đang ở tầng 3** — khoảng hở nặng nhất của nhóm
màn này; đặt được ở tầng 1 bằng `CHECK` trên hai cột cùng dòng (`20-architecture-design.md` § 5.4).

## 4. Vòng đời trạng thái

Sơ đồ đầy đủ ở `SC-23-danh-sach-phien-ban-bieu-suat.md` § 4. Ba cạnh mà **màn này** sở hữu:

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | `POST /api/incentive-rules` | `pending_approval` | `effectiveFrom` ở tương lai · `rateTable` không rỗng · `changeReason` không rỗng · hạn mức năm còn chỗ | ROLE-RULE-ADMIN (bất kỳ ai trong vai) | `422 EFFECTIVE_DATE_NOT_FUTURE` · `422 RATE_TABLE_REQUIRED` · `422 CHANGE_REASON_REQUIRED` · `409 ANNUAL_QUOTA_EXCEEDED` |
| `pending_approval` | `POST …/approve` | `approved` | **`created_by <> actorId`** · `status` vẫn `pending_approval` tại thời điểm ghi | ROLE-RULE-ADMIN **khác người lập** | `403 SELF_APPROVAL` · `409 ALREADY_DECIDED` |
| `active` | `POST …/rollback` | `rolled_back` (+ đích `→ active`) | maker-checker của rollback · `status` vẫn `active` · đích đã qua cổng duyệt và khác phiên bản hiện tại | ROLE-RULE-ADMIN thoả maker-checker | `403 SELF_ROLLBACK` · `409 NOT_ACTIVE` · `422 INVALID_TARGET_*` |

Guard dễ mất nhất **không phải** vai trò mà là hai điều kiện xếp trên nhau ở cùng một cạnh: vai
trò cho phép **và** danh tính khác người lập. `GOV-RULE-01` (RFP:601) đòi "tách biệt người lập –
người phê duyệt"; cả hai người đều là ROLE-RULE-ADMIN nên **không suy được từ vai trò**. Ẩn nút ở
UI là gợi ý trình bày; biên giới thật là `403` ở server, áp cả khi gọi API trực tiếp. Cạnh rollback
phải **nguyên tử**: một lần lỗi giữa hai bước để hệ thống không còn phiên bản nào đang hiệu lực —
theo `SC-22` § 2 đó là `409 NO_ACTIVE_RULE_VERSION` cho toàn bộ các kỳ tiếp theo.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| GOV-RULE-01 (RFP:601) · §B.6 (RFP:1294) | "phải có tách biệt người lập – người phê duyệt (maker-checker)" | tầng 1 (`CHECK approved_by <> created_by`) + tầng 3 (403 trước khi ghi) | gọi trực tiếp `POST …/approve` bằng chính tài khoản đã tạo → `403 SELF_APPROVAL` |
| GOV-RULE-01 (RFP:601) · §B.6 (RFP:1293) | "Thay đổi quy tắc/biểu suất tối đa **4 lần/năm**" | tầng 3 (đếm trước khi ghi) + tắt biểu mẫu ở màn | tạo phiên bản thứ 5 trong cùng năm → `409 ANNUAL_QUOTA_EXCEEDED` |
| FR-INC-02 (RFP:679) · §B.6 (RFP:1295) | "tạo phiên bản biểu suất mới có **ngày hiệu lực trong tương lai**"; "Bản nháp chưa có hiệu lực cho đến khi được phê duyệt" | tầng 3 (so với ngày nghiệp vụ JST) + vòng đời (engine chỉ chọn `active`) | `effectiveFrom` = hôm nay → `422 EFFECTIVE_DATE_NOT_FUTURE`; phiên bản `pending_approval` không đổi số thưởng của kỳ nào |
| GOV-RULE-01 (RFP:601) · §B.6 (RFP:1296) | "Thay đổi **không được làm biến dạng** dữ liệu đã chốt trước ngày hiệu lực"; "Rollback: bắt buộc có rollback **truy vết được**" | append-only của `incentive_result` + `rule_version_id` NOT NULL; `rolled_back` là trạng thái riêng và không xoá dòng | duyệt hoặc rollback: số của các kỳ đã chốt không đổi; sau rollback cả bản bị hạ cấp và bản được nâng đều còn trong SC-23 |
| FR-RULE-01 (RFP:689) | "ghi nhận với mọi phiên bản rule: người tạo, người phê duyệt, ngày hiệu lực và trạng thái" | tầng 1 (4 cột) | audit của `approve_rule_version` mang cả maker và checker |
| FR-AUDIT-01 (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock…", có "chủ thể thực hiện, timestamp, before/after và lý do" | tầng 3 (`audit_log`) | cả ba thao tác đều để lại một dòng có lý do |
| NFR-OPS-02 (RFP:815) | "cập nhật được bằng thay đổi cấu hình có kiểm soát, không cần sửa dữ liệu lịch sử" | `rateTable` là dữ liệu nhập; không sửa phiên bản cũ | đổi biểu suất chỉ bằng cách tạo phiên bản mới |

Hai số nghiệp vụ ở mục này — **4 lần/năm** (RFP:601, RFP:1293) và **110/100** (RFP:598, RFP:1278)
— đều dẫn nguồn. **Mốc "năm"** và **phạm vi tham số được phiên bản hoá** không có trong RFP → mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang (`/new`, `/[id]`) | `GET …/{id}` | `POST /api/incentive-rules` | `POST …/approve` | `POST …/rollback` |
|---|---|---|---|---|---|
| ROLE-RULE-ADMIN, **không** phải người lập | cho phép | cho phép | cho phép | cho phép | cho phép |
| ROLE-RULE-ADMIN, **là** người lập | cho phép | cho phép | cho phép | từ chối — **403 `SELF_APPROVAL`** | từ chối — **403 `SELF_ROLLBACK`** |
| ROLE-SETTLEMENT | từ chối — **404** | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` |
| ROLE-INTAKE | từ chối — **404** | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` |
| ROLE-JUDGE | từ chối — **404** | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` |
| ROLE-TRADE | từ chối — **404** | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` |
| ROLE-DELIVERY | từ chối — **404** | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` |
| ROLE-SYS-ADMIN | từ chối — **404** | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` | `404 NOT_FOUND` |

- **Đọc và ghi khác nhau.** Phạm vi đọc rộng — **đề xuất thiết kế của LAB-3, không phải yêu cầu khách** (RFP:311 giao bên dự thầu tự đề xuất cơ chế phân tách quyền) — cho mọi vai trò đang hoạt động **đọc** được
  `incentive_rule_version` ở tầng dữ liệu; chặn là ở **ghi** (chỉ ROLE-RULE-ADMIN) và ở **vào
  trang** — một tài khoản ROLE-SETTLEMENT đọc được bảng, chỉ không vào màn và không ghi được.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Hai
  mã `403` duy nhất của màn là `SELF_APPROVAL` và `SELF_ROLLBACK`: chúng nói "bạn vào được đây
  nhưng không được làm việc này với **chính bản của mình**" — không rò rỉ gì.
- **Maker-checker là ràng buộc riêng, không suy ra được từ vai trò.** Hai dòng đầu của bảng cùng
  một vai trò, khác ở hai cột cuối; điều kiện phân biệt là **danh tính người lập** — như SC-21.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Tạo bản nháp | `create_rule_version` | before `null` → after `{versionNo, effectiveFrom, rateTable, status, createdBy}`; reason: `changeReason` **bắt buộc** | FR-AUDIT-01, FR-RULE-01 |
| Phê duyệt | `approve_rule_version` | before `{status: pending_approval, createdBy}` → after `{status: approved, approvedBy}` | FR-AUDIT-01, GOV-RULE-01 |
| Rollback | `rollback_rule_version` | before `{activeVersionId}` → after `{activeVersionId: <đích>, demoted: <cũ>}`; reason: `changeReason` **bắt buộc** | FR-AUDIT-01, §B.6 RFP:1296 |
| Bị từ chối vì tự duyệt / tự rollback | `rule_version_self_approval_denied` | after `{versionId, actor}`; reason `maker_checker` | FR-AUDIT-01, NFR-OPS-01 |
| Đọc chi tiết | — | **không ghi** | FR-AUDIT-01 chỉ liệt tạo · sửa · phê duyệt · lock · đổi quyền |

Dòng thứ tư là chủ ý: một tài khoản liên tục thử tự duyệt bản của mình là "sự kiện bảo mật" mà
`NFR-OPS-01` (RFP:814) đòi giám sát được. Audit ghi **sau** khi nghiệp vụ đã cam kết; ghi audit
lỗi không làm mất thao tác đã thành công, đổi lại phải có alert cho chính nó.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-OPS-02 (RFP:815) | "cập nhật được bằng thay đổi cấu hình có kiểm soát"; nghiệm thu "demo thay đổi rule bằng version mới" | `rateTable` phải là dữ liệu nhập từ biểu mẫu này **và** là thứ engine ở SC-22 thực sự đọc. Demo tạo version mới mà số tiền không đổi thì không nghiệm thu được |
| NFR-SEC-01 (RFP:809) | "Bắt buộc **MFA** cho tài khoản quản trị và các role phê duyệt nội bộ" | ROLE-RULE-ADMIN là role phê duyệt → cả ba đường ghi đòi phiên đã qua MFA (SC-02) |
| NFR-OPS-01 (RFP:814) | giám sát "sự kiện bảo mật" | `403 SELF_APPROVAL`/`SELF_ROLLBACK` và ghi audit thất bại đều là nguồn alert |
| NFR-PERF-01 (RFP:807) · DR-RET-01 (RFP:813) | p95 ≤ 2 giây; dữ liệu nghiệp vụ tra cứu online **7 năm** | `rateTableDiff` và `rollbackCandidates` tính trong cùng vòng truy vấn với chi tiết phiên bản; không xoá phiên bản — rollback tạo trạng thái mới chứ không gỡ dòng |

## 9. Câu hỏi cho chủ đầu tư

- **Khi rollback, maker-checker kiểm người lập của phiên bản nào — phiên bản đang bị hạ cấp, hay
  phiên bản đích?** `GOV-RULE-01` (RFP:601) chỉ nói "tách biệt người lập – người phê duyệt" cho
  *thay đổi*, không định nghĩa cho rollback. Hai cách cho hai tập người được rollback khác nhau;
  chọn sai thì hoặc chặn oan người hợp lệ, hoặc cho một người tự hoàn tác thay đổi của chính
  mình. RFP không nói — **không chọn hộ khách.**
- **Mốc "năm" của hạn mức 4 lần là năm dương lịch hay năm tài chính Nhật (01/4 – 31/3)? Và
  rollback có tính là một lần đổi không?** GOV-RULE-01 (RFP:601) và §B.6 (RFP:1293) chỉ ghi "4
  lần/năm". Câu thứ nhất quyết định lúc nào `409 ANNUAL_QUOTA_EXCEEDED` bật/tắt — chọn sai lệch
  tới 3 tháng; câu thứ hai quyết định một lần đổi sai rồi rollback ngốn 1 hay 2 trong 4 suất.
- **`rateTable` gồm những tham số nào — và 110/100 có nằm trong đó không?** BR-INC-01 (RFP:598,
  §B.5 RFP:1278) **cố định** hệ số 110/100; còn FR-INC-02 (RFP:679), CAP-06 (RFP:546) và
  NFR-OPS-02 (RFP:815) đòi quản lý được "công thức, biểu suất và ngày áp dụng" mà **không cần
  deploy**. Nếu hệ số đã cố định thì phiên bản biểu suất quản lý tham số nào? FR-INC-01 (RFP:678)
  nhắc "tỷ lệ chi trả" như một yếu tố riêng mà RFP không cho giá trị. Cần trước khi code vì nó
  quyết định body của `POST /api/incentive-rules` và mã lỗi kiểm hợp lệ. **Không chọn hộ khách.**
- **Bản nháp có nhánh từ chối (reject) không, và ai được huỷ bản nháp của chính mình?** RFP không
  nói tới nhánh từ chối; SC-21 lại có "Từ chối". Người lập tự huỷ được nghĩa là có một đường ghi
  **không** qua cổng maker-checker.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Nhập nội dung biểu suất | `rateTable` là field bắt buộc; engine đọc nó (NFR-OPS-02 RFP:815, CAP-06 RFP:546) | biểu mẫu **không có ô nào cho biểu suất**; server ghi cứng `{numerator:110, denominator:100, note}`; hệ số **110/100 là hằng trong code** và engine **không đọc** `rate_table` → tạo phiên bản mới **không làm số thưởng đổi**, đổi thật phải sửa code | `src/lib/incentive/create-rule-version.ts:24-26,53`; `calculate-incentive.ts:15`; `src/components/incentive/rule-version-form.tsx:12-14` | cần khách chốt (đúng BR-INC-01, chưa đạt NFR-OPS-02) |
| Hạn mức 4 lần/năm | `409 ANNUAL_QUOTA_EXCEEDED` (GOV-RULE-01 RFP:601) | **code không đếm** số phiên bản tạo trong năm và **không chặn lần thứ 5** — chỉ phần maker-checker được thi công | `src/lib/incentive/create-rule-version.ts:34-73`; `docs/pham-vi-va-phan-mock.md:85` | thiếu |
| Lý do thay đổi + audit khi tạo | `changeReason` bắt buộc và vào audit `create_rule_version` (FR-AUDIT-01 RFP:710) | ô `note` là **tuỳ chọn**, nhét vào `rate_table.note`; **tạo không ghi audit** (duyệt và rollback thì có) | `src/app/api/incentive-rules/route.ts:24`; `src/lib/incentive/create-rule-version.ts:34-73,53` | khác không chủ đích |
| maker-checker ở tầng 1 | `CHECK (approved_by is null or approved_by <> created_by)` | chỉ ở **tầng 3**; migration tự khai *"enforced in the app layer, not a DB constraint"* → một tiến trình cầm khoá dịch vụ tự duyệt được bản mình tạo | `supabase/migrations/20260904090700_incentive.sql:14-17`; `src/lib/incentive/approve-rule-version.ts:29-33` | khác không chủ đích |
| Ngày hiệu lực quá khứ; thông báo `VERSION_CONFLICT` | không chọn được ngày quá khứ ở ô nhập; mỗi mã lỗi một thông báo riêng | ô ngày **không đặt giới hạn nhỏ nhất** nên chọn được ngày quá khứ rồi mới bị server trả 422; 409 rơi về thông báo chung "Có lỗi xảy ra, vui lòng thử lại" | `src/components/incentive/rule-version-form.tsx:9,55-64`; `src/lib/incentive/create-rule-version.ts:12-21` | hở (server vẫn chặn đúng) |
| Rollback nguyên tử | một giao dịch duy nhất | **không có transaction**: hai lệnh ghi rời; hạ cấp xong mà nâng cấp lỗi thì bù ngược bằng lệnh thứ ba, lệnh bù lỗi nữa thì **không còn phiên bản nào đang hiệu lực** cho tới khi sửa tay | `src/lib/incentive/rollback-rule-version.ts:60-82` | khác có chủ đích (đã khai) |
| maker-checker của rollback | RFP không nói — chờ khách chốt (mục 9) | code **đã tự quyết**: kiểm `created_by` của **phiên bản đang bị hạ cấp** | `src/lib/incentive/rollback-rule-version.ts:10-25,44-47` | cần khách chốt |
| Trạng thái và đúng-một-`active` | 5 giá trị lưu (`approved` khác `active`); unique partial index ở tầng 1 | CHECK chỉ 3 giá trị; duyệt xong là `active` ngay và nhãn "đã duyệt chờ tới ngày hiệu lực" chỉ tính lúc đọc; nhiều dòng cùng `active`, chọn dòng có `effective_from` lớn nhất đã tới | `supabase/migrations/20260904090700_incentive.sql:6-7`; `src/lib/incentive/rule-version-display-status.ts:33-34`; `resolve-rule-version.ts:19-26` | khác có chủ đích (tránh job nền) + thiếu ràng buộc tầng 1 |
| Hiển thị tên người dùng | tên hiển thị, khuyết thì **mã người dùng** | `display_name ?? email` → email nội bộ lộ ra UI | `src/lib/incentive/rule-version-queries.ts:18-19` | khác không chủ đích |

## 11. Dẫn chứng

- RFP:601 · GOV-RULE-01 — 4 lần/năm, maker-checker, ngày hiệu lực, rollback, không làm biến dạng dữ liệu đã chốt
- RFP:679 · FR-INC-02 · RFP:689 · FR-RULE-01 · RFP:710 · FR-AUDIT-01 (chủ thể, timestamp, before/after, **lý do**)
- RFP:1289-1296 · §B.6 TBL-RATE-01 — 4 lần/năm, maker-checker, ngày hiệu lực tương lai, rollback truy vết được; RFP:598 · §B.5 RFP:1276-1287 · BR-INC-01 — hệ số 110/100 cố định, mốc JST; RFP:678 · FR-INC-01 — "tỷ lệ chi trả" không có giá trị
- RFP:546 · CAP-06 · RFP:815 · NFR-OPS-02 — quản lý công thức/biểu suất không cần deploy; RFP:807 · NFR-PERF-01 · RFP:809 · NFR-SEC-01 · RFP:813 · DR-RET-01 · RFP:814 · NFR-OPS-01
- Feature List `FE-031` — `plans/260909-1355-lab4-thiet-ke-chi-tiet/chi-muc-sc-fe-yeu-cau.md:229-233`
- `docs/lab4/10-database-diagram.md` § 3 — ba tầng thực thi ràng buộc; `20-architecture-design.md` § 5.4 — maker-checker là ràng buộc kiến trúc, ba khoảng hở
- *(chỉ cho mục 10)* `src/lib/incentive/create-rule-version.ts:12-21,24-26,34-73,53`, `calculate-incentive.ts:15`, `approve-rule-version.ts:29-33`, `rollback-rule-version.ts:10-25,44-47,60-82`, `resolve-rule-version.ts:19-26`, `rule-version-display-status.ts:33-34`, `rule-version-queries.ts:18-19`, `src/components/incentive/rule-version-form.tsx:9,12-14,55-64`, `src/app/api/incentive-rules/route.ts:24`, `supabase/migrations/20260904090700_incentive.sql:6-7,14-17`, `docs/pham-vi-va-phan-mock.md:85`
