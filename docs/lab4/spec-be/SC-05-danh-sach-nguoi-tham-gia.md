# SC-05 — Danh sách người tham gia · Spec BE

| | |
|---|---|
| FE liên quan | FE-005 (Quản lý profile người tham gia) |
| FN | FN-02 (Quản lý người tham gia và hiệu lực 許可/承認) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-PARTY-01 · kế thừa FR-AUDIT-01, NFR-PERF-01, NFR-PERF-02, NFR-COMP-01 |
| Miền dữ liệu | D-PARTY (RFP:602) |
| State machine | FIG-010 (RFP:609) — màn này chỉ đặt trạng thái khởi tạo và đọc |
| Đã thi công | Có |

## 1. Phạm vi backend của màn này

Cấp một danh sách người tham gia lọc được theo **bốn phân loại** 卸売業者 / 仲卸 / 売買参加者 /
買出人 và theo **bốn trạng thái hiệu lực** của `FIG-010`, cộng đường tạo profile mới. `FR-PARTY-01`
(RFP:629) đòi lưu profile **được phân loại** thành đúng bốn loại đó, lý do là *"không được gộp sai
các role có bản chất khác nhau"*, và nghiệm thu là *"profile lưu được loại người tham gia và trạng
thái hiệu lực"* — nên hai cột đó là hai cột chịu lực, và bộ lọc **không được có giá trị gộp**.

**Không** làm: chuyển trạng thái vòng đời (SC-06); cảnh báo sắp hết hiệu lực (SC-07); kiểm hiệu lực
tại thời điểm chốt giao dịch — `FR-PARTY-02` (RFP:630) tự giới hạn ở *"thời điểm chốt giao dịch"*
nên cửa đó thuộc SC-11, không thuộc màn này. Xoá profile: xem §9 Q2.

## 2. Hợp đồng API

### `GET /api/participants`

| | |
|---|---|
| Thoả yêu cầu | FE-005 · FR-PARTY-01 (RFP:629) · NFR-PERF-01 (RFP:807) |
| Xác thực | bắt buộc |
| Vai trò được gọi | mọi vai đang hoạt động — §6 |
| Idempotent | có (đọc) |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `category` | query | string[] | không | mỗi giá trị thuộc đúng bốn phân loại; **không có giá trị gộp** | FR-PARTY-01 |
| `status` | query | string | không | thuộc bốn trạng thái của FIG-010 | FR-PARTY-01, FIG-010 |
| `name` | query | string | không | ≤ 100 ký tự; khớp một phần; không phân biệt hoa thường | FR-PARTY-01 |
| `page` | query | integer | không | `>= 1` | NFR-PERF-01 |
| `pageSize` | query | integer | không | `1..100` | NFR-PERF-01 |

**Server tự quyết — không nhận từ client:** `total`, thứ tự mặc định.

**Response 200:** `items[]` (`id`, `name`, `category`, `licenseType`, `status`, `validFrom`,
`validTo`, `basisMismatch`) · `page` · `pageSize` · `total`.

`basisMismatch` là cờ dẫn xuất: cặp (`category`, `licenseType`) không khớp `FIG-004`
(RFP:288-294). Màn phải phơi cờ này ra chứ không sửa và không xếp dòng vào một phân loại nào (§5).

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu |
|---|---|---|---|
| 422 | `invalid_category` | một giá trị `category` ngoài bốn phân loại | FR-PARTY-01 |
| 422 | `invalid_status` | `status` ngoài bốn trạng thái FIG-010 | FIG-010 (RFP:609) |
| 422 | `name_too_long` | `name` vượt 100 ký tự | FR-PARTY-01 |
| 422 | `invalid_page` | `page < 1` hoặc `pageSize` ngoài `1..100` | NFR-PERF-01 |

**Tác dụng phụ:** không. Không ghi audit — `FR-AUDIT-01` (RFP:710) chỉ liệt tạo · sửa · phê duyệt ·
lock · đổi quyền, không liệt thao tác đọc (§9 Q4).

### `POST /api/participants`

| | |
|---|---|
| Thoả yêu cầu | FE-005 · FR-PARTY-01 (RFP:629) · FR-AUDIT-01 (RFP:710) |
| Xác thực | bắt buộc |
| Vai trò được gọi | **vai quản trị người tham gia** — §6 |
| Idempotent | không — chống gửi trùng bằng ràng buộc duy nhất trên khoá nghiệp vụ của profile (§9 Q3) |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `category` | body | string | có | đúng một trong bốn phân loại; **bất biến sau khi tạo** | FR-PARTY-01, RFP:309 |
| `name` | body | string | có | `1..100` sau khi cắt khoảng trắng | FR-PARTY-01 |
| `validFrom` | body | date | có | `YYYY-MM-DD` | FR-PARTY-01 |
| `validTo` | body | date | không | `YYYY-MM-DD`; rỗng = vô hạn hạn; `>= validFrom` | FR-PARTY-01 |
| `reason` | body | string | có | không rỗng — vào bản ghi kiểm toán | FR-AUDIT-01 |

**Server tự quyết — không nhận từ client:** `licenseType` (suy từ `category` theo `FIG-004`),
`status` = `có hiệu lực`, `createdBy`, `createdAt`.

**Response 201:** `id` · `name` · `category` · `licenseType` · `status` · `validFrom` · `validTo`.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu |
|---|---|---|---|
| 400 | `invalid_json` | body không phải JSON hợp lệ | — |
| 422 | `invalid_category` | `category` ngoài bốn phân loại | FR-PARTY-01 |
| 422 | `invalid_name` | `name` rỗng sau khi cắt khoảng trắng | FR-PARTY-01 |
| 422 | `name_too_long` | `name` vượt 100 ký tự | FR-PARTY-01 |
| 422 | `invalid_valid_from` | `validFrom` không đúng `YYYY-MM-DD` | FR-PARTY-01 |
| 422 | `invalid_valid_to` | `validTo` có giá trị nhưng không đúng `YYYY-MM-DD` | FR-PARTY-01 |
| 422 | `valid_to_before_valid_from` | `validTo < validFrom` | FR-PARTY-01 |
| 422 | `reason_required` | `reason` rỗng | FR-AUDIT-01 |
| 409 | `participant_duplicate` | trùng khoá nghiệp vụ của profile (§9 Q3) | RFP:780 |
| 404 | `not_found` | vai gọi không có quyền ghi — **404 có chủ đích**, không 403 | §6 |

**Tác dụng phụ:** INSERT một dòng `D-PARTY` + một dòng kiểm toán `action='create'` mang `after` là
toàn bộ profile vừa ghi và `reason`. Không phát thông báo.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `participant` (D-PARTY) | `category` | đúng bốn giá trị FR-PARTY-01 | 1 (CHECK) | có |
| `participant` | `category` | **bất biến sau khi tạo** — RFP:309 | 2 (trigger `BEFORE UPDATE`) | **chỉ tầng 3** |
| `participant` | `license_type` | đúng ba căn cứ của FIG-004 | 1 (CHECK hoặc bảng tham chiếu) | **không có CHECK** |
| `participant` | (`category`, `license_type`) | cặp phải khớp FIG-004 | 1 (CHECK cặp) hoặc 2 | **chỉ tầng 3** |
| `participant` | `status` | đúng bốn trạng thái FIG-010 | 1 (CHECK) | có |
| `participant` | `name` | không rỗng; `1..100` | 1 (NOT NULL + CHECK độ dài) | NOT NULL có; **không có trần** |
| `participant` | `valid_from`, `valid_to` | `valid_from` không rỗng; `valid_to >= valid_from` | 1 (NOT NULL + CHECK) | NOT NULL có; **CHECK khoảng không có** |
| `participant` | khoá nghiệp vụ | duy nhất — RFP:780 đòi phát hiện trùng business key | 1 (UNIQUE) | **chưa có** (§9 Q3) |
| `audit_log` | `actor_id`, `action`, `before`, `after`, `reason` | chỉ ghi thêm; `reason` không rỗng cho thao tác tạo | 1 + 3 | có |

Hai ràng buộc **P0** đang ở tầng 3: tính bất biến của `category` và tính đúng của cặp
(`category`, `license_type`). Cả hai là **ranh giới pháp lý** theo RFP:309 nên phải nằm ở tầng 1
hoặc 2 — để tầng 3 thì mọi đường ghi không đi qua tầng ứng dụng đều bỏ qua chúng.

## 4. Vòng đời trạng thái

`FIG-010` (RFP:609) là state machine chính thức của điều kiện tham gia. Màn này **chỉ** đặt trạng
thái khởi tạo và đọc; năm cạnh thuộc SC-06.

```
[tạo profile — SC-05] → Có hiệu lực
Có hiệu lực → (vi phạm) → Tạm ngừng → (gỡ) → Có hiệu lực     ← MỘT cạnh, có cổng kiểm theo category
Có hiệu lực → (hết hạn) → Mất hiệu lực → (nộp đơn) → Xét lại → (chấp thuận) → Có hiệu lực
```

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | tạo profile | Có hiệu lực | `category` thuộc bốn phân loại; cặp (`category`, `license_type`) khớp FIG-004; `validTo >= validFrom`; khoá nghiệp vụ chưa trùng | vai quản trị người tham gia | 422 `invalid_category` · 422 `valid_to_before_valid_from` · 409 `participant_duplicate` |
| Tạm ngừng | gỡ | Có hiệu lực | **MỘT cạnh duy nhất**, cổng kiểm khác nhau theo `category` — thao tác thuộc SC-06 | xem SC-06 §4 | xem SC-06 §4 |
| bốn cạnh còn lại | — | — | thao tác thuộc SC-06 | xem SC-06 §4 | 422 `illegal_transition` |

`FIG-010` chỉ có **một** cạnh `Tạm ngừng → Có hiệu lực`. Cột "Gỡ tạm ngừng" của `FIG-004`
(RFP:288-294) cho **thủ tục và thẩm quyền khác nhau theo phân loại** trên đúng cạnh đó — đó là
guard, không phải thêm cạnh. Mọi cặp (từ, sự kiện) ngoài năm cạnh là illegal transition, kể cả
`Mất hiệu lực → Có hiệu lực` và `Tạm ngừng → Xét lại`.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `FR-PARTY-01` (RFP:629) | "phải lưu profile người tham gia được phân loại thành 卸売業者, 仲卸, 売買参加者, 買出人"; nghiệm thu "profile lưu được loại người tham gia và trạng thái hiệu lực" | CHECK bốn giá trị ở tầng 1 + validate request; hai cột bắt buộc trên mọi dòng trả về | test: gửi phân loại thứ năm → 422; bộ lọc không có lựa chọn gộp nào; mọi dòng đều có `category` và `status` |
| RFP:309 (§02-08) | "phải tôn trọng sự khác biệt giữa **許可 (giấy phép)** và **承認 (chấp thuận)**. **Không được gộp hai căn cứ tham gia này thành một quy tắc chung duy nhất.**" | `license_type` suy từ `category` theo FIG-004; cặp kiểm ở tầng 1 | test: ghi trực tiếp cặp sai vào tầng dữ liệu → bị từ chối |
| `FIG-004` (RFP:288-294) | 卸売業者 → Đăng ký chợ · 仲卸 → Giấy phép · 売買参加者 → Chấp thuận; **không có dòng cho 買出人** | bảng ánh xạ một nguồn duy nhất, dùng chung với SC-06 và SC-07 | test: mỗi phân loại cho ra đúng một căn cứ; 買出人 → §9 Q1 |
| RFP:780 (§08-05) | "Hệ thống phải phát hiện trùng lặp business key trước khi tiếp nhận thao tác import hoặc chốt" | UNIQUE ở tầng 1 | test: tạo hai profile trùng khoá nghiệp vụ → lần hai 409 |
| `FR-AUDIT-01` (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" kèm chủ thể, timestamp, before/after và lý do | ghi trong cùng biên với thao tác tạo | test: audit lỗi → profile không được coi là đã tồn tại |

Không có con số nghiệp vụ riêng của màn này; `pageSize` tối đa 100 là quyết định thiết kế bám `NFR-PERF-01`.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang | `GET` danh sách | `POST` tạo profile | Đọc một profile (SC-06) |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | cho phép |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN | cho phép | cho phép | **404** `not_found` | cho phép |

- **⚠️ Phạm vi đọc rộng ở trên là ĐỀ XUẤT THIẾT KẾ, không phải yêu cầu khách.** Căn cứ duy nhất
  của RFP về phân quyền là RFP:311 (§02-08): *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách
  quyền và truy vết tương ứng với các vai trò nêu trên."* — RFP **giao cho bên dự thầu đề xuất**,
  không hề bắt đọc mở. Lý do đề xuất: sáu vai vận hành đều cần biết ai được phép mua bán hôm nay
  trước khi làm việc của mình. Căng thẳng với RFP:886 (§09-06, APPI) đi vào §9 Q5.
- **Đọc và ghi là hai trục khác nhau.** Trục **đọc** không chặn theo vai — đề xuất, RFP:311. Trục
  **ghi** chặn theo vai: `FR-IAM-02` (RFP:628) đòi cấp/tạm ngừng/mở lại quyền có kiểm soát, và
  `TBL-ROLE-01` (RFP:245) giao ROLE-SYS-ADMIN việc "quản lý tài khoản, quyền".
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Cùng
  quy tắc cho endpoint ghi.
- Màn này **không** cần maker-checker. `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Tạo profile | `create` | `before` = null; `after` = toàn bộ profile vừa ghi gồm `category` và `license_type`; `reason` bắt buộc; chủ thể; timestamp | FR-AUDIT-01 (RFP:710) |
| Bị chặn vì thiếu quyền ghi | `denied_write_attempt` | chủ thể; vai; endpoint | FR-AUDIT-01, NFR-SEC-03 (RFP:811) |

Đọc danh sách **không** ghi audit — xem §9 Q4.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-PERF-01` (RFP:807) | tìm kiếm thông thường p95 ≤ 2 giây | lọc theo `category`, `status` và khớp một phần trên `name` phải đi qua chỉ mục; đếm tổng phải trả về cùng trang chứ không thành một lần đọc thứ hai |
| `NFR-PERF-02` (RFP:808) | `FIG-LOAD-01` (RFP:833): 180 tài khoản đăng ký, 60 người dùng đồng thời | quy mô người tham gia nhỏ nhưng danh sách bị mở ở 02:00-02:30 (RFP:301) cùng lúc nhiều người; phải phân trang chứ không cắt trần im lặng |
| `NFR-COMP-01` (RFP:817) | thao tác được trên tablet tại hiện trường | sáu cột bảng phải cuộn ngang được mà không mất cột `name`; bộ lọc trả về địa chỉ trang chia sẻ lại được |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — 買出人 có căn cứ tham gia nào?** `FIG-004` (RFP:288-294) có bốn dòng nhưng dòng thứ tư là
  "Đơn vị vận hành chợ" — không phải một trong bốn phân loại của `FR-PARTY-01` (RFP:629). Nên
  FIG-004 phủ 3/4 phân loại và **買出人 không có dòng nào**. Cần trước khi code vì cột "Căn cứ tham
  gia" của bảng và của form tạo suy trực tiếp từ `category`. Chọn sai thì gán cho một nhóm người mua
  một căn cứ pháp lý mà RFP không cho.
- **Q2 — Phép xoá của FE-005 là xoá thật hay chuyển sang mất hiệu lực?** Feature List ghi "CRUD
  profile", nhưng người tham gia đã có giao dịch thì xoá thật làm mất dấu vết mà `FR-AUDIT-01`
  (RFP:710) đòi giữ. Cần trước khi code vì nó quyết định có endpoint xoá hay không. Chọn sai thì
  hoặc mất truy vết giao dịch cũ; hoặc thiếu một phép mà Feature List đã cam kết.
- **Q3 — Khoá nghiệp vụ của một profile người tham gia là gì?** RFP:779 (§08-05) liệt "mã người
  tham gia" là trường bắt buộc và RFP:780 đòi phát hiện trùng business key, nhưng RFP **không định
  nghĩa** mã đó. Cần trước khi code vì ràng buộc duy nhất ở tầng 1 và mã lỗi 409 phụ thuộc câu này.
  Chọn sai thì hai profile cùng một doanh nghiệp thật cùng tồn tại và bảng đối chiếu ngày đếm hai lần.
- **Q4 — Thao tác đọc danh sách người tham gia có cần audit không?** `FR-AUDIT-01` (RFP:710) chỉ
  liệt tạo · sửa · phê duyệt · lock · đổi quyền. Cần trước khi code vì audit cho đọc ở quy mô
  `FIG-LOAD-01` sinh khối lượng bản ghi rất khác. Chọn sai thì hoặc thiếu bằng chứng cho kiểm toán
  nội bộ; hoặc phình sổ kiểm toán tới mức `FR-AUDIT-02` (RFP:711) không đạt ngưỡng `NFR-PERF-01`.
- **Q5 — Phạm vi đọc rộng có được chấp nhận với APPI không? Đây là quyết định thiết kế của chúng ta
  chống một yêu cầu khách, không phải hai yêu cầu khách chống nhau.** RFP:886 (§09-06) đòi **bằng
  chữ**: *"Cơ chế mã hóa, **kiểm soát truy cập theo vai trò (RBAC)** và log truy cập áp dụng cho
  thông tin cá nhân"*, và RFP:883 xác định thông tin đăng ký cùng hiệu lực 許可/承認 của người tham
  gia **là** thông tin cá nhân. Màn này hiển thị đúng nhóm dữ liệu đó cho cả bảy vai. Phía chúng ta:
  RFP:311 giao việc đề xuất cơ chế phân quyền cho bên dự thầu, và sáu vai vận hành đều cần biết ai
  được phép mua bán. Cần trước khi code vì nó quyết định có ẩn cột theo vai hay không. Chọn sai thì
  vi phạm một yêu cầu tuân thủ đã ghi thành chữ.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Cặp (phân loại, căn cứ) ở tầng dữ liệu | RFP:309 đặt phân biệt 許可/承認 thành nguyên tắc bắt buộc → tầng 1 | `participant.license_type` là `text not null` **không có CHECK**; cặp chỉ chặn bởi `isValidCategoryLicensePair()` ở tầng ứng dụng — gọi thẳng cơ sở dữ liệu là ghi được cặp sai | `supabase/migrations/20260904090100_participant.sql:6`; `src/lib/participants/category-rules.ts:32-34` | khác không chủ đích — **P0** |
| Tính bất biến của `category` | tầng 2 (trigger `BEFORE UPDATE`) | chỉ chặn ở route PATCH; comment của bảng tự khai *"enforced by the app layer, not a DB constraint"* | `src/app/api/participants/[id]/route.ts:34-36`; `participant.sql:14-16` | khác không chủ đích — **P0** |
| Phân trang và đếm tổng | phân trang + `total`; không cắt trần im lặng | `limit(50)` không phân trang, không đếm tổng; quá 50 dòng là mất dữ liệu khỏi màn mà không có dấu hiệu | `src/app/(app)/participants/page.tsx:36-40`; `src/app/api/participants/route.ts:11` | khác không chủ đích |
| Lọc theo tên | khớp một phần, không phân biệt hoa thường | **không có** bộ lọc theo tên ở cả trang và API | `src/app/api/participants/route.ts:18-30` | khác không chủ đích |
| Bộ lọc giá trị lạ | một hành vi duy nhất | trang **bỏ qua im lặng**; API trả 400 — hai đường lệch nhau, người sửa địa chỉ trang không biết bộ lọc bị bỏ | `src/app/(app)/participants/page.tsx:32-33`; `src/app/api/participants/route.ts:25-30` | khác không chủ đích |
| Cờ cặp căn cứ lệch | phơi ra dòng cần đối chiếu | không có cờ nào; bảng in nguyên văn giá trị lạ của `license_type` | `src/components/participants/participant-table.tsx:44` | khác không chủ đích |
| Khoá nghiệp vụ duy nhất | UNIQUE ở tầng 1 (RFP:780) | không có ràng buộc duy nhất nào trên `participant` | `participant.sql:2-12` | cần khách chốt (§9 Q3) |
| Trần độ dài `name`, CHECK khoảng hiệu lực | tầng 1 | không có ở tầng nào | `participant.sql:5,9-10` | khác không chủ đích |
| CRUD đủ bốn phép | FE-005 ghi "CRUD" | chỉ tạo · đọc · sửa; không có đường xoá | `docs/generated/permissions-matrix.md:880-891` | cần khách chốt (§9 Q2) |
| Phạm vi đọc | đề xuất thiết kế, dẫn RFP:311 | RLS `read_all_active_users` mở cho mọi vai đang hoạt động, được ghi chú là "có chủ đích theo **FR-601**" — **`FR-601` là mã nội bộ của LAB-3, grep RFP ra 0 hit; không phải yêu cầu khách** | `supabase/migrations/20260904090900_rls_core.sql:35-36`; `docs/lab4/spec/SC-05-danh-sach-nguoi-tham-gia.md` §5 | khác không chủ đích (nhãn sai nguồn) |

## 11. Dẫn chứng

- RFP:245 — `TBL-ROLE-01`, bảy vai nội bộ · RFP:288-294 — `FIG-004` · RFP:301 — §02-07 khung 02:00-02:30
- RFP:309, 311 — §02-08 nguyên tắc phân tách trách nhiệm và việc **đề xuất** cơ chế phân quyền
- RFP:602 — `D-PARTY` · RFP:609 — `FIG-010` · RFP:628-629 — `FR-IAM-02`, `FR-PARTY-01`
- RFP:630 — `FR-PARTY-02` ("tại thời điểm **chốt** giao dịch") · RFP:710 — `FR-AUDIT-01`
- RFP:711 — `FR-AUDIT-02` · RFP:779-780 — §08-05 quy tắc chất lượng dữ liệu
- RFP:807, 808, 811, 817, 833 — `NFR-PERF-01/02`, `NFR-SEC-03`, `NFR-COMP-01`, `FIG-LOAD-01`
- RFP:883, 886 — §09-06 APPI và yêu cầu RBAC cho thông tin cá nhân · Feature List `FE-005`, `FE-041`
- `docs/lab4/20-architecture-design.md` § 4.1 và § 5.1 — FIG-010 khớp, cổng kiểm theo phân loại còn thiếu
- `docs/lab4/spec/SC-05-danh-sach-nguoi-tham-gia.md` — bản as-built dùng cho §10
