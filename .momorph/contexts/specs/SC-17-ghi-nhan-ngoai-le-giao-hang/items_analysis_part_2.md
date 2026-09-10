# Items Analysis - SC-17 · Ghi nhận ngoại lệ giao hàng

## Screen context

- **screen**: SC-17 · Ghi nhận ngoại lệ giao hàng
- **source-family**: image
- **source-token**: SC-17-ghi-nhan-ngoai-le-giao-hang
- **source-image**: .momorph/shots/SC-17-ghi-nhan-ngoai-le-giao-hang.png
- **canvas**: 1280 x 2172 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-023 (FN-06) · ưu tiên P1
- **requirement-refs**: FR-DEL-03 (RFP:683) · liên quan FR-DEL-01 (RFP:681) · FR-CORR-02 (RFP:657) · FR-SETTLE-01 · RPT-04 (RFP:747) · TBL-ATTACH-01 · DR-IMAGE-01
- **data-domain**: D-DELIVERY (RFP:733)
- **state-machine**: FIG-014 (RFP:693) luồng ngoại lệ khi giao hàng — ba nhánh
- **actor**: Bộ phận vận chuyển (đề xuất ROLE-DELIVERY)
- **note**: Màn thuần thiết kế: prototype chưa có bảng; route hay đường ghi nào cho ngoại lệ
- **batch**: 2/3 (15 items)

### Item 4.7: Trường ngày nghiệp vụ của ngoại lệ

- **itemId**: img-016
- **itemName**: Trường ngày nghiệp vụ của ngoại lệ
- **nameJP**: 業務日
- **nameTrans**: Business date
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: date
- **required**: true
- **format**: YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 2026-09-09 (JST)
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: quyết định bản ghi ngoại lệ thuộc kỳ nào; đây là trường ảnh hưởng trực tiếp tới số đối chiếu
  Thành phần hiển thị: nhãn hai ngôn ngữ có dấu bắt buộc; một ô chỉ đọc; một chú thích về hệ quả lên bảng đối chiếu
  Chức năng và logic: hệ thống đặt theo ngày nghiệp vụ hiện tại giờ Nhật; không nhận từ dữ liệu người gửi lên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi trường này; prototype CHƯA TỒN TẠI bảng hay cột nào lưu ngoại lệ giao hàng nên để trống.
- **qa**: - Ngoại lệ phát hiện muộn thì thuộc ngày phát hiện hay ngày của lần giao gốc? Hai cách cho hai bảng đối chiếu khác nhau; và nếu là ngày của lần giao gốc thì ngày đó có thể đã bị khoá.
- **position**: startX=368 startY=890 endX=684 endY=1001

### Item 4.8: Trường ảnh và chứng từ bằng chứng

- **itemId**: img-017
- **itemName**: Trường ảnh và chứng từ bằng chứng
- **nameJP**: 証拠画像・書類
- **nameTrans**: Evidence image or document
- **itemType**: file_or_image
- **itemSubtype**: file_upload
- **buttonType**: -
- **dataType**: -
- **required**: false
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Chọn tệp… (không bắt buộc)
- **validationNote**:
  Điều kiện: loại tệp không thuộc danh sách loại được phép
  Lỗi: "Loại tệp không được phép."
  Điều kiện: kích thước tệp vượt hạn mức cho phép
  Lỗi: "Tệp vượt kích thước cho phép."
- **description**:
  Mục đích và ngữ cảnh: giữ bằng chứng của chênh lệch để phía đối chiếu và kiểm toán về sau đọc lại được
  Thành phần hiển thị: nhãn; một ô chọn tệp; một chú thích dẫn chính sách lưu trữ và ranh giới phạm vi
  Chức năng và logic: không bắt buộc; kiểm loại tệp và kích thước ở phía máy chủ; không tự phán định chất lượng hàng từ ảnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi trường này; prototype CHƯA TỒN TẠI bảng hay cột nào lưu ngoại lệ giao hàng nên để trống.
- **qa**:
  - Danh sách loại tệp và hạn mức kích thước cho bằng chứng ngoại lệ là gì; và một ngoại lệ đính kèm được bao nhiêu tệp? Nguồn thiết kế nói chính sách lưu trữ nhưng không cho con số nào cho lần tải lên.
  - Định dạng tệp bằng chứng còn thiếu: những loại tệp nào được nhận; và có yêu cầu độ phân giải tối thiểu cho ảnh hiện trường không?
- **position**: startX=695 startY=890 endX=1010 endY=1001

### Item 4.9: Nút ghi ngoại lệ

- **itemId**: img-018
- **itemName**: Nút ghi ngoại lệ
- **nameJP**: 例外記録ボタン
- **nameTrans**: Record exception button
- **itemType**: button
- **itemSubtype**: -
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: thao tác duy nhất sinh ra dữ liệu ngoại lệ trong toàn hệ thống
  Thành phần hiển thị: một nút chữ
  Chức năng và logic: vô hiệu khi đang gửi; ghi bản ghi ngoại lệ trước rồi mới chuyển trạng thái giao hàng để không mất bằng chứng nếu bước sau thất bại
- **userAction**: on_click
- **transitionNote**: Ở lại màn; thêm một dòng vào bảng ngoại lệ đã ghi; chuyển trạng thái giao hàng sang ngoại lệ; khoá đường chốt hoàn tất ở SC-16
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi đường ghi này; prototype CHƯA TỒN TẠI endpoint hay bảng nào ghi được ngoại lệ nên nút chưa có chỗ để gọi tới.
- **qa**: -
- **position**: startX=42 startY=1024 endX=131 endY=1053

### Item 4.10: Ghi chú hậu quả sau khi ghi ngoại lệ

- **itemId**: img-019
- **itemName**: Ghi chú hậu quả sau khi ghi ngoại lệ
- **nameJP**: 記録後注記
- **nameTrans**: Post-record note
- **itemType**: label
- **itemSubtype**: inline_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chốt hai hệ quả của thao tác ghi và giải thích vì sao không có đường sửa
  Thành phần hiển thị: một đoạn chú thích hai dòng dẫn FR-CORR-02
  Chức năng và logic: tĩnh; là ràng buộc thiết kế nối SC-17 với SC-16 và với đường điều chỉnh có kiểm soát
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1056 endX=1010 endY=1089

### Item 5: Khối bảng ngoại lệ đã ghi

- **itemId**: img-020
- **itemName**: Khối bảng ngoại lệ đã ghi
- **nameJP**: 記録済み例外パネル
- **nameTrans**: Recorded exception panel
- **itemType**: others
- **itemSubtype**: list_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho thấy nghiệm thu của FR-DEL-03 đã đạt: có danh sách lý do và người xác nhận đọc lại được
  Thành phần hiển thị: một bảng tám cột kèm một chú thích về hai chỗ tiêu thụ dữ liệu
  Chức năng và logic: chỉ đọc; là nguồn của báo cáo ngoại lệ và của phần ngoại lệ đủ điều kiện trong bảng đối chiếu ngày
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1128 endX=1026 endY=1333

### Item 5.1: Bảng ngoại lệ tám cột

- **itemId**: img-021
- **itemName**: Bảng ngoại lệ tám cột
- **nameJP**: 例外テーブル
- **nameTrans**: Exception table
- **itemType**: table
- **itemSubtype**: data_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: bề mặt đọc lại của dữ liệu ngoại lệ; là nơi phía đối chiếu tra khi thấy chênh lệch
  Thành phần hiển thị: tám cột: ngày nghiệp vụ; giao dịch; lần giao; loại; số lượng; lý do; người xác nhận; bằng chứng
  Chức năng và logic: chỉ đọc; lọc được theo ngày nghiệp vụ và loại ngoại lệ vì đó là hai bộ lọc bắt buộc của báo cáo tiêu thụ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi bảng này; prototype CHƯA TỒN TẠI thực thể ngoại lệ giao hàng nào nên cả tám cột đều chưa có nguồn.
- **qa**: - Bảng này liệt ngoại lệ của một phiếu giao hàng đang xem; hay của cả ngày nghiệp vụ? Bảng ba dòng mẫu trên hình có ba mã giao dịch khác nhau nên đang nghiêng về phạm vi cả ngày.
- **position**: startX=42 startY=1172 endX=1010 endY=1287

### Item 5.1.1: Hàng tiêu đề bảng ngoại lệ

- **itemId**: img-022
- **itemName**: Hàng tiêu đề bảng ngoại lệ
- **nameJP**: テーブル見出し行
- **nameTrans**: Table header row
- **itemType**: label
- **itemSubtype**: table_header
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: gọi tên tám cột của bảng ngoại lệ
  Thành phần hiển thị: tám ô tiêu đề chữ tiếng Việt
  Chức năng và logic: tĩnh; không sắp xếp được theo cột ở bản thiết kế này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=43 startY=1173 endX=1010 endY=1200

### Item 5.1.2: Dòng ngoại lệ (đại diện cho ba dòng mẫu)

- **itemId**: img-023
- **itemName**: Dòng ngoại lệ (đại diện cho ba dòng mẫu)
- **nameJP**: 例外行
- **nameTrans**: Exception row
- **itemType**: label
- **itemSubtype**: table_row
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: ngày YYYY-MM-DD; số lượng hai chữ số thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: một dòng là một ngoại lệ đã ghi; đọc ngang là biết loại; số lượng; lý do và ai xác nhận
  Thành phần hiển thị: tám ô dữ liệu; ô lần giao là dấu gạch khi ngoại lệ thuộc cấp phiếu giao hàng; ô bằng chứng đếm số tệp
  Chức năng và logic: chỉ đọc; ba dòng mẫu trên hình gộp làm một dòng đại diện vì chỉ khác giá trị
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Ba dòng mẫu chỉ khác giá trị nên gộp thành một dòng đại diện; prototype CHƯA TỒN TẠI bảng ngoại lệ nên dòng này chưa có nguồn.
- **qa**: -
- **position**: startX=43 startY=1200 endX=1010 endY=1229

### Item 5.2: Ghi chú hai chỗ tiêu thụ dữ liệu ngoại lệ

- **itemId**: img-024
- **itemName**: Ghi chú hai chỗ tiêu thụ dữ liệu ngoại lệ
- **nameJP**: 消費先注記
- **nameTrans**: Downstream consumer note
- **itemType**: label
- **itemSubtype**: inline_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chỉ ra hai chỗ phụ thuộc dữ liệu của màn để thấy rõ hệ quả khi màn chưa có
  Thành phần hiển thị: một đoạn chú thích một dòng dẫn RPT-04 và FR-SETTLE-01
  Chức năng và logic: tĩnh; là ràng buộc phụ thuộc giữa SC-17; SC-18 và danh mục báo cáo
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1290 endX=1010 endY=1306

### Item 6: Khối trạng thái màn

- **itemId**: img-025
- **itemName**: Khối trạng thái màn
- **nameJP**: 画面状態パネル
- **nameTrans**: Screen state panel
- **itemType**: others
- **itemSubtype**: state_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt đủ trạng thái màn phải xử lý gồm cả loại ngoại lệ không ghi được bằng đường lần giao
  Thành phần hiển thị: sáu thẻ trạng thái xếp hai hàng
  Chức năng và logic: tĩnh; là phần đặc tả đi kèm màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1346 endX=1026 endY=1616

### Item 6.1: Thẻ trạng thái Chưa có lần giao nào

- **itemId**: img-026
- **itemName**: Thẻ trạng thái Chưa có lần giao nào
- **nameJP**: 配送実績なし
- **nameTrans**: No shipment yet state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho phép ghi ngoại lệ trước khi có lần giao nào
  Thành phần hiển thị: điều kiện và loại ngoại lệ áp dụng được
  Chức năng và logic: trường lần giao liên quan để trống; ngoại lệ gắn vào cấp phiếu giao hàng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1390 endX=277 endY=1499

### Item 6.2: Thẻ trạng thái Giao hàng đã hoàn tất

- **itemId**: img-027
- **itemName**: Thẻ trạng thái Giao hàng đã hoàn tất
- **nameJP**: 配送完了済み
- **nameTrans**: Delivery completed state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: bảo toàn số đã chốt
  Thành phần hiển thị: form ở chế độ đọc kèm lời giải thích và đường đi tiếp
  Chức năng và logic: chặn ghi khi phiếu giao hàng ở trạng thái cuối; chuyển người dùng sang đường yêu cầu điều chỉnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=1390 endX=522 endY=1499

### Item 6.3: Thẻ trạng thái Ngày của lần giao đã lock

- **itemId**: img-028
- **itemName**: Thẻ trạng thái Ngày của lần giao đã lock
- **nameJP**: 配送日ロック済み
- **nameTrans**: Shipment day locked state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: giữ số của ngày đã chốt bất biến
  Thành phần hiển thị: một câu quy tắc và đường đi tiếp
  Chức năng và logic: chặn ghi khi ngày nghiệp vụ của ngoại lệ đã bị khoá; đường ra là yêu cầu điều chỉnh có phê duyệt
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=531 startY=1390 endX=766 endY=1499

### Item 6.4: Thẻ trạng thái Giao thừa

- **itemId**: img-029
- **itemName**: Thẻ trạng thái Giao thừa
- **nameJP**: 過剰配送
- **nameTrans**: Over-delivery state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: giải thích vì sao giao thừa bắt buộc phải là một loại ngoại lệ
  Thành phần hiển thị: một câu quy tắc nối với chặn trên của đường ghi lần giao
  Chức năng và logic: đường ghi lần giao chặn số lượng vượt số lượng đặt nên giao thừa chỉ vào hệ thống qua màn này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=775 startY=1390 endX=1010 endY=1499

### Item 6.5: Thẻ trạng thái Đang gửi và Gửi lỗi

- **itemId**: img-030
- **itemName**: Thẻ trạng thái Đang gửi và Gửi lỗi
- **nameJP**: 送信中・送信エラー
- **nameTrans**: Submitting and submit error state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: không để người dùng nhập lại cả form khi gửi lỗi
  Thành phần hiển thị: nút vô hiệu khi đang gửi; thông báo lỗi gắn với trường sai
  Chức năng và logic: giữ nguyên dữ liệu đã nhập qua lần gửi lỗi; chỉ rõ trường nào sai chứ không báo lỗi chung
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1508 endX=277 endY=1600

