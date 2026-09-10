# Items Analysis - report-viewer

- Screen: SC-26 · Xem và xuất báo cáo
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 2 / 3

### Item 4: Khối bảng kết quả và xuất CSV

- nameJP: 結果テーブル・CSV出力ブロック
- nameTrans: Result table and CSV export block
- itemType: others
- itemSubtype: khối danh sách và xuất dữ liệu
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
  Mục đích và ngữ cảnh: Khung bảng và cơ chế phân trang dùng chung cho cả 12 mã; kèm đường xuất CSV toàn tập đã lọc.
  Thành phần hiển thị: Tiêu đề khối; bảng kết quả với tập cột thay đổi theo mã; khối phân trang; nút Xuất CSV và một ghi chú ba đoạn ở dưới.
  Chức năng và logic: Chỉ đọc dữ liệu; nhưng xuất CSV là một lần công bố dữ liệu đối chiếu nên phải để lại dấu vết kiểm toán.
- qa: -
- bbox: startX 26 · startY 978 · endX 1026 · endY 1255

### Item 4.1: Bảng kết quả báo cáo

- nameJP: レポート結果テーブル
- nameTrans: Report result table
- itemType: table
- itemSubtype: bảng danh sách
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
- databaseNote: Tập cột và nguồn dữ liệu do từng mã báo cáo quy định nên không có một thực thể duy nhất cho bảng này. Prototype dùng một khung bảng chung; tập cột khai theo từng mã.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Hiển thị dữ liệu của mã báo cáo đang xem; mọi mã đi qua cùng một khung bảng.
  Thành phần hiển thị: Bảng có tiêu đề cột dạng Cột 1 đến Cột N để nói rõ tập cột là biến theo mã; ba dòng mẫu với ngày nghiệp vụ; mã giao dịch; tên người tham gia và một số tiền.
  Chức năng và logic: Tập cột do mã báo cáo quy định; khung bảng và cơ chế phân trang là dùng chung. Không mã nào mang cột đường dẫn bằng chứng và không mã nào mang thư điện tử nội bộ.
- qa:
  - Bảng có cần sắp xếp theo cột không; hay thứ tự do từng mã báo cáo định sẵn?
  - Với mã có rất nhiều cột thì bảng cuộn ngang; hay cho người dùng chọn cột hiển thị?
- bbox: startX 42 · startY 1022 · endX 1010 · endY 1137

### Item 4.2: Khối phân trang

- nameJP: ページネーション
- nameTrans: Pagination block
- itemType: pagination
- itemSubtype: khối phân trang
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
  Mục đích và ngữ cảnh: Đi lại giữa các trang kết quả của mã báo cáo đang xem.
  Thành phần hiển thị: Ba thành phần cạnh nhau: nút Trang trước; thẻ chỉ số trang và nút Trang sau.
  Chức năng và logic: Phân trang chỉ áp cho bảng trên màn. Xuất CSV lấy toàn bộ tập đã lọc nên không bị giới hạn theo trang.
- qa: - Số dòng mỗi trang là cố định; hay cho người dùng chọn?
- bbox: startX 42 · startY 1148 · endX 287 · endY 1177

### Item 4.2.1: Nút Trang trước

- nameJP: 前ページボタン
- nameTrans: Previous page button
- itemType: button
- itemSubtype: nút điều hướng trang
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại chính màn ở trang liền trước; giữ nguyên mã báo cáo và bộ lọc.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Về trang kết quả liền trước.
  Thành phần hiển thị: Một nút chữ mang dấu mũi nhọn hướng trái và chữ Trang trước.
  Chức năng và logic: Vô hiệu khi đang ở trang đầu. Giữ nguyên toàn bộ bộ lọc khi đổi trang.
- qa: -
- bbox: startX 42 · startY 1148 · endX 135 · endY 1177

### Item 4.2.2: Thẻ chỉ số trang

- nameJP: ページ番号表示
- nameTrans: Page indicator
- itemType: label
- itemSubtype: thẻ chỉ số
- buttonType: -
- dataType: integer
- format: Trang <trang hiện tại> / <tổng số trang>
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
  Mục đích và ngữ cảnh: Cho biết đang ở trang nào trong tổng bao nhiêu trang của tập đã lọc.
  Thành phần hiển thị: Một thẻ chữ nhỏ giữa hai nút điều hướng; giá trị mẫu Trang 1 / 3.
  Chức năng và logic: Chỉ đọc. Tổng số trang tính từ tổng số dòng khớp bộ lọc; đổi bộ lọc là tính lại.
- qa: -
- bbox: startX 139 · startY 1153 · endX 200 · endY 1173

### Item 4.2.3: Nút Trang sau

- nameJP: 次ページボタン
- nameTrans: Next page button
- itemType: button
- itemSubtype: nút điều hướng trang
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại chính màn ở trang liền sau; giữ nguyên mã báo cáo và bộ lọc.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Sang trang kết quả liền sau.
  Thành phần hiển thị: Một nút chữ mang chữ Trang sau và dấu mũi nhọn hướng phải.
  Chức năng và logic: Vô hiệu khi đang ở trang cuối. Giữ nguyên toàn bộ bộ lọc khi đổi trang.
- qa: -
- bbox: startX 203 · startY 1148 · endX 287 · endY 1177

### Item 4.3: Nút Xuất CSV

- nameJP: CSV出力ボタン
- nameTrans: Export CSV button
- itemType: button
- itemSubtype: nút chính xuất dữ liệu
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Tải một file CSV về máy người dùng; không rời màn.
- databaseTable: -
- databaseColumn: -
- databaseNote: Xuất CSV không ghi dữ liệu nghiệp vụ; nhưng thiết kế đòi ghi một dòng dấu vết kiểm toán cho mỗi lần xuất. Prototype chưa có dòng nào cho đường xuất nên phần mapping để trống.
- validationNote:
  Điều kiện: mã báo cáo phải nằm trong danh mục 12 mã.
  Lỗi: từ chối vì không có mã báo cáo đó.
  Điều kiện: riêng RPT-06 phải có batch code khớp một batch đã tồn tại của đúng ngày nghiệp vụ đang lọc.
  Lỗi: từ chối và nói rõ thiếu batch code hoặc không tìm thấy batch.
- description:
  Mục đích và ngữ cảnh: Lấy toàn bộ tập đã lọc ra file CSV để dùng ngoài hệ thống; kể cả bàn giao cho bộ phận kế toán.
  Thành phần hiển thị: Một nút chữ nhấn mạnh đặt sau khối phân trang.
  Chức năng và logic: Xuất toàn bộ tập đã lọc; không giới hạn theo trang. Mỗi lần xuất là một lần công bố dữ liệu đối chiếu nên phải để lại dấu vết: ai tải; mã báo cáo nào; bộ lọc nào; thời điểm nào.
- qa:
  - Với tập rất lớn thì xuất đồng bộ ngay; hay đưa vào hàng đợi rồi thông báo khi file sẵn sàng?
  - Dấu vết kiểm toán của lần xuất có ghi cả số dòng đã xuất không?
- bbox: startX 297 · startY 1148 · endX 372 · endY 1177

### Item 4.4: Ghi chú tập cột; xuất toàn tập và dấu vết kiểm toán

- nameJP: 出力仕様の注記
- nameTrans: Export rule note
- itemType: label
- itemSubtype: ghi chú khối
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
  Mục đích và ngữ cảnh: Bốn ràng buộc của khung xuất dữ liệu; viết ngay dưới nút để không bị bỏ lúc dựng.
  Thành phần hiển thị: Một đoạn ghi chú bốn ý: tập cột do từng mã quy định nhưng dùng chung khung bảng và phân trang; xuất CSV lấy toàn bộ tập đã lọc; RPT-08 không mang cột đường dẫn bằng chứng và không mang thư điện tử vì bằng chứng điều chỉnh chỉ xem trong SC-20; mọi lần xuất phải để lại dấu vết kiểm toán.
  Chức năng và logic: Thuần hiển thị. Ý thứ ba và thứ tư là hai ràng buộc bảo mật và truy vết; không phải chi tiết trình bày.
- qa: -
- bbox: startX 42 · startY 1180 · endX 1010 · endY 1229

### Item 5: Khối bàn giao kế toán của RPT-06

- nameJP: 会計連携ブロック
- nameTrans: Accounting handover block
- itemType: others
- itemSubtype: khối thao tác riêng theo mã
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
  Mục đích và ngữ cảnh: Phần riêng của RPT-06: tạo batch bàn giao dữ liệu đối chiếu cho hệ kế toán theo IF-ACC-01.
  Thành phần hiển thị: Tiêu đề khối; một đoạn mô tả sáu trường tối thiểu và hai chế độ xem; nút Tạo batch xuất kế toán kèm nhãn giới hạn vai trò; đường sang SC-27 và một ghi chú về tính append-only của batch.
  Chức năng và logic: Chỉ hiện với RPT-06. Dữ liệu bàn giao là bảng đối chiếu ngày sau khi đã lock; chưa lock thì không tạo được batch.
- qa:
  - Trạng thái dòng theo RFP có ba giá trị chờ; đã xác nhận và đã điều chỉnh — điều kiện sinh ra từng giá trị là gì?
  - Hệ kế toán bên nhận cộng dồn theo batch code; hay thay thế batch cũ bằng batch mới của cùng ngày?
- bbox: startX 26 · startY 1268 · endX 1026 · endY 1476

### Item 5.1: Nút Tạo batch xuất kế toán

- nameJP: 会計エクスポートバッチ作成ボタン
- nameTrans: Create accounting export batch button
- itemType: button
- itemSubtype: nút chính có ghi dữ liệu
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Ở lại màn; batch mới xuất hiện trong danh sách batch của ngày và chuyển được sang chế độ xem batch.
- databaseTable: accounting_export_batch
- databaseColumn: -
- databaseNote: Ghi một batch mới kèm ảnh chụp bất biến của các dòng đã gửi và đóng dấu thuế suất cùng cơ sở thuế lên batch. Prototype có bảng này thật; bảng chỉ nhận thêm dòng và không có đường sửa hay xoá.
- validationNote:
  Điều kiện: ngày nghiệp vụ phải đã được lock.
  Lỗi: từ chối kèm câu "Ngày nghiệp vụ chưa lock; không thể tạo batch."
  Điều kiện: ngày nghiệp vụ phải đúng dạng và là ngày lịch thật.
  Lỗi: từ chối kèm câu "Ngày nghiệp vụ không hợp lệ."
  Điều kiện: không có yêu cầu tạo batch khác cho cùng ngày đang chạy.
  Lỗi: từ chối kèm câu "Có nhiều yêu cầu tạo batch cùng lúc; hãy thử lại."
- description:
  Mục đích và ngữ cảnh: Chốt một lần bàn giao dữ liệu đối chiếu sang hệ kế toán; mỗi lần là một batch có mã riêng.
  Thành phần hiển thị: Một nút chữ nhấn mạnh trong khối RPT-06.
  Chức năng và logic: Chỉ bộ phận quyết toán thấy và gọi được; sáu vai trò còn lại không thấy nút và gọi trực tiếp cũng bị chặn. Ngày đã lock là tiền đề; chưa lock thì từ chối.
- qa: -
- bbox: startX 42 · startY 1377 · endX 186 · endY 1406

### Item 5.2: Nhãn giới hạn vai trò của thao tác tạo batch

- nameJP: ロール制限ラベル
- nameTrans: Role restriction label
- itemType: label
- itemSubtype: chú thích giới hạn vai trò
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
  Mục đích và ngữ cảnh: Nói rõ chặn là ở hành động chứ không ở việc vào trang; đây là điểm dễ dựng sai nhất của màn.
  Thành phần hiển thị: Một thẻ chữ mờ đặt cạnh nút Tạo batch; nội dung Chỉ ROLE-SETTLEMENT.
  Chức năng và logic: Cả 7 vai trò vào màn; xem; lọc; phân trang và xuất CSV được. Chỉ riêng thao tác tạo batch bị chặn theo vai trò.
- qa: -
- bbox: startX 189 · startY 1377 · endX 334 · endY 1406

### Item 5.3: Ghi chú batch append-only và đóng dấu thuế

- nameJP: バッチ不変性の注記
- nameTrans: Batch immutability note
- itemType: label
- itemSubtype: ghi chú khối
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
  Mục đích và ngữ cảnh: Hai ràng buộc giữ cho dữ liệu đã bàn giao vẫn tự giải thích được về sau.
  Thành phần hiển thị: Một đoạn ghi chú dưới hàng nút: batch là append-only và chỉ được thay bằng batch mới của cùng ngày; thuế suất cùng cơ sở thuế được đóng dấu lên từng batch.
  Chức năng và logic: Thuần hiển thị. Đóng dấu thuế lên batch là điều kiện để batch cũ còn đọc được sau khi quy tắc thuế đổi.
- qa: -
- bbox: startX 42 · startY 1417 · endX 1010 · endY 1449

### Item 6: Khối liệt kê trạng thái màn

- nameJP: 画面状態一覧ブロック
- nameTrans: Screen state list block
- itemType: others
- itemSubtype: khối tài liệu trạng thái
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
  Mục đích và ngữ cảnh: Liệt kê đủ tám trạng thái màn phải xử lý để không bỏ sót đường rẽ nào lúc dựng.
  Thành phần hiển thị: Tiêu đề khối và tám thẻ trạng thái xếp thành hai hàng bốn cột; mỗi thẻ có tiêu đề và một đoạn mô tả hành vi.
  Chức năng và logic: Thuần hiển thị tài liệu. Hai thẻ cuối khai hai chỗ dễ đọc sai: chặn quyền là ở hành động chứ không ở vào trang; và lock là tiền đề chứ không phải rào chặn.
- qa: -
- bbox: startX 26 · startY 1489 · endX 1026 · endY 1776

### Item 6.1: Thẻ trạng thái Rỗng

- nameJP: 空状態カード
- nameTrans: Empty state card
- itemType: label
- itemSubtype: thẻ trạng thái
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
  Mục đích và ngữ cảnh: Mô tả màn khi bộ lọc hợp lệ nhưng không có dòng nào khớp.
  Thành phần hiển thị: Thẻ tiêu đề Rỗng kèm câu hiển thị Không có dữ liệu khớp với bộ lọc đã chọn và ghi chú vẫn xuất CSV được; file chỉ có dòng header.
  Chức năng và logic: Thuần hiển thị tài liệu. Xuất một file chỉ có header là hợp lệ và có nghĩa: chứng minh đã kiểm và không có dữ liệu.
- qa: -
- bbox: startX 42 · startY 1533 · endX 277 · endY 1659

### Item 6.2: Thẻ trạng thái Bộ lọc thiếu hoặc sai

- nameJP: 絞り込み条件不正カード
- nameTrans: Invalid filter card
- itemType: label
- itemSubtype: thẻ trạng thái
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
  Mục đích và ngữ cảnh: Khai hành vi bắt buộc khi bộ lọc không dùng được; đây là ràng buộc an toàn số liệu.
  Thành phần hiển thị: Thẻ tiêu đề Bộ lọc thiếu hoặc sai kèm mô tả báo lỗi tại field và không âm thầm thay bằng giá trị mặc định vì đọc lệch ngày là sai số liệu đối chiếu.
  Chức năng và logic: Thuần hiển thị tài liệu. Thay giá trị im lặng là chỗ người đọc dễ tưởng đang xem ngày mình chọn.
- qa: -
- bbox: startX 286 · startY 1533 · endX 522 · endY 1659
