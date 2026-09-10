# SC-26 — Xem và xuất báo cáo · Spec BE

| | |
|---|---|
| FE liên quan | FE-034 (nhóm ngày RPT-01..05), FE-035 (nhóm kế toán/thưởng/điều chỉnh/tranh chấp RPT-06..09), FE-036 (nhóm tháng RPT-10..12) |
| FN | FN-10 (Báo cáo và xuất dữ liệu) |
| Ưu tiên | P0 (FE-034, FE-035) · P1 (FE-036) |
| Yêu cầu khách | FR-RPT-01, FR-RPT-02, FR-RPT-03, TBL-REPORT-01, IF-ACC-01, FR-AUDIT-01, FR-SETTLE-02, DR-SETTLE-01 |
| Miền dữ liệu | D-SETTLE, D-TRADE, D-DELIVERY, D-PARTY, D-LOT, D-INCENTIVE |
| State machine | không có `FIG-*` riêng — phụ thuộc lock ngày (`FIG-013`, RFP:665) |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

BE của màn này đọc dữ liệu của **một** mã báo cáo trong catalog `TBL-REPORT-01` theo bộ lọc, phân
trang, và xuất **toàn bộ tập đã lọc** ra CSV. Riêng `RPT-06` có thêm một thao tác ghi: tạo batch
bàn giao dữ liệu đối chiếu cho hệ kế toán theo `IF-ACC-01`.
**Không** làm ở màn này: `FR-RPT-03` (RFP:709) khai rõ **không yêu cầu công cụ tự tạo báo cáo** —
không có đường thêm mã báo cáo thứ 13, thêm cột, hay tự định nghĩa mẫu. Danh mục 12 mã và mô tả
từng mã thuộc SC-25. Theo dõi batch **xuyên nhiều ngày** (mã batch, trạng thái gửi, gửi lại)
thuộc SC-27 / `FE-037`; màn này chỉ tạo batch cho ngày đang lọc và liệt batch của đúng ngày đó.

## 2. Hợp đồng API

### `GET /api/reports/{reportCode}`

Thoả `FE-033`..`FE-036` · `FR-RPT-01` · `FR-RPT-02` · xác thực bắt buộc · **mọi vai trò đang hoạt
động** · idempotent. **Request** — `reportCode` (path, bắt buộc, phải thuộc 12 mã) + các tham số
lọc mà mã đó khai ở mục 5, và `page` (query, integer ≥ 1, mặc định 1). Server tự quyết và **không
nhận từ client**: tập cột của mã báo cáo, số dòng mỗi trang, và câu truy vấn nguồn — client không
chọn được cột và không đổi được `pageSize`.

**Response 2xx** — `columns[]` (khoá cột + nhãn), `rows[]`, `page`, `totalPages`, `totalRows`.
Không trường nào chứa email nội bộ; cột người thực hiện trả tên hiển thị hoặc **mã người dùng**.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `REPORT_NOT_FOUND` | `reportCode` không thuộc 12 mã của `TBL-REPORT-01` | FR-RPT-03 RFP:709 |
| 422 | `FILTER_REQUIRED` | một bộ lọc bắt buộc của mã đó bị thiếu | FR-RPT-01 |
| 422 | `FILTER_INVALID_FORMAT` | `businessDate` / `period` sai dạng hoặc không phải ngày/tháng lịch thật | FR-RPT-01 |
| 422 | `FILTER_INVALID_VALUE` | giá trị lọc không thuộc tập cho phép của field đó | FR-RPT-01 |
| 422 | `PAGE_OUT_OF_RANGE` | `page` không phải integer ≥ 1 | NFR-PERF-01 |
| 500 | `INTERNAL_ERROR` | truy vấn thất bại | — |

Không có mã lỗi cho "0 dòng": tập rỗng trả 200 với `rows: []`. **Tác dụng phụ** — không ghi; không audit (đọc trên màn không thuộc 5 hành vi của `FR-AUDIT-01`).

### `GET /api/reports/{reportCode}/export.csv`

Thoả `FE-033`..`FE-036` · `FR-RPT-01` · `FR-RPT-03` · xác thực bắt buộc · **mọi vai trò đang hoạt
động** · idempotent về dữ liệu nhưng **mỗi lần gọi là một lần công bố dữ liệu đối chiếu** và phải
để lại dấu vết (RFP:310). **Request** — như endpoint trên, **trừ `page`**: xuất lấy toàn bộ tập đã
lọc, không giới hạn theo trang; riêng `RPT-06` bắt buộc `batchCode`.

**Response 2xx** — `text/csv`. Định dạng: UTF-8 **có BOM**, phân tách `,`, quoting RFC 4180, kết
dòng **CRLF** — chở được cả chữ Nhật và tiếng Việt có dấu. Tên file `{reportCode}-{ngày}.csv`;
riêng `RPT-06` là `RPT-06-{batch_code}.csv` dựng từ giá trị **đã xác nhận trong cơ sở dữ liệu**,
không lấy từ tham số URL (chặn chèn nội dung vào phần đầu phản hồi). Tập rỗng vẫn xuất được.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `REPORT_NOT_FOUND` | `reportCode` không thuộc 12 mã | FR-RPT-03 |
| 422 | `FILTER_REQUIRED` | bộ lọc bắt buộc của mã đó bị thiếu | FR-RPT-01 |
| 422 | `BATCH_CODE_REQUIRED` | `RPT-06` gọi xuất mà không có `batchCode` (đang ở chế độ xem trước) | IF-ACC-01 |
| 404 | `BATCH_NOT_FOUND` | `batchCode` không tồn tại, hoặc không thuộc `businessDate` đang lọc | IF-ACC-01 |
| 500 | `INTERNAL_ERROR` | truy vấn hoặc kết xuất thất bại | — |

**Tác dụng phụ** — không ghi dữ liệu nghiệp vụ; **ghi 1 dòng audit** `export_report_csv` (mục 7).

### `POST /api/accounting/export-batches`

Thoả `FE-035` · `IF-ACC-01` · `DR-SETTLE-01` · `FR-SETTLE-02` · xác thực bắt buộc · vai trò
**ROLE-SETTLEMENT** · **không idempotent**: chống gửi trùng bằng `unique(business_date, seq)` —
hai yêu cầu đồng thời thì yêu cầu thứ hai vỡ ràng buộc và nhận `409 BATCH_SEQ_CONFLICT`.

**Request** — `businessDate` (body, date `YYYY-MM-DD`, bắt buộc). Server tự quyết và **không nhận
từ client**: `batch_code`, `seq`, `kind` (`full` cho lần đầu, `re-export` cho các lần sau),
`tax_rate_bps`, `tax_basis`, `lines` (ảnh chụp bất biến), `exported_by`, `exported_at`, và ba số
tổng. **Response 2xx** — `201` với `{batchCode, businessDate, seq, kind, rowCount, totalNetAmountJpy,
totalTaxJpy}`.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 400 | `INVALID_JSON` | body không phải JSON hợp lệ | — |
| 422 | `BUSINESS_DATE_INVALID` | `businessDate` thiếu, sai dạng, hoặc không phải ngày lịch thật | IF-ACC-01 |
| 409 | `DAY_NOT_LOCKED` | ngày nghiệp vụ chưa được lock ở SC-18 | FR-SETTLE-02 RFP:660, IF-ACC-01 RFP:1395 |
| 409 | `BATCH_SEQ_CONFLICT` | hai yêu cầu tạo batch đồng thời cho cùng ngày | IF-ACC-01 |
| 404 | `NOT_FOUND` | vai trò ≠ ROLE-SETTLEMENT | TBL-ROLE-01 |
| 500 | `INTERNAL_ERROR` | ghi thất bại | — |

**Tác dụng phụ** — ghi 1 dòng `accounting_export_batch` (append-only) kèm ảnh chụp `lines`; ghi audit `create_accounting_export_batch`; không phát thông báo.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| `accounting_export_batch` | `batch_code`, `business_date`, `seq`, `kind`, `tax_rate_bps`, `tax_basis`, `row_count`, `total_net_amount_jpy`, `total_tax_jpy`, `lines`, `exported_by`, `exported_at` | `batch_code` duy nhất; `unique(business_date, seq)`; `seq > 0`; `kind ∈ {full, re-export}`; **append-only** | tầng 1 (unique + CHECK); append-only ở tầng 1b "không có policy UPDATE/DELETE" | có |
| `accounting_export_batch` | `lines`, `tax_rate_bps`, `tax_basis` | `lines` là ảnh chụp **bất biến** đúng các dòng đã gửi; thuế suất và cơ sở thuế **đóng dấu lên từng batch** để batch cũ tự giải thích được sau khi rule đổi | tầng 2 (trigger `BEFORE UPDATE OR DELETE` raise vô điều kiện) cho `lines`; tầng 1 (NOT NULL + CHECK) cho hai cột thuế | **một phần** — hai cột thuế có; bất biến của `lines` chỉ ở tầng 1b nên khoá dịch vụ vẫn ghi được |
| `business_day_lock` | `business_date` | tạo batch **bắt buộc** ngày đã lock | tầng 3 | có |
| `audit_log` | `action`, actor, `after`, `reason` | mỗi lần xuất CSV và mỗi lần tạo batch đều ghi | tầng 3 | một phần — xuất CSV chưa ghi |
| Nguồn dòng của 12 mã | — | mỗi mã đọc thực thể riêng (`transaction`, `lot`, `participant`, `delivery`, dòng đối chiếu, `incentive_result`, `transaction_adjustment`, tranh chấp, `incentive_rule_version`) | tầng 1 | **một phần** — hai nguồn còn thiếu (mục 9, mục 10) |

Ba tầng theo `10-database-diagram.md` § 3: tầng 1 Postgres constraint · tầng 2 trigger · tầng 3
tầng ứng dụng. Tính bất biến của `lines` là ràng buộc P0 (nó là bằng chứng đã bàn giao cho kế
toán) mà hiện chỉ nằm ở tầng 1b — cùng hình dạng vấn đề với các bảng append-only khác.

## 4. Vòng đời trạng thái

Bản thân báo cáo **không có trạng thái** — nó là một khung đọc. Hai vòng đời màn này phụ thuộc:

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Ngày chưa lock | Lock ngày (SC-18) | Ngày đã lock | — | ROLE-SETTLEMENT | — |
| Ngày đã lock, chưa có batch | `POST …/export-batches` | Batch `kind = full` (`seq = 1`) | ngày **đã** lock | ROLE-SETTLEMENT | `409 DAY_NOT_LOCKED` · `404 NOT_FOUND` |
| Đã có batch | `POST …/export-batches` lần nữa | Batch `kind = re-export` (`seq = n+1`) | ngày đã lock; batch cũ **không bị sửa hay xoá** — không tồn tại đường ghi nào để sửa hay xoá một batch | ROLE-SETTLEMENT (sửa/xoá: không ai) | `409 BATCH_SEQ_CONFLICT`; sửa/xoá → `403 BATCH_APPEND_ONLY` |
| `RPT-06` không / có `batchCode` | — | chế độ **xem trước** (số liệu hiện tại, chưa gửi) / chế độ **xem batch** (ảnh chụp đã gửi) | chế độ xem batch đòi `batchCode` khớp `businessDate` | mọi vai trò | xem trước xuất CSV → `422 BATCH_CODE_REQUIRED`; batch không khớp → `404 BATCH_NOT_FOUND` |

Guard dễ mất nhất: lock là **tiền đề**, không phải rào chặn. Các màn khác bị khoá ghi sau lock
(`FR-CORR-03`, RFP:658); ở đây ngược lại — chưa lock thì **không tạo được** batch. Và xuất lại một
ngày đã xuất là **hành động bình thường**: ngày đã lock vẫn đổi được qua đường điều chỉnh có phê
duyệt (SC-20/SC-21), nên một batch bất biến duy nhất mỗi ngày sẽ làm kế toán lệch mãi.

## 5. Quy tắc nghiệp vụ

`TBL-REPORT-01` (RFP:740-755) — **12 mã cố định** và bộ lọc bắt buộc của từng mã; thiết kế đòi cả 12 chạy thật:

| Mã | Nội dung (nguyên văn RFP) | Bộ lọc bắt buộc | Nhóm FE |
|---|---|---|---|
| RPT-01 | "Tổng hợp giao dịch theo từng ngày nghiệp vụ" | ngày nghiệp vụ | FE-034 |
| RPT-02 | "Lịch sử lô hàng và log trạng thái giao dịch" | lô hàng, trạng thái giao dịch | FE-034 |
| RPT-03 | "Danh sách người tham gia đã hoặc sắp mất hiệu lực" | người tham gia, trạng thái hiệu lực | FE-034 |
| RPT-04 | "Giao hàng ùn tắc và ngoại lệ giao hàng" | ngày nghiệp vụ, loại ngoại lệ | FE-034 |
| RPT-05 | "Bảng đối chiếu ngày" | ngày nghiệp vụ | FE-034 |
| RPT-06 | "Bảng xuất dữ liệu để đối chiếu kế toán" | ngày nghiệp vụ, batch code | FE-035 |
| RPT-07 | "Kết quả tính 完納奨励金 theo kỳ" | kỳ đối tượng, người tham gia | FE-035 |
| RPT-08 | "Log điều chỉnh sau khi lock" | ngày nghiệp vụ, chủ thể thực hiện | FE-035 |
| RPT-09 | "Tổng hợp tranh chấp và SLA xử lý" | trạng thái tranh chấp | FE-035 |
| RPT-10 | "Báo cáo tháng theo từng người tham gia" | người tham gia, tháng | FE-036 |
| RPT-11 | "Báo cáo tháng theo loại giao dịch" | loại giao dịch, tháng | FE-036 |
| RPT-12 | "Báo cáo thay đổi rule và version áp dụng" | phiên bản rule, ngày hiệu lực | FE-036 |

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| FR-RPT-01 (RFP:707) | "sinh báo cáo ngày theo catalog bắt buộc" | registry 12 mã ở tầng 3 | mọi mã trong catalog trả dòng thật và xuất được CSV |
| FR-RPT-02 (RFP:708) | "Báo cáo tháng tổng hợp đúng theo ngày nghiệp vụ và **phiên bản rule**" | truy vấn nhóm tháng | RPT-10/RPT-11 ghi version đã dùng cho kỳ tổng hợp; số tháng không trộn hai version mà không nói rõ |
| FR-RPT-03 (RFP:709) | "**không yêu cầu** công cụ tự tạo báo cáo (self-service report builder)" | registry là toàn bộ bề mặt | mã lạ → `404 REPORT_NOT_FOUND`; không API nào thêm mã hay thêm cột |
| IF-ACC-01 (RFP:1393-1399) | 5 nhóm trường tối thiểu: batch code · ngày nghiệp vụ · mã người tham gia · **tổng số tiền và số thuế** · **trạng thái dòng** | cột của RPT-06 | mỗi dòng RPT-06 có đủ; `DR-SETTLE-01` gọi đây là bộ 6 trường |
| IF-ACC-01 (RFP:1399) | "Trạng thái dòng: **chờ / đã xác nhận / đã điều chỉnh**" | enum của cột trạng thái RPT-06 | tập giá trị sinh ra **đúng ba** nhãn này — hệ kế toán bên nhận map theo giá trị |
| FR-SETTLE-02 (RFP:660) | "lock ngày nghiệp vụ và ngăn sửa trực tiếp sau khi lock" | tầng 3 (guard tạo batch) | chưa lock → `409 DAY_NOT_LOCKED` |
| §02-08 (RFP:310) | "**công bố dữ liệu đối chiếu** — đều cần dấu vết kiểm toán" | tầng 3 (`audit_log`) | mỗi lần xuất CSV để lại một dòng audit |
| — | bản xuất **không bao giờ** mang email nội bộ hay đường dẫn bằng chứng | tầng 3 (tập cột) | RPT-08 không có cột đường dẫn bằng chứng; cột người thực hiện rơi về mã người dùng |

**Thuế suất và cơ sở thuế không có trong RFP** → mục 9. Không đặt con số nào ở mục này.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào trang `/reports/[reportCode]` | `GET …/{reportCode}` | `GET …/export.csv` | `POST /api/accounting/export-batches` |
|---|---|---|---|---|
| ROLE-SETTLEMENT | cho phép | cho phép | cho phép | cho phép |
| ROLE-INTAKE | cho phép | cho phép | cho phép | từ chối — **404 `NOT_FOUND`** |
| ROLE-JUDGE | cho phép | cho phép | cho phép | từ chối — **404 `NOT_FOUND`** |
| ROLE-TRADE | cho phép | cho phép | cho phép | từ chối — **404 `NOT_FOUND`** |
| ROLE-DELIVERY | cho phép | cho phép | cho phép | từ chối — **404 `NOT_FOUND`** |
| ROLE-RULE-ADMIN | cho phép | cho phép | cho phép | từ chối — **404 `NOT_FOUND`** |
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | từ chối — **404 `NOT_FOUND`** |
| Không session / tài khoản đã bị tạm ngừng | **307** `/login` | `401` | `401` | `401` |

- **Đọc và ghi khác nhau — màn này là chỗ khác biệt đó rõ nhất.** Phạm vi đọc rộng là **đề xuất
  thiết kế của LAB-3, không phải yêu cầu khách** (RFP:311 giao bên dự thầu tự đề xuất cơ chế phân
  tách quyền); theo đề xuất đó thì mọi vai trò đang hoạt động **đọc** được, và ở đây đúng cả trên
  màn: cả bảy vai trò xem, lọc, phân trang và xuất CSV được.
  Chặn **không** áp cho việc vào trang, chỉ áp cho **một hành động** — tạo batch.
- **Chặn hành động tạo batch trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài
  nguyên. Ngoại lệ so với các màn khác: ở đó 404 chặn *vào trang*, ở đây chặn *hành động*.
- **Maker-checker (`GOV-RULE-01`) không áp ở màn này** — tạo batch là bàn giao dữ liệu đã chốt, một
  người làm là đủ; cổng nằm ở đường sinh ra dữ liệu (SC-21, SC-24). Nhưng vì xuất CSV mở cho cả
  bảy vai trò, **dấu vết kiểm toán là biện pháp kiểm soát duy nhất** ở đây.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Xuất CSV | `export_report_csv` | after: `{reportCode, filters, rowCount, batchCode?}`; reason: `data_disclosure` | FR-AUDIT-01 RFP:710, §02-08 RFP:310 |
| Tạo batch kế toán | `create_accounting_export_batch` | after: `{batchCode, businessDate, seq, kind, rowCount, totalNetAmountJpy, totalTaxJpy, taxRateBps, taxBasis}` | FR-AUDIT-01, IF-ACC-01 |
| Tạo batch bị từ chối vì chưa lock | `export_batch_denied_day_not_locked` | after: `{businessDate, actor}`; reason: `day_not_locked` | FR-AUDIT-01, FR-SETTLE-02 |
| Đọc / lọc / phân trang trên màn | — | **không ghi** | FR-AUDIT-01 chỉ liệt tạo · sửa · phê duyệt · lock · đổi quyền |

Dòng thứ nhất là dòng quan trọng nhất của màn: RFP §02-08 (dòng 310) xếp "**công bố dữ liệu đối
chiếu**" cùng nhóm nhạy cảm với "chỉnh sửa giao dịch, thay đổi quy định, lock/unlock tài khoản, mở
lại kỳ đã chốt". Không có dòng này thì **không truy được ai đã mang dữ liệu kế toán ra khỏi hệ
thống**, lúc nào, bộ lọc nào — trong khi cả bảy vai trò đều xuất được.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-PERF-01 (RFP:807) | "Tìm kiếm thông thường ở p95 không vượt 2 giây" | Phân trang phía server, không nạp cả tập rồi cắt. Baseline `§C.5` (RFP:1358-1359): 600 lô và 1.200 giao dịch mỗi ngày cao điểm |
| NFR-PERF-02 (RFP:808) | "không làm chậm các tác vụ giao dịch cốt lõi" | Xuất CSV lấy **toàn tập** nên là truy vấn nặng nhất của màn; báo cáo ngày chạy trong khung 08:00–10:00 (RFP:304), cùng khung với chốt giao dịch buổi sáng |
| NFR-OPS-01 (RFP:814) · NFR-COMP-01 (RFP:817) | giám sát "lỗi batch/**xuất dữ liệu**"; trình duyệt hiện hành do Chủ đầu tư phê duyệt | `500` của đường xuất và của đường tạo batch là nguồn alert riêng, không gộp vào lỗi chung; CSV **UTF-8 có BOM** để bảng tính trên máy người dùng không đọc sai chữ Nhật — Shift-JIS bị loại vì không biểu diễn được dấu tiếng Việt |
| DR-RET-01 (RFP:813) | dữ liệu nghiệp vụ tra cứu online **7 năm** | `accounting_export_batch.lines` là bằng chứng bàn giao — nằm trong 7 năm, không được dọn |

## 9. Câu hỏi cho chủ đầu tư

- **Thuế: thuế suất là bao nhiêu, và đơn giá đang lưu là 税込 hay 税抜?** `IF-ACC-01` (RFP:1398)
  đòi trường "Tổng số tiền và số thuế" trong bộ tối thiểu, nhưng **RFP không nêu thuế suất** ở bất
  kỳ đâu, cũng **không nói** đơn giá là giá đã gồm thuế hay chưa, và không nói thuế tính theo từng
  dòng giao dịch hay theo từng người tham gia mỗi ngày. Cả ba câu đổi con số trong file gửi kế
  toán; chọn sai thì số thuế bàn giao sai ngay từ batch đầu tiên.
- **Trạng thái dòng của RPT-06: điều kiện sinh ra từng giá trị là gì? Và hệ kế toán bên nhận xử lý
  batch mới của cùng một ngày theo kiểu nào — cộng dồn, hay thay thế batch cũ?** §D.2 (RFP:1399)
  khai tập ba giá trị "**chờ / đã xác nhận / đã điều chỉnh**" nhưng không nói dòng nào là "chờ";
  nếu mọi dòng của một ngày đã lock đều là "đã xác nhận" hoặc "đã điều chỉnh" thì "chờ" không bao
  giờ sinh ra, và hệ bên nhận sẽ chờ một nhãn không tồn tại. `IF-ACC-01` (RFP:1401) nói rõ hiện chỉ
  chốt "cấu trúc thông tin tối thiểu" — hai cách xử lý cho hai nghĩa trái ngược của `seq` và
  `kind`; chọn sai làm kế toán ghi nhận gấp đôi hoặc bỏ mất phần điều chỉnh.
- **`RPT-09` "SLA xử lý" đo bằng gì, và nhóm tháng xử lý một tháng có hai phiên bản biểu suất thế
  nào?** `FR-SETTLE-03` (RFP:661) đòi "ngày dự kiến xử lý" nhưng không nêu ngưỡng SLA — không có
  ngưỡng thì cột SLA không tính được. `FR-RPT-02` (RFP:708) chỉ nói "tổng hợp đúng theo ngày nghiệp
  vụ và phiên bản rule", không nói tách dòng theo version hay gộp và liệt các version đã dùng.
- **Xuất CSV có cần giới hạn theo vai trò không?** Thiết kế hiện mở cho cả bảy vai trò — đó là
  **đề xuất của bên dự thầu** (RFP:311), **không** phải yêu cầu khách, nên đây là chỗ ta phải giải
  trình chứ không phải chỗ khách phải chọn. Kiểm soát hiện dựa vào dấu vết kiểm toán; RPT-06 chứa
  dữ liệu tiền của từng người tham gia và §09-06 (RFP:886) đòi RBAC cho thông tin cá nhân bằng
  chữ, nên khách cần xác nhận mức mở này có chấp nhận được không.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Số mã chạy thật | cả **12** mã chạy thật, có bộ lọc và xuất được CSV (FR-RPT-01 RFP:707, FR-RPT-02 RFP:708) | **7 mã thật** (RPT-01/02/03/05/06/07/08); **5 mã dữ liệu mẫu** (RPT-04/09/10/11/12) — 0 cột, 0 bộ lọc, xuất CSV bị chặn `403 MOCK_REPORT` | `src/lib/reports/registry.ts:66,75,84,93,102,111,120,129,138,147,156,165`; `load-report-rows.ts:78`; `export.csv/route.ts:33` | thiếu — 5/12 |
| Nguyên nhân của RPT-04 và RPT-09 | hai mã này cần nguồn dữ liệu ngoại lệ giao hàng và tranh chấp | **bị chặn bởi màn khác chưa dựng**: RPT-04 cần SC-17 (ghi nhận ngoại lệ giao hàng, `FE-023`/`FR-DEL-03`), RPT-09 cần SC-19 (quản lý tranh chấp, `FE-027`/`FR-SETTLE-03`) — cả hai chưa có bảng lẫn màn. **Không phải "mock vĩnh viễn"**; chú thích trong registry khai sai điều này | `docs/lab4/00-roster-va-gap.md:34,36,117`; `src/lib/reports/registry.ts:55-58` | chưa thi công — chặn bởi SC-17 / SC-19; kèm một chú thích registry khai sai nguyên nhân |
| Tập giá trị trạng thái dòng RPT-06 | **chờ / đã xác nhận / đã điều chỉnh** (IF-ACC-01, RFP:1399) | sinh đúng hai giá trị `"đã chốt"` và `"đã điều chỉnh"` — **không bao giờ sinh "chờ"**, và dùng "đã chốt" ở chỗ RFP viết "đã xác nhận" | `src/lib/accounting/build-accounting-lines.ts:7,78` | khác không chủ đích — **lệch tập giá trị với yêu cầu khách**, hệ kế toán bên nhận map theo giá trị nên không phải chuyện đặt tên |
| Email nội bộ trong bản xuất | không mã nào mang email; khuyết tên thì rơi về **mã người dùng** | **ba** báo cáo rơi về email: RPT-02, RPT-03 và **RPT-06** — với RPT-06, email đi thẳng vào file CSV gửi ra bộ phận kế toán, tức **rò dữ liệu ra ngoài tổ chức**. Ô chọn chủ thể thực hiện cũng vậy. RPT-08 làm đúng (rơi về `id`) | `src/lib/reports/queries/rpt-02-lot-and-transaction-history.ts:92`, `rpt-03-participant-eligibility.ts:100`, `rpt-06-accounting-export.ts:49`, `filter-options.ts:36` vs `rpt-08-post-lock-adjustments.ts:28` | khác không chủ đích — rò dữ liệu |
| Audit cho lần xuất CSV | 1 dòng `export_report_csv` mỗi lần xuất (§02-08 RFP:310, FR-AUDIT-01 RFP:710) | đường xuất CSV **không ghi audit** — không truy được ai đã tải dữ liệu kế toán ra ngoài, lúc nào, với bộ lọc nào | `src/app/api/reports/[reportCode]/export.csv/route.ts:25-82` | thiếu — vi phạm nghĩa vụ truy vết |
| Bộ lọc thiếu hoặc sai | `422` báo tại field | `businessDate` / `period` sai **âm thầm rơi về hôm nay**; giá trị lọc lạ không kiểm định dạng, đưa thẳng vào truy vấn và trả 0 dòng | `src/lib/reports/load-report-rows.ts:25-28`; `src/lib/reports/is-valid-report-date.ts:7-12` | khác không chủ đích |
| Thuế | thuế suất và cơ sở thuế do khách chốt | dùng **8% (軽減税率)** và cơ sở **税抜** làm **giả định**, tự khai trong mã nguồn và hiện cảnh báo thường trực trên màn; thuế suất được đóng dấu lên từng batch nên batch cũ vẫn tự giải thích được | `src/lib/accounting/tax.ts:1-16,25-27`; `supabase/migrations/20260908090000_accounting_export.sql:22-23` | giả định chưa chốt với khách |
| Phạm vi màn | quản lý batch xuyên ngày là SC-27 / `FE-037` | chức năng tạo batch và danh sách batch nằm trong màn này, chỉ liệt batch của **đúng một ngày**; SC-27 chưa dựng | `src/app/(app)/reports/[reportCode]/page.tsx:68-76,127-128`; `docs/lab4/00-roster-va-gap.md:64-74` | lệch phạm vi màn (chức năng đã có, màn riêng thì chưa) |
| Ba mã lỗi của RPT-06 | mỗi mã một thông báo hiểu được | `BATCH_CODE_REQUIRED`, `BATCH_NOT_FOUND`, `MOCK_REPORT` trả JSON trần; đường xuất là một liên kết nên người dùng nhìn thẳng vào JSON | `src/app/api/reports/[reportCode]/export.csv/route.ts:20,33,47-58` | hở |
| Chú thích nội bộ | khai đúng số mã còn dùng dữ liệu mẫu | một chú thích cũ trong màn viết "Mock reports (8/12)"; số thật là **5/12** | `src/app/(app)/reports/[reportCode]/page.tsx:27` | lệch tài liệu nội bộ |

Chỗ **khớp** đáng nêu để chặn cách đọc sai: định dạng CSV (UTF-8 có BOM, CRLF, RFC 4180), tên file
`RPT-06` dựng từ `batch_code` đã xác nhận trong cơ sở dữ liệu, RPT-08 không mang cột đường dẫn bằng
chứng, và `accounting_export_batch` không có policy UPDATE/DELETE.

## 11. Dẫn chứng

- RFP:707-709 · FR-RPT-01/02/03 — catalog bắt buộc; báo cáo tháng theo ngày nghiệp vụ và phiên bản rule; **không** self-service report builder; RFP:740-755 · §08-02 TBL-REPORT-01 — 12 mã và bộ lọc bắt buộc của từng mã
- RFP:1391-1401 · §D.2 IF-ACC-01 — 5 nhóm trường tối thiểu; **RFP:1399** tập giá trị trạng thái dòng "chờ / đã xác nhận / đã điều chỉnh"; RFP:1401 phương thức truyền chốt sau
- RFP:310 · §02-08 — "công bố dữ liệu đối chiếu" là thao tác nhạy cảm cần dấu vết kiểm toán
- RFP:710 · FR-AUDIT-01 · RFP:660 · FR-SETTLE-02 · RFP:658 · FR-CORR-03 · RFP:661 · FR-SETTLE-03; RFP:807-808 · NFR-PERF-01/02 · RFP:813 · DR-RET-01 · RFP:814 · NFR-OPS-01 · RFP:817 · NFR-COMP-01
- RFP:304 · khung giờ chốt và tổng hợp báo cáo ngày 08:00–10:00 · RFP:1358-1359 · §C.5 baseline 600 lô / 1.200 giao dịch
- Feature List `FE-034` / `FE-035` / `FE-036` — `plans/260909-1355-lab4-thiet-ke-chi-tiet/chi-muc-sc-fe-yeu-cau.md:244-253`
- `docs/lab4/10-database-diagram.md` § 3 — ba tầng thực thi ràng buộc; `docs/lab4/00-roster-va-gap.md:34,36,64-74,117` — SC-17, SC-19, SC-27 chưa dựng
- *(chỉ cho mục 10)* `src/lib/reports/registry.ts:55-58,66-165`, `load-report-rows.ts:25-28,78`, `is-valid-report-date.ts:7-12`, `filter-options.ts:36`, `queries/rpt-02-lot-and-transaction-history.ts:92`, `queries/rpt-03-participant-eligibility.ts:100`, `queries/rpt-06-accounting-export.ts:49`, `queries/rpt-08-post-lock-adjustments.ts:28`, `src/lib/accounting/build-accounting-lines.ts:7,78`, `tax.ts:1-16,25-27`, `src/app/api/reports/[reportCode]/export.csv/route.ts:20,25-82,33,47-58`, `src/app/(app)/reports/[reportCode]/page.tsx:27,68-76,127-128`, `supabase/migrations/20260908090000_accounting_export.sql:22-23`
