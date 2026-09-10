# Items Analysis - report-viewer

- Screen: SC-26 · Xem và xuất báo cáo
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 1 / 3

### Item 1: Khối đầu màn xem và xuất báo cáo

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
  Mục đích và ngữ cảnh: Định danh màn SC-26 — nơi mọi người dùng nội bộ xem một mã báo cáo theo bộ lọc rồi xuất CSV.
  Thành phần hiển thị: Tiêu đề màn ở dòng trên; dưới là dòng metadata gồm ba mã FE; mã FN; mức ưu tiên; danh sách yêu cầu khách; actor và thẻ trạng thái dựng.
  Chức năng và logic: Thuần hiển thị; không có tương tác. Màn dùng chung cho cả 12 mã báo cáo; mã đang xem nằm ở tham số route.
- qa: -
- bbox: startX 26 · startY 22 · endX 1026 · endY 140

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
  Mục đích và ngữ cảnh: Cho biết đang ở màn xem dữ liệu báo cáo; không phải màn danh mục báo cáo SC-25.
  Thành phần hiển thị: Một dòng chữ gồm mã màn SC-26 và tên màn Xem và xuất báo cáo.
  Chức năng và logic: Tĩnh; không đổi theo mã báo cáo đang xem.
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
  Mục đích và ngữ cảnh: Truy được từ màn về đúng ba nhóm tính năng và đúng yêu cầu khách mà màn phải thoả.
  Thành phần hiển thị: Chuỗi phân tách bằng dấu · gồm ba mã FE kèm dải mã báo cáo của từng nhóm; mã FN-10; mức ưu tiên tách theo nhóm; ba mã yêu cầu khách; actor cả 7 vai trò kèm ngoại lệ tạo batch chỉ dành cho bộ phận quyết toán; mã thi công SCR026_ReportViewer; route /reports/[reportCode] và thẻ trạng thái.
  Chức năng và logic: Tĩnh. Dòng này khai rõ hai mức ưu tiên khác nhau trong cùng một màn: nhóm ngày và nhóm kế toán là P0; nhóm tháng là P1.
- qa: -
- bbox: startX 26 · startY 60 · endX 1026 · endY 117

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
  Mục đích và ngữ cảnh: Cho biết màn đã có bản thi công để đối chiếu; không phải cam kết rằng cả 12 mã báo cáo đã chạy thật.
  Thành phần hiển thị: Một thẻ chữ nhỏ nằm cuối dòng metadata.
  Chức năng và logic: Tĩnh. Số mã chạy thật và số mã còn dùng dữ liệu mẫu nằm ở khối đối chiếu prototype cuối màn.
- qa: -
- bbox: startX 391 · startY 97 · endX 444 · endY 117

### Item 2: Khối ba nhóm báo cáo và bộ lọc bắt buộc

- nameJP: レポートカタログブロック
- nameTrans: Report catalog block
- itemType: others
- itemSubtype: khối tài liệu danh mục
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
  Mục đích và ngữ cảnh: Liệt đủ 12 mã báo cáo bắt buộc của khách; kèm bộ lọc bắt buộc của từng mã.
  Thành phần hiển thị: Tiêu đề khối; một bảng bốn cột gộp dòng theo ba nhóm FE và một ghi chú về yêu cầu báo cáo tháng.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là toàn bộ bề mặt báo cáo: 12 mã cố định; không có đường tự tạo mã mới hay tự tạo mẫu báo cáo.
- qa: -
- bbox: startX 26 · startY 156 · endX 1026 · endY 637

### Item 2.1: Bảng danh mục 12 mã báo cáo

- nameJP: 12レポートカタログテーブル
- nameTrans: Twelve report catalog table
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
  Mục đích và ngữ cảnh: Đầy đủ 12 mã báo cáo của TBL-REPORT-01; chia theo ba nhóm tính năng và kèm bộ lọc bắt buộc.
  Thành phần hiển thị: Mười hai dòng trong bốn cột nhóm FE; mã; nội dung; bộ lọc bắt buộc. Nhóm FE-034 gồm RPT-01 đến RPT-05; nhóm FE-035 gồm RPT-06 đến RPT-09; nhóm FE-036 gồm RPT-10 đến RPT-12.
  Chức năng và logic: Bảng tĩnh; không lọc. Cột bộ lọc bắt buộc quyết định biểu mẫu bên dưới hiện field nào cho mã đang xem.
- qa:
  - Với mỗi mã; tập cột đầu ra được chốt ở đâu: trong tài liệu này; hay trong một phụ lục riêng theo mã?
  - Khi khách đổi bộ lọc bắt buộc của một mã thì đây là thay đổi phạm vi; hay là cấu hình?
- bbox: startX 42 · startY 201 · endX 1010 · endY 575

### Item 2.2: Ghi chú yêu cầu báo cáo tháng

- nameJP: 月次レポート要件の注記
- nameTrans: Monthly report requirement note
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
  Mục đích và ngữ cảnh: Khai ràng buộc riêng của nhóm báo cáo tháng: số tháng không được trộn hai phiên bản biểu suất mà không nói rõ.
  Thành phần hiển thị: Một đoạn ghi chú dưới bảng danh mục: nhóm tháng phải tổng hợp theo ngày nghiệp vụ và phiên bản rule; RPT-12 hiện thẳng version và ngày hiệu lực; RPT-10 và RPT-11 phải ghi version đã dùng cho kỳ tổng hợp.
  Chức năng và logic: Thuần hiển thị. Đây là hệ quả của việc phiên bản biểu suất có thể đổi giữa tháng: một con số tháng không nêu version là con số không giải thích được.
- qa: - Khi một tháng có hai phiên bản biểu suất thì RPT-10 và RPT-11 tách dòng theo version; hay gộp một dòng và liệt các version đã dùng?
- bbox: startX 42 · startY 578 · endX 1010 · endY 610

### Item 3: Khối bộ lọc dùng chung

- nameJP: 共通絞り込みブロック
- nameTrans: Shared filter block
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
  Mục đích và ngữ cảnh: Một biểu mẫu lọc dùng chung cho cả 12 mã; mỗi mã chỉ hiện những field mà danh mục khai là bắt buộc của nó.
  Thành phần hiển thị: Tiêu đề khối; hàng đầu gồm ô chọn Ngày nghiệp vụ và ô chọn Kỳ đối tượng hoặc Tháng; hàng sau gồm ô chọn Người tham gia; ô chọn Bộ lọc riêng của mã và ô nhập Batch code; cuối cùng là nút Lọc và nút Xoá điều kiện.
  Chức năng và logic: Gửi bằng phương thức GET về chính màn; không ghi dữ liệu. Bộ lọc thiếu hoặc sai phải báo lỗi tại field và không được âm thầm thay bằng giá trị mặc định.
- qa: -
- bbox: startX 26 · startY 650 · endX 1026 · endY 965

### Item 3.1: Ô chọn Ngày nghiệp vụ

- nameJP: 営業日
- nameTrans: Business date input
- itemType: date_picker
- itemSubtype: ô chọn ngày bắt buộc
- buttonType: -
- dataType: date
- format: YYYY-MM-DD
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn với ngày đã chọn.
- databaseTable: -
- databaseColumn: -
- databaseNote: Ngày nghiệp vụ là trục lọc chung; mỗi mã báo cáo áp nó lên thực thể riêng của mình như giao dịch; giao hàng; dòng đối chiếu hay log điều chỉnh. Vì một field lọc trải nhiều thực thể nên phần mapping cột để trống.
- validationNote:
  Điều kiện: giá trị phải đúng dạng YYYY-MM-DD và là một ngày lịch thật.
  Lỗi: báo lỗi ngay tại field; tuyệt đối không âm thầm thay bằng ngày hôm nay.
  Điều kiện: field là bắt buộc với các mã khai nó trong danh mục.
  Lỗi: báo lỗi tại field và không chạy truy vấn.
- description:
  Mục đích và ngữ cảnh: Chọn ngày nghiệp vụ cần xem; là bộ lọc bắt buộc của năm mã RPT-01; RPT-04; RPT-05; RPT-06 và RPT-08.
  Thành phần hiển thị: Nhãn Ngày nghiệp vụ kèm dấu bắt buộc; ô ngày mang giá trị mẫu 2026-09-08; dòng gợi ý liệt kê các mã dùng field này và nhắc giá trị sai định dạng phải báo lỗi ngay tại field.
  Chức năng và logic: Đọc lệch ngày là sai số liệu đối chiếu; nên hành vi bắt buộc là báo lỗi chứ không thay giá trị. Field này chỉ hiện với các mã có khai nó trong danh mục.
- qa:
  - Ngày nghiệp vụ mặc định khi mở màn là hôm nay; hay ngày nghiệp vụ đã chốt gần nhất?
  - Có cho chọn ngày ở tương lai không; vì báo cáo ngày tương lai luôn rỗng?
- bbox: startX 42 · startY 694 · endX 521 · endY 772

### Item 3.2: Ô chọn Kỳ đối tượng hoặc Tháng

- nameJP: 対象期間・対象月
- nameTrans: Period or month input
- itemType: date_picker
- itemSubtype: ô chọn kỳ bắt buộc
- buttonType: -
- dataType: date
- format: YYYY-MM
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn với kỳ đã chọn.
- databaseTable: -
- databaseColumn: -
- databaseNote: Với RPT-07 đây là kỳ tính thưởng nên áp lên kỳ của kết quả tính thưởng; với RPT-10 và RPT-11 đây là tháng tổng hợp trải nhiều ngày nghiệp vụ. Vì một field lọc phục vụ hai nghĩa khác nhau nên phần mapping cột để trống.
- validationNote:
  Điều kiện: giá trị phải đúng dạng YYYY-MM và là một tháng lịch thật.
  Lỗi: báo lỗi ngay tại field; không âm thầm thay bằng kỳ khác.
  Điều kiện: field là bắt buộc với các mã khai nó trong danh mục.
  Lỗi: báo lỗi tại field và không chạy truy vấn.
- description:
  Mục đích và ngữ cảnh: Chọn kỳ tính thưởng hoặc tháng tổng hợp; không phải ngày nghiệp vụ.
  Thành phần hiển thị: Nhãn Kỳ đối tượng / Tháng kèm dấu bắt buộc; ô mang giá trị mẫu 2026-09; dòng gợi ý nói đây là kỳ tính 完納奨励金 của RPT-07 và tháng tổng hợp của RPT-10 và RPT-11.
  Chức năng và logic: Field này khác ô Ngày nghiệp vụ về ý nghĩa và về độ chi tiết; gộp hai field là nguồn của đọc lệch số liệu.
- qa:
  - Kỳ của RPT-07 là một tháng; hay là một ngày nghiệp vụ đã chốt như ở SC-22?
  - Nếu là một ngày thì hai field này nên tách hẳn nhãn và định dạng để không bị nhập lẫn?
- bbox: startX 532 · startY 694 · endX 1010 · endY 772

### Item 3.3: Ô chọn Người tham gia

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
- defaultValue: Tất cả người tham gia
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn với người tham gia đã chọn.
- databaseTable: participant
- databaseColumn: id
- databaseNote: Lọc theo người tham gia; nhãn lấy tên hiển thị. Prototype có bảng participant thật; nhưng nguồn nhãn của ô chọn chủ thể thực hiện lại rơi về thư điện tử nội bộ khi tên rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Thu hẹp báo cáo về một người tham gia; là bộ lọc bắt buộc của RPT-03; RPT-07 và RPT-10.
  Thành phần hiển thị: Nhãn Người tham gia; ô chọn mang giá trị mặc định Tất cả người tham gia; dòng gợi ý liệt kê ba mã dùng field này và nhắc nhãn chỉ hiện tên hiển thị chứ không hiện thư điện tử.
  Chức năng và logic: Không bắt buộc; bỏ trống là xem toàn bộ. Nhãn tuyệt đối không được rơi về thư điện tử nội bộ vì màn này là đường ra dữ liệu.
- qa: -
- bbox: startX 42 · startY 782 · endX 357 · endY 910

### Item 3.4: Ô chọn Bộ lọc riêng của mã

- nameJP: レポート固有の絞り込み
- nameTrans: Report-specific filter select
- itemType: dropdown
- itemSubtype: ô chọn lọc theo mã
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn với giá trị đã chọn.
- databaseTable: -
- databaseColumn: -
- databaseNote: Mỗi mã báo cáo ánh xạ field này sang một thực thể khác nhau: lô hàng và trạng thái giao dịch; trạng thái hiệu lực; loại ngoại lệ giao hàng; chủ thể thực hiện điều chỉnh; trạng thái tranh chấp; loại giao dịch; phiên bản rule. Vì một field phục vụ bảy nghĩa nên phần mapping cột để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Một khe lọc dùng chung; nghĩa của nó do mã báo cáo đang xem quyết định.
  Thành phần hiển thị: Nhãn Bộ lọc riêng của mã; ô chọn mang giá trị mặc định Tất cả; dòng gợi ý liệt kê bảy nghĩa theo bảy mã: lô hàng và trạng thái giao dịch của RPT-02; trạng thái hiệu lực của RPT-03; loại ngoại lệ của RPT-04; chủ thể thực hiện điều chỉnh của RPT-08; trạng thái tranh chấp của RPT-09; loại giao dịch của RPT-11; phiên bản rule và ngày hiệu lực của RPT-12.
  Chức năng và logic: Không bắt buộc; bỏ trống là xem toàn bộ. Một mã có thể khai nhiều khe lọc riêng như RPT-02 khai cả lô hàng và trạng thái giao dịch.
- qa:
  - Với mã khai hai bộ lọc riêng như RPT-02 thì màn hiện hai ô; hay một ô ghép?
  - Danh sách lựa chọn của từng nghĩa lấy từ dữ liệu thật; hay từ một danh mục tĩnh?
- bbox: startX 368 · startY 782 · endX 684 · endY 910

### Item 3.5: Ô nhập Batch code

- nameJP: バッチコード
- nameTrans: Batch code input
- itemType: text_form
- itemSubtype: ô nhập theo mã
- buttonType: -
- dataType: string
- format: mã batch do hệ thống sinh; nhập đúng mã đã có trong cơ sở dữ liệu
- required: false
- minLength: -
- maxLength: 40
- defaultValue: -
- userAction: -
- transitionNote: Không điều hướng; nạp lại chính màn ở chế độ xem batch.
- databaseTable: accounting_export_batch
- databaseColumn: batch_code
- databaseNote: Mã batch xuất kế toán; duy nhất. Prototype có bảng và cột này; tên file CSV dựng từ mã đã xác nhận trong cơ sở dữ liệu chứ không lấy từ tham số đường dẫn.
- validationNote:
  Điều kiện: batch code phải khớp một batch đã tồn tại và thuộc đúng ngày nghiệp vụ đang lọc.
  Lỗi: từ chối vì không tìm thấy batch; không trả về dữ liệu của batch khác.
  Điều kiện: muốn xuất CSV của RPT-06 thì batch code là bắt buộc.
  Lỗi: từ chối xuất và nói rõ đang ở chế độ xem trước.
- description:
  Mục đích và ngữ cảnh: Chuyển RPT-06 giữa hai chế độ: xem trước số liệu hiện tại và xem đúng ảnh chụp của một batch đã gửi kế toán.
  Thành phần hiển thị: Nhãn Batch code; ô nhập mang giá trị mẫu BATCH-0001; dòng gợi ý nói chỉ RPT-06 dùng field này và không có batch code thì là chế độ xem trước; không xuất được CSV.
  Chức năng và logic: Chỉ hiện với RPT-06. Không có giá trị thì màn ở chế độ xem trước và nút xuất vô hiệu; có giá trị thì dòng lấy từ ảnh chụp bất biến của batch và xuất CSV hoạt động.
- qa: - Batch code là ô nhập tay; hay nên là ô chọn từ danh sách batch của ngày đang lọc để tránh nhập sai?
- bbox: startX 695 · startY 782 · endX 1010 · endY 910

### Item 3.6: Nút Lọc

- nameJP: 絞り込みボタン
- nameTrans: Filter button
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
- transitionNote: Nạp lại chính màn với bộ lọc đã chọn; không sang màn khác.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Áp dụng bộ lọc đã chọn cho bảng kết quả.
  Thành phần hiển thị: Một nút chữ đặt dưới hai hàng field lọc.
  Chức năng và logic: Gửi biểu mẫu bằng phương thức GET; không ghi dữ liệu. Bộ lọc thiếu hoặc sai thì báo lỗi tại field và không chạy truy vấn.
- qa: -
- bbox: startX 42 · startY 920 · endX 87 · endY 949

### Item 3.7: Nút Xoá điều kiện

- nameJP: 条件クリアボタン
- nameTrans: Clear filters button
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
- transitionNote: Nạp lại chính màn với bộ lọc rỗng; giữ nguyên mã báo cáo đang xem.
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Đưa biểu mẫu lọc về trạng thái ban đầu mà không phải xoá từng field.
  Thành phần hiển thị: Một nút chữ đặt cạnh nút Lọc.
  Chức năng và logic: Không ghi dữ liệu. Với các mã có field bắt buộc thì sau khi xoá; màn phải nói rõ đang thiếu điều kiện thay vì tự nạp một giá trị mặc định.
- qa: - Xoá điều kiện có xoá luôn các field bắt buộc như ngày nghiệp vụ; hay đưa chúng về giá trị mặc định?
- bbox: startX 91 · startY 920 · endX 188 · endY 949
