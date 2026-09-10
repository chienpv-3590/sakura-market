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
- **batch**: 4/4 (3 items)

### Item 8: Khối đối chiếu thiết kế và prototype

- **itemId**: img-046
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
- **position**: startX=26 startY=1823 endX=1026 endY=2244

### Item 8.1: Bảng đối chiếu ba cột

- **itemId**: img-047
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
  Mục đích và ngữ cảnh: khai sáu chỗ lệch của màn chi tiết giao hàng kèm mức độ
  Thành phần hiển thị: ba cột và sáu dòng; cột mức phân ba loại lệch
  Chức năng và logic: tĩnh; chỉ liệt chỗ lệch chứ không liệt chỗ khớp
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=42 startY=1867 endX=1010 endY=2228

### Item 9: Ghi chú chân màn về phân quyền

- **itemId**: img-048
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
  Mục đích và ngữ cảnh: khai phân quyền theo thao tác và nói rõ chỗ chưa có căn cứ từ yêu cầu khách
  Thành phần hiển thị: hai đoạn: phân quyền theo thao tác; đường dẫn tới bản as-built
  Chức năng và logic: tĩnh; là chú thích thiết kế
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**: -
- **position**: startX=26 startY=2259 endX=1026 endY=2307

