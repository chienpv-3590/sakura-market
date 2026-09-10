# Items Analysis - SC-13 · Nhập kết quả せり

## Screen context

- **screen**: SC-13 · Nhập kết quả せり
- **source-family**: image
- **source-token**: SC-13-nhap-ket-qua-seri
- **source-image**: .momorph/shots/SC-13-nhap-ket-qua-seri.png
- **canvas**: 1280 x 2208 px (deviceScaleFactor=1)
- **targetLanguage**: Tiếng Việt (nameJP giữ tiếng Nhật; nameTrans giữ tiếng Anh)
- **feature-refs**: FE-018 (FN-05) · ưu tiên P0
- **requirement-refs**: FR-SERI-01 · FR-SERI-02 · SCOPE-OUT-02 · kế thừa FR-PARTY-02 · BR-PERM-01 · FR-LOT-03 · BR-LOT-02 · FR-CORR-03 · BR-CLOSE-01 · FR-AUDIT-01
- **state-machine**: FIG-012 (RFP:637) — tiêu đề hình phủ cả 相対取引 và せり
- **actor**: Người điều hành đấu giá (ROLE-TRADE)
- **batch**: 3/3 (2 items)

### Item 7.2: Bảng đối chiếu thiết kế và prototype

- **itemId**: img-031
- **itemName**: Bảng đối chiếu thiết kế và prototype
- **nameJP**: -
- **nameTrans**: Design versus prototype table
- **itemType**: table
- **itemSubtype**: divergence_table
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**: -
- **description**:
  Mục đích và ngữ cảnh: liệt kê sáu hạng mục và mức lệch giữa điều thiết kế đòi và điều prototype đang làm
  Thành phần hiển thị: bảng ba cột: Thiết kế đòi; Prototype làm; Mức — sáu dòng với các mức Cần khách chốt; Khác không chủ đích P0; Khớp
  Chức năng và logic: chỉ hiển thị — bốn lệch P0 trên nhánh せり là mất trục trạng thái; thiếu cửa hiệu lực; không trừ tồn lô; và thiếu ràng buộc duy nhất theo lô
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - Trong lúc chờ bổ sung hai cửa kiểm cho nhánh せり thì màn có cần cảnh báo trước khi lưu rằng kết quả chưa được kiểm hiệu lực và chưa trừ tồn không?
  - Lô có hai bản ghi せり do thiếu ràng buộc duy nhất thì màn tra cứu SC-14 cảnh báo trùng ở đâu? Thiết kế không khai chỗ hiển thị cảnh báo.
- **position**: startX=42 startY=1710 endX=1010 endY=2090

### Item 8: Khối ghi chú phân quyền và audit

- **itemId**: img-032
- **itemName**: Khối ghi chú phân quyền và audit
- **nameJP**: -
- **nameTrans**: Permission and audit note
- **itemType**: label
- **itemSubtype**: footer_note
- **buttonType**: -
- **dataType**: -
- **required**: -
- **format**: -
- **minLength**: -
- **maxLength**: -
- **defaultValue**: -
- **validationNote**:
  Điều kiện: ghi kết quả せり thuộc ROLE-TRADE — TBL-ROLE-01 (RFP:245).
  Điều kiện: sửa bản ghi đã có mở thêm cho ROLE-SETTLEMENT — hai việc khác nhau nên hai danh sách vai khác nhau.
  Điều kiện: mọi lần ghi phải để lại logical audit gồm chủ thể; timestamp; before/after và lý do — FR-AUDIT-01 (RFP:710).
- **description**:
  Mục đích và ngữ cảnh: khai phân quyền của màn và nghĩa vụ audit — cùng nói rõ vì sao quyền ghi mới và quyền sửa là hai danh sách vai khác nhau
  Thành phần hiển thị: một khối ghi chú ba đoạn: phân quyền ghi và sửa; nghĩa vụ logical audit; và một liên kết tới bản as-built của prototype
  Chức năng và logic: chỉ hiển thị — quyền sửa bản ghi đã có được đặc tả ở SC-14 chứ không ở màn này
- **userAction**: -
- **transitionNote**: -
- **databaseTable**: -
- **databaseColumn**: -
- **databaseNote**: -
- **qa**:
  - ROLE-SETTLEMENT sửa được nhưng không tạo mới được — có cần chỉ dẫn trên màn này để vai đó biết đường sang SC-14 không?
  - Audit của lần ghi bị chặn vì ngày đã lock có cùng dạng bản ghi với audit của lần ghi thành công không? FR-CORR-03 chỉ đòi có log.
- **position**: startX=26 startY=2121 endX=1026 endY=2186

