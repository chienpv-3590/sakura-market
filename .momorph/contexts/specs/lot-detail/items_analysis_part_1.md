# Items Analysis - lot-detail

Màn chi tiết lô hàng và điều chỉnh của FN-03. Nguồn chân lý: `FE-011`, `FE-012`, `FE-013`
(Feature List) · `FR-LOT-03` (RFP:634) — kiểm **số lượng khả dụng** trước khi cho phép giao dịch
**hoặc giao hàng** · `BR-LOT-02` (RFP:596) — số lượng khả dụng **không được âm** và phải **truy
vết được tới lịch sử điều chỉnh** · `FR-LOT-04` (RFP:635) — điều chỉnh thuộc tính có kiểm soát;
bản ghi có reason; chủ thể và before/after · `FR-LOT-01` (RFP:632) cho chứng từ tiếp nhận.
Trạng thái theo `FIG-011` (RFP:616) — **năm trạng thái**. `BR-CLOSE-01` (RFP:597) chặn sửa trực
tiếp bản ghi của ngày đã lock.

Batch 1 of 3 - items 1 .. 4

### Item 1: Đầu trang màn chi tiết lô hàng

- itemId: img-001
- parentNo: -
- position: startX=26 startY=22 endX=1026 endY=139
- nameJP: ロット詳細ヘッダー
- nameTrans: Lot detail page header
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
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-011; FE-012 và FE-013 → FN-03 → bốn yêu cầu khách của lô hàng
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
  Thành phần hiển thị: mã màn SC-10 và tên màn tiếng Việt
  Chức năng và logic: văn bản tĩnh
- qa: -

### Item 1.2: Dòng meta truy vết yêu cầu

- itemId: img-003
- parentNo: 1
- position: startX=26 startY=60 endX=1026 endY=116
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
  Mục đích và ngữ cảnh: khai ba tính năng cùng đổ về một màn và hai mức ưu tiên khác nhau; đây là màn tập trung của FN-03
  Thành phần hiển thị: ba mã FE; nhóm FN-03; hai mức ưu tiên; bốn yêu cầu khách; loại màn Detail nhiều khối; hai actor
  Chức năng và logic: văn bản tĩnh — hai actor tách nhau vì đọc mở cho vận hành còn điều chỉnh thuộc bộ phận đối chiếu
- qa: -

### Item 1.3: Nhãn trạng thái thi công

- itemId: img-004
- parentNo: 1
- position: startX=644 startY=78 endX=696 endY=97
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

### Item 2: Khối tổng quan lô hàng

- itemId: img-005
- parentNo: -
- position: startX=26 startY=155 endX=1026 endY=443
- nameJP: 概要ブロック
- nameTrans: Overview block
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
  Mục đích và ngữ cảnh: trả lời bốn câu ngay khi mở màn — lô đang ở bước nào; thuộc kỳ nào; kỳ đó đã chốt chưa; và còn bao nhiêu khả dụng
  Thành phần hiển thị: dải tiến trình năm bước; bốn trường số liệu gồm ngày nghiệp vụ kèm cờ lock; số lượng ban đầu; đã giữ cho giao dịch; số lượng khả dụng
  Chức năng và logic: chỉ đọc; ba số phải hiện cùng nhau vì hiệu của chúng chính là ràng buộc BR-LOT-02
- qa: -

### Item 2.1: Dải tiến trình năm trạng thái FIG-011

- itemId: img-006
- parentNo: 2
- position: startX=42 startY=227 endX=1010 endY=295
- nameJP: 進行状況
- nameTrans: Status progress
- itemType: label
- itemSubtype: progress_indicator
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
- databaseNote: Prototype có bốn giá trị trên cột này nên dải tiến trình chỉ hiện được bốn bước và thiếu bước thứ hai của FIG-011.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: FE-013 đòi trạng thái lô đi theo máy trạng thái FIG-011; dải tiến trình cho thấy cả năm bước nên số bước là một yêu cầu nghiệm thu nhìn thấy được
  Thành phần hiển thị: nhãn song ngữ Trạng thái · 状態; dải năm bước với bước hiện tại làm nổi; một dòng nói ai làm bước tiếp theo
  Chức năng và logic: năm bước của FIG-011; giá trị trạng thái ngoài tập năm phải hiển thị là không xác định chứ không suy đoán bừa
- qa: -

### Item 2.2: Trường ngày nghiệp vụ và cờ lock

- itemId: img-007
- parentNo: 2
- position: startX=42 startY=306 endX=276 endY=417
- nameJP: 業務日とロック表示
- nameTrans: Business date with lock flag
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: date
- format: YYYY-MM-DD kèm cờ trạng thái lock
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: business_date
- databaseNote: Prototype có cột này và dùng nó để kiểm lock ở tầng ứng dụng; nhưng màn hiện không hiển thị ngày nghiệp vụ ở đâu.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: ngày nghiệp vụ và cờ lock là thứ quyết định điều chỉnh có được phép hay không; người dùng phải biết trước khi nhập thay vì biết sau khi bị từ chối
  Thành phần hiển thị: nhãn song ngữ Ngày nghiệp vụ · 業務日; ô chỉ đọc mang ngày kèm cờ đã lock; dòng gợi ý nói rõ lý do phải hiện
  Chức năng và logic: chỉ đọc; cờ lock quyết định khối điều chỉnh có mở hay không nên hai chỗ phải đọc cùng một nguồn
- qa: -

### Item 2.3: Trường số lượng ban đầu

- itemId: img-008
- parentNo: 2
- position: startX=287 startY=306 endX=521 endY=417
- nameJP: 初期数量
- nameTrans: Initial quantity
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: integer
- format: số với hai chữ số thập phân
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: initial_qty
- databaseNote: Prototype có cột này với ràng buộc lớn hơn không và loại nó khỏi danh sách trường sửa được.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: số lượng lúc tiếp nhận; là mốc để đối chiếu với hai số còn lại
  Thành phần hiển thị: nhãn song ngữ Số lượng ban đầu · 初期数量 và một ô chỉ đọc dạng số liệu nổi bật
  Chức năng và logic: chỉ đọc và không nằm trong danh sách trường sửa được; sửa nó là làm lệch cả sổ số lượng
- qa: -

### Item 2.4: Trường đã giữ cho giao dịch

- itemId: img-009
- parentNo: 2
- position: startX=532 startY=306 endX=765 endY=417
- nameJP: 引当済
- nameTrans: Reserved for trades
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: integer
- format: số với hai chữ số thập phân
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi số này để giải thích hiệu giữa số lượng ban đầu và số lượng khả dụng; prototype chưa có cột hay sổ nào cho phần đã giữ nên để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: phần đã bị giữ cho các giao dịch; là số giải thích vì sao khả dụng nhỏ hơn ban đầu
  Thành phần hiển thị: nhãn song ngữ Đã giữ cho giao dịch · 引当済 và một ô chỉ đọc dạng số liệu
  Chức năng và logic: chỉ đọc và là giá trị dẫn xuất từ sổ số lượng; hiện cùng hai số kia để người dùng tự kiểm được phép tính
- qa: - Phần đã giữ cho giao dịch tính theo giao dịch đang ở trạng thái nào — chỉ giao dịch đã chốt; hay cả giao dịch đang chờ xác nhận? Hai cách cho hai con số khác nhau.

### Item 2.5: Trường số lượng khả dụng

- itemId: img-010
- parentNo: 2
- position: startX=776 startY=306 endX=1010 endY=417
- nameJP: 利用可能数量
- nameTrans: Available quantity
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: integer
- format: số với hai chữ số thập phân; không âm
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: available_qty
- databaseNote: Prototype có ràng buộc lớn hơn hoặc bằng không ở tầng dữ liệu; mọi thay đổi đi qua một vòng so-rồi-ghi ở tầng ứng dụng và cột bị loại khỏi mọi đường sửa tự do.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: số chịu lực của BR-LOT-02 và của FR-LOT-03 — là con số mà mọi cửa kiểm trước giao dịch và trước giao hàng đọc
  Thành phần hiển thị: nhãn song ngữ Số lượng khả dụng · 利用可能数量; ô chỉ đọc dạng số liệu; dòng gợi ý nêu hai nửa của BR-LOT-02
  Chức năng và logic: chỉ đọc và không bao giờ sửa trực tiếp; chỉ đổi qua đường giữ và hoàn số lượng của giao dịch và giao hàng — đó là cách giữ ràng buộc không âm
- qa: -

### Item 3: Khối truy vết số lượng khả dụng

- itemId: img-011
- parentNo: -
- position: startX=26 startY=456 endX=1026 endY=706
- nameJP: 数量履歴ブロック
- nameTrans: Quantity trace block
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
  Mục đích và ngữ cảnh: BR-LOT-02 đòi hai thứ — số lượng khả dụng không âm và truy vết được tới lịch sử điều chỉnh; khối này là nửa thứ hai và thường bị bỏ
  Thành phần hiển thị: bảng sáu cột theo thứ tự mới nhất trước; một đoạn ghi chú nêu rõ hai nửa của quy tắc
  Chức năng và logic: chỉ đọc và chỉ ghi thêm; mỗi lần giữ hoặc hoàn số lượng phải để lại đúng một dòng
- qa: -

### Item 3.1: Bảng sổ số lượng khả dụng

- itemId: img-012
- parentNo: 3
- position: startX=42 startY=500 endX=1010 endY=644
- nameJP: 数量履歴テーブル
- nameTrans: Quantity ledger table
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
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi một sổ riêng cho mọi lần đổi số lượng khả dụng; prototype không có sổ nào — đường giữ và hoàn chỉ ghi lại giá trị mới vào lô nên để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: sổ mọi lần số lượng khả dụng đổi; cột chứng từ nguồn là thứ nối một lần giữ số lượng về đúng giao dịch gây ra nó
  Thành phần hiển thị: sáu cột gồm thời điểm; việc; chứng từ nguồn; thay đổi; khả dụng sau; người thực hiện — theo thứ tự mới nhất trước
  Chức năng và logic: chỉ đọc; cột khả dụng sau cho phép cộng dồn về đúng con số đang hiển thị ở khối tổng quan; thời điểm neo múi giờ Nhật
- qa: - Sổ số lượng giữ bao lâu; và có cần xuất được ra báo cáo lịch sử lô hàng không? Yêu cầu khách chỉ nói phải truy vết được.

### Item 3.1.1: Dòng sổ số lượng (đại diện cho bốn dòng mẫu)

- itemId: img-013
- parentNo: 3.1
- position: startX=43 startY=528 endX=1010 endY=557
- nameJP: 数量履歴行
- nameTrans: Quantity ledger row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: integer
- format: thay đổi mang dấu; thời điểm theo YYYY-MM-DD HH:mm JST
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi thực thể sổ số lượng với sáu cột này; prototype chưa có nên để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một lần số lượng khả dụng đổi; bốn dòng mẫu cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: thời điểm; loại việc; mã chứng từ nguồn; lượng thay đổi mang dấu; số khả dụng sau lần đó; người thực hiện
  Chức năng và logic: dòng tiếp nhận lô không có chứng từ nguồn nên ô đó để trống; lượng thay đổi mang dấu âm khi giữ và dấu dương khi hoàn lại
- qa: -

### Item 3.2: Ghi chú hai nửa của BR-LOT-02

- itemId: img-014
- parentNo: 3
- position: startX=42 startY=647 endX=1010 endY=679
- nameJP: BR-LOT-02 の注記
- nameTrans: Note on BR-LOT-02
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
  Mục đích và ngữ cảnh: quy tắc này thường chỉ được thi hành nửa đầu; nửa sau là truy vết và nó cần một sổ riêng chứ không phải một ràng buộc
  Thành phần hiển thị: một đoạn ghi chú dưới bảng sổ
  Chức năng và logic: tĩnh; đòi mỗi lần giữ hoặc hoàn để lại đúng một dòng nói rõ chứng từ nguồn; và cộng dồn phải về đúng giá trị đang hiển thị ở khối tổng quan
- qa: -

### Item 4: Khối kết quả đánh giá

- itemId: img-015
- parentNo: -
- position: startX=26 startY=719 endX=1026 endY=868
- nameJP: 評価結果ブロック
- nameTrans: Appraisal result block
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
  Mục đích và ngữ cảnh: nghiệm thu FR-LOT-02 đòi với mỗi kết quả truy ngược được người ghi và thời điểm; nên khối này phải đọc từ chính bản ghi đánh giá
  Thành phần hiển thị: ba trường chỉ đọc gồm kết quả thẩm định; người xác nhận; thời điểm ghi nhận — cộng một ghi chú
  Chức năng và logic: chỉ đọc; không suy kết quả từ một dòng kiểm toán vì mất dòng đó là mất kết quả trên màn dù bản ghi vẫn còn
- qa: -
