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
- **batch**: 3/3 (8 items)

### Item 4: Khối trạng thái màn

- **itemId**: img-031
- **itemName**: Khối trạng thái màn
- **nameJP**: -
- **nameTrans**: Screen states section
- **itemType**: others
- **itemSubtype**: states_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê đủ các trạng thái mà hai màn con phải phủ
  Thành phần hiển thị: tiêu đề khối và một lưới mười thẻ trạng thái
  Chức năng và logic: chỉ hiển thị — mỗi thẻ là một nhánh hiển thị mà màn phải có
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1253 endX=1026 endY=1659

### Item 4.1: Tiêu đề khối trạng thái màn

- **itemId**: img-032
- **itemName**: Tiêu đề khối trạng thái màn
- **nameJP**: -
- **nameTrans**: Screen states section title
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
  Mục đích và ngữ cảnh: mở đầu khối liệt kê trạng thái màn
  Thành phần hiển thị: một dòng tiêu đề "Trạng thái màn"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1269 endX=1010 endY=1286

### Item 4.2: Lưới thẻ trạng thái màn

- **itemId**: img-033
- **itemName**: Lưới thẻ trạng thái màn
- **nameJP**: -
- **nameTrans**: Screen state card grid
- **itemType**: others
- **itemSubtype**: state_card_grid
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: trạng thái rỗng của danh sách phải nêu rõ bộ lọc đang áp và cho tìm lại.
  Điều kiện: lỗi tải phải phân biệt được với 0 kết quả và có nút thử lại.
  Lỗi: "Không tìm thấy bản ghi." — khi bản ghi không tồn tại ở khung chi tiết.
  Điều kiện: vai ngoài hai vai được sửa thấy đủ bản ghi và lịch sử; form sửa đổi thành chỉ dẫn.
  Điều kiện: khi đang gửi thì khoá form và chặn gửi trùng.
  Lỗi: "Phải nhập lý do chỉnh sửa." — chặn ngay tại trường.
  Lỗi: "Không có thay đổi nào." — không được báo đã lưu và đã ghi lịch sử khi không ghi gì; đó là báo sai với người đang kiểm toán.
  Điều kiện: bản ghi bị người khác sửa thì phải phát hiện được và cho đọc lại giá trị mới trước khi ghi — nếu không thì chuỗi before/after bị lệch.
  Lỗi: "Người thắng mới đã mất hiệu lực." hoặc "Số lượng mới vượt tồn lô." — hai lý do nêu RIÊNG BIỆT; cùng hai cửa của SC-13.
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock." — thông báo phải nói đúng nguyên nhân và chỉ đường SC-20 hoặc SC-21; lần thử được ghi log.
- **description**:
  Mục đích và ngữ cảnh: mười nhánh hiển thị của hai màn con: rỗng; đang tải và lỗi tải; không tìm thấy; chỉ tra cứu; đang gửi; thiếu lý do chỉnh sửa; sửa mà không đổi gì; bản ghi đã bị người khác sửa; sửa bị từ chối theo nghiệp vụ; ngày nghiệp vụ đã lock
  Thành phần hiển thị: một lưới bốn cột chứa mười thẻ viền nét đứt — mỗi thẻ một tiêu đề và một đoạn mô tả hành vi
  Chức năng và logic: mười thẻ dùng chung một kết cấu và chỉ khác nội dung nên gộp thành một thành phần đại diện ở mục con; hai thẻ quan trọng nhất cho màn kiểm toán là sửa mà không đổi gì và bản ghi đã bị người khác sửa
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Thẻ bản ghi đã bị người khác sửa đòi phát hiện xung đột — màn hiện giá trị mới cạnh giá trị người dùng đang nhập hay buộc tải lại toàn bộ form?
  - Trạng thái đang tải và lỗi tải gộp trong một thẻ nhưng là hai nhánh khác nhau — có tách không?
  - Trạng thái ngày đã lock có phát hiện được trước khi bấm lưu hay chỉ lộ sau khi bấm? Thiết kế không khai.
- **position**: startX=42 startY=1297 endX=1010 endY=1643

### Item 4.2.1: Thẻ trạng thái màn (đại diện)

- **itemId**: img-034
- **itemName**: Thẻ trạng thái màn (đại diện)
- **nameJP**: -
- **nameTrans**: Screen state card (representative)
- **itemType**: others
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
  Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên Rỗng (danh sách) làm đại diện cho cả mười thẻ có cùng kết cấu
  Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả — thẻ đại diện ghi "Nêu rõ bộ lọc đang áp và cho tìm lại"
  Chức năng và logic: lặp mười lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên chỉ đặc tả một lần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1297 endX=277 endY=1389

### Item 5: Khối đối chiếu prototype

- **itemId**: img-035
- **itemName**: Khối đối chiếu prototype
- **nameJP**: -
- **nameTrans**: Prototype divergence section
- **itemType**: others
- **itemSubtype**: divergence_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: tách phần hiện trạng thi công ra khỏi phần thiết kế để bản đặc tả không bị hành vi prototype rò vào
  Thành phần hiển thị: tiêu đề khối và một bảng ba cột đối chiếu thiết kế với prototype
  Chức năng và logic: chỉ hiển thị — khối này là phần đối chiếu chứ không phải yêu cầu của màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1672 endX=1026 endY=2104

### Item 5.1: Tiêu đề khối đối chiếu prototype

- **itemId**: img-036
- **itemName**: Tiêu đề khối đối chiếu prototype
- **nameJP**: -
- **nameTrans**: Divergence section title
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
  Mục đích và ngữ cảnh: mở đầu khối đối chiếu hiện trạng
  Thành phần hiển thị: một dòng tiêu đề "Đối chiếu prototype"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1688 endX=1010 endY=1705

### Item 5.2: Bảng đối chiếu thiết kế và prototype

- **itemId**: img-037
- **itemName**: Bảng đối chiếu thiết kế và prototype
- **nameJP**: -
- **nameTrans**: Design versus prototype table
- **itemType**: table
- **itemSubtype**: divergence_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê bảy hạng mục và mức lệch giữa điều thiết kế đòi và điều prototype đang làm
  Thành phần hiển thị: bảng ba cột: Thiết kế đòi; Prototype làm; Mức — bảy dòng với các mức Cần khách chốt; Khác không chủ đích P0; Thiếu mức nhỏ
  Chức năng và logic: chỉ hiển thị — lệch nặng nhất là đổi người thắng bị bỏ im lặng trong khi màn báo thành công; đó là mất thay đổi im lặng ngay trên màn phục vụ kiểm toán
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Trong lúc chờ sửa nhánh đổi người thắng thì bỏ select khỏi form hay chặn gửi trường đó? Hai cách cho hai trải nghiệm khác nhau.
  - Thông báo lỗi đang nói sai nguyên nhân khi ngày đã lock — ưu tiên sửa nhãn thông báo trước hay bổ sung log lần thử trước?
- **position**: startX=42 startY=1716 endX=1010 endY=2088

### Item 6: Khối ghi chú phân quyền và đường sửa

- **itemId**: img-038
- **itemName**: Khối ghi chú phân quyền và đường sửa
- **nameJP**: -
- **nameTrans**: Permission and edit-path note
- **itemType**: label
- **itemSubtype**: footer_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: tra cứu mở cho các vai đang hoạt động để đối chiếu chéo.
  Điều kiện: sửa thuộc ROLE-TRADE và ROLE-SETTLEMENT — TBL-ROLE-01 (RFP:245) giao vai thứ hai việc đối chiếu và điều chỉnh quyết toán.
  Điều kiện: quyền theo VAI chứ không theo người tạo bản ghi.
  Điều kiện: sửa trực tiếp chỉ hợp lệ khi ngày nghiệp vụ CHƯA LOCK; sau lock thì FR-CORR-01 (RFP:656) và FR-CORR-02 (RFP:657) là đường duy nhất.
- **description**:
  Mục đích và ngữ cảnh: khai phân quyền của màn và ranh giới giữa sửa trực tiếp với đường điều chỉnh sau lock
  Thành phần hiển thị: một khối ghi chú ba đoạn: phân quyền đọc và sửa; lý do gộp hai màn con cùng ranh giới trước và sau lock; và một liên kết tới bản as-built của prototype
  Chức năng và logic: chỉ hiển thị — quyền theo vai nên ai thuộc hai vai đó cũng sửa được bản ghi của người khác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Quyền theo vai chứ không theo người tạo — có cần một dấu vết riêng cho việc một vai sửa bản ghi của vai khác không? FR-AUDIT-01 đã đòi chủ thể cho mỗi thao tác.
  - Sau lock thì màn có tự đổi nút Lưu thay đổi thành đường sang SC-20 không? Thiết kế chỉ nói đường ra là SC-20 và SC-21.
- **position**: startX=26 startY=2119 endX=1026 endY=2202

