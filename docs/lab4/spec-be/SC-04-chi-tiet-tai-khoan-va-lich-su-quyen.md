# SC-04 — Chi tiết tài khoản và lịch sử quyền · Spec BE

| | |
|---|---|
| FE liên quan | FE-003 (Quản lý tài khoản và quyền) — nửa "ghi nhận lịch sử thay đổi" |
| FN | FN-01 (Quản lý danh tính và phân quyền nội bộ) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-IAM-02, FR-AUDIT-01, FR-AUDIT-02, NFR-SEC-01, NFR-SEC-03, DR-RET-01, TBL-ROLE-01 |
| Miền dữ liệu | D-PARTY |
| State machine | vòng đời quyền dùng §4 của `SC-03-danh-sach-tai-khoan.md`; màn này thêm trục **vai trò** — xem §4 |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

Đọc một tài khoản nội bộ ở mức chi tiết, **đổi vai trò**, và trả về **lịch sử quyền before/after** —
chỗ duy nhất trong 32 màn nhìn thấy được cả cặp trước/sau, chủ thể và thời điểm cho quyền tài khoản
nội bộ. Nghiệm thu `FR-IAM-02` (RFP:628) là một yêu cầu **hiển thị**, không phải yêu cầu lưu trữ
ngầm, nên bảng lịch sử ở §3 và endpoint đọc nó ở §2 là phần không được cắt. **Không** làm: danh sách
và ba chuyển tiếp cấp/tạm ngừng/mở lại (→ SC-03, dùng chung đường ghi và chung bảng lịch sử); diện
bắt buộc MFA (→ SC-02); tra cứu vết thao tác chung (→ SC-30). Là màn bảo mật trong repo công khai nên
bản này chỉ đặc tả yêu cầu và luồng.

## 2. Hợp đồng API

Cả ba endpoint: **xác thực bắt buộc, phiên đủ mức theo SC-02, vai trò ROLE-SYS-ADMIN**. Sáu vai còn
lại nhận `404 not_found` (`TBL-ROLE-01`, RFP:245); `accountId` không tồn tại **cũng** trả `404
not_found` — cùng mã, có chủ đích, người xem không phân biệt được hai ca. Phiên chưa đủ mức nhận
`409 step_up_required` (`NFR-SEC-01`, RFP:809). Ba mã đó không nhắc lại ở từng mục dưới. Thao tác
**mở khoá tạm** dùng đúng endpoint `POST /api/admin/accounts/{accountId}/unlock` đã đặc tả ở SC-03
§2 — không nhân bản ở đây.

### `GET /api/admin/accounts/{accountId}`

| | |
|---|---|
| Thoả yêu cầu | FE-003 · FR-IAM-02 (RFP:628) |
| Idempotent | có — chỉ đọc |

**Request:** `accountId` (path, uuid, có). **Tác dụng phụ:** không ghi gì.
**Response 200:** `identifier` (chỉ đọc — đổi định danh là luồng của nhà cung cấp xác thực, §9 Q3) ·
`displayName` · `role` · `permission` · `grantedAt` · `lockState` (đang khoá, mốc hết khoá) ·
`factorStatus` (ba giá trị; nguồn phụ thuộc SC-02, §9 Q4) · `currentVersionToken` (dùng cho
`PATCH`, §4).

### `GET /api/admin/accounts/{accountId}/permission-history`

| | |
|---|---|
| Thoả yêu cầu | FE-003 · **nghiệm thu `FR-IAM-02`** (RFP:628) · FR-AUDIT-01 (RFP:710) |
| Idempotent | có — chỉ đọc |

**Request:** `accountId` (path) · `changeType` (query, enum, không — lọc theo loại thay đổi) ·
`limit`, `cursor` (query, không — ngưỡng chưa có nguồn, §9 Q6).
**Response 200:** `items[]` theo thứ tự thời gian, mỗi phần tử gồm `changedAt` · `changeType` (5 giá
trị của §4) · `before` (**cặp** vai trò + trạng thái quyền) · `after` (**cặp** vai trò + trạng thái
quyền) · `reason` · `changedBy` (tên hiển thị của chủ thể); kèm `nextCursor`.

**Hai cột `before`/`after` mang cặp giá trị, kể cả khi chỉ một nửa đổi** — đọc một dòng là biết đủ
trạng thái, không phải suy từ dòng trước. Dòng đầu (loại `cấp quyền`) có `before` = null, là ca đặc
biệt duy nhất; dòng loại `mở khoá tạm` có `before` = `after` vì không đổi trạng thái quyền (§9 Q2).
**Mã lỗi riêng:** `500 internal_error` — bảng lịch sử quyền chưa tồn tại hoặc không đọc được.
**Tác dụng phụ:** không ghi gì. Thiết kế **cấm** trả bảng rỗng lặng lẽ cho một tài khoản có tồn tại:
không có dòng nào là dấu hiệu **thiếu dấu vết**, và response phải phân biệt được ca đó với ca "chỉ có
dòng cấp quyền" (§9 Q5).

### `PATCH /api/admin/accounts/{accountId}`

| | |
|---|---|
| Thoả yêu cầu | FE-003 · FR-IAM-02 (RFP:628) · FR-AUDIT-01 (RFP:710) |
| Idempotent | không — mỗi lần gọi sinh một dòng lịch sử; gọi lại với cùng giá trị đích trả 409 |

**Request:** `accountId` (path) · `role` (body, enum 7 giá trị `TBL-ROLE-01`, không) · `permission`
(body, enum `đang hoạt động` / `đã tạm ngừng`, không) · `displayName` (body, string, không) ·
`reason` (body, string — **bắt buộc khi và chỉ khi** `role` hoặc `permission` có trong body) ·
`versionToken` (body, string, có — giá trị `currentVersionToken` màn đã đọc).
**Server tự quyết — không nhận từ client:** chủ thể, thời điểm, `changeType` (suy từ **cặp** trước và
sau, không nhận từ client), nội dung dòng lịch sử.
**Response 200:** trường đã đổi · `historyEntryId` · `currentVersionToken` mới.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu |
|---|---|---|---|
| 400 | `empty_patch` | body không chứa trường nào trong ba trường sửa được | — |
| 409 | `version_conflict` | `versionToken` không khớp giá trị hiện tại — người khác đã đổi sau khi màn đọc | FR-IAM-02 (RFP:628) |
| 409 | `already_in_state` | `role` hoặc `permission` yêu cầu trùng giá trị hiện tại — không có chuyển tiếp nào để ghi | FR-IAM-02 |
| 409 | `self_role_demotion_blocked` | chủ thể tự đổi vai trò của chính mình ra khỏi ROLE-SYS-ADMIN | RFP §02-08 (RFP:310) |
| 409 | `last_admin_blocked` | đổi vai trò hoặc tạm ngừng làm còn **0** tài khoản ROLE-SYS-ADMIN đang hoạt động | RFP §02-08 (RFP:310) |
| 422 | `role_invalid` | `role` không thuộc 7 giá trị `TBL-ROLE-01` | TBL-ROLE-01 (RFP:245) |
| 422 | `reason_required` | body có `role` hoặc `permission` mà `reason` rỗng sau khi bỏ khoảng trắng | FR-AUDIT-01 (RFP:710) |
| 422 | `identifier_immutable` | body chứa `identifier` | FR-IAM-02 |
| 500 | `history_write_failed` | không ghi được dòng lịch sử → **không** được đổi bản ghi tài khoản | FR-IAM-02 |

**Tác dụng phụ:** đổi tối đa ba cột trên D-PARTY + **1** dòng lịch sử quyền khi `role` hoặc
`permission` đổi + 1 vết thao tác (§7). Sửa **chỉ** `displayName` **không** sinh dòng lịch sử quyền —
không phải thay đổi quyền — chỉ vào vết thao tác chung. Đổi vai trò sang vai thuộc diện bắt buộc MFA
làm phiên của người đó không còn đủ mức, hiệu lực ở **lần điều hướng kế tiếp** của họ (§9 Q7).

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Tài khoản nội bộ (D-PARTY, RFP:602) | định danh | chỉ đọc ở màn này; duy nhất | 1 (UNIQUE) | có |
| Tài khoản nội bộ | vai trò | đúng 7 giá trị `TBL-ROLE-01` (RFP:245) — ràng buộc dữ liệu là chốt cuối, tầng ứng dụng không tự nới | 1 (CHECK) | có |
| Tài khoản nội bộ | trạng thái quyền, tên hiển thị, thời điểm cấp | trạng thái quyền chỉ đổi qua các chuyển tiếp §4 | 1 + 3 | có |
| Tài khoản nội bộ | số lần sai, mốc hết khoá tạm | trục **độc lập** với trạng thái quyền | 3 | có |
| Tài khoản nội bộ | — | mốc so sánh cho `versionToken` (cột phiên bản hoặc mốc cập nhật) | 1 (cột mới) | **chưa** |
| Tài khoản nội bộ | — | **không** cho phép 0 tài khoản ROLE-SYS-ADMIN đang hoạt động | 2 (trigger) | **chưa** |
| **Bảng lịch sử quyền** (D-PARTY) | xem DDL đề xuất dưới | 1 dòng cho mỗi chuyển tiếp; **chỉ ghi thêm** | 1 (bảng mới) + 2 | **chưa** |
| Vết thao tác (D-PARTY) | chủ thể, loại thao tác, before/after, lý do, thời điểm | chỉ ghi thêm — FR-AUDIT-01 (RFP:710) | 1 + 3 | có |

**DDL đề xuất cho bảng lịch sử quyền** — SC-03 §3 dẫn về đây; dùng **chung một bảng**, không tạo hai.
Khuôn bắt chước bảng lịch sử trạng thái người tham gia của cùng miền D-PARTY (đã chạy thật): khoá
chính · khoá ngoại tới tài khoản nội bộ (**không** cascade khi xoá — mất lịch sử là mất dấu vết kiểm
toán) · `change_type` ràng buộc đúng 5 giá trị của §4 · `from_role`, `to_role` · `from_permission`,
`to_permission` · `reason` (không rỗng — §9 Q1) · `changed_by` → tài khoản nội bộ · `changed_at` ·
chỉ mục theo khoá ngoại và `changed_at`. Hai điểm phải khai đúng: **(a)** cặp trước/sau tách thành
**hai cặp cột** thay vì một cột tự do, để truy vấn được "ai từng giữ vai trò nào" — khác cách vết
thao tác chung gói cả bản ghi vào một cột; **(b)** chỉ ghi thêm phải ở **tầng 1 hoặc 2**, không phải
kỷ luật ở tầng 3, vì sửa được lịch sử quyền thì lịch sử vô nghĩa với kiểm toán.

## 4. Vòng đời trạng thái

Trục **trạng thái quyền** dùng đúng sơ đồ ở §4 của `SC-03-danh-sach-tai-khoan.md` (ba chuyển tiếp
`FR-IAM-02`). Màn này thêm **trục vai trò**, và trục đó **không** đổi trạng thái quyền — nên hai trục
phải đọc được độc lập, giống cặp *quyền tài khoản* / *khoá tạm*. Năm loại thay đổi dưới là tập giá
trị của cột `change_type`.

| Từ | Sự kiện | Đến | Guard | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | `cấp quyền` | vai trò X · đang hoạt động | thuộc SC-03 — `before` = null; là dòng đầu của lịch sử | ROLE-SYS-ADMIN | xem SC-03 §2 |
| vai trò X | `đổi vai trò` | vai trò Y · trạng thái quyền **không đổi** | `versionToken` khớp · `role` thuộc 7 giá trị · không phải tự hạ quyền của chính mình · còn ≥ 1 quản trị đang hoạt động · có lý do | ROLE-SYS-ADMIN | 409 `version_conflict` · 409 `self_role_demotion_blocked` · 409 `last_admin_blocked` · 422 `role_invalid` · 422 `reason_required` |
| đang hoạt động | `tạm ngừng` | đã tạm ngừng · vai trò **không đổi** | `versionToken` khớp · còn ≥ 1 quản trị đang hoạt động · có lý do | ROLE-SYS-ADMIN | 409 `version_conflict` · 409 `last_admin_blocked` · 422 `reason_required` |
| đã tạm ngừng | `mở lại` | đang hoạt động · vai trò **không đổi** | `versionToken` khớp · có lý do | ROLE-SYS-ADMIN | 409 `version_conflict` · 422 `reason_required` |
| (mọi trạng thái) | `mở khoá tạm` | *không đổi vai trò và không đổi trạng thái quyền* | đang trong thời gian khoá tạm — endpoint của SC-03 §2 | ROLE-SYS-ADMIN | 409 `not_locked` |
| (mọi trạng thái) | sửa tên hiển thị | *không sinh dòng lịch sử quyền* | `versionToken` khớp | ROLE-SYS-ADMIN | 409 `version_conflict` |

**Guard dễ mất nhất là thứ tự ghi, không phải điều kiện.** Một lần đổi chạm hai nơi. Thứ tự phải là
**đọc giá trị cũ → ghi dòng lịch sử → đổi bản ghi có so `versionToken`**; bước cuối thất bại thì ghi
một dòng bù, **không xoá** dòng đã ghi. Đảo thứ tự thì tồn tại ca *vai trò đã đổi mà không có dòng
before/after* — đúng thứ nghiệm thu `FR-IAM-02` cấm. Guard thứ hai: `last_admin_blocked` phải kiểm
trên **cả hai** trục, vì đổi vai trò của quản trị cuối sang vai khác cũng làm còn 0 quản trị.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `FR-IAM-02` nghiệm thu (RFP:628) | "Mọi thay đổi quyền đều có **before/after**, chủ thể thực hiện và **timestamp**" | endpoint đọc lịch sử ở §2 phải trả đủ ba thứ cho **mọi** dòng; bảng ở §3 lưu cặp trước/sau thành hai cặp cột | test: sau mỗi chuyển tiếp §4, một dòng mới có đủ ba thứ; không có ca đổi mà thiếu dòng |
| Screen List LAB-1 | "**bắt buộc hiển thị** before/after" | yêu cầu **hiển thị** nên endpoint lịch sử là bắt buộc, không phải tuỳ chọn của FE | test: bỏ endpoint lịch sử → màn không thoả nghiệm thu dù dữ liệu đủ |
| `FR-AUDIT-01` (RFP:710) | "truy được chủ thể thực hiện, timestamp, before/after và **lý do**" | `reason` không rỗng cho bốn loại thay đổi quyền — **mức này suy từ `FR-AUDIT-01`, không phải từ `FR-IAM-02`** (§9 Q1) | test: `reason` rỗng → 422 và không ghi gì |
| `TBL-ROLE-01` (RFP:245, 255) | 7 vai trò · ROLE-SYS-ADMIN "Quản lý **tài khoản, quyền**"; nhạy "Cấp quyền đặc biệt, lock/unlock" | ràng buộc dữ liệu 7 giá trị là chốt cuối; cả ba endpoint chỉ mở cho ROLE-SYS-ADMIN | test: `role` ngoài tập → 422; 6 vai gọi endpoint → 404 |
| RFP §02-08 (RFP:310, 311) | "lock/unlock tài khoản … đều cần **dấu vết kiểm toán**" · bên dự thầu **đề xuất** cơ chế truy vết | mọi loại thay đổi kể cả `mở khoá tạm` ghi vào **cùng** bảng lịch sử, để người kiểm chỉ đọc một dòng thời gian; lịch sử **chỉ ghi thêm** — không đường sửa, không đường xoá, ghi sai thì ghi dòng bù | test: mở khoá tạm → có dòng trong cùng danh sách; mọi đường ghi khác `insert` bị từ chối ở tầng dữ liệu |

Không có con số nghiệp vụ nào của màn này có nguồn trong RFP — độ dài `displayName`, độ dài `reason`,
ngưỡng `limit` của lịch sử → §9 Q6.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | `GET` chi tiết | `GET` lịch sử quyền | `PATCH` | **Đọc** bảng lịch sử quyền qua tầng dữ liệu |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | cho phép |
| 6 vai còn lại — ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN | 404 | 404 | 404 | **`[CHƯA CHỐT]`** — §9 Q8 |

- **Đọc và ghi khác nhau, và ở màn này cột cuối còn quyết được trước khi hỏng.** Phạm vi đọc là **đề
  xuất thiết kế** của bên dự thầu — RFP §02-08 (RFP:311) giao cho bên dự thầu "đề xuất cơ chế phân
  tách quyền và truy vết"; RFP **không** đòi đọc mở. Đề xuất hiện hành cho mọi vai đang hoạt động đọc
  mọi bảng, nên **dựng bảng lịch sử quyền theo cùng khuôn đó là mọi vai trò đọc được toàn bộ lịch sử
  phân quyền của mọi người** — gồm cả lý do tạm ngừng, thứ dễ mang thông tin nhân sự. Bảng **chưa tồn
  tại** nên đây là chỗ duy nhất của nhóm còn quyết được trước khi phát sinh nợ. Đá với RFP §09-06
  (RFP:886) đòi RBAC **bằng chữ**; và đây là **đề xuất của ta chống một yêu cầu khách**, không phải
  hai yêu cầu khách chống nhau.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích; ca `accountId` không tồn tại dùng cùng mã.
- **Không** cần maker-checker (`GOV-RULE-01`, RFP:601, chỉ áp cho rule). Nhưng
  `self_role_demotion_blocked` và `last_admin_blocked` là ràng buộc **riêng**: chúng so *chủ thể* với
  *đối tượng* và so *số lượng còn lại*, không suy ra được từ vai trò, nên phải thực thi ở đường ghi.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Đổi vai trò | `account_role_changed` | `before`/`after` = **cặp** vai trò + trạng thái quyền · `reason` · chủ thể · thời điểm | FR-IAM-02 (RFP:628), FR-AUDIT-01 (RFP:710) |
| Tạm ngừng / Mở lại | `account_suspended` / `account_reactivated` | cặp trước/sau · `reason` · chủ thể · thời điểm | FR-IAM-02 |
| Mở khoá tạm | `account_unlocked` | `before` = mốc hết khoá cũ · `after` = không khoá | RFP §02-08 (RFP:310) |
| Sửa tên hiển thị | `account_profile_updated` | cặp trước/sau của tên hiển thị — **chỉ** vào vết thao tác chung, **không** vào lịch sử quyền | FR-AUDIT-01 |
| Bị chặn vì thiếu quyền | `denied_write_attempt` | chủ thể · vai · endpoint — lần gọi bị 404 vẫn phải vào log | NFR-SEC-03 (RFP:811) |
| Ghi dòng lịch sử thất bại | `history_write_failed` | payload bị từ chối · lý do — thao tác nghiệp vụ **không** được coi là đã xảy ra | FR-IAM-02 |

**Hai vết ghi, không thay nhau.** Bảng lịch sử quyền (§3) là nơi màn này đọc để hiển thị
before/after và là nơi truy vấn được theo vai trò; vết thao tác chung là nơi SC-30 tra cứu theo
`FR-AUDIT-02` (RFP:711). Một thao tác ghi vào **cả hai**, cả hai chỉ ghi thêm, cùng biên nghiệp vụ.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-SEC-01` (RFP:809) | MFA cho tài khoản quản trị | ROLE-SYS-ADMIN thuộc diện bắt buộc → cả ba endpoint đòi phiên đủ mức; `factorStatus` phụ thuộc SC-02 (§9 Q4); và đổi vai trò ở đây có thể **hạ mức phiên của người khác** (§9 Q7) |
| `NFR-SEC-03` (RFP:811) · `DR-RET-01` (RFP:813) | khoá tạm và log hành vi bất thường · dữ liệu nghiệp vụ tra cứu online lưu **7 năm** | trục khoá tạm hiển thị ở `GET` chi tiết, và lần gọi bị 404 vì thiếu quyền phải vào log (§7); không nói rõ vết phân quyền thuộc diện 7 năm (§9 Q6) nên nếu thuộc thì cần policy dọn |
| `FR-AUDIT-02` (RFP:711) · `NFR-PERF-01` (RFP:807) | tìm kiếm audit theo người tham gia và loại thao tác, trong ngưỡng NFR · p95 ≤ 2 giây | `changeType` là tham số lọc của endpoint lịch sử, cần chỉ mục theo khoá ngoại cộng `changed_at`; lịch sử của tài khoản lâu năm có thể nhiều dòng nên phân trang là bắt buộc |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — `reason` có bắt buộc cho mọi thay đổi quyền không? `[CHƯA CHỐT]`** `FR-IAM-02` (RFP:628) chỉ
  đòi before/after, chủ thể và timestamp — **không đòi lý do**; mức "bắt buộc" ở §2 và ràng buộc không
  rỗng ở §3 **suy từ `FR-AUDIT-01`** (RFP:710). Cần trước khi tạo bảng vì đó là ràng buộc dữ liệu:
  không bắt buộc thì lịch sử mất phần "vì sao", bắt buộc thì `mở khoá tạm` thường ngày thành nặng tay.
- **Q2 — Dòng `mở khoá tạm` trình bày cặp trước/sau thế nào?** Vai trò và trạng thái quyền đều không
  đổi nên hai ô giống nhau; ghi mốc khoá vào cặp đó là trộn hai trục vào một cột.
- **Q3 — Có luồng đổi định danh nội bộ không, và ở màn nào?** Màn này trả `422 identifier_immutable`.
  Nếu khách cần đổi thì phải có đường đồng bộ danh bạ xác thực với cột định danh (duy nhất), cộng một
  quyết định: lần đổi đó có vào lịch sử **quyền** hay không.
- **Q4 — `factorStatus` lấy nguồn ở đâu trước khi SC-02 dựng?** Ba giá trị cần **diện bắt buộc MFA đã
  chốt**, mà diện đó còn `[CHƯA CHỐT]` vì RFP không liệt vai nào có quyền phê duyệt (SC-02 §9 Q1).
- **Q5 — Tài khoản có tồn tại mà lịch sử quyền trống hẳn thì xử lý ra sao?** Thiết kế cấm hiện bảng
  rỗng lặng lẽ — đó là dấu hiệu thiếu dấu vết, không phải trạng thái bình thường. Cần chốt: chặn sửa
  quyền cho tới khi có dòng gốc, hay chỉ cảnh báo.
- **Q6 — Bốn con số chưa có nguồn:** độ dài tối đa `displayName` và `reason`, ngưỡng `limit` của lịch
  sử, và **thời hạn lưu** lịch sử quyền — `DR-RET-01` (RFP:813) nêu 7 năm cho "dữ liệu nghiệp vụ tra
  cứu online" nhưng không nói rõ vết phân quyền thuộc diện đó.
- **Q7 — Đổi vai trò sang vai thuộc diện bắt buộc MFA thì phiên đang sống của người đó xử lý ra sao?**
  Thiết kế nói phiên thành chưa đủ mức ở **lần điều hướng kế tiếp**, tức còn một khoảng người đó giữ
  mức cũ. Chấm dứt ngay thì cần đường thu hồi phiên ở nhà cung cấp xác thực — hạng mục thêm.
- **Q8 — Vai nào được ĐỌC bảng lịch sử quyền? `[CHƯA CHỐT]`** Bảng **chưa tồn tại** nên còn quyết được
  trước khi phát sinh nợ; dựng theo khuôn đọc mở hiện hành thì mọi vai đọc được toàn bộ lịch sử phân
  quyền (§6). Kèm theo: `FR-AUDIT-02` (RFP:711) nêu người đọc vết là "bộ phận hành chính / kiểm toán
  nội bộ" — **không khớp vai trò nào trong `TBL-ROLE-01`** (RFP:245), nên có thể thiếu một vai trong
  ma trận vai trò của khách.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Toàn bộ màn | đổi vai trò · tạm ngừng · mở lại từ màn chi tiết — FR-IAM-02 (RFP:628) | không có màn và không có endpoint nào; vai trò cố định từ lúc nạp dữ liệu mẫu | `docs/pham-vi-va-phan-mock.md:76` | khác có chủ đích — hoãn cùng SC-02/SC-03, lý do là **phạm vi prototype** |
| Bảng lịch sử quyền | DDL ở §3; cặp trước/sau thành hai cặp cột; chỉ ghi thêm | chưa có bảng nào. Vết thao tác chung có ghi thao tác nhưng gói cả bản ghi vào một cột tự do nên không truy vấn được theo vai trò | `supabase/migrations/20260904090000_core_identity.sql:26-40` | khác có chủ đích — **có tiền lệ cấu trúc đã chạy thật để bắt chước**: `supabase/migrations/20260904090100_participant.sql:18-32` mang đúng khuôn from/to + lý do + chủ thể + thời điểm |
| `reason` bắt buộc | §9 Q1 | chưa có; primitive ghi vết để ngỏ việc `reason` bắt buộc hay không cho từng feature | `src/lib/audit/write-audit-log.ts:4-32` | cần khách chốt — FR-IAM-02 không nói "lý do", chỉ FR-AUDIT-01 nói |
| `versionToken` | §2, §4 — so trước khi ghi | bảng tài khoản không có cột phiên bản và không có đường ghi nào để so | `supabase/migrations/20260904090000_core_identity.sql:7-21` | khác có chủ đích |
| Chặn 0 quản trị · chặn tự hạ quyền | tầng 2 hoặc đường ghi (§3, §4) | không có ràng buộc nào ở tầng nào | `supabase/migrations/20260904090000_core_identity.sql:11-17` | khác không chủ đích |
| Ghi hai nơi cùng biên | audit lỗi thì nghiệp vụ không được coi là đã xảy ra (§7) | vết thao tác ghi **sau** khi nghiệp vụ đã commit và không rollback được | `src/lib/audit/write-audit-log.ts:44-50` | khác không chủ đích |
| Phạm vi đọc lịch sử quyền | RBAC cho thông tin cá nhân — RFP §09-06 (RFP:886); §9 Q8 | khuôn hiện hành cho mọi vai đang hoạt động đọc mọi bảng, gồm cả bảng lịch sử trạng thái người tham gia; lý do ghi trong migration là `FR-601` — **mã nội bộ của LAB-3, không phải mã yêu cầu của khách** (grep RFP: 0 hit) | `supabase/migrations/20260904090900_rls_core.sql:28-38` | cần khách chốt — ADR-014, trạng thái **Đề xuất**; phải quyết **trước** khi tạo bảng |
| `factorStatus` | ba giá trị (§2) | không có nguồn — phụ thuộc SC-02 đang hoãn | `supabase/config.toml:295-303` | khác có chủ đích |

## 11. Dẫn chứng

- RFP:245, 255 — `TBL-ROLE-01`; ROLE-SYS-ADMIN giữ "quản lý tài khoản, quyền" và "lock/unlock tài khoản"
- RFP:310, 311 — §02-08: thao tác độ nhạy cao cần dấu vết; **bên dự thầu đề xuất cơ chế phân tách quyền**
- RFP:601 — `GOV-RULE-01` (chỉ cho rule) · RFP:602 — `D-PARTY` · RFP:628 — `FR-IAM-02` · RFP:710, 711 — `FR-AUDIT-01/02`
- RFP:807, 809, 811, 813 — `NFR-PERF-01`, `NFR-SEC-01`, `NFR-SEC-03`, `DR-RET-01`
- RFP:881-888 — §09-06 APPI; **RFP:883** phạm vi thông tin cá nhân; **RFP:886** đòi RBAC bằng chữ
- Feature List `FE-003` · Screen List LAB-1 ("bắt buộc hiển thị before/after")
- `docs/lab4/wireframes/screens/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.html` · `.momorph/specs/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-admin-account-detail.csv`
- `docs/lab4/spec-be/SC-03-danh-sach-tai-khoan.md` §2, §4 (ba chuyển tiếp và endpoint `unlock` dùng chung) · `docs/lab4/adr/ADR-014-siet-quyen-doc-du-lieu-nhay.md` (§9 Q8) · `docs/lab4/spec/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.md` (as-built cho §10)
