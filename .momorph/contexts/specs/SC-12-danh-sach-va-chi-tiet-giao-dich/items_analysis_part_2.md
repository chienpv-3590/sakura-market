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
- **batch**: 2/3 (15 items)

### Item 2.6.2: Nút Hủy trên dòng

- **itemId**: img-016
- **itemName**: Nút Hủy trên dòng
- **nameJP**: -
- **nameTrans**: Row cancel button
- **itemType**: button
- **itemSubtype**: row_destructive_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: chỉ hủy được giao dịch chưa lock — FR-AITAI-03 (RFP:652) và BR-CLOSE-01 (RFP:597).
  Điều kiện: chỉ ROLE-TRADE thấy nút này — TBL-ROLE-01 (RFP:245).
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock; dùng luồng yêu cầu điều chỉnh." — đường ra là SC-20 và SC-21.
- **description**:
  Mục đích và ngữ cảnh: hành động hủy đặt ngay trên dòng để xử lý sai sót trước khi chốt kỳ
  Thành phần hiển thị: một nút màu cảnh báo nhãn chữ "Hủy" — chỉ xuất hiện ở dòng đầu tiên vì dòng đó còn hủy được
  Chức năng và logic: chỉ hiện trên dòng còn trong phạm vi hủy của FE-016; lý do hủy là trường bắt buộc và được nhập ở khung chi tiết
- **userAction**: on_click
- **transitionNote**: Mở đường hủy giao dịch của FE-016. Chỉ có mặt trên dòng còn hủy được và chỉ với ROLE-TRADE.
- **databaseTable**: transaction
- **databaseColumn**: status; cancel_reason
- **databaseNote**: Chuyển trạng thái của D-TRADE sang chặng Hủy / Đính chính của FIG-012 và lưu lý do hủy. Số lượng khả dụng của lô (D-LOT) phải được hoàn lại chính xác.
- **qa**:
  - Nút Hủy trên dòng có mở hộp xác nhận có ô lý do ngay tại danh sách hay bắt buộc đi qua khung chi tiết? Ảnh đặt ô lý do ở khung chi tiết.
  - Dòng nào được coi là còn hủy được? Ảnh chỉ bật nút ở dòng Nháp nhưng FE-016 nói phạm vi là chưa lock.
- **position**: startX=926 startY=369 endX=974 endY=398

### Item 2.7: Ghi chú phân trang và hiệu năng

- **itemId**: img-017
- **itemName**: Ghi chú phân trang và hiệu năng
- **nameJP**: -
- **nameTrans**: Paging and performance note
- **itemType**: label
- **itemSubtype**: rule_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: danh sách phải có phân trang hoặc tải thêm và KHÔNG được cắt kết quả trong im lặng.
  Điều kiện: tìm kiếm thông thường phải đạt p95 không vượt 2 giây — NFR-PERF-01 (RFP:807).
  Điều kiện: phải theo dõi được tới 1.200 giao dịch/ngày của profile tải FIG-LOAD-01 (RFP:829) — NFR-PERF-02 (RFP:808).
- **description**:
  Mục đích và ngữ cảnh: khai ràng buộc phi chức năng áp thẳng lên bảng danh sách — cắt kết quả mà không nói là mất nghiệp vụ
  Thành phần hiển thị: một dòng ghi chú nêu quy tắc hiện mã lô dạng người đọc được; ngưỡng tải cao điểm; và ngưỡng thời gian tìm kiếm
  Chức năng và logic: văn bản tĩnh — là điều kiện nghiệm thu cho bảng phía trên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Khi kết quả vượt một trang thì màn hiện tổng số bản ghi để người dùng biết mình đang xem phần nào không? Thiết kế chỉ cấm cắt âm thầm.
  - Ngưỡng p95 2 giây đo trên tải nào? NFR-PERF-01 nói tải thiết kế baseline còn FIG-LOAD-01 cho hai profile khác nhau.
- **position**: startX=42 startY=527 endX=1010 endY=561

### Item 3: Khung 2 — Chi tiết giao dịch và thao tác

- **itemId**: img-018
- **itemName**: Khung 2 — Chi tiết giao dịch và thao tác
- **nameJP**: -
- **nameTrans**: Transaction detail frame
- **itemType**: others
- **itemSubtype**: detail_frame
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nơi đặt hai thao tác nặng nhất của luồng 相対取引 — chốt và hủy — cùng toàn bộ dữ liệu để đối chiếu
  Thành phần hiển thị: tiêu đề khung; một dải vòng đời; tám trường chỉ đọc; một ô lý do hủy; một dòng số lượng khả dụng trước và sau; ba nút hoặc chỉ dẫn; và một bảng lịch sử
  Chức năng và logic: vai ROLE-TRADE thao tác được; các vai còn lại thấy đủ dữ liệu và mục thao tác đổi thành chỉ dẫn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: -
- **databaseNote**: Đọc và ghi thực thể giao dịch của D-TRADE; thao tác chốt và hủy đều chạm số lượng khả dụng của D-LOT.
- **qa**: -
- **position**: startX=26 startY=600 endX=1026 endY=1356

### Item 3.1: Tiêu đề khung chi tiết

- **itemId**: img-019
- **itemName**: Tiêu đề khung chi tiết
- **nameJP**: -
- **nameTrans**: Detail frame title
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
  Mục đích và ngữ cảnh: mở đầu khung chi tiết và dẫn hai mã tính năng tương ứng
  Thành phần hiển thị: một dòng tiêu đề "Khung 2 — Chi tiết giao dịch và thao tác · FE-016 · FE-017"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=616 endX=1010 endY=633

### Item 3.2: Dải vòng đời bản ghi

- **itemId**: img-020
- **itemName**: Dải vòng đời bản ghi
- **nameJP**: 状態遷移
- **nameTrans**: Lifecycle progress strip
- **itemType**: label
- **itemSubtype**: progress_strip
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: Nháp | Chờ xác nhận | Đã chốt | Hủy / Đính chính
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho người vận hành thấy bản ghi đang ở chặng nào của FIG-012 (RFP:637) mà không phải suy từ một nhãn trạng thái đơn
  Thành phần hiển thị: nhãn tiếng Việt kèm 状態遷移; một dải chỉ đọc vẽ đủ các chặng và các sự kiện của FIG-012 với chặng hiện tại được đánh dấu; và một dòng chú thích về mâu thuẫn tài liệu
  Chức năng và logic: vẽ đúng FIG-012 kể cả cạnh từ chối quay từ Chờ xác nhận về Nháp; chặng Chờ xác nhận gắn nhãn [CHƯA CHỐT] vì bảng yêu cầu của luồng không nhắc bước phê duyệt nào
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: status
- **databaseNote**: Dải vẽ từ trạng thái của D-TRADE. Giá trị Chờ xác nhận chưa có trong ràng buộc trạng thái hiện có.
- **qa**:
  - Dải vòng đời có hiện cả chặng chưa đi qua như ảnh hay chỉ hiện chặng đã đi qua? Ảnh vẽ đủ chuỗi.
  - Nếu khách chốt là không có bước duyệt thì dải rút còn ba chặng — có cần giữ chỗ trống cho chặng đã bỏ không?
- **position**: startX=42 startY=644 endX=1010 endY=730

### Item 3.3: Trường Mã giao dịch (chỉ đọc)

- **itemId**: img-021
- **itemName**: Trường Mã giao dịch (chỉ đọc)
- **nameJP**: 取引番号
- **nameTrans**: Transaction code (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: TXN-<NNNN>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: định danh nghiệp vụ của bản ghi đang mở — nghiệm thu FR-AITAI-01 (RFP:650) đòi mã duy nhất
  Thành phần hiển thị: nhãn tiếng Việt kèm 取引番号 và một ô chỉ đọc hiện mã
  Chức năng và logic: chỉ hiển thị — mã do hệ thống cấp ở bước tạo tại SC-11
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: txn_code
- **databaseNote**: Mã giao dịch của D-TRADE; tính duy nhất là ràng buộc dữ liệu.
- **qa**: -
- **position**: startX=42 startY=741 endX=357 endY=790

### Item 3.4: Trường Lô hàng (chỉ đọc)

- **itemId**: img-022
- **itemName**: Trường Lô hàng (chỉ đọc)
- **nameJP**: ロット
- **nameTrans**: Lot (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: LOT-<NNNN> — <tên mặt hàng>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: lô hàng của giao dịch — gốc truy vết theo FR-LOT-01 (RFP:632)
  Thành phần hiển thị: nhãn tiếng Việt kèm ロット và một ô chỉ đọc hiện mã lô cùng tên mặt hàng
  Chức năng và logic: chỉ hiển thị — mã lô luôn ở dạng người đọc được chứ không phải khoá nội bộ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction; lot
- **databaseColumn**: lot_id; lot_code; item
- **databaseNote**: Khoá ngoại tới thực thể lô hàng của D-LOT; hiển thị mã lô và tên mặt hàng thay cho khoá.
- **qa**: -
- **position**: startX=368 startY=741 endX=684 endY=790

### Item 3.5: Trường Người mua (chỉ đọc)

- **itemId**: img-023
- **itemName**: Trường Người mua (chỉ đọc)
- **nameJP**: 買出人
- **nameTrans**: Buyer (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: <tên người tham gia>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: người mua của giao dịch — đúng phân loại 買出人 của FR-PARTY-01 (RFP:629)
  Thành phần hiển thị: nhãn tiếng Việt kèm 買出人 và một ô chỉ đọc hiện tên người tham gia
  Chức năng và logic: chỉ hiển thị — hiệu lực của người mua được kiểm ở thời điểm chốt chứ không ở màn tra cứu
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction; participant
- **databaseColumn**: buyer_participant_id; name
- **databaseNote**: Khoá ngoại tới thực thể người tham gia của D-PARTY; hiển thị tên thay cho khoá.
- **qa**:
  - Chi tiết có cần hiện trạng thái hiệu lực hiện tại của người mua để bộ phận đối chiếu tự kiểm không? Ảnh chỉ hiện tên.
  - Tên người mua có dẫn được sang chi tiết người tham gia ở SC-06 không? Ảnh không vẽ liên kết.
- **position**: startX=695 startY=741 endX=1010 endY=790

### Item 3.6: Trường Số lượng (chỉ đọc)

- **itemId**: img-024
- **itemName**: Trường Số lượng (chỉ đọc)
- **nameJP**: 数量
- **nameTrans**: Quantity (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: <số> với dấu phẩy thập phân — ảnh cho thấy 2 chữ số lẻ
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: số lượng của giao dịch — con số bị trừ khỏi số lượng khả dụng của lô khi chốt
  Thành phần hiển thị: nhãn tiếng Việt kèm 数量 và một ô chỉ đọc hiện số lượng
  Chức năng và logic: chỉ hiển thị — cùng đơn vị đo với số lượng ban đầu của lô
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: qty
- **databaseNote**: Số lượng của D-TRADE; trừ vào số lượng khả dụng của D-LOT khi chốt và hoàn lại khi hủy.
- **qa**: -
- **position**: startX=42 startY=800 endX=357 endY=849

### Item 3.7: Trường Đơn giá (chỉ đọc)

- **itemId**: img-025
- **itemName**: Trường Đơn giá (chỉ đọc)
- **nameJP**: 単価 (JPY)
- **nameTrans**: Unit price (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: <số nguyên JPY> — không có phần thập phân
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: đơn giá đã thống nhất của giao dịch
  Thành phần hiển thị: nhãn tiếng Việt kèm 単価 (JPY) và một ô chỉ đọc hiện đơn giá
  Chức năng và logic: chỉ hiển thị — JPY không có phần thập phân
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: unit_price
- **databaseNote**: Đơn giá của D-TRADE; đơn vị JPY không có phần thập phân.
- **qa**: - Chi tiết có cần hiện tổng tiền bằng số lượng nhân đơn giá để đối chiếu với bảng ngày không? Ảnh không có trường tổng tiền.
- **position**: startX=368 startY=800 endX=684 endY=849

### Item 3.8: Trường Ngày nghiệp vụ (chỉ đọc)

- **itemId**: img-026
- **itemName**: Trường Ngày nghiệp vụ (chỉ đọc)
- **nameJP**: 業務日
- **nameTrans**: Business date (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: ngày nghiệp vụ mà bản ghi thuộc về — quyết định bản ghi vào kỳ đối chiếu nào và có bị lock chưa
  Thành phần hiển thị: nhãn tiếng Việt kèm 業務日 và một ô chỉ đọc hiện ngày
  Chức năng và logic: chỉ hiển thị — là khoá mà FR-SETTLE-02 (RFP:660) dùng để lock kỳ và FR-CORR-03 (RFP:658) dùng để chặn sửa trực tiếp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: business_date
- **databaseNote**: Ngày nghiệp vụ của D-TRADE; cũng là khoá của bản ghi lock kỳ trong D-SETTLE.
- **qa**: - Chi tiết có hiện luôn trạng thái đã lock của ngày nghiệp vụ để người dùng biết trước khi bấm không? Ảnh không có dấu hiệu lock.
- **position**: startX=695 startY=800 endX=1010 endY=849

### Item 3.9: Trường Người chốt (chỉ đọc)

- **itemId**: img-027
- **itemName**: Trường Người chốt (chỉ đọc)
- **nameJP**: 確定者
- **nameTrans**: Confirmed by (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: <tên tài khoản nội bộ>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trả lời "ai chốt" ngay trên chi tiết — FR-AITAI-01 (RFP:650) và FR-AUDIT-01 (RFP:710) đều dựa vào cặp người chốt và thời điểm chốt
  Thành phần hiển thị: nhãn tiếng Việt kèm 確定者; một ô chỉ đọc hiện tên người chốt; và một dòng chú thích nói rõ vì sao trường này phải đọc được ngay
  Chức năng và logic: chỉ hiển thị — không được buộc người dùng suy lại từ bảng lịch sử
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: confirmed_by
- **databaseNote**: Chủ thể chốt giao dịch trong D-TRADE — một tài khoản nội bộ của D-PARTY.
- **qa**:
  - Trường hiện gì khi bản ghi còn ở chặng Nháp và chưa ai chốt? Thiết kế không khai giá trị rỗng.
  - Nếu khách chốt là có bước phê duyệt thì cần thêm cặp người duyệt và thời điểm duyệt tách khỏi người chốt — có đúng không?
- **position**: startX=42 startY=859 endX=521 endY=954

### Item 3.10: Trường Thời điểm chốt (chỉ đọc)

- **itemId**: img-028
- **itemName**: Trường Thời điểm chốt (chỉ đọc)
- **nameJP**: 確定時刻
- **nameTrans**: Confirmed at (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: YYYY-MM-DD hh:mm
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trả lời "chốt lúc nào" — nửa còn lại của cặp mà FR-AITAI-01 và FR-AUDIT-01 dựa vào
  Thành phần hiển thị: nhãn tiếng Việt kèm 確定時刻 và một ô chỉ đọc hiện ngày kèm giờ phút
  Chức năng và logic: chỉ hiển thị — thời điểm chốt là mốc mà cửa hiệu lực người mua được đánh giá theo
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: confirmed_at
- **databaseNote**: Thời điểm chốt trong D-TRADE — mốc mà BR-PERM-01 (RFP:595) dùng để đánh giá hiệu lực 許可/承認.
- **qa**:
  - Thời điểm hiện theo múi giờ nào? BR-INC-01 (RFP:598) dùng JST cho ngày nghiệp vụ nhưng thiết kế không khai múi giờ hiển thị.
  - Có cần hiện giây không? Ảnh chỉ hiện giờ và phút.
- **position**: startX=532 startY=859 endX=1010 endY=954

### Item 3.11: Trường Lý do hủy

- **itemId**: img-029
- **itemName**: Trường Lý do hủy
- **nameJP**: 取消理由
- **nameTrans**: Cancel reason input
- **itemType**: text_form
- **itemSubtype**: text_input
- **buttonType**: -
- **dataType**: string
- **required**: true
- **format**: <văn bản tự do một dòng>
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: bắt buộc — nhãn có dấu sao đỏ; FR-AITAI-03 (RFP:652) đòi hủy KÈM LÝ DO.
  Lỗi: "Phải nhập lý do hủy." — chặn ngay tại trường; không dùng một thông báo lỗi chung cho cả màn.
  Điều kiện: chỉ hủy được khi ngày nghiệp vụ chưa lock — BR-CLOSE-01 (RFP:597).
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock; dùng luồng yêu cầu điều chỉnh ở SC-20." — mọi lần thử đều bị chặn và có log theo FR-CORR-03 (RFP:658).
- **description**:
  Mục đích và ngữ cảnh: lý do hủy — nửa bắt buộc của FE-016 và của nghiệm thu FR-AITAI-03 rằng lịch sử hủy được lưu
  Thành phần hiển thị: nhãn tiếng Việt kèm 取消理由 và dấu sao bắt buộc; một ô nhập chữ; và một dòng chú thích nêu điều kiện hủy
  Chức năng và logic: lý do được lưu vào lịch sử và tra cứu lại được; sau khi ngày nghiệp vụ đã lock thì đường duy nhất là yêu cầu điều chỉnh theo FR-CORR-01 (RFP:656)
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: transaction
- **databaseColumn**: cancel_reason
- **databaseNote**: Lý do hủy lưu trên thực thể giao dịch của D-TRADE và cũng vào bản ghi audit của FR-AUDIT-01.
- **qa**:
  - Lý do hủy có tập giá trị chọn sẵn hay hoàn toàn tự do? Thiết kế chỉ nói kèm lý do.
  - Có độ dài tối thiểu để chặn lý do rỗng nghĩa như một dấu chấm không? Thiết kế không khai.
  - Ô lý do có hiện thường trực như ảnh hay chỉ hiện sau khi bấm nút hủy? Ảnh hiện thường trực.
- **position**: startX=42 startY=964 endX=1010 endY=1048

### Item 3.12: Trường Số lượng khả dụng trước và sau khi hủy

- **itemId**: img-030
- **itemName**: Trường Số lượng khả dụng trước và sau khi hủy
- **nameJP**: -
- **nameTrans**: Lot available quantity before and after cancel
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: LOT-<NNNN>: <số trước> → <số sau> (hoàn lại đúng <số>)
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho người vận hành THẤY số hoàn lại để tự kiểm — nghiệm thu FR-AITAI-03 (RFP:652) là "số lượng khả dụng được hồi phục chính xác"
  Thành phần hiển thị: nhãn tiếng Việt; một ô chỉ đọc hiện mã lô kèm số khả dụng trước và sau cùng phần hoàn lại; và một dòng chú thích dẫn nghiệm thu
  Chức năng và logic: chỉ hiển thị — cũng là bằng chứng cho ràng buộc BR-LOT-02 (RFP:596) rằng mọi điều chỉnh số lượng truy vết được
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: lot
- **databaseColumn**: available_qty
- **databaseNote**: Số lượng khả dụng của thực thể lô hàng trong D-LOT. BR-LOT-02 đòi giá trị này không âm và truy vết được tới lịch sử điều chỉnh.
- **qa**:
  - Số trước và sau hiện dạng dự kiến trước khi bấm hủy hay dạng kết quả sau khi hủy xong? Ảnh vẽ như một dòng thông tin thường trực.
  - Khi hủy một bản ghi chưa từng bị trừ số lượng thì dòng này hiện gì? Thiết kế không khai.
- **position**: startX=42 startY=1059 endX=1010 endY=1127

