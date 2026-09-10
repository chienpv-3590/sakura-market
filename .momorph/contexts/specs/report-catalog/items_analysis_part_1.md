# Items Analysis - SC-25 · Danh mục báo cáo

## Screen context

- **screen**: SC-25 · Danh mục báo cáo
- **source-family**: image
- **source-token**: SC-25-danh-muc-bao-cao
- **source-image**: .momorph/shots/SC-25-danh-muc-bao-cao.png
- **canvas**: 1280 x 1544 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-033 · FE-034 (FN-10) · ưu tiên P0
- **requirement-refs**: FR-RPT-01 (RFP:707) · FR-RPT-03 (RFP:709) · TBL-REPORT-01 (RFP:740-757)
- **data-domain**: D-SETTLE · D-TRADE · D-DELIVERY (RFP:707) — màn danh mục không đọc thực thể nghiệp vụ nào
- **actor**: Mọi người dùng nội bộ đang hoạt động — cả 7 vai trò
- **note**: Danh mục là hằng của yêu cầu khách: đúng 12 mã, không thêm không bớt
- **batch**: 1/2 (15 items)

### Item 1: Khối đầu trang màn danh mục báo cáo

- **itemId**: img-001
- **itemName**: Khối đầu trang màn danh mục báo cáo
- **nameJP**: レポートカタログヘッダー
- **nameTrans**: Report catalog page header
- **itemType**: others
- **itemSubtype**: screen_header
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: neo màn vào chuỗi truy vết FE-033 và FE-034 → FN-10 → FR-RPT-01; FR-RPT-03; TBL-REPORT-01
  Thành phần hiển thị: tiêu đề màn; hai dòng meta truy vết; nhãn trạng thái thi công
  Chức năng và logic: tĩnh — chỉ định danh màn và phạm vi yêu cầu
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=139

### Item 1.1: Tiêu đề màn

- **itemId**: img-002
- **itemName**: Tiêu đề màn
- **nameJP**: 画面タイトル
- **nameTrans**: Screen title
- **itemType**: label
- **itemSubtype**: heading
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: định danh màn trong bộ 32 màn của thiết kế
  Thành phần hiển thị: mã màn SC-25 và tên màn tiếng Việt
  Chức năng và logic: văn bản tĩnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=22 endX=1026 endY=48

### Item 1.2: Dòng meta truy vết yêu cầu

- **itemId**: img-003
- **itemName**: Dòng meta truy vết yêu cầu
- **nameJP**: 要件トレース行
- **nameTrans**: Requirement trace meta line
- **itemType**: label
- **itemSubtype**: screen_meta
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai chuỗi truy vết và nói rõ màn mở cho cả bảy vai trò
  Thành phần hiển thị: hai dòng meta: một dòng tính năng; nhóm chức năng; ưu tiên và yêu cầu; một dòng mã thi công và route
  Chức năng và logic: văn bản tĩnh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=60 endX=1026 endY=116

### Item 1.3: Nhãn trạng thái thi công

- **itemId**: img-004
- **itemName**: Nhãn trạng thái thi công
- **nameJP**: 実装状況タグ
- **nameTrans**: Build status tag
- **itemType**: label
- **itemSubtype**: status_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Đã dựng
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cho biết màn đã có bản thi công để đối chiếu
  Thành phần hiển thị: một nhãn chữ
  Chức năng và logic: tĩnh — giá trị đến từ trạng thái roster
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=324 startY=96 endX=376 endY=116

### Item 2: Khối điểm vào chung của 12 báo cáo bắt buộc

- **itemId**: img-005
- **itemName**: Khối điểm vào chung của 12 báo cáo bắt buộc
- **nameJP**: 共通入口パネル
- **nameTrans**: Shared entry point panel
- **itemType**: others
- **itemSubtype**: list_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: một điểm vào duy nhất cho toàn bộ danh mục báo cáo bắt buộc; thoả FR-RPT-01 về catalog bắt buộc
  Thành phần hiển thị: một bảng năm cột với đúng 12 dòng kèm một chú thích ràng buộc nguyên trạng
  Chức năng và logic: chỉ đọc; bấm mã báo cáo là sang màn xem và xuất báo cáo đó
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=155 endX=1026 endY=637

### Item 2.1: Bảng danh mục báo cáo năm cột

- **itemId**: img-006
- **itemName**: Bảng danh mục báo cáo năm cột
- **nameJP**: レポートカタログテーブル
- **nameTrans**: Report catalog table
- **itemType**: table
- **itemSubtype**: data_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: bản sao nguyên trạng của TBL-REPORT-01 để người dùng thấy hệ thống có đúng những báo cáo nào
  Thành phần hiển thị: năm cột: mã; tên báo cáo bắt buộc; tần suất; bộ lọc bắt buộc; nhóm tính năng
  Chức năng và logic: chỉ đọc; luôn đúng 12 dòng vì danh mục là hằng của yêu cầu khách chứ không phải dữ liệu nghiệp vụ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Bảng có cần cột trạng thái cho biết mã nào đang chạy trên dữ liệu thật và mã nào còn dữ liệu mẫu không? Yêu cầu khách chỉ liệt 12 mã nên cột này là quyết định thiết kế cần chủ đầu tư chấp thuận.
- **position**: startX=42 startY=200 endX=1010 endY=574

### Item 2.1.1: Hàng tiêu đề năm cột

- **itemId**: img-007
- **itemName**: Hàng tiêu đề năm cột
- **nameJP**: テーブル見出し行
- **nameTrans**: Table header row
- **itemType**: label
- **itemSubtype**: table_header
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: gọi tên năm cột của danh mục
  Thành phần hiển thị: năm ô tiêu đề chữ tiếng Việt
  Chức năng và logic: tĩnh; không sắp xếp được theo cột vì thứ tự mã là thứ tự của yêu cầu khách
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=43 startY=200 endX=1010 endY=227

### Item 2.1.2: Dòng báo cáo (đại diện cho 12 dòng)

- **itemId**: img-008
- **itemName**: Dòng báo cáo (đại diện cho 12 dòng)
- **nameJP**: レポート行
- **nameTrans**: Report row
- **itemType**: label
- **itemSubtype**: table_row
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: mã dạng RPT-NN
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mỗi dòng là một báo cáo bắt buộc; bấm mã là vào chạy báo cáo đó
  Thành phần hiển thị: năm ô dữ liệu; ô mã là một liên kết chữ
  Chức năng và logic: chỉ đọc; 12 dòng chỉ khác nhau ở giá trị nên gộp thành một dòng đại diện; cột bộ lọc phải lấy cùng nguồn với form lọc ở màn xem báo cáo
- **userAction**: on_click
- **transitionNote**: Mở SC-26 xem và xuất báo cáo của đúng mã trên dòng; mã không có trong danh mục thì trả 404
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=43 startY=227 endX=1010 endY=256

### Item 2.2: Ghi chú ràng buộc nguyên trạng danh mục

- **itemId**: img-009
- **itemName**: Ghi chú ràng buộc nguyên trạng danh mục
- **nameJP**: カタログ不変注記
- **nameTrans**: Catalog immutability note
- **itemType**: label
- **itemSubtype**: inline_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chốt hai ràng buộc: danh mục đúng 12 dòng; và cột bộ lọc phải cùng nguồn với form lọc của màn xem báo cáo
  Thành phần hiển thị: một đoạn chú thích hai dòng dẫn TBL-REPORT-01 và SC-26
  Chức năng và logic: tĩnh; là ràng buộc thiết kế nối SC-25 với SC-26
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=577 endX=1010 endY=610

### Item 3: Khối khung dùng chung cho cả 12 mã

- **itemId**: img-010
- **itemName**: Khối khung dùng chung cho cả 12 mã
- **nameJP**: 共通フレームパネル
- **nameTrans**: Shared framework panel
- **itemType**: others
- **itemSubtype**: detail_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai ba cơ chế mà cả 12 báo cáo dùng chung; đây là toàn bộ nội dung của FE-033
  Thành phần hiển thị: ba trường chỉ đọc mô tả bộ lọc; phân trang và xuất CSV; một chú thích ranh giới phạm vi
  Chức năng và logic: chỉ đọc; ba cơ chế này dựng một lần rồi dùng cho mọi mã kể cả nhóm báo cáo tháng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=650 endX=1026 endY=858

### Item 3.1: Trường cơ chế bộ lọc dùng chung

- **itemId**: img-011
- **itemName**: Trường cơ chế bộ lọc dùng chung
- **nameJP**: 共通フィルター方式
- **nameTrans**: Shared filter mechanism
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Một form, chỉ hiện field mà mã đang xem khai
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: một form lọc duy nhất phục vụ 12 mã thay vì 12 form riêng
  Thành phần hiển thị: nhãn; một ô chỉ đọc mô tả cơ chế; một chú thích dẫn nguồn field và chỉ chỗ chi tiết
  Chức năng và logic: form hiện đúng những field mà mã đang xem khai; danh sách field lấy từ cột bộ lọc của yêu cầu khách
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Bộ lọc bắt buộc của mỗi mã có phải điều kiện để chạy báo cáo; hay chỉ là tiêu chí tuỳ chọn? Cột Bộ lọc của yêu cầu khách không nói field đó bắt buộc hay không.
- **position**: startX=42 startY=694 endX=357 endY=789

### Item 3.2: Trường cơ chế phân trang dùng chung

- **itemId**: img-012
- **itemName**: Trường cơ chế phân trang dùng chung
- **nameJP**: 共通ページング方式
- **nameTrans**: Shared pagination mechanism
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Kích thước trang cố định, số trang đi qua URL
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: một cơ chế phân trang duy nhất cho mọi mã để trạng thái xem chia sẻ lại được qua đường dẫn
  Thành phần hiển thị: nhãn; một ô chỉ đọc mô tả cơ chế; một chú thích nói rõ áp cho cả nhóm báo cáo tháng
  Chức năng và logic: kích thước trang cố định; số trang mang trên đường dẫn nên mở lại đúng trang đang xem
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Kích thước trang cố định là bao nhiêu dòng? Nguồn thiết kế không cho con số nào và số này ảnh hưởng trực tiếp tới ngưỡng hiệu năng của truy vấn báo cáo.
- **position**: startX=368 startY=694 endX=684 endY=789

### Item 3.3: Trường cơ chế xuất CSV dùng chung

- **itemId**: img-013
- **itemName**: Trường cơ chế xuất CSV dùng chung
- **nameJP**: 共通CSV出力方式
- **nameTrans**: Shared CSV export mechanism
- **itemType**: label
- **itemSubtype**: readonly_field
- **buttonType**: -
- **dataType**: string
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: Lấy toàn bộ tập đã lọc, không giới hạn theo trang
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: thoả nghiệm thu của FR-RPT-01 về xuất CSV; và chốt rằng bản xuất không bị cắt theo trang đang xem
  Thành phần hiển thị: nhãn; một ô chỉ đọc mô tả cơ chế; một chú thích dẫn nghiệm thu
  Chức năng và logic: xuất toàn bộ tập đã lọc chứ không chỉ trang hiện tại; phải có đủ trường bắt buộc của mã
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Bản xuất CSV có trần số dòng hay có cần chạy nền khi tập quá lớn không? Yêu cầu khách đòi xuất được toàn bộ tập đã lọc nhưng không nói giới hạn nào.
- **position**: startX=695 startY=694 endX=1010 endY=789

### Item 3.4: Ghi chú ranh giới phạm vi báo cáo

- **itemId**: img-014
- **itemName**: Ghi chú ranh giới phạm vi báo cáo
- **nameJP**: スコープ境界注記
- **nameTrans**: Report scope boundary note
- **itemType**: label
- **itemSubtype**: inline_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chốt ranh giới phạm vi của FN-10 để không ai dựng thêm công cụ tự tạo báo cáo
  Thành phần hiển thị: một đoạn chú thích ba dòng dẫn FR-RPT-03 và FN-10
  Chức năng và logic: tĩnh; là ràng buộc phạm vi cho toàn nhóm chức năng báo cáo
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=799 endX=1010 endY=831

### Item 4: Khối trạng thái màn

- **itemId**: img-015
- **itemName**: Khối trạng thái màn
- **nameJP**: 画面状態パネル
- **nameTrans**: Screen state panel
- **itemType**: others
- **itemSubtype**: state_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt đủ trạng thái màn phải xử lý; phần lớn là không áp dụng vì màn chỉ đọc một hằng
  Thành phần hiển thị: bảy thẻ trạng thái xếp hai hàng
  Chức năng và logic: tĩnh; là phần đặc tả đi kèm màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=871 endX=1026 endY=1107

