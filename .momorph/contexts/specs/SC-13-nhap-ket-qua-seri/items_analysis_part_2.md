# Items Analysis - SC-13 · Nhập kết quả せり

## Screen context

- **screen**: SC-13 · Nhập kết quả せり
- **source-family**: image
- **source-token**: SC-13-nhap-ket-qua-seri
- **source-image**: .momorph/shots/SC-13-nhap-ket-qua-seri.png
- **canvas**: 1280 x 2208 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-018 (FN-05) · ưu tiên P0
- **requirement-refs**: FR-SERI-01 · FR-SERI-02 · SCOPE-OUT-02 · kế thừa FR-PARTY-02 · BR-PERM-01 · FR-LOT-03 · BR-LOT-02 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01
- **state-machine**: FIG-012 (RFP:637) — tiêu đề hình phủ cả 相対取引 và せり
- **actor**: Người điều hành đấu giá (ROLE-TRADE)
- **batch**: 2/3 (15 items)

### Item 3.1: Tiêu đề khối hệ thống gán

- **itemId**: img-016
- **itemName**: Tiêu đề khối hệ thống gán
- **nameJP**: -
- **nameTrans**: System-assigned section title
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
  Mục đích và ngữ cảnh: nói rõ ranh giới giữa phần người nhập và phần hệ thống quyết
  Thành phần hiển thị: một dòng tiêu đề "Hệ thống gán — không nhập tay"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=635 endX=1010 endY=652

### Item 3.2: Trường Ngày nghiệp vụ (chỉ đọc)

- **itemId**: img-017
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
  Mục đích và ngữ cảnh: ngày nghiệp vụ mà bản ghi thuộc về — đơn vị của kỳ đối chiếu FR-SETTLE-01 (RFP:659) và của lock FR-SETTLE-02 (RFP:660)
  Thành phần hiển thị: nhãn tiếng Việt kèm 業務日; một ô chỉ đọc hiện ngày; và một dòng chú thích mang nhãn [CHƯA CHỐT]
  Chức năng và logic: hệ thống gán ngày nghiệp vụ; thiết kế KHÔNG nói ngày này bám thời điểm quyết định hay bám lúc nhập liệu nên trường vẫn ở dạng chỉ đọc
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: business_date
- **databaseNote**: Ngày nghiệp vụ của bản ghi trong D-TRADE — cũng là khoá mà miền D-SETTLE (RFP:606) dùng để lock kỳ.
- **qa**:
  - Ngày nghiệp vụ bám thời điểm quyết định hay bám lúc nhập liệu? Thiết kế ghi [CHƯA CHỐT]; đấu giá chạy sáng sớm rồi nhập bù thì hai cách cho hai kỳ đối chiếu khác nhau.
  - Nếu bám thời điểm quyết định thì nhập bù vào một ngày đã lock sẽ bị chặn ngay — người vận hành cần biết trước điều đó ở trường nào?
  - FIG-002 (RFP:220) đặt việc ghi nhận kết quả đấu giá ở 06:30 và quyết toán ngày ở 10:00 — khoảng nhập bù cho phép là bao lâu?
- **position**: startX=42 startY=663 endX=521 endY=774

### Item 3.3: Trường Kênh giao dịch (chỉ đọc)

- **itemId**: img-018
- **itemName**: Trường Kênh giao dịch (chỉ đọc)
- **nameJP**: 取引区分
- **nameTrans**: Trade channel (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: せり
- **minLength**: -
- **maxLength**: -
- **defaultValue**: せり
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết bản ghi thuộc kênh せり — luồng phụ trợ bên cạnh kênh chính 相対取引
  Thành phần hiển thị: nhãn tiếng Việt kèm 取引区分; một ô chỉ đọc hiện せり; và một dòng chú thích trỏ kênh 相対取引 sang SC-11
  Chức năng và logic: hai kênh khác nhau ở cách hình thành giá và giống nhau ở chỗ đều là một lần bán hàng cho người tham gia
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Không có cột kênh trên thực thể kết quả đấu giá — kênh suy ra từ chính thực thể vì bản ghi せり nằm ở một thực thể riêng khác với bản ghi 相対取引.
- **qa**:
  - Ở các màn tra cứu và báo cáo gộp hai kênh (RPT-11 theo loại giao dịch) thì kênh hiện bằng nhãn nào và lấy từ đâu? Thiết kế không khai.
  - Trường chỉ có một giá trị trên màn này — có cần giữ trên UI để người vận hành đọc hay bỏ đi?
- **position**: startX=532 startY=663 endX=1010 endY=774

### Item 4: Khối vòng đời bản ghi せり

- **itemId**: img-019
- **itemName**: Khối vòng đời bản ghi せり
- **nameJP**: -
- **nameTrans**: Seri record lifecycle section
- **itemType**: others
- **itemSubtype**: lifecycle_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai vòng đời FIG-012 (RFP:637) mà tiêu đề hình nói phủ CẢ 相対取引 VÀ せり — một vòng đời dùng chung cho hai kênh
  Thành phần hiển thị: tiêu đề khối; một bảng bốn cột liệt kê các cạnh chuyển trạng thái; và một khối ghi chú [CHƯA CHỐT]
  Chức năng và logic: chỉ hiển thị — cách ánh xạ FIG-012 lên bản ghi せり còn chờ khách chốt vì ba dòng yêu cầu của FN-05 không nhắc trạng thái nào
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi một trục trạng thái cho bản ghi kết quả đấu giá trong D-TRADE. Thực thể hiện có KHÔNG CÓ cột trạng thái nào — thiếu cả trục chứ không thiếu một giá trị.
- **qa**: -
- **position**: startX=26 startY=813 endX=1026 endY=1108

### Item 4.1: Tiêu đề khối vòng đời

- **itemId**: img-020
- **itemName**: Tiêu đề khối vòng đời
- **nameJP**: -
- **nameTrans**: Lifecycle section title
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
  Mục đích và ngữ cảnh: định vị nguồn của vòng đời và nói rõ hình phủ cả hai kênh
  Thành phần hiển thị: một dòng tiêu đề "Vòng đời bản ghi せり — FIG-012 phủ cả hai kênh (RFP:637)"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=829 endX=1010 endY=846

### Item 4.2: Bảng chuyển trạng thái FIG-012 cho kênh せり

- **itemId**: img-021
- **itemName**: Bảng chuyển trạng thái FIG-012 cho kênh せり
- **nameJP**: 状態遷移
- **nameTrans**: FIG-012 transition table for seri
- **itemType**: table
- **itemSubtype**: transition_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê các cạnh chuyển trạng thái của FIG-012 áp cho bản ghi せり kèm ghi chú thiết kế cho từng cạnh
  Thành phần hiển thị: bảng bốn cột: Từ trạng thái; Sự kiện; Tới trạng thái; Ghi chú thiết kế — bốn dòng và hai thẻ [CHƯA CHỐT] gắn vào chặng Chờ xác nhận
  Chức năng và logic: các cạnh sau khi chốt đi qua yêu cầu điều chỉnh ở SC-20 và phê duyệt ở SC-21; FR-SERI-03 (RFP:655) đòi tra cứu lại được sau khi có đính chính nên đường ra là SC-14
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: seri_result
- **databaseColumn**: -
- **databaseNote**: Tập trạng thái mà thiết kế đòi cho D-TRADE theo FIG-012. Không có cột trạng thái nào trên thực thể hiện có nên FR-SERI-03 chỉ đáp ứng được bằng dấu vết kiểm toán chứ không bằng trạng thái bản ghi.
- **qa**:
  - Một kết quả đấu giá đã chốt tại sàn thì vào hệ thống ở chặng Nháp hay vào thẳng Đã chốt? FIG-012 (RFP:637) nói vòng đời dùng chung nhưng FR-SERI-01 (RFP:653) nói せり chỉ ghi nhận kết quả CUỐI CÙNG.
  - Nếu có chặng Chờ xác nhận cho kênh せり thì ai duyệt và trong bao lâu? Không yêu cầu nào định nghĩa vai duyệt hay SLA duyệt cho kênh này.
  - Câu hỏi này phải hỏi cùng lúc với câu hỏi Chờ xác nhận của SC-11 vì hai kênh dùng chung một vòng đời.
- **position**: startX=42 startY=857 endX=1010 endY=1004

### Item 4.3: Ghi chú ánh xạ vòng đời chưa chốt

- **itemId**: img-022
- **itemName**: Ghi chú ánh xạ vòng đời chưa chốt
- **nameJP**: -
- **nameTrans**: Unresolved lifecycle mapping note
- **itemType**: label
- **itemSubtype**: open_decision_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai thẳng chỗ tài liệu khách chưa đủ để ánh xạ vòng đời lên bản ghi せり
  Thành phần hiển thị: một khối ghi chú nền nhạt dẫn nguyên văn tiêu đề FIG-012 rồi nêu rằng ba dòng yêu cầu của FN-05 không nhắc trạng thái nào
  Chức năng và logic: văn bản tĩnh — chặn việc tự quyết ánh xạ trạng thái và buộc hỏi cùng lúc với câu hỏi của SC-11
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Nếu khách chốt là bản ghi せり không có trạng thái thì cột Trạng thái ở màn tra cứu SC-14 bỏ đi — có đúng không?
  - FIG-012 ghi "Đây là các trạng thái thuộc đối tượng kiểm toán" — nếu bản ghi せり không có trạng thái thì nghĩa vụ kiểm toán của nó được thoả bằng gì?
- **position**: startX=42 startY=1015 endX=1010 endY=1081

### Item 5: Khối ngoài phạm vi — cố ý không có trên màn

- **itemId**: img-023
- **itemName**: Khối ngoài phạm vi — cố ý không có trên màn
- **nameJP**: -
- **nameTrans**: Out-of-scope declaration section
- **itemType**: others
- **itemSubtype**: scope_out_section
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai tường minh những gì CỐ Ý không có trên màn để đề xuất về sau không bị hiểu là hoàn thiện màn
  Thành phần hiển thị: tiêu đề khối và một đoạn văn nêu ba điều bị cấm: không upload ảnh; không OCR; không nhận dạng ký hiệu tay 手やり — kèm nghiệm thu của FR-SERI-01
  Chức năng và logic: chỉ hiển thị — SCOPE-OUT-02 (RFP:405) và FR-SERI-01 (RFP:653) cấm bằng chữ; nghiệm thu là không tồn tại chức năng OCR hay suy luận kết quả từ hình ảnh hoặc ký hiệu
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Có cần chỗ nào trên màn ghi chú cho người vận hành biết vì sao không có đường nhận ảnh không? Ảnh chỉ khai trong tài liệu.
  - Chứng từ giấy của phiếu kết quả せり (FIG-026 · RFP:1380) lưu ở đâu nếu màn này không nhận file? SC-31 quản lý file đính kèm nhưng thiết kế không nối hai màn.
- **position**: startX=26 startY=1121 endX=1026 endY=1235

### Item 5.1: Tiêu đề khối ngoài phạm vi

- **itemId**: img-024
- **itemName**: Tiêu đề khối ngoài phạm vi
- **nameJP**: -
- **nameTrans**: Out-of-scope section title
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
  Mục đích và ngữ cảnh: mở đầu khối khai ranh giới phạm vi
  Thành phần hiển thị: một dòng tiêu đề "Ngoài phạm vi — cố ý không có trên màn"
  Chức năng và logic: văn bản tĩnh — không tương tác
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1137 endX=1010 endY=1154

### Item 6: Khối trạng thái màn

- **itemId**: img-025
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
  Mục đích và ngữ cảnh: liệt kê đủ các trạng thái màn phải phủ để không sót nhánh nào khi thi công
  Thành phần hiển thị: tiêu đề khối và một lưới mười thẻ trạng thái
  Chức năng và logic: chỉ hiển thị — mỗi thẻ là một nhánh hiển thị mà màn phải có
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1248 endX=1026 endY=1653

### Item 6.1: Tiêu đề khối trạng thái màn

- **itemId**: img-026
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
- **position**: startX=42 startY=1264 endX=1010 endY=1281

### Item 6.2: Lưới thẻ trạng thái màn

- **itemId**: img-027
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
  Điều kiện: trạng thái rỗng phải nêu lý do và đường đi tiếp (SC-08 tiếp nhận; SC-10 công bố) thay vì để form không chọn được gì.
  Điều kiện: lỗi tải phải phân biệt được với trạng thái rỗng và có nút thử lại.
  Điều kiện: ngoài ROLE-TRADE thì không ghi được — TBL-ROLE-01 (RFP:245).
  Lỗi: "Người tham gia B đã mất hiệu lực từ <ngày>." — cùng một cửa với SC-11 theo FR-PARTY-02 (RFP:630).
  Lỗi: "LOT-0003 chỉ còn <số> khả dụng." — cùng một cửa với SC-11 theo FR-LOT-03 (RFP:634).
  Lỗi: "Lô này đã có kết quả せり." — chặn tạo mới và chỉ đường sang SC-14 theo FR-SERI-01 (RFP:653).
  Điều kiện: lỗi nhập báo tại TỪNG TRƯỜNG và nói rõ trường nào sai — không dùng một thông báo chung.
  Lỗi: "Ngày nghiệp vụ <ngày> đã lock." — FR-CORR-03 (RFP:658) và BR-CLOSE-01 (RFP:597); mọi lần thử đều bị chặn và có log.
- **description**:
  Mục đích và ngữ cảnh: mười nhánh hiển thị của màn: mặc định; rỗng; đang tải và lỗi tải; không có quyền và đang gửi; từ chối vì hết hiệu lực; từ chối vì không đủ số lượng; lô đã có kết quả; lỗi nhập trường; lưu thành công; ngày nghiệp vụ đã lock
  Thành phần hiển thị: một lưới bốn cột chứa mười thẻ viền nét đứt — mỗi thẻ một tiêu đề và một đoạn mô tả hành vi
  Chức năng và logic: mười thẻ dùng chung một kết cấu và chỉ khác nội dung nên gộp thành một thành phần đại diện ở mục con; ba thẻ từ chối là ba cửa kiểm khác nhau và phải hiện lý do riêng biệt
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Trạng thái đang tải và lỗi tải gộp trong một thẻ nhưng là hai nhánh khác nhau trên màn thật — có tách không?
  - Khi vai không có quyền thì màn trả không tìm thấy để không lộ sự tồn tại tài nguyên hay báo thẳng là thiếu quyền? Thiết kế chỉ nói không ghi được.
  - Trạng thái ngày nghiệp vụ đã lock có phát hiện được trước khi bấm lưu hay chỉ lộ ra sau khi bấm? Thiết kế không khai.
- **position**: startX=42 startY=1292 endX=1010 endY=1637

### Item 6.2.1: Thẻ trạng thái màn (đại diện)

- **itemId**: img-028
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
  Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên Mặc định làm đại diện cho cả mười thẻ có cùng kết cấu
  Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả — thẻ đại diện ghi "Năm trường trống hoặc có giá trị đầu; người xác nhận mặc định là người đang đăng nhập"
  Chức năng và logic: lặp mười lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên chỉ đặc tả một lần
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Thẻ Mặc định nói năm trường nhưng khối form có sáu trường tính cả lô hàng — cách đếm nào là đúng cho màn thật?
- **position**: startX=42 startY=1292 endX=277 endY=1384

### Item 7: Khối đối chiếu prototype

- **itemId**: img-029
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
- **position**: startX=26 startY=1666 endX=1026 endY=2106

### Item 7.1: Tiêu đề khối đối chiếu prototype

- **itemId**: img-030
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
- **position**: startX=42 startY=1682 endX=1010 endY=1699

