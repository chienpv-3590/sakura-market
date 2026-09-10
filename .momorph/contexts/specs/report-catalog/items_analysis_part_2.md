# Items Analysis - SC-25 · Danh mục báo cáo

## Screen context

- **screen**: SC-25 · Danh mục báo cáo
- **source-family**: image
- **source-token**: SC-25-danh-muc-bao-cao
- **source-image**: .momorph/shots/SC-25-danh-muc-bao-cao.png
- **canvas**: 1280 x 1544 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-033 · FE-034 (FN-10) · ưu tiên P0
- **requirement-refs**: FR-RPT-01 (RFP:707) · FR-RPT-03 (RFP:709) · TBL-REPORT-01 (RFP:740-757)
- **data-domain**: D-SETTLE · D-TRADE · D-DELIVERY (RFP:707) — màn danh mục không đọc thực thể nghiệp vụ nào
- **actor**: Mọi người dùng nội bộ đang hoạt động — cả 7 vai trò
- **note**: Danh mục là hằng của yêu cầu khách: đúng 12 mã, không thêm không bớt
- **batch**: 2/2 (10 items)

### Item 4.1: Thẻ trạng thái Rỗng

- **itemId**: img-016
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
  Mục đích và ngữ cảnh: nói rõ vì sao màn không cần trạng thái rỗng
  Thành phần hiển thị: một câu giải thích
  Chức năng và logic: danh mục là hằng của yêu cầu khách nên không có đường nào cho ra danh sách rỗng
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=915 endX=277 endY=1007

### Item 4.2: Thẻ trạng thái Đang tải

- **itemId**: img-017
- **itemName**: Thẻ trạng thái Đang tải
- **nameJP**: 読み込み中
- **nameTrans**: Loading state
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
  Mục đích và ngữ cảnh: giữ người dùng thấy khung trang thay vì màn trắng
  Thành phần hiển thị: một câu mô tả cách hiển thị khi đang tải
  Chức năng và logic: khung trang hiện trước rồi danh mục về sau
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=915 endX=522 endY=1007

### Item 4.3: Thẻ trạng thái Lỗi tải

- **itemId**: img-018
- **itemName**: Thẻ trạng thái Lỗi tải
- **nameJP**: 読み込みエラー
- **nameTrans**: Load error state
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
  Mục đích và ngữ cảnh: phân biệt lỗi tải với danh mục rỗng
  Thành phần hiển thị: một khối lỗi kèm nút tải lại
  Chức năng và logic: lỗi tải không bao giờ hiển thị thành danh mục rỗng vì hai tình huống dẫn tới hai việc khác nhau
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=531 startY=915 endX=766 endY=1007

### Item 4.4: Thẻ trạng thái Không có quyền

- **itemId**: img-019
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
  Mục đích và ngữ cảnh: khai rõ màn không chặn theo vai trò
  Thành phần hiển thị: một câu quy tắc
  Chức năng và logic: màn chỉ đòi phiên đăng nhập còn hiệu lực; nội dung giống nhau cho cả bảy vai trò
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=775 startY=915 endX=1010 endY=1007

### Item 4.5: Thẻ trạng thái Chưa đăng nhập hoặc tài khoản bị vô hiệu

- **itemId**: img-020
- **itemName**: Thẻ trạng thái Chưa đăng nhập hoặc tài khoản bị vô hiệu
- **nameJP**: 未認証・アカウント無効
- **nameTrans**: Unauthenticated or inactive account state
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
  Mục đích và ngữ cảnh: phân biệt hai lý do bị đưa về trang đăng nhập
  Thành phần hiển thị: hai lý do kèm trên đường chuyển về trang đăng nhập
  Chức năng và logic: chuyển về trang đăng nhập kèm mã lý do; không trả trang 404
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1016 endX=277 endY=1091

### Item 4.6: Thẻ trạng thái Đang gửi và gửi lỗi

- **itemId**: img-021
- **itemName**: Thẻ trạng thái Đang gửi và gửi lỗi
- **nameJP**: 送信中・送信エラー
- **nameTrans**: Submitting and submit error state
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
  Mục đích và ngữ cảnh: khai rõ màn không có đường ghi nào
  Thành phần hiển thị: một câu quy tắc
  Chức năng và logic: không có input và không có hành động ghi nên hai trạng thái này không phát sinh
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=1016 endX=522 endY=1091

### Item 4.7: Thẻ trạng thái Read-only vì lock

- **itemId**: img-022
- **itemName**: Thẻ trạng thái Read-only vì lock
- **nameJP**: ロックによる読み取り専用
- **nameTrans**: Read-only due to lock state
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
  Mục đích và ngữ cảnh: khai rõ khoá kỳ không tác động lên màn này
  Thành phần hiển thị: một câu quy tắc
  Chức năng và logic: danh mục không mang ngày nghiệp vụ nên không nằm trong phạm vi khoá kỳ
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=531 startY=1016 endX=766 endY=1091

### Item 5: Khối đối chiếu thiết kế và prototype

- **itemId**: img-023
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
  Mục đích và ngữ cảnh: gom mọi chỗ bản thi công lệch thiết kế vào một chỗ để không lẫn thiết kế với hiện trạng
  Thành phần hiển thị: một bảng ba cột: thiết kế đòi; prototype làm; mức
  Chức năng và logic: tĩnh; phần đối chiếu nằm ngoài phạm vi hành vi màn
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1120 endX=1026 endY=1442

### Item 5.1: Bảng đối chiếu ba cột

- **itemId**: img-024
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
  Mục đích và ngữ cảnh: khai năm chỗ lệch của màn danh mục báo cáo kèm mức độ và nguyên nhân chặn của từng mã còn dữ liệu mẫu
  Thành phần hiển thị: ba cột và năm dòng; cột mức phân bốn loại: thiếu; khác có chủ đích; chưa thi công; lệch tài liệu nội bộ
  Chức năng và logic: tĩnh; chỉ liệt chỗ lệch chứ không liệt chỗ khớp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1164 endX=1010 endY=1426

### Item 6: Ghi chú chân màn về phân quyền

- **itemId**: img-025
- **itemName**: Ghi chú chân màn về phân quyền
- **nameJP**: 画面フッター注記
- **nameTrans**: Screen footer note
- **itemType**: label
- **itemSubtype**: footer_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: khai phân quyền của màn và chỉ chỗ nơi vai trò thật sự khác nhau
  Thành phần hiển thị: hai đoạn: phân quyền; đường dẫn tới bản as-built
  Chức năng và logic: tĩnh; là chú thích thiết kế
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=1457 endX=1026 endY=1522

