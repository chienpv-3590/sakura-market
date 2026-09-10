# Items Analysis - SC-15 · Danh sách giao hàng

## Screen context

- **screen**: SC-15 · Danh sách giao hàng
- **source-family**: image
- **source-token**: SC-15-danh-sach-giao-hang
- **source-image**: .momorph/shots/SC-15-danh-sach-giao-hang.png
- **canvas**: 1280 x 1588 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-020 (FN-06) · ưu tiên P0
- **requirement-refs**: FR-DEL-01 (RFP:681) · liên quan FR-DEL-05 (RFP:685) · FIG-014 (RFP:693) · FIG-029 (RFP:714)
- **data-domain**: D-DELIVERY · D-TRADE (RFP:733)
- **actor**: Bộ phận vận chuyển (ROLE-DELIVERY) — điểm vào chung của khâu giao nhận
- **note**: Màn chỉ đọc; mọi đường ghi nằm ở SC-16 và SC-17
- **batch**: 2/3 (15 items)

### Item 3.2: Ghi chú điều hướng và lũy kế

- **itemId**: img-016
- **itemName**: Ghi chú điều hướng và lũy kế
- **nameJP**: 遷移注記
- **nameTrans**: Navigation note
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
  Mục đích và ngữ cảnh: nói rõ ranh giới đọc và ghi giữa màn danh sách và hai màn tiếp theo
  Thành phần hiển thị: một đoạn chú thích hai dòng nhắc SC-16; SC-17 và hai cột lũy kế
  Chức năng và logic: tĩnh; đây là chú thích thiết kế chứ không phải thành phần chạy
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=574 endX=1010 endY=606

### Item 4: Khối nghĩa nghiệp vụ của bốn trạng thái

- **itemId**: img-017
- **itemName**: Khối nghĩa nghiệp vụ của bốn trạng thái
- **nameJP**: 状態定義パネル
- **nameTrans**: Status definition panel
- **itemType**: others
- **itemSubtype**: reference_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: chốt nghĩa nghiệp vụ của bốn trạng thái để tầng sau không tự diễn giải khác
  Thành phần hiển thị: bốn thẻ định nghĩa xếp một hàng
  Chức năng và logic: tĩnh; là phần đặc tả đi kèm màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=646 endX=1026 endY=815

### Item 4.1: Thẻ định nghĩa trạng thái Chờ

- **itemId**: img-018
- **itemName**: Thẻ định nghĩa trạng thái Chờ
- **nameJP**: 待機状態カード
- **nameTrans**: Pending status card
- **itemType**: label
- **itemSubtype**: definition_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: mốc đầu của vòng đời giao hàng
  Thành phần hiển thị: tên trạng thái và điều kiện nhận biết
  Chức năng và logic: trạng thái mặc định khi phiếu giao hàng vừa lập; lũy kế bằng không
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=690 endX=277 endY=799

### Item 4.2: Thẻ định nghĩa trạng thái Đang giao

- **itemId**: img-019
- **itemName**: Thẻ định nghĩa trạng thái Đang giao
- **nameJP**: 配送中状態カード
- **nameTrans**: In-transit status card
- **itemType**: label
- **itemSubtype**: definition_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trạng thái lặp của vòng đời giao hàng một phần
  Thành phần hiển thị: tên trạng thái; điều kiện nhận biết; dẫn chiếu sơ đồ FIG-029
  Chức năng và logic: còn lại lớn hơn không thì mỗi lần giao mới vẫn giữ nguyên trạng thái này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=690 endX=522 endY=799

### Item 4.3: Thẻ định nghĩa trạng thái Hoàn tất

- **itemId**: img-020
- **itemName**: Thẻ định nghĩa trạng thái Hoàn tất
- **nameJP**: 完了状態カード
- **nameTrans**: Completed status card
- **itemType**: label
- **itemSubtype**: definition_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trạng thái cuối; là điều kiện để giao hàng vào bảng đối chiếu ngày
  Thành phần hiển thị: tên trạng thái; điều kiện chốt; ghi chú không quay lại
  Chức năng và logic: chỉ đặt được bằng thao tác chốt của người có quyền; số lượng về không không tự chuyển trạng thái
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=531 startY=690 endX=766 endY=799

### Item 4.4: Thẻ định nghĩa trạng thái Ngoại lệ

- **itemId**: img-021
- **itemName**: Thẻ định nghĩa trạng thái Ngoại lệ
- **nameJP**: 例外状態カード
- **nameTrans**: Exception status card
- **itemType**: label
- **itemSubtype**: definition_card
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: trạng thái đại diện nhánh có chênh lệch của FIG-014
  Thành phần hiển thị: tên trạng thái; bốn loại ngoại lệ; dẫn chiếu FE-023 và FR-DEL-03
  Chức năng và logic: đặt được khi có bản ghi ngoại lệ; nguồn ngoại lệ nằm ở màn SC-17
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=775 startY=690 endX=1010 endY=799

### Item 5: Khối trạng thái màn

- **itemId**: img-022
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
  Mục đích và ngữ cảnh: liệt đủ trạng thái màn phải xử lý để phía thi công không bỏ sót trạng thái rỗng và lỗi
  Thành phần hiển thị: sáu thẻ trạng thái xếp hai hàng
  Chức năng và logic: tĩnh; là phần đặc tả đi kèm màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=828 endX=1026 endY=1133

### Item 5.1: Thẻ trạng thái Có dữ liệu

- **itemId**: img-023
- **itemName**: Thẻ trạng thái Có dữ liệu
- **nameJP**: データあり
- **nameTrans**: Has data state
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
  Mục đích và ngữ cảnh: định thứ tự mặc định của bảng theo việc cần làm trước
  Thành phần hiển thị: điều kiện và quy tắc sắp xếp
  Chức năng và logic: sắp hai mức: ngày nghiệp vụ giảm dần rồi ưu tiên dòng còn hàng chưa giao
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=872 endX=277 endY=998

### Item 5.2: Thẻ trạng thái Rỗng

- **itemId**: img-024
- **itemName**: Thẻ trạng thái Rỗng
- **nameJP**: 空状態
- **nameTrans**: Empty state
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
  Mục đích và ngữ cảnh: bắt buộc phân biệt hai loại rỗng vì hai loại dẫn tới hai việc khác nhau
  Thành phần hiển thị: hai câu thông báo khác nhau và một đường xoá bộ lọc
  Chức năng và logic: chọn câu theo việc có tiêu chí lọc đang đặt hay không
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=872 endX=522 endY=998

### Item 5.3: Thẻ trạng thái Đang tải và Lỗi tải

- **itemId**: img-025
- **itemName**: Thẻ trạng thái Đang tải và Lỗi tải
- **nameJP**: 読み込み中・読み込みエラー
- **nameTrans**: Loading and load error state
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
  Mục đích và ngữ cảnh: giữ người dùng ở lại màn thay vì rơi về trang trắng hay trang lỗi chung
  Thành phần hiển thị: khung bảng tạm khi đang tải; khối lỗi kèm nút thử lại khi tải lỗi
  Chức năng và logic: tiêu chí lọc được giữ qua lần thử lại để không phải nhập lại
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=531 startY=872 endX=766 endY=998

### Item 5.4: Thẻ trạng thái Ngày đã lock

- **itemId**: img-026
- **itemName**: Thẻ trạng thái Ngày đã lock
- **nameJP**: ロック済み業務日
- **nameTrans**: Locked business day state
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
  Mục đích và ngữ cảnh: nói rõ lock tác động lên trục ghi chứ không lên trục đọc
  Thành phần hiển thị: một câu quy tắc và hệ quả trên màn này
  Chức năng và logic: màn không có đường ghi nên trạng thái này không đổi gì trên giao diện
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=775 startY=872 endX=1010 endY=998

### Item 5.5: Thẻ trạng thái Không có quyền

- **itemId**: img-027
- **itemName**: Thẻ trạng thái Không có quyền
- **nameJP**: 権限なし
- **nameTrans**: No permission state
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
  Mục đích và ngữ cảnh: khai rõ trục đọc không chặn theo vai trò ở màn này
  Thành phần hiển thị: một câu quy tắc và chỉ chỗ nơi vai trò thật sự khác nhau
  Chức năng và logic: màn chỉ đòi phiên đăng nhập còn hiệu lực; không kiểm vai trò
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1007 endX=277 endY=1117

### Item 5.6: Thẻ trạng thái Khối lượng ngày cao điểm

- **itemId**: img-028
- **itemName**: Thẻ trạng thái Khối lượng ngày cao điểm
- **nameJP**: 繁忙日ボリューム
- **nameTrans**: Peak day volume state
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
  Mục đích và ngữ cảnh: đặt yêu cầu hiệu năng thành một trạng thái phải thiết kế chứ không phải việc tối ưu sau
  Thành phần hiển thị: con số tải thiết kế và quy tắc lọc ở tầng truy vấn
  Chức năng và logic: phân trang và lọc phải nằm ở truy vấn; không đọc hết bảng rồi lọc trong bộ nhớ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=1007 endX=522 endY=1117

### Item 6: Khối đối chiếu thiết kế và prototype

- **itemId**: img-029
- **itemName**: Khối đối chiếu thiết kế và prototype
- **nameJP**: プロトタイプ差分パネル
- **nameTrans**: Prototype divergence panel
- **itemType**: others
- **itemSubtype**: comparison_panel
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: gom mọi chỗ bản thi công lệch thiết kế vào một chỗ để người đọc không lẫn thiết kế với hiện trạng
  Thành phần hiển thị: một bảng ba cột: thiết kế đòi; prototype làm; mức
  Chức năng và logic: tĩnh; phần đối chiếu nằm ngoài phạm vi hành vi màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1146 endX=1026 endY=1468

### Item 6.1: Bảng đối chiếu ba cột

- **itemId**: img-030
- **itemName**: Bảng đối chiếu ba cột
- **nameJP**: 差分テーブル
- **nameTrans**: Divergence table
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
  Mục đích và ngữ cảnh: khai năm chỗ lệch của màn danh sách giao hàng kèm mức độ
  Thành phần hiển thị: ba cột và năm dòng; cột mức phân ba loại lệch
  Chức năng và logic: tĩnh; chỉ liệt chỗ lệch chứ không liệt chỗ khớp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1190 endX=1010 endY=1452

