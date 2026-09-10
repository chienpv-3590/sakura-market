# Items Analysis - SC-04 Chi tiết tài khoản và lịch sử quyền

- Nguồn: ảnh `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.png` (1280x1823; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3

### Item 6.1: Tiêu đề khối đối chiếu prototype

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
- **bbox**: startX=42 startY=1304 endX=1010 endY=1321

### Item 6.2: Bảng đối chiếu thiết kế và prototype

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
  - Mục đích và ngữ cảnh: 5 điểm bản thi công làm khác thiết kế; kèm mức lệch của từng điểm
  - Thành phần hiển thị: một bảng ba cột với hàng tiêu đề "Thiết kế đòi"; "Prototype làm"; "Mức"; và 5 hàng dữ liệu; ô mức mang một thẻ nhãn kèm câu giải thích
  - Chức năng và logic: hàng đầu chỉ ra tiền lệ cấu trúc đã chạy thật để bắt chước: bảng lịch sử trạng thái người tham gia đã mang đúng khuôn giá trị từ và đến; lý do; chủ thể; thời điểm
- **qa**:
  - - Hàng thứ ba nói "lý do thay đổi bắt buộc" là mức chặt hơn RFP — FR-IAM-02 (RFP:628) không nói lý do; chỉ FR-AUDIT-01 (RFP:710) nói. Chủ đầu tư giữ mức chặt này không?
  - - Hàng thứ tư phải quyết TRƯỚC khi tạo bảng lịch sử quyền: dùng lại khuôn đọc rộng đang áp cho các bảng khác thì mọi vai trò đọc được toàn bộ lịch sử phân quyền. Đây là đề xuất thiết kế của bên dự thầu theo RFP §02-08 (RFP:311); và RFP §09-06 (RFP:886) đòi kiểm soát truy cập theo vai trò cho thông tin cá nhân bằng chữ.
- **bbox**: startX=42 startY=1332 endX=1010 endY=1651

### Item 6.2.1: Dòng đối chiếu kèm thẻ mức lệch (đại diện)

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
  - Mục đích và ngữ cảnh: một hàng đối chiếu — lấy hàng đầu tiên làm đại diện cho cả 5 hàng có cùng kết cấu
  - Thành phần hiển thị: ba ô: điều thiết kế đòi; điều bản thi công làm; và một thẻ nhãn mức lệch kèm câu giải thích dài nhất bảng
  - Chức năng và logic: hàng đại diện là hàng quan trọng nhất của cả màn: bảng lịch sử quyền chưa tồn tại; nhưng khuôn cấu trúc để dựng đã có tiền lệ chạy thật trong cùng miền dữ liệu
- **qa**: -
- **bbox**: startX=43 startY=1360 endX=1010 endY=1427

### Item 7: Khối ghi chú phân quyền và yêu cầu khách

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
- **databaseNote**: Phạm vi đọc bảng lịch sử quyền của miền D-PARTY (RFP:602) là một ĐỀ XUẤT thiết kế chưa quyết — RFP §02-08 (RFP:311) giao cho bên dự thầu đề xuất cơ chế phân tách quyền và truy vết. Bảng chưa tồn tại nên đây là chỗ quyết được trước khi dựng.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chốt phân quyền của màn; nêu giới hạn của lớp chặn 404; và nối khối 2 về phần nghiệm thu của FR-IAM-02 (RFP:628)
  - Thành phần hiển thị: ba đoạn chú thích: phân quyền và giới hạn của nó; yêu cầu khách màn này thoả cùng các yêu cầu liên quan; và liên kết tới bản as-built
  - Chức năng và logic: màn này lo nửa "ghi nhận lịch sử thay đổi" của FR-IAM-02 trong khi SC-03 lo ba hành động; khối 2 là chỗ duy nhất trong 32 màn thấy được cả before/after; chủ thể và timestamp cho quyền tài khoản nội bộ
- **qa**:
  - - Vai nào được ĐỌC lịch sử phân quyền? Bảng chưa tồn tại nên chưa có gì phải sửa — nhưng dựng theo khuôn đọc rộng đang áp cho các bảng khác thì mọi vai trò đọc được toàn bộ lịch sử phân quyền của mọi người; đá với RFP §09-06 (RFP:886). Phải quyết trước khi tạo bảng.
  - - Bộ phận kiểm toán nội bộ có phải đọc được lịch sử quyền không? FR-AUDIT-02 (RFP:711) nêu người đọc vết là "bộ phận hành chính / kiểm toán nội bộ" — không khớp vai trò nào trong TBL-ROLE-01 (RFP:245).
  - - Người bị từ chối khi gọi API ghi nhận mã nào — cùng 404 như vào trang; hay một mã khác? Hai mã khác nhau là để người ngoài suy ra sự tồn tại của tài nguyên.
- **bbox**: startX=26 startY=1682 endX=1026 endY=1801

