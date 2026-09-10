# SC-27 — Quản lý batch xuất dữ liệu kế toán · Spec BE

| | |
|---|---|
| FE liên quan | FE-037 (Xuất dữ liệu đối chiếu sang kế toán) |
| FN | FN-11 (Tích hợp hệ thống kế toán) |
| Ưu tiên | P0 |
| Yêu cầu khách | IF-ACC-01, DR-SETTLE-01, FR-SETTLE-02, FR-AUDIT-01, NFR-OPS-01, NFR-PERF-01, DR-RET-01 |
| Miền dữ liệu | D-SETTLE |
| State machine | — (RFP không có `FIG-*` nào cho vòng đời batch bàn giao) |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

BE phải cung cấp: (a) một đường đọc danh sách batch **xuyên nhiều ngày nghiệp vụ** có lọc theo
khoảng ngày · batch code · trạng thái · người tham gia; (b) một đường đọc **tập dòng đã bàn giao**
của đúng một batch, mang đủ 6 trường tối thiểu của DR-SETTLE-01 (RFP:765); (c) một đường ghi **gửi
lại** batch tới hệ thống kế toán hiện hành và ghi nhận kết quả lượt gửi.

BE **không** làm ở màn này: tạo batch mới (thuộc SC-26 · RPT-06 sau khi ngày đã lock), sửa hoặc xoá
batch (dữ liệu bàn giao là chỉ-thêm), lock ngày nghiệp vụ (SC-18 · FR-SETTLE-02), và **không** tự
chọn phương thức kết nối tới bên nhận — RFP:767 và RFP:1401 hoãn phương thức truyền, xác thực,
retry và môi trường test sang buổi làm việc về interface.

## 2. Hợp đồng API

### `GET /api/accounting/export-batches`

| | |
|---|---|
| Thoả yêu cầu | FE-037 · IF-ACC-01 · DR-SETTLE-01 · NFR-PERF-01 |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SETTLEMENT |
| Idempotent | có (đọc thuần) |

**Request** — mọi tham số ở `query`, không tham số nào bắt buộc; để trống hết thì trả toàn bộ batch theo trang.

| Tham số | Kiểu | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|
| `businessDateFrom`, `businessDateTo` | date | `YYYY-MM-DD`; from ≤ to; khoảng bao gồm hai đầu mút | DR-SETTLE-01 (trường #1) |
| `batchCode` | string | khớp trọn mã; mã duy nhất toàn hệ | DR-SETTLE-01 (trường #6) |
| `status` | enum | `chờ` \| `đã xác nhận` \| `đã điều chỉnh` | IF-ACC-01 (RFP:1399) |
| `participantId` | string | mã người tham gia | DR-SETTLE-01 (trường #2) |
| `page`, `pageSize` | integer | phân trang; mặc định và giới hạn trên ở mục 9 | NFR-PERF-01 |

Server tự quyết, **không nhận từ client**: thứ tự sắp xếp mặc định (thời điểm tạo giảm dần) và giới hạn trên của `pageSize`.

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `items[].batchCode`, `items[].businessDate` | string, date | Mã lần xuất và ngày nghiệp vụ đã lock — trường tối thiểu #6 và #1 |
| `items[].status` | enum | Trạng thái — trường tối thiểu #5 (cấp áp dụng: mục 9 câu 1) |
| `items[].rowCount` | integer | Số dòng trong batch; cho phép 0 |
| `items[].totalNetAmountJpy`, `items[].totalTaxJpy` | integer | Tổng số tiền và thuế — trường tối thiểu #3 và #4 |
| `items[].taxRateBps`, `items[].taxBasis` | integer, enum | Thuế suất và cơ sở thuế đóng dấu lên batch |
| `items[].exportedAt`, `items[].exportedBy` | timestamp, string | Thời điểm tạo và **tên hiển thị** người khởi tạo — bắt buộc theo RFP:782; thư điện tử không ra khỏi BE ở đường này (RFP:886) |
| `total` | integer | Tổng số batch khớp điều kiện |

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 400 | `RANGE_INVALID` | `businessDateFrom` > `businessDateTo` | DR-SETTLE-01 |
| 404 | — | Vai trò gọi không phải ROLE-SETTLEMENT (chặn vào trang, xem mục 6) | RFP:311 |
| 422 | `STATUS_UNKNOWN` | `status` không thuộc 3 giá trị của RFP:1399 | IF-ACC-01 |
| 422 | `PAGE_SIZE_EXCEEDED` | `pageSize` vượt giới hạn trên do server đặt | NFR-PERF-01 |

**Tác dụng phụ** — không ghi bảng nào, không ghi audit (đọc thuần), không phát thông báo.

### `GET /api/accounting/export-batches/{batchCode}/lines`

| | |
|---|---|
| Thoả yêu cầu | FE-037 · IF-ACC-01 · DR-SETTLE-01 |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SETTLEMENT |
| Idempotent | có (đọc thuần) |

**Request** — `batchCode` ở `path`, string, **bắt buộc**, khớp trọn mã (DR-SETTLE-01 trường #6).

**Response 2xx** — mỗi dòng mang đúng 6 trường tối thiểu: `businessDate` · `participantId` · `totalNetAmountJpy` · `taxJpy` · `lineStatus` · `batchCode`. Đây là **bản chụp bất biến** tại thời điểm xuất, không tính lại từ dữ liệu hiện tại (RFP:781).

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `BATCH_NOT_FOUND` | `batchCode` không tồn tại | DR-SETTLE-01 |
| 404 | — | Vai trò gọi không phải ROLE-SETTLEMENT | RFP:311 |
| 410 | `BATCH_ARCHIVED` | Bản chụp dòng đã chuyển tầng nguội theo policy lưu trữ | DR-RET-01 |

**Tác dụng phụ** — không có.

### `POST /api/accounting/export-batches/{batchCode}/send`

| | |
|---|---|
| Thoả yêu cầu | FE-037 · IF-ACC-01 · NFR-OPS-01 |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SETTLEMENT |
| Idempotent | **không** — chống gửi trùng bằng CAS trên trạng thái bàn giao cộng khoá gửi theo `batchCode`; client bắt buộc kèm `idempotencyKey` để lượt bấm lặp trả kết quả cũ thay vì gửi lần hai |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `batchCode` | path | string | có | khớp trọn mã | DR-SETTLE-01 |
| `idempotencyKey` | body | string | có | duy nhất theo lượt bấm của client | RFP:780 |
| `reason` | body | string | mục 9 câu 4 | lý do gửi lại | FR-AUDIT-01 |

Server tự quyết: trạng thái bàn giao sau lượt gửi, thời điểm gửi, số hiệu lượt thử. Client **không** đặt được trạng thái bàn giao.

**Response 2xx** — `batchCode` · `sendState` · `sentAt` · `attemptNo`.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `BATCH_NOT_FOUND` | `batchCode` không tồn tại | DR-SETTLE-01 |
| 404 | — | Vai trò gọi không phải ROLE-SETTLEMENT | RFP:311 |
| 409 | `SEND_IN_PROGRESS` | Đã có một lượt gửi đang chạy trên cùng batch | IF-ACC-01 |
| 409 | `SEND_STATE_CHANGED` | CAS thất bại vì trạng thái bàn giao đã đổi giữa lúc đọc và lúc ghi | IF-ACC-01 |
| 422 | `SEND_NOT_ALLOWED_IN_STATE` | Batch đang ở trạng thái mà mục 4 không cho gửi lại | IF-ACC-01 |
| 502 | `RECEIVER_REJECTED` | Bên nhận trả lỗi tường minh | IF-ACC-01 |
| 504 | `RECEIVER_TIMEOUT` | Hết thời gian chờ, kết quả **không rõ** — khác `RECEIVER_REJECTED` | NFR-OPS-01 |

**Tác dụng phụ** — ghi trạng thái bàn giao và thời điểm gửi của batch; ghi một dòng audit `send_accounting_export_batch` (mục 7); phát cảnh báo vận hành khi lượt gửi kết thúc ở trạng thái lỗi (NFR-OPS-01, RFP:814). **Không** sửa nội dung batch và **không** tạo batch mới.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Batch xuất kế toán | `batch_code` | Duy nhất toàn hệ | tầng 1 (unique) | Có |
| Batch xuất kế toán | `business_date` | Chỉ ngày đã lock mới có batch | tầng 3 (kiểm khi tạo) | Có |
| Batch xuất kế toán | `row_count` | ≥ 0 — batch rỗng vẫn hợp lệ | tầng 1 (CHECK) | Có |
| Batch xuất kế toán | `total_net_amount_jpy`, `total_tax_jpy`, `tax_rate_bps`, `tax_basis` | Số nguyên JPY không phần lẻ; thuế suất và cơ sở thuế đóng dấu lên từng batch để batch cũ tự giải thích được | tầng 1 (kiểu + CHECK) | Có |
| Batch xuất kế toán | `exported_at`, `exported_by` | Bắt buộc theo RFP:782 | tầng 1 (not null / FK) | Có |
| Batch xuất kế toán | Bản chụp dòng | Bất biến; mang đủ 6 trường tối thiểu **kèm** `Trạng thái dòng` với tập giá trị `chờ / đã xác nhận / đã điều chỉnh` (RFP:1399) | tầng 3 (dựng lúc xuất) | Có ở mức cột; **tập giá trị lệch** — xem mục 10 |
| Batch xuất kế toán | Trạng thái bàn giao ở **mức batch** + thời điểm gửi + lỗi gửi | Chỉ chuyển được theo mục 4; không cho client đặt | tầng 2 (trigger chặn chuyển sai) hoặc bảng phụ chỉ-thêm | **Chưa có** — mục 9 câu 1 và câu 5 |

Bảng batch là **chỉ-thêm**: không có đường sửa hay xoá. Thêm một cột đổi được sẽ phá tính chất đó,
nên hình dạng lưu trạng thái bàn giao là một quyết định kiến trúc, không phải chi tiết cột (mục 9).

## 4. Vòng đời trạng thái

RFP **không** có `FIG-*` cho vòng đời batch bàn giao. Vòng đời dưới đây là **đề xuất thiết kế**;
tập giá trị phải chốt trước khi code (mục 9 câu 1).

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | Tạo batch | `chưa gửi` | Ngày nghiệp vụ đã lock (FR-SETTLE-02) | ROLE-SETTLEMENT | (thuộc SC-26) |
| `chưa gửi` | Gửi | `đang gửi` | Không có lượt gửi nào đang chạy | ROLE-SETTLEMENT | 409 `SEND_IN_PROGRESS` |
| `đang gửi` | Bên nhận xác nhận | `đã gửi` | Phản hồi thành công tường minh | hệ thống | — |
| `đang gửi` | Bên nhận từ chối | `gửi lỗi` | Phản hồi lỗi tường minh | hệ thống | 502 `RECEIVER_REJECTED` |
| `đang gửi` | Hết thời gian chờ | `không rõ kết quả` | Không có phản hồi | hệ thống | 504 `RECEIVER_TIMEOUT` |
| `gửi lỗi` | Gửi lại | `đang gửi` | Người bấm là ROLE-SETTLEMENT | ROLE-SETTLEMENT | 409 `SEND_STATE_CHANGED` |
| `không rõ kết quả` | Gửi lại | `đang gửi` | **Chỉ khi** bên nhận xử lý trùng theo kiểu thay thế | ROLE-SETTLEMENT | 422 `SEND_NOT_ALLOWED_IN_STATE` |
| `đã gửi` | Gửi lại | — | Chặn | — | 422 `SEND_NOT_ALLOWED_IN_STATE` |

Guard dễ mất nhất nằm ở cạnh `không rõ kết quả → đang gửi`: nếu bên nhận **cộng dồn** thì gửi lại
làm nhân đôi số tiền phía kế toán. Đó là guard, không phải bỏ bớt cạnh — mục 9 câu 3.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| DR-SETTLE-01 (RFP:763) | "Dữ liệu trao đổi là dữ liệu đối chiếu ngày **sau khi đã lock**." | Điều kiện tạo batch (SC-26) + guard mục 4 | Không lock được ngày thì không có batch |
| DR-SETTLE-01 (RFP:765) | "Các trường tối thiểu bắt buộc là: **ngày nghiệp vụ, người tham gia, tổng số tiền, thuế, trạng thái và batch code**." | Hợp đồng response mục 2 | Đủ 6 trường trên mọi dòng của mọi batch |
| IF-ACC-01 (RFP:1399) | "**Trạng thái dòng** — Trạng thái: chờ / đã xác nhận / đã điều chỉnh" | Tập giá trị của `lineStatus` | Không sinh giá trị ngoài 3 giá trị này |
| RFP:782 (§08-05) | "Dữ liệu xuất ra phải kèm: thời điểm tạo, ngày nghiệp vụ, người khởi tạo và batch code." | Bốn cột bắt buộc của batch | Không batch nào thiếu một trong bốn |
| RFP:780 (§08-05) | "Hệ thống phải phát hiện trùng lặp business key trước khi tiếp nhận thao tác import hoặc chốt." | `idempotencyKey` + CAS ở đường gửi | Hai lượt gửi cùng lúc chỉ một bên thắng |
| FR-SETTLE-02 (RFP:660) | "Hệ thống phải lock ngày nghiệp vụ và ngăn sửa trực tiếp sau khi lock." | Batch ghi **về** một ngày đã lock, không ghi **vào** ngày đó — nên màn này không bị khoá theo ngày | Không có mã lỗi khoá ngày ở màn này |

**Con số chưa có nguồn** — số lần thử gửi tối đa, thời gian chờ bên nhận, `pageSize` mặc định.
Con số retry **3 lần** của RFP chỉ thuộc `BR-NOTIFY-01`/`FR-NOTIFY-02` (RFP:600, RFP:687) cho kênh
thông báo; màn này **không vay** con số đó. Cả ba nằm ở mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào màn | Đọc danh sách batch | Đọc tập dòng | Gửi lại |
|---|---|---|---|---|
| ROLE-SETTLEMENT | cho phép | cho phép | cho phép | cho phép |
| Sáu vai còn lại: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | từ chối · 404 | từ chối · 404 | từ chối · 404 | từ chối · 404 |

Bảy vai trò lấy từ `TBL-ROLE-01` (RFP:249-255). ROLE-SETTLEMENT được chọn vì `TBL-ROLE-01` gán cho
vai này đúng trách nhiệm "đối chiếu, chốt kỳ, **xuất dữ liệu cho kế toán**" (RFP:253).

**Đọc và ghi là hai trục khác nhau.** Trục **ghi** chặn theo vai trò và có căn cứ trực tiếp:
RFP:253 gán việc xuất dữ liệu kế toán cho ROLE-SETTLEMENT. Trục **đọc** thì RFP **không** quy định
ai đọc được bảng nào; RFP:311 (§02-08) chỉ nói *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách
quyền và truy vết tương ứng với các vai trò nêu trên."* Vậy phạm vi đọc ở đây là **đề xuất thiết kế
của chúng ta**, không phải yêu cầu khách. Đề xuất: **chặn cả trục đọc** ở màn này theo vai trò, vì
đây là dữ liệu tiền đã bàn giao ra ngoài tổ chức. Căng thẳng giữa đề xuất này và §09-06 (APPI,
RFP:886) đi vào mục 9 câu 6.

**Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên.

Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Gửi lại batch | `send_accounting_export_batch` | before: trạng thái bàn giao cũ · after: trạng thái mới, thời điểm gửi, số hiệu lượt thử · reason: lý do gửi lại (mục 9 câu 4) | FR-AUDIT-01 (RFP:710) |
| Lượt gửi kết thúc ở trạng thái lỗi | `accounting_send_failed` | after: mã lỗi bên nhận hoặc mốc hết thời gian chờ · reason: phản hồi thô của bên nhận | FR-AUDIT-01, NFR-OPS-01 |
| Tạo batch | `create_accounting_export_batch` | **thuộc SC-26**, liệt ở đây để truy vết đủ vòng đời | FR-AUDIT-01 |

Đọc danh sách và đọc tập dòng **không** ghi audit: `FR-AUDIT-01` (RFP:710) liệt tạo · sửa · phê
duyệt · lock · đổi quyền, không liệt hành vi đọc. Nếu khách muốn log truy cập dữ liệu cá nhân theo
RFP:886 thì đó là hạng mục riêng — mục 9 câu 6.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-PERF-01 (RFP:807) | Tìm kiếm thông thường p95 ≤ 2 giây | Lọc theo khoảng ngày cần index trên ngày nghiệp vụ; lọc theo trạng thái dòng và người tham gia mà chỉ có bản chụp dòng thì không đạt ngưỡng — phải có cột hoặc bảng dẫn xuất (mục 9 câu 2) |
| NFR-OPS-01 (RFP:814) | Giám sát được lỗi batch/xuất dữ liệu | Mỗi lượt gửi kết thúc ở trạng thái lỗi phải phát được cảnh báo; trạng thái `không rõ kết quả` cũng phải vào cảnh báo |
| DR-RET-01 (RFP:813) | Nghiệp vụ online 7 năm; hình ảnh/chứng từ phụ trợ 3 năm rồi chuyển tầng nguội | Bản chụp dòng thuộc nhóm nào thì RFP không nói → mã lỗi 410 ở mục 2 chỉ dựng được sau khi chốt (mục 9 câu 7) |
| NFR-SEC-04 (RFP:812) | TLS cho dữ liệu truyền; secret tách khỏi mã nguồn | Kênh gửi tới bên nhận phải dùng TLS; thông tin xác thực bên nhận là secret, chốt ở buổi làm việc về interface |

## 9. Câu hỏi cho chủ đầu tư

- **Trạng thái bàn giao ở mức batch dùng chung tập giá trị với `Trạng thái dòng`, hay là tập riêng?** Cần trước khi code vì nó quyết định ràng buộc giá trị, bộ lọc và vòng đời mục 4. Tài liệu khách có **hai phía**: RFP:765 liệt "trạng thái" trong 6 trường tối thiểu mà không nói cấp nào; RFP:1399 nói rõ đó là **`Trạng thái dòng`** với tập `chờ / đã xác nhận / đã điều chỉnh`, tức mức DÒNG. Vậy trạng thái *gửi* ở mức batch là **đề xuất của bên dự thầu cho màn quản lý**, không phải yêu cầu khách. Sai thì phải đổi ràng buộc và bù dữ liệu cho batch cũ.
- **Lọc theo trạng thái là lọc batch có ít nhất một dòng ở trạng thái đó, hay batch mà toàn bộ dòng ở trạng thái đó?** Cần trước khi code vì đây là điều kiện quyết định có đạt `NFR-PERF-01` (RFP:807) hay không — quét bản chụp dòng của mọi batch thì không có đường đạt ngưỡng 2 giây. Sai thì phải dựng lại tầng lưu trữ dẫn xuất.
- **Bên nhận xử lý batch trùng ngày theo kiểu thay thế hay cộng dồn?** Cần trước khi code vì nó là guard của cạnh `không rõ kết quả → đang gửi` ở mục 4. RFP:767 và RFP:1401 hoãn đúng câu này sang buổi làm việc về interface. Nếu cộng dồn mà cho gửi lại tự do thì kế toán bị **nhân đôi số tiền**.
- **Gửi lại có bắt buộc ghi lý do?** Cần trước khi code vì `FR-AUDIT-01` (RFP:710) đòi reason cho thao tác nhạy cảm nhưng danh sách của nó là tạo · sửa · phê duyệt · lock · đổi quyền, không có "gửi dữ liệu ra ngoài". Sai thì hoặc thiếu vết, hoặc thêm ma sát vô ích.
- **Số lần thử gửi tối đa và thời gian chờ bên nhận?** Cần trước khi code vì không có con số thì hoặc gửi lặp vô hạn vào một bên nhận đang lỗi, hoặc bỏ cuộc quá sớm. RFP **không** cho con số nào cho interface kế toán; con số retry 3 lần ở RFP:600 và RFP:687 chỉ thuộc kênh thông báo, spec này không vay.
- **Vai trò nào được đọc dữ liệu batch?** Cần trước khi code vì mục 6 chặn cả trục đọc, và đây là chỗ tài liệu khách tự chống nhau: RFP:311 (§02-08) **giao cho bên dự thầu đề xuất** cơ chế phân tách quyền — không có yêu cầu đọc mở nào; còn RFP:886 (§09-06, APPI) đòi "kiểm soát truy cập theo vai trò (RBAC) và log truy cập áp dụng cho thông tin cá nhân — phải nhất quán với policy lưu trữ DR-RET-01". Batch mang mã người tham gia và số tiền gắn với người tham gia, nên một đề xuất đọc mở sẽ chống lại chính điều RFP:886 đòi. Khai đúng bản chất: **đề xuất của bên dự thầu chống lại một yêu cầu khách bằng chữ** — không chọn hộ khách. Sai thì phải sửa cả tầng chính sách đọc, không chỉ màn này.
- **Bản chụp dòng đã bàn giao thuộc nhóm lưu trữ nào của `DR-RET-01`?** Cần trước khi code vì nó quyết định mã lỗi 410 ở mục 2 có tồn tại hay không. RFP:813 chia hai nhóm (nghiệp vụ 7 năm; hình ảnh/chứng từ phụ trợ 3 năm rồi tầng nguội) và không xếp bản chụp batch vào nhóm nào. Sai thì hoặc phình dung lượng, hoặc xoá mất bằng chứng đã bàn giao.
- **Định dạng batch code chốt là gì, và `pageSize` mặc định bao nhiêu?** Cần trước khi code vì bên nhận map theo mã (RFP:1401 hoãn câu này) và vì `pageSize` là biến trực tiếp của ngưỡng `NFR-PERF-01`. Sai thì phải bù mã cho toàn bộ batch cũ.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Màn quản lý batch xuyên nhiều ngày | Đường đọc lọc theo khoảng ngày · batch code · trạng thái · người tham gia (RFP:765) | Chưa dựng. Chỉ có đường liệt batch theo **đúng một** ngày, và chỉ có đường ghi khi tạo batch | `src/lib/accounting/export-batch-queries.ts:21-33`; `src/app/api/accounting/export-batches/route.ts:34-35` | Chưa thi công |
| Tập giá trị `Trạng thái dòng` | `chờ` / `đã xác nhận` / `đã điều chỉnh` (RFP:1399) | Sinh `"đã chốt"` \| `"đã điều chỉnh"` — **không bao giờ sinh `chờ`**, và dùng `"đã chốt"` ở chỗ RFP viết `đã xác nhận`. Bên nhận map theo giá trị nên đây là lệch hợp đồng, không phải chuyện đặt tên | `src/lib/accounting/build-accounting-lines.ts:7`; `src/lib/reports/registry-columns.ts:98` | Khác không chủ đích |
| Trạng thái bàn giao ở mức batch | Cột hoặc bảng phụ giữ trạng thái gửi · thời điểm gửi · lỗi gửi | Không có cột nào. **Lưu ý:** đây là đề xuất thiết kế của ta chứ không phải trường RFP đòi (RFP:1399 khai trường trạng thái ở mức dòng) | `supabase/migrations/20260908090000_accounting_export.sql:16-31` | Cần khách chốt |
| Kênh gửi thật tới hệ thống kế toán | Đường gửi có TLS, xác thực, retry, nghiệm thu | Chưa có — RFP:767 và RFP:1401 hoãn sang buổi làm việc về interface | RFP:767, RFP:1401 | Cần khách chốt |
| Phạm vi đọc theo vai trò | Mục 6 đề xuất chặn cả trục đọc | Chính sách đọc mở cho mọi vai trò đang hoạt động (`FR-601` — **mã nội bộ LAB-3**, không phải mã yêu cầu của khách) | `supabase/migrations/20260908090000_accounting_export.sql:49-50` | Khác có chủ đích |
| Index phục vụ lọc | Index cho lọc theo khoảng ngày và theo trạng thái/người tham gia | Có index theo ngày nghiệp vụ; không có gì cho hai điều kiện còn lại | `supabase/migrations/20260908090000_accounting_export.sql` (dòng tạo index) | Khác không chủ đích |
| Bốn trường RFP:782 và việc miễn trigger khoá ngày | Đủ bốn trường; batch ghi **về** một ngày đã lock nên không bị khoá | Có đủ bốn, người khởi tạo chỉ hiện tên hiển thị; lý do miễn trigger khai ngay trong DDL | `supabase/migrations/20260908090000_accounting_export.sql:16-31, 59-67` | Không lệch |

## 11. Dẫn chứng

- RFP:253 — `TBL-ROLE-01`: ROLE-SETTLEMENT chịu trách nhiệm "đối chiếu, chốt kỳ, xuất dữ liệu cho kế toán". RFP:249-255 — bảy vai trò nội bộ.
- RFP:311 — §02-08: bên dự thầu **phải đề xuất** cơ chế phân tách quyền và truy vết.
- RFP:660 `FR-SETTLE-02` — lock ngày và ngăn sửa trực tiếp sau lock. RFP:710 `FR-AUDIT-01` — audit cho tạo · sửa · phê duyệt · lock · đổi quyền. RFP:763-767 — §08-03 `DR-SETTLE-01`/`IF-ACC-01`: dữ liệu sau lock, 6 trường tối thiểu, phương thức kết nối hoãn sang buổi làm việc về interface.
- RFP:780-782 — §08-05: chống trùng business key; dữ liệu xuất kèm thời điểm tạo · ngày nghiệp vụ · người khởi tạo · batch code. RFP:807, RFP:812-814 — `NFR-PERF-01`, `NFR-SEC-04`, `DR-RET-01`, `NFR-OPS-01`. RFP:886 — §09-06 APPI: RBAC và log truy cập cho thông tin cá nhân.
- RFP:1393-1401 — Phụ lục D.2 `IF-ACC-01`: bảng trường tích hợp tối thiểu; `Trạng thái dòng` = `chờ / đã xác nhận / đã điều chỉnh`; phương thức truyền, xác thực, retry và môi trường test chốt sau.
- Feature List `FE-037` — xuất dữ liệu đối chiếu sang kế toán, dữ liệu sau lock với 6 trường tối thiểu.
- Chỉ cho phần đối chiếu prototype ở mục 10: `src/lib/accounting/build-accounting-lines.ts:7`, `src/lib/accounting/export-batch-queries.ts:21-33`, `src/app/api/accounting/export-batches/route.ts:34-35`, `src/lib/reports/registry-columns.ts:98`, `supabase/migrations/20260908090000_accounting_export.sql:16-67`.
