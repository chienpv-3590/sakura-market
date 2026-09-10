# SC-07 — Cảnh báo hiệu lực sắp hết hạn · Spec BE

| | |
|---|---|
| FE liên quan | FE-008 (Cảnh báo profile sắp hết hiệu lực) |
| FN | FN-02 (Quản lý người tham gia và hiệu lực 許可/承認) |
| Ưu tiên | P1 |
| Yêu cầu khách | FR-PARTY-03 · kế thừa FR-AUDIT-01, FR-NOTIFY-01, NFR-PERF-01 |
| Miền dữ liệu | D-PARTY (RFP:602) |
| State machine | FIG-010 (RFP:609) — hành động trên dòng đi đúng các cạnh có sẵn |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

Cấp danh sách profile **sắp hết hiệu lực** trước ngày mất hiệu lực, tách theo **căn cứ tham gia**, cộng đường cấu hình
**ngưỡng cảnh báo**. `FR-PARTY-03` (RFP:631) đòi *"cảnh báo các profile sắp hết hiệu lực trước ngày mất hiệu lực để Chủ
đầu tư kịp xử lý"*, nghiệm thu *"các profile đúng nằm trong khoảng cảnh báo **cấu hình được** sẽ hiện trong danh sách
cảnh báo"*. Hai chữ **cấu hình được** quyết định hình dạng màn: ngưỡng là **dữ liệu** có người sửa và có lịch sử sửa,
không phải hằng số trong mã. Ba đường tách theo căn cứ tham gia vì RFP:309 (§02-08) cấm gộp 許可 với 承認 thành một quy tắc
chung — thủ tục gia hạn của hai căn cứ khác nhau nên ngưỡng và hành động cũng tách.

**Không** làm: gửi thông báo chủ động — `FR-NOTIFY-01` (RFP:686) liệt "profile sắp hết hiệu lực" là event thông báo
nhưng kênh và hạ tầng thuộc SC-28 / SC-29; chuyển trạng thái là gọi lại endpoint của SC-06 chứ không định nghĩa cạnh
mới; kiểm hiệu lực tại thời điểm chốt giao dịch (SC-11).

## 2. Hợp đồng API

### `GET /api/participants/expiring`

Thoả FE-008 · FR-PARTY-03 (RFP:631) · NFR-PERF-01 (RFP:807). Xác thực bắt buộc; vai được gọi: **vai quản trị người tham
gia** (§6); idempotent (đọc).

**Request** — `basis` (query, string, không bắt buộc, một trong ba căn cứ tham gia của `FIG-004`) · `category` (query,
string, không bắt buộc, phải thuộc `basis` đang chọn) · `status` (query, string, không bắt buộc, một trong bốn trạng
thái `FIG-010`) · `includeExpired` (query, boolean, không bắt buộc, **mặc định `true`**). **Server tự quyết:**
`daysLeft`, ngưỡng áp dụng cho từng đường, và `asOfBusinessDate` = ngày nghiệp vụ hiện hành theo múi giờ Nhật.

**Response 200:** `asOfBusinessDate` · `routes[]`, mỗi đường mang `basis`, `thresholdDays`, `categories[]`, `total` và
`items[]` (`participantId`, `name`, `category`, `licenseType`, `status`, `validTo`, `daysLeft`, `expired`,
`renewalSubmittedAt`, `allowedEvents[]`) · `unresolvedBasis[]` — dòng có cặp (`category`, `licenseType`) không khớp
`FIG-004`, xếp riêng chứ không nhét vào đường nào. `daysLeft` = `validTo` − `asOfBusinessDate` theo ngày ở múi giờ Nhật;
**âm** = đã quá ngày hết hiệu lực; `0` = hết hiệu lực **trong** ngày nghiệp vụ hôm nay. `validTo` rỗng là vô hạn hạn và
**không bao giờ** vào danh sách.

**Mã lỗi** — mỗi mã đúng một điều kiện: `422 invalid_basis` `basis` ngoài ba căn cứ của `FIG-004` · `422
invalid_category` `category` ngoài bốn phân loại của `FR-PARTY-01` · `422 category_basis_mismatch` `category` không
thuộc `basis` đang chọn · `422 invalid_status` `status` ngoài bốn trạng thái `FIG-010` · `404 not_found` vai gọi không
được vào màn — 404 có chủ đích, không 403.

**Tác dụng phụ:** không. Không ghi audit (SC-05 §9 Q4).

### `GET /api/participants/expiry-thresholds`

Thoả FE-008 · FR-PARTY-03 nghiệm thu "cấu hình được". Xác thực bắt buộc; vai được gọi: **vai quản trị người tham gia**;
idempotent (đọc).

**Response 200:** `items[]` (`basis`, `categories[]`, `thresholdDays`, `updatedByName`, `updatedAt`) — một dòng cho mỗi
căn cứ. **Mã lỗi:** `404 not_found` khi vai gọi không được vào màn.

### `PUT /api/participants/expiry-thresholds/{basis}`

Thoả FE-008 · FR-PARTY-03 · FR-AUDIT-01 (RFP:710). Xác thực bắt buộc; vai được gọi: **vai quản trị người tham gia**.
Idempotent theo `basis` — gửi lại cùng giá trị cho cùng căn cứ ra cùng kết quả, nhưng **vẫn ghi một dòng kiểm toán** vì
đó là một quyết định vận hành đã xảy ra.

**Request** — `basis` (path, string, bắt buộc, một trong ba căn cứ của `FIG-004`) · `thresholdDays` (body, integer, bắt
buộc, **số nguyên dương**) · `reason` (body, string, bắt buộc, không rỗng — FR-AUDIT-01). **Server tự quyết:**
`updatedBy`, `updatedAt`. **Response 200:** dòng cấu hình sau khi ghi · `previousThresholdDays`.

**Mã lỗi** — mỗi mã đúng một điều kiện: `400 invalid_json` body không phải JSON hợp lệ · `422 invalid_basis` `basis`
ngoài ba căn cứ · `422 threshold_not_integer` `thresholdDays` không phải số nguyên · `422 threshold_out_of_range`
`thresholdDays <= 0` hoặc vượt trần (§9 Q2) · `422 reason_required` `reason` rỗng · `404 not_found` vai gọi không có
quyền ghi cấu hình.

**Tác dụng phụ:** UPSERT một dòng cấu hình ngưỡng + một dòng kiểm toán `action='update_expiry_threshold'` mang
`before`/`after` là số ngày cũ và mới cộng `reason`. Sau khi ghi, **cả ba đường phải nạp lại** — đổi ngưỡng đổi luôn tập
dòng cảnh báo.

### `POST /api/participants/{id}/renewal-milestone`

Thoả FE-008 · **mở rộng ngoài `FR-PARTY-03`** — yêu cầu khách chỉ đòi *cảnh báo*, không đòi theo dõi hồ sơ, nên endpoint
này **chỉ dựng nếu §9 Q4 được chốt là có**. Xác thực bắt buộc; vai được gọi: **vai quản trị người tham gia**; không
idempotent — chống ghi trùng bằng ràng buộc duy nhất `(participant_id, milestone_type, business_date)`.

**Request** — `id` (path, uuid, bắt buộc) · `milestoneType` (body, string, bắt buộc, `renewal_submitted` cho đường 許可
hoặc `re_registered` cho đường đăng ký chợ) · `reason` (body, string, bắt buộc). **Server tự quyết:** `recordedBy`,
`recordedAt`, `businessDate`. **Response 201:** mốc vừa ghi.

**Mã lỗi** — mỗi mã đúng một điều kiện: `422 invalid_milestone_type` `milestoneType` ngoài tập cho phép · `422
milestone_not_applicable` loại mốc không áp cho căn cứ tham gia của profile · `422 reason_required` `reason` rỗng · `409
milestone_duplicate` đã có cùng mốc cho cùng profile trong cùng ngày nghiệp vụ · `404 not_found` `id` không tồn tại hoặc
vai gọi không có quyền ghi. **Tác dụng phụ:** INSERT một mốc gia hạn + một dòng kiểm toán
`action='record_renewal_milestone'`; **không** đổi trạng thái vòng đời — `FIG-010` không có cạnh nào cho việc nộp hồ sơ
gia hạn.

Bốn hành động chuyển trạng thái trên dòng (`het_han`, `nop_don`, `chap_thuan`, và `go` khi cổng kiểm đạt) **dùng lại**
`POST /api/participants/{id}/transition` của SC-06; mọi guard của SC-06 §4 áp nguyên.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `participant` (D-PARTY) | `valid_to` | cho phép rỗng = vô hạn hạn | 1 (nullable) | có |
| `participant` | `status`, `category`, `license_type`, `name` | như SC-05 §3 | 1 | một phần |
| **cấu hình ngưỡng cảnh báo** | `basis` | khoá chính; đúng ba căn cứ của `FIG-004` — **khoá theo căn cứ là chỗ RFP:309 được thi hành** | 1 (PK + CHECK) | **thực thể chưa tồn tại** |
| **cấu hình ngưỡng cảnh báo** | `threshold_days`; `updated_by`; `updated_at` | số ngày là số nguyên `> 0`; hai cột người sửa và thời điểm sửa không rỗng — bằng chứng cho FR-AUDIT-01 | 1 (CHECK + NOT NULL + FK) | **chưa tồn tại** |
| **mốc gia hạn** (tuỳ phạm vi — §9 Q4) | `participant_id`, `milestone_type`, `business_date` | duy nhất theo bộ ba | 1 (UNIQUE) | **chưa tồn tại** |
| `participant_status_history` | `to_status` | nguồn để biết hồ sơ đã nộp đơn xét lại chưa | 1 | có |
| `audit_log` | `actor_id`, `action`, `before`, `after`, `reason` | chỉ ghi thêm | 1 + 3 | có |

Ngưỡng cảnh báo **phải là dữ liệu, không phải hằng số**: nghiệm thu `FR-PARTY-03` dùng đúng chữ "cấu hình được", nghĩa
là đổi được lúc chạy. Một hằng số trong mã không đáp ứng, và một hằng số **toàn cục** còn gộp 許可 với 承認 vào một quy tắc
chung — đúng điều RFP:309 cấm. Khoá của thực thể cấu hình quyết định điều đó: khoá theo căn cứ thì tách được, một giá
trị dùng chung thì không.

## 4. Vòng đời trạng thái

```
Có hiệu lực → (vi phạm) → Tạm ngừng → (gỡ) → Có hiệu lực
Có hiệu lực → (hết hạn) → Mất hiệu lực → (nộp đơn) → Xét lại → (chấp thuận) → Có hiệu lực
```

Màn này **không thêm cạnh nào**: bốn nút hành động trên dòng ứng đúng bốn cạnh có sẵn của `FIG-010`, và hai mốc gia hạn
**không** phải cạnh trạng thái.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Có hiệu lực | hết hạn | Mất hiệu lực | `daysLeft < 0` — dòng đã quá ngày hết hiệu lực mà trạng thái chưa đổi; `reason` không rỗng | vai quản trị người tham gia | 422 `illegal_transition` · 422 `reason_required` |
| Mất hiệu lực | nộp đơn | Xét lại | `reason` không rỗng. **Nút của đường 承認 đặt trên dòng còn hiệu lực là đường vào nhanh** — `FIG-010` chỉ cho cạnh này đi từ Mất hiệu lực, nên tầng dịch vụ vẫn từ chối nếu trạng thái nguồn chưa đúng (§9 Q5) | vai quản trị người tham gia | 422 `illegal_transition` |
| Xét lại | chấp thuận | Có hiệu lực | kết luận xét lại đã có | Hội đồng xét lại (SC-06 §9 Q3) | 422 `gate_not_satisfied` · 403 `authority_mismatch` |
| Tạm ngừng | gỡ | Có hiệu lực | **MỘT cạnh, cổng kiểm theo `category`** — xem SC-06 §4. Màn này **không vẽ nút gỡ dùng chung**: một nút cho cả bốn phân loại chính là gộp hai căn cứ tham gia, điều RFP:309 cấm | theo thủ tục của `category` | 422 `gate_not_satisfied` · 422 `procedure_undefined` |
| — | ghi mốc đã nộp hồ sơ gia hạn / đã đăng ký lại | **không đổi trạng thái** | loại mốc áp cho căn cứ của profile | vai quản trị người tham gia | 422 `milestone_not_applicable` |

**Trạng thái đã lưu không tự đổi ở `valid_to`** — không có tác vụ định kỳ nào lật trạng thái, nên nhóm `daysLeft < 0` mà
trạng thái vẫn còn hiệu lực **tồn tại thật**, và đó chính là nhóm sẽ bị `FR-PARTY-02` (RFP:630) từ chối ngay tại quầy.
Màn phải hiện nhóm này nổi hơn, không được ẩn.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `FR-PARTY-03` (RFP:631) | "phải cảnh báo các profile sắp hết hiệu lực **trước ngày mất hiệu lực** để Chủ đầu tư kịp xử lý" | lọc `0 <= daysLeft <= thresholdDays`, cộng nhóm `daysLeft < 0` khi `includeExpired` | test: profile ở đúng biên ngưỡng vào danh sách; profile ngoài ngưỡng không vào |
| `FR-PARTY-03` nghiệm thu | "các profile đúng nằm trong khoảng cảnh báo **cấu hình được** sẽ hiện trong danh sách cảnh báo" | ngưỡng là dữ liệu ở tầng 1, sửa được lúc chạy qua `PUT` | test: đổi ngưỡng rồi nạp lại → tập dòng đổi theo, không cần phát hành lại |
| RFP:309 (§02-08) | "**Không được gộp hai căn cứ tham gia này thành một quy tắc chung duy nhất.**" | khoá cấu hình theo `basis`; ba đường trả về riêng; không có nút gỡ dùng chung | test: đặt hai ngưỡng khác nhau cho 許可 và 承認 → hai đường lọc theo hai ngưỡng |
| `FIG-004` (RFP:288-294) | cột "Gỡ tạm ngừng": 卸売業者 → Chấp thuận · 仲卸 → Có điều kiện · 売買参加者 → Xét lại | dùng chung bảng cổng kiểm của SC-06 §4 | test: nút gỡ mang đúng tên thủ tục của phân loại đang xem |
| RFP:301 (§02-07) | ngày nghiệp vụ theo khung giờ 02:00-10:00 JST | `daysLeft` và ranh giới ngày neo múi giờ Nhật | test: hai máy khác múi giờ ra cùng `daysLeft` |
| `FR-AUDIT-01` (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" kèm chủ thể, timestamp, before/after và lý do | đổi ngưỡng và ghi mốc đều ghi audit kèm `reason` | test: đổi ngưỡng thiếu `reason` → 422; thành công → một dòng audit có số cũ và mới |

**Con số nghiệp vụ:** spec này **không** chốt con số ngưỡng nào — `FR-PARTY-03` đòi cấu hình được mà không cho giá trị,
nên giá trị khởi tạo nằm ở §9 Q1; các số 30 / 45 / 14 trên wireframe là minh hoạ.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang | `GET` danh sách | `GET`/`PUT` ngưỡng | Chuyển trạng thái | Ghi mốc gia hạn |
|---|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | theo SC-06 §4 và §6 | cho phép |
| ROLE-TRADE | **cần khách chốt** — §9 Q3 | cần khách chốt | **404** | **404** | **404** |
| ROLE-INTAKE · ROLE-JUDGE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN | **404** | **404** | **404** | **404** | **404** |

- **⚠️ Đây là màn duy nhất của FN-02 mà thiết kế ĐỀ XUẤT chặn cả trục đọc.** Căn cứ là RFP:311 (§02-08): *"Đơn vị dự
  thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Lý do khác SC-05 và
  SC-06: đây là màn **điều hành thủ tục**, gom đúng nhóm profile đang có rủi ro pháp lý và mở sẵn nút chuyển trạng thái
  — mở trục đọc ở đây tăng bề mặt tiếp xúc dữ liệu cá nhân mà không thêm giá trị cho năm vai còn lại (§9 Q3).
- **Đọc và ghi là hai trục khác nhau.** Trục **đọc** chặn theo vai ở đây là **đề xuất** (RFP:311), không phải yêu
  cầu khách; trục **ghi** chặn theo vai có căn cứ ở `TBL-ROLE-01` (RFP:245) và `FR-IAM-02` (RFP:628), cộng thẩm quyền
  thủ tục của `FIG-004` cho cạnh gỡ tạm ngừng.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên.
- **Đổi ngưỡng là đổi quy tắc vận hành nhưng KHÔNG phải thay đổi quy tắc/biểu suất theo `GOV-RULE-01`** (RFP:601 — 4
  lần/năm, maker-checker, ngày hiệu lực, rollback): ngưỡng cảnh báo không phải biểu suất tính tiền nên thiết kế
  **không** áp maker-checker. Nếu chủ đầu tư muốn áp thì "người duyệt khác người tạo" là ràng buộc riêng, không suy ra
  được từ vai — §9 Q6.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Đổi ngưỡng cảnh báo | `update_expiry_threshold` | `before` = `{basis, thresholdDays}` cũ; `after` = mới; `reason` bắt buộc; chủ thể; timestamp | FR-AUDIT-01, FR-PARTY-03 |
| Ghi mốc gia hạn | `record_renewal_milestone` | `after` = `{participantId, milestoneType, businessDate}`; `reason` bắt buộc | FR-AUDIT-01 |
| Chuyển trạng thái từ dòng | `status_change` | như SC-06 §7 — cùng endpoint nên cùng dấu vết | FR-AUDIT-01, RFP:310 |
| Bị chặn vì thiếu quyền | `denied_write_attempt` | chủ thể; vai; endpoint | FR-AUDIT-01, NFR-SEC-03 (RFP:811) |

`FR-NOTIFY-03` (RFP:688) đòi *"việc thay đổi cấu hình không làm mất lịch sử gửi"* — áp cho SC-29, nhưng cùng tinh thần:
đổi ngưỡng chỉ đổi tập dòng từ lần nạp sau.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-PERF-01` (RFP:807) | tìm kiếm thông thường p95 ≤ 2 giây | ba đường phải lọc bằng một phép so trên `valid_to` có chỉ mục; không tải toàn bộ người tham gia rồi tính `daysLeft` ở tầng ứng dụng |
| `NFR-AVL-01` (RFP:804) | khung giờ dịch vụ **02:00-10:00 JST** | `daysLeft` tính theo ngày nghiệp vụ hiện hành ở múi giờ Nhật; màn mở lúc 02:00-02:30 (RFP:301) nên không được phụ thuộc một tác vụ nền |
| `NFR-COMP-01` (RFP:817) | thao tác được trên tablet tại hiện trường | ba bảng sáu cột phải cuộn ngang được; nút hành động trên dòng đủ lớn để bấm bằng ngón |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — Ngưỡng cảnh báo là bao nhiêu ngày cho từng căn cứ tham gia?** `FR-PARTY-03` (RFP:631) đòi khoảng cảnh báo
  cấu hình được nhưng **không cho giá trị nào**. Cần trước khi code vì đó là giá trị khởi tạo của thực thể cấu hình.
  Chọn sai: quá ngắn thì cảnh báo tới khi thủ tục không còn kịp; quá dài thì danh sách lúc nào cũng đầy và mất tác dụng.
- **Q2 — Ngưỡng có trần trên không, và mức chi tiết là gì: một giá trị dùng chung, một giá trị mỗi căn cứ tham gia,
  hay một giá trị mỗi phân loại?** RFP chỉ nói "cấu hình được" và cấm gộp 許可 với 承認 (RFP:309); mức chi tiết còn lại
  **không nói**. Cần trước khi code vì nó là khoá chính của thực thể cấu hình (§3) và không đổi được sau khi có dữ liệu.
  Chọn sai: một giá trị dùng chung là **gộp hai căn cứ** — điều RFP:309 cấm; chi tiết theo phân loại thì dựng thừa một
  mức không ai dùng.
- **Q3 — Vai nào được vào màn này, và việc chặn cả trục đọc ở đây có đúng ý chủ đầu tư không?** Actor của `FE-008`
  là "nhân viên vận hành chợ" — không khớp vai nào trong bảy vai của `TBL-ROLE-01` (RFP:245); gần nhất về quyền ghi là
  ROLE-SYS-ADMIN, còn ROLE-TRADE là vai **bị ảnh hưởng trực tiếp** khi giao dịch bị từ chối tại quầy. Riêng việc chặn
  trục đọc là **quyết định thiết kế của chúng ta** dựa trên RFP:311 giao việc **đề xuất** cơ chế phân quyền; nó khác
  SC-05 và SC-06 và **giảm** căng thẳng với RFP:886 (§09-06, APPI — đòi *bằng chữ* "kiểm soát truy cập theo vai trò
  (RBAC) … áp dụng cho thông tin cá nhân"; RFP:883 xác định hiệu lực 許可/承認 **là** thông tin cá nhân). Cần trước khi code
  vì §6 đang để một ô "cần khách chốt", và vì ba màn cùng miền dữ liệu mà hai chính sách đọc khác nhau thì phải có lý do
  được ghi lại. Chọn sai: gán ROLE-SYS-ADMIN thì vận hành hằng ngày phải nhờ quản trị hệ thống; mở cho nhiều vai thì
  thao tác độ nhạy cao theo RFP:310 bị phân tán.
- **Q4 — Có theo dõi tiến độ hồ sơ gia hạn hay không?** `FR-PARTY-03` **chỉ đòi cảnh báo**; thực thể mốc gia hạn và
  endpoint `renewal-milestone` là **mở rộng đề xuất**, không phải yêu cầu RFP. Cần trước khi code vì nó là một thực thể
  mới. Chọn sai: dựng thừa một thực thể không ai dùng; hoặc thiếu, và vận hành theo dõi hồ sơ bằng bảng tính bên ngoài —
  đúng vấn đề `TBL-CHANNEL-01` (RFP:284).
- **Q5 — Cho nộp đơn xét lại trước khi mất hiệu lực, hay chỉ sau?** `FIG-010` (RFP:609-614) chỉ có cạnh `Mất hiệu
  lực → (nộp đơn) → Xét lại`, tức phải mất hiệu lực trước; nhưng nghiệp vụ cảnh báo tồn tại chính để xử lý **trước** khi
  mất hiệu lực. Cần trước khi code vì nếu cho nộp sớm thì `FIG-010` cần thêm cạnh `Có hiệu lực → Xét lại` — thay đổi
  state machine chính thức. Chọn sai: nút trên màn hứa một việc mà tầng dịch vụ luôn từ chối.
- **Q6 — Đổi ngưỡng cảnh báo có cần maker-checker không?** `GOV-RULE-01` (RFP:601) áp maker-checker cho thay đổi quy
  tắc/biểu suất; ngưỡng cảnh báo không phải biểu suất tính tiền nên thiết kế **không** áp. Cần trước khi code vì "người
  duyệt khác người tạo" là ràng buộc riêng, không suy ra được từ vai. Chọn sai: hoặc một người tự nới ngưỡng để danh
  sách trông sạch; hoặc thêm một bước duyệt cho một tham số hiển thị.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Ngưỡng cảnh báo **cấu hình được** | nghiệm thu `FR-PARTY-03` (RFP:631) đòi ngưỡng là dữ liệu sửa được lúc chạy | ngưỡng là **hằng số cứng** `EXPIRY_WARNING_DAYS = 30` trong mã của một báo cáo; **không có** thực thể cấu hình, không có đường sửa, không có lịch sử sửa — **hằng số không đáp ứng chữ "cấu hình được"**. Comment của chính file đó tự khai *"30 days is this phase's own working assumption"* | `src/lib/reports/queries/rpt-03-participant-eligibility.ts:6-11` | khác không chủ đích — **P0 của FE-008** |
| Ngưỡng tách theo căn cứ tham gia | RFP:309 cấm gộp 許可 với 承認 → khoá cấu hình theo `basis` | **một** hằng số duy nhất dùng chung cho cả bốn phân loại — gộp 許可 với 承認 vào một quy tắc chung | `rpt-03-participant-eligibility.ts:11,34-47` | khác không chủ đích — **P0** |
| Màn cảnh báo riêng cho FE-008 | một màn có ba đường, bộ lọc và hành động xử lý | **chưa thi công**. Logic lọc chỉ tồn tại như một cột dẫn xuất của báo cáo RPT-02/RPT-03 (RFP:745-746), gộp mọi phân loại vào một danh sách phẳng và **không có hành động xử lý nào** | `rpt-03-participant-eligibility.ts:34-47,71-76` | khác không chủ đích |
| Chỉ xếp dòng vào đường khi cặp (phân loại, căn cứ) hợp lệ | dòng lệch xếp riêng vào `unresolvedBasis[]` | `participant.license_type` là `text` **không có CHECK** nên có thể tồn tại dòng lệch, và không có chỗ nào phân loại dòng đó | `supabase/migrations/20260904090100_participant.sql:6` | khác không chủ đích |
| Cổng kiểm theo phân loại trên cạnh `gỡ` | một cạnh, cổng kiểm khác nhau theo `category` (SC-06 §4) | máy trạng thái **không nhận `category`** nên không thể phân biệt thủ tục Chấp thuận / Có điều kiện / Xét lại; hệ quả cho màn này là không dựng được nút gỡ mang đúng tên thủ tục | `src/lib/participants/state-machine.ts:35-41,65-71`; `src/app/api/participants/[id]/transition/route.ts:45-49` | khác không chủ đích — **P0** |
| Chỗ ghi mốc gia hạn / đăng ký lại | một thực thể mốc gia hạn | **không có nơi lưu** mốc "đã nộp hồ sơ gia hạn"; việc nộp đơn xét lại chỉ suy được từ lịch sử trạng thái | `supabase/migrations/20260904090100_participant.sql:19-32` | cần khách chốt (§9 Q4) |
| Nhãn nguồn của phạm vi đọc | đề xuất thiết kế, dẫn RFP:311 | bản as-built §5 ghi *"RLS cho mọi vai trò đang hoạt động đọc được mọi bảng (**FR-601**, có chủ đích)"* — **`FR-601` là mã nội bộ LAB-3, grep RFP ra 0 hit; không phải yêu cầu khách** | `supabase/migrations/20260904090900_rls_core.sql:35-38`; `docs/lab4/spec/SC-07-canh-bao-hieu-luc-sap-het-han.md` §5 | khác không chủ đích (nhãn sai nguồn) |

## 11. Dẫn chứng

- RFP:245 — `TBL-ROLE-01` · RFP:284 — `TBL-CHANNEL-01` bảng tính ngoài hệ thống · RFP:288-294 — `FIG-004` cột "Gỡ
  tạm ngừng" · RFP:301 — §02-07 khung giờ · RFP:309-311 — §02-08
- RFP:601 — `GOV-RULE-01` · RFP:602 — `D-PARTY` · RFP:609-614 — `FIG-010` năm cạnh · RFP:628-631 — `FR-IAM-02`,
  `FR-PARTY-01/02/03` · RFP:686, 688 — `FR-NOTIFY-01`, `FR-NOTIFY-03`
- RFP:710 — `FR-AUDIT-01` · RFP:745-746 — `TBL-REPORT-01` RPT-02 và RPT-03 · RFP:804, 807, 811, 817 — `NFR-AVL-01`,
  `NFR-PERF-01`, `NFR-SEC-03`, `NFR-COMP-01`
- RFP:883, 886 — §09-06 APPI · Feature List `FE-008`, `FE-041`
- `docs/lab4/10-database-diagram.md` § 5.2 (đề xuất thực thể cấu hình ngưỡng, lý do cần ADR) ·
  `docs/lab4/20-architecture-design.md` § 5.1 (một cạnh có cổng kiểm, KHÔNG phải ba cạnh)
- `docs/lab4/spec/SC-07-canh-bao-hieu-luc-sap-het-han.md` — bản as-built dùng cho §10
