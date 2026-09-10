# Items Analysis - SC-12 · Danh sách và chi tiết giao dịch

## Screen context

- **screen**: SC-12 · Danh sách và chi tiết giao dịch
- **source-family**: image
- **source-token**: SC-12-danh-sach-va-chi-tiet-giao-dich
- **source-image**: .momorph/shots/SC-12-danh-sach-va-chi-tiet-giao-dich.png
- **canvas**: 1280 x 2143 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-017 (P0) · FE-016 (P1) · FE-014 (P0) · FN-04
- **requirement-refs**: FR-AITAI-01 · FR-AITAI-03 · FR-CORR-01 · FR-CORR-03 · BR-CLOSE-01 · BR-LOT-02 · FR-AUDIT-01 · NFR-PERF-01 · NFR-PERF-02
- **state-machine**: FIG-012 (RFP:637) — phủ cả 相対取引 và せり
- **actor**: ROLE-TRADE hành động; các vai đang hoạt động còn lại tra cứu
- **note**: Một mã SC- ứng hai màn con: danh sách và chi tiết
- **batch**: 1/3 (15 items)

### Item 1: Khối tiêu đề màn hình

- **itemId**: img-001
- **itemName**: Khối tiêu đề màn hình
- **nameJP**: -
- **nameTrans**: Screen header block
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
  Mục đích và ngữ cảnh: dải đầu trang định vị người dùng và khai chuỗi truy vết của màn
  Thành phần hiển thị: tiêu đề màn; một dòng meta liệt kê mã FE / FN / yêu cầu khách / state machine / actor; và hai thẻ ghi chú
  Chức năng và logic: chỉ hiển thị — không có tương tác nào trong khối này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=138

### Item 1.1: Tiêu đề màn hình

- **itemId**: img-002
- **itemName**: Tiêu đề màn hình
- **nameJP**: -
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: page_title
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: tên màn đặt ngay đầu trang
  Thành phần hiển thị: một dòng chữ đậm "SC-12 · Danh sách và chi tiết giao dịch"
  Chức năng và logic: văn bản tĩnh — không tương tác
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
- **nameJP**: -
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
  Mục đích và ngữ cảnh: chuỗi truy vết của màn theo Feature List — ba mã tính năng và các yêu cầu khách mà màn phải thoả
  Thành phần hiển thị: ba mã FE kèm ưu tiên; nhóm FN-04; danh sách mã yêu cầu khách; tham chiếu FIG-012; và actor kèm phân vai hành động so với tra cứu
  Chức năng và logic: văn bản tĩnh — các phần tách nhau bằng dấu chấm giữa
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Dòng meta này là chú thích của wireframe hay nội dung sẽ có trên màn thật? Thiết kế không khai.
  - Hai màn con dùng chung một mã SC- — trên sản phẩm thật đây là hai trang riêng hay một trang có hai khung? Ảnh vẽ chung một trang.
- **position**: startX=26 startY=60 endX=1026 endY=115

### Item 1.3: Thẻ trạng thái thi công

- **itemId**: img-004
- **itemName**: Thẻ trạng thái thi công
- **nameJP**: -
- **nameTrans**: Build status tag
- **itemType**: label
- **itemSubtype**: status_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết màn này đã có bản thi công để đối chiếu
  Thành phần hiển thị: một thẻ chữ nhỏ viền bo với chữ "Đã dựng"
  Chức năng và logic: nhãn tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=764 startY=95 endX=817 endY=115

### Item 1.4: Thẻ ghi chú gộp hai màn con

- **itemId**: img-005
- **itemName**: Thẻ ghi chú gộp hai màn con
- **nameJP**: -
- **nameTrans**: Two sub-screen note tag
- **itemType**: label
- **itemSubtype**: scope_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nhắc rằng một mã SC- ứng hai màn con vì cùng phục vụ FE-017
  Thành phần hiển thị: một thẻ chữ nhỏ với chữ "Một mã SC- ứng hai màn con"
  Chức năng và logic: nhãn tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=820 startY=95 endX=964 endY=115

### Item 2: Khung 1 — Danh sách giao dịch

- **itemId**: img-006
- **itemName**: Khung 1 — Danh sách giao dịch
- **nameJP**: -
- **nameTrans**: Transaction list frame
- **itemType**: others
- **itemSubtype**: list_frame
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: điểm vào hằng ngày của ROLE-TRADE — tra cứu và theo dõi giao dịch theo FE-017 và FR-AITAI-01 (RFP:650)
  Thành phần hiển thị: tiêu đề khung; ba bộ lọc kèm một nhóm nút; một bảng tám cột; và một dòng ghi chú về phân trang và hiệu năng
  Chức năng và logic: lọc rồi đọc danh sách; mỗi dòng có đường sang chi tiết — thao tác ghi nằm ở khung chi tiết
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: -
- **databaseNote**: Đọc thực thể giao dịch của miền D-TRADE (RFP:604) kèm tên lô hàng (D-LOT) và tên người tham gia (D-PARTY).
- **qa**: -
- **position**: startX=26 startY=154 endX=1026 endY=587

### Item 2.1: Tiêu đề khung danh sách

- **itemId**: img-007
- **itemName**: Tiêu đề khung danh sách
- **nameJP**: -
- **nameTrans**: List frame title
- **itemType**: label
- **itemSubtype**: section_title
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mở đầu khung danh sách và dẫn mã tính năng tương ứng
  Thành phần hiển thị: một dòng tiêu đề "Khung 1 — Danh sách giao dịch · FE-017"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=170 endX=1010 endY=188

### Item 2.2: Bộ lọc Ngày nghiệp vụ

- **itemId**: img-008
- **itemName**: Bộ lọc Ngày nghiệp vụ
- **nameJP**: 業務日
- **nameTrans**: Business date filter
- **itemType**: date_picker
- **itemSubtype**: date_filter
- **buttonType**: -
- **dataType**: date
- **required**: false
- **format**: YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: giá trị phải đúng định dạng ngày.
  Lỗi: "Ngày nghiệp vụ không đúng định dạng." — báo lỗi nhập tại trường; không được để thành lỗi hệ thống.
- **description**:
  Mục đích và ngữ cảnh: tiêu chí lọc chính — ngày nghiệp vụ là đơn vị của kỳ đối chiếu theo FR-SETTLE-01 (RFP:659)
  Thành phần hiển thị: nhãn tiếng Việt kèm 業務日; một ô chọn ngày; và một dòng chú thích nói rõ giá trị sai định dạng phải báo lỗi nhập
  Chức năng và logic: lọc danh sách theo ngày nghiệp vụ của bản ghi; giá trị sai định dạng bị chặn ngay tại trường chứ không đẩy xuống tầng dưới
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: business_date
- **databaseNote**: Lọc theo ngày nghiệp vụ của thực thể giao dịch trong D-TRADE — cùng khoá mà miền D-SETTLE dùng để lock kỳ.
- **qa**:
  - Ngày nghiệp vụ có giá trị mặc định là ngày đang mở khi vào màn không? Ảnh hiện một ngày cụ thể nhưng thiết kế không khai đó là mặc định.
  - Có cần lọc theo khoảng ngày cho bộ phận đối chiếu không? Thiết kế chỉ đòi một ngày.
- **position**: startX=42 startY=199 endX=276 endY=310

### Item 2.3: Bộ lọc Trạng thái

- **itemId**: img-009
- **itemName**: Bộ lọc Trạng thái
- **nameJP**: 状態
- **nameTrans**: Status filter
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: Tất cả | Nháp | Chờ xác nhận | Đã chốt | Hủy / Đính chính
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **validationNote**:
  Điều kiện: option phải phủ đủ các trạng thái của FIG-012 (RFP:637) — kể cả Chờ xác nhận nếu khách chốt là có bước duyệt.
  Lỗi: "Giá trị trạng thái không hợp lệ." — giá trị lạ phải báo lỗi; không được im lặng trả về tất cả bản ghi.
- **description**:
  Mục đích và ngữ cảnh: lọc danh sách theo chặng của vòng đời FIG-012 để theo dõi tiến độ trong ngày
  Thành phần hiển thị: nhãn tiếng Việt kèm 状態; một select với giá trị đầu Tất cả; và một dòng chú thích về tập option và cách xử lý giá trị lạ
  Chức năng và logic: tập option bám đúng FIG-012; một giá trị ngoài tập phải bị báo lỗi vì trả về tất cả trong im lặng làm người dùng tưởng đang lọc
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: status
- **databaseNote**: Lọc theo trạng thái của D-TRADE. Giá trị Chờ xác nhận của FIG-012 CHƯA TỒN TẠI trong ràng buộc trạng thái hiện có nên option này phụ thuộc quyết định của khách.
- **qa**:
  - Bộ lọc có cho chọn nhiều trạng thái cùng lúc không? Ảnh chỉ cho thấy một select đơn.
  - Nếu khách chốt là không có bước duyệt thì option Chờ xác nhận bỏ khỏi bộ lọc — có cần một đường di dữ liệu nào không? Chưa có bản ghi nào ở chặng đó.
- **position**: startX=287 startY=199 endX=521 endY=310

### Item 2.4: Bộ lọc Người mua

- **itemId**: img-010
- **itemName**: Bộ lọc Người mua
- **nameJP**: 買出人
- **nameTrans**: Buyer filter
- **itemType**: text_form
- **itemSubtype**: text_filter
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: <tên người tham gia>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: lọc theo 買出人 — phục vụ RPT-01 giao dịch theo ngày và RPT-10 theo người tham gia
  Thành phần hiển thị: nhãn tiếng Việt kèm 買出人; một ô nhập chữ; và một dòng chú thích dẫn hai báo cáo mà bộ lọc phục vụ
  Chức năng và logic: lọc danh sách theo người mua của bản ghi; là tiêu chí mà bộ phận đối chiếu và báo cáo tháng đều dùng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction; participant
- **databaseColumn**: buyer_participant_id; name
- **databaseNote**: Lọc bắc qua khoá ngoại người mua của D-TRADE sang tên của thực thể người tham gia trong D-PARTY (RFP:602).
- **qa**:
  - Ô lọc khớp chính xác tên hay khớp một phần tên? Thiết kế không khai và hai cách cho hai kết quả khác nhau.
  - Có cần lọc theo mã người tham gia thay vì theo tên để tránh trùng tên không? Thiết kế chỉ nói theo người mua.
  - Có cần lọc theo phân loại người tham gia không? FR-PARTY-01 (RFP:629) đòi bốn phân loại không được gộp.
- **position**: startX=532 startY=199 endX=765 endY=310

### Item 2.5: Nhóm nút lọc và tạo mới

- **itemId**: img-011
- **itemName**: Nhóm nút lọc và tạo mới
- **nameJP**: -
- **nameTrans**: Filter and create action group
- **itemType**: others
- **itemSubtype**: action_group
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: gom hai hành động của khung danh sách vào một chỗ cạnh các bộ lọc
  Thành phần hiển thị: hai nút xếp cạnh nhau và một dòng chú thích về điều kiện hiện nút tạo mới
  Chức năng và logic: nút "Lọc" áp bộ lọc hiện tại; nút "Tạo mới" chỉ hiện với ROLE-TRADE theo TBL-ROLE-01 (RFP:245)
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=776 startY=199 endX=1010 endY=310

### Item 2.5.1: Nút Lọc

- **itemId**: img-012
- **itemName**: Nút Lọc
- **nameJP**: -
- **nameTrans**: Apply filter button
- **itemType**: button
- **itemSubtype**: secondary_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: áp bộ lọc để thu hẹp danh sách theo tiêu chí đã nhập
  Thành phần hiển thị: một nút phụ nhãn chữ
  Chức năng và logic: gửi ba tiêu chí lọc và tải lại bảng; giá trị lọc sai định dạng bị chặn trước khi gửi
- **userAction**: on_click
- **transitionNote**: Áp ba bộ lọc hiện tại và tải lại danh sách trên cùng màn. NFR-PERF-01 (RFP:807) đòi tìm kiếm thông thường p95 không vượt 2 giây.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Bộ lọc có tự áp khi người dùng đổi giá trị hay chỉ áp khi bấm nút? Ảnh có nút riêng nên nghiêng về bấm nút.
  - Tiêu chí lọc đang áp có được giữ lại khi quay về từ màn chi tiết không? Thiết kế không khai.
- **position**: startX=776 startY=219 endX=822 endY=248

### Item 2.5.2: Nút Tạo mới

- **itemId**: img-013
- **itemName**: Nút Tạo mới
- **nameJP**: -
- **nameTrans**: Create new button
- **itemType**: button
- **itemSubtype**: primary_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: Điều kiện: chỉ hiện với ROLE-TRADE — TBL-ROLE-01 (RFP:245) giao việc chốt giao dịch cho vai này.
- **description**:
  Mục đích và ngữ cảnh: đường vào màn tạo giao dịch mới cho vai được ghi
  Thành phần hiển thị: một nút chính nhãn chữ
  Chức năng và logic: điều hướng sang SC-11; các vai còn lại không thấy nút này và mục thao tác đổi thành chỉ dẫn
- **userAction**: on_click
- **transitionNote**: Dẫn sang SC-11 để tạo giao dịch 相対取引 mới. Chỉ hiện với ROLE-TRADE.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Với vai không được ghi thì nút biến mất hoàn toàn hay hiện ở dạng tắt kèm chỉ dẫn? Thiết kế nói chỉ hiện với ROLE-TRADE.
  - Sau khi tạo xong ở SC-11 thì quay lại danh sách với bộ lọc cũ hay danh sách mặc định? Thiết kế không khai.
- **position**: startX=825 startY=219 endX=895 endY=248

### Item 2.6: Bảng danh sách giao dịch

- **itemId**: img-014
- **itemName**: Bảng danh sách giao dịch
- **nameJP**: -
- **nameTrans**: Transaction list table
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
  Mục đích và ngữ cảnh: danh sách giao dịch của kỳ đang lọc — thoả FE-017 tra cứu và theo dõi trạng thái theo FIG-012
  Thành phần hiển thị: bảng tám cột song ngữ: Mã giao dịch 取引番号; Lô hàng ロット; Người mua 買出人; Số lượng 数量; Đơn giá 単価; Ngày nghiệp vụ 業務日; Trạng thái 状態; Thao tác 操作 — bốn dòng mẫu phủ bốn chặng của FIG-012
  Chức năng và logic: mã lô luôn hiện dạng người đọc được chứ không phải khoá nội bộ; cột trạng thái hiện chặng của bản ghi kèm thẻ [CHƯA CHỐT] ở chặng Chờ xác nhận; cột thao tác chỉ bật nút ghi cho ROLE-TRADE
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction; lot; participant
- **databaseColumn**: txn_code; lot_id; buyer_participant_id; qty; unit_price; business_date; status
- **databaseNote**: Đọc thực thể giao dịch của D-TRADE và lấy mã lô của D-LOT cùng tên người tham gia của D-PARTY để hiện dạng người đọc được.
- **qa**:
  - Bảng sắp theo tiêu chí nào khi không có yêu cầu sắp riêng? Thiết kế không khai.
  - Các cột có sắp xếp được bằng cách bấm tiêu đề không? Ảnh không có dấu hiệu sắp xếp.
  - Ở ngày cao điểm 1.200 giao dịch (FIG-LOAD-01 · RFP:829) thì phân trang hay tải thêm? Ghi chú dưới bảng chỉ nói phải có một trong hai.
- **position**: startX=42 startY=320 endX=1010 endY=524

### Item 2.6.1: Nút Xem trên dòng (đại diện)

- **itemId**: img-015
- **itemName**: Nút Xem trên dòng (đại diện)
- **nameJP**: -
- **nameTrans**: Row view button (representative)
- **itemType**: button
- **itemSubtype**: row_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đường vào chi tiết của một giao dịch — nút này lặp trên mọi dòng nên chỉ đặc tả một lần
  Thành phần hiển thị: một nút phụ nhãn chữ "Xem" trong ô Thao tác của dòng đầu tiên
  Chức năng và logic: lặp trên bốn dòng của bảng; chỉ khác bản ghi đích nên gộp thành một thành phần đại diện
- **userAction**: on_click
- **transitionNote**: Mở khung chi tiết của giao dịch trên dòng đó. Có mặt trên mọi dòng và với mọi vai vì tra cứu mở cho các vai đang hoạt động.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Bấm vào mã giao dịch có mở chi tiết được như nút Xem không? Ảnh chỉ vẽ nút.
  - Chi tiết mở trên cùng trang hay trang riêng? Ảnh vẽ hai khung trên một trang.
- **position**: startX=872 startY=369 endX=923 endY=398

