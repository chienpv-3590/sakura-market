# Items Analysis - SC-16 · Chi tiết giao hàng và các lần giao

## Screen context

- **screen**: SC-16 · Chi tiết giao hàng và các lần giao
- **source-family**: image
- **source-token**: SC-16-chi-tiet-giao-hang-va-cac-lan-giao
- **source-image**: .momorph/shots/SC-16-chi-tiet-giao-hang-va-cac-lan-giao.png
- **canvas**: 1280 x 2329 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-020 · FE-021 · FE-022 · FE-024 (FN-06) · ưu tiên P0 và P1
- **requirement-refs**: FR-DEL-01 (RFP:681) · FR-DEL-02 (RFP:682) · FR-DEL-04 (RFP:684) · FR-DEL-05 (RFP:685) · BR-DEL-03 (RFP:599) · lưu ý RFP:691
- **data-domain**: D-DELIVERY · D-TRADE · D-SETTLE (RFP:733-734)
- **state-machine**: FIG-029 (RFP:714) vòng đời giao hàng một phần; FIG-014 (RFP:693) luồng ngoại lệ
- **actor**: Bộ phận vận chuyển ghi lần giao; bộ phận đối chiếu chốt hoàn tất
- **note**: Hai đường ghi trên một màn với hai vai trò khác nhau
- **batch**: 3/4 (15 items)

### Item 5.1.2: Dòng lần giao (đại diện cho hai dòng mẫu)

- **itemId**: img-031
- **itemName**: Dòng lần giao (đại diện cho hai dòng mẫu)
- **nameJP**: 配送行
- **nameTrans**: Shipment row
- **itemType**: label
- **itemSubtype**: table_row
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: số lượng hai chữ số thập phân; thời điểm YYYY-MM-DD HH:mm; ngày YYYY-MM-DD
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: một dòng là một lần giao thật; đọc ngang là biết ai giao bao nhiêu vào ngày nào
  Thành phần hiển thị: bảy ô dữ liệu; ô cuối là nhãn ngoại lệ liên quan hoặc dấu gạch khi không có
  Chức năng và logic: chỉ đọc; hai dòng mẫu trên hình gộp làm một dòng đại diện vì chỉ khác giá trị
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: delivery_shipment
- **databaseColumn**: seq; qty; shipped_at; business_date; confirmed_by
- **databaseNote**: Hai dòng mẫu chỉ khác giá trị nên gộp thành một dòng đại diện; prototype không có cột mã lần giao nên ô thứ hai chưa có nguồn.
- **qa**: -
- **position**: startX=43 startY=1100 endX=1010 endY=1129

### Item 5.1.3: Nhãn ngoại lệ liên quan trên dòng lần giao

- **itemId**: img-032
- **itemName**: Nhãn ngoại lệ liên quan trên dòng lần giao
- **nameJP**: 関連例外バッジ
- **nameTrans**: Related exception badge
- **itemType**: label
- **itemSubtype**: status_badge
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: loại ngoại lệ kèm số lượng liên quan
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nối một lần giao với ngoại lệ của chính lần đó; là chỗ phía đối chiếu bắt đầu điều tra chênh lệch
  Thành phần hiển thị: một nhãn chữ mang loại ngoại lệ và số lượng liên quan; dấu gạch khi lần giao không có ngoại lệ
  Chức năng và logic: giá trị đến từ bản ghi ngoại lệ gắn với lần giao; nguồn ngoại lệ nằm ở màn SC-17
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: Thiết kế đòi nhãn này để thấy lần giao nào có ngoại lệ; prototype CHƯA TỒN TẠI bảng ngoại lệ giao hàng nào nên ô này luôn rỗng.
- **qa**: -
- **position**: startX=827 startY=1135 endX=908 endY=1154

### Item 5.2: Ghi chú ngày nghiệp vụ riêng của từng lần giao

- **itemId**: img-033
- **itemName**: Ghi chú ngày nghiệp vụ riêng của từng lần giao
- **nameJP**: 業務日注記
- **nameTrans**: Per-shipment business date note
- **itemType**: label
- **itemSubtype**: inline_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chốt quy tắc quyết định số của một lần giao vào kỳ nào
  Thành phần hiển thị: một đoạn chú thích một dòng dẫn FE-025
  Chức năng và logic: tĩnh; là ràng buộc thiết kế nối SC-16 với bảng đối chiếu ngày
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1163 endX=1010 endY=1179

### Item 6: Khối chốt hoàn tất giao hàng

- **itemId**: img-034
- **itemName**: Khối chốt hoàn tất giao hàng
- **nameJP**: 配送完了確定パネル
- **nameTrans**: Delivery completion panel
- **itemType**: others
- **itemSubtype**: action_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: cổng cuối của khâu giao nhận: chỉ chốt khi số lượng đã xác nhận khớp quy tắc quyết toán hiện hành
  Thành phần hiển thị: một nút chốt; một nhãn điều kiện bật nút; một bảng bốn cổng kiểm; một chú thích hậu quả sau khi chốt
  Chức năng và logic: nút chỉ bật khi qua hết bốn cổng kiểm; chốt xong là trạng thái cuối, không quay lại
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1219 endX=1026 endY=1492

### Item 6.1: Nút xác nhận hoàn tất

- **itemId**: img-035
- **itemName**: Nút xác nhận hoàn tất
- **nameJP**: 完了確定ボタン
- **nameTrans**: Confirm completion button
- **itemType**: button
- **itemSubtype**: -
- **buttonType**: text_only
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: trạng thái vô hiệu
- **validationNote**:
  Điều kiện: số lượng đã xác nhận không khớp quy tắc quyết toán hiện hành
  Lỗi: "Số lượng đã xác nhận chưa khớp quy tắc quyết toán."
  Điều kiện: còn lần giao thiếu trường bắt buộc
  Lỗi: "Còn lần giao chưa đủ trường bắt buộc."
  Điều kiện: còn ngoại lệ giao hàng chưa xử lý
  Lỗi: "Còn ngoại lệ giao hàng chưa xử lý."
  Điều kiện: phiếu giao hàng đã ở trạng thái hoàn tất
  Lỗi: "Giao hàng này đã được chốt hoàn tất."
- **description**:
  Mục đích và ngữ cảnh: thao tác duy nhất đưa phiếu giao hàng vào trạng thái cuối
  Thành phần hiển thị: một nút chữ ở trạng thái vô hiệu khi chưa qua cổng kiểm
  Chức năng và logic: chỉ vai đối chiếu bấm được; chốt là trạng thái cuối; sai sót sau đó phải đi đường điều chỉnh có kiểm soát
- **userAction**: on_click
- **transitionNote**: Ở lại màn; chuyển trạng thái sang hoàn tất; khối ghi lần giao biến mất; giao hàng thành đầu vào đủ điều kiện của bảng đối chiếu ngày
- **databaseTable**: delivery
- **databaseColumn**: status
- **databaseNote**: Prototype đặt trạng thái hoàn tất bằng một vòng so-rồi-ghi theo trạng thái cũ và chặn khi số lượng không khớp; nhưng chỉ so bằng đúng số lượng đặt và không đọc cổng kiểm ngoại lệ nào.
- **qa**: -
- **position**: startX=42 startY=1263 endX=217 endY=1292

### Item 6.2: Nhãn điều kiện bật nút chốt

- **itemId**: img-036
- **itemName**: Nhãn điều kiện bật nút chốt
- **nameJP**: 有効化条件タグ
- **nameTrans**: Enable condition tag
- **itemType**: label
- **itemSubtype**: hint_tag
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nói rõ tại chỗ vì sao nút đang vô hiệu, thay vì để người dùng đoán
  Thành phần hiển thị: một nhãn chữ đặt cạnh nút chốt
  Chức năng và logic: tĩnh; nội dung là điều kiện bật nút theo BR-DEL-03
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: - Quy tắc quyết toán hiện hành gồm những gì: chỉ so bằng đúng số lượng đặt; hay có dung sai và quy tắc làm tròn; và quy tắc này có phiên bản theo ngày hiệu lực không? Không có câu trả lời thì cổng kiểm này không dựng được.
- **position**: startX=220 startY=1268 endX=519 endY=1288

### Item 6.3: Bảng bốn cổng kiểm trước khi chốt

- **itemId**: img-037
- **itemName**: Bảng bốn cổng kiểm trước khi chốt
- **nameJP**: 完了前チェックテーブル
- **nameTrans**: Pre-completion gate table
- **itemType**: table
- **itemSubtype**: data_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai đủ bốn điều kiện phải qua trước khi chốt kèm nguồn yêu cầu của từng điều kiện
  Thành phần hiển thị: hai cột và bốn dòng: mô tả cổng kiểm và nguồn yêu cầu
  Chức năng và logic: tĩnh; mỗi dòng là một điều kiện tiền đề mà đường chốt phải kiểm riêng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1303 endX=1010 endY=1446

### Item 6.4: Ghi chú hậu quả sau khi chốt

- **itemId**: img-038
- **itemName**: Ghi chú hậu quả sau khi chốt
- **nameJP**: 確定後注記
- **nameTrans**: Post-completion note
- **itemType**: label
- **itemSubtype**: inline_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: nối trạng thái cuối của màn này với đầu vào của bảng đối chiếu ngày
  Thành phần hiển thị: một đoạn chú thích một dòng dẫn FE-025
  Chức năng và logic: tĩnh; là ràng buộc thiết kế nối SC-16 với SC-18
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1449 endX=1010 endY=1466

### Item 7: Khối trạng thái màn

- **itemId**: img-039
- **itemName**: Khối trạng thái màn
- **nameJP**: 画面状態パネル
- **nameTrans**: Screen state panel
- **itemType**: others
- **itemSubtype**: state_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt đủ trạng thái màn phải xử lý gồm cả tranh chấp ghi đồng thời và ngày đã lock
  Thành phần hiển thị: sáu thẻ trạng thái xếp hai hàng
  Chức năng và logic: tĩnh; là phần đặc tả đi kèm màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1505 endX=1026 endY=1810

### Item 7.1: Thẻ trạng thái Chờ và Đang giao

- **itemId**: img-040
- **itemName**: Thẻ trạng thái Chờ và Đang giao
- **nameJP**: 待機・配送中
- **nameTrans**: Pending and in-transit state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trạng thái làm việc bình thường của màn
  Thành phần hiển thị: đủ năm khối; nút ghi lần giao bật; nút chốt còn vô hiệu
  Chức năng và logic: cả hai đường ghi hiện diện nhưng nút chốt chỉ bật sau khi qua bốn cổng kiểm
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1549 endX=277 endY=1675

### Item 7.2: Thẻ trạng thái Ngoại lệ

- **itemId**: img-041
- **itemName**: Thẻ trạng thái Ngoại lệ
- **nameJP**: 例外状態
- **nameTrans**: Exception state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chặn chốt khi còn chênh lệch chưa giải thích
  Thành phần hiển thị: một dải cảnh báo; một liên kết sang màn ghi ngoại lệ; nút chốt bị khoá
  Chức năng và logic: còn ngoại lệ đang mở thì đường chốt hoàn tất bị khoá cho tới khi ngoại lệ được xử lý
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=1549 endX=522 endY=1675

### Item 7.3: Thẻ trạng thái Hoàn tất

- **itemId**: img-042
- **itemName**: Thẻ trạng thái Hoàn tất
- **nameJP**: 完了状態
- **nameTrans**: Completed state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: bảo toàn số đã chốt
  Thành phần hiển thị: toàn màn chỉ đọc; hai khối ghi biến mất
  Chức năng và logic: không có đường sửa trực tiếp; sai sót phải đi qua yêu cầu điều chỉnh và phê duyệt
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=531 startY=1549 endX=766 endY=1675

### Item 7.4: Thẻ trạng thái Ngày của lần giao đã lock

- **itemId**: img-043
- **itemName**: Thẻ trạng thái Ngày của lần giao đã lock
- **nameJP**: 配送日ロック済み
- **nameTrans**: Shipment day locked state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: giữ số của ngày đã chốt bất biến theo BR-CLOSE-01
  Thành phần hiển thị: một câu quy tắc cho cả ba đường: sửa; xoá và thêm mới
  Chức năng và logic: khoá áp theo ngày nghiệp vụ của chính lần giao chứ không theo ngày của giao dịch cha; chặn cả đường thêm mới
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=775 startY=1549 endX=1010 endY=1675

### Item 7.5: Thẻ trạng thái Hai người ghi cùng lúc

- **itemId**: img-044
- **itemName**: Thẻ trạng thái Hai người ghi cùng lúc
- **nameJP**: 同時記録
- **nameTrans**: Concurrent write state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chống ghi vượt khi hai người cùng ghi một phiếu giao hàng
  Thành phần hiển thị: một câu quy tắc về điểm tuần tự hoá
  Chức năng và logic: lần ghi thua phải đọc lại lũy kế và kiểm lại chặn trên với con số mới trước khi ghi
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1684 endX=277 endY=1794

### Item 7.6: Thẻ trạng thái Không tìm thấy; Không quyền; Đang tải và Lỗi tải

- **itemId**: img-045
- **itemName**: Thẻ trạng thái Không tìm thấy; Không quyền; Đang tải và Lỗi tải
- **nameJP**: 未検出・権限なし・読み込み中・エラー
- **nameTrans**: Not found, no permission, loading and error state
- **itemType**: label
- **itemSubtype**: state_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: gom bốn trạng thái phụ vào một thẻ vì cách xử lý giống nhau
  Thành phần hiển thị: bốn tình huống và cách hiển thị tương ứng
  Chức năng và logic: trục đọc không chặn theo vai trò; trục ghi chặn theo vai trò; tải và lỗi có hiển thị riêng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=1684 endX=522 endY=1794

