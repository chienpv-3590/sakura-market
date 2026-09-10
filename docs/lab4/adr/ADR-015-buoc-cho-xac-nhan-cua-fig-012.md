# ADR-015 — Bước "Chờ xác nhận" của FIG-012: tài liệu khách tự chống nhau

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — và câu hỏi gốc "**có bước duyệt hay không**" là `[CHƯA CHỐT]` |
| Phạm vi ảnh hưởng | `transaction.status` (CHECK), `seri_result` (không có cột trạng thái); `confirmTransaction()`; màn SC-11 (tạo giao dịch), SC-12 (danh sách và chi tiết), SC-18 (đối chiếu ngày) |

## Bối cảnh

`FIG-012 – Trạng thái giao dịch` (RFP dòng 637–644) vẽ một vòng đời có **bước phê duyệt**:

```
Nháp → (gửi) → Chờ xác nhận → (phê duyệt) → Đã chốt
                       ↑ (từ chối)
Đã chốt → (đề nghị đính chính) → Hủy / Đính chính → (chốt lại) → Đã chốt
```

Dòng 644 nói thêm: *"Đây là các trạng thái thuộc đối tượng kiểm toán."*

**Prototype không có trạng thái chờ duyệt nào.** `transaction.status` bị `CHECK` giới
hạn ở `('draft', 'confirmed', 'cancelled')` (`transaction.sql:16`). Bấm Chốt là
`draft → confirmed` ngay trong một lần CAS (`confirm-transaction.ts:47-53`), không có
ai duyệt ở giữa. Dòng thứ hai của FIG-012 thì **có** — đường đính chính sau chốt đã
dựng thật qua F008 (`correction_request` → phê duyệt → `transaction_adjustment`), và
`cancelled` lo nhánh Hủy. Chỗ thiếu đúng là **cổng duyệt trước khi chốt**.

**Nhưng đây là chỗ tài liệu khách tự chống nhau — ADR không chọn hộ.**

| Nguồn | Có bước duyệt? |
|---|---|
| `FIG-012` sơ đồ (RFP dòng 637–644) | **Có** — `Chờ xác nhận` + đường `(từ chối)` |
| `FR-AITAI-01` (RFP dòng 650) | **Không nhắc** — chỉ đòi tạo giao dịch có mã, người mua, số lượng, đơn giá, ngày nghiệp vụ |
| `FR-AITAI-02` (RFP dòng 651) | **Không nhắc** — đòi "từ chối chốt nếu người tham gia đã mất hiệu lực, hoặc số lượng lô hàng không đủ": từ chối **tự động theo điều kiện**, không phải người duyệt |
| `FE-014`/`FE-015` (Feature List LAB-1) | **Không nhắc** — hai mã này map về đúng `FR-AITAI-01/02/03` (`SC-11:9`) |

Hai dòng yêu cầu của **chính luồng này** không có bước phê duyệt nào, và nghiệm thu của
`FR-AITAI-02` là "hệ thống hiển thị lý do từ chối và không tạo giao dịch" — một cửa kiểm
tự động, không một hàng đợi việc chờ người duyệt. Prototype làm đúng theo hai dòng FR đó
và lệch khỏi sơ đồ. **`[CHƯA CHỐT]`:** không có căn cứ nào trong RFP để chọn bên nào là
bản đúng, nên ADR này khai xung đột và hai nhánh hệ quả — cùng cách ADR-007 khai
`[CHƯA CHỐT]` cho thủ tục gỡ tạm ngừng của 買出人.

**Cùng gốc với ADR-001.** `seri_result` không có cột trạng thái nào, mà tiêu đề FIG-012
nói rõ nó là *"trạng thái của bản ghi 相対取引 **và** せり"*. Nên nếu chốt là "có bước
duyệt", việc phải làm gấp đôi: một vòng đời cho `transaction` và một vòng đời hoàn toàn
mới cho `seri_result`.

## Lựa chọn

**Đưa xung đột này ra thành câu hỏi cho chủ đầu tư, kèm hai nhánh đã tính chi phí — và
không thi công gì cho tới khi có trả lời.** Đây là lựa chọn có thật, không phải hoãn:
đoán một trong hai nhánh rồi dựng là cách chắc nhất để làm sai một luồng chiếm ~90%
giá trị giao dịch của chợ (tỷ trọng FIG-009, RFP dòng 363).

**Nhánh A — có bước duyệt (sơ đồ đúng).** Phải làm: thêm trạng thái trung gian vào
`CHECK` của `transaction.status` cộng đường `(từ chối)` · quyền duyệt (vai trò nào, và
maker-checker để người tạo không tự duyệt như F008/F009 đã có) · hàng đợi việc chờ duyệt
và màn cho nó · SLA duyệt, vì cửa sổ chốt là 08:00–10:00 (RFP §02-07) và giao dịch treo
ở "Chờ xác nhận" thì không vào được đối chiếu ngày · **và một vòng đời mới cho
`seri_result`**, hiện không có cột trạng thái nào.

**Nhánh B — không có bước duyệt (yêu cầu chức năng đúng).** Phải làm: **xin chủ đầu tư
xác nhận bằng văn bản rằng FIG-012 sai hoặc lỗi thời.** Chi phí kỹ thuật bằng không,
chi phí hợp đồng thì không: dòng 644 khai các trạng thái này là "đối tượng kiểm toán",
nên một sơ đồ chưa bị bác bỏ là một mặt tranh chấp ở cổng nghiệm thu.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Dựng ngay bước duyệt theo FIG-012, coi sơ đồ là bản đúng | Sơ đồ thắng thì hai dòng `FR-AITAI-01/02` (P0) thành sai, mà chúng cụ thể hơn sơ đồ và có cả tiêu chí nghiệm thu. Dựng maker-checker cho luồng chiếm ~90% giá trị giao dịch dựa trên suy đoán về ý khách là đắt và khó rút lại |
| Coi FIG-012 là lỗi thời rồi im lặng bỏ qua | Chính là hiện trạng, và là mặt tranh chấp nghiệm thu: dòng 644 khai đây là trạng thái thuộc đối tượng kiểm toán. Không tài liệu nào của bộ nộp trước ADR này nhắc tới xung đột — im lặng nghĩa là khách phát hiện ra ở cổng nghiệm thu, không phải ở bàn thiết kế |
| Thêm trạng thái `pending` vào `CHECK` trước, để trống người duyệt | Có trạng thái mà không có ai duyệt là dựng một chỗ cho giao dịch mắc kẹt. Và một `CHECK` nới rộng rồi không dùng là nợ schema: mọi truy vấn từ nay phải xử lý một giá trị chưa bao giờ xuất hiện |
| Mô phỏng bước duyệt bằng `correction_request` sẵn có (chốt luôn, rồi duyệt sau) | Đảo thứ tự nghiệp vụ: FIG-012 đặt duyệt **trước** khi chốt, còn F008 là đường sửa **sau** khi đã chốt và đã lock. Dùng cơ chế sau-lock để giả một cổng trước-chốt làm cả hai đường mất nghĩa, và số đối chiếu của ngày sẽ tính cả giao dịch chưa ai duyệt |
| Chỉ đặt cổng duyệt ở `transaction`, để `seri_result` nguyên trạng | Trái đúng tiêu đề FIG-012 — sơ đồ nói "của bản ghi 相対取引 **và** せり". Làm nửa vời thì kênh せり thành đường lách cổng duyệt, đúng loại lệch giữa hai kênh mà ADR-011 đang phải sửa ở chỗ khác |

## Hệ quả

**Chấp nhận được:** xung đột được ghi ra trước cổng nghiệm thu, kèm chi phí hai nhánh,
nên khách quyết trên thông tin đầy đủ. Không có dòng code hay migration nào bị viết dựa
trên phỏng đoán. Và nó nối được với ADR-001: chỗ `seri_result` không có vòng đời không
còn là một khoảng trống không ai khai.

**Phải chịu:**

- **Prototype đang lệch khỏi một sơ đồ chính thức của RFP, và lệch ấy chưa được khách
  bác bỏ.** Cho tới khi có văn bản, đây là một mặt tranh chấp nghiệm thu thật —
  `FIG-012` dòng 644 khai chính các trạng thái này là đối tượng kiểm toán.
- **`[CHƯA CHỐT]` chặn cả hai màn.** SC-11 và SC-12 không chốt được bảng trạng thái cho
  tới khi có trả lời; spec của hai màn phải mang một chỗ trống trỏ về ADR này.
- **Nhánh A là hạng mục đắt nhất trong cả sáu bản `Đề xuất`** — không phải một cột thêm
  vào `CHECK` mà là một luồng phê duyệt hoàn chỉnh (quyền, hàng đợi, màn, SLA), nhân đôi
  cho `seri_result`, trên đúng luồng chiếm ~90% giá trị giao dịch.
- **Nhánh B thì chi phí là công việc phi kỹ thuật** mà không ai trong nhóm thi công làm
  được một mình: phải đối thoại với chủ đầu tư và lấy xác nhận bằng văn bản. Rủi ro thật
  là việc đó bị bỏ quên vì nó không phải task code.
- **ADR này không kết luận đúng/sai**, nên người đọc muốn một câu trả lời sẽ thất vọng.
  Đó là chủ đích: chọn hộ khách giữa sơ đồ và yêu cầu chức năng của chính họ là vượt
  thẩm quyền bên thi công.

## Dẫn chứng

- RFP dòng 637–644 — `FIG-012 – Trạng thái giao dịch`: `Nháp → (gửi) → Chờ xác nhận → (phê duyệt) → Đã chốt` kèm đường `(từ chối)`; tiêu đề nói "của bản ghi 相対取引 **và** せり"; dòng 644 "Đây là các trạng thái thuộc đối tượng kiểm toán"
- RFP dòng 650 — `FR-AITAI-01` (P0): tạo giao dịch, **không nhắc** bước phê duyệt
- RFP dòng 651 — `FR-AITAI-02` (P0): "từ chối chốt nếu người tham gia đã mất hiệu lực, hoặc số lượng lô hàng không đủ", nghiệm thu "hiển thị lý do từ chối và không tạo giao dịch" — cửa kiểm tự động, không người duyệt
- RFP dòng 363 (FIG-009) — tỷ trọng 90/10: luồng 相対取引 chiếm ~90% giá trị giao dịch
- RFP §02-07 dòng 297–305 — cửa sổ chốt giao dịch buổi sáng 08:00–10:00, cơ sở cho câu hỏi SLA duyệt
- `supabase/migrations/20260904090300_transaction.sql:16` — `check (status in ('draft', 'confirmed', 'cancelled'))`: **không có trạng thái chờ duyệt**
- `supabase/migrations/20260904090300_transaction.sql:31-41` — `seri_result` không có cột `status` nào
- `src/lib/transactions/confirm-transaction.ts:47-53` — `draft → confirmed` trong một lần CAS, không cổng duyệt ở giữa
- `docs/lab4/spec/SC-11-tao-giao-dich-aitai.md:9` — `FE-014`, `FE-015` map về `FR-AITAI-01/02/03`
- `docs/lab4/adr/ADR-001-seri-result-la-bang-rieng.md` — mục "Phải chịu": tách bảng làm mất vòng đời dùng chung mà FIG-012 đòi
- `docs/lab4/adr/ADR-011-cua-kiem-hieu-luc-va-tru-ton-cho-nhanh-seri.md` — cùng dạng lệch giữa hai kênh, ở cửa kiểm khác

**Một điểm không dẫn được `file:dòng`:** Feature List LAB-1 là `.xlsx` và **không có
trong repo** — `00-roster-va-gap.md:5` dẫn `docs/sakura-market-proposal/…` nhưng thư mục
đó không tồn tại. Nên nhận định "`FE-014`/`FE-015` không nhắc bước duyệt" dựa vào bảng
map `SC-11:9`, không phải đọc ô mô tả gốc. Cần chắc thì mở file và đối chiếu hai mã đó.
