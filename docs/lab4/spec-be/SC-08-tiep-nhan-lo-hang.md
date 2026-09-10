# SC-08 — Tiếp nhận lô hàng · Spec BE

| | |
|---|---|
| FE liên quan | FE-009 (Tiếp nhận lô hàng), FE-013 (Tra cứu lô hàng và trạng thái) |
| FN | FN-03 (Quản lý lô hàng) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-LOT-01, NFR-USE-01 · kế thừa BR-LOT-02, TBL-ATTACH-01, FR-AUDIT-01, NFR-PERF-02 |
| Miền dữ liệu | D-LOT (RFP:603) |
| State machine | FIG-011 (RFP:616) — **năm trạng thái**; màn này đặt trạng thái 1/5 |
| Đã thi công | Có |

## 1. Phạm vi backend của màn này

Ghi một lô hàng vào hệ thống lúc hàng về quầy. `FR-LOT-01` (RFP:632) đòi *"tạo mã lô hàng, thông tin kiện hàng, mặt
hàng, số lượng ban đầu và chứng từ tiếp nhận"*, lý do là *"mã lô hàng là nền tảng của truy vết"*, nghiệm thu là *"mỗi
lô hàng có mã duy nhất và lưu được các chứng từ bắt buộc"* — nên **tính duy nhất của mã** và **việc lưu được chứng
từ** là hai điều kiện nghiệm thu, không phải chi tiết. `NFR-USE-01` (RFP:816) đòi luồng nhập lô hàng **dùng được bằng
bàn phím** và có thông báo lỗi dễ hiểu; theo `FIG-002` (RFP:220) và §02-07 (RFP:301) thao tác này diễn ra trong khung
02:00-02:30 nên đó là ràng buộc chức năng, không phải tiện ích.

Cấp thêm danh sách lô hàng cho `FE-013` (*"Danh sách và chi tiết lô hàng theo state machine FIG-011"*), tức bộ lọc
phải phủ đủ **năm** trạng thái của `FIG-011`.

**Không** làm: ghi kết quả đánh giá (SC-09); sửa thuộc tính lô và sổ số lượng (SC-10); chốt giao dịch (SC-11). **Tiếp
nhận trên ngày nghiệp vụ đã lock vẫn hợp lệ** — lô nhận trong ngày đã chốt vẫn bán ngày sau, nên `BR-CLOSE-01`
(RFP:597) không áp cho thao tác tiếp nhận; cái bị chặn sau lock là **sửa** thuộc tính lô ở SC-10.

## 2. Hợp đồng API

### `POST /api/lots`

Thoả FE-009 · FR-LOT-01 (RFP:632) · NFR-USE-01 (RFP:816) · FR-AUDIT-01 (RFP:710). Nhận `multipart/form-data`. Xác
thực bắt buộc; vai được gọi: **vai tiếp nhận** (§6). **Không** idempotent — chống gửi trùng bằng ràng buộc duy nhất
trên mã lô ở tầng dữ liệu, không bằng một lần đọc trước khi ghi.

**Request** — `item` (form, string, bắt buộc, `1..100` sau khi cắt khoảng trắng) · `packageCount` (form, integer, bắt
buộc, `>= 1`) · `initialQty` (form, decimal, bắt buộc, `> 0`, tối đa hai chữ số thập phân, trong trần độ chính xác của
trường số lượng) · `intakeDocs[]` (form, file, **bắt buộc**, mỗi tệp thuộc allow-list loại tệp và trong trần dung
lượng; tổng số tệp trong trần cho một lô).

**Server tự quyết — không nhận từ client:** `lotCode`, `businessDate` (ngày nghiệp vụ hiện hành theo múi giờ Nhật —
§9 Q2), `availableQty` = `initialQty`, `status` = trạng thái 1/5 của `FIG-011`, `createdBy`, `createdAt`.

**Response 201:** `id` · `lotCode` · `item` · `packageCount` · `initialQty` · `availableQty` · `status` ·
`businessDate` · `attachments[]` (`id`, `fileName`, `fileSize`).

**Mã lỗi** — mỗi mã đúng một điều kiện: `400 invalid_multipart` body không parse được thành `multipart/form-data` ·
`422 item_required` `item` rỗng sau khi cắt khoảng trắng · `422 item_too_long` `item` vượt 100 ký tự ·
`422 package_count_invalid` `packageCount` không phải số nguyên `>= 1` · `422 initial_qty_invalid` `initialQty` không
phải số hữu hạn `> 0` với tối đa hai chữ số thập phân · `422 initial_qty_out_of_range` `initialQty` vượt trần độ chính
xác của trường số lượng · `422 intake_doc_required` không có tệp nào · `422 intake_doc_type_invalid` một tệp có loại
ngoài allow-list · `422 intake_doc_too_large` một tệp vượt trần dung lượng · `422 intake_doc_too_many` số tệp vượt
trần cho một lô · `409 lot_code_conflict` mã lô sinh ra bị trùng sau khi hết số lần thử · `404 not_found` vai gọi
không phải vai tiếp nhận — **404 có chủ đích**, không 403.

Mười mã 422 phải **riêng biệt và mang tên trường** — `NFR-USE-01` đòi thông báo lỗi dễ hiểu, và một mã gộp làm người
nhập lúc 02:00 không biết sửa trường nào. Riêng `initial_qty_out_of_range` là mã **bắt buộc phải có**: nếu tầng dịch
vụ chỉ kiểm `> 0` thì một giá trị nhỏ hơn ngưỡng biểu diễn được sẽ vỡ ràng buộc ở tầng dữ liệu và biến thành lỗi hệ
thống thay vì lỗi nhập.

**Tác dụng phụ:** kiểm **mọi tệp trước** khi ghi lô — một tệp xấu không được để lại lô mồ côi; rồi INSERT một dòng
`D-LOT`, tải các tệp vào vùng lưu trữ riêng tư, INSERT một dòng đính kèm cho mỗi tệp. Ghi lô và ghi đính kèm phải
**cùng thành công hoặc cùng không**: chứng từ là trường bắt buộc theo nghiệm thu `FR-LOT-01`, nên một lô không có
chứng từ là một bản ghi không hợp lệ về nghiệp vụ (§9 Q3). Audit: `action='create'` cho lô, và một dòng
`action='attach_document'` cho mỗi tệp, cùng gắn về định danh lô. Không phát thông báo.

### `GET /api/lots`

Thoả FE-013 · FR-LOT-01 · NFR-PERF-02 (RFP:808). Xác thực bắt buộc; vai được gọi: **mọi vai đang hoạt động** (§6);
idempotent (đọc).

**Request** — `status` (query, string[], không bắt buộc, mỗi giá trị thuộc **năm** trạng thái của `FIG-011`) ·
`businessDate` (query, date, không bắt buộc, `YYYY-MM-DD`) · `lotCode` (query, string, không bắt buộc, khớp một
phần) · `page` / `pageSize` (query, integer, không bắt buộc, `pageSize` trong `1..100`).

**Response 200:** `items[]` (`id`, `lotCode`, `item`, `packageCount`, `initialQty`, `availableQty`, `status`,
`businessDate`, `hasAppraisal`) · `page` · `pageSize` · `total`.

**Mã lỗi** — mỗi mã đúng một điều kiện: `422 invalid_status` một giá trị `status` ngoài năm trạng thái `FIG-011` ·
`422 invalid_business_date` `businessDate` không đúng `YYYY-MM-DD` · `422 invalid_page` `page < 1` hoặc `pageSize`
ngoài `1..100`.

**Tác dụng phụ:** không; không ghi audit (SC-05 §9 Q4).

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `lot` (D-LOT) | `lot_code` | **duy nhất** — nghiệm thu FR-LOT-01 "mỗi lô hàng có mã duy nhất" | 1 (UNIQUE) | có |
| `lot` | `lot_code` | sinh không đụng nhau khi nhiều người tiếp nhận cùng lúc | 1 (sequence hoặc identity) | **đếm-rồi-cộng-một ở tầng 3** |
| `lot` | `item` | không rỗng; `1..100` | 1 (NOT NULL + CHECK độ dài) | NOT NULL có; **không có trần** |
| `lot` | `package_count` | số nguyên `>= 1` | 1 (CHECK) | **CHECK là `> 0`, lệch một giá trị với tầng nhập** |
| `lot` | `initial_qty` | `> 0`; hai chữ số thập phân; trần độ chính xác | 1 (CHECK + kiểu số có tỷ lệ) | CHECK `> 0` có; **ngưỡng nhỏ nhất và trần chỉ ở tầng 3** |
| `lot` | `available_qty` | `>= 0` (BR-LOT-02); khởi tạo bằng `initial_qty` | 1 (CHECK) | có |
| `lot` | `status` | đúng **năm** giá trị của `FIG-011` | 1 (CHECK) | **CHECK chỉ có bốn giá trị** |
| `lot` | `business_date` | không rỗng; do server đặt | 1 (NOT NULL) | có |
| đính kèm chứng từ | `lot_id`, `file_name`, `mime_type`, `file_size` | không rỗng; `file_size > 0`; chỉ ghi thêm | 1 (NOT NULL + CHECK) + 1b | có |
| đính kèm chứng từ | `mime_type` | thuộc allow-list loại tệp | 1 (CHECK) | **chỉ tầng 3** |
| đính kèm chứng từ | `file_size` | trong trần dung lượng | 1 (CHECK) | **chỉ tầng 3** |
| đính kèm chứng từ | `doc_type` | loại chứng từ theo nghiệp vụ — để kiểm đủ bộ chứng từ bắt buộc | 1 (NOT NULL + CHECK) | **chưa có cột** (§9 Q3) |
| `audit_log` | `actor_id`, `action`, `before`, `after` | chỉ ghi thêm | 1 + 3 | có |

Hai chỗ **P0** đang ở tầng 3: allow-list loại tệp cùng trần dung lượng, và ngưỡng số lượng. Ngưỡng số lượng là chỗ
nguy hiểm hơn — ba tầng đang lệch nhau nên khe hở rơi ra **lỗi hệ thống** chứ không phải lỗi nhập, trái `NFR-USE-01`.
Nguyên tắc: **một ngưỡng khai một chỗ, áp dụng ở cả ba tầng**.

## 4. Vòng đời trạng thái

```
Tiếp nhận → (đăng ký 下見) → Đã 下見 → (chuẩn bị bán) → Công bố → (chốt mua bán) → Đã chốt → (giao hàng) → Hoàn tất giao hàng
```

**NĂM trạng thái, bốn cạnh, đi một chiều.** `FE-013` khai *"Danh sách và chi tiết lô hàng theo state machine
FIG-011"*, tức đủ năm — không phải bốn. Cái phải phân biệt được là **lô đã tiếp nhận nhưng chưa ai xem hàng** với
**lô đã xem hàng xong, chờ công bố**: ở khung 02:00-03:00 (RFP:220) đó đúng là thông tin điều phối nhân sự cần.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | lô hàng đến quầy | **Tiếp nhận** (1/5) | bốn trường nhập hợp lệ; có ít nhất một chứng từ hợp lệ; mã lô chưa trùng | vai tiếp nhận | 422 theo từng trường · 409 `lot_code_conflict` |
| Tiếp nhận | đăng ký 下見 | Đã 下見 (2/5) | thao tác thuộc SC-09 | vai người đánh giá | xem SC-09 §4 |
| Đã 下見 | chuẩn bị bán | Công bố (3/5) | thao tác thuộc SC-10 — **§9 Q4** | vận hành chợ | xem SC-10 §4 |
| Công bố | chốt mua bán | Đã chốt (4/5) | thao tác thuộc SC-11 · SC-12 · SC-13 | vận hành giao dịch | xem SC-11 §4 |
| Đã chốt | giao hàng | Hoàn tất giao hàng (5/5) | thao tác thuộc SC-16 | vận hành giao hàng | xem SC-16 §4 |
| mọi cặp khác | — | — | không tồn tại trong FIG-011; đi một chiều nên không có cạnh quay lại | — | 422 `illegal_transition` |

Màn này chỉ đặt trạng thái **1/5** và không được nhảy bước. Trạng thái mới sinh ra **không** phụ thuộc ngày nghiệp vụ
đã lock hay chưa — xem §1.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `FR-LOT-01` (RFP:632) | "phải tạo mã lô hàng, thông tin kiện hàng, mặt hàng, số lượng ban đầu và chứng từ tiếp nhận"; nghiệm thu "mỗi lô hàng có mã duy nhất và lưu được các chứng từ bắt buộc" | UNIQUE trên mã lô ở tầng 1; bốn trường NOT NULL; chứng từ là trường bắt buộc | test: hai người tiếp nhận cùng lúc → đúng một mã lô cho mỗi lô; gửi không có tệp → 422 |
| `NFR-USE-01` (RFP:816) | "Các luồng nhập lô hàng, chốt giao dịch và ghi nhận giao hàng phải dùng được bằng bàn phím, và có thông báo lỗi dễ hiểu" | mười mã 422 riêng biệt mang tên trường; giữ nguyên dữ liệu đã nhập khi lỗi | nghiệm thu bằng kịch bản usability test theo RFP:816; test: mỗi trường sai cho một mã riêng |
| `BR-LOT-02` (RFP:596) | "Số lượng khả dụng của lô hàng không được âm, và phải truy vết được tới lịch sử điều chỉnh" | khởi tạo `available_qty = initial_qty` ở tầng dịch vụ; CHECK `>= 0` ở tầng 1; dòng đầu của sổ số lượng (SC-10 §3) | test: lô mới có khả dụng bằng ban đầu và một dòng sổ đầu tiên |
| `BR-CLOSE-01` (RFP:597) | "Không được chỉnh sửa trực tiếp ngày nghiệp vụ đã bị lock" | **không** áp cho thao tác tiếp nhận — lô nhận trong ngày đã lock vẫn bán ngày sau; cái bị chặn là sửa thuộc tính lô (SC-10) | test: lock ngày rồi tiếp nhận lô mới → 201, không phải 423 |
| `TBL-ATTACH-01` (RFP:773) | "Phiếu tiếp nhận, phiếu giao dịch, bảng đối chiếu — lưu online **7 năm**" | chứng từ tiếp nhận thuộc nhóm 7 năm, không thuộc nhóm 3 năm của hình ảnh phụ trợ | test: policy lưu trữ gắn theo loại chứng từ |
| `DR-IMAGE-01` (RFP:794) | "Chủ đầu tư **không yêu cầu** chức năng AI tự động phán định chất lượng từ các hình ảnh này" | không có xử lý nội dung ảnh nào ngoài việc kiểm loại tệp | soát bề mặt API: không có đường suy luận nào từ ảnh |
| `FR-AUDIT-01` (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" kèm chủ thể, timestamp, before/after và lý do | ghi trong cùng biên với thao tác tạo | test: audit lỗi → lô không được coi là đã tồn tại |

**Con số nghiệp vụ:** spec này **không** chốt trần dung lượng tệp, trần số tệp, allow-list loại tệp, hay công thức mã
lô — RFP không cho giá trị nào. Tất cả nằm ở §9 Q1 và Q3.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang tiếp nhận | `POST` tạo lô | `GET` danh sách lô |
|---|---|---|---|
| ROLE-INTAKE | cho phép | cho phép | cho phép |
| ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | **404** | **404** `not_found` | cho phép |

- **⚠️ Phạm vi đọc rộng ở trên là ĐỀ XUẤT THIẾT KẾ, không phải yêu cầu khách.** Căn cứ duy nhất là RFP:311 (§02-08):
  *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Lý do đề
  xuất: `FIG-007` (RFP:529-535) là một luồng năng lực xuyên suốt, và mã lô là khoá truy vết dùng chung — mọi vai phía
  sau đều cần đọc được lô. Lô hàng **không** phải thông tin cá nhân theo RFP:883, nên đề xuất này không tạo căng thẳng
  với RFP:886 (APPI) như ở SC-05 và SC-06.
- **Đọc và ghi là hai trục khác nhau.** Trục **đọc** không chặn theo vai — đề xuất. Trục **ghi** chặn theo vai:
  `TBL-ROLE-01` (RFP:249) giao ROLE-INTAKE việc *"Tiếp nhận lô hàng, tạo số tạm, ghi nhận thông tin ban đầu"*.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Chặn phải ở **cả** tầng
  vào trang và tầng dịch vụ; ẩn form không phải chặn.
- Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Tạo lô hàng | `create` | `before` = null; `after` = toàn bộ dòng lô vừa ghi gồm `lot_code`, `business_date`, `available_qty`, `status`; chủ thể; timestamp | FR-AUDIT-01, FR-LOT-01 |
| Đính kèm chứng từ | `attach_document` | `after` = `{fileName, fileSize, mimeType, docType}`; một dòng cho mỗi tệp, **gắn về định danh lô** để lịch sử của lô ở SC-10 thấy được | FR-AUDIT-01, TBL-ATTACH-01 |
| Bị chặn vì thiếu quyền ghi | `denied_write_attempt` | chủ thể; vai; endpoint | FR-AUDIT-01, NFR-SEC-03 (RFP:811) |

Thao tác tiếp nhận **không có** `reason` — `FR-LOT-01` không đòi lý do cho việc tạo mới; lý do chỉ bắt buộc cho thao
tác **sửa** theo `FR-LOT-04` (SC-10 §5).

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-USE-01` (RFP:816) | dùng được bằng bàn phím; thông báo lỗi dễ hiểu | mã lỗi riêng cho từng trường (§2); trả `lotCode` trong response 201 để màn hiện ngay mà không cần một lần đọc thứ hai |
| `NFR-PERF-02` (RFP:808) | `FIG-LOAD-01` (RFP:836): cao điểm **600 lô/ngày**, 60 người dùng đồng thời | 600 lô dồn vào khung 02:00-02:30 nghĩa là nhiều lần tiếp nhận trong cùng giây — cách sinh mã lô phải chịu được đua mà không cần thử lại (§3) |
| `NFR-AVL-01` (RFP:804) | 99,5%/tháng trong khung **02:00-10:00 JST** | tiếp nhận là việc đầu ngày; endpoint không được phụ thuộc một tác vụ nền nào |
| `DR-RET-01` (RFP:813) | dữ liệu nghiệp vụ online **7 năm**; hình ảnh/chứng từ phụ trợ **3 năm** rồi cold storage | chứng từ tiếp nhận thuộc nhóm 7 năm theo `TBL-ATTACH-01` (RFP:773), không phải nhóm 3 năm — nên `doc_type` cần thiết để gắn đúng policy |
| `NFR-COMP-01` (RFP:817) | thao tác được trên tablet tại hiện trường | chọn tệp phải hoạt động với máy ảnh của tablet; và phím xác nhận **không** được cướp phím mở hộp chọn tệp |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — Công thức mã lô hàng của chợ là gì?** `FR-LOT-01` (RFP:632) chỉ đòi "mã lô hàng" duy nhất và nêu lý do "mã
  lô hàng là nền tảng của truy vết"; `FIG-026` (RFP:1385) liệt "Số lô hàng" là một trường của Phiếu tiếp nhận nhưng
  **không cho quy ước nào**. Cần trước khi code vì mã đã in lên kiện hàng thì không đổi được, và nó xuất hiện trong
  mọi báo cáo. Chọn sai: mã không nhúng ngày thì báo cáo lịch sử lô hàng (RPT-02, RFP:745) phải nối bảng thêm; mã
  nhúng ngày thì ràng buộc luôn câu hỏi Q2.
- **Q2 — Ngày nghiệp vụ bắt đầu lúc 00:00 hay lúc 02:00 theo múi giờ Nhật?** §02-07 (RFP:301) đặt khung tiếp nhận ở
  **02:00-02:30** và `FIG-002` (RFP:224) đặt "Tiếp nhận hàng vào cảng" ở **02:00**; nhưng `業務日` (RFP:1467) chỉ được
  định nghĩa là "Ngày nghiệp vụ" mà không nói ranh giới. Cần trước khi code vì server tự đặt `business_date` và không
  cho backdate. Chọn sai: xe về 23:50 mà nhập 00:10 thì lô rơi sang kỳ đối chiếu sau, và bảng đối chiếu ngày
  (`FR-SETTLE-01`, RFP:659) lệch mà không ai thấy.
- **Q3 — Chứng từ tiếp nhận: loại nào là bắt buộc, trần dung lượng và số tệp là bao nhiêu?** Nghiệm thu `FR-LOT-01`
  dùng chữ "các chứng từ **bắt buộc**" nhưng **không liệt loại nào**; `FIG-026` (RFP:1385) cho bốn trường của Phiếu
  tiếp nhận nhưng không nói phải đính kèm ảnh phiếu. Cần trước khi code vì nó quyết định cột `doc_type` (§3), việc
  chặn khi thiếu chứng từ, và policy lưu trữ 7 năm hay 3 năm theo `TBL-ATTACH-01` (RFP:773). Chọn sai: bắt buộc quá
  chặt thì quầy 02:00 bị nghẽn; không bắt buộc thì nghiệm thu `FR-LOT-01` không đạt.
- **Q4 — 下見 và 目利き là hai việc khác nhau hay một việc gọi hai tên? Tài liệu khách tự chống nhau.**
  - Phía **hai việc**: bảng thuật ngữ định nghĩa riêng — RFP:1469 `目利き` = *"Thẩm định chất lượng bằng kinh
    nghiệm"*, RFP:1470 `下見` = *"Xem hàng trước khi giao dịch"*; và §05-01 (RFP:456) kể **tuần tự hai bước**: *"lô
    hàng được kiểm tra ngoại quan qua **下見**, và kết quả đánh giá chất lượng do người có kinh nghiệm phán định bằng
    **目利き**"*.
  - Phía **một việc**: `FIG-005` (RFP:474) viết lane "Thẩm định (目利き)" với hoạt động *"下見 bằng mắt"*, tức coi hai
    chữ là một; và RFP:225, RFP:326, RFP:532 đều nối hai chữ bằng gạch chéo `目利き / 下見`.
  - Vì sao cần trước khi code: `FIG-011` (RFP:619) đặt tên cạnh 1→2 là "đăng ký 下見" và tên trạng thái 2/5 là "Đã
    下見", trong khi `FR-LOT-02` (RFP:633) và `FE-010` chỉ nói 目利き. Nếu là **một việc** thì chỉ cần thêm một giá trị
    trạng thái. Nếu là **hai việc** thì `FIG-011` thiếu cả một bước, thiếu **cả một bảng ghi 下見** và thiếu một màn —
    hai kịch bản chênh nhau rất nhiều. LAB-4 **không tự quyết**.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Năm trạng thái `FIG-011` | `FE-013` khai "theo state machine FIG-011" → **năm** giá trị | `lot.status` CHECK có **bốn** giá trị `received / published / traded / delivered` — **thiếu "Đã 下見"**, gộp vào "Tiếp nhận". Hệ quả: không phân biệt được lô chưa ai xem hàng với lô đã xem xong chờ công bố, đúng thông tin điều phối nhân sự cần lúc 02:00-03:00 | `supabase/migrations/20260904090200_lot.sql:12-13` | khác không chủ đích — **P0 của FE-013** |
| Bước "chuẩn bị bán" của `FIG-011` | một hành vi riêng đưa lô từ 2/5 sang 3/5 | **không tồn tại như hành vi riêng** — ghi kết quả đánh giá đưa lô thẳng sang trạng thái công bố, nên việc ghi thẩm định *chính là* việc công bố bán: hai quyết định của hai vai bị gộp thành một | `src/app/api/lots/[id]/mekiki/route.ts:45-51` | khác không chủ đích |
| Chứng từ tiếp nhận **bắt buộc** | nghiệm thu `FR-LOT-01` "lưu được các chứng từ bắt buộc" | **không bắt buộc** — lưu được lô không có chứng từ nào; và khi tải tệp thất bại thì lô vẫn trả 201, chỉ tăng một bộ đếm | `src/app/api/lots/route.ts:10-16,63-75` | cần khách chốt (§9 Q3) |
| Một ngưỡng số lượng khai một chỗ, áp dụng nhất quán | ba tầng dùng cùng một ngưỡng | ba tầng lệch nhau: tầng nhập `>= 0.01`, tầng dịch vụ `> 0`, tầng dữ liệu là số hai chữ số thập phân — một giá trị nhỏ hơn ngưỡng biểu diễn được lọt tầng dịch vụ rồi **vỡ ràng buộc thành lỗi hệ thống** thay vì lỗi nhập, trái `NFR-USE-01` | `src/app/api/lots/route.ts:26-28`; `20260904090200_lot.sql:10` | khác không chủ đích |
| Sinh mã lô chịu được đua | ràng buộc dữ liệu, không phải thử lại | đếm số lô trong ngày rồi cộng một, chỉ thử lại **một** lần khi trùng — ba người tiếp nhận cùng giây thì người thứ ba vỡ thành lỗi hệ thống; ở cao điểm 600 lô/ngày (RFP:836) đây không phải giả thuyết | `src/lib/lots/lot-code.ts:16-29`; `src/lib/lots/create-lot.ts:7,29,56-59` | khác không chủ đích |
| Kiểm loại tệp bằng nội dung | không tin lời khai của trình duyệt | đọc trường loại tệp do trình duyệt khai, **không** soát nội dung tệp | `src/lib/lots/intake-doc-upload.ts:21-26` | khác không chủ đích |
| Trần số tệp và allow-list ở tầng dữ liệu | trần 1; CHECK loại tệp và dung lượng ở tầng 1 | **không có trần số tệp** ở đâu; allow-list và trần dung lượng chỉ ở tầng ứng dụng nên ghi thẳng cơ sở dữ liệu là vượt được | `src/app/api/lots/route.ts:33-35`; `20260907090000_lot_attachment.sql:19-20` | khác không chủ đích |
| Đường đính kèm lại chứng từ lỗi | có đường bù thật ở SC-10 | thông báo chỉ người dùng "vào chi tiết lô để thử đính kèm lại" nhưng màn SC-10 **chỉ đọc**, không có ô đính kèm nào → chứng từ lỗi coi như mất | `src/lib/i18n/dictionaries/vi/lots.json:33`; `src/components/lots/lot-attachments-card.tsx:12-52` | khác không chủ đích |
| Loại chứng từ theo nghiệp vụ | cột `doc_type` để kiểm đủ bộ chứng từ | không có cột nào cho loại chứng từ; chỉ có loại tệp kỹ thuật | `20260907090000_lot_attachment.sql:14-23` | cần khách chốt (§9 Q3) |
| Tiếp nhận vẫn chạy khi ngày đã lock | đúng như vậy | **khớp** và là quyết định có chủ đích được ghi lại tại chỗ: *"a lot received on a locked day still sells the next day"* | `20260904090200_lot.sql:18-20`; `20260904090500_business_day_lock.sql:56-59` | khác có chủ đích |
| Nhãn nguồn của phạm vi đọc | đề xuất thiết kế, dẫn RFP:311 | RLS mở cho mọi vai đang hoạt động, ghi chú "có chủ đích theo **FR-601**" — **`FR-601` là mã nội bộ LAB-3, grep RFP ra 0 hit; không phải yêu cầu khách** | `supabase/migrations/20260904090900_rls_core.sql:39-40` | khác không chủ đích (nhãn sai nguồn) |

## 11. Dẫn chứng

- RFP:220, 224-226 — `FIG-002` timeline ngày làm việc; 02:00 tiếp nhận; 03:00 `目利き / 下見` · RFP:249 — `TBL-ROLE-01`
  dòng ROLE-INTAKE · RFP:301 — §02-07 khung 02:00-02:30 · RFP:311 — §02-08 việc **đề xuất** cơ chế phân quyền
- RFP:326 — `FIG-008` ranh giới phán đoán, `目利き / 下見` · RFP:456 — §05-01 hai bước tuần tự · RFP:474 — `FIG-005`
  lane "Thẩm định (目利き)" với `下見 bằng mắt` · RFP:529-535 — `FIG-007` luồng năng lực TO-BE
- RFP:596-597 — `BR-LOT-02`, `BR-CLOSE-01` · RFP:601 — `GOV-RULE-01` · RFP:603 — `D-LOT`
- RFP:616-621 — `FIG-011` năm trạng thái; RFP:619 cạnh "đăng ký 下見" · RFP:632-633 — `FR-LOT-01`, `FR-LOT-02`
- RFP:659 — `FR-SETTLE-01` · RFP:710 — `FR-AUDIT-01` · RFP:745 — `RPT-02` · RFP:773 — `TBL-ATTACH-01`
- RFP:794 — `DR-IMAGE-01` · RFP:804, 808, 811, 813, 816, 817, 836 — `NFR-AVL-01`, `NFR-PERF-02`, `NFR-SEC-03`,
  `DR-RET-01`, `NFR-USE-01`, `NFR-COMP-01`, `FIG-LOAD-01`
- RFP:1385 — `FIG-026` Phiếu tiếp nhận · RFP:1467, 1469-1470 — bảng thuật ngữ `業務日`, `目利き`, `下見`
- Feature List `FE-009`, `FE-013`, `FE-041` · Function List `FN-03`
- `docs/lab4/20-architecture-design.md` § 4.2 — `FIG-011` thiếu một trạng thái và câu hỏi thuật ngữ
- `docs/lab4/spec/SC-08-tiep-nhan-lo-hang.md` — bản as-built dùng cho §10
