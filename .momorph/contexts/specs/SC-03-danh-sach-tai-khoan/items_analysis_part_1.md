# Items Analysis - SC-03 Danh sách tài khoản

- Nguồn: ảnh `.momorph/shots/SC-03-danh-sach-tai-khoan.png` (1280x1805; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-03-danh-sach-tai-khoan-dom-boxes.json`
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
  - Thành phần hiển thị: một dòng chữ đậm gồm mã màn SC-03 và tên màn tiếng Việt
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
  - Mục đích và ngữ cảnh: chuỗi truy vết của màn theo Feature List — màn này và SC-04 cùng thoả một FE-003
  - Thành phần hiển thị: mã FE-003; nhóm FN-01; ưu tiên P0; yêu cầu khách FR-IAM-02; loại màn List; và actor là quản trị hệ thống
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
- **bbox**: startX=600 startY=60 endX=676 endY=79

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
  - Thành phần hiển thị: một khối chú dẫn nền vàng gồm mã FR-IAM-02; nội dung yêu cầu; câu khẳng định yêu cầu còn hiệu lực; và ba thứ không vẽ
  - Chức năng và logic: ba thứ không vẽ: cấu hình khoá; bí mật của tài khoản; dữ liệu định danh thật — dữ liệu trên bảng mẫu là giá trị minh hoạ
- **qa**: - Dữ liệu định danh trên bảng mẫu là giá trị minh hoạ — màn thật hiện định danh đầy đủ hay che một phần? Đây là thông tin cá nhân theo RFP §09-06 (RFP:886) nên cách hiển thị phải chốt.
- **bbox**: startX=26 startY=119 endX=1026 endY=172

### Item 3: Khối vòng đời quyền tài khoản

- **nameJP**: アカウント権限ライフサイクル
- **nameTrans**: Account permission lifecycle block
- **itemType**: others
- **itemSubtype**: lifecycle_section
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
- **databaseNote**: Cột trạng thái quyền của thực thể tài khoản nội bộ trong miền D-PARTY (RFP:602); đã tồn tại thật. Trạng thái quyền chỉ có hai giá trị nên ba chuyển tiếp chạy trên cùng một cột.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: khai đúng ba chuyển tiếp mà FR-IAM-02 (RFP:628) đòi: cấp; tạm ngừng; mở lại quyền tài khoản
  - Thành phần hiển thị: một nhãn khối; một bảng bốn cột với ba hàng chuyển tiếp; và một dòng ghi chú tách khoá tạm ra khỏi vòng đời
  - Chức năng và logic: ba chuyển tiếp này là hợp đồng trạng thái của quyền tài khoản; đổi vai trò KHÔNG nằm ở màn này vì cần trang before/after nên thuộc SC-04
- **qa**: -
- **bbox**: startX=26 startY=188 endX=1026 endY=409

### Item 3.1: Tiêu đề khối vòng đời quyền tài khoản

- **nameJP**: -
- **nameTrans**: Lifecycle block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm số lượng chuyển tiếp mà yêu cầu khách đòi
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và cụm "ba chuyển tiếp FR-IAM-02 đòi"
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=204 endX=1010 endY=222

### Item 3.2: Bảng ba chuyển tiếp vòng đời quyền

- **nameJP**: 権限遷移表
- **nameTrans**: Permission transition table
- **itemType**: table
- **itemSubtype**: transition_table
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
- **databaseColumn**: is_active; role
- **databaseNote**: Hai cột trạng thái quyền và vai trò của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật. Bảng lưu lịch sử ba chuyển tiếp này thì CHƯA tồn tại — đề xuất ở SC-04.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: ba chuyển tiếp của quyền tài khoản; kèm trạng thái nguồn; trạng thái đích; và những gì bắt buộc phải kèm mỗi lần chuyển
  - Thành phần hiển thị: một bảng bốn cột với hàng tiêu đề "Chuyển tiếp"; "Từ"; "Sang"; "Bắt buộc kèm"; và ba hàng: Cấp quyền; Tạm ngừng; Mở lại
  - Chức năng và logic: cột "Bắt buộc kèm" là chỗ nghiệm thu FR-IAM-02 (RFP:628) rơi vào: mỗi chuyển tiếp phải có chủ thể và thời điểm; hàng cấp quyền thêm vai trò
- **qa**:
  - - Cột "Bắt buộc kèm" liệt lý do cho cả ba chuyển tiếp; nhưng FR-IAM-02 (RFP:628) chỉ đòi before/after; chủ thể và timestamp — KHÔNG đòi lý do. Lý do ở đây suy từ FR-AUDIT-01 (RFP:710). Chủ đầu tư có đòi lý do bắt buộc không; hay đây là mức chặt hơn RFP?
  - - Có chuyển tiếp nào đưa tài khoản ra khỏi hệ thống hoàn toàn không — thu hồi vĩnh viễn? Bảng chỉ có ba chuyển tiếp và không có trạng thái kết thúc.
  - - Cấp quyền cho một định danh đã từng bị tạm ngừng thì tính là "Cấp quyền" mới hay "Mở lại"? Hai hàng có yêu cầu kèm khác nhau.
- **bbox**: startX=42 startY=233 endX=1010 endY=347

### Item 3.2.1: Dòng chuyển tiếp vòng đời (đại diện)

- **nameJP**: -
- **nameTrans**: Lifecycle transition row (representative)
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
  - Mục đích và ngữ cảnh: một hàng chuyển tiếp — lấy hàng đầu tiên "Cấp quyền" làm đại diện cho cả ba hàng có cùng kết cấu
  - Thành phần hiển thị: bốn ô: tên chuyển tiếp; trạng thái nguồn; trạng thái đích; và danh sách nội dung bắt buộc kèm
  - Chức năng và logic: lặp ba lần với ba chuyển tiếp khác nhau; kết cấu giống nhau nên gộp về một hàng đại diện
- **qa**: -
- **bbox**: startX=43 startY=260 endX=1010 endY=289

### Item 3.3: Ghi chú khoá tạm là trục độc lập

- **nameJP**: -
- **nameTrans**: Lock as independent axis note
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
  - Mục đích và ngữ cảnh: chốt hai điều dễ sai nhất: khoá tạm không phải một trạng thái của vòng đời quyền; và đổi vai trò không thuộc màn này
  - Thành phần hiển thị: một đoạn chú thích ba câu: khoá tạm sinh từ đâu và tự hết ra sao; một tài khoản đang hoạt động vẫn có thể đang bị khoá tạm; và lý do đổi vai trò thuộc SC-04
  - Chức năng và logic: hai trục phải hiển thị tách nhau và lọc được độc lập; gộp hai trục thành một cột là mất khả năng đọc đúng trạng thái tài khoản
- **qa**: - Tài khoản đã tạm ngừng mà vẫn còn mốc khoá tạm chưa hết thì hiển thị thế nào? Hai trục độc lập nên có thể cùng bật; thiết kế không khai thứ tự ưu tiên khi hiển thị.
- **bbox**: startX=42 startY=350 endX=1010 endY=383

### Item 4: Khối bộ lọc

- **nameJP**: 絞り込みブロック
- **nameTrans**: Filter block
- **itemType**: others
- **itemSubtype**: filter_section
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
  - Mục đích và ngữ cảnh: thu hẹp danh sách để quản trị tìm nhanh tài khoản cần xử lý
  - Thành phần hiển thị: một nhãn khối và bốn bộ lọc xếp một hàng: vai trò; quyền tài khoản; đang bị khoá tạm; và ô tìm theo tên hoặc định danh
  - Chức năng và logic: bốn bộ lọc áp đồng thời; hai trục quyền tài khoản và khoá tạm lọc độc lập nhau theo ghi chú ở khối 1
- **qa**: -
- **bbox**: startX=26 startY=422 endX=1026 endY=587

### Item 4.1: Tiêu đề khối bộ lọc

- **nameJP**: -
- **nameTrans**: Filter block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm vị trí đặt bộ lọc
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối và cụm "nằm trên bảng"
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=438 endX=1010 endY=455

### Item 4.2: Bộ lọc Vai trò

- **nameJP**: ロール絞り込み
- **nameTrans**: Role filter
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **format**: Tất cả | một trong 7 vai trò nội bộ
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: role
- **databaseNote**: Cột vai trò của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật với ràng buộc đúng 7 giá trị của TBL-ROLE-01 (RFP:245).
- **validationNote**:
  - Điều kiện: không bắt buộc — mặc định Tất cả.
  - Điều kiện: tập giá trị đúng 7 vai trò nội bộ của TBL-ROLE-01 (RFP:245).
  - Điều kiện: giá trị lạ thì BỎ QUA bộ lọc và trả danh sách đầy đủ — không báo lỗi hệ thống.
- **description**:
  - Mục đích và ngữ cảnh: lọc danh sách theo vai trò nội bộ
  - Thành phần hiển thị: nhãn không dấu sao; một select mặc định Tất cả; và một dòng chú thích về tập giá trị và cách xử lý giá trị lạ
  - Chức năng và logic: giá trị lạ không được làm màn lỗi — bộ lọc là tiện ích đọc nên phải suy biến an toàn
- **qa**: - Bộ lọc có cho chọn nhiều vai trò cùng lúc không? Ảnh cho thấy một select đơn nên mặc định là một giá trị.
- **bbox**: startX=42 startY=466 endX=276 endY=561

### Item 4.3: Bộ lọc Quyền tài khoản

- **nameJP**: アカウント権限絞り込み
- **nameTrans**: Account permission filter
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **format**: Tất cả | đang hoạt động | đã tạm ngừng
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: is_active
- **databaseNote**: Cột trạng thái quyền của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); đã tồn tại thật.
- **validationNote**:
  - Điều kiện: không bắt buộc — mặc định Tất cả.
  - Điều kiện: đúng ba giá trị Tất cả; đang hoạt động; đã tạm ngừng — khớp hai trạng thái của vòng đời ở khối 1.
- **description**:
  - Mục đích và ngữ cảnh: lọc theo trục quyền tài khoản — trục do ba chuyển tiếp của FR-IAM-02 (RFP:628) điều khiển
  - Thành phần hiển thị: nhãn không dấu sao; một select mặc định Tất cả; và một dòng chú thích liệt ba giá trị
  - Chức năng và logic: trục này độc lập với trục khoá tạm nên hai bộ lọc phải áp được đồng thời
- **qa**: -
- **bbox**: startX=287 startY=466 endX=521 endY=561

### Item 4.4: Bộ lọc Đang bị khoá tạm

- **nameJP**: 一時ロック絞り込み
- **nameTrans**: Temporary lock filter
- **itemType**: dropdown
- **itemSubtype**: select_single
- **buttonType**: -
- **dataType**: string
- **format**: Tất cả | đang khoá | không khoá
- **required**: false
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Tất cả
- **userAction**: on_click
- **transitionNote**: -
- **databaseTable**: app_user
- **databaseColumn**: locked_until
- **databaseNote**: Suy từ cột mốc hết khoá tạm của thực thể tài khoản nội bộ trong D-PARTY (RFP:602); cột đã tồn tại thật. Đây là giá trị dẫn xuất theo thời điểm đọc chứ không phải cột trạng thái riêng.
- **validationNote**:
  - Điều kiện: không bắt buộc — mặc định Tất cả.
  - Điều kiện: lọc độc lập với bộ lọc quyền tài khoản — hai trục áp đồng thời chứ không loại nhau.
- **description**:
  - Mục đích và ngữ cảnh: lọc theo trục khoá tạm — trục do NFR-SEC-03 (RFP:811) sinh ra và tự hết theo thời gian
  - Thành phần hiển thị: nhãn không dấu sao; một select mặc định Tất cả; và một dòng chú thích nêu rõ đây là trục thứ hai
  - Chức năng và logic: giá trị suy từ mốc hết khoá so với thời điểm hiện tại nên kết quả lọc đổi theo thời gian mà dữ liệu không đổi
- **qa**: - Kết quả lọc trục khoá tạm đổi theo thời gian dù dữ liệu không đổi — danh sách có tự làm mới không; hay người dùng phải tải lại? Thiết kế không khai.
- **bbox**: startX=532 startY=466 endX=765 endY=561

