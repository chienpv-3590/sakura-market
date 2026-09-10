# Items Analysis - participant-list

Màn tra cứu người tham gia của FN-02. Nguồn chân lý là `FE-005` (Feature List) và `FR-PARTY-01`
(RFP:629): lưu profile theo **bốn** phân loại 卸売業者 / 仲卸 / 売買参加者 / 買出人, **không được
gộp**. Bảng căn cứ tham gia trên màn chép `FIG-004` (RFP:288-294); RFP §02-08 (RFP:309) cấm gộp
許可 và 承認 thành một quy tắc chung. Trạng thái hiệu lực theo `FIG-010` (RFP:609) — bốn giá trị.
Đây là spec **thiết kế**, không phải ảnh của prototype.

Batch 2 of 3 - items 4.1.1 .. 6.5

### Item 4.1.1: Dòng dữ liệu người tham gia (đại diện cho bốn dòng mẫu)

- itemId: img-016
- parentNo: 4.1
- position: startX=43 startY=670 endX=1010 endY=700
- nameJP: 参加者行
- nameTrans: Participant row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: string
- format: ngày theo YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở SC-06 cho profile của dòng
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_from; valid_to
- databaseNote: Prototype cho phép cột hiệu lực đến rỗng nghĩa là vô hạn; không có tác vụ định kỳ nào lật trạng thái khi qua ngày đó.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một profile người tham gia; bốn dòng mẫu trên wireframe cùng cấu trúc nên gộp thành một dòng đại diện
  Thành phần hiển thị: tên; phân loại; căn cứ tham gia; badge trạng thái; ngày hiệu lực từ; ngày hiệu lực đến
  Chức năng và logic: ngày hiệu lực đến để trống nghĩa là vô hạn hạn và hiển thị Không giới hạn theo tiếng Việt hoặc 無期限 theo tiếng Nhật; ngày hiển thị theo múi giờ Nhật vì ngày nghiệp vụ neo theo múi giờ đó
- qa: - Dòng có cặp phân loại và căn cứ tham gia lệch FIG-004 thì hiện thế nào ở đây; đánh dấu tại dòng hay gom vào một khối riêng? Thiết kế nói đánh dấu là dữ liệu cần đối chiếu.

### Item 4.1.2: Badge trạng thái hiệu lực (đại diện)

- itemId: img-017
- parentNo: 4.1
- position: startX=513 startY=675 endX=577 endY=695
- nameJP: 有効状態バッジ
- nameTrans: Eligibility status badge
- itemType: label
- itemSubtype: status_badge
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: status
- databaseNote: Prototype có CHECK bốn giá trị trên cột này; badge đọc thẳng cột nên không phản ánh việc đã qua ngày hết hiệu lực.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: hiện trạng thái vòng đời đã lưu của profile theo FIG-010; các badge trên bốn dòng mẫu cùng dạng nên gộp một đại diện
  Thành phần hiển thị: một nhãn ngắn mang một trong bốn trạng thái
  Chức năng và logic: chỉ đọc; là giá trị đã lưu chứ không phải kết luận hôm nay giao dịch được hay không — kết luận đó tính lại ở thời điểm chốt giao dịch
- qa: -

### Item 4.2: Ghi chú cột và phân trang

- itemId: img-018
- parentNo: 4
- position: startX=42 startY=795 endX=1010 endY=828
- nameJP: 列と改ページの注記
- nameTrans: Column and pagination note
- itemType: label
- itemSubtype: design_note
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
  Mục đích và ngữ cảnh: chốt ba quy tắc dễ mất của bảng — đường dẫn của cột Tên; nghĩa của ngày hiệu lực đến rỗng; và việc căn cứ tham gia luôn suy từ phân loại
  Thành phần hiển thị: một đoạn ghi chú dưới bảng
  Chức năng và logic: tĩnh; đòi có phân trang và đếm tổng số dòng khớp bộ lọc để không cắt trần dữ liệu im lặng
- qa: -

### Item 4.3: Ghi chú badge trạng thái không phải kết luận hiệu lực

- itemId: img-019
- parentNo: 4
- position: startX=42 startY=838 endX=1010 endY=871
- nameJP: 有効性判断の注記
- nameTrans: Note on eligibility conclusion
- itemType: label
- itemSubtype: design_note
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
  Mục đích và ngữ cảnh: chặn cách đọc sai nguy hiểm nhất của màn — coi badge trạng thái là giấy phép giao dịch hôm nay
  Thành phần hiển thị: một đoạn ghi chú dưới bảng
  Chức năng và logic: tĩnh; chỉ sang FE-007 và FR-PARTY-02 ở màn SC-11 — nơi hiệu lực được kiểm tại đúng thời điểm chốt giao dịch
- qa: -

### Item 5: Khối hành động

- itemId: img-020
- parentNo: -
- position: startX=26 startY=910 endX=1026 endY=1068
- nameJP: 操作ブロック
- nameTrans: Action block
- itemType: others
- itemSubtype: action_bar
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
  Mục đích và ngữ cảnh: gom các thao tác của màn và đối chiếu với phạm vi FE-005 đòi bốn phép tạo; đọc; sửa; xoá
  Thành phần hiển thị: hai nút hành động; ghi chú phân quyền; khối câu hỏi mở về phép xoá
  Chức năng và logic: nút ghi chỉ hiện cho vai được phép ghi; vai chỉ đọc thấy dòng nhắc ai làm được việc đó thay vì một nút chết
- qa: -

### Item 5.1: Nút tạo mới người tham gia

- itemId: img-021
- parentNo: 5
- position: startX=42 startY=954 endX=111 endY=983
- nameJP: 新規作成
- nameTrans: Create new
- itemType: button
- itemSubtype: -
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở màn tạo profile người tham gia mới
- databaseTable: participant
- databaseColumn: -
- databaseNote: Thao tác tạo ghi một dòng mới vào thực thể người tham gia kèm một dòng audit theo FR-AUDIT-01.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: đường tạo profile mới — phép tạo trong bộ CRUD của FE-005
  Thành phần hiển thị: một nút chữ nổi bật ở đầu khối hành động
  Chức năng và logic: chỉ hiện cho vai được phép ghi profile; vai không được phép thì không thấy nút và cũng bị chặn ở tầng dịch vụ chứ không chỉ ở tầng hiển thị
- qa: - Form tạo mới cho chọn phân loại rồi tự điền căn cứ tham gia theo FIG-004; hay cho nhập cả hai rồi kiểm cặp? Thiết kế chỉ nói căn cứ luôn suy từ phân loại.

### Item 5.2: Nút mở chi tiết hoặc sửa

- itemId: img-022
- parentNo: 5
- position: startX=115 startY=954 endX=226 endY=983
- nameJP: 詳細・編集
- nameTrans: Open detail or edit
- itemType: button
- itemSubtype: -
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở SC-06 chi tiết và vòng đời hiệu lực của profile đang chọn
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: đường sang màn chi tiết; nơi thực hiện phép đọc và phép sửa của FE-005
  Thành phần hiển thị: một nút chữ phụ cạnh nút tạo mới
  Chức năng và logic: mở SC-06; quyền sửa được kiểm lại ở màn đó chứ không suy ra từ việc nút này hiện
- qa: -

### Item 5.3: Ghi chú phân quyền hành động

- itemId: img-023
- parentNo: 5
- position: startX=42 startY=989 endX=521 endY=1022
- nameJP: 操作権限の注記
- nameTrans: Action permission note
- itemType: label
- itemSubtype: design_note
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
  Mục đích và ngữ cảnh: khai rõ hai trục quyền của màn — đọc mở cho vai vận hành; ghi thuộc vai quản trị người tham gia
  Thành phần hiển thị: một đoạn ghi chú dưới hai nút
  Chức năng và logic: tĩnh; đòi vai chỉ đọc nhìn thấy một dòng nói rõ ai làm được việc đó thay vì bị ẩn im lặng hoặc thấy nút chết
- qa: -

### Item 5.4: Khối câu hỏi mở về phép xoá profile

- itemId: img-024
- parentNo: 5
- position: startX=532 startY=954 endX=1010 endY=1052
- nameJP: 削除の未確定事項
- nameTrans: Open question on delete
- itemType: label
- itemSubtype: open_question
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
  Mục đích và ngữ cảnh: FE-005 ghi CRUD nhưng người tham gia đã có giao dịch thì xoá thật sẽ mất dấu vết; điều đó trái FR-AUDIT-01
  Thành phần hiển thị: một khối câu hỏi mở có nhãn chưa chốt và phần diễn giải
  Chức năng và logic: không có nút xoá nào trên màn cho tới khi khách chốt; màn không tự chọn cách hiểu
- qa: - Phép xoá của FE-005 là xoá thật hay chỉ chuyển sang trạng thái mất hiệu lực? Chọn sai thì hoặc mất dấu vết giao dịch cũ; hoặc thiếu một phép mà Feature List đã cam kết.

### Item 6: Khối trạng thái màn

- itemId: img-025
- parentNo: -
- position: startX=26 startY=1081 endX=1026 endY=1352
- nameJP: 画面状態ブロック
- nameTrans: Screen state block
- itemType: others
- itemSubtype: state_matrix
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
  Mục đích và ngữ cảnh: liệt các trạng thái màn phải xử lý để không bỏ sót đường lỗi và đường không có quyền
  Thành phần hiển thị: sáu ô trạng thái; mỗi ô có tên và mô tả hành vi mong đợi
  Chức năng và logic: tĩnh trên wireframe nhưng là hợp đồng hành vi cho tầng hiển thị
- qa: -

### Item 6.1: Trạng thái rỗng

- itemId: img-026
- parentNo: 6
- position: startX=42 startY=1125 endX=277 endY=1218
- nameJP: 空状態
- nameTrans: Empty state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: phân biệt bảng rỗng thật với bảng rỗng vì bộ lọc; hai chuyện dẫn tới hai hành động khác nhau
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: nói rõ nguyên nhân là do bộ lọc và kèm đường xoá lọc; vai có quyền ghi vẫn thấy nút tạo mới
- qa: -

### Item 6.2: Trạng thái đang tải

- itemId: img-027
- parentNo: 6
- position: startX=286 startY=1125 endX=522 endY=1218
- nameJP: 読み込み中
- nameTrans: Loading state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: giữ bố cục ổn định khi dữ liệu về; màn dùng ở quầy nên nhảy bố cục làm mất chỗ đang đọc
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: khung xương giữ đúng số cột của bảng
- qa: -

### Item 6.3: Trạng thái lỗi tải

- itemId: img-028
- parentNo: 6
- position: startX=531 startY=1125 endX=766 endY=1218
- nameJP: 読み込みエラー
- nameTrans: Load error state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: cho người dùng thử lại mà không phải nhập lại bộ lọc
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: hiện khối lỗi kèm nút thử lại và giữ nguyên bộ lọc đang chọn
- qa: -

### Item 6.4: Trạng thái chỉ đọc

- itemId: img-029
- parentNo: 6
- position: startX=775 startY=1125 endX=1010 endY=1218
- nameJP: 読み取り専用
- nameTrans: Read-only state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: vai không có quyền ghi vẫn cần đọc đủ để làm việc; chặn nằm ở hành động ghi chứ không ở việc đọc
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: bảng và bộ lọc đầy đủ; hai hành động ghi đổi thành một dòng nhắc vai trò phụ trách
- qa: -

### Item 6.5: Trạng thái dòng có căn cứ lệch

- itemId: img-030
- parentNo: 6
- position: startX=42 startY=1227 endX=277 endY=1336
- nameJP: 根拠不整合行
- nameTrans: Mismatched basis row state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: dữ liệu cũ hoặc nhập tay có thể mang cặp phân loại và căn cứ không khớp FIG-004; màn phải phơi ra chứ không che
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: đánh dấu dòng là dữ liệu cần đối chiếu; không tự sửa và không xếp bừa vào một phân loại nào
- qa: -
