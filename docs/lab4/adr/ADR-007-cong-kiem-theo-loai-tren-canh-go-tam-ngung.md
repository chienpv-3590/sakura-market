# ADR-007 — Cổng kiểm theo loại trên cạnh gỡ tạm ngừng (FIG-004), đưa `license_type` xuống tầng DB

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — chưa thi công |
| Phạm vi ảnh hưởng | Bảng `participant` (`category`, `license_type`), `participant_status_history`; `src/lib/participants/state-machine.ts`, `category-rules.ts`; `POST /api/participants/[id]/transition`; màn SC-06 (chi tiết và vòng đời hiệu lực) + luồng/màn mới cho nhánh "Có điều kiện" |

## Bối cảnh

**RFP §02-08 dòng 309 là một nguyên tắc BẮT BUỘC, không phải khuyến nghị:** *"Đơn vị
dự thầu phải tôn trọng sự khác biệt giữa **許可 (giấy phép)** và **承認 (chấp thuận)**.
**Không được gộp hai căn cứ tham gia này thành một quy tắc chung duy nhất.**"*

**Cạnh trạng thái thì đúng — đọc chỗ này trước khi sửa code.** `FIG-010 – Trạng thái
điều kiện tham gia` (RFP dòng 609–614) là state machine **chính thức** và chỉ có **một**
cạnh gỡ: `Tạm ngừng → (gỡ) → Có hiệu lực` (đường còn lại là
`Mất hiệu lực → Xét lại → Có hiệu lực`). Nên
`{ from: "tạm ngừng", event: "go", to: "có hiệu lực" }` ở `state-machine.ts:37` **khớp
FIG-010** — cạnh đó không sai, bảng "đúng 5 edge" (`:31-41`) cũng không sai. **Đừng
dựng thêm transition nào vào state machine.**

**Chỗ thiếu là cổng kiểm trên cạnh đó.** `FIG-004` (RFP dòng 288–294), cột **"Gỡ tạm
ngừng"**, nói **thủ tục nào và ai được phép** đi qua cạnh đó — **điều kiện tiền đề
cộng cổng phân quyền trên một cạnh**, không phải số lượng cạnh:

| Vai trò | Gỡ tạm ngừng theo FIG-004 |
|---|---|
| 卸売業者 | Chấp thuận |
| 仲卸 | **Có điều kiện** |
| 売買参加者 | **Xét lại** |
| 買出人 | **[CHƯA CHỐT] — không có dòng nào trong FIG-004** |

**Prototype thiếu đúng cái cổng đó, thiếu ở mức không thể có.**
`resolveTarget(from, event)` (`state-machine.ts:65-71`) không có `category` trong
signature; route transition chỉ `.select("status")` (`transition/route.ts:47`) nên
không có `category` trong tay để mà kiểm. Một cạnh, không cổng, dùng chung cho cả 4
loại — đó chính là "một quy tắc chung duy nhất" mà §02-08 cấm, ở đúng chỗ FIG-004 đòi
ba thủ tục khác nhau.

**FIG-004 chỉ phủ 3 trong 4 category.** Dòng thứ tư (RFP dòng 295) là "Đơn vị vận hành
chợ" — bên vận hành, **không** phải category của `FR-PARTY-01`, nên **買出人 không có
đường gỡ nào trong văn bản RFP**. Code gán 買出人 → `đăng ký`, cùng căn cứ với 卸売業者
(`category-rules.ts:21,24`), nên thủ tục hợp lý nhất là theo 卸売業者 → "Chấp thuận" —
nhưng đó là **suy luận, không phải văn bản**. Phải hỏi chủ đầu tư; khai `[CHƯA CHỐT]`.

Chỗ thứ hai, cùng gốc: `participant.license_type` là `text not null` **không có
CHECK**. Cặp (`category`, `license_type`) chỉ chặn ở **tầng ứng dụng** bởi
`isValidCategoryLicensePair()`, gọi từ hai route; đường ghi không qua hai route đó —
`service_role` (bỏ qua RLS theo `BYPASSRLS`) hoặc psql — ghi được cặp sai và không gì
chặn. Migration tự khai điều tương tự về `category`: "enforced by the app layer, not a
DB constraint". **Ghi nhận phần làm đúng:** phân biệt 許可/承認 *có* trong prototype ở
tầng căn cứ tham gia — `category-rules.ts:20-24` map đúng cả 4 loại; chỗ bị gộp là
**cổng trên cạnh gỡ**, đúng cột FIG-004 nói không được gộp.

## Lựa chọn

1. **Thêm cổng kiểm theo `category` trên cạnh gỡ — giữ nguyên một cạnh của FIG-010.**
   `TransitionEdge` mang thêm phạm vi `category`; `resolveTarget()`/`allowedEvents()`
   nhận `category`; route phải `select` thêm cột đó. Ba thủ tục tiền đề trên cùng cạnh:
   卸売業者 cần một 承認 trước khi cạnh bắn · 仲卸 gỡ "có điều kiện", phải ghi điều kiện
   kèm mốc kiểm lại · 売買参加者 cần một lần xét lại trước khi gỡ.
2. **Đưa ràng buộc (`category`, `license_type`) xuống tầng DB bằng `CHECK`** trên
   `participant`, theo đúng bảng map ở `category-rules.ts:20-24`, để không đường ghi
   nào vượt được — kể cả đường bỏ qua RLS. Cùng nguyên tắc ADR-004 đã chọn cho lock.
3. **Thủ tục của 買出人 để trống chờ chủ đầu tư chốt** — không tự gán; cho tới lúc đó
   giữ hành vi hiện tại cho riêng category này và ghi rõ trên SC-06 là chưa xác nhận.

**Một điểm hai hình không khớp, cũng phải hỏi:** "Xét lại" của 売買参加者 ở FIG-004 có
phải là trạng thái `xét lại` của FIG-010 hay không thì không hình nào nói — FIG-010 chỉ
đi vào `xét lại` từ `mất hiệu lực`, không từ `tạm ngừng`. ADR này đọc là **thủ tục tiền
đề**, không phải trạng thái mới, nhưng ghi lại để khách xác nhận.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Giữ nguyên một cạnh không cổng cho cả 4 loại (hiện trạng) | Trái RFP §02-08 dòng 309 — nguyên tắc bắt buộc. Và bỏ mất toàn bộ cột "Gỡ tạm ngừng" của FIG-004: ba thủ tục bị gộp thành một |
| Tách cạnh gỡ thành ba transition riêng trong state machine | **Trái FIG-010** (RFP dòng 609-614), vốn chỉ có một cạnh gỡ. Đây là cách hiểu sai hấp dẫn nhất: nó trông như "tôn trọng FIG-004" nhưng lại phá hình chính thức về trạng thái, rồi BE dev đọc hai hình không biết tin bản nào |
| Suy ra thủ tục của 買出人 từ căn cứ tham gia (`đăng ký`) rồi cho theo 卸売業者 luôn | Suy luận hợp lý, nhưng FIG-004 không có dòng nào cho 買出人 — viết vào ADR như một quyết định đã có căn cứ văn bản là đúng loại lỗi mà §02-08 đang cấm ở chỗ khác: tự gộp hai căn cứ vì trông giống nhau |
| Chỉ sửa ở tầng app: thêm cổng theo `category`, không đổi schema | Sửa đúng một nửa. Cổng dựng được, nhưng cặp (`category`, `license_type`) vẫn chỉ có ứng dụng canh — `service_role` vẫn ghi được cặp sai, đúng loại lỗ ADR-004 đã bắt ở cơ chế lock. Ràng buộc pháp lý không nên phụ thuộc vào việc mọi đường ghi đều nhớ gọi một hàm |
| Enum Postgres cho `license_type` thay vì `CHECK` trên cặp | Enum chặn được giá trị lẻ nhưng không chặn được *cặp* sai: 仲卸 mang `chấp thuận` là hai giá trị đều hợp lệ ghép sai nhau |
| Bảng tham chiếu `category_license_rule` + FK tổ hợp | Chuẩn hoá hơn và đổi rule không cần migration, nhưng đây là 4 dòng cố định theo luật. Một `CHECK` đọc được ngay trong schema có giá trị làm tài liệu cao hơn; thêm bảng cho 4 dòng bất biến là YAGNI |
| Ghi điều kiện của nhánh "Có điều kiện" vào `participant_status_history.reason` dạng text tự do | `reason` là văn bản: không truy vấn được theo mốc kiểm lại, không cảnh báo được khi điều kiện hết hạn. Nhánh này cần biết điều kiện là gì và hết hiệu lực khi nào |

## Hệ quả

**Chấp nhận được:** prototype thôi vi phạm §02-08 ở đúng chỗ đang vi phạm, mà **không
phải sửa state machine** — FIG-010 giữ nguyên năm cạnh, chỉ cạnh gỡ mang thêm cổng.
`CHECK` ở tầng DB làm ràng buộc chỉ tồn tại một chỗ, áp cho mọi caller như nhau, và
FIG-004 thành thứ đọc được từ schema chứ không nằm trong đầu người viết code.

**Phải chịu:**

- **Migration đổi schema trên bảng đang có dữ liệu:** `license_type` cũ (seed) phải
  kiểm và chuẩn hoá **trước**, thêm `CHECK` vào bảng còn dòng sai là fail giữa đường.
- **Đổi chữ ký `resolveTarget()`/`allowedEvents()`** (thêm `category`) kéo theo
  `transition/route.ts:58` và `transition-actions.tsx:26`; route còn phải `select` thêm
  `category` (`:47`). Bảng 5 edge vẫn đúng về số cạnh, nhưng mỗi cạnh giờ mang thêm
  phạm vi áp dụng — tài liệu mô tả nó phải nói thêm phần đó.
- **Phải thêm luồng và màn cho nhánh "Có điều kiện" của 仲卸 — hiện không tồn tại:**
  không cột điều kiện, không mốc kiểm lại, không màn nào. Việc mới, không phải sửa việc
  cũ, và là phần nặng nhất của ADR này.
- **売買参加者 gỡ tạm ngừng không còn là một cú bấm** mà phải qua một lần xét lại —
  thêm bước phê duyệt, thêm thời gian chờ. Và **hai câu phải hỏi chủ đầu tư mới thi
  công được:** thủ tục của 買出人, và "Xét lại" của 売買参加者 có phải trạng thái
  `xét lại` của FIG-010 hay không.
- **Đề xuất, chưa thi công:** cho tới khi làm xong, bộ nộp LAB-4 vẫn có một chỗ prototype không khớp RFP — và đây là chỗ duy nhất trong cả bộ nộp nói ra điều đó.

## Dẫn chứng

- RFP `§02-08` dòng 309 — "Không được gộp hai căn cứ tham gia này thành một quy tắc chung duy nhất"
- RFP `FIG-010` dòng 609–614 — state machine chính thức, **một** cạnh gỡ `Tạm ngừng → (gỡ) → Có hiệu lực`; không có cạnh `tạm ngừng → xét lại`
- RFP `FIG-004` dòng 288–294 — cột "Gỡ tạm ngừng": Chấp thuận / Có điều kiện / Xét lại — thủ tục và thẩm quyền, không phải số cạnh; dòng 295 — dòng thứ tư là "Đơn vị vận hành chợ", không phải category của `FR-PARTY-01`, nên 買出人 không có dòng nào
- `src/lib/participants/state-machine.ts:37` — cạnh gỡ, **khớp FIG-010**; `:31-41` bảng 5 edge, không edge nào tham chiếu `category`; `:65-71` `resolveTarget(from, event)` không có `category` trong signature
- `src/app/api/participants/[id]/transition/route.ts:47` — `.select("status")`, **không select `category`**: route không có dữ liệu để dựng cổng; `:58` gọi `resolveTarget`
- `src/components/participants/transition-actions.tsx:26` — UI render button từ `allowedEvents(currentStatus)`
- `supabase/migrations/20260904090100_participant.sql:6,14-16` — `license_type text not null` **không CHECK**; "category is immutable after create (enforced by the app layer, not a DB constraint)"
- `src/lib/participants/category-rules.ts:20-24` — phần làm đúng: map 4 loại → 許可/承認/đăng ký; `:21,24` 買出人 và 卸売業者 cùng mang `đăng ký` (cơ sở cho suy luận, không phải căn cứ văn bản); `:32-34` `isValidCategoryLicensePair()` — ràng buộc chỉ ở tầng app, gọi từ đúng hai chỗ (`api/participants/route.ts:85`, `[id]/route.ts:66`)
