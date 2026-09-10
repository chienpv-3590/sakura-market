# SC-06 — Chi tiết và vòng đời hiệu lực người tham gia · Spec BE

| | |
|---|---|
| FE liên quan | FE-005 (Quản lý profile người tham gia), FE-006 (Vòng đời hiệu lực tham gia) |
| FN | FN-02 (Quản lý người tham gia và hiệu lực 許可/承認) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-PARTY-01 · kế thừa FR-AUDIT-01, NFR-PERF-01, NFR-SEC-03 |
| Miền dữ liệu | D-PARTY (RFP:602) |
| State machine | FIG-010 (RFP:609) — **đúng năm cạnh**, cổng kiểm theo `FIG-004` (RFP:288-294) |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

Một profile người tham gia cộng **toàn bộ vòng đời hiệu lực**: đọc hồ sơ, sửa hồ sơ có kiểm soát,
chuyển trạng thái theo `FIG-010`, đọc lại lịch sử chuyển trạng thái. `FE-006` khai *"Chuyển trạng
thái theo FIG-010: có hiệu lực / tạm ngừng / mất hiệu lực / xét lại"* — bốn trạng thái, năm cạnh.
`FR-PARTY-01` (RFP:629) cấm gộp sai các role có bản chất khác nhau, nên `category` là **bất biến**
và cạnh gỡ tạm ngừng phải mang **cổng kiểm theo phân loại**.

**Không** làm: kiểm hiệu lực tại thời điểm chốt giao dịch — `FR-PARTY-02` (RFP:630) tự giới hạn ở
*"thời điểm chốt giao dịch"* nên cửa đó thuộc SC-11; cảnh báo sắp hết hiệu lực (SC-07); xoá profile
(SC-05 §9 Q2). Màn **không** chạm dữ liệu thuộc phạm vi lock kỳ — vòng đời trải nhiều ngày nghiệp
vụ nên `FR-SETTLE-02` (RFP:660) không áp và màn không bao giờ trả lỗi khoá kỳ.

## 2. Hợp đồng API

### `GET /api/participants/{id}`

Thoả FE-005 · FE-006 · FR-PARTY-01 (RFP:629). Xác thực bắt buộc; vai được gọi: **mọi vai đang hoạt
động** (§6); idempotent (đọc).

**Response 200:** `profile` (`id`, `name`, `category`, `licenseType`, `status`, `validFrom`,
`validTo`, `basisMismatch`, `version`) · `allowedEvents[]` — chỉ những cạnh hợp lệ **từ trạng thái
hiện tại**, mỗi cạnh mang `event`, `procedureName` (tên thủ tục của `category` theo `FIG-004`) và
`gateSatisfied`, để giao diện và tầng dịch vụ nói cùng một câu · `history[]` (`fromStatus`,
`toStatus`, `procedure`, `reason`, `changedByName`, `changedAt`) sắp **cũ nhất trước**.

**Mã lỗi:** 404 `not_found` khi `id` không tồn tại · 422 `data_out_of_domain` khi `category` hoặc
`status` trong dữ liệu rơi ngoài tập hợp lệ của FR-PARTY-01 và FIG-010.
**Tác dụng phụ:** không. Không ghi audit (SC-05 §9 Q4).

### `PATCH /api/participants/{id}`

Thoả FE-005 · FR-PARTY-01 (RFP:629) · FR-AUDIT-01 (RFP:710). Xác thực bắt buộc; vai được gọi:
**vai quản trị người tham gia** (§6). **Không** idempotent — chống ghi đè bằng `expectedVersion`,
không bằng một lần đọc trước khi ghi.

**Request** — `id` (path, uuid, bắt buộc, profile tồn tại) · `name` (body, string, không bắt buộc,
`1..100` sau khi cắt khoảng trắng) · `validFrom` (body, date, không bắt buộc, `YYYY-MM-DD`) ·
`validTo` (body, date hoặc null, không bắt buộc, `>= validFrom`) · `reason` (body, string, **bắt
buộc**, không rỗng — FR-AUDIT-01) · `expectedVersion` (body, integer, **bắt buộc**, bằng phiên bản
hiện tại — RFP:781). **Server tự quyết:** `licenseType` (suy từ `category`), `status`, `updatedBy`,
`updatedAt`. **`category` không được có mặt trong request** — kể cả khi giá trị không đổi (§5).

**Response 200:** profile sau khi sửa · `version` mới.

**Mã lỗi** — mỗi mã đúng một điều kiện:
`422 category_immutable` request **có mặt** key `category` (RFP:309) · `422 invalid_name` `name`
rỗng sau khi cắt khoảng trắng · `422 name_too_long` `name` vượt 100 ký tự · `422 invalid_valid_from`
`validFrom` không đúng `YYYY-MM-DD` · `422 invalid_valid_to` `validTo` không phải null và không đúng
`YYYY-MM-DD` · `422 valid_to_before_valid_from` `validTo < validFrom` · `422 reason_required`
`reason` rỗng (FR-AUDIT-01) · `422 no_fields_to_update` không trường nào thay đổi giá trị (RFP:781) ·
`409 version_conflict` `expectedVersion` khác phiên bản hiện tại (RFP:781).

**Tác dụng phụ:** UPDATE `D-PARTY` chỉ những cột thực sự đổi + một dòng kiểm toán `action='update'`
mang `before`/`after` **chỉ chứa cột đã đổi** và `reason`. Không phát thông báo.

### `POST /api/participants/{id}/transition`

Thoả FE-006 · FIG-010 (RFP:609) · FIG-004 (RFP:288-294). Xác thực bắt buộc; vai được gọi: **vai
quản trị người tham gia**, và cạnh gỡ tạm ngừng còn cần đúng thẩm quyền theo `category` (§4).
**Không** idempotent — chống đua bằng ghi có điều kiện trên trạng thái nguồn.

**Request** — `id` (path, uuid, bắt buộc) · `event` (body, string, bắt buộc, thuộc đúng năm cạnh
của FIG-010) · `fromStatus` (body, string, **bắt buộc**, bằng trạng thái hiện tại — mốc chống ghi
đè, RFP:781) · `reason` (body, string, **bắt buộc**, `1..1000`). **Server tự quyết:** trạng thái
đích (suy từ bảng cạnh), `procedure` (suy từ `category` theo `FIG-004`), `changedBy`, `changedAt`.

**Response 200:** `status` mới · `procedure` đã áp dụng · dòng lịch sử vừa ghi.

**Mã lỗi** — mỗi mã đúng một điều kiện:
`422 invalid_event` `event` không thuộc năm cạnh của FIG-010 · `422 illegal_transition` cặp
(`fromStatus`, `event`) không có trong bảng năm cạnh · `422 reason_required` `reason` rỗng ·
`422 gate_not_satisfied` cạnh gỡ tạm ngừng nhưng điều kiện tiền đề của `category` chưa đạt
(RFP:309) · `422 procedure_undefined` cạnh gỡ tạm ngừng cho `category` mà `FIG-004` không có dòng
(§9 Q1) · `403 authority_mismatch` vai gọi không phải bên quyết định của thủ tục đó theo `FIG-004`
(RFP:310) · `409 status_conflict` `fromStatus` khác trạng thái hiện tại (RFP:781).

**Tác dụng phụ:** UPDATE `participant.status` **và** INSERT một dòng lịch sử chuyển trạng thái
trong **cùng một biên** — hai việc không được tách; cộng một dòng kiểm toán
`action='status_change'`. `FR-NOTIFY-01` (RFP:686) liệt "profile sắp hết hiệu lực" là event thông
báo nhưng **không** liệt việc chuyển trạng thái, nên màn này không phát thông báo.

**Hai mã dùng chung cho cả hai endpoint ghi:** `400 invalid_json` khi body không phải JSON hợp lệ ·
`404 not_found` khi `id` không tồn tại **hoặc** vai gọi không có quyền ghi — 404 có chủ đích, không
403, không lộ sự tồn tại tài nguyên (§6).

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `participant` (D-PARTY) | `status` | đúng bốn trạng thái FIG-010 | 1 (CHECK) | có |
| `participant` | `status` | chỉ đổi theo đúng năm cạnh của FIG-010 | 2 (trigger kiểm cặp từ→đến) | **chỉ tầng 3** |
| `participant` | `category` | bất biến sau khi tạo | 2 (trigger `BEFORE UPDATE`) | **chỉ tầng 3** |
| `participant` | (`category`, `license_type`) | cặp khớp FIG-004; `valid_to >= valid_from` | 1 (CHECK) | **cặp chỉ tầng 3; CHECK khoảng chưa có** |
| `participant` | `version` | tăng mỗi lần ghi — mốc chống ghi đè | 1 + 2 | **chưa có cột** |
| `participant_status_history` | `from_status`, `to_status` | đúng bốn trạng thái FIG-010 | 1 (CHECK) | **không có CHECK** |
| `participant_status_history` | `procedure` | tên thủ tục `FIG-004` đã áp dụng — cùng một cạnh nhưng khác thủ tục thì phải phân biệt được trong lịch sử | 1 (NOT NULL + CHECK) | **chưa có cột** |
| `participant_status_history` | `reason`, `changed_by`, `changed_at` | không rỗng; chỉ ghi thêm | 1 (NOT NULL) + 1b | có |
| `audit_log` | `actor_id`, `action`, `before`, `after`, `reason` | chỉ ghi thêm | 1 + 3 | có |

Ba ràng buộc **P0** đang ở tầng 3: tính bất biến của `category`, tính đúng của cặp
(`category`, `license_type`), và tính hợp lệ của đường đi giữa các trạng thái. `participant.status`
chỉ CHECK **giá trị**, không CHECK **đường đi** — nên một lần ghi trực tiếp `Mất hiệu lực → Có hiệu
lực` là tầng dữ liệu nhận, dù `FIG-010` không có cạnh đó.

## 4. Vòng đời trạng thái

```
Có hiệu lực → (vi phạm) → Tạm ngừng → (gỡ) → Có hiệu lực
Có hiệu lực → (hết hạn) → Mất hiệu lực → (nộp đơn) → Xét lại → (chấp thuận) → Có hiệu lực
```

**Đúng năm cạnh.** `FIG-010` chỉ có **MỘT** cạnh `Tạm ngừng → Có hiệu lực`. Cột "Gỡ tạm ngừng" của
`FIG-004` nói chuyện khác: **thủ tục nào áp dụng và ai được phép** đi qua đúng cạnh đó. Đó là một
cổng kiểm theo `category` trên **một** cạnh, không phải ba cạnh song song.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Có hiệu lực | vi phạm | Tạm ngừng | `reason` không rỗng | vai quản trị người tham gia | 422 `reason_required` · 409 `status_conflict` |
| **Tạm ngừng** | **gỡ** | **Có hiệu lực** — **MỘT cạnh, bốn cổng kiểm theo `category`** | **卸売業者** → thủ tục **Chấp thuận**: có bản ghi chấp thuận của đơn vị vận hành chợ do người có quyền ký · **仲卸** → thủ tục **Có điều kiện**: căn cứ là giấy phép **và** `valid_to >= hôm nay (JST)` hoặc rỗng **và** điều kiện vi phạm đã ghi là đã gỡ (*nội dung "điều kiện" — §9 Q2*) · **売買参加者** → thủ tục **Xét lại**: hồ sơ phải qua bước xét lại và được kết luận, không gỡ bằng một quyết định đơn lẻ (*thủ tục hay trạng thái — §9 Q3*) · **買出人** → `FIG-004` **không có dòng nào** (§9 Q1) | Đơn vị vận hành chợ (卸売業者, 仲卸) · Hội đồng xét lại (売買参加者) · chưa xác định (買出人) | 422 `gate_not_satisfied` · 422 `procedure_undefined` · 403 `authority_mismatch` |
| Có hiệu lực | hết hạn | Mất hiệu lực | `reason` không rỗng | vai quản trị người tham gia | 422 `reason_required` |
| Mất hiệu lực | nộp đơn | Xét lại | `reason` không rỗng | vai quản trị người tham gia | 422 `reason_required` |
| Xét lại | chấp thuận | Có hiệu lực | kết luận xét lại đã có | Hội đồng xét lại | 422 `gate_not_satisfied` · 403 `authority_mismatch` |
| mọi cặp khác | — | — | không tồn tại trong FIG-010 | — | 422 `illegal_transition` |

Dòng in đậm là **một cạnh duy nhất**; khác nhau chỉ ở cột guard và cột thẩm quyền, tách theo
`category`. Bảng cạnh giữ **đúng năm cạnh**; ai dựng ba cạnh riêng cho ba phân loại là dựng thừa và
sẽ mâu thuẫn với `FIG-010`. Và **trạng thái đã lưu không đủ để kết luận hiệu lực**: không có tác vụ
định kỳ nào lật trạng thái ở `valid_to`, nên phải so ngày nghiệp vụ với khoảng
`[valid_from, valid_to]` mỗi lần dùng — việc của SC-11 theo `FR-PARTY-02` (RFP:630).

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `FIG-010` (RFP:609-614) | "Có hiệu lực → (vi phạm) → Tạm ngừng → (gỡ) → Có hiệu lực"; "Có hiệu lực → (hết hạn) → Mất hiệu lực → (nộp đơn) → Xét lại → (chấp thuận) → Có hiệu lực" | bảng năm cạnh ở tầng 3 + trigger kiểm cặp từ→đến ở tầng 2 | test: mỗi cặp ngoài bảng → 422 `illegal_transition`; ghi trực tiếp `Mất hiệu lực → Có hiệu lực` vào tầng dữ liệu → bị từ chối |
| RFP:309 (§02-08) | "**Không được gộp hai căn cứ tham gia này thành một quy tắc chung duy nhất.**" | cổng kiểm theo `category` trên cạnh `gỡ`; `category` bất biến ở tầng 2 | test: ba phân loại đi qua ba cổng khác nhau; request có key `category` → 422 |
| `FIG-004` (RFP:288-294) cột "Gỡ tạm ngừng" | 卸売業者 → Chấp thuận · 仲卸 → Có điều kiện · 売買参加者 → Xét lại | bảng cổng kiểm §4, dùng chung một nguồn với SC-05 và SC-07 | test: cổng chưa đạt → 422 `gate_not_satisfied`; sai thẩm quyền → 403 |
| RFP:310 (§02-08) | "Các thao tác độ nhạy cao như … lock/unlock tài khoản … đều cần dấu vết kiểm toán." | audit cho cả năm cạnh; `reason` bắt buộc | test: bỏ `reason` → 422; mọi cạnh đều để lại một dòng lịch sử |
| RFP:781 (§08-05) | "Dữ liệu đã sửa phải giữ được cả phiên bản trước và sau khi sửa." | `before`/`after` chỉ chứa cột đã đổi + `expectedVersion` chống ghi đè | test: hai lần sửa đồng thời → đúng một lần thành công, lần kia 409 |
| `FR-AUDIT-01` (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" kèm chủ thể, timestamp, before/after và lý do | ghi trong cùng biên với thao tác nghiệp vụ | test: audit lỗi → thao tác không được coi là đã xảy ra |

Không có con số nghiệp vụ riêng của màn này; trần `1..1000` ký tự cho `reason` là quyết định thiết kế.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang | `GET` chi tiết | `PATCH` sửa hồ sơ | `POST` chuyển trạng thái |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | cho phép, **trừ** cạnh gỡ tạm ngừng của 卸売業者 và 売買参加者 và cạnh chấp thuận — 403 `authority_mismatch` |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN | cho phép | cho phép | **404** `not_found` | **404** `not_found` |

- **⚠️ Phạm vi đọc rộng ở trên là ĐỀ XUẤT THIẾT KẾ, không phải yêu cầu khách.** Căn cứ duy nhất là
  RFP:311 (§02-08): *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng
  với các vai trò nêu trên."* Căng thẳng với RFP:886 (§09-06, APPI) đi vào §9 Q5.
- **Đọc và ghi là hai trục khác nhau.** Trục **đọc** không chặn theo vai — đề xuất, RFP:311. Trục
  **ghi** chặn theo vai (`TBL-ROLE-01`, RFP:245) **và** chặn thêm theo thẩm quyền của thủ tục
  (`FIG-004`) — hai tầng khác nhau, nên có cả 404 và 403 trên cùng một endpoint.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Còn
  `403 authority_mismatch` **cố ý** khác: vai đã vào được tài nguyên, chỉ không đúng bên quyết định
  của thủ tục. Hai chủ thể "Đơn vị vận hành chợ" và "Hội đồng xét lại" của `FIG-004` không khớp vai
  nào trong bảy vai (§9 Q4) — nên thẩm quyền thủ tục **không suy ra được từ vai**.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Sửa hồ sơ | `update` | `before`/`after` **chỉ chứa cột đã đổi**; `reason` bắt buộc; chủ thể; timestamp | FR-AUDIT-01, RFP:781 |
| Chuyển trạng thái | `status_change` | `before` = `{status, procedure: null}`; `after` = `{status, procedure}`; `reason` bắt buộc | FR-AUDIT-01, RFP:310 |
| Cổng kiểm chưa đạt | `transition_denied_gate` | `after` = payload bị từ chối; `reason` = thủ tục còn thiếu bước nào | RFP:309 |
| Sai thẩm quyền thủ tục | `transition_denied_authority` | chủ thể; vai; thủ tục yêu cầu | FIG-004, RFP:310 |
| Thiếu quyền ghi | `denied_write_attempt` | chủ thể; vai; endpoint | FR-AUDIT-01, NFR-SEC-03 (RFP:811) |

Bảng lịch sử chuyển trạng thái và sổ kiểm toán là **hai thứ khác nhau** — bảng lịch sử là dữ liệu
nghiệp vụ trên màn và mang cột `procedure`; sổ kiểm toán là bằng chứng cho `FR-AUDIT-02` (RFP:711).

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-PERF-01` (RFP:807) | tìm kiếm thông thường p95 ≤ 2 giây | ba khối đọc (hồ sơ, cạnh khả dụng, lịch sử) phải về trong một lần đọc có chỉ mục theo `participant_id`; không đọc lịch sử rồi lọc ở tầng ứng dụng |
| `NFR-SEC-03` (RFP:811) | "log các hành vi bất thường" | ba nhánh từ chối ghi (404 thiếu quyền, 403 sai thẩm quyền, 422 cổng chưa đạt) đều để lại dấu vết — xem §7 |
| `NFR-COMP-01` (RFP:817) | thao tác được trên tablet tại hiện trường | bảng lịch sử sáu cột phải cuộn ngang được; nút cạnh phải đủ lớn để bấm bằng ngón |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — 買出人 gỡ tạm ngừng bằng thủ tục nào? Tài liệu khách không có dòng.** `FIG-004`
  (RFP:288-294) có bốn dòng nhưng dòng thứ tư là "Đơn vị vận hành chợ" — không phải một trong bốn
  phân loại của `FR-PARTY-01` (RFP:629). Nên `FIG-004` phủ 3/4 phân loại và **買出人 không có thủ
  tục gỡ tạm ngừng nào trong RFP**. Cần trước khi code vì cổng kiểm trên cạnh `gỡ` phải trả một
  thủ tục xác định hoặc 422 `procedure_undefined`. Chọn sai — ví dụ suy thủ tục từ 卸売業者 vì cùng
  căn cứ "đăng ký" — là **gộp hai căn cứ tham gia**, đúng điều RFP:309 cấm.
- **Q2 — Thủ tục "Có điều kiện" của 仲卸 gồm những điều kiện gì?** RFP:293 ghi đúng hai chữ đó và
  **không định nghĩa**. Cần trước khi code vì đó là nội dung của guard. Chọn sai thì hoặc chặn oan
  một đơn vị trung gian có giấy phép còn hạn; hoặc mở đúng bằng đường của 卸売業者 — lại gộp hai căn cứ.
- **Q3 — "Xét lại" ở cột gỡ tạm ngừng là thủ tục tiền đề, hay là một trạng thái? Tài liệu khách
  dùng cùng một chữ cho hai thứ.** Phía **thủ tục**: RFP:294 dùng "Xét lại" trong cột "Gỡ tạm
  ngừng" của `FIG-004`, tức tên một *thủ tục* áp cho 売買参加者. Phía **trạng thái**: RFP:613
  (`FIG-010`) có "Xét lại" là một *trạng thái thật* trên đường `Mất hiệu lực → Xét lại → Có hiệu
  lực`. Mấu chốt: `FIG-010` (RFP:609-614) **không có** cạnh `Tạm ngừng → Xét lại`; nên nếu đó là một
  trạng thái thì phải **thêm cạnh vào FIG-010** — thay đổi state machine chính thức. Cần trước khi
  code vì hai cách cho hai hình: một cổng kiểm trên cạnh có sẵn, hay một cạnh thứ sáu. **Không tự quyết.**
- **Q4 — "Đơn vị vận hành chợ" và "Hội đồng xét lại" ứng với vai nào trong bảy vai nội bộ?**
  `FIG-004` dùng hai chủ thể này nhưng `TBL-ROLE-01` (RFP:245) chỉ có bảy vai và không có vai nào
  tên như vậy. Cần trước khi code vì cột "Ai được phép" của §4 và mã 403 `authority_mismatch` phụ
  thuộc câu này. Chọn sai thì hoặc phải thêm vai thứ tám; hoặc dồn cả ba thủ tục vào ROLE-SYS-ADMIN
  — mất luôn phần "ai quyết định" của `FIG-004`.
- **Q5 — Phạm vi đọc rộng có được chấp nhận với APPI không? Đây là quyết định thiết kế của chúng ta
  chống một yêu cầu khách, không phải hai yêu cầu khách chống nhau.** RFP:886 (§09-06) đòi **bằng
  chữ** *"kiểm soát truy cập theo vai trò (RBAC) và log truy cập áp dụng cho thông tin cá nhân"*, và
  RFP:883 xác định thông tin đăng ký cùng hiệu lực 許可/承認 **là** thông tin cá nhân. Màn này nặng
  hơn SC-05 — nó phơi cả lịch sử vi phạm và lý do tạm ngừng cho cả bảy vai — trong khi phía chúng ta
  chỉ có RFP:311 giao việc **đề xuất** cơ chế phân quyền. Quyết định khối lịch sử có thu hẹp theo vai.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Cổng kiểm theo phân loại trên cạnh `gỡ` | RFP:309 + FIG-004 → một cạnh, cổng kiểm khác nhau theo `category` | `resolveTarget(from, event)` **không nhận `category`**; route transition chỉ `select("status")` nên không có `category` hay `license_type` trong tay → một 売買参加者 gỡ được bằng đúng một lời gọi y như một 卸売業者. **Thiếu đúng cái cổng kiểm, không phải thiếu cạnh** — năm cạnh của `TRANSITIONS` là đúng | `src/lib/participants/state-machine.ts:35-41,65-71`; `src/app/api/participants/[id]/transition/route.ts:45-66` | khác không chủ đích — **P0** |
| Cột thủ tục trong lịch sử | `procedure` không rỗng — cùng một cạnh khác thủ tục phải phân biệt được | bảng lịch sử chỉ có `from_status` / `to_status` / `reason`; **không có cột nào ghi thủ tục** | `supabase/migrations/20260904090100_participant.sql:19-25` | khác không chủ đích |
| `category` bất biến + cặp (phân loại, căn cứ) ở tầng dữ liệu | tầng 1 hoặc 2 | cả hai chỉ ở tầng ứng dụng; `license_type` là `text not null` không CHECK; comment bảng tự khai *"enforced by the app layer, not a DB constraint"* — **gọi thẳng cơ sở dữ liệu là vượt được**, trong khi RFP:309 đặt phân biệt 許可/承認 thành nguyên tắc bắt buộc | `participant.sql:6,14-16`; `src/lib/participants/category-rules.ts:32-34`; `src/app/api/participants/[id]/route.ts:34-36` | khác không chủ đích — **P0** |
| Chuyển trạng thái nguyên tử | UPDATE trạng thái và INSERT lịch sử trong cùng một biên | ba lệnh ghi tuần tự không có transaction; insert lịch sử lỗi sau khi trạng thái đã đổi → trạng thái đã chuyển mà **không có dòng lịch sử nào**, trả 500 và không bù trừ | `src/app/api/participants/[id]/transition/route.ts:14-18,63-93` | khác không chủ đích — **P0** |
| Chống ghi đè | `expectedVersion` / `fromStatus` làm mốc | không có mốc nào ở cả hai endpoint; hai người bấm hai cạnh khác nhau thì dòng lịch sử thứ hai ghi `from_status` đã không còn đúng | `src/app/api/participants/[id]/transition/route.ts:45-49`; `src/app/api/participants/[id]/route.ts:59-96` | khác không chủ đích |
| CHECK khoảng hiệu lực | `valid_to >= valid_from` ở tầng 1 | **không tầng nào kiểm**; lưu được hồ sơ hết hiệu lực trước ngày bắt đầu và `checkParticipantEligibility()` luôn trả không hợp lệ mà không ai biết vì sao | `participant.sql:9-10`; `src/lib/participants/eligibility.ts:49-60` | khác không chủ đích |
| Không hiện dữ liệu cá nhân dư | người thực hiện hiện bằng tên | thiếu tên hiển thị thì cột "Người thực hiện" rơi về địa chỉ thư điện tử nội bộ | `src/app/(app)/participants/[id]/page.tsx:59-65` | khác không chủ đích |
| Tách `go` thành ba event | **không** — giữ đúng năm cạnh, chỉ thêm cổng kiểm | bản as-built §7 đề xuất *"tách `go` thành 3 event theo `category`, sửa cả `TRANSITIONS`"* — **đề xuất đó sai**: `FIG-010` (RFP:609-614) chỉ có một cạnh `Tạm ngừng → Có hiệu lực`, nên dựng ba cạnh là dựng thừa | `docs/lab4/spec/SC-06-chi-tiet-va-vong-doi-hieu-luc.md` §7 | khác không chủ đích (đề xuất as-built cần bỏ) |
| Nhãn nguồn của phạm vi đọc | đề xuất thiết kế, dẫn RFP:311 | RLS `read_all_active_users` mở cho mọi vai, ghi chú "có chủ đích theo **FR-601**" — **`FR-601` là mã nội bộ LAB-3, grep RFP ra 0 hit** | `supabase/migrations/20260904090900_rls_core.sql:31-38` | khác không chủ đích (nhãn sai nguồn) |

## 11. Dẫn chứng

- RFP:245 — `TBL-ROLE-01` · RFP:288-294 — `FIG-004` cột "Gỡ tạm ngừng"; RFP:293 ô 仲卸 "Có điều
  kiện"; RFP:294 ô 売買参加者 "Xét lại" · RFP:309-311 — §02-08 · RFP:602 — `D-PARTY`
- RFP:609-614 — `FIG-010` năm cạnh; RFP:613 trạng thái "Xét lại" · RFP:629 — `FR-PARTY-01`
- RFP:630 — `FR-PARTY-02` ("tại thời điểm **chốt** giao dịch") · RFP:660 — `FR-SETTLE-02`
- RFP:686 — `FR-NOTIFY-01` · RFP:710-711 — `FR-AUDIT-01/02` · RFP:781 — §08-05 giữ before/after · RFP:807, 811, 817 — `NFR-PERF-01`, `NFR-SEC-03`, `NFR-COMP-01` · RFP:883, 886 — §09-06 APPI
- Feature List `FE-005`, `FE-006`, `FE-041`
- `docs/lab4/20-architecture-design.md` § 4.1 và § 5.1 — một cạnh có cổng kiểm, KHÔNG phải ba cạnh
- `docs/lab4/spec/SC-06-chi-tiet-va-vong-doi-hieu-luc.md` — bản as-built dùng cho §10
