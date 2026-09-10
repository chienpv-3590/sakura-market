# SC-09 — Ghi nhận kết quả 目利き · Spec BE

| | |
|---|---|
| FE liên quan | FE-010 (Ghi nhận kết quả 目利き) |
| FN | FN-03 (Quản lý lô hàng) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-LOT-02, SCOPE-OUT-01 · kế thừa BR-CLOSE-01, FR-CORR-03, FR-AUDIT-01, NFR-USE-01 |
| Miền dữ liệu | D-LOT (RFP:603) |
| State machine | FIG-011 (RFP:616) — cạnh 1/5 → 2/5 |
| Đã thi công | Có |

## 1. Phạm vi backend của màn này

Ghi **một** kết quả đánh giá bằng mắt cho một lô hàng, kèm **người xác nhận** và **thời điểm ghi nhận**, rồi đưa lô
sang bước 2/5 của `FIG-011`. `FR-LOT-02` (RFP:633) đòi *"lưu kết quả đánh giá bằng mắt, kèm người xác nhận và thời
điểm ghi nhận"*, lý do là *"để giữ phán đoán cuối cùng của con người ở trạng thái truy vết được"*, nghiệm thu là
*"với mỗi kết quả, truy ngược được người ghi và thời điểm"* — nên ba trường đó là ba trường chịu lực, không phải
thông tin phụ.

`SCOPE-OUT-01` (RFP:404) loại hẳn khỏi phạm vi *"Đánh giá tự động độ tươi, chất lượng, phân loại loài cá"* với ghi
chú *"Phán đoán vẫn do con người thực hiện; hệ thống chỉ ghi nhận kết quả"*, và `FIG-008` (RFP:326-327) vẽ rõ phần
giữa **KHÔNG tự động hoá**. Hệ quả thiết kế: kết quả là **văn bản tự do**, không phải danh sách hạng cố định — đóng
khung nó thành một tập giá trị chính là bước đầu của việc tự động hoá mà `SCOPE-OUT-01` cấm.

**Không** làm: chấm điểm, gợi ý hạng, xếp loại tự động, hay bất kỳ suy luận nào từ ảnh (`DR-IMAGE-01`, RFP:794);
tiếp nhận lô (SC-08); công bố bán và sửa thuộc tính lô (SC-10); sửa kết quả đã ghi (§9 Q3).

## 2. Hợp đồng API

### `POST /api/lots/{id}/appraisal`

Thoả FE-010 · FR-LOT-02 (RFP:633) · SCOPE-OUT-01 (RFP:404) · NFR-USE-01 (RFP:816). Xác thực bắt buộc; vai được gọi:
**vai người đánh giá** (§6). **Không** idempotent — chống ghi trùng bằng **ràng buộc duy nhất theo lô** ở tầng dữ
liệu, không bằng một lần đọc trước khi ghi.

**Request** — `id` (path, uuid, bắt buộc, lô tồn tại và đang ở bước 1/5 của `FIG-011`) · `grade` (body, string, bắt
buộc, `1..N` ký tự sau khi cắt khoảng trắng — trần `N` ở §9 Q2) · `expectedStatus` (body, string, **bắt buộc**, bằng
trạng thái hiện tại của lô — mốc chống đua).

**Server tự quyết — không nhận từ client:** `assessorId` (lấy từ phiên đăng nhập), `assessedAt` (thời điểm thực của
việc ghi, neo múi giờ Nhật), `businessDate` (**kế thừa từ lô**, không phải hôm nay), trạng thái mới của lô.

**Response 201:** `appraisalId` · `lotId` · `lotCode` · `grade` · `assessorName` · `assessedAt` · `businessDate` ·
`lotStatus` (bước 2/5).

**Mã lỗi** — mỗi mã đúng một điều kiện: `400 invalid_json` body không phải JSON hợp lệ · `422 grade_required`
`grade` rỗng sau khi cắt khoảng trắng · `422 grade_too_long` `grade` vượt trần độ dài · `422 lot_not_pending`
`expectedStatus` khác trạng thái hiện tại của lô · `422 lot_stage_invalid` lô không ở bước 1/5 của `FIG-011` ·
`409 appraisal_already_recorded` lô đã có một kết quả đánh giá · `423 business_day_locked` ngày nghiệp vụ mà bản ghi
sẽ mang **đã bị lock** · `404 lot_not_found` `id` không tồn tại · `404 not_found` vai gọi không phải vai người đánh
giá — **404 có chủ đích**, không 403.

Ba mã `422 lot_not_pending`, `409 appraisal_already_recorded` và `423 business_day_locked` phải **riêng biệt**: dòng
đầu là đua giữa hai người đánh giá, dòng hai là lô đã có kết quả, dòng ba là kỳ đã chốt — ba nguyên nhân dẫn tới ba
hành động khác nhau của người dùng.

**Tác dụng phụ:** kiểm lock **trước khi ghi**; rồi INSERT một dòng bản ghi đánh giá **và** đổi trạng thái lô sang
bước 2/5 trong **cùng một biên** — hai việc không được tách, vì một lô ở bước 2/5 mà không có bản ghi đánh giá là
trạng thái vô nghĩa về nghiệp vụ. Audit: `action='record_appraisal'` mang `before` = trạng thái lô cũ, `after` =
trạng thái mới cộng `grade`, gắn về định danh lô; nhánh 423 ghi `action='locked_write_attempt'` (§7). Không phát
thông báo.

### `GET /api/lots/{id}/appraisal`

Thoả FE-010 · FR-LOT-02 nghiệm thu "truy ngược được người ghi và thời điểm". Xác thực bắt buộc; vai được gọi: **mọi
vai đang hoạt động** (§6); idempotent (đọc). **Response 200:** `appraisal` (`grade`, `assessorName`, `assessedAt`,
`businessDate`) hoặc `null` khi lô chưa có kết quả · `lot` (`lotCode`, `item`, `status`, `businessDate`,
`businessDayLocked`). **Mã lỗi:** `404 lot_not_found` khi `id` không tồn tại.

Bốn giá trị của khối truy vết (người xác nhận · thời điểm ghi nhận · ngày nghiệp vụ của bản ghi · trạng thái lô sau
khi lưu) phải trả về **trước khi ghi** để màn hiện chúng ra: người đánh giá đang ký tên vào một phán đoán nghiệp vụ
nên họ có quyền thấy tên mình được ghi vào đâu, và phải thấy `businessDate` để biết bản ghi rơi vào kỳ nào.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| bản ghi đánh giá (D-LOT) | `lot_id` | **duy nhất theo lô** — một lô đúng một kết quả cuối cùng | 1 (UNIQUE) | **chỉ có index không duy nhất** |
| bản ghi đánh giá | `grade` | không rỗng; **không** CHECK tập giá trị (SCOPE-OUT-01); có trần độ dài | 1 (NOT NULL + CHECK độ dài) | NOT NULL có; **không có trần** |
| bản ghi đánh giá | `assessor_id` | **không rỗng** — nghiệm thu FR-LOT-02 đòi truy được người ghi | 1 (NOT NULL + FK) | FK có; **cho phép rỗng** |
| bản ghi đánh giá | `assessed_at` | không rỗng; không ở tương lai | 1 (NOT NULL + CHECK) | NOT NULL có; **không CHECK tương lai** |
| bản ghi đánh giá | `business_date` | không rỗng; **kế thừa từ lô**; không ghi được khi ngày đã lock — **kể cả INSERT** | 1 (NOT NULL) + 2 (trigger phủ INSERT/UPDATE/DELETE) | NOT NULL có; **trigger chỉ chặn UPDATE/DELETE** |
| `lot` | `status` | đúng **năm** giá trị `FIG-011`; cạnh 1/5 → 2/5 | 1 (CHECK) + 2 (trigger kiểm cặp từ→đến) | **CHECK chỉ có bốn giá trị**; đường đi chỉ ở tầng 3 |
| `lot` | `business_date` | nguồn của `business_date` bản ghi đánh giá | 1 (NOT NULL) | có |
| `audit_log` | `actor_id`, `action`, `before`, `after`, `reason` | chỉ ghi thêm; có dòng cho cả lần thử bị chặn | 1 + 3 | có |

Ràng buộc **nặng nhất** là trigger lock phải phủ **INSERT**: bản ghi đánh giá **thừa hưởng ngày nghiệp vụ của lô**,
nên một lần ghi muộn là một lần ghi vào kỳ có thể đã chốt. Chặn chỉ UPDATE/DELETE là để hở đúng đường mà `FR-CORR-03`
(RFP:658) cấm — xem §10 dòng đầu.

## 4. Vòng đời trạng thái

```
Tiếp nhận (1/5) → (đăng ký 下見) → Đã 下見 (2/5) → (chuẩn bị bán) → Công bố (3/5) → … → Hoàn tất giao hàng (5/5)
```

Màn này đi đúng **một** cạnh: 1/5 → 2/5. Nó **không** được nhảy sang 3/5 — công bố bán là quyết định riêng của vận
hành chợ ở SC-10, và gộp hai bước là gộp việc ghi phán đoán với quyết định bán, hai việc của hai vai khác nhau.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Tiếp nhận (1/5) | đăng ký 下見 | Đã 下見 (2/5) | lô tồn tại và đang ở bước 1/5; `expectedStatus` khớp trạng thái hiện tại; lô **chưa có** kết quả đánh giá; `grade` không rỗng và trong trần độ dài; ngày nghiệp vụ của lô **chưa lock** | vai người đánh giá | 422 `lot_stage_invalid` · 422 `lot_not_pending` · 409 `appraisal_already_recorded` · 422 `grade_required` · 423 `business_day_locked` |
| Đã 下見 (2/5) | ghi lại kết quả | — | **không có cạnh nào** — một lô đúng một kết quả cuối cùng; sửa kết quả đi qua luồng điều chỉnh có kiểm soát (§9 Q3) | — | 409 `appraisal_already_recorded` |
| các bước khác | — | — | không thuộc màn này; `FIG-011` đi một chiều nên không có cạnh quay lại 1/5 | — | 422 `illegal_transition` |

**Guard dễ mất nhất là thứ tự.** Cửa "một lô một kết quả" phải là **ràng buộc dữ liệu** chứ không phải một lần đọc
trước khi ghi: hai người đánh giá bấm cùng lúc thì đúng một người ghi được, người thua nhận 409 chứ không tạo bản ghi
thứ hai. Nếu cửa duy nhất chỉ dựa vào việc lật được trạng thái lô thì bất kỳ đường nào đưa lô về 1/5 sẽ sinh hai bản
ghi đánh giá cho một lô — hai phán đoán mâu thuẫn không ai gỡ được.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `FR-LOT-02` (RFP:633) | "phải lưu kết quả đánh giá bằng mắt, kèm người xác nhận và thời điểm ghi nhận"; nghiệm thu "với mỗi kết quả, truy ngược được người ghi và thời điểm" | ba cột NOT NULL ở tầng 1; `assessorId` lấy từ phiên đăng nhập, không nhận từ client | test: bỏ từng trường → 422 mã riêng; đọc lại một kết quả cũ → có đủ người ghi và thời điểm |
| `SCOPE-OUT-01` (RFP:404) | "Đánh giá tự động độ tươi, chất lượng, phân loại loài cá" ngoài phạm vi; "Phán đoán vẫn do con người thực hiện; **hệ thống chỉ ghi nhận kết quả**" | `grade` là văn bản tự do — **không** CHECK tập giá trị; không có thành phần suy luận nào | soát bề mặt API: không có endpoint chấm điểm, gợi ý hạng hay nhận ảnh để suy luận |
| `FIG-008` (RFP:326-327) | "Đưa ra thông tin ứng viên để ghi nhận → 目利き / 下見 (**NGƯỜI QUYẾT ĐỊNH**) → Đăng ký kết quả phán định"; phần giữa **KHÔNG tự động hoá** | màn chỉ có một trường nhập và một nút lưu | nghiệm thu `FR-SERI-01` cùng tinh thần: không tồn tại chức năng suy luận kết quả |
| `DR-IMAGE-01` (RFP:794) | "Chủ đầu tư **không yêu cầu** chức năng AI tự động phán định chất lượng từ các hình ảnh này" | không có đường nhận ảnh nào ở màn này | soát bề mặt API |
| `BR-CLOSE-01` (RFP:597) · `FR-CORR-03` (RFP:658) | "Không được chỉnh sửa trực tiếp ngày nghiệp vụ đã bị lock" · "**không được** cho phép sửa trực tiếp bản ghi của ngày đã lock"; nghiệm thu "mọi lần thử sửa trực tiếp đều bị chặn và có log" | trigger tầng 2 phủ **INSERT/UPDATE/DELETE** + kiểm lock ở tầng dịch vụ + audit lần thử bị chặn | test: lock ngày của lô rồi ghi kết quả mới → 423 và có một dòng audit |
| `FIG-011` (RFP:616-621) | cạnh "Tiếp nhận → (đăng ký 下見) → Đã 下見" | cạnh 1/5 → 2/5, không nhảy bước | test: sau khi ghi, lô ở bước 2/5 chứ không phải 3/5 |
| `FR-AUDIT-01` (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" kèm chủ thể, timestamp, before/after và lý do | ghi trong cùng biên với thao tác nghiệp vụ | test: audit lỗi → bản ghi đánh giá không được coi là đã tồn tại |

**Con số nghiệp vụ:** spec này **không** chốt trần độ dài của `grade` — RFP không cho giá trị nào; xem §9 Q2.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang | `GET` kết quả và ngữ cảnh lô | `POST` ghi kết quả |
|---|---|---|---|
| ROLE-JUDGE | cho phép | cho phép | cho phép |
| ROLE-INTAKE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | cho phép | cho phép | **404** `not_found` |

- **⚠️ Phạm vi đọc rộng ở trên là ĐỀ XUẤT THIẾT KẾ, không phải yêu cầu khách.** Căn cứ duy nhất là RFP:311 (§02-08):
  *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Lý do đề
  xuất: kết quả đánh giá là căn cứ chất lượng cho toàn bộ chuỗi phía sau — vận hành giao dịch cần đọc nó trước khi
  chốt bán, và bộ phận đối chiếu cần nó khi có tranh chấp. Dữ liệu này **không** phải thông tin cá nhân theo RFP:883
  nên không tạo căng thẳng với RFP:886 (APPI).
- **Đọc và ghi là hai trục khác nhau.** Trục **đọc** không chặn theo vai — đề xuất. Trục **ghi** chặn theo vai:
  `TBL-ROLE-01` (RFP:250) giao ROLE-JUDGE việc *"Ghi nhận kết quả đánh giá bằng mắt"* và liệt *"Cập nhật kết quả sau
  khi lô hàng đã vào giao dịch"* là thao tác độ nhạy cao **bắt buộc phải truy vết** — căn cứ trực tiếp cho §9 Q3.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Nhưng màn này **cho vai
  khác vào đọc ngữ cảnh lô**, chỉ chặn ở endpoint ghi: ngữ cảnh lô là dữ liệu đọc mở, còn 404 áp cho hành động ghi.
- Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất. Nếu §9 Q3 cho
  ra một luồng sửa kết quả thì điều kiện "người duyệt khác người ghi" là ràng buộc riêng, không suy ra được từ vai.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Ghi kết quả đánh giá | `record_appraisal` | `before` = `{lotStatus}` cũ; `after` = `{lotStatus, grade, assessorId, assessedAt}`; chủ thể; timestamp | FR-AUDIT-01, FR-LOT-02 |
| Bị chặn vì ngày đã lock | `locked_write_attempt` | `after` = payload bị từ chối; `reason` = ngày nghiệp vụ của lô đã lock | FR-CORR-03 (RFP:658), BR-CLOSE-01 |
| Bị chặn vì thiếu quyền ghi | `denied_write_attempt` | chủ thể; vai; endpoint | FR-AUDIT-01, NFR-SEC-03 (RFP:811) |

Dấu vết kiểm toán ở đây **không** phải nguồn đọc lại kết quả — nghiệm thu `FR-LOT-02` đòi truy ngược từ **mỗi kết
quả**, nên `GET` phải đọc từ chính bản ghi đánh giá. Suy kết quả từ một dòng kiểm toán là đường gián tiếp: mất dòng
đó là mất kết quả trên màn dù bản ghi vẫn còn (SC-10 §10).

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-USE-01` (RFP:816) | dùng được bằng bàn phím; thông báo lỗi dễ hiểu | một trường nhập, phím xác nhận lưu được; ba nhánh từ chối phải là ba mã riêng để màn dựng được ba câu khác nhau |
| `NFR-AVL-01` (RFP:804) | 99,5%/tháng trong khung **02:00-10:00 JST** | `FIG-002` (RFP:225) đặt `目利き / 下見` ở **03:00**, ngay trước đăng ký lô hàng ở 04:00 — cửa sổ hẹp, endpoint không được phụ thuộc tác vụ nền |
| `NFR-PERF-02` (RFP:808) | `FIG-LOAD-01` (RFP:836): cao điểm **600 lô/ngày** | danh sách lô chờ đánh giá phải lọc bằng trạng thái có chỉ mục, không tải cả tập lô rồi trừ ở tầng ứng dụng |
| `NFR-COMP-01` (RFP:817) | thao tác được trên tablet tại hiện trường | người đánh giá đứng cạnh lô hàng; trường nhập phải dùng được bằng bàn phím ảo và không đòi chuột |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — 下見 và 目利き là hai việc khác nhau hay một việc gọi hai tên? Tài liệu khách tự chống nhau.**
  - Phía **hai việc**: bảng thuật ngữ định nghĩa riêng — RFP:1469 `目利き` = *"Thẩm định chất lượng bằng kinh
    nghiệm"*, RFP:1470 `下見` = *"Xem hàng trước khi giao dịch"*; và §05-01 (RFP:456) kể **tuần tự hai bước**: *"lô
    hàng được kiểm tra ngoại quan qua **下見**, và kết quả đánh giá chất lượng do người có kinh nghiệm phán định bằng
    **目利き**"*. Phụ lục ASIS-02 (RFP:463) cũng chỉ nhắc *"Bản ghi kết quả 目利き"*.
  - Phía **một việc**: `FIG-005` (RFP:474) viết lane "Thẩm định (目利き)" với hoạt động *"下見 bằng mắt"*, tức coi hai
    chữ là một; và RFP:225 (`FIG-002`), RFP:326 (`FIG-008`), RFP:532 (`FIG-007`) đều nối hai chữ bằng gạch chéo
    `目利き / 下見`.
  - Vì sao cần trước khi code: `FIG-011` (RFP:619) đặt tên cạnh này là "đăng ký **下見**" và tên trạng thái 2/5 là "Đã
    **下見**", trong khi `FR-LOT-02` (RFP:633) và `FE-010` chỉ nói **目利き**. Nếu là **một việc** thì chỉ cần chốt gọi
    tên nào cho trạng thái và cho màn. Nếu là **hai việc** thì thiếu **cả một bảng ghi 下見** và **cả một màn** — và
    `FIG-011` thiếu một bước nữa, không phải chỉ một giá trị trạng thái. Hai kịch bản chênh nhau rất nhiều, LAB-4
    **không tự quyết**.
- **Q2 — Trần độ dài của kết quả thẩm định là bao nhiêu ký tự?** `FR-LOT-02` không nói. Cần trước khi code vì đây là
  trường văn bản tự do duy nhất của FN-03 và nó xuất hiện trong báo cáo lịch sử lô hàng (`RPT-02`, RFP:745). Chọn
  sai: không có trần thì một nội dung rất dài lưu được và làm hỏng cả báo cáo lẫn màn tra cứu; trần quá ngắn thì người
  đánh giá phải cắt bớt phán đoán — đúng thứ `SCOPE-OUT-01` muốn giữ nguyên.
- **Q3 — Kết quả đã ghi có được sửa không, và nếu có thì đi qua luồng nào?** `FR-LOT-02` chỉ đòi truy vết người ghi
  và thời điểm, **không nói** việc sửa. Nhưng `TBL-ROLE-01` (RFP:250) liệt *"Cập nhật kết quả sau khi lô hàng đã vào
  giao dịch"* là thao tác độ nhạy cao **bắt buộc phải truy vết** của ROLE-JUDGE — tức nghiệp vụ **có** việc sửa.
  Cần trước khi code vì nó quyết định có endpoint sửa hay không, và sửa sau khi kỳ đã lock thì phải đi qua luồng điều
  chỉnh sau chốt (`FR-CORR-01`, RFP:656) chứ không sửa tại chỗ. Chọn sai: cho sửa tại chỗ là làm mất phán đoán cũ mà
  `FR-LOT-02` đòi giữ; không cho sửa thì một kết quả nhập sai không có đường chữa.
- **Q4 — Ngày nghiệp vụ của bản ghi đánh giá bám lô hay bám lúc ghi?** Thiết kế chọn **kế thừa từ lô** để bản ghi gắn
  với lô chứ không gắn với người ghi. Nhưng hệ quả phải khách xác nhận: lô nhận ngày N mà đánh giá ngày N+1 thì báo
  cáo quy công việc của N+1 về kỳ N, và bản ghi vừa tạo có thể **rơi ngay vào một kỳ đã lock**. Cần trước khi code vì
  nó quyết định mã 423 phát sinh ở đâu và bảng đối chiếu ngày (`FR-SETTLE-01`, RFP:659) đếm công việc theo kỳ nào.
  Chọn sai: bám lúc ghi thì một lô có kết quả nằm ở kỳ khác lô, và truy vết lô bị chia hai kỳ.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Lock chặn **mọi** đường làm đổi số liệu của kỳ đã chốt | `BR-CLOSE-01` (RFP:597) và `FR-CORR-03` (RFP:658) — "mọi lần thử sửa trực tiếp đều bị chặn và có log" | **Lock không chặn INSERT** — trigger chỉ `before update or delete`, và bản ghi đánh giá **kế thừa ngày nghiệp vụ của lô**. Ghi kết quả muộn là **backdate được vào một ngày quá khứ đã lock, bằng giao diện bình thường, không cần quyền đặc biệt**; route cũng không gọi hàm kiểm lock. Đây là chỗ **nặng nhất** của nhóm màn FN-03 | `supabase/migrations/20260904090500_business_day_lock.sql:69-71`; `src/app/api/lots/[id]/mekiki/route.ts:32,61`; `supabase/migrations/20260904090900_rls_core.sql:91-92` | khác không chủ đích — **P0** |
| Người xác nhận hiện trên màn | nghiệm thu `FR-LOT-02` "truy ngược được người ghi và thời điểm" | có sẵn nhãn đa ngữ nhưng form **không render trường này** — người đánh giá không thấy tên mình được ghi vào đâu; `assessed_at` cũng không có nhãn | `src/lib/i18n/dictionaries/vi/lots.json:43`; `src/components/lots/mekiki-form.tsx:57-90` | khác không chủ đích |
| Ghi kết quả đưa lô sang bước **2/5** | `FIG-011` (RFP:619) có trạng thái "Đã 下見" | đưa **thẳng** sang trạng thái công bố — vì `lot.status` không có giá trị cho bước 2/5, nên **việc đánh giá và quyết định bán bị gộp thành một**; bước "chuẩn bị bán" của `FIG-011` không tồn tại như hành vi riêng | `src/app/api/lots/[id]/mekiki/route.ts:45-51`; `supabase/migrations/20260904090200_lot.sql:12-13` | khác không chủ đích |
| Một lô tối đa một kết quả | ràng buộc duy nhất theo lô ở tầng 1 | **không có ràng buộc duy nhất** ở tầng dữ liệu — chỉ có index không duy nhất; chống trùng dựa vào việc lật được trạng thái lô, nên bất kỳ đường nào đưa lô về bước 1/5 sẽ sinh hai bản ghi cho một lô | `supabase/migrations/20260904090200_lot.sql:22-29,35` | khác không chủ đích |
| Ghi trạng thái và ghi bản ghi trong cùng một biên | hai việc cùng thành công hoặc cùng không | hai lệnh tuần tự không có transaction; bù trừ là best-effort — nếu chính lệnh bù trừ cũng lỗi thì lô nằm ở trạng thái đã công bố mà **không có bản ghi đánh giá nào**, và không có cơ chế nào phát hiện lại | `src/app/api/lots/[id]/mekiki/route.ts:38-44,69-75` | khác không chủ đích |
| `assessor_id` không rỗng ở tầng dữ liệu | tầng 1 NOT NULL | cột **cho phép rỗng**; đường ghi hiện có luôn gán, nên rủi ro nằm ở đường ghi khác trong tương lai | `supabase/migrations/20260904090200_lot.sql:26` | khác không chủ đích |
| Trần độ dài `grade` | tầng 1 + tầng nhập | **không có trần** ở cả giao diện và tầng dịch vụ | `src/app/api/lots/[id]/mekiki/route.ts:10-16`; `supabase/migrations/20260904090200_lot.sql:24` | cần khách chốt (§9 Q2) |
| `grade` không CHECK tập giá trị | đúng ý `SCOPE-OUT-01` | **khớp** — cột là văn bản tự do và comment tự khai *"không auto-grading — SCOPE-OUT-01"*; không có đường nhận ảnh nào | `supabase/migrations/20260904090200_lot.sql:25,31-33` | khớp |
| Ngày nghiệp vụ kế thừa từ lô | đúng như vậy | **khớp** và có lý do được ghi lại: trigger đọc thẳng cột này, không nối bảng | `supabase/migrations/20260904090200_lot.sql:28` | khác có chủ đích |
| Đường sửa kết quả đã ghi | §9 Q3 | không có endpoint sửa nào, và cũng không có policy sửa — nhưng `TBL-ROLE-01` (RFP:250) khai nghiệp vụ **có** việc cập nhật kết quả | `supabase/migrations/20260904090900_rls_core.sql:88-97` | cần khách chốt (§9 Q3) |
| Nhãn nguồn của phạm vi đọc | đề xuất thiết kế, dẫn RFP:311 | RLS mở cho mọi vai đang hoạt động, ghi chú "có chủ đích theo **FR-601**" — **`FR-601` là mã nội bộ LAB-3, grep RFP ra 0 hit; không phải yêu cầu khách** | `supabase/migrations/20260904090900_rls_core.sql:39-42` | khác không chủ đích (nhãn sai nguồn) |

## 11. Dẫn chứng

- RFP:220, 225 — `FIG-002`, `目利き / 下見` ở 03:00 · RFP:250 — `TBL-ROLE-01` dòng ROLE-JUDGE và thao tác độ nhạy cao
- RFP:311 — §02-08 việc **đề xuất** cơ chế phân quyền · RFP:326-327 — `FIG-008` phần giữa KHÔNG tự động hoá
- RFP:404 — `SCOPE-OUT-01` · RFP:456 — §05-01 hai bước tuần tự · RFP:463 — ASIS-02 "Bản ghi kết quả 目利き"
- RFP:474 — `FIG-005` lane "Thẩm định (目利き)" với `下見 bằng mắt` · RFP:532 — `FIG-007`
- RFP:597 — `BR-CLOSE-01` · RFP:601 — `GOV-RULE-01` · RFP:603 — `D-LOT` · RFP:616-621 — `FIG-011`; RFP:619 cạnh
  "đăng ký 下見" · RFP:633 — `FR-LOT-02` · RFP:656, 658-659 — `FR-CORR-01`, `FR-CORR-03`, `FR-SETTLE-01`
- RFP:710 — `FR-AUDIT-01` · RFP:745 — `RPT-02` · RFP:794 — `DR-IMAGE-01`
- RFP:804, 808, 811, 816, 817, 836, 883, 886 — `NFR-AVL-01`, `NFR-PERF-02`, `NFR-SEC-03`, `NFR-USE-01`,
  `NFR-COMP-01`, `FIG-LOAD-01`, §09-06 APPI
- RFP:1469-1470 — bảng thuật ngữ `目利き` và `下見` · Feature List `FE-010`, `FE-013`, `FE-041`
- `docs/lab4/20-architecture-design.md` § 4.2 — `FIG-011` thiếu "Đã 下見" và câu hỏi thuật ngữ chưa chốt
- `docs/lab4/spec/SC-09-ghi-nhan-ket-qua-mekiki.md` — bản as-built dùng cho §10
