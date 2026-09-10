# Items Analysis - SC-01 Đăng nhập

- Nguồn: ảnh `.momorph/shots/SC-01-dang-nhap.png` (1280x1892; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-01-dang-nhap-dom-boxes.json`
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
  - Thành phần hiển thị: một dòng chữ đậm gồm mã màn SC-01 và tên màn tiếng Việt
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
  - Mục đích và ngữ cảnh: chuỗi truy vết của màn theo Feature List — người đọc biết màn phải thoả điều gì
  - Thành phần hiển thị: mã FE-001; nhóm FN-01; ưu tiên P0; yêu cầu khách FR-IAM-01; loại màn Form; và actor là toàn bộ người dùng nội bộ
  - Chức năng và logic: văn bản tĩnh — các mã không phải liên kết điều hướng
- **qa**: - Dòng meta này là chú thích của wireframe hay là nội dung sẽ có trên màn thật? Thiết kế không khai.
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
  - Mục đích và ngữ cảnh: cho biết màn này đã có bản thi công để đối chiếu
  - Thành phần hiển thị: một thẻ chữ nhỏ viền bo với chữ "Đã thi công" kèm mã màn và đường dẫn của bản thi công
  - Chức năng và logic: nhãn tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=553 startY=60 endX=618 endY=79

### Item 2: Khối xác thực người dùng nội bộ

- **nameJP**: 内部利用者認証ブロック
- **nameTrans**: Internal user authentication block
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
- **databaseNote**: Thực thể tài khoản người dùng nội bộ thuộc miền D-PARTY (RFP:602). Bảng đã tồn tại thật và mang đủ cột cho khối này.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: nửa "xác thực người dùng nội bộ" của FR-IAM-01 (RFP:627) — cổng duy nhất vào hệ thống
  - Thành phần hiển thị: một vùng nhận diện tĩnh bên trái; bốn trường bên phải; và một nút chính ở đáy
  - Chức năng và logic: gửi hai trường bắt buộc; nhánh từ chối dùng một thông báo duy nhất để không cho dò định danh tồn tại
- **qa**: -
- **bbox**: startX=26 startY=119 endX=1026 endY=526

### Item 2.1: Tiêu đề khối xác thực

- **nameJP**: -
- **nameTrans**: Authentication block title
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
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và mã FR-IAM-01
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=135 endX=1010 endY=152

### Item 2.2: Vùng nhận diện

- **nameJP**: 識別表示エリア
- **nameTrans**: Branding area
- **itemType**: others
- **itemSubtype**: branding_area
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
  - Mục đích và ngữ cảnh: vùng tĩnh mang dấu hiệu nhận diện của chợ; đặt cạnh form để người dùng biết mình vào đúng hệ thống
  - Thành phần hiển thị: một khung viền nét đứt chiếm khoảng 42% chiều rộng khối; bên trong là nhãn vùng và một đoạn chú thích
  - Chức năng và logic: không có trường nhập và không có liên kết điều hướng — thiết kế đòi cổng vào hệ thống chỉ có một đường
- **qa**: - Vùng nhận diện có chứa nội dung nào cần cấu hình được theo môi trường không? Thiết kế chỉ nói là vùng tĩnh.
- **bbox**: startX=42 startY=163 endX=449 endY=510

### Item 2.3: Trường Định danh người dùng nội bộ

- **nameJP**: 内部利用者ID
- **nameTrans**: Internal user identifier input
- **itemType**: text_form
- **itemSubtype**: identity_input
- **buttonType**: -
- **dataType**: string
- **format**: <phần cục bộ>@<miền>
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: email
- **databaseNote**: Cột định danh của thực thể tài khoản nội bộ trong miền D-PARTY (RFP:602). Bảng và cột đã tồn tại thật; cột mang ràng buộc duy nhất.
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: phải là định danh tồn tại trong danh bạ người dùng nội bộ — FR-IAM-01 (RFP:627) chỉ cấp đường vào cho người dùng nội bộ.
  - Lỗi: dùng chung một thông báo từ chối duy nhất với nhánh sai bí mật — không phân biệt sai định danh hay sai bí mật; kể cả qua mã trả về.
- **description**:
  - Mục đích và ngữ cảnh: định danh dùng để xác thực người dùng nội bộ — nửa thứ nhất của cặp thông tin đăng nhập
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập chữ với giá trị gợi ý dạng địa chỉ thư; và một dòng chú thích về tính duy nhất
  - Chức năng và logic: giá trị phải duy nhất trong danh bạ người dùng nội bộ; sai định danh và sai bí mật trả về cùng một thông báo để chống dò tài khoản tồn tại
- **qa**:
  - - Định danh có bắt buộc theo dạng địa chỉ thư không? Thiết kế chỉ đòi "duy nhất trong danh bạ người dùng nội bộ"; ảnh cho thấy giá trị gợi ý dạng địa chỉ thư nhưng đó là ví dụ.
  - - Độ dài tối đa của định danh là bao nhiêu? Thiết kế và RFP không khai.
  - - Định danh có phân biệt chữ hoa chữ thường không? Thiết kế không khai.
- **bbox**: startX=460 startY=163 endX=1010 endY=231

### Item 2.4: Trường Bí mật xác thực

- **nameJP**: 認証シークレット
- **nameTrans**: Authentication secret input
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
  - Điều kiện: không rỗng.
  - Lỗi: dùng chung một thông báo từ chối duy nhất với nhánh sai định danh.
- **description**:
  - Mục đích và ngữ cảnh: bí mật xác thực của người dùng nội bộ — nửa thứ hai của cặp thông tin đăng nhập
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập che ký tự; và một dòng chú thích về ba điều cấm
  - Chức năng và logic: giá trị không hiển thị lại; không ghi vào log; không đi qua URL — nên phải gửi bằng phương thức không đặt dữ liệu lên đường dẫn
- **qa**:
  - - Yêu cầu độ mạnh của bí mật xác thực là gì — độ dài tối thiểu; tập ký tự; thời hạn đổi? Thiết kế và RFP không khai nên cột định dạng để trống.
  - - Có luồng tự đặt lại bí mật xác thực không? Màn này cố ý không có liên kết điều hướng nào.
- **bbox**: startX=460 startY=242 endX=1010 endY=310

### Item 2.5: Trường Ngôn ngữ hiển thị

- **nameJP**: 表示言語
- **nameTrans**: Display language selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **format**: VI | JA
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tiếng Việt
- **userAction**: on_click
- **transitionNote**: Đổi giá trị áp ngay cho ngôn ngữ hiển thị của màn; không điều hướng sang màn khác.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế không đòi lưu lựa chọn ngôn ngữ vào thực thể tài khoản nội bộ của D-PARTY (RFP:602); không có cột tương ứng.
- **validationNote**:
  - Điều kiện: không bắt buộc — nhãn không có dấu sao.
  - Điều kiện: chỉ nhận hai giá trị VI và JA; giá trị lạ rơi về mặc định thay vì báo lỗi hệ thống.
- **description**:
  - Mục đích và ngữ cảnh: chọn ngôn ngữ hiển thị ngay tại cổng vào — người dùng chưa đăng nhập nên chưa có nơi nào khác để chọn
  - Thành phần hiển thị: nhãn không dấu sao; một select hai giá trị VI và JA đang chọn Tiếng Việt; và một dòng chú thích
  - Chức năng và logic: đổi ngôn ngữ áp ngay cho chính màn này; không điều hướng và không gửi dữ liệu xác thực
- **qa**:
  - - Ngôn ngữ chọn trước khi đăng nhập có được ghi nhớ cho phiên sau khi đăng nhập không? Thiết kế không khai.
  - - Lựa chọn này có ghi vào tài khoản để dùng lại ở thiết bị khác không; hay chỉ sống trong trình duyệt hiện tại?
- **bbox**: startX=460 startY=321 endX=1010 endY=389

### Item 2.6: Vùng thông báo lý do

- **nameJP**: 理由通知エリア
- **nameTrans**: Reason notice area
- **itemType**: label
- **itemSubtype**: readonly_notice
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
  - Mục đích và ngữ cảnh: nói cho người bị đẩy về cổng vào biết vì sao — hết phiên; hoặc quyền tài khoản đã bị tạm ngừng
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc mang câu lý do; và một dòng chú thích liệt hai lý do thiết kế đòi hiện
  - Chức năng và logic: chỉ đọc và không gửi lên server; nội dung do luồng đẩy người dùng về đây quyết định chứ không do người dùng nhập
- **qa**:
  - - Thiết kế liệt hai lý do (phiên hết hiệu lực; quyền tài khoản bị tạm ngừng) — còn lý do nào khác phải hiện không; ví dụ đang bị khoá tạm hay chưa đủ mức bảo mật?
  - - Câu lý do có được phép nêu tình trạng tài khoản cụ thể không; hay phải giữ chung để không lộ thông tin cho người ngoài?
- **bbox**: startX=460 startY=399 endX=1010 endY=468

### Item 2.7: Nút Đăng nhập

- **nameJP**: -
- **nameTrans**: Sign in button
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
- **transitionNote**: Xác thực thành công đưa thẳng tới khu vực làm việc của vai trò được gán theo bảng ở khối 2 — không qua trang trung gian kiểu "chọn khu vực". Vai trò thuộc diện bắt buộc MFA thì sang SC-02 trước khi chạm dữ liệu nghiệp vụ (NFR-SEC-01; RFP:809).
- **databaseTable**: app_user
- **databaseColumn**: failed_login_count; locked_until
- **databaseNote**: Hai cột đếm số lần sai và mốc hết khoá tạm trên thực thể tài khoản nội bộ của D-PARTY (RFP:602); đã tồn tại thật. Thiết kế đòi ngưỡng và thời lượng là giá trị cấu hình chứ không cứng trong màn — NFR-SEC-03 (RFP:811) không định lượng hai giá trị này.
- **validationNote**:
  - Điều kiện: cả hai trường bắt buộc phải có giá trị.
  - Điều kiện: quyền tài khoản phải đang hoạt động — tài khoản đã bị tạm ngừng ở SC-03 thì không vào được.
  - Điều kiện: tài khoản không đang trong thời gian khoá tạm — NFR-SEC-03 (RFP:811) đòi khoá tạm khi nhập sai nhiều lần.
  - Lỗi: một thông báo từ chối duy nhất cho mọi nhánh sai định danh hoặc sai bí mật — không phân biệt được từ bên ngoài; kể cả qua mã trả về.
  - Lỗi: "Quyền tài khoản đã bị tạm ngừng; vui lòng liên hệ quản trị hệ thống." — không để người dùng thử lại vô ích.
  - Lỗi: "Tài khoản đang bị khoá tạm; vui lòng thử lại sau." — nêu rõ phải chờ đến khi nào.
- **description**:
  - Mục đích và ngữ cảnh: gửi cặp thông tin xác thực và kết thúc bước mật khẩu của FR-IAM-01 (RFP:627)
  - Thành phần hiển thị: một nút chính nhãn chữ đặt dưới bốn trường
  - Chức năng và logic: xác thực xong thì gán vai trò rồi đưa thẳng tới khu vực làm việc của vai trò đó; mọi nhánh từ chối dùng chung một thông báo; mỗi lần thử sinh một bản ghi log truy cập theo khối 3
- **qa**:
  - - Ngưỡng số lần sai và thời lượng khoá tạm là bao nhiêu? NFR-SEC-03 (RFP:811) đòi phải có nhưng không định lượng; thiết kế đẩy sang giá trị cấu hình nên cần khách chốt trước khi dựng.
  - - Đếm số lần sai theo cửa sổ thời gian trượt hay theo số lần sai liên tiếp? Hai cách cho kết quả khác nhau khi người dùng sai rải rác nhiều ngày.
  - - Có chặn theo nguồn truy cập ngoài chặn theo tài khoản không? Nếu chỉ đếm theo tài khoản thì người ngoài dò định danh lạ không bị chặn.
  - - Bấm nút trước khi màn kịp phản hồi thì lần gửi thứ hai bị chặn ở đâu? Thiết kế chỉ nói trạng thái "Đang xác thực" vô hiệu nút và hai trường.
- **bbox**: startX=460 startY=481 endX=544 endY=510

### Item 3: Khối gán vai trò tại thời điểm đăng nhập

- **nameJP**: ログイン時ロール付与ブロック
- **nameTrans**: Role assignment at sign-in block
- **itemType**: others
- **itemSubtype**: role_mapping_section
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
- **databaseColumn**: role
- **databaseNote**: Cột vai trò của thực thể tài khoản nội bộ trong miền D-PARTY (RFP:602); đã tồn tại thật với ràng buộc đúng 7 giá trị của TBL-ROLE-01 (RFP:245).
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: nửa "gán vai trò tại thời điểm đăng nhập" của FR-IAM-01 (RFP:627) và phần nghiệm thu "vào được đúng khu vực làm việc"
  - Thành phần hiển thị: một nhãn khối; một bảng hai cột phủ đủ 7 vai trò nội bộ; và một dòng ghi chú về thời điểm gán
  - Chức năng và logic: vai trò được gán ngay tại thời điểm đăng nhập; khu vực làm việc suy ra từ vai trò nên không cần trang chọn khu vực
- **qa**: -
- **bbox**: startX=26 startY=539 endX=1026 endY=875

### Item 3.1: Tiêu đề khối gán vai trò

- **nameJP**: -
- **nameTrans**: Role assignment block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm số lượng vai trò nội bộ mà khối phủ
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và cụm "7 vai trò nội bộ"
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=555 endX=1010 endY=572

### Item 3.2: Bảng ánh xạ vai trò và khu vực làm việc

- **nameJP**: ロール別作業エリア対応表
- **nameTrans**: Role to landing area mapping table
- **itemType**: table
- **itemSubtype**: mapping_table
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
- **databaseColumn**: role
- **databaseNote**: Tập giá trị của cột vai trò trên thực thể tài khoản nội bộ của D-PARTY (RFP:602). Ánh xạ vai trò sang khu vực làm việc là quy tắc điều hướng — thiết kế không đòi lưu thành dữ liệu.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: khai đúng 7 vai trò nội bộ của TBL-ROLE-01 (RFP:245) và khu vực làm việc của từng vai
  - Thành phần hiển thị: một bảng hai cột với hàng tiêu đề "Vai trò" và "Khu vực làm việc được đưa tới ngay sau khi xác thực"; và 7 hàng dữ liệu
  - Chức năng và logic: bảng này là hợp đồng điều hướng sau xác thực; nghiệm thu FR-IAM-01 đòi "vào được đúng khu vực làm việc" nên mỗi vai phải có đúng một khu vực đích
- **qa**:
  - - Một tài khoản có được giữ nhiều hơn một vai trò không? Bảng vẽ quan hệ một-một nên nếu khách cần đa vai thì cột đích không còn xác định.
  - - Vai trò không có khu vực làm việc riêng thì đưa đi đâu? Bảng hiện phủ đủ 7 vai nhưng thiết kế không nói gì cho ca vai trò mới.
- **bbox**: startX=42 startY=583 endX=1010 endY=813

