# SC-28 — Hộp thông báo trong ứng dụng · Spec BE

| | |
|---|---|
| FE liên quan | FE-038 (Thông báo in-app và email), FE-039 (Thông báo Critical trong 5 phút) |
| FN | FN-12 (Thông báo và cảnh báo vận hành) |
| Ưu tiên | P1 |
| Yêu cầu khách | FR-NOTIFY-01, FR-NOTIFY-02, BR-NOTIFY-01, NFR-OPS-01, NFR-PERF-01, DR-RET-01 |
| Miền dữ liệu | D-PARTY, D-DELIVERY, D-SETTLE (thông báo trỏ về đối tượng của ba miền này) |
| State machine | — (RFP không có `FIG-*` cho vòng đời thông báo) |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

BE phải cung cấp: (a) đường đọc hộp thư của **chính người gọi** — thông báo gửi đích danh hoặc gửi
cho vai trò người đó giữ, có lọc theo chưa đọc và theo mức độ; (b) đường ghi trạng thái đã đọc cho
một thông báo và cho toàn bộ hộp thư; (c) đường đọc **log gửi** của một thông báo mang đúng bốn thứ
`FR-NOTIFY-01` đòi nghiệm thu (kênh · người nhận · kết quả · số lần thử) cộng mốc 5 phút của
`FR-NOTIFY-02`; (d) bộ đếm **queue cảnh báo vận hành** cho ROLE-SYS-ADMIN.

BE **không** làm ở màn này: **sinh** thông báo (do nguồn event gọi, không phải hành động của màn),
gửi kênh ngoài (thuộc tầng gửi), và **không** hỗ trợ kênh nào ngoài `in_app` và `email` —
`FR-NOTIFY-01` (RFP:686) khai thẳng *"SMS và FAX không thuộc kênh thông báo"*, nên hợp đồng API
không được để chỗ cho kênh thứ ba.

## 2. Hợp đồng API

### `GET /api/notifications`

| | |
|---|---|
| Thoả yêu cầu | FE-038 · FR-NOTIFY-01 · NFR-PERF-01 |
| Xác thực · Vai trò được gọi | bắt buộc · cả bảy vai trò của `TBL-ROLE-01` |
| Idempotent | có (đọc thuần) |

**Request** — mọi tham số ở `query`, không tham số nào bắt buộc. Server tự quyết, **không nhận từ client**: phạm vi người nhận (luôn là chính người gọi cộng vai trò người đó giữ) và thứ tự sắp xếp; client **không** truyền được `recipientId`.

| Tham số | Kiểu | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|
| `unreadOnly` | boolean | mặc định `false` | FE-038 (field #9) |
| `severity` | enum | `critical` \| `thường`; giá trị lạ thì **bỏ qua bộ lọc**, không trả lỗi | FR-NOTIFY-02 |
| `page`, `pageSize` | integer | phân trang; mặc định và trần ở mục 9 | NFR-PERF-01 |

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `items[].severity`, `items[].eventType` | enum | Mức độ và loại event — field #1 và #2 |
| `items[].title`, `items[].body` | string | Tiêu đề và nội dung; nội dung trả bản đã cắt bớt |
| `items[].entityLink` | string | Đường dẫn **dựng ở server** từ loại đối tượng + mã đối tượng, chỉ điều hướng nội bộ. BE không lưu và không trả đường dẫn thô lấy từ dữ liệu — ràng buộc an toàn, không phải tuỳ chọn |
| `items[].createdAt`, `items[].readAt` | timestamp | Thời điểm sinh event (mốc đếm 5 phút) và thời điểm **người gọi** đã đọc |
| `items[].deliverySummary` | object | Bản thu gọn log gửi: mỗi kênh một kết quả + số lần thử / 3 |
| `items[].deliveryState` | enum | `đang gửi` \| `đã gửi` \| `đang retry` \| `đã vào queue cảnh báo vận hành` \| `quá hạn 5 phút` |
| `unreadCount` | integer | Nguồn của badge đếm chưa đọc trên top header |
| `opsAlertQueueCount` | integer | **Chỉ trả cho ROLE-SYS-ADMIN**; vai khác không có trường này |

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 401 | — | Không có phiên đăng nhập hợp lệ | FR-IAM-01 |
| 422 | `PAGE_SIZE_EXCEEDED` | `pageSize` vượt trần do server đặt | NFR-PERF-01 |

**Tác dụng phụ** — không ghi bảng nào, không ghi audit (đọc thuần).

### `PATCH /api/notifications/{id}/read` và `POST /api/notifications/read-all`

| | |
|---|---|
| Thoả yêu cầu | FE-038 |
| Xác thực · Vai trò được gọi | bắt buộc · cả bảy vai trò, nhưng chỉ trên hộp thư của **chính người gọi** |
| Idempotent | **có** — đánh dấu lại thông báo đã đọc trả 200 và không đổi thời điểm đọc lần đầu; `read-all` gọi lại khi hộp thư đã sạch trả `updated: 0` |

**Request** — đường thứ nhất: `id` ở `path`, uuid, bắt buộc, không body. Đường thứ hai: body `scope` = `all` \| `filtered` (mục 9 câu 6). Cả hai **không** nhận `recipientId`; thời điểm đọc do **server** đặt.

**Response 2xx** — đường thứ nhất: `id` · `readAt` · `unreadCount`. Đường thứ hai: `updated` · `unreadCount`.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 401 | — | Không có phiên đăng nhập hợp lệ | FR-IAM-01 |
| 404 | `NOTIFICATION_NOT_FOUND` | `id` không tồn tại | FE-038 |
| 404 | — | Thông báo tồn tại nhưng **không** thuộc người gọi và không thuộc vai trò người gọi giữ | RFP:311, RFP:886 |
| 422 | `SCOPE_UNKNOWN` | `scope` không thuộc hai giá trị cho phép | FE-038 |

Hai ca 404 trả cùng mã HTTP **có chủ đích**: phân biệt được chúng là lộ sự tồn tại thông báo của người khác. Mã nghiệp vụ chỉ đi kèm ca thứ nhất.

**Tác dụng phụ** — ghi thời điểm đọc cho một hoặc nhiều dòng của **một** người gọi; không chạm hộp thư người khác. **Không** ghi audit (xem mục 7).

### `GET /api/notifications/{id}/deliveries`

| | |
|---|---|
| Thoả yêu cầu | FE-038 · FE-039 · FR-NOTIFY-01 (điều kiện nghiệm thu) · FR-NOTIFY-02 |
| Xác thực · Vai trò được gọi | bắt buộc · chủ sở hữu thông báo, và ROLE-SYS-ADMIN cho mọi thông báo |
| Idempotent | có (đọc thuần) |

**Request** — `id` ở `path`, uuid, bắt buộc.

**Response 2xx** — bốn trường đầu là **nguyên văn điều kiện nghiệm thu** của `FR-NOTIFY-01` (RFP:686): "log gửi thể hiện kênh, người nhận, kết quả và số lần thử".

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `rows[].channel` | enum | `in_app` \| `email` — **chỉ hai giá trị** (RFP:686) |
| `rows[].recipient` | string | Tên hiển thị người nhận; **không** trả thư điện tử |
| `rows[].result` | enum | `thành công` \| `thất bại` của lượt thử gần nhất |
| `rows[].attemptCount`, `rows[].lastAttemptAt` | integer, timestamp | Số lần thử (trần **3** theo RFP:600) và thời điểm lượt thử gần nhất |
| `rows[].finalState` | enum | `đã gửi` \| `đã vào queue cảnh báo vận hành` |
| `deadline` | object | Chỉ cho `severity = critical`: thời điểm sinh event, hạn = mốc đó + **5 phút**, cờ trong hạn / quá hạn (RFP:687) |

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `NOTIFICATION_NOT_FOUND` | `id` không tồn tại | FR-NOTIFY-01 |
| 404 | — | Thông báo không thuộc người gọi và người gọi không phải ROLE-SYS-ADMIN | RFP:311, RFP:886 |
| 409 | `DELIVERY_LOG_MISSING` | Thông báo tồn tại nhưng chưa có lượt gửi nào được ghi | FR-NOTIFY-01 |

**Tác dụng phụ** — không có.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Thông báo | mã, người nhận đích danh, vai trò người nhận | Phải có **một trong hai**, không được rỗng cả hai | tầng 1 (CHECK) | **Chưa có** |
| Thông báo | loại event | Tập giá trị theo bốn nhóm `FR-NOTIFY-01` — nhưng RFP viết "như:" nên là **ví dụ**, không phải danh sách đóng (mục 9 câu 1) | tầng 1 (CHECK) | **Chưa có** |
| Thông báo | mức độ | `critical` \| `thường`; `critical` kéo theo mốc 5 phút | tầng 1 (CHECK) | **Chưa có** |
| Thông báo | tiêu đề, nội dung | Tiêu đề không rỗng | tầng 1 (not null) | **Chưa có** |
| Thông báo | loại đối tượng + mã đối tượng | Cùng khuôn `entity`/`entity_id` mà bảng audit đã dùng; **không** lưu đường dẫn thô | tầng 3 (dựng URL ở server) | **Chưa có** |
| Thông báo | thời điểm sinh, thời điểm đọc | Thời điểm sinh là mốc đếm 5 phút | tầng 1 (not null / null được) | **Chưa có** |
| Thông báo | khoá chống trùng | Duy nhất theo (người nhận, loại event, mã đối tượng, chu kỳ) — mục 9 câu 3 | tầng 1 (unique) | **Chưa có** |
| Log gửi | thông báo, kênh, người nhận, kết quả, số lần thử, thời điểm thử cuối, trạng thái cuối | Kênh chỉ `in_app` \| `email`; số lần thử ≤ **3** | tầng 1 (CHECK) | **Chưa có** |
| Bảng audit | `entity`, `entity_id` | Chỉ **dùng lại khuôn**, không ghi vào bảng audit từ màn này | — | Có |

Cả hai bảng chính đều chưa tồn tại. Vì vậy mục 4 và mục 8 là thiết kế thuần, chưa có gì để đo.

## 4. Vòng đời trạng thái

RFP không có `FIG-*` cho vòng đời thông báo. Hai trục dưới đây là **đề xuất thiết kế**, dựng từ
`BR-NOTIFY-01` (trần 3 lần thử) và `FR-NOTIFY-02` (mốc 5 phút, queue cảnh báo vận hành).

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | Nguồn event sinh thông báo | `chưa gửi` (mỗi kênh một dòng log) | Không trùng khoá chống trùng | hệ thống | (không phải hành động của màn) |
| `chưa gửi` | Bắt đầu gửi một kênh | `đang gửi` | Kênh thuộc `in_app` \| `email` | hệ thống | — |
| `đang gửi` | Kênh trả thành công | `đã gửi` (trạng thái cuối) | — | hệ thống | — |
| `đang gửi` | Kênh trả lỗi và số lần thử < 3 | `đang retry` | Còn trong trần 3 lần của `BR-NOTIFY-01` | hệ thống | — |
| `đang retry` | Thử lại | `đang gửi` | Số lần thử < 3 | hệ thống | — |
| `đang retry` | Số lần thử đạt 3 mà vẫn lỗi | `đã vào queue cảnh báo vận hành` (trạng thái cuối) | Hết trần; **không** retry tiếp | hệ thống | — |
| bất kỳ trạng thái chưa cuối | Quá 5 phút kể từ thời điểm sinh event | `quá hạn 5 phút` (cờ song song) | Chỉ áp cho `severity = critical` | hệ thống | — |
| `chưa đọc` | Người nhận đánh dấu đã đọc | `đã đọc` | Người gọi là chủ sở hữu | chủ sở hữu | 404 (mục 2) |

Hai guard dễ mất nhất: (a) `đang retry` **không** phải `thất bại` — hiện giống nhau là làm vận hành
báo động sai; (b) `quá hạn 5 phút` là **cờ song song**, không phải một trạng thái loại trừ — một
thông báo có thể vừa quá hạn vừa còn đang retry, và cả hai đều phải vào cảnh báo vận hành.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| BR-NOTIFY-01 (RFP:600) | "Kênh thông báo baseline là **in-app** và **email**; số lần retry tối đa là **3**" | Tập giá trị kênh (tầng 1) + trần đếm ở tầng gửi | Không tồn tại dòng log nào có số lần thử > 3, và không có kênh thứ ba |
| FR-NOTIFY-01 (RFP:686) | "…**SMS và FAX không thuộc kênh thông báo**" | Hợp đồng API và tập giá trị kênh | Không có đường nào nhận kênh SMS hoặc FAX |
| FR-NOTIFY-01 (RFP:686) | "Log gửi thể hiện kênh, người nhận, kết quả và số lần thử" | Response của đường đọc log gửi | Bốn trường luôn có mặt cho mọi thông báo đã sinh |
| FR-NOTIFY-02 (RFP:687) | "Với thông báo phân loại **Critical**, hệ thống phải bảo đảm gửi xong trong vòng **5 phút**" | Cờ hạn gửi ở mục 4 | Đo được cho từng thông báo `critical` |
| FR-NOTIFY-02 (RFP:687) | "Thông báo vẫn thất bại sau khi retry sẽ được đưa vào **queue cảnh báo vận hành**" | Trạng thái cuối riêng ở mục 4 | Trạng thái này tách khỏi kết quả thất bại của một lượt thử |
| NFR-OPS-01 (RFP:814) | "Hệ thống phải giám sát được… **lỗi gửi thông báo**" | Bộ đếm queue cảnh báo cho ROLE-SYS-ADMIN + alert ra ngoài màn | Có alert khi bộ đếm tăng |

**Con số chưa có nguồn**: chu kỳ giữa hai lần thử, chu kỳ nạp lại hộp thư, `pageSize` mặc định, độ
dài cắt bớt nội dung, chu kỳ của khoá chống trùng, thời hạn lưu thông báo. RFP chỉ cho **hai** con
số cho nhóm này — trần 3 lần (RFP:600) và mốc 5 phút (RFP:687). Sáu con số còn lại ở mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào màn | Đọc hộp thư của mình | Đọc log gửi thông báo của mình | Đọc log gửi của người khác | Đánh dấu đã đọc | Thấy bộ đếm queue cảnh báo |
|---|---|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | **cho phép** | cho phép (của mình) | **cho phép** |
| Sáu vai còn lại: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN | cho phép | cho phép | cho phép | từ chối · 404 | cho phép (của mình) | từ chối · trường không có trong response |

Bảy vai trò lấy từ `TBL-ROLE-01` (RFP:249-255). Đây là **một trong ít màn không giới hạn vai trò vào**: mọi người dùng nội bộ đều có hộp thư, và cột phân biệt không phải vai trò mà là **người nhận**.

**Đọc và ghi là hai trục khác nhau.** Trục **ghi** (đánh dấu đã đọc) chặn theo **chủ sở hữu**, không theo vai trò — không vai nào đọc hộ người khác. Trục **đọc** thì RFP không quy định ai đọc được bảng nào; RFP:311 (§02-08) chỉ nói *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Đề xuất của chúng tôi: **giới hạn đọc theo người nhận**, vì nội dung thông báo nhắm đích ("profile X sắp hết hiệu lực", "tranh chấp Y đang mở") và mang thông tin cá nhân của người tham gia. Chính sách đọc mở hiện hành của hệ — mọi vai trò đang hoạt động đọc mọi bảng nghiệp vụ — cũng là **đề xuất của bên dự thầu**, không phải yêu cầu khách; áp nó lên dữ liệu thông báo thì chống lại chính RFP:886 (§09-06, APPI). Xem mục 9 câu 5.

**Chặn trả 404, không phải 403** — có chủ đích, không lộ sự tồn tại thông báo của người khác. Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Sinh thông báo | `notification_created` | after: người nhận, loại event, mức độ, đối tượng liên quan · reason: mã event nguồn | FR-AUDIT-01 (RFP:710) |
| Lượt gửi kết thúc ở trạng thái cuối là lỗi | `notification_delivery_exhausted` | before: số lần thử · after: trạng thái cuối, kênh · reason: lỗi thô của kênh | NFR-OPS-01 (RFP:814) |
| Thông báo `critical` quá hạn 5 phút | `notification_deadline_missed` | after: thời điểm sinh, hạn, độ trễ | FR-NOTIFY-02 (RFP:687) |

**Đánh dấu đã đọc không ghi audit.** `FR-AUDIT-01` (RFP:710) liệt tạo · sửa · phê duyệt · lock ·
đổi quyền; đọc một thông báo không nằm trong nhóm đó. Nếu khách muốn log truy cập theo RFP:886 thì
đó là hạng mục riêng — mục 9 câu 5.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-PERF-01 (RFP:807) | Tìm kiếm thông thường p95 ≤ 2 giây | Hộp thư và bộ đếm chưa đọc là hai truy vấn nóng, gọi lại theo chu kỳ nạp lại → cần index theo (người nhận, thời điểm đọc); chu kỳ nạp lại càng dày càng tốn tải đọc (mục 9 câu 2) |
| NFR-OPS-01 (RFP:814) | Giám sát được lỗi gửi thông báo | Mỗi trạng thái cuối là lỗi và mỗi ca quá hạn 5 phút phải phát được alert ra ngoài màn; bộ đếm trên màn chỉ là bề mặt |
| NFR-AVL-01 (RFP:804) | Khả dụng 99,5% trong khung 02:00–10:00 JST | Mốc 5 phút của `FR-NOTIFY-02` chỉ đo được trong khung giờ dịch vụ; event sinh ngoài khung thì mốc tính từ đâu là câu hỏi mục 9 |
| DR-RET-01 (RFP:813) | Nghiệp vụ online 7 năm; hình ảnh/chứng từ phụ trợ 3 năm rồi tầng nguội | RFP **không** xếp thông báo vào nhóm nào → không dọn thì bảng chỉ tăng, dọn sai thì mất vết gửi (mục 9 câu 4) |
| NFR-SEC-04 (RFP:812) | TLS cho dữ liệu truyền; secret tách khỏi mã nguồn | Thông tin xác thực của nhà cung cấp email là secret; nội dung thông báo mang thông tin cá nhân nên không đưa dữ liệu nhạy vào tiêu đề thư |

## 9. Câu hỏi cho chủ đầu tư

- **Tập loại event là đóng hay mở?** Cần trước khi code vì nó là ràng buộc giá trị ở tầng 1. `FR-NOTIFY-01` (RFP:686) viết *"các event thuộc phạm vi cơ bản **như**: profile sắp hết hiệu lực, tranh chấp đang mở, lỗi xuất dữ liệu, giao hàng bị ùn tắc"* — chữ "như" làm bốn nhóm này thành **ví dụ**, không phải danh sách đóng. Sai thì phải đổi ràng buộc và bù dữ liệu đã sinh.
- **Chu kỳ nạp lại hộp thư, chu kỳ giữa hai lần thử, `pageSize` mặc định và độ dài cắt bớt nội dung?** Cần trước khi code vì cả bốn là biến trực tiếp của `NFR-PERF-01` (RFP:807) và của mốc 5 phút. RFP cho **hai** con số cho nhóm này (trần 3 lần — RFP:600; mốc 5 phút — RFP:687) và không cho con số nào cho bốn câu này. Nạp quá dày thì tốn tải đọc, quá thưa thì vỡ mốc 5 phút của kênh in-app.
- **Chu kỳ của khoá chống trùng là bao lâu?** Cần trước khi code vì một quá trình quét profile sắp hết hiệu lực chạy hằng ngày sẽ sinh thông báo hằng ngày cho cùng một profile. RFP không nói. Sai thì hộp thư bị ngập bởi một event duy nhất, hoặc bỏ mất cảnh báo lần hai khi tình huống xấu đi.
- **Thông báo thuộc nhóm lưu trữ nào của `DR-RET-01`?** Cần trước khi code vì nó quyết định có quy trình dọn hay không. RFP:813 chia hai nhóm và không xếp thông báo vào nhóm nào; nhưng `FR-NOTIFY-03` (RFP:688) lại đòi *"việc thay đổi cấu hình không làm mất lịch sử gửi trong quá khứ"* — tức lịch sử gửi phải sống đủ lâu. Sai thì hoặc bảng chỉ tăng, hoặc xoá mất vết gửi.
- **Vai trò nào được đọc thông báo của người khác, và có cần log truy cập khi vai trò quản trị đọc log gửi của người khác?** Cần trước khi code vì mục 6 chặn theo người nhận, và đây là chỗ hai yêu cầu khách kéo về hai phía: RFP:311 (§02-08) **giao cho bên dự thầu đề xuất** cơ chế phân tách quyền — nghĩa là không có yêu cầu đọc mở nào; còn RFP:886 (§09-06, APPI) đòi *"cơ chế mã hoá, kiểm soát truy cập theo vai trò (RBAC) và log truy cập áp dụng cho thông tin cá nhân — phải nhất quán với policy lưu trữ DR-RET-01"*. Khai đúng bản chất: chính sách đọc mở hiện hành là **đề xuất của bên dự thầu chống lại một yêu cầu khách bằng chữ** — không chọn hộ. Sai thì phải sửa cả tầng chính sách đọc, không chỉ màn này.
- **`scope = filtered` của đường đánh dấu tất cả đã đọc áp cho gì?** Cần trước khi code vì nó quyết định số dòng bị ghi. RFP không nói. Sai thì người dùng vô tình đánh dấu cả những thông báo đang bị bộ lọc che.
- **Mốc 5 phút đếm từ thời điểm sinh event hay từ lần thử đầu, và có tạm dừng ngoài khung giờ dịch vụ không?** Cần trước khi code vì nó quyết định định nghĩa quá hạn. `FR-NOTIFY-02` (RFP:687) chỉ nói "gửi xong trong vòng 5 phút" mà không nói mốc bắt đầu; `NFR-AVL-01` (RFP:804) lại giới hạn khung giờ dịch vụ 02:00–10:00 JST. Sai thì cảnh báo quá hạn báo động sai hàng loạt vào ban đêm.
- **Thứ tự dựng: SC-28 trước hay sau SC-07 · SC-17 · SC-19?** Cần trước khi lập kế hoạch vì **ba trong bốn** nhóm event mà RFP:686 liệt hiện chưa có nguồn dữ liệu, và nhóm thứ tư chỉ ghi ca thành công (mục 10). Dựng SC-28 trước thì khách nhận một hộp thư gần như rỗng. Đề xuất: dữ liệu tranh chấp và đường ghi ngoại lệ giao hàng trước, rồi mới tới SC-28.
- **Chọn phương án hạ tầng (a) chỉ in-app hay (b) email + hàng đợi thật?** Cần trước khi code vì (a) **không thoả** `FR-NOTIFY-01` (thiếu kênh email) và không chứng minh được mốc 5 phút cùng trần retry của `FR-NOTIFY-02`; (b) thoả cả hai nhưng thêm một dịch vụ, một khoản chi phí, một điểm hỏng và một hạng mục giám sát `NFR-OPS-01`. Đây là quyết định kiến trúc, không phải chi tiết màn.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Bảng thông báo và bảng log gửi | Hai bảng ở mục 3, route hộp thư, badge đếm chưa đọc | Không có bảng nào, không có route, không có badge | không có tệp tương ứng trong `src/` và `supabase/migrations/` | Chưa thi công |
| Kênh email + trần retry 3 | `BR-NOTIFY-01` (RFP:600) | Không có hạ tầng gửi thư và không có hàng đợi; `package.json:14-21` chỉ có 6 dependency, không có client email hay client queue | `package.json:14-21` | Chưa thi công |
| Mốc 5 phút cho Critical | `FR-NOTIFY-02` (RFP:687) | Không có job, cron hay worker nào — không có chỗ đo mốc | không có tệp job/cron trong repo | Chưa thi công |
| Queue cảnh báo vận hành | Trạng thái cuối riêng ở mục 4 | Chưa có; FE-046 (`NFR-OPS-01`) cũng chưa thi công | — | Chưa thi công |
| Nguồn event **profile sắp hết hiệu lực** | Sinh thông báo theo ngưỡng cấu hình được | Dữ liệu người tham gia có thật và ngưỡng tính được ở báo cáo RPT-03, nhưng không có đường sinh event; SC-07 chưa dựng | `supabase/migrations/20260904090100_participant.sql` | Một phần |
| Nguồn event **lỗi xuất dữ liệu** | Sinh thông báo khi một lần xuất thất bại | Bảng batch kế toán chỉ ghi lần xuất **thành công** — không có cột trạng thái hay lỗi, nên một lần xuất lỗi không để lại dòng nào | `supabase/migrations/20260908090000_accounting_export.sql:16-31` | Một phần |
| Nguồn event **tranh chấp đang mở** | Sinh thông báo khi có tranh chấp mở | Không có bảng tranh chấp trong các bảng hiện có; SC-19 chưa dựng | — | Chưa thi công |
| Nguồn event **giao hàng bị ùn tắc** | Sinh thông báo khi giao hàng vào trạng thái ngoại lệ | Cột trạng thái giao hàng có giá trị `ngoại lệ` trong ràng buộc CHECK nhưng **không đường ghi nào đặt được**; SC-17 chưa dựng | `supabase/migrations/20260904090400_delivery.sql` | Chưa thi công |
| Phạm vi đọc theo người nhận | Mục 6 giới hạn đọc theo người nhận | Các bảng nghiệp vụ dùng chung một policy đọc mở cho mọi vai trò đang hoạt động (`FR-601` — **mã nội bộ LAB-3**, không phải mã yêu cầu của khách) | `supabase/migrations/20260904090900_rls_core.sql:28-33` | Cần khách chốt |
| Khuôn `entity`/`entity_id` | Thông báo trỏ về đối tượng theo cặp loại + mã | Khuôn này đã có thật ở bảng audit và dùng lại được nguyên vẹn | `supabase/migrations/20260904090000_core_identity.sql:26-40` | Không lệch |

## 11. Dẫn chứng

- RFP:249-255 — `TBL-ROLE-01`: bảy vai trò nội bộ. RFP:311 — §02-08: bên dự thầu **phải đề xuất** cơ chế phân tách quyền và truy vết.
- RFP:600 — `BR-NOTIFY-01`: kênh baseline in-app và email; retry tối đa **3**.
- RFP:686 — `FR-NOTIFY-01`: hai kênh, bốn nhóm event ("**như**:"), SMS và FAX không thuộc kênh; nghiệm thu log gửi thể hiện kênh · người nhận · kết quả · số lần thử.
- RFP:687 — `FR-NOTIFY-02`: Critical gửi xong trong **5 phút**; email lỗi thì retry tối đa 3 lần và ghi trạng thái cuối cùng; vẫn thất bại thì vào **queue cảnh báo vận hành**. RFP:688 — `FR-NOTIFY-03`: đổi cấu hình **không làm mất lịch sử gửi**.
- RFP:710 — `FR-AUDIT-01`. RFP:804, RFP:807, RFP:812-814 — `NFR-AVL-01`, `NFR-PERF-01`, `NFR-SEC-04`, `DR-RET-01`, `NFR-OPS-01`. RFP:886 — §09-06 APPI: mã hoá, RBAC và log truy cập cho thông tin cá nhân.
- Function List `FN-12` — in-app và email, retry tối đa 3, Critical trong 5 phút; **SMS và FAX ngoài phạm vi**. Feature List `FE-038`, `FE-039`.
- Chỉ cho phần đối chiếu prototype ở mục 10: `package.json:14-21`, `supabase/migrations/20260904090000_core_identity.sql:26-40`, `20260904090100_participant.sql`, `20260904090400_delivery.sql`, `20260904090900_rls_core.sql:28-33`, `20260908090000_accounting_export.sql:16-31`.
