# SC-32 — Trạng thái vận hành suy giảm · Spec BE

| | |
|---|---|
| FE liên quan | FE-045 (Vận hành suy giảm khi mất kết nối) |
| FN | FN-14 (Quản trị vận hành và quản lý tài liệu đính kèm) |
| Ưu tiên | P1 |
| Yêu cầu khách | NFR-AVL-02, §09-04, NFR-AVL-01, NFR-USE-01, NFR-COMP-01, BR-CLOSE-01, FR-CORR-01, FR-CORR-03, FR-AUDIT-01, PP-NET-01 |
| Miền dữ liệu | D-LOT, D-TRADE, D-DELIVERY (ba tác vụ hiện trường) · D-SETTLE (rào khoá ngày) |
| State machine | — (RFP không có `FIG-*` cho vòng đời một thao tác chờ đồng bộ; `FIG-030` chỉ vẽ ranh giới DR — xem mục 4) |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

**Đây là Component, không phải trang** — không route, không URL để mở, không endpoint "của màn". Phần người dùng thấy là hai lớp chỉ báo chồng lên màn khác; phần backend là những đường phục vụ **việc đồng bộ lại** — nửa thứ hai của `NFR-AVL-02` (RFP:805).

BE phải cung cấp: (a) đường **xác nhận kết nối thật** để thiết bị không phải tin cờ online của trình duyệt; (b) đường **đồng bộ lại** nhận một thao tác đã xếp hàng đợi kèm thời điểm nhập và ngày nghiệp vụ lúc nhập, chống gửi trùng, rồi định tuyến về đúng đường ghi của màn gốc; (c) đường **ghi vết mọi lần thử đồng bộ**, kể cả lần thất bại và lần người dùng bỏ thao tác — không có nó thì khoảng một thao tác nằm trong hàng đợi **không có dấu vết nào phía máy chủ** (mục 7); (d) một quy tắc dứt khoát về **thao tác nhập khi mất kết nối thuộc ngày nghiệp vụ nào**.

BE **không** làm: **không giữ hàng đợi** — hàng đợi nằm trên thiết bị, đó là bản chất của yêu cầu; **không thêm đường ghi mới nào cho ba tác vụ hiện trường** — đường ghi vẫn của SC-08, SC-11, SC-16 và ràng buộc nghiệp vụ của chúng không được nới; **không tự giải quyết xung đột**; và **không chọn hộ** giữa suy giảm chỉ-đọc và hàng đợi ghi (mục 9).

Ràng buộc nặng nhất chi phối cả spec: **đồng bộ lại không thể vô điều kiện.** `BR-CLOSE-01` (RFP:597) cấm sửa trực tiếp ngày nghiệp vụ đã lock và `FR-CORR-03` (RFP:658) đòi **mọi lần thử sửa trực tiếp đều bị chặn và có log**. Một thao tác nhập lúc 09:50 mà chỉ đồng bộ được sau khi ngày đã lock thì **không có đường tự động nào** đưa nó vào hệ; đường còn lại là yêu cầu điều chỉnh của `FR-CORR-01` (RFP:656) — người dùng nhập lại tay ở SC-20.

## 2. Hợp đồng API

### Điều kiện hiển thị — thay cho "điều kiện vào màn"

Không có route nên không có điều kiện vào màn. Thành phần hiển thị **chồng lên màn khác** theo hai lớp:

| Lớp | Vị trí | Xuất hiện khi | Phạm vi |
|---|---|---|---|
| Chỉ báo toàn cục | Thanh đầu trang, cạnh chỉ báo ngày nghiệp vụ | Luôn có mặt sau khi đăng nhập; chỉ đổi hình thái khi mất kết nối hoặc còn thao tác chờ; online và hàng đợi rỗng thì **ẩn hoàn toàn** | Mọi màn sau khi đăng nhập |
| Banner trong màn | Đầu vùng nội dung, **trên** form | Màn **có ghi dữ liệu** và đang mất kết nối hoặc còn thao tác chờ **của chính màn đó** | SC-08, SC-11, SC-16 (+ SC-17 nếu tính — mục 9) |

Xác thực **bắt buộc** (nằm sau cổng đăng nhập của màn chứa nó). Vai trò: **không lọc** — mất kết nối là sự kiện của thiết bị, không của quyền (mục 6). Mã lỗi khi thiếu quyền: **không áp dụng** — không phải tài nguyên có route nên không có 404 riêng. Tiền đề: hàng đợi cục bộ **và** cache dữ liệu tham chiếu — không có dữ liệu tham chiếu thì khi mất kết nối cũng không nhập được gì.

Ba đường dưới đây **phục vụ việc đồng bộ lại**, không phải đường của một trang.

### `GET /api/health`

| | |
|---|---|
| Thoả yêu cầu | FE-045 · NFR-AVL-02 |
| Xác thực · Vai trò được gọi | bắt buộc · mọi vai trò đang hoạt động |
| Idempotent | có — không đổi dữ liệu |

**Request** — không tham số. **Response 2xx** — `serverTime` (timestamp) · `businessDate` (date; ngày nghiệp vụ JST hiện tại do **server** quyết) · `businessDateLocked` (boolean). Trả hai trường sau ngay tại đây là có chủ đích: thiết bị vừa có mạng lại cần biết **ngày nghiệp vụ đã trôi qua chưa** trước khi bấm đồng bộ.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 401 | — | Không có phiên hợp lệ | NFR-SEC-03 |
| 503 | `DEPENDENCY_DOWN` | Tiến trình web sống nhưng cơ sở dữ liệu không phản hồi | NFR-AVL-02 |

**Tác dụng phụ** — không ghi bảng nào.

### `POST /api/sync/replay`

| | |
|---|---|
| Thoả yêu cầu | FE-045 · NFR-AVL-02 · BR-CLOSE-01 · FR-CORR-03 |
| Xác thực · Vai trò được gọi | bắt buộc · **vai trò ghi của màn gốc**, không nới |
| Idempotent | **có** — khoá theo `clientOperationId`; gửi lại cùng mã trả kết quả lần đầu, không ghi lần hai |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn yêu cầu |
|---|---|---|---|---|---|
| `clientOperationId` | body | uuid | có | Thiết bị sinh khi xếp vào hàng đợi; là khoá chống gửi trùng | NFR-AVL-02 |
| `operationType` | body | enum | có | Một trong ba tác vụ hiện trường; tập giá trị ở mục 9 | FE-045 |
| `capturedAt` | body | timestamp | có | Thời điểm người dùng nhập; **không** phải thời điểm gửi | §09-04 |
| `businessDateAtCapture` | body | date | có | Ngày nghiệp vụ JST lúc nhập — **ngoại lệ có chủ đích** của quy tắc "ngày nghiệp vụ do server quyết" (mục 9) | NFR-AVL-02 |
| `payload` | body | object | có | Đúng thân yêu cầu của đường ghi màn gốc | FE-045 |

Server **tự quyết, không nhận từ client**: chủ thể thực hiện (lấy từ phiên), thời điểm ghi, kết quả kiểm khoá ngày, kết quả kiểm số lượng khả dụng.

**Response 2xx** — `clientOperationId` · `result` (`đã ghi` \| `đã ghi trước đó`) · `entity` · `entityId` · `businessDate` (ngày đã ghi thật) · `replayedAt`.

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 403 | `ROLE_FORBIDDEN` | Vai trò gọi không phải vai trò ghi của màn gốc | RFP:311 |
| 422 | `OPERATION_TYPE_UNKNOWN` | `operationType` không thuộc tập ba tác vụ | FE-045 |
| 422 | `PAYLOAD_INVALID` | Thân yêu cầu không thoả ràng buộc của đường ghi màn gốc | NFR-USE-01 |
| **423** | `LOCKED_BUSINESS_DATE` | `businessDateAtCapture` thuộc một ngày nghiệp vụ **đã lock** | BR-CLOSE-01, FR-CORR-03 |
| 409 | `QTY_UNAVAILABLE` | Số lượng khả dụng của lô hàng không còn đủ tại thời điểm đồng bộ | BR-LOT-02 |
| 409 | `TARGET_STATE_CHANGED` | Bản ghi đích đã đổi trạng thái nên thao tác mất hiệu lực (giao hàng đã hoàn tất) | FR-DEL-05 |
| 422 | `REFERENCE_INVALIDATED` | Dữ liệu tham chiếu mất hiệu lực kể từ lúc nhập (hiệu lực tham gia đã hết) | FR-AITAI-02 |
| 409 | `CAPTURE_TOO_OLD` | `capturedAt` vượt hạn giữ hàng đợi — hạn chưa có, xem mục 9 | §09-04 |

Bốn mã 409/422 cuối phải phân biệt được: mỗi mã là một nguyên nhân khác và dẫn tới một cách xử lý khác ở phía người dùng. **423** là mã duy nhất **không có đường sửa trong màn** — nó chỉ sang SC-20.

**Tác dụng phụ** — khi thành công: ghi đúng các bảng của màn gốc cộng một dòng audit của màn gốc, chủ thể là người đăng nhập và `reason` khai rõ đây là bản ghi đồng bộ lại. Ở **mọi** kết cục, ghi một dòng vết thử đồng bộ (mục 7).

### `POST /api/sync/attempts`

| | |
|---|---|
| Thoả yêu cầu | FE-045 · FR-AUDIT-01 · §09-04 |
| Xác thực · Vai trò được gọi | bắt buộc · mọi vai trò đang hoạt động; chỉ ghi vết của **chính mình** |
| Idempotent | có — khoá theo `clientOperationId` cộng loại kết cục |

Đường này tồn tại vì một lý do: **thao tác bị bỏ trước khi đồng bộ thành công hiện không để lại dấu gì**. `FR-AUDIT-01` (RFP:710) chỉ phủ được thao tác đã tới máy chủ.

**Request** — `clientOperationId` (uuid) · `operationType` (enum) · `capturedAt` (timestamp) · `businessDateAtCapture` (date) · `outcome` (enum: `bị bỏ` \| `hết hạn trên thiết bị`) · `reason` (string; bắt buộc hay không thì xem mục 9). **Response 2xx** — `id` · `recordedAt`.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu RFP |
|---|---|---|---|
| 422 | `OUTCOME_UNKNOWN` | `outcome` không thuộc tập giá trị | FR-AUDIT-01 |
| 409 | `ATTEMPT_ALREADY_RECORDED` | Đã có dòng vết cho cùng `clientOperationId` và cùng kết cục | FR-AUDIT-01 |

**Tác dụng phụ** — ghi một dòng vào bảng vết thử đồng bộ. **Không** chạm dữ liệu nghiệp vụ.

**Hệ quả lên hợp đồng của ba màn gốc.** Ba đường ghi của SC-08, SC-11, SC-16 hiện nhận ngày nghiệp vụ **do server quyết**. Muốn giữ đúng ngày lúc nhập thì hoặc cho `businessDateAtCapture` đi qua đường `replay` như trên, hoặc bỏ hẳn ý định giữ ngày lúc nhập. Đây là một **đổi hợp đồng**, không phải một tham số thêm — mục 9.

## 3. Mô hình dữ liệu màn này chạm

**Không có ô nhập nào ở màn này** — mọi giá trị người dùng thấy đều **dẫn xuất, chỉ đọc**, và phần lớn dẫn xuất từ hàng đợi **trên thiết bị** chứ không từ cơ sở dữ liệu.

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Hàng đợi thao tác (trên thiết bị) | mã thao tác client, loại tác vụ, thời điểm nhập, ngày nghiệp vụ lúc nhập, thân yêu cầu, chủ thể | Khoá theo **người dùng** trên thiết bị dùng chung; **chỉ đọc** với mọi phía; không đồng bộ dưới danh nghĩa người khác | ngoài cơ sở dữ liệu — tầng 3 phía thiết bị | **Chưa có** |
| Vết thử đồng bộ | mã thao tác client, loại tác vụ, thời điểm nhập, ngày nghiệp vụ lúc nhập, thời điểm thử, kết cục, mã lỗi, lý do, chủ thể | **Chỉ-thêm**; duy nhất theo cặp mã thao tác và kết cục; chủ thể không cho rỗng | tầng 1 (unique + not null) + tầng 3 (không có đường update/delete) | **Chưa có** |
| Khoá ngày nghiệp vụ | ngày nghiệp vụ | Guard của cạnh đồng bộ lại kiểm theo **ngày lúc nhập**, không theo ngày hiện tại; phải chặn cả đường **thêm mới** | tầng 2 (trigger) — ràng buộc P0, không để tầng 3 | Có, **nhưng chưa phủ đường thêm mới** (mục 10) |
| Bốn bảng nghiệp vụ theo ngày (giao dịch, kết quả đấu giá, kết quả thẩm định, lần giao) | ngày nghiệp vụ | Ngày nghiệp vụ của bản ghi đồng bộ lại phải là **ngày lúc nhập** | tầng 3 (một đường ghi duy nhất) | Có, **nhưng đang lấy ngày lúc ghi** (mục 10) |
| Lô hàng | số lượng khả dụng | Không cho âm; kiểm lại tại thời điểm đồng bộ, không tin kết quả kiểm lúc nhập | tầng 1 (CHECK) + tầng 3 (so-và-đổi) | Có, và đang giữ đúng |
| Vết kiểm toán | chủ thể, thời điểm, before/after, lý do | Bản ghi đồng bộ lại phải truy được về thời điểm **nhập**, không chỉ thời điểm ghi | tầng 3 (`reason` của đường ghi) | Có, thiếu hai mốc thời gian |

Ràng buộc khoá ngày là **P0** nên phải nằm tầng 1 hoặc tầng 2. Đặt ở tầng 3 thì mọi đường ghi mới — kể cả đường đồng bộ lại — đều phải tự nhớ kiểm, và chỉ cần một đường quên là mất hiệu lực `BR-CLOSE-01`.

## 4. Vòng đời trạng thái

RFP không có `FIG-*` cho vòng đời một thao tác chờ đồng bộ; `FIG-030` (RFP:864-867) chỉ vẽ ranh giới giữa mục tiêu DR đã chốt và phạm vi do đề xuất quyết định. Vòng đời dưới đây là **đề xuất thiết kế**, dựng từ `NFR-AVL-02` (RFP:805) và ba gạch đầu dòng của §09-04 (RFP:860-862).

| Từ | Sự kiện | Đến | Điều kiện tiền đề (guard) | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| — | Nhập khi mất kết nối | `chờ đồng bộ` | Đọc và ghi được hàng đợi cục bộ; có cache dữ liệu tham chiếu | vai trò ghi của màn gốc | (chặn ghi tại chỗ nếu hàng đợi không khả dụng) |
| `chờ đồng bộ` | Xác nhận kết nối thật | `sẵn sàng gửi` | Đường `health` trả 2xx — **không** dùng cờ online của trình duyệt | — | 503 `DEPENDENCY_DOWN` |
| `sẵn sàng gửi` | Đồng bộ lại | `đã ghi` | Ngày nghiệp vụ lúc nhập chưa lock; số lượng còn đủ; tham chiếu còn hiệu lực | vai trò ghi của màn gốc | 403 `ROLE_FORBIDDEN` |
| `sẵn sàng gửi` | Đồng bộ lại | `bị chặn vì khoá ngày` | **Chặn**: ngày nghiệp vụ lúc nhập đã lock | — | **423** `LOCKED_BUSINESS_DATE` |
| `sẵn sàng gửi` | Đồng bộ lại | `xung đột` | **Chặn**: số lượng đã hết, trạng thái đích đã đổi, hoặc tham chiếu mất hiệu lực | — | 409 `QTY_UNAVAILABLE` / `TARGET_STATE_CHANGED` / 422 `REFERENCE_INVALIDATED` |
| `bị chặn vì khoá ngày` | Mở yêu cầu điều chỉnh | (ra khỏi phạm vi màn) | Người dùng nhập lại tay ở SC-20 | vai trò của SC-20 | (thuộc SC-20) |
| `xung đột`, `bị chặn vì khoá ngày` | Bỏ thao tác | `bị bỏ` | **Phải ghi vết** — không tự xoá | người tạo thao tác | 409 `ATTEMPT_ALREADY_RECORDED` |
| `đã ghi` | Đồng bộ lại lần nữa | `đã ghi` | Cùng `clientOperationId` trả kết quả lần đầu | — | — (idempotent) |

Guard dễ mất nhất là cạnh **`sẵn sàng gửi → đã ghi`**: nó phải kiểm khoá ngày theo `businessDateAtCapture`, **không** theo ngày hiện tại. Kiểm theo ngày hiện tại thì một thao tác nhập ngày hôm trước lặng lẽ ghi vào ngày hôm sau — bảng đối chiếu của **cả hai ngày** đều sai và không ai thấy lỗi. Cạnh `xung đột → bị bỏ` cũng là guard: tự xoá là **mất dữ liệu im lặng**, đúng cái ca `NFR-AVL-02` muốn tránh. Không tồn tại cạnh nào cho phép đồng bộ lại vượt qua khoá ngày.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| NFR-AVL-02 (RFP:805) | "cơ chế cho phép **tối thiểu tiếp tục thực hiện tác vụ** khi kết nối tại hiện trường bị ngắt trong thời gian ngắn, và **cách đồng bộ lại** khi dịch vụ trở lại" | Hàng đợi trên thiết bị + đường `replay` | Nghiệm thu là **kịch bản diễn tập business continuity cho từng tác vụ quan trọng** — cần danh sách tác vụ trước (mục 9) |
| §09-04 (RFP:860-862) | Phải nêu rõ: tác vụ nào tiếp tục được · dữ liệu nào lưu local hoặc vào queue · "cơ chế **cảnh báo, hòa giải (reconciliation) và phân chia trách nhiệm** khi đồng bộ lại" | Mục 2 (cảnh báo) · mục 4 (hoà giải) · mục 6 (trách nhiệm) | Ba nhóm đều có câu trả lời viết ra được |
| §09-04 (RFP:858) | Tài liệu "**không** giả định một mô hình offline hoàn toàn cho mọi nghiệp vụ" | Phạm vi giới hạn ở ba tác vụ hiện trường | Không màn nào ngoài danh sách chạy được khi mất kết nối |
| BR-CLOSE-01 (RFP:597) | "Không được chỉnh sửa trực tiếp ngày nghiệp vụ đã bị lock" | Guard của cạnh đồng bộ lại; mã **423** | Không thao tác nào của ngày đã lock vào được hệ qua đường đồng bộ lại |
| FR-CORR-03 (RFP:658) | Hệ thống "**không được** cho phép sửa trực tiếp bản ghi của ngày đã lock"; nghiệm thu "mọi lần thử sửa trực tiếp đều **bị chặn và có log**" | Mã 423 cộng dòng vết thử đồng bộ | Mỗi lần 423 để lại đúng một dòng vết |
| FR-CORR-01 (RFP:656) | "phải hỗ trợ yêu cầu điều chỉnh đối với giao dịch đã chốt, kèm lý do, bằng chứng đính kèm và trạng thái phê duyệt" | Là **đường ra duy nhất** cho ca 423 | Từ trạng thái bị chặn mở được SC-20 |
| FR-AUDIT-01 (RFP:710) | Ghi audit cho "tạo, sửa, phê duyệt, lock và thay đổi quyền"; truy được "chủ thể, timestamp, before/after và **lý do**" | Audit màn gốc khi thành công + bảng vết thử đồng bộ cho các ca còn lại | Không thao tác nào biến mất không dấu vết (mục 7) |
| NFR-USE-01 (RFP:816) | "Các luồng **nhập lô hàng, chốt giao dịch và ghi nhận giao hàng** phải dùng được bằng bàn phím, và có thông báo lỗi dễ hiểu" | Là **suy luận** về danh sách tác vụ quan trọng — xem ngay dưới | Ba nhóm mã lỗi ở mục 2 đều dịch được thành một câu người dùng hiểu |
| RFP:1272 | "Ngày nghiệp vụ dùng múi giờ **JST**" | `businessDateAtCapture` tính theo JST trên thiết bị | Thao tác vắt qua nửa đêm JST vẫn thuộc đúng ngày |

**Danh sách "tác vụ quan trọng" là suy luận, không phải trích dẫn.** `NFR-AVL-02` (RFP:805) **không liệt kê tác vụ nào** và **không nói con số ba**; nó chỉ đòi nghiệm thu "cho từng tác vụ quan trọng". Con số 3 đến từ **Feature List `FE-045`**. Chỗ duy nhất trong RFP gọi tên **đúng ba luồng hiện trường** là `NFR-USE-01` (RFP:816) — và đó là yêu cầu về **dùng được bằng bàn phím**, không phải về vận hành suy giảm; neo vào đó là suy luận của bên dự thầu. Thêm nữa, hai màn nhập tại chỗ khác — `FN-03` ghi kết quả thẩm định, `FN-05` nhập kết quả đấu giá — **không** được `NFR-USE-01` gọi tên; tính vào thì danh sách thành **5** và ngân sách đổi theo. Đây là mục 9; chúng tôi không chọn hộ.

**Con số chưa có nguồn**: "ngắt trong thời gian ngắn" là bao lâu, hàng đợi giữ tối đa bao nhiêu thao tác và bao lâu, chu kỳ ping, ngưỡng cảnh báo cho thao tác chờ lâu nhất. `RTO ≤ 4 giờ` và `RPO ≤ 15 phút` (`NFR-AVL-03`, RFP:806) là chỉ tiêu **DR phía máy chủ**, không phải hạn của hàng đợi trên thiết bị — dùng lẫn là sai. Con số duy nhất RFP cho về mất kết nối là **3–5 lần mất kết nối ngắn trong tuần cao điểm** (`PP-NET-01`, RFP:486; `LOG-NET-01`, RFP:1243) và đó là **tần suất**, không phải thời lượng. Tất cả ở mục 9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | Thấy chỉ báo toàn cục | Thấy banner trong màn | Xếp vào hàng đợi | Đồng bộ lại | Ghi vết bỏ thao tác | Đọc vết thử đồng bộ |
|---|---|---|---|---|---|---|
| ROLE-INTAKE (SC-08) · ROLE-TRADE (SC-11) · ROLE-DELIVERY (SC-16) | cho phép | cho phép — đúng màn của mình | cho phép — đúng màn của mình | cho phép — đúng màn của mình | cho phép (của mình) | đề xuất: cho phép |
| ROLE-JUDGE | cho phép | từ chối (ngoài danh sách — mục 9) | từ chối | từ chối · **403** `ROLE_FORBIDDEN` | cho phép (của mình) | đề xuất: cho phép |
| ROLE-SETTLEMENT | cho phép | từ chối | từ chối | từ chối · **403** | cho phép (của mình) | đề xuất: cho phép (actor đối chiếu) |
| ROLE-RULE-ADMIN | cho phép | từ chối | từ chối | từ chối · **403** | cho phép (của mình) | đề xuất: cho phép |
| ROLE-SYS-ADMIN | cho phép | từ chối | từ chối | từ chối · **403** | cho phép (của mình) | đề xuất: cho phép (vận hành) |

Bảy vai trò lấy từ `TBL-ROLE-01` (RFP:249-255). **Đọc và ghi là hai trục khác nhau, và căn cứ của hai trục cũng khác nhau.**

- Trục **ghi**: đường đồng bộ lại **không nới quyền** — vai trò được ghi vẫn đúng vai trò của màn gốc theo `TBL-ROLE-01`, và từ chối tường minh bằng **403** vì người gọi đã biết tài nguyên tồn tại. Đây là chỗ có căn cứ chắc nhất của ma trận: nới quyền ở đường đồng bộ lại là mở một cửa sau vào ba luồng P0.
- Trục **thấy chỉ báo**: **không chặn theo vai trò** — mất kết nối là sự kiện của **thiết bị**, không của quyền, và một người không thấy được là mình đang mất kết nối thì `NFR-AVL-02` không còn nghĩa gì. Đây là **đề xuất thiết kế**, không phải yêu cầu khách.
- Trục **đọc vết thử đồng bộ**: cột cuối bảng trên là **đề xuất**. Căn cứ duy nhất RFP cho về phân quyền là RFP:311 (§02-08): *"Đơn vị dự thầu phải **đề xuất** cơ chế phân tách quyền và truy vết tương ứng với các vai trò nêu trên."* — RFP **giao cho bên dự thầu đề xuất**, không hề bắt đọc mở. Chính sách đọc mở hiện hành của hệ — cho mọi vai trò đang hoạt động đọc mọi bảng nghiệp vụ — cũng là **đề xuất của bên dự thầu**, và nó **chống lại** §09-06 (RFP:886) vốn đòi RBAC và log truy cập cho thông tin cá nhân. Đó là chỗ **đề xuất của ta chống một yêu cầu khách bằng chữ** — tức chỗ **chúng tôi phải giải trình**, không phải chỗ khách phải chọn. Vào mục 9.

**Chặn vào trang trả 404, không phải 403** — quy tắc này **chưa áp dụng được** ở màn này vì không có route; nếu về sau dựng một trang xem hàng đợi thì trang đó tuân đúng quy tắc 404.

Màn này **không** cần maker-checker: `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc và biểu suất. Nhưng có một ràng buộc riêng cùng loại: **hàng đợi phải khoá theo người dùng trên thiết bị dùng chung**, và không cho đồng bộ lại dưới danh nghĩa người khác — thiết bị hiện trường "một số trường hợp dùng chung theo ca" (RFP:851). Chủ thể của bản ghi lấy từ **phiên đang đăng nhập**, không nhận từ client (mục 2).

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Đồng bộ lại thành công | `action` của màn gốc kèm cờ đồng bộ lại | after: bản ghi đã tạo · reason: khai rõ là bản ghi đồng bộ lại kèm `capturedAt` và `businessDateAtCapture` | FR-AUDIT-01 (RFP:710) |
| Đồng bộ lại bị chặn vì khoá ngày | `sync_replay_blocked_locked_day` | after: `operationType`, `businessDateAtCapture`, mã **423** · reason: lý do chặn | FR-CORR-03 (RFP:658) |
| Đồng bộ lại thất bại vì xung đột | `sync_replay_conflict` | after: `operationType`, mã lỗi cụ thể (409/422) · reason: nguyên nhân | FR-AUDIT-01 |
| Người dùng bỏ một thao tác chờ | `sync_operation_discarded` | after: `operationType`, `capturedAt`, `businessDateAtCapture` · reason: lý do (mục 9) | FR-AUDIT-01 |
| Thao tác hết hạn trên thiết bị | `sync_operation_expired` | after: `operationType`, `capturedAt` | FR-AUDIT-01 |

Dòng thứ nhất **bắt buộc**: đồng bộ lại thành công là một thao tác **tạo**, đúng danh sách `FR-AUDIT-01`. Dòng thứ hai cũng bắt buộc — `FR-CORR-03` (RFP:658) nghiệm thu bằng "mọi lần thử sửa trực tiếp đều bị chặn và **có log**", nên một lần 423 không ghi vết là **trượt nghiệm thu**, không phải thiếu sót nhỏ.

**Chỗ hở không lấp được bằng thiết kế API.** Khoảng từ lúc người dùng nhập tới lúc đồng bộ thành công **không có dấu vết nào phía máy chủ** — thiết bị mất kết nối thì không gửi được gì, kể cả một dòng vết. Ba dòng cuối bảng chỉ ghi được **sau khi có mạng lại**; một thiết bị hỏng, mất, hoặc bị xoá dữ liệu trước lúc đó thì thao tác biến mất không dấu vết. `FR-AUDIT-01` **không phủ được khoảng đó**, và không có cách dựng nào phủ được nó từ phía máy chủ. Đây là rủi ro phải khai với khách (mục 9), không phải một việc phải làm.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| NFR-AVL-02 (RFP:805) | Tối thiểu tiếp tục thực hiện tác vụ khi kết nối bị ngắt ngắn; và cách đồng bộ lại | Là lý do thành phần tồn tại. Nghiệm thu theo **từng tác vụ quan trọng** nên danh sách tác vụ là ranh giới nghiệm thu, không phải chi tiết triển khai |
| NFR-AVL-01 (RFP:804) | Khả dụng 99,5%/tháng trong khung 02:00–10:00 JST | Đúng khung ba tác vụ hiện trường diễn ra; và 10:00 là mốc ngày nghiệp vụ trôi qua trong lúc còn thao tác chờ |
| NFR-AVL-03 (RFP:806) | RTO ≤ 4 giờ; RPO ≤ 15 phút | Chỉ tiêu **DR phía máy chủ**, **không** phải hạn của hàng đợi trên thiết bị — đừng dùng thay nhau (mục 5) |
| NFR-COMP-01 (RFP:817) | Chạy trên trình duyệt được phê duyệt; **thao tác được trên tablet tại hiện trường** | Hàng đợi và cache sống trong trình duyệt của tablet nên phụ thuộc hoàn toàn vào bộ nhớ cục bộ mà trình duyệt đó cho phép; ma trận tương thích phải phủ cả đường suy giảm |
| NFR-PERF-01 (RFP:807) | Tìm kiếm thông thường p95 ≤ 2 giây | Đường `health` phải **nhẹ hơn** một truy vấn nghiệp vụ; nếu không thì chính nó thành nguyên nhân báo mất kết nối |
| NFR-OPS-01 (RFP:814) | Giám sát health, lỗi batch/xuất dữ liệu, lỗi gửi thông báo, sự kiện bảo mật | Số thao tác bị chặn vì khoá ngày và số thao tác bị bỏ là **chỉ số vận hành** cần alert — không có nó thì mất dữ liệu diễn ra âm thầm |
| NFR-SEC-04 (RFP:812) | TLS cho dữ liệu truyền; secret tách khỏi mã nguồn | Dữ liệu nghiệp vụ **chưa gửi** nằm trên tablet dùng chung, **ngoài** mọi lớp phân quyền và mã hoá của máy chủ — rủi ro riêng của phương án hàng đợi (mục 9) |
| §09-06 / APPI (RFP:886) | RBAC và log truy cập cho thông tin cá nhân | Thao tác chờ có thể mang mã người tham gia; một tablet dùng chung giữ dữ liệu cá nhân ngoài hệ là một điểm APPI phải trả lời |

## 9. Câu hỏi cho chủ đầu tư

- **Danh sách "tác vụ quan trọng" gồm những tác vụ nào?** Cần trước khi ước lượng vì `NFR-AVL-02` (RFP:805) nghiệm thu bằng **kịch bản diễn tập cho từng tác vụ quan trọng** — danh sách này *là* phạm vi nghiệm thu. Tài liệu kéo về hai phía: `NFR-AVL-02` **không liệt kê tác vụ nào và không nói con số ba**; Feature List `FE-045` nói **3**; `NFR-USE-01` (RFP:816) gọi tên **đúng ba luồng** nhập lô hàng, chốt giao dịch, ghi nhận giao hàng — nhưng cho một mục đích khác. Hai màn nhập tại chỗ khác (`FN-03` ghi thẩm định, `FN-05` nhập kết quả đấu giá) **không** được `NFR-USE-01` gọi tên; tính vào thì danh sách thành **5**. Sai thì hoặc diễn tập business continuity không đạt vì thiếu tác vụ, hoặc chi phí phía thiết bị phình ra cho tác vụ khách không cần.
- **Chọn phương án nào: suy giảm chỉ-đọc, hay hàng đợi ghi cộng đồng bộ lại?** Cần trước khi dựng vì nó đổi cả kiến trúc phía thiết bị và cả phạm vi nghiệm thu. (a) **Chỉ-đọc**: cache dữ liệu đọc, chặn mọi ghi khi mất kết nối — chi phí thấp, vết audit nguyên vẹn, không có gì để đồng bộ nên không xung đột với khoá ngày; đổi lại chỉ thoả **một phần** `NFR-AVL-02` vì người dùng **không "tiếp tục thực hiện tác vụ"** như RFP đòi. (b) **Hàng đợi ghi**: đúng chữ của yêu cầu, nhưng chi phí cao, xung đột với `BR-CLOSE-01` không giải được tự động, vết audit hở (mục 7), và rủi ro **tệ hơn cả không có gì**: người dùng tin đã lưu rồi mất khi đồng bộ thất bại. §09-04 (RFP:867) nói thẳng phương thức "do đơn vị dự thầu quyết định" — nên đây là chỗ chúng tôi phải đề xuất và khách phải chấp thuận.
- **Thao tác nhập khi mất kết nối thuộc ngày nghiệp vụ lúc nhập hay lúc đồng bộ?** Cần trước khi code vì nó là **đổi hợp đồng** của ba đường ghi màn gốc, không phải một tham số thêm. Quy tắc thiết kế hiện hành là **ngày nghiệp vụ do máy chủ quyết, không nhận từ client** — đúng với RFP:1272 (JST) và là cách chặn client tự khai ngày. Nhưng giữ nguyên quy tắc đó thì một thao tác nhập lúc 09:55 và đồng bộ lúc 10:30 rơi sang **ngày sau**, và bảng đối chiếu ngày của `FR-SETTLE-01` (RFP:659) sai ở **cả hai ngày**. Mở ngoại lệ thì phải nói rõ ngoại lệ đó chỉ đi qua đường `replay` và chỉ với chủ thể đã xác thực.
- **"Ngắt trong thời gian ngắn" là bao lâu, và hàng đợi giữ tối đa bao nhiêu thao tác trong bao lâu?** Cần trước khi code vì nó là điều kiện của mã `CAPTURE_TOO_OLD` ở mục 2. **RFP không định lượng.** Con số duy nhất là **3–5 lần mất kết nối ngắn trong tuần cao điểm** (RFP:486, RFP:1243) — tần suất, không phải thời lượng; và `RTO ≤ 4 giờ` / `RPO ≤ 15 phút` (RFP:806) là chỉ tiêu DR phía máy chủ, không dùng thay được. Giữ quá lâu thì gần chắc chắn đụng khoá ngày lúc đồng bộ; quá ngắn thì bỏ mất việc người dùng đã nhập.
- **Bỏ một thao tác chờ có bắt buộc nhập lý do không?** Cần trước khi code vì nó đổi hợp đồng của `POST /api/sync/attempts`. `FR-AUDIT-01` (RFP:710) đòi lý do cho thao tác nhạy cảm, và bỏ một bản ghi nghiệp vụ đã nhập đúng là loại thao tác đó — nhưng RFP không nói cụ thể cho ca này. Bắt buộc thì thêm ma sát đúng lúc người dùng đang bận nhất; không bắt buộc thì mất lý do của một lần mất dữ liệu có chủ ý.
- **Phạm vi đọc vết thử đồng bộ, và có siết chính sách đọc ở tầng dữ liệu không?** Cần trước khi dựng vì đây là **quyết định kiến trúc**, chung một quyết định với SC-30 và SC-31. RFP:311 (§02-08) **giao cho bên dự thầu đề xuất** cơ chế phân tách quyền — không có yêu cầu đọc mở nào; §09-06 (RFP:886) đòi RBAC và log truy cập cho thông tin cá nhân. Chính sách đọc mở hiện hành là **đề xuất của bên dự thầu chống lại một yêu cầu khách bằng chữ**; chúng tôi khai đúng bản chất và **phải giải trình**, không đẩy sang cho khách chọn. Câu hỏi cho khách hẹp hơn và nằm ở chỗ khác: phương án hàng đợi để dữ liệu nghiệp vụ **chưa gửi** nằm trên tablet dùng chung ở hiện trường (RFP:851), **ngoài** mọi lớp phân quyền và mã hoá của máy chủ — chấp nhận rủi ro đó tới mức nào, và có yêu cầu xoá hàng đợi khi đổi ca không.
- **Chấp nhận khoảng không có vết audit của thao tác chờ tới mức nào?** Cần trước khi chốt phương án vì **không có cách dựng nào lấp được nó** từ phía máy chủ (mục 7). `FR-AUDIT-01` (RFP:710) chỉ phủ thao tác đã tới máy chủ; một thiết bị hỏng hoặc bị xoá dữ liệu trước khi có mạng lại thì thao tác biến mất không dấu vết. Nếu khách coi đây là không chấp nhận được thì câu trả lời đúng là phương án (a) chỉ-đọc, chứ không phải thêm một bảng vết.
- **Có tự động đồng bộ khi mạng trở lại, hay bắt buộc người dùng bấm?** Cần trước khi code vì tự động thì một thao tác có thể ghi vào hệ **khi người nhập đã rời thiết bị** — trên tablet dùng chung theo ca (RFP:851) nghĩa là ghi dưới danh nghĩa người đang đăng nhập lúc đó. Bắt buộc bấm thì an toàn về chủ thể nhưng dễ để thao tác ứ lại tới lúc ngày đã lock.
- **Số thao tác bị chặn vì khoá ngày và số thao tác bị bỏ có thuộc danh sách alert vận hành không?** Cần trước khi dựng vì `NFR-OPS-01` (RFP:814) nghiệm thu bằng **danh sách alert và diễn tập alert**, và hai con số này là dấu hiệu duy nhất cho biết dữ liệu nghiệp vụ đang mất. Không có alert thì việc mất dữ liệu diễn ra âm thầm cho tới kỳ đối chiếu.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Hàng đợi trên thiết bị và cache dữ liệu tham chiếu | Mục 2, mục 4 | **Không có gì trong hướng này**: 6 dependency, không service worker, không thư viện đồng bộ; `public/` chỉ có 5 tệp svg, không manifest | `package.json:14-21` | Chưa thi công |
| Đường xác nhận kết nối thật và hai đường đồng bộ | `GET /api/health`, `POST /api/sync/replay`, `POST /api/sync/attempts` | Chưa có cả ba; không có route health nào trong 13 nhóm API hiện có, và chưa có hàng đợi nên chưa có gì để đồng bộ lại | `src/app/api/` — không có `health` hay `sync` | Chưa thi công |
| Chỉ báo cắt ngang ở thanh đầu trang | Mục 2 lớp 1 | **Khuôn đã có thật**: chỉ báo ngày nghiệp vụ đang đặt đúng chỗ đó, và layout sau đăng nhập là điểm treo duy nhất cho một thành phần toàn cục | `src/components/layout/top-header.tsx:7,71`; `src/app/(app)/layout.tsx:8-19` | Một phần |
| Mã 423 cho ca khoá ngày | Mục 2 | **Khuôn đã có thật**: đường xử lý ghi-khi-đã-lock trả đúng **423** với mã `LOCKED_BUSINESS_DATE`; đường đồng bộ lại chỉ cần dùng lại khuôn này | `src/lib/reconciliation/handle-locked-write.ts:12-41`; `src/app/api/transactions/[id]/confirm/route.ts:17` | Một phần |
| **Khoá ngày chặn được thao tác đồng bộ lại** | Mã **423** cho `businessDateAtCapture` đã lock | **Chỉ chặn UPDATE và DELETE, không chặn INSERT.** Trigger là `before update or delete` trên bốn bảng; policy insert của các bảng đó **không** kiểm khoá ngày. Một thao tác nhập khi mất kết nối rồi đồng bộ lại là một **INSERT** — nó sẽ **ghi được** vào một ngày đã lock | `supabase/migrations/20260904090500_business_day_lock.sql:36-70`; `20260904091000_rls_ops.sql:7-8,15-16,36-38` | **Khác không chủ đích** |
| **Ngày nghiệp vụ của bản ghi đồng bộ lại** | `businessDateAtCapture` — ngày lúc nhập | **Ngày lúc ghi, lấy từ đồng hồ máy chủ.** Mọi đường ghi đóng dấu `todayJst()` tại thời điểm gọi, và hợp đồng hiện tại **cấm** client truyền ngày nghiệp vụ: "business_date is always server-computed (todayJst()); never taken from [client]" | `src/app/api/transactions/route.ts:63-65`; `src/lib/deliveries/record-shipment.ts:131`; `src/lib/lots/create-lot.ts:26`; `src/app/api/seri-results/route.ts:75` | **Khác có chủ đích** — nhưng chống lại mục 3 và mục 9 |
| Chặn oversell khi đồng bộ lại | 409 `QTY_UNAVAILABLE` | **Đã chạy thật**: so-và-đổi trên số lượng khả dụng cộng `CHECK (available_qty >= 0)`. Nên một giao dịch hợp lệ lúc nhập có thể vô hiệu lúc đồng bộ — xung đột thật, không tự giải được | `src/lib/lots/availability-service.ts:6-29,48-64`; `src/lib/deliveries/record-shipment.ts:35-45` | Không lệch — là rào của mục 4 |
| Một lần đồng bộ là một đơn vị nguyên tử | Mục 4 | **Không có transaction xuyên bảng**: so-và-đổi cộng ghi bù thủ công, không `BEGIN/COMMIT` qua tầng API dữ liệu | `src/lib/deliveries/record-shipment.ts:16-45,126-140` | Cần khách chốt — ảnh hưởng phương án (b) |
| Vết audit cho thao tác trong hàng đợi | Mục 7 | Bảng audit **chỉ-thêm** đã có thật và mọi đường ghi đều gọi nó, nhưng nó **chỉ ghi khi request tới được máy chủ** — thao tác nhập khi mất kết nối rồi bị bỏ không để lại dấu gì | `supabase/migrations/20260904090000_core_identity.sql:30-40`; `src/lib/audit/write-audit-log.ts:14-45` | Chưa thi công |
| Kiểm soát truy cập theo vai trò cho đường đọc | Mục 6 trục đọc | Đọc mở cho mọi vai trò đang hoạt động trên mọi bảng nghiệp vụ (`FR-601` — **mã nội bộ LAB-3**, không phải mã yêu cầu của khách); có chủ đích khi dựng prototype | `supabase/migrations/20260904090900_rls_core.sql:28-40` | Cần khách chốt (mục 9) |

Hai dòng đậm là hai phát hiện phải sửa **trước** khi dựng SC-32, và chúng đi cùng nhau thành một ca xấu: đường đồng bộ lại là một INSERT, INSERT không bị khoá ngày chặn, và ngày nghiệp vụ được đóng dấu bằng đồng hồ máy chủ lúc ghi. Ghép lại: một thao tác nhập lúc 09:55 hôm trước, đồng bộ hôm sau, sẽ **ghi thành công** vào **ngày nghiệp vụ hôm sau** — không mã 423, không xung đột, không dấu hiệu nào. Bảng đối chiếu hôm trước thiếu một dòng và bảng hôm sau thừa một dòng, cả hai đều "đúng" theo dữ liệu. Đây đúng là ca mất dữ liệu **im lặng** mà `NFR-AVL-02` và `BR-CLOSE-01` cùng chống, và nó chỉ lộ ra khi có hàng đợi.

## 11. Dẫn chứng

- RFP:249-255 — `TBL-ROLE-01`: bảy vai trò nội bộ và trách nhiệm. RFP:311 — §02-08: bên dự thầu **phải đề xuất** cơ chế phân tách quyền và truy vết. RFP:486 — `PP-NET-01`: mạng khu tiếp nhận và cầu cảng không ổn định sáng sớm, **3–5 lần mất kết nối ngắn trong tuần cao điểm**. RFP:597 — `BR-CLOSE-01`. RFP:601 — `GOV-RULE-01`: maker-checker chỉ cho quy tắc và biểu suất.
- RFP:656-660 — `FR-CORR-01`, `FR-CORR-02`, `FR-CORR-03` (nghiệm thu: mọi lần thử sửa trực tiếp **bị chặn và có log**), `FR-SETTLE-01`, `FR-SETTLE-02` (lock ngày và ngăn sửa trực tiếp sau lock). RFP:710 — `FR-AUDIT-01`.
- RFP:804-806 — `NFR-AVL-01` (99,5% trong khung 02:00–10:00 JST), **`NFR-AVL-02`** (nguồn duy nhất của màn; nghiệm thu bằng kịch bản diễn tập business continuity **cho từng tác vụ quan trọng**), `NFR-AVL-03` (RTO ≤ 4 giờ, RPO ≤ 15 phút — chỉ tiêu DR phía máy chủ). RFP:807, RFP:812, RFP:814, RFP:816-817 — `NFR-PERF-01`, `NFR-SEC-04`, `NFR-OPS-01`, **`NFR-USE-01`** (chỗ duy nhất RFP gọi tên đúng ba luồng hiện trường), `NFR-COMP-01`.
- RFP:851 — thiết bị hiện trường "một số trường hợp **dùng chung theo ca**". RFP:856-862 — §09-04: tài liệu **không** giả định offline hoàn toàn; phải nêu rõ tác vụ nào tiếp tục được · dữ liệu nào vào queue · cơ chế **cảnh báo, hoà giải và phân chia trách nhiệm** khi đồng bộ lại. RFP:864-867 — `FIG-030`: mục tiêu DR đã chốt, **phương thức do đơn vị dự thầu quyết định**. RFP:886 — §09-06 APPI: RBAC và log truy cập cho thông tin cá nhân. RFP:1243 — `LOG-NET-01`. RFP:1272 — ngày nghiệp vụ dùng **JST**.
- Function List `FN-14` · Feature List `FE-045` — "Tiếp tục **3 tác vụ quan trọng** khi mất kết nối ngắn và đồng bộ lại khi có mạng"; con số **3** chỉ có ở đây, không có trong RFP.
- Chỉ cho phần đối chiếu prototype ở mục 10: `supabase/migrations/20260904090500_business_day_lock.sql:36-70`, `20260904090900_rls_core.sql:28-40`, `20260904091000_rls_ops.sql:7-38`, `20260904090000_core_identity.sql:30-40`; `src/app/api/transactions/route.ts:63-65`, `src/app/api/seri-results/route.ts:75`, `src/lib/deliveries/record-shipment.ts:16-45,126-140`, `src/lib/lots/create-lot.ts:26`, `src/lib/lots/availability-service.ts:6-29,48-64`, `src/lib/audit/write-audit-log.ts:14-45`, `src/lib/reconciliation/handle-locked-write.ts:12-41`, `src/components/layout/top-header.tsx:7,71`, `src/app/(app)/layout.tsx:8-19`, `package.json:14-21`.
