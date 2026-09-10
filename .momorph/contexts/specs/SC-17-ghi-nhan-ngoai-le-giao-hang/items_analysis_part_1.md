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
- **batch**: 1/3 (15 items)

### Item 1: Khối đầu trang màn ghi ngoại lệ giao hàng

- **itemId**: img-001
- **itemName**: Khối đầu trang màn ghi ngoại lệ giao hàng
- **nameJP**: 配送例外記録ヘッダー
- **nameTrans**: Delivery exception page header
- **itemType**: others
- **itemSubtype**: screen_header
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-023 → FN-06 → FR-DEL-03 và chỉ ra báo cáo tiêu thụ dữ liệu của màn
  Thành phần hiển thị: tiêu đề màn; dòng meta truy vết; nhãn trạng thái thi công
  Chức năng và logic: tĩnh — chỉ định danh màn và phạm vi yêu cầu
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=121

### Item 1.1: Tiêu đề màn

- **itemId**: img-002
- **itemName**: Tiêu đề màn
- **nameJP**: 画面タイトル
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: heading
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: định danh màn trong bộ 32 màn của thiết kế
  Thành phần hiển thị: mã màn SC-17 và tên màn tiếng Việt
  Chức năng và logic: văn bản tĩnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=48

### Item 1.2: Dòng meta truy vết yêu cầu

- **itemId**: img-003
- **itemName**: Dòng meta truy vết yêu cầu
- **nameJP**: 要件トレース行
- **nameTrans**: Requirement trace meta line
- **itemType**: label
- **itemSubtype**: screen_meta
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai chuỗi truy vết và chỉ ra màn này là điều kiện của một báo cáo bắt buộc
  Thành phần hiển thị: mã FE-023; nhóm FN-06; ưu tiên P1; một yêu cầu chức năng; một miền dữ liệu; sơ đồ; mã báo cáo; route đề xuất; actor
  Chức năng và logic: văn bản tĩnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=60 endX=1026 endY=97

### Item 1.3: Nhãn trạng thái thi công

- **itemId**: img-004
- **itemName**: Nhãn trạng thái thi công
- **nameJP**: 実装状況タグ
- **nameTrans**: Build status tag
- **itemType**: label
- **itemSubtype**: status_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Chưa thi công
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cảnh báo màn này chưa có bản thi công nên không có hiện trạng để đối chiếu từng dòng
  Thành phần hiển thị: một nhãn chữ
  Chức năng và logic: tĩnh — giá trị đến từ trạng thái roster
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=582 startY=78 endX=658 endY=97

### Item 2: Dải cảnh báo màn thuần thiết kế

- **itemId**: img-005
- **itemName**: Dải cảnh báo màn thuần thiết kế
- **nameJP**: 設計のみ警告バナー
- **nameTrans**: Design-only callout banner
- **itemType**: label
- **itemSubtype**: callout
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nói thẳng ngay đầu màn rằng nội dung bên dưới là thiết kế đọc từ yêu cầu khách chứ không phải mô tả code
  Thành phần hiển thị: một dải cảnh báo bốn dòng nêu nguồn của thiết kế và bốn chỗ tiêu thụ dữ liệu của màn
  Chức năng và logic: tĩnh; là ghi chú đọc bắt buộc trước khi đọc phần còn lại
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=137 endX=1026 endY=190

### Item 3: Khối sơ đồ FIG-014 luồng ngoại lệ khi giao hàng

- **itemId**: img-006
- **itemName**: Khối sơ đồ FIG-014 luồng ngoại lệ khi giao hàng
- **nameJP**: FIG-014 パネル
- **nameTrans**: FIG-014 panel
- **itemType**: others
- **itemSubtype**: diagram_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đặt màn vào đúng một nhánh của sơ đồ FIG-014 và phân biệt nhánh đó với hai nhánh còn lại
  Thành phần hiển thị: một sơ đồ chữ ba nhánh kèm một chú thích phân vai từng nhánh
  Chức năng và logic: tĩnh; sơ đồ là nguồn của bốn loại ngoại lệ mà màn ghi
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=206 endX=1026 endY=517

### Item 3.1: Sơ đồ FIG-014 ba nhánh

- **itemId**: img-007
- **itemName**: Sơ đồ FIG-014 ba nhánh
- **nameJP**: FIG-014 フロー図
- **nameTrans**: FIG-014 flow diagram
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
  Mục đích và ngữ cảnh: vẽ đủ ba nhánh của sơ đồ yêu cầu khách kể cả nhánh không có yêu cầu chức năng nào đòi
  Thành phần hiển thị: một sơ đồ chữ với ba nhánh rẽ từ cùng một cổng hỏi số lượng khớp
  Chức năng và logic: tĩnh; nhánh có chênh lệch là nhánh của màn này; nhánh kiểm tra quyền nối sang cơ chế hiệu lực tham gia
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=250 endX=1010 endY=455

### Item 3.2: Ghi chú phân vai ba nhánh của FIG-014

- **itemId**: img-008
- **itemName**: Ghi chú phân vai ba nhánh của FIG-014
- **nameJP**: 三分岐注記
- **nameTrans**: Three-branch note
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
  Mục đích và ngữ cảnh: chặn việc gộp ba nhánh thành một luồng và nói rõ nhánh nào thuộc màn nào
  Thành phần hiển thị: một đoạn chú thích hai dòng dẫn FE-007 và BR-PERM-01
  Chức năng và logic: tĩnh; là ranh giới phạm vi giữa màn ghi ngoại lệ và cơ chế hiệu lực tham gia
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Nhánh kiểm tra quyền của sơ đồ có phải một loại ngoại lệ giao hàng thứ năm không? Yêu cầu FR-DEL-03 chỉ liệt bốn loại nên hiện không loại nào nhận được tình huống quyền mất hiệu lực giữa lúc giao.
- **position**: startX=42 startY=458 endX=1010 endY=490

### Item 4: Khối form ghi ngoại lệ

- **itemId**: img-009
- **itemName**: Khối form ghi ngoại lệ
- **nameJP**: 例外記録フォーム
- **nameTrans**: Exception record form
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
  Mục đích và ngữ cảnh: đường ghi duy nhất của FE-023: lưu lý do và người xác nhận cho một trong bốn loại ngoại lệ
  Thành phần hiển thị: tám trường xếp bốn hàng; một nút gửi; một chú thích hậu quả sau khi ghi
  Chức năng và logic: hai trường hệ thống tự đặt; hai trường lấy từ ngữ cảnh; bốn trường người nhập điền; ghi xong thì trạng thái giao hàng chuyển sang ngoại lệ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=530 endX=1026 endY=1115

### Item 4.1: Trường giao hàng đang ghi ngoại lệ

- **itemId**: img-010
- **itemName**: Trường giao hàng đang ghi ngoại lệ
- **nameJP**: 配送
- **nameTrans**: Delivery reference
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: TXN-0001 (lấy từ ngữ cảnh, không nhập)
- **validationNote**:
  Điều kiện: phiếu giao hàng trong ngữ cảnh không tồn tại
  Lỗi: "Không tìm thấy giao hàng này."
- **description**:
  Mục đích và ngữ cảnh: neo bản ghi ngoại lệ về đúng một phiếu giao hàng; đây là quan hệ bắt buộc của bản ghi
  Thành phần hiển thị: nhãn hai ngôn ngữ có dấu bắt buộc và một ô chỉ đọc mang mã giao dịch
  Chức năng và logic: lấy từ ngữ cảnh màn trước; không nhận từ dữ liệu người gửi lên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery
- **databaseColumn**: id
- **databaseNote**: Prototype có thực thể phiếu giao hàng và khoá chính của nó; chỗ thiếu là phía ngoại lệ chứ không phải phía này.
- **qa**: -
- **position**: startX=42 startY=574 endX=521 endY=669

### Item 4.2: Trường lần giao liên quan

- **itemId**: img-011
- **itemName**: Trường lần giao liên quan
- **nameJP**: 関連回数
- **nameTrans**: Related shipment
- **itemType**: dropdown
- **itemSubtype**: single_select
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Lần 2 — SHP-0002 · 60.00
- **validationNote**:
  Điều kiện: lần giao đã chọn không thuộc phiếu giao hàng đang ghi
  Lỗi: "Lần giao này không thuộc giao hàng đang xem."
- **description**:
  Mục đích và ngữ cảnh: cho phép ngoại lệ gắn vào một lần giao cụ thể; đây là chiều phân tích mà báo cáo ngoại lệ cần
  Thành phần hiển thị: nhãn hai ngôn ngữ; một danh sách chọn liệt số lần và số lượng; một chú thích nói rõ trường không bắt buộc
  Chức năng và logic: danh sách chỉ liệt lần giao của chính phiếu giao hàng này; để trống nghĩa là ngoại lệ thuộc cấp phiếu giao hàng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: id; seq
- **databaseNote**: Prototype có sổ từng lần giao và số thứ tự để chọn; chỗ CHƯA TỒN TẠI là cột nối từ bản ghi ngoại lệ sang lần giao.
- **qa**:
  - Ngoại lệ gắn vào cấp phiếu giao hàng hay cấp một lần giao cụ thể? Yêu cầu FR-DEL-03 chỉ nói lưu lý do và người xác nhận; chọn sai thì báo cáo ngoại lệ mất chiều phân tích theo lần giao.
  - Định dạng nhãn của một lần giao trong danh sách chọn còn thiếu: số lần kèm mã lần giao và số lượng; hay thêm cả ngày nghiệp vụ? Nguồn thiết kế không quy định.
- **position**: startX=532 startY=574 endX=1010 endY=669

### Item 4.3: Trường loại ngoại lệ

- **itemId**: img-012
- **itemName**: Trường loại ngoại lệ
- **nameJP**: 例外種別
- **nameTrans**: Exception kind
- **itemType**: dropdown
- **itemSubtype**: single_select
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: một trong bốn loại của FR-DEL-03: giao thiếu; giao thừa; hoàn trả; hủy một phần
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Giao thiếu
- **validationNote**:
  Điều kiện: loại ngoại lệ chưa được chọn
  Lỗi: "Vui lòng chọn loại ngoại lệ."
  Điều kiện: loại ngoại lệ không thuộc bốn giá trị của FR-DEL-03
  Lỗi: "Loại ngoại lệ không hợp lệ."
- **description**:
  Mục đích và ngữ cảnh: phân loại ngoại lệ để bảng đối chiếu và báo cáo nhóm được thay vì đọc chữ tự do
  Thành phần hiển thị: nhãn có dấu bắt buộc; một danh sách chọn; một chú thích chốt đúng bốn giá trị
  Chức năng và logic: đúng bốn giá trị của FR-DEL-03; không có giá trị khác và không có ô nhập tự do thay thế
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi trường này; prototype CHƯA TỒN TẠI bảng hay cột nào lưu ngoại lệ giao hàng nên để trống.
- **qa**: - Có cần một loại thứ năm cho tình huống quyền mất hiệu lực giữa lúc giao mà sơ đồ FIG-014 có vẽ không? Thêm giá trị ngoài bốn loại thì phải được chủ đầu tư chốt vì báo cáo nhóm theo đúng tập này.
- **position**: startX=42 startY=679 endX=521 endY=774

### Item 4.4: Trường số lượng liên quan

- **itemId**: img-013
- **itemName**: Trường số lượng liên quan
- **nameJP**: 数量
- **nameTrans**: Related quantity
- **itemType**: text_form
- **itemSubtype**: number_input
- **buttonType**: -
- **dataType**: integer
- **required**: false
- **format**: số với hai chữ số thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 8.00
- **validationNote**:
  Điều kiện: số lượng nhỏ hơn hoặc bằng 0
  Lỗi: "Số lượng phải lớn hơn 0."
  Điều kiện: loại là giao thiếu hoặc hoàn trả và số lượng vượt phần đã giao
  Lỗi: "Số lượng vượt phần đã giao."
  Điều kiện: loại là hủy một phần và số lượng vượt số lượng còn lại
  Lỗi: "Số lượng vượt số lượng còn lại."
- **description**:
  Mục đích và ngữ cảnh: cho biết chênh lệch bao nhiêu; là con số bảng đối chiếu ngày dùng để giải thích phần lệch
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô nhập số; một chú thích quy tắc chặn trên theo từng loại ngoại lệ
  Chức năng và logic: chặn trên phụ thuộc loại ngoại lệ đã chọn; bắt buộc hay không cũng phụ thuộc loại
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi trường này; prototype CHƯA TỒN TẠI bảng hay cột nào lưu ngoại lệ giao hàng nên để trống.
- **qa**: - Với loại nào thì số lượng liên quan là bắt buộc? Giao thiếu và giao thừa hầu như luôn có con số; nhưng hủy một phần trước khi giao thì có thể chưa có số lượng nào để ghi.
- **position**: startX=532 startY=679 endX=1010 endY=774

### Item 4.5: Trường lý do ngoại lệ

- **itemId**: img-014
- **itemName**: Trường lý do ngoại lệ
- **nameJP**: 理由
- **nameTrans**: Exception reason
- **itemType**: textarea
- **itemSubtype**: multiline_text
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: -
- **minLength**: -
- **maxLength**: 1000
- **defaultValue**: 8 thùng hỏng bao bì tại kho, người nhận từ chối nhận phần này
- **validationNote**:
  Điều kiện: lý do rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập lý do ngoại lệ."
- **description**:
  Mục đích và ngữ cảnh: thoả nghiệm thu của FR-DEL-03 về danh sách lý do; đây là trường mà phía đối chiếu đọc thay cho gọi điện hỏi
  Thành phần hiển thị: nhãn hai ngôn ngữ có dấu bắt buộc; một ô nhập nhiều dòng; một chú thích nói rõ không được để trống
  Chức năng và logic: bắt buộc; cắt khoảng trắng hai đầu trước khi kiểm rỗng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi trường này; prototype CHƯA TỒN TẠI bảng hay cột nào lưu ngoại lệ giao hàng nên để trống.
- **qa**:
  - Lý do là chữ tự do; hay chọn từ một danh mục lý do cố định rồi ghi thêm chú thích? Nghiệm thu nói có danh sách lý do nên có thể đang đòi một danh mục chứ không phải ô chữ tự do.
  - Định dạng của ô lý do còn thiếu: chữ tự do không cấu trúc; hay phải theo một khuôn nhất định để báo cáo đọc lại được?
- **position**: startX=42 startY=784 endX=1010 endY=879

### Item 4.6: Trường người xác nhận ngoại lệ

- **itemId**: img-015
- **itemName**: Trường người xác nhận ngoại lệ
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
  Mục đích và ngữ cảnh: thoả nửa còn lại của nghiệm thu FR-DEL-03: mỗi ngoại lệ có người chịu trách nhiệm
  Thành phần hiển thị: nhãn hai ngôn ngữ có dấu bắt buộc; một ô chỉ đọc; một chú thích dẫn nghiệm thu
  Chức năng và logic: hệ thống đặt từ phiên đăng nhập; không bao giờ nhận từ dữ liệu người gửi lên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi trường này; prototype CHƯA TỒN TẠI bảng hay cột nào lưu ngoại lệ giao hàng nên để trống.
- **qa**: -
- **position**: startX=42 startY=890 endX=357 endY=1001

