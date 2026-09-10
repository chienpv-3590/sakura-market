# Items Analysis - SC-04 Chi tiết tài khoản và lịch sử quyền

- Nguồn: ảnh `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.png` (1280x1823; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-dom-boxes.json`
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
  - Thành phần hiển thị: một dòng chữ đậm gồm mã màn SC-04 và tên màn tiếng Việt
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
  - Mục đích và ngữ cảnh: chuỗi truy vết của màn theo Feature List — màn này và SC-03 cùng thoả một FE-003 nhưng chia nhau hai nửa của FR-IAM-02
  - Thành phần hiển thị: mã FE-003; nhóm FN-01; ưu tiên P0; yêu cầu khách FR-IAM-02; loại màn Detail; và actor là quản trị hệ thống
  - Chức năng và logic: văn bản tĩnh — các mã không phải liên kết điều hướng
- **qa**: -
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
- **bbox**: startX=613 startY=60 endX=688 endY=79

### Item 2: Khối chú dẫn ràng buộc hiển thị before/after

- **nameJP**: before/after表示要件の注記
- **nameTrans**: Before/after display constraint note
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
  - Mục đích và ngữ cảnh: chốt ràng buộc cứng của màn — before/after là yêu cầu HIỂN THỊ nên khối lịch sử không được cắt
  - Thành phần hiển thị: một khối chú dẫn nền vàng gồm nguyên văn nghiệm thu FR-IAM-02 (RFP:628); nhắc lại ràng buộc từ Screen List; và câu nói rõ đây là màn bảo mật nên chỉ vẽ khung và nhãn
  - Chức năng và logic: khối 2 là phần không được cắt của màn này; cắt nó đi là màn không thoả nghiệm thu dù dữ liệu có được lưu đầy đủ
- **qa**: - Ràng buộc "bắt buộc hiển thị before/after" có áp cho cả người kiểm ngoài quản trị hệ thống không? Nếu bộ phận kiểm toán nội bộ phải xem được thì diện đọc màn này rộng hơn diện ghi.
- **bbox**: startX=26 startY=119 endX=1026 endY=190

### Item 3: Khối thông tin tài khoản và thay đổi quyền

- **nameJP**: アカウント情報と権限変更ブロック
- **nameTrans**: Account info and permission change block
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
- **databaseNote**: Thực thể tài khoản người dùng nội bộ của miền D-PARTY (RFP:602); bảng đã tồn tại thật và phủ được sáu trong tám trường của khối.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: xem một tài khoản nội bộ ở mức chi tiết; và thực hiện thay đổi quyền cho tài khoản đó
  - Thành phần hiển thị: một nhãn khối; năm trường bên trái gồm cả ô lý do; ba trường chỉ đọc và ba nút bên phải
  - Chức năng và logic: mỗi lần thay đổi quyền sinh một dòng lịch sử ở khối 2; đọc giá trị cũ trước khi ghi để dòng lịch sử có đủ cặp trước và sau
- **qa**: -
- **bbox**: startX=26 startY=206 endX=1026 endY=736

### Item 3.1: Tiêu đề khối thông tin tài khoản

- **nameJP**: -
- **nameTrans**: Account info block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm hai việc khối này làm
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối và tên khối
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=222 endX=1010 endY=239

### Item 3.2: Trường Định danh người dùng nội bộ (chỉ đọc)

- **nameJP**: 内部利用者ID
- **nameTrans**: Internal user identifier (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
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
- **databaseColumn**: email
- **databaseNote**: Cột định danh của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật với ràng buộc duy nhất. Là thông tin cá nhân theo RFP §09-06 (RFP:883).
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho quản trị biết đang xem tài khoản nào — khoá nhận dạng của cả màn
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc mang định danh; và một dòng chú thích giải thích vì sao không cho đổi ở đây
  - Chức năng và logic: chỉ đọc có chủ đích: đổi định danh là đổi danh tính chứ không phải đổi quyền; để ở đây thì lịch sử quyền lẫn với lịch sử đổi danh tính
- **qa**:
  - - Có luồng đổi định danh nội bộ không; và nếu có thì màn nào? Thiết kế đóng cửa ở đây nhưng không chỉ ra cửa khác.
  - - Định danh hiện đầy đủ trên màn chi tiết — có che một phần không? Đây là thông tin cá nhân theo RFP §09-06 (RFP:883).
- **bbox**: startX=42 startY=250 endX=521 endY=335

### Item 3.3: Trường Tên hiển thị

- **nameJP**: 表示名
- **nameTrans**: Display name input
- **itemType**: text_form
- **itemSubtype**: text_input
- **buttonType**: -
- **dataType**: string
- **format**: none
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Nhân viên B
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: display_name
- **databaseNote**: Cột tên hiển thị của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật và cho phép rỗng.
- **validationNote**:
  - Điều kiện: không bắt buộc — nhãn không có dấu sao.
  - Điều kiện: bỏ khoảng trắng đầu và cuối trước khi ghi.
  - Điều kiện: sửa tên hiển thị KHÔNG sinh dòng lịch sử quyền — chỉ vào vết thao tác chung theo FR-AUDIT-01 (RFP:710).
  - Điều kiện: độ dài tối đa là giả định cần chốt — RFP không khai.
- **description**:
  - Mục đích và ngữ cảnh: tên người đọc được của tài khoản; dùng ở cột chủ thể của mọi bảng lịch sử trong hệ thống
  - Thành phần hiển thị: nhãn không dấu sao; một ô nhập chữ mang giá trị hiện tại; và một dòng chú thích tách rõ đây không phải thay đổi quyền
  - Chức năng và logic: sửa trường này đi vào vết thao tác chung chứ không vào lịch sử quyền — gộp hai loại vết làm bảng lịch sử quyền loãng và mất ý nghĩa kiểm toán
- **qa**:
  - - Độ dài tối đa của tên hiển thị là bao nhiêu? RFP không khai nên cột định dạng để trống; nhưng không chặn thì cột chủ thể của các bảng lịch sử bị kéo dài vô hạn.
  - - Tên hiển thị có bắt buộc duy nhất không? Nếu không thì hai người cùng tên làm cột chủ thể của lịch sử quyền khó đọc.
- **bbox**: startX=42 startY=345 endX=521 endY=430

### Item 3.4: Trường Vai trò

- **nameJP**: ロール
- **nameTrans**: Role selector
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **format**: một trong 7 vai trò nội bộ
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: ROLE-INTAKE
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: role
- **databaseNote**: Cột vai trò của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật với ràng buộc đúng 7 giá trị. Kèm một dòng ở bảng lịch sử quyền — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: tập giá trị đúng 7 vai trò nội bộ của TBL-ROLE-01 (RFP:245); ràng buộc dữ liệu là chốt cuối và tầng ứng dụng không tự nới.
  - Điều kiện: đổi vai trò là THAY ĐỔI QUYỀN nên bắt buộc sinh một dòng lịch sử mang cặp trước và sau — FR-IAM-02 (RFP:628).
  - Điều kiện: KHÔNG cho tự đổi vai trò của chính mình ra khỏi ROLE-SYS-ADMIN.
  - Lỗi: "Vai trò không hợp lệ." — không ghi thay đổi.
  - Lỗi: "Không thể tự đổi vai trò của chính bạn ra khỏi vai quản trị hệ thống." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: đổi vai trò của tài khoản — chuyển tiếp quyền thứ tư; ba chuyển tiếp còn lại là cấp; tạm ngừng; mở lại
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một select bảy giá trị đang chọn vai trò hiện tại; và một dòng chú thích nêu rõ đây là thay đổi quyền
  - Chức năng và logic: đổi vai trò sang một vai thuộc diện bắt buộc MFA làm phiên đang dùng của người đó không còn đủ mức — lần điều hướng kế tiếp của họ quay về SC-02 (NFR-SEC-01; RFP:809)
- **qa**:
  - - Một tài khoản có được giữ nhiều hơn một vai trò không? Select đơn ở đây vẽ quan hệ một-một; đa vai làm cặp trước/sau của lịch sử quyền phức tạp hơn nhiều.
  - - Đổi vai trò có cần bước xác nhận hai lớp không? Thiết kế chỉ chặn ca tự hạ quyền của chính mình.
  - - Đổi vai trò xong; dữ liệu nghiệp vụ tài khoản đó đã tạo ở vai cũ xử lý ra sao? Thiết kế không đòi gì; nhưng người kiểm cần biết vai nào đang giữ tại thời điểm thao tác.
- **bbox**: startX=42 startY=440 endX=521 endY=509

### Item 3.5: Trường Quyền tài khoản

- **nameJP**: アカウント権限
- **nameTrans**: Account permission radio
- **itemType**: radio_button
- **itemSubtype**: radio_group
- **buttonType**: -
- **dataType**: boolean
- **format**: Đang hoạt động | Đã tạm ngừng
- **required**: true
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đang hoạt động
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: is_active
- **databaseNote**: Cột trạng thái quyền của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật. Kèm một dòng ở bảng lịch sử quyền — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: đúng hai giá trị Đang hoạt động và Đã tạm ngừng — khớp vòng đời ở khối 1 của SC-03.
  - Điều kiện: KHÔNG cho tạm ngừng tài khoản quản trị đang hoạt động cuối cùng.
  - Điều kiện: mỗi lần đổi giá trị sinh một dòng lịch sử mang cặp trước và sau — FR-IAM-02 (RFP:628).
  - Lỗi: "Không thể tạm ngừng tài khoản quản trị đang hoạt động cuối cùng." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: đặt trạng thái quyền của tài khoản — hai chuyển tiếp tạm ngừng và mở lại của FR-IAM-02 (RFP:628) nằm ở trường này
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một nhóm hai lựa chọn loại trừ nhau đang chọn Đang hoạt động; và một dòng chú thích
  - Chức năng và logic: cùng một dấu vết như đổi vai trò: một dòng lịch sử mang cặp trước và sau; trục này độc lập với trục khoá tạm ở cột phải
- **qa**:
  - - Tạm ngừng ở màn này và tạm ngừng ở SC-03 có phải cùng một đường ghi không? Hai màn cùng thoả FE-003 nên hai đường ghi khác nhau là hai chỗ phải sửa mỗi lần đổi quy tắc.
  - - Đổi vai trò và đổi trạng thái quyền trong cùng một lần lưu thì sinh một dòng lịch sử hay hai? Ảnh cho thấy một nút lưu chung nên mặc định là một dòng mang cả hai nửa.
- **bbox**: startX=42 startY=519 endX=521 endY=604

### Item 3.6: Trường Lý do thay đổi

- **nameJP**: 変更理由
- **nameTrans**: Change reason textarea
- **itemType**: textarea
- **itemSubtype**: reason_input
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
- **databaseNote**: Cột lý do của bảng lịch sử quyền — bảng đó CHƯA tồn tại; đề xuất theo tiền lệ bảng lịch sử trạng thái người tham gia của cùng miền D-PARTY (RFP:602).
- **validationNote**:
  - Điều kiện: bắt buộc — nhãn có dấu sao đỏ.
  - Điều kiện: không rỗng sau khi bỏ khoảng trắng; rỗng thì KHÔNG ghi thay đổi nào.
  - Điều kiện: yêu cầu bắt buộc này suy từ FR-AUDIT-01 (RFP:710) — điều khoản đó đòi vết thao tác có lý do. FR-IAM-02 (RFP:628) chỉ đòi before/after; chủ thể và timestamp; KHÔNG đòi lý do.
  - Điều kiện: độ dài tối đa là giả định cần chốt — RFP không khai; và bảng lịch sử chỉ ghi thêm nên không sửa lại được về sau.
  - Lỗi: "Phải nhập lý do thay đổi quyền." — chặn trước khi ghi; không ghi nửa vời rồi bù.
- **description**:
  - Mục đích và ngữ cảnh: ghi vì sao quyền của tài khoản này đổi — phần "vì sao" mà audit hay bắt thiếu nhất
  - Thành phần hiển thị: nhãn kèm dấu sao bắt buộc; một ô nhập nhiều dòng với câu gợi ý; và một dòng chú thích nêu rõ giá trị đi vào đâu và mã yêu cầu nào đòi
  - Chức năng và logic: giá trị vào dòng lịch sử quyền chứ không vào bản ghi tài khoản; bảng lịch sử chỉ ghi thêm nên lý do sai không sửa lại được từ trong ứng dụng
- **qa**:
  - - Lý do có bắt buộc thật không? FR-IAM-02 (RFP:628) KHÔNG đòi lý do — mức bắt buộc ở đây suy từ FR-AUDIT-01 (RFP:710); nếu chủ đầu tư không đòi thì đây là mức chặt hơn RFP.
  - - Có cần danh mục lý do chọn sẵn thay vì ô nhập tự do không? Ô tự do khó tổng hợp về sau; danh mục thì bó hẹp ca ngoại lệ.
  - - Độ dài tối đa là bao nhiêu? Bảng chỉ ghi thêm nên một dòng lý do dài vô hạn không sửa được về sau.
  - - Mở khoá tạm có bắt buộc lý do không? Thao tác đó không phải thay đổi quyền nhưng vẫn ghi vào cùng bảng lịch sử.
- **bbox**: startX=42 startY=614 endX=521 endY=710

### Item 3.7: Trường Ngày cấp quyền (chỉ đọc)

- **nameJP**: 権限付与日
- **nameTrans**: Granted date (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: YYYY-MM-DD
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: 2026-02-11
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: created_at
- **databaseNote**: Cột thời điểm tạo của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: mốc đầu của dòng thời gian quyền — dòng lịch sử đầu tiên ở khối 2 phải khớp mốc này
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc mang một ngày; và một dòng chú thích nối sang khối 2
  - Chức năng và logic: chỉ đọc; là mốc tham chiếu để người kiểm phát hiện lịch sử bị thiếu đoạn đầu
- **qa**: - Ngày cấp quyền lấy từ thời điểm tạo bản ghi tài khoản; nhưng nếu tài khoản từng bị tạm ngừng rồi mở lại thì "ngày cấp quyền" còn là mốc đúng không? Thiết kế không khai.
- **bbox**: startX=532 startY=250 endX=1010 endY=319

### Item 3.8: Trường Khoá tạm (chỉ đọc)

- **nameJP**: 一時ロック
- **nameTrans**: Temporary lock state (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đang khoá · hết khoá lúc 09:29
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: failed_login_count; locked_until
- **databaseNote**: Hai cột đếm số lần sai và mốc hết khoá của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); cả hai đã tồn tại thật.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho quản trị thấy tài khoản có đang bị khoá tạm và khi nào hết — trục do NFR-SEC-03 (RFP:811) sinh ra
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc mang trạng thái khoá kèm mốc hết khoá; và một dòng chú thích tách hai trục
  - Chức năng và logic: chỉ đọc và độc lập với trục quyền tài khoản; giá trị suy theo thời điểm đọc nên đổi theo thời gian mà dữ liệu không đổi
- **qa**:
  - - Trường này có hiện số lần sai liên tiếp không; hay chỉ hiện mốc hết khoá? Ảnh chỉ cho thấy mốc hết khoá.
  - - Ngưỡng số lần sai và thời lượng khoá tạm là bao nhiêu? NFR-SEC-03 (RFP:811) đòi phải có nhưng KHÔNG định lượng.
- **bbox**: startX=532 startY=329 endX=1010 endY=414

### Item 3.9: Trường Yếu tố xác thực (chỉ đọc)

- **nameJP**: 認証要素
- **nameTrans**: Authentication factor state (read-only)
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Không thuộc diện bắt buộc
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Suy từ diện bắt buộc MFA cộng dữ liệu của nhà cung cấp xác thực; thực thể tài khoản nội bộ của D-PARTY (RFP:602) CHƯA có nguồn cho cả hai nửa — phụ thuộc SC-02.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho quản trị biết tài khoản này có thuộc diện bắt buộc yếu tố xác thực thứ hai và đã đăng ký chưa
  - Thành phần hiển thị: nhãn; một vùng chỉ đọc với ba giá trị có thể; và một dòng chú thích nêu ba giá trị và nguồn
  - Chức năng và logic: chỉ đọc; giá trị "bắt buộc mà chưa đăng ký" là cảnh báo tuân thủ NFR-SEC-01 (RFP:809) và phải phân biệt được với "không thuộc diện"
- **qa**:
  - - Diện bắt buộc MFA chưa chốt vì RFP không liệt vai nào có quyền phê duyệt — trước khi chốt thì trường này hiện gì?
  - - Quản trị có được huỷ hoặc đặt lại yếu tố xác thực của tài khoản khác từ màn này không? Thiết kế chỉ vẽ trường chỉ đọc; SC-02 chỉ phủ chính chủ nên đường xử lý ca mất thiết bị chưa có màn nào.
- **bbox**: startX=532 startY=424 endX=1010 endY=509

