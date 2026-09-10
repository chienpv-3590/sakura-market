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
- **batch**: 3/3 (14 items)

### Item 3.13: Nút Chốt

- **itemId**: img-031
- **itemName**: Nút Chốt
- **nameJP**: -
- **nameTrans**: Confirm button
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
  Điều kiện: 買出人 phải còn hiệu lực 許可/承認 tại thời điểm chốt — FR-PARTY-02 (RFP:630); BR-PERM-01 (RFP:595).
  Lỗi: "Người tham gia A đã mất hiệu lực từ <ngày>; không thể chốt giao dịch."
  Điều kiện: số lượng khả dụng của lô phải đủ — FR-LOT-03 (RFP:634); BR-LOT-02 (RFP:596).
  Lỗi: "LOT-0001 chỉ còn <số> khả dụng; giao dịch cần <số>."
  Điều kiện: ngày nghiệp vụ chưa lock — BR-CLOSE-01 (RFP:597).
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock." — lần thử phải được ghi log theo FR-CORR-03 (RFP:658).
  Điều kiện: khi đang gửi thì khoá cả hai nút và chặn gửi trùng.
- **description**:
  Mục đích và ngữ cảnh: thao tác chốt giao dịch — điểm mà hai cửa kiểm của FE-015 được đánh giá
  Thành phần hiển thị: một nút chính nhãn chữ đặt cạnh nút hủy
  Chức năng và logic: hai lý do từ chối phải hiện riêng biệt theo nghiệm thu FR-AITAI-02 (RFP:651); ghi logical audit với chủ thể và timestamp và before/after theo FR-AUDIT-01 (RFP:710)
- **userAction**: on_click
- **transitionNote**: Phát sự kiện chốt của FIG-012 để đưa bản ghi tới chặng Đã chốt. Trừ đúng số lượng khả dụng của lô theo nghiệm thu FR-AITAI-01 (RFP:650).
- **databaseTable**: transaction; lot
- **databaseColumn**: status; confirmed_by; confirmed_at; available_qty
- **databaseNote**: Đổi trạng thái của D-TRADE sang Đã chốt kèm chủ thể và thời điểm; trừ số lượng khả dụng của D-LOT. Chi tiết cơ chế chống trừ hai lần thuộc spec BE.
- **qa**:
  - Chốt có hộp xác nhận trước khi thực hiện không? Ảnh chỉ vẽ nút.
  - Sau khi chốt thành công màn tự làm mới tại chỗ hay điều hướng đi đâu? Thiết kế không khai.
  - Nếu khách chốt là có bước phê duyệt thì nút này đổi nghĩa thành gửi xác nhận — nhãn nút có đổi theo không?
- **position**: startX=42 startY=1138 endX=94 endY=1167

### Item 3.14: Nút Xác nhận hủy

- **itemId**: img-032
- **itemName**: Nút Xác nhận hủy
- **nameJP**: -
- **nameTrans**: Confirm cancel button
- **itemType**: button
- **itemSubtype**: destructive_action
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: lý do hủy phải có giá trị — FR-AITAI-03 (RFP:652).
  Lỗi: "Phải nhập lý do hủy." — chặn tại trường lý do.
  Điều kiện: chỉ hủy được giao dịch chưa lock — BR-CLOSE-01 (RFP:597).
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock; đường ra là SC-20 và SC-21." — lần thử được ghi log theo FR-CORR-03 (RFP:658).
  Điều kiện: chỉ hủy được khi bản ghi còn trong phạm vi hủy của FE-016; ngoài phạm vi thì nút không bật.
- **description**:
  Mục đích và ngữ cảnh: thao tác hủy giao dịch chưa lock kèm lý do bắt buộc và hoàn lại số lượng
  Thành phần hiển thị: một nút màu cảnh báo nhãn chữ đặt cạnh nút chốt
  Chức năng và logic: hoàn lại đúng số lượng đã trừ; lịch sử hủy được lưu kèm lý do để tra cứu lại theo nghiệm thu FR-AITAI-03
- **userAction**: on_click
- **transitionNote**: Phát sự kiện hủy để đưa bản ghi tới chặng Hủy / Đính chính của FIG-012 và hoàn lại chính xác số lượng khả dụng của lô.
- **databaseTable**: transaction; lot
- **databaseColumn**: status; cancel_reason; available_qty
- **databaseNote**: Đổi trạng thái của D-TRADE và lưu lý do; hoàn lại số lượng khả dụng của D-LOT đúng bằng số đã trừ.
- **qa**:
  - Hủy hai lần liên tiếp thì lần thứ hai hiện gì và số lượng có bị hoàn hai lần không? Thiết kế chỉ đòi hoàn chính xác.
  - Bản ghi đã hủy còn hiện nút nào không hay mục thao tác biến mất? Thiết kế không khai.
- **position**: startX=98 startY=1138 endX=194 endY=1167

### Item 3.15: Chỉ dẫn cho vai chỉ tra cứu

- **itemId**: img-033
- **itemName**: Chỉ dẫn cho vai chỉ tra cứu
- **nameJP**: -
- **nameTrans**: Read-only role handoff caption
- **itemType**: label
- **itemSubtype**: handoff_caption
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho vai không được ghi biết ai làm được thao tác này thay vì để một nút bấm không có tác dụng
  Thành phần hiển thị: một khối chữ dạng nút tắt với chữ "Vai khác ROLE-TRADE: chỉ tra cứu; mục thao tác đổi thành chỉ dẫn"
  Chức năng và logic: thay thế hai nút thao tác khi vai hiện tại không phải ROLE-TRADE; tra cứu vẫn mở cho các vai đang hoạt động để đối chiếu chéo
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Chỉ dẫn có nêu tên vai cần liên hệ hay chỉ nói chung là không có quyền? Ảnh nêu tên vai.
  - Vai chỉ tra cứu có thấy ô lý do hủy ở dạng chỉ đọc hay ô đó biến mất? Thiết kế không khai.
- **position**: startX=198 startY=1138 endX=558 endY=1167

### Item 3.16: Tiêu đề mục Lịch sử

- **itemId**: img-034
- **itemName**: Tiêu đề mục Lịch sử
- **nameJP**: 履歴
- **nameTrans**: History section title
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
  Mục đích và ngữ cảnh: mở đầu mục lịch sử của bản ghi
  Thành phần hiển thị: một dòng tiêu đề "Lịch sử · 履歴"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1180 endX=1010 endY=1197

### Item 3.17: Bảng lịch sử thao tác

- **itemId**: img-035
- **itemName**: Bảng lịch sử thao tác
- **nameJP**: 履歴
- **nameTrans**: Operation history table
- **itemType**: table
- **itemSubtype**: audit_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: dấu vết kiểm toán của bản ghi — FR-AUDIT-01 (RFP:710) đòi chủ thể; timestamp; before/after và lý do cho mọi thao tác nhạy cảm
  Thành phần hiển thị: bảng năm cột: Thời điểm; Người thực hiện; Hành động; Lý do; Thay đổi — mới nhất trước; cột Thay đổi ghi cả chuyển trạng thái và số lượng khả dụng trước sau
  Chức năng và logic: mỗi dòng là một thao tác đã xảy ra; mọi lần thử ghi vào ngày đã lock cũng phải có mặt ở đây theo nghiệm thu FR-CORR-03 (RFP:658)
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: created_at; actor_id; action; reason; before; after
- **databaseNote**: Bảng lịch sử đọc từ dấu vết kiểm toán mà FE-041 và FR-AUDIT-01 đòi ghi cho tạo; sửa; phê duyệt; lock và đổi quyền.
- **qa**:
  - Tên trường trong cột Thay đổi hiện bằng tên nghiệp vụ hay tên cột kỹ thuật? Nghiệm thu FR-SERI-03 ở màn kề đòi tên hiểu được nên cần thống nhất.
  - Bảng lịch sử có phân trang khi bản ghi có nhiều thao tác không? Thiết kế không khai.
  - Lần thử ghi bị chặn vì ngày đã lock hiện ở cột Hành động bằng nhãn gì? Thiết kế chỉ đòi có mặt.
- **position**: startX=42 startY=1208 endX=1010 endY=1294

### Item 3.18: Ghi chú nghĩa vụ audit

- **itemId**: img-036
- **itemName**: Ghi chú nghĩa vụ audit
- **nameJP**: -
- **nameTrans**: Audit obligation note
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
  Điều kiện: mỗi dòng lịch sử phải có chủ thể; timestamp; before/after và lý do — FR-AUDIT-01 (RFP:710).
  Điều kiện: mọi lần thử sửa trực tiếp vào ngày đã lock đều bị chặn VÀ có log — FR-CORR-03 (RFP:658).
- **description**:
  Mục đích và ngữ cảnh: khai điều kiện nghiệm thu của bảng lịch sử ngay dưới bảng
  Thành phần hiển thị: một dòng ghi chú dẫn FR-AUDIT-01 kèm mã tính năng FE-041 và nghiệm thu của FR-CORR-03
  Chức năng và logic: văn bản tĩnh — là điều kiện nghiệm thu cho bảng phía trên
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1297 endX=1010 endY=1329

### Item 4: Khối trạng thái màn

- **itemId**: img-037
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
  Thành phần hiển thị: tiêu đề khối và một lưới chín thẻ trạng thái
  Chức năng và logic: chỉ hiển thị — mỗi thẻ là một nhánh hiển thị mà màn phải có
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1369 endX=1026 endY=1723

### Item 4.1: Tiêu đề khối trạng thái màn

- **itemId**: img-038
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
- **position**: startX=42 startY=1385 endX=1010 endY=1402

### Item 4.2: Lưới thẻ trạng thái màn

- **itemId**: img-039
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
  Điều kiện: trạng thái rỗng của danh sách phải nêu rõ bộ lọc đang áp và cho lọc lại.
  Điều kiện: lỗi tải phải phân biệt được với 0 kết quả và có nút thử lại.
  Lỗi: "Không tìm thấy giao dịch." — khi mã giao dịch không tồn tại ở khung chi tiết.
  Điều kiện: vai ngoài ROLE-TRADE thấy đủ dữ liệu và mục thao tác đổi thành chỉ dẫn.
  Điều kiện: khi đang gửi thì khoá hai nút và chặn gửi trùng.
  Điều kiện: hai lý do từ chối chốt của FE-015 phải hiện RIÊNG BIỆT kèm tên người tham gia hoặc số còn khả dụng.
  Lỗi: "Phải nhập lý do hủy." — chặn ngay tại trường; không dùng thông báo lỗi chung.
  Điều kiện: ngoài phạm vi hủy của FE-016 thì nút không bật và màn chỉ đường sang SC-20.
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock." — cả chốt và hủy đều bị chặn; lần thử được ghi log.
- **description**:
  Mục đích và ngữ cảnh: chín nhánh hiển thị của hai màn con: rỗng; đang tải và lỗi tải; không tìm thấy; chỉ tra cứu; đang gửi; chốt bị từ chối; hủy thiếu lý do; không hủy được vì đã qua chặng; ngày nghiệp vụ đã lock
  Thành phần hiển thị: một lưới bốn cột chứa chín thẻ viền nét đứt — mỗi thẻ một tiêu đề và một đoạn mô tả hành vi
  Chức năng và logic: chín thẻ dùng chung một kết cấu và chỉ khác nội dung nên gộp thành một thành phần đại diện ở mục con
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Trạng thái đang tải và lỗi tải gộp trong một thẻ nhưng là hai nhánh khác nhau trên màn thật — có tách không?
  - Khung danh sách và khung chi tiết có trạng thái riêng của từng khung hay dùng chung một vùng thông báo? Ảnh trộn thẻ của hai khung vào một lưới.
  - Trạng thái ngày đã lock có phát hiện được trước khi bấm hay chỉ lộ sau khi bấm? Thiết kế không khai.
- **position**: startX=42 startY=1413 endX=1010 endY=1707

### Item 4.2.1: Thẻ trạng thái màn (đại diện)

- **itemId**: img-040
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
  Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên Rỗng (danh sách) làm đại diện cho cả chín thẻ có cùng kết cấu
  Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả — thẻ đại diện ghi "Nêu rõ bộ lọc đang áp và cho lọc lại"
  Chức năng và logic: lặp chín lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên chỉ đặc tả một lần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1413 endX=277 endY=1488

### Item 5: Khối đối chiếu prototype

- **itemId**: img-041
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
- **position**: startX=26 startY=1736 endX=1026 endY=2023

### Item 5.1: Tiêu đề khối đối chiếu prototype

- **itemId**: img-042
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
- **position**: startX=42 startY=1752 endX=1010 endY=1769

### Item 5.2: Bảng đối chiếu thiết kế và prototype

- **itemId**: img-043
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
  Mục đích và ngữ cảnh: liệt kê năm hạng mục và mức lệch giữa điều thiết kế đòi và điều prototype đang làm
  Thành phần hiển thị: bảng ba cột: Thiết kế đòi; Prototype làm; Mức — năm dòng với các mức Cần khách chốt; Khác không chủ đích; Thiếu mức nhỏ
  Chức năng và logic: chỉ hiển thị — hai lệch đáng chú ý nhất là danh sách không phân trang ở ngày cao điểm và nhánh chốt không ghi log lần thử bị lock
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Danh sách hiện cắt cứng ở 100 dòng — trong lúc chờ phân trang thì màn có cần cảnh báo là kết quả đã bị cắt không?
  - Cặp "ai chốt / chốt lúc nào" đã có dữ liệu nhưng chưa hiện ở màn nào — đưa lên chi tiết là việc của FE-017 hay của một mã tính năng khác?
- **position**: startX=42 startY=1780 endX=1010 endY=2007

### Item 6: Khối ghi chú phân quyền và gộp màn

- **itemId**: img-044
- **itemName**: Khối ghi chú phân quyền và gộp màn
- **nameJP**: -
- **nameTrans**: Permission and screen-merge note
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
  Điều kiện: chốt và hủy thuộc ROLE-TRADE — TBL-ROLE-01 (RFP:245).
- **description**:
  Mục đích và ngữ cảnh: khai phân quyền của màn và lý do một mã SC- ứng hai màn con
  Thành phần hiển thị: một khối ghi chú ba đoạn: phân quyền đọc so với ghi; lý do gộp hai màn con; và một liên kết tới bản as-built của prototype
  Chức năng và logic: chỉ hiển thị — siết quyền đọc ở các bảng có thông tin cá nhân thuộc một quyết định kiến trúc riêng chứ không thuộc màn này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Danh sách là điểm vào hằng ngày của ROLE-TRADE — các vai khác vào màn này từ đâu? Thiết kế không khai đường vào cho vai tra cứu.
- **position**: startX=26 startY=2038 endX=1026 endY=2121

