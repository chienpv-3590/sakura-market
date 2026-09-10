# Items Analysis - mekiki-entry

Màn ghi nhận kết quả đánh giá bằng mắt của FN-03. Nguồn chân lý: `FE-010` (Feature List) ·
`FR-LOT-02` (RFP:633) — lưu kết quả đánh giá bằng mắt kèm **người xác nhận** và **thời điểm ghi
nhận**; nghiệm thu là "truy ngược được người ghi và thời điểm" · `SCOPE-OUT-01` (RFP:404) — đánh
giá tự động độ tươi; chất lượng; phân loại loài **ngoài phạm vi**; hệ thống **chỉ ghi nhận**.
`FIG-008` (RFP:323) vẽ ranh giới phán đoán của con người. Trạng thái theo `FIG-011` (RFP:616) —
ghi kết quả đưa lô sang bước 2 trên 5 là "Đã 下見".

Batch 2 of 2 - items 5.2 .. 8

### Item 5.2: Trường thời điểm ghi nhận

- itemId: img-016
- parentNo: 5
- position: startX=287 startY=673 endX=521 endY=801
- nameJP: 評価日時
- nameTrans: Assessed at
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: date
- format: YYYY-MM-DD HH:mm JST
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: mekiki_record
- databaseColumn: assessed_at
- databaseNote: Prototype có cột này với giá trị mặc định là thời điểm ghi; màn hiện không có nhãn cho trường này.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: FR-LOT-02 đòi lưu thời điểm ghi nhận; đây là thời điểm thực của việc ghi và khác hẳn ngày nghiệp vụ của bản ghi
  Thành phần hiển thị: nhãn song ngữ Thời điểm ghi nhận · 評価日時; ô chỉ đọc; dòng gợi ý phân biệt với ngày nghiệp vụ
  Chức năng và logic: tầng dịch vụ đặt và neo múi giờ Nhật; hai giá trị thời gian trên màn không được trộn lẫn vì một cái là thời điểm thật và một cái là kỳ đối chiếu
- qa: -

### Item 5.3: Trường ngày nghiệp vụ của bản ghi

- itemId: img-017
- parentNo: 5
- position: startX=532 startY=673 endX=765 endY=801
- nameJP: 記録の業務日
- nameTrans: Record business date
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: mekiki_record
- databaseColumn: business_date
- databaseNote: Prototype sao lại ngày nghiệp vụ của lô vào cột này để cơ chế khoá kỳ đọc thẳng cột mà không phải nối bảng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: bản ghi kết quả thừa hưởng ngày nghiệp vụ của lô; nên nó gắn kết quả với lô chứ không gắn với người ghi
  Thành phần hiển thị: nhãn song ngữ Ngày nghiệp vụ của bản ghi · 業務日; ô chỉ đọc; dòng gợi ý nêu hệ quả cụ thể
  Chức năng và logic: kế thừa từ lô và không nhận từ phía người dùng; hệ quả là báo cáo quy công việc của ngày sau về ngày trước — điều đó phải khai rõ chứ không để ngầm
- qa: -

### Item 5.4: Trường trạng thái lô sau khi lưu

- itemId: img-018
- parentNo: 5
- position: startX=776 startY=673 endX=1010 endY=801
- nameJP: 保存後の状態
- nameTrans: Lot status after save
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
- databaseNote: Prototype đưa lô thẳng sang trạng thái công bố vì thiếu giá trị cho bước hai; nên việc đánh giá và quyết định bán bị gộp thành một.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: theo FIG-011 thì ghi kết quả đưa lô sang bước hai; công bố bán là một quyết định riêng ở màn chi tiết lô
  Thành phần hiển thị: nhãn song ngữ Trạng thái lô sau khi lưu · 状態; ô chỉ đọc ghi cạnh chuyển kèm vị trí bước; dòng gợi ý nói rõ không nhảy thẳng sang bước ba
  Chức năng và logic: cạnh đi từ bước một sang bước hai; gộp hai bước là gộp việc ghi phán đoán với quyết định bán — hai việc của hai vai khác nhau
- qa: -

### Item 5.5: Ghi chú chưa chốt về tên trạng thái và tên màn

- itemId: img-019
- parentNo: 5
- position: startX=42 startY=814 endX=1010 endY=866
- nameJP: 用語の未確定事項
- nameTrans: Open question on terminology
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
  Mục đích và ngữ cảnh: tài liệu khách dùng hai thuật ngữ cho hai chỗ; bảng thuật ngữ định nghĩa chúng riêng nhưng có chỗ khác lại viết chúng là một
  Thành phần hiển thị: một đoạn ghi chú có nhãn chưa chốt dưới khối truy vết
  Chức năng và logic: tĩnh; nêu rõ ảnh hưởng — nếu là hai việc thì FIG-011 cần hai bước và màn này chỉ phụ trách một; nếu là một việc thì phải chốt gọi tên nào
- qa: - Tên trạng thái bước hai của FIG-011 và tên màn này dùng thuật ngữ nào? Nếu là hai việc khác nhau thì việc còn lại ghi ở màn nào và ai làm.

### Item 6: Khối trạng thái màn

- itemId: img-020
- parentNo: -
- position: startX=26 startY=905 endX=1026 endY=1193
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
  Mục đích và ngữ cảnh: liệt bảy trạng thái màn phải xử lý; hai trạng thái cuối là hai cửa kiểm nghiệp vụ chứ không phải chuyện hiển thị
  Thành phần hiển thị: bảy ô trạng thái; mỗi ô có tên và mô tả hành vi mong đợi
  Chức năng và logic: tĩnh trên wireframe nhưng là hợp đồng hành vi cho tầng hiển thị
- qa: -

### Item 6.1: Trạng thái sẵn sàng nhập

- itemId: img-021
- parentNo: 6
- position: startX=42 startY=949 endX=277 endY=1059
- nameJP: 入力可能
- nameTrans: Ready to enter state
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
  Mục đích và ngữ cảnh: trạng thái làm việc bình thường; hai điều kiện phải cùng đúng mới hiện form
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: đúng vai và lô còn ở bước một; con trỏ đã nằm trong trường nhập ngay khi màn mở
- qa: -

### Item 6.2: Trạng thái không tìm thấy lô

- itemId: img-022
- parentNo: 6
- position: startX=286 startY=949 endX=522 endY=1059
- nameJP: ロット未検出
- nameTrans: Lot not found state
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
  Mục đích và ngữ cảnh: đường dẫn có thể trỏ vào một lô không tồn tại; người đánh giá cần đường quay lại chứ không phải một trang trống
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: nói rõ mã lô không tồn tại và kèm đường về danh sách lô
- qa: -

### Item 6.3: Trạng thái sai vai trò

- itemId: img-023
- parentNo: 6
- position: startX=531 startY=949 endX=766 endY=1059
- nameJP: 役割相違
- nameTrans: Wrong role state
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
  Mục đích và ngữ cảnh: ngữ cảnh lô là dữ liệu đọc mở cho các vai vận hành; chặn nằm ở hành động ghi
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: vẫn xem được ngữ cảnh lô; form đổi thành một dòng nói rõ vai nào ghi được; chặn thật nằm ở tầng dịch vụ chứ không ở việc ẩn form
- qa: -

### Item 6.4: Trạng thái đã có kết quả

- itemId: img-024
- parentNo: 6
- position: startX=775 startY=949 endX=1010 endY=1059
- nameJP: 結果あり
- nameTrans: Result already recorded state
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
  Mục đích và ngữ cảnh: một lô có tối đa một kết quả đánh giá; ghi thêm là làm mất phán đoán cũ mà FR-LOT-02 đòi truy vết
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: hiện kết quả đã ghi kèm người xác nhận và thời điểm; không hiện form nhập mới; sửa kết quả đi qua luồng điều chỉnh có kiểm soát chứ không sửa tại chỗ
- qa: -

### Item 6.5: Trạng thái đang gửi hoặc gửi lỗi

- itemId: img-025
- parentNo: 6
- position: startX=42 startY=1068 endX=277 endY=1177
- nameJP: 送信中・送信エラー
- nameTrans: Submitting or submit error state
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
  Mục đích và ngữ cảnh: nội dung đánh giá là phán đoán vừa hình thành trong đầu người xem hàng; mất nó khi lỗi là mất dữ liệu thật
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: trường vô hiệu và nút báo đang lưu khi gửi; lỗi thì giữ nguyên nội dung đã nhập
- qa: -

### Item 6.6: Trạng thái xung đột đồng thời

- itemId: img-026
- parentNo: 6
- position: startX=286 startY=1068 endX=522 endY=1177
- nameJP: 同時実行の競合
- nameTrans: Concurrent conflict state
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
  Mục đích và ngữ cảnh: một lô chỉ có một kết quả cuối cùng; hai bản ghi cho một lô là hai phán đoán mâu thuẫn không ai gỡ được
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: người sau bị từ chối vì lô đã rời bước một; điểm chặn phải là ràng buộc dữ liệu chứ không phải một lần đọc trước khi ghi
- qa: -

### Item 6.7: Trạng thái ngày nghiệp vụ đã lock

- itemId: img-027
- parentNo: 6
- position: startX=531 startY=1068 endX=766 endY=1177
- nameJP: 業務日ロック
- nameTrans: Locked business day state
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
  Mục đích và ngữ cảnh: bản ghi kết quả thừa hưởng ngày nghiệp vụ của lô; nên ghi muộn là ghi vào một kỳ có thể đã chốt và làm đổi số liệu đã công bố
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: từ chối trước khi ghi kèm lý do kỳ đã chốt; chỉ dẫn sang luồng điều chỉnh sau chốt; chặn phải phủ cả đường thêm bản ghi mới chứ không chỉ đường sửa bản ghi cũ
- qa: -

### Item 7: Khối đối chiếu prototype

- itemId: img-028
- parentNo: -
- position: startX=26 startY=1206 endX=1026 endY=1593
- nameJP: プロトタイプ差分ブロック
- nameTrans: Prototype divergence block
- itemType: others
- itemSubtype: divergence_block
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
  Mục đích và ngữ cảnh: đặt cạnh nhau thiết kế đòi gì và bản thi công hiện làm gì để phần đọc spec không lẫn hai chuyện
  Thành phần hiển thị: tiêu đề khối và một bảng ba cột
  Chức năng và logic: chỉ đọc; là phần đối chiếu chứ không phải phần thiết kế
- qa: -

### Item 7.1: Bảng đối chiếu ba cột

- itemId: img-029
- parentNo: 7
- position: startX=42 startY=1250 endX=1010 endY=1577
- nameJP: 差分テーブル
- nameTrans: Divergence table
- itemType: table
- itemSubtype: comparison_table
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
  Mục đích và ngữ cảnh: sáu hạng mục lệch; nặng nhất là kỳ đã chốt vẫn ghi thêm được bản ghi kết quả bằng giao diện bình thường
  Thành phần hiển thị: ba cột Thiết kế đòi; Prototype làm; Mức — và sáu dòng hạng mục
  Chức năng và logic: chỉ đọc; dòng cuối mang mức cần khách chốt nên không tự quyết ở tầng thi công
- qa: -

### Item 8: Ghi chú chân màn về phân quyền và đường đọc kết quả

- itemId: img-030
- parentNo: -
- position: startX=26 startY=1608 endX=1026 endY=1691
- nameJP: フッター注記
- nameTrans: Footer note
- itemType: label
- itemSubtype: footer_note
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
  Mục đích và ngữ cảnh: chốt ba điều dễ trôi — đọc mở nhưng ghi hẹp; kết quả phải đọc lại được từ chính bản ghi kết quả; và sửa kết quả đi qua luồng điều chỉnh
  Thành phần hiển thị: hai dòng ghi chú và một đường dẫn tới file spec của màn
  Chức năng và logic: tĩnh; nêu rõ kết quả không được suy ra từ một dòng kiểm toán vì mất dòng đó là mất kết quả trên màn dù bản ghi vẫn còn
- qa: - Kết quả đánh giá đã ghi có được sửa không; và nếu có thì đi qua luồng điều chỉnh nào? Yêu cầu khách chỉ đòi truy vết người ghi và thời điểm chứ không nói việc sửa.
