# Items Analysis - scr023-024-rule-version

- Screen: SC-24 · Tạo và phê duyệt phiên bản biểu suất
- targetLanguage: tiếng Việt (nameJP tiếng Nhật, nameTrans tiếng Anh)
- Batch: 2 / 4

### Item 4.1: Ô hiển thị Phiên bản

- nameJP: バージョン
- nameTrans: Version field
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
- buttonType: -
- dataType: integer
- format: v<số nguyên>
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: version_no
- databaseNote: Số phiên bản đang mở; duy nhất trên toàn bảng. Prototype có đúng cột này kèm chỉ mục duy nhất.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Cho người duyệt biết đang xử lý phiên bản nào.
  Thành phần hiển thị: Nhãn Phiên bản và một ô chữ chỉ đọc mang giá trị v4.
  Chức năng và logic: Chỉ đọc; do hệ thống đặt lúc tạo bản nháp. Số phiên bản không bị dùng lại kể cả sau rollback.
- qa: -
- bbox: startX 42 · startY 845 · endX 357 · endY 894

### Item 4.2: Ô hiển thị Ngày hiệu lực

- nameJP: 発効日
- nameTrans: Effective date field
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
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
  Mục đích và ngữ cảnh: Cho người duyệt biết phiên bản này sẽ chi phối cách tính từ ngày nào.
  Thành phần hiển thị: Nhãn Ngày hiệu lực và một ô chữ chỉ đọc mang giá trị 2026-10-01.
  Chức năng và logic: Chỉ đọc; không sửa được ở khung này. Muốn đổi ngày hiệu lực thì phải tạo một phiên bản khác.
- qa: -
- bbox: startX 368 · startY 845 · endX 684 · endY 894

### Item 4.3: Ô hiển thị Trạng thái

- nameJP: 状態
- nameTrans: Status field
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
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
- databaseNote: Trạng thái vòng đời của phiên bản; quyết định nút nào hiện. Prototype chỉ lưu ba giá trị; hai trạng thái còn lại tính lúc đọc.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Trạng thái quyết định khung này cho làm gì: phê duyệt; rollback; hay không còn gì để làm.
  Thành phần hiển thị: Nhãn Trạng thái và một ô chữ chỉ đọc mang giá trị Chờ duyệt.
  Chức năng và logic: Nút Phê duyệt chỉ hiện khi đang chờ duyệt; nút Rollback chỉ hiện khi đang hiệu lực. Phiên bản đã rollback hoặc đã bị thay thế thì không hiện khối thao tác.
- qa: -
- bbox: startX 695 · startY 845 · endX 1010 · endY 894

### Item 4.4: Ô hiển thị Người lập

- nameJP: 作成者
- nameTrans: Maker field
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
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
- databaseNote: Người tạo phiên bản; là cột được so với người đang thao tác để chặn tự duyệt. Prototype có đúng cột này; hiển thị rơi về thư điện tử nội bộ khi tên hiển thị rỗng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Người lập là căn cứ của cổng maker-checker; không phải thông tin trang trí.
  Thành phần hiển thị: Nhãn Người lập và một ô chữ chỉ đọc mang tên hiển thị Người dùng D.
  Chức năng và logic: Server so giá trị này với người đang thao tác; trùng nhau thì từ chối cả phê duyệt và rollback. Hiển thị chỉ dùng tên hiển thị hoặc mã người dùng; không bao giờ thư điện tử nội bộ.
- qa: -
- bbox: startX 42 · startY 904 · endX 357 · endY 999

### Item 4.5: Ô hiển thị Người duyệt

- nameJP: 承認者
- nameTrans: Checker field
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
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
- databaseNote: Người phê duyệt; rỗng khi phiên bản còn chờ duyệt và được ghi ngay trong lần phê duyệt. Prototype có đúng cột này.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Chứng minh phiên bản đã qua cổng phê duyệt và ai là người chịu trách nhiệm.
  Thành phần hiển thị: Nhãn Người duyệt và một ô chữ chỉ đọc hiện dấu gạch kèm chú thích điền khi phê duyệt.
  Chức năng và logic: Rỗng là hợp lệ khi còn chờ duyệt. Giá trị được ghi trong chính lần phê duyệt; không nhận từ client.
- qa: -
- bbox: startX 368 · startY 904 · endX 684 · endY 999

### Item 4.6: Ô hiển thị Nội dung biểu suất

- nameJP: 料率内容
- nameTrans: Rate table field
- itemType: label
- itemSubtype: ô hiển thị chỉ đọc
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
- databaseNote: Nội dung biểu suất của phiên bản đang mở. Prototype có cột này nhưng không hiện nội dung lên màn và engine tính thưởng không đọc nó.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: Người duyệt phải đọc được đúng cái mình đang duyệt; duyệt mà không thấy nội dung thì cổng maker-checker chỉ còn là hình thức.
  Thành phần hiển thị: Nhãn Nội dung biểu suất; một ô chữ chỉ đọc mang giá trị Hệ số 110/100 · tỷ lệ chi trả; dòng gợi ý nói phải kèm phần khác so với phiên bản đang hiệu lực.
  Chức năng và logic: Thiết kế đòi hiện cả phần khác biệt so với phiên bản đang hiệu lực; không chỉ hiện giá trị mới.
- qa: - Phần khác biệt so với phiên bản đang hiệu lực trình bày thế nào: hai cột cạnh nhau; hay đánh dấu ngay trong nội dung?
- bbox: startX 695 · startY 904 · endX 1010 · endY 999

### Item 4.7: Nút Phê duyệt

- nameJP: 承認ボタン
- nameTrans: Approve button
- itemType: button
- itemSubtype: nút chính
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Ở lại màn; phiên bản chuyển sang đã duyệt và điền người duyệt. Không đổi số thưởng ngay — phiên bản chỉ chi phối các kỳ từ ngày hiệu lực trở đi.
- databaseTable: incentive_rule_version
- databaseColumn: status
- databaseNote: Chuyển trạng thái từ chờ duyệt sang đã duyệt và ghi người duyệt trong cùng một lệnh có điều kiện. Prototype làm đúng khuôn này nên hai người duyệt cùng lúc thì người thứ hai bị từ chối chứ không ghi đè.
- validationNote:
  Điều kiện: người thao tác phải khác người lập của phiên bản.
  Lỗi: từ chối kèm câu "Bạn không thể phê duyệt phiên bản do chính mình tạo."
  Điều kiện: phiên bản phải còn ở trạng thái chờ duyệt.
  Lỗi: từ chối kèm câu "Phiên bản này đã được xử lý trước đó."
- description:
  Mục đích và ngữ cảnh: Đưa bản nháp qua cổng maker-checker để nó đủ điều kiện chi phối cách tính từ ngày hiệu lực.
  Thành phần hiển thị: Một nút chữ nhấn mạnh đặt dưới hai hàng field chỉ đọc.
  Chức năng và logic: Chỉ hiện khi phiên bản đang chờ duyệt và người xem khác người lập. Ẩn nút chỉ là gợi ý trình bày; chặn thật phải ở server và phải chặn cả khi gọi API trực tiếp.
- qa: -
- bbox: startX 42 · startY 1020 · endX 121 · endY 1049

### Item 4.8: Ô chọn Rollback về phiên bản

- nameJP: 復元先バージョン
- nameTrans: Rollback target select
- itemType: dropdown
- itemSubtype: ô chọn bắt buộc khi rollback
- buttonType: -
- dataType: string
- format: v<số phiên bản> (YYYY-MM-DD)
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: incentive_rule_version
- databaseColumn: id
- databaseNote: Phiên bản đích của rollback. Prototype lọc ứng viên ở phía server theo trạng thái nên bản chờ duyệt không vào được danh sách.
- validationNote:
  Điều kiện: phải chọn một phiên bản đích trước khi bấm Rollback.
  Lỗi: từ chối yêu cầu vì thiếu phiên bản đích.
  Điều kiện: phiên bản đích phải đã từng qua cổng maker-checker; nghĩa là không được là bản còn chờ duyệt.
  Lỗi: từ chối kèm câu "Phiên bản đích không hợp lệ để rollback."
  Điều kiện: phiên bản đích không được là phiên bản đang hiệu lực.
  Lỗi: từ chối kèm câu "Phiên bản đích không hợp lệ để rollback."
- description:
  Mục đích và ngữ cảnh: Chọn phiên bản sẽ được nâng lên đang hiệu lực khi rollback phiên bản hiện tại.
  Thành phần hiển thị: Nhãn Rollback về phiên bản kèm dấu bắt buộc; ô chọn mang giá trị mẫu v2 (2026-08-01); dòng gợi ý nói đích chỉ được là phiên bản đã từng qua cổng maker-checker.
  Chức năng và logic: Ràng buộc quan trọng: cho chọn một bản còn chờ duyệt thì một bản chưa ai duyệt sẽ thành đang hiệu lực và bỏ qua hẳn cổng phê duyệt.
- qa: -
- bbox: startX 42 · startY 1060 · endX 1010 · endY 1129

### Item 4.9: Nút Rollback

- nameJP: ロールバックボタン
- nameTrans: Rollback button
- itemType: button
- itemSubtype: nút nguy hiểm
- buttonType: text_only
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: Ở lại màn; phiên bản hiện tại chuyển sang đã rollback và phiên bản đích lên đang hiệu lực. Các kỳ đã chốt giữ nguyên phiên bản đã dùng.
- databaseTable: incentive_rule_version
- databaseColumn: status
- databaseNote: Hạ cấp phiên bản hiện tại và nâng cấp phiên bản đích; thiết kế coi đây là một thao tác trọn vẹn. Prototype làm bằng hai lệnh ghi rời và bù ngược khi lệnh thứ hai lỗi.
- validationNote:
  Điều kiện: người thao tác phải khác người lập theo quy tắc maker-checker của rollback.
  Lỗi: từ chối kèm câu "Bạn không thể rollback phiên bản do chính mình tạo."
  Điều kiện: phiên bản phải đang ở trạng thái đang hiệu lực.
  Lỗi: từ chối kèm câu "Phiên bản này hiện không ở trạng thái đang hiệu lực."
- description:
  Mục đích và ngữ cảnh: Quay về một phiên bản trước đó khi phiên bản đang hiệu lực có vấn đề; và giữ nguyên dòng lịch sử.
  Thành phần hiển thị: Một nút chữ kiểu cảnh báo đặt dưới ô chọn phiên bản đích.
  Chức năng và logic: Rollback là một phiên bản mới trong dòng lịch sử; không phải xoá phiên bản đang hiệu lực. Bản bị hạ cấp vẫn còn nguyên trong danh sách SC-23.
- qa:
  - Rollback có cần ô nhập lý do riêng như thao tác tạo không?
  - Khi rollback; quy tắc maker-checker kiểm người lập của phiên bản đang bị hạ cấp; hay của phiên bản đích?
- bbox: startX 42 · startY 1139 · endX 113 · endY 1168

### Item 4.10: Ghi chú điều kiện hiện hai nút thao tác

- nameJP: 操作ボタン表示条件の注記
- nameTrans: Action visibility note
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
  Mục đích và ngữ cảnh: Chốt lại quy tắc hiện nút theo trạng thái; và nghĩa vụ ghi dấu vết của cả hai thao tác.
  Thành phần hiển thị: Một đoạn ghi chú dưới nút Rollback.
  Chức năng và logic: Thuần hiển thị. Hai thao tác không bao giờ cùng hiện vì hai trạng thái tiền đề loại trừ nhau.
- qa: -
- bbox: startX 42 · startY 1171 · endX 1010 · endY 1187

### Item 5: Khối maker-checker khi bạn là người lập

- nameJP: メーカー・チェッカー阻止ブロック
- nameTrans: Maker-checker block for self
- itemType: others
- itemSubtype: khối biểu mẫu ở trạng thái chặn
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
  Mục đích và ngữ cảnh: Vẽ đúng những gì người lập nhìn thấy khi mở phiên bản của chính mình; để không ai dựng nhầm thành ẩn cả khối.
  Thành phần hiển thị: Tiêu đề khối; hai câu thông báo cho hai trạng thái; hai nút Phê duyệt và Rollback ở dạng vô hiệu và một ghi chú về chỗ chặn thật.
  Chức năng và logic: Khối thao tác vẫn hiện nhưng chỉ chứa ghi chú; không có nút nào bấm được. Đây là ràng buộc riêng của GOV-RULE-01 và không suy ra được từ vai trò vì người lập và người duyệt cùng là quản trị rule.
- qa: -
- bbox: startX 26 · startY 1227 · endX 1026 · endY 1424

### Item 5.1: Nút Phê duyệt ở trạng thái vô hiệu

- nameJP: 承認ボタン(無効)
- nameTrans: Approve button disabled
- itemType: button
- itemSubtype: nút ở trạng thái vô hiệu
- buttonType: text_only
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
  Mục đích và ngữ cảnh: Biến thể vô hiệu của nút Phê duyệt khi người xem chính là người lập phiên bản.
  Thành phần hiển thị: Một nút chữ mờ đặt cạnh nút Rollback mờ; dưới hai câu thông báo của khối.
  Chức năng và logic: Vô hiệu vì người duyệt phải khác người lập. Nút mờ chỉ là gợi ý trình bày; gọi API trực tiếp vẫn bị từ chối.
- qa: -
- bbox: startX 42 · startY 1333 · endX 121 · endY 1362

### Item 5.2: Nút Rollback ở trạng thái vô hiệu

- nameJP: ロールバックボタン(無効)
- nameTrans: Rollback button disabled
- itemType: button
- itemSubtype: nút ở trạng thái vô hiệu
- buttonType: text_only
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
  Mục đích và ngữ cảnh: Biến thể vô hiệu của nút Rollback khi người xem chính là người lập phiên bản.
  Thành phần hiển thị: Một nút chữ mờ đặt sau nút Phê duyệt mờ.
  Chức năng và logic: Vô hiệu vì cùng một ràng buộc maker-checker áp cho rollback. Nút mờ chỉ là gợi ý trình bày; gọi API trực tiếp vẫn bị từ chối.
- qa: -
- bbox: startX 124 · startY 1333 · endX 195 · endY 1362

### Item 5.3: Ghi chú chặn thật nằm ở server

- nameJP: サーバー側強制の注記
- nameTrans: Server-side enforcement note
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
  Mục đích và ngữ cảnh: Chốt rằng ràng buộc maker-checker là ràng buộc kiến trúc; không phải quy tắc trình bày.
  Thành phần hiển thị: Một đoạn ghi chú dưới hai nút vô hiệu: chặn thật ở server; ràng buộc riêng của GOV-RULE-01 và không suy ra được từ vai trò; cùng một luật với SC-21.
  Chức năng và logic: Thuần hiển thị. Hai tài khoản demo tách đôi một người lập và một người duyệt là cố ý để chứng minh cổng này chạy.
- qa: -
- bbox: startX 42 · startY 1365 · endX 1010 · endY 1398

### Item 6: Khối bất biến thiết kế — thay đổi không làm biến dạng dữ liệu đã chốt

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
  Mục đích và ngữ cảnh: Khai một bất biến không nhìn thấy được qua ảnh chụp: phê duyệt không đổi số thưởng ngay và rollback không xoá lịch sử.
  Thành phần hiển thị: Tiêu đề khối và hai đoạn văn: phiên bản mới chỉ chi phối các kỳ từ ngày hiệu lực trở đi; rollback là một phiên bản mới trong dòng lịch sử.
  Chức năng và logic: Thuần hiển thị tài liệu. Đây là hệ quả trực tiếp của GOV-RULE-01: các kỳ đã chốt giữ nguyên phiên bản đã dùng nên SC-22 vẫn giải thích được số cũ.
- qa: -
- bbox: startX 26 · startY 1437 · endX 1026 · endY 1557
