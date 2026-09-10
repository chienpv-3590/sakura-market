# Items Analysis - Cấu hình thông báo

- Nguồn: `.momorph/shots/SC-29-cau-hinh-thong-bao.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-29-cau-hinh-thong-bao-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2262 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 45
- Batch: part 2 / 3

### Item 3.10: Vùng văn bản Lý do thay đổi

- itemId: img-016
- parentNo: 3
- bbox: (42, 722) - (1010, 817)
- nameJP: 変更理由
- nameTrans: Change reason
- itemType: textarea
- itemSubtype: vùng văn bản bắt buộc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: 1000
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng phiên bản cấu hình thông báo; khuôn phiên bản hoá đã có sẵn ở nhóm biểu suất và dùng lại được, nhưng bảng cho thông báo thì chưa có.
- validationNote:
  - Điều kiện: không rỗng sau khi cắt khoảng trắng hai đầu.
  - Lỗi: "Hãy ghi lý do thay đổi cấu hình."
- description:
  - Mục đích và ngữ cảnh: Giữ lại vì sao cấu hình đổi, để phiên bản cũ và mới đọc được như một chuỗi quyết định chứ không phải một loạt giá trị rời.
  - Thành phần hiển thị: Nhãn Lý do thay đổi kèm dấu sao bắt buộc; vùng văn bản nhiều dòng với dòng gợi ý Ghi vào lịch sử cấu hình; dòng nhắc ghi field số 10 với ràng buộc không rỗng sau khi cắt khoảng trắng và rỗng thì không ghi thay đổi.
  - Chức năng và logic: Lý do được ghi vào dòng phiên bản mới, không ghi vào dòng cấu hình đang áp dụng.
- qa:
  - Yêu cầu khách không đòi lý do thay đổi; giữ nó là bắt buộc hay để tuỳ chọn?
  - Độ dài tối đa của lý do là bao nhiêu; ảnh không cho thấy giới hạn nào.
  - Định dạng nội dung có cần theo mẫu nào không; hay là văn bản tự do?

### Item 3.11: Nút Lưu thành phiên bản mới

- itemId: img-017
- parentNo: 3
- bbox: (42, 830) - (198, 859)
- nameJP: 新しいバージョンとして保存
- nameTrans: Save as new version
- itemType: button
- itemSubtype: nút hành động chính cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Sinh một phiên bản cấu hình mới và đặt nó thành phiên bản đang áp dụng; ở lại cùng màn rồi nạp lại bảng phiên bản.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng phiên bản cấu hình thông báo; khuôn phiên bản hoá đã có sẵn ở nhóm biểu suất và dùng lại được, nhưng bảng cho thông báo thì chưa có.
- validationNote:
  - Điều kiện: mọi field bắt buộc phải hợp lệ.
  - Lỗi: hiện lỗi tại đúng field và giữ nguyên giá trị đang nhập.
  - Điều kiện: phiên bản đang áp dụng không được đổi giữa lúc mở form và lúc lưu.
  - Lỗi: "Cấu hình đã đổi ở nơi khác; hãy tải lại." khi so sánh phiên bản thất bại.
- description:
  - Mục đích và ngữ cảnh: Đường ghi duy nhất của màn, và là chỗ thực thi ràng buộc kiến trúc của FR-NOTIFY-03.
  - Thành phần hiển thị: Nút chữ Lưu thành phiên bản mới ở đầu hàng nút cuối khối; kiểu nút hành động chính.
  - Chức năng và logic: Sinh phiên bản mới chứ không ghi đè phiên bản cũ; lịch sử gửi trong quá khứ không bị đổi. Cấu hình mới chỉ áp cho lần gửi sau.
- qa:
  - Phiên bản mới có ngày hiệu lực trong tương lai được không; hay áp dụng ngay khi lưu?
  - Có cần cơ chế tách người lập và người phê duyệt cho cấu hình thông báo không?
  - Hai quản trị lưu cùng lúc thì bên nào thắng và bên kia nhận thông báo gì?

### Item 3.12: Nút Gửi thử

- itemId: img-018
- parentNo: 3
- bbox: (201, 830) - (267, 859)
- nameJP: テスト送信
- nameTrans: Send test button
- itemType: button
- itemSubtype: nút phụ cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Gửi một thông báo thử theo cấu hình đang nhập; kết quả hiện ngay trong màn.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: lịch sử gửi phụ thuộc bảng log gửi của SC-28, hiện chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho quản trị kiểm cấu hình có tới được người nhận thật hay không, trước khi tin vào nó.
  - Thành phần hiển thị: Nút chữ Gửi thử cạnh nút lưu; kiểu nút phụ.
  - Chức năng và logic: Không sinh phiên bản mới và không đổi cấu hình đang áp dụng. Cần khai rõ lượt gửi thử có vào lịch sử gửi hay không.
- qa:
  - Gửi thử có ghi vào lịch sử gửi hay là một đường riêng không lưu vết?
  - Gửi thử gửi cho toàn bộ người nhận đã cấu hình hay chỉ cho chính quản trị đang bấm?
  - Gửi thử có bị chặn khi kênh email chưa khả dụng không?

### Item 3.13: Nút Xem lịch sử cấu hình

- itemId: img-019
- parentNo: 3
- bbox: (271, 830) - (403, 859)
- nameJP: 設定履歴を見る
- nameTrans: View config history button
- itemType: button
- itemSubtype: nút phụ cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở bảng phiên bản cấu hình của loại event đang xem.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng phiên bản cấu hình thông báo; khuôn phiên bản hoá đã có sẵn ở nhóm biểu suất và dùng lại được, nhưng bảng cho thông báo thì chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường đi từ form sang chuỗi phiên bản, để quản trị thấy cấu hình đã đổi qua những giá trị nào.
  - Thành phần hiển thị: Nút chữ Xem lịch sử cấu hình ở cuối hàng nút; kiểu nút phụ.
  - Chức năng và logic: Chỉ đọc; không có nút sửa hay xoá ở bảng phiên bản.
- qa:
  - Lịch sử cấu hình có giới hạn số phiên bản hiển thị không?
  - Có cần đường quay lại một phiên bản cũ không; hay chỉ tạo phiên bản mới với giá trị cũ?

### Item 4: Khối cấu hình áp cho tương lai và lịch sử gửi bất biến

- itemId: img-020
- parentNo: -
- bbox: (26, 888) - (1026, 1260)
- nameJP: -
- nameTrans: Future-config and immutable-history block
- itemType: others
- itemSubtype: khối hai bảng đặt cạnh nhau kèm ghi chú
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
  - Mục đích và ngữ cảnh: Vẽ rõ đường phân tách mà điều kiện nghiệm thu của FR-NOTIFY-03 đòi: cấu hình đổi được, lịch sử gửi thì không.
  - Thành phần hiển thị: Tiêu đề khối dẫn điều kiện nghiệm thu; hai bảng đặt cạnh nhau là bảng phiên bản cấu hình bên trái và bảng lịch sử gửi bên phải, mỗi bảng có ghi chú riêng; một đoạn ghi chú chung cuối khối.
  - Chức năng và logic: Đây là chỗ nghiệm thu đọc thẳng: đổi cấu hình rồi mở lại lịch sử gửi cũ thì phải thấy đúng cấu hình lúc gửi.
- qa: -

### Item 4.1: Bảng phiên bản cấu hình

- itemId: img-021
- parentNo: 4
- bbox: (58, 977) - (505, 1132)
- nameJP: 設定バージョン一覧
- nameTrans: Config version table
- itemType: table
- itemSubtype: bảng sáu cột
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
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng phiên bản cấu hình thông báo; khuôn phiên bản hoá đã có sẵn ở nhóm biểu suất và dùng lại được, nhưng bảng cho thông báo thì chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho thấy cấu hình là một chuỗi phiên bản, mỗi phiên bản có ngày hiệu lực và lý do riêng.
  - Thành phần hiển thị: Sáu cột: version · hiệu lực từ · người nhận · ngưỡng · thời điểm gửi · lý do; hai hàng dữ liệu mẫu trong đó hàng đầu mang thẻ đang áp dụng.
  - Chức năng và logic: Sắp xếp theo version giảm dần. Sửa cấu hình là sinh phiên bản mới nên bảng chỉ tăng; không có nút sửa hay xoá.
- qa:
  - Bảng hiển thị bao nhiêu phiên bản gần nhất; hay toàn bộ?
  - Một phiên bản có ngày hiệu lực tương lai thì hiện nhãn gì để phân biệt với phiên bản đang áp dụng?

### Item 4.1.1: Hàng tiêu đề bảng phiên bản cấu hình

- itemId: img-022
- parentNo: 4.1
- bbox: (59, 978) - (504, 1022)
- nameJP: -
- nameTrans: Config version header row
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
  - Mục đích và ngữ cảnh: Đặt tên sáu cột của bảng phiên bản cấu hình.
  - Thành phần hiển thị: Một hàng nền xám nhạt với sáu nhãn: Version · Hiệu lực từ · Người nhận · Ngưỡng · Thời điểm gửi · Lý do.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 4.1.2: Hàng phiên bản đang áp dụng — đại diện

- itemId: img-023
- parentNo: 4.1
- bbox: (59, 1022) - (504, 1085)
- nameJP: -
- nameTrans: Active config version row (representative)
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng phiên bản cấu hình thông báo; khuôn phiên bản hoá đã có sẵn ở nhóm biểu suất và dùng lại được, nhưng bảng cho thông báo thì chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Một hàng là một phiên bản cấu hình; hai hàng mẫu có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Sáu ô: số version kèm thẻ đang áp dụng · ngày hiệu lực dạng YYYY-MM-DD · người nhận theo vai trò hoặc theo người · ngưỡng kèm đơn vị · thời điểm gửi dạng hh:mm · lý do thay đổi.
  - Chức năng và logic: Chỉ đọc. Đúng một phiên bản mang thẻ đang áp dụng ở mỗi thời điểm; các hàng còn lại là phiên bản đã bị thay.
- qa:
  - Chỉ một phiên bản được mang thẻ đang áp dụng; nếu có phiên bản hiệu lực tương lai thì thẻ đó thuộc phiên bản nào?
  - Ô người nhận hiện đầy đủ danh sách hay chỉ hiện số lượng khi danh sách dài?

### Item 4.2: Ghi chú sinh phiên bản mới

- itemId: img-024
- parentNo: 4
- bbox: (58, 1135) - (505, 1169)
- nameJP: -
- nameTrans: New-version note
- itemType: label
- itemSubtype: đoạn nhắc dưới bảng
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
  - Mục đích và ngữ cảnh: Chốt cách thi hành của bảng phiên bản, và chỉ ra khuôn đã có sẵn để dùng lại.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: sửa cấu hình là sinh phiên bản mới chứ không ghi đè phiên bản cũ; cùng khuôn phiên bản biểu suất đã dựng cho hai màn quản lý biểu suất.
  - Chức năng và logic: Tĩnh; là ràng buộc thi hành, không phải gợi ý.
- qa: -

### Item 4.3: Bảng lịch sử gửi bất biến

- itemId: img-025
- parentNo: 4
- bbox: (548, 977) - (994, 1115)
- nameJP: 送信履歴（不変）
- nameTrans: Immutable delivery history table
- itemType: table
- itemSubtype: bảng năm cột chỉ đọc
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
- databaseNote: CHƯA TỒN TẠI: lịch sử gửi phụ thuộc bảng log gửi của SC-28, hiện chưa có. Cột version đã dùng nối về bảng phiên bản cấu hình, cũng chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Bằng chứng cho điều kiện nghiệm thu của FR-NOTIFY-03: lịch sử gửi không đổi khi cấu hình đổi.
  - Thành phần hiển thị: Năm cột: thời điểm gửi · kênh · người nhận lúc đó · kết quả · version đã dùng; hai hàng dữ liệu mẫu cho hai kênh, cùng trỏ về một version cũ.
  - Chức năng và logic: Chỉ đọc; không có nút sửa hay xoá ở bất kỳ đâu. Cột version đã dùng là chỗ nối dòng lịch sử về đúng cấu hình lúc gửi.
- qa:
  - Lịch sử gửi giữ trong bao lâu; yêu cầu khách đòi đổi cấu hình không làm mất lịch sử nhưng không cho thời hạn?
  - Bảng này lọc theo loại event đang xem hay hiện toàn bộ?

### Item 4.3.1: Hàng tiêu đề bảng lịch sử gửi

- itemId: img-026
- parentNo: 4.3
- bbox: (548, 978) - (994, 1022)
- nameJP: -
- nameTrans: Delivery history header row
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
  - Mục đích và ngữ cảnh: Đặt tên năm cột của bảng lịch sử gửi.
  - Thành phần hiển thị: Một hàng nền xám nhạt với năm nhãn: Thời điểm gửi · Kênh · Người nhận lúc đó · Kết quả · Version đã dùng.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 4.3.2: Hàng lịch sử gửi — đại diện

- itemId: img-027
- parentNo: 4.3
- bbox: (548, 1022) - (994, 1068)
- nameJP: -
- nameTrans: Delivery history row (representative)
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
- databaseNote: CHƯA TỒN TẠI: lịch sử gửi phụ thuộc bảng log gửi của SC-28, hiện chưa có.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Một hàng là một lượt gửi đã xảy ra; hai hàng mẫu có cùng cấu trúc nên gộp thành một đại diện.
  - Thành phần hiển thị: Năm ô: thời điểm gửi dạng YYYY-MM-DD hh:mm · kênh email hoặc in_app · người nhận theo phiên bản đã dùng · thẻ kết quả thành công hoặc thất bại kèm số lần thử · số version đã dùng.
  - Chức năng và logic: Ô người nhận giữ nguyên giá trị của phiên bản đã dùng, kể cả sau khi phiên bản mới thay phiên bản đó.
- qa:
  - Kết quả thất bại hiện kèm số lần thử trên trần ba lần; định dạng đó có cần thêm trạng thái cuối cùng không?
  - Một lượt gửi cho nhiều người nhận thì bảng liệt từng người hay gộp một hàng?

### Item 4.4: Ghi chú lịch sử giữ nguyên giá trị của phiên bản đã dùng

- itemId: img-028
- parentNo: 4
- bbox: (548, 1118) - (994, 1151)
- nameJP: -
- nameTrans: History immutability note
- itemType: label
- itemSubtype: đoạn nhắc dưới bảng
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
  - Mục đích và ngữ cảnh: Chốt bất biến của bảng lịch sử gửi, là điều mà điều kiện nghiệm thu đọc trực tiếp.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: dòng lịch sử giữ nguyên người nhận và ngưỡng của phiên bản đã dùng kể cả sau khi phiên bản mới thay phiên bản cũ; chỉ đọc và không có nút sửa hay xoá ở bất kỳ đâu.
  - Chức năng và logic: Tĩnh; là ràng buộc bất biến, không phải mô tả giao diện.
- qa: -

### Item 4.5: Ghi chú nghiệm thu và hai đường thi hành

- itemId: img-029
- parentNo: 4
- bbox: (42, 1198) - (1010, 1233)
- nameJP: -
- nameTrans: Acceptance and implementation note
- itemType: label
- itemSubtype: đoạn nhắc cuối khối
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
  - Mục đích và ngữ cảnh: Nói rõ cách nghiệm thu đọc điều kiện, và khoanh phần thuộc quyết định kiến trúc chứ không thuộc màn.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: nghiệm thu FR-NOTIFY-03 đọc thẳng là đổi cấu hình rồi mở lại lịch sử gửi cũ phải thấy đúng cấu hình lúc gửi; hai đường thi hành đều đạt là trỏ về mã phiên bản hoặc chụp cấu hình vào chính dòng log theo cùng khuôn bản chụp dòng của batch kế toán; chốt ở quyết định kiến trúc; cái không đạt là sửa tại chỗ một dòng cấu hình duy nhất.
  - Chức năng và logic: Tĩnh. Câu quan trọng nhất là câu cuối: một dòng cấu hình sửa tại chỗ thì không bao giờ thoả điều kiện nghiệm thu.
- qa: -

### Item 5: Khối trạng thái màn

- itemId: img-030
- parentNo: -
- bbox: (26, 1273) - (1026, 1612)
- nameJP: -
- nameTrans: Screen state block
- itemType: others
- itemSubtype: khối chín thẻ trạng thái
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
  - Mục đích và ngữ cảnh: Liệt kê mọi trạng thái màn phải xử lý, trong đó hai trạng thái là cảnh báo về sự thật phũ phàng của hạ tầng.
  - Thành phần hiển thị: Tiêu đề khối; chín thẻ xếp thành ba hàng, mỗi thẻ có một tiêu đề nhỏ và một đoạn mô tả.
  - Chức năng và logic: Chỉ đọc; là tài liệu thiết kế chứ không phải thành phần chạy trên màn.
- qa: -

