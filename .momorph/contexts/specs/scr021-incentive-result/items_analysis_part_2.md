# Items Analysis - scr021-incentive-result

- Screen: SC-22 · Kết quả tính 完納奨励金
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 2 / 3

### Item 5.1.2: Cột Người tham gia

- nameJP: 参加者
- nameTrans: Participant column
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
- databaseTable: incentive_result
- databaseColumn: participant_id
- databaseNote: Khoá ngoại sang người tham gia; hiển thị lấy tên từ bảng participant. Prototype có cột này và rơi về mã người tham gia khi không ghép được tên.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho biết dòng thưởng thuộc về ai; là trục đối chiếu với bộ phận kế toán.
  Thành phần hiển thị: Ô chữ chỉ đọc mang tên hiển thị của người tham gia.
  Chức năng và logic: Chỉ hiện tên hiển thị hoặc mã; không bao giờ hiện thư điện tử nội bộ vì màn này đọc dữ liệu có thể được xuất tiếp ra ngoài.
- qa: - Khi không ghép được tên người tham gia thì hiện mã người tham gia; hay hiện một nhãn khuyết rõ ràng?
- bbox: startX 123 · startY 897 · endX 239 · endY 924

### Item 5.1.3: Cột Số tiền (JPY)

- nameJP: 金額(JPY)
- nameTrans: Amount column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: integer
- format: số nguyên JPY; có thể âm với dòng chênh lệch
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_result
- databaseColumn: amount_jpy
- databaseNote: Số tiền thưởng đã tính; đơn vị JPY và luôn là số nguyên. Prototype có đúng cột này ở kiểu số nguyên.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Con số nghiệp vụ chính của màn: số tiền 完納奨励金 của một người tham gia trong một kỳ.
  Thành phần hiển thị: Ô chữ chỉ đọc; ba giá trị mẫu là 244 200; 0 và -13 200.
  Chức năng và logic: Làm tròn xuống theo đơn vị JPY nên không bao giờ có phần thập phân. Giá trị 0 là kết quả thật khi thanh toán quá hạn; giá trị âm chỉ xuất hiện ở dòng chênh lệch.
- qa: -
- bbox: startX 239 · startY 897 · endX 331 · endY 924

### Item 5.1.4: Cột Loại

- nameJP: 種別
- nameTrans: Kind column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: string
- format: Bình thường | Chênh lệch (delta)
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_result
- databaseColumn: kind
- databaseNote: Phân biệt dòng tính bình thường và dòng chênh lệch. Prototype có đúng cột này với hai giá trị cho phép.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Phân biệt số tính của chính kỳ đó với phần chênh lệch mang sang từ kỳ trước.
  Thành phần hiển thị: Một thẻ chữ trong ô: Bình thường hoặc Chênh lệch (delta).
  Chức năng và logic: Dòng chênh lệch chỉ sinh ra từ một điều chỉnh đã được duyệt sau khi kỳ gốc đã chốt; kỳ gốc không bị tính lại.
- qa: -
- bbox: startX 331 · startY 897 · endX 449 · endY 924

### Item 5.1.5: Cột Phiên bản biểu suất · ngày hiệu lực

- nameJP: 適用ルールバージョン・発効日
- nameTrans: Rule version and effective date column
- itemType: label
- itemSubtype: cột bảng chỉ đọc
- buttonType: -
- dataType: string
- format: v<số phiên bản> · YYYY-MM-DD
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_result
- databaseColumn: rule_version_id
- databaseNote: Khoá ngoại sang phiên bản biểu suất; hiển thị lấy số phiên bản và ngày hiệu lực từ bảng phiên bản. Prototype có đúng cột này và đặt ràng buộc không rỗng nên không dòng nào thiếu phiên bản.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Chứng minh yêu cầu truy vết: mở một bản ghi thưởng là thấy ngay quy tắc nào sinh ra số tiền.
  Thành phần hiển thị: Ô chữ chỉ đọc dạng v3 · 2026-09-01; luôn có giá trị ở mọi dòng.
  Chức năng và logic: Là cột thường của mọi dòng chứ không phải chi tiết phải bấm mở. Dòng chênh lệch mang phiên bản của kỳ gốc; đổi biểu suất hôm nay không được rỉ vào kỳ cũ.
- qa: -
- bbox: startX 449 · startY 897 · endX 688 · endY 924

### Item 5.1.6: Cột Kỳ gốc

- nameJP: 元の対象期間
- nameTrans: Origin period column
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
- databaseTable: incentive_result
- databaseColumn: origin_period
- databaseNote: Kỳ mà phần chênh lệch trỏ về; rỗng với dòng bình thường. Prototype có đúng cột này và cho phép rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Đường truy vết từ dòng chênh lệch về kỳ đã chốt mà nó điều chỉnh.
  Thành phần hiển thị: Ô chữ chỉ đọc; hiện dấu gạch với dòng bình thường và hiện một ngày với dòng chênh lệch.
  Chức năng và logic: Thiết kế đòi truy vết đi được hai chiều: từ dòng chênh lệch về kỳ gốc bằng cột này; và từ kỳ gốc thấy được kỳ nào đã phát sinh chênh lệch.
- qa: - Chiều ngược lại trình bày thế nào: một cột thêm ở kỳ gốc; một dòng ghi chú dưới bảng; hay một liên kết mở kỳ có chênh lệch?
- bbox: startX 688 · startY 897 · endX 768 · endY 924

### Item 5.1.7: Cột Nguyên nhân

- nameJP: 理由
- nameTrans: Reason column
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
- databaseTable: incentive_result
- databaseColumn: source_correction_id
- databaseNote: Với dòng chênh lệch; nguyên nhân trỏ về yêu cầu điều chỉnh đã sinh ra nó qua khoá ngoại này. Prototype có cột này nhưng chưa đưa lên màn. Nguyên nhân của dòng bình thường (trong hạn hay quá hạn) chưa có cột lưu trong thiết kế nên để trống phần mapping đó.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Giải thích vì sao dòng có con số đó; yêu cầu khách đòi delta phải có nguyên nhân rõ ràng.
  Thành phần hiển thị: Ô chữ chỉ đọc; ba giá trị mẫu là Thanh toán trong hạn; Quá hạn thanh toán → 0 theo BR-INC-01 và Yêu cầu điều chỉnh CR-0007 (SC-21).
  Chức năng và logic: Với dòng bình thường; nguyên nhân nói rõ trong hạn hay quá hạn để dòng 0 JPY không bị đọc thành thiếu dữ liệu. Với dòng chênh lệch; nguyên nhân trỏ về đúng mã yêu cầu điều chỉnh nguồn.
- qa:
  - Nguyên nhân của dòng chênh lệch có phải là một liên kết mở được yêu cầu điều chỉnh ở SC-21; hay chỉ là chữ?
  - Tập giá trị nguyên nhân của dòng bình thường có cố định thành danh mục; hay là câu tự do?
- bbox: startX 768 · startY 897 · endX 1010 · endY 924

### Item 5.2: Ghi chú dưới bảng kết quả

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
  Mục đích và ngữ cảnh: Ba ràng buộc trình bày mà bảng phải giữ; viết ngay dưới bảng để không bị bỏ lúc dựng.
  Thành phần hiển thị: Ba đoạn: cột phiên bản không bao giờ rỗng và không phải chi tiết bấm mở; dòng chênh lệch mang phiên bản của kỳ gốc; cột nguyên nhân của dòng chênh lệch trỏ về đúng yêu cầu điều chỉnh.
  Chức năng và logic: Thuần hiển thị. Đoạn thứ hai là hệ quả của yêu cầu thay đổi quy tắc không được làm biến dạng dữ liệu đã chốt.
- qa: -
- bbox: startX 42 · startY 1019 · endX 1010 · endY 1068

### Item 6: Khối bất biến thiết kế — báo cáo kỳ trước giữ nguyên

- nameJP: 設計不変条件ブロック
- nameTrans: Design invariant block
- itemType: others
- itemSubtype: khối tài liệu bất biến
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
  Mục đích và ngữ cảnh: Khai một bất biến không nhìn thấy được qua ảnh chụp: kỳ đã chốt không bao giờ bị tính lại.
  Thành phần hiển thị: Tiêu đề khối và hai đoạn văn: kỳ đã chốt đọc ra vẫn đúng bằng số hôm chốt kỳ; và truy vết phải đi được hai chiều giữa kỳ gốc và dòng chênh lệch.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là điều kiện nghiệm thu của FE-032; một cài đặt chỉ có chiều từ chênh lệch về kỳ gốc là chưa đạt.
- qa: -
- bbox: startX 26 · startY 1107 · endX 1026 · endY 1227

### Item 7: Khối liệt kê trạng thái màn

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
  Chức năng và logic: Thuần hiển thị tài liệu. Bốn trạng thái đầu là chung cho mọi màn danh sách; bốn trạng thái sau là riêng của nghiệp vụ tính thưởng.
- qa: -
- bbox: startX 26 · startY 1240 · endX 1026 · endY 1510

### Item 7.1: Thẻ trạng thái Rỗng

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
  Mục đích và ngữ cảnh: Mô tả màn khi kỳ đang lọc không có dòng kết quả nào.
  Thành phần hiển thị: Thẻ tiêu đề Rỗng kèm câu hiển thị Chưa có kết quả tính thưởng cho kỳ này và ghi chú chỉ đổi kỳ được.
  Chức năng và logic: Thuần hiển thị tài liệu. Trạng thái rỗng không có nút hành động nào ngoài việc đổi bộ lọc kỳ.
- qa: -
- bbox: startX 42 · startY 1284 · endX 277 · endY 1376

### Item 7.2: Thẻ trạng thái Đang tải và lỗi tải

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
- bbox: startX 286 · startY 1284 · endX 522 · endY 1376

### Item 7.3: Thẻ trạng thái Không có quyền

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
  Mục đích và ngữ cảnh: Mô tả hành vi khi người dùng không thuộc bộ phận quyết toán.
  Thành phần hiển thị: Thẻ tiêu đề Không có quyền kèm mô tả ngoài bộ phận quyết toán thì không vào được màn và cũng không đọc được kết quả qua API.
  Chức năng và logic: Thuần hiển thị tài liệu. Chặn phải áp cả ở đường vào trang và ở đường gọi API; chặn ở một phía là hở.
- qa: -
- bbox: startX 531 · startY 1284 · endX 766 · endY 1376

### Item 7.4: Thẻ trạng thái Kỳ không hợp lệ

- nameJP: 不正な対象期間カード
- nameTrans: Invalid period card
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
  Mục đích và ngữ cảnh: Mô tả hành vi bắt buộc khi giá trị kỳ nhập vào không dùng được.
  Thành phần hiển thị: Thẻ tiêu đề Kỳ không hợp lệ kèm mô tả phải báo rõ kỳ nhập sai và không được âm thầm đổi sang kỳ khác rồi hiện số của kỳ đó.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là ràng buộc an toàn số liệu: đọc lệch kỳ là đọc sai tiền.
- qa: -
- bbox: startX 775 · startY 1284 · endX 1010 · endY 1376

### Item 7.5: Thẻ trạng thái Kỳ chưa chốt

- nameJP: 未締めカード
- nameTrans: Period not locked card
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
  Mục đích và ngữ cảnh: Phân biệt kỳ chưa chốt với kỳ có dữ liệu nhưng bằng không.
  Thành phần hiển thị: Thẻ tiêu đề Kỳ chưa chốt kèm mô tả màn rỗng vì thưởng chỉ tính sau khi chốt kỳ ở SC-18.
  Chức năng và logic: Thuần hiển thị tài liệu. Chốt kỳ ở SC-18 là tiền đề dữ liệu của màn này.
- qa: -
- bbox: startX 42 · startY 1385 · endX 277 · endY 1494

### Item 7.6: Thẻ trạng thái Không có phiên bản đang hiệu lực

- nameJP: 有効バージョンなしカード
- nameTrans: No active rule version card
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
  Mục đích và ngữ cảnh: Mô tả trường hợp không tính được thưởng vì thiếu phiên bản biểu suất đang hiệu lực.
  Thành phần hiển thị: Thẻ tiêu đề Không có phiên bản đang hiệu lực kèm mô tả phải nói rõ nguyên nhân và chỉ đường sang SC-24 thay vì hiện rỗng như không có dữ liệu.
  Chức năng và logic: Thuần hiển thị tài liệu. Rỗng vì thiếu quy tắc và rỗng vì không có dữ liệu là hai nguyên nhân khác nhau; gộp lại là che mất một sự cố vận hành.
- qa: -
- bbox: startX 286 · startY 1385 · endX 522 · endY 1494
