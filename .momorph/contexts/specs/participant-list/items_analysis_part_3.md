# Items Analysis - participant-list

Màn tra cứu người tham gia của FN-02. Nguồn chân lý là `FE-005` (Feature List) và `FR-PARTY-01`
(RFP:629): lưu profile theo **bốn** phân loại 卸売業者 / 仲卸 / 売買参加者 / 買出人, **không được
gộp**. Bảng căn cứ tham gia trên màn chép `FIG-004` (RFP:288-294); RFP §02-08 (RFP:309) cấm gộp
許可 và 承認 thành một quy tắc chung. Trạng thái hiệu lực theo `FIG-010` (RFP:609) — bốn giá trị.
Đây là spec **thiết kế**, không phải ảnh của prototype.

Batch 3 of 3 - items 6.6 .. 8

### Item 6.6: Trạng thái ngày nghiệp vụ đã lock

- itemId: img-031
- parentNo: 6
- position: startX=286 startY=1227 endX=522 endY=1336
- nameJP: 業務日ロック
- nameTrans: Locked business day state
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
  Mục đích và ngữ cảnh: khai rõ màn này không có trạng thái chỉ đọc vì lock kỳ; profile người tham gia trải nhiều ngày nghiệp vụ
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: màn không bao giờ trả lỗi khoá kỳ; lock kỳ của FR-SETTLE-02 áp cho bản ghi thuộc một ngày nghiệp vụ chứ không cho vòng đời hiệu lực
- qa: -

### Item 7: Khối đối chiếu prototype

- itemId: img-032
- parentNo: -
- position: startX=26 startY=1365 endX=1026 endY=1652
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
  Mục đích và ngữ cảnh: đặt cạnh nhau thiết kế đòi gì và bản thi công hiện làm gì để phần đọc spec không lẫn hai chuyện
  Thành phần hiển thị: tiêu đề khối và một bảng ba cột
  Chức năng và logic: chỉ đọc; là phần đối chiếu chứ không phải phần thiết kế
- qa: -

### Item 7.1: Bảng đối chiếu ba cột

- itemId: img-033
- parentNo: 7
- position: startX=42 startY=1409 endX=1010 endY=1636
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
  Mục đích và ngữ cảnh: năm hạng mục lệch giữa thiết kế và bản thi công; mỗi dòng gắn một mức để phân biệt lệch có chủ đích với lệch phải sửa
  Thành phần hiển thị: ba cột Thiết kế đòi; Prototype làm; Mức — và năm dòng hạng mục
  Chức năng và logic: chỉ đọc; mức cần khách chốt nghĩa là không tự quyết ở tầng thi công
- qa: -

### Item 8: Ghi chú chân màn về phân quyền và audit

- itemId: img-034
- parentNo: -
- position: startX=26 startY=1667 endX=1026 endY=1750
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
  Mục đích và ngữ cảnh: chốt hai điều dễ trôi — chặn phải nằm ở tầng dịch vụ chứ không ở việc ẩn nút; và mọi lần tạo hoặc sửa profile phải ghi audit
  Thành phần hiển thị: hai dòng ghi chú và một đường dẫn tới file spec của màn
  Chức năng và logic: tĩnh; nói rõ cảnh báo sắp hết hiệu lực là màn riêng SC-07 chứ không nhồi vào bảng này
- qa: - Ghi audit cho thao tác đọc danh sách có cần không? FR-AUDIT-01 chỉ liệt tạo; sửa; phê duyệt; lock và đổi quyền.
