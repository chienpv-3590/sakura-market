# Items Analysis - Hộp thông báo trong ứng dụng

- Nguồn: `.momorph/shots/SC-28-hop-thong-bao-trong-ung-dung.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-28-hop-thong-bao-trong-ung-dung-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2245 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 44
- Batch: part 1 / 3

### Item 1: Khối đầu màn hộp thông báo

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
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết; cho biết đây là điểm vào của nhóm thông báo và cảnh báo vận hành.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-038 · FE-039 · FN-12 · ưu tiên P1 · ba mã yêu cầu · loại màn · route đề xuất · actor là toàn bộ bảy vai trò · một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác nào.
- qa: -

### Item 1.1: Tiêu đề màn

- itemId: img-002
- parentNo: 1
- bbox: (26, 22) - (1026, 48)
- nameJP: アプリ内通知ボックス
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
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở hộp thông báo trong ứng dụng của chính mình.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-28 và tên màn.
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
  - Mục đích và ngữ cảnh: Nối màn về hai tính năng FE-038 và FE-039 cùng ba mã yêu cầu khách; nêu rõ đây là màn không giới hạn vai trò.
  - Thành phần hiển thị: Hai dòng chữ nhỏ liệt tính năng · nhóm chức năng · ưu tiên · yêu cầu FR-NOTIFY-01 và FR-NOTIFY-02 và BR-NOTIFY-01 · loại màn · route đề xuất kèm badge đếm chưa đọc · actor · thẻ trạng thái.
  - Chức năng và logic: Tĩnh; không có liên kết điều hướng.
- qa: -

### Item 1.2.1: Thẻ trạng thái dựng màn

- itemId: img-004
- parentNo: 1.2
- bbox: (463, 79) - (539, 98)
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
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn trong dòng metadata với nội dung Chưa thi công.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- qa: -

### Item 2: Dải chú thích yêu cầu và điều kiện nghiệm thu

- itemId: img-005
- parentNo: -
- bbox: (26, 138) - (1026, 247)
- nameJP: -
- nameTrans: Requirement and acceptance notice
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
  - Mục đích và ngữ cảnh: Ghim đúng ba điều khoản mà màn phải thoả, kèm điều kiện nghiệm thu để phần dựng không hiểu chệch.
  - Thành phần hiển thị: Một dải chú thích nền vàng nhạt ba đoạn: đoạn khai màn chưa thi công; đoạn FR-NOTIFY-01 nêu hai kênh in-app và email cùng bốn nhóm event và ranh giới SMS FAX ngoài phạm vi; đoạn BR-NOTIFY-01 và FR-NOTIFY-02 nêu trần retry ba lần, mốc năm phút cho Critical và queue cảnh báo vận hành.
  - Chức năng và logic: Tĩnh. Điều kiện nghiệm thu của FR-NOTIFY-01 là bốn thứ kênh · người nhận · kết quả · số lần thử phải xem được từ màn này; queue cảnh báo vận hành là một trạng thái thấy được chứ không gộp vào gửi lỗi chung.
- qa: -

### Item 3: Khối danh sách thông báo

- itemId: img-006
- parentNo: -
- bbox: (26, 263) - (1026, 586)
- nameJP: -
- nameTrans: Notification list block
- itemType: others
- itemSubtype: khối bảng chín cột kèm ghi chú và một nút
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
  - Mục đích và ngữ cảnh: Hộp thư của người dùng: nơi các việc cần xử lý tự tìm đến người phụ trách thay vì phải gọi điện.
  - Thành phần hiển thị: Tiêu đề khối nêu phạm vi field số 1 tới số 8; bảng chín cột với ba hàng dữ liệu mẫu ở ba trạng thái gửi khác nhau; đoạn ghi chú bốn field; một nút hành động dưới bảng.
  - Chức năng và logic: Mỗi người chỉ thấy thông báo gửi cho chính mình hoặc cho vai trò mình giữ. Hộp rỗng là trạng thái hợp lệ.
- qa: -

### Item 3.1: Bảng danh sách thông báo

- itemId: img-007
- parentNo: 3
- bbox: (42, 307) - (1010, 493)
- nameJP: 通知一覧
- nameTrans: Notification list table
- itemType: table
- itemSubtype: bảng chín cột
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
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Trình bày từng thông báo trên một hàng, đủ để người dùng quyết định mở đối tượng nào trước.
  - Thành phần hiển thị: Chín cột: mức độ · loại event · tiêu đề · nội dung · liên kết đối tượng · thời điểm · đã đọc · kết quả gửi · ô hành động; ba hàng dữ liệu mẫu.
  - Chức năng và logic: Sắp xếp mặc định theo thời điểm giảm dần và thông báo Critical chưa đọc lên trước. Cột kết quả gửi là bản thu gọn của khối log gửi bên dưới.
- qa:
  - Danh sách phân trang bao nhiêu dòng một trang; hay cuộn vô hạn?
  - Thông báo Critical chưa đọc có được ghim lên đầu bất kể thời điểm không?
  - Một thông báo gửi cho cả một vai trò thì mọi người trong vai đó thấy cùng một dòng hay mỗi người một dòng riêng?

### Item 3.1.1: Hàng tiêu đề bảng thông báo

- itemId: img-008
- parentNo: 3.1
- bbox: (43, 307) - (1010, 351)
- nameJP: -
- nameTrans: Notification table header row
- itemType: label
- itemSubtype: hàng tiêu đề bảng
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
  - Mục đích và ngữ cảnh: Đặt tên chín cột của bảng thông báo.
  - Thành phần hiển thị: Một hàng nền xám nhạt với tám nhãn cột và một ô cuối để trống dành cho nút hành động.
  - Chức năng và logic: Tĩnh; không sắp xếp được từ hàng tiêu đề.
- qa: -

### Item 3.1.2: Hàng thông báo Critical đang trong hạn

- itemId: img-009
- parentNo: 3.1
- bbox: (43, 351) - (1010, 397)
- nameJP: -
- nameTrans: Critical notification row in-window
- itemType: others
- itemSubtype: hàng dữ liệu bảng
- buttonType: -
- dataType: -
- format: YYYY-MM-DD hh:mm
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo. Riêng nguồn event lỗi xuất dữ liệu: bảng batch kế toán đã tồn tại nhưng chỉ ghi lần xuất thành công nên hiện không có dòng nào cho ca lỗi.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca bình thường của một thông báo Critical: cả hai kênh đã gửi được ngay lần thử đầu.
  - Thành phần hiển thị: Thẻ mức độ critical; thẻ loại event lỗi xuất dữ liệu; tiêu đề và nội dung ngắn bị cắt bớt; liên kết Mở đối tượng; thời điểm dạng YYYY-MM-DD hh:mm; thẻ chưa đọc; ô kết quả gửi ghi in_app thành công và email thành công một trên ba; nút Đánh dấu đã đọc.
  - Chức năng và logic: Số lần thử hiện dạng phân số trên trần ba lần theo BR-NOTIFY-01. Mức độ critical kéo theo mốc năm phút của FR-NOTIFY-02 nên hàng này phải hiện được là trong hạn hay quá hạn.
- qa:
  - Nội dung ngắn bị cắt ở bao nhiêu ký tự; và cắt rồi có mở xem đầy đủ được không?
  - Mức độ critical hiện thêm dấu hiệu gì để phân biệt trong một danh sách dài?

### Item 3.1.3: Hàng thông báo đã vào queue cảnh báo vận hành

- itemId: img-010
- parentNo: 3.1
- bbox: (43, 397) - (1010, 446)
- nameJP: -
- nameTrans: Notification row escalated to ops queue
- itemType: others
- itemSubtype: hàng dữ liệu bảng
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
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo. CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca nghiệm thu của FR-NOTIFY-02: gửi vẫn thất bại sau khi hết trần retry nên phải thấy được là đã chuyển sang cảnh báo vận hành.
  - Thành phần hiển thị: Thẻ mức độ critical; thẻ loại event tranh chấp đang mở; ô kết quả gửi mang một thẻ riêng đã vào queue cảnh báo vận hành kèm chữ email thất bại ba trên ba; nút Xem log gửi thay cho nút đánh dấu đã đọc.
  - Chức năng và logic: Đây là một trạng thái riêng, không gộp vào gửi lỗi chung. Hết ba lần thử là chốt trạng thái cuối cùng và không retry tiếp.
- qa:
  - Trạng thái đã vào queue cảnh báo vận hành có tự chuyển về trạng thái khác khi vận hành xử lý xong không; ai được đóng nó?
  - Người nhận thường có thấy thẻ này hay chỉ vai trò quản trị hệ thống thấy?
  - Định dạng hiển thị số lần thử là phân số trên trần hay chỉ số lần đã thử?

### Item 3.1.4: Hàng thông báo mức thường đã đọc

- itemId: img-011
- parentNo: 3.1
- bbox: (43, 446) - (1010, 492)
- nameJP: -
- nameTrans: Normal notification row read
- itemType: others
- itemSubtype: hàng dữ liệu bảng
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
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Ca một thông báo không phải Critical: đã đọc trong ứng dụng nhưng kênh ngoài chưa gửi.
  - Thành phần hiển thị: Thẻ mức độ thường; thẻ loại event profile sắp hết hiệu lực; thẻ đã đọc; ô kết quả gửi ghi in_app thành công và email chưa gửi in đậm; nút Đã đọc ở trạng thái vô hiệu.
  - Chức năng và logic: Mức thường không chịu mốc năm phút. Hai kênh có kết quả độc lập nên một kênh thành công không làm kênh kia coi là xong.
- qa:
  - Mức thường có hạn gửi nào không; hay chỉ Critical mới có hạn?
  - Kênh email ở trạng thái chưa gửi thì có tự gửi theo lô định kỳ hay chờ điều kiện gì?

### Item 3.1.5: Nút Đánh dấu đã đọc trong hàng

- itemId: img-012
- parentNo: 3.1
- bbox: (904, 360) - (1002, 389)
- nameJP: 既読にする
- nameTrans: Mark as read button
- itemType: button
- itemSubtype: nút phụ trong hàng
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Ghi trạng thái đã đọc cho đúng dòng đó; ở lại cùng màn và không điều hướng.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote:
  - Điều kiện: chỉ chủ sở hữu thông báo đặt được trạng thái đã đọc.
  - Lỗi: mở hoặc ghi thông báo của người khác thì trả trang không tìm thấy chứ không phải lỗi từ chối quyền.
- description:
  - Mục đích và ngữ cảnh: Cho người dùng dọn hộp thư mà không phải mở từng đối tượng liên quan.
  - Thành phần hiển thị: Nút chữ Đánh dấu đã đọc ở ô hành động cuối hàng; kiểu nút phụ.
  - Chức năng và logic: Trong lúc ghi thì đúng dòng đó bị vô hiệu. Ghi thất bại thì hiện thông báo lỗi và giữ nguyên trạng thái chưa đọc chứ không đổi trước rồi sửa sau.
- qa:
  - Đã đọc là trạng thái theo từng người nhận; nếu thông báo gửi cho cả một vai trò thì có cần biết ai trong vai đó đã đọc không?
  - Đánh dấu đã đọc có bỏ đánh dấu lại được không?

### Item 3.1.6: Nút Xem log gửi trong hàng

- itemId: img-013
- parentNo: 3.1
- bbox: (904, 403) - (993, 432)
- nameJP: 送信ログを見る
- nameTrans: View delivery log button
- itemType: button
- itemSubtype: nút phụ trong hàng
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở khối log gửi của đúng thông báo đó với bốn thứ mà FR-NOTIFY-01 đòi nghiệm thu.
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng log gửi (kênh · người nhận · kết quả · số lần thử) nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Đường đi từ một dòng thông báo tới bằng chứng gửi của nó; đây là chỗ thoả điều kiện nghiệm thu của FR-NOTIFY-01.
  - Thành phần hiển thị: Nút chữ Xem log gửi ở ô hành động của hàng đã vào queue cảnh báo vận hành.
  - Chức năng và logic: Chỉ đọc. Nút này thay chỗ nút đánh dấu đã đọc trên những hàng có kết quả gửi cần xem xét.
- qa:
  - Xem log gửi mở lớp phủ trong màn hay điều hướng sang một màn riêng?
  - Mọi vai trò xem được log gửi của thông báo của chính mình; hay chỉ vai trò quản trị hệ thống?

### Item 3.1.7: Nút Đã đọc ở trạng thái vô hiệu

- itemId: img-014
- parentNo: 3.1
- bbox: (904, 451) - (967, 480)
- nameJP: 既読（無効）
- nameTrans: Read button disabled
- itemType: button
- itemSubtype: nút phụ vô hiệu trong hàng
- buttonType: text_only
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
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng thông báo nhưng hệ hiện chưa có bảng nào giữ thông báo.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho người dùng thấy dòng này không còn hành động nào cần làm.
  - Thành phần hiển thị: Nút chữ Đã đọc với chữ và viền nhạt hơn, trên hàng thông báo đã đọc.
  - Chức năng và logic: Không nhận thao tác. Trạng thái vô hiệu suy ra từ trạng thái đã đọc của dòng.
- qa:
  - Dòng đã đọc có cho bỏ đánh dấu để đọc lại sau không; nếu có thì nút này đổi thành gì?

### Item 3.2: Ghi chú bốn field của bảng thông báo

- itemId: img-015
- parentNo: 3
- bbox: (42, 496) - (1010, 530)
- nameJP: -
- nameTrans: Field note for list block
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
  - Mục đích và ngữ cảnh: Chốt ràng buộc của bốn field khó nhất, trong đó có một ràng buộc an toàn.
  - Thành phần hiển thị: Một đoạn chữ nhỏ: field số 1 mức độ gồm critical và thường và chọn critical là kéo theo mốc năm phút; field số 2 loại event theo bốn nhóm mà yêu cầu khách liệt kèm lưu ý đó là ví dụ chứ không phải danh sách đóng; field số 5 dựng đường dẫn ở phía máy chủ từ loại đối tượng và mã đối tượng, chỉ điều hướng nội bộ và không nhận đường dẫn thô từ dữ liệu; field số 8 là bản thu gọn của log gửi.
  - Chức năng và logic: Tĩnh; ràng buộc field số 5 là ràng buộc an toàn nên không được để dữ liệu quyết định đích điều hướng.
- qa: -

