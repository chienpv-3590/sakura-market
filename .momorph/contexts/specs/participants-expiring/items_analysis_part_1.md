# Items Analysis - participants-expiring

Màn cảnh báo profile sắp hết hiệu lực. Nguồn chân lý: `FE-008` (Feature List) · `FR-PARTY-03`
(RFP:631) — cảnh báo theo **khoảng cảnh báo cấu hình được**, trước ngày mất hiệu lực. Ba đường
xử lý tách theo **căn cứ tham gia** vì RFP §02-08 (RFP:309) cấm gộp 許可 và 承認 thành một quy tắc
chung. Cột "Gỡ tạm ngừng" của `FIG-004` (RFP:288-294) và năm cạnh của `FIG-010` (RFP:609) quyết
định hành động nào hợp lệ trên từng dòng. Đây là spec **thiết kế** — màn chưa thi công.

Batch 1 of 3 - items 1 .. 4.2

### Item 1: Đầu trang màn cảnh báo hiệu lực

- itemId: img-001
- parentNo: -
- position: startX=26 startY=22 endX=1026 endY=122
- nameJP: 有効期限警告ヘッダー
- nameTrans: Expiry warning page header
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
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-008 → FN-02 → FR-PARTY-03 và khai rõ màn chưa thi công
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
  Thành phần hiển thị: mã màn SC-07 và tên màn tiếng Việt
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
  Mục đích và ngữ cảnh: khai chuỗi truy vết và ưu tiên P1 để phân biệt màn này với hai màn P0 còn lại của FN-02
  Thành phần hiển thị: mã FE-008; nhóm FN-02; ưu tiên P1; yêu cầu FR-PARTY-03; loại màn List; actor
  Chức năng và logic: văn bản tĩnh
- qa: - Actor của FE-008 ghi là nhân viên vận hành chợ nhưng không khớp trực tiếp vai trò nào trong bảy vai trò nội bộ — màn này thuộc vai nào?

### Item 1.3: Nhãn trạng thái chưa thi công

- itemId: img-004
- parentNo: 1
- position: startX=878 startY=60 endX=954 endY=79
- nameJP: 未実装タグ
- nameTrans: Not built tag
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
  Mục đích và ngữ cảnh: khai rõ toàn bộ màn là thiết kế phải dựng chứ không phải ảnh của bản thi công
  Thành phần hiển thị: một nhãn chữ ngắn
  Chức năng và logic: tĩnh — không đổi theo dữ liệu
- qa: -

### Item 2: Khối tiêu chí nghiệm thu FR-PARTY-03

- itemId: img-005
- parentNo: -
- position: startX=26 startY=138 endX=1026 endY=209
- nameJP: 受入基準の注記
- nameTrans: Acceptance criteria note
- itemType: label
- itemSubtype: acceptance_note
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
  Mục đích và ngữ cảnh: chép nguyên tiêu chí nghiệm thu của FR-PARTY-03 vì hai chữ cấu hình được quyết định toàn bộ hình dạng màn
  Thành phần hiển thị: một khối ghi chú nổi bật ở đầu màn
  Chức năng và logic: tĩnh; rút ra hai hệ quả — ngưỡng phải là dữ liệu cấu hình có người sửa và có lịch sử sửa; và ngưỡng phải tách theo căn cứ tham gia vì RFP §02-08 cấm gộp 許可 với 承認
- qa: -

### Item 3: Khối cấu hình ngưỡng cảnh báo

- itemId: img-006
- parentNo: -
- position: startX=26 startY=225 endX=1026 endY=565
- nameJP: 警告しきい値設定ブロック
- nameTrans: Warning threshold config block
- itemType: others
- itemSubtype: config_block
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
  Mục đích và ngữ cảnh: chỗ đáp ứng hai chữ cấu hình được của FR-PARTY-03; không có khối này thì màn chỉ là một báo cáo có ngưỡng cứng
  Thành phần hiển thị: bảng ngưỡng hiện hành theo căn cứ tham gia; hai trường nhập ngưỡng và lý do; nút lưu; ghi chú về câu hỏi chưa chốt
  Chức năng và logic: ngưỡng lưu theo từng căn cứ tham gia; mỗi lần đổi ngưỡng ghi audit kèm lý do và giá trị trước và sau
- qa: -

### Item 3.1: Bảng ngưỡng hiện hành theo căn cứ tham gia

- itemId: img-007
- parentNo: 3
- position: startX=42 startY=269 endX=1010 endY=384
- nameJP: しきい値一覧
- nameTrans: Threshold table
- itemType: table
- itemSubtype: config_table
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
- databaseNote: Thiết kế đòi một thực thể cấu hình ngưỡng cảnh báo khoá theo căn cứ tham gia; prototype chưa có thực thể nào cho việc này nên để trống có ý thức chứ không phải bỏ sót.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: cho thấy ngưỡng đang áp dụng cho từng căn cứ tham gia; cột người sửa và thời điểm sửa là bằng chứng cho FR-AUDIT-01
  Thành phần hiển thị: năm cột và ba dòng — một dòng cho mỗi căn cứ tham gia giấy phép; chấp thuận; đăng ký chợ
  Chức năng và logic: chỉ đọc; ba dòng độc lập vì thủ tục gia hạn của ba căn cứ khác nhau; dòng đăng ký chợ áp cho hai phân loại nên phân loại áp dụng liệt cả hai
- qa: - Lịch sử đổi ngưỡng cần giữ bao lâu; và có cần xem lại được ngưỡng đã áp dụng ở một thời điểm quá khứ không? Bảng hiện chỉ hiện lần sửa gần nhất.

### Item 3.1.1: Dòng ngưỡng theo căn cứ (đại diện cho ba dòng)

- itemId: img-008
- parentNo: 3.1
- position: startX=43 startY=297 endX=1010 endY=326
- nameJP: しきい値行
- nameTrans: Threshold row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: integer
- format: số nguyên dương; đơn vị ngày
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi khoá theo căn cứ tham gia để ba ngưỡng tách được; prototype chưa có thực thể cấu hình nên để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một căn cứ tham gia và ngưỡng cảnh báo của nó; ba dòng cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: tên căn cứ tham gia; các phân loại áp dụng; số ngày ngưỡng; tên người sửa gần nhất; thời điểm sửa kèm hậu tố múi giờ
  Chức năng và logic: chỉ đọc; số ngày là số nguyên dương; các giá trị mẫu trên wireframe là minh hoạ và không phải con số khách đã chốt
- qa: - Ba con số ngưỡng mẫu trên wireframe chỉ là minh hoạ — giá trị khởi tạo cho mỗi căn cứ là bao nhiêu? Yêu cầu khách không cho con số nào.

### Item 3.2: Trường ngưỡng số ngày

- itemId: img-009
- parentNo: 3
- position: startX=42 startY=395 endX=282 endY=490
- nameJP: しきい値（日数）
- nameTrans: Threshold in days
- itemType: text_form
- itemSubtype: number_input
- buttonType: -
- dataType: integer
- format: số nguyên dương; đơn vị ngày
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi cột số ngày trong thực thể cấu hình ngưỡng; prototype chưa có thực thể đó nên để trống.
- validationNote:
  Điều kiện: giá trị không phải số nguyên
  Lỗi: "Ngưỡng phải là số nguyên."
  Điều kiện: giá trị nhỏ hơn hoặc bằng không
  Lỗi: "Ngưỡng phải lớn hơn 0 ngày."
- description:
  Mục đích và ngữ cảnh: số ngày trước ngày hết hiệu lực mà profile bắt đầu vào danh sách cảnh báo; là tham số cấu hình được mà FR-PARTY-03 đòi
  Thành phần hiển thị: nhãn Ngưỡng số ngày kèm dấu bắt buộc; một ô nhập số; một dòng gợi ý nói mỗi căn cứ một giá trị riêng
  Chức năng và logic: bắt buộc; số nguyên dương; lưu cho đúng căn cứ tham gia đang chọn chứ không lưu một giá trị dùng chung
- qa: - Ngưỡng có trần trên không; ví dụ 365 ngày? Không có trần thì một giá trị quá lớn làm danh sách cảnh báo mất tác dụng.

### Item 3.3: Trường lý do đổi ngưỡng

- itemId: img-010
- parentNo: 3
- position: startX=293 startY=395 endX=533 endY=490
- nameJP: しきい値変更理由
- nameTrans: Threshold change reason
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
- databaseNote: Thực thể kiểm toán đã có trong prototype và dùng lại được; nhưng thao tác đổi ngưỡng thì chưa tồn tại.
- validationNote:
  Điều kiện: lý do rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập lý do đổi ngưỡng."
- description:
  Mục đích và ngữ cảnh: đổi ngưỡng là đổi quy tắc vận hành chứ không phải đổi một tuỳ chọn hiển thị; nên FR-AUDIT-01 đòi truy được lý do
  Thành phần hiển thị: nhãn Lý do đổi ngưỡng kèm dấu bắt buộc; một ô nhập; một dòng gợi ý về audit
  Chức năng và logic: bắt buộc; ghi vào bản ghi kiểm toán cùng giá trị ngưỡng trước và sau
- qa: -

### Item 3.4: Nút lưu ngưỡng

- itemId: img-011
- parentNo: 3
- position: startX=544 startY=411 endX=634 endY=440
- nameJP: しきい値を保存
- nameTrans: Save threshold
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
- transitionNote: Ở lại màn; nạp lại bảng ngưỡng và cả ba đường danh sách theo ngưỡng mới
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chốt lần đổi ngưỡng cho căn cứ tham gia đang chọn
  Thành phần hiển thị: một nút chữ cạnh hai trường nhập
  Chức năng và logic: sau khi lưu phải nạp lại cả ba danh sách vì đổi ngưỡng đổi luôn tập dòng cảnh báo; không được dùng lại kết quả đã tải trước đó
- qa: -

### Item 3.5: Ghi chú câu hỏi chưa chốt về số ngưỡng

- itemId: img-012
- parentNo: 3
- position: startX=42 startY=503 endX=1010 endY=539
- nameJP: しきい値粒度の未確定事項
- nameTrans: Open question on threshold granularity
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
  Mục đích và ngữ cảnh: khai rõ mức chi tiết của ngưỡng là quyết định của khách chứ không phải chi tiết thi công; nó quyết định khoá của thực thể cấu hình
  Thành phần hiển thị: một đoạn ghi chú có nhãn chưa chốt dưới khối cấu hình
  Chức năng và logic: tĩnh; nêu rõ yêu cầu khách chỉ nói phải cấu hình được và không được gộp 許可 với 承認; mức chi tiết còn lại thì không nói
- qa: - Ngưỡng cảnh báo là một giá trị dùng chung; một giá trị cho mỗi căn cứ tham gia; hay một giá trị cho mỗi phân loại? Chọn sai thì hoặc gộp hai căn cứ mà RFP cấm; hoặc dựng thừa mức chi tiết không ai dùng.

### Item 4: Khối bộ lọc

- itemId: img-013
- parentNo: -
- position: startX=26 startY=578 endX=1026 endY=743
- nameJP: 絞り込みブロック
- nameTrans: Filter block
- itemType: others
- itemSubtype: filter_bar
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
  Mục đích và ngữ cảnh: thu hẹp ba danh sách theo căn cứ tham gia; phân loại; trạng thái hiệu lực; và có bao gồm dòng đã quá hạn hay không
  Thành phần hiển thị: bốn trường lọc nằm ngang; mỗi trường có nhãn và một dòng gợi ý hành vi
  Chức năng và logic: bộ lọc áp cho cả ba đường cùng lúc; bộ lọc phân loại phụ thuộc căn cứ đang chọn
- qa: -

### Item 4.1: Bộ lọc căn cứ tham gia

- itemId: img-014
- parentNo: 4
- position: startX=42 startY=622 endX=276 endY=717
- nameJP: 参加根拠フィルタ
- nameTrans: Participation basis filter
- itemType: dropdown
- itemSubtype: single_select
- buttonType: -
- dataType: string
- format: một trong ba căn cứ tham gia; hoặc tất cả
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: Ở lại màn; nạp lại ba đường theo bộ lọc mới
- databaseTable: participant
- databaseColumn: license_type
- databaseNote: Prototype có cột này nhưng là chuỗi tự do không có CHECK nên có thể tồn tại giá trị không thuộc ba căn cứ nào.
- validationNote:
  Điều kiện: giá trị nằm ngoài ba căn cứ tham gia của FIG-004
  Lỗi: "Căn cứ tham gia không hợp lệ."
- description:
  Mục đích và ngữ cảnh: chọn xem một đường xử lý; ba căn cứ tham gia không có giá trị gộp vì thủ tục gia hạn của chúng khác nhau
  Thành phần hiển thị: nhãn song ngữ Căn cứ tham gia · 参加根拠; ô chọn với lựa chọn Tất cả cộng ba căn cứ; dòng gợi ý nói rõ không có giá trị gộp
  Chức năng và logic: chọn một căn cứ thì chỉ hiện đường tương ứng; lựa chọn Tất cả hiện cả ba khối riêng chứ không trộn thành một danh sách phẳng
- qa: -

### Item 4.2: Bộ lọc phân loại

- itemId: img-015
- parentNo: 4
- position: startX=287 startY=622 endX=521 endY=717
- nameJP: 区分フィルタ
- nameTrans: Category filter
- itemType: dropdown
- itemSubtype: single_select
- buttonType: -
- dataType: string
- format: một trong bốn phân loại; hoặc tất cả
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: Ở lại màn; nạp lại ba đường theo bộ lọc mới
- databaseTable: participant
- databaseColumn: category
- databaseNote: Prototype có CHECK bốn giá trị trên cột này nên tập lựa chọn khớp tầng dữ liệu.
- validationNote:
  Điều kiện: phân loại không thuộc căn cứ tham gia đang chọn
  Lỗi: "Phân loại không thuộc căn cứ tham gia đang chọn."
- description:
  Mục đích và ngữ cảnh: thu hẹp thêm trong một đường; ví dụ đường đăng ký chợ có hai phân loại nên cần tách được
  Thành phần hiển thị: nhãn song ngữ Phân loại · 区分; ô chọn; dòng gợi ý nói rõ tập lựa chọn phụ thuộc căn cứ đang chọn
  Chức năng và logic: tập lựa chọn thu hẹp theo căn cứ đang chọn để không tạo ra cặp phân loại và căn cứ vô nghĩa
- qa: -
