# Items Analysis - participant-detail

Màn chi tiết một profile người tham gia cộng vòng đời hiệu lực. Nguồn chân lý: `FE-005` và
`FE-006` (Feature List) · `FR-PARTY-01` (RFP:629). Vòng đời theo `FIG-010` (RFP:609) — **đúng năm
cạnh**, trong đó chỉ có **MỘT** cạnh `Tạm ngừng → Có hiệu lực`. Thủ tục và thẩm quyền trên cạnh đó
khác nhau theo phân loại, theo `FIG-004` (RFP:288-294) cột "Gỡ tạm ngừng" — đó là **điều kiện tiền
đề trên một cạnh**, không phải ba cạnh song song. RFP §02-08 (RFP:309) cấm gộp 許可 và 承認.

Batch 2 of 3 - items 3.6 .. 5.1.1

### Item 3.6: Nút lưu thay đổi

- itemId: img-016
- parentNo: 3
- position: startX=42 startY=656 endX=133 endY=685
- nameJP: 変更を保存
- nameTrans: Save changes
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
- transitionNote: Ở lại màn; nạp lại khối profile và khối lịch sử sau khi lưu
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chốt lần sửa profile; là thao tác ghi duy nhất của khối này
  Thành phần hiển thị: một nút chữ ở cuối khối sửa
  Chức năng và logic: chặn gửi trùng khi đang gửi; mỗi mã lỗi từ tầng dịch vụ phải hiện thành một câu riêng để người dùng biết trường nào sai
- qa: - Khi hai vai quản trị sửa cùng một profile gần nhau thì màn có so giá trị trước khi ghi để chặn ghi đè không? Thiết kế đòi chống ghi đè ở cạnh chuyển trạng thái nhưng chưa nói cho khối sửa.

### Item 4: Khối vòng đời hiệu lực

- itemId: img-017
- parentNo: -
- position: startX=26 startY=714 endX=1026 endY=1301
- nameJP: 有効性ライフサイクルブロック
- nameTrans: Eligibility lifecycle block
- itemType: others
- itemSubtype: state_machine_block
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
  Mục đích và ngữ cảnh: phần chịu lực của FE-006 — chuyển trạng thái theo FIG-010 với đúng năm cạnh; và cổng kiểm theo phân loại của FIG-004 trên cạnh gỡ tạm ngừng
  Thành phần hiển thị: bảng năm cạnh; ghi chú một cạnh không phải ba; bảng cổng kiểm theo phân loại; trường lý do; các nút cạnh hợp lệ; ghi chú về cách hiện nút
  Chức năng và logic: chỉ những cạnh hợp lệ từ trạng thái hiện tại mới hiện thành nút; cạnh gỡ tạm ngừng còn phải qua cổng kiểm theo phân loại mới đi được
- qa: -

### Item 4.1: Bảng năm cạnh của FIG-010

- itemId: img-018
- parentNo: 4
- position: startX=42 startY=758 endX=1010 endY=930
- nameJP: 遷移表
- nameTrans: Transition table
- itemType: table
- itemSubtype: state_transition_table
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
- databaseColumn: status
- databaseNote: Prototype có đủ năm cạnh và từ chối mọi cặp ngoài bảng; thiếu là cổng kiểm theo phân loại chứ không phải thiếu cạnh.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: chép đúng năm cạnh của FIG-010 để không ai thêm cạnh; mọi cặp trạng thái và sự kiện ngoài bảng là chuyển trạng thái không hợp lệ chứ không phải chưa làm
  Thành phần hiển thị: bốn cột Từ; Sự kiện; Đến; Cổng kiểm theo phân loại — và năm dòng cạnh
  Chức năng và logic: chỉ đọc; cột cổng kiểm chỉ có giá trị ở đúng một dòng là cạnh gỡ tạm ngừng; bốn dòng còn lại không có cổng kiểm
- qa: - Có cạnh nào cần thời hạn tự động không; ví dụ hồ sơ ở trạng thái xét lại quá lâu thì đi đâu? FIG-010 không có cạnh nào rời xét lại ngoài chấp thuận.

### Item 4.1.1: Hàng cạnh gỡ tạm ngừng

- itemId: img-019
- parentNo: 4.1
- position: startX=43 startY=814 endX=1010 endY=843
- nameJP: 停止解除の遷移行
- nameTrans: Unsuspend transition row
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
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: dòng quan trọng nhất của bảng — FIG-010 chỉ có một cạnh này; cái khác nhau theo phân loại là thủ tục và thẩm quyền trên cạnh đó
  Thành phần hiển thị: trạng thái nguồn Tạm ngừng; sự kiện Gỡ tạm ngừng; trạng thái đích Có hiệu lực; ô cổng kiểm ghi có kèm chỉ dẫn xuống bảng dưới
  Chức năng và logic: một cạnh duy nhất có cổng kiểm; không tách thành ba cạnh song song theo phân loại
- qa: -

### Item 4.2: Ghi chú một cạnh chứ không phải ba

- itemId: img-020
- parentNo: 4
- position: startX=42 startY=933 endX=1010 endY=966
- nameJP: 単一遷移の注記
- nameTrans: Single-edge note
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
  Mục đích và ngữ cảnh: chặn cách đọc sai phổ biến nhất của FN-02 — dựng ba cạnh gỡ tạm ngừng cho ba phân loại rồi mâu thuẫn với FIG-010
  Thành phần hiển thị: một đoạn ghi chú dưới bảng cạnh
  Chức năng và logic: tĩnh; khai rõ mọi cặp trạng thái và sự kiện ngoài năm dòng đều bị từ chối; kể cả cặp mất hiệu lực sang có hiệu lực và cặp tạm ngừng sang xét lại
- qa: -

### Item 4.3: Bảng cổng kiểm theo phân loại

- itemId: img-021
- parentNo: 4
- position: startX=42 startY=976 endX=1010 endY=1123
- nameJP: 区分別ゲート表
- nameTrans: Category gate table
- itemType: table
- itemSubtype: guard_table
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
- databaseColumn: category; license_type; valid_to
- databaseNote: Cổng kiểm cần đọc cả ba cột này; prototype hiện chỉ đọc cột trạng thái khi chuyển nên không thể phân biệt thủ tục.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: mã hoá cột Gỡ tạm ngừng của FIG-004 thành điều kiện tiền đề và thẩm quyền cho cùng một cạnh; đây là chỗ RFP §02-08 được thi hành
  Thành phần hiển thị: bốn cột Phân loại; Thủ tục gỡ tạm ngừng; Ai quyết định; Điều kiện tiền đề — và bốn dòng phân loại
  Chức năng và logic: chỉ đọc; bốn dòng đi qua cùng một cạnh; nút gỡ tạm ngừng phải mang đúng tên thủ tục của phân loại đang xem chứ không dùng một nhãn chung
- qa: - Bằng chứng của thủ tục Chấp thuận và thủ tục Xét lại lưu ở đâu để cổng kiểm đọc được? Thiết kế nêu ai quyết định nhưng chưa nêu nơi lưu quyết định.

### Item 4.3.1: Hàng cổng kiểm theo phân loại (đại diện cho bốn hàng)

- itemId: img-022
- parentNo: 4.3
- position: startX=43 startY=1004 endX=1010 endY=1033
- nameJP: ゲート行
- nameTrans: Gate row
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
- databaseTable: -
- databaseColumn: -
- databaseNote: -
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một phân loại và cổng kiểm của nó trên cạnh gỡ tạm ngừng; bốn hàng cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: tên phân loại; tên thủ tục theo FIG-004; ai quyết định; điều kiện tiền đề phải đạt
  Chức năng và logic: chỉ đọc; điều kiện tiền đề là thứ tầng dịch vụ phải kiểm trước khi cho đi qua cạnh; không đạt thì cạnh bị từ chối kèm lý do nói rõ còn thiếu bước nào
- qa: -

### Item 4.3.2: Nhãn chưa chốt trong bảng cổng kiểm (đại diện)

- itemId: img-023
- parentNo: 4.3
- position: startX=612 startY=1038 endX=681 endY=1058
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
  Mục đích và ngữ cảnh: đánh dấu hai chỗ RFP không có dữ liệu — nghĩa của thủ tục Có điều kiện cho 仲卸; và toàn bộ dòng 買出人
  Thành phần hiển thị: một nhãn chữ ngắn trong ô bảng; các nhãn cùng dạng nên gộp một đại diện
  Chức năng và logic: chỉ đọc; ô mang nhãn này thì nút gỡ tạm ngừng của phân loại tương ứng không được mở cho tới khi khách chốt
- qa: - Thủ tục Có điều kiện của 仲卸 gồm những điều kiện gì; và 買出人 dùng thủ tục nào? Hai câu này chặn việc mở nút gỡ tạm ngừng cho hai phân loại đó.

### Item 4.4: Trường lý do chuyển trạng thái

- itemId: img-024
- parentNo: 4
- position: startX=42 startY=1134 endX=1010 endY=1210
- nameJP: 変更理由
- nameTrans: Transition reason
- itemType: textarea
- itemSubtype: multiline_input
- buttonType: -
- dataType: string
- format: none
- required: true
- minLength: 1
- maxLength: 1000
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant_status_history
- databaseColumn: reason
- databaseNote: Prototype ghi lý do vào cả bảng lịch sử chuyển trạng thái và bản ghi kiểm toán; cột lý do của bảng lịch sử là không rỗng.
- validationNote:
  Điều kiện: lý do rỗng hoặc chỉ gồm khoảng trắng
  Lỗi: "Vui lòng nhập lý do trước khi chuyển trạng thái."
- description:
  Mục đích và ngữ cảnh: FR-AUDIT-01 đòi mọi lần chuyển trạng thái truy được lý do; lý do cũng là dữ liệu của sổ vòng đời hiệu lực
  Thành phần hiển thị: nhãn song ngữ Lý do chuyển trạng thái · 変更理由 kèm dấu bắt buộc và một ô nhập nhiều dòng
  Chức năng và logic: bắt buộc với cả năm cạnh; chặn ngay ở giao diện khi rỗng và bị từ chối lần nữa ở tầng dịch vụ
- qa: -

### Item 4.5: Nút cạnh vi phạm sang tạm ngừng

- itemId: img-025
- parentNo: 4
- position: startX=42 startY=1210 endX=187 endY=1239
- nameJP: 違反による停止
- nameTrans: Suspend on violation
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
- transitionNote: Chuyển profile sang trạng thái tạm ngừng; nạp lại khối profile và khối lịch sử
- databaseTable: participant
- databaseColumn: status
- databaseNote: Ghi cột trạng thái của thực thể người tham gia cộng một dòng lịch sử chuyển trạng thái; prototype ghi hai bảng tuần tự chứ không nguyên tử.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: cạnh thứ nhất của FIG-010 — đưa profile đang có hiệu lực sang tạm ngừng khi có vi phạm
  Thành phần hiển thị: một nút chữ mang tên cạnh dạng sự kiện rồi trạng thái đích
  Chức năng và logic: chỉ hiện khi trạng thái hiện tại là có hiệu lực; đòi lý do trước khi bấm; cạnh này không có cổng kiểm theo phân loại
- qa: -

### Item 4.6: Nút cạnh hết hạn sang mất hiệu lực

- itemId: img-026
- parentNo: 4
- position: startX=190 startY=1210 endX=338 endY=1239
- nameJP: 期限切れによる失効
- nameTrans: Expire to ineligible
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
- transitionNote: Chuyển profile sang trạng thái mất hiệu lực; nạp lại khối profile và khối lịch sử
- databaseTable: participant
- databaseColumn: status
- databaseNote: Không có tác vụ định kỳ nào lật trạng thái ở ngày hết hiệu lực nên cạnh này là đường duy nhất để trạng thái đã lưu bắt kịp thực tế.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: cạnh thứ ba của FIG-010 — đánh dấu profile đã qua ngày hết hiệu lực; đây cũng là hành động mà màn cảnh báo SC-07 dẫn về
  Thành phần hiển thị: một nút chữ mang tên cạnh dạng sự kiện rồi trạng thái đích
  Chức năng và logic: chỉ hiện khi trạng thái hiện tại là có hiệu lực; đòi lý do; cạnh này không có cổng kiểm theo phân loại
- qa: - Cạnh hết hạn nên do người bấm hay do hệ thống tự lật ở ngày hết hiệu lực? Nếu tự lật thì chủ thể của bản ghi kiểm toán là ai.

### Item 4.7: Ghi chú chỉ hiện cạnh hợp lệ

- itemId: img-027
- parentNo: 4
- position: startX=42 startY=1242 endX=1010 endY=1275
- nameJP: 有効遷移のみ表示
- nameTrans: Show only valid edges note
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
  Mục đích và ngữ cảnh: giữ giao diện và tầng dịch vụ nói cùng một câu; hiện cả năm nút rồi vô hiệu bớt sẽ khiến người dùng đoán sai vòng đời
  Thành phần hiển thị: một đoạn ghi chú dưới các nút cạnh
  Chức năng và logic: tĩnh; đòi nút gỡ tạm ngừng mang đúng tên thủ tục của phân loại đang xem vì đó là ba việc nghiệp vụ khác nhau
- qa: -

### Item 5: Khối lịch sử vòng đời

- itemId: img-028
- parentNo: -
- position: startX=26 startY=1314 endX=1026 endY=1509
- nameJP: ライフサイクル履歴ブロック
- nameTrans: Lifecycle history block
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
  Mục đích và ngữ cảnh: sổ vòng đời hiệu lực của profile; là bằng chứng truy vết cho FR-AUDIT-01 và là dữ liệu để SC-07 biết hồ sơ đã nộp đơn xét lại chưa
  Thành phần hiển thị: bảng sáu cột theo thứ tự cũ nhất trước; một đoạn ghi chú về cột và về múi giờ
  Chức năng và logic: chỉ đọc và chỉ ghi thêm — không có đường sửa hay xoá dòng lịch sử
- qa: -

### Item 5.1: Bảng sáu cột lịch sử chuyển trạng thái

- itemId: img-029
- parentNo: 5
- position: startX=42 startY=1358 endX=1010 endY=1447
- nameJP: 遷移履歴テーブル
- nameTrans: Transition history table
- itemType: table
- itemSubtype: data_table
- buttonType: -
- dataType: -
- format: -
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant_status_history
- databaseColumn: from_status; to_status; reason; changed_by; changed_at
- databaseNote: Prototype có năm cột này nhưng không có cột thủ tục áp dụng nên cùng một cạnh gỡ tạm ngừng không phân biệt được thủ tục trong lịch sử.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một dòng một lần chuyển trạng thái; cột Thủ tục áp dụng là thứ FIG-004 đòi truy được vì cùng một cạnh nhưng khác thủ tục thì phải phân biệt được trong lịch sử
  Thành phần hiển thị: sáu cột tiêu đề song ngữ; các dòng lịch sử; badge cho hai cột trạng thái
  Chức năng và logic: sắp cũ nhất trước để đọc như một dòng thời gian; người thực hiện hiện bằng tên và không hiện địa chỉ thư điện tử; thời điểm neo múi giờ Nhật
- qa: -

### Item 5.1.1: Dòng lịch sử chuyển trạng thái (đại diện cho hai dòng mẫu)

- itemId: img-030
- parentNo: 5.1
- position: startX=43 startY=1386 endX=1010 endY=1416
- nameJP: 履歴行
- nameTrans: History row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: -
- format: thời điểm theo YYYY-MM-DD HH:mm JST
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant_status_history
- databaseColumn: from_status; to_status; reason; changed_by; changed_at
- databaseNote: Cột trạng thái nguồn cho phép rỗng trong prototype; hai cột trạng thái của bảng lịch sử không có CHECK nên có thể mang giá trị ngoài FIG-010.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một lần chuyển trạng thái; hai dòng mẫu trên wireframe cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: badge trạng thái nguồn và đích; thủ tục áp dụng; lý do; tên người thực hiện; thời điểm kèm hậu tố múi giờ
  Chức năng và logic: dòng đầu tiên của một profile có cột Từ trống vì không có trạng thái nguồn; mọi thời điểm neo múi giờ Nhật và hiện hậu tố để không đọc lệch theo máy người dùng
- qa: -
