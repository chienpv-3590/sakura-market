# Items Analysis - SC-17 · Ghi nhận ngoại lệ giao hàng

## Screen context

- **screen**: SC-17 · Ghi nhận ngoại lệ giao hàng
- **source-family**: image
- **source-token**: SC-17-ghi-nhan-ngoai-le-giao-hang
- **source-image**: .momorph/shots/SC-17-ghi-nhan-ngoai-le-giao-hang.png
- **canvas**: 1280 x 2172 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-023 (FN-06) · ưu tiên P1
- **requirement-refs**: FR-DEL-03 (RFP:683) · liên quan FR-DEL-01 (RFP:681) · FR-CORR-02 (RFP:657) · FR-SETTLE-01 · RPT-04 (RFP:747) · TBL-ATTACH-01 · DR-IMAGE-01
- **data-domain**: D-DELIVERY (RFP:733)
- **state-machine**: FIG-014 (RFP:693) luồng ngoại lệ khi giao hàng — ba nhánh
- **actor**: Bộ phận vận chuyển (đề xuất ROLE-DELIVERY)
- **note**: Màn thuần thiết kế: prototype chưa có bảng; route hay đường ghi nào cho ngoại lệ
- **batch**: 3/3 (4 items)

### Item 6.6: Thẻ trạng thái Không có quyền

- **itemId**: img-031
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
  Mục đích và ngữ cảnh: phân biệt trục ghi và trục đọc của màn
  Thành phần hiển thị: một câu quy tắc cho từng trục
  Chức năng và logic: trục ghi chặn theo vai trò; trục đọc mở cho mọi vai đang hoạt động
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=286 startY=1508 endX=522 endY=1600

### Item 7: Khối đối chiếu thiết kế và prototype

- **itemId**: img-032
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
- **position**: startX=26 startY=1629 endX=1026 endY=2052

### Item 7.1: Bảng đối chiếu ba cột

- **itemId**: img-033
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
  Mục đích và ngữ cảnh: khai sáu chỗ lệch của màn ghi ngoại lệ kèm mức độ
  Thành phần hiển thị: ba cột và sáu dòng; cột mức phân ba loại lệch
  Chức năng và logic: tĩnh; chỉ liệt chỗ lệch chứ không liệt chỗ khớp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1673 endX=1010 endY=2036

### Item 8: Ghi chú chân màn về phân quyền đề xuất và phụ thuộc

- **itemId**: img-034
- **itemName**: Ghi chú chân màn về phân quyền đề xuất và phụ thuộc
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
  Mục đích và ngữ cảnh: khai phân quyền đề xuất và vẽ rõ hai đầu phụ thuộc của màn
  Thành phần hiển thị: hai đoạn: phân quyền đề xuất; phụ thuộc vào và ra kèm đường dẫn tới bản spec
  Chức năng và logic: tĩnh; là chú thích thiết kế
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=2067 endX=1026 endY=2150

