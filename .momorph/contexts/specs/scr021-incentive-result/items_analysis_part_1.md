# Items Analysis - scr021-incentive-result

- Screen: SC-22 · Kết quả tính 完納奨励金
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 1 / 3

### Item 1: Khối đầu màn kết quả tính thưởng

- nameJP: 画面ヘッダー
- nameTrans: Screen header block
- itemType: others
- itemSubtype: khối đầu trang
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
  Mục đích và ngữ cảnh: Định danh màn SC-22 — nơi bộ phận quyết toán đọc kết quả tính 完納奨励金 của một kỳ.
  Thành phần hiển thị: Tiêu đề màn ở dòng trên; dưới là dòng metadata gồm mã FE; mã FN; mức ưu tiên; danh sách yêu cầu khách và thẻ trạng thái dựng.
  Chức năng và logic: Thuần hiển thị; không có tương tác. Vai trò ngoài bộ phận quyết toán không vào được màn nên không thấy khối này.
- qa: -
- bbox: startX 26 · startY 22 · endX 1026 · endY 138

### Item 1.1: Tiêu đề màn

- nameJP: 画面タイトル
- nameTrans: Screen title
- itemType: label
- itemSubtype: tiêu đề trang
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
  Mục đích và ngữ cảnh: Cho biết đang ở màn kết quả tính thưởng; không phải màn quản lý biểu suất.
  Thành phần hiển thị: Một dòng chữ gồm mã màn SC-22 và tên màn Kết quả tính 完納奨励金.
  Chức năng và logic: Tĩnh; không đổi theo kỳ đang xem hay theo vai trò.
- qa: -
- bbox: startX 26 · startY 22 · endX 1026 · endY 48

### Item 1.2: Dòng metadata màn

- nameJP: 画面メタ情報
- nameTrans: Screen metadata line
- itemType: label
- itemSubtype: dòng metadata
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
  Mục đích và ngữ cảnh: Truy được từ màn về đúng tính năng và đúng yêu cầu khách mà màn phải thoả.
  Thành phần hiển thị: Chuỗi phân tách bằng dấu · gồm ba mã FE; hai mã FN; mức ưu tiên; bốn mã yêu cầu khách; actor; mã thi công SCR021_IncentiveResult; loại List chỉ đọc; route /incentive và thẻ trạng thái.
  Chức năng và logic: Tĩnh. FE-043 mang ưu tiên P1 trong khi FE-030 và FE-032 là P0 — khác biệt này ảnh hưởng thứ tự thi công; nêu ngay ở đây để không bị đọc gộp.
- qa: -
- bbox: startX 26 · startY 60 · endX 1026 · endY 115

### Item 1.2.1: Thẻ trạng thái dựng màn

- nameJP: 実装状況タグ
- nameTrans: Build status tag
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
  Mục đích và ngữ cảnh: Cho biết màn đã có bản thi công để đối chiếu; không phải cam kết rằng thiết kế đã đạt.
  Thành phần hiển thị: Một thẻ chữ nhỏ nằm cuối dòng metadata.
  Chức năng và logic: Tĩnh. Thẻ này nói về sự tồn tại của bản thi công; mức đạt hay chưa đạt nằm ở khối đối chiếu prototype cuối màn.
- qa: -
- bbox: startX 400 · startY 95 · endX 452 · endY 115

### Item 2: Khối yêu cầu khách phải thấy trên màn

- nameJP: 受入条件ブロック
- nameTrans: Acceptance criteria block
- itemType: others
- itemSubtype: khối tài liệu yêu cầu
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
  Mục đích và ngữ cảnh: Ghi lại đúng phần Nghiệm thu của bốn yêu cầu khách mà màn này phải chứng minh; để người dựng không phải mở lại tài liệu gốc.
  Thành phần hiển thị: Tiêu đề khối và một bảng hai cột: mã yêu cầu và điều phải thấy được trên màn.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là chuẩn nghiệm thu cho chính màn này; mọi thành phần bên dưới phải truy về được một dòng trong bảng.
- qa: -
- bbox: startX 26 · startY 154 · endX 1026 · endY 358

### Item 2.1: Bảng yêu cầu và điểm nghiệm thu

- nameJP: 要求・受入条件テーブル
- nameTrans: Requirement and acceptance table
- itemType: table
- itemSubtype: bảng tài liệu
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
  Mục đích và ngữ cảnh: Bốn dòng yêu cầu mà màn phải thoả; mỗi dòng nói rõ điều gì phải nhìn thấy được.
  Thành phần hiển thị: Bốn dòng: BR-INC-01 (hệ số 110/100; làm tròn xuống JPY; không gia hạn; JST; quá hạn thì thưởng bằng 0); FR-INC-01 (số tiền tính từ số tiền đủ điều kiện; tỷ lệ chi trả và phiên bản rule đang hiệu lực); FR-INC-03 với FE-032 (delta ở kỳ sau có nguyên nhân rõ ràng; báo cáo kỳ trước giữ nguyên); FR-AUDIT-03 với FE-043 (mở bản ghi là thấy version rule và ngày hiệu lực).
  Chức năng và logic: Bảng tĩnh; không lọc; không sắp xếp. Bốn dòng là cố định theo Feature List của màn.
- qa: -
- bbox: startX 42 · startY 199 · endX 1010 · endY 342

### Item 3: Khối quy tắc nghiệp vụ BR-INC-01

- nameJP: 業務ルールブロック
- nameTrans: Business rule block
- itemType: others
- itemSubtype: khối tài liệu quy tắc
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
  Mục đích và ngữ cảnh: Đưa bảy yếu tố đã cố định của BR-INC-01 lên bề mặt màn; quy tắc sinh ra tiền phải đọc được chứ không nằm ẩn trong cài đặt.
  Thành phần hiển thị: Tiêu đề khối và một bảng ba cột: yếu tố; giá trị khách đã cố định; chỗ nhìn thấy được trên màn.
  Chức năng và logic: Thuần hiển thị. Cột thứ ba là ràng buộc thiết kế: mỗi yếu tố quy tắc phải có một chỗ tương ứng trên màn để kiểm chứng.
- qa: -
- bbox: startX 26 · startY 371 · endX 1026 · endY 661

### Item 3.1: Bảng yếu tố quy tắc và giá trị đã cố định

- nameJP: ルール要素テーブル
- nameTrans: Rule element table
- itemType: table
- itemSubtype: bảng tài liệu
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
  Mục đích và ngữ cảnh: Bảy yếu tố khách đã cố định trong BR-INC-01; kèm nơi kiểm chứng từng yếu tố trên màn.
  Thành phần hiển thị: Bảy dòng: hệ số 110/100; làm tròn xuống cắt phần lẻ theo đơn vị JPY; thời gian gia hạn không áp dụng; quá hạn thanh toán thì thưởng bằng 0 và không chia tỷ lệ; mốc thời gian theo JST và ngày nghiệp vụ; điều chỉnh sau khi chốt sinh delta ở kỳ tiếp theo; version áp dụng theo ngày hiệu lực.
  Chức năng và logic: Bảng tĩnh. Ba yếu tố ràng buộc trực tiếp cách trình bày: không có cột hạn gia hạn; cột số tiền không bao giờ có phần thập phân; dòng 0 JPY là dữ liệu thật kèm nhãn lý do.
- qa: -
- bbox: startX 42 · startY 415 · endX 1010 · endY 645

### Item 4: Khối bộ lọc kỳ và người tham gia

- nameJP: 絞り込みブロック
- nameTrans: Filter block
- itemType: others
- itemSubtype: khối bộ lọc
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
  Mục đích và ngữ cảnh: Chọn kỳ và người tham gia để đọc đúng tập kết quả cần đối chiếu.
  Thành phần hiển thị: Tiêu đề khối; ô chọn Kỳ theo ngày nghiệp vụ JST; ô chọn Người tham gia và nút Xem đặt cùng một hàng.
  Chức năng và logic: Gửi bằng phương thức GET về chính màn; không ghi dữ liệu. Kỳ là điều kiện bắt buộc; người tham gia là điều kiện tuỳ chọn.
- qa: -
- bbox: startX 26 · startY 674 · endX 1026 · endY 839

### Item 4.1: Ô chọn Kỳ — ngày nghiệp vụ JST

- nameJP: 対象期間(営業日 JST)
- nameTrans: Period date input
- itemType: date_picker
- itemSubtype: ô chọn ngày bắt buộc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: true
- minLength: -
- maxLength: -
- defaultValue: Ngày nghiệp vụ JST của hôm nay
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn SC-22 theo kỳ đã chọn.
- databaseTable: incentive_result
- databaseColumn: period
- databaseNote: Điều kiện lọc trên kỳ của kết quả tính thưởng; giá trị bộ lọc không được lưu. Prototype có đúng cột này và lọc theo nó.
- validationNote:
  Điều kiện: giá trị phải đúng dạng YYYY-MM-DD và là một ngày lịch thật.
  Lỗi: báo lỗi ngay tại field; tuyệt đối không âm thầm đổi sang kỳ khác rồi hiện số của kỳ đó.
  Điều kiện: không nhận ngày ở tương lai.
  Lỗi: báo lỗi tại field và giữ nguyên kỳ đang xem.
- description:
  Mục đích và ngữ cảnh: Chọn kỳ cần đọc; một kỳ là một ngày nghiệp vụ JST đã chốt.
  Thành phần hiển thị: Nhãn Kỳ — ngày nghiệp vụ JST kèm dấu bắt buộc; ô ngày mang giá trị mẫu 2026-09-09; dòng gợi ý bên dưới nói mặc định là hôm nay và không chọn được ngày tương lai.
  Chức năng và logic: Mốc thời gian là JST theo BR-INC-01; cột kỳ là ngày nghiệp vụ chứ không phải thời điểm chạy engine. Kỳ chưa chốt thì bảng kết quả rỗng vì thưởng chỉ tính sau khi chốt kỳ ở SC-18.
- qa:
  - Văn bản lỗi hiển thị cho kỳ sai định dạng và cho kỳ ở tương lai là gì?
  - Kỳ mặc định khi mở màn lúc chưa có kỳ nào đã chốt: giữ hôm nay và hiện rỗng; hay nhảy về kỳ đã chốt gần nhất?
- bbox: startX 42 · startY 718 · endX 490 · endY 813

### Item 4.2: Ô chọn Người tham gia

- nameJP: 参加者
- nameTrans: Participant select
- itemType: dropdown
- itemSubtype: ô chọn lọc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn SC-22 theo người tham gia đã chọn.
- databaseTable: participant
- databaseColumn: id
- databaseNote: Lọc kết quả theo người tham gia. Prototype có bảng participant thật; tuy nhiên bộ lọc này chỉ tồn tại ở API, chưa có ô nhập trên màn.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Thu hẹp bảng kết quả về một người tham gia để đối chiếu từng người.
  Thành phần hiển thị: Nhãn Người tham gia; ô chọn mang giá trị mặc định Tất cả; dòng gợi ý nói mỗi kỳ có một dòng cho mỗi người tham gia đủ điều kiện.
  Chức năng và logic: Không bắt buộc; bỏ trống là xem toàn kỳ. Thiết kế đòi bộ lọc này có mặt trên màn chứ không chỉ ở tầng API.
- qa:
  - Danh sách người tham gia trong ô chọn lấy toàn bộ danh mục; hay chỉ những người có kết quả trong kỳ đang xem?
  - Người tham gia đã mất hiệu lực nhưng còn kết quả thưởng cũ có còn xuất hiện trong ô chọn không?
- bbox: startX 501 · startY 718 · endX 948 · endY 813

### Item 4.3: Nút Xem

- nameJP: 表示ボタン
- nameTrans: View button
- itemType: button
- itemSubtype: nút phụ trong hàng lọc
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Nạp lại chính màn SC-22 với kỳ và người tham gia đã chọn; không sang màn khác.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Áp dụng bộ lọc đã chọn cho bảng kết quả kỳ.
  Thành phần hiển thị: Một nút chữ đặt cuối hàng bộ lọc; ngang với hai ô chọn.
  Chức năng và logic: Gửi biểu mẫu bằng phương thức GET; không ghi dữ liệu và không có trạng thái đang gửi vì màn chỉ đọc.
- qa: -
- bbox: startX 959 · startY 735 · endX 1010 · endY 764

### Item 5: Khối kết quả kỳ

- nameJP: 期間別計算結果ブロック
- nameTrans: Period result block
- itemType: others
- itemSubtype: khối danh sách
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
  Mục đích và ngữ cảnh: Nơi đọc số tiền thưởng của kỳ; kèm đủ dữ kiện để giải thích từng con số.
  Thành phần hiển thị: Tiêu đề khối; bảng kết quả bảy cột và một ghi chú ba đoạn ở dưới bảng.
  Chức năng và logic: Chỉ đọc. Không có đường ghi cho người dùng đăng nhập; dòng kết quả do hệ thống sinh khi chốt kỳ hoặc khi duyệt điều chỉnh.
- qa: -
- bbox: startX 26 · startY 852 · endX 1026 · endY 1094

### Item 5.1: Bảng kết quả tính thưởng

- nameJP: 奨励金結果テーブル
- nameTrans: Incentive result table
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
- databaseTable: incentive_result
- databaseColumn: -
- databaseNote: Một dòng bảng là một dòng kết quả tính thưởng của một người tham gia trong một kỳ. Prototype có bảng incentive_result thật với đủ các cột tương ứng; bảng chỉ nhận thêm dòng và không có đường sửa.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Toàn bộ kết quả tính thưởng của kỳ đang lọc; mỗi dòng là một người tham gia.
  Thành phần hiển thị: Bảy cột: Kỳ; Người tham gia; Số tiền (JPY); Loại; Phiên bản biểu suất kèm ngày hiệu lực; Kỳ gốc; Nguyên nhân. Ba dòng mẫu cho ba tình huống: trong hạn; quá hạn về 0 và dòng chênh lệch âm.
  Chức năng và logic: Chỉ đọc; không phân trang trong thiết kế hiện tại. Dòng loại chênh lệch mang phiên bản của kỳ gốc chứ không phải phiên bản hôm nay.
- qa:
  - Bảng có cần phân trang và sắp xếp theo cột không; hay một kỳ luôn đủ nhỏ để hiện hết?
  - Thứ tự mặc định của các dòng trong một kỳ là gì: theo mã người tham gia; theo số tiền giảm dần; hay theo loại?
- bbox: startX 42 · startY 896 · endX 1010 · endY 1016

### Item 5.1.1: Cột Kỳ

- nameJP: 対象期間
- nameTrans: Period column
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
- databaseColumn: period
- databaseNote: Kỳ mà dòng kết quả thuộc về; là ngày nghiệp vụ JST. Prototype có đúng cột này và đặt ràng buộc không rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho biết dòng kết quả thuộc kỳ nào; nền tảng để đối chiếu với bảng đối chiếu ngày.
  Thành phần hiển thị: Ô chữ chỉ đọc dạng YYYY-MM-DD; ví dụ 2026-09-09.
  Chức năng và logic: Là ngày nghiệp vụ JST theo BR-INC-01; không phải thời điểm engine chạy. Với dòng chênh lệch; đây là kỳ mà phần chênh được ghi nhận chứ không phải kỳ gốc.
- qa: -
- bbox: startX 43 · startY 897 · endX 123 · endY 924
