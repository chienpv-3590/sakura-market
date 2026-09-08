# Giả định tích hợp kế toán (IF-ACC-01) — cần khách xác nhận

RFP §08-03 kết luận rõ: *"Đơn vị dự thầu phải nêu rõ các giả định và phạm vi đưa vào báo giá
baseline"*, và hẹn sẵn một **buổi làm việc về interface** để chốt phương thức kết nối, xác
thực và nghiệm thu. Năm mục dưới đây là đúng nội dung buổi đó — mỗi mục nêu giả định hiện
đang code, ảnh hưởng nếu giả định sai, chi phí đổi, và nơi sửa trong code nếu khách chốt khác.

Không mục nào là "đã xây xong, chờ khách duyệt cho vui" — mỗi giả định sai đều đổi số hoặc
đổi hành vi thật trong dữ liệu đã xuất. Xem `docs/pham-vi-va-phan-mock.md` cho toàn cảnh
phạm vi; tài liệu này chỉ khoanh vào phần dữ liệu gửi bộ phận tài chính.

## 1. Thuế suất và cơ sở tính thuế

- **Giả định hiện tại:** 8% (thuế suất giảm — 軽減税率, vì thủy sản là thực phẩm; thuế suất phổ
  thông Nhật là 10%), tính trên giá **税抜** (`unit_price` đang lưu là giá đã trừ thuế), làm
  tròn **XUỐNG** tới JPY nguyên. Thuế tính theo **tổng của từng người tham gia trong ngày**,
  không tính riêng theo từng dòng giao dịch.
- **Ảnh hưởng nếu sai:** đây là giả định rủi ro nhất trong cả năm mục — RFP không nêu thuế
  suất, không nêu 税込/税抜, không nêu tính theo dòng hay theo người tham gia. Nếu bất kỳ phần
  nào sai, **mọi số thuế trong mọi bản xuất kế toán đều sai**, không chỉ lệch một vài dòng.
- **Chi phí đổi:** thấp — một hằng số. Batch cũ không cần tính lại: `tax_rate_bps` đã được
  đóng dấu lên từng dòng batch tại thời điểm xuất, nên đổi hằng số chỉ ảnh hưởng các batch
  xuất **sau** thời điểm đổi; batch cũ vẫn tự giải thích được bằng con số đã đóng dấu của nó.
- **Nơi sửa:** `src/lib/accounting/tax.ts` — hằng số `TAX_RATE_BPS` (đơn vị: phần vạn, 800 =
  8%) và `TAX_BASIS` (`"exclusive"` = 税抜, đổi thành `"inclusive"` nếu giá lưu là 税込).

## 2. Vòng đời batch code

- **Giả định hiện tại:** mã dạng `ACC-YYYYMMDD-NN` (`src/lib/accounting/batch-code.ts`), mỗi
  lần xuất — kể cả xuất lại cùng một ngày — sinh một mã **mới**; batch cũ không sửa được, không
  xóa được (append-only, giống `audit_log`).
- **Câu hỏi thật cần khách trả lời:** hệ thống kế toán nhận dữ liệu theo batch code sẽ
  **thay thế** (mỗi lần nhận ghi đè lên lần trước cùng ngày) hay **cộng dồn** (mỗi lần nhận là
  một khoản riêng)? Đây không phải câu hỏi tu từ: một ngày có thể bị xuất lại sau khi có điều
  chỉnh hậu-lock (F008) hợp lệ, và với hệ thống nhận theo kiểu cộng dồn, xuất lại đúng nghĩa là
  **nhân đôi số tiền đã ghi nhận phía kế toán**.
- **Ảnh hưởng nếu chọn sai cách xử lý:** double-count phía kế toán mà phía Sakura Market không
  có cách nào tự phát hiện — hệ thống này không biết bên nhận xử lý batch thế nào.
- **Chi phí đổi:** không cần đổi code để phân biệt — cột `kind` (`full` cho lần xuất đầu tiên
  của một ngày, `re-export` cho các lần sau) đã có sẵn trên `accounting_export_batch` đúng để
  bên nhận tự phân biệt. Việc còn lại là **quy tắc xử lý phía hệ thống kế toán**, không phải
  việc của prototype này.
- **Nơi sửa:** không cần sửa code cho câu hỏi này — cần **quyết định vận hành** từ bộ phận tài
  chính. Nếu sau này cần ép buộc "chỉ 1 batch/ngày" ở tầng dữ liệu, đổi ở
  `supabase/migrations/20260908090000_accounting_export.sql` (bỏ `seq`, thêm ràng buộc unique
  theo `business_date` một mình).

## 3. Khóa định danh người tham gia

- **Giả định hiện tại:** mỗi dòng xuất mang `participant.id` (uuid nội bộ) và `participant.name`
  (`src/lib/accounting/build-accounting-lines.ts`). Bảng `participant` hiện **không có cột mã
  ngoài** nào khác — không mã kế toán, không mã ERP, không mã khách hàng.
- **Ảnh hưởng nếu sai:** nếu bộ phận tài chính có mã người tham gia riêng (mã kế toán nội bộ,
  mã trong hệ thống ERP hiện hành) để đối chiếu, họ sẽ phải tự ánh xạ **thủ công** giữa uuid và
  mã của họ mỗi lần nhận batch — chậm và dễ lệch khi có người tham gia mới.
- **Chi phí đổi:** trung bình — cần một cột mới cộng một bước nhập liệu, không phải chỉ đổi
  hằng số. Không phải việc chỉ sửa 1 dòng như giả định #1.
- **Nơi sửa:** thêm cột (vd `external_code`) vào migration của bảng `participant`
  (`supabase/migrations/20260904090100_participant.sql` là nơi bảng được định nghĩa; cột mới
  cần migration riêng, không sửa file cũ), rồi thêm cột đó vào
  `src/lib/accounting/build-accounting-lines.ts` (hàm `loadParticipantLookup`) và vào
  `AccountingLine`/cột CSV xuất ra.

## 4. Phương thức kết nối

- **Giả định hiện tại:** tải CSV thủ công qua UI (nút trên màn báo cáo gọi
  `POST /api/accounting/export-batches` để tạo batch, sau đó tải qua endpoint export CSV có
  sẵn) — không SFTP, không API đẩy tự động, không lịch chạy.
- **Ảnh hưởng nếu sai:** nếu bộ phận tài chính cần nhận tự động (SFTP/API) thay vì một người
  vào UI bấm tải mỗi ngày, phần "tự động hoá xuất dữ liệu" — chính là phần OBJ-01/OBJ-04 kỳ
  vọng — **chưa có gì được xây**; RFP §08-03 để ngỏ đúng điểm này.
- **Chi phí đổi:** ngoài phạm vi báo giá hiện tại — cần chốt xong phương thức ở buổi làm việc
  interface trước khi ước lượng được chi phí, vì SFTP/API/lịch chạy có chi phí hạ tầng và bảo
  trì rất khác nhau.
- **Nơi sửa:** chưa có gì để trỏ tới — đây là việc cần xây mới hoàn toàn sau khi chốt phương
  thức, không phải sửa code hiện có.

## 5. Ngưỡng "sắp mất hiệu lực" của RPT-03

Không thuộc tích hợp kế toán, nhưng cùng loại "giả định chưa ai xác nhận với khách":

- **Giả định hiện tại:** 30 ngày (`EXPIRY_WARNING_DAYS` trong
  `src/lib/reports/queries/rpt-03-participant-eligibility.ts:11`). RFP không nêu con số, và
  `SC-07` (màn cảnh báo chuyên biệt, `FR-PARTY-03`) nằm ngoài phạm vi vòng này.
- **Ảnh hưởng nếu sai:** danh sách "người tham gia sắp mất hiệu lực" trong RPT-03 hiện rộng/hẹp
  hơn kỳ vọng vận hành thật — đội vận hành có thể bỏ sót người cần gia hạn (ngưỡng quá hẹp) hoặc
  bị ngợp bởi danh sách quá dài (ngưỡng quá rộng).
- **Chi phí đổi:** thấp — một hằng số.
- **Nơi sửa:** `src/lib/reports/queries/rpt-03-participant-eligibility.ts` — hằng số
  `EXPIRY_WARNING_DAYS`.

---

Cả năm mục đều là input cho buổi làm việc interface RFP §08-03 đã hẹn — không mục nào cần
chốt trước khi demo, nhưng **mọi mục đều cần chốt trước khi bất kỳ số nào trong bản xuất kế
toán được dùng làm căn cứ ghi sổ thật.**
