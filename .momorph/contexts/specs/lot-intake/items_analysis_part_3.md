# Items Analysis - lot-intake

Màn tiếp nhận lô hàng của FN-03. Nguồn chân lý: `FE-009` và `FE-013` (Feature List) ·
`FR-LOT-01` (RFP:632) — cấp mã lô duy nhất; kiện hàng; mặt hàng; số lượng ban đầu và chứng từ tiếp
nhận · `NFR-USE-01` (RFP:816) — luồng nhập lô hàng **dùng được bằng bàn phím**, thao tác của
02:00-03:00 sáng theo `FIG-002` (RFP:220). Trạng thái theo `FIG-011` (RFP:616) — **đúng NĂM trạng
thái**, gồm "Đã 下見" mà prototype không có. `BR-LOT-02` (RFP:596) khoá số lượng khả dụng không âm.

Batch 3 of 3 - items 7.4 .. 9

### Item 7.4: Trạng thái thành công

- itemId: img-031
- parentNo: 7
- position: startX=775 startY=1392 endX=1010 endY=1502
- nameJP: 成功
- nameTrans: Success state
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
  Mục đích và ngữ cảnh: kết quả phải nằm lại trên màn để người dùng ghi mã lên kiện hàng
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: đổi hẳn sang thẻ kết quả và hiện mã lô cỡ lớn
- qa: -

### Item 7.5: Trạng thái thành công nhưng chứng từ lỗi

- itemId: img-032
- parentNo: 7
- position: startX=42 startY=1511 endX=277 endY=1620
- nameJP: 証憑失敗
- nameTrans: Attachment failure state
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
  Mục đích và ngữ cảnh: chứng từ là trường bắt buộc nên mất chứng từ mà lô vẫn tạo là một trạng thái không hợp lệ về nghiệp vụ
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: nói rõ chứng từ nào chưa lên được và phải có đường đính kèm lại thật — ở màn này hoặc ở màn chi tiết lô; không được để chứng từ bắt buộc mất im lặng
- qa: -

### Item 7.6: Trạng thái không có quyền

- itemId: img-033
- parentNo: 7
- position: startX=286 startY=1511 endX=522 endY=1620
- nameJP: 権限なし
- nameTrans: No permission state
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
  Mục đích và ngữ cảnh: màn này là màn ghi thuần nên vai không có quyền không có gì để đọc; nhưng vẫn phải biết nhờ ai
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: không hiện form; nói rõ vai nào làm được việc này; chặn phải ở cả tầng vào trang và tầng dịch vụ chứ không chỉ ẩn form
- qa: -

### Item 7.7: Trạng thái ngày nghiệp vụ đã lock

- itemId: img-034
- parentNo: 7
- position: startX=531 startY=1511 endX=766 endY=1620
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
  Mục đích và ngữ cảnh: khai rõ một quyết định dễ bị hiểu là lỗi — tiếp nhận lô vào ngày đã lock là hợp lệ
  Thành phần hiển thị: tên trạng thái và mô tả hành vi
  Chức năng và logic: màn không trả lỗi khoá kỳ; cái bị chặn sau lock là sửa thuộc tính lô ở màn chi tiết chứ không phải việc tiếp nhận
- qa: -

### Item 8: Khối đối chiếu prototype

- itemId: img-035
- parentNo: -
- position: startX=26 startY=1649 endX=1026 endY=2065
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

### Item 8.1: Bảng đối chiếu ba cột

- itemId: img-036
- parentNo: 8
- position: startX=42 startY=1693 endX=1010 endY=2049
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
  Mục đích và ngữ cảnh: bảy hạng mục lệch; nặng nhất là thiếu một trạng thái của FIG-011 và việc chứng từ tiếp nhận không bắt buộc
  Thành phần hiển thị: ba cột Thiết kế đòi; Prototype làm; Mức — và bảy dòng hạng mục
  Chức năng và logic: chỉ đọc; dòng cuối mang mức khác có chủ đích nên không sinh việc sửa; hai dòng mang mức cần khách chốt
- qa: -

### Item 9: Ghi chú chân màn về phân quyền và mã lô

- itemId: img-037
- parentNo: -
- position: startX=26 startY=2080 endX=1026 endY=2163
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
  Mục đích và ngữ cảnh: chốt ba điều dễ trôi — ẩn form không phải chặn; tính duy nhất của mã lô là quyết định thiết kế; và loại tệp phải kiểm bằng nội dung
  Thành phần hiển thị: hai dòng ghi chú và một đường dẫn tới file spec của màn
  Chức năng và logic: tĩnh; nêu rõ đọc lô hàng mở cho các vai vận hành trong khi ghi chỉ thuộc vai tiếp nhận — đọc và ghi là hai trục khác nhau
- qa: - Kiểm loại tệp bằng nội dung tệp cần chặn những loại nào ngoài ảnh và PDF? Thiết kế nói không tin lời khai của trình duyệt nhưng chưa liệt danh sách chặn.
