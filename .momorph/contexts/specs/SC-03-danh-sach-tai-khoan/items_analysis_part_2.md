# Items Analysis - SC-03 Danh sách tài khoản

- Nguồn: ảnh `.momorph/shots/SC-03-danh-sach-tai-khoan.png` (1280x1805; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-03-danh-sach-tai-khoan-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3

### Item 4.5: Ô Tìm theo tên hoặc định danh

- **nameJP**: 名前または識別子で検索
- **nameTrans**: Name or identifier search input
- **itemType**: text_form
- **itemSubtype**: search_input
- **buttonType**: -
- **dataType**: string
- **format**: khớp một phần — không phân biệt đầu hay giữa chuỗi
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: display_name; email
- **databaseNote**: Hai cột tên hiển thị và định danh của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật. Định danh là thông tin cá nhân theo RFP §09-06 (RFP:886) nên tìm theo định danh là một đường đọc dữ liệu cá nhân.
- **validationNote**:
  - Điều kiện: không bắt buộc.
  - Điều kiện: khớp một phần trên cả tên hiển thị và định danh.
  - Điều kiện: ký tự đặc biệt của cú pháp tìm kiếm phải được xử lý trước khi ghép truy vấn — người dùng không được điều khiển được truy vấn.
  - Điều kiện: độ dài tối đa là giả định cần chốt — thiết kế khai thẳng như vậy.
- **description**:
  - Mục đích và ngữ cảnh: tìm nhanh một tài khoản theo tên hiển thị hoặc định danh
  - Thành phần hiển thị: nhãn không dấu sao; một ô nhập chữ với giá trị gợi ý; và một dòng chú thích về cách khớp và về độ dài tối đa còn treo
  - Chức năng và logic: khớp một phần nên chuỗi ngắn trả về nhiều dòng; NFR-PERF-01 (RFP:807) đặt p95 không vượt 2 giây cho tìm kiếm thông thường nên ô này cần chỉ mục hoặc ngưỡng độ dài tối thiểu
- **qa**:
  - - Độ dài tối đa và độ dài tối thiểu của ô tìm kiếm là bao nhiêu? Thiết kế khai thẳng là giả định cần chốt; NFR-PERF-01 (RFP:807) chỉ đặt ngưỡng thời gian chứ không đặt ngưỡng độ dài.
  - - Tìm kiếm có phân biệt chữ hoa chữ thường không? Thiết kế không khai.
  - - Có gõ là tìm ngay; hay bấm mới tìm? Thiết kế không vẽ nút tìm nên mặc định là tìm theo thay đổi giá trị — điều đó đổi số lần truy vấn.
- **bbox**: startX=776 startY=466 endX=1010 endY=561

### Item 5: Khối danh sách tài khoản nội bộ

- **nameJP**: 内部アカウント一覧ブロック
- **nameTrans**: Internal account list block
- **itemType**: others
- **itemSubtype**: list_section
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
- **databaseNote**: Thực thể tài khoản người dùng nội bộ của miền D-PARTY (RFP:602); bảng đã tồn tại thật và phủ được bảy trong chín cột. Hai cột còn lại chưa có nguồn — xem từng cột.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho quản trị thấy toàn bộ tài khoản nội bộ trong một danh sách lọc được — và là cửa vào SC-04
  - Thành phần hiển thị: một nhãn khối; một bảng chín cột; và một dòng ghi chú về hai cột đặc biệt
  - Chức năng và logic: mỗi dòng là một tài khoản; hai trục quyền tài khoản và khoá tạm hiển thị ở hai cột tách nhau
- **qa**: -
- **bbox**: startX=26 startY=600 endX=1026 endY=891

### Item 5.1: Tiêu đề khối danh sách

- **nameJP**: -
- **nameTrans**: List block title
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
  - Mục đích và ngữ cảnh: nhãn khối danh sách
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối và tên khối
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=616 endX=1010 endY=633

### Item 5.2: Bảng danh sách tài khoản

- **nameJP**: アカウント一覧表
- **nameTrans**: Account list table
- **itemType**: table
- **itemSubtype**: data_table
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
- **databaseColumn**: display_name; email; role; is_active; locked_until; created_at
- **databaseNote**: Sáu cột trên thực thể tài khoản nội bộ của D-PARTY (RFP:602) đã tồn tại thật. Cột "Thay đổi quyền gần nhất" đọc từ bảng lịch sử quyền — bảng đó CHƯA tồn tại; đề xuất ở SC-04. Cột "Yếu tố xác thực" chưa có nguồn vì phụ thuộc SC-02.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: chín cột phủ đủ những gì quản trị cần để biết ai đang hoạt động; ai giữ vai trò nào; tài khoản nào đang bị khoá tạm; và lần đổi quyền gần nhất của từng tài khoản
  - Thành phần hiển thị: một bảng chín cột với hàng tiêu đề và ba hàng dữ liệu mẫu; các ô trạng thái mang thẻ nhãn; ô hành động mang một nút
  - Chức năng và logic: cột "Thay đổi quyền gần nhất" đưa phần nghiệm thu của FR-IAM-02 (RFP:628) lên tận danh sách để người kiểm không phải mở từng tài khoản; cột "Yếu tố xác thực" phải phân biệt ba giá trị theo NFR-SEC-01 (RFP:809)
- **qa**:
  - - Số dòng mỗi trang là bao nhiêu và phân trang theo kiểu nào? Thiết kế không vẽ phân trang; NFR-PERF-01 (RFP:807) đặt p95 không vượt 2 giây nên số dòng phải có ngưỡng.
  - - Bảng có sắp xếp được theo cột không; và mặc định sắp theo cột nào? Thiết kế không khai.
  - - Cột định danh hiện đầy đủ hay che một phần? Đây là thông tin cá nhân của toàn bộ nhân sự nội bộ theo RFP §09-06 (RFP:886).
  - - Cột "Thay đổi quyền gần nhất" cần bảng lịch sử quyền chưa tồn tại — trước khi bảng đó có thì cột này hiện gì?
- **bbox**: startX=42 startY=644 endX=1010 endY=829

### Item 5.2.1: Dòng tài khoản (đại diện)

- **nameJP**: -
- **nameTrans**: Account row (representative)
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
- **databaseTable**: app_user
- **databaseColumn**: -
- **databaseNote**: Một dòng ứng với một bản ghi của thực thể tài khoản nội bộ trong D-PARTY (RFP:602).
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: một dòng tài khoản — lấy dòng đầu tiên làm đại diện cho cả ba dòng mẫu có cùng kết cấu
  - Thành phần hiển thị: chín ô theo đúng thứ tự cột; ba ô trạng thái mang thẻ nhãn; ô cuối mang một nút hành động thay đổi theo tình trạng của dòng
  - Chức năng và logic: lặp theo số tài khoản; kết cấu giống nhau nên gộp về một dòng đại diện — điểm khác duy nhất giữa ba dòng mẫu là giá trị và nút hành động phù hợp tình trạng
- **qa**: - Nút ở ô hành động đổi theo tình trạng của dòng (Mở chi tiết; Mở khoá tạm; Mở lại) — quy tắc chọn nút nào là gì khi một dòng thoả nhiều tình trạng cùng lúc? Thiết kế không khai thứ tự ưu tiên.
- **bbox**: startX=43 startY=688 endX=1010 endY=735

### Item 5.2.2: Nút Mở chi tiết trong dòng

- **nameJP**: -
- **nameTrans**: Open detail row button
- **itemType**: button
- **itemSubtype**: row_action
- **buttonType**: text_only
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: on_click
- **transitionNote**: Mở SC-04 cho tài khoản của dòng — nơi xem lịch sử quyền before/after và nơi đổi vai trò.
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: đường duy nhất từ danh sách sang màn chi tiết tài khoản
  - Thành phần hiển thị: một nút phụ nhãn chữ đặt ở ô hành động của dòng
  - Chức năng và logic: chỉ điều hướng; không ghi dữ liệu và không đổi trạng thái tài khoản nào
- **qa**: - Định danh tài khoản có xuất hiện trên đường dẫn của SC-04 không? Nếu có thì định danh lọt vào lịch sử trình duyệt và log truy cập; đây là thông tin cá nhân theo RFP §09-06 (RFP:886).
- **bbox**: startX=910 startY=694 endX=992 endY=723

### Item 5.2.3: Thẻ quyền tài khoản trong dòng (đại diện)

- **nameJP**: アカウント権限バッジ
- **nameTrans**: Account permission badge (representative)
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
- **databaseTable**: app_user
- **databaseColumn**: is_active
- **databaseNote**: Cột trạng thái quyền của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: hiển thị trạng thái quyền của tài khoản ở dạng thẻ để đọc nhanh cả bảng
  - Thành phần hiển thị: một thẻ chữ nhỏ viền bo; hai giá trị Đang hoạt động và Đã tạm ngừng — lấy thẻ của dòng đầu làm đại diện
  - Chức năng và logic: chỉ hiển thị trục quyền tài khoản; trục khoá tạm nằm ở cột riêng bên cạnh nên hai thẻ không được gộp
- **qa**: -
- **bbox**: startX=372 startY=694 endX=459 endY=713

### Item 5.2.4: Thẻ yếu tố xác thực trong dòng (đại diện)

- **nameJP**: 認証要素バッジ
- **nameTrans**: Authentication factor badge (representative)
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
- **databaseNote**: Suy từ diện bắt buộc MFA cộng dữ liệu của nhà cung cấp xác thực. Thực thể tài khoản nội bộ của D-PARTY (RFP:602) CHƯA có nguồn cho cả hai nửa — phụ thuộc SC-02.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: cho quản trị biết tài khoản có thuộc diện bắt buộc yếu tố xác thực thứ hai và đã đăng ký chưa — nghiệm thu NFR-SEC-01 (RFP:809) đòi kiểm tra được cấu hình
  - Thành phần hiển thị: một thẻ chữ nhỏ viền bo với ba giá trị: Không thuộc diện; Bắt buộc · đã đăng ký; Bắt buộc · chưa đăng ký — lấy thẻ của dòng đầu làm đại diện
  - Chức năng và logic: giá trị "Bắt buộc · chưa đăng ký" là cảnh báo tuân thủ; phải phân biệt được với "Không thuộc diện" chứ không gộp thành hai trạng thái
- **qa**:
  - - Ba giá trị của thẻ này cần diện bắt buộc MFA đã chốt; nhưng RFP không liệt vai nào có quyền phê duyệt nên diện đó còn treo. Trước khi chốt thì cột này hiện gì?
  - - Quản trị thấy được tài khoản người khác đã đăng ký yếu tố hay chưa — đây là thông tin về mức phòng thủ của tài khoản đó; có được phép hiện không?
- **bbox**: startX=555 startY=694 endX=665 endY=713

### Item 5.3: Ghi chú hai cột đặc biệt của danh sách

- **nameJP**: -
- **nameTrans**: Note on two special columns
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
  - Mục đích và ngữ cảnh: giải thích vì sao hai cột này không cắt được: một cột đưa nghiệm thu lên danh sách; một cột phục vụ kiểm tra tuân thủ
  - Thành phần hiển thị: một đoạn chú thích hai câu: cột thay đổi quyền gần nhất và cột yếu tố xác thực
  - Chức năng và logic: nghiệm thu FR-IAM-02 (RFP:628) phải thấy được ngay từ danh sách chứ không bắt người kiểm mở từng tài khoản
- **qa**: - Cột thay đổi quyền gần nhất chỉ hiện thời điểm và chủ thể — có cần hiện cả loại thay đổi không? Thiết kế không đòi; nhưng thiếu loại thay đổi thì người kiểm vẫn phải mở SC-04 để biết chuyện gì đã xảy ra.
- **bbox**: startX=42 startY=832 endX=1010 endY=864

### Item 6: Khối hành động của màn

- **nameJP**: 画面アクションブロック
- **nameTrans**: Screen actions block
- **itemType**: others
- **itemSubtype**: action_section
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
- **databaseNote**: Ghi vào thực thể tài khoản nội bộ của D-PARTY (RFP:602) cộng một dòng ở bảng lịch sử quyền — bảng lịch sử CHƯA tồn tại; đề xuất ở SC-04.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: bốn hành động màn này chịu trách nhiệm: ba chuyển tiếp quyền của FR-IAM-02 (RFP:628) cộng mở khoá tạm của NFR-SEC-03 (RFP:811)
  - Thành phần hiển thị: một nhãn khối; bốn nút xếp một hàng; và một dòng ghi chú về lý do bắt buộc và về dấu vết
  - Chức năng và logic: ba hành động quyền đều sinh một dòng lịch sử before/after xem được ở SC-04; mở khoá tạm không phải thay đổi quyền nhưng vẫn phải để lại dấu vết
- **qa**: -
- **bbox**: startX=26 startY=904 endX=1026 endY=1039

### Item 6.1: Tiêu đề khối hành động

- **nameJP**: -
- **nameTrans**: Actions block title
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
  - Mục đích và ngữ cảnh: nhãn khối hành động
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối và tên khối
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=920 endX=1010 endY=937

### Item 6.2: Nút Cấp tài khoản

- **nameJP**: -
- **nameTrans**: Create account button
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
- **databaseTable**: app_user
- **databaseColumn**: email; role; is_active; display_name
- **databaseNote**: Ghi một bản ghi mới vào thực thể tài khoản nội bộ của D-PARTY (RFP:602) — bảng đã tồn tại thật và cột định danh mang ràng buộc duy nhất. Kèm một dòng ở bảng lịch sử quyền; bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: phải chọn vai trò cho tài khoản mới — hàng "Cấp quyền" ở khối 1 đòi vai trò.
  - Điều kiện: định danh phải chưa tồn tại trong danh bạ người dùng nội bộ.
  - Điều kiện: bắt buộc kèm lý do — suy từ FR-AUDIT-01 (RFP:710); FR-IAM-02 (RFP:628) không đòi lý do.
  - Lỗi: "Định danh này đã có tài khoản." — không tạo thêm bản ghi.
  - Lỗi: "Phải nhập lý do cấp quyền." — không ghi gì.
- **description**:
  - Mục đích và ngữ cảnh: cấp quyền cho một người dùng nội bộ mới — chuyển tiếp thứ nhất của FR-IAM-02 (RFP:628)
  - Thành phần hiển thị: một nút chính nhãn chữ đặt đầu hàng nút của khối
  - Chức năng và logic: sinh tài khoản kèm vai trò và một dòng lịch sử quyền loại "cấp quyền"; tính duy nhất của định danh phải là ràng buộc dữ liệu chứ không phải một lần đọc trước khi ghi
- **qa**:
  - - Tài khoản mới nhận bí mật xác thực ban đầu qua đường nào? Là màn bảo mật nên thiết kế cố ý không vẽ; nhưng không có kênh phát thì không cấp được tài khoản.
  - - Cấp tài khoản chạm cả danh bạ xác thực và thực thể tài khoản nội bộ — hai nơi ghi phải cùng thành công hoặc cùng không; thiết kế không khai cách bảo đảm điều đó.
  - - Cấp tài khoản mở ngay ở màn này bằng một hộp thoại; hay chuyển sang màn riêng? Thiết kế chỉ vẽ nút.
- **bbox**: startX=42 startY=948 endX=140 endY=977

### Item 6.3: Nút Mở lại

- **nameJP**: -
- **nameTrans**: Reactivate button
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
- **databaseColumn**: is_active
- **databaseNote**: Đổi cột trạng thái quyền của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); cột đã tồn tại thật. Kèm một dòng ở bảng lịch sử quyền — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: tài khoản phải đang ở trạng thái đã tạm ngừng — chuyển tiếp "Mở lại" ở khối 1 chỉ đi từ trạng thái đó.
  - Điều kiện: bắt buộc kèm lý do — suy từ FR-AUDIT-01 (RFP:710).
  - Lỗi: "Phải nhập lý do mở lại quyền." — không ghi thay đổi.
  - Lỗi: "Tài khoản đang hoạt động; không cần mở lại." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: mở lại quyền cho một tài khoản đã bị tạm ngừng — chuyển tiếp thứ ba của FR-IAM-02 (RFP:628)
  - Thành phần hiển thị: một nút phụ nhãn chữ đặt sau nút Cấp tài khoản
  - Chức năng và logic: sinh một dòng lịch sử quyền loại "mở lại" mang giá trị trước và sau; đọc lại giá trị cũ trước khi ghi để dòng lịch sử không rỗng nửa
- **qa**: - Mở lại một tài khoản có phục hồi vai trò cũ; hay buộc chọn lại vai trò? Thiết kế đặt đổi vai trò ở SC-04 nên mặc định là giữ vai trò cũ; cần xác nhận.
- **bbox**: startX=143 startY=948 endX=203 endY=977

### Item 6.4: Nút Mở khoá tạm

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
- **databaseNote**: Đặt lại hai cột đếm số lần sai và mốc hết khoá trên thực thể tài khoản nội bộ của D-PARTY (RFP:602); cả hai đã tồn tại thật. Dấu vết ghi cùng chỗ với lịch sử quyền để người kiểm chỉ phải đọc một dòng thời gian — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: tài khoản phải đang trong thời gian khoá tạm.
  - Lỗi: "Tài khoản không đang bị khoá tạm." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: gỡ khoá tạm cho một tài khoản trước khi khoá tự hết — thuộc NFR-SEC-03 (RFP:811) chứ không phải một chuyển tiếp quyền
  - Thành phần hiển thị: một nút phụ nhãn chữ đặt sau nút Mở lại
  - Chức năng và logic: không đổi trạng thái quyền tài khoản; nhưng vẫn để lại dấu vết vì RFP §02-08 (RFP:310) liệt lock/unlock tài khoản là thao tác độ nhạy cao bắt buộc truy vết
- **qa**:
  - - Mở khoá tạm có bắt buộc kèm lý do không? Đây không phải thay đổi quyền nên FR-IAM-02 (RFP:628) không phủ; nhưng RFP §02-08 (RFP:310) đòi truy vết. Bắt buộc lý do thì thao tác thường ngày nặng tay.
  - - Người bị mở khoá có được thông báo không? Thiết kế không khai.
- **bbox**: startX=207 startY=948 endX=303 endY=977

### Item 6.5: Nút Tạm ngừng

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
- **databaseNote**: Đổi cột trạng thái quyền của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); cột đã tồn tại thật. Kèm một dòng ở bảng lịch sử quyền — bảng đó CHƯA tồn tại.
- **validationNote**:
  - Điều kiện: tài khoản phải đang hoạt động — chuyển tiếp "Tạm ngừng" ở khối 1 chỉ đi từ trạng thái đó.
  - Điều kiện: bắt buộc kèm lý do — suy từ FR-AUDIT-01 (RFP:710).
  - Điều kiện: KHÔNG cho tự tạm ngừng chính mình.
  - Điều kiện: KHÔNG cho tạm ngừng tài khoản quản trị đang hoạt động cuối cùng.
  - Lỗi: "Không thể tạm ngừng tài khoản của chính bạn." — không ghi thay đổi.
  - Lỗi: "Không thể tạm ngừng tài khoản quản trị đang hoạt động cuối cùng." — không ghi thay đổi.
  - Lỗi: "Phải nhập lý do tạm ngừng quyền." — không ghi thay đổi.
- **description**:
  - Mục đích và ngữ cảnh: tạm ngừng quyền của một tài khoản — chuyển tiếp thứ hai của FR-IAM-02 (RFP:628)
  - Thành phần hiển thị: một nút mang sắc thái cảnh báo nhãn chữ đặt cuối hàng nút của khối
  - Chức năng và logic: hai cửa chặn cứng phải nằm ở tầng ghi chứ không chỉ ẩn nút: tự tạm ngừng chính mình và tạm ngừng tài khoản quản trị cuối cùng — mất cả hai là mất đường quản trị hệ thống
- **qa**:
  - - Tài khoản đang có phiên sống bị tạm ngừng thì phiên đó chấm dứt ngay; hay chỉ hết ở lần điều hướng kế tiếp? SC-01 vẽ đường đẩy người đó về cổng vào kèm lý do nhưng không khai thời điểm.
  - - "Tài khoản quản trị đang hoạt động cuối cùng" đếm theo vai trò ROLE-SYS-ADMIN — nếu chủ đầu tư chốt thêm một vai quản trị nhân sự riêng thì cách đếm này còn đúng không?
  - - Tạm ngừng có ảnh hưởng dữ liệu nghiệp vụ tài khoản đó đã tạo không? Thiết kế không đòi xoá gì; nhưng yêu cầu xoá dữ liệu cá nhân theo RFP §09-06 (RFP:887) có thể đòi khác.
- **bbox**: startX=306 startY=948 endX=393 endY=977

