# Items Analysis - SC-04 Chi tiết tài khoản và lịch sử quyền

- Nguồn: ảnh `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.png` (1280x1823; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3

### Item 3.10: Nút Lưu thay đổi quyền

- **nameJP**: -
- **nameTrans**: Save permission change button
- **itemType**: button
- **itemSubtype**: primary_action
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Lưu thành công thì màn nạp lại khối 1 với giá trị mới và thêm một dòng vào đầu bảng lịch sử ở khối 2.
- **databaseTable**: app_user
- **databaseColumn**: role; is_active; display_name
- **databaseNote**: Đổi ba cột trên thực thể tài khoản nội bộ của D-PARTY (RFP:602) — bảng đã tồn tại thật. Kèm một dòng ở bảng lịch sử quyền; bảng đó CHƯA tồn tại. Hai nơi ghi phải cùng thành công hoặc cùng không — nếu không thì sinh đúng ca FR-IAM-02 (RFP:628) cấm.
- **validationNote**:
  - Điều kiện: lý do thay đổi phải không rỗng.
  - Điều kiện: vai trò phải thuộc 7 vai trò nội bộ của TBL-ROLE-01 (RFP:245).
  - Điều kiện: bản ghi phải chưa bị người khác đổi từ lúc màn đọc — so theo giá trị cũ chứ không ghi đè mù.
  - Điều kiện: KHÔNG cho tự đổi vai trò của chính mình ra khỏi ROLE-SYS-ADMIN; KHÔNG cho tạm ngừng tài khoản quản trị đang hoạt động cuối cùng.
  - Lỗi: "Bản ghi đã bị thay đổi bởi người khác; vui lòng xem giá trị mới và xác nhận lại." — không ghi đè im lặng.
  - Lỗi: "Phải nhập lý do thay đổi quyền." — không ghi gì.
- **description**:
  - Mục đích và ngữ cảnh: ghi thay đổi quyền và sinh dòng lịch sử tương ứng — đây là chỗ FR-IAM-02 (RFP:628) được thoả hay không được thoả
  - Thành phần hiển thị: một nút chính nhãn chữ đặt ở cột phải của khối; cạnh hai nút còn lại
  - Chức năng và logic: thứ tự ghi phải bảo đảm không có ca "quyền đã đổi mà không có dòng before/after": đọc giá trị cũ; ghi dòng lịch sử; rồi đổi bản ghi tài khoản có so giá trị cũ — thất bại thì ghi bù chứ không xoá dòng đã ghi
- **qa**:
  - - Hai nơi ghi (bản ghi tài khoản và dòng lịch sử) có chạy trong cùng một biên giao dịch không? Không cùng biên thì tồn tại ca quyền đã đổi mà không có dòng before/after — đúng thứ nghiệm thu FR-IAM-02 (RFP:628) cấm.
  - - Bản ghi tài khoản không có cột phiên bản nên so theo giá trị cũ — so trên những cột nào? Thiết kế chỉ nói "từ chối; hiện giá trị mới; bắt xác nhận lại".
  - - Đổi vai trò và đổi trạng thái quyền cùng lúc sinh một dòng hay hai dòng lịch sử? Cột loại thay đổi ở khối 2 chỉ có một giá trị mỗi dòng.
- **bbox**: startX=532 startY=522 endX=657 endY=551

### Item 3.11: Nút Mở khoá tạm

- **nameJP**: -
- **nameTrans**: Unlock button
- **itemType**: button
- **itemSubtype**: secondary_action
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: failed_login_count; locked_until
- **databaseNote**: Đặt lại hai cột đếm số lần sai và mốc hết khoá của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); cả hai đã tồn tại thật. Kèm một dòng loại "mở khoá tạm" ở bảng lịch sử quyền — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: tài khoản phải đang trong thời gian khoá tạm.
  - Lỗi: "Tài khoản không đang bị khoá tạm." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: gỡ khoá tạm cho tài khoản đang xem — thuộc NFR-SEC-03 (RFP:811) chứ không phải một chuyển tiếp quyền
  - Thành phần hiển thị: một nút phụ nhãn chữ đặt cạnh nút Lưu thay đổi quyền
  - Chức năng và logic: không đổi trạng thái quyền; nhưng vẫn sinh một dòng ở cùng bảng lịch sử để người kiểm chỉ phải đọc một dòng thời gian — RFP §02-08 (RFP:310) liệt lock/unlock tài khoản là thao tác độ nhạy cao bắt buộc truy vết
- **qa**: - Dòng "mở khoá tạm" ghi cặp trước và sau như thế nào? Trạng thái quyền không đổi nên hai ô Trước và Sau mang giá trị giống nhau; thiết kế không khai cách trình bày ca này.
- **bbox**: startX=661 startY=522 endX=757 endY=551

### Item 3.12: Nút Tạm ngừng

- **nameJP**: -
- **nameTrans**: Suspend button
- **itemType**: button
- **itemSubtype**: danger_action
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: is_active
- **databaseNote**: Đổi cột trạng thái quyền của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật. Kèm một dòng ở bảng lịch sử quyền — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: tài khoản phải đang hoạt động.
  - Điều kiện: lý do thay đổi phải không rỗng.
  - Điều kiện: KHÔNG cho tạm ngừng tài khoản quản trị đang hoạt động cuối cùng.
  - Lỗi: "Không thể tạm ngừng tài khoản quản trị đang hoạt động cuối cùng." — không ghi thay đổi.
  - Lỗi: "Phải nhập lý do tạm ngừng quyền." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: đường tắt cho chuyển tiếp tạm ngừng — cùng dấu vết như đổi giá trị ở trường quyền tài khoản
  - Thành phần hiển thị: một nút mang sắc thái cảnh báo nhãn chữ đặt cuối hàng nút của khối
  - Chức năng và logic: sinh một dòng lịch sử loại "tạm ngừng" mang cặp trước và sau; hai cửa chặn cứng nằm ở tầng ghi chứ không chỉ ẩn nút
- **qa**: - Nút Tạm ngừng và trường Quyền tài khoản làm cùng một việc — hai đường vào cùng một thay đổi có sinh cùng một loại dòng lịch sử không? Thiết kế không khai.
- **bbox**: startX=760 startY=522 endX=846 endY=551

### Item 3.13: Ghi chú đổi vai trò làm phiên chưa đủ mức

- **nameJP**: -
- **nameTrans**: Role change downgrades session note
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
  - Mục đích và ngữ cảnh: chốt hệ quả xuyên màn của việc đổi vai trò — thao tác ở màn này làm phiên đang sống của người khác đổi mức bảo mật
  - Thành phần hiển thị: một dòng chú thích một câu nối SC-04 sang SC-02
  - Chức năng và logic: hệ quả xảy ra ở lần điều hướng kế tiếp của người bị đổi chứ không tức thời — nên vẫn còn một khoảng người đó giữ mức cũ
- **qa**: - Khoảng thời gian giữa lúc đổi vai trò và lúc phiên người đó bị hạ mức là bao lâu; và có cần chấm dứt phiên ngay không? Thiết kế chỉ nói "lần điều hướng kế tiếp".
- **bbox**: startX=532 startY=554 endX=1010 endY=586

### Item 4: Khối lịch sử quyền before/after

- **nameJP**: 権限履歴ブロック
- **nameTrans**: Permission history block
- **itemType**: others
- **itemSubtype**: history_section
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
- **databaseNote**: Bảng lịch sử quyền của miền D-PARTY (RFP:602) — CHƯA TỒN TẠI. Tiền lệ cấu trúc để bắt chước là bảng lịch sử trạng thái người tham gia của cùng miền: một dòng cho mỗi lần chuyển; có giá trị từ và giá trị đến; lý do; chủ thể; thời điểm; và chỉ ghi thêm.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chỗ duy nhất trong toàn bộ 32 màn nhìn thấy được cả before/after; chủ thể và timestamp cho quyền tài khoản nội bộ
  - Thành phần hiển thị: một nhãn khối; một bảng sáu cột; và một dòng ghi chú về năm loại thay đổi và tính chỉ-ghi-thêm
  - Chức năng và logic: khối này là phần không được cắt của màn; nghiệm thu FR-IAM-02 (RFP:628) đòi HIỂN THỊ được ba thứ đó chứ không chỉ lưu được
- **qa**:
  - - Lịch sử quyền là bảng riêng hay gộp vào vết thao tác chung? Gộp thì không truy vấn được "ai từng giữ vai trò nào"; tách thì có hai vết ghi phải giữ đồng bộ.
  - - Thời hạn lưu lịch sử quyền là bao lâu? DR-RET-01 (RFP:813) nêu 7 năm cho dữ liệu nghiệp vụ tra cứu online nhưng không nói rõ vết phân quyền có thuộc diện đó.
  - - Tài khoản bị xoá khỏi danh bạ xác thực thì lịch sử quyền của tài khoản đó còn giữ không? Mất lịch sử là mất dấu vết kiểm toán; giữ lại thì đi ngược yêu cầu xoá dữ liệu cá nhân ở RFP §09-06 (RFP:887).
- **bbox**: startX=26 startY=749 endX=1026 endY=991

### Item 4.1: Tiêu đề khối lịch sử quyền

- **nameJP**: -
- **nameTrans**: History block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm lời nhắc đây là yêu cầu hiển thị bắt buộc
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối; cụm before/after và mã FR-IAM-02
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=765 endX=1010 endY=782

### Item 4.2: Bảng lịch sử quyền

- **nameJP**: 権限履歴表
- **nameTrans**: Permission history table
- **itemType**: table
- **itemSubtype**: history_table
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
- **databaseNote**: Bảng lịch sử quyền của miền D-PARTY (RFP:602) — CHƯA TỒN TẠI. Đề xuất tách cặp trước và sau thành hai cặp cột (vai trò từ/đến; quyền từ/đến) để truy vấn được theo vai trò; khác cách vết thao tác chung gói cả bản ghi vào một cột.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: sáu cột phủ đúng ba thứ nghiệm thu FR-IAM-02 (RFP:628) đòi — cặp trước và sau; chủ thể thực hiện; và thời điểm — cộng lý do và loại thay đổi
  - Thành phần hiển thị: một bảng sáu cột với hàng tiêu đề và ba hàng dữ liệu mẫu; ô loại thay đổi mang thẻ nhãn
  - Chức năng và logic: cả hai cột Trước và Sau mang CẶP giá trị vai trò cộng quyền tài khoản; kể cả khi chỉ một nửa đổi — đọc một dòng là biết đủ trạng thái chứ không phải suy từ dòng trước
- **qa**:
  - - Bảng này có phân trang không; và sắp theo thứ tự nào? Ảnh cho thấy thứ tự tăng theo thời gian nhưng tài khoản lâu năm sẽ có nhiều dòng.
  - - Có cần lọc lịch sử theo loại thay đổi không? Không lọc thì dòng "mở khoá tạm" thường ngày lấn hết các dòng thay đổi quyền thật.
  - - Vai nào được ĐỌC bảng này? Đây là quyết định của bên dự thầu theo RFP §02-08 (RFP:311); nếu dùng lại khuôn đọc rộng đang áp cho các bảng khác thì mọi vai trò đọc được toàn bộ lịch sử phân quyền của mọi người — đá với RFP §09-06 (RFP:886). Phải quyết TRƯỚC khi tạo bảng.
- **bbox**: startX=42 startY=793 endX=1010 endY=913

### Item 4.2.1: Dòng lịch sử quyền (đại diện)

- **nameJP**: -
- **nameTrans**: Permission history row (representative)
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
- **databaseNote**: Một dòng ứng với một lần chuyển của bảng lịch sử quyền thuộc miền D-PARTY (RFP:602); bảng CHƯA tồn tại.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: một dòng lịch sử — lấy dòng đầu tiên loại "cấp quyền" làm đại diện cho cả ba dòng mẫu có cùng kết cấu
  - Thành phần hiển thị: sáu ô theo đúng thứ tự cột; ô loại thay đổi mang thẻ nhãn; ô Trước của dòng cấp quyền để gạch ngang vì chưa có trạng thái trước
  - Chức năng và logic: lặp theo số lần thay đổi của tài khoản; kết cấu giống nhau nên gộp về một dòng đại diện — dòng đầu tiên là ca đặc biệt duy nhất vì không có giá trị trước
- **qa**: - Dòng cấp quyền đầu tiên để ô Trước là gạch ngang — có phải thời điểm của dòng này luôn khớp trường Ngày cấp quyền ở khối 1 không? Lệch nhau là dấu hiệu lịch sử thiếu đoạn đầu.
- **bbox**: startX=43 startY=821 endX=1010 endY=852

### Item 4.2.2: Thẻ loại thay đổi trong dòng (đại diện)

- **nameJP**: 変更種別バッジ
- **nameTrans**: Change type badge (representative)
- **itemType**: label
- **itemSubtype**: status_tag
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
- **databaseNote**: Cột loại thay đổi của bảng lịch sử quyền thuộc miền D-PARTY (RFP:602); bảng CHƯA tồn tại. Tập giá trị nên là ràng buộc dữ liệu chứ không phải quy ước ở tầng ứng dụng.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: phân loại từng dòng lịch sử để người kiểm đọc nhanh cột thời gian
  - Thành phần hiển thị: một thẻ chữ nhỏ viền bo với năm giá trị: cấp quyền; đổi vai trò; tạm ngừng; mở lại; mở khoá tạm — lấy thẻ của dòng đầu làm đại diện
  - Chức năng và logic: bốn giá trị đầu là thay đổi quyền theo FR-IAM-02 (RFP:628); giá trị thứ năm thuộc NFR-SEC-03 (RFP:811) nhưng ghi cùng chỗ để chỉ có một dòng thời gian
- **qa**: - Tập năm giá trị này đóng hay còn mở? Đóng thì thêm loại thay đổi mới phải đổi ràng buộc dữ liệu; mở thì mỗi nơi ghi tự đặt tên và bảng mất khả năng lọc.
- **bbox**: startX=168 startY=827 endX=228 endY=846

### Item 4.3: Ghi chú năm loại thay đổi và tính chỉ ghi thêm

- **nameJP**: -
- **nameTrans**: Change types and append-only note
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
  - Mục đích và ngữ cảnh: chốt ba quy tắc đọc của bảng: năm loại thay đổi và nguồn yêu cầu của từng nhóm; cặp giá trị ở hai cột trước và sau; và tính chỉ ghi thêm
  - Thành phần hiển thị: một đoạn chú thích ba câu bao trọn cả ba quy tắc
  - Chức năng và logic: chỉ ghi thêm nghĩa là không có đường sửa và không có đường xoá từ trong ứng dụng — sửa được lịch sử quyền thì lịch sử vô nghĩa với kiểm toán
- **qa**:
  - - "Chỉ ghi thêm" áp ở tầng nào — ràng buộc dữ liệu; hay chỉ là kỷ luật ở tầng ứng dụng? Nếu chỉ ở tầng ứng dụng thì ai có quyền ghi vẫn sửa được.
  - - Ghi sai một dòng lịch sử thì sửa bằng cách nào? Chỉ ghi thêm nên phải ghi một dòng bù; thiết kế không khai loại thay đổi nào dùng cho dòng bù đó.
- **bbox**: startX=42 startY=916 endX=1010 endY=965

### Item 5: Khối trạng thái màn

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
- **bbox**: startX=26 startY=1004 endX=1026 endY=1275

### Item 5.1: Tiêu đề khối trạng thái màn

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
- **bbox**: startX=42 startY=1020 endX=1010 endY=1037

### Item 5.2: Lưới thẻ trạng thái màn

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
  - Thành phần hiển thị: 8 thẻ có cùng kết cấu: Chưa có thay đổi nào; Đang tải; Lỗi tải; Không có quyền; Không tìm thấy tài khoản; Thiếu lý do; Bị chặn theo quy tắc; Xung đột
  - Chức năng và logic: hai trạng thái Không có quyền và Không tìm thấy tài khoản trả CÙNG một mã 404 — có chủ đích để người xem không phân biệt được hai ca; trạng thái Lỗi tải phải chặn cả đường sửa quyền vì không được sửa khi chưa đọc được lịch sử
- **qa**:
  - - Trạng thái "Chưa có thay đổi nào" đòi nói rõ là thiếu dấu vết chứ không hiện bảng rỗng lặng lẽ — câu thông báo nói gì? Một tài khoản tồn tại mà không có dòng cấp quyền là dấu hiệu dữ liệu thiếu; không phải trạng thái bình thường.
  - - Trạng thái "Xung đột" hiện giá trị mới của người khác — hiện cả lý do người đó nhập không? Lý do là dữ liệu của dòng lịch sử nên có thể chứa thông tin không nên phơi.
- **bbox**: startX=42 startY=1048 endX=1010 endY=1259

### Item 5.2.1: Thẻ trạng thái màn (đại diện)

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
  - Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên "Chưa có thay đổi nào" làm đại diện cho cả 8 thẻ có cùng kết cấu
  - Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả; thẻ đại diện phân biệt hai ca là chỉ có dòng cấp quyền và trống hẳn
  - Chức năng và logic: lặp 8 lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên gộp về một thẻ đại diện
- **qa**: -
- **bbox**: startX=42 startY=1048 endX=277 endY=1158

### Item 6: Khối đối chiếu prototype

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
  - Chức năng và logic: hai hàng ở mức "cần khách chốt" là hai chỗ tài liệu khách không phủ: lý do bắt buộc; và vai nào được đọc lịch sử phân quyền
- **qa**: -
- **bbox**: startX=26 startY=1288 endX=1026 endY=1667

