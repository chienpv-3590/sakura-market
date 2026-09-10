# Items Analysis - SC-01 Đăng nhập

- Nguồn: ảnh `.momorph/shots/SC-01-dang-nhap.png` (1280x1892; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-01-dang-nhap-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3

### Item 3.2.1: Dòng vai trò và khu vực làm việc (đại diện)

- **nameJP**: -
- **nameTrans**: Role mapping row (representative)
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
  - Mục đích và ngữ cảnh: một hàng ánh xạ — lấy hàng đầu tiên ROLE-INTAKE làm đại diện cho cả 7 hàng có cùng kết cấu
  - Thành phần hiển thị: ô thứ nhất là mã vai trò; ô thứ hai là tên khu vực làm việc đích
  - Chức năng và logic: lặp 7 lần với 7 vai trò khác nhau; kết cấu và cách đọc giống nhau nên gộp về một hàng đại diện
- **qa**: -
- **bbox**: startX=43 startY=610 endX=1010 endY=639

### Item 3.3: Ghi chú thời điểm gán vai trò

- **nameJP**: -
- **nameTrans**: Role assignment timing note
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
  - Mục đích và ngữ cảnh: chốt lại điều dễ mất nhất của FR-IAM-01 — thời điểm gán vai trò là lúc đăng nhập chứ không phải lúc dựng menu
  - Thành phần hiển thị: một đoạn chú thích ba câu: thời điểm gán; hệ quả khi đổi vai trò giữa phiên; và lý do không có trang chọn khu vực
  - Chức năng và logic: đổi vai trò ở SC-04 làm phiên đang dùng không còn đúng mức nên lần điều hướng kế tiếp phải xác thực lại
- **qa**:
  - - Đổi vai trò giữa phiên thì phiên cũ hết hiệu lực ngay; hay chỉ hết ở lần điều hướng kế tiếp? Thiết kế nói "lần điều hướng kế tiếp" nên vẫn còn một khoảng người dùng giữ vai trò cũ.
  - - Người dùng đang mở nhiều tab thì mọi tab phải xác thực lại cùng lúc không? Thiết kế không khai.
- **bbox**: startX=42 startY=816 endX=1010 endY=848

### Item 4: Khối ghi log truy cập

- **nameJP**: アクセスログ記録ブロック
- **nameTrans**: Access log requirement block
- **itemType**: others
- **itemSubtype**: audit_section
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: -
- **databaseNote**: Thực thể vết thao tác dùng chung; FR-AUDIT-01 (RFP:710) đòi chủ thể; timestamp; before/after và lý do. Bảng đã tồn tại thật.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: phần "và có log" của nghiệm thu FR-IAM-01 (RFP:627) — khối này khai nội dung bắt buộc của bản ghi; không phải một vùng hiển thị
  - Thành phần hiển thị: một nhãn khối; một bảng hai cột liệt 5 sự kiện phải ghi; và một dòng ghi chú
  - Chức năng và logic: màn này là nơi sinh ra bản ghi log; nơi tra cứu là SC-30 nên không có phần hiển thị log ở đây
- **qa**: -
- **bbox**: startX=26 startY=888 endX=1026 endY=1150

### Item 4.1: Tiêu đề khối ghi log truy cập

- **nameJP**: -
- **nameTrans**: Access log block title
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
  - Mục đích và ngữ cảnh: nhãn khối kèm lời nhắc khối này không sinh phần hiển thị nào
  - Thành phần hiển thị: một dòng chữ in hoa nhỏ gồm số thứ tự khối; tên khối; mã FR-IAM-01 và cụm "không hiển thị trên màn"
  - Chức năng và logic: văn bản tĩnh — không tương tác
- **qa**: -
- **bbox**: startX=42 startY=904 endX=1010 endY=921

### Item 4.2: Bảng sự kiện log bắt buộc

- **nameJP**: 必須ログイベント一覧
- **nameTrans**: Required log event table
- **itemType**: table
- **itemSubtype**: requirement_table
- **buttonType**: -
- **dataType**: -
- **format**: -
- **required**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: audit_log
- **databaseColumn**: actor_id; action; created_at
- **databaseNote**: Vết thao tác của miền D-PARTY (RFP:602) theo FR-AUDIT-01 (RFP:710); các cột chủ thể; loại thao tác và thời điểm đã tồn tại thật. Nội dung "nguồn truy cập" mà thiết kế đòi cho sự kiện bị từ chối CHƯA có cột tương ứng.
- **validationNote**: -
- **description**:
  - Mục đích và ngữ cảnh: khai 5 sự kiện quanh cổng đăng nhập phải sinh bản ghi log và nội dung bắt buộc của từng bản ghi
  - Thành phần hiển thị: một bảng hai cột với hàng tiêu đề "Sự kiện phải ghi" và "Nội dung bắt buộc của bản ghi"; và 5 hàng dữ liệu gồm xác thực thành công; xác thực bị từ chối; tài khoản bị khoá tạm; đăng nhập vào tài khoản đã tạm ngừng; đăng xuất hoặc phiên kết thúc do timeout
  - Chức năng và logic: ba sự kiện cuối cũng là phần "log hành vi bất thường" của NFR-SEC-03 (RFP:811); nên bảng này phục vụ hai yêu cầu khách cùng lúc
- **qa**:
  - - "Nguồn truy cập" phải ghi ở mức nào — địa chỉ mạng; thiết bị; hay chuỗi nhận dạng trình duyệt? Thiết kế chỉ ghi tên trường; và đây là dữ liệu cá nhân theo RFP §09-06 (RFP:886) nên phạm vi thu thập phải chốt trước.
  - - Bản ghi cho nhánh bị từ chối có được lưu định danh đã dùng không; kể cả khi định danh đó không tồn tại? Ghi thì thành nơi tích tụ định danh lạ; không ghi thì mất đường điều tra.
  - - Thời hạn lưu bản ghi log truy cập là bao lâu? DR-RET-01 (RFP:813) nêu 7 năm cho dữ liệu nghiệp vụ tra cứu online nhưng không nói rõ vết truy cập có thuộc diện đó.
- **bbox**: startX=42 startY=932 endX=1010 endY=1104

### Item 4.2.1: Dòng sự kiện log (đại diện)

- **nameJP**: -
- **nameTrans**: Log event row (representative)
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
  - Mục đích và ngữ cảnh: một hàng sự kiện log — lấy hàng đầu tiên "Xác thực thành công" làm đại diện cho cả 5 hàng có cùng kết cấu
  - Thành phần hiển thị: ô thứ nhất là tên sự kiện; ô thứ hai là danh sách nội dung bắt buộc nối bằng dấu chấm giữa
  - Chức năng và logic: lặp 5 lần với 5 sự kiện khác nhau; kết cấu giống nhau nên gộp về một hàng đại diện
- **qa**: -
- **bbox**: startX=43 startY=959 endX=1010 endY=988

### Item 4.3: Ghi chú nơi sinh log và nơi tra cứu

- **nameJP**: -
- **nameTrans**: Log origin and lookup note
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
  - Mục đích và ngữ cảnh: tách rõ hai việc — sinh bản ghi và tra cứu bản ghi thuộc hai màn khác nhau
  - Thành phần hiển thị: một dòng chú thích ngắn nêu màn này sinh log và SC-30 là nơi tra cứu
  - Chức năng và logic: không có đường điều hướng sang SC-30 từ màn này; người chưa đăng nhập không được đọc log
- **qa**: -
- **bbox**: startX=42 startY=1107 endX=1010 endY=1123

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
- **bbox**: startX=26 startY=1163 endX=1026 endY=1450

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
- **bbox**: startX=42 startY=1179 endX=1010 endY=1196

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
  - Thành phần hiển thị: 8 thẻ có cùng kết cấu: Mặc định; Đang xác thực; Bị từ chối; Quyền đã bị tạm ngừng; Đang bị khoá tạm; Phiên hết hiệu lực; Đã có phiên hợp lệ; Chưa đủ mức bảo mật
  - Chức năng và logic: ba trạng thái Bị từ chối; Quyền đã bị tạm ngừng và Đang bị khoá tạm phải không phân biệt được từ bên ngoài ở nhánh sai thông tin xác thực; hai trạng thái Đã có phiên hợp lệ và Chưa đủ mức bảo mật quyết định có render form hay không
- **qa**:
  - - Trạng thái "Chưa đủ mức bảo mật" phụ thuộc SC-02 đang hoãn — trước khi SC-02 dựng thì vai trò thuộc diện bắt buộc MFA vào thẳng khu vực làm việc hay bị chặn? Thiết kế không khai đường tạm.
  - - Trạng thái "Đang bị khoá tạm" phải nêu rõ thời điểm hết khoá; nhưng nêu chính xác cũng là nói cho người ngoài biết tài khoản đó tồn tại. Khách chọn phía nào?
- **bbox**: startX=42 startY=1207 endX=1010 endY=1434

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
  - Mục đích và ngữ cảnh: một thẻ trạng thái — lấy thẻ đầu tiên "Mặc định" làm đại diện cho cả 8 thẻ có cùng kết cấu
  - Thành phần hiển thị: một thẻ viền nét đứt gồm tiêu đề trạng thái và một đoạn mô tả; thẻ đại diện ghi "Hai trường bắt buộc còn rỗng; nút bật; không có thông báo nào"
  - Chức năng và logic: lặp 8 lần trong lưới với nội dung khác nhau; kết cấu và cách đọc giống nhau nên gộp về một thẻ đại diện
- **qa**: -
- **bbox**: startX=42 startY=1207 endX=277 endY=1316

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
  - Mục đích và ngữ cảnh: chỗ duy nhất trên màn nói về bản thi công — tách khỏi phần thiết kế để không lẫn hai nền
  - Thành phần hiển thị: một nhãn khối và một bảng ba cột: thiết kế đòi; prototype làm; và mức lệch
  - Chức năng và logic: chỉ hiển thị; nội dung là 5 điểm lệch giữa thiết kế và bản thi công
- **qa**: -
- **bbox**: startX=26 startY=1463 endX=1026 endY=1772

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
- **bbox**: startX=42 startY=1479 endX=1010 endY=1496

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
  - Thành phần hiển thị: một bảng ba cột với hàng tiêu đề "Thiết kế đòi"; "Prototype làm"; "Mức"; và 5 hàng dữ liệu; ô mức mang một thẻ nhãn
  - Chức năng và logic: chỉ ba giá trị mức: khác có chủ đích; khác không chủ đích; cần khách chốt — hàng "cần khách chốt" là hàng phải đưa vào biên bản với chủ đầu tư
- **qa**: - Bảng đối chiếu này có xuất hiện trên màn thật không; hay chỉ tồn tại trong tài liệu thiết kế? Nếu chỉ ở tài liệu thì màn thật không có khối này.
- **bbox**: startX=42 startY=1507 endX=1010 endY=1756

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
  - Thành phần hiển thị: ba ô: điều thiết kế đòi; điều bản thi công làm; và một thẻ nhãn mức lệch kèm câu giải thích ngắn
  - Chức năng và logic: lặp 5 lần với nội dung khác nhau; kết cấu giống nhau nên gộp về một hàng đại diện
- **qa**: -
- **bbox**: startX=43 startY=1535 endX=1010 endY=1583

