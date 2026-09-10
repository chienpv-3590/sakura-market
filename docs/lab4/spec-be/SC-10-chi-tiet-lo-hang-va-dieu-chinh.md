# SC-10 — Chi tiết lô hàng và điều chỉnh · Spec BE

| | |
|---|---|
| FE liên quan | FE-011 (Kiểm soát số lượng khả dụng), FE-012 (Điều chỉnh thuộc tính lô hàng), FE-013 (Tra cứu lô hàng và trạng thái) |
| FN | FN-03 (Quản lý lô hàng) |
| Ưu tiên | P0 · P1 |
| Yêu cầu khách | BR-LOT-02, FR-LOT-01, FR-LOT-03, FR-LOT-04 · kế thừa FR-LOT-02, BR-CLOSE-01, FR-CORR-03, TBL-ATTACH-01, FR-AUDIT-01 |
| Miền dữ liệu | D-LOT (RFP:603) · D-TRADE (RFP:604) cho chứng từ nguồn của sổ số lượng |
| State machine | FIG-011 (RFP:616) — **năm trạng thái**; màn này đọc, và đi cạnh 2/5 → 3/5 |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

Một lô hàng nhìn từ đầu đến cuối: đang ở bước nào của `FIG-011`, còn bao nhiêu khả dụng và **vì sao**, kết quả đánh giá,
chứng từ tiếp nhận, và toàn bộ dấu vết điều chỉnh. Ba yêu cầu chịu lực: `BR-LOT-02` (RFP:596) đòi **hai** thứ chứ
không phải một — *"Số lượng khả dụng của lô hàng không được âm, **và phải truy vết được tới lịch sử điều chỉnh**"*, nửa
đầu là một ràng buộc còn nửa sau cần **một sổ số lượng** (thường bị bỏ); `FR-LOT-04` (RFP:635) cho *"điều chỉnh thuộc
tính lô hàng theo cách **có kiểm soát** và ghi lại logical audit"* với nghiệm thu *"bản ghi điều chỉnh có reason, chủ
thể thực hiện và before/after"*; và `FE-013` đòi danh sách cùng chi tiết theo `FIG-011`, tức đủ **năm** trạng thái.

**Không** làm việc chặn bán vượt: `FR-LOT-03` (RFP:634) đòi kiểm **số lượng khả dụng** *"trước khi cho phép giao dịch
**hoặc giao hàng**"* — cửa đó nằm ở đường chốt giao dịch (SC-11 · SC-13) và đường ghi nhận giao hàng (SC-16). Màn này
**hiển thị và truy vết** số lượng và **không có** đường sửa trực tiếp số lượng; cũng không ghi kết quả đánh giá (SC-09)
hay điều chỉnh sau khi kỳ đã chốt (`FR-CORR-01`, RFP:656 — SC-20).

## 2. Hợp đồng API

### `GET /api/lots/{id}`

Thoả FE-011 · FE-013 · FR-LOT-01 (RFP:632) · FR-LOT-02 (RFP:633). Xác thực bắt buộc; vai được gọi: **mọi vai đang hoạt
động** (§6); idempotent (đọc). **Response 200:** `lot` (`lotCode`, `item`, `packageCount`, `initialQty`, `reservedQty`,
`availableQty`, `status`, `businessDate`, `businessDayLocked`) · `appraisal` (`grade`, `assessorName`, `assessedAt`)
hoặc `null` · `attachments[]` (`id`, `fileName`, `docType`, `fileSize`, `createdAt`, `viewUrl`) · `quantityLedger[]` ·
`history[]`.

Bắt buộc: **`businessDate` và `businessDayLocked` phải có mặt** — đó là thứ quyết định khối điều chỉnh mở hay không và
người dùng phải biết **trước khi nhập**; `appraisal` phải đọc từ **chính bản ghi đánh giá**, không suy từ dòng kiểm
toán (§10). `reservedQty` là giá trị dẫn xuất giải thích hiệu giữa `initialQty` và `availableQty` (§9 Q1); `viewUrl` là
đường dẫn có thời hạn — **đường dẫn lưu trữ nội bộ không bao giờ ra client và không đi vào tệp xuất**.

**Mã lỗi:** `404 lot_not_found` khi `id` không tồn tại · `422 data_out_of_domain` khi `lot.status` rơi ngoài năm trạng
thái của `FIG-011` — hiển thị là không xác định chứ không suy đoán bừa. **Tác dụng phụ:** không; không ghi audit cho
lượt đọc (§9 Q4).

### `GET /api/lots/{id}/quantity-ledger`

Thoả FE-011 · **nửa sau của** `BR-LOT-02` (RFP:596). Xác thực bắt buộc; vai được gọi: **mọi vai đang hoạt động**;
idempotent (đọc). **Request** — `page` / `pageSize` (query, integer, không bắt buộc, `pageSize` trong `1..100`).
**Response 200:** `items[]` (`occurredAt`, `event`, `sourceRef`, `delta`, `availableAfter`, `actorName`) sắp **mới nhất
trước** · `page` · `pageSize` · `total`. `delta` mang dấu: âm khi giữ số lượng cho một giao dịch, dương khi hoàn lại. `availableAfter` cho phép cộng dồn về đúng
con số đang hiển thị ở khối tổng quan — đó là cách nửa "truy vết được" của `BR-LOT-02` được nghiệm thu. `sourceRef` nối
một lần giữ về **đúng** chứng từ nguồn gây ra nó (mã giao dịch, mã bản ghi giao hàng); dòng tiếp nhận lô để rỗng.
**Mã lỗi:** `404 lot_not_found` khi `id` không tồn tại · `422 invalid_page` khi `page < 1` hoặc `pageSize` ngoài `1..100`.

### `PATCH /api/lots/{id}`

Thoả FE-012 · FR-LOT-04 (RFP:635) · BR-CLOSE-01 (RFP:597) · FR-AUDIT-01 (RFP:710). Xác thực bắt buộc; vai được gọi:
**vai đối chiếu** (§6). **Không** idempotent — chống ghi đè bằng `expectedValue`. **Request** — `id` (path, uuid, bắt
buộc) · `field` (body, string, bắt buộc, thuộc **danh sách trắng** thuộc tính sửa được) · `newValue` (body, string hoặc
integer theo `field`, bắt buộc) · `expectedValue` (body, **bắt buộc**, bằng giá trị hiện tại của `field` — nửa "before"
của cặp before/after) · `reason` (body, string, bắt buộc, không rỗng). **Server tự quyết:** `updatedBy`, `updatedAt`, nội dung dòng kiểm toán. **Mỗi lần gửi sửa đúng một trường** — đó là
nghĩa vận hành của hai chữ "có kiểm soát". **Danh sách trắng hẹp có chủ đích:** `initialQty` và `availableQty` **không**
nằm trong đó; sửa số lượng đi vòng qua đường giữ và hoàn của `BR-LOT-02`, vì cho sửa trực tiếp là bỏ hàng rào giữ ràng
buộc không âm. **Response 200:** `lot` sau khi sửa · dòng lịch sử vừa ghi.

**Mã lỗi** — mỗi mã đúng một điều kiện: `400 invalid_json` body không phải JSON hợp lệ · `422 field_not_editable`
`field` ngoài danh sách trắng · `422 new_value_required` `newValue` rỗng sau khi cắt khoảng trắng · `422
new_value_type_invalid` `newValue` không đúng kiểu của `field` · `422 new_value_out_of_range` `newValue` vi phạm ngưỡng
của `field` (cùng ngưỡng đã khai ở SC-08 §3) · `422 new_value_unchanged` `newValue` trùng giá trị hiện tại — không có gì
để ghi vào lịch sử · `422 reason_required` `reason` rỗng · `409 value_conflict` `expectedValue` khác giá trị hiện tại ·
`423 business_day_locked` ngày nghiệp vụ của lô đã bị lock · `404 lot_not_found` `id` không tồn tại · `404 not_found`
vai gọi không phải vai đối chiếu — **404 có chủ đích**, không 403.

Sáu mã 422 phải **riêng biệt** — một mã gộp làm người dùng không biết sai `field`, sai giá trị hay thiếu lý do. **Tác
dụng phụ:** kiểm lock **trước**; rồi UPDATE **đúng một cột** của `D-LOT` với điều kiện giá trị cũ khớp
`expectedValue`, cộng một dòng kiểm toán `action='adjust'` mang `before`/`after` và `reason`. Nhánh 423 **vẫn ghi** một
dòng `action='adjust_blocked_locked'` **trước khi** trả lỗi — `FR-CORR-03` (RFP:658) nghiệm thu *"mọi lần thử sửa trực
tiếp đều bị chặn và có log"*. Không phát thông báo.

### `POST /api/lots/{id}/attachments`

Thoả FE-012 · FR-LOT-01 nghiệm thu "lưu được các chứng từ bắt buộc" · TBL-ATTACH-01 (RFP:773). Nhận
`multipart/form-data`. Xác thực bắt buộc; vai được gọi: **vai tiếp nhận** và **vai đối chiếu** (§6); không idempotent.
**Request** — `id` (path, uuid, bắt buộc) · `docs[]` (form, file, bắt buộc, cùng allow-list loại tệp và trần dung lượng
như SC-08) · `docType` (form, string, bắt buộc, thuộc danh mục loại chứng từ — §9 Q2) · `reason` (form, string, bắt
buộc). **Response 201:** `attachments[]` vừa ghi.

**Mã lỗi** — mỗi mã đúng một điều kiện: `422 doc_required` không có tệp nào · `422 doc_type_invalid` loại tệp ngoài
allow-list · `422 doc_too_large` một tệp vượt trần dung lượng · `422 doc_type_unknown` `docType` ngoài danh mục · `422
doc_too_many` số tệp của lô vượt trần · `422 reason_required` `reason` rỗng · `423 business_day_locked` ngày nghiệp vụ
của lô đã bị lock · `404 lot_not_found` `id` không tồn tại · `404 not_found` vai gọi không có quyền ghi.

**Tác dụng phụ:** tải tệp vào vùng lưu trữ riêng tư rồi INSERT một dòng đính kèm cho mỗi tệp, cộng một dòng kiểm toán
`action='attach_document'` **gắn về định danh lô**. Đây là **đường bù** cho trạng thái "thành công nhưng chứng từ lỗi"
của SC-08: không có nó thì chứng từ bắt buộc mất hẳn và đường duy nhất là tạo lại lô.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `lot` (D-LOT) | `available_qty` | `>= 0` — nửa đầu `BR-LOT-02`; **không** sửa được qua đường tự do | 1 (CHECK) + 3 (loại khỏi danh sách trắng) | có |
| `lot` | `item`, `package_count` | trong danh sách trắng sửa được; cùng ngưỡng với SC-08 | 1 (NOT NULL + CHECK) | một phần |
| `lot` | `status`; `business_date` | `status` đúng **năm** giá trị `FIG-011`; `business_date` là nguồn của việc kiểm lock và **phải trả ra client** | 1 (CHECK + NOT NULL) | **CHECK chỉ có bốn giá trị**; `business_date` có |
| **sổ số lượng khả dụng** | `lot_id`, `occurred_at`, `event`, `source_ref`, `delta`, `available_after`, `actor_id` | chỉ ghi thêm; một dòng cho **mỗi** lần số lượng đổi; cộng dồn `delta` về đúng `lot.available_qty` — nửa sau `BR-LOT-02` | 1 (NOT NULL + FK) + 1b (không policy sửa/xoá) + 2 (trigger ghi khi `available_qty` đổi) | **thực thể chưa tồn tại** |
| bản ghi đánh giá | `grade`, `assessor_id`, `assessed_at` | nguồn đọc của khối kết quả đánh giá — nghiệm thu `FR-LOT-02` | 1 | có, **nhưng màn không đọc** |
| đính kèm chứng từ | `lot_id`, `file_name`, `mime_type`, `file_size`, `doc_type`, đường dẫn lưu trữ | chỉ ghi thêm; `doc_type` không rỗng; đường dẫn lưu trữ **không bao giờ** ra client và không vào tệp xuất; vùng lưu trữ riêng tư | 1 + 1b + 3 (kiểu dữ liệu trả ra) | `doc_type` **chưa có cột**; phần còn lại có |
| `audit_log` | `actor_id`, `action`, `before`, `after`, `reason` | chỉ ghi thêm; có dòng cho **cả lần thử bị chặn**; truy được theo định danh lô kể cả khi thao tác thuộc thực thể đính kèm | 1 + 3 | có |

**Sổ số lượng là thực thể thiếu quan trọng nhất của màn.** Không có nó thì nửa "truy vết được tới lịch sử điều chỉnh"
của `BR-LOT-02` không được thi hành, và câu hỏi vận hành thật — *"vì sao lô còn 120 mà ban đầu 150"* — không trả lời
được bằng dữ liệu; ghi lại giá trị mới vào lô là **mất** thông tin chứng từ nguồn. Và **lock trên `lot` chỉ là chốt
tầng ứng dụng, có chủ đích**: `lot` cố ý không có trigger lock vì lô nhận trong ngày đã lock vẫn bán ngày sau (SC-08
§1), nên chốt duy nhất cho `PATCH` là kiểm lock ở tầng dịch vụ — đánh đổi phải khai, không phải bảo đảm hai tầng.

## 4. Vòng đời trạng thái

```
Tiếp nhận (1/5) → (đăng ký 下見) → Đã 下見 (2/5) → (chuẩn bị bán) → Công bố (3/5) → (chốt mua bán) → Đã chốt (4/5) → (giao hàng) → Hoàn tất giao hàng (5/5)
```

**NĂM trạng thái.** `FE-013` khai "theo state machine FIG-011" nên dải tiến trình phải hiện đủ năm bước; giá trị ngoài
tập năm hiển thị là **không xác định** chứ không suy đoán bừa.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Đã 下見 (2/5) | chuẩn bị bán | Công bố (3/5) | lô đã có kết quả đánh giá; ngày nghiệp vụ **chưa lock**; **§9 Q3** | vận hành chợ | 422 `appraisal_missing` · 423 `business_day_locked` |
| mọi bước | điều chỉnh thuộc tính | **không đổi trạng thái** | `field` trong danh sách trắng; `expectedValue` khớp; `reason` không rỗng; ngày nghiệp vụ chưa lock | vai đối chiếu | 422 `field_not_editable` · 409 `value_conflict` · 423 `business_day_locked` |
| mọi bước | đính kèm chứng từ | **không đổi trạng thái** | tệp hợp lệ; `docType` trong danh mục; ngày nghiệp vụ chưa lock | vai tiếp nhận, vai đối chiếu | 422 `doc_type_unknown` · 423 `business_day_locked` |
| mọi bước | đổi số lượng khả dụng | **không đổi trạng thái** | **không có đường nào ở màn này** — chỉ qua đường giữ/hoàn của SC-11 · SC-13 · SC-16, luôn để lại một dòng sổ | vận hành giao dịch, vận hành giao hàng | — |
| 1/5, 3/5, 4/5 | các cạnh còn lại | — | thuộc SC-09, SC-11 · SC-12 · SC-13, SC-16; `FIG-011` đi một chiều nên không có cạnh quay lại | xem spec màn đó | 422 `illegal_transition` |

**Số lượng không đủ không bao giờ là trạng thái của màn này** — màn không đổi số lượng; cửa chặn bán vượt của `FR-LOT-03` (RFP:634) nằm ở đường chốt giao dịch **và** đường ghi nhận giao hàng, đúng cả hai kênh yêu cầu nêu.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `BR-LOT-02` (RFP:596) | "Số lượng khả dụng của lô hàng không được âm, **và phải truy vết được tới lịch sử điều chỉnh**" | nửa đầu: CHECK `>= 0` ở tầng 1 cộng việc loại `available_qty` khỏi danh sách trắng. Nửa sau: **sổ số lượng** chỉ ghi thêm, một dòng mỗi lần đổi, có `source_ref` | test: cộng dồn `delta` của sổ = `available_qty` hiện tại; mỗi lần giữ hoặc hoàn để lại đúng một dòng có chứng từ nguồn |
| `FR-LOT-03` (RFP:634) | "phải kiểm tra số lượng khả dụng của lô hàng trước khi cho phép giao dịch **hoặc giao hàng**"; nghiệm thu "không cho phép chốt nếu điều đó làm số lượng khả dụng bị âm" | **không ở màn này** — cửa nằm ở đường chốt giao dịch (SC-11 · SC-13) và đường ghi nhận giao hàng (SC-16); màn này chỉ hiển thị và truy vết | test: chốt vượt tồn → bị từ chối ở đường chốt, không ở đây |
| `FR-LOT-04` (RFP:635) | "phải cho phép điều chỉnh thuộc tính lô hàng theo cách **có kiểm soát** và ghi lại logical audit"; nghiệm thu "bản ghi điều chỉnh có reason, chủ thể thực hiện và before/after" | danh sách trắng hẹp; một trường một lý do một dòng lịch sử; `expectedValue` làm nửa "before" | test: sửa hai trường là hai request, hai dòng lịch sử; bỏ `reason` → 422 |
| `BR-CLOSE-01` (RFP:597) · `FR-CORR-03` (RFP:658) | "Không được chỉnh sửa trực tiếp ngày nghiệp vụ đã bị lock" · nghiệm thu "mọi lần thử sửa trực tiếp đều bị chặn và có log" | kiểm lock trước khi ghi + audit `adjust_blocked_locked` **trước** khi trả 423 + chỉ đường sang `FR-CORR-01` | test: lock ngày rồi sửa → 423 và có đúng một dòng audit của lần thử |
| `FR-LOT-01` (RFP:632) · `FR-LOT-02` (RFP:633) | nghiệm thu "lưu được các chứng từ bắt buộc" · "với mỗi kết quả, truy ngược được người ghi và thời điểm" | đường đính kèm bù ở màn này kèm `doc_type`; khối kết quả đánh giá đọc từ **chính bản ghi đánh giá**, không suy từ dòng kiểm toán | test: chứng từ lỗi lúc tiếp nhận → đính kèm lại được ở đây; xoá một dòng kiểm toán → khối kết quả vẫn đúng |
| `TBL-ATTACH-01` (RFP:773-774) | phiếu tiếp nhận và bảng đối chiếu lưu online **7 năm**; hình ảnh/chứng từ phụ trợ về tranh chấp hoặc giao hàng **3 năm** rồi cold archive | `doc_type` gắn policy lưu trữ đúng nhóm | test: mỗi loại chứng từ gắn đúng thời hạn |
| `FR-AUDIT-01` (RFP:710) | audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" kèm chủ thể, timestamp, before/after và lý do | ghi trong cùng biên; lịch sử của lô gộp cả thao tác thuộc thực thể đính kèm | test: đính kèm chứng từ → hiện trong lịch sử của lô |

**Con số nghiệp vụ:** spec này **không** chốt trần dung lượng, trần số tệp hay danh mục loại chứng từ (§9 Q2 và SC-08 §9 Q3); trần `pageSize` 100 là quyết định thiết kế bám `NFR-PERF-01`.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang | `GET` chi tiết và sổ số lượng | `PATCH` điều chỉnh | `POST` đính kèm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | cho phép | cho phép | cho phép | cho phép |
| ROLE-INTAKE | cho phép | cho phép | **404** `not_found` | cho phép |
| ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | cho phép | cho phép | **404** | **404** |

- **⚠️ Phạm vi đọc rộng ở trên là ĐỀ XUẤT THIẾT KẾ, không phải yêu cầu khách.** Căn cứ duy nhất là RFP:311 (§02-08):
  *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Lý do:
  §06-01 (RFP:527) đòi *"truy vết một mã lô hàng và một mã giao dịch duy nhất từ điểm phát sinh cho tới báo cáo ngày"*
  và `FIG-007` (RFP:529-535) là luồng xuyên suốt. Lô hàng **không** phải thông tin cá nhân theo RFP:883 nên đề xuất này
  không tạo căng thẳng với RFP:886 (APPI) như ở SC-05 và SC-06.
- **Đọc và ghi là hai trục khác nhau, và quyền ghi tách theo thao tác — có chủ đích.** Trục **đọc** không chặn theo
  vai (đề xuất). Trục **ghi**: `TBL-ROLE-01` (RFP:253) giao ROLE-SETTLEMENT việc *"Đối chiếu, chốt kỳ"* và liệt *"Điều
  chỉnh quyết toán"* là thao tác độ nhạy cao — căn cứ cho quyền `PATCH`. Còn `TBL-ROLE-01` (RFP:249) giao ROLE-INTAKE
  *"ghi nhận thông tin ban đầu"* — căn cứ cho việc vai tiếp nhận đính kèm được chứng từ mà **không** sửa được thuộc
  tính.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Ở màn này 404 áp cho
  **endpoint ghi**; mọi vai vẫn vào đọc được, và khối điều chỉnh đổi thành dòng nhắc vai trò phụ trách. Màn **không**
  cần maker-checker (`GOV-RULE-01`, RFP:601 chỉ áp cho quy tắc/biểu suất); điều chỉnh sau khi kỳ đã chốt **có**
  maker-checker nhưng đó là `FR-CORR-02` (RFP:657) ở SC-21.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Điều chỉnh thuộc tính | `adjust` | `before` = `{field: giá trị cũ}`; `after` = `{field: giá trị mới}`; `reason` bắt buộc; chủ thể; timestamp | FR-LOT-04 (RFP:635), FR-AUDIT-01 |
| Lần thử sửa bị chặn vì lock | `adjust_blocked_locked` | `after` = payload bị từ chối; `reason` = ngày nghiệp vụ đã lock; ghi **trước** khi trả 423 | FR-CORR-03 (RFP:658), BR-CLOSE-01 |
| Đính kèm chứng từ | `attach_document` | `after` = `{fileName, docType, fileSize}`; `reason` bắt buộc; **gắn về định danh lô** | FR-LOT-01, TBL-ATTACH-01 |
| Công bố bán | `publish` | `before`/`after` = trạng thái lô | FR-AUDIT-01, FIG-011 |
| Bị chặn vì thiếu quyền ghi | `denied_write_attempt` | chủ thể; vai; endpoint | FR-AUDIT-01, NFR-SEC-03 (RFP:811) |

Lịch sử trên màn gộp **bốn** loại việc: tiếp nhận lô, chuyển trạng thái, điều chỉnh thuộc tính, và **lần thử bị chặn**;
lượt đính kèm cũng thuộc lịch sử của lô này chứ không rơi sang thực thể khác — lọc theo đúng một loại thực thể thì bảng
chứng từ ngay trên nó liệt tệp mà lịch sử không có dòng tương ứng. Sổ số lượng (§2) và sổ kiểm toán là **hai thứ khác nhau**: một cái trả lời *"vì sao còn 120"*, một cái là bằng chứng cho `FR-AUDIT-02` (RFP:711).

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-PERF-01` (RFP:807) | tìm kiếm thông thường p95 ≤ 2 giây | năm khối đọc phải về trong một lần gọi có chỉ mục theo định danh lô; sổ số lượng và lịch sử phải phân trang chứ không tải hết |
| `NFR-PERF-02` (RFP:808) | `FIG-LOAD-01` (RFP:836-838): cao điểm **600 lô/ngày, 1.200 giao dịch/ngày** | một lô có thể có nhiều dòng sổ số lượng; phân trang là bắt buộc, không phải tuỳ chọn |
| `DR-RET-01` (RFP:813) | dữ liệu nghiệp vụ online **7 năm**; hình ảnh/chứng từ phụ trợ **3 năm** rồi cold storage | `doc_type` quyết định nhóm lưu trữ; chứng từ đã chuyển cold phải hiện trạng thái đó thay vì một đường dẫn lỗi — phục hồi trong tối đa 2 ngày làm việc (RFP:774) |
| `NFR-COMP-01` (RFP:817) | thao tác được trên tablet tại hiện trường | năm bảng phải cuộn ngang được mà không mất cột định danh |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — "Đã giữ cho giao dịch" tính theo giao dịch ở trạng thái nào?** Màn hiện ba số — ban đầu, đã giữ, khả dụng — và
  hiệu của chúng là cách người dùng tự kiểm `BR-LOT-02`; nhưng `FIG-012` (RFP:637) có cả "Chờ xác nhận" và "Đã chốt", và
  RFP **không nói** giữ số lượng xảy ra ở bước nào. Cần trước khi code vì hai cách cho hai con số khác nhau trên cùng
  một màn. Chọn sai: giữ từ lúc chờ xác nhận thì một giao dịch bị từ chối khoá tồn oan; giữ từ lúc chốt thì hai giao
  dịch cùng lúc có thể vượt tồn trước khi cửa kiểm kịp chạy.
- **Q2 — Danh mục loại chứng từ là gì, và loại nào thuộc nhóm lưu trữ 7 năm?** `TBL-ATTACH-01` (RFP:773-774) tách hai
  nhóm — *"Phiếu tiếp nhận, phiếu giao dịch, bảng đối chiếu"* lưu **7 năm**, *"Hình ảnh/chứng từ phụ trợ về tranh chấp
  hoặc giao hàng"* lưu **3 năm** rồi cold archive — nhưng **không cho danh mục** để phân loại một tệp cụ thể. Cần trước
  khi code vì cột `doc_type` và policy lưu trữ phụ thuộc câu này, và policy đã áp thì không đổi ngược được. Chọn sai:
  xếp một phiếu tiếp nhận vào nhóm 3 năm là **vi phạm `DR-RET-01`** ở năm thứ tư.
- **Q3 — "Chuẩn bị bán" của `FIG-011` là một hành vi riêng, hay việc ghi kết quả đánh giá cũng là việc công bố bán?**
  `FIG-011` (RFP:619-620) tách hai cạnh: `Đã 下見 → (chuẩn bị bán) → Công bố`; nhưng RFP **không mô tả** bước "chuẩn bị
  bán" ở đâu khác, không có yêu cầu `FR-*` nào cho nó, và `FIG-002` (RFP:226) chỉ có "Đăng ký lô hàng" ở 04:00. Cần
  trước khi code vì nó quyết định có endpoint công bố riêng hay không và ai được bấm. Chọn sai: gộp hai bước là gộp phán
  đoán chất lượng của người đánh giá với quyết định bán của vận hành chợ — hai vai khác nhau theo `TBL-ROLE-01`
  (RFP:250, 251) — và mất một điểm kiểm soát trước khi lô vào giao dịch.
- **Q4 — Lượt mở chứng từ có cần ghi dấu vết ai đã xem không?** `FR-AUDIT-01` (RFP:710) chỉ liệt tạo · sửa · phê duyệt ·
  lock · đổi quyền, không liệt việc đọc; nhưng RFP:886 (§09-06) đòi **log truy cập** áp dụng cho thông tin cá nhân và
  một số chứng từ có thể mang tên người. Cần trước khi code vì nó quyết định có ghi audit cho lượt xem. Chọn sai: không
  ghi thì thiếu bằng chứng khi tranh chấp về việc ai đã xem; ghi hết thì sổ kiểm toán phình tới mức `FR-AUDIT-02`
  (RFP:711) không đạt ngưỡng `NFR-PERF-01`.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Truy vết mọi lần điều chỉnh số lượng khả dụng | nửa sau `BR-LOT-02` (RFP:596) — sổ số lượng có `source_ref` và `available_after` | **không có sổ số lượng nào**; đường giữ và hoàn chỉ ghi lại giá trị mới vào lô và **không sinh dòng lịch sử nào** → không trả lời được vì sao lô còn 120 mà ban đầu 150, cũng không biết phần chênh đi vào giao dịch hay giao hàng nào | `src/lib/lots/availability-service.ts:48-77,84-110` | khác không chủ đích — **P0** |
| Kết quả đánh giá đọc từ chính bản ghi đánh giá | nghiệm thu `FR-LOT-02` (RFP:633) | màn **không query thực thể bản ghi đánh giá** (chỉ lô + lịch sử kiểm toán + đính kèm); kết quả chỉ tới qua `after.grade` của **một dòng kiểm toán** — mất dòng đó là mất kết quả trên màn dù bản ghi vẫn còn, và **không có** người xác nhận cùng thời điểm ghi nhận ở đâu | `src/app/(app)/lots/[id]/page.tsx:28-34`; `src/components/audit/audit-field-maps.ts:11` | khác không chủ đích — **P0** |
| Năm trạng thái `FIG-011` | `FE-013` khai "theo state machine FIG-011" | bốn trạng thái, **thiếu "Đã 下見"** — dải tiến trình trên màn cũng chỉ hiện được bốn bước | `supabase/migrations/20260904090200_lot.sql:12-13`; `src/components/pipeline/stage-progress-bar.tsx:8-10` | khác không chủ đích |
| Bước "chuẩn bị bán" là hành vi riêng | `FIG-011` (RFP:619-620) tách hai cạnh | **không tồn tại như hành vi riêng** — ghi kết quả đánh giá đưa lô thẳng sang trạng thái công bố, nên **ghi thẩm định *chính là* công bố bán** | `src/app/api/lots/[id]/mekiki/route.ts:45-51` | cần khách chốt (§9 Q3) |
| Ghi audit đúng cặp before/after | nghiệm thu `FR-LOT-04` (RFP:635) | **không so giá trị cũ khi ghi** — hai vai đối chiếu sửa cùng một trường gần nhau thì người sau ghi đè người trước, và dòng lịch sử của người sau mang giá trị "trước" đã cũ → **dấu vết kiểm toán thành sai**, đúng thứ `FR-LOT-04` tồn tại để bảo vệ | `src/app/api/lots/[id]/route.ts:59,83-91` | khác không chủ đích — **P0** |
| Ngày nghiệp vụ và cờ lock hiện trên màn | phải trả ra client trước khi nhập | **không hiển thị ở đâu** — người dùng nhận 423 mà không biết lô thuộc ngày nào, cũng không biết ngày đó lock lúc nào; form vẫn mở đầy đủ rồi mới báo bị chặn sau khi gửi | `src/app/(app)/lots/[id]/page.tsx:53-60`; `src/components/lots/lot-availability-fields.tsx:20-30` | khác không chủ đích |
| Đính kèm lại chứng từ lỗi từ SC-08 | đường bù thật ở màn này | màn **chỉ có bảng đọc**, không có ô đính kèm nào — mà SC-08 lại chỉ người dùng sang đây khi chứng từ lỗi; chứng từ bắt buộc coi như mất | `src/components/lots/lot-attachments-card.tsx:12-52`; `src/lib/i18n/dictionaries/vi/lots.json:33` | khác không chủ đích |
| Lịch sử gộp cả lượt đính kèm | một lô một dòng thời gian | lịch sử lọc theo đúng một loại thực thể nên **không thấy** dòng đính kèm nào, dù bảng chứng từ ngay trên nó đang liệt tệp | `src/lib/lots/lot-queries.ts:29-30`; `src/lib/lots/attach-intake-doc.ts:65-72` | khác không chủ đích |
| Ba mã lỗi riêng cho ba nguyên nhân | mỗi mã một điều kiện | `field` lạ, giá trị xấu và thiếu lý do dùng **cùng một mã** → cùng một câu trên màn | `src/app/api/lots/[id]/route.ts:24-37,56` | khác không chủ đích |
| Cột loại chứng từ | `doc_type` để gắn policy lưu trữ | không có cột nào cho loại chứng từ theo nghiệp vụ | `supabase/migrations/20260907090000_lot_attachment.sql:14-23` | cần khách chốt (§9 Q2) |
| Danh sách trắng hẹp; số lượng ngoài phạm vi sửa tay | đúng như vậy | **khớp** — đúng hai trường trong danh sách trắng, hai cột số lượng cố ý bị loại, và mọi thay đổi số lượng đi qua đường giữ/hoàn có so-rồi-ghi | `src/app/api/lots/[id]/route.ts:9-13`; `src/lib/lots/availability-service.ts:48-77` | khác có chủ đích |
| Kiểm số lượng trước cả giao dịch và giao hàng | `FR-LOT-03` (RFP:634) — cả **hai** kênh | **khớp cả hai** — cửa kiểm tồn tồn tại ở cả đường chốt giao dịch và đường ghi nhận giao hàng | `src/lib/lots/availability-service.ts:9-31` | khớp |
| Lock chặn ở tầng dữ liệu | tầng 2 phủ mọi caller | `lot` **cố tình** không có trigger lock (lô nhận ngày đã lock vẫn bán ngày sau); nên chốt duy nhất là kiểm lock ở tầng ứng dụng — **một đường ghi mới quên gọi hàm đó là lọt hoàn toàn**. Đánh đổi có chủ đích nhưng phải khai, không phải bảo đảm hai tầng | `supabase/migrations/20260904090200_lot.sql:18-20`; `src/lib/lots/lot-queries.ts:45-59` | khác có chủ đích |
| Nhãn nguồn của phạm vi đọc | đề xuất thiết kế, dẫn RFP:311 | RLS mở cho mọi vai đang hoạt động, ghi chú "có chủ đích theo **FR-601**" — **`FR-601` là mã nội bộ LAB-3, grep RFP ra 0 hit; không phải yêu cầu khách** | `supabase/migrations/20260904090900_rls_core.sql:33-40` | khác không chủ đích (nhãn sai nguồn) |

## 11. Dẫn chứng

- RFP:226 — `FIG-002` "Đăng ký lô hàng" ở 04:00 · RFP:249, 250, 251, 253 — `TBL-ROLE-01` các dòng ROLE-INTAKE,
  ROLE-JUDGE, ROLE-TRADE, ROLE-SETTLEMENT · RFP:311 — §02-08 việc **đề xuất** cơ chế phân quyền
- RFP:527, 529-535 — §06-01 truy vết một mã lô xuyên suốt và `FIG-007` · RFP:596-597 — `BR-LOT-02`, `BR-CLOSE-01`
- RFP:601 — `GOV-RULE-01` · RFP:603-604 — `D-LOT`, `D-TRADE` · RFP:616-621 — `FIG-011`; RFP:619-620 hai cạnh
- RFP:632-635 — `FR-LOT-01/02/03/04` · RFP:637 — `FIG-012` · RFP:656-658 — `FR-CORR-01/02/03`
- RFP:710-711 — `FR-AUDIT-01/02` · RFP:773-774 — `TBL-ATTACH-01` hai nhóm lưu trữ · RFP:807, 808, 811, 812, 813, 817,
  836-838, 883, 886 — `NFR-PERF-01/02`, `NFR-SEC-03/04`, `DR-RET-01`, `NFR-COMP-01`, `FIG-LOAD-01`, §09-06 APPI
- Feature List `FE-011`, `FE-012`, `FE-013`, `FE-041` · `docs/lab4/20-architecture-design.md` § 4.2 (`FIG-011` thiếu
  một trạng thái) · `docs/lab4/10-database-diagram.md` § 3.4 (vòng so-rồi-ghi giữ `available_qty` không âm)
- `docs/lab4/spec/SC-10-chi-tiet-lo-hang-va-dieu-chinh.md` — bản as-built dùng cho §10
