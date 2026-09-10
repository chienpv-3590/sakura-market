# Items Analysis - SC-02 Xác thực MFA và thiết lập bảo mật

- Nguồn: ảnh `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.png` (1280x2061; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 1/3

### Item 1: Khối tiêu đề màn

- **nameJP**: 画面ヘッダー
- **nameTrans**: Screen header block
- **itemType**: others
- **itemSubtype**: screen_header
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
  - Mục đích và ngữ cảnh: dải đầu trang định vị người đọc — màn nào; thoả tính năng nào; ai là actor
  - Thành phần hiển thị: một tiêu đề màn; một dòng meta truy vết yêu cầu; và một thẻ trạng thái thi công
  - Chức năng và logic: chỉ hiển thị — không có tương tác và không có trường nhập
- **qa**: -
- **bbox**: startX=26 startY=22 endX=1026 endY=103

### Item 1.1: Tiêu đề màn

- **nameJP**: 画面タイトル
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: page_title
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
  - Mục đích và ngữ cảnh: tên màn đặt ngay đầu trang
  - Thành phần hiển thị: một dòng chữ đậm gồm mã màn SC-02 và tên màn tiếng Việt
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=26 startY=22 endX=1026 endY=48

### Item 1.2: Dòng meta truy vết yêu cầu

- **nameJP**: 要件トレース情報
- **nameTrans**: Requirement trace meta line
- **itemType**: label
- **itemSubtype**: screen_meta
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
  - Mục đích và ngữ cảnh: chuỗi truy vết của màn theo Feature List — màn này gánh hai tính năng và hai yêu cầu phi chức năng
  - Thành phần hiển thị: hai mã FE-002 và FE-004; nhóm FN-01; ưu tiên P0; hai mã NFR-SEC-01 và NFR-SEC-03; loại màn Form; và actor
  - Chức năng và logic: văn bản tĩnh — các mã không phải liên kết điều hướng
- **qa**: - Actor ghi "các vai trò có quyền phê duyệt nội bộ" nhưng RFP không liệt vai nào có quyền phê duyệt — diện actor thật là gì? Xem thêm ghi chú ở khối 1.
- **bbox**: startX=26 startY=60 endX=1026 endY=79

### Item 1.3: Thẻ trạng thái thi công

- **nameJP**: -
- **nameTrans**: Build status tag
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
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho biết màn này chưa có bản thi công để đối chiếu
  - Thành phần hiển thị: một thẻ chữ nhỏ viền bo với chữ "Chưa thi công"
  - Chức năng và logic: nhãn tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=836 startY=60 endX=912 endY=79

### Item 2: Khối chú dẫn nền thiết kế và ranh giới tài liệu

- **nameJP**: 設計根拠と文書範囲の注記
- **nameTrans**: Design ground and document scope note
- **itemType**: label
- **itemSubtype**: scope_note
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
  - Mục đích và ngữ cảnh: nói rõ màn vẽ theo nền thiết kế; và nói rõ những gì cố ý KHÔNG vẽ vì đây là tài liệu công khai
  - Thành phần hiển thị: một khối chú dẫn nền vàng gồm hai mã yêu cầu khách; câu khẳng định cả hai còn hiệu lực; và danh sách bốn thứ không vẽ
  - Chức năng và logic: bốn thứ không vẽ: cấu hình khoá; cách sinh yếu tố xác thực; nội dung mã dự phòng; luồng khôi phục thiết bị — chốt ở tài liệu bảo mật nội bộ chứ không ở đây
- **qa**: - Tài liệu bảo mật nội bộ chứa bốn hạng mục không vẽ ở đây đã có chưa; và ai là người chốt nội dung đó? Không có tài liệu đó thì màn không dựng được dù thiết kế đã đủ.
- **bbox**: startX=26 startY=119 endX=1026 endY=190

### Item 3: Khối diện bắt buộc MFA

- **nameJP**: MFA必須対象ブロック
- **nameTrans**: MFA scope block
- **itemType**: others
- **itemSubtype**: policy_section
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
- **databaseNote**: Thiết kế đòi một nơi khai diện bắt buộc MFA theo vai trò. Thực thể tài khoản nội bộ của miền D-PARTY (RFP:602) CHƯA có cột hay bảng ánh xạ nào cho việc này.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: khai ai thuộc diện bắt buộc yếu tố xác thực thứ hai — phần "tài khoản quản trị và các role phê duyệt nội bộ" của NFR-SEC-01 (RFP:809)
  - Thành phần hiển thị: một nhãn khối; một bảng ba cột phủ 7 vai trò nội bộ; và một dòng ghi chú nêu rõ phần nào là suy luận
  - Chức năng và logic: diện bắt buộc phải khai được theo vai trò và đổi được bằng cấu hình — thêm hay bớt vai trò không được sửa màn
- **qa**: - Diện bắt buộc MFA khai ở đâu — một cột trên thực thể tài khoản; hay một bảng ánh xạ vai trò sang mức bảo mật? Thiết kế đòi đổi được bằng cấu hình nên cách khai quyết định việc thêm vai trò có phải sửa mã hay không.
- **bbox**: startX=26 startY=206 endX=1026 endY=456

### Item 3.1: Tiêu đề khối diện bắt buộc MFA

- **nameJP**: -
- **nameTrans**: MFA scope block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm mã yêu cầu khách mà khối này thoả
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và mã NFR-SEC-01
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=222 endX=1010 endY=239

### Item 3.2: Bảng diện bắt buộc MFA theo vai trò

- **nameJP**: ロール別MFA必須対象表
- **nameTrans**: MFA scope by role table
- **itemType**: table
- **itemSubtype**: policy_table
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
- **databaseNote**: Diện bắt buộc suy từ quyền phê duyệt thực tế của hệ thống; thực thể tài khoản nội bộ của D-PARTY (RFP:602) chưa có nơi lưu diện này.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: ánh xạ 7 vai trò nội bộ của TBL-ROLE-01 (RFP:245) sang hai câu hỏi: có quyền phê duyệt nội bộ hay không; và có thuộc diện bắt buộc MFA hay không
  - Thành phần hiển thị: một bảng ba cột với hàng tiêu đề "Vai trò"; "Có quyền phê duyệt nội bộ"; "Thuộc diện bắt buộc MFA"; và 4 hàng dữ liệu — ba hàng cho ba vai trò lẻ và một hàng gộp bốn vai trò hiện trường
  - Chức năng và logic: cột thứ ba chỉ có hai giá trị Bắt buộc và Chưa chốt; giá trị Chưa chốt là chỗ chờ chủ đầu tư quyết chứ không phải chỗ đội dựng tự chọn
- **qa**:
  - - RFP KHÔNG định nghĩa vai nào "có quyền phê duyệt nội bộ". Cột thứ hai của bảng là suy luận từ trách nhiệm ở TBL-ROLE-01 (RFP:245) và từ GOV-RULE-01 (RFP:601) — chủ đầu tư có xác nhận đúng ba vai trò này không?
  - - Bốn vai trò hiện trường ở hàng cuối để "Chưa chốt" — có phải bật MFA cho họ không? Bật thì thao tác hiện trường trong khung giờ 02:00–10:00 JST (NFR-AVL-01; RFP:804) nặng thêm một bước; không bật thì phải nói rõ vì sao họ ngoài diện.
  - - SEC-IAM-02 (RFP:810) đòi nêu chính sách MFA cho người tham gia bên ngoài — màn này chỉ phủ người dùng nội bộ; diện bên ngoài thuộc màn nào?
- **bbox**: startX=42 startY=250 endX=1010 endY=394

### Item 3.2.1: Dòng vai trò trong diện bắt buộc (đại diện)

- **nameJP**: -
- **nameTrans**: MFA scope row (representative)
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
  - Mục đích và ngữ cảnh: một hàng của bảng diện bắt buộc — lấy hàng đầu tiên ROLE-SYS-ADMIN làm đại diện cho cả 4 hàng có cùng kết cấu
  - Thành phần hiển thị: ba ô: mã vai trò; mô tả quyền phê duyệt của vai đó; và kết luận thuộc diện hay chưa chốt
  - Chức năng và logic: lặp 4 lần với nội dung khác nhau; kết cấu giống nhau nên gộp về một hàng đại diện
- **qa**: -
- **bbox**: startX=43 startY=278 endX=1010 endY=307

### Item 3.3: Ghi chú diện bắt buộc là suy luận

- **nameJP**: -
- **nameTrans**: Inferred scope note
- **itemType**: label
- **itemSubtype**: open_decision_note
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
  - Mục đích và ngữ cảnh: khai thẳng chỗ thiết kế đi trước tài liệu khách — ba vai trò ở đầu bảng là suy luận; bốn vai trò hiện trường là giả định cần khách chốt
  - Thành phần hiển thị: một đoạn chú thích ba câu: điều NFR-SEC-01 (RFP:809) nói; điều bảng suy ra; và yêu cầu diện bắt buộc phải khai được theo vai trò
  - Chức năng và logic: không trình bày phần suy luận như thể RFP đã nói — đây là chỗ phải đưa vào biên bản với chủ đầu tư
- **qa**: - Nếu chủ đầu tư chốt một diện khác diện suy luận ở bảng thì phần nào của màn phải sửa? Thiết kế đòi diện đổi được bằng cấu hình nên câu trả lời phải là "không sửa màn"; cần xác nhận điều đó là khả thi.
- **bbox**: startX=42 startY=397 endX=1010 endY=429

### Item 4: Khối nâng mức phiên

- **nameJP**: セッション昇格ブロック
- **nameTrans**: Session step-up block
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
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: bước xác thực yếu tố thứ hai — đứng giữa bước mật khẩu của SC-01 và dữ liệu nghiệp vụ
  - Thành phần hiển thị: một nhãn khối; ba trường và hai nút bên trái; và một vùng cố ý để trống bên phải
  - Chức năng và logic: phiên chỉ đúng mức sau khi yếu tố thứ hai xác thực xong; trước đó mọi khu vực nghiệp vụ bị chặn
- **qa**: -
- **bbox**: startX=26 startY=469 endX=1026 endY=813

### Item 4.1: Tiêu đề khối nâng mức phiên

- **nameJP**: -
- **nameTrans**: Step-up block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm điều kiện tiền đề — bước này chạy sau khi bí mật xác thực đã đúng
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và tham chiếu SC-01
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=485 endX=1010 endY=502

### Item 4.2: Trường Yếu tố xác thực

- **nameJP**: 認証要素
- **nameTrans**: Authentication factor selector
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
- **databaseNote**: Yếu tố xác thực do nhà cung cấp xác thực giữ; thiết kế không đòi lưu vào thực thể tài khoản nội bộ của D-PARTY (RFP:602).
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: chỉ liệt yếu tố của chính tài khoản đang đăng nhập.
  - Điều kiện: có nhiều hơn một yếu tố thì bắt buộc chọn.
  - Lỗi: "Phương thức xác thực không hợp lệ." — khi giá trị gửi lên không thuộc tài khoản của phiên.
- **description**:
  - Mục đích và ngữ cảnh: chọn yếu tố xác thực để nâng mức phiên khi tài khoản đã đăng ký nhiều hơn một yếu tố
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select liệt yếu tố đã đăng ký; và một dòng chú thích về phạm vi danh sách
  - Chức năng và logic: danh sách chỉ gồm yếu tố của chính tài khoản đang đăng nhập; giá trị gửi lên phải kiểm lại ở server chứ không tin danh sách đã render
- **qa**:
  - - Một tài khoản được đăng ký tối đa bao nhiêu yếu tố? Thiết kế nói "có nhiều hơn một thì bắt buộc chọn" nhưng không khai ngưỡng trên.
  - - Nhãn của từng option hiện gì để người dùng phân biệt hai yếu tố cùng loại? Thiết kế không khai và đây là màn công khai nên không mô tả chi tiết yếu tố.
  - - Định dạng của yếu tố do nhà cung cấp quy định nên cột định dạng để trống — có cần khai danh sách phương thức được phép ở tài liệu nào không?
- **bbox**: startX=42 startY=513 endX=521 endY=581

### Item 4.3: Trường Mã xác thực một lần

- **nameJP**: ワンタイムコード
- **nameTrans**: One-time code input
- **itemType**: text_form
- **itemSubtype**: otp_input
- **buttonType**: -
- **dataType**: string
- **format**: chỉ chữ số — độ dài do nhà cung cấp xác thực quy định
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Mã xác thực một lần không được lưu ở tầng ứng dụng; thực thể tài khoản nội bộ của D-PARTY (RFP:602) không có cột tương ứng.
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: chỉ nhận chữ số.
  - Điều kiện: việc đối chiếu mã thuộc nhà cung cấp xác thực — tầng ứng dụng KHÔNG tự so sánh.
  - Lỗi: "Mã không đúng hoặc đã hết hiệu lực." — một câu duy nhất cho ba nhánh sai; hết hiệu lực; và đã dùng.
- **description**:
  - Mục đích và ngữ cảnh: nhập mã xác thực một lần để hoàn tất bước nâng mức phiên
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập che ký tự; và một dòng chú thích nêu rõ ai đối chiếu mã
  - Chức năng và logic: ba nhánh sai gộp về một thông báo để không nói cho người thử biết mã sai ở chỗ nào; số lần sai đếm vào cùng trục khoá tạm của NFR-SEC-03 (RFP:811) hoặc một trục riêng — xem khối đối chiếu
- **qa**:
  - - Số lần nhập sai mã có dùng chung bộ đếm với số lần sai bí mật xác thực không? Dùng chung thì người đã biết bí mật vẫn khoá được tài khoản người khác bằng cách nhập mã sai.
  - - Độ dài mã do nhà cung cấp quy định — màn có cần tự chặn độ dài trước khi gửi không; hay để nhà cung cấp từ chối?
  - - Có giới hạn số lần gửi mã trong một khoảng thời gian không? NFR-SEC-03 (RFP:811) chỉ đòi khoá tạm khi sai nhiều lần.
- **bbox**: startX=42 startY=592 endX=521 endY=660

### Item 4.4: Ô Ghi nhớ thiết bị này

- **nameJP**: この端末を記憶する
- **nameTrans**: Remember this device checkbox
- **itemType**: checkbox
- **itemSubtype**: boolean_toggle
- **buttonType**: -
- **dataType**: boolean
- **format**: -
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: không chọn
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Trạng thái thiết bị đã tin do nhà cung cấp xác thực giữ; thiết kế không đòi cột trên thực thể tài khoản nội bộ của D-PARTY (RFP:602).
- **validationNote**:
  - Điều kiện: không bắt buộc — nhãn không có dấu sao.
  - Điều kiện: thời hạn ghi nhớ lấy từ cấu hình server; TUYỆT ĐỐI không nhận từ client — nếu nhận thì NFR-SEC-03 (RFP:811) bị vô hiệu hoá từ phía người dùng.
- **description**:
  - Mục đích và ngữ cảnh: cho người dùng bỏ bước yếu tố thứ hai trên thiết bị đã tin trong một thời hạn nhất định
  - Thành phần hiển thị: nhãn không dấu sao; một ô đánh dấu đang bỏ trống; và một dòng chú thích về nguồn của thời hạn ghi nhớ
  - Chức năng và logic: chỉ gửi cờ bật hay tắt; thời hạn do server quyết — client không được gửi thời hạn lên vì đó là đường vô hiệu hoá timeout phiên
- **qa**:
  - - Thời hạn ghi nhớ thiết bị là bao lâu? NFR-SEC-03 (RFP:811) đòi phiên phải có timeout nhưng không định lượng; con số này phải khách chốt cùng thời lượng timeout.
  - - Người dùng có xem và thu hồi được danh sách thiết bị đã ghi nhớ không? Thiết kế không vẽ danh sách đó.
  - - Đổi vai trò sang một vai thuộc diện bắt buộc MFA thì thiết bị đã ghi nhớ có còn hiệu lực không? Thiết kế chỉ nói phiên thành chưa đủ mức.
- **bbox**: startX=42 startY=671 endX=521 endY=755

