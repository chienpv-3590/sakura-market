# SC-25 — Danh mục báo cáo · Spec BE

| | |
|---|---|
| FE liên quan | FE-033 (Khung báo cáo dùng chung), FE-034 (Nhóm báo cáo ngày RPT-01..RPT-05) |
| FN | FN-10 (Báo cáo và xuất dữ liệu) |
| Ưu tiên | P0 |
| Yêu cầu khách | FR-RPT-01, FR-RPT-03, TBL-REPORT-01, FR-AUDIT-01, NFR-PERF-01, NFR-PERF-02, NFR-COMP-01 |
| Miền dữ liệu | D-SETTLE · D-TRADE · D-DELIVERY (theo `FR-RPT-01`) — bản thân danh mục **không đọc thực thể nghiệp vụ nào** |
| State machine | **không có** — xem mục 4 |
| Đã thi công | Một phần |

## 1. Phạm vi backend của màn này

BE phải trả **đúng 12 mã** báo cáo bắt buộc của `TBL-REPORT-01` (RFP:740-755) kèm tên, tần suất, **bộ lọc bắt buộc** và nhóm tính năng, và
phải công bố **một** khung dùng chung cho cả 12 mã: bộ lọc · phân trang · xuất CSV (`FE-033` · `FR-RPT-01` RFP:707). Danh mục là **hằng
của yêu cầu khách**, không phải dữ liệu cấu hình: `FR-RPT-03` (RFP:709) nói thẳng hệ thống *"**không yêu cầu** công cụ tự tạo báo cáo
(self-service report builder)"*, và RFP:757 chốt lại catalog là *"12 báo cáo cố định có filter"* — nên **không** có đường thêm mã thứ 13,
thêm cột, hay đặt bộ lọc mới. **Không** thuộc phạm vi: chạy và xuất từng báo cáo (SC-26); batch xuất dữ liệu kế toán xuyên ngày (SC-27 ·
`IF-ACC-01` RFP:759-767); và mọi thứ RFP xếp ngoài phạm vi cơ bản (`SCOPE-OUT-04` RFP:407 — cổng tự phục vụ cho 買出人).

## 2. Hợp đồng API

### `GET /api/reports`

Thoả `FE-033` · `FE-034` · `FR-RPT-01` · `TBL-REPORT-01`. Xác thực **bắt buộc**; vai trò xem mục 6; **idempotent** vì chỉ đọc và **không
đọc thực thể nghiệp vụ nào**.

**Request** — không có tham số. Đây là một chủ ý: danh mục không lọc, không phân trang, không sắp xếp được, vì nó phải là **bản sao nguyên
trạng** của `TBL-REPORT-01` — 12 dòng, đúng thứ tự mã của yêu cầu khách.

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `reports[].code` | string `RPT-NN` | mã báo cáo — cửa vào SC-26; đúng 12 mã `RPT-01`..`RPT-12` |
| `reports[].title` | string | tên báo cáo bắt buộc theo `TBL-REPORT-01` |
| `reports[].frequency` | enum | `hàng ngày` \| `hàng ngày hoặc theo kỳ` \| `hàng tháng` \| `mỗi lần thay đổi và hàng tháng` — bốn giá trị RFP:744-755 dùng |
| `reports[].filterFields[]` | array | **bộ lọc bắt buộc** của mã đó: `{key, type, required}` — nguồn duy nhất, dùng chung với form lọc ở SC-26 (mục 9 câu 2) |
| `reports[].featureGroup` | enum | `FE-034` \| `FE-035` \| `FE-036` — để truy vết mã báo cáo về Feature List |
| `reports[].dataSourceReady` | boolean | báo cáo đã có nguồn dữ liệu thật hay chưa (mục 9 câu 1) |
| `reports[].blockedBy` | string \| `null` | khi `dataSourceReady = false` thì nói rõ **cái gì đang chặn**, ví dụ `SC-17` hoặc `SC-19` |
| `framework` | object | khung dùng chung: `pageSize` (mục 9 câu 3) · `csvExportScope` = `filtered-set` · `selfServiceBuilder` = `false` (`FR-RPT-03`) |

`filterFields[]` **phải** là cùng một nguồn với form lọc của SC-26. Nếu danh mục mô tả bộ lọc bằng một câu chữ riêng thì hai nguồn lệch
nhau mà không ai phát hiện — mục 9 câu 2 và mục 10.

**Mã lỗi** — 401 · 307 về trang đăng nhập khi không có phiên hoặc tài khoản đã bị vô hiệu (`FR-IAM-01` RFP:627) · 500 `INTERNAL_ERROR`
(lỗi khi dựng danh mục). **Không có 404 theo vai trò** ở endpoint này — xem mục 6.

**Tác dụng phụ** — không ghi bảng nào; không ghi audit (đọc không nằm trong tập `FR-AUDIT-01` RFP:710); không phát thông báo.

> **Danh mục không bao giờ rỗng.** `reports[]` luôn có đúng 12 phần tử. Một phản hồi rỗng hoặc thiếu mã là **lỗi**, không phải
> trạng thái rỗng — vì thế mục 4 không có trạng thái "rỗng" và client không cần màn rỗng.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Danh mục báo cáo | `code`, `title`, `frequency`, `feature_group` | **đúng 12 mã** của `TBL-REPORT-01`, không thêm không bớt; `code` duy nhất | tầng 3 — danh mục là hằng, không phải bảng dữ liệu | có |
| Danh mục báo cáo | `filter_fields` | mỗi mã mang đúng bộ lọc bắt buộc mà `TBL-REPORT-01` liệt cho nó | tầng 3 | một phần — mục 10 |
| Danh mục báo cáo | `data_source_ready`, `blocked_by` | phân biệt *"chưa có nguồn dữ liệu"* với *"nguồn trả 0 dòng"* | tầng 3 | một phần — mục 10 |
| Người dùng nội bộ | `is_active` | chỉ tài khoản đang hoạt động đọc được danh mục | tầng 1 (cột) + tầng 3 (cửa kiểm phiên) | có |

**Danh mục cố ý không là bảng dữ liệu.** `FR-RPT-03` (RFP:709) cấm công cụ tự tạo báo cáo, nên nếu danh mục nằm trong một bảng sửa được
thì đã có một cửa hậu để dựng mã thứ 13 bằng cách sửa dữ liệu. Đặt nó là hằng ở tầng 3 làm cho *"thêm một báo cáo"* thành **việc phát
triển**, không phải việc cấu hình — đó là ràng buộc phạm vi, không phải sự tiện tay.

Vì màn không đọc thực thể nghiệp vụ nào, nó **không chạm** bảng nào mang ngày nghiệp vụ, nên khoá kỳ (`BR-CLOSE-01` RFP:597) không có tác
dụng gì ở đây.

## 4. Vòng đời trạng thái

**Màn này không có vòng đời trạng thái, và đó là một kết luận chứ không phải một chỗ bỏ trống.** `TBL-REPORT-01` (RFP:740-757) là một bảng
liệt kê tĩnh; RFP không có `FIG-*` nào cho danh mục báo cáo, và danh mục không có đối tượng nghiệp vụ nào để chuyển trạng thái. Thứ duy
nhất **có** hai giá trị là `dataSourceReady` của từng mã, và nó không phải trạng thái nghiệp vụ mà là **hệ quả** của việc một màn khác đã
dựng hay chưa.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | mở danh mục | — | phiên đăng nhập còn hiệu lực và tài khoản đang hoạt động | mọi vai đang hoạt động | 307 về trang đăng nhập |
| `dataSourceReady = false` | màn nguồn được dựng xong | `dataSourceReady = true` | **không phải chuyển trạng thái nghiệp vụ** — là kết quả của một lần triển khai | không ai (không có thao tác người dùng) | không phát sinh |
| — | thêm mã báo cáo thứ 13 | — | **không có cạnh này trong thiết kế** — `FR-RPT-03` RFP:709 | không ai | không có endpoint nào nhận |

Guard duy nhất của màn nằm ở cửa vào, và nó là **hai điều kiện chứ không phải một**: có phiên **và** tài khoản đang hoạt động. Gộp thành
một điều kiện thì một tài khoản đã bị vô hiệu vẫn vào được bằng phiên cũ.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| TBL-REPORT-01 (RFP:740-755) | catalog **12** báo cáo bắt buộc, mỗi mã có tần suất và **filter** cụ thể | tầng 3 — hằng danh mục | đếm phản hồi ra đúng 12 mã; đối chiếu từng tên, tần suất và bộ lọc với bảng RFP |
| RFP:757 | *"gồm **12 báo cáo cố định có filter** và xuất CSV"*; *"Chủ đầu tư **không yêu cầu** công cụ tự tạo báo cáo (self-service)"* | tầng 3 — không endpoint nào thêm hoặc sửa mã | thử thêm một mã bằng mọi đường vào: không đường nào nhận |
| FR-RPT-03 (RFP:709) | *"cho phép xuất dữ liệu có cấu trúc ... và **không yêu cầu** công cụ tự tạo báo cáo"*; nghiệm thu *"xuất được CSV từ các báo cáo trong catalog mà không cần tự tạo template mới"* | tầng 3 — khung dùng chung ở `framework` | xuất CSV từ một mã bất kỳ có nguồn thật, không dựng template nào |
| FR-RPT-01 (RFP:707) | *"phải sinh báo cáo ngày theo catalog bắt buộc"*; nghiệm thu *"Báo cáo ngày có đầy đủ các trường bắt buộc và xuất được CSV"* | tầng 3 — danh mục công bố `filterFields`, SC-26 thực thi | mỗi mã hàng ngày mở được và xuất được CSV |
| FR-RPT-02 (RFP:708) | báo cáo tháng *"tổng hợp đúng theo ngày nghiệp vụ và phiên bản rule"* | tầng 3 — cùng một khung phân trang và xuất CSV cho nhóm hàng tháng | nhóm `RPT-10`..`RPT-12` dùng đúng khung của `FE-033`, không có cơ chế riêng |

Màn này có **một** con số nghiệp vụ dẫn được nguồn: **12** mã, từ `TBL-REPORT-01` (RFP:740-755). Con số bị đòi mà RFP **không cho** — kích
thước trang của khung dùng chung — nằm ở mục 9 câu 3.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Xem danh mục 12 mã | Xem `filterFields` của từng mã | Mở một mã (SC-26) | Ghi bất kỳ |
|---|---|---|---|---|
| Cả 7 vai trò: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN | **đề xuất** cho phép — xem dưới | cho phép | cho phép; phân biệt vai trò xảy ra ở SC-26 và SC-27 | **không có** thao tác ghi nào ở màn này |

- **Đọc mở cho cả 7 vai là ĐỀ XUẤT của bên dự thầu, không phải yêu cầu khách.** Căn cứ duy nhất: §02-08 (RFP:311) *"Đơn vị dự thầu phải
  **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* — RFP **giao cho bên dự thầu đề xuất**, không bắt
  đọc mở. Lý do đề xuất: danh mục chỉ nói hệ thống *có* những báo cáo nào, không chứa số liệu nghiệp vụ và không chứa thông tin cá nhân —
  đây là bề mặt ít nhạy cảm nhất trong 32 màn. Căng thẳng với §09-06 (APPI, RFP:886) ở **mục 9 câu 5**, và nó nhẹ hơn ở màn này so với các
  màn khác đúng vì danh mục không mang dữ liệu cá nhân.
- **Đọc và ghi là hai trục khác nhau.** Trục **ghi**: màn không có thao tác ghi nào, và điều đó là ràng buộc phạm vi của `FR-RPT-03` chứ
  không phải thiếu tính năng. Trục **đọc**: chặn theo vai trò hay không là câu hỏi mở ở mục 9 câu 5; hiện đề xuất không chặn.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Ở màn này quy ước đó **không phát sinh** vì
  không có cửa kiểm vai trò; thiếu phiên đăng nhập thì trả **307** về trang đăng nhập kèm lý do, không phải 404.
- **Không có maker-checker ở màn này.** `GOV-RULE-01` (RFP:601) áp cho thay đổi quy tắc và biểu suất (SC-23 · SC-24). Thêm một mã báo cáo
  **không** là thay đổi cấu hình có kiểm soát mà là một lần phát triển — nên nó không đi qua maker-checker, nó đi qua quy trình phát hành.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Xem danh mục | **không ghi** | — | `FR-AUDIT-01` (RFP:710) liệt tạo · sửa · phê duyệt · lock · đổi quyền; **đọc không nằm trong tập đó**, và danh mục không mang số liệu nghiệp vụ |
| Lần thử vào khi tài khoản đã bị vô hiệu | `inactive_account_access` | chủ thể · thời điểm · đường vào · kết quả bị chuyển về trang đăng nhập | `NFR-SEC-03` RFP:811 (*"log các hành vi bất thường"*) |
| Thay đổi danh mục 12 mã | **không có thao tác nào để audit** | — | `FR-RPT-03` RFP:709 — mọi thay đổi danh mục là một lần phát hành, dấu vết nằm ở lịch sử mã nguồn chứ không ở audit nghiệp vụ |

Đây là màn có bề mặt audit **nhỏ nhất** trong nhóm báo cáo, và điều đó đúng: audit nghiệp vụ theo `FR-AUDIT-01` gắn với thao tác làm đổi
dữ liệu, còn màn này không đổi gì. Hai thao tác thật sự cần audit của `FN-10` — xuất CSV và tạo batch kế toán — nằm ở SC-26 và SC-27.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-PERF-01 (RFP:807) | tìm kiếm thông thường p95 ≤ 2 giây | danh mục không đọc thực thể nghiệp vụ nào nên nó **luôn** đạt; nhưng `pageSize` mà nó công bố (mục 9 câu 3) quyết định việc 12 báo cáo ở SC-26 có đạt hay không |
| NFR-PERF-02 (RFP:808) | không làm chậm tác vụ giao dịch cốt lõi ở cao điểm | báo cáo ngày chạy đúng đoạn 08:00–10:00 (RFP:304), chồng lên cuối khung giờ giao dịch; khung dùng chung phải chặn được một lần xuất CSV cỡ lớn kéo cả hệ thống chậm theo |
| NFR-AVL-01 (RFP:804) | 99,5% trong khung 02:00–10:00 JST | danh mục là điểm vào của cả `FN-10`; mất nó là mất đường tới toàn bộ 12 báo cáo bắt buộc của ngày |
| NFR-COMP-01 (RFP:817) | chạy trên trình duyệt được phê duyệt; thao tác được trên tablet | phản hồi gọn, không kèm dữ liệu báo cáo; 12 dòng trả một lần, không phân trang |
| NFR-SEC-03 (RFP:811) | session timeout, khoá tạm khi nhập sai nhiều lần, log hành vi bất thường | cửa vào kiểm **hai** điều kiện (có phiên **và** tài khoản đang hoạt động) và ghi log ở nhánh tài khoản bị vô hiệu (mục 7) |

## 9. Câu hỏi cho chủ đầu tư

1. **Danh mục có được phép nói mã nào chưa có nguồn dữ liệu thật?** `TBL-REPORT-01` (RFP:740-755) chỉ liệt 12 mã, **không** có khái niệm
   "báo cáo chưa có nguồn". Thiết kế đề xuất hai trường `dataSourceReady` và `blockedBy` (mục 2) để người dùng không nhầm một báo cáo
   trống với một báo cáo chưa dựng. *Vì sao cần trước khi code:* nếu Chủ đầu tư coi việc công bố này là không chấp nhận được thì phải chọn
   đường khác — ẩn mã chưa dựng, hoặc chặn cửa vào của nó. *Chọn sai:* không công bố thì người vận hành đọc số 0 như số thật; ẩn mã thì
   danh mục không còn đúng 12 dòng như `TBL-REPORT-01` đòi.
2. **Cột "Filter" của `TBL-REPORT-01` là bộ lọc bắt buộc hay tiêu chí tuỳ chọn?** RFP:742-755 đặt tên cột là *"Filter"* và liệt field cho
   từng mã, nhưng **không nói** field đó bắt buộc phải có giá trị mới chạy được báo cáo. *Vì sao cần trước khi code:* bắt buộc thì báo cáo
   không chạy được khi thiếu field, và đó là một mã lỗi ở SC-26. *Chọn sai:* coi là bắt buộc thì người dùng bị chặn ở những báo cáo lẽ ra
   xem được toàn bộ; coi là tuỳ chọn thì một báo cáo ngày có thể chạy trên toàn bộ dữ liệu và vỡ ngưỡng `NFR-PERF-01` (RFP:807).
3. **Kích thước trang của khung dùng chung là bao nhiêu, và bản xuất CSV có trần số dòng không?** RFP **không cho con số nào**;
   `FR-RPT-03` (RFP:709) chỉ đòi *"xuất được CSV"*. Thiết kế chốt `csvExportScope = filtered-set` (xuất toàn bộ tập đã lọc, không cắt theo
   trang) — đó là suy luận từ nghiệm thu, không phải chữ RFP. *Chọn sai:* trang quá lớn thì vỡ `NFR-PERF-01`; xuất không trần thì một lần
   xuất cỡ lớn chạy đúng đoạn 08:00–10:00 làm chậm tác vụ giao dịch, ngược `NFR-PERF-02` (RFP:808).
4. **Báo cáo tháng dùng đúng khung của `FE-033`, hay có cơ chế riêng?** `FE-033` nói *"dùng chung cho cả 12 báo cáo bắt buộc"* nhưng
   `FR-RPT-02` (RFP:708) đòi báo cáo tháng *"tổng hợp đúng theo ngày nghiệp vụ **và phiên bản rule**"* — một chiều dữ liệu mà nhóm hàng
   ngày không có. *Chọn sai:* nhồi phiên bản rule vào khung chung thì 9 báo cáo còn lại mang một bộ lọc vô nghĩa; tách khung riêng thì
   `FE-033` không còn là khung dùng chung.
5. **Ai được đọc danh mục?** RFP không nói; §02-08 (RFP:311) **giao cho bên dự thầu đề xuất**, và chúng tôi đề xuất mở cho cả 7 vai (mục
   6). **Đây là đề xuất của bên dự thầu chống lại một yêu cầu của khách**: §09-06 (RFP:883-886) đòi *"kiểm soát truy cập theo vai trò
   (RBAC) và log truy cập"* cho thông tin cá nhân người tham gia. Ở màn này căng thẳng nhẹ hơn vì danh mục không mang dữ liệu cá nhân —
   nhưng nó **là cửa vào** của những báo cáo có mang, ví dụ `RPT-03` (danh sách người tham gia mất hiệu lực) và `RPT-10` (báo cáo tháng
   theo từng người tham gia). Chúng tôi **không chọn hộ**: nếu Chủ đầu tư ưu tiên §09-06 thì cửa kiểm vai trò phải đặt ở SC-26 theo từng
   mã báo cáo, và danh mục ở SC-25 phải ẩn những mã mà vai đang đăng nhập không được xem — khi đó điều kiện *"luôn đúng 12 dòng"* ở mục 2
   không còn đúng.
6. **Bốn giá trị tần suất của `TBL-REPORT-01` có phải là ràng buộc chức năng?** RFP:744-755 ghi *"Hàng ngày"*, *"Hàng ngày / theo kỳ"*,
   *"Hàng tháng"*, *"Mỗi lần thay đổi và hàng tháng"* — nhưng **không nói** hệ thống phải chặn chạy một báo cáo hàng tháng cho một ngày,
   hay tự sinh theo lịch. Cùng lúc kiến trúc hiện tại **không có** cơ chế chạy theo lịch. *Chọn sai:* hiểu là ràng buộc thì phải dựng hạ
   tầng lịch chạy mà không yêu cầu nào đòi; hiểu là mô tả thì báo cáo tháng có thể bị chạy sai kỳ.
7. **Danh mục 12 mã có cần một đường công bố cho hệ thống ngoài không?** `IF-ACC-01` (RFP:759-767) chỉ nói về dữ liệu đối chiếu sau lock,
   không nói về danh mục. *Chọn sai:* mở một đường công bố không ai yêu cầu là mở thêm bề mặt bảo mật; không mở thì nếu sau này bên kế
   toán cần biết mã báo cáo nào tồn tại, phải sửa mã nguồn.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Cả 12 mã chạy trên nguồn dữ liệu thật | 12 mã có bộ lọc và xuất được CSV (`FR-RPT-01` · `FR-RPT-03`) | **7 mã thật** (`RPT-01`, `02`, `03`, `05`, `06`, `07`, `08`) và **5 mã dữ liệu mẫu** (`RPT-04`, `09`, `10`, `11`, `12`) — mã mẫu có bộ lọc rỗng, cột rỗng và bị chặn xuất CSV | `src/lib/reports/registry.ts:66,75,84,93,102,111,120,129,138,147,156,165`; thiết kế RFP:740-757 | **Thiếu — 5/12** |
| Nguyên nhân của từng mã còn dữ liệu mẫu | nói rõ **cái gì** đang chặn (`blockedBy` ở mục 2) | `RPT-04` bị chặn bởi **SC-17** (chưa có nguồn ngoại lệ giao hàng) và `RPT-09` bị chặn bởi **SC-19** (chưa có bảng tranh chấp và mốc SLA) — cả hai là **phụ thuộc màn chưa dựng**, không phải "không có nguồn dữ liệu vĩnh viễn"; chú thích trong mã nguồn hiện khai là *"stay mock permanently"*, khai sai bản chất | `src/lib/reports/registry.ts:55-58,89-96,134-141`; `docs/lab4/spec/SC-17-ghi-nhan-ngoai-le-giao-hang.md`; `docs/pham-vi-va-phan-mock.md:79` | **Khác không chủ đích** — lệch ở phần khai nguyên nhân, không ở con số |
| Bộ lọc là **một** nguồn dùng chung với SC-26 | `filterFields[]` là nguồn duy nhất (mục 2) | **hai nguồn rời nhau**: danh mục hiện một câu mô tả lấy từ từ điển ngôn ngữ, còn form lọc lấy từ khai báo field — hai bên lệch được mà không ai phát hiện. Ví dụ `RPT-04` mô tả *"Ngày nghiệp vụ, loại ngoại lệ"* nhưng khai báo field **rỗng** | `src/lib/reports/registry.ts:65,67,89-96`, `src/lib/reports/registry-filters.ts:1-40` | Khác không chủ đích — mục 9 câu 2 |
| `dataSourceReady` · `blockedBy` | hai trường ở phản hồi | có một cờ nhị phân *"thật hay mẫu"* nhưng **không** có trường nói cái gì đang chặn; và cờ đó không phân biệt *"chưa có nguồn"* với *"nguồn trả 0 dòng"* | `src/lib/reports/registry.ts:31`, `src/app/api/reports/route.ts:5-16` | Khác không chủ đích |
| Bốn giá trị tần suất là dữ liệu có cấu trúc | enum ở mục 2 | tần suất chỉ là một khoá chuỗi trỏ vào từ điển ngôn ngữ, không phải enum kiểm được — nên không cửa nào kiểm được một báo cáo tháng có bị chạy sai kỳ | `src/lib/reports/registry.ts:26-34` | **Cần khách chốt** — mục 9 câu 6 |
| Kích thước trang | mục 9 câu 3 | cố định **50** dòng, không cấu hình được và **không dẫn được nguồn** yêu cầu nào — chú thích trong mã tự khai là quyết định của prototype | `src/lib/reports/report-page-size.ts:1-2` | **Cần khách chốt** |
| Xuất CSV lấy toàn bộ tập đã lọc | `csvExportScope = filtered-set` | đúng như thiết kế; mã còn dữ liệu mẫu bị chặn xuất bằng một mã lỗi riêng thay vì trả tệp rỗng — chỗ này **khớp** chủ ý phân biệt "chưa dựng" với "không có dữ liệu" | `docs/generated/api-map.md` § Reports | không lệch |
| Không có công cụ tự tạo báo cáo | `FR-RPT-03` RFP:709 | đúng như thiết kế: danh mục là hằng trong mã nguồn, không đường nào thêm mã thứ 13 hay đổi hình dạng bộ lọc | `src/lib/reports/registry.ts:46-49` | không lệch |
| Đọc mở cho cả 7 vai | mục 6 là **đề xuất** dẫn RFP:311 | đúng như đề xuất: cửa vào chỉ kiểm phiên đăng nhập, không kiểm vai trò; ở tầng dữ liệu thì đọc mở cho mọi vai, ghi vết bằng mã nội bộ LAB-3 **`FR-601`** (**mã nội bộ, không phải mã yêu cầu của khách**) | `src/app/api/reports/route.ts:5-16`, `supabase/migrations/20260904090900_rls_core.sql:29` | **Cần khách chốt** — mục 9 câu 5 |
| Chú thích nội bộ khai đúng con số | 7 thật / 5 mẫu | một chú thích cũ ở màn xem báo cáo còn khai *"9 mock / 3 real"* — con số của bản 10 giờ đầu; chỉ là chú thích, không ảnh hưởng hành vi nhưng đọc dễ lệch | `src/components/reports/mock-data-badge.tsx:1-3` | Lệch tài liệu nội bộ, không lệch thiết kế |

## 11. Dẫn chứng

- RFP:707 `FR-RPT-01` · RFP:708 `FR-RPT-02` · RFP:709 `FR-RPT-03` (*"**không yêu cầu** công cụ tự tạo báo cáo"*)
- RFP:740-755 `TBL-REPORT-01` — 12 mã kèm tần suất và filter bắt buộc · RFP:757 *"12 báo cáo cố định có filter"*
- RFP:747 `RPT-04` (ngày nghiệp vụ, loại ngoại lệ) · RFP:752 `RPT-09` (trạng thái tranh chấp) · RFP:753-755 `RPT-10`..`RPT-12`
- RFP:710 `FR-AUDIT-01` · RFP:627 `FR-IAM-01` · RFP:597 `BR-CLOSE-01` · RFP:601 `GOV-RULE-01` · RFP:759-767 `IF-ACC-01`
- RFP:309-311 §02-08 (Chủ đầu tư quyết phân quyền; bên dự thầu **đề xuất**) · RFP:883-886 §09-06 APPI · RFP:407 `SCOPE-OUT-04`
- RFP:304 §02-07 (báo cáo ngày ở đoạn 08:00–10:00) · RFP:804/807/808/811/817 `NFR-AVL-01`, `NFR-PERF-01/02`, `NFR-SEC-03`, `NFR-COMP-01`
- Feature List `FE-033`, `FE-034` (FN-10, P0) và `FE-035`, `FE-036` —
  `plans/260909-1355-lab4-thiet-ke-chi-tiet/nguon-function-list-va-feature-list.md`
- `src/lib/reports/registry.ts:26-34,46-49,55-58,60-169` (12 entry; 7 mã `isMock: false`; 5 mã `isMock: true`) ·
  `registry-filters.ts:1-40` · `report-page-size.ts:1-2`
- `src/app/api/reports/route.ts:5-16` · `src/components/reports/mock-data-badge.tsx:1-3` ·
  `supabase/migrations/20260904090900_rls_core.sql:29` (mã nội bộ LAB-3 `FR-601`)
- `docs/generated/api-map.md` § Reports · `docs/pham-vi-va-phan-mock.md:79` · `docs/lab4/spec/SC-17-ghi-nhan-ngoai-le-giao-hang.md`
