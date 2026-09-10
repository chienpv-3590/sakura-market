# Items Analysis - participant-list

Màn tra cứu người tham gia của FN-02. Nguồn chân lý là `FE-005` (Feature List) và `FR-PARTY-01`
(RFP:629): lưu profile theo **bốn** phân loại 卸売業者 / 仲卸 / 売買参加者 / 買出人, **không được
gộp**. Bảng căn cứ tham gia trên màn chép `FIG-004` (RFP:288-294); RFP §02-08 (RFP:309) cấm gộp
許可 và 承認 thành một quy tắc chung. Trạng thái hiệu lực theo `FIG-010` (RFP:609) — bốn giá trị.
Đây là spec **thiết kế**, không phải ảnh của prototype.

Batch 1 of 3 - items 1 .. 4.1

### Item 1: Đầu trang màn danh sách người tham gia

- itemId: img-001
- parentNo: -
- position: startX=26 startY=22 endX=1026 endY=139
- nameJP: 参加者一覧ヘッダー
- nameTrans: Participant list page header
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
  Mục đích và ngữ cảnh: khối đầu trang neo màn vào chuỗi truy vết FE-005 → FN-02 → FR-PARTY-01 để người đọc biết màn phải thoả yêu cầu nào
  Thành phần hiển thị: tiêu đề màn; dòng meta yêu cầu; nhãn trạng thái thi công
  Chức năng và logic: tĩnh — không có thao tác; chỉ định danh màn và phạm vi yêu cầu
- qa: - Đầu trang có cần hiện tổng số người tham gia đang có hiệu lực hôm nay không? Thiết kế không khai con số tổng nào ở đây.

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
  Thành phần hiển thị: mã màn SC-05 và tên màn tiếng Việt
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
  Mục đích và ngữ cảnh: khai chuỗi truy vết để không ai đọc màn này như một danh sách chung chung
  Thành phần hiển thị: mã FE-005; nhóm FN-02; ưu tiên P0; yêu cầu FR-PARTY-01; loại màn List; actor đọc và actor ghi
  Chức năng và logic: văn bản tĩnh — actor ghi tách khỏi actor đọc vì hai trục quyền khác nhau
- qa: - Dòng meta này là chú thích của wireframe hay nội dung sẽ có trên màn thật? Thiết kế không khai.

### Item 1.3: Nhãn trạng thái thi công

- itemId: img-004
- parentNo: 1
- position: startX=58 startY=78 endX=110 endY=97
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
  Mục đích và ngữ cảnh: cho biết màn đã có bản thi công để đối chiếu; không phải một trạng thái nghiệp vụ
  Thành phần hiển thị: một nhãn chữ ngắn
  Chức năng và logic: tĩnh — không đổi theo dữ liệu
- qa: -

### Item 2: Khối bốn phân loại là bốn ranh giới

- itemId: img-005
- parentNo: -
- position: startX=26 startY=155 endX=1026 endY=407
- nameJP: 四区分の境界ブロック
- nameTrans: Four-category boundary block
- itemType: others
- itemSubtype: reference_block
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
  Mục đích và ngữ cảnh: đặt ngay đầu màn quy tắc gốc của FN-02 — bốn phân loại là bốn ranh giới pháp lý; RFP §02-08 cấm gộp 許可 và 承認 thành một quy tắc chung
  Thành phần hiển thị: tiêu đề khối; bảng bốn dòng phân loại theo FIG-004; ghi chú về dòng còn thiếu của 買出人
  Chức năng và logic: khối tham chiếu chỉ đọc — nó là căn cứ cho việc bộ lọc và bảng danh sách không được có giá trị gộp
- qa: -

### Item 2.1: Bảng căn cứ tham gia theo FIG-004

- itemId: img-006
- parentNo: 2
- position: startX=42 startY=200 endX=1010 endY=345
- nameJP: 参加根拠マトリクス
- nameTrans: Participation basis matrix
- itemType: table
- itemSubtype: reference_matrix
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
- databaseColumn: category; license_type
- databaseNote: Cột Phân loại ứng với thực thể người tham gia; cột Điều kiện tham gia ứng với căn cứ tham gia. Prototype có `participant.category` với CHECK bốn giá trị và `participant.license_type` nhưng không có CHECK — cặp chỉ được kiểm ở tầng ứng dụng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chép nguyên bảng FIG-004 để người dùng thấy ba trục khác nhau của một phân loại; đây là căn cứ để cột Căn cứ tham gia trong bảng danh sách không nhập tự do
  Thành phần hiển thị: bốn cột — Phân loại; Điều kiện tham gia; Thực hiện giao dịch; Gỡ tạm ngừng — và bốn dòng phân loại
  Chức năng và logic: chỉ đọc; ba ô của dòng 買出人 mang nhãn chưa chốt vì FIG-004 không có dòng cho phân loại đó
- qa: - Ba ô chưa chốt của 買出人 hiện là nhãn tĩnh; khi khách chốt xong thì màn cập nhật bằng cấu hình hay bằng bản phát hành mới? Thiết kế không khai.

### Item 2.1.1: Hàng phân loại (đại diện cho bốn hàng)

- itemId: img-007
- parentNo: 2.1
- position: startX=43 startY=227 endX=1010 endY=256
- nameJP: 区分行
- nameTrans: Category row
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
- databaseTable: participant
- databaseColumn: category
- databaseNote: Bốn phân loại 卸売業者/仲卸/売買参加者/買出人 khớp CHECK của `participant.category` trong prototype.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một phân loại và ba trục của nó; bốn hàng lặp cùng cấu trúc nên gộp thành một hàng đại diện
  Thành phần hiển thị: tên phân loại tiếng Nhật; căn cứ tham gia; thủ tục thực hiện giao dịch; thủ tục gỡ tạm ngừng
  Chức năng và logic: chỉ đọc; thủ tục gỡ tạm ngừng khác nhau theo phân loại — đó là điều kiện tiền đề trên một cạnh trạng thái duy nhất chứ không phải nhiều cạnh
- qa: -

### Item 2.1.2: Nhãn chưa chốt của dòng 買出人 (đại diện cho ba ô)

- itemId: img-008
- parentNo: 2.1
- position: startX=268 startY=319 endX=337 endY=339
- nameJP: 未確定タグ
- nameTrans: Undecided tag
- itemType: label
- itemSubtype: open_question_tag
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
  Mục đích và ngữ cảnh: đánh dấu chỗ tài liệu khách không có dữ liệu, thay vì lấp bằng suy luận; ba ô của dòng 買出人 dùng cùng một nhãn nên gộp một đại diện
  Thành phần hiển thị: một nhãn chữ ngắn trong ô bảng
  Chức năng và logic: chỉ đọc; ô mang nhãn này không được dùng làm giá trị mặc định ở bất kỳ chỗ nào khác của màn
- qa: - 買出人 dùng thủ tục nào cho ba trục của FIG-004? Câu này phải khách trả lời trước khi màn hiện giá trị thật thay cho nhãn chưa chốt.

### Item 2.2: Ghi chú FIG-004 không có dòng cho 買出人

- itemId: img-009
- parentNo: 2
- position: startX=42 startY=348 endX=1010 endY=380
- nameJP: FIG-004 欠落行の注記
- nameTrans: Note on the missing FIG-004 row
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
  Mục đích và ngữ cảnh: nói thẳng chỗ tài liệu khách thiếu để không ai suy ra căn cứ của 買出人 từ dòng gần giống
  Thành phần hiển thị: một đoạn ghi chú dưới bảng tham chiếu
  Chức năng và logic: tĩnh; kèm hệ quả cho màn — bộ lọc không có lựa chọn gộp kiểu tất cả các loại đối tác vì bốn phân loại luôn đứng riêng
- qa: -

### Item 3: Khối bộ lọc

- itemId: img-010
- parentNo: -
- position: startX=26 startY=420 endX=1026 endY=585
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
  Mục đích và ngữ cảnh: thu hẹp danh sách theo phân loại; trạng thái hiệu lực; và tên — ba trục tra cứu của nhân viên vận hành
  Thành phần hiển thị: ba trường lọc nằm ngang; mỗi trường có nhãn song ngữ và một dòng gợi ý hành vi
  Chức năng và logic: đổi bộ lọc thì nạp lại danh sách; ba trục kết hợp bằng phép và; không có giá trị gộp cho phân loại
- qa: -

### Item 3.1: Bộ lọc phân loại

- itemId: img-011
- parentNo: 3
- position: startX=42 startY=464 endX=357 endY=559
- nameJP: 区分フィルタ
- nameTrans: Category filter
- itemType: dropdown
- itemSubtype: multi_select
- buttonType: -
- dataType: string
- format: một hoặc nhiều giá trị trong tập bốn phân loại
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: Ở lại màn; nạp lại bảng danh sách theo bộ lọc mới
- databaseTable: participant
- databaseColumn: category
- databaseNote: Prototype có CHECK bốn giá trị trên cột này nên tập giá trị lọc khớp tầng dữ liệu; giá trị lạ ở tham số URL hiện bị bỏ qua im lặng trên trang nhưng bị từ chối ở API — hai đường lệch nhau.
- validationNote:
  Điều kiện: giá trị nằm ngoài tập bốn phân loại của FR-PARTY-01
  Lỗi: "Phân loại không hợp lệ."
- description:
  Mục đích và ngữ cảnh: chọn phân loại cần xem; bốn giá trị rời vì FR-PARTY-01 cấm gộp các loại có bản chất khác nhau
  Thành phần hiển thị: nhãn song ngữ Phân loại · 区分; ô chọn với lựa chọn Tất cả cộng bốn phân loại; dòng gợi ý nói rõ chọn được nhiều và không có giá trị gộp
  Chức năng và logic: chọn nhiều giá trị thì lọc theo phép hoặc trong cùng trục; lựa chọn Tất cả nghĩa là không lọc trục này và không phải một giá trị gộp mới
- qa: - Chọn nhiều phân loại cùng lúc thì bộ lọc ghi vào địa chỉ trang thế nào để chia sẻ lại được? Thiết kế không khai cách mã hoá nhiều giá trị.

### Item 3.2: Bộ lọc trạng thái hiệu lực

- itemId: img-012
- parentNo: 3
- position: startX=368 startY=464 endX=684 endY=559
- nameJP: 有効状態フィルタ
- nameTrans: Eligibility status filter
- itemType: dropdown
- itemSubtype: single_select
- buttonType: -
- dataType: string
- format: một giá trị trong tập bốn trạng thái của FIG-010
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: Ở lại màn; nạp lại bảng danh sách theo bộ lọc mới
- databaseTable: participant
- databaseColumn: status
- databaseNote: Prototype có CHECK bốn giá trị FIG-010 trên cột này; đường đi giữa các trạng thái thì chỉ được kiểm ở tầng ứng dụng.
- validationNote:
  Điều kiện: giá trị nằm ngoài bốn trạng thái của FIG-010
  Lỗi: "Trạng thái hiệu lực không hợp lệ."
- description:
  Mục đích và ngữ cảnh: lọc theo trạng thái vòng đời hiệu lực để tách nhóm đang tạm ngừng hoặc đã mất hiệu lực khỏi nhóm còn hiệu lực
  Thành phần hiển thị: nhãn song ngữ Trạng thái hiệu lực · 有効状態; ô chọn; dòng gợi ý liệt đúng bốn trạng thái của FIG-010
  Chức năng và logic: đúng bốn giá trị có hiệu lực; tạm ngừng; mất hiệu lực; xét lại — không có giá trị thứ năm và không có giá trị suy ra
- qa: - Lọc trạng thái có cần thêm một lựa chọn dẫn xuất kiểu đang có hiệu lực hôm nay không? Trạng thái đã lưu và kết luận hiệu lực theo ngày là hai thứ khác nhau.

### Item 3.3: Ô tìm theo tên

- itemId: img-013
- parentNo: 3
- position: startX=695 startY=464 endX=1010 endY=559
- nameJP: 名称検索
- nameTrans: Name search box
- itemType: text_form
- itemSubtype: search
- buttonType: -
- dataType: string
- format: none
- required: false
- minLength: 1
- maxLength: 100
- defaultValue: -
- userAction: -
- transitionNote: Ở lại màn; nạp lại bảng danh sách theo từ khoá
- databaseTable: participant
- databaseColumn: name
- databaseNote: Ứng với cột tên của thực thể người tham gia; prototype có cột `participant.name` không rỗng nhưng chưa có đường lọc theo tên trên màn.
- validationNote:
  Điều kiện: chuỗi tìm kiếm dài hơn giới hạn của trường tên
  Lỗi: "Từ khoá tìm kiếm quá dài."
- description:
  Mục đích và ngữ cảnh: tìm nhanh một người tham gia theo tên khi nhân viên đã biết tên nhưng không biết phân loại
  Thành phần hiển thị: nhãn song ngữ Tên · 名称; một ô nhập với chữ gợi ý Tìm theo tên; dòng gợi ý về cách khớp
  Chức năng và logic: khớp một phần và không phân biệt hoa thường; chữ gợi ý trong ô không phải giá trị mặc định
- qa: - Khớp một phần áp cho cả chuỗi tiếng Nhật lẫn tiếng Việt thế nào; và có cần chuẩn hoá dấu trước khi so không? Thiết kế chỉ nói không phân biệt hoa thường.

### Item 4: Khối bảng danh sách người tham gia

- itemId: img-014
- parentNo: -
- position: startX=26 startY=598 endX=1026 endY=897
- nameJP: 一覧テーブルブロック
- nameTrans: List table block
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
  Mục đích và ngữ cảnh: phần chịu lực của nghiệm thu FR-PARTY-01 — mở màn là thấy được phân loại và trạng thái hiệu lực của từng profile
  Thành phần hiển thị: tiêu đề khối gắn tiêu chí nghiệm thu; bảng sáu cột; hai đoạn ghi chú về cột và về ý nghĩa của badge trạng thái
  Chức năng và logic: đọc theo bộ lọc đang chọn; có phân trang và đếm tổng số dòng khớp bộ lọc
- qa: -

### Item 4.1: Bảng sáu cột người tham gia

- itemId: img-015
- parentNo: 4
- position: startX=42 startY=642 endX=1010 endY=792
- nameJP: 参加者テーブル
- nameTrans: Participant table
- itemType: table
- itemSubtype: data_table
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Bấm ô Tên mở màn SC-06 chi tiết và vòng đời hiệu lực của đúng profile đó
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_from; valid_to
- databaseNote: Sáu cột ánh xạ thẳng sáu cột của thực thể người tham gia; prototype có đủ sáu cột này nhưng `license_type` là chuỗi tự do không có CHECK.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một dòng một profile; sáu cột là bộ tối thiểu để trả lời ai thuộc loại nào và hiệu lực đến khi nào
  Thành phần hiển thị: sáu cột tiêu đề song ngữ Việt–Nhật; các dòng dữ liệu; badge cho cột trạng thái
  Chức năng và logic: cột Tên là đường dẫn sang màn chi tiết SC-06; cột Căn cứ tham gia luôn suy từ phân loại theo FIG-004 và không nhập tự do; danh sách phân trang và đếm tổng để không cắt trần im lặng
- qa: - Sắp xếp mặc định của bảng theo trục nào; và người dùng đổi được thứ tự sắp xếp không? Thiết kế chỉ đòi phân trang và đếm tổng.
