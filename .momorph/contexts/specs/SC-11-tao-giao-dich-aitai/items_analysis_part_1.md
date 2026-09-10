# Items Analysis - SC-11 · Tạo giao dịch 相対取引

## Screen context

- **screen**: SC-11 · Tạo giao dịch 相対取引
- **source-family**: image
- **source-token**: SC-11-tao-giao-dich-aitai
- **source-image**: .momorph/shots/SC-11-tao-giao-dich-aitai.png
- **canvas**: 1280 x 2061 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-014 · FE-015 · FE-007 (FN-04 và FN-02) · ưu tiên P0
- **requirement-refs**: FR-AITAI-01 · FR-AITAI-02 · FR-PARTY-02 · BR-PERM-01 · BR-LOT-02 · FR-LOT-03 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01 · NFR-PERF-02
- **state-machine**: FIG-012 (RFP:637) — phủ cả 相対取引 và せり
- **actor**: Vận hành giao dịch (ROLE-TRADE)
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
  Mục đích và ngữ cảnh: dải đầu trang định vị người dùng — cho biết đang ở màn nào; màn thoả tính năng nào và vai nào được ghi
  Thành phần hiển thị: tiêu đề màn; một dòng meta liệt kê mã FE / FN / ưu tiên / yêu cầu khách / actor; và hai thẻ ghi chú
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
  Thành phần hiển thị: một dòng chữ đậm gồm mã màn SC-11 và tên màn tiếng Việt kèm 相対取引
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
  Mục đích và ngữ cảnh: chuỗi truy vết của màn theo Feature List — người đọc spec biết màn này phải thoả điều gì
  Thành phần hiển thị: ba mã FE (FE-014 · FE-015 · FE-007); nhóm FN-04 và FN-02; ưu tiên P0; danh sách mã yêu cầu khách; và actor kèm vai ROLE-TRADE
  Chức năng và logic: văn bản tĩnh — các phần tách nhau bằng dấu chấm giữa
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Dòng meta này là chú thích của wireframe hay là nội dung sẽ có trên màn thật? Thiết kế không khai.
  - Nếu giữ trên màn thật thì các mã yêu cầu có cần dẫn được sang tài liệu tương ứng không?
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
- **position**: startX=448 startY=95 endX=500 endY=115

### Item 1.4: Thẻ ghi chú trọng số nghiệp vụ

- **itemId**: img-005
- **itemName**: Thẻ ghi chú trọng số nghiệp vụ
- **nameJP**: -
- **nameTrans**: Business weight note tag
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
  Mục đích và ngữ cảnh: nhắc trọng số nghiệp vụ của luồng — FN-04 là luồng chính của chợ nên màn này nằm trên đường nóng nhất
  Thành phần hiển thị: một thẻ chữ nhỏ với chữ "FN-04 gánh ~90% giá trị giao dịch của chợ"
  Chức năng và logic: nhãn tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=503 startY=95 endX=707 endY=115

### Item 2: Khối form nhập giao dịch

- **itemId**: img-006
- **itemName**: Khối form nhập giao dịch
- **nameJP**: -
- **nameTrans**: Transaction input form section
- **itemType**: others
- **itemSubtype**: form_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: toàn bộ phần nhập tay của màn — bốn trường mà FR-AITAI-01 đòi cho một giao dịch 相対取引
  Thành phần hiển thị: tiêu đề khối; bốn trường xếp hai cột mỗi trường kèm một dòng chú thích quy tắc; và hai nút gửi kèm một thẻ ghi chú
  Chức năng và logic: người vận hành nhập bốn trường rồi gửi — thiết kế đặt hai cửa kiểm của FE-015 ở bước chốt chứ không ở bước nhập; NFR-USE-01 đòi luồng chốt giao dịch dùng được bằng bàn phím
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: -
- **databaseNote**: Bốn trường của khối ghi vào thực thể giao dịch của miền D-TRADE (RFP:604). Ba trường do hệ thống gán nằm ở khối kế tiếp.
- **qa**: -
- **position**: startX=26 startY=154 endX=1026 endY=467

### Item 2.1: Tiêu đề khối form nhập

- **itemId**: img-007
- **itemName**: Tiêu đề khối form nhập
- **nameJP**: -
- **nameTrans**: Input form section title
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
  Mục đích và ngữ cảnh: nói rõ khối này chứa đúng các trường mà yêu cầu khách đòi — không thêm trường ngoài phạm vi
  Thành phần hiển thị: một dòng tiêu đề "Form nhập — các trường FR-AITAI-01 đòi"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=170 endX=1010 endY=188

### Item 2.2: Trường Lô hàng

- **itemId**: img-008
- **itemName**: Trường Lô hàng
- **nameJP**: ロット
- **nameTrans**: Lot selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: LOT-<NNNN> — <tên mặt hàng>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: option chỉ gồm lô đang ở chặng bán được của FIG-011 (RFP:616) và còn số lượng khả dụng.
  Điều kiện: ràng buộc số lượng khả dụng của BR-LOT-02 (RFP:596) đánh giá ở bước chốt — không ở bước nhập.
  Lỗi: "Không có lô hàng nào đang ở chặng bán được." — khi danh sách rỗng thì khối form nhường chỗ cho trạng thái rỗng.
- **description**:
  Mục đích và ngữ cảnh: chọn lô hàng đang bán — lô là gốc truy vết của cả giao dịch theo FR-LOT-01 (RFP:632)
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện mã lô và tên mặt hàng; và một dòng chú thích quy tắc chọn lô
  Chức năng và logic: danh sách chỉ nhận lô ở chặng bán được của FIG-011 còn số lượng khả dụng; mã lô luôn hiện dạng người đọc được chứ không phải khoá nội bộ
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: lot_id
- **databaseNote**: Khoá ngoại tới thực thể lô hàng của miền D-LOT (RFP:603). Thiết kế đòi số lượng khả dụng của lô là tồn dùng chung cho cả hai kênh bán.
- **qa**:
  - Option có cần hiện số lượng khả dụng còn lại để người nhập tự cân số lượng trước khi chốt không? Thiết kế chỉ đòi lô ở chặng bán được.
  - Khi lô đang chọn bị bán hết bởi người khác trong lúc form còn mở thì màn tự làm mới danh sách hay chỉ báo lỗi ở bước chốt?
  - Danh sách lô dài thì select có ô tìm theo mã lô không? Ảnh chỉ cho thấy một select thường.
- **position**: startX=42 startY=199 endX=521 endY=294

### Item 2.3: Trường Người mua

- **itemId**: img-009
- **itemName**: Trường Người mua
- **nameJP**: 買出人
- **nameTrans**: Buyer selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: <tên người tham gia>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: option chỉ gồm người tham gia đúng phân loại 買出人 của FR-PARTY-01 (RFP:629) — không gộp với ba phân loại còn lại.
  Điều kiện: danh sách KHÔNG lọc theo hiệu lực — BR-PERM-01 (RFP:595) đòi kiểm 許可/承認 tại thời điểm giao dịch nên cửa hiệu lực đặt ở bước chốt.
  Lỗi: "Người tham gia A đã mất hiệu lực từ <ngày>; không thể chốt giao dịch." — phát sinh ở bước chốt theo FR-PARTY-02 (RFP:630).
- **description**:
  Mục đích và ngữ cảnh: chọn 買出人 của giao dịch — một trong bốn trường FR-AITAI-01 (RFP:650) đòi
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select hiện tên người tham gia; và một dòng chú thích nói rõ vì sao danh sách không lọc hiệu lực
  Chức năng và logic: chỉ nhận đúng phân loại 買出人; hiệu lực 許可/承認 được kiểm ở bước chốt chứ không ở bước nhập nên một người còn hiệu lực lúc nhập vẫn có thể bị từ chối lúc chốt
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: buyer_participant_id
- **databaseNote**: Khoá ngoại tới thực thể người tham gia của miền D-PARTY (RFP:602). Bốn phân loại người tham gia là ràng buộc dữ liệu của FR-PARTY-01 và không được gộp.
- **qa**:
  - Người tham gia đã mất hiệu lực vẫn nằm trong danh sách theo thiết kế — có cần đánh dấu trên option để người nhập biết trước rằng bước chốt sẽ bị từ chối không?
  - Danh sách người tham gia dài thì select có tìm theo tên hoặc mã không? Thiết kế không khai.
  - Option có cần hiện phân loại người tham gia để người nhập tự kiểm là đúng 買出人 không?
- **position**: startX=532 startY=199 endX=1010 endY=294

### Item 2.4: Trường Số lượng

- **itemId**: img-010
- **itemName**: Trường Số lượng
- **nameJP**: 数量
- **nameTrans**: Quantity input
- **itemType**: text_form
- **itemSubtype**: number_input
- **buttonType**: -
- **dataType**: number
- **required**: true
- **format**: <số> với dấu phẩy thập phân — ảnh cho thấy 2 chữ số lẻ
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: cùng đơn vị đo với số lượng ban đầu của lô theo FR-LOT-01 (RFP:632).
  Điều kiện: không được làm số lượng khả dụng của lô bị âm — BR-LOT-02 (RFP:596); FR-LOT-03 (RFP:634) đòi kiểm trước khi cho phép giao dịch.
  Lỗi: "LOT-0001 chỉ còn 80;00 khả dụng; giao dịch cần 120;00." — từ chối chốt và không trừ số lượng theo FR-AITAI-02 (RFP:651).
- **description**:
  Mục đích và ngữ cảnh: số lượng đã thống nhất tại quầy — một trong bốn trường FR-AITAI-01 đòi
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập số; và một dòng chú thích nói rõ đơn vị đo và ràng buộc không âm
  Chức năng và logic: giá trị dùng để trừ số lượng khả dụng của lô ở bước chốt; cửa số lượng đánh giá tại bước chốt nên bước nhập không so với số khả dụng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: qty
- **databaseNote**: Số lượng của giao dịch trong miền D-TRADE. Trừ vào số lượng khả dụng của thực thể lô hàng (D-LOT) khi chốt — BR-LOT-02 đòi truy vết được tới lịch sử điều chỉnh.
- **qa**:
  - Đơn vị đo có hiện cạnh ô nhập không? Thiết kế chỉ nói cùng đơn vị với số lượng ban đầu của lô.
  - Số chữ số thập phân tối đa là bao nhiêu? Ảnh cho thấy hai chữ số nhưng thiết kế không khai ngưỡng.
  - Ô nhập có hiện số khả dụng của lô đang chọn để người nhập biết mình đang vượt tồn không? Ảnh không có thành phần nào cho việc đó.
- **position**: startX=42 startY=304 endX=521 endY=399

### Item 2.5: Trường Đơn giá

- **itemId**: img-011
- **itemName**: Trường Đơn giá
- **nameJP**: 単価 (JPY)
- **nameTrans**: Unit price input
- **itemType**: text_form
- **itemSubtype**: number_input
- **buttonType**: -
- **dataType**: integer
- **required**: true
- **format**: <số nguyên JPY> — không có phần thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  Điều kiện: JPY không có phần thập phân nên chỉ nhận số nguyên.
  Điều kiện: giá đã thống nhất giữa hai bên — màn không tính giá hộ.
- **description**:
  Mục đích và ngữ cảnh: đơn giá đã thống nhất giữa hai bên — một trong bốn trường FR-AITAI-01 đòi
  Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập số nguyên; và một dòng chú thích nói rõ JPY không có phần thập phân
  Chức năng và logic: chỉ nhận số nguyên JPY; màn không suy ra giá từ nguồn nào khác — giá là kết quả thoả thuận ngoài hệ thống
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: unit_price
- **databaseNote**: Đơn giá của giao dịch trong miền D-TRADE. Đơn vị JPY và không có phần thập phân là ràng buộc dữ liệu.
- **qa**:
  - Ô nhập có tự định dạng nhóm nghìn khi gõ như giá trị 1 800 trong ảnh hay chỉ nhận số trần?
  - Có cần hiện tổng tiền tạm tính bằng số lượng nhân đơn giá để người nhập soát lại trước khi gửi không? Thiết kế không đòi.
  - Có ngưỡng trên nào cho đơn giá cần cảnh báo nhập sai không? Thiết kế không khai.
- **position**: startX=532 startY=304 endX=1010 endY=399

### Item 2.6: Nút Tạo nháp

- **itemId**: img-012
- **itemName**: Nút Tạo nháp
- **nameJP**: -
- **nameTrans**: Create draft button
- **itemType**: button
- **itemSubtype**: primary_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: cả bốn trường bắt buộc phải có giá trị.
  Điều kiện: khi đang gửi thì khoá form và chặn gửi trùng.
  Điều kiện: ngày nghiệp vụ chưa lock — FR-CORR-03 (RFP:658) và BR-CLOSE-01 (RFP:597) không cho ghi vào ngày đã lock.
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock; không thể ghi bản ghi mới." — mọi lần thử đều bị chặn và có log.
- **description**:
  Mục đích và ngữ cảnh: tạo bản ghi giao dịch ở chặng đầu của vòng đời để giữ dấu vết trước khi chốt
  Thành phần hiển thị: một nút chính nhãn chữ
  Chức năng và logic: gửi bốn trường của khối; hệ thống gán mã giao dịch — ngày nghiệp vụ — trạng thái đầu và kênh; ghi logical audit theo FR-AUDIT-01 (RFP:710) với chủ thể và timestamp
- **userAction**: on_click
- **transitionNote**: Tạo một bản ghi giao dịch ở trạng thái Nháp · 下書き — giá trị đầu của vòng đời FIG-012. Không trừ số lượng khả dụng và không kiểm hiệu lực người mua ở bước này.
- **databaseTable**: transaction
- **databaseColumn**: lot_id; buyer_participant_id; qty; unit_price; txn_code; business_date; status
- **databaseNote**: Ghi một bản ghi mới vào thực thể giao dịch của D-TRADE: bốn cột đầu lấy từ form; ba cột sau do hệ thống gán. Kèm một bản ghi audit của miền truy vết (FR-AUDIT-01).
- **qa**:
  - Sau khi tạo nháp thành công màn ở lại form hay điều hướng sang chi tiết giao dịch ở SC-12? Thiết kế không khai.
  - Bốn trường có được giữ lại giá trị vừa nhập khi gửi thất bại không? Thiết kế không khai.
  - Thứ tự Tab và phím Enter có gửi form được không? NFR-USE-01 (RFP:816) đòi luồng chốt giao dịch dùng được bằng bàn phím nhưng màn chưa khai thứ tự Tab.
- **position**: startX=42 startY=422 endX=117 endY=451

### Item 2.7: Nút Tạo nháp và gửi xác nhận

- **itemId**: img-013
- **itemName**: Nút Tạo nháp và gửi xác nhận
- **nameJP**: -
- **nameTrans**: Create draft and submit button
- **itemType**: button
- **itemSubtype**: secondary_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: giống nút Tạo nháp về bốn trường bắt buộc và về ngày nghiệp vụ chưa lock.
  Điều kiện: chỉ có nghĩa nếu vòng đời thật sự có chặng Chờ xác nhận — FIG-012 (RFP:637) có chặng này nhưng FR-AITAI-01 (RFP:650); FR-AITAI-02 (RFP:651); FE-014 và FE-015 không nhắc bước phê duyệt nào.
- **description**:
  Mục đích và ngữ cảnh: gộp tạo bản ghi với sự kiện gửi của FIG-012 để bản ghi đi thẳng vào hàng chờ xác nhận
  Thành phần hiển thị: một nút phụ nhãn chữ đặt cạnh nút chính
  Chức năng và logic: chỉ tồn tại khi khách chốt là vòng đời có bước phê duyệt — thẻ ghi chú bên cạnh nói rõ nút này phụ thuộc mục [CHƯA CHỐT] của khối vòng đời
- **userAction**: on_click
- **transitionNote**: Tạo bản ghi rồi phát sự kiện gửi của FIG-012 để chuyển Nháp · 下書き sang Chờ xác nhận. Cạnh này phụ thuộc mục [CHƯA CHỐT] ở khối vòng đời.
- **databaseTable**: transaction
- **databaseColumn**: status
- **databaseNote**: Đặt trạng thái sang Chờ xác nhận của FIG-012. Giá trị này CHƯA TỒN TẠI trong ràng buộc trạng thái hiện có của thực thể giao dịch — thiết kế đòi thêm giá trị vào tập hợp lệ.
- **qa**:
  - Nút này chỉ có nghĩa nếu khách chốt là có bước phê duyệt — nếu khách chốt là không thì nút bỏ hay giữ?
  - Nếu có bước phê duyệt thì vai nào được duyệt? TBL-ROLE-01 (RFP:245) chưa có vai nào ghi trách nhiệm này.
  - Có SLA duyệt không? Luồng gánh ~90% giá trị giao dịch nên chờ duyệt quá lâu là rủi ro vận hành.
- **position**: startX=121 startY=422 endX=278 endY=451

### Item 2.8: Thẻ ghi chú phụ thuộc mục chưa chốt

- **itemId**: img-014
- **itemName**: Thẻ ghi chú phụ thuộc mục chưa chốt
- **nameJP**: -
- **nameTrans**: Open decision dependency tag
- **itemType**: label
- **itemSubtype**: note_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cảnh báo ngay tại chỗ rằng nút thứ hai chưa được chốt về phạm vi
  Thành phần hiển thị: một thẻ chữ nhỏ với chữ "nút thứ hai phụ thuộc mục [CHƯA CHỐT] ở khối vòng đời"
  Chức năng và logic: nhãn tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=282 startY=427 endX=551 endY=447

### Item 3: Khối trường hệ thống gán

- **itemId**: img-015
- **itemName**: Khối trường hệ thống gán
- **nameJP**: -
- **nameTrans**: System-assigned field section
- **itemType**: others
- **itemSubtype**: readonly_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: bốn giá trị hệ thống tự quyết — nêu tường minh để người vận hành không đi tìm chỗ nhập
  Thành phần hiển thị: tiêu đề khối và bốn trường chỉ đọc xếp một hàng: mã giao dịch; ngày nghiệp vụ; trạng thái; kênh
  Chức năng và logic: chỉ hiển thị — không nhận giá trị từ người dùng ở bất kỳ trường nào trong khối
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: -
- **databaseNote**: Bốn cột do hệ thống gán trên thực thể giao dịch của miền D-TRADE (RFP:604).
- **qa**: -
- **position**: startX=26 startY=480 endX=1026 endY=677

