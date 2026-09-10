# Items Analysis - trang-thai-van-hanh-suy-giam

## Screen info

- Screen: SC-32 · Trạng thái vận hành suy giảm
- Source family: `image` (CREATE mode)
- Source image: `.momorph/shots/SC-32-trang-thai-van-hanh-suy-giam.png` (1280 × 2616)
- Source token: `SC-32-trang-thai-van-hanh-suy-giam` · screen name: `trang-thai-van-hanh-suy-giam`
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh
- Loại màn: **Component cắt ngang** — không có route riêng; hiển thị chồng lên màn khác theo hai lớp
- Tổng số component logic: 53 (batch 3/4)

### Item 6.1.2: Hàng field một Trạng thái kết nối

- `itemId`: `img-031`
- bbox: (43; 1221) → (1010; 1267)
- `nameJP`: 接続状態
- `nameTrans`: Connection state
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: không tin cờ online của trình duyệt một mình; phải có thêm một lần ping thật tới server.
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số một; là nguồn của thẻ chỉ báo ở lớp một và của banner ở lớp hai.
  Thành phần hiển thị: Bốn ô: số 1; nhãn Trạng thái kết nối; kiểu badge; nguồn là cờ online của trình duyệt cộng một lần ping thật tới server.
  Chức năng và logic: Chỉ đọc. Ràng buộc khai ngay trong ảnh: tablet nối wifi của chợ mà đường ra internet chết vẫn báo online nên không tin cờ online một mình.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: chưa có đường ping nào ở phía máy chủ để xác nhận kết nối thật.
- `qa`:
  Tập giá trị của badge gồm những giá trị nào và nhãn hiển thị của từng giá trị là gì; ảnh chỉ cho thấy một ca là Mất kết nối?
  Ping thật lặp lại theo chu kỳ bao lâu; và bao nhiêu lần thất bại thì kết luận mất kết nối?

### Item 6.1.3: Hàng field hai Số thao tác chờ đồng bộ

- `itemId`: `img-032`
- bbox: (43; 1267) → (1010; 1314)
- `nameJP`: 同期待ち件数
- `nameTrans`: Pending sync count
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: bằng 0 thì ẩn chỉ báo.
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số hai; là con số người dùng cần để biết sẽ mất bao nhiêu việc nếu bỏ đi.
  Thành phần hiển thị: Bốn ô: số 2; nhãn Số thao tác chờ đồng bộ; kiểu number; nguồn là đếm bản ghi trong hàng đợi cục bộ.
  Chức năng và logic: Chỉ đọc; bằng 0 thì ẩn chỉ báo nên đây cũng là điều kiện của trạng thái Rỗng.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng con số khi vượt một ngưỡng hiển thị là gì; ảnh chỉ cho thấy một ca là số 3?
  Đếm theo thao tác hay theo bản ghi nghiệp vụ; một thao tác chạm nhiều bản ghi thì tính là mấy?

### Item 6.1.4: Hàng field ba Thao tác chờ lâu nhất

- `itemId`: `img-033`
- bbox: (43; 1314) → (1010; 1344)
- `nameJP`: 最古の待機操作
- `nameTrans`: Oldest pending operation
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số ba; là dấu hiệu duy nhất cho biết hàng đợi đã ứ quá lâu.
  Thành phần hiển thị: Bốn ô: số 3; nhãn Thao tác chờ lâu nhất; kiểu datetime; nguồn là hàng đợi cục bộ.
  Chức năng và logic: Chỉ đọc; cảnh báo mạnh hơn khi vượt ngưỡng. Ảnh khai rõ rằng khoảng thời gian ngắn của yêu cầu chưa được định lượng nên ngưỡng chưa có.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng thời điểm hiển thị là gì; ảnh chỉ cho thấy chỗ trống dạng năm tháng ngày giờ phút?
  Ngưỡng cảnh báo mạnh hơn là bao lâu và cấu hình được không?
  Vượt ngưỡng thì thành phần chỉ cảnh báo hay chặn nhập thêm?

### Item 6.1.5: Hàng field bốn Trạng thái đồng bộ

- `itemId`: `img-034`
- bbox: (43; 1344) → (1010; 1374)
- `nameJP`: 同期状態
- `nameTrans`: Sync state
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số bốn; là nửa đồng bộ lại của yêu cầu thể hiện thành một trạng thái thấy được.
  Thành phần hiển thị: Bốn ô: số 4; nhãn Trạng thái đồng bộ; kiểu badge; nguồn là tiến trình đồng bộ lại hàng đợi.
  Chức năng và logic: Chỉ đọc; là trạng thái nghiệm thu của nửa sau yêu cầu nên phải phân biệt được đang chờ với đang gửi.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Tập giá trị badge gồm những giá trị nào; ảnh chỉ cho thấy nhãn Đang đồng bộ ở thẻ trạng thái?
  Có hiển thị tiến độ theo số thao tác đã gửi không; thẻ trạng thái nói có tiến độ nhưng bảng field không nói dạng nào.

### Item 6.1.6: Hàng field năm Thao tác đồng bộ thất bại

- `itemId`: `img-035`
- bbox: (43; 1374) → (1010; 1420)
- `nameJP`: 同期失敗件数
- `nameTrans`: Failed sync count
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: thao tác đồng bộ thất bại không tự xoá; phải người dùng xử lý.
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số năm; đếm những thao tác bị phía máy chủ từ chối khi đồng bộ lại.
  Thành phần hiển thị: Bốn ô: số 5; nhãn Thao tác đồng bộ thất bại; kiểu number; nguồn là bản ghi bị server từ chối khi đồng bộ lại.
  Chức năng và logic: Chỉ đọc; không tự xoá vì tự xoá là mất dữ liệu im lặng.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng con số và ca bằng 0 hiển thị thế nào; ảnh không cho thấy ca rỗng của field này?
  Thao tác thất bại giữ tối đa bao lâu trước khi buộc người dùng xử lý?

### Item 6.1.7: Hàng field sáu Lý do thất bại

- `itemId`: `img-036`
- bbox: (43; 1420) → (1010; 1449)
- `nameJP`: 失敗理由
- `nameTrans`: Failure reason
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: giữ nguyên mã lỗi gốc 409 hoặc 423 hoặc 422; không quy về lỗi không xác định.
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số sáu; là thứ duy nhất cho người dùng biết phải làm gì tiếp với một thao tác thất bại.
  Thành phần hiển thị: Bốn ô: số 6; nhãn Lý do thất bại; kiểu text; nguồn là mã lỗi cộng thông điệp của phía máy chủ ở lần đồng bộ lại.
  Chức năng và logic: Chỉ đọc; giữ nguyên mã lỗi gốc để phân biệt ba ca có ba cách xử lý khác nhau.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng chuỗi hiển thị là mã lỗi cộng thông điệp hay chỉ thông điệp đã dịch; ảnh chỉ liệt ba mã số?
  Mỗi mã lỗi kèm hành động gợi ý nào cho người dùng; ba mã trong ảnh có ba cách xử lý khác nhau.

### Item 6.1.8: Hàng field bảy Ngày nghiệp vụ lúc nhập

- `itemId`: `img-037`
- bbox: (43; 1449) → (1010; 1496)
- `nameJP`: 登録時の業務日
- `nameTrans`: Business day at capture
- `itemType`: label
- `itemSubtype`: hàng field dẫn xuất chỉ đọc
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Giá trị dẫn xuất số bảy; là chỗ trả lời câu hỏi thao tác thuộc ngày nghiệp vụ nào khi nhập và đồng bộ rơi vào hai ngày khác nhau.
  Thành phần hiển thị: Bốn ô: số 7; nhãn Ngày nghiệp vụ lúc nhập; kiểu date; nguồn là ngày nghiệp vụ JST tại thời điểm xếp vào hàng đợi.
  Chức năng và logic: Chỉ đọc; phía máy chủ so lại với ngày nghiệp vụ hiện tại và trạng thái lock của ngày đó khi đồng bộ.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: CHƯA TỒN TẠI: bảng hàng đợi đồng bộ chưa tồn tại ở phía máy chủ; mọi giá trị của thành phần đọc từ hàng đợi cục bộ trên thiết bị.
- `qa`:
  Định dạng ngày hiển thị là gì; ảnh chỉ cho thấy chỗ trống dạng năm tháng ngày?
  Thiết bị đang mất kết nối thì lấy ngày nghiệp vụ ở đâu; giá trị lưu lại lúc còn mạng hay tính từ giờ của máy?

### Item 7: Khối trạng thái màn

- `itemId`: `img-038`
- bbox: (26; 1525) → (1026; 1814)
- `nameJP`: —
- `nameTrans`: Screen state block
- `itemType`: others
- `itemSubtype`: khối tám thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Liệt đủ trạng thái của thành phần; kể cả trạng thái không áp dụng để không ai dựng thêm.
  Thành phần hiển thị: Tiêu đề khối Trạng thái; một lưới tám thẻ; mỗi thẻ một tiêu đề và một đoạn mô tả.
  Chức năng và logic: Chỉ đọc.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 7.1: Thẻ trạng thái Rỗng

- `itemId`: `img-039`
- bbox: (42; 1569) → (277; 1696)
- `nameJP`: 空状態
- `nameTrans`: Empty state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Trạng thái mặc định; là trạng thái thành phần ở phần lớn thời gian.
  Thành phần hiển thị: Thẻ tiêu đề Rỗng mặc định; nội dung nói đang online và hàng đợi rỗng thì ẩn hoàn toàn hoặc một dấu hiệu tối giản.
  Chức năng và logic: Không có hành động.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Ẩn hoàn toàn hay giữ một dấu hiệu tối giản; ảnh để mở cả hai lựa chọn.

### Item 7.2: Thẻ trạng thái Đang tải

- `itemId`: `img-040`
- bbox: (286; 1569) → (522; 1696)
- `nameJP`: 読み込み中
- `nameTrans`: Loading state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Khoảng thời gian giữa lúc mở màn và lúc biết được trạng thái kết nối thật.
  Thành phần hiển thị: Thẻ tiêu đề Đang tải; nội dung nói đang đọc hàng đợi cục bộ khi khởi động và chỉ báo trung tính không báo online sớm.
  Chức năng và logic: Không có hành động. Ràng buộc là không được báo online trước khi biết chắc.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Bao lâu không đọc xong hàng đợi thì chuyển sang trạng thái lỗi tải?

### Item 7.3: Thẻ trạng thái Lỗi tải

- `itemId`: `img-041`
- bbox: (531; 1569) → (766; 1696)
- `nameJP`: 読み込みエラー
- `nameTrans`: Load error state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: Điều kiện: không đọc được hàng đợi cục bộ thì chế độ suy giảm không khả dụng và phải chặn ghi.
- `description`:
  Mục đích và ngữ cảnh: Ca chế độ suy giảm im lặng không hoạt động; là ca nguy hiểm nhất vì người dùng vẫn nhập.
  Thành phần hiển thị: Thẻ tiêu đề Lỗi tải; nội dung nói không đọc được hàng đợi vì bộ nhớ cục bộ bị chặn hoặc đầy; cảnh báo chế độ suy giảm không khả dụng; và chặn ghi thay vì để người dùng nhập vào chỗ không lưu được.
  Chức năng và logic: Chặn ghi là hành động của trạng thái này; không phải một tuỳ chọn.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Chặn ghi ở mức nào; vô hiệu nút ghi của màn nền hay chỉ cảnh báo trước khi gửi?

### Item 7.4: Thẻ trạng thái Không có quyền

- `itemId`: `img-042`
- bbox: (775; 1569) → (1010; 1696)
- `nameJP`: 権限なし
- `nameTrans`: No permission state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Khai một trạng thái không áp dụng để không ai dựng 404 riêng cho thành phần.
  Thành phần hiển thị: Thẻ tiêu đề Không có quyền; nội dung nói không áp dụng vì thành phần không có route riêng và màn chứa nó giữ nguyên cơ chế 404 của mình.
  Chức năng và logic: Không có hành động; là một ràng buộc thiết kế.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 7.5: Thẻ trạng thái Mất kết nối

- `itemId`: `img-043`
- bbox: (42; 1705) → (277; 1798)
- `nameJP`: 接続断
- `nameTrans`: Offline state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Trạng thái kích hoạt cả hai lớp của thành phần.
  Thành phần hiển thị: Thẻ tiêu đề Mất kết nối; nội dung nói ping server thất bại thì hiện thẻ chỉ báo cộng banner trên màn có ghi dữ liệu.
  Chức năng và logic: Điều kiện vào trạng thái là ping thất bại; không phải cờ online của trình duyệt.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: —

### Item 7.6: Thẻ trạng thái Đang đồng bộ lại

- `itemId`: `img-044`
- bbox: (286; 1705) → (522; 1798)
- `nameJP`: 再同期中
- `nameTrans`: Resyncing state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Là trạng thái nghiệm thu của nửa sau yêu cầu.
  Thành phần hiển thị: Thẻ tiêu đề Đang đồng bộ lại; nội dung nói đang gửi lại hàng đợi với badge Đang đồng bộ kèm tiến độ.
  Chức năng và logic: Vào trạng thái này khi người dùng bấm Đồng bộ lại; cơ chế tự động chưa được ảnh khai.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Người dùng có huỷ được giữa lúc đang đồng bộ lại không?

### Item 7.7: Thẻ trạng thái Đồng bộ thất bại

- `itemId`: `img-045`
- bbox: (531; 1705) → (766; 1798)
- `nameJP`: 同期失敗
- `nameTrans`: Sync failed state card
- `itemType`: label
- `itemSubtype`: thẻ trạng thái
- `buttonType`: —
- `dataType`: —
- `required`: —
- `format`: —
- `minLength`: —
- `maxLength`: —
- `defaultValue`: —
- `validationNote`: —
- `description`:
  Mục đích và ngữ cảnh: Ca thao tác đã nhập nhưng không vào được hệ; cần người xử lý.
  Thành phần hiển thị: Thẻ tiêu đề Đồng bộ thất bại; nội dung nói replay bị server từ chối thì hiện badge cộng danh sách thao tác thất bại; ba hành động là xem lý do; nhập lại tay; bỏ thao tác.
  Chức năng và logic: Ba hành động của thẻ là ba đường ra duy nhất; không có đường tự giải quyết.
- `userAction`: —
- `transitionNote`: —
- `databaseTable`: —
- `databaseColumn`: —
- `databaseNote`: —
- `qa`: Bỏ một thao tác thất bại có bắt buộc nhập lý do không; và có bước xác nhận thứ hai không?
