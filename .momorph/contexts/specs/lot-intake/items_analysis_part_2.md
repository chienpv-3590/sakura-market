# Items Analysis - lot-intake

Màn tiếp nhận lô hàng của FN-03. Nguồn chân lý: `FE-009` và `FE-013` (Feature List) ·
`FR-LOT-01` (RFP:632) — cấp mã lô duy nhất; kiện hàng; mặt hàng; số lượng ban đầu và chứng từ tiếp
nhận · `NFR-USE-01` (RFP:816) — luồng nhập lô hàng **dùng được bằng bàn phím**, thao tác của
02:00-03:00 sáng theo `FIG-002` (RFP:220). Trạng thái theo `FIG-011` (RFP:616) — **đúng NĂM trạng
thái**, gồm "Đã 下見" mà prototype không có. `BR-LOT-02` (RFP:596) khoá số lượng khả dụng không âm.

Batch 2 of 3 - items 4.4 .. 7.3

### Item 4.4: Trường trạng thái lô

- itemId: img-016
- parentNo: 4
- position: startX=776 startY=583 endX=1010 endY=746
- nameJP: 状態
- nameTrans: Lot status
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: string
- format: một trong năm trạng thái của FIG-011
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: status
- databaseNote: Prototype có ràng buộc bốn giá trị trên cột này và thiếu giá trị cho trạng thái Đã 下見 của FIG-011.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: trạng thái khởi tạo của lô là bước một trên năm của FIG-011; FE-013 đòi trạng thái đi theo đúng máy trạng thái đó
  Thành phần hiển thị: nhãn song ngữ Trạng thái · 状態; ô chỉ đọc ghi trạng thái kèm vị trí bước trên tổng số bước
  Chức năng và logic: tầng dịch vụ gán trạng thái tiếp nhận; ghi rõ trên năm bước để người đọc thấy ngay máy trạng thái có năm giá trị chứ không phải bốn
- qa: -

### Item 5: Khối máy trạng thái FIG-011

- itemId: img-017
- parentNo: -
- position: startX=26 startY=785 endX=1026 endY=1110
- nameJP: FIG-011 状態ブロック
- nameTrans: FIG-011 state block
- itemType: others
- itemSubtype: state_machine_block
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
  Mục đích và ngữ cảnh: FE-013 đòi danh sách và chi tiết lô hàng theo máy trạng thái FIG-011; nên số trạng thái là một yêu cầu nghiệm thu chứ không phải chi tiết
  Thành phần hiển thị: bảng năm cột và năm dòng trạng thái; hai đoạn ghi chú trong đó một đoạn mang nhãn chưa chốt
  Chức năng và logic: chỉ đọc; cột màn cho biết trạng thái nào được đặt ở màn nào để không có hai màn cùng đặt một trạng thái
- qa: -

### Item 5.1: Bảng năm trạng thái của FIG-011

- itemId: img-018
- parentNo: 5
- position: startX=42 startY=829 endX=1010 endY=1001
- nameJP: 状態一覧
- nameTrans: State table
- itemType: table
- itemSubtype: state_transition_table
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: status
- databaseNote: Prototype thiếu giá trị cho trạng thái thứ hai nên không phân biệt được lô đã tiếp nhận nhưng chưa ai xem hàng với lô đã xem xong chờ công bố.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chép đúng năm trạng thái và bốn cạnh một chiều của FIG-011; đây là chỗ thiếu trạng thái Đã 下見 trở nên nhìn thấy được
  Thành phần hiển thị: năm cột gồm số thứ tự; trạng thái; sự kiện vào; ai làm; màn — và năm dòng trạng thái
  Chức năng và logic: chỉ đọc; đi một chiều nên không có cạnh quay lại; mỗi trạng thái có đúng một sự kiện vào và một màn chịu trách nhiệm
- qa: -

### Item 5.1.1: Dòng trạng thái (đại diện cho năm dòng)

- itemId: img-019
- parentNo: 5.1
- position: startX=43 startY=857 endX=1010 endY=886
- nameJP: 状態行
- nameTrans: State row
- itemType: label
- itemSubtype: table_row
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
  Mục đích và ngữ cảnh: một trạng thái của FIG-011 và ai đặt nó ở màn nào; năm dòng cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: số thứ tự bước; tên trạng thái; sự kiện đưa lô vào trạng thái đó; vai nghiệp vụ thực hiện; mã màn
  Chức năng và logic: chỉ đọc; dòng đầu là trạng thái mà chính màn này đặt khi lưu lô
- qa: -

### Item 5.2: Ghi chú năm trạng thái và bốn cạnh

- itemId: img-020
- parentNo: 5
- position: startX=42 startY=1004 endX=1010 endY=1037
- nameJP: 状態数の注記
- nameTrans: State count note
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
  Mục đích và ngữ cảnh: nói rõ hệ quả vận hành của việc gộp hai trạng thái — lúc 03:00 không trả lời được còn bao nhiêu lô chờ người đánh giá
  Thành phần hiển thị: một đoạn ghi chú dưới bảng trạng thái
  Chức năng và logic: tĩnh; gộp hai trạng thái là mất khả năng điều phối nhân sự ở đúng giờ cao điểm của FIG-002
- qa: -

### Item 5.3: Ghi chú chưa chốt về 下見 và 目利き

- itemId: img-021
- parentNo: 5
- position: startX=42 startY=1048 endX=1010 endY=1083
- nameJP: 下見と目利きの未確定事項
- nameTrans: Open question on pre-inspection vs appraisal
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
  Mục đích và ngữ cảnh: tài liệu khách dùng hai thuật ngữ ở hai chỗ khác nhau; bảng thuật ngữ định nghĩa chúng là hai việc nhưng có chỗ khác lại nối bằng gạch chéo
  Thành phần hiển thị: một đoạn ghi chú có nhãn chưa chốt dưới khối trạng thái
  Chức năng và logic: tĩnh; nêu rõ hai kịch bản chênh nhau rất nhiều — một việc gọi hai tên thì chỉ cần thêm một giá trị trạng thái; hai việc khác nhau thì thiếu cả một chỗ ghi và một màn
- qa: - 下見 và 目利き là hai việc khác nhau hay một việc gọi hai tên? Câu trả lời quyết định trạng thái thứ hai của FIG-011 vào bằng sự kiện nào và ai làm.

### Item 6: Khối kết quả sau khi lưu

- itemId: img-022
- parentNo: -
- position: startX=26 startY=1123 endX=1026 endY=1335
- nameJP: 保存結果ブロック
- nameTrans: Post-save result block
- itemType: others
- itemSubtype: content_block
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
  Mục đích và ngữ cảnh: mã lô vừa tạo phải dán được lên lô ngay tại quầy; một thông báo nổi trôi qua vài giây là không dùng được
  Thành phần hiển thị: trường mã lô vừa tạo cỡ lớn; hai nút đường tiếp; một dòng gợi ý về nhịp làm việc
  Chức năng và logic: thay hẳn khối trường nhập chứ không hiện thông báo nổi; giữ mã trên màn tới khi người dùng chọn một trong hai đường tiếp
- qa: -

### Item 6.1: Trường mã lô hàng vừa tạo

- itemId: img-023
- parentNo: 6
- position: startX=42 startY=1167 endX=1010 endY=1250
- nameJP: 発行済ロット番号
- nameTrans: Newly created lot code
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: string
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: lot_code
- databaseNote: Cùng cột mã lô ở khối trường hệ thống sinh; đây là giá trị thật vừa ghi chứ không phải mã mẫu.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: mã để ghi lên kiện hàng; phải đọc được từ xa ở quầy trong điều kiện ánh sáng kém lúc sáng sớm
  Thành phần hiển thị: nhãn Mã lô hàng vừa tạo và một ô chỉ đọc mang mã ở cỡ chữ lớn
  Chức năng và logic: chỉ đọc; tự nhận con trỏ để sao chép được bằng bàn phím ngay mà không cần chuột
- qa: -

### Item 6.2: Nút ghi kết quả đánh giá

- itemId: img-024
- parentNo: 6
- position: startX=42 startY=1261 endX=176 endY=1290
- nameJP: 評価結果を記録
- nameTrans: Record appraisal result
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
- transitionNote: Mở SC-09 để ghi kết quả đánh giá cho đúng lô vừa tạo
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: đường đi tiếp theo FIG-011 — từ trạng thái tiếp nhận sang bước đăng ký kết quả xem hàng
  Thành phần hiển thị: một nút chữ nổi bật trong thẻ kết quả
  Chức năng và logic: mang mã lô vừa tạo sang màn kế nên người dùng không phải nhớ hay nhập lại mã
- qa: -

### Item 6.3: Nút tiếp nhận lô khác

- itemId: img-025
- parentNo: 6
- position: startX=179 startY=1261 endX=296 endY=1290
- nameJP: 別ロットを受付
- nameTrans: Intake another lot
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
- transitionNote: Ở lại màn; xoá trắng bốn trường và đưa con trỏ về trường đầu
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: nhịp làm việc thật ở quầy là nhiều lô liên tiếp; nên đường quay lại form phải là một phím chứ không phải điều hướng lại
  Thành phần hiển thị: một nút chữ phụ cạnh nút sang màn kế
  Chức năng và logic: xoá trắng bốn trường nhập và đưa con trỏ về trường đầu để nhập lô kế tiếp ngay
- qa: -

### Item 6.4: Ghi chú hai đường tiếp

- itemId: img-026
- parentNo: 6
- position: startX=42 startY=1293 endX=1010 endY=1309
- nameJP: 次工程の注記
- nameTrans: Next step note
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
  Mục đích và ngữ cảnh: giải thích vì sao thẻ kết quả có đúng hai nút và không có nút nào thứ ba
  Thành phần hiển thị: một đoạn ghi chú dưới hai nút
  Chức năng và logic: tĩnh; hai đường ứng đúng hai nhịp làm việc ở quầy
- qa: -

### Item 7: Khối trạng thái màn

- itemId: img-027
- parentNo: -
- position: startX=26 startY=1348 endX=1026 endY=1636
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
  Mục đích và ngữ cảnh: liệt bảy trạng thái màn phải xử lý; trạng thái cuối là một quyết định thiết kế phải khai rõ để không bị hiểu là lỗi
  Thành phần hiển thị: bảy ô trạng thái; mỗi ô có tên và mô tả hành vi mong đợi
  Chức năng và logic: tĩnh trên wireframe nhưng là hợp đồng hành vi cho tầng hiển thị
- qa: -

### Item 7.1: Trạng thái mặc định

- itemId: img-028
- parentNo: 7
- position: startX=42 startY=1392 endX=277 endY=1502
- nameJP: 初期状態
- nameTrans: Default state
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
  Mục đích và ngữ cảnh: trạng thái mở màn; con trỏ tự vào trường đầu là một phần của NFR-USE-01 chứ không phải tiện ích
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: bốn trường trống và con trỏ ở trường đầu ngay khi màn mở
- qa: -

### Item 7.2: Trạng thái lỗi nhập

- itemId: img-029
- parentNo: 7
- position: startX=286 startY=1392 endX=522 endY=1502
- nameJP: 入力エラー
- nameTrans: Input error state
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
  Mục đích và ngữ cảnh: NFR-USE-01 đòi thông báo lỗi dễ hiểu; một câu chung cho mọi lỗi làm người nhập không biết sửa trường nào
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: báo trên đúng trường sai và nói rõ sai thế nào; giữ nguyên dữ liệu đã nhập vì nhập lại từ đầu lúc 02:00 là không chấp nhận được
- qa: -

### Item 7.3: Trạng thái đang gửi

- itemId: img-030
- parentNo: 7
- position: startX=531 startY=1392 endX=766 endY=1502
- nameJP: 送信中
- nameTrans: Submitting state
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
  Mục đích và ngữ cảnh: chặn gửi trùng — hai lần gửi cùng một lô sinh hai mã lô cho một kiện hàng thật
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: các trường vô hiệu; nút báo đang lưu; không cho gửi lần hai
- qa: -
