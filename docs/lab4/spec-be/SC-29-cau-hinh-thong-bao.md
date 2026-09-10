# SC-29 — Cấu hình thông báo · Spec BE

| | |
|---|---|
| FE liên quan | FE-040 (Cấu hình thông báo) |
| FN | FN-12 (Thông báo và cảnh báo vận hành) |
| Ưu tiên | P1 |
| Yêu cầu khách | FR-NOTIFY-03, BR-NOTIFY-01, FR-NOTIFY-01, FR-NOTIFY-02, FR-PARTY-03, NFR-AVL-01, NFR-OPS-02 |
| Miền dữ liệu | D-PARTY |
| State machine | — (RFP không có `FIG-*` cho vòng đời cấu hình thông báo) |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

BE phải cung cấp: (a) đường đọc cấu hình đang áp dụng cho **từng loại event**, kèm loại event chưa cấu hình; (b) đường ghi cấu hình dưới dạng **sinh phiên bản mới** — người nhận · ngưỡng · thời điểm gửi là đúng ba thứ `FR-NOTIFY-03` (RFP:688) đòi cấu hình được; (c) đường đọc **chuỗi phiên bản** kèm lý do thay đổi và **lịch sử gửi bất biến** trỏ về phiên bản đã dùng; (d) một đường gửi thử.

BE **không** làm ở màn này: gửi thông báo thật (tầng gửi của SC-28), chạy bộ hẹn giờ theo `thời điểm gửi` (tiến trình ngoài request), và **không** hỗ trợ kênh nào ngoài `in_app` và `email` (`BR-NOTIFY-01`, RFP:600; SMS và FAX ngoài phạm vi `FN-12`).

Ràng buộc kiến trúc chi phối cả mục 2 và mục 3: điều kiện nghiệm thu của `FR-NOTIFY-03` là *"việc thay đổi cấu hình không làm mất lịch sử gửi trong quá khứ"*. Vì vậy **không tồn tại** đường ghi nào sửa tại chỗ một dòng cấu hình duy nhất — mọi thay đổi là một phiên bản mới, và cấu hình mới chỉ áp cho lần gửi sau.

## 2. Hợp đồng API

### `GET /api/admin/notification-rules`

| | |
|---|---|
| Thoả yêu cầu | FE-040 · FR-NOTIFY-03 |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SYS-ADMIN (ánh xạ actor — mục 9 câu 1) |
| Idempotent | có (đọc thuần) |

**Request** — không tham số. Server trả **mọi** loại event, kể cả loại chưa có cấu hình.

**Response 2xx**

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `items[].eventType`, `items[].configured` | enum, boolean | Loại event (khoá dòng cấu hình, chỉ đọc) và cờ đã cấu hình chưa — nguồn của trạng thái rỗng |
| `items[].enabled`, `items[].severity` | boolean, enum | Bật/tắt (mặc định `false`) và phân loại `critical` \| `thường` |
| `items[].channels` | array | Tập con của `["in_app","email"]`, tối thiểu một phần tử |
| `items[].recipientRoles`, `items[].recipientUserIds` | array | **"người nhận"** của `FR-NOTIFY-03`; tối thiểu một trong hai không rỗng |
| `items[].threshold`, `items[].thresholdUnit` | integer, enum | **"ngưỡng"**; `ngày` \| `số lượng`. Không có mặc định — RFP không cho con số nào (mục 9 câu 2) |
| `items[].sendAtJst` | string `hh:mm` | **"thời điểm gửi"**, luôn hiểu theo JST |
| `items[].activeVersionNo` | integer | Phiên bản đang áp dụng |
| `items[].channelUnavailable`, `items[].eventSourceMissing` | boolean | Cờ **bắt buộc**, không phải trang trí: đã chọn `email` mà chưa có hạ tầng gửi; và đường sinh event chưa tồn tại nên cấu hình sẽ im lặng |

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 401 | — | Không có phiên đăng nhập hợp lệ | FR-IAM-01 |
| 404 | — | Vai trò gọi không phải ROLE-SYS-ADMIN — chặn **vào trang** | RFP:311 |

**Tác dụng phụ** — không có.

### `POST .../notification-rules/{eventType}/versions` và `POST .../{eventType}/test-send`

| | |
|---|---|
| Thoả yêu cầu | FE-040 · FR-NOTIFY-03 (cả điều kiện nghiệm thu) · NFR-OPS-02 |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SYS-ADMIN |
| Idempotent | `versions`: **không** — chống ghi trùng bằng `expectedActiveVersionNo`, hai quản trị lưu cùng lúc thì một bên thắng. `test-send`: không, mỗi lần bấm là một lượt thử |

**Request** — `eventType` ở `path`, enum, bắt buộc. Body của `versions`:

| Tham số | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|
| `enabled` | boolean | có | — | FE-040 (field #2) |
| `severity` | enum | có | `critical` \| `thường`; `critical` kéo theo mốc 5 phút | FR-NOTIFY-02 |
| `channels` | array | có | tập con của `["in_app","email"]`, ≥ 1 phần tử | BR-NOTIFY-01 (RFP:600) |
| `recipientRoles`, `recipientUserIds` | array | ≥ 1 trong 2 | vai trò thuộc bảy giá trị `TBL-ROLE-01`; người nhận đích danh chỉ tài khoản đang hoạt động | FR-NOTIFY-03 |
| `threshold`, `thresholdUnit` | integer, enum | điều kiện | số nguyên > 0; bắt buộc với loại event thuộc nhóm có ngưỡng (mục 9 câu 2) | FR-NOTIFY-03 |
| `sendAtJst` | string | không | dạng `hh:mm`, hiểu theo JST | FR-NOTIFY-03, NFR-AVL-01 |
| `reason` | string | có | không rỗng sau khi cắt khoảng trắng | FR-AUDIT-01 |
| `expectedActiveVersionNo` | integer | có | phiên bản người gọi thấy khi mở form | RFP:780 |

Body của `test-send` mang cấu hình **đang nhập** (chưa lưu), để thử đúng cái quản trị sắp lưu. Server tự quyết, **không nhận từ client**: `versionNo`, thời điểm tạo, người tạo, và việc phiên bản mới trở thành phiên bản đang áp dụng.

**Response 2xx** — `versions`: `eventType` · `versionNo` · `effectiveFrom` · `activeVersionNo`. `test-send`: `channel` · `result` · `message` cho từng kênh đã chọn.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 403 | `ROLE_FORBIDDEN` | Vai trò gọi không phải ROLE-SYS-ADMIN — đường **ghi** từ chối tường minh | RFP:311 |
| 404 | `EVENT_TYPE_UNKNOWN` | `eventType` không thuộc tập giá trị | FR-NOTIFY-01 |
| 409 | `VERSION_CONFLICT` | `expectedActiveVersionNo` khác phiên bản đang áp dụng lúc ghi | RFP:780 |
| 409 | `CHANNEL_UNAVAILABLE` | `test-send` với kênh `email` mà hạ tầng gửi chưa tồn tại | BR-NOTIFY-01 |
| 422 | `NO_CHANNEL_SELECTED` | `channels` rỗng | BR-NOTIFY-01 |
| 422 | `CHANNEL_UNKNOWN` | `channels` chứa giá trị ngoài `in_app` và `email` | RFP:686 |
| 422 | `NO_RECIPIENT` | Cả `recipientRoles` và `recipientUserIds` đều rỗng | FR-NOTIFY-03 |
| 422 | `ROLE_UNKNOWN` | `recipientRoles` chứa giá trị ngoài bảy vai trò | TBL-ROLE-01 |
| 422 | `THRESHOLD_REQUIRED` | Loại event thuộc nhóm có ngưỡng mà `threshold` rỗng | FR-NOTIFY-03 |
| 422 | `THRESHOLD_NOT_POSITIVE` | `threshold` ≤ 0 hoặc không phải số nguyên | FR-NOTIFY-03 |
| 422 | `SEND_TIME_MALFORMED` | `sendAtJst` không đúng dạng `hh:mm` | FR-NOTIFY-03 |
| 422 | `SEND_TIME_OUT_OF_WINDOW` | `sendAtJst` ngoài khung 02:00–10:00 JST **và** khách chốt là bắt buộc trong khung (mục 9 câu 4) | NFR-AVL-01 |
| 422 | `REASON_EMPTY` | `reason` rỗng sau khi cắt khoảng trắng | FR-AUDIT-01 |

**Tác dụng phụ** — `versions`: ghi **một dòng phiên bản mới** rồi chuyển phiên bản đang áp dụng; ghi audit `update_notification_rule` (mục 7); **không** ghi đè phiên bản cũ và **không** chạm dòng lịch sử gửi nào. Tài khoản trong `recipientUserIds` bị vô hiệu sau khi lưu thì bị **bỏ qua lúc gửi**, không làm cấu hình thành không hợp lệ. `test-send`: gửi một thông báo thử; có ghi vào lịch sử gửi hay không là mục 9 câu 7.

### `GET .../{eventType}/versions` và `GET .../{eventType}/deliveries`

| | |
|---|---|
| Thoả yêu cầu | FE-040 · FR-NOTIFY-03 (điều kiện nghiệm thu) |
| Xác thực · Vai trò được gọi | bắt buộc · ROLE-SYS-ADMIN |
| Idempotent | có (đọc thuần) |

**Request** — `eventType` ở `path`, enum, bắt buộc; `page`, `pageSize` ở `query`, không bắt buộc.

**Response 2xx** — `versions`: `versionNo` · `effectiveFrom` · `recipients` · `threshold` · `sendAtJst` · `reason` · `isActive`. `deliveries`: `sentAt` · `channel` · `recipientAtSendTime` · `result` · `attemptCount` · `versionNoUsed`. `recipientAtSendTime` giữ **giá trị của phiên bản đã dùng**, kể cả sau khi phiên bản mới thay phiên bản đó — đây chính là điều kiện nghiệm thu. Hai đường thi hành đều đạt: trỏ về `versionNoUsed`, hoặc chụp cấu hình vào chính dòng log. Điều **không** đạt là sửa tại chỗ một dòng cấu hình duy nhất.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 404 | `EVENT_TYPE_UNKNOWN` | `eventType` không thuộc tập giá trị | FR-NOTIFY-01 |
| 404 | — | Vai trò gọi không phải ROLE-SYS-ADMIN | RFP:311 |

**Tác dụng phụ** — không có. Không có đường sửa hay xoá cho cả hai bảng này.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Cấu hình thông báo | loại event | Duy nhất — **một dòng cho mỗi loại event** (mục 9 câu 6) | tầng 1 (unique) | **Chưa có** |
| Cấu hình thông báo | bật, phân loại, kênh | Mặc định tắt; phân loại `critical` \| `thường`; kênh là tập con của `in_app`/`email` với **≥ 1** phần tử | tầng 1 (default + CHECK) | **Chưa có** |
| Cấu hình thông báo | vai trò người nhận, người nhận đích danh | **≥ 1** trong hai không rỗng; vai trò thuộc bảy giá trị `TBL-ROLE-01` | tầng 1 (CHECK) | **Chưa có** |
| Cấu hình thông báo | ngưỡng, đơn vị ngưỡng, thời điểm gửi | Ngưỡng là số nguyên > 0 và **không có mặc định**; thời điểm gửi dạng `hh:mm` theo JST | tầng 1 (CHECK + kiểu `time`) | **Chưa có** |
| Cấu hình thông báo | phiên bản đang áp dụng | Trỏ về đúng một phiên bản | tầng 1 (FK) | **Chưa có** |
| Phiên bản cấu hình | số phiên bản, ngày hiệu lực, người tạo, lý do, bản chụp cấu hình | **Chỉ-thêm**: không sửa, không xoá; lý do không rỗng | tầng 1 (not null) + tầng 3 (không có đường ghi update) | **Chưa có** — khuôn phiên bản hoá đã có ở nhóm biểu suất, dùng lại được |
| Lịch sử gửi | phiên bản đã dùng, người nhận lúc gửi | **Bất biến**; giữ giá trị của phiên bản đã dùng | tầng 1 (FK) hoặc bản chụp | **Chưa có** — phụ thuộc SC-28 |
| Người dùng nội bộ | mã, tên hiển thị, cờ đang hoạt động, vai trò | Nguồn của danh sách chọn người nhận; **không** trả thư điện tử | tầng 3 | Có |

Hệ **không có** giao dịch xuyên bảng, nên thứ tự ghi là: ghi dòng phiên bản mới trước, rồi so sánh và chuyển phiên bản đang áp dụng. Ngược lại thì có lúc dòng cấu hình trỏ vào một phiên bản chưa tồn tại.

## 4. Vòng đời trạng thái

RFP không có `FIG-*` cho vòng đời cấu hình thông báo. Vòng đời dưới đây là **đề xuất thiết kế**, dựng từ điều kiện nghiệm thu của `FR-NOTIFY-03` và từ `NFR-OPS-02` (RFP:815 — cập nhật quy tắc bằng thay đổi cấu hình có kiểm soát, **không cần sửa dữ liệu lịch sử**).

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| `chưa cấu hình` | Tạo phiên bản đầu | `v1` đang áp dụng | Đủ người nhận; ≥ 1 kênh; lý do không rỗng | ROLE-SYS-ADMIN | 422 (mục 2) |
| `vN đang áp dụng` | Lưu thành phiên bản mới | `vN+1` đang áp dụng, `vN` thành đã bị thay | `expectedActiveVersionNo` = N | ROLE-SYS-ADMIN | 409 `VERSION_CONFLICT` |
| `vN đã bị thay` | (không có) | — | Phiên bản cũ **bất biến**, không sửa không xoá | — | không có đường ghi |
| `vN đang áp dụng` | Bật thông báo khi đường sinh event chưa tồn tại | `vN+1` đang áp dụng, cờ **event chưa có nguồn** = true | Lưu được, nhưng phải trả cờ để giao diện cảnh báo | ROLE-SYS-ADMIN | — |
| `vN đang áp dụng` | Chọn kênh `email` khi chưa có hạ tầng gửi | `vN+1` đang áp dụng, cờ **kênh chưa khả dụng** = true | Lưu được, nhưng gửi thử bị chặn | ROLE-SYS-ADMIN | 409 `CHANNEL_UNAVAILABLE` |
| dòng lịch sử gửi | Cấu hình đổi sang `vN+1` | **không đổi** | Dòng lịch sử giữ giá trị của phiên bản đã dùng | — | không có đường ghi |

Guard dễ mất nhất là hai cạnh giữa: cho phép lưu một cấu hình sẽ im lặng là **có chủ đích** — chặn hẳn sẽ khoá quản trị khỏi việc chuẩn bị cấu hình trước; nhưng bỏ cờ cảnh báo thì màn bán một lời hứa rỗng. Cạnh cuối là chính điều kiện nghiệm thu, và cách duy nhất phá nó là sửa tại chỗ.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| FR-NOTIFY-03 (RFP:688) | "Hệ thống phải cho phép cấu hình **người nhận, ngưỡng và thời điểm gửi** cho các event thuộc phạm vi cơ bản." | Ba nhóm field ở mục 2 | Đặt được cả ba cho mọi loại event thuộc phạm vi cơ bản |
| FR-NOTIFY-03 (RFP:688) | "Việc thay đổi cấu hình **không làm mất lịch sử gửi trong quá khứ**." | Phiên bản hoá ở mục 3 + bất biến lịch sử gửi ở mục 4 | Đổi cấu hình rồi mở lại lịch sử gửi cũ vẫn thấy đúng cấu hình lúc gửi |
| BR-NOTIFY-01 (RFP:600) | "Kênh thông báo baseline là **in-app** và **email**; số lần retry tối đa là **3**" | Tập giá trị kênh (tầng 1) | Không cấu hình được kênh thứ ba |
| FR-NOTIFY-01 (RFP:686) | "…**SMS và FAX không thuộc kênh thông báo**." | Hợp đồng API không nhận hai giá trị đó | 422 `CHANNEL_UNKNOWN` |
| FR-NOTIFY-02 (RFP:687) | "Với thông báo phân loại **Critical**, hệ thống phải bảo đảm gửi xong trong vòng **5 phút**" | Chọn `severity = critical` kéo theo mốc 5 phút ở SC-28 | Đổi phân loại đổi luôn ràng buộc thời gian của lần gửi sau |
| NFR-OPS-02 (RFP:815) | "Quy tắc/biểu suất phải cập nhật được bằng thay đổi cấu hình có kiểm soát, **không cần sửa dữ liệu lịch sử**." | Không tồn tại đường ghi nào sửa dữ liệu lịch sử | Không có đường update/delete cho phiên bản và lịch sử gửi |
| NFR-AVL-01 (RFP:804) | Khung giờ cung cấp dịch vụ **02:00–10:00 JST** | Kiểm `sendAtJst` — **chỉ khi** khách chốt là bắt buộc trong khung | 422 `SEND_TIME_OUT_OF_WINDOW` |

**Con số chưa có nguồn**: ngưỡng mặc định của **mọi** loại event. `FR-NOTIFY-03` (RFP:688) đòi ngưỡng cấu hình được nhưng **không cho một con số nào**, và `FR-PARTY-03` (RFP:631) cũng chỉ nói "khoảng cảnh báo cấu hình được". Con số 30 ngày đang tồn tại là mặc định prototype, không phải yêu cầu khách — mục 9 câu 2, câu 3 và mục 10.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Vào màn | Đọc cấu hình | Ghi phiên bản mới | Đọc lịch sử gửi | Gửi thử |
|---|---|---|---|---|---|
| ROLE-SYS-ADMIN | cho phép | cho phép | cho phép | cho phép | cho phép |
| Sáu vai còn lại: ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY · ROLE-SETTLEMENT · ROLE-RULE-ADMIN | từ chối · **404** | từ chối · **404** | từ chối · **403** `ROLE_FORBIDDEN` | từ chối · **404** | từ chối · **403** `ROLE_FORBIDDEN` |

Bảy vai trò lấy từ `TBL-ROLE-01` (RFP:249-255). ROLE-SYS-ADMIN được chọn vì `TBL-ROLE-01` gán cho vai này trách nhiệm "quản lý tài khoản, quyền, **log vận hành**" (RFP:255) — gần nhất với "quản trị vận hành" mà `FR-NOTIFY-03` gọi tên. Không vai nào mang đúng tên đó: mục 9 câu 1.

**Đọc và ghi là hai trục khác nhau, và trả hai mã khác nhau.** Trục **ghi** chặn theo vai trò với căn cứ trực tiếp là RFP:255, và từ chối tường minh bằng **403** vì người gọi đã biết tài nguyên tồn tại. Trục **đọc** thì RFP không quy định ai đọc được bảng nào; RFP:311 (§02-08) chỉ nói *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* Đề xuất của chúng tôi: **chặn cả trục đọc** ở mức vào trang bằng **404**, vì danh sách người nhận đích danh phơi ra ai nhận cảnh báo gì — thông tin về người, không về nghiệp vụ. Chính sách đọc mở hiện hành của hệ cũng là **đề xuất của bên dự thầu**, không phải yêu cầu khách; áp nó lên dữ liệu này thì chống lại RFP:886 (§09-06, APPI). Mục 9 câu 5.

Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) áp cho thay đổi quy tắc/biểu suất thưởng, không cho cấu hình thông báo. Nếu khách muốn có thì đó là ràng buộc riêng — mục 9 câu 8.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Lưu phiên bản cấu hình mới | `update_notification_rule` | before: toàn bộ cấu hình của phiên bản cũ · after: cấu hình phiên bản mới · reason: `reason` người dùng nhập | FR-AUDIT-01 (RFP:710) |
| Tạo cấu hình đầu tiên cho một loại event | `create_notification_rule` | before: rỗng · after: cấu hình `v1` · reason: `reason` | FR-AUDIT-01 |
| Gửi thử | `notification_rule_test_send` | after: loại event, kênh đã thử, kết quả · reason: không có | NFR-OPS-01 (RFP:814) |

Đọc cấu hình và đọc lịch sử gửi **không** ghi audit: `FR-AUDIT-01` (RFP:710) liệt tạo · sửa · phê duyệt · lock · đổi quyền, không liệt hành vi đọc. Bản thân bảng phiên bản cấu hình đã là một vết đầy đủ (ai · khi nào · giá trị trước và sau · lý do), nên dòng audit là lớp thứ hai chứ không thay thế nó.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-OPS-02 (RFP:815) | Cập nhật quy tắc bằng thay đổi cấu hình có kiểm soát, không sửa dữ liệu lịch sử | Ràng buộc mạnh nhất của màn: không tồn tại đường ghi update/delete cho phiên bản và cho lịch sử gửi |
| NFR-AVL-01 (RFP:804) | Khả dụng 99,5% trong khung 02:00–10:00 JST | `sendAtJst` chỉ có nghĩa nếu bộ hẹn giờ chạy trong khung đó; gửi ngoài khung là quyết định phải khai rõ (mục 9 câu 4) |
| NFR-SEC-01 (RFP:809) | MFA bắt buộc cho tài khoản quản trị và role phê duyệt | Phiên gọi đường ghi phải đạt mức xác thực đã bật MFA, vì ROLE-SYS-ADMIN thuộc diện bắt buộc |
| NFR-SEC-04 (RFP:812) | TLS cho dữ liệu truyền; secret tách khỏi mã nguồn | Cấu hình mang danh sách người nhận; thông tin xác thực nhà cung cấp email là secret, không nằm trong cấu hình này |
| NFR-PERF-01 (RFP:807) | Tìm kiếm thông thường p95 ≤ 2 giây | Đường đọc cấu hình là danh sách nhỏ (một dòng mỗi loại event) nên ngưỡng dễ đạt; đường đọc lịch sử gửi phải phân trang |

## 9. Câu hỏi cho chủ đầu tư

- **"Quản trị vận hành" của `FR-NOTIFY-03` ánh xạ sang vai trò nào?** Cần trước khi code vì nó là điều kiện của toàn mục 6. `FR-NOTIFY-03` (RFP:688) gọi actor là "Quản trị vận hành / cấu hình cảnh báo", nhưng `TBL-ROLE-01` (RFP:249-255) chỉ có bảy vai và **không vai nào mang tên đó**. Chúng tôi đề xuất ROLE-SYS-ADMIN theo RFP:255 nhưng không chọn hộ. Sai thì phải đổi cả chính sách ghi.
- **Ngưỡng mặc định của từng loại event là bao nhiêu, và loại nào thuộc nhóm có ngưỡng?** Cần trước khi code vì `THRESHOLD_REQUIRED` ở mục 2 không quyết được nếu chưa biết nhóm. RFP **không cho một con số nào**: `FR-NOTIFY-03` (RFP:688) và `FR-PARTY-03` (RFP:631) đều chỉ nói "cấu hình được". Sai thì cảnh báo hoặc quá muộn, hoặc ngập.
- **Ngưỡng cảnh báo sắp hết hiệu lực do màn này quản, hay do báo cáo quản?** Cần trước khi code vì đây là **rủi ro hai nguồn chân lý**: `FR-PARTY-03` (RFP:631) đòi ngưỡng đó "cấu hình được", và ngưỡng đó đúng là field ngưỡng của màn này. Nếu SC-29 quản nó thì hằng số cứng ở báo cáo RPT-03 **phải bỏ** và báo cáo phải đọc cấu hình. Để cả hai tồn tại là để hai con số cùng mang tên "ngưỡng cảnh báo": quản trị đổi trên SC-29 mà báo cáo vẫn cắt ở con số cũ, và không ai biết cái nào đúng.
- **`sendAtJst` có buộc nằm trong khung 02:00–10:00 JST không?** Cần trước khi code vì nó quyết định mã lỗi `SEND_TIME_OUT_OF_WINDOW` có tồn tại hay không. `NFR-AVL-01` (RFP:804) chỉ cam kết khả dụng trong khung đó; `FR-NOTIFY-03` không ràng buộc giờ. Sai thì hoặc cảnh báo gửi vào lúc không ai đọc, hoặc chặn mất một nhu cầu vận hành thật.
- **Vai trò nào được đọc cấu hình và lịch sử gửi?** Cần trước khi code vì mục 6 chặn cả trục đọc, và đây là chỗ hai yêu cầu khách kéo về hai phía: RFP:311 (§02-08) **giao cho bên dự thầu đề xuất** cơ chế phân tách quyền — không có yêu cầu đọc mở nào; RFP:886 (§09-06, APPI) đòi RBAC và log truy cập cho thông tin cá nhân. Danh sách người nhận đích danh là dữ liệu về người. Khai đúng bản chất: chính sách đọc mở hiện hành là **đề xuất của bên dự thầu chống lại một yêu cầu khách bằng chữ** — không chọn hộ. Sai thì phải sửa cả tầng chính sách đọc.
- **Một dòng cấu hình cho mỗi loại event là đủ, hay cần tách theo vai trò người nhận?** Cần trước khi code vì nó là khoá duy nhất ở mục 3. RFP không nói. Sai thì không cấu hình được hai ngưỡng khác nhau cho hai nhóm người nhận của cùng một event, và phải chia lại bảng.
- **Gửi thử có ghi vào lịch sử gửi không?** Cần trước khi code vì `FR-NOTIFY-03` đòi không mất lịch sử gửi, nhưng lượt thử không phải một lần gửi nghiệp vụ. Sai thì hoặc lịch sử bị nhiễu bởi lượt thử, hoặc mất vết một lượt gửi thật đã tới người nhận.
- **Cấu hình thông báo có cần tách người lập và người phê duyệt, và có bắt buộc lý do thay đổi không?** Cần trước khi code vì cả hai đổi hợp đồng API. `GOV-RULE-01` (RFP:601) đòi maker-checker **chỉ** cho quy tắc/biểu suất thưởng; `FR-NOTIFY-03` chỉ đòi giữ lịch sử gửi, không đòi lý do. Việc bắt buộc `reason` là đề xuất của chúng tôi. Sai thì thêm ma sát vô ích, hoặc thiếu kiểm soát cho một cấu hình quyết định ai nhận cảnh báo.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Bảng cấu hình thông báo | Bảng ở mục 3 với bật · phân loại · kênh · người nhận · ngưỡng · thời điểm gửi, và route quản trị | Không có bảng nào, không có route | không có tệp tương ứng trong `src/app/` và `supabase/migrations/` | Chưa thi công |
| Phiên bản hoá cấu hình + lý do thay đổi | Bảng phiên bản chỉ-thêm | Chưa có. **Khuôn đã có sẵn để dùng lại**: bảng phiên bản biểu suất mang đúng hình dạng cần (số phiên bản, ngày hiệu lực, người tạo, người duyệt, bản chụp dạng jsonb) | `supabase/migrations/20260904090700_incentive.sql:2-12` | Chưa thi công |
| Lịch sử gửi bất biến trỏ về phiên bản đã dùng | Điều kiện nghiệm thu `FR-NOTIFY-03` | Chưa có bảng log gửi — phụ thuộc SC-28 | — | Chưa thi công |
| Thời điểm gửi theo giờ JST | Bộ hẹn giờ chạy ngoài request | Repo không có bộ hẹn giờ, job hay cron nào | không có tệp job/cron trong repo | Chưa thi công |
| **Ngưỡng cảnh báo hết hiệu lực cấu hình được** | `FR-PARTY-03` (RFP:631) đòi ngưỡng cấu hình được, và đó là field ngưỡng của màn này | Đang là **hằng số cứng** `EXPIRY_WARNING_DAYS = 30` trong mã báo cáo; đổi được chỉ bằng cách sửa mã và triển khai lại | `src/lib/reports/queries/rpt-03-participant-eligibility.ts:11, 72` | Khác không chủ đích — hai nguồn chân lý (mục 9 câu 3) |
| Chỉ ROLE-SYS-ADMIN ghi được cấu hình | Mục 6 | Vai trò này đã có thật trong ràng buộc bảy vai của bảng người dùng; nhưng chưa có bảng cấu hình nên chưa có policy ghi nào | `supabase/migrations/20260904090000_core_identity.sql:10-16` | Một phần |
| Phạm vi đọc theo vai trò | Mục 6 chặn cả trục đọc | Chính sách đọc mở cho mọi vai trò đang hoạt động trên các bảng nghiệp vụ (`FR-601` — **mã nội bộ LAB-3**, không phải mã yêu cầu của khách) | `supabase/migrations/20260904090900_rls_core.sql:28-33` | Cần khách chốt |
| Nguồn của danh sách chọn người nhận | Tên hiển thị và cờ đang hoạt động; không hiện thư điện tử | Bảng người dùng nội bộ đã có đủ ba cột cần dùng | `supabase/migrations/20260904090000_core_identity.sql:7-21` | Không lệch |

## 11. Dẫn chứng

- RFP:249-255 — `TBL-ROLE-01`: bảy vai trò nội bộ; RFP:255 gán ROLE-SYS-ADMIN việc quản lý tài khoản, quyền và log vận hành. RFP:311 — §02-08: bên dự thầu **phải đề xuất** cơ chế phân tách quyền và truy vết.
- RFP:600 — `BR-NOTIFY-01`. RFP:601 — `GOV-RULE-01`: maker-checker chỉ cho quy tắc/biểu suất. RFP:631 — `FR-PARTY-03`: ngưỡng cảnh báo sắp hết hiệu lực **cấu hình được**.
- RFP:686 — `FR-NOTIFY-01`: hai kênh, bốn nhóm event, SMS và FAX không thuộc kênh. RFP:687 — `FR-NOTIFY-02`: Critical trong **5 phút**, retry tối đa 3.
- RFP:688 — `FR-NOTIFY-03`: cấu hình **người nhận · ngưỡng · thời điểm gửi**; nghiệm thu là "việc thay đổi cấu hình không làm mất lịch sử gửi trong quá khứ".
- RFP:710 — `FR-AUDIT-01`. RFP:780 — §08-05 chống trùng business key. RFP:804, RFP:807, RFP:809, RFP:812, RFP:814-815 — `NFR-AVL-01`, `NFR-PERF-01`, `NFR-SEC-01`, `NFR-SEC-04`, `NFR-OPS-01`, `NFR-OPS-02`. RFP:886 — §09-06 APPI.
- Function List `FN-12` · Feature List `FE-040` — cấu hình người nhận, ngưỡng và thời điểm gửi mà không làm mất lịch sử gửi.
- Chỉ cho phần đối chiếu prototype ở mục 10: `src/lib/reports/queries/rpt-03-participant-eligibility.ts:11, 72`, `supabase/migrations/20260904090000_core_identity.sql:7-21`, `20260904090700_incentive.sql:2-12`, `20260904090900_rls_core.sql:28-33`.
