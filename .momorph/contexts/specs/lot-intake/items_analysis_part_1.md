# Items Analysis - lot-intake

Màn tiếp nhận lô hàng của FN-03. Nguồn chân lý: `FE-009` và `FE-013` (Feature List) ·
`FR-LOT-01` (RFP:632) — cấp mã lô duy nhất; kiện hàng; mặt hàng; số lượng ban đầu và chứng từ tiếp
nhận · `NFR-USE-01` (RFP:816) — luồng nhập lô hàng **dùng được bằng bàn phím**, thao tác của
02:00-03:00 sáng theo `FIG-002` (RFP:220). Trạng thái theo `FIG-011` (RFP:616) — **đúng NĂM trạng
thái**, gồm "Đã 下見" mà prototype không có. `BR-LOT-02` (RFP:596) khoá số lượng khả dụng không âm.

Batch 1 of 3 - items 1 .. 4.3

### Item 1: Đầu trang màn tiếp nhận lô hàng

- itemId: img-001
- parentNo: -
- position: startX=26 startY=22 endX=1026 endY=122
- nameJP: ロット受付ヘッダー
- nameTrans: Lot intake page header
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
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-009 và FE-013 → FN-03 → FR-LOT-01 và NFR-USE-01
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
  Thành phần hiển thị: mã màn SC-08 và tên màn tiếng Việt
  Chức năng và logic: văn bản tĩnh
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
  Mục đích và ngữ cảnh: khai chuỗi truy vết và nêu rõ một yêu cầu phi chức năng cũng là yêu cầu nghiệm thu của màn
  Thành phần hiển thị: mã FE-009 và FE-013; nhóm FN-03; ưu tiên P0; hai yêu cầu; loại màn Form; actor
  Chức năng và logic: văn bản tĩnh
- qa: -

### Item 1.3: Nhãn trạng thái thi công

- itemId: img-004
- parentNo: 1
- position: startX=888 startY=60 endX=941 endY=79
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

### Item 2: Khối yêu cầu dùng được bằng bàn phím

- itemId: img-005
- parentNo: -
- position: startX=26 startY=138 endX=1026 endY=230
- nameJP: キーボード操作要件ブロック
- nameTrans: Keyboard operability requirement block
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
  Mục đích và ngữ cảnh: NFR-USE-01 đòi luồng nhập lô hàng dùng được bằng bàn phím; thao tác diễn ra 02:00-03:00 sáng tại quầy nên người nhập không rời tay khỏi bàn phím
  Thành phần hiển thị: tiêu đề khối và một đoạn diễn giải các ràng buộc cụ thể
  Chức năng và logic: ba ràng buộc phải nghiệm thu được — con trỏ tự vào trường đầu khi mở màn; thứ tự chuyển trường khai tường minh theo thứ tự nghiệp vụ chứ không theo thứ tự dựng phần tử; và phím xác nhận ở bất kỳ trường văn bản nào cũng lưu
- qa: - Trường chọn tệp có được cướp phím xác nhận không? Nếu có thì đúng cái trường cần bàn phím nhất lại không mở được hộp chọn tệp.

### Item 3: Khối trường nhập

- itemId: img-006
- parentNo: -
- position: startX=26 startY=243 endX=1026 endY=526
- nameJP: 入力項目ブロック
- nameTrans: Input field block
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
  Mục đích và ngữ cảnh: bốn trường mà FR-LOT-01 đòi lưu khi lô hàng đến quầy — mặt hàng; kiện hàng; số lượng ban đầu; chứng từ tiếp nhận
  Thành phần hiển thị: bốn trường nhập kèm nhãn song ngữ; số thứ tự chuyển trường; dòng gợi ý cho từng trường — cộng nút lưu
  Chức năng và logic: thứ tự chuyển trường từ một tới năm theo thứ tự nghiệp vụ; toàn bộ khối dùng được bằng bàn phím
- qa: -

### Item 3.1: Trường mặt hàng

- itemId: img-007
- parentNo: 3
- position: startX=42 startY=287 endX=521 endY=356
- nameJP: 品目
- nameTrans: Item name
- itemType: text_form
- itemSubtype: text_input
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: 1
- maxLength: 100
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: item
- databaseNote: Prototype có cột không rỗng cho mặt hàng và kiểm rỗng ở tầng ứng dụng.
- validationNote:
  Điều kiện: mặt hàng rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập tên mặt hàng."
- description:
  Mục đích và ngữ cảnh: mặt hàng của lô; là một trong bốn dữ liệu FR-LOT-01 đòi lưu khi tiếp nhận
  Thành phần hiển thị: nhãn song ngữ Mặt hàng · 品目 kèm dấu bắt buộc; ô nhập có chữ gợi ý và số thứ tự chuyển trường một
  Chức năng và logic: bắt buộc; cắt khoảng trắng hai đầu trước khi lưu; thông báo lỗi hiện trên đúng trường này
- qa: - Mặt hàng là chữ tự do hay chọn từ danh mục mặt hàng? Nhập tự do ở quầy 02:00 sẽ sinh nhiều biến thể tên cho cùng một loài.

### Item 3.2: Trường số kiện

- itemId: img-008
- parentNo: 3
- position: startX=42 startY=366 endX=521 endY=434
- nameJP: 梱数
- nameTrans: Package count
- itemType: text_form
- itemSubtype: number_input
- buttonType: -
- dataType: integer
- format: số nguyên lớn hơn hoặc bằng 1
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: package_count
- databaseNote: Prototype có ràng buộc lớn hơn không ở tầng dữ liệu; tầng nhập đặt tối thiểu một nên hai tầng lệch nhau một giá trị.
- validationNote:
  Điều kiện: giá trị không phải số nguyên
  Lỗi: "Số kiện phải là số nguyên."
  Điều kiện: giá trị nhỏ hơn 1
  Lỗi: "Số kiện phải lớn hơn hoặc bằng 1."
- description:
  Mục đích và ngữ cảnh: thông tin kiện hàng mà FR-LOT-01 đòi lưu; một lô luôn có ít nhất một kiện
  Thành phần hiển thị: nhãn song ngữ Số kiện · 梱数 kèm dấu bắt buộc; ô nhập số với số thứ tự chuyển trường hai
  Chức năng và logic: bắt buộc; số nguyên lớn hơn hoặc bằng một; cùng một ngưỡng phải khai một chỗ và áp dụng nhất quán ở cả tầng nhập và tầng dữ liệu
- qa: -

### Item 3.3: Trường số lượng ban đầu

- itemId: img-009
- parentNo: 3
- position: startX=532 startY=287 endX=1010 endY=372
- nameJP: 初期数量
- nameTrans: Initial quantity
- itemType: text_form
- itemSubtype: number_input
- buttonType: -
- dataType: integer
- format: số dương với tối đa hai chữ số thập phân
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: initial_qty
- databaseNote: Prototype dùng số có hai chữ số thập phân với ràng buộc lớn hơn không; ba tầng lệch nhau nên một giá trị nhỏ hơn ngưỡng biểu diễn được sẽ vỡ ràng buộc và thành lỗi hệ thống.
- validationNote:
  Điều kiện: giá trị không phải số hữu hạn
  Lỗi: "Số lượng ban đầu phải là số."
  Điều kiện: giá trị nhỏ hơn hoặc bằng ngưỡng nhỏ nhất mà hai chữ số thập phân biểu diễn được
  Lỗi: "Số lượng ban đầu phải lớn hơn 0 và có tối đa hai chữ số thập phân."
  Điều kiện: giá trị vượt trần độ chính xác của trường số lượng
  Lỗi: "Số lượng ban đầu vượt giới hạn cho phép."
- description:
  Mục đích và ngữ cảnh: số lượng ban đầu của lô; là gốc của số lượng khả dụng mà BR-LOT-02 khoá không âm
  Thành phần hiển thị: nhãn song ngữ Số lượng ban đầu · 初期数量 kèm dấu bắt buộc; ô nhập số với số thứ tự chuyển trường ba; dòng gợi ý về ngưỡng duy nhất
  Chức năng và logic: một ngưỡng duy nhất khai ở một chỗ và áp dụng ở cả tầng nhập; tầng dịch vụ; tầng dữ liệu — nhập sai phải ra lỗi nhập kèm tên trường chứ không trở thành lỗi hệ thống
- qa: -

### Item 3.4: Trường chứng từ tiếp nhận

- itemId: img-010
- parentNo: 3
- position: startX=532 startY=382 endX=1010 endY=470
- nameJP: 受付証憑
- nameTrans: Intake documents
- itemType: file_or_image
- itemSubtype: multi_file_upload
- buttonType: -
- dataType: string
- format: ảnh hoặc PDF
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot_attachment
- databaseColumn: file_path; file_name; mime_type; file_size
- databaseNote: Prototype có thực thể đính kèm và bốn cột này; trần dung lượng và danh sách loại tệp chỉ được kiểm ở tầng ứng dụng; trần số tệp thì không có.
- validationNote:
  Điều kiện: không chọn tệp nào
  Lỗi: "Vui lòng đính kèm chứng từ tiếp nhận."
  Điều kiện: loại tệp nằm ngoài danh sách cho phép
  Lỗi: "Chứng từ phải là ảnh hoặc PDF."
  Điều kiện: một tệp vượt trần dung lượng
  Lỗi: "Chứng từ vượt quá dung lượng cho phép."
  Điều kiện: số tệp vượt trần cho một lô
  Lỗi: "Vượt số tệp cho phép cho một lô hàng."
- description:
  Mục đích và ngữ cảnh: tiêu chí nghiệm thu của FR-LOT-01 ghi lưu được các chứng từ bắt buộc; nên chứng từ là trường bắt buộc chứ không phải tuỳ chọn
  Thành phần hiển thị: nhãn song ngữ Chứng từ tiếp nhận · 受付証憑 kèm dấu bắt buộc; ô chọn tệp cho nhiều tệp với số thứ tự chuyển trường bốn; dòng gợi ý về loại tệp và trần dung lượng kèm một nhãn chưa chốt
  Chức năng và logic: kiểm mọi tệp trước khi tạo lô để một tệp xấu không để lại lô mồ côi; loại tệp kiểm bằng nội dung tệp chứ không tin lời khai của trình duyệt
- qa: - Loại chứng từ nào là bắt buộc theo nghiệp vụ — phiếu tiếp nhận; phiếu giao hàng; hay cả hai? Yêu cầu khách viết chứng từ bắt buộc nhưng không liệt loại nào.

### Item 3.5: Nút lưu lô hàng

- itemId: img-011
- parentNo: 3
- position: startX=42 startY=481 endX=130 endY=510
- nameJP: ロットを保存
- nameTrans: Save lot
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
- transitionNote: Ở lại màn; đổi khối trường nhập thành thẻ kết quả mang mã lô vừa tạo
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chốt lần tiếp nhận; là thao tác ghi duy nhất của màn
  Thành phần hiển thị: một nút chữ với số thứ tự chuyển trường năm
  Chức năng và logic: phím xác nhận ở bất kỳ trường văn bản nào cũng gọi được nút này; chặn gửi trùng khi đang gửi; giữ nguyên dữ liệu đã nhập khi lỗi vì nhập lại từ đầu lúc 02:00 là không chấp nhận được
- qa: -

### Item 4: Khối trường hệ thống sinh

- itemId: img-012
- parentNo: -
- position: startX=26 startY=539 endX=1026 endY=772
- nameJP: システム生成項目ブロック
- nameTrans: System-generated field block
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
  Mục đích và ngữ cảnh: bốn giá trị do tầng dịch vụ tự quyết; khai riêng để không ai tưởng chúng nhận được từ phía người dùng
  Thành phần hiển thị: bốn trường chỉ đọc gồm mã lô hàng; ngày nghiệp vụ; số lượng khả dụng; trạng thái — mỗi trường kèm một dòng gợi ý
  Chức năng và logic: không nhập được và không nhận từ phía người dùng; đây là ranh giới để chống việc gán tay ngày nghiệp vụ hoặc số lượng khả dụng
- qa: -

### Item 4.1: Trường mã lô hàng

- itemId: img-013
- parentNo: 4
- position: startX=42 startY=583 endX=276 endY=746
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
- databaseNote: Prototype có ràng buộc duy nhất ở tầng dữ liệu; nhưng cách sinh mã là đếm số lô trong ngày rồi cộng một nên hai người cùng giây vẫn đụng nhau và chỉ thử lại một lần.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: mã lô là nền tảng truy vết của cả hệ thống; tiêu chí nghiệm thu FR-LOT-01 đòi mỗi lô một mã duy nhất
  Thành phần hiển thị: nhãn song ngữ Mã lô hàng · ロット番号; ô chỉ đọc mang mã mẫu; dòng gợi ý về tính duy nhất kèm một nhãn chưa chốt về công thức mã
  Chức năng và logic: tầng dịch vụ sinh mã; tính duy nhất phải là ràng buộc ở tầng dữ liệu chứ không dựa vào việc thử lại — hai người tiếp nhận cùng lúc thì đúng một người ghi được
- qa: - Công thức mã lô của chợ là gì — có cần nhúng ngày; mã chợ; hay loại hàng vào mã không? Yêu cầu khách chỉ đòi mã duy nhất và không cho quy ước nào.

### Item 4.2: Trường ngày nghiệp vụ

- itemId: img-014
- parentNo: 4
- position: startX=287 startY=583 endX=521 endY=746
- nameJP: 業務日
- nameTrans: Business date
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
- databaseNote: Prototype gán ngày dương lịch hiện tại ở múi giờ Nhật; ngày nghiệp vụ bắt đầu 02:00 theo RFP §02-07 nên lô nhận trước 02:00 có thể rơi sai kỳ.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: ngày nghiệp vụ quyết định lô thuộc kỳ đối chiếu nào; nên nó là dữ liệu quyết toán chứ không phải một nhãn hiển thị
  Thành phần hiển thị: nhãn song ngữ Ngày nghiệp vụ · 業務日; ô chỉ đọc; dòng gợi ý dẫn yêu cầu bảng đối chiếu ngày
  Chức năng và logic: tầng dịch vụ gán theo ngày nghiệp vụ hiện hành ở múi giờ Nhật; không có trường ngày trên form nên không nhập ngày quá khứ được
- qa: - Ngày nghiệp vụ bắt đầu lúc 00:00 hay lúc 02:00 theo múi giờ Nhật? Xe về 23:50 mà nhập 00:10 thì hai cách cho hai kỳ đối chiếu khác nhau.

### Item 4.3: Trường số lượng khả dụng

- itemId: img-015
- parentNo: 4
- position: startX=532 startY=583 endX=765 endY=746
- nameJP: 利用可能数量
- nameTrans: Available quantity
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: integer
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: lot
- databaseColumn: available_qty
- databaseNote: Prototype có ràng buộc lớn hơn hoặc bằng không ở tầng dữ liệu và một vòng so-rồi-ghi ở tầng ứng dụng; cột này bị loại khỏi mọi đường sửa tự do.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: số lượng khả dụng là thuộc tính chịu lực của BR-LOT-02 — không được âm và phải truy được tới lịch sử điều chỉnh
  Thành phần hiển thị: nhãn song ngữ Số lượng khả dụng · 利用可能数量; ô chỉ đọc ghi bằng số lượng ban đầu; dòng gợi ý về đường đổi duy nhất
  Chức năng và logic: khởi tạo bằng số lượng ban đầu; từ đó chỉ đổi qua đường giữ và hoàn số lượng chứ không bao giờ sửa trực tiếp — đó là cách giữ ràng buộc không âm
- qa: -
