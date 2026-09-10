# Items Analysis - participants-expiring

Màn cảnh báo profile sắp hết hiệu lực. Nguồn chân lý: `FE-008` (Feature List) · `FR-PARTY-03`
(RFP:631) — cảnh báo theo **khoảng cảnh báo cấu hình được**, trước ngày mất hiệu lực. Ba đường
xử lý tách theo **căn cứ tham gia** vì RFP §02-08 (RFP:309) cấm gộp 許可 và 承認 thành một quy tắc
chung. Cột "Gỡ tạm ngừng" của `FIG-004` (RFP:288-294) và năm cạnh của `FIG-010` (RFP:609) quyết
định hành động nào hợp lệ trên từng dòng. Đây là spec **thiết kế** — màn chưa thi công.

Batch 2 of 3 - items 4.3 .. 7

### Item 4.3: Bộ lọc trạng thái hiệu lực

- itemId: img-016
- parentNo: 4
- position: startX=532 startY=622 endX=765 endY=717
- nameJP: 有効状態フィルタ
- nameTrans: Eligibility status filter
- itemType: dropdown
- itemSubtype: single_select
- buttonType: -
- dataType: string
- format: một trong bốn trạng thái của FIG-010
- required: false
- minLength: -
- maxLength: -
- defaultValue: Tất cả
- userAction: on_click
- transitionNote: Ở lại màn; nạp lại ba đường theo bộ lọc mới
- databaseTable: participant
- databaseColumn: status
- databaseNote: Prototype có CHECK bốn giá trị FIG-010 trên cột này.
- validationNote:
  Điều kiện: giá trị nằm ngoài bốn trạng thái của FIG-010
  Lỗi: "Trạng thái hiệu lực không hợp lệ."
- description:
  Mục đích và ngữ cảnh: tách nhóm đang xét lại khỏi nhóm còn hiệu lực vì hành động hợp lệ trên hai nhóm khác nhau
  Thành phần hiển thị: nhãn song ngữ Trạng thái hiệu lực · 有効状態; ô chọn; dòng gợi ý liệt bốn trạng thái
  Chức năng và logic: đúng bốn giá trị của FIG-010; trạng thái quyết định nút hành động nào hiện trên dòng
- qa: -

### Item 4.4: Ô chọn bao gồm dòng đã quá hạn

- itemId: img-017
- parentNo: 4
- position: startX=776 startY=622 endX=1010 endY=717
- nameJP: 期限切れを含む
- nameTrans: Include already expired
- itemType: checkbox
- itemSubtype: toggle_filter
- buttonType: -
- dataType: boolean
- format: -
- required: false
- minLength: -
- maxLength: -
- defaultValue: true
- userAction: on_click
- transitionNote: Ở lại màn; nạp lại ba đường theo bộ lọc mới
- databaseTable: participant
- databaseColumn: valid_to; status
- databaseNote: Điều kiện quá hạn tính từ ngày hết hiệu lực so với ngày hôm nay theo múi giờ Nhật; prototype có đủ hai cột nhưng không có tác vụ nào lật trạng thái.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: nhóm đã qua ngày hết hiệu lực mà trạng thái chưa đổi chính là nhóm sẽ bị từ chối giao dịch ngay tại quầy; ẩn nhóm đó đi là ẩn đúng chỗ nguy hiểm nhất
  Thành phần hiển thị: nhãn Bao gồm đã quá hạn; một ô chọn đã bật; một dòng gợi ý nói lý do bật mặc định
  Chức năng và logic: mặc định bật; khi bật thì dòng quá hạn hiện kèm số ngày còn lại âm và nhãn quá hạn
- qa: -

### Item 5: Khối đường 許可 giấy phép

- itemId: img-018
- parentNo: -
- position: startX=26 startY=756 endX=1026 endY=971
- nameJP: 許可ルートブロック
- nameTrans: Permit route block
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
  Mục đích và ngữ cảnh: đường xử lý cho căn cứ giấy phép 許可; gia hạn giấy phép có cơ quan cấp bên ngoài nên hành động nằm ở việc theo dõi hồ sơ chứ không ở việc quyết định
  Thành phần hiển thị: tiêu đề khối mang căn cứ; phân loại áp dụng; ngưỡng đang dùng — cộng bảng sáu cột và một ghi chú
  Chức năng và logic: chỉ nhận dòng có căn cứ là giấy phép; ngưỡng của riêng đường này quyết định dòng nào vào danh sách
- qa: -

### Item 5.1: Bảng danh sách đường 許可

- itemId: img-019
- parentNo: 5
- position: startX=42 startY=800 endX=1010 endY=909
- nameJP: 許可ルート一覧
- nameTrans: Permit route table
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
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_to
- databaseNote: Năm cột đầu đọc từ thực thể người tham gia; cột số ngày còn lại là dẫn xuất và không lưu.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: danh sách profile giấy phép sắp hết hiệu lực; sắp theo số ngày còn lại tăng dần để việc gấp nhất nằm trên cùng
  Thành phần hiển thị: sáu cột gồm số ngày còn lại; tên; phân loại; ngày hết hiệu lực; badge trạng thái; cột hành động
  Chức năng và logic: số ngày còn lại là giá trị dẫn xuất từ ngày hết hiệu lực so với hôm nay theo múi giờ Nhật; dòng đã quá hạn mang giá trị âm kèm nhãn quá hạn
- qa: - Danh sách này có phân trang không; và nếu ngưỡng lớn thì trần bao nhiêu dòng? Thiết kế chưa nói trần.

### Item 5.1.1: Dòng cảnh báo giấy phép (đại diện cho hai dòng mẫu)

- itemId: img-020
- parentNo: 5.1
- position: startX=43 startY=828 endX=1010 endY=868
- nameJP: 許可警告行
- nameTrans: Permit warning row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: integer
- format: số ngày là số nguyên; có thể âm khi đã quá hạn
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_to
- databaseNote: Dòng quá hạn tồn tại thật vì trạng thái đã lưu không tự đổi khi qua ngày hết hiệu lực.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một profile giấy phép sắp hoặc đã hết hiệu lực; hai dòng mẫu cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: số ngày còn lại; tên; phân loại; ngày hết hiệu lực; badge trạng thái; nút hành động của đúng dòng
  Chức năng và logic: số ngày còn lại âm thì hiện kèm nhãn quá hạn và nút hành động đổi sang cạnh chuyển sang mất hiệu lực; nút hành động luôn thuộc dòng chứ không thuộc cả bảng
- qa: -

### Item 5.2: Nút ghi nhận đã nộp hồ sơ gia hạn

- itemId: img-021
- parentNo: 5
- position: startX=765 startY=834 endX=950 endY=863
- nameJP: 更新申請の記録
- nameTrans: Record renewal application
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
- transitionNote: Ở lại màn; đánh dấu dòng đã nộp hồ sơ gia hạn
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi một chỗ lưu mốc đã nộp hồ sơ gia hạn; prototype chưa có thực thể nào cho việc này nên để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: gia hạn giấy phép do cơ quan bên ngoài cấp nên hệ thống chỉ theo dõi được tiến độ hồ sơ; không có quyết định nào để bấm
  Thành phần hiển thị: một nút chữ trong cột hành động của dòng
  Chức năng và logic: ghi nhận mốc đã nộp hồ sơ cho profile của dòng; không đổi trạng thái vòng đời vì FIG-010 không có cạnh nào cho việc nộp hồ sơ gia hạn
- qa: - Mốc đã nộp hồ sơ gia hạn lưu ở đâu và ai được ghi? Yêu cầu FR-PARTY-03 chỉ đòi cảnh báo nên nút này là mở rộng cần khách xác nhận phạm vi.

### Item 5.3: Nút chuyển sang mất hiệu lực

- itemId: img-022
- parentNo: 5
- position: startX=765 startY=874 endX=925 endY=903
- nameJP: 失効へ変更
- nameTrans: Move to ineligible
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
- transitionNote: Chuyển profile của dòng sang trạng thái mất hiệu lực theo cạnh hết hạn của FIG-010
- databaseTable: participant
- databaseColumn: status
- databaseNote: Cùng cạnh chuyển trạng thái đã có ở SC-06; ghi cột trạng thái cộng một dòng lịch sử chuyển trạng thái.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: dòng đã quá ngày hết hiệu lực mà trạng thái vẫn còn hiệu lực; đây là đường để trạng thái đã lưu bắt kịp thực tế
  Thành phần hiển thị: một nút chữ nổi bật trong cột hành động của dòng quá hạn
  Chức năng và logic: đi đúng cạnh hết hạn của FIG-010; đòi lý do như mọi cạnh khác; chỉ hiện khi số ngày còn lại đã âm và trạng thái vẫn là có hiệu lực
- qa: -

### Item 5.4: Ghi chú thủ tục gia hạn giấy phép

- itemId: img-023
- parentNo: 5
- position: startX=42 startY=912 endX=1010 endY=944
- nameJP: 許可手続きの注記
- nameTrans: Permit procedure note
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
  Mục đích và ngữ cảnh: khai rõ vì sao đường này không có nút gỡ tạm ngừng — thủ tục của 仲卸 là có điều kiện mà RFP không định nghĩa điều kiện đó
  Thành phần hiển thị: một đoạn ghi chú dưới bảng
  Chức năng và logic: tĩnh; nói rõ vẽ một nút gỡ dùng chung là gộp hai căn cứ tham gia — đúng điều RFP §02-08 cấm
- qa: -

### Item 6: Khối đường 承認 chấp thuận

- itemId: img-024
- parentNo: -
- position: startX=26 startY=984 endX=1026 endY=1198
- nameJP: 承認ルートブロック
- nameTrans: Approval route block
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
  Mục đích và ngữ cảnh: đường xử lý cho căn cứ chấp thuận 承認; chấp thuận là quyết định của đơn vị vận hành chợ nên hành động nằm hẳn trong hệ thống
  Thành phần hiển thị: tiêu đề khối mang căn cứ; phân loại áp dụng; ngưỡng đang dùng — cộng bảng sáu cột và một ghi chú
  Chức năng và logic: chỉ nhận dòng có căn cứ là chấp thuận; hai nút hành động ứng đúng hai cạnh cuối của FIG-010
- qa: -

### Item 6.1: Bảng danh sách đường 承認

- itemId: img-025
- parentNo: 6
- position: startX=42 startY=1028 endX=1010 endY=1136
- nameJP: 承認ルート一覧
- nameTrans: Approval route table
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
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_to
- databaseNote: Cùng nguồn dữ liệu với đường giấy phép; khác nhau ở điều kiện lọc theo căn cứ tham gia và ở ngưỡng áp dụng.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: danh sách profile chấp thuận sắp hết hiệu lực; cùng sáu cột với đường giấy phép nhưng cột hành động khác hẳn
  Thành phần hiển thị: sáu cột gồm số ngày còn lại; tên; phân loại; ngày hết hiệu lực; badge trạng thái; cột hành động
  Chức năng và logic: nút hành động phụ thuộc trạng thái của dòng — dòng còn hiệu lực thì nộp đơn xét lại; dòng đang xét lại thì chấp thuận lại
- qa: -

### Item 6.1.1: Dòng cảnh báo chấp thuận (đại diện cho hai dòng mẫu)

- itemId: img-026
- parentNo: 6.1
- position: startX=43 startY=1055 endX=1010 endY=1095
- nameJP: 承認警告行
- nameTrans: Approval warning row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: integer
- format: số ngày là số nguyên; có thể bằng không hoặc âm
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_to
- databaseNote: Dòng đang ở trạng thái xét lại tồn tại được vì đó là một trong bốn trạng thái của FIG-010.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một profile chấp thuận sắp hết hiệu lực; hai dòng mẫu cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: số ngày còn lại; tên; phân loại; ngày hết hiệu lực; badge trạng thái; nút hành động của đúng dòng
  Chức năng và logic: số ngày còn lại bằng không nghĩa là hết hiệu lực trong ngày nghiệp vụ hôm nay chứ không phải đã quá hạn; nút hành động đổi theo trạng thái của dòng
- qa: -

### Item 6.2: Nút nộp đơn xét lại

- itemId: img-027
- parentNo: 6
- position: startX=846 startY=1061 endX=953 endY=1090
- nameJP: 再審査申請
- nameTrans: Submit for review
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
- transitionNote: Chuyển profile của dòng sang trạng thái xét lại theo cạnh nộp đơn của FIG-010
- databaseTable: participant
- databaseColumn: status
- databaseNote: Cùng cạnh chuyển trạng thái đã có ở SC-06.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: cạnh thứ tư của FIG-010; là bước đầu của đường xin chấp thuận lại
  Thành phần hiển thị: một nút chữ trong cột hành động của dòng
  Chức năng và logic: FIG-010 chỉ cho cạnh này đi từ trạng thái mất hiệu lực; nên nút đặt trên dòng còn hiệu lực phải được hiểu là đường vào nhanh và tầng dịch vụ vẫn từ chối nếu trạng thái nguồn chưa đúng
- qa: - Nút nộp đơn xét lại đặt trên dòng còn hiệu lực thì nghiệp vụ mong đợi gì — cho nộp đơn trước khi mất hiệu lực; hay chỉ hiện nút sau khi đã mất hiệu lực? FIG-010 chỉ có cạnh đi từ mất hiệu lực.

### Item 6.3: Nút chấp thuận lại

- itemId: img-028
- parentNo: 6
- position: startX=846 startY=1101 endX=948 endY=1130
- nameJP: 再承認
- nameTrans: Re-approve
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
- transitionNote: Chuyển profile của dòng về trạng thái có hiệu lực theo cạnh chấp thuận của FIG-010
- databaseTable: participant
- databaseColumn: status
- databaseNote: Cùng cạnh chuyển trạng thái đã có ở SC-06.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: cạnh thứ năm của FIG-010; chốt quyết định chấp thuận lại của đơn vị vận hành chợ
  Thành phần hiển thị: một nút chữ nổi bật trong cột hành động của dòng đang ở trạng thái xét lại
  Chức năng và logic: chỉ hiện khi trạng thái của dòng là xét lại; đòi lý do như mọi cạnh khác
- qa: -

### Item 6.4: Ghi chú thủ tục chấp thuận

- itemId: img-029
- parentNo: 6
- position: startX=42 startY=1139 endX=1010 endY=1172
- nameJP: 承認手続きの注記
- nameTrans: Approval procedure note
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
  Mục đích và ngữ cảnh: giải thích vì sao đường này có hai nút thật trong khi đường giấy phép chỉ có nút theo dõi hồ sơ
  Thành phần hiển thị: một đoạn ghi chú dưới bảng
  Chức năng và logic: tĩnh; nói rõ cả hai hành động cũng làm được ở SC-06 và màn này chỉ là đường vào nhanh cho công việc theo lô
- qa: -

### Item 7: Khối đường đăng ký chợ

- itemId: img-030
- parentNo: -
- position: startX=26 startY=1211 endX=1026 endY=1416
- nameJP: 市場登録ルートブロック
- nameTrans: Market registration route block
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
  Mục đích và ngữ cảnh: đường xử lý cho căn cứ đăng ký chợ; là đường duy nhất phủ hai phân loại và cũng là đường có một ô chưa chốt
  Thành phần hiển thị: tiêu đề khối mang hai phân loại và ngưỡng đang dùng — cộng bảng sáu cột và một ghi chú
  Chức năng và logic: chỉ nhận dòng có căn cứ là đăng ký chợ; hành động khác nhau theo phân loại vì FIG-004 chỉ có dòng cho một trong hai
- qa: -
