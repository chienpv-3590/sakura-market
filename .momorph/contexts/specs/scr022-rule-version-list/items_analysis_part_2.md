# Items Analysis - scr022-rule-version-list

- Screen: SC-23 · Danh sách phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 2 / 3

### Item 5.1.1: Cột Phiên bản

- nameJP: バージョン
- nameTrans: Version column
- itemType: label
- itemSubtype: cột bảng có liên kết
- buttonType: -
- dataType: integer
- format: v<số nguyên>
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: Bấm số phiên bản mở SC-24 chi tiết phiên bản đó; route /incentive/rules/[id].
- databaseTable: incentive_rule_version
- databaseColumn: version_no
- databaseNote: Số phiên bản; duy nhất trên toàn bảng và do server tự sinh. Prototype có đúng cột này kèm chỉ mục duy nhất.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Định danh phiên bản và là đường vào màn duyệt hoặc rollback của chính phiên bản đó.
  Thành phần hiển thị: Ô chữ chỉ đọc dạng v4; v3; v2; v1 và là liên kết.
  Chức năng và logic: Do hệ thống tự đặt khi tạo bản nháp; người lập không nhập được. Số phiên bản không bị dùng lại kể cả sau rollback.
- qa: -
- bbox: startX 43 · startY 756 · endX 144 · endY 783

### Item 5.1.2: Cột Nội dung biểu suất

- nameJP: 料率内容
- nameTrans: Rate table content column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: string
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: rate_table
- databaseNote: Nội dung biểu suất của phiên bản. Prototype có cột này nhưng chỉ ghi vào như dữ liệu mô tả; engine tính thưởng không đọc nó và màn cũng không hiện nội dung.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho quản trị rule đọc được phiên bản này khác phiên bản trước ở chỗ nào; đây là điểm nghiệm thu của NFR-OPS-02.
  Thành phần hiển thị: Ô chữ chỉ đọc; giá trị mẫu Hệ số 110/100 · tỷ lệ chi trả; riêng dòng chờ duyệt có thêm chú thích xem [CHƯA CHỐT].
  Chức năng và logic: Cột này là bắt buộc theo thiết kế: không đọc được nội dung thì không nghiệm thu được việc đổi rule bằng version mới. Tập tham số cụ thể còn chờ khách chốt.
- qa: - Cột này hiện đầy đủ nội dung biểu suất; hay chỉ hiện phần khác so với phiên bản trước và mở chi tiết ở SC-24?
- bbox: startX 144 · startY 756 · endX 505 · endY 783

### Item 5.1.3: Cột Ngày hiệu lực

- nameJP: 発効日
- nameTrans: Effective date column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: effective_from
- databaseNote: Ngày phiên bản bắt đầu chi phối cách tính. Prototype có đúng cột này với ràng buộc không rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho biết từ ngày nào phiên bản bắt đầu chi phối cách tính thưởng ở SC-22.
  Thành phần hiển thị: Ô chữ chỉ đọc dạng YYYY-MM-DD; bốn giá trị mẫu từ 2026-07-01 đến 2026-10-01.
  Chức năng và logic: Có thể là ngày trong tương lai; khi đó phiên bản đã duyệt vẫn chưa chi phối cách tính. Ngày hiệu lực là mốc duy nhất quyết định phiên bản nào áp cho một kỳ.
- qa: -
- bbox: startX 505 · startY 756 · endX 638 · endY 783

### Item 5.1.4: Cột Trạng thái

- nameJP: 状態
- nameTrans: Status column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: string
- format: Chờ duyệt | Đã duyệt; chờ tới ngày hiệu lực | Đang hiệu lực | Đã bị thay thế | Đã rollback
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: status
- databaseNote: Trạng thái vòng đời của phiên bản. Prototype chỉ lưu ba giá trị; hai trạng thái còn lại được tính lúc đọc nên nhãn của một dòng tự đổi khi qua ngày.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho biết phiên bản đang ở đâu trong vòng đời kiểm soát thay đổi.
  Thành phần hiển thị: Một thẻ chữ trong ô; bốn giá trị mẫu là Chờ duyệt; Đang hiệu lực; Đã bị thay thế và Đã rollback.
  Chức năng và logic: Trạng thái là một chuỗi không quay lui: chờ duyệt sang đã duyệt chờ tới ngày hiệu lực sang đang hiệu lực sang đã bị thay thế. Rollback là một nhánh riêng và phải truy vết được ở SC-24.
- qa: -
- bbox: startX 638 · startY 756 · endX 765 · endY 783

### Item 5.1.5: Cột Người lập

- nameJP: 作成者
- nameTrans: Maker column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: string
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: created_by
- databaseNote: Người tạo phiên bản; là một trong hai cột quyết định điều kiện maker-checker. Prototype có đúng cột này; nhưng hiển thị rơi về thư điện tử nội bộ khi tên hiển thị rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Nửa thứ nhất của cặp maker-checker mà FR-RULE-01 đòi ghi nhận.
  Thành phần hiển thị: Ô chữ chỉ đọc mang tên hiển thị của người tạo phiên bản.
  Chức năng và logic: Chỉ hiện tên hiển thị hoặc mã người dùng; không bao giờ hiện thư điện tử nội bộ. Giá trị này là căn cứ để SC-24 từ chối người tự duyệt bản của mình.
- qa: - Khi không có tên hiển thị thì cột này rơi về mã người dùng; đúng như kỷ luật của báo cáo log điều chỉnh sau lock?
- bbox: startX 765 · startY 756 · endX 887 · endY 783

### Item 5.1.6: Cột Người duyệt

- nameJP: 承認者
- nameTrans: Checker column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: string
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: approved_by
- databaseNote: Người phê duyệt phiên bản; rỗng khi phiên bản còn chờ duyệt. Prototype có đúng cột này; hiển thị cùng chuỗi rơi về thư điện tử như cột người lập.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Nửa thứ hai của cặp maker-checker; chứng minh phiên bản đã qua cổng phê duyệt.
  Thành phần hiển thị: Ô chữ chỉ đọc mang tên hiển thị của người phê duyệt; hiện dấu gạch với phiên bản còn chờ duyệt.
  Chức năng và logic: Rỗng là hợp lệ và có nghĩa: phiên bản chưa qua cổng duyệt nên chưa được chi phối cách tính. Người duyệt luôn phải khác người lập theo GOV-RULE-01.
- qa: -
- bbox: startX 887 · startY 756 · endX 1010 · endY 783

### Item 5.2: Ghi chú dưới bảng danh sách

- nameJP: テーブル下の注記
- nameTrans: Table footnote
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
  Mục đích và ngữ cảnh: Ba ràng buộc thiết kế mà bảng phải giữ; viết ngay dưới bảng để không bị bỏ lúc dựng.
  Thành phần hiển thị: Ba đoạn: cột nội dung biểu suất là bắt buộc để nghiệm thu NFR-OPS-02; trạng thái là chuỗi không quay lui và rollback là nhánh riêng; phiên bản đã bị thay thế hoặc đã rollback không bị xoá.
  Chức năng và logic: Thuần hiển thị. Đoạn thứ ba là hệ quả của yêu cầu truy vết: kết quả thưởng cũ ở SC-22 còn trỏ về các phiên bản đó.
- qa: -
- bbox: startX 42 · startY 908 · endX 1010 · endY 957

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
  Mục đích và ngữ cảnh: Liệt kê đủ bảy trạng thái màn phải xử lý để không bỏ sót đường rẽ nào lúc dựng.
  Thành phần hiển thị: Tiêu đề khối và bảy thẻ trạng thái xếp thành hai hàng; mỗi thẻ có tiêu đề và một đoạn mô tả hành vi.
  Chức năng và logic: Thuần hiển thị tài liệu. Hai trạng thái rỗng được tách riêng vì rỗng do lọc và rỗng do chưa có dữ liệu dẫn tới hai hành động khác nhau.
- qa: -
- bbox: startX 26 · startY 997 · endX 1026 · endY 1233

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
  Mục đích và ngữ cảnh: Mô tả màn khi chưa có phiên bản biểu suất nào trong hệ thống.
  Thành phần hiển thị: Thẻ tiêu đề Rỗng kèm câu hiển thị Chưa có phiên bản biểu suất nào và ghi chú vẫn tạo được phiên bản mới.
  Chức năng và logic: Thuần hiển thị tài liệu. Màn không cần dữ liệu tiền đề nên trạng thái rỗng vẫn giữ đường sang SC-24.
- qa: -
- bbox: startX 42 · startY 1041 · endX 277 · endY 1133

### Item 6.2: Thẻ trạng thái Rỗng do lọc

- nameJP: 絞り込み結果ゼロカード
- nameTrans: Empty by filter card
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
  Mục đích và ngữ cảnh: Phân biệt rỗng vì bộ lọc không khớp với rỗng vì chưa có dữ liệu.
  Thành phần hiển thị: Thẻ tiêu đề Rỗng do lọc kèm mô tả có dữ liệu nhưng lọc không khớp và phải nói rõ là do lọc.
  Chức năng và logic: Thuần hiển thị tài liệu. Hai nguyên nhân rỗng dẫn tới hai hành động khác nhau: bỏ lọc; hay tạo phiên bản mới.
- qa: -
- bbox: startX 286 · startY 1041 · endX 522 · endY 1133

### Item 6.3: Thẻ trạng thái Đang tải và lỗi tải

- nameJP: 読み込み・読み込み失敗カード
- nameTrans: Loading and load error card
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
  Mục đích và ngữ cảnh: Mô tả hai trạng thái nạp dữ liệu của màn.
  Thành phần hiển thị: Thẻ tiêu đề Đang tải / lỗi tải kèm mô tả khung trang hiện trước và lỗi truy vấn thì báo kèm nút tải lại.
  Chức năng và logic: Thuần hiển thị tài liệu. Lỗi truy vấn phải cho người dùng thử lại; không được để màn trắng.
- qa: -
- bbox: startX 531 · startY 1041 · endX 766 · endY 1133

### Item 6.4: Thẻ trạng thái Không có quyền

- nameJP: 権限なしカード
- nameTrans: No permission card
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
  Mục đích và ngữ cảnh: Mô tả hành vi khi người dùng không thuộc quản trị rule.
  Thành phần hiển thị: Thẻ tiêu đề Không có quyền kèm mô tả ngoài quản trị rule thì không vào được màn và cũng không đọc được danh sách qua API.
  Chức năng và logic: Thuần hiển thị tài liệu. Chặn phải áp cả ở đường vào trang và ở đường gọi API; chặn ở một phía là hở.
- qa: -
- bbox: startX 775 · startY 1041 · endX 1010 · endY 1133

### Item 6.5: Thẻ trạng thái Hết hạn mức trong năm

- nameJP: 年間上限到達カード
- nameTrans: Annual quota exhausted card
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
  Mục đích và ngữ cảnh: Mô tả hành vi màn khi đã dùng hết 4 lần đổi rule trong năm.
  Thành phần hiển thị: Thẻ tiêu đề Hết hạn mức trong năm kèm mô tả đã dùng 4 trên 4 lần; nút tạo tắt và nói rõ hạn mức GOV-RULE-01 cùng mốc năm được tính.
  Chức năng và logic: Thuần hiển thị tài liệu. Nói rõ mốc năm là bắt buộc vì mốc năm còn đang chờ khách chốt.
- qa: -
- bbox: startX 42 · startY 1142 · endX 277 · endY 1217

### Item 6.6: Thẻ trạng thái Chưa có phiên bản hiệu lực

- nameJP: 有効バージョンなしカード
- nameTrans: No active version card
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
  Mục đích và ngữ cảnh: Cảnh báo một sự cố vận hành: không có phiên bản hiệu lực thì SC-22 không tính được thưởng.
  Thành phần hiển thị: Thẻ tiêu đề Chưa có phiên bản hiệu lực kèm mô tả cảnh báo rõ và kèm đường sang SC-24 để duyệt.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là cảnh báo chủ động; không phải một trạng thái rỗng bình thường.
- qa: -
- bbox: startX 286 · startY 1142 · endX 522 · endY 1217

### Item 6.7: Thẻ trạng thái Chỉ đọc

- nameJP: 読み取り専用カード
- nameTrans: Read-only card
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
  Mục đích và ngữ cảnh: Khai rằng màn không ghi gì; mọi thao tác ghi nằm ở màn khác.
  Thành phần hiển thị: Thẻ tiêu đề Chỉ đọc kèm mô tả mọi thao tác tạo; duyệt và rollback nằm ở SC-24.
  Chức năng và logic: Thuần hiển thị tài liệu. Vì không có đường ghi nên màn không có trạng thái đang gửi hay gửi lỗi.
- qa: -
- bbox: startX 531 · startY 1142 · endX 766 · endY 1217
