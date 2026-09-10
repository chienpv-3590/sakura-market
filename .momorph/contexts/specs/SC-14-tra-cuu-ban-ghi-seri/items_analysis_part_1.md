# Items Analysis - SC-14 · Tra cứu bản ghi せり

## Screen context

- **screen**: SC-14 · Tra cứu bản ghi せり
- **source-family**: image
- **source-token**: SC-14-tra-cuu-ban-ghi-seri
- **source-image**: .momorph/shots/SC-14-tra-cuu-ban-ghi-seri.png
- **canvas**: 1280 x 2224 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-019 (FN-05) · ưu tiên P1
- **requirement-refs**: FR-SERI-03 · kế thừa FR-SERI-02 · FR-SERI-01 · FR-AUDIT-01 · FR-CORR-03 · BR-CLOSE-01 · FR-LOT-03 · BR-LOT-02 · FR-PARTY-02 · NFR-PERF-01
- **state-machine**: FIG-012 (RFP:637) — phủ cả bản ghi せり; cách ánh xạ còn [CHƯA CHỐT]
- **actor**: Bộ phận đối chiếu (ROLE-SETTLEMENT) và ROLE-TRADE
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
  Thành phần hiển thị: tiêu đề màn; một dòng meta liệt kê mã FE / FN / yêu cầu khách kèm nghiệm thu / actor; và hai thẻ ghi chú
  Chức năng và logic: chỉ hiển thị — không có tương tác nào trong khối này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=174

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
  Thành phần hiển thị: một dòng chữ đậm "SC-14 · Tra cứu bản ghi せり"
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
  Mục đích và ngữ cảnh: chuỗi truy vết của màn — dẫn nguyên văn FR-SERI-03 (RFP:655) cùng nghiệm thu của nó
  Thành phần hiển thị: mã FE-019 và nhóm FN-05; ưu tiên P1; nguyên văn FR-SERI-03 kèm nghiệm thu "tra cứu lại được before/after và lý do chỉnh sửa"; các yêu cầu kế thừa; và actor gồm hai vai
  Chức năng và logic: văn bản tĩnh — nghiệm thu trong dòng này là điều kiện đóng của cả màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Dòng meta này là chú thích của wireframe hay nội dung sẽ có trên màn thật? Thiết kế không khai.
  - Hai màn con dùng chung một mã SC- — trên sản phẩm thật đây là hai trang riêng hay một trang có hai khung? Ảnh vẽ chung một trang.
- **position**: startX=26 startY=60 endX=1026 endY=151

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
- **position**: startX=568 startY=131 endX=621 endY=151

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
  Mục đích và ngữ cảnh: nhắc rằng một mã SC- ứng hai màn con vì cùng phục vụ FE-019
  Thành phần hiển thị: một thẻ chữ nhỏ với chữ "Một mã SC- ứng hai màn con"
  Chức năng và logic: nhãn tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=624 startY=131 endX=768 endY=151

### Item 2: Khung 1 — Danh sách kết quả せり

- **itemId**: img-006
- **itemName**: Khung 1 — Danh sách kết quả せり
- **nameJP**: -
- **nameTrans**: Seri result list frame
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
  Mục đích và ngữ cảnh: tra cứu lại bản ghi せり theo lô hàng; kỳ hoặc người thắng — nửa đầu của FR-SERI-03 (RFP:655)
  Thành phần hiển thị: tiêu đề khung; ba tiêu chí tìm kiếm kèm một nhóm nút; một bảng chín cột; và một dòng ghi chú về cột bắt buộc và hiệu năng
  Chức năng và logic: tìm rồi đọc danh sách; mỗi dòng có đường sang chi tiết — thao tác sửa nằm ở khung chi tiết
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Đọc thực thể kết quả đấu giá của miền D-TRADE (RFP:604) kèm mã lô (D-LOT) và tên người tham gia (D-PARTY).
- **qa**: -
- **position**: startX=26 startY=190 endX=1026 endY=558

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
  Mục đích và ngữ cảnh: mở đầu khung danh sách
  Thành phần hiển thị: một dòng tiêu đề "Khung 1 — Danh sách kết quả せり"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=206 endX=1010 endY=223

### Item 2.2: Tiêu chí tìm Mã lô hàng

- **itemId**: img-008
- **itemName**: Tiêu chí tìm Mã lô hàng
- **nameJP**: ロット番号
- **nameTrans**: Lot code search input
- **itemType**: text_form
- **itemSubtype**: text_filter
- **buttonType**: -
- **dataType**: string
- **required**: false
- **format**: LOT-<NNNN> hoặc một phần của mã
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: tìm được cả khi nhập MỘT PHẦN mã — thiếu một ký tự không được ra rỗng mà không có lời giải thích.
  Lỗi: "Không có bản ghi nào khớp mã lô đã nhập." — nêu rõ tiêu chí đang áp thay vì một danh sách rỗng im lặng.
- **description**:
  Mục đích và ngữ cảnh: tìm bản ghi theo mã lô — lô là cái định danh bản ghi kết quả せり
  Thành phần hiển thị: nhãn tiếng Việt kèm ロット番号; một ô nhập chữ; và một dòng chú thích nói rõ phải khớp được một phần mã
  Chức năng và logic: khớp một phần mã chứ không khớp chính xác; khi không có kết quả thì màn phải nói rõ tiêu chí đang áp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result; lot
- **databaseColumn**: lot_id; lot_code
- **databaseNote**: Tìm bắc qua khoá ngoại lô của D-TRADE sang mã lô của thực thể lô hàng trong D-LOT.
- **qa**:
  - Khớp một phần mã có phân biệt hoa thường không? Thiết kế không khai.
  - Có cần chặn ký tự đại diện để một ký tự phần trăm không khớp toàn bộ danh sách không? Thiết kế không khai.
- **position**: startX=42 startY=234 endX=276 endY=345

### Item 2.3: Tiêu chí tìm Ngày nghiệp vụ

- **itemId**: img-009
- **itemName**: Tiêu chí tìm Ngày nghiệp vụ
- **nameJP**: 業務日
- **nameTrans**: Business date search input
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
  Mục đích và ngữ cảnh: tiêu chí của bộ phận đối chiếu — bản ghi thuộc kỳ nào theo FR-SETTLE-01 (RFP:659)
  Thành phần hiển thị: nhãn tiếng Việt kèm 業務日; một ô chọn ngày; và một dòng chú thích nói rõ sai định dạng phải báo lỗi nhập
  Chức năng và logic: lọc theo ngày nghiệp vụ của bản ghi; vì là tiêu chí lọc nên ngày nghiệp vụ BẮT BUỘC phải có mặt trong cột của bảng kết quả
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: business_date
- **databaseNote**: Lọc theo ngày nghiệp vụ của D-TRADE — cùng khoá mà miền D-SETTLE (RFP:606) dùng để lock kỳ.
- **qa**:
  - Có cần tìm theo khoảng ngày cho bộ phận đối chiếu không? Thiết kế chỉ đòi một ngày.
  - Ngày nghiệp vụ có giá trị mặc định khi vào màn không? Ảnh hiện một ngày cụ thể nhưng thiết kế không khai đó là mặc định.
- **position**: startX=287 startY=234 endX=521 endY=345

### Item 2.4: Tiêu chí tìm Người thắng

- **itemId**: img-010
- **itemName**: Tiêu chí tìm Người thắng
- **nameJP**: 落札者
- **nameTrans**: Winner search input
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
  Mục đích và ngữ cảnh: tìm theo người thắng — phục vụ RPT-10 theo người tham gia và RPT-11 theo loại giao dịch
  Thành phần hiển thị: nhãn tiếng Việt kèm 落札者; một ô nhập chữ; và một dòng chú thích dẫn hai báo cáo mà tiêu chí này phục vụ
  Chức năng và logic: lọc danh sách theo người thắng của bản ghi; là tiêu chí mà báo cáo tháng dựa vào
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result; participant
- **databaseColumn**: winner_participant_id; name
- **databaseNote**: Tìm bắc qua khoá ngoại người thắng của D-TRADE sang tên của thực thể người tham gia trong D-PARTY (RFP:602).
- **qa**:
  - Ô tìm khớp chính xác tên hay khớp một phần tên? Thiết kế không khai và hai cách cho hai kết quả khác nhau.
  - Có cần chặn ký tự đại diện trong ô này không? Thiết kế không khai.
  - Có cần tìm theo mã người tham gia thay vì theo tên để tránh trùng tên không?
- **position**: startX=532 startY=234 endX=765 endY=345

### Item 2.5: Nhóm nút tìm và nhập mới

- **itemId**: img-011
- **itemName**: Nhóm nút tìm và nhập mới
- **nameJP**: -
- **nameTrans**: Search and create action group
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
  Mục đích và ngữ cảnh: gom hai hành động của khung danh sách vào một chỗ cạnh các tiêu chí tìm
  Thành phần hiển thị: hai nút xếp cạnh nhau và một dòng chú thích về điều kiện hiện nút nhập mới
  Chức năng và logic: nút "Tìm" áp ba tiêu chí hiện tại; nút "Nhập kết quả せり" chỉ hiện với ROLE-TRADE theo TBL-ROLE-01 (RFP:245)
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=776 startY=234 endX=1010 endY=345

### Item 2.5.1: Nút Tìm

- **itemId**: img-012
- **itemName**: Nút Tìm
- **nameJP**: -
- **nameTrans**: Search button
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
  Mục đích và ngữ cảnh: áp tiêu chí tìm để thu hẹp danh sách
  Thành phần hiển thị: một nút phụ nhãn chữ
  Chức năng và logic: gửi ba tiêu chí và tải lại bảng; giá trị sai định dạng bị chặn trước khi gửi
- **userAction**: on_click
- **transitionNote**: Áp ba tiêu chí tìm hiện tại và tải lại danh sách trên cùng màn. NFR-PERF-01 (RFP:807) đòi tìm kiếm thông thường p95 không vượt 2 giây.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Tiêu chí tìm đang áp có được giữ lại khi quay về từ màn chi tiết không? Thiết kế không khai.
- **position**: startX=776 startY=254 endX=823 endY=283

### Item 2.5.2: Nút Nhập kết quả せり

- **itemId**: img-013
- **itemName**: Nút Nhập kết quả せり
- **nameJP**: -
- **nameTrans**: Create seri result button
- **itemType**: button
- **itemSubtype**: primary_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: Điều kiện: chỉ hiện với ROLE-TRADE — ROLE-SETTLEMENT sửa được bản ghi đã có nhưng KHÔNG tạo mới được.
- **description**:
  Mục đích và ngữ cảnh: đường vào màn nhập kết quả mới cho vai được ghi
  Thành phần hiển thị: một nút chính nhãn chữ
  Chức năng và logic: điều hướng sang SC-13; ROLE-SETTLEMENT và các vai còn lại không thấy nút này và mục đó đổi thành chỉ dẫn
- **userAction**: on_click
- **transitionNote**: Dẫn sang SC-13 để nhập một kết quả せり mới. Chỉ hiện với ROLE-TRADE.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Với ROLE-SETTLEMENT thì nút biến mất hoàn toàn hay hiện ở dạng tắt kèm chỉ dẫn? Thiết kế nói đổi thành chỉ dẫn ở màn kề.
- **position**: startX=827 startY=254 endX=950 endY=283

### Item 2.6: Bảng danh sách kết quả せり

- **itemId**: img-014
- **itemName**: Bảng danh sách kết quả せり
- **nameJP**: -
- **nameTrans**: Seri result list table
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
  Mục đích và ngữ cảnh: danh sách bản ghi せり khớp tiêu chí tìm — nửa tra cứu của FR-SERI-03 (RFP:655)
  Thành phần hiển thị: bảng chín cột song ngữ: Lô hàng ロット; Người thắng 落札者; Số lượng 数量; Đơn giá 単価; Thời điểm quyết định 決定時刻; Ngày nghiệp vụ 業務日; Trạng thái 状態; Đã sửa 修正; Thao tác 操作 — hai dòng mẫu
  Chức năng và logic: cột Ngày nghiệp vụ bắt buộc có vì nó là tiêu chí lọc; cột Trạng thái gắn thẻ [CHƯA CHỐT] vì cách ánh xạ FIG-012 lên bản ghi せり còn chờ khách chốt; cột Đã sửa là đường vào tự nhiên của FR-SERI-03
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result; lot; participant
- **databaseColumn**: lot_id; winner_participant_id; qty; unit_price; decided_at; business_date
- **databaseNote**: Đọc thực thể kết quả đấu giá của D-TRADE kèm mã lô của D-LOT và tên người tham gia của D-PARTY. Cột Trạng thái chưa có nguồn dữ liệu vì thực thể hiện có KHÔNG CÓ cột trạng thái nào.
- **qa**:
  - Cột Đã sửa đếm số lần sửa hay chỉ đánh dấu có hay không? Ảnh hiện số lần nên nghiêng về đếm.
  - Bảng sắp theo tiêu chí nào khi không có yêu cầu sắp riêng? Thiết kế không khai.
  - Khi một lô có hai bản ghi せり thì màn cảnh báo trùng ở đâu? Thiết kế đòi mỗi lô đúng một kết quả nhưng không khai chỗ hiển thị cảnh báo.
- **position**: startX=42 startY=355 endX=1010 endY=480

### Item 2.6.1: Nút Xem chi tiết trên dòng (đại diện)

- **itemId**: img-015
- **itemName**: Nút Xem chi tiết trên dòng (đại diện)
- **nameJP**: -
- **nameTrans**: Row detail button (representative)
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
  Mục đích và ngữ cảnh: đường vào chi tiết của một bản ghi — nút này lặp trên mọi dòng nên chỉ đặc tả một lần
  Thành phần hiển thị: một nút phụ nhãn chữ "Xem chi tiết" trong ô Thao tác của dòng đầu tiên
  Chức năng và logic: lặp trên hai dòng của bảng; chỉ khác bản ghi đích nên gộp thành một thành phần đại diện
- **userAction**: on_click
- **transitionNote**: Mở khung chi tiết của bản ghi せり trên dòng đó. Có mặt trên mọi dòng và với mọi vai vì tra cứu mở cho các vai đang hoạt động.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Chi tiết mở trên cùng trang hay trang riêng? Ảnh vẽ hai khung trên một trang.
- **position**: startX=899 startY=405 endX=987 endY=434

