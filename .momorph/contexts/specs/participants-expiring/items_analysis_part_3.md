# Items Analysis - participants-expiring

Màn cảnh báo profile sắp hết hiệu lực. Nguồn chân lý: `FE-008` (Feature List) · `FR-PARTY-03`
(RFP:631) — cảnh báo theo **khoảng cảnh báo cấu hình được**, trước ngày mất hiệu lực. Ba đường
xử lý tách theo **căn cứ tham gia** vì RFP §02-08 (RFP:309) cấm gộp 許可 và 承認 thành một quy tắc
chung. Cột "Gỡ tạm ngừng" của `FIG-004` (RFP:288-294) và năm cạnh của `FIG-010` (RFP:609) quyết
định hành động nào hợp lệ trên từng dòng. Đây là spec **thiết kế** — màn chưa thi công.

Batch 3 of 3 - items 7.1 .. 10

### Item 7.1: Bảng danh sách đường đăng ký chợ

- itemId: img-031
- parentNo: 7
- position: startX=42 startY=1255 endX=1010 endY=1354
- nameJP: 市場登録ルート一覧
- nameTrans: Market registration route table
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
- databaseNote: Prototype gán căn cứ đăng ký cho cả hai phân loại này; nhưng yêu cầu khách không có dòng nào cho một trong hai nên việc gán đó là suy luận chứ không phải văn bản.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: danh sách profile đăng ký chợ sắp hết hiệu lực; gồm cả hai phân loại dùng cùng căn cứ này
  Thành phần hiển thị: sáu cột gồm số ngày còn lại; tên; phân loại; ngày hết hiệu lực; badge trạng thái; cột hành động
  Chức năng và logic: cột hành động khác nhau theo phân loại — dòng 卸売業者 có nút ghi nhận đã đăng ký lại; dòng 買出人 để nhãn chưa chốt vì RFP không có thủ tục nào
- qa: -

### Item 7.1.1: Dòng cảnh báo đăng ký chợ (đại diện cho hai dòng mẫu)

- itemId: img-032
- parentNo: 7.1
- position: startX=43 startY=1283 endX=1010 endY=1323
- nameJP: 市場登録警告行
- nameTrans: Market registration warning row
- itemType: label
- itemSubtype: table_row
- buttonType: -
- dataType: integer
- format: số ngày là số nguyên
- required: -
- minLength: -
- maxLength: -
- defaultValue: -
- userAction: -
- transitionNote: -
- databaseTable: participant
- databaseColumn: name; category; license_type; status; valid_to
- databaseNote: Cùng nguồn dữ liệu với hai đường trên.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: một profile đăng ký chợ sắp hết hiệu lực; hai dòng mẫu cùng cấu trúc nên gộp một đại diện
  Thành phần hiển thị: số ngày còn lại; tên; phân loại; ngày hết hiệu lực; badge trạng thái; ô hành động
  Chức năng và logic: ô hành động của dòng 買出人 mang nhãn chưa chốt thay vì một nút; dòng vẫn phải hiện để không bỏ sót cảnh báo
- qa: -

### Item 7.2: Nút ghi nhận đã đăng ký lại

- itemId: img-033
- parentNo: 7
- position: startX=802 startY=1288 endX=949 endY=1317
- nameJP: 再登録の記録
- nameTrans: Record re-registration
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
- transitionNote: Ở lại màn; đánh dấu dòng đã đăng ký lại
- databaseTable: -
- databaseColumn: -
- databaseNote: Thiết kế đòi một chỗ lưu mốc đã đăng ký lại; prototype chưa có thực thể nào cho việc này nên để trống.
- validationNote: -
- description:
  Mục đích và ngữ cảnh: thủ tục của căn cứ đăng ký chợ là đăng ký lại; theo FIG-004 thì 卸売業者 đi lối chấp thuận nên ở đây chỉ ghi nhận mốc
  Thành phần hiển thị: một nút chữ trong cột hành động của dòng 卸売業者
  Chức năng và logic: ghi nhận mốc đã đăng ký lại; không đổi trạng thái vòng đời vì FIG-010 không có cạnh cho việc đăng ký lại
- qa: -

### Item 7.3: Nhãn chưa chốt ở ô hành động của 買出人

- itemId: img-034
- parentNo: 7
- position: startX=802 startY=1328 endX=872 endY=1348
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
  Mục đích và ngữ cảnh: giữ ô hành động trống có chủ đích cho phân loại mà RFP không có dòng nào; suy ra thủ tục từ dòng gần giống là lấp bằng suy luận
  Thành phần hiển thị: một nhãn chữ ngắn trong ô hành động của dòng
  Chức năng và logic: chỉ đọc; dòng vẫn hiện trong danh sách cảnh báo nhưng không có nút nào ngoài đường mở chi tiết
- qa: - 買出人 có thủ tục gia hạn nào và ai được ghi nhận nó? Không có câu trả lời thì ô hành động của phân loại này phải để trống chứ không dùng lối của phân loại khác.

### Item 7.4: Ghi chú 買出人 không có dòng trong FIG-004

- itemId: img-035
- parentNo: 7
- position: startX=42 startY=1357 endX=1010 endY=1389
- nameJP: 買出人の欠落行の注記
- nameTrans: Note on the missing market-buyer row
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
  Mục đích và ngữ cảnh: nói thẳng chỗ tài liệu khách thiếu; và nói rõ hệ quả cho màn là để trống ô hành động chứ không bỏ dòng
  Thành phần hiển thị: một đoạn ghi chú dưới bảng
  Chức năng và logic: tĩnh; đòi dòng của phân loại đó vẫn phải hiện để không bỏ sót cảnh báo; và cấm suy thủ tục ra từ phân loại khác
- qa: -

### Item 8: Khối trạng thái màn

- itemId: img-036
- parentNo: -
- position: startX=26 startY=1429 endX=1026 endY=1750
- nameJP: 画面状態ブロック
- nameTrans: Screen state block
- itemType: others
- itemSubtype: state_matrix
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
  Mục đích và ngữ cảnh: liệt các trạng thái màn phải xử lý; ba trạng thái là đặc thù của màn có ba đường song song
  Thành phần hiển thị: sáu ô trạng thái; mỗi ô có tên và mô tả hành vi mong đợi
  Chức năng và logic: tĩnh trên wireframe nhưng là hợp đồng hành vi cho tầng hiển thị
- qa: -

### Item 8.1: Trạng thái rỗng

- itemId: img-037
- parentNo: 8
- position: startX=42 startY=1473 endX=277 endY=1582
- nameJP: 空状態
- nameTrans: Empty state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: danh sách rỗng phải nói rõ đang xem cửa sổ bao nhiêu ngày; rỗng mà không biết ngưỡng thì người dùng không biết tin được hay không
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: thông báo hiện riêng từng đường và kèm ngưỡng đang áp dụng của đường đó
- qa: -

### Item 8.2: Trạng thái rỗng một đường

- itemId: img-038
- parentNo: 8
- position: startX=286 startY=1473 endX=522 endY=1582
- nameJP: 片ルート空
- nameTrans: Single route empty state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: ẩn một khối rỗng làm người dùng tưởng đã kiểm cả ba đường trong khi chỉ thấy hai
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: khối rỗng vẫn giữ tiêu đề và ngưỡng của nó; ẩn khối là mất thông tin rằng đường đó đã kiểm và sạch
- qa: -

### Item 8.3: Trạng thái đang tải hoặc lỗi tải

- itemId: img-039
- parentNo: 8
- position: startX=531 startY=1473 endX=766 endY=1582
- nameJP: 読み込み・エラー
- nameTrans: Loading or error state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: ba đường tải song song nên một đường lỗi không được làm trắng cả màn
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: khung xương cho cả ba đường; khối lỗi có nút thử lại và giữ nguyên bộ lọc đang chọn
- qa: -

### Item 8.4: Trạng thái quá hạn mà trạng thái chưa đổi

- itemId: img-040
- parentNo: 8
- position: startX=775 startY=1473 endX=1010 endY=1582
- nameJP: 期限切れ未反映
- nameTrans: Expired but status unchanged state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: đây là nhóm nguy hiểm nhất — trạng thái đã lưu nói còn hiệu lực nhưng ngày đã qua nên giao dịch sẽ bị từ chối ngay tại quầy
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: nhãn cảnh báo nặng hơn nhóm còn lại; và nút hành động của dòng đổi sang cạnh chuyển sang mất hiệu lực
- qa: -

### Item 8.5: Trạng thái đang gửi hoặc gửi lỗi

- itemId: img-041
- parentNo: 8
- position: startX=42 startY=1591 endX=277 endY=1734
- nameJP: 送信中・送信エラー
- nameTrans: Submitting or submit error state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: màn có nhiều nút hành động trên nhiều dòng; khoá cả bảng khi gửi một dòng làm người dùng mất việc
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: chỉ nút của đúng dòng bị vô hiệu; lỗi hiện trên đúng dòng và giữ nguyên trạng thái cũ; nút dựng từ danh sách cũ có thể trỏ vào một cạnh đã không còn hợp lệ nên tầng dịch vụ phải từ chối và không tin nút
- qa: -

### Item 8.6: Trạng thái không xác định được căn cứ

- itemId: img-042
- parentNo: 8
- position: startX=286 startY=1591 endX=522 endY=1734
- nameJP: 根拠不明
- nameTrans: Undetermined basis state
- itemType: label
- itemSubtype: state_card
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
  Mục đích và ngữ cảnh: dữ liệu cũ có thể mang cặp phân loại và căn cứ không khớp FIG-004; nhét dòng đó vào một đường là chọn hộ một thủ tục gia hạn
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: xếp riêng thành nhóm không xác định được căn cứ; không có hành động nào ngoài đường mở chi tiết
- qa: -

### Item 9: Khối đối chiếu prototype

- itemId: img-043
- parentNo: -
- position: startX=26 startY=1763 endX=1026 endY=2133
- nameJP: プロトタイプ差分ブロック
- nameTrans: Prototype divergence block
- itemType: others
- itemSubtype: divergence_block
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
  Mục đích và ngữ cảnh: đặt cạnh nhau thiết kế đòi gì và bản thi công hiện làm gì; màn chưa dựng nên phần lớn là thiếu chứ không phải lệch
  Thành phần hiển thị: tiêu đề khối và một bảng ba cột
  Chức năng và logic: chỉ đọc; là phần đối chiếu chứ không phải phần thiết kế
- qa: -

### Item 9.1: Bảng đối chiếu ba cột

- itemId: img-044
- parentNo: 9
- position: startX=42 startY=1808 endX=1010 endY=2117
- nameJP: 差分テーブル
- nameTrans: Divergence table
- itemType: table
- itemSubtype: comparison_table
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
  Mục đích và ngữ cảnh: sáu hạng mục lệch; nặng nhất là ngưỡng cảnh báo đang là hằng số cứng trong mã của một báo cáo chứ không phải dữ liệu cấu hình
  Thành phần hiển thị: ba cột Thiết kế đòi; Prototype làm; Mức — và sáu dòng hạng mục
  Chức năng và logic: chỉ đọc; hai dòng cuối mang mức cần khách chốt nên không tự quyết ở tầng thi công
- qa: -

### Item 10: Ghi chú chân màn về phân quyền và cách tính ngày

- itemId: img-045
- parentNo: -
- position: startX=26 startY=2148 endX=1026 endY=2249
- nameJP: フッター注記
- nameTrans: Footer note
- itemType: label
- itemSubtype: footer_note
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
  Mục đích và ngữ cảnh: chốt ba điều dễ trôi — vai trò vào màn còn là đề xuất; ngày hết hiệu lực rỗng không bao giờ vào danh sách; và mọi phép tính ngày neo múi giờ Nhật
  Thành phần hiển thị: hai dòng ghi chú và một đường dẫn tới file spec của màn
  Chức năng và logic: tĩnh; nêu rõ còn 0 ngày nghĩa là hết hiệu lực trong ngày nghiệp vụ hôm nay chứ không phải đã quá hạn; và màn không chạm dữ liệu thuộc phạm vi lock kỳ
- qa: - Vai trò nào được đổi ngưỡng và vai trò nào chỉ được đọc danh sách? Yêu cầu khách giao cho bên dự thầu đề xuất cơ chế phân tách quyền nên đây là quyết định cần khách phê duyệt.
