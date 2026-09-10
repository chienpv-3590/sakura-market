# Items Analysis - SC-03 Danh sách tài khoản

- Nguồn: ảnh `.momorph/shots/SC-03-danh-sach-tai-khoan.png` (1280x1805; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-03-danh-sach-tai-khoan-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3

### Item 6.6: Ghi chú lý do bắt buộc và dấu vết

- **nameJP**: -
- **nameTrans**: Mandatory reason and audit note
- **itemType**: label
- **itemSubtype**: design_note
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
  - Mục đích và ngữ cảnh: nối bốn hành động của khối về đúng phần nghiệm thu; và tách mở khoá tạm ra khỏi ba chuyển tiếp quyền
  - Thành phần hiển thị: một đoạn chú thích hai câu: ba hành động quyền và dấu vết của chúng; rồi mở khoá tạm và lý do vẫn phải để lại dấu vết
  - Chức năng và logic: phần "ghi nhận lịch sử thay đổi" của FR-IAM-02 (RFP:628) do SC-04 hiển thị; màn này chỉ sinh dòng lịch sử
- **qa**: - "Bắt buộc kèm lý do" chặt hơn FR-IAM-02 (RFP:628) — điều khoản đó chỉ đòi before/after; chủ thể và timestamp. Lý do đến từ FR-AUDIT-01 (RFP:710). Chủ đầu tư có xác nhận mức chặt này không?
- **bbox**: startX=42 startY=980 endX=1010 endY=1012

### Item 7: Khối trạng thái màn

- **nameJP**: 画面状態ブロック
- **nameTrans**: Screen states block
- **itemType**: others
- **itemSubtype**: states_section
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
  - Mục đích và ngữ cảnh: liệt đủ các trạng thái màn phải xử lý — phần dễ bị cắt nhất khi thi công
  - Thành phần hiển thị: một nhãn khối và một lưới 8 thẻ trạng thái
  - Chức năng và logic: chỉ mô tả yêu cầu; không có tương tác
- **qa**: -
- **bbox**: startX=26 startY=1052 endX=1026 endY=1322

### Item 7.1: Tiêu đề khối trạng thái màn

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
- **bbox**: startX=42 startY=1068 endX=1010 endY=1085

### Item 7.2: Lưới thẻ trạng thái màn

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
  - Thành phần hiển thị: 8 thẻ có cùng kết cấu: Rỗng; Đang tải; Lỗi tải; Không có quyền; Đang gửi; Thiếu lý do; Bị chặn theo quy tắc; Gửi lỗi
  - Chức năng và logic: màn này không chạm dữ liệu bị khoá theo ngày nghiệp vụ nên KHÔNG có trạng thái chỉ-đọc-vì-đã-chốt-kỳ; trạng thái Không có quyền trả 404 chứ không 403 — có chủ đích để không lộ sự tồn tại của màn quản trị tài khoản
- **qa**:
  - - Trạng thái "Bị chặn theo quy tắc" gộp hai quy tắc khác nhau (tự tạm ngừng chính mình; tạm ngừng quản trị cuối) — hai ca có hai câu thông báo riêng không? Người dùng cần biết mình vướng quy tắc nào.
  - - Trạng thái "Lỗi tải" phải không hiện bảng rỗng như thể không có tài khoản nào — điều này áp cả khi chỉ một phần dữ liệu đọc được không? Cột thay đổi quyền gần nhất đọc từ nguồn khác nên có thể lỗi riêng.
- **bbox**: startX=42 startY=1096 endX=1010 endY=1306

### Item 7.2.1: Thẻ trạng thái màn (đại diện)

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
  - Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên "Rỗng" làm đại diện cho cả 8 thẻ có cùng kết cấu
  - Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả; thẻ đại diện đòi nói rõ danh sách rỗng là do lọc và kèm nút xoá lọc
  - Chức năng và logic: lặp 8 lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên gộp về một thẻ đại diện
- **qa**: -
- **bbox**: startX=42 startY=1096 endX=277 endY=1188

### Item 8: Khối đối chiếu prototype

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
  - Chức năng và logic: lý do hoãn là PHẠM VI PROTOTYPE và đi cùng quyết định của SC-02; FR-IAM-02 (RFP:628) vẫn còn hiệu lực nên mục thiết kế của màn vẫn đủ
- **qa**: -
- **bbox**: startX=26 startY=1335 endX=1026 endY=1649

### Item 8.1: Tiêu đề khối đối chiếu prototype

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
- **bbox**: startX=42 startY=1351 endX=1010 endY=1368

### Item 8.2: Bảng đối chiếu thiết kế và prototype

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
  - Mục đích và ngữ cảnh: 4 điểm bản thi công làm khác thiết kế; kèm mức lệch của từng điểm
  - Thành phần hiển thị: một bảng ba cột với hàng tiêu đề "Thiết kế đòi"; "Prototype làm"; "Mức"; và 4 hàng dữ liệu; ô mức mang một thẻ nhãn kèm câu giải thích
  - Chức năng và logic: hàng thứ ba là hàng nặng nhất: chặn ở tầng trang không che được dữ liệu; RFP §09-06 (RFP:886) đòi kiểm soát truy cập theo vai trò cho thông tin cá nhân bằng chữ nên đây là điểm phải quyết trước khi dựng
- **qa**: - Hàng thứ ba của bảng nói phạm vi đọc rộng hiện tại là một quyết định thiết kế của bản thi công; RFP §02-08 (RFP:311) giao cho bên dự thầu ĐỀ XUẤT cơ chế phân tách quyền chứ không bắt đọc rộng. Chủ đầu tư chốt vai nào được đọc bảng tài khoản?
- **bbox**: startX=42 startY=1379 endX=1010 endY=1633

### Item 8.2.1: Dòng đối chiếu kèm thẻ mức lệch (đại diện)

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
  - Mục đích và ngữ cảnh: một hàng đối chiếu — lấy hàng đầu tiên làm đại diện cho cả 4 hàng có cùng kết cấu
  - Thành phần hiển thị: ba ô: điều thiết kế đòi; điều bản thi công làm; và một thẻ nhãn mức lệch kèm câu giải thích
  - Chức năng và logic: hàng đại diện mang lý do hoãn cả màn và nói rõ lý do là phạm vi prototype chứ không phải lý do thiết kế
- **qa**: -
- **bbox**: startX=43 startY=1407 endX=1010 endY=1456

### Item 9: Khối ghi chú phân quyền và yêu cầu khách

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
- **databaseTable**: app_user
- **databaseColumn**: -
- **databaseNote**: Phạm vi đọc thực thể tài khoản nội bộ của D-PARTY (RFP:602) là một ĐỀ XUẤT thiết kế — RFP §02-08 (RFP:311) giao cho bên dự thầu đề xuất cơ chế phân tách quyền và truy vết. Đề xuất đọc rộng hiện tại đá với RFP §09-06 (RFP:886) đòi kiểm soát truy cập theo vai trò cho thông tin cá nhân.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chốt phân quyền của màn; nêu giới hạn của lớp chặn 404; và nối từng khối về phần nghiệm thu của FR-IAM-02 (RFP:628)
  - Thành phần hiển thị: ba đoạn chú thích: phân quyền và giới hạn của nó; yêu cầu khách màn này thoả kèm nguyên văn nghiệm thu; và liên kết tới bản as-built
  - Chức năng và logic: trả 404 thay 403 là quyết định có chủ đích để không lộ sự tồn tại tài nguyên — nhưng nó che TRANG chứ không che DỮ LIỆU; ai gọi thẳng tầng dữ liệu bằng phiên hợp lệ vẫn đọc được nếu phạm vi đọc không bị siết
- **qa**:
  - - Vai nào được ĐỌC bảng tài khoản nội bộ? Đây là quyết định của bên dự thầu theo RFP §02-08 (RFP:311); và RFP §09-06 (RFP:886) đòi kiểm soát truy cập theo vai trò cho thông tin cá nhân bằng chữ — nên đề xuất đọc rộng phải sửa hoặc phải được khách chấp nhận có điều kiện.
  - - Chỉ ROLE-SYS-ADMIN vào được là suy từ trách nhiệm "Quản lý tài khoản; quyền; log vận hành" ở TBL-ROLE-01 (RFP:255). Nếu chủ đầu tư có bộ phận hành chính cấp tài khoản mà không phải quản trị hệ thống thì thiếu một vai trò.
  - - Người bị từ chối khi gọi API ghi nhận mã nào — cùng 404 như vào trang; hay một mã khác? Dùng hai mã khác nhau là để người ngoài suy ra sự tồn tại của tài nguyên.
- **bbox**: startX=26 startY=1664 endX=1026 endY=1783

