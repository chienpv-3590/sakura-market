# Items Analysis - mekiki-entry

Màn ghi nhận kết quả đánh giá bằng mắt của FN-03. Nguồn chân lý: `FE-010` (Feature List) ·
`FR-LOT-02` (RFP:633) — lưu kết quả đánh giá bằng mắt kèm **người xác nhận** và **thời điểm ghi
nhận**; nghiệm thu là "truy ngược được người ghi và thời điểm" · `SCOPE-OUT-01` (RFP:404) — đánh
giá tự động độ tươi; chất lượng; phân loại loài **ngoài phạm vi**; hệ thống **chỉ ghi nhận**.
`FIG-008` (RFP:323) vẽ ranh giới phán đoán của con người. Trạng thái theo `FIG-011` (RFP:616) —
ghi kết quả đưa lô sang bước 2 trên 5 là "Đã 下見".

Batch 1 of 2 - items 1 .. 5.1

### Item 1: Đầu trang màn ghi kết quả đánh giá

- itemId: img-001
- parentNo: -
- position: startX=26 startY=22 endX=1026 endY=122
- nameJP: 目利き結果記録ヘッダー
- nameTrans: Appraisal entry page header
- itemType: others
- itemSubtype: page_header
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
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-010 → FN-03 → FR-LOT-02 và ràng buộc phạm vi SCOPE-OUT-01
  Thành phần hiển thị: tiêu đề màn; dòng meta yêu cầu; nhãn trạng thái thi công
  Chức năng và logic: tĩnh — chỉ định danh màn và phạm vi yêu cầu
- qa: -

### Item 1.1: Tiêu đề màn

- itemId: img-002
- parentNo: 1
- position: startX=26 startY=22 endX=1026 endY=48
- nameJP: 画面タイトル
- nameTrans: Screen title
- itemType: label
- itemSubtype: heading
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
  Mục đích và ngữ cảnh: định danh màn trong bộ 32 màn của thiết kế
  Thành phần hiển thị: mã màn SC-09 và tên màn tiếng Việt kèm thuật ngữ tiếng Nhật
  Chức năng và logic: văn bản tĩnh; tên màn còn phụ thuộc câu hỏi chưa chốt về hai thuật ngữ
- qa: -

### Item 1.2: Dòng meta truy vết yêu cầu

- itemId: img-003
- parentNo: 1
- position: startX=26 startY=60 endX=1026 endY=98
- nameJP: 要件トレース行
- nameTrans: Requirement trace meta line
- itemType: label
- itemSubtype: screen_meta
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
  Mục đích và ngữ cảnh: khai chuỗi truy vết và nêu rõ một ràng buộc phạm vi cũng nằm trong yêu cầu của màn
  Thành phần hiển thị: mã FE-010; nhóm FN-03; ưu tiên P0; một yêu cầu chức năng và một ràng buộc phạm vi; loại màn Form; actor
  Chức năng và logic: văn bản tĩnh
- qa: -

### Item 1.3: Nhãn trạng thái thi công

- itemId: img-004
- parentNo: 1
- position: startX=723 startY=60 endX=775 endY=79
- nameJP: 実装状況タグ
- nameTrans: Build status tag
- itemType: label
- itemSubtype: status_tag
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
  Mục đích và ngữ cảnh: cho biết màn đã có bản thi công để đối chiếu; không phải trạng thái nghiệp vụ
  Thành phần hiển thị: một nhãn chữ ngắn
  Chức năng và logic: tĩnh — không đổi theo dữ liệu
- qa: -

### Item 2: Khối ranh giới phán đoán của con người

- itemId: img-005
- parentNo: -
- position: startX=26 startY=138 endX=1026 endY=230
- nameJP: 人の判断境界ブロック
- nameTrans: Human judgment boundary block
- itemType: label
- itemSubtype: requirement_note
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
  Mục đích và ngữ cảnh: SCOPE-OUT-01 loại hẳn khỏi phạm vi việc đánh giá tự động độ tươi; chất lượng; phân loại loài — nên màn này chỉ ghi nhận phán đoán của con người
  Thành phần hiển thị: tiêu đề khối và một đoạn diễn giải ranh giới theo FIG-008
  Chức năng và logic: rút ra bốn điều màn không được có — không chấm điểm; không gợi ý hạng; không xếp loại tự động; và không ô nào mang nghĩa hệ thống đánh giá
- qa: -

### Item 3: Khối ngữ cảnh lô hàng

- itemId: img-006
- parentNo: -
- position: startX=26 startY=243 endX=1026 endY=392
- nameJP: ロット情報ブロック
- nameTrans: Lot context block
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
  Mục đích và ngữ cảnh: người đánh giá phải biết đang ghi cho lô nào và bản ghi rơi vào kỳ nào trước khi ghi
  Thành phần hiển thị: bốn trường chỉ đọc gồm mã lô; mặt hàng; trạng thái hiện tại; ngày nghiệp vụ của lô
  Chức năng và logic: chỉ đọc; đọc mở cho các vai vận hành vì đây là ngữ cảnh chứ không phải dữ liệu ghi
- qa: -

### Item 3.1: Trường mã lô

- itemId: img-007
- parentNo: 3
- position: startX=42 startY=287 endX=276 endY=366
- nameJP: ロット番号
- nameTrans: Lot code
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
- databaseNote: Prototype có cột mã lô duy nhất; màn đọc thẳng theo định danh lô trên đường dẫn.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: định danh lô đang ghi kết quả; là mã người đánh giá đối chiếu với mã ghi trên kiện hàng thật
  Thành phần hiển thị: nhãn song ngữ Mã lô · ロット番号 và một ô chỉ đọc
  Chức năng và logic: chỉ đọc; giá trị mang sang từ màn tiếp nhận hoặc từ màn chi tiết lô
- qa: -

### Item 3.2: Trường mặt hàng

- itemId: img-008
- parentNo: 3
- position: startX=287 startY=287 endX=521 endY=366
- nameJP: 品目
- nameTrans: Item name
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
- databaseColumn: item
- databaseNote: Prototype có cột mặt hàng không rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: mặt hàng của lô; giúp người đánh giá xác nhận đang đứng trước đúng lô
  Thành phần hiển thị: nhãn song ngữ Mặt hàng · 品目 và một ô chỉ đọc
  Chức năng và logic: chỉ đọc; không sửa được ở màn này — sửa thuộc tính lô thuộc màn chi tiết lô
- qa: -

### Item 3.3: Trường trạng thái hiện tại của lô

- itemId: img-009
- parentNo: 3
- position: startX=532 startY=287 endX=765 endY=366
- nameJP: 現在の状態
- nameTrans: Current lot status
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
- databaseNote: Prototype có bốn giá trị trên cột này và thiếu giá trị cho bước hai của FIG-011.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: điều kiện tiền đề của màn — chỉ lô ở bước một của FIG-011 mới chờ ghi kết quả đánh giá
  Thành phần hiển thị: nhãn song ngữ Trạng thái hiện tại · 状態; ô chỉ đọc ghi trạng thái kèm vị trí bước; dòng gợi ý về điều kiện tiền đề
  Chức năng và logic: chỉ đọc; lô ở bước khác thì màn không hiện form nhập mà hiện kết quả đã có
- qa: -

### Item 3.4: Trường ngày nghiệp vụ của lô

- itemId: img-010
- parentNo: 3
- position: startX=776 startY=287 endX=1010 endY=366
- nameJP: ロットの業務日
- nameTrans: Lot business date
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
- databaseTable: lot
- databaseColumn: business_date
- databaseNote: Prototype có cột này và bản ghi đánh giá sao lại giá trị đó; nhưng màn hiện không hiển thị ngày này ở đâu.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: bản ghi kết quả thừa hưởng ngày nghiệp vụ của lô; nên người ghi phải thấy ngày đó trước khi ghi để biết bản ghi thuộc kỳ nào
  Thành phần hiển thị: nhãn song ngữ Ngày nghiệp vụ của lô · 業務日; ô chỉ đọc; dòng gợi ý về lý do phải hiện
  Chức năng và logic: chỉ đọc; đây là dữ liệu quyết định việc kỳ đã lock có chặn hay không nên không được ẩn
- qa: -

### Item 4: Khối kết quả đánh giá bằng mắt

- itemId: img-011
- parentNo: -
- position: startX=26 startY=405 endX=1026 endY=616
- nameJP: 目視評価結果ブロック
- nameTrans: Visual appraisal result block
- itemType: others
- itemSubtype: form_block
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
  Mục đích và ngữ cảnh: phần ghi duy nhất của màn; nội dung là phán đoán của người có kinh nghiệm chứ không phải một hạng do hệ thống suy ra
  Thành phần hiển thị: một trường nhập nhiều dòng; dòng gợi ý về việc không dùng danh sách hạng cố định; nút lưu kèm ghi chú về phím xác nhận
  Chức năng và logic: một trường bắt buộc; lưu xong đưa lô sang bước hai của FIG-011
- qa: -

### Item 4.1: Trường kết quả thẩm định

- itemId: img-012
- parentNo: 4
- position: startX=42 startY=449 endX=1010 endY=561
- nameJP: 目利き結果
- nameTrans: Appraisal result
- itemType: textarea
- itemSubtype: multiline_input
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: 1
- maxLength: 1000
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: mekiki_record
- databaseColumn: grade
- databaseNote: Prototype có cột này ở dạng chữ tự do không có ràng buộc giá trị — đúng ý SCOPE-OUT-01; nhưng cũng không có trần độ dài ở tầng nào.
- validationNote:
  Điều kiện: kết quả rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập kết quả thẩm định."
  Điều kiện: kết quả vượt trần độ dài
  Lỗi: "Kết quả thẩm định vượt độ dài cho phép."
- description:
  Mục đích và ngữ cảnh: FR-LOT-02 đòi lưu kết quả đánh giá bằng mắt; là phán đoán cuối cùng của con người và phải giữ ở dạng truy vết được
  Thành phần hiển thị: nhãn song ngữ Kết quả thẩm định · 目利き結果 kèm dấu bắt buộc; một ô nhập nhiều dòng có chữ gợi ý cách viết; dòng gợi ý về lý do không dùng danh sách hạng
  Chức năng và logic: văn bản tự do chứ không phải danh sách hạng cố định — đóng khung nó thành danh sách chính là bước đầu của tự động hoá mà SCOPE-OUT-01 cấm; bắt buộc; có trần độ dài và hiển thị số ký tự còn lại
- qa: - Trần độ dài của kết quả thẩm định là bao nhiêu ký tự? Không có trần thì một nội dung rất dài lưu được và làm hỏng cả báo cáo lẫn màn tra cứu.

### Item 4.2: Nút lưu kết quả

- itemId: img-013
- parentNo: 4
- position: startX=42 startY=571 endX=130 endY=600
- nameJP: 結果を保存
- nameTrans: Save result
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
- transitionNote: Ở lại màn; hiện xác nhận đã lưu và đưa lô sang bước hai của FIG-011
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chốt lần ghi kết quả; là thao tác ghi duy nhất của màn
  Thành phần hiển thị: một nút chữ và một ghi chú nói phím xác nhận cũng lưu
  Chức năng và logic: dùng được bằng bàn phím theo NFR-USE-01; chặn gửi trùng khi đang gửi; hai việc phải xảy ra cùng nhau — ghi bản ghi kết quả và lật trạng thái lô sang bước hai; không được để một việc thành công mà việc kia thất bại
- qa: - Nếu ghi bản ghi kết quả thành công mà lật trạng thái lô thất bại thì hệ thống xử lý thế nào? Thiết kế đòi hai việc đi cùng nhau nhưng chưa nói cơ chế bù trừ.

### Item 5: Khối truy vết bắt buộc

- itemId: img-014
- parentNo: -
- position: startX=26 startY=629 endX=1026 endY=892
- nameJP: トレーサビリティブロック
- nameTrans: Mandatory traceability block
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
  Mục đích và ngữ cảnh: tiêu chí nghiệm thu FR-LOT-02 là truy ngược được người ghi và thời điểm; nên bốn giá trị này là phần chịu lực của màn chứ không phải thông tin phụ
  Thành phần hiển thị: bốn trường chỉ đọc gồm người xác nhận; thời điểm ghi nhận; ngày nghiệp vụ của bản ghi; trạng thái lô sau khi lưu — cộng một ghi chú chưa chốt
  Chức năng và logic: cả bốn do tầng dịch vụ quyết định và không nhận từ phía người dùng; nhưng phải hiện trên màn trước khi ghi
- qa: -

### Item 5.1: Trường người xác nhận

- itemId: img-015
- parentNo: 5
- position: startX=42 startY=673 endX=276 endY=801
- nameJP: 評価担当者
- nameTrans: Confirmed by
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
- databaseTable: mekiki_record
- databaseColumn: assessor_id
- databaseNote: Prototype có cột này nhưng cho phép rỗng ở tầng dữ liệu; đường ghi hiện có luôn gán nên rủi ro nằm ở đường ghi khác trong tương lai.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: FR-LOT-02 đòi lưu người xác nhận; người đánh giá đang ký tên vào một phán đoán nghiệp vụ nên họ có quyền thấy tên mình được ghi vào đâu
  Thành phần hiển thị: nhãn song ngữ Người xác nhận · 評価担当者; ô chỉ đọc mang tên người của phiên đang đăng nhập; dòng gợi ý nói rõ phải hiện chứ không lưu ngầm
  Chức năng và logic: lấy từ phiên đăng nhập và không nhận từ phía người dùng; hiện bằng tên và không hiện địa chỉ thư điện tử
- qa: -
