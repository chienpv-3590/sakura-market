# Items Analysis - SC-02 Xác thực MFA và thiết lập bảo mật

- Nguồn: ảnh `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.png` (1280x2061; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3

### Item 4.5: Nút Xác thực

- **nameJP**: -
- **nameTrans**: Verify button
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
- **transitionNote**: Xác thực thành công đưa người dùng tới khu vực làm việc của vai trò được gán ở SC-01; thất bại thì ở lại màn này.
- **databaseTable**: audit_log
- **databaseColumn**: -
- **databaseNote**: Sinh một bản ghi vết thao tác theo FR-AUDIT-01 (RFP:710) trên miền D-PARTY (RFP:602); bảng vết thao tác đã tồn tại thật.
- **validationNote**:
  - Điều kiện: hai trường bắt buộc của khối phải có giá trị.
  - Điều kiện: tài khoản không đang trong thời gian khoá tạm — NFR-SEC-03 (RFP:811).
  - Lỗi: "Mã không đúng hoặc đã hết hiệu lực." — giữ nguyên giá trị đang nhập ở các trường khác.
  - Lỗi: "Tài khoản đang bị khoá tạm; vui lòng thử lại sau." — chỉ còn đường đăng xuất.
- **description**:
  - Mục đích và ngữ cảnh: hoàn tất bước nâng mức phiên và mở đường vào dữ liệu nghiệp vụ
  - Thành phần hiển thị: một nút chính nhãn chữ đặt dưới ba trường của khối
  - Chức năng và logic: xác thực thành công thì phiên đủ mức và người dùng đi tiếp tới khu vực làm việc của vai trò mình; mỗi lần thử sinh một bản ghi log theo khối 3
- **qa**:
  - - Bấm nút hai lần liên tiếp thì lần thứ hai bị chặn ở đâu? Thiết kế chỉ nói trạng thái đang gửi vô hiệu nút.
  - - Xác thực thành công có làm mới thời điểm hết hiệu lực của phiên không? Thiết kế không khai.
- **bbox**: startX=42 startY=768 endX=114 endY=797

### Item 4.6: Nút Đăng xuất

- **nameJP**: -
- **nameTrans**: Sign out button
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
- **transitionNote**: Kết thúc phiên và quay về SC-01 kèm lý do hiện ở vùng thông báo lý do của màn đó.
- **databaseTable**: audit_log
- **databaseColumn**: -
- **databaseNote**: Sinh bản ghi vết đăng xuất theo FR-AUDIT-01 (RFP:710); khối 1 của SC-01 liệt sự kiện này là một trong 5 sự kiện log bắt buộc.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: đường ra duy nhất khi người dùng không hoàn tất được bước yếu tố thứ hai
  - Thành phần hiển thị: một nút phụ nhãn chữ đặt cạnh nút Xác thực
  - Chức năng và logic: kết thúc phiên và quay về SC-01; đây là hành động duy nhất còn dùng được ở trạng thái bị khoá tạm
- **qa**: -
- **bbox**: startX=117 startY=768 endX=197 endY=797

### Item 4.7: Vùng cố ý để trống

- **nameJP**: 意図的空白エリア
- **nameTrans**: Intentionally blank area
- **itemType**: others
- **itemSubtype**: scope_out_area
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
  - Mục đích và ngữ cảnh: khai thẳng những gì tài liệu công khai này cố ý không mô tả — để người đọc không hiểu là thiết kế thiếu
  - Thành phần hiển thị: một khung viền nét đứt chiếm nửa phải của khối; bên trong là nhãn vùng và một đoạn chú thích ba hạng mục
  - Chức năng và logic: ba hạng mục không vẽ chốt ở tài liệu bảo mật nội bộ; màn thật vẫn có phần này nhưng nội dung không nằm trong tài liệu thiết kế công khai
- **qa**: - Vùng này trên màn thật chứa gì; và ai duyệt nội dung đó? Thiết kế công khai cố ý không mô tả nên phần này phải có một tài liệu riêng trước khi dựng.
- **bbox**: startX=532 startY=513 endX=1010 endY=797

### Item 5: Khối thiết lập bảo mật của chính tài khoản

- **nameJP**: 自アカウントのセキュリティ設定ブロック
- **nameTrans**: Own account security settings block
- **itemType**: others
- **itemSubtype**: form_section
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
- **databaseNote**: Thực thể tài khoản người dùng nội bộ của miền D-PARTY (RFP:602). Bảng đã tồn tại thật nhưng chỉ phủ được hai trường khoá tạm; các trường yếu tố xác thực chưa có nguồn.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: nơi người dùng tự xem và tự quản yếu tố xác thực của mình; và xem trạng thái bảo mật của phiên — phần FE-004 của NFR-SEC-03 (RFP:811)
  - Thành phần hiển thị: một nhãn khối; bốn trường bên trái; ba trường chỉ đọc và hai nút bên phải
  - Chức năng và logic: mọi trường ở khối này thuộc CHÍNH tài khoản đang đăng nhập — màn này không đọc và không sửa thiết lập của người khác; việc đó thuộc SC-03 và SC-04
- **qa**: -
- **bbox**: startX=26 startY=826 endX=1026 endY=1201

### Item 5.1: Tiêu đề khối thiết lập bảo mật

- **nameJP**: -
- **nameTrans**: Security settings block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm hai mã tính năng mà khối này thoả
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và hai mã FE-002 và FE-004
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=842 endX=1010 endY=859

### Item 5.2: Trường Trạng thái yếu tố xác thực (chỉ đọc)

- **nameJP**: 認証要素の登録状態
- **nameTrans**: Factor status (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đã đăng ký · 1 yếu tố
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Suy từ dữ liệu của nhà cung cấp xác thực; thực thể tài khoản nội bộ của D-PARTY (RFP:602) CHƯA có cột nào phản ánh trạng thái này.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho chính chủ biết tài khoản mình đã đăng ký yếu tố xác thực chưa — và nếu thuộc diện bắt buộc mà chưa đăng ký thì nói rõ là chưa thoả yêu cầu
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc mang trạng thái đăng ký kèm số yếu tố; và một dòng chú thích về ca chưa thoả
  - Chức năng và logic: chỉ đọc; giá trị suy từ số yếu tố đã đăng ký của phiên chứ không phải một trường người dùng nhập
- **qa**: - Trường này hiện số yếu tố hay chỉ hiện có/không? Ảnh cho thấy có số nhưng nêu số lượng yếu tố cũng là tiết lộ mức phòng thủ của tài khoản; và trường này còn xuất hiện lại ở SC-03 và SC-04 cho tài khoản người khác.
- **bbox**: startX=42 startY=870 endX=521 endY=938

### Item 5.3: Trường Bí mật xác thực hiện tại

- **nameJP**: 現在の認証シークレット
- **nameTrans**: Current authentication secret input
- **itemType**: text_form
- **itemSubtype**: secret_input
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đặt việc giữ bí mật xác thực ở nhà cung cấp xác thực; thực thể tài khoản nội bộ của D-PARTY (RFP:602) không có cột tương ứng.
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: xác thực lại trước MỌI thay đổi yếu tố; kể cả khi phiên đang còn hiệu lực.
  - Lỗi: "Xác thực lại không thành công." — không thực hiện thay đổi yếu tố nào.
- **description**:
  - Mục đích và ngữ cảnh: buộc người dùng chứng minh lại danh tính trước khi đổi yếu tố xác thực — chặn đường người chiếm được phiên tự thay yếu tố
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập che ký tự; và một dòng chú thích nêu rõ áp cho mọi thay đổi
  - Chức năng và logic: phiên còn hiệu lực không miễn bước này; xác thực lại thất bại thì không thay đổi gì và vẫn sinh bản ghi log
- **qa**:
  - - Xác thực lại có hiệu lực trong bao lâu — mỗi thay đổi một lần; hay một lần cho cả phiên làm việc? Thiết kế nói "trước mọi thay đổi" nên mặc định là mỗi lần.
  - - Lần xác thực lại thất bại có đếm vào bộ đếm khoá tạm không? Thiết kế không khai.
- **bbox**: startX=42 startY=949 endX=521 endY=1017

### Item 5.4: Trường Đăng ký yếu tố mới

- **nameJP**: 新しい認証要素の登録
- **nameTrans**: Enroll new factor selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Danh sách phương thức được phép là cấu hình; thiết kế không đòi lưu vào thực thể tài khoản nội bộ của D-PARTY (RFP:602).
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: chỉ liệt phương thức đang được cho phép.
  - Điều kiện: phương thức ngoài danh sách cho phép bị từ chối Ở SERVER — không chỉ ẩn ở màn.
  - Lỗi: "Phương thức này chưa được bật." — khi giá trị gửi lên không thuộc danh sách cho phép.
- **description**:
  - Mục đích và ngữ cảnh: đăng ký một yếu tố xác thực mới cho chính tài khoản đang đăng nhập
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select liệt phương thức đang được cho phép; và một dòng chú thích về nơi chặn
  - Chức năng và logic: danh sách render từ cấu hình cho phép; nhưng lớp chặn thật nằm ở server vì ẩn ở màn không phải chặn
- **qa**:
  - - Danh sách phương thức được cho phép khai ở đâu và ai đổi được? Thiết kế nói là cấu hình nhưng không khai nơi khai báo.
  - - Đăng ký yếu tố mới có yêu cầu xác nhận yếu tố đó hoạt động trước khi tính là đã đăng ký không? Thiết kế không vẽ bước xác nhận.
- **bbox**: startX=42 startY=1028 endX=521 endY=1096

### Item 5.5: Trường Mã dự phòng (chỉ đọc)

- **nameJP**: バックアップコード
- **nameTrans**: Recovery code status (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Còn hiệu lực
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Mã dự phòng do nhà cung cấp xác thực giữ; thiết kế cố ý không đòi cột nào trên thực thể tài khoản nội bộ của D-PARTY (RFP:602).
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho chính chủ biết mã dự phòng còn dùng được hay đã hết — không hơn
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc chỉ mang hai giá trị còn hiệu lực hay đã hết; và một dòng chú thích về điều cấm
  - Chức năng và logic: KHÔNG bao giờ hiện nội dung mã; kể cả cho chính chủ — nội dung và cách phát mã chốt ở tài liệu bảo mật nội bộ
- **qa**:
  - - Người dùng lấy mã dự phòng mới bằng đường nào? Màn này chỉ hiện trạng thái; thiết kế không vẽ đường phát mã vì đó là nội dung của tài liệu bảo mật nội bộ.
  - - Mã dự phòng hết mà tài khoản vẫn thuộc diện bắt buộc thì màn có chặn gì không? Thiết kế không khai.
- **bbox**: startX=42 startY=1107 endX=521 endY=1175

### Item 5.6: Trường Timeout phiên (chỉ đọc)

- **nameJP**: セッションタイムアウト
- **nameTrans**: Session timeout policy (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Theo cấu hình: giới hạn tổng và giới hạn không hoạt động
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Chính sách timeout là cấu hình phiên; thiết kế không đòi lưu vào thực thể tài khoản nội bộ của D-PARTY (RFP:602).
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho người dùng thấy chính sách timeout đang áp cho phiên của mình — nghiệm thu NFR-SEC-03 (RFP:811) là "kiểm thử bảo mật và review log" nên chính sách phải xem được
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc nêu hai loại giới hạn là giới hạn tổng và giới hạn không hoạt động; và một dòng chú thích về nguồn thời lượng
  - Chức năng và logic: chỉ đọc và lấy từ cấu hình server; thời lượng cụ thể do chủ đầu tư chốt nên màn không cứng hoá con số nào
- **qa**:
  - - Thời lượng giới hạn tổng và giới hạn không hoạt động là bao nhiêu? NFR-SEC-03 (RFP:811) đòi phải có timeout nhưng KHÔNG định lượng — con số phải khách chốt.
  - - Timeout quá ngắn thì người dùng bị đăng xuất giữa khung giờ nghiệp vụ 02:00–10:00 JST mà NFR-AVL-01 (RFP:804) đặt mục tiêu khả dụng — hai yêu cầu này cân với nhau thế nào?
  - - Phiên hết hiệu lực giữa lúc đang nhập dữ liệu thì dữ liệu chưa gửi xử lý ra sao? Thiết kế không khai.
- **bbox**: startX=532 startY=870 endX=1010 endY=955

### Item 5.7: Trường Trạng thái khoá tạm (chỉ đọc)

- **nameJP**: 一時ロック状態
- **nameTrans**: Temporary lock state (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Không bị khoá
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: failed_login_count; locked_until
- **databaseNote**: Hai cột đếm số lần sai và mốc hết khoá trên thực thể tài khoản nội bộ của D-PARTY (RFP:602); đã tồn tại thật. Ngưỡng và thời lượng là giá trị cấu hình — NFR-SEC-03 (RFP:811) không định lượng.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho chính chủ thấy tài khoản mình có đang bị khoá tạm hay không — phần "khoá tạm khi nhập sai nhiều lần" của NFR-SEC-03 (RFP:811)
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc mang trạng thái khoá; và một dòng chú thích về nguồn của ngưỡng và thời lượng
  - Chức năng và logic: chỉ đọc; khoá tạm tự hết theo thời gian nên đây là trục độc lập với quyền tài khoản do SC-03 quản
- **qa**:
  - - Ngưỡng số lần sai và thời lượng khoá tạm là bao nhiêu? NFR-SEC-03 (RFP:811) không định lượng; con số phải khách chốt trước khi dựng.
  - - Trường này có hiện thời điểm hết khoá cho chính chủ không? Nêu thời điểm giúp người dùng khỏi thử vô ích nhưng cũng là thông tin về mức phòng thủ.
  - - Quản trị mở khoá tạm ở SC-03 hoặc SC-04 thì trường này đổi ngay hay chờ lần tải lại? Thiết kế không khai.
- **bbox**: startX=532 startY=965 endX=1010 endY=1034

### Item 5.8: Trường Hành vi bất thường phải ghi log (chỉ đọc)

- **nameJP**: 記録対象の異常行動
- **nameTrans**: Anomalous behaviour log list (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Chỉ đọc — tra cứu ở SC-30
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: actor_id; action; created_at
- **databaseNote**: Vết thao tác của miền D-PARTY (RFP:602) theo FR-AUDIT-01 (RFP:710); ba cột chủ thể; loại thao tác và thời điểm đã tồn tại thật. Nội dung "nguồn lạ" mà thiết kế đòi CHƯA có cột tương ứng.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: khai 6 loại hành vi bất thường phải sinh bản ghi log — phần "log các hành vi bất thường" của NFR-SEC-03 (RFP:811)
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc trỏ sang SC-30 để tra cứu; và một dòng chú thích liệt 6 loại sự kiện
  - Chức năng và logic: màn này là nơi sinh bản ghi cho 6 loại sự kiện đó; nơi tra cứu là SC-30 nên khối này không có phần hiển thị log
- **qa**:
  - - "Xác thực từ nguồn lạ" định nghĩa thế nào — khác địa chỉ mạng; khác thiết bị; hay khác vùng địa lý? Thiết kế chỉ ghi tên sự kiện; và dữ liệu này thuộc diện thông tin cá nhân theo RFP §09-06 (RFP:886).
  - - 6 loại sự kiện này có cần phát cảnh báo cho quản trị không; hay chỉ ghi log? NFR-OPS-01 (RFP:814) đòi giám sát được sự kiện bảo mật nên có thể phải có alert.
  - - Ai được đọc các bản ghi này ở SC-30? Đây là quyết định còn để ngỏ; xem ghi chú phân quyền ở chân màn.
- **bbox**: startX=532 startY=1044 endX=1010 endY=1129

### Item 5.9: Nút Lưu thiết lập

- **nameJP**: -
- **nameTrans**: Save settings button
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
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: -
- **databaseNote**: Sinh bản ghi vết thao tác theo FR-AUDIT-01 (RFP:710) trên miền D-PARTY (RFP:602). Thay đổi yếu tố do nhà cung cấp xác thực giữ nên không ghi vào thực thể tài khoản nội bộ.
- **validationNote**:
  - Điều kiện: bí mật xác thực hiện tại phải đúng — xác thực lại trước mọi thay đổi yếu tố.
  - Điều kiện: phương thức đăng ký phải thuộc danh sách được phép.
  - Lỗi: "Xác thực lại không thành công." — không lưu gì.
  - Lỗi: "Phương thức này chưa được bật." — không lưu gì.
- **description**:
  - Mục đích và ngữ cảnh: ghi thay đổi thiết lập bảo mật của chính tài khoản — chủ yếu là đăng ký yếu tố mới
  - Thành phần hiển thị: một nút chính nhãn chữ đặt ở đáy cột phải của khối
  - Chức năng và logic: chỉ chạy sau khi xác thực lại thành công; mỗi lần lưu sinh một bản ghi log thuộc 6 loại sự kiện ở trường trên
- **qa**: - Lưu thành công có buộc xác thực lại bằng yếu tố mới ngay không? Thiết kế không vẽ bước xác nhận yếu tố mới hoạt động.
- **bbox**: startX=532 startY=1142 endX=623 endY=1171

### Item 5.10: Nút Huỷ một yếu tố

- **nameJP**: -
- **nameTrans**: Unenroll factor button
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
- **databaseTable**: audit_log
- **databaseColumn**: -
- **databaseNote**: Sinh bản ghi vết theo FR-AUDIT-01 (RFP:710); là một trong 6 loại hành vi bất thường phải ghi log ở trường trên.
- **validationNote**:
  - Điều kiện: bí mật xác thực hiện tại phải đúng.
  - Điều kiện: KHÔNG cho huỷ yếu tố cuối cùng khi tài khoản vẫn thuộc diện bắt buộc MFA — không cho tài khoản tự hạ mức bảo mật của mình.
  - Lỗi: "Không thể huỷ yếu tố cuối cùng của tài khoản thuộc diện bắt buộc xác thực đa yếu tố." — giữ nguyên yếu tố.
- **description**:
  - Mục đích và ngữ cảnh: huỷ một yếu tố xác thực đã đăng ký của chính tài khoản — ví dụ khi mất thiết bị
  - Thành phần hiển thị: một nút mang sắc thái cảnh báo nhãn chữ đặt cạnh nút Lưu thiết lập
  - Chức năng và logic: chặn cứng ca huỷ yếu tố cuối khi còn thuộc diện bắt buộc; bỏ chặn này thì NFR-SEC-01 (RFP:809) chỉ còn là hình thức vì ai cũng tự hạ mức được
- **qa**:
  - - Người mất hết thiết bị và hết mã dự phòng thì lấy lại truy cập bằng đường nào? Luồng khôi phục cố ý không mô tả trong tài liệu công khai này nhưng phải có trước khi dựng.
  - - Quản trị hệ thống có được huỷ yếu tố của người khác không? Màn này chỉ phủ chính chủ; thiết kế không giao việc đó cho SC-03 hay SC-04.
- **bbox**: startX=627 startY=1142 endX=734 endY=1171

### Item 6: Khối trạng thái màn

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
- **bbox**: startX=26 startY=1214 endX=1026 endY=1485

