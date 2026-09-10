# SC-31 — Quản lý file đính kèm · Spec BE

| | |
|---|---|
| FE liên quan | FE-044 (Quản lý file đính kèm) |
| FN | FN-14 (Quản trị vận hành và quản lý tài liệu đính kèm) |
| Ưu tiên | P1 |
| Yêu cầu khách | TBL-ATTACH-01, DR-RET-01, DR-IMAGE-01, §09-06 (APPI), NFR-SEC-04, NFR-PERF-01 |
| Miền dữ liệu | D-LOT, D-DELIVERY, D-SETTLE |
| State machine | — (RFP không có `FIG-*` cho vòng đời tầng lưu trữ; xem mục 4) |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

BE phải cung cấp: (a) đường đọc danh sách chứng từ **xuyên lô hàng và xuyên loại tài liệu**, lọc theo khoảng ngày tải lên · loại tài liệu · nhóm lưu trữ · lô hàng · người tải lên, cộng một bộ lọc dựng sẵn cho nhóm **quá hạn online mà chưa chuyển tầng nguội**; (b) đường **phân loại** một chứng từ — không có phân loại tự động, `DR-IMAGE-01` (RFP:794) đòi giữ yêu cầu con người xác nhận; (c) đường **đánh dấu chuyển tầng nguội** theo `DR-RET-01` (RFP:813); (d) đường **yêu cầu phục hồi** một chứng từ đã ở tầng nguội với cam kết tối đa **2 ngày làm việc** (`TBL-ATTACH-01`, RFP:774); (e) đường sinh **liên kết có chữ ký, thời hạn ngắn** để đọc nội dung file.

BE **không** làm ở màn này: **tải lên** chứng từ (thuộc màn tiếp nhận lô hàng và màn yêu cầu điều chỉnh), **xoá** chứng từ (là bằng chứng nghiệp vụ — hết hạn online thì chuyển tầng, không xoá), và **không** phán định chất lượng hay tự gán nhãn từ nội dung ảnh (`DR-IMAGE-01`).

Ba ràng buộc bảo mật chi phối toàn spec, không thương lượng: (1) **đường dẫn lưu trữ của file không bao giờ ra khỏi phía máy chủ** — không ra response, không ra bản xuất; (2) mọi đường đọc nội dung đi qua **liên kết có chữ ký do máy chủ sinh, thời hạn ngắn, kho lưu riêng tư**; (3) một liên kết hỏng **không** làm cả danh sách thất bại, và phải phân biệt *chưa sinh được liên kết* với *file không còn tồn tại*.

## 2. Hợp đồng API

### `GET /api/attachments`

| | |
|---|---|
| Thoả yêu cầu | FE-044 · TBL-ATTACH-01 · DR-RET-01 · NFR-PERF-01 |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SETTLEMENT, ROLE-SYS-ADMIN (mục 6) |
| Idempotent | có (đọc thuần) |

**Request** — mọi tham số ở `query`, không tham số nào bắt buộc.

| Tham số | Kiểu | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|
| `uploadedFrom`, `uploadedTo` | date | `YYYY-MM-DD`; from ≤ to | FE-044 (field #1, #2) |
| `docType` | enum | tập giá trị lấy từ cột 1 của bảng §08-04; **do người đặt**, không suy tự động | TBL-ATTACH-01, DR-IMAGE-01 |
| `retentionGroup` | enum | `7 năm` \| `3 năm`; là giá trị **dẫn xuất** từ `docType`, không nhận độc lập nếu `docType` đã đặt | DR-RET-01 (RFP:813) |
| `lotId` | string | mã lô không tồn tại thì trả danh sách rỗng, **không** 4xx | FE-044 (field #5) |
| `uploadedBy` | uuid | người tải lên | FE-044 (field #6) |
| `overdueOnlineOnly` | boolean | bộ lọc dựng sẵn: đã quá hạn online **và** chưa chuyển tầng nguội | DR-RET-01 |
| `page`, `pageSize` | integer | phân trang **phía server**; mặc định và trần ở mục 9 | NFR-PERF-01 |

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `items[].fileName`, `items[].mimeType`, `items[].fileSize` | string, string, integer | Tên file, loại MIME, dung lượng theo byte (> 0) |
| `items[].docType`, `items[].retentionGroup` | enum \| null | Loại tài liệu và nhóm lưu trữ dẫn xuất; `null` khi **chưa phân loại** |
| `items[].uploadedAt`, `items[].uploaderDisplayName` | timestamp, string | Ngày tải lên; **tên hiển thị** người tải lên — rỗng thì trả `không rõ`, và **không** trả thư điện tử (§09-06, RFP:886) |
| `items[].onlineExpiresAt` | date \| null | **Dẫn xuất**: ngày tải lên + hạn của nhóm lưu trữ; `null` khi chưa phân loại |
| `items[].storageTier` | enum | `online` \| `cold` |
| `items[].retrievalTime` | enum | `ngay` cho tầng online; `tối đa 2 ngày làm việc` cho tầng nguội (RFP:774) |
| `items[].overdueOnline` | boolean | Quá hạn online mà vẫn ở tầng online |
| `items[].restoreRequestedAt`, `items[].restoreDueAt` | timestamp \| null | Có yêu cầu phục hồi đang chờ hay không |
| `total`, `truncated` | integer, boolean | Tổng số khớp; `truncated = true` khi vượt trần |

Response **không** mang đường dẫn lưu trữ của file dưới bất kỳ trường nào — đó là ràng buộc bảo mật số 1, không phải một tuỳ chọn hiển thị.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 400 | `RANGE_INVALID` | `uploadedFrom` > `uploadedTo` | FE-044 |
| 404 | — | Vai trò gọi không được vào màn — chặn **vào trang** | RFP:311 |
| 422 | `DOC_TYPE_UNKNOWN` | `docType` không thuộc tập giá trị của §08-04 | TBL-ATTACH-01 |
| 422 | `RETENTION_GROUP_CONFLICT` | `retentionGroup` không khớp giá trị dẫn xuất từ `docType` đã đặt | DR-RET-01 |
| 422 | `PAGE_SIZE_EXCEEDED` | `pageSize` vượt trần do server đặt | NFR-PERF-01 |

**Tác dụng phụ** — không ghi bảng nào.

### `GET /api/attachments/{id}/signed-url`

| | |
|---|---|
| Thoả yêu cầu | FE-044 · NFR-SEC-04 · §09-06 |
| Xác thực · Vai trò được gọi | bắt buộc · như đường danh sách |
| Idempotent | có — mỗi lần gọi sinh một liên kết mới với thời hạn mới, không đổi dữ liệu |

**Request** — `id` ở `path`, uuid, bắt buộc.

**Response 2xx** — `url` · `expiresAt`. Thời hạn do **server** đặt; client **không** truyền được thời hạn.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `ATTACHMENT_NOT_FOUND` | `id` không tồn tại trong cơ sở dữ liệu | TBL-ATTACH-01 |
| 404 | — | Vai trò gọi không được vào màn | RFP:311 |
| 409 | `TIER_IS_COLD` | Chứng từ đang ở tầng nguội nên không có đường đọc trực tiếp | DR-RET-01 |
| 502 | `SIGNING_FAILED` | Không sinh được liên kết (kho lưu không phản hồi) — **khác** với ca file không còn | NFR-SEC-04 |
| 410 | `OBJECT_MISSING` | Bản ghi tồn tại nhưng đối tượng trong kho lưu **không còn** — ca file mồ côi | TBL-ATTACH-01 |

Hai mã cuối phải phân biệt được: một cái là lỗi tạm và cho thử lại, một cái là dữ liệu đã mất và cần xử lý vận hành.

**Tác dụng phụ** — có ghi vết cho hành vi sinh liên kết hay không là mục 9 câu 4.

### Ba đường ghi vòng đời: `PATCH .../{id}/classification`, `POST .../{id}/move-to-cold`, `POST .../{id}/restore`

| | |
|---|---|
| Thoả yêu cầu | FE-044 · TBL-ATTACH-01 · DR-RET-01 · DR-IMAGE-01 |
| Xác thực · Vai trò được gọi | bắt buộc · `classification`: ROLE-SETTLEMENT và ROLE-SYS-ADMIN. Hai đường còn lại: **chỉ ROLE-SYS-ADMIN** (vận hành policy lưu trữ) |
| Idempotent | `classification` và `move-to-cold`: có — đặt lại cùng giá trị trả 200 không đổi gì. `restore`: **không** — chặn yêu cầu trùng bằng 409 |

**Request** — `id` ở `path`, uuid, bắt buộc ở cả ba. `classification` nhận `docType` (enum, bắt buộc) và `reason` (string, mục 9 câu 8); `move-to-cold` nhận `reason`; `restore` không có body. Server tự quyết `retentionGroup` và `onlineExpiresAt` từ `docType` — **client không đặt được hai giá trị này**, đó là cách chặn hai nguồn chân lý; `restoreDueAt` cũng do server tính theo tối đa **2 ngày làm việc** (RFP:774).

**Response 2xx** — `classification`: `id` · `docType` · `retentionGroup` · `onlineExpiresAt`. `move-to-cold`: `id` · `storageTier` · `movedAt`. `restore`: `id` · `restoreRequestedAt` · `restoreDueAt`.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 403 | `ROLE_FORBIDDEN` | Vai trò gọi không được ghi — đường **ghi** từ chối tường minh | RFP:311 |
| 404 | `ATTACHMENT_NOT_FOUND` | `id` không tồn tại | TBL-ATTACH-01 |
| 422 | `DOC_TYPE_UNKNOWN` | `docType` không thuộc tập giá trị của §08-04 | TBL-ATTACH-01 |
| 422 | `DOC_TYPE_OUT_OF_SCOPE` | `docType` thuộc nhóm hồ sơ dự án — ngoài phạm vi màn (RFP:775) | TBL-ATTACH-01 |
| 409 | `ALREADY_COLD` | Đổi phân loại khi chứng từ đã chuyển tầng nguội | DR-RET-01 |
| 409 | `NOT_CLASSIFIED` | `move-to-cold` khi chứng từ chưa phân loại nên chưa suy được hạn online | DR-RET-01 |
| 409 | `STILL_WITHIN_ONLINE_WINDOW` | `move-to-cold` khi chứng từ còn trong hạn lưu online | DR-RET-01 |
| 409 | `NOT_COLD` | `restore` khi chứng từ đang ở tầng online | DR-RET-01 |
| 409 | `RESTORE_ALREADY_PENDING` | `restore` khi đã có một yêu cầu phục hồi đang chờ | TBL-ATTACH-01 |
| 502 | `TIER_BACKEND_UNAVAILABLE` | Tầng lưu trữ nguội không phản hồi | NFR-OPS-01 |

**Tác dụng phụ** — ghi các cột vòng đời tương ứng và một dòng audit cho mỗi hành động (mục 7). **Không** chạm nội dung file và **không xoá** file trong bất kỳ ca nào — không tồn tại đường ghi delete.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Chứng từ đính kèm | tên file, loại MIME, dung lượng | Dung lượng **> 0**; loại MIME kiểm ở **phía máy chủ** | tầng 1 (CHECK) + tầng 3 | Có |
| Chứng từ đính kèm | đường dẫn lưu trữ | **Chỉ dùng ở phía máy chủ** để sinh liên kết có chữ ký; không ra response, không ra bản xuất | tầng 3 (hợp đồng API) | Có, và đang giữ đúng |
| Chứng từ đính kèm | lô hàng liên quan, người tải lên, thời điểm tải lên | Người tải lên cho phép rỗng; rỗng thì phía đọc trả `không rõ` | tầng 1 (FK / null được) | Có |
| Chứng từ đính kèm | **loại tài liệu** | Tập giá trị theo cột 1 bảng §08-04; **do người đặt**, không suy tự động (RFP:794) | tầng 1 (CHECK) | **Chưa có** |
| Chứng từ đính kèm | **nhóm lưu trữ**, **hạn lưu online** | **Dẫn xuất** từ loại tài liệu theo §08-04; client không đặt được | tầng 2 (trigger) hoặc tầng 3 (chỉ một đường ghi) | **Chưa có** |
| Chứng từ đính kèm | **tầng lưu trữ** + thời điểm chuyển; **yêu cầu phục hồi** + hạn dự kiến | `online` \| `cold`, chỉ chuyển khi đã phân loại và quá hạn online; không cho yêu cầu phục hồi trùng khi đang chờ | tầng 1 (CHECK + unique một phần) + tầng 3 (guard) | **Chưa có** |
| Kho lưu chứng từ | — | Kho lưu **riêng tư**, không có đường công khai nào | tầng 1 (cấu hình kho) + policy | Có |
| Tầng lưu trữ nguội; quá trình đánh dấu tới hạn | — | Phục hồi trong **tối đa 2 ngày làm việc** (RFP:774); gom được nhóm quá hạn online mà chưa chuyển tầng | hạ tầng + tiến trình chạy ngoài request | **Chưa có** |

**Điều đã chạy thật, đừng ước lượng lại**: bảng chứng từ, kho lưu riêng tư, trần dung lượng và danh sách loại MIME kiểm ở phía máy chủ, đọc lại bằng liên kết có chữ ký thời hạn ngắn. **Điều còn thiếu** là ba nhóm cột ở trên, tầng lưu trữ nguội, và quá trình đánh dấu tới hạn.

Bảng chứng từ hiện là bảng **chỉ-thêm tuyệt đối** (không có đường ghi update hay delete ở bất kỳ đâu). Ba đường ghi ở mục 2 cần **một đường ghi hẹp đúng các cột vòng đời** — cố ý hẹp, **không** mở đường ghi chung, và tuyệt đối không mở đường xoá.

## 4. Vòng đời trạng thái

RFP không có `FIG-*` cho vòng đời tầng lưu trữ. Vòng đời dưới đây là **đề xuất thiết kế**, dựng trực tiếp từ hai dòng của `TBL-ATTACH-01` (RFP:773-774) và từ `DR-RET-01` (RFP:813).

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | Tải lên (màn khác) | `chưa phân loại` · tầng `online` | Dung lượng > 0; loại MIME thuộc danh sách | vai trò ghi của màn tải lên | (không thuộc màn này) |
| `chưa phân loại` | Phân loại | `đã phân loại` (nhóm và hạn online **dẫn xuất**) | Loại tài liệu thuộc §08-04 và không thuộc nhóm hồ sơ dự án | ROLE-SETTLEMENT, ROLE-SYS-ADMIN | 422 `DOC_TYPE_UNKNOWN` / `DOC_TYPE_OUT_OF_SCOPE` |
| `chưa phân loại`, hoặc `đã phân loại` mà còn trong hạn | Đánh dấu chuyển tầng nguội | — | **Chặn**: chưa biết nhóm thì không biết hạn; còn trong hạn thì chưa được chuyển | — | 409 `NOT_CLASSIFIED` / `STILL_WITHIN_ONLINE_WINDOW` |
| `đã phân loại` · quá hạn | (không làm gì) | `quá hạn online, chưa chuyển` | Cờ dẫn xuất; gom được thành danh sách | — | — |
| `quá hạn online, chưa chuyển` | Đánh dấu chuyển tầng nguội | tầng `cold` · thời gian truy xuất `tối đa 2 ngày làm việc` | Người bấm là ROLE-SYS-ADMIN | ROLE-SYS-ADMIN | 403 `ROLE_FORBIDDEN` |
| tầng `cold` | Yêu cầu phục hồi | `đang chờ phục hồi` (hạn dự kiến = **2 ngày làm việc**) | Chưa có yêu cầu nào đang chờ | ROLE-SYS-ADMIN | 409 `RESTORE_ALREADY_PENDING` |
| tầng `cold` | Đổi phân loại | — | **Chặn**: đã chuyển tầng thì phân loại đã cố định | — | 409 `ALREADY_COLD` |
| bất kỳ trạng thái | Xoá | — | **Chặn**: chứng từ là bằng chứng nghiệp vụ | — | không có đường ghi |

Guard dễ mất nhất là hai cạnh bị chặn giữa bảng: đánh dấu chuyển tầng cho một chứng từ **chưa phân loại** chính là cách xếp sai nhóm — và xếp sai nhóm nghĩa là chuyển tầng nguội **sớm 4 năm**, mất bằng chứng không lấy lại được. Cạnh cuối cũng là guard, không phải thiếu chức năng.

Chứng từ đính kèm **được miễn khoá ngày nghiệp vụ có chủ đích**: một lô nhận vào ngày đã lock vẫn bán ngày sau, nên đây là bằng chứng *về* một lô chứ không phải một sự kiện *của* ngày đã lock. Vì vậy màn không bao giờ trả mã lỗi khoá ngày.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| TBL-ATTACH-01 (RFP:773) | "Phiếu tiếp nhận, phiếu giao dịch, bảng đối chiếu — **7 năm** — Theo policy lưu trữ của Chủ đầu tư" | Nhóm lưu trữ dẫn xuất từ loại tài liệu | Mọi chứng từ nhóm này có hạn online = ngày tải lên + 7 năm |
| TBL-ATTACH-01 (RFP:774) | "Hình ảnh/chứng từ phụ trợ về tranh chấp hoặc giao hàng — **3 năm** — **Cold archive, phục hồi trong tối đa 2 ngày làm việc**" | Vòng đời mục 4 + trường thời gian truy xuất | Chứng từ tầng nguội hiện đúng mốc 2 ngày làm việc trước khi người dùng bấm |
| TBL-ATTACH-01 (RFP:775) | "Tài liệu rehearsal migration và hồ sơ nghiệm thu — Theo vòng đời dự án" | **Ngoài phạm vi màn** — 422 `DOC_TYPE_OUT_OF_SCOPE` | Không chứng từ nhóm này nào được phân loại trong hệ |
| DR-RET-01 (RFP:813) | "Dữ liệu nghiệp vụ tra cứu online lưu **7 năm**; hình ảnh/chứng từ phụ trợ lưu online **3 năm** rồi chuyển sang **cold storage**" | Hai nhóm lưu trữ + đường chuyển tầng | Nghiệm thu là **kiểm tra policy lưu trữ và diễn tập restore từ lưu trữ** |
| DR-IMAGE-01 (RFP:794) | Chủ đầu tư "**không yêu cầu** chức năng AI tự động phán định chất lượng"; nếu có gán nhãn thì "**duy trì yêu cầu con người xác nhận**" | Loại tài liệu chỉ đặt được qua đường ghi có chủ thể | Không tồn tại đường nào tự đặt loại tài liệu |
| §09-06 (RFP:886) | "Mã hoá, **kiểm soát truy cập theo vai trò (RBAC) và log truy cập**… phải **nhất quán với policy lưu trữ DR-RET-01**" | Chặn vào màn theo vai trò; không trả thư điện tử | Không trường nào của response mang thư điện tử |
| NFR-SEC-04 (RFP:812) | "Dữ liệu truyền phải dùng **TLS**. Backup và secret phải được bảo vệ tách biệt khỏi source code." | Liên kết có chữ ký, thời hạn ngắn, kho lưu riêng tư | Không có đường đọc file nào ngoài liên kết có chữ ký |

**Con số chưa có nguồn**: thời hạn của liên kết có chữ ký, số dòng mỗi trang và trần kết quả, và định nghĩa "2 ngày làm việc" theo lịch nào. RFP cho **ba** con số cho màn này — 7 năm, 3 năm, tối đa 2 ngày làm việc (RFP:773-774, RFP:813) — và không cho ba con số kia. Cả ba ở mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào màn | Đọc danh sách | Sinh liên kết xem file | Phân loại | Chuyển tầng nguội / phục hồi |
|---|---|---|---|---|---|
| ROLE-SETTLEMENT | cho phép (actor chính) | cho phép | cho phép | cho phép | từ chối · **403** `ROLE_FORBIDDEN` |
| ROLE-SYS-ADMIN | cho phép (vận hành policy) | cho phép | cho phép | cho phép | cho phép |
| Năm vai còn lại: **ROLE-INTAKE** · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-RULE-ADMIN | từ chối · **404** | từ chối · 404 | từ chối · 404 | từ chối · **403** | từ chối · **403** |

Bảy vai trò lấy từ `TBL-ROLE-01` (RFP:249-255). ROLE-SETTLEMENT là actor chính vì bộ phận đối chiếu là người dùng chứng từ để đối chiếu; ROLE-SYS-ADMIN giữ các hành động vòng đời vì đó là vận hành policy lưu trữ (RFP:255 — "log vận hành"). **ROLE-INTAKE không vào được**: nó là vai trò **ghi** chứng từ lô hàng, không phải vai trò **quản lý lưu trữ** — và vẫn tải lên được qua màn tiếp nhận lô hàng. Đây là chỗ dễ nhầm nhất của ma trận.

**Đọc và ghi là hai trục khác nhau, và trả hai mã khác nhau.** Trục **ghi** (ba hành động vòng đời) chặn theo vai trò và từ chối tường minh bằng **403** vì người gọi đã biết tài nguyên tồn tại. Trục **đọc** thì RFP **không** quy định ai đọc được bảng nào; RFP:311 (§02-08) chỉ nói *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Vậy phạm vi đọc ở đây là **đề xuất của bên dự thầu**, không phải yêu cầu khách. Đề xuất: **chặn vào màn** bằng **404**, vì chứng từ tiếp nhận và bằng chứng tranh chấp có thể chứa thông tin cá nhân của người tham gia — cùng với audit, đây là nơi dữ liệu nhạy tập trung nhất của hệ.

Hai điều phải khai để đề xuất này không bị đọc quá mạnh: (1) chính sách đọc mở hiện hành của hệ — mọi vai trò đang hoạt động đọc được **cả metadata và cả nội dung file** — cũng là **đề xuất của bên dự thầu**, không phải yêu cầu khách, và nó **chống lại** RFP:886 (§09-06, APPI) vốn đòi RBAC và log truy cập **nhất quán với chính policy `DR-RET-01`**; đây là chỗ đề xuất của ta chống một yêu cầu khách bằng chữ, và chúng tôi không chọn hộ; (2) gác màn ở tầng route **không** làm file thành bí mật ở tầng dữ liệu — nó chỉ bỏ đi một giao diện duyệt hàng loạt. Cả hai đi vào mục 9 câu 3.

**Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Phân loại chứng từ | `classify_attachment` | before: loại tài liệu cũ (có thể rỗng) · after: loại mới, nhóm lưu trữ và hạn online dẫn xuất · reason: lý do nếu có | FR-AUDIT-01 (RFP:710) |
| Đánh dấu chuyển tầng nguội | `move_attachment_to_cold` | before: tầng `online`, hạn online · after: tầng `cold`, thời điểm chuyển · reason: lý do nếu có | FR-AUDIT-01, DR-RET-01 |
| Yêu cầu phục hồi | `request_attachment_restore` | after: thời điểm yêu cầu, hạn dự kiến | FR-AUDIT-01 |
| Sinh liên kết xem file | `read_attachment` — **chưa quyết định có ghi hay không** | after: mã chứng từ đã mở | §09-06 (RFP:886 — "log truy cập") |

Ba dòng đầu là bắt buộc: cả ba là thao tác **sửa** thuộc danh sách `FR-AUDIT-01` (RFP:710). Dòng thứ tư là **đề xuất có điều kiện**: RFP:886 đòi "log truy cập" cho thông tin cá nhân, nhưng ghi cả hành vi đọc thì mỗi lần dựng danh sách sinh nhiều dòng vết và bảng vết phình rất nhanh. Mục 9 câu 4.

Không có dòng nào cho hành vi **xoá** vì không tồn tại đường ghi delete.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| DR-RET-01 (RFP:813) | Nghiệp vụ online 7 năm; chứng từ phụ trợ 3 năm rồi tầng nguội; nghiệm thu bằng **kiểm tra policy và diễn tập restore** | Là lý do màn tồn tại. Không phân loại được thì không thi hành được policy, và nghiệm thu không có gì để kiểm |
| NFR-SEC-04 (RFP:812) | TLS cho dữ liệu truyền; secret tách khỏi mã nguồn | Liên kết có chữ ký, thời hạn ngắn, kho lưu riêng tư; thông tin xác thực tầng lưu trữ nguội là secret |
| §09-06 / APPI (RFP:886) | Mã hoá, RBAC và log truy cập cho thông tin cá nhân, **nhất quán với `DR-RET-01`** | Chặn vào màn theo vai trò; không trả thư điện tử; log truy cập là câu hỏi mở (mục 7) |
| NFR-PERF-01 (RFP:807) | Tìm kiếm thông thường p95 ≤ 2 giây | Phân trang phía server **từ đầu**: số chứng từ tăng theo số lô nhân số chứng từ mỗi lô, nên danh sách không giới hạn sẽ vượt ngưỡng |
| NFR-OPS-01 (RFP:814) và NFR-COMP-01 (RFP:817) | Giám sát lỗi batch và lỗi vận hành; thao tác được trên tablet tại hiện trường | Quá trình đánh dấu tới hạn và tầng nguội đều cần alert, và số chứng từ quá hạn chưa chuyển là một chỉ số vận hành; bảng mười cột phải cuộn ngang trong khung riêng, và thời hạn liên kết ngắn có thể quá ngắn cho mạng hiện trường (mục 9 câu 5) |

## 9. Câu hỏi cho chủ đầu tư

- **Tập giá trị của loại tài liệu gồm những giá trị nào?** Cần trước khi code vì nó là ràng buộc giá trị ở tầng 1 và là điều kiện của mọi thứ khác trên màn. `TBL-ATTACH-01` (RFP:773-775) chia **ba nhóm** nhưng **không cho tập giá trị dữ liệu**: hàng thứ nhất gộp ba loại chứng từ vào một dòng, và hàng thứ ba (tài liệu diễn tập chuyển đổi, hồ sơ nghiệm thu) là hồ sơ dự án chứ không phải dữ liệu chạy trong hệ. Sai thì xếp sai nhóm, và xếp sai nhóm là hoặc chuyển tầng nguội **sớm 4 năm** — mất bằng chứng không lấy lại được — hoặc giữ online quá hạn.
- **Màn quản một kho chứng từ hay hai?** Cần trước khi code vì nó quyết định `GET /api/attachments` đọc từ đâu. Hiện chứng từ nằm ở **hai kho tách nhau**: chứng từ tiếp nhận lô hàng, và bằng chứng của yêu cầu điều chỉnh. Quản một kho thì policy chỉ phủ một nửa — và **bằng chứng tranh chấp, đúng nhóm 3 năm mà RFP:774 gọi tên, lại ở nửa không được quản**. Sai thì `DR-RET-01` chỉ được thi hành cho một nửa dữ liệu.
- **Ai được duyệt toàn bộ chứng từ, và có siết chính sách đọc ở tầng dữ liệu không?** Cần trước khi dựng vì đây là **quyết định kiến trúc**, chung một quyết định với SC-30, và là chỗ tài liệu khách kéo về hai phía: RFP:311 (§02-08) **giao cho bên dự thầu đề xuất** cơ chế phân tách quyền — không có yêu cầu đọc mở nào; RFP:886 (§09-06, APPI) đòi RBAC và log truy cập, và đòi **nhất quán với chính policy `DR-RET-01`**. Chính sách đọc mở hiện hành — cho mọi vai trò đang hoạt động đọc cả metadata và cả nội dung file — là **đề xuất của bên dự thầu chống lại một yêu cầu khách bằng chữ**; chúng tôi khai đúng bản chất và không chọn hộ. Đánh đổi: siết quá thì phá đường đọc chứng từ mà các màn chi tiết đang dùng; mở quá thì mọi vai trò duyệt được toàn bộ bằng chứng tranh chấp.
- **Có ghi vết cho hành vi mở hoặc tạo lại liên kết xem file không?** Cần trước khi code vì nó đổi cả mục 7 và khối lượng dữ liệu. RFP:886 đòi "log truy cập" cho thông tin cá nhân; `FR-AUDIT-01` (RFP:710) **không** liệt hành vi đọc. Ghi thì mỗi lần dựng danh sách sinh nhiều dòng vết; không ghi thì mất vết ai đã xem bằng chứng nào.
- **Thời hạn của liên kết có chữ ký là bao nhiêu?** Cần trước khi code vì đây là **biện pháp duy nhất** đang có chống chia sẻ lại liên kết. RFP không cho con số. Đề xuất của chúng tôi: **không nới** thời hạn đang dùng ở màn chi tiết lô hàng cho tiện màn này. Nhưng `NFR-COMP-01` (RFP:817) đòi thao tác được trên tablet tại hiện trường, nơi mạng chậm — nên có thể cần con số khác kèm biện pháp bù. Sai thì hoặc liên kết hết hạn giữa lúc dùng, hoặc mở một cửa chia sẻ lại.
- **"Tối đa 2 ngày làm việc" tính theo lịch nào, và mốc bắt đầu là thời điểm yêu cầu hay đầu ngày làm việc kế tiếp?** Cần trước khi code vì `restoreDueAt` ở mục 2 là một cam kết với người dùng. RFP:774 cho con số nhưng không cho định nghĩa ngày làm việc; chợ có ngày nghiệp vụ riêng (khung 02:00–10:00 JST, RFP:804). Sai thì cam kết trên màn lệch với thực tế vận hành.
- **Số dòng mỗi trang và trần kết quả là bao nhiêu?** Cần trước khi code vì `NFR-PERF-01` (RFP:807) là ngưỡng phải đạt và số chứng từ tăng theo số lô nhân số chứng từ mỗi lô. RFP không cho con số. Sai thì hoặc chặn người dùng ở một trần quá thấp, hoặc vượt ngưỡng khi dữ liệu lớn.
- **Ba hành động vòng đời có bắt buộc ghi lý do không, và có cần đường chạy theo lô không?** Cần trước khi code vì nó đổi hợp đồng API. `FR-AUDIT-01` (RFP:710) đòi reason cho thao tác **sửa**, và cả ba hành động này là sửa — nhưng RFP không nói cụ thể; đánh dấu chuyển tầng từng file một cho hàng nghìn file quá hạn là không khả thi nên đường chạy theo lô có thể là nhu cầu thật. Sai thì hoặc thêm ma sát vô ích, hoặc vận hành không làm nổi công việc policy đòi.
- **Đối chiếu kho lưu với cơ sở dữ liệu có thuộc màn này không?** Cần trước khi dựng vì đây là **nơi duy nhất** phát hiện được file mồ côi — bản ghi còn mà đối tượng trong kho lưu đã mất, hoặc ngược lại. Mã lỗi `OBJECT_MISSING` ở mục 2 là dấu hiệu của ca đó. RFP không đòi chức năng này. Không có nó thì diễn tập restore mà `DR-RET-01` đòi nghiệm thu có thể thất bại vào đúng lúc cần nhất.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Upload · lưu trữ · đọc lại chứng từ | `TBL-ATTACH-01` | **Đã chạy thật**: bảng `lot_attachment` (tên file, MIME, dung lượng CHECK > 0, người tải lên, thời điểm), kho lưu **riêng tư**, trần dung lượng và danh sách MIME kiểm ở **server**, đọc lại bằng liên kết có chữ ký thời hạn ngắn. Đường thứ hai cho bằng chứng điều chỉnh cũng vậy, kho lưu riêng | `supabase/migrations/20260907090000_lot_attachment.sql:14-54`; `20260904090600_correction.sql:37-46` | Không lệch |
| Đường dẫn file không ra giao diện/bản xuất; không phán định chất lượng ảnh tự động | Ràng buộc bảo mật số 1 và `DR-IMAGE-01` (RFP:794) | **Đang giữ đúng cả hai**: không cột giao diện nào phơi đường dẫn và báo cáo RPT-08 đã loại nó khỏi bản xuất; không có AI hay tự động gán nhãn ở bất kỳ đâu | `supabase/migrations/20260907090000_lot_attachment.sql:17`; `src/lib/reports/registry-columns.ts` | Không lệch |
| Màn quản lý **xuyên lô hàng và xuyên loại chứng từ** + đường đọc danh sách | `GET /api/attachments` | Chưa có. Hiện chỉ đọc được đính kèm của **một** lô hàng, từ trang chi tiết lô; index cũng chỉ theo lô | `supabase/migrations/20260907090000_lot_attachment.sql:29` | Chưa thi công |
| **Phân loại tài liệu** và **tầng lưu trữ** trên từng file | Cột loại tài liệu + hai giá trị dẫn xuất; cột tầng lưu trữ + mốc chuyển tầng | **Không có cột nào cho cả hai** — nên hiện **không phân biệt được** nhóm 7 năm với nhóm 3 năm mà RFP:773-774 chia, tức chưa thi hành được `DR-RET-01` | `supabase/migrations/20260907090000_lot_attachment.sql:14-22` | Khác không chủ đích |
| Chuyển tầng nguội sau 3 năm, phục hồi ≤ 2 ngày làm việc | `DR-RET-01`, RFP:774 | Chỉ có **một tầng** là kho lưu hiện tại — không có tầng nguội, không có đường phục hồi, và **không có tiến trình nào** đánh dấu file tới hạn | không có tệp job/cron trong repo | Chưa thi công |
| Hành động vòng đời ghi được vào bản ghi file | Một đường ghi **hẹp** đúng các cột vòng đời | Cả hai kho **chỉ-thêm tuyệt đối**: không có policy update hay delete ở bất kỳ đâu, nên cần một đường ghi hẹp mới | `supabase/migrations/20260907090000_lot_attachment.sql:25-27` | Chưa thi công |
| Policy lưu trữ phủ **toàn bộ** chứng từ | Một chỗ quản mọi chứng từ | Chứng từ nằm ở **hai kho tách nhau**; quản một kho thì policy phủ nửa, và bằng chứng tranh chấp — đúng nhóm 3 năm RFP:774 gọi tên — lại ở nửa không được quản | `20260904090600_correction.sql:8, 37-46` | Cần khách chốt (mục 9 câu 2) |
| Kiểm soát truy cập chứng từ theo vai trò (§09-06) | Mục 6 chặn vào màn theo vai trò | Đọc mở cho mọi vai trò đang hoạt động, ở **cả metadata và cả nội dung file** (`FR-601` — **mã nội bộ LAB-3**, không phải mã yêu cầu của khách); có chủ đích khi dựng prototype | `supabase/migrations/20260907090000_lot_attachment.sql:34-36, 53-54` | Cần khách chốt |
| Miễn khoá ngày nghiệp vụ | Mục 4 | Đúng như thiết kế, và lý do miễn trừ khai ngay trong DDL | `supabase/migrations/20260907090000_lot_attachment.sql:9-13` | Không lệch |

## 11. Dẫn chứng

- RFP:249-255 — `TBL-ROLE-01`: bảy vai trò nội bộ; RFP:255 gán ROLE-SYS-ADMIN việc quản lý log vận hành. RFP:311 — §02-08: bên dự thầu **phải đề xuất** cơ chế phân tách quyền và truy vết.
- RFP:601 — `GOV-RULE-01`: maker-checker chỉ cho quy tắc/biểu suất. RFP:710 — `FR-AUDIT-01`: audit cho tạo · sửa · phê duyệt · lock · đổi quyền. RFP:771-775 — §08-04 `TBL-ATTACH-01`: bảng policy lưu trữ ba nhóm; nhóm 3 năm chuyển **cold archive, phục hồi trong tối đa 2 ngày làm việc**; nhóm hồ sơ dự án theo vòng đời dự án.
- RFP:794 — §08-07 `DR-IMAGE-01`: không yêu cầu AI phán định chất lượng ảnh; mọi gán nhãn phải **duy trì yêu cầu con người xác nhận**.
- RFP:804, RFP:807, RFP:812-814, RFP:817 — `NFR-AVL-01`, `NFR-PERF-01`, `NFR-SEC-04`, `DR-RET-01`, `NFR-OPS-01`, `NFR-COMP-01`. RFP:886 — §09-06 APPI: mã hoá, RBAC và **log truy cập** cho thông tin cá nhân, **nhất quán với policy lưu trữ `DR-RET-01`**.
- Function List `FN-14` · Feature List `FE-044` — upload, lưu trữ và tra cứu chứng từ theo policy 7 năm online / 3 năm rồi cold storage.
- Chỉ cho phần đối chiếu prototype ở mục 10: `supabase/migrations/20260907090000_lot_attachment.sql:9-54`, `20260904090600_correction.sql:8, 37-46`, `src/lib/reports/registry-columns.ts`.
