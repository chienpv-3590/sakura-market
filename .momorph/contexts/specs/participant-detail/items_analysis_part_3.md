# Items Analysis - participant-detail

Màn chi tiết một profile người tham gia cộng vòng đời hiệu lực. Nguồn chân lý: `FE-005` và
`FE-006` (Feature List) · `FR-PARTY-01` (RFP:629). Vòng đời theo `FIG-010` (RFP:609) — **đúng năm
cạnh**, trong đó chỉ có **MỘT** cạnh `Tạm ngừng → Có hiệu lực`. Thủ tục và thẩm quyền trên cạnh đó
khác nhau theo phân loại, theo `FIG-004` (RFP:288-294) cột "Gỡ tạm ngừng" — đó là **điều kiện tiền
đề trên một cạnh**, không phải ba cạnh song song. RFP §02-08 (RFP:309) cấm gộp 許可 và 承認.

Batch 3 of 3 - items 5.2 .. 8

### Item 5.2: Ghi chú cột lịch sử và múi giờ

- itemId: img-031
- parentNo: 5
- position: startX=42 startY=1450 endX=1010 endY=1483
- nameJP: 履歴列の注記
- nameTrans: History column note
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
  Mục đích và ngữ cảnh: chốt ba quy tắc của khối lịch sử — cột Từ trống ở dòng đầu; cột Thủ tục áp dụng là yêu cầu truy vết của FIG-004; và không hiện địa chỉ thư điện tử
  Thành phần hiển thị: một đoạn ghi chú dưới bảng lịch sử
  Chức năng và logic: tĩnh; đòi thời điểm neo múi giờ Nhật thay vì theo múi giờ của máy người dùng
- qa: -

### Item 6: Khối trạng thái màn

- itemId: img-032
- parentNo: -
- position: startX=26 startY=1522 endX=1026 endY=1810
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
  Mục đích và ngữ cảnh: liệt các trạng thái màn phải xử lý; hai trạng thái cuối là đặc thù của màn có chuyển trạng thái
  Thành phần hiển thị: sáu ô trạng thái; mỗi ô có tên và mô tả hành vi mong đợi
  Chức năng và logic: tĩnh trên wireframe nhưng là hợp đồng hành vi cho tầng hiển thị
- qa: -

### Item 6.1: Trạng thái rỗng

- itemId: img-033
- parentNo: 6
- position: startX=42 startY=1566 endX=277 endY=1676
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
  Mục đích và ngữ cảnh: profile mới chưa có lần chuyển trạng thái nào; nhưng khối hành động không bao giờ rỗng
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: chỉ hiện dòng cấp ban đầu ở lịch sử; cả bốn trạng thái của FIG-010 đều có ít nhất một cạnh đi ra nên nút cạnh không bao giờ hết
- qa: -

### Item 6.2: Trạng thái đang tải hoặc lỗi tải

- itemId: img-034
- parentNo: 6
- position: startX=286 startY=1566 endX=522 endY=1676
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
  Mục đích và ngữ cảnh: màn có bốn khối đọc từ nhiều nguồn nên một khối lỗi không được làm trắng cả trang
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: khung xương theo từng khối; khối lỗi hiện riêng và không làm trắng các khối còn lại
- qa: -

### Item 6.3: Trạng thái không tìm thấy

- itemId: img-035
- parentNo: 6
- position: startX=531 startY=1566 endX=766 endY=1676
- nameJP: 未検出
- nameTrans: Not found state
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
  Mục đích và ngữ cảnh: hai nguyên nhân dẫn tới cùng một kết cục — không có profile để hiện
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: profile không tồn tại; hoặc phân loại và trạng thái trong dữ liệu rơi ngoài tập hợp lệ của FR-PARTY-01 và FIG-010; cả hai cùng dẫn tới trang không tìm thấy
- qa: -

### Item 6.4: Trạng thái chỉ đọc

- itemId: img-036
- parentNo: 6
- position: startX=775 startY=1566 endX=1010 endY=1676
- nameJP: 読み取り専用
- nameTrans: Read-only state
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
  Mục đích và ngữ cảnh: vai không có quyền ghi vẫn đọc đủ bốn khối; chặn nằm ở hành động ghi chứ không ở việc đọc
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: giữ nguyên hai khối ghi trên bố cục nhưng đổi nội dung thành dòng nhắc vai trò phụ trách để người dùng biết phải nhờ ai
- qa: -

### Item 6.5: Trạng thái xung đột đồng thời

- itemId: img-037
- parentNo: 6
- position: startX=42 startY=1685 endX=277 endY=1794
- nameJP: 同時実行の競合
- nameTrans: Concurrent conflict state
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
  Mục đích và ngữ cảnh: hai người có quyền ghi cùng chuyển trạng thái một profile; nếu không chặn thì dòng lịch sử của người sau ghi trạng thái nguồn đã sai
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: người sau bị từ chối vì trạng thái nguồn đã đổi; không được ghi đè và không được ghi một dòng lịch sử sai
- qa: -

### Item 6.6: Trạng thái cổng kiểm chưa đạt

- itemId: img-038
- parentNo: 6
- position: startX=286 startY=1685 endX=522 endY=1794
- nameJP: ゲート未達
- nameTrans: Gate not satisfied state
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
  Mục đích và ngữ cảnh: cạnh gỡ tạm ngừng bị chặn vì thủ tục của phân loại đó chưa hoàn tất; đây là trạng thái mà cổng kiểm FIG-004 sinh ra
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: từ chối kèm câu nói rõ còn thiếu bước nào; và khai luôn rằng ngày nghiệp vụ đã lock không liên quan tới màn này vì vòng đời trải nhiều ngày
- qa: -

### Item 7: Khối đối chiếu prototype

- itemId: img-039
- parentNo: -
- position: startX=26 startY=1823 endX=1026 endY=2239
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

- itemId: img-040
- parentNo: 7
- position: startX=42 startY=1867 endX=1010 endY=2223
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
  Mục đích và ngữ cảnh: bảy hạng mục lệch giữa thiết kế và bản thi công; nặng nhất là cạnh gỡ tạm ngừng không có cổng kiểm theo phân loại
  Thành phần hiển thị: ba cột Thiết kế đòi; Prototype làm; Mức — và bảy dòng hạng mục
  Chức năng và logic: chỉ đọc; dòng cuối mang mức cần khách chốt nên không tự quyết ở tầng thi công
- qa: -

### Item 8: Ghi chú chân màn về phân quyền và hiệu lực

- itemId: img-041
- parentNo: -
- position: startX=26 startY=2254 endX=1026 endY=2337
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
  Mục đích và ngữ cảnh: chốt hai điều dễ trôi — chặn nằm ở tầng dịch vụ; và trạng thái đã lưu không tự đổi khi qua ngày hết hiệu lực
  Thành phần hiển thị: hai dòng ghi chú và một đường dẫn tới file spec của màn
  Chức năng và logic: tĩnh; nêu hệ quả cụ thể — một profile có thể mang badge có hiệu lực mà vẫn bị từ chối giao dịch; nhóm đó phải hiện ở SC-07 trước khi tới hiện trường
- qa: -
