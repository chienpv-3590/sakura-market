# Items Analysis - lot-detail

Màn chi tiết lô hàng và điều chỉnh của FN-03. Nguồn chân lý: `FE-011`, `FE-012`, `FE-013`
(Feature List) · `FR-LOT-03` (RFP:634) — kiểm **số lượng khả dụng** trước khi cho phép giao dịch
**hoặc giao hàng** · `BR-LOT-02` (RFP:596) — số lượng khả dụng **không được âm** và phải **truy
vết được tới lịch sử điều chỉnh** · `FR-LOT-04` (RFP:635) — điều chỉnh thuộc tính có kiểm soát;
bản ghi có reason; chủ thể và before/after · `FR-LOT-01` (RFP:632) cho chứng từ tiếp nhận.
Trạng thái theo `FIG-011` (RFP:616) — **năm trạng thái**. `BR-CLOSE-01` (RFP:597) chặn sửa trực
tiếp bản ghi của ngày đã lock.

Batch 2 of 3 - items 4.1 .. 6.5

### Item 4.1: Trường kết quả thẩm định

- itemId: img-016
- parentNo: 4
- position: startX=42 startY=763 endX=357 endY=812
- nameJP: 目利き結果
- nameTrans: Appraisal result
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
- databaseColumn: grade
- databaseNote: Prototype có cột này nhưng màn không đọc thực thể bản ghi đánh giá; kết quả chỉ tới màn qua một dòng kiểm toán.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: phán đoán của người đánh giá được ghi ở màn SC-09; hiện lại ở đây để người đọc chi tiết lô thấy căn cứ chất lượng
  Thành phần hiển thị: nhãn song ngữ Kết quả thẩm định · 目利き結果 và một ô chỉ đọc
  Chức năng và logic: chỉ đọc; là văn bản tự do nên hiện nguyên văn chứ không cắt thành hạng hay nhãn
- qa: -

### Item 4.2: Trường người xác nhận

- itemId: img-017
- parentNo: 4
- position: startX=368 startY=763 endX=684 endY=812
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
- databaseNote: Prototype có cột này nhưng màn không đọc nó; nên người xác nhận hiện không xuất hiện ở đâu trên chi tiết lô.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một nửa của nghiệm thu FR-LOT-02; kết quả không có người xác nhận thì không truy vết được
  Thành phần hiển thị: nhãn song ngữ Người xác nhận · 評価担当者 và một ô chỉ đọc
  Chức năng và logic: chỉ đọc; hiện bằng tên và không hiện địa chỉ thư điện tử
- qa: -

### Item 4.3: Trường thời điểm ghi nhận

- itemId: img-018
- parentNo: 4
- position: startX=695 startY=763 endX=1010 endY=812
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
- databaseNote: Prototype có cột này nhưng màn không đọc nó.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: nửa còn lại của nghiệm thu FR-LOT-02; là thời điểm thực của việc ghi chứ không phải ngày nghiệp vụ
  Thành phần hiển thị: nhãn song ngữ Thời điểm ghi nhận · 評価日時 và một ô chỉ đọc kèm hậu tố múi giờ
  Chức năng và logic: chỉ đọc; neo múi giờ Nhật và hiện hậu tố để không đọc lệch theo máy người dùng
- qa: -

### Item 4.4: Ghi chú nguồn của kết quả đánh giá

- itemId: img-019
- parentNo: 4
- position: startX=42 startY=825 endX=1010 endY=841
- nameJP: 評価データ源の注記
- nameTrans: Note on appraisal data source
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
  Mục đích và ngữ cảnh: chốt nguồn dữ liệu của khối; suy kết quả từ dòng kiểm toán là một đường gián tiếp dễ mất
  Thành phần hiển thị: một đoạn ghi chú dưới ba trường
  Chức năng và logic: tĩnh; đòi đọc từ bản ghi đánh giá chứ không suy từ dòng kiểm toán
- qa: -

### Item 5: Khối chứng từ tiếp nhận

- itemId: img-020
- parentNo: -
- position: startX=26 startY=881 endX=1026 endY=1111
- nameJP: 受付証憑ブロック
- nameTrans: Intake document block
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
  Mục đích và ngữ cảnh: FR-LOT-01 đòi lưu được các chứng từ tiếp nhận; màn này là nơi tra lại và là nơi bù khi chứng từ lỗi lúc tiếp nhận
  Thành phần hiển thị: bảng bốn cột danh sách tệp; một nút đính kèm thêm; một đoạn ghi chú về đường bù
  Chức năng và logic: đọc danh sách chứng từ của lô; có đường đính kèm thật vì màn tiếp nhận chỉ người dùng sang đây khi chứng từ lỗi
- qa: -

### Item 5.1: Bảng danh sách chứng từ

- itemId: img-021
- parentNo: 5
- position: startX=42 startY=925 endX=1010 endY=1011
- nameJP: 証憑一覧
- nameTrans: Document table
- itemType: table
- itemSubtype: data_table
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: file_name; mime_type; file_size; created_at
- databaseNote: Prototype có bốn cột này; loại chứng từ theo nghiệp vụ thì chưa có cột riêng nên hiện phải suy từ loại tệp.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: danh sách chứng từ đã đính kèm cho lô; cột loại chứng từ cho biết nghiệp vụ đã đủ bộ chứng từ bắt buộc hay chưa
  Thành phần hiển thị: bốn cột gồm tên tệp dạng đường dẫn mở; loại chứng từ; dung lượng; thời điểm tải lên
  Chức năng và logic: đường dẫn mở tệp có thời hạn; hết hạn thì lấy lại được tại chỗ mà không phải nạp lại cả trang; đường dẫn lưu trữ nội bộ không bao giờ hiển thị và không đi vào tệp xuất
- qa: - Loại chứng từ là một danh mục cố định hay chữ tự do? Cột này quyết định việc kiểm đủ bộ chứng từ bắt buộc của FR-LOT-01.

### Item 5.1.1: Dòng chứng từ (đại diện cho hai dòng mẫu)

- itemId: img-022
- parentNo: 5.1
- position: startX=43 startY=953 endX=1010 endY=981
- nameJP: 証憑行
- nameTrans: Document row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Mở tệp chứng từ bằng đường dẫn có thời hạn ở thẻ mới
- databaseTable: lot_attachment
- databaseColumn: file_name; file_size; created_at
- databaseNote: Prototype đọc qua đường dẫn có thời hạn ngắn và không bao giờ trả đường dẫn lưu trữ nội bộ ra phía người dùng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một tệp chứng từ đã đính kèm; hai dòng mẫu cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: tên tệp dạng đường dẫn mở; loại chứng từ; dung lượng; thời điểm tải lên kèm hậu tố múi giờ
  Chức năng và logic: bấm tên tệp mở tệp ở thẻ mới; không tạo được đường dẫn thì hiện dạng chữ kèm giải thích chứ không hiện một đường dẫn chết
- qa: -

### Item 5.2: Nút đính kèm thêm chứng từ

- itemId: img-023
- parentNo: 5
- position: startX=42 startY=1020 endX=197 endY=1049
- nameJP: 証憑を追加
- nameTrans: Attach more documents
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
- transitionNote: Ở lại màn; mở hộp chọn tệp rồi nạp lại bảng chứng từ sau khi tải lên
- databaseTable: lot_attachment
- databaseColumn: -
- databaseNote: Prototype có đường tải lên ở màn tiếp nhận nhưng màn chi tiết chỉ đọc; nên đường bù này chưa tồn tại.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: màn tiếp nhận chỉ người dùng sang đây khi chứng từ lỗi; không có nút này thì chứng từ bắt buộc mất hẳn và đường duy nhất là tạo lại lô
  Thành phần hiển thị: một nút chữ dưới bảng chứng từ
  Chức năng và logic: cùng bộ kiểm loại tệp và trần dung lượng như màn tiếp nhận; mỗi tệp để lại một dòng kiểm toán riêng
- qa: -

### Item 5.3: Ghi chú đường đính kèm bù

- itemId: img-024
- parentNo: 5
- position: startX=42 startY=1052 endX=1010 endY=1084
- nameJP: 証憑再添付の注記
- nameTrans: Note on re-attaching documents
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
  Mục đích và ngữ cảnh: khai rõ vì sao nút đính kèm là bắt buộc chứ không phải tiện ích — nó là đường bù cho một trạng thái lỗi của màn tiếp nhận
  Thành phần hiển thị: một đoạn ghi chú dưới nút
  Chức năng và logic: tĩnh; nêu thêm hai quy tắc — đường dẫn lưu trữ nội bộ không bao giờ hiện và không đi vào tệp xuất; đường dẫn mở tệp có thời hạn và lấy lại được tại chỗ
- qa: -

### Item 6: Khối điều chỉnh thuộc tính

- itemId: img-025
- parentNo: -
- position: startX=26 startY=1124 endX=1026 endY=1380
- nameJP: 属性修正ブロック
- nameTrans: Attribute adjustment block
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
  Mục đích và ngữ cảnh: FR-LOT-04 cho sửa thuộc tính lô theo cách có kiểm soát và ghi lại dấu vết; sai sót cần sửa nhưng không được làm mất lịch sử
  Thành phần hiển thị: bốn trường gồm trường cần sửa; giá trị hiện tại; giá trị mới; lý do sửa — cộng nút lưu và một ghi chú
  Chức năng và logic: mỗi lần gửi sửa đúng một trường kèm một lý do và để lại một dòng lịch sử; ngày nghiệp vụ đã lock thì khối này chỉ đọc trước khi nhập
- qa: -

### Item 6.1: Trường chọn trường cần sửa

- itemId: img-026
- parentNo: 6
- position: startX=42 startY=1168 endX=276 endY=1279
- nameJP: 修正する項目
- nameTrans: Field to adjust
- itemType: dropdown
- itemSubtype: single_select
- buttonType: -
- dataType: string
- format: một trong danh sách trắng thuộc tính sửa được
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Ở lại màn; nạp giá trị hiện tại của trường vừa chọn vào ô giá trị hiện tại
- databaseTable: lot
- databaseColumn: item; package_count
- databaseNote: Prototype có đúng hai trường trong danh sách trắng và cố ý loại hai cột số lượng — đây là chỗ bản thi công khớp thiết kế.
- validationNote:
  Điều kiện: trường được chọn không nằm trong danh sách trắng
  Lỗi: "Trường này không được phép sửa."
- description:
  Mục đích và ngữ cảnh: danh sách trắng hẹp là cách thi hành hai chữ có kiểm soát của FR-LOT-04; số lượng ban đầu và số lượng khả dụng cố ý không nằm trong đây
  Thành phần hiển thị: nhãn song ngữ Trường cần sửa · 修正する項目 kèm dấu bắt buộc; ô chọn; dòng gợi ý nói rõ vì sao danh sách hẹp
  Chức năng và logic: đổi lựa chọn thì nạp lại giá trị hiện tại tương ứng; sửa số lượng đi vòng qua đường giữ và hoàn của BR-LOT-02 chứ không qua đây
- qa: - Danh sách trắng có cần thêm thuộc tính nào nữa không; ví dụ người xuất hàng hay thông tin tàu? Yêu cầu khách nói điều chỉnh thuộc tính lô nhưng không liệt thuộc tính nào.

### Item 6.2: Trường giá trị hiện tại

- itemId: img-027
- parentNo: 6
- position: startX=287 startY=1168 endX=521 endY=1279
- nameJP: 現在値
- nameTrans: Current value
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
- databaseColumn: item; package_count
- databaseNote: Prototype nạp giá trị hiện tại vào form nhưng không dùng nó làm mốc chống ghi đè khi lưu.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: nửa trước của cặp giá trị mà FR-LOT-04 đòi ghi; hiện nó ra để người sửa biết mình đang thay cái gì
  Thành phần hiển thị: nhãn song ngữ Giá trị hiện tại · 現在値; ô chỉ đọc; dòng gợi ý nói rõ vai trò của nó trong cặp before và after
  Chức năng và logic: chỉ đọc và đổi theo trường đã chọn; giá trị này cũng là mốc để chặn ghi đè khi hai người sửa cùng lúc
- qa: -

### Item 6.3: Trường giá trị mới

- itemId: img-028
- parentNo: 6
- position: startX=532 startY=1168 endX=765 endY=1279
- nameJP: 新しい値
- nameTrans: New value
- itemType: text_form
- itemSubtype: dynamic_input
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: item; package_count
- databaseNote: Prototype kiểm kiểu theo trường ở tầng ứng dụng; trần độ dài và trần độ chính xác thì chưa có.
- validationNote:
  Điều kiện: giá trị mới rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập giá trị mới."
  Điều kiện: giá trị mới không đúng kiểu của trường đã chọn
  Lỗi: "Giá trị mới không đúng kiểu của trường đã chọn."
  Điều kiện: giá trị mới bằng giá trị hiện tại
  Lỗi: "Giá trị mới trùng giá trị hiện tại."
- description:
  Mục đích và ngữ cảnh: nửa sau của cặp giá trị mà FR-LOT-04 đòi ghi; là dữ liệu thật sẽ ghi vào lô
  Thành phần hiển thị: nhãn song ngữ Giá trị mới · 新しい値 kèm dấu bắt buộc; một ô nhập; dòng gợi ý về kiểu đổi theo trường
  Chức năng và logic: kiểu và ràng buộc đổi theo trường đã chọn và dùng đúng ngưỡng đã khai ở màn tiếp nhận; giá trị trùng giá trị hiện tại phải bị từ chối vì không có gì để ghi vào lịch sử
- qa: -

### Item 6.4: Trường lý do sửa

- itemId: img-029
- parentNo: 6
- position: startX=776 startY=1168 endX=1010 endY=1279
- nameJP: 修正理由
- nameTrans: Adjustment reason
- itemType: text_form
- itemSubtype: text_input
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: 1
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: reason
- databaseNote: Prototype bắt buộc lý do và ghi vào bản ghi kiểm toán; nhưng ba nguyên nhân từ chối dùng chung một mã lỗi.
- validationNote:
  Điều kiện: lý do rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập lý do sửa."
- description:
  Mục đích và ngữ cảnh: tiêu chí nghiệm thu FR-LOT-04 đòi bản ghi điều chỉnh có lý do; chủ thể và cặp giá trị trước và sau
  Thành phần hiển thị: nhãn song ngữ Lý do sửa · 修正理由 kèm dấu bắt buộc; một ô nhập; dòng gợi ý dẫn tiêu chí nghiệm thu
  Chức năng và logic: bắt buộc; đi vào dòng lịch sử điều chỉnh cùng cặp giá trị; ba nguyên nhân từ chối khác nhau phải có ba mã lỗi riêng để người dùng biết sửa chỗ nào
- qa: -

### Item 6.5: Nút lưu điều chỉnh

- itemId: img-030
- parentNo: 6
- position: startX=42 startY=1289 endX=145 endY=1318
- nameJP: 修正を保存
- nameTrans: Save adjustment
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
- transitionNote: Ở lại màn; nạp lại khối tổng quan và khối lịch sử điều chỉnh
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chốt lần điều chỉnh thuộc tính; là thao tác ghi chính của màn
  Thành phần hiển thị: một nút chữ ở cuối khối điều chỉnh
  Chức năng và logic: ghi có điều kiện theo giá trị hiện tại để hai người sửa cùng lúc thì người sau bị từ chối chứ không ghi đè; kỳ đã lock thì bị chặn trước khi nhập chứ không chỉ chặn sau khi gửi
- qa: -
