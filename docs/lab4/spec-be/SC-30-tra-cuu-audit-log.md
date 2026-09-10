# SC-30 — Tra cứu audit log · Spec BE

| | |
|---|---|
| FE liên quan | FE-042 (Tìm kiếm audit); phụ thuộc FE-041 (Ghi logical audit — phía ghi, không có màn) |
| FN | FN-13 (Logical audit và truy vết) |
| Ưu tiên | P1 |
| Yêu cầu khách | FR-AUDIT-02, NFR-PERF-01, FR-AUDIT-01, FR-RPT-03, §09-06 (APPI) |
| Miền dữ liệu | D-TRADE, D-SETTLE, D-PARTY |
| State machine | — (màn chỉ đọc, không có vòng đời trạng thái nghiệp vụ) |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

BE phải cung cấp: (a) một đường đọc audit **xuyên thực thể** với đủ **bốn tiêu chí bắt buộc** của `FR-AUDIT-02` (RFP:711) — ID giao dịch · ngày nghiệp vụ · người tham gia · loại thao tác — kết hợp được với nhau và mỗi tiêu chí đứng một mình cũng chạy được, cộng hai tiêu chí phụ là loại thực thể và người thực hiện; (b) một đường đọc **một bản ghi** kèm nội dung trước và sau cho panel so sánh; (c) một đường đọc **tập giá trị đóng** của loại thao tác để nạp cho ô chọn.

BE **không** làm ở màn này: **ghi** audit (thuộc FE-041 / `FR-AUDIT-01`, chạy ở mọi màn có thao tác nhạy cảm), sửa hoặc xoá bản ghi audit (dữ liệu chỉ-thêm), và **không** mở đường xuất dữ liệu ra tệp — `FR-AUDIT-02` chỉ đòi **tìm kiếm**, còn `FR-RPT-03` (RFP:709) khoanh phạm vi xuất dữ liệu vào catalog 12 báo cáo mà audit không thuộc catalog đó.

Ràng buộc chi phối toàn spec: mọi tiêu chí `FR-AUDIT-02` đòi tìm được **phải do phía ghi lưu từ đầu**. Cái gì phía ghi không lưu thì phía đọc không có cách nào tìm — xem mục 3 và mục 10.

## 2. Hợp đồng API

### `GET /api/audit`

| | |
|---|---|
| Thoả yêu cầu | FE-042 · FR-AUDIT-02 · NFR-PERF-01 |
| Xác thực · Vai trò được gọi | bắt buộc · xem mục 6 (ánh xạ actor chưa chốt — mục 9 câu 1) |
| Idempotent | có (đọc thuần) |

**Request** — mọi tham số ở `query`. Bốn tham số đầu là bốn tiêu chí bắt buộc: từng cái phải dùng được một mình, và bốn cái phải kết hợp được với nhau.

| Tham số | Kiểu | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|
| `transactionId` | string | uuid **hoặc** mã giao dịch nghiệp vụ; không phân tích được thì trả danh sách rỗng, **không** 4xx | FR-AUDIT-02 (tiêu chí 1/4) |
| `businessDateFrom`, `businessDateTo` | date | `YYYY-MM-DD`; **ngày nghiệp vụ JST**, không phải ngày hệ thống; from ≤ to | FR-AUDIT-02 (tiêu chí 2/4) |
| `participantId` | string | người tham gia **của bản ghi** (đối tượng nghiệp vụ) | FR-AUDIT-02 (tiêu chí 3/4) |
| `action` | enum | tập giá trị **đóng**; giá trị ngoài tập trả 422 | FR-AUDIT-02 (tiêu chí 4/4) |
| `entity` | enum | tiêu chí **phụ**; giá trị lạ bỏ qua bộ lọc | NFR-PERF-01 (thu hẹp kết quả) |
| `actorId` | uuid | tiêu chí **phụ**: người **thực hiện** thao tác — khác `participantId` | NFR-PERF-01 |
| `page`, `pageSize` | integer | phân trang **phía server**; mặc định và trần ở mục 9 | NFR-PERF-01 |

`participantId` và `actorId` là **hai khái niệm khác nhau** và không được gộp: một là đối tượng nghiệp vụ của bản ghi, một là chủ thể đã thực hiện thao tác.

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `items[].createdAt` | timestamp | Thời điểm ghi — một trong bốn thứ `FR-AUDIT-01` đòi truy được |
| `items[].businessDate` | date \| null | Ngày nghiệp vụ; `null` cho bản ghi chưa mang giá trị này (mục 3) |
| `items[].action`, `items[].entity`, `items[].entityId` | string | Loại thao tác, loại thực thể và mã thực thể |
| `items[].actorDisplayName` | string | **Tên hiển thị**; rỗng thì trả giá trị `hệ thống`, không trả rỗng. **Không** trả thư điện tử ở bất kỳ trường nào (§09-06, RFP:886) |
| `items[].reason` | string \| null | Lý do — `null` là hợp lệ |
| `items[].hasDiff` | boolean | Có nội dung trước/sau hay không; nguồn để bật hoặc tắt nút mở panel so sánh |
| `total`, `truncated` | integer, boolean | Tổng số bản ghi khớp; `truncated = true` khi kết quả vượt trần |

Đường này **không** trả nội dung trước và sau: dữ liệu tự do và có thể rất dài, nên chỉ trả qua đường đọc một bản ghi.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 400 | `RANGE_INVALID` | `businessDateFrom` > `businessDateTo` | FR-AUDIT-02 |
| 404 | — | Vai trò gọi không được vào màn — chặn **vào trang** | RFP:311 |
| 422 | `ACTION_UNKNOWN` | `action` không thuộc tập giá trị đóng | FR-AUDIT-02 |
| 422 | `PAGE_SIZE_EXCEEDED` | `pageSize` vượt trần do server đặt | NFR-PERF-01 |

**Tác dụng phụ** — không ghi bảng nào. Có ghi audit cho **chính hành vi tra cứu audit** hay không là mục 9 câu 4.

### `GET /api/audit/{id}`

| | |
|---|---|
| Thoả yêu cầu | FE-042 · FR-AUDIT-01 (nghiệm thu before/after) |
| Xác thực · Vai trò được gọi | bắt buộc · như đường danh sách |
| Idempotent | có (đọc thuần) |

**Request** — `id` ở `path`, uuid, bắt buộc.

**Response 2xx** — toàn bộ trường của một dòng danh sách, cộng `before` và `after`. **Cả hai rỗng là ca hợp lệ** (thao tác bị chặn vì lock, hoặc đăng nhập thất bại): hợp đồng phải trả `null` tường minh và phía đọc không được coi đó là lỗi.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `AUDIT_NOT_FOUND` | `id` không tồn tại | FR-AUDIT-02 |
| 404 | — | Vai trò gọi không được vào màn | RFP:311 |

**Tác dụng phụ** — không có.

### `GET /api/audit/action-types`

| | |
|---|---|
| Thoả yêu cầu | FE-042 · FR-AUDIT-02 (tiêu chí 4/4) · FR-AUDIT-01 |
| Xác thực · Vai trò được gọi | bắt buộc · như đường danh sách |
| Idempotent | có (đọc thuần) |

**Request** — không tham số.

**Response 2xx** — danh sách `{ action, label, group }`. Tập này phải **tối thiểu phủ** năm hành vi mà `FR-AUDIT-01` (RFP:710) liệt: tạo · sửa · phê duyệt · lock · đổi quyền. Tập nạp **từ server**, không viết cứng ở giao diện, để ô chọn không bao giờ lệch với dữ liệu thật.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | — | Vai trò gọi không được vào màn | RFP:311 |
| 503 | `ACTION_CATALOG_UNAVAILABLE` | Danh mục loại thao tác chưa được chuẩn hoá nên chưa dựng được tập đóng | FR-AUDIT-02 |

**Tác dụng phụ** — không có.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Bản ghi audit | chủ thể thực hiện | Cho phép rỗng (có đường ghi xảy ra trước khi có phiên); rỗng thì phía đọc hiện `hệ thống` | tầng 1 (FK cho phép null) | Có |
| Bản ghi audit | loại thao tác | **Tập giá trị đóng** phủ tạo · sửa · phê duyệt · lock · đổi quyền | tầng 1 (CHECK) hoặc bảng danh mục | Có ở mức cột; **tập giá trị chưa đóng** — mục 10 |
| Bản ghi audit | loại thực thể + mã thực thể | Lọc được độc lập; mã thực thể là chuỗi | tầng 1 | Có |
| Bản ghi audit | nội dung trước, nội dung sau, lý do | Cả ba cho phép rỗng; **cả trước và sau cùng rỗng là hợp lệ** | tầng 1 (null được) | Có |
| Bản ghi audit | thời điểm ghi | Bắt buộc | tầng 1 (not null) | Có |
| Bản ghi audit | **ngày nghiệp vụ** | Lọc được; là **ngày nghiệp vụ JST**, không suy được từ thời điểm ghi | tầng 1 (cột + not null cho bản ghi mới) | **Chưa có** — dữ liệu chưa từng được ghi |
| Bản ghi audit | **người tham gia của bản ghi** | Lọc được **không cần nối bảng** | tầng 1 (cột + index) | **Chưa có** — dữ liệu chưa từng được ghi |
| Bản ghi audit | index cho bốn tiêu chí | Mỗi tiêu chí một đường lọc **có index** | tầng 1 (index) | **Chưa có** — hiện không có index nào ngoài khoá chính |
| Người dùng nội bộ | mã, tên hiển thị | Nguồn của tên hiển thị người thực hiện; **không** lấy thư điện tử | tầng 3 | Có |

**Ba rào này khác loại nhau — đừng gộp thành "đạt 3/4 tiêu chí".** (a) *ID giao dịch* tra được nhưng chỉ qua **một cặp cột** loại thực thể + mã thực thể, không có cột riêng: đó là chuyện **hình dạng truy vấn**, sửa được ở tầng đọc. (b) *Ngày nghiệp vụ* và *người tham gia* **không có cột nào** — dữ liệu chưa từng được ghi, nên phải sửa **phía ghi** ở mọi điểm gọi, và **dữ liệu cũ không lấp lại được**. (c) *Index* là rào **độc lập** với (a) và (b): có đủ bốn cột mà không có index thì `NFR-PERF-01` vẫn không có đường đạt. Phần **ghi** audit thì đã đủ.

## 4. Vòng đời trạng thái

Màn chỉ đọc nên **không có** vòng đời trạng thái nghiệp vụ, và **không có** mã lỗi nào của đường ghi. Bản ghi audit là dữ liệu **chỉ-thêm**; bảng dưới đây khai đúng điều đó để phần dựng không thêm đường ghi nào.

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | Phía ghi (FE-041) tạo bản ghi audit | `đã ghi` | Thao tác thuộc năm hành vi `FR-AUDIT-01` liệt | mọi vai trò, qua màn nghiệp vụ của mình | (không thuộc màn này) |
| `đã ghi` | Sửa | — | **Chặn**: không tồn tại đường ghi update | — | không có đường ghi |
| `đã ghi` | Xoá | — | **Chặn**: không tồn tại đường ghi delete | — | không có đường ghi |
| `đã ghi` | Đọc qua màn này | `đã ghi` (không đổi) | Vai trò được vào màn (mục 6) | xem mục 6 | 404 |

Bản ghi audit **không** thuộc nhóm bảng bị khoá theo ngày nghiệp vụ, và màn không ghi gì, nên màn này không bao giờ trả mã lỗi khoá ngày.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| FR-AUDIT-02 (RFP:711) | "Hệ thống phải cho phép tìm kiếm audit theo: **ID giao dịch, ngày nghiệp vụ, người tham gia, loại thao tác**." | Bốn tham số đầu ở mục 2 | Bốn tiêu chí đều lọc được, riêng lẻ và kết hợp |
| FR-AUDIT-02 (RFP:711) | "Với các kịch bản tìm kiếm tiêu chuẩn, kết quả trả về trong ngưỡng NFR" | Phân trang phía server + index cho từng tiêu chí | Báo cáo load test (mục 8) |
| FR-AUDIT-01 (RFP:710) | "…truy được chủ thể thực hiện, timestamp, before/after và lý do" | Bốn trường tương ứng ở mục 2 | Bốn trường có mặt cho mọi bản ghi, kể cả khi giá trị rỗng |
| FR-AUDIT-01 (RFP:710) | Audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền" | Tập giá trị đóng của loại thao tác phải **phủ tối thiểu** năm hành vi này | Không hành vi nào trong năm thiếu khỏi tập |
| FR-RPT-03 (RFP:709) | Xuất dữ liệu "cho các báo cáo thuộc phạm vi cơ bản"; audit **không** thuộc catalog | Màn không có đường xuất tệp | Không tồn tại endpoint xuất audit |
| §09-06 (RFP:886) | "Cơ chế mã hoá, **kiểm soát truy cập theo vai trò (RBAC) và log truy cập** áp dụng cho thông tin cá nhân" | Chặn vào màn theo vai trò (mục 6); không trả thư điện tử ở bất kỳ trường nào | Không trường nào của response mang thư điện tử |
| NFR-PERF-01 (RFP:807) | "Tìm kiếm thông thường ở **p95 không vượt 2 giây** với tải thiết kế baseline." | Phân trang, trần kết quả, index | Báo cáo load test theo kịch bản đã chốt |

**Con số chưa có nguồn**: số dòng mỗi trang, trần kết quả, và định nghĩa "kịch bản tìm kiếm tiêu chuẩn" cùng "tải thiết kế baseline". RFP cho **một** con số cho màn này — ngưỡng p95 2 giây (RFP:807) — và không cho ba con số kia. Cả ba ở mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào màn | Tra cứu audit | Đọc nội dung trước/sau | Đọc danh mục loại thao tác |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép (đề xuất cho vòng đầu) | cho phép | cho phép | cho phép |
| ROLE-SETTLEMENT | **cần quyết định** — mục 9 câu 1 | cần quyết định | cần quyết định | cần quyết định |
| Năm vai còn lại: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-RULE-ADMIN | từ chối · **404** | từ chối · **404** | từ chối · **404** | từ chối · **404** |

Bảy vai trò lấy từ `TBL-ROLE-01` (RFP:249-255). **`FR-AUDIT-02` (RFP:711) gọi actor là "Bộ phận hành chính / kiểm toán nội bộ" — hai vai này KHÔNG có trong bảy vai trò của hệ.** Ánh xạ phải chốt trước khi dựng: mục 9 câu 1.

**Đọc và ghi là hai trục khác nhau.** Trục **ghi** không tồn tại ở màn này, nên toàn bộ phân quyền là phân quyền **đọc**. Và RFP **không** quy định ai đọc được bảng nào: RFP:311 (§02-08) chỉ nói *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Vậy phạm vi đọc ở đây là **đề xuất của bên dự thầu**, không phải yêu cầu khách. Đề xuất: **chặn vào màn** theo vai trò, vì audit là nơi dữ liệu nhạy tập trung nhất — mỗi dòng mang chủ thể, thời điểm và nội dung trước/sau của một thao tác.

Phải nói rõ hai điều để đề xuất này không bị đọc quá mạnh: (1) chính sách đọc mở hiện hành của hệ cho mọi vai trò đang hoạt động cũng là **đề xuất của bên dự thầu**, không phải yêu cầu khách, và nó **chống lại** RFP:886 (§09-06, APPI) — đây là chỗ đề xuất của ta chống một yêu cầu khách bằng chữ, và chúng tôi không chọn hộ; (2) gác màn ở tầng route **không** làm dữ liệu audit thành bí mật ở tầng dữ liệu — nó chỉ bỏ đi một giao diện duyệt hàng loạt. Cả hai điều đi vào mục 9 câu 2.

**Chặn trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại tài nguyên. Quyền bị thu hồi giữa phiên thì lần điều hướng sau cũng ra 404. Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Tra cứu audit | `read_audit_log` — **chưa quyết định có ghi hay không** | after: điều kiện tra cứu đã dùng và số bản ghi trả về · reason: không có | §09-06 (RFP:886 — "log truy cập") |
| Mở nội dung trước/sau của một bản ghi | `read_audit_diff` — cùng điều kiện trên | after: mã bản ghi đã mở | §09-06 (RFP:886) |
| Mọi thao tác nghiệp vụ khác | thuộc **FE-041**, không thuộc màn này | chủ thể · timestamp · before/after · lý do | FR-AUDIT-01 (RFP:710) |

Hai dòng đầu là **đề xuất có điều kiện, chưa chốt**. `FR-AUDIT-01` (RFP:710) liệt tạo · sửa · phê duyệt · lock · đổi quyền — **không** liệt hành vi đọc; nhưng RFP:886 đòi "log truy cập" cho thông tin cá nhân mà không nói rõ có áp cho việc đọc audit hay không. Ghi thì bảng audit tự sinh dòng về chính mình và tăng nhanh; không ghi thì mất vết ai đã duyệt dấu vết của ai. Mục 9 câu 4.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-PERF-01 (RFP:807) | Tìm kiếm thông thường p95 ≤ 2 giây; nghiệm thu bằng **báo cáo load test** | Ba ràng buộc cứng: phân trang **phía server từ đầu** (không tải hết rồi lọc), một đường lọc **có index** cho mỗi tiêu chí, và một **trần kết quả**. Bảng audit chỉ tăng nên số dòng nhỏ hôm nay không nói gì về một năm vận hành |
| §09-06 / APPI (RFP:886) | Mã hoá, RBAC và log truy cập cho thông tin cá nhân, nhất quán với `DR-RET-01` | Chặn vào màn theo vai trò; không trả thư điện tử ở bất kỳ trường nào; log truy cập là câu hỏi mở (mục 7) |
| DR-RET-01 (RFP:813) | Dữ liệu nghiệp vụ tra cứu online **7 năm** | Bảng audit thuộc nhóm 7 năm, nên khối lượng sau bảy năm là con số phải tính vào tải thiết kế baseline |
| NFR-SEC-04 (RFP:812) | TLS cho dữ liệu truyền | Response mang dữ liệu nhạy nên không được ghi ra log ứng dụng hay bộ đệm phía biên |
| NFR-COMP-01 (RFP:817) | Chạy trên trình duyệt được phê duyệt, thao tác được trên tablet | Bảng bảy cột phải cuộn ngang được trong khung riêng, không làm cả trang cuộn ngang |

## 9. Câu hỏi cho chủ đầu tư

- **"Bộ phận hành chính / kiểm toán nội bộ" ánh xạ sang vai trò nào, và ROLE-SETTLEMENT có được vào màn không?** Cần trước khi dựng vì nó là điều kiện của toàn mục 6. `FR-AUDIT-02` (RFP:711) gọi tên đúng hai vai này, nhưng `TBL-ROLE-01` (RFP:249-255) chỉ có bảy vai và **không vai nào mang tên đó**. Chúng tôi đề xuất ROLE-SYS-ADMIN cho vòng đầu và để ROLE-SETTLEMENT là câu hỏi, vì vai đó chủ trì đối chiếu và điều chỉnh sau lock nên có nhu cầu tra vết thật. Sai thì hoặc kiểm toán nội bộ không vào được màn dành cho họ, hoặc mở màn cho một vai không thuộc diện.
- **Có siết chính sách đọc dữ liệu audit ở tầng dữ liệu hay không?** Cần trước khi dựng vì đây là **quyết định kiến trúc**, chung một quyết định với SC-31, và là chỗ tài liệu khách kéo về hai phía: RFP:311 (§02-08) **giao cho bên dự thầu đề xuất** cơ chế phân tách quyền — không có yêu cầu đọc mở nào; RFP:886 (§09-06, APPI) đòi RBAC và log truy cập cho thông tin cá nhân. Chính sách đọc mở hiện hành là **đề xuất của bên dự thầu chống lại một yêu cầu khách bằng chữ** — chúng tôi khai đúng bản chất và không chọn hộ. Đánh đổi: siết quá thì phá đường tự đối chiếu mà các màn chi tiết đang dùng; mở quá thì mọi vai trò duyệt được toàn bộ dấu vết thao tác của đồng nghiệp. Lưu ý gác màn ở tầng route **không** làm dữ liệu audit thành bí mật ở tầng dữ liệu.
- **Tập giá trị đóng của loại thao tác gồm những gì?** Cần trước khi dựng vì `ACTION_UNKNOWN` ở mục 2 và ô chọn tiêu chí 4/4 đều dựa vào nó. `FR-AUDIT-01` (RFP:710) chỉ nêu năm **nhóm** hành vi (tạo · sửa · phê duyệt · lock · đổi quyền), không nêu tập giá trị. Sai thì ô chọn lệch với dữ liệu thật và người điều tra bỏ sót bản ghi. Kèm câu hỏi: ô chọn liệt theo **năm nhóm** hay liệt phẳng từng giá trị?
- **Có ghi audit cho chính hành vi tra cứu audit không?** Cần trước khi dựng vì nó đổi cả mục 7 và khối lượng dữ liệu ở mục 8. `FR-AUDIT-01` (RFP:710) **không** liệt hành vi đọc; RFP:886 đòi "log truy cập" cho thông tin cá nhân mà không nói rõ có áp cho đọc audit. Sai thì hoặc bảng tự sinh dòng về chính mình và tăng nhanh, hoặc mất vết ai đã duyệt dấu vết của ai.
- **Số dòng mỗi trang, trần kết quả, "kịch bản tìm kiếm tiêu chuẩn" và "tải thiết kế baseline" là gì?** Cần trước khi dựng vì nghiệm thu `NFR-PERF-01` (RFP:807) là **báo cáo load test**, và không có bốn con số này thì không có gì để đo. RFP chỉ cho ngưỡng p95 2 giây. Sai thì hoặc màn chặn người dùng ở một trần quá thấp, hoặc không đạt ngưỡng khi bảng lớn.
- **Bốn tiêu chí phải đạt ngưỡng khi dùng riêng lẻ, hay chỉ khi kết hợp?** Cần trước khi dựng vì nó quyết định số index phải có. `FR-AUDIT-02` đòi tìm được theo cả bốn nhưng không nói về tổ hợp. Sai thì thiết kế index hoặc thiếu, hoặc thừa và làm chậm đường ghi audit ở mọi màn khác.
- **Có mở đường xuất tệp cho kết quả tra cứu audit không?** Cần trước khi dựng vì đây là ranh giới phạm vi. `FR-AUDIT-02` chỉ đòi **tìm kiếm**; `FR-RPT-03` (RFP:709) khoanh xuất dữ liệu vào catalog 12 báo cáo và audit không thuộc catalog. Chúng tôi **không đề xuất** cho vòng đầu. Nếu khách yêu cầu thì đó là một đường mang dữ liệu thuộc diện APPI ra ngoài hệ thống, và cần kiểm soát riêng.
- **Ngày nghiệp vụ của bản ghi audit lấy từ đâu khi thao tác không gắn với một ngày nghiệp vụ nào?** Cần trước khi sửa phía ghi vì mọi điểm gọi phải truyền giá trị này. Ví dụ đổi quyền tài khoản không thuộc một ngày nghiệp vụ. Sai thì tiêu chí 2/4 lọc mất một phần bản ghi mà người điều tra không biết.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Dữ liệu audit để tra (FE-041 / `FR-AUDIT-01`) | Chủ thể · timestamp · before/after · lý do cho tạo · sửa · phê duyệt · lock · đổi quyền | **Đã có thật**: bảng `audit_log` đủ tám cột, ghi ở nhiều điểm gọi `writeAuditLog` khắp các nhóm chức năng; panel so sánh đã render ở hai màn chi tiết | `supabase/migrations/20260904090000_core_identity.sql:26-40`; `src/lib/audit/write-audit-log.ts` | Không lệch — phần ghi đã đủ |
| Màn tra cứu **xuyên thực thể** + đường đọc audit | `GET /api/audit` với 6 điều kiện | Chưa có route, chưa có endpoint. Hiện chỉ xem được audit của **một** thực thể từ trang chi tiết của nó | không có tệp `src/app/api/audit/` | Chưa thi công |
| Tiêu chí 1/4 · ID giao dịch | Một cột lọc được cho ID giao dịch | Tra được nhưng **chỉ qua một cặp cột** `entity` + `entity_id`; không có cột riêng, và `entity_id` là `text`. Đây là chuyện **hình dạng truy vấn**, sửa được ở tầng API | `supabase/migrations/20260904090000_core_identity.sql:30-31` | Khác có chủ đích |
| Tiêu chí 2/4 · ngày nghiệp vụ | Cột lọc được, giá trị JST | **Không có cột nào chứa nó**, và không tính ngược được từ `created_at`. Phải sửa **phía ghi** ở mọi điểm gọi; **dữ liệu cũ không lấp lại được** | `supabase/migrations/20260904090000_core_identity.sql:26-36` | Khác không chủ đích |
| Tiêu chí 3/4 · người tham gia | Cột lọc được, không cần nối bảng | **Không có cột nào.** Chỉ tới được bằng nối bảng theo từng `entity`, mỗi `entity` một đường khác nhau, và có `entity` không tới được | `supabase/migrations/20260904090000_core_identity.sql:26-36` | Khác không chủ đích |
| Tiêu chí 4/4 · loại thao tác | Tập giá trị **đóng** phủ năm hành vi | Có cột `action` nhưng là chuỗi **tự do**: không ràng buộc giá trị, không danh mục dùng chung, nhiều giá trị phân biệt trộn hai lối đặt tên → ô chọn chưa có tập đóng | `supabase/migrations/20260904090000_core_identity.sql:29` | Khác có chủ đích |
| `NFR-PERF-01` p95 ≤ 2 giây | Một đường lọc **có index** cho mỗi tiêu chí | `audit_log` **không có index nào ngoài khoá chính** — mọi bộ lọc quét toàn bảng, nên **không có đường đạt** ngưỡng khi bảng lớn. Rào này **độc lập** với hai rào thiếu cột | `supabase/migrations/20260904090000_core_identity.sql:26-36` | Khác không chủ đích |
| Kiểm soát truy cập audit theo vai trò (§09-06) | Mục 6 chặn vào màn theo vai trò | Policy đọc mở cho **mọi vai trò đang hoạt động** đọc `audit_log` (`FR-601` — **mã nội bộ LAB-3**, không phải mã yêu cầu của khách); có chủ đích khi dựng prototype | `supabase/migrations/20260904090900_rls_core.sql:28-33` | Cần khách chốt |

## 11. Dẫn chứng

- RFP:249-255 — `TBL-ROLE-01`: bảy vai trò nội bộ. RFP:311 — §02-08: bên dự thầu **phải đề xuất** cơ chế phân tách quyền và truy vết.
- RFP:601 — `GOV-RULE-01`: maker-checker chỉ cho quy tắc/biểu suất. RFP:709 — `FR-RPT-03`: phạm vi xuất dữ liệu khoanh vào catalog báo cáo.
- RFP:710 — `FR-AUDIT-01`: audit cho tạo · sửa · phê duyệt · lock · đổi quyền, với chủ thể · timestamp · before/after · lý do.
- RFP:711 — `FR-AUDIT-02`: tìm kiếm theo **ID giao dịch, ngày nghiệp vụ, người tham gia, loại thao tác**; actor là "bộ phận hành chính / kiểm toán nội bộ"; nghiệm thu là kết quả trong ngưỡng NFR.
- RFP:807 — `NFR-PERF-01`: p95 ≤ 2 giây, nghiệm thu bằng báo cáo load test. RFP:812-813, RFP:817 — `NFR-SEC-04`, `DR-RET-01`, `NFR-COMP-01`.
- RFP:886 — §09-06 APPI: mã hoá, RBAC và **log truy cập** cho thông tin cá nhân, nhất quán với `DR-RET-01`.
- Function List `FN-13` · Feature List `FE-041` (phía ghi, không có màn) và `FE-042` (phía đọc).
- Chỉ cho phần đối chiếu prototype ở mục 10: `supabase/migrations/20260904090000_core_identity.sql:26-40`, `20260904090900_rls_core.sql:28-33`, `src/lib/audit/write-audit-log.ts`.
