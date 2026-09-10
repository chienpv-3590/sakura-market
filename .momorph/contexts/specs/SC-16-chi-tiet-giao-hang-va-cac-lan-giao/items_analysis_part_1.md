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
- **batch**: 1/4 (15 items)

### Item 1: Khối đầu trang màn chi tiết giao hàng

- **itemId**: img-001
- **itemName**: Khối đầu trang màn chi tiết giao hàng
- **nameJP**: 配送詳細ヘッダー
- **nameTrans**: Delivery detail page header
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
  Mục đích và ngữ cảnh: neo màn vào bốn tính năng của khâu giao nhận và năm yêu cầu khách mà màn phải thoả
  Thành phần hiển thị: tiêu đề màn; hai dòng meta truy vết; nhãn trạng thái thi công
  Chức năng và logic: tĩnh — chỉ định danh màn và phạm vi yêu cầu
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=138

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
  Thành phần hiển thị: mã màn SC-16 và tên màn tiếng Việt
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
  Mục đích và ngữ cảnh: khai đủ bốn tính năng; năm yêu cầu; ba miền dữ liệu và hai sơ đồ trạng thái của màn
  Thành phần hiển thị: hai dòng meta: một dòng tính năng và ưu tiên; một dòng yêu cầu; miền dữ liệu và sơ đồ
  Chức năng và logic: văn bản tĩnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=60 endX=1026 endY=115

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
  Mục đích và ngữ cảnh: cho biết màn đã có bản thi công để đối chiếu
  Thành phần hiển thị: một nhãn chữ
  Chức năng và logic: tĩnh — giá trị đến từ trạng thái roster
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=660 startY=95 endX=713 endY=115

### Item 2: Khối nhận dạng và liên kết giao hàng

- **itemId**: img-005
- **itemName**: Khối nhận dạng và liên kết giao hàng
- **nameJP**: 識別と関連リンクパネル
- **nameTrans**: Identity and link panel
- **itemType**: others
- **itemSubtype**: detail_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết đang xem giao hàng của giao dịch nào và mở được ba hướng liên quan; đây là phần thoả FR-DEL-04 về quan hệ giữa giao hàng và quyết toán
  Thành phần hiển thị: bốn trường chỉ đọc trên một hàng; ba liên kết; một chú thích quan hệ hai chiều
  Chức năng và logic: chỉ đọc; ba liên kết phải có ở mọi trạng thái chứ không chỉ sau khi ngày đã lock
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=154 endX=1026 endY=378

### Item 2.1: Trường mã giao dịch

- **itemId**: img-006
- **itemName**: Trường mã giao dịch
- **nameJP**: 取引番号
- **nameTrans**: Transaction code
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: TXN-0001
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: neo mọi thứ trên màn về một giao dịch cụ thể
  Thành phần hiển thị: nhãn hai ngôn ngữ và một ô chỉ đọc
  Chức năng và logic: chỉ đọc; giá trị đến từ giao dịch cha của phiếu giao hàng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: txn_code
- **databaseNote**: Prototype có cột này với ràng buộc duy nhất và dùng đúng nó làm tiêu đề màn chi tiết.
- **qa**: - Định dạng mã giao dịch còn thiếu trong nguồn thiết kế: tiền tố cố định cộng số thứ tự; hay có thêm phần theo ngày nghiệp vụ? Cần biết để hiển thị và tìm kiếm nhất quán.
- **position**: startX=42 startY=199 endX=276 endY=294

### Item 2.2: Trường người tham gia

- **itemId**: img-007
- **itemName**: Trường người tham gia
- **nameJP**: 買出人
- **nameTrans**: Buyer participant
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Người tham gia B
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết giao cho ai; là thông tin đầu tiên hiện trường cần khi tới nơi nhận
  Thành phần hiển thị: nhãn hai ngôn ngữ và một ô chỉ đọc mang tên hiển thị
  Chức năng và logic: chỉ đọc; chỉ hiện tên; không hiện thông tin liên hệ cá nhân
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: participant
- **databaseColumn**: name
- **databaseNote**: Prototype có cột tên và quan hệ từ giao dịch sang người mua nhưng màn chi tiết giao hàng hiện không hiển thị người tham gia.
- **qa**: -
- **position**: startX=287 startY=199 endX=521 endY=294

### Item 2.3: Trường ngày nghiệp vụ của giao dịch

- **itemId**: img-008
- **itemName**: Trường ngày nghiệp vụ của giao dịch
- **nameJP**: 取引の業務日
- **nameTrans**: Transaction business date
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: date
- **required**: -
- **format**: YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 2026-09-09
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: phân biệt rõ ngày của giao dịch với ngày của từng lần giao; hai ngày này khác nhau và quyết định số vào kỳ nào
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô chỉ đọc; một chú thích phân biệt hai loại ngày
  Chức năng và logic: chỉ đọc; giá trị đến từ giao dịch cha
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: business_date
- **databaseNote**: Prototype có cột này và dùng nó để tra khoá kỳ; nhãn màn không nói rõ đây là ngày của giao dịch chứ không phải ngày của lần giao.
- **qa**: -
- **position**: startX=532 startY=199 endX=765 endY=294

### Item 2.4: Trường trạng thái giao hàng

- **itemId**: img-009
- **itemName**: Trường trạng thái giao hàng
- **nameJP**: 配送状態
- **nameTrans**: Delivery status
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: -
- **format**: một trong bốn trạng thái của FR-DEL-01
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đang giao · 配送中
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết phiếu giao hàng đang ở bước nào của vòng đời
  Thành phần hiển thị: nhãn hai ngôn ngữ; một ô chỉ đọc; một chú thích liệt bốn trạng thái
  Chức năng và logic: chỉ đọc; trạng thái là kết quả của các lần giao và của thao tác chốt hoàn tất
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery
- **databaseColumn**: status
- **databaseNote**: Prototype có đủ bốn giá trị ở tầng dữ liệu; hai đường ghi hiện có chỉ đặt được đang giao và hoàn tất.
- **qa**: -
- **position**: startX=776 startY=199 endX=1010 endY=294

### Item 2.5: Liên kết sang lô hàng

- **itemId**: img-010
- **itemName**: Liên kết sang lô hàng
- **nameJP**: ロットへのリンク
- **nameTrans**: Lot link
- **itemType**: button
- **itemSubtype**: -
- **buttonType**: text_link
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: truy ngược từ giao hàng về lô hàng gốc khi cần kiểm hàng hoá
  Thành phần hiển thị: một liên kết chữ mang mã lô hàng
  Chức năng và logic: điều hướng sang chi tiết lô hàng; không đổi dữ liệu
- **userAction**: on_click
- **transitionNote**: Mở SC-10 chi tiết lô hàng của lô đứng sau giao dịch này
- **databaseTable**: lot
- **databaseColumn**: lot_code
- **databaseNote**: Prototype có cột mã lô hàng nhưng màn chi tiết giao hàng chưa có liên kết nào sang chi tiết lô hàng.
- **qa**: -
- **position**: startX=42 startY=304 endX=163 endY=333

### Item 2.6: Liên kết sang bảng đối chiếu ngày

- **itemId**: img-011
- **itemName**: Liên kết sang bảng đối chiếu ngày
- **nameJP**: 日次照合表へのリンク
- **nameTrans**: Daily reconciliation link
- **itemType**: button
- **itemSubtype**: -
- **buttonType**: text_link
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: thoả FR-DEL-04 theo chiều từ giao hàng sang quyết toán
  Thành phần hiển thị: một liên kết chữ mang ngày nghiệp vụ
  Chức năng và logic: phải hiện ở mọi trạng thái; lúc đang đối chiếu tạm mới là lúc cần nhảy qua nhất
- **userAction**: on_click
- **transitionNote**: Mở SC-18 bảng đối chiếu của ngày nghiệp vụ tương ứng
- **databaseTable**: business_day_lock
- **databaseColumn**: business_date
- **databaseNote**: Prototype có liên kết này nhưng chỉ hiện khi ngày đã có bản ghi khoá kỳ; thiết kế đòi liên kết có ở mọi lúc.
- **qa**: -
- **position**: startX=166 startY=304 endX=359 endY=333

### Item 2.7: Liên kết sang ngoại lệ giao hàng

- **itemId**: img-012
- **itemName**: Liên kết sang ngoại lệ giao hàng
- **nameJP**: 配送例外へのリンク
- **nameTrans**: Delivery exception link
- **itemType**: button
- **itemSubtype**: -
- **buttonType**: text_link
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mở đường ghi ngoại lệ ngay từ chỗ phát hiện chênh lệch
  Thành phần hiển thị: một liên kết chữ
  Chức năng và logic: điều hướng sang màn ghi ngoại lệ; giữ ngữ cảnh phiếu giao hàng và lần giao đang xem
- **userAction**: on_click
- **transitionNote**: Mở SC-17 ghi nhận ngoại lệ giao hàng cho phiếu giao hàng đang xem
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi đường sang màn ghi ngoại lệ; prototype CHƯA TỒN TẠI bảng và route ngoại lệ nào nên liên kết này không có chỗ để trỏ tới.
- **qa**: -
- **position**: startX=363 startY=304 endX=488 endY=333

### Item 2.8: Ghi chú quan hệ hai chiều FR-DEL-04

- **itemId**: img-013
- **itemName**: Ghi chú quan hệ hai chiều FR-DEL-04
- **nameJP**: 双方向関連注記
- **nameTrans**: Bidirectional relation note
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
  Mục đích và ngữ cảnh: chốt rằng quan hệ giao hàng và quyết toán phải đi được cả hai chiều
  Thành phần hiển thị: một đoạn chú thích một dòng dẫn FR-DEL-04
  Chức năng và logic: tĩnh; là ràng buộc thiết kế cho hai màn SC-16 và SC-18
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=336 endX=1010 endY=352

### Item 3: Khối lũy kế và số lượng còn lại

- **itemId**: img-014
- **itemName**: Khối lũy kế và số lượng còn lại
- **nameJP**: 累計と残数量パネル
- **nameTrans**: Cumulative and remaining panel
- **itemType**: others
- **itemSubtype**: progress_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: thoả nghiệm thu của FR-DEL-05: với mỗi giao dịch tính được số đã giao lũy kế và số còn lại
  Thành phần hiển thị: bốn trường chỉ đọc; một sơ đồ vòng đời giao hàng một phần; một chú thích vòng lặp mở
  Chức năng và logic: chỉ đọc; lũy kế và còn lại phải luôn khớp tổng các lần giao ở bảng bên dưới
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=391 endX=1026 endY=776

### Item 3.1: Trường số lượng đặt

- **itemId**: img-015
- **itemName**: Trường số lượng đặt
- **nameJP**: 注文数量
- **nameTrans**: Ordered quantity
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: integer
- **required**: -
- **format**: số với hai chữ số thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 120.00
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mốc so sánh của cả màn: giao đủ nghĩa là bằng đúng con số này
  Thành phần hiển thị: nhãn hai ngôn ngữ và một ô chỉ đọc
  Chức năng và logic: chỉ đọc; giá trị đến từ giao dịch cha
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: qty
- **databaseNote**: Prototype có cột này với ràng buộc lớn hơn không và dùng đúng nó làm mốc so sánh khi chốt hoàn tất.
- **qa**: -
- **position**: startX=42 startY=435 endX=276 endY=530

