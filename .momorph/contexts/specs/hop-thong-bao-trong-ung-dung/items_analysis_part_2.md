# Items Analysis - Hộp thông báo trong ứng dụng

- Nguồn: `.momorph/shots/SC-28-hop-thong-bao-trong-ung-dung.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-28-hop-thong-bao-trong-ung-dung-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2245 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 44
- Batch: part 2 / 3

### Item 3.3: Nút Đánh dấu tất cả đã đọc

- itemId: img-016
- parentNo: 3
- bbox: (42, 541) - (188, 570)
- nameJP: すべて既読にする
- nameTrans: Mark all as read button
- itemType: button
- itemSubtype: nút hành động chính dưới khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Ghi trạng thái đã đọc cho mọi thông báo đang thuộc người dùng; danh sách nạp lại sau khi ghi xong.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng dọn cả hộp thư sau một đợt vắng mặt.
  - Thành phần hiển thị: Nút chữ Đánh dấu tất cả đã đọc đặt dưới bảng, kiểu nút hành động chính.
  - Chức năng và logic: Chỉ ghi trạng thái đã đọc; không xoá thông báo và không đổi kết quả gửi. Không tác động tới thông báo của người khác.
- qa:
  - Đánh dấu tất cả đã đọc áp cho toàn bộ hộp thư hay chỉ cho các dòng đang khớp bộ lọc?
  - Có cần bước xác nhận trước khi áp cho toàn bộ không?

### Item 4: Khối log gửi một thông báo

- itemId: img-017
- parentNo: -
- bbox: (26, 599) - (1026, 903)
- nameJP: -
- nameTrans: Delivery log block
- itemType: others
- itemSubtype: khối bảng sáu cột kèm ghi chú và hai ô chỉ đọc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nơi thoả điều kiện nghiệm thu của FR-NOTIFY-01 và FE-039: bốn thứ về lượt gửi cộng mốc năm phút phải xem được từ màn.
  - Thành phần hiển thị: Tiêu đề khối; bảng sáu cột với hai hàng cho hai kênh; đoạn ghi chú về ranh giới kênh và trần retry; một hàng hai ô chỉ đọc là hạn gửi và queue cảnh báo vận hành.
  - Chức năng và logic: Toàn khối chỉ đọc; không có ô nào cho người dùng đặt lại kết quả gửi.
- qa: -

### Item 4.1: Bảng log gửi

- itemId: img-018
- parentNo: 4
- bbox: (42, 644) - (1010, 733)
- nameJP: 送信ログ
- nameTrans: Delivery log table
- itemType: table
- itemSubtype: bảng sáu cột chỉ đọc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Trình bày từng lượt gửi theo kênh, đủ để trả lời câu hỏi thông báo này đã tới ai và kết quả ra sao.
  - Thành phần hiển thị: Sáu cột: kênh · người nhận · kết quả · số lần thử · lần thử cuối · trạng thái cuối cùng; hai hàng cho hai kênh của cùng một thông báo.
  - Chức năng và logic: Bốn cột đầu là nguyên văn điều kiện nghiệm thu của FR-NOTIFY-01. Chỉ hai giá trị kênh nên bảng không được để chỗ cho kênh thứ ba.
- qa:
  - Mỗi lần thử là một hàng riêng hay một hàng cho mỗi kênh kèm bộ đếm?
  - Thông báo gửi cho nhiều người nhận thì bảng này liệt từng người hay gộp?

### Item 4.1.1: Hàng tiêu đề bảng log gửi

- itemId: img-019
- parentNo: 4.1
- bbox: (43, 644) - (1010, 672)
- nameJP: -
- nameTrans: Delivery log header row
- itemType: label
- itemSubtype: hàng tiêu đề bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đặt tên sáu cột của bảng log gửi.
  - Thành phần hiển thị: Một hàng nền xám nhạt với sáu nhãn: Kênh · Người nhận · Kết quả · Số lần thử · Lần thử cuối · Trạng thái cuối cùng.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 4.1.2: Hàng log gửi kênh trong ứng dụng

- itemId: img-020
- parentNo: 4.1
- bbox: (43, 672) - (1010, 702)
- nameJP: -
- nameTrans: In-app delivery row
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: YYYY-MM-DD hh:mm
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca kênh trong ứng dụng: gửi được ngay lần thử đầu nên trạng thái cuối cùng là đã gửi.
  - Thành phần hiển thị: Sáu ô: kênh in_app · người nhận Người tham gia A · thẻ kết quả thành công · số lần thử một trên ba · lần thử cuối dạng YYYY-MM-DD hh:mm · trạng thái cuối cùng đã gửi.
  - Chức năng và logic: Kênh trong ứng dụng coi là gửi xong khi dòng thông báo đã tồn tại và người nhận đọc được nó.
- qa:
  - Kênh trong ứng dụng có bao giờ thất bại không; nếu có thì điều kiện nào tính là thất bại?
  - Người nhận hiện tên hiển thị hay mã; và có bao giờ hiện thư điện tử không?

### Item 4.1.3: Hàng log gửi kênh email thất bại hết trần retry

- itemId: img-021
- parentNo: 4.1
- bbox: (43, 702) - (1010, 733)
- nameJP: -
- nameTrans: Email delivery row exhausted
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca xấu nhất mà yêu cầu khách gọi tên: hết trần ba lần thử vẫn thất bại nên phải chốt trạng thái cuối cùng.
  - Thành phần hiển thị: Sáu ô: kênh email · người nhận Người tham gia A · thẻ kết quả thất bại · số lần thử ba trên ba · lần thử cuối · trạng thái cuối cùng là thẻ đã vào queue cảnh báo vận hành.
  - Chức năng và logic: Hết ba lần thử là chốt và không retry tiếp. Trạng thái cuối cùng ở đây là một giá trị riêng, khác với kết quả thất bại của một lượt thử.
- qa:
  - Khoảng cách giữa các lần thử là bao nhiêu; yêu cầu khách chỉ cho trần ba lần chứ không cho khoảng cách?
  - Trạng thái cuối cùng có tập giá trị nào; đã gửi và đã vào queue cảnh báo vận hành có phải là hai giá trị duy nhất?

### Item 4.2: Ghi chú ranh giới kênh và trần retry

- itemId: img-022
- parentNo: 4
- bbox: (42, 736) - (1010, 771)
- nameJP: -
- nameTrans: Channel boundary note
- itemType: label
- itemSubtype: đoạn nhắc dưới khối
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Khai ranh giới phạm vi của nhóm chức năng thông báo, để giao diện không mở cửa cho kênh ngoài phạm vi.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: bốn cột đầu là nguyên văn nghiệm thu FR-NOTIFY-01; chỉ hai giá trị kênh in_app và email; không có SMS và không có FAX vì FN-12 khai ngoài phạm vi nên giao diện không được để chỗ cho chúng; trần ba lần thử theo BR-NOTIFY-01 và hết ba lần là chốt trạng thái cuối cùng rồi chuyển sang queue cảnh báo vận hành.
  - Chức năng và logic: Tĩnh; đây là ràng buộc phạm vi, không phải gợi ý.
- qa: -

### Item 4.3: Ô Hạn gửi chỉ cho thông báo Critical

- itemId: img-023
- parentNo: 4
- bbox: (42, 781) - (521, 877)
- nameJP: 送信期限（Critical のみ）
- nameTrans: Critical delivery deadline
- itemType: label
- itemSubtype: ô chỉ đọc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó. Mốc năm phút suy ra từ thời điểm sinh event và thời điểm gửi xong nên cần cả hai cột thời gian đó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Chỗ duy nhất trên màn cho thấy mốc năm phút của FR-NOTIFY-02 đã đạt hay chưa; là dữ liệu nghiệm thu của FE-039.
  - Thành phần hiển thị: Nhãn Hạn gửi chỉ thông báo Critical; ô chỉ đọc nền xám ghi thời điểm sinh event, hạn bằng thời điểm đó cộng năm phút, và một thẻ trong hạn; dòng nhắc nói rõ mốc năm phút tính từ thời điểm sinh event chứ không từ lần thử đầu.
  - Chức năng và logic: Chỉ hiện cho thông báo mức critical. Là giá trị suy ra từ thời điểm sinh event và thời điểm gửi xong, không có ô nhập.
- qa:
  - Quá hạn năm phút có tính vào cảnh báo vận hành ngay dù retry còn dở không?
  - Thông báo mức thường có hạn gửi nào không; nếu không thì ô này ẩn hay hiện dấu gạch?
  - Định dạng hiển thị hạn là giờ phút hay đếm ngược; ảnh chỉ cho thấy dạng hh:mm.

### Item 4.4: Ô Queue cảnh báo vận hành

- itemId: img-024
- parentNo: 4
- bbox: (532, 781) - (1010, 877)
- nameJP: 運用アラートキュー
- nameTrans: Ops alert queue
- itemType: label
- itemSubtype: ô chỉ đọc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho vai trò quản trị hệ thống thấy tồn đọng của các thông báo đã hết trần retry mà vẫn chưa tới người nhận.
  - Thành phần hiển thị: Nhãn Queue cảnh báo vận hành; ô chỉ đọc nền xám ghi số thông báo thất bại sau retry; dòng nhắc nói rõ chỉ ROLE-SYS-ADMIN thấy và đây là đầu vào của NFR-OPS-01 cùng FE-046.
  - Chức năng và logic: Chỉ đọc; là bộ đếm suy ra từ log gửi. Vai trò khác ROLE-SYS-ADMIN không thấy ô này.
- qa:
  - Bộ đếm này đếm trong khoảng thời gian nào; toàn bộ lịch sử hay chỉ chưa xử lý?
  - Bấm vào ô có mở danh sách chi tiết không; hay chỉ là con số?
  - Ai được đóng một mục trong queue và thao tác đó có cần ghi lý do?

### Item 5: Khối bộ lọc hộp thư

- itemId: img-025
- parentNo: -
- bbox: (26, 916) - (1026, 1066)
- nameJP: -
- nameTrans: Inbox filter block
- itemType: others
- itemSubtype: khối hai điều kiện lọc
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng thu hẹp hộp thư khi số thông báo lớn.
  - Thành phần hiển thị: Tiêu đề khối nêu phạm vi field số 9 tới số 10; một hàng hai điều kiện là hộp kiểm chỉ chưa đọc và ô chọn lọc theo mức độ.
  - Chức năng và logic: Hai điều kiện chỉ tác động phía giao diện; không đổi dữ liệu.
- qa: -

### Item 5.1: Hộp kiểm Chỉ chưa đọc

- itemId: img-026
- parentNo: 5
- bbox: (42, 960) - (521, 1040)
- nameJP: 未読のみ
- nameTrans: Unread only checkbox
- itemType: checkbox
- itemSubtype: hộp kiểm kèm nhãn và dòng nhắc
- buttonType: -
- dataType: boolean
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: false
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường nhanh nhất để người dùng chỉ nhìn việc còn phải làm.
  - Thành phần hiển thị: Nhãn Chỉ chưa đọc; hộp kiểm chưa chọn kèm chữ Chỉ hiện thông báo chưa đọc; dòng nhắc ghi field số 9 và chỉ tác động giao diện.
  - Chức năng và logic: Không chọn là mặc định nên hộp thư mở ra hiện cả đã đọc và chưa đọc.
- qa:
  - Bật hộp kiểm này có được nhớ lại cho lần vào màn sau không?
  - Định dạng giá trị gửi lên khi bật là gì; ảnh không cho thấy nên cần chốt cùng hợp đồng đọc danh sách.

### Item 5.2: Ô chọn Lọc theo mức độ

- itemId: img-027
- parentNo: 5
- bbox: (532, 960) - (1010, 1040)
- nameJP: 重要度フィルタ
- nameTrans: Severity filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng tách riêng nhóm Critical khi cần xử lý gấp.
  - Thành phần hiển thị: Nhãn Lọc theo mức độ; ô chọn hiện Tất cả kèm mũi chỉ xuống; dòng nhắc ghi field số 10 với ba giá trị tất cả và critical và thường, và nói rõ giá trị lạ thì bỏ qua bộ lọc.
  - Chức năng và logic: Giá trị lạ không làm lỗi mà bị bỏ qua; đây là quyết định có chủ đích để bộ lọc không chặn người dùng.
- qa:
  - Định dạng giá trị gửi lên là chuỗi hiển thị hay mã cố định; ảnh chỉ cho thấy nhãn tiếng Việt.
  - Bỏ qua giá trị lạ thì có hiện lời nhắc cho người dùng biết bộ lọc không được áp không?

### Item 6: Khối trạng thái màn

- itemId: img-028
- parentNo: -
- bbox: (26, 1079) - (1026, 1418)
- nameJP: -
- nameTrans: Screen state block
- itemType: others
- itemSubtype: khối mười thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Liệt kê mọi trạng thái màn phải xử lý, trong đó có bốn trạng thái riêng của việc gửi kênh ngoài.
  - Thành phần hiển thị: Tiêu đề khối; mười thẻ xếp thành ba hàng, mỗi thẻ có một tiêu đề nhỏ và một đoạn mô tả.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

### Item 6.1: Thẻ trạng thái Rỗng

- itemId: img-029
- parentNo: 6
- bbox: (42, 1123) - (277, 1198)
- nameJP: -
- nameTrans: State card empty
- itemType: label
- itemSubtype: thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Hộp rỗng là trạng thái hợp lệ, không phải lỗi cấu hình.
  - Thành phần hiển thị: Thẻ có tiêu đề Rỗng và câu hiển thị Không có thông báo.
  - Chức năng và logic: Người dùng mới hoặc người dùng đã dọn hết hộp thư đều gặp trạng thái này.
- qa: -

### Item 6.2: Thẻ trạng thái Đang tải

- itemId: img-030
- parentNo: 6
- bbox: (286, 1123) - (522, 1198)
- nameJP: -
- nameTrans: State card loading
- itemType: label
- itemSubtype: thẻ trạng thái
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng biết hộp thư đang được nạp.
  - Thành phần hiển thị: Thẻ có tiêu đề Đang tải và mô tả skeleton danh sách.
  - Chức năng và logic: Bộ lọc và các nút hành động bị vô hiệu trong lúc nạp.
- qa: -

