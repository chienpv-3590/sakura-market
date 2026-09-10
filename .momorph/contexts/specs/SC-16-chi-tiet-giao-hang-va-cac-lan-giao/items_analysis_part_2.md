# Items Analysis - SC-16 · Chi tiết giao hàng và các lần giao

## Screen context

- **screen**: SC-16 · Chi tiết giao hàng và các lần giao
- **source-family**: image
- **source-token**: SC-16-chi-tiet-giao-hang-va-cac-lan-giao
- **source-image**: .momorph/shots/SC-16-chi-tiet-giao-hang-va-cac-lan-giao.png
- **canvas**: 1280 x 2329 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-020 · FE-021 · FE-022 · FE-024 (FN-06) · ưu tiên P0 và P1
- **requirement-refs**: FR-DEL-01 (RFP:681) · FR-DEL-02 (RFP:682) · FR-DEL-04 (RFP:684) · FR-DEL-05 (RFP:685) · BR-DEL-03 (RFP:599) · lưu ý RFP:691
- **data-domain**: D-DELIVERY · D-TRADE · D-SETTLE (RFP:733-734)
- **state-machine**: FIG-029 (RFP:714) vòng đời giao hàng một phần; FIG-014 (RFP:693) luồng ngoại lệ
- **actor**: Bộ phận vận chuyển ghi lần giao; bộ phận đối chiếu chốt hoàn tất
- **note**: Hai đường ghi trên một màn với hai vai trò khác nhau
- **batch**: 2/4 (15 items)

### Item 3.2: Trường đã giao lũy kế

- **itemId**: img-016
- **itemName**: Trường đã giao lũy kế
- **nameJP**: 配送済み累計
- **nameTrans**: Cumulative delivered quantity
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: integer
- **required**: -
- **format**: số với hai chữ số thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 60.00
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết đã giao được bao nhiêu; là số phía đối chiếu đọc trước tiên
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô chỉ đọc; một chú thích ràng buộc khớp với bảng các lần giao
  Chức năng và logic: chỉ đọc; phải luôn bằng tổng số lượng các lần giao đã xác nhận
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery
- **databaseColumn**: delivered_qty
- **databaseNote**: Prototype lưu lũy kế tách khỏi sổ từng lần giao và ghi bù theo kiểu cố hết sức; ghi bù thất bại thì lũy kế cao hơn tổng thật mà không có cơ chế phát hiện lệch.
- **qa**: - Khi lũy kế lệch tổng các lần giao thì màn phải làm gì: hiện cảnh báo và khoá đường ghi; hay tự tính lại từ sổ lần giao? Nguồn thiết kế đòi hai số khớp nhau nhưng không nói xử lý khi lệch.
- **position**: startX=287 startY=435 endX=521 endY=530

### Item 3.3: Trường số lượng còn lại

- **itemId**: img-017
- **itemName**: Trường số lượng còn lại
- **nameJP**: 残数量
- **nameTrans**: Remaining quantity
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: integer
- **required**: -
- **format**: số với hai chữ số thập phân; không âm
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 60.00
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trả lời trực tiếp câu hỏi của FIG-029: còn lại lớn hơn không thì chưa hoàn tất
  Thành phần hiển thị: nhãn hai ngôn ngữ và một ô chỉ đọc
  Chức năng và logic: dẫn xuất: số lượng đặt trừ lũy kế đã giao; chặn dưới ở không; làm tròn hai chữ số thập phân trước khi so sánh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi con số này để quyết định lần giao tiếp theo; đây là số dẫn xuất từ số lượng đặt trừ lũy kế nên không thực thể nào lưu riêng — prototype cũng tính lại mỗi lần đọc.
- **qa**: -
- **position**: startX=532 startY=435 endX=765 endY=530

### Item 3.4: Trường tiến độ giao hàng

- **itemId**: img-018
- **itemName**: Trường tiến độ giao hàng
- **nameJP**: 進捗
- **nameTrans**: Delivery progress
- **itemType**: label
- **itemSubtype**: progress_indicator
- **buttonType**: -
- **dataType**: integer
- **required**: -
- **format**: phần trăm số nguyên
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 50%
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho cái nhìn nhanh về tiến độ mà không phải nhẩm hai con số
  Thành phần hiển thị: nhãn; một ô chỉ đọc mang phần trăm và số lần giao dự kiến
  Chức năng và logic: dẫn xuất: lũy kế chia số lượng đặt; chặn trên ở một trăm phần trăm; không chia khi số lượng đặt bằng không
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi một chỉ báo tiến độ; đây là số dẫn xuất từ lũy kế và số lượng đặt nên không thực thể nào lưu; phần số lần giao dự kiến thì CHƯA TỒN TẠI ở prototype.
- **qa**: - Số lần giao dự kiến lấy ở đâu? Nguồn thiết kế không có chỗ nào khai kế hoạch chia lần giao; nếu không có kế hoạch thì phần này phải bỏ khỏi chỉ báo.
- **position**: startX=776 startY=435 endX=1010 endY=530

### Item 3.5: Sơ đồ FIG-029 vòng đời giao hàng một phần

- **itemId**: img-019
- **itemName**: Sơ đồ FIG-029 vòng đời giao hàng một phần
- **nameJP**: FIG-029 部分配送ライフサイクル図
- **nameTrans**: FIG-029 partial delivery lifecycle diagram
- **itemType**: others
- **itemSubtype**: flow_diagram
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đặt hành vi của màn vào đúng sơ đồ FIG-029 của yêu cầu khách
  Thành phần hiển thị: một sơ đồ chữ hai nhánh kèm nhãn trạng thái và cổng kiểm ở nhánh hoàn tất
  Chức năng và logic: tĩnh; sơ đồ là nguồn của quy tắc chuyển trạng thái mà màn thi hành
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=577 endX=1010 endY=730

### Item 3.6: Ghi chú vòng lặp mở của FIG-029

- **itemId**: img-020
- **itemName**: Ghi chú vòng lặp mở của FIG-029
- **nameJP**: オープンループ注記
- **nameTrans**: Open loop note
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
  Mục đích và ngữ cảnh: khai rõ chỗ yêu cầu khách để ngỏ chứ không tự đặt trần số lần giao
  Thành phần hiển thị: một đoạn chú thích một dòng
  Chức năng và logic: tĩnh; giới hạn số lần chia là câu hỏi mở gửi chủ đầu tư
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=733 endX=1010 endY=749

### Item 4: Khối ghi nhận lần giao mới

- **itemId**: img-021
- **itemName**: Khối ghi nhận lần giao mới
- **nameJP**: 配送記録フォーム
- **nameTrans**: Record shipment form
- **itemType**: others
- **itemSubtype**: form_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đường ghi duy nhất của FE-021: mỗi lần giao thật là một bản ghi riêng
  Thành phần hiển thị: bốn trường trên một hàng; một nút gửi; một nhãn giới hạn vai trò
  Chức năng và logic: hai trường người nhập điền; hai trường hệ thống tự đặt; gửi thành công thì lũy kế tăng và trạng thái chuyển sang đang giao
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=789 endX=1026 endY=999

### Item 4.1: Trường số lượng lần này

- **itemId**: img-022
- **itemName**: Trường số lượng lần này
- **nameJP**: 今回の数量
- **nameTrans**: Quantity for this shipment
- **itemType**: text_form
- **itemSubtype**: number_input
- **buttonType**: -
- **dataType**: integer
- **required**: true
- **format**: số với hai chữ số thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 60.00
- **validationNote**:
  Điều kiện: số lượng rỗng hoặc không phải số
  Lỗi: "Vui lòng nhập số lượng lần giao này."
  Điều kiện: số lượng nhỏ hơn hoặc bằng 0
  Lỗi: "Số lượng phải lớn hơn 0."
  Điều kiện: số lượng lớn hơn số lượng còn lại
  Lỗi: "Số lượng vượt quá số lượng còn lại."
  Điều kiện: phiếu giao hàng đã ở trạng thái hoàn tất
  Lỗi: "Giao dịch này đã hoàn tất; không thể ghi nhận thêm lần giao."
- **description**:
  Mục đích và ngữ cảnh: nhập số lượng thực giao của lần này; đây là dữ liệu gốc mà lũy kế được tính ra từ đó
  Thành phần hiển thị: nhãn hai ngôn ngữ có dấu bắt buộc; một ô nhập số; một chú thích quy tắc chặn trên
  Chức năng và logic: phải lớn hơn không và không vượt số còn lại; vượt số lượng đặt thì không ghi được như một lần giao mà phải đi đường ngoại lệ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: qty
- **databaseNote**: Prototype có cột này với ràng buộc lớn hơn không và kiểm giao vượt trong một vòng so-rồi-ghi có kiểm lại số còn lại ở mỗi vòng.
- **qa**: -
- **position**: startX=42 startY=833 endX=276 endY=944

### Item 4.2: Trường thời điểm giao

- **itemId**: img-023
- **itemName**: Trường thời điểm giao
- **nameJP**: 配送日時
- **nameTrans**: Shipped at
- **itemType**: date_picker
- **itemSubtype**: datetime
- **buttonType**: -
- **dataType**: date
- **required**: true
- **format**: YYYY-MM-DD HH:mm
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 2026-09-09 05:40
- **validationNote**:
  Điều kiện: thời điểm giao rỗng
  Lỗi: "Vui lòng nhập thời điểm giao."
  Điều kiện: thời điểm giao muộn hơn thời điểm hiện tại
  Lỗi: "Thời điểm giao không nhận thời điểm tương lai."
- **description**:
  Mục đích và ngữ cảnh: ghi đúng thời điểm hàng được giao; hiện trường thường ghi vào hệ thống muộn hơn lúc giao thật
  Thành phần hiển thị: nhãn hai ngôn ngữ có dấu bắt buộc và một ô chọn thời điểm
  Chức năng và logic: người nhập điền; không nhận thời điểm tương lai
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: shipped_at
- **databaseNote**: Prototype có cột này nhưng để tầng dữ liệu tự đặt bằng thời điểm ghi; form không có ô nhập nên một lần giao ghi muộn mang thời điểm ghi chứ không phải thời điểm giao thật.
- **qa**: - Thời điểm giao có được ghi lùi quá bao nhiêu lâu? Nếu ghi lùi qua một ngày nghiệp vụ khác thì lần giao đó thuộc ngày nào — ngày trên thời điểm giao hay ngày ghi vào hệ thống?
- **position**: startX=287 startY=833 endX=521 endY=944

### Item 4.3: Trường người xác nhận lần giao

- **itemId**: img-024
- **itemName**: Trường người xác nhận lần giao
- **nameJP**: 実施者
- **nameTrans**: Confirmed by
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Người dùng B (từ phiên đăng nhập)
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: giữ điều kiện truy vết của FR-DEL-01: mỗi lần giao có người chịu trách nhiệm
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô chỉ đọc; một chú thích nói rõ hệ thống tự đặt
  Chức năng và logic: hệ thống đặt từ phiên đăng nhập; không bao giờ nhận từ dữ liệu người gửi lên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: confirmed_by
- **databaseNote**: Prototype có cột này và lấy giá trị từ phiên đăng nhập chứ không từ thân yêu cầu — chỗ này khớp thiết kế.
- **qa**: -
- **position**: startX=532 startY=833 endX=765 endY=944

### Item 4.4: Trường lần thứ

- **itemId**: img-025
- **itemName**: Trường lần thứ
- **nameJP**: 回数
- **nameTrans**: Shipment sequence
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: integer
- **required**: true
- **format**: số nguyên dương liên tục
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 2
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đánh số các lần giao để bảng lần giao và bản quyết toán nói cùng một thứ tự
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô chỉ đọc; một chú thích về tính liên tục
  Chức năng và logic: hệ thống cấp; liên tục trong phạm vi một phiếu giao hàng; không trùng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: seq
- **databaseNote**: Prototype có cột này với ràng buộc lớn hơn không và ràng buộc duy nhất theo phiếu giao hàng; số thứ tự cấp bằng cách đếm rồi cộng một nên không nguyên tử và phải thử lại khi trùng.
- **qa**: -
- **position**: startX=776 startY=833 endX=1010 endY=944

### Item 4.5: Nút ghi nhận lần giao

- **itemId**: img-026
- **itemName**: Nút ghi nhận lần giao
- **nameJP**: 配送記録ボタン
- **nameTrans**: Record shipment button
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
  Mục đích và ngữ cảnh: chốt một lần giao thành bản ghi bất biến
  Thành phần hiển thị: một nút chữ
  Chức năng và logic: vô hiệu khi đang gửi; biến mất hẳn khi phiếu giao hàng đã hoàn tất chứ không chỉ bị vô hiệu
- **userAction**: on_click
- **transitionNote**: Ở lại màn; thêm một dòng vào bảng các lần giao; cập nhật lũy kế và còn lại; chuyển trạng thái sang đang giao
- **databaseTable**: delivery_shipment
- **databaseColumn**: -
- **databaseNote**: Prototype ghi lũy kế trước rồi mới ghi sổ lần giao, và ghi bù nếu bước sau thất bại; không có giao dịch dữ liệu xuyên bảng nên vẫn còn khe lệch.
- **qa**: -
- **position**: startX=42 startY=954 endX=159 endY=983

### Item 4.6: Nhãn giới hạn vai trò của đường ghi

- **itemId**: img-027
- **itemName**: Nhãn giới hạn vai trò của đường ghi
- **nameJP**: 権限タグ
- **nameTrans**: Role restriction tag
- **itemType**: label
- **itemSubtype**: role_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: chỉ vai vận chuyển
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nói rõ ai được ghi lần giao ngay tại chỗ có nút, để vai khác không đi tìm nút bị ẩn
  Thành phần hiển thị: một nhãn chữ đặt cạnh nút gửi
  Chức năng và logic: tĩnh; là khai báo phân quyền theo thao tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Vai trò đối chiếu có được ghi lần giao thay khi hiện trường tắc không? Nguồn thiết kế giao quyền ghi cho vai vận chuyển nhưng không nói có đường thay thế.
- **position**: startX=163 startY=960 endX=257 endY=979

### Item 5: Khối bảng các lần giao

- **itemId**: img-028
- **itemName**: Khối bảng các lần giao
- **nameJP**: 配送履歴パネル
- **nameTrans**: Shipment history panel
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
  Mục đích và ngữ cảnh: sổ từng lần giao; là bằng chứng của lũy kế và là đầu vào của bảng đối chiếu ngày
  Thành phần hiển thị: một bảng bảy cột kèm một chú thích về ngày nghiệp vụ riêng của từng lần giao
  Chức năng và logic: chỉ đọc; sắp theo số lần tăng dần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1012 endX=1026 endY=1206

### Item 5.1: Bảng các lần giao bảy cột

- **itemId**: img-029
- **itemName**: Bảng các lần giao bảy cột
- **nameJP**: 配送履歴テーブル
- **nameTrans**: Shipment history table
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
  Mục đích và ngữ cảnh: cho phía đối chiếu đọc được từng lần giao chứ không chỉ con số lũy kế
  Thành phần hiển thị: bảy cột: lần; mã lần giao; số lượng; thời điểm giao; ngày nghiệp vụ; người xác nhận; ngoại lệ liên quan
  Chức năng và logic: chỉ đọc; sắp theo số lần tăng dần; rỗng thì hiện câu chưa có lần giao nào được ghi nhận
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: seq; qty; shipped_at; business_date; confirmed_by
- **databaseNote**: Prototype có năm trong bảy cột; cột mã lần giao và cột ngoại lệ liên quan thì CHƯA TỒN TẠI, và bảng hiện chỉ vẽ bốn cột nên người xác nhận cũng không hiện ra.
- **qa**: - Bảng này cần phân trang khi một giao dịch có nhiều lần giao không? Nguồn thiết kế để ngỏ giới hạn số lần chia nên số dòng không có trần.
- **position**: startX=42 startY=1056 endX=1010 endY=1160

### Item 5.1.1: Hàng tiêu đề bảng các lần giao

- **itemId**: img-030
- **itemName**: Hàng tiêu đề bảng các lần giao
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
  Mục đích và ngữ cảnh: gọi tên bảy cột bằng cả hai ngôn ngữ
  Thành phần hiển thị: bảy ô tiêu đề; phần lớn có nhãn tiếng Việt trên nhãn tiếng Nhật
  Chức năng và logic: tĩnh; không sắp xếp được theo cột ở bản thiết kế này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=43 startY=1057 endX=1010 endY=1100

