# Items Analysis - SC-02 Xác thực MFA và thiết lập bảo mật

- Nguồn: ảnh `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.png` (1280x2061; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3

### Item 6.1: Tiêu đề khối trạng thái màn

- **nameJP**: -
- **nameTrans**: States block title
- **itemType**: label
- **itemSubtype**: section_title
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: nhãn khối trạng thái
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ "Trạng thái"
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=1230 endX=1010 endY=1247

### Item 6.2: Lưới thẻ trạng thái màn

- **nameJP**: -
- **nameTrans**: State card grid
- **itemType**: others
- **itemSubtype**: state_card_grid
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: 8 trạng thái màn xếp thành lưới 4 cột 2 hàng — mỗi thẻ là một trạng thái phải xử lý được
  - Thành phần hiển thị: 8 thẻ có cùng kết cấu: Thuộc diện chưa có yếu tố; Chờ nâng mức phiên; Mã không hợp lệ; Bị khoá tạm; Phiên hết hiệu lực; Vai trò đổi giữa phiên; Huỷ yếu tố cuối bị từ chối; Ngoài diện bắt buộc
  - Chức năng và logic: hai trạng thái đầu là hai cửa chặn của NFR-SEC-01 (RFP:809): thuộc diện mà chưa có yếu tố thì chặn ngay ở bước nâng mức và không hiện ô nhập mã; chưa xong yếu tố thứ hai thì chặn mọi khu vực nghiệp vụ
- **qa**:
  - - Trạng thái "Ngoài diện bắt buộc" trả 404 chứ không 403 — vai ngoài diện gọi thẳng API của màn này cũng nhận 404 chứ? Thiết kế chỉ nói ở mức vào màn.
  - - Trạng thái "Vai trò đổi giữa phiên" phụ thuộc SC-04; hai màn có phải cùng một cơ chế đánh dấu phiên chưa đủ mức không? Thiết kế không khai cơ chế.
- **bbox**: startX=42 startY=1258 endX=1010 endY=1469

### Item 6.2.1: Thẻ trạng thái màn (đại diện)

- **nameJP**: -
- **nameTrans**: Screen state card (representative)
- **itemType**: others
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên "Thuộc diện; chưa có yếu tố" làm đại diện cho cả 8 thẻ có cùng kết cấu
  - Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả; thẻ đại diện ghi rõ chỉ cho đăng ký yếu tố hoặc đăng xuất và không có ô nhập mã
  - Chức năng và logic: lặp 8 lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên gộp về một thẻ đại diện
- **qa**: -
- **bbox**: startX=42 startY=1258 endX=277 endY=1368

### Item 7: Khối đối chiếu prototype

- **nameJP**: プロトタイプ差分ブロック
- **nameTrans**: Prototype divergence block
- **itemType**: others
- **itemSubtype**: divergence_section
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chỗ duy nhất trên màn nói về bản thi công — và là chỗ đặt lý do hoãn màn này
  - Thành phần hiển thị: một nhãn khối và một bảng ba cột: thiết kế đòi; prototype làm; và mức lệch
  - Chức năng và logic: lý do hoãn là PHẠM VI PROTOTYPE chứ không phải lý do thiết kế — NFR-SEC-01 (RFP:809) vẫn còn hiệu lực nên mục thiết kế của màn vẫn đủ
- **qa**: -
- **bbox**: startX=26 startY=1498 endX=1026 endY=1905

### Item 7.1: Tiêu đề khối đối chiếu prototype

- **nameJP**: -
- **nameTrans**: Divergence block title
- **itemType**: label
- **itemSubtype**: section_title
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: nhãn khối đối chiếu
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ "ĐỐI CHIẾU PROTOTYPE"
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=1514 endX=1010 endY=1531

### Item 7.2: Bảng đối chiếu thiết kế và prototype

- **nameJP**: 設計とプロトタイプの差分表
- **nameTrans**: Design vs prototype divergence table
- **itemType**: table
- **itemSubtype**: divergence_table
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: 6 điểm bản thi công làm khác thiết kế; kèm mức lệch của từng điểm
  - Thành phần hiển thị: một bảng ba cột với hàng tiêu đề "Thiết kế đòi"; "Prototype làm"; "Mức"; và 6 hàng dữ liệu; ô mức mang một thẻ nhãn kèm câu giải thích
  - Chức năng và logic: ba hàng ở mức "cần khách chốt" đều rơi vào chỗ tài liệu khách không định lượng hoặc không liệt: ngưỡng khoá tạm; diện bắt buộc MFA; và bộ đếm sai riêng cho bước mã
- **qa**: - Ba hàng "cần khách chốt" của bảng này là ba câu hỏi phải trả lời trước khi dựng — có đường nào dựng một phần mà không chốt hết ba câu không?
- **bbox**: startX=42 startY=1542 endX=1010 endY=1889

### Item 7.2.1: Dòng đối chiếu kèm thẻ mức lệch (đại diện)

- **nameJP**: -
- **nameTrans**: Divergence row with level tag (representative)
- **itemType**: others
- **itemSubtype**: table_row
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: một hàng đối chiếu — lấy hàng đầu tiên làm đại diện cho cả 6 hàng có cùng kết cấu
  - Thành phần hiển thị: ba ô: điều thiết kế đòi; điều bản thi công làm; và một thẻ nhãn mức lệch kèm câu giải thích
  - Chức năng và logic: hàng đại diện là hàng mang lý do hoãn cả màn; nó nói rõ đây KHÔNG phải lý do thiết kế và yêu cầu khách vẫn còn hiệu lực
- **qa**: -
- **bbox**: startX=43 startY=1570 endX=1010 endY=1636

### Item 8: Khối ghi chú phân quyền và yêu cầu khách

- **nameJP**: 権限と顧客要件の注記
- **nameTrans**: Permission and requirement footnote
- **itemType**: label
- **itemSubtype**: footer_note
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chốt phân quyền của màn và nối từng khối về đúng phần nghiệm thu của hai yêu cầu khách
  - Thành phần hiển thị: ba đoạn chú thích: phân quyền và ranh giới "chỉ của chính tài khoản đang đăng nhập"; yêu cầu khách màn này thoả; và liên kết tới bản as-built
  - Chức năng và logic: khối 1 khai diện bắt buộc; khối 2 là bước xác thực yếu tố thứ hai; khối 3 là nơi tự quản yếu tố và xem chính sách — nghiệm thu của cả hai yêu cầu đều đòi thiết lập phải XEM ĐƯỢC nên khối 3 chỉ đọc nhưng bắt buộc có
- **qa**:
  - - Diện được vào màn này chính là diện bắt buộc MFA — vai ngoài diện muốn tự bật MFA thì vào bằng đường nào? Thiết kế đóng cả hai cửa cùng lúc.
  - - Vai trò thuộc diện bắt buộc nhưng chưa đăng ký yếu tố nào vẫn phải vào được màn này để đăng ký; cửa 404 có chừa ca đó không? Thiết kế không khai.
- **bbox**: startX=26 startY=1920 endX=1026 endY=2039

