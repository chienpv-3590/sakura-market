# Items Analysis - lot-detail

Màn chi tiết lô hàng và điều chỉnh của FN-03. Nguồn chân lý: `FE-011`, `FE-012`, `FE-013`
(Feature List) · `FR-LOT-03` (RFP:634) — kiểm **số lượng khả dụng** trước khi cho phép giao dịch
**hoặc giao hàng** · `BR-LOT-02` (RFP:596) — số lượng khả dụng **không được âm** và phải **truy
vết được tới lịch sử điều chỉnh** · `FR-LOT-04` (RFP:635) — điều chỉnh thuộc tính có kiểm soát;
bản ghi có reason; chủ thể và before/after · `FR-LOT-01` (RFP:632) cho chứng từ tiếp nhận.
Trạng thái theo `FIG-011` (RFP:616) — **năm trạng thái**. `BR-CLOSE-01` (RFP:597) chặn sửa trực
tiếp bản ghi của ngày đã lock.

Batch 3 of 3 - items 6.6 .. 10

### Item 6.6: Ghi chú một trường một lý do một dòng lịch sử

- itemId: img-031
- parentNo: 6
- position: startX=42 startY=1321 endX=1010 endY=1354
- nameJP: 制御された修正の注記
- nameTrans: Note on controlled adjustment
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
  Mục đích và ngữ cảnh: giải thích hai chữ có kiểm soát của FR-LOT-04 thành một quy tắc kiểm được — một trường một lý do một dòng
  Thành phần hiển thị: một đoạn ghi chú dưới nút lưu
  Chức năng và logic: tĩnh; nêu thêm hành vi khi kỳ đã lock — khối chỉ đọc trước khi nhập và kèm đường sang luồng điều chỉnh sau chốt
- qa: -

### Item 7: Khối lịch sử điều chỉnh

- itemId: img-032
- parentNo: -
- position: startX=26 startY=1393 endX=1026 endY=1643
- nameJP: 修正履歴ブロック
- nameTrans: Adjustment history block
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
  Mục đích và ngữ cảnh: dấu vết mọi thao tác đã tác động tới lô; là chỗ nghiệm thu FR-LOT-04 và một phần của nghiệm thu BR-LOT-02
  Thành phần hiển thị: bảng bảy cột theo thứ tự mới nhất trước; một đoạn ghi chú về phạm vi của bảng
  Chức năng và logic: chỉ đọc và chỉ ghi thêm; gồm cả lần thử bị chặn vì kỳ đã lock chứ không chỉ những lần ghi thành công
- qa: -

### Item 7.1: Bảng bảy cột lịch sử điều chỉnh

- itemId: img-033
- parentNo: 7
- position: startX=42 startY=1437 endX=1010 endY=1581
- nameJP: 修正履歴テーブル
- nameTrans: Adjustment history table
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
- databaseTable: audit_log
- databaseColumn: action; before; after; reason; actor_id; created_at
- databaseNote: Prototype đọc bản ghi kiểm toán nhưng lọc theo đúng một loại thực thể nên lượt đính kèm chứng từ không hiện ở bảng này.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một dòng một thao tác; bốn loại việc cùng đổ về đây gồm tiếp nhận lô; chuyển trạng thái; điều chỉnh thuộc tính; và lần thử bị chặn
  Thành phần hiển thị: bảy cột gồm việc; trường; giá trị trước; giá trị sau; lý do; người thực hiện; thời điểm — theo thứ tự mới nhất trước
  Chức năng và logic: chỉ liệt trường thực sự đổi và không hiện các cột nội bộ; lượt đính kèm chứng từ cũng thuộc lịch sử của lô này chứ không rơi sang thực thể khác; thời điểm neo múi giờ Nhật
- qa: -

### Item 7.1.1: Dòng lịch sử điều chỉnh (đại diện cho bốn dòng mẫu)

- itemId: img-034
- parentNo: 7.1
- position: startX=43 startY=1465 endX=1010 endY=1494
- nameJP: 修正履歴行
- nameTrans: Adjustment history row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: -
- format: thời điểm theo YYYY-MM-DD HH:mm JST
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: audit_log
- databaseColumn: action; before; after; reason; actor_id; created_at
- databaseNote: Prototype ghi một dòng riêng cho lần thử bị chặn vì kỳ đã lock trước khi từ chối — chỗ này khớp thiết kế.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một thao tác đã tác động hoặc đã thử tác động tới lô; bốn dòng mẫu cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: loại việc; tên trường; giá trị trước; giá trị sau; lý do; người thực hiện; thời điểm
  Chức năng và logic: dòng tiếp nhận lô không có giá trị trước nên ô đó để trống; dòng bị chặn vì kỳ đã lock vẫn ghi đủ cặp giá trị và lý do dù lô không đổi — BR-CLOSE-01 đòi mọi lần thử sửa đều bị chặn và có log
- qa: -

### Item 7.2: Ghi chú phạm vi bảng lịch sử

- itemId: img-035
- parentNo: 7
- position: startX=42 startY=1584 endX=1010 endY=1616
- nameJP: 履歴範囲の注記
- nameTrans: History scope note
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
  Mục đích và ngữ cảnh: chốt ba quy tắc của bảng lịch sử — chỉ liệt trường đổi; lần thử bị chặn cũng có dòng; và lượt đính kèm thuộc lịch sử của lô này
  Thành phần hiển thị: một đoạn ghi chú dưới bảng lịch sử
  Chức năng và logic: tĩnh; dẫn BR-CLOSE-01 làm căn cứ cho việc ghi lại cả lần thử bị chặn
- qa: -

### Item 8: Khối trạng thái màn

- itemId: img-036
- parentNo: -
- position: startX=26 startY=1656 endX=1026 endY=1943
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
  Mục đích và ngữ cảnh: liệt sáu trạng thái màn phải xử lý; hai trạng thái chỉ đọc có hai nguyên nhân khác nhau nên phải tách
  Thành phần hiển thị: sáu ô trạng thái; mỗi ô có tên và mô tả hành vi mong đợi
  Chức năng và logic: tĩnh trên wireframe nhưng là hợp đồng hành vi cho tầng hiển thị
- qa: -

### Item 8.1: Trạng thái rỗng

- itemId: img-037
- parentNo: 8
- position: startX=42 startY=1700 endX=277 endY=1809
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
  Mục đích và ngữ cảnh: màn có nhiều khối và mỗi khối rỗng vì một lý do khác nhau; một thông báo rỗng dùng chung làm mất thông tin
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: mỗi khối nói riêng vì sao rỗng và kèm hành động khả dụng của chính khối đó
- qa: -

### Item 8.2: Trạng thái đang tải hoặc lỗi tải hoặc không tìm thấy

- itemId: img-038
- parentNo: 8
- position: startX=286 startY=1700 endX=522 endY=1809
- nameJP: 読み込み・エラー・未検出
- nameTrans: Loading or error or not found state
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
  Mục đích và ngữ cảnh: màn đọc từ nhiều nguồn nên một nguồn lỗi không được làm trắng cả trang
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: khung xương theo từng khối; khối lỗi hiện riêng; mã lô không tồn tại thì nói rõ kèm đường về danh sách lô
- qa: -

### Item 8.3: Trạng thái chỉ đọc vì thiếu quyền

- itemId: img-039
- parentNo: 8
- position: startX=531 startY=1700 endX=766 endY=1809
- nameJP: 権限不足で読み取り専用
- nameTrans: Read-only for lack of permission
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
  Mục đích và ngữ cảnh: một trong hai nguyên nhân dẫn tới chỉ đọc; nguyên nhân này thuộc vai trò và không đổi theo dữ liệu
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: giữ nguyên khối điều chỉnh trên bố cục nhưng đổi nội dung thành dòng nhắc vai trò phụ trách; chặn thật ở tầng dịch vụ
- qa: -

### Item 8.4: Trạng thái chỉ đọc vì ngày đã lock

- itemId: img-040
- parentNo: 8
- position: startX=775 startY=1700 endX=1010 endY=1809
- nameJP: ロックで読み取り専用
- nameTrans: Read-only for locked day
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
  Mục đích và ngữ cảnh: nguyên nhân thứ hai của chỉ đọc; khác hẳn nguyên nhân quyền vì nó biết trước được từ dữ liệu đang hiển thị
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: chặn trước khi nhập thay vì để người dùng nhập xong lý do rồi mới báo bị chặn; kèm đường sang luồng điều chỉnh sau chốt
- qa: -

### Item 8.5: Trạng thái xung đột đồng thời

- itemId: img-041
- parentNo: 8
- position: startX=42 startY=1818 endX=277 endY=1927
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
  Mục đích và ngữ cảnh: không chặn thì người sau ghi đè người trước và dòng lịch sử của người sau mang giá trị trước đã sai — dấu vết kiểm toán thành sai
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: người sau bị từ chối vì giá trị trước đã đổi; màn nạp lại giá trị hiện tại rồi cho gửi lại
- qa: -

### Item 8.6: Trạng thái số lượng không đủ

- itemId: img-042
- parentNo: 8
- position: startX=286 startY=1818 endX=522 endY=1927
- nameJP: 数量不足
- nameTrans: Insufficient quantity state
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
  Mục đích và ngữ cảnh: khai rõ ranh giới — màn này hiển thị và truy vết số lượng nhưng không phải nơi chặn bán vượt
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: màn không đổi số lượng nên không bao giờ sinh trạng thái này; FR-LOT-03 đặt cửa kiểm ở cả đường chốt giao dịch và đường ghi nhận giao hàng
- qa: -

### Item 9: Khối đối chiếu prototype

- itemId: img-043
- parentNo: -
- position: startX=26 startY=1956 endX=1026 endY=2418
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

### Item 9.1: Bảng đối chiếu ba cột

- itemId: img-044
- parentNo: 9
- position: startX=42 startY=2000 endX=1010 endY=2402
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
  Mục đích và ngữ cảnh: chín hạng mục lệch; nặng nhất là không có sổ số lượng nên nửa truy vết của BR-LOT-02 chưa được thi hành
  Thành phần hiển thị: ba cột Thiết kế đòi; Prototype làm; Mức — và chín dòng hạng mục
  Chức năng và logic: chỉ đọc; hai dòng cuối mang mức khác có chủ đích nên không sinh việc sửa
- qa: -

### Item 10: Ghi chú chân màn về phân quyền và truy vết

- itemId: img-045
- parentNo: -
- position: startX=26 startY=2433 endX=1026 endY=2534
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
  Mục đích và ngữ cảnh: chốt ba điều dễ trôi — hai trục quyền; ba tính năng gặp nhau ở màn này; và mọi thứ tính theo ngày nghiệp vụ ở múi giờ Nhật
  Thành phần hiển thị: hai dòng ghi chú và một đường dẫn tới file spec của màn
  Chức năng và logic: tĩnh; nêu rõ mở chứng từ nên để dấu vết vì chứng từ chủ đầu tư coi là ảnh lô hàng và dữ liệu cần truy vết
- qa: - Lượt mở chứng từ có cần ghi dấu vết ai đã xem không? Yêu cầu kiểm toán chỉ liệt tạo; sửa; phê duyệt; lock và đổi quyền chứ không liệt việc đọc.
