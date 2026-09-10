# Items Analysis - participant-detail

Màn chi tiết một profile người tham gia cộng vòng đời hiệu lực. Nguồn chân lý: `FE-005` và
`FE-006` (Feature List) · `FR-PARTY-01` (RFP:629). Vòng đời theo `FIG-010` (RFP:609) — **đúng năm
cạnh**, trong đó chỉ có **MỘT** cạnh `Tạm ngừng → Có hiệu lực`. Thủ tục và thẩm quyền trên cạnh đó
khác nhau theo phân loại, theo `FIG-004` (RFP:288-294) cột "Gỡ tạm ngừng" — đó là **điều kiện tiền
đề trên một cạnh**, không phải ba cạnh song song. RFP §02-08 (RFP:309) cấm gộp 許可 và 承認.

Batch 1 of 3 - items 1 .. 3.5

### Item 1: Đầu trang màn chi tiết người tham gia

- itemId: img-001
- parentNo: -
- position: startX=26 startY=22 endX=1026 endY=139
- nameJP: 参加者詳細ヘッダー
- nameTrans: Participant detail page header
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
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-005 và FE-006 → FN-02 → FR-PARTY-01 và nói rõ màn gồm bốn khối
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
  Thành phần hiển thị: mã màn SC-06 và tên màn tiếng Việt
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
  Mục đích và ngữ cảnh: khai hai tính năng cùng đổ về một màn — quản lý profile và vòng đời hiệu lực
  Thành phần hiển thị: mã FE-005 và FE-006; nhóm FN-02; ưu tiên P0; yêu cầu FR-PARTY-01; loại màn Detail bốn khối; actor đọc và actor ghi
  Chức năng và logic: văn bản tĩnh — hai actor tách nhau vì đọc và ghi là hai trục quyền khác nhau
- qa: -

### Item 1.3: Nhãn trạng thái thi công

- itemId: img-004
- parentNo: 1
- position: startX=388 startY=78 endX=440 endY=97
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

### Item 2: Khối profile chỉ đọc

- itemId: img-005
- parentNo: -
- position: startX=26 startY=155 endX=1026 endY=382
- nameJP: プロフィール参照ブロック
- nameTrans: Read-only profile block
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
  Mục đích và ngữ cảnh: khối đọc dành cho mọi vai vận hành — ai cũng cần biết một người tham gia thuộc loại nào và còn hiệu lực đến khi nào
  Thành phần hiển thị: tên người tham gia làm tiêu đề; bốn trường chỉ đọc gồm phân loại; căn cứ tham gia; trạng thái hiệu lực; khoảng hiệu lực
  Chức năng và logic: chỉ đọc; không có trường nào của khối này bị ẩn theo vai trò
- qa: -

### Item 2.1: Trường phân loại (chỉ đọc)

- itemId: img-006
- parentNo: 2
- position: startX=42 startY=228 endX=521 endY=277
- nameJP: 区分
- nameTrans: Category
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
- databaseTable: participant
- databaseColumn: category
- databaseNote: Prototype có `participant.category` với CHECK đúng bốn giá trị; tính bất biến thì chỉ chặn ở tầng ứng dụng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một trong bốn phân loại của FR-PARTY-01; quyết định thủ tục áp cho profile này ở mọi chỗ khác của màn
  Thành phần hiển thị: nhãn song ngữ Phân loại · 区分 và giá trị phân loại trong ô chỉ đọc
  Chức năng và logic: chỉ đọc ở khối này; giá trị bất biến sau khi tạo nên không có đường sửa nào trên màn
- qa: -

### Item 2.2: Trường căn cứ tham gia (chỉ đọc)

- itemId: img-007
- parentNo: 2
- position: startX=42 startY=287 endX=521 endY=355
- nameJP: 参加根拠
- nameTrans: Participation basis
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
- databaseTable: participant
- databaseColumn: license_type
- databaseNote: Prototype có cột này nhưng là chuỗi tự do không có CHECK; cặp phân loại và căn cứ chỉ được kiểm ở tầng ứng dụng nên ghi thẳng vào cơ sở dữ liệu là vào được cặp sai.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: căn cứ pháp lý cho việc tham gia — đăng ký chợ; giấy phép 許可; hoặc chấp thuận 承認; RFP §02-08 cấm gộp hai căn cứ sau thành một quy tắc chung
  Thành phần hiển thị: nhãn song ngữ Căn cứ tham gia · 参加根拠; giá trị căn cứ; một dòng gợi ý nói rõ giá trị suy từ phân loại
  Chức năng và logic: suy từ phân loại theo FIG-004 và không nhập tự do; nên nó không phải một trường độc lập mà là hệ quả của phân loại
- qa: -

### Item 2.3: Trường trạng thái hiệu lực (chỉ đọc)

- itemId: img-008
- parentNo: 2
- position: startX=532 startY=228 endX=1010 endY=277
- nameJP: 有効状態
- nameTrans: Eligibility status
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: string
- format: một trong bốn trạng thái của FIG-010
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: status
- databaseNote: Prototype có CHECK bốn giá trị FIG-010; đường đi giữa các trạng thái thì chỉ được kiểm ở tầng ứng dụng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: trạng thái vòng đời đã lưu theo FIG-010; là điểm xuất phát để tính những cạnh chuyển trạng thái còn hợp lệ
  Thành phần hiển thị: nhãn song ngữ Trạng thái hiệu lực · 有効状態 và giá trị trạng thái
  Chức năng và logic: chỉ đọc; giá trị đã lưu chứ không phải kết luận hôm nay giao dịch được hay không
- qa: -

### Item 2.4: Trường khoảng hiệu lực (chỉ đọc)

- itemId: img-009
- parentNo: 2
- position: startX=532 startY=287 endX=1010 endY=355
- nameJP: 有効期間
- nameTrans: Validity period
- itemType: label
- itemSubtype: readonly_field
- buttonType: -
- dataType: date
- format: YYYY-MM-DD → YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: valid_from; valid_to
- databaseNote: Prototype cho phép cột hiệu lực đến rỗng nghĩa là vô hạn; không có tác vụ định kỳ nào lật trạng thái khi qua ngày đó.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: khoảng ngày hiệu lực; là dữ liệu để SC-07 tính danh sách cảnh báo sắp hết hiệu lực
  Thành phần hiển thị: nhãn song ngữ Khoảng hiệu lực · 有効期間; hai ngày nối bằng dấu mũi tên; một dòng gợi ý về ngày kết thúc rỗng
  Chức năng và logic: ngày kết thúc để trống nghĩa là vô hạn hạn; ngày neo theo múi giờ Nhật vì ngày nghiệp vụ neo theo múi giờ đó
- qa: -

### Item 3: Khối sửa profile

- itemId: img-010
- parentNo: -
- position: startX=26 startY=395 endX=1026 endY=701
- nameJP: プロフィール編集ブロック
- nameTrans: Profile edit block
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
  Mục đích và ngữ cảnh: phép sửa trong bộ CRUD của FE-005; chỉ vai quản trị người tham gia được dùng
  Thành phần hiển thị: năm trường gồm phân loại đã khoá; tên; hiệu lực từ; hiệu lực đến; lý do cập nhật — cộng một nút lưu
  Chức năng và logic: vai không có quyền ghi thì khối vẫn hiện nhưng nội dung đổi thành dòng nhắc vai trò phụ trách; mọi lần sửa ghi audit kèm lý do và giá trị trước và sau
- qa: -

### Item 3.1: Trường phân loại đã khoá

- itemId: img-011
- parentNo: 3
- position: startX=42 startY=439 endX=521 endY=524
- nameJP: 区分（変更不可）
- nameTrans: Category (immutable)
- itemType: label
- itemSubtype: locked_field
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: category
- databaseNote: Thiết kế đòi tính bất biến ở tầng dữ liệu; prototype chỉ chặn ở tầng ứng dụng và tự khai điều đó trong chú thích của bảng.
- validationNote:
  Điều kiện: yêu cầu sửa có mang trường phân loại; kể cả khi giá trị không đổi
  Lỗi: "Phân loại không sửa được sau khi tạo."
- description:
  Mục đích và ngữ cảnh: chặn cứng việc đổi phân loại; đổi phân loại là đổi ranh giới pháp lý và căn cứ tham gia chứ không phải sửa một ô dữ liệu
  Thành phần hiển thị: nhãn song ngữ Phân loại · 区分; giá trị kèm chú thích khoá và bất biến; một dòng gợi ý nói cách xử lý đúng là lập profile mới
  Chức năng và logic: hiện dạng chỉ đọc trong form; tầng dịch vụ từ chối mọi yêu cầu có mang trường này để không có đường lách qua giao diện
- qa: -

### Item 3.2: Trường tên

- itemId: img-012
- parentNo: 3
- position: startX=42 startY=534 endX=521 endY=583
- nameJP: 名称
- nameTrans: Name
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
- databaseTable: participant
- databaseColumn: name
- databaseNote: Prototype có cột không rỗng nhưng đường sửa bỏ qua chuỗi rỗng im lặng thay vì từ chối.
- validationNote:
  Điều kiện: tên rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Tên không được để trống."
- description:
  Mục đích và ngữ cảnh: tên hiển thị của người tham gia; là trục tra cứu chính ở màn danh sách
  Thành phần hiển thị: nhãn song ngữ Tên · 名称 kèm dấu bắt buộc và một ô nhập
  Chức năng và logic: bắt buộc; cắt khoảng trắng hai đầu trước khi lưu; chuỗi rỗng phải bị từ chối kèm mã lỗi riêng chứ không bị bỏ qua im lặng
- qa: - Tên có cần lưu song song bản tiếng Nhật và bản chữ latinh không? Màn danh sách tìm khớp một phần trên cả hai hệ chữ.

### Item 3.3: Trường hiệu lực từ

- itemId: img-013
- parentNo: 3
- position: startX=532 startY=439 endX=1010 endY=488
- nameJP: 有効開始日
- nameTrans: Valid from
- itemType: date_picker
- itemSubtype: date_input
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: valid_from
- databaseNote: Prototype có cột không rỗng và kiểm định dạng ở tầng ứng dụng.
- validationNote:
  Điều kiện: giá trị không đúng dạng YYYY-MM-DD
  Lỗi: "Ngày bắt đầu hiệu lực không đúng định dạng."
- description:
  Mục đích và ngữ cảnh: ngày bắt đầu hiệu lực tham gia; là mốc dưới của khoảng dùng để kết luận hiệu lực tại một thời điểm
  Thành phần hiển thị: nhãn song ngữ Hiệu lực từ · 有効開始日 kèm dấu bắt buộc và một ô chọn ngày
  Chức năng và logic: bắt buộc; đúng dạng năm bốn chữ số gạch tháng gạch ngày; hiểu theo múi giờ Nhật
- qa: -

### Item 3.4: Trường hiệu lực đến

- itemId: img-014
- parentNo: 3
- position: startX=532 startY=498 endX=1010 endY=566
- nameJP: 有効終了日
- nameTrans: Valid to
- itemType: date_picker
- itemSubtype: date_input
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: valid_to
- databaseNote: Prototype cho phép cột rỗng; ràng buộc ngày kết thúc không nhỏ hơn ngày bắt đầu thì không có ở tầng nào.
- validationNote:
  Điều kiện: giá trị không đúng dạng YYYY-MM-DD
  Lỗi: "Ngày hết hiệu lực không đúng định dạng."
  Điều kiện: ngày hết hiệu lực nhỏ hơn ngày bắt đầu hiệu lực
  Lỗi: "Ngày hết hiệu lực không được nhỏ hơn ngày bắt đầu."
- description:
  Mục đích và ngữ cảnh: ngày hết hiệu lực; là dữ liệu để SC-07 dựng danh sách cảnh báo trước ngày mất hiệu lực
  Thành phần hiển thị: nhãn song ngữ Hiệu lực đến · 有効終了日 và một ô chọn ngày; một dòng gợi ý về giá trị rỗng và về ràng buộc so với ngày bắt đầu
  Chức năng và logic: được phép rỗng nghĩa là vô hạn hạn; có giá trị thì phải không nhỏ hơn ngày bắt đầu và bị từ chối kèm lý do rõ ràng nếu vi phạm
- qa: -

### Item 3.5: Trường lý do cập nhật

- itemId: img-015
- parentNo: 3
- position: startX=532 startY=577 endX=1010 endY=645
- nameJP: 更新理由
- nameTrans: Update reason
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
- databaseNote: Prototype ghi lý do vào bản ghi kiểm toán và bắt buộc ở tầng ứng dụng.
- validationNote:
  Điều kiện: lý do rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập lý do cập nhật."
- description:
  Mục đích và ngữ cảnh: FR-AUDIT-01 đòi mỗi lần sửa phải truy được lý do; lý do là dữ liệu kiểm toán chứ không phải một thuộc tính của profile
  Thành phần hiển thị: nhãn song ngữ Lý do cập nhật · 更新理由 kèm dấu bắt buộc; một ô nhập; một dòng gợi ý nói rõ lý do không thuộc profile
  Chức năng và logic: bắt buộc với mọi lần sửa; không ghi vào profile mà ghi vào bản ghi kiểm toán cùng giá trị trước và sau
- qa: -
