# Items Analysis - Tra cứu audit log

- Nguồn: `.momorph/shots/SC-30-tra-cuu-audit-log.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-30-tra-cuu-audit-log-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2147 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 43
- Batch: part 1 / 3

### Item 1: Khối đầu màn tra cứu audit log

- itemId: img-001
- parentNo: -
- bbox: (26, 22) - (1026, 122)
- nameJP: -
- nameTrans: Screen header block
- itemType: others
- itemSubtype: khối tiêu đề màn
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết; cho biết đây là phía đọc của dữ liệu audit.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-042 · FN-13 · ưu tiên P1 · FR-AUDIT-02 · NFR-PERF-01 · tham chiếu mục bảo vệ thông tin cá nhân · loại màn List · route đề xuất · actor · một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác nào.
- qa: -

### Item 1.1: Tiêu đề màn

- itemId: img-002
- parentNo: 1
- bbox: (26, 22) - (1026, 48)
- nameJP: 監査ログ照会
- nameTrans: Screen title
- itemType: label
- itemSubtype: tiêu đề cấp hai
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn tra cứu dấu vết thao tác của toàn hệ.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-30 và tên màn.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 1.2: Dòng metadata truy vết

- itemId: img-003
- parentNo: 1
- bbox: (26, 60) - (1026, 98)
- nameJP: -
- nameTrans: Traceability metadata line
- itemType: label
- itemSubtype: đoạn văn nhiều dòng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nối màn về FE-042 và hai mã yêu cầu; khai luôn rằng màn chạm mục bảo vệ thông tin cá nhân của yêu cầu khách.
  - Thành phần hiển thị: Hai dòng chữ nhỏ liệt tính năng · nhóm chức năng · ưu tiên · FR-AUDIT-02 · NFR-PERF-01 · tham chiếu mục bảo vệ thông tin cá nhân · loại màn · route đề xuất · actor là bộ phận hành chính và kiểm toán nội bộ · thẻ trạng thái.
  - Chức năng và logic: Tĩnh. Actor mà yêu cầu khách gọi tên không khớp vai trò nào của hệ nên ánh xạ là một giả định phải chốt.
- qa: -

### Item 1.2.1: Thẻ trạng thái dựng màn

- itemId: img-004
- parentNo: 1.2
- bbox: (26, 79) - (102, 98)
- nameJP: -
- nameTrans: Build status tag
- itemType: label
- itemSubtype: thẻ nhỏ trong dòng
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho biết màn chưa có bản thi công nào để đối chiếu.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn ở đầu dòng thứ hai của metadata với nội dung Chưa thi công.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- qa: -

### Item 2: Dải chú thích yêu cầu, nghiệm thu và quan hệ với phía ghi

- itemId: img-005
- parentNo: -
- bbox: (26, 138) - (1026, 284)
- nameJP: -
- nameTrans: Requirement acceptance and write-side notice
- itemType: label
- itemSubtype: dải chú thích đầu màn
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ghim bốn tiêu chí bắt buộc, ngưỡng nghiệm thu, và điều quan trọng nhất của màn: dữ liệu tìm được phải do phía ghi lưu từ đầu.
  - Thành phần hiển thị: Một dải chú thích nền vàng nhạt ba đoạn: đoạn khai màn chưa thi công; đoạn dẫn FR-AUDIT-02 với bốn tiêu chí bắt buộc và ngưỡng NFR-PERF-01 là p95 không vượt hai giây kèm nghiệm thu bằng báo cáo load test; đoạn nêu quan hệ với tính năng ghi audit là phía ghi của cùng dữ liệu.
  - Chức năng và logic: Tĩnh. Kết luận của đoạn thứ ba là ràng buộc thiết kế: cái gì phía ghi không lưu thì phía đọc không có cách nào tìm.
- qa: -

### Item 3: Khối bốn tiêu chí bắt buộc

- itemId: img-006
- parentNo: -
- bbox: (26, 300) - (1026, 664)
- nameJP: -
- nameTrans: Mandatory criteria filter block
- itemType: others
- itemSubtype: khối bộ lọc sáu điều kiện và hai nút
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Nơi người điều tra dựng câu hỏi của mình; bốn field đầu là đúng bốn tiêu chí FR-AUDIT-02 bắt buộc.
  - Thành phần hiển thị: Tiêu đề khối nêu phạm vi field số 1 tới số 4; hai hàng sáu điều kiện; hai nút hành động; một đoạn ghi chú về việc kết hợp tiêu chí.
  - Chức năng và logic: Bốn tiêu chí bắt buộc phải kết hợp được với nhau và mỗi tiêu chí phải đứng một mình cũng chạy được. Hai field cuối là tiện ích thêm để thu hẹp kết quả.
- qa: -

### Item 3.1: Ô ID giao dịch

- itemId: img-007
- parentNo: 3
- bbox: (42, 345) - (357, 440)
- nameJP: 取引ID
- nameTrans: Transaction ID
- itemType: text_form
- itemSubtype: ô nhập một dòng kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: uuid hoặc mã giao dịch nghiệp vụ
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: entity; entity_id
- databaseNote: Bảng audit đã tồn tại. Sắc thái: tra được nhưng chỉ qua MỘT CẶP CỘT loại thực thể và mã thực thể, không có cột riêng cho ID giao dịch, và mã thực thể lưu dạng chuỗi. Đây là chuyện hình dạng truy vấn, sửa được ở tầng đọc.
- validationNote:
  - Điều kiện: nhận cả uuid và mã nghiệp vụ.
  - Lỗi: không phân tích được giá trị thì trả danh sách rỗng chứ không trả lỗi 4xx.
- description:
  - Mục đích và ngữ cảnh: Tiêu chí thứ nhất trong bốn tiêu chí bắt buộc; là đường vào thường dùng nhất khi điều tra một giao dịch cụ thể.
  - Thành phần hiển thị: Nhãn ID giao dịch kèm dấu sao bắt buộc; ô nhập một dòng hiện gợi ý uuid hoặc mã giao dịch; dòng nhắc ghi field số 1 là tiêu chí một trên bốn, nhận cả hai dạng, và không phân tích được thì trả danh sách rỗng.
  - Chức năng và logic: Giá trị lạ không làm lỗi mà chỉ trả rỗng — có chủ đích, vì người điều tra thường dán mã từ nơi khác.
- qa:
  - Nhập một uuid không thuộc giao dịch mà thuộc thực thể khác thì vẫn tra hay báo không hợp lệ?
  - Có cho tra theo một phần của mã hay bắt buộc khớp trọn?
  - Mã giao dịch nghiệp vụ và uuid có thể trùng dạng không; nếu có thì ưu tiên đường nào?

### Item 3.2: Ô Ngày nghiệp vụ

- itemId: img-008
- parentNo: 3
- bbox: (368, 345) - (684, 440)
- nameJP: 業務日
- nameTrans: Business date
- itemType: date_picker
- itemSubtype: ô chọn khoảng ngày kèm nhãn và dòng nhắc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD — YYYY-MM-DD
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: bảng audit không có cột nào chứa ngày nghiệp vụ, và không tính ngược được từ thời điểm ghi. Dữ liệu này phải do phía ghi truyền vào từ đầu nên dữ liệu cũ không lấp lại được.
- validationNote:
  - Điều kiện: mốc đầu phải nhỏ hơn hoặc bằng mốc cuối.
  - Lỗi: "Khoảng ngày không hợp lệ."
- description:
  - Mục đích và ngữ cảnh: Tiêu chí thứ hai trong bốn tiêu chí bắt buộc; là trục thời gian mà mọi cuộc điều tra bắt đầu từ đó.
  - Thành phần hiển thị: Nhãn Ngày nghiệp vụ kèm dấu sao bắt buộc; ô chọn khoảng ngày hiện mẫu hai mốc dạng YYYY-MM-DD; dòng nhắc ghi field số 2 là tiêu chí hai trên bốn và nói rõ đây là ngày nghiệp vụ theo JST chứ không phải ngày hệ thống.
  - Chức năng và logic: Ngày nghiệp vụ khác ngày hệ thống: một điều chỉnh làm sau 10:00 thuộc về ngày nghiệp vụ trước đó, nên không suy được ngày nghiệp vụ từ thời điểm ghi.
- qa:
  - Chỉ nhập mốc đầu mà bỏ trống mốc cuối thì hiểu là mở đến hôm nay hay báo lỗi?
  - Khoảng ngày có bị giới hạn độ dài tối đa để giữ ngưỡng thời gian phản hồi không?
  - Bản ghi không có ngày nghiệp vụ thì hiện dấu gạch và có bị loại khỏi kết quả khi lọc theo ngày không?

### Item 3.3: Ô chọn Người tham gia

- itemId: img-009
- parentNo: 3
- bbox: (695, 345) - (1010, 440)
- nameJP: 参加者
- nameTrans: Participant
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: bảng audit không có cột nào cho người tham gia của bản ghi. Chỉ tới được bằng cách nối bảng theo từng loại thực thể, mỗi loại một đường khác nhau, và có loại không tới được.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Tiêu chí thứ ba trong bốn tiêu chí bắt buộc; là người tham gia của bản ghi nghiệp vụ, không phải người bấm nút.
  - Thành phần hiển thị: Nhãn Người tham gia kèm dấu sao bắt buộc; ô chọn hiện Chọn kèm mũi chỉ xuống; dòng nhắc ghi field số 3 là tiêu chí ba trên bốn và phân biệt rõ với field số 6 là người thực hiện thao tác.
  - Chức năng và logic: Hai khái niệm này khác nhau và không được gộp: người tham gia là đối tượng nghiệp vụ, người thực hiện là chủ thể thao tác.
- qa:
  - Chọn được nhiều người tham gia cùng lúc hay chỉ một?
  - Danh sách chọn hiện toàn bộ người tham gia hay chỉ những người có mặt trong khoảng ngày đang lọc?
  - Định dạng nhãn hiển thị một người tham gia là gì; ảnh chỉ cho thấy dòng mặc định.

### Item 3.4: Ô chọn Loại thao tác

- itemId: img-010
- parentNo: 3
- bbox: (42, 450) - (357, 563)
- nameJP: 操作種別
- nameTrans: Action type
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: action
- databaseNote: Cột đã tồn tại. Sắc thái: hiện lưu dạng chuỗi tự do, không có ràng buộc tập giá trị và không có danh mục dùng chung, nên tập giá trị đóng cho ô chọn phải được chuẩn hoá ở phía ghi trước.
- validationNote:
  - Điều kiện: chỉ nhận giá trị thuộc tập đóng do server nạp.
  - Lỗi: giá trị ngoài tập thì trả lỗi 422 chứ không lặng lẽ bỏ qua.
- description:
  - Mục đích và ngữ cảnh: Tiêu chí thứ tư trong bốn tiêu chí bắt buộc; quyết định cuộc điều tra nhìn vào loại hành vi nào.
  - Thành phần hiển thị: Nhãn Loại thao tác kèm dấu sao bắt buộc; ô chọn hiện Tất cả kèm mũi chỉ xuống; dòng nhắc ghi field số 4 là tiêu chí bốn trên bốn với tập giá trị đóng nạp từ server, ngoài tập thì trả 422, và ghi rõ tập phải tối thiểu phủ tạo · sửa · phê duyệt · lock · đổi quyền.
  - Chức năng và logic: Tập giá trị đóng và nạp từ server chứ không viết cứng ở giao diện; giá trị lạ trả lỗi tường minh vì đây là tiêu chí bắt buộc, khác với hai field tiện ích.
- qa:
  - Tập giá trị của ô chọn nhóm theo năm hành vi mà yêu cầu khách liệt, hay liệt phẳng từng giá trị?
  - Chọn được nhiều loại thao tác cùng lúc hay chỉ một?
  - Định dạng nhãn hiển thị một loại thao tác là mã hay câu tiếng Việt; ảnh chỉ cho thấy dòng Tất cả.

### Item 3.5: Ô chọn Thực thể

- itemId: img-011
- parentNo: 3
- bbox: (368, 450) - (684, 563)
- nameJP: エンティティ
- nameTrans: Entity filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: entity
- databaseNote: Cột đã tồn tại và lọc được trực tiếp. Sắc thái: cùng cột này đang gánh cả vai trò lọc theo loại thực thể và vai trò một nửa của việc tra theo mã giao dịch.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Tiêu chí phụ; không do FR-AUDIT-02 đòi nhưng cần để thu hẹp kết quả cho đạt ngưỡng thời gian phản hồi.
  - Thành phần hiển thị: Nhãn Thực thể; ô chọn hiện Tất cả kèm mũi chỉ xuống; dòng nhắc ghi field số 5 là tiêu chí phụ không do yêu cầu khách đòi và mục đích là thu hẹp kết quả để đạt ngưỡng NFR-PERF-01.
  - Chức năng và logic: Là tiện ích thêm nên giá trị lạ có thể bỏ qua bộ lọc; khác với bốn tiêu chí bắt buộc.
- qa:
  - Tập giá trị loại thực thể nạp từ server hay viết cứng ở giao diện?
  - Chọn thực thể có tự thu hẹp tập giá trị của ô chọn Loại thao tác không?
  - Định dạng nhãn hiển thị một loại thực thể là gì; ảnh chỉ cho thấy dòng Tất cả.

### Item 3.6: Ô chọn Người thực hiện

- itemId: img-012
- parentNo: 3
- bbox: (695, 450) - (1010, 563)
- nameJP: 実行者
- nameTrans: Actor filter
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: actor_id
- databaseNote: Cột đã tồn tại và trỏ tới bảng người dùng nội bộ; chỉ lấy tên hiển thị. Sắc thái: cột cho phép rỗng vì có đường ghi xảy ra trước khi có phiên đăng nhập.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Tiêu chí phụ; là chủ thể đã bấm nút, khác hẳn với người tham gia của bản ghi.
  - Thành phần hiển thị: Nhãn Người thực hiện; ô chọn hiện Chọn kèm mũi chỉ xuống; dòng nhắc ghi field số 6 là tiêu chí phụ, hiện tên hiển thị, và nói rõ không hiện thư điện tử ở bất kỳ cột nào theo mục bảo vệ thông tin cá nhân.
  - Chức năng và logic: Ràng buộc không hiện thư điện tử là ràng buộc bảo mật áp cho toàn màn, không riêng field này.
- qa:
  - Danh sách chọn có bao gồm cả tài khoản đã bị vô hiệu không?
  - Có chọn được giá trị hệ thống để tìm các bản ghi không có người thực hiện không?
  - Định dạng nhãn hiển thị một người thực hiện là gì; ảnh chỉ cho thấy dòng mặc định.

### Item 3.7: Nút Tra cứu

- itemId: img-013
- parentNo: 3
- bbox: (42, 573) - (107, 602)
- nameJP: 照会
- nameTrans: Search button
- itemType: button
- itemSubtype: nút hành động chính cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại khối kết quả theo các điều kiện đang đặt; ở lại cùng màn và không điều hướng.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Kích hoạt tra cứu; là hành động duy nhất làm đổi nội dung khối kết quả.
  - Thành phần hiển thị: Nút chữ Tra cứu ở đầu hàng nút cuối khối bộ lọc.
  - Chức năng và logic: Không đổi dữ liệu; chỉ đọc. Trong lúc tra cứu thì khối kết quả vào trạng thái đang tải.
- qa:
  - Bấm Tra cứu khi chưa đặt điều kiện nào thì trả toàn bộ bảng hay yêu cầu tối thiểu một điều kiện?
  - Điều kiện tra cứu có được giữ lại trên đường dẫn để chia sẻ lại kết quả không; nếu có thì có rủi ro gì với dữ liệu nhạy?

### Item 3.8: Nút Xoá điều kiện

- itemId: img-014
- parentNo: 3
- bbox: (110, 573) - (207, 602)
- nameJP: 条件クリア
- nameTrans: Clear filter button
- itemType: button
- itemSubtype: nút phụ cuối khối
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Trả mọi điều kiện về giá trị mặc định.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người điều tra bắt đầu lại một câu hỏi mới mà không phải sửa từng ô.
  - Thành phần hiển thị: Nút chữ Xoá điều kiện cạnh nút Tra cứu; kiểu nút phụ.
  - Chức năng và logic: Đặt các ô nhập về rỗng và các ô chọn về giá trị Tất cả.
- qa:
  - Xoá điều kiện có tự tra cứu lại ngay hay chỉ xoá rồi chờ người dùng bấm Tra cứu?

### Item 3.9: Ghi chú kết hợp bốn tiêu chí

- itemId: img-015
- parentNo: 3
- bbox: (42, 605) - (1010, 637)
- nameJP: -
- nameTrans: Criteria combination note
- itemType: label
- itemSubtype: đoạn nhắc dưới khối
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Chốt hai yêu cầu về hình dạng truy vấn mà bốn tiêu chí bắt buộc phải thoả.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: bốn tiêu chí bắt buộc phải kết hợp được với nhau vì đó là kịch bản điều tra thật gồm một người tham gia một ngày nghiệp vụ một loại thao tác; mỗi tiêu chí phải đứng một mình cũng chạy được; mỗi tiêu chí đòi một cột lọc được và một index.
  - Chức năng và logic: Tĩnh; là ràng buộc thiết kế nối sang khối hiệu năng bên dưới.
- qa: -

