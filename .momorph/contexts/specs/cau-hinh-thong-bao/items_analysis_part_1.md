# Items Analysis - Cấu hình thông báo

- Nguồn: `.momorph/shots/SC-29-cau-hinh-thong-bao.png` (image mode; nguồn ảnh duy nhất)
- Toạ độ: `.momorph/shots/SC-29-cau-hinh-thong-bao-dom-boxes.json` — `getBoundingClientRect()` thật
- Khung ảnh: 1280 x 2262 px; deviceScaleFactor = 1
- targetLanguage: tiếng Việt · nameJP: tiếng Nhật · nameTrans: tiếng Anh
- Tổng số item: 45
- Batch: part 1 / 3

### Item 1: Khối đầu màn cấu hình thông báo

- itemId: img-001
- parentNo: -
- bbox: (26, 22) - (1026, 122)
- nameJP: -
- nameTrans: Screen header block
- itemType: others
- itemSubtype: khối tiêu đề màn
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
  - Mục đích và ngữ cảnh: Định danh màn và chuỗi truy vết; cho biết đây là màn quản trị của nhóm thông báo.
  - Thành phần hiển thị: Tiêu đề cấp hai kèm mã màn; dòng metadata liệt kê FE-040 · FN-12 · ưu tiên P1 · FR-NOTIFY-03 · loại màn Form · route đề xuất · actor quản trị vận hành ánh xạ sang một vai trò · một thẻ trạng thái.
  - Chức năng và logic: Chỉ trình bày; không nhận thao tác nào.
- qa: -

### Item 1.1: Tiêu đề màn

- itemId: img-002
- parentNo: 1
- bbox: (26, 22) - (1026, 48)
- nameJP: 通知設定
- nameTrans: Screen title
- itemType: label
- itemSubtype: tiêu đề cấp hai
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
  - Mục đích và ngữ cảnh: Cho người dùng biết đang ở màn cấu hình thông báo.
  - Thành phần hiển thị: Một dòng chữ đậm cỡ lớn nhất trên màn: mã màn SC-29 và tên màn.
  - Chức năng và logic: Tĩnh.
- qa: -

### Item 1.2: Dòng metadata truy vết

- itemId: img-003
- parentNo: 1
- bbox: (26, 60) - (1026, 98)
- nameJP: -
- nameTrans: Traceability metadata line
- itemType: label
- itemSubtype: đoạn văn nhiều dòng
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
  - Mục đích và ngữ cảnh: Nối màn về FE-040 và FR-NOTIFY-03; khai luôn ánh xạ actor sang vai trò của hệ.
  - Thành phần hiển thị: Hai dòng chữ nhỏ liệt tính năng · nhóm chức năng · ưu tiên · yêu cầu · loại màn · route đề xuất · actor quản trị vận hành ánh xạ ROLE-SYS-ADMIN · thẻ trạng thái.
  - Chức năng và logic: Tĩnh. Ánh xạ actor là một giả định phải chốt vì hệ không có vai trò nào mang đúng tên quản trị vận hành.
- qa: -

### Item 1.2.1: Thẻ trạng thái dựng màn

- itemId: img-004
- parentNo: 1.2
- bbox: (74, 79) - (149, 98)
- nameJP: -
- nameTrans: Build status tag
- itemType: label
- itemSubtype: thẻ nhỏ trong dòng
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
  - Mục đích và ngữ cảnh: Cho biết màn chưa có bản thi công nào để đối chiếu.
  - Thành phần hiển thị: Thẻ chữ nhỏ viền tròn cuối dòng metadata với nội dung Chưa thi công.
  - Chức năng và logic: Tĩnh; giá trị đến từ trạng thái quản lý tài liệu chứ không từ dữ liệu nghiệp vụ.
- qa: -

### Item 2: Dải chú thích yêu cầu và điều kiện nghiệm thu

- itemId: img-005
- parentNo: -
- bbox: (26, 138) - (1026, 246)
- nameJP: -
- nameTrans: Requirement and acceptance notice
- itemType: label
- itemSubtype: dải chú thích đầu màn
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
  - Mục đích và ngữ cảnh: Ghim đúng ba thứ bắt buộc của FR-NOTIFY-03 và biến điều kiện nghiệm thu thành một ràng buộc kiến trúc.
  - Thành phần hiển thị: Một dải chú thích nền vàng nhạt ba đoạn: đoạn khai màn chưa thi công; đoạn dẫn FR-NOTIFY-03 với ba thứ người nhận và ngưỡng và thời điểm gửi, cùng điều kiện nghiệm thu là đổi cấu hình không làm mất lịch sử gửi; đoạn nói rõ nghiệm thu đó là ràng buộc kiến trúc nên cấu hình chỉ áp cho lần gửi sau và lịch sử gửi là bất biến.
  - Chức năng và logic: Tĩnh. Ba thứ FR-NOTIFY-03 đòi là bắt buộc; mọi field khác trên màn chỉ là phương tiện để đặt được ba thứ đó.
- qa: -

### Item 3: Khối cấu hình một loại event

- itemId: img-006
- parentNo: -
- bbox: (26, 262) - (1026, 875)
- nameJP: -
- nameTrans: Per-event config block
- itemType: others
- itemSubtype: khối form mười field và ba nút
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
  - Mục đích và ngữ cảnh: Nơi quản trị đặt người nhận · ngưỡng · thời điểm gửi cho một loại event; là thân chính của màn.
  - Thành phần hiển thị: Tiêu đề khối dẫn ba thứ FR-NOTIFY-03 đòi; mười field xếp thành bốn hàng gồm một ô chỉ đọc, hai hộp kiểm, bốn ô chọn, một ô số, một ô giờ và một vùng văn bản; ba nút hành động cuối khối.
  - Chức năng và logic: Một dòng cấu hình cho mỗi loại event. Lưu là sinh phiên bản mới chứ không ghi đè, nên khối này không bao giờ sửa tại chỗ một dòng duy nhất.
- qa: -

### Item 3.1: Ô Loại event

- itemId: img-007
- parentNo: 3
- bbox: (42, 307) - (357, 404)
- nameJP: イベント種別
- nameTrans: Event type
- itemType: label
- itemSubtype: ô chỉ đọc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho biết đang cấu hình cho loại event nào; đây là khoá của dòng cấu hình nên không sửa được từ màn.
  - Thành phần hiển thị: Nhãn Loại event; ô chỉ đọc nền xám hiện giá trị profile sắp hết hiệu lực; dòng nhắc ghi field số 1 là chỉ đọc và mỗi loại event của FR-NOTIFY-01 có một dòng.
  - Chức năng và logic: Chỉ đọc. Tập giá trị lấy theo các nhóm event mà FR-NOTIFY-01 liệt, nhưng yêu cầu khách viết là ví dụ nên tập này chưa đóng.
- qa:
  - Tập loại event là danh sách đóng hay mở; yêu cầu khách viết bốn nhóm dưới dạng ví dụ?
  - Một loại event mới xuất hiện thì màn tự hiện dòng chưa cấu hình hay phải tạo tay?
  - Định dạng của giá trị loại event là chuỗi tiếng Việt hiển thị hay một mã cố định; ảnh chỉ cho thấy nhãn.

### Item 3.2: Hộp kiểm Bật thông báo

- itemId: img-008
- parentNo: 3
- bbox: (368, 307) - (684, 404)
- nameJP: 通知を有効化
- nameTrans: Enable notification
- itemType: checkbox
- itemSubtype: hộp kiểm bắt buộc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: boolean
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: false
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote:
  - Điều kiện: bắt buộc có giá trị.
  - Lỗi: "Hãy chọn trạng thái bật hoặc tắt cho loại event này."
- description:
  - Mục đích và ngữ cảnh: Công tắc quyết định loại event này có sinh thông báo hay không.
  - Thành phần hiển thị: Nhãn Bật thông báo kèm dấu sao bắt buộc; hộp kiểm chưa chọn kèm chữ Bật và ghi chú dạng công tắc; dòng nhắc ghi field số 2 và mặc định tắt.
  - Chức năng và logic: Mặc định tắt là có chủ đích: không tự bật một loại event mà đường sinh event chưa tồn tại. Bật một event chưa có nguồn dữ liệu thì màn phải hiện nhãn sẽ không phát sinh.
- qa:
  - Bật một event chưa có nguồn dữ liệu thì chặn hẳn, hay cho lưu kèm nhãn cảnh báo?
  - Tắt thông báo cho một event có xoá cấu hình cũ hay chỉ tạm dừng?

### Item 3.3: Ô chọn Phân loại

- itemId: img-009
- parentNo: 3
- bbox: (695, 307) - (1010, 404)
- nameJP: 重要度
- nameTrans: Severity
- itemType: dropdown
- itemSubtype: ô chọn bắt buộc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: thường
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote:
  - Điều kiện: chỉ nhận hai giá trị critical và thường.
  - Lỗi: "Phân loại không hợp lệ."
- description:
  - Mục đích và ngữ cảnh: Quyết định thông báo của loại event này có chịu mốc năm phút hay không; đây là field kéo theo hệ quả nặng nhất của khối.
  - Thành phần hiển thị: Nhãn Phân loại kèm dấu sao bắt buộc; ô chọn hiện giá trị thường kèm mũi chỉ xuống; dòng nhắc ghi field số 3 với hai giá trị critical và thường và nói rõ chọn critical là kéo theo mốc năm phút của FR-NOTIFY-02.
  - Chức năng và logic: Chọn critical làm mọi thông báo của loại event này phải gửi xong trong năm phút, nên đây không phải một nhãn trang trí.
- qa:
  - Đổi phân loại từ thường sang critical có áp cho các thông báo đã sinh trước đó không?
  - Định dạng giá trị gửi lên là chuỗi hiển thị hay mã cố định; ảnh chỉ cho thấy nhãn tiếng Việt.

### Item 3.4: Hộp kiểm Kênh gửi

- itemId: img-010
- parentNo: 3
- bbox: (42, 414) - (1010, 483)
- nameJP: 送信チャネル
- nameTrans: Delivery channels
- itemType: checkbox
- itemSubtype: nhóm hộp kiểm bắt buộc kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: in_app
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote:
  - Điều kiện: phải chọn tối thiểu một kênh.
  - Lỗi: "Hãy chọn ít nhất một kênh gửi."
  - Điều kiện: chỉ nhận hai giá trị in_app và email.
  - Lỗi: "Kênh gửi không hợp lệ."
- description:
  - Mục đích và ngữ cảnh: Đặt kênh cho loại event này trong đúng ranh giới phạm vi của nhóm chức năng thông báo.
  - Thành phần hiển thị: Nhãn Kênh gửi kèm dấu sao bắt buộc; hai hộp kiểm in_app đã chọn và email chưa chọn; dòng nhắc ghi field số 4 với ràng buộc tối thiểu một kênh, chỉ hai kênh theo BR-NOTIFY-01, SMS và FAX ngoài phạm vi FN-12 nên giao diện không để chỗ cho chúng, và chọn email khi chưa có hạ tầng gửi thì vào trạng thái kênh chưa khả dụng.
  - Chức năng và logic: Giao diện chỉ có đúng hai hộp kiểm; không có chỗ nào thêm kênh thứ ba. Chọn email mà chưa có hạ tầng gửi thì cấu hình vẫn lưu được nhưng phải cảnh báo rõ là email sẽ không gửi.
- qa:
  - Chọn email khi chưa có hạ tầng gửi thì chặn lưu hay cho lưu kèm cảnh báo?
  - Bỏ chọn hết hai kênh có tương đương với tắt thông báo hay là một lỗi riêng?

### Item 3.5: Ô chọn Người nhận theo vai trò

- itemId: img-011
- parentNo: 3
- bbox: (42, 494) - (521, 589)
- nameJP: 宛先ロール
- nameTrans: Recipient roles
- itemType: dropdown
- itemSubtype: ô chọn nhiều giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó. Tập bảy giá trị vai trò lấy theo ràng buộc vai trò của bảng người dùng nội bộ đã tồn tại.
- validationNote:
  - Điều kiện: bắt buộc nếu Người nhận đích danh để trống.
  - Lỗi: "Hãy chọn người nhận theo vai trò hoặc người nhận đích danh."
  - Điều kiện: chỉ nhận bảy giá trị vai trò của hệ.
  - Lỗi: "Vai trò không hợp lệ."
- description:
  - Mục đích và ngữ cảnh: Một trong hai cách đặt người nhận — chính thứ đầu tiên trong ba thứ FR-NOTIFY-03 đòi.
  - Thành phần hiển thị: Nhãn Người nhận theo vai trò kèm dấu sao bắt buộc; ô chọn nhiều giá trị ghi Chọn nhiều với chú thích bảy vai trò; dòng nhắc ghi field số 5 và ràng buộc bắt buộc nếu không chọn field số 6.
  - Chức năng và logic: Gửi theo vai trò làm cấu hình bền hơn khi nhân sự đổi. Tập giá trị đúng bằng bảy vai trò của hệ, không tự thêm vai trò mới.
- qa:
  - Chọn cả vai trò và đích danh cùng lúc thì hợp lệ; hay phải chọn đúng một trong hai cách?
  - Một người vừa thuộc vai trò được chọn vừa nằm trong danh sách đích danh thì nhận một hay hai thông báo?
  - Định dạng nhãn hiển thị của một vai trò là mã hay tên tiếng Việt; ảnh chỉ cho thấy dòng mặc định.

### Item 3.6: Ô chọn Người nhận đích danh

- itemId: img-012
- parentNo: 3
- bbox: (532, 494) - (1010, 589)
- nameJP: 宛先ユーザー
- nameTrans: Named recipients
- itemType: dropdown
- itemSubtype: ô chọn nhiều giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: true
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: on_click
- transitionNote: -
- databaseTable: app_user
- databaseColumn: id; display_name; is_active
- databaseNote: Danh sách chọn đọc từ bảng người dùng nội bộ đã tồn tại; chỉ lấy tên hiển thị và cờ đang hoạt động, không hiện thư điện tử. Cột lưu lựa chọn thì CHƯA TỒN TẠI vì bảng cấu hình chưa có.
- validationNote:
  - Điều kiện: bắt buộc nếu Người nhận theo vai trò để trống.
  - Lỗi: "Hãy chọn người nhận theo vai trò hoặc người nhận đích danh."
  - Điều kiện: chỉ chọn được tài khoản đang hoạt động.
  - Lỗi: tài khoản đã vô hiệu thì bỏ qua khi gửi và không báo lỗi.
- description:
  - Mục đích và ngữ cảnh: Cách thứ hai đặt người nhận, dùng khi một cảnh báo cần đến đúng một người chứ không cả vai trò.
  - Thành phần hiển thị: Nhãn Người nhận đích danh kèm dấu sao bắt buộc; ô chọn nhiều giá trị ghi Chọn nhiều với ví dụ một tên người; dòng nhắc ghi field số 6 với ràng buộc bắt buộc nếu không chọn field số 5, chỉ tài khoản đang hoạt động, và tài khoản đã vô hiệu thì bỏ khi gửi mà không lỗi.
  - Chức năng và logic: Tài khoản bị vô hiệu sau khi cấu hình đã lưu thì bị bỏ qua lúc gửi chứ không làm cả lượt gửi thất bại.
- qa:
  - Danh sách chọn hiện toàn bộ tài khoản hay chỉ tài khoản thuộc vai trò liên quan tới loại event?
  - Danh sách người nhận đích danh phơi ra ai nhận cảnh báo gì; vai trò nào được xem field này?
  - Định dạng nhãn hiển thị một người nhận là gì; ảnh chỉ cho thấy dòng mặc định nên chưa suy ra được mẫu nhãn.

### Item 3.7: Ô Ngưỡng

- itemId: img-013
- parentNo: 3
- bbox: (42, 599) - (357, 712)
- nameJP: しきい値
- nameTrans: Threshold
- itemType: text_form
- itemSubtype: ô nhập số kèm nhãn và dòng nhắc
- buttonType: -
- dataType: integer
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote:
  - Điều kiện: là số nguyên dương.
  - Lỗi: "Ngưỡng phải là số nguyên lớn hơn 0."
  - Điều kiện: bắt buộc nếu loại event thuộc nhóm có ngưỡng.
  - Lỗi: "Loại event này cần một ngưỡng."
- description:
  - Mục đích và ngữ cảnh: Thứ thứ hai trong ba thứ FR-NOTIFY-03 đòi; là con số quyết định khi nào một event được coi là đáng cảnh báo.
  - Thành phần hiển thị: Nhãn Ngưỡng; ô nhập hiện dấu gạch kèm chú thích không đặt mặc định bịa; dòng nhắc ghi field số 7 với ràng buộc số nguyên dương, bắt buộc nếu loại event thuộc nhóm có ngưỡng, và nói rõ yêu cầu khách không cho con số nào.
  - Chức năng và logic: Ô để trống có chủ đích: yêu cầu khách không cho một con số mặc định nào cho bất kỳ loại event nào, nên mọi mặc định đều là giả định phải chốt.
- qa:
  - Ngưỡng mặc định cho từng loại event là bao nhiêu; yêu cầu khách không cho con số nào nên cần khách chốt từng event?
  - Loại event nào thuộc nhóm có ngưỡng và loại nào không?
  - Ngưỡng cảnh báo sắp hết hiệu lực do màn này quản thì con số cứng đang dùng ở báo cáo phải bỏ; ai chịu trách nhiệm bỏ nó?
  - Định dạng nhập là số thuần hay có phần đơn vị kèm trong cùng ô; ảnh chỉ cho thấy dấu gạch.

### Item 3.8: Ô chọn Đơn vị ngưỡng

- itemId: img-014
- parentNo: 3
- bbox: (368, 599) - (684, 712)
- nameJP: しきい値の単位
- nameTrans: Threshold unit
- itemType: dropdown
- itemSubtype: ô chọn một giá trị kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: ngày
- userAction: on_click
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote: -
- description:
  - Mục đích và ngữ cảnh: Cho ngưỡng một đơn vị đọc được, vì cùng một con số nghĩa khác nhau tuỳ loại event.
  - Thành phần hiển thị: Nhãn Đơn vị ngưỡng; ô chọn hiện giá trị ngày kèm mũi chỉ xuống; dòng nhắc ghi field số 8 với hai giá trị ngày và số lượng tuỳ loại event.
  - Chức năng và logic: Đơn vị đi kèm ngưỡng nên đổi đơn vị mà không đổi con số là đổi nghĩa của cấu hình.
- qa:
  - Đơn vị có bị khoá theo loại event; hay quản trị chọn tự do?
  - Có cần thêm đơn vị nào ngoài ngày và số lượng cho bốn nhóm event của yêu cầu khách?

### Item 3.9: Ô Thời điểm gửi theo giờ JST

- itemId: img-015
- parentNo: 3
- bbox: (695, 599) - (1010, 712)
- nameJP: 送信時刻（JST）
- nameTrans: Send time JST
- itemType: text_form
- itemSubtype: ô nhập giờ kèm nhãn và dòng nhắc
- buttonType: -
- dataType: string
- format: hh:mm
- required: false
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: -
- databaseColumn: -
- databaseNote: CHƯA TỒN TẠI: thiết kế đòi một bảng cấu hình thông báo nhưng hệ hiện chưa có bảng nào giữ nó.
- validationNote:
  - Điều kiện: đúng dạng hh:mm theo giờ JST.
  - Lỗi: "Thời điểm gửi phải theo dạng hh:mm."
  - Điều kiện: nằm trong khung giờ dịch vụ; nếu ngoài khung thì phải khai rõ.
  - Lỗi: "Thời điểm này nằm ngoài khung giờ dịch vụ 02:00–10:00 JST."
- description:
  - Mục đích và ngữ cảnh: Thứ thứ ba trong ba thứ FR-NOTIFY-03 đòi; quyết định thông báo tới người nhận vào lúc nào trong ngày.
  - Thành phần hiển thị: Nhãn Thời điểm gửi kèm chú thích JST; ô nhập hiện mẫu hh:mm; dòng nhắc ghi field số 9 với ràng buộc trong khung giờ dịch vụ 02:00 tới 10:00 JST theo NFR-AVL-01 hoặc khai rõ là gửi ngoài khung, và luôn hiểu theo JST.
  - Chức năng và logic: Giá trị luôn hiểu theo JST, không theo giờ thiết bị. Field này khiến cả phương án chỉ có kênh trong ứng dụng cũng không đủ, vì gửi theo giờ cần một tiến trình chạy ngoài request.
- qa:
  - Thời điểm gửi có buộc nằm trong khung giờ dịch vụ hay cho phép ngoài khung kèm khai rõ?
  - Để trống thời điểm gửi thì hiểu là gửi ngay khi sinh event hay không gửi?
  - Một loại event có cần nhiều thời điểm gửi trong ngày không?

