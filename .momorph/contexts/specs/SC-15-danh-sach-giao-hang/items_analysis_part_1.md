# Items Analysis - SC-15 · Danh sách giao hàng

## Screen context

- **screen**: SC-15 · Danh sách giao hàng
- **source-family**: image
- **source-token**: SC-15-danh-sach-giao-hang
- **source-image**: .momorph/shots/SC-15-danh-sach-giao-hang.png
- **canvas**: 1280 x 1588 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-020 (FN-06) · ưu tiên P0
- **requirement-refs**: FR-DEL-01 (RFP:681) · liên quan FR-DEL-05 (RFP:685) · FIG-014 (RFP:693) · FIG-029 (RFP:714)
- **data-domain**: D-DELIVERY · D-TRADE (RFP:733)
- **actor**: Bộ phận vận chuyển (ROLE-DELIVERY) — điểm vào chung của khâu giao nhận
- **note**: Màn chỉ đọc; mọi đường ghi nằm ở SC-16 và SC-17
- **batch**: 1/3 (15 items)

### Item 1: Khối đầu trang màn danh sách giao hàng

- **itemId**: img-001
- **itemName**: Khối đầu trang màn danh sách giao hàng
- **nameJP**: 配送一覧ヘッダー
- **nameTrans**: Delivery list page header
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
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-020 → FN-06 → FR-DEL-01 và khai miền dữ liệu mà màn chạm
  Thành phần hiển thị: tiêu đề màn; dòng meta truy vết yêu cầu; nhãn trạng thái thi công
  Chức năng và logic: tĩnh — chỉ định danh màn và phạm vi yêu cầu; không có tương tác
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
  Thành phần hiển thị: mã màn SC-15 và tên màn tiếng Việt
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
  Mục đích và ngữ cảnh: khai chuỗi truy vết một tính năng một yêu cầu để đọc màn không phải tra chỗ khác
  Thành phần hiển thị: mã FE-020; nhóm FN-06; ưu tiên P0; một yêu cầu chức năng; hai miền dữ liệu; sơ đồ liên quan; mã thi công; route; actor
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
- **defaultValue**: Đã dựng
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết màn này đã có bản thi công để đối chiếu, khác với màn còn là thiết kế thuần
  Thành phần hiển thị: một nhãn chữ
  Chức năng và logic: tĩnh — giá trị đến từ trạng thái roster, không đổi theo dữ liệu nghiệp vụ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=523 startY=78 endX=575 endY=97

### Item 2: Khối bộ lọc danh sách

- **itemId**: img-005
- **itemName**: Khối bộ lọc danh sách
- **nameJP**: 絞り込みパネル
- **nameTrans**: Filter panel
- **itemType**: others
- **itemSubtype**: filter_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: thu hẹp danh sách theo bốn tiêu chí mà khâu giao nhận dùng thật trong khung giờ cập nhật giao nhận
  Thành phần hiển thị: bốn ô lọc xếp một hàng kèm chú thích từng ô; một nút áp dụng
  Chức năng và logic: gửi bốn tiêu chí về cùng một truy vấn danh sách; không tiêu chí nào bắt buộc; để trống là không lọc theo tiêu chí đó
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=137 endX=1026 endY=347

### Item 2.1: Ô lọc ngày nghiệp vụ

- **itemId**: img-006
- **itemName**: Ô lọc ngày nghiệp vụ
- **nameJP**: 業務日フィルター
- **nameTrans**: Business date filter
- **itemType**: date_picker
- **itemSubtype**: single_date
- **buttonType**: -
- **dataType**: date
- **required**: false
- **format**: YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 2026-09-09
- **validationNote**:
  Điều kiện: ngày nhập lớn hơn ngày nghiệp vụ hiện tại theo JST
  Lỗi: "Ngày nghiệp vụ không nhận ngày tương lai."
  Điều kiện: chuỗi ngày không đúng dạng YYYY-MM-DD
  Lỗi: "Ngày nghiệp vụ không đúng định dạng."
- **description**:
  Mục đích và ngữ cảnh: chọn ngày nghiệp vụ cần theo dõi; mặc định là ngày đang diễn ra
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô chọn ngày; một chú thích về mốc múi giờ
  Chức năng và logic: neo theo giờ Nhật; không nhận ngày tương lai vì ngày nghiệp vụ là ngày đã hoặc đang diễn ra
- **userAction**: on_click
- **transitionNote**: Ở lại màn; nạp lại danh sách theo ngày đã chọn
- **databaseTable**: transaction
- **databaseColumn**: business_date
- **databaseNote**: Prototype có cột này với ràng buộc không rỗng và lọc theo đúng nó; nhưng ô lọc không có chặn trên nên ngày tương lai vẫn nhập được và cho ra danh sách rỗng không lời giải thích.
- **qa**: - Ngày nghiệp vụ của danh sách lọc theo ngày của giao dịch hay theo ngày của từng lần giao? Hai cách cho hai danh sách khác nhau vì một lần giao có ngày riêng.
- **position**: startX=42 startY=181 endX=276 endY=292

### Item 2.2: Ô lọc trạng thái giao hàng

- **itemId**: img-007
- **itemName**: Ô lọc trạng thái giao hàng
- **nameJP**: 状態フィルター
- **nameTrans**: Delivery status filter
- **itemType**: dropdown
- **itemSubtype**: single_select
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **validationNote**:
  Điều kiện: giá trị chọn không thuộc bốn trạng thái của FR-DEL-01
  Lỗi: "Trạng thái không hợp lệ."
- **description**:
  Mục đích và ngữ cảnh: thu hẹp danh sách về một bước của vòng đời giao hàng
  Thành phần hiển thị: nhãn hai ngôn ngữ; một danh sách chọn có giá trị Tất cả; một chú thích liệt bốn trạng thái
  Chức năng và logic: danh sách chọn phải đủ bốn trạng thái của FR-DEL-01 cộng giá trị Tất cả
- **userAction**: on_click
- **transitionNote**: Ở lại màn; nạp lại danh sách theo trạng thái đã chọn
- **databaseTable**: delivery
- **databaseColumn**: status
- **databaseNote**: Prototype có ràng buộc bốn giá trị trên cột này nhưng danh sách chọn chỉ đưa ra ba; giá trị ngoại lệ bị bỏ vì chưa đường ghi nào đặt được.
- **qa**:
  - Danh sách chọn nên đưa ra đủ bốn trạng thái ngay từ đầu; hay chỉ mở giá trị ngoại lệ sau khi màn ghi ngoại lệ chạy? Chọn sai thì người dùng gặp một bộ lọc luôn trả rỗng.
  - Chọn được nhiều trạng thái cùng lúc hay chỉ một? Khâu giao nhận thường cần xem chờ và đang giao chung một danh sách.
  - Định dạng hiển thị của giá trị trạng thái còn thiếu: hiện nguyên văn bốn nhãn của FR-DEL-01; hay có mã ngắn đi kèm để lọc bằng bàn phím?
- **position**: startX=287 startY=181 endX=521 endY=292

### Item 2.3: Ô lọc mã giao dịch

- **itemId**: img-008
- **itemName**: Ô lọc mã giao dịch
- **nameJP**: 取引番号フィルター
- **nameTrans**: Transaction code filter
- **itemType**: text_form
- **itemSubtype**: text_input
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: TXN-0001
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: tìm nhanh một giao dịch cụ thể khi hiện trường đọc mã trên phiếu
  Thành phần hiển thị: nhãn hai ngôn ngữ và một ô nhập chữ
  Chức năng và logic: để trống là không lọc theo mã; cách khớp mã còn là câu hỏi mở
- **userAction**: on_click
- **transitionNote**: Ở lại màn; nạp lại danh sách theo mã giao dịch đã nhập
- **databaseTable**: transaction
- **databaseColumn**: txn_code
- **databaseNote**: Prototype có cột này với ràng buộc duy nhất nhưng chưa có đường lọc nào theo nó ở màn danh sách giao hàng.
- **qa**:
  - Ô này tìm khớp đúng cả mã hay khớp một phần mã? Người ở hiện trường thường chỉ đọc được vài ký tự cuối trên phiếu.
  - Định dạng mã giao dịch còn thiếu trong nguồn thiết kế: mã có luôn là tiền tố cố định cộng số thứ tự; hay có thêm phần theo ngày? Cần biết trước khi kiểm định dạng ô nhập.
- **position**: startX=532 startY=181 endX=765 endY=292

### Item 2.4: Ô lọc người tham gia

- **itemId**: img-009
- **itemName**: Ô lọc người tham gia
- **nameJP**: 買出人フィルター
- **nameTrans**: Participant filter
- **itemType**: dropdown
- **itemSubtype**: single_select
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: xem tiến độ giao của một người tham gia; nhu cầu thường gặp khi có khiếu nại
  Thành phần hiển thị: nhãn hai ngôn ngữ; một danh sách chọn; một chú thích cấm hiện thông tin liên hệ
  Chức năng và logic: chỉ hiện tên người tham gia; không bao giờ hiện thông tin liên hệ cá nhân trên danh sách chọn
- **userAction**: on_click
- **transitionNote**: Ở lại màn; nạp lại danh sách theo người tham gia đã chọn
- **databaseTable**: participant
- **databaseColumn**: name
- **databaseNote**: Prototype có cột tên và quan hệ từ giao dịch sang người mua nhưng màn danh sách giao hàng chưa hiển thị và chưa lọc theo người tham gia.
- **qa**:
  - Danh sách chọn chỉ gồm người tham gia còn hiệu lực; hay gồm cả người đã mất hiệu lực? Giao hàng của giao dịch cũ vẫn phải giao nên có thể cần cả nhóm sau.
  - Định dạng nhãn người tham gia còn thiếu: chỉ tên; hay tên kèm mã và phân loại người tham gia? Cần biết để danh sách chọn không có hai dòng trùng tên.
- **position**: startX=776 startY=181 endX=1010 endY=292

### Item 2.5: Nút áp dụng bộ lọc

- **itemId**: img-010
- **itemName**: Nút áp dụng bộ lọc
- **nameJP**: 絞り込みボタン
- **nameTrans**: Apply filter button
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
  Mục đích và ngữ cảnh: gom bốn tiêu chí thành một lần truy vấn thay vì nạp lại mỗi lần đổi một ô
  Thành phần hiển thị: một nút chữ
  Chức năng và logic: gửi bốn tiêu chí; giữ nguyên tiêu chí sau khi nạp lại để người dùng thấy mình đang lọc theo gì
- **userAction**: on_click
- **transitionNote**: Ở lại màn; nạp lại bảng danh sách theo bốn tiêu chí đang đặt và giữ tiêu chí trên đường dẫn để chia sẻ lại được
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=302 endX=87 endY=331

### Item 3: Khối danh sách giao hàng

- **itemId**: img-011
- **itemName**: Khối danh sách giao hàng
- **nameJP**: 配送一覧パネル
- **nameTrans**: Delivery list panel
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
  Mục đích và ngữ cảnh: bề mặt chính của màn: cho biết giao dịch nào còn phải giao và đã giao được bao nhiêu
  Thành phần hiển thị: một bảng tám cột kèm một dòng chú thích điều hướng bên dưới
  Chức năng và logic: chỉ đọc; mỗi dòng là một cửa vào chi tiết giao hàng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=360 endX=1026 endY=633

### Item 3.1: Bảng danh sách giao hàng tám cột

- **itemId**: img-012
- **itemName**: Bảng danh sách giao hàng tám cột
- **nameJP**: 配送一覧テーブル
- **nameTrans**: Delivery list table
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
  Mục đích và ngữ cảnh: cho thấy tiến độ giao của cả ngày trong một bảng, thoả nghiệm thu của FR-DEL-01 về trạng thái theo từng lần thực hiện
  Thành phần hiển thị: tám cột: mã giao dịch; người tham gia; ngày nghiệp vụ; số lượng đặt; đã giao lũy kế; còn lại; số lần giao; trạng thái
  Chức năng và logic: chỉ đọc; sắp theo ngày nghiệp vụ giảm dần và trong cùng ngày thì giao dịch còn hàng chưa giao lên trước
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery
- **databaseColumn**: status; delivered_qty
- **databaseNote**: Prototype đọc hai cột này cùng với ba cột của giao dịch; ba cột thiết kế đòi thêm là người tham gia; số lượng còn lại và số lần giao thì màn hiện chưa có.
- **qa**:
  - Bảng phải phân trang ở kích thước nào? Nguồn thiết kế đặt ngày cao điểm ở khoảng một nghìn hai trăm giao dịch nên đổ hết một lần là không dùng được.
  - Cột số lần giao đếm mọi lần giao; hay chỉ đếm lần giao đã xác nhận? Hai cách cho hai con số khi có lần giao đang chờ xác nhận.
- **position**: startX=42 startY=404 endX=1010 endY=571

### Item 3.1.1: Hàng tiêu đề tám cột

- **itemId**: img-013
- **itemName**: Hàng tiêu đề tám cột
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
  Mục đích và ngữ cảnh: gọi tên từng cột bằng cả hai ngôn ngữ để người vận hành và bên nghiệp vụ Nhật đọc cùng một bảng
  Thành phần hiển thị: tám ô tiêu đề; mỗi ô một nhãn tiếng Việt trên một nhãn tiếng Nhật
  Chức năng và logic: tĩnh; không sắp xếp được theo cột ở bản thiết kế này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=43 startY=405 endX=1010 endY=448

### Item 3.1.2: Dòng giao dịch (đại diện cho bốn dòng mẫu)

- **itemId**: img-014
- **itemName**: Dòng giao dịch (đại diện cho bốn dòng mẫu)
- **nameJP**: 取引行
- **nameTrans**: Transaction row
- **itemType**: label
- **itemSubtype**: table_row
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: số lượng hai chữ số thập phân; ngày YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mỗi dòng là một giao dịch có chỉ thị giao hàng; đọc ngang một dòng là biết còn phải giao bao nhiêu
  Thành phần hiển thị: tám ô dữ liệu; ô cuối là nhãn trạng thái
  Chức năng và logic: bấm vào dòng thì mở chi tiết; bốn dòng mẫu trên hình gộp làm một dòng đại diện vì chỉ khác giá trị
- **userAction**: on_click
- **transitionNote**: Mở SC-16 chi tiết giao hàng của đúng giao dịch trên dòng
- **databaseTable**: delivery
- **databaseColumn**: delivered_qty; status
- **databaseNote**: Bốn dòng mẫu chỉ khác nhau ở giá trị nên gộp thành một dòng đại diện; prototype đọc đúng hai cột này còn cột còn lại và số lần giao thì tính ở tầng ứng dụng hoặc chưa có.
- **qa**: -
- **position**: startX=43 startY=448 endX=1010 endY=479

### Item 3.1.3: Nhãn trạng thái giao hàng trên dòng

- **itemId**: img-015
- **itemName**: Nhãn trạng thái giao hàng trên dòng
- **nameJP**: 状態バッジ
- **nameTrans**: Delivery status badge
- **itemType**: label
- **itemSubtype**: status_badge
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: một trong bốn trạng thái của FR-DEL-01
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trả lời câu hỏi thường xuyên nhất của khâu giao nhận: dòng này đang ở bước nào
  Thành phần hiển thị: một nhãn chữ mang tên trạng thái bằng hai ngôn ngữ
  Chức năng và logic: giá trị lấy từ trạng thái giao hàng; bốn giá trị theo FR-DEL-01
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery
- **databaseColumn**: status
- **databaseNote**: Prototype có đủ bốn giá trị ở tầng dữ liệu và đủ nhãn hai ngôn ngữ để vẽ; nhưng giá trị ngoại lệ không đường ghi nào đặt được nên nhãn đó chưa bao giờ xuất hiện.
- **qa**: -
- **position**: startX=872 startY=454 endX=932 endY=473

