# ADR-007 — Tách 3 đường gỡ tạm ngừng theo FIG-004, đưa `license_type` xuống tầng DB

| | |
|---|---|
| Ngày | 2026-09-09 |
| Trạng thái | **Đề xuất** — chưa thi công |
| Phạm vi ảnh hưởng | Bảng `participant` (`category`, `license_type`), `participant_status_history`; `src/lib/participants/state-machine.ts`, `category-rules.ts`; `POST /api/participants/[id]/transition`; màn SC-06 (chi tiết và vòng đời hiệu lực) + một luồng/màn mới cho nhánh "Có điều kiện" |

## Bối cảnh

**RFP §02-08 dòng 309 là một nguyên tắc BẮT BUỘC, không phải khuyến nghị:**

> Đơn vị dự thầu phải tôn trọng sự khác biệt giữa **許可 (giấy phép)** và
> **承認 (chấp thuận)**. **Không được gộp hai căn cứ tham gia này thành một quy
> tắc chung duy nhất.**

FIG-004 (RFP dòng 288–294) cho ma trận. Cột "Gỡ tạm ngừng" là **ba đường khác nhau**:

| Vai trò | Gỡ tạm ngừng theo FIG-004 |
|---|---|
| 卸売業者 | Chấp thuận |
| 仲卸 | **Có điều kiện** |
| 売買参加者 | **Xét lại** |
| 買出人 | **[CHƯA CHỐT] — không có dòng nào trong FIG-004** |

**FIG-004 chỉ phủ 3 trong 4 category.** Dòng thứ tư của ma trận (RFP dòng 295) là
"Đơn vị vận hành chợ" — bên vận hành, **không** phải một category của
`FR-PARTY-01`. Nên **買出人 không có đường gỡ tạm ngừng nào trong văn bản RFP.** Code
gán 買出人 → `đăng ký`, cùng căn cứ với 卸売業者 (`category-rules.ts:21,24`), nên
đường hợp lý nhất là theo 卸売業者 → "Chấp thuận" — nhưng đó là **suy luận, không
phải văn bản**. Phải hỏi chủ đầu tư; ADR này khai `[CHƯA CHỐT]`.

**Prototype đang vi phạm.** `state-machine.ts:37` có đúng một transition
`{ from: "tạm ngừng", event: "go", to: "có hiệu lực" }` — **một đường cho cả 4
loại**. `resolveTarget(from, event)` không nhận `category` nên về mặt kỹ thuật cũng
không phân biệt được, và route transition gọi đúng hàm đó. Đây chính là "một quy
tắc chung duy nhất" mà §02-08 cấm.

Chỗ thứ hai, cùng gốc: `participant.license_type` là `text not null` **không có
CHECK**. Cặp (`category`, `license_type`) chỉ chặn ở **tầng ứng dụng** bởi
`isValidCategoryLicensePair()`, gọi từ hai route; đường ghi không qua hai route đó
— `service_role` (bỏ qua RLS theo `BYPASSRLS`) hoặc psql — ghi được cặp sai và không
gì chặn. Migration tự khai điều tương tự về `category`: "enforced by the app layer,
not a DB constraint".

**Ghi nhận phần làm đúng:** phân biệt 許可/承認 *có* trong prototype, ở tầng căn cứ
tham gia — `category-rules.ts:20-24` map đúng cả 4 loại. Chỗ bị gộp là **đường gỡ
tạm ngừng**, đúng cột mà FIG-004 nói không được gộp.

## Lựa chọn

Hai việc, làm cùng nhau:

1. **Tách đường gỡ tạm ngừng thành 3, khoá theo `category`.** Bảng transition
   không còn là 5 edge phẳng: mỗi edge mang thêm phạm vi `category` áp dụng, và
   `resolveTarget()`/`allowedEvents()` nhận `category`.
   - 卸売業者 → "Chấp thuận": `tạm ngừng` → `có hiệu lực`, cần một bước phê duyệt.
   - 売買参加者 → "Xét lại": `tạm ngừng` → `xét lại`, rồi mới `chap_thuan` →
     `có hiệu lực`. Không còn đường về trực tiếp.
   - 仲卸 → "Có điều kiện": có hiệu lực kèm điều kiện + mốc kiểm lại. Cần trạng
     thái/cột mang điều kiện và một luồng ghi nó.
2. **Đưa ràng buộc (`category`, `license_type`) xuống tầng DB bằng `CHECK`** trên
   `participant`, theo đúng bảng map đang có ở `category-rules.ts:20-24`, để không
   đường ghi nào vượt được — kể cả đường bỏ qua RLS. Cùng nguyên tắc ADR-004 đã
   chọn cho lock: ràng buộc pháp lý thì đặt ở tầng mọi caller đều đi qua.
3. **Đường của 買出人 để trống chờ chủ đầu tư chốt** — không tự gán. Cho tới lúc đó,
   giữ nguyên hành vi hiện tại cho riêng category này và ghi rõ trên màn SC-06 rằng
   đây là quy tắc chưa xác nhận.

## Phương án đã bỏ

| Phương án | Vì sao bỏ |
|---|---|
| Giữ nguyên một đường `tạm ngừng --go--> có hiệu lực` cho cả 4 loại (hiện trạng) | Trái RFP §02-08 dòng 309 — nguyên tắc bắt buộc. Và bỏ mất toàn bộ cột "Gỡ tạm ngừng" của FIG-004: ba đường bị gộp thành một |
| Suy ra đường của 買出人 từ căn cứ tham gia (`đăng ký`) rồi cho nó theo 卸売業者 luôn | Suy luận hợp lý, nhưng FIG-004 không có dòng nào cho 買出人 — viết vào ADR như một quyết định đã có căn cứ văn bản là đúng loại lỗi mà §02-08 đang cấm ở chỗ khác: tự gộp hai căn cứ vì trông giống nhau |
| Chỉ sửa ở tầng app: thêm nhánh theo `category` trong `state-machine.ts`, không đổi schema | Sửa đúng một nửa. Đường gỡ tách được, nhưng cặp (`category`, `license_type`) vẫn chỉ có ứng dụng canh — client `service_role` vẫn ghi được cặp sai, đúng loại lỗ mà ADR-004 đã bắt ở cơ chế lock. Ràng buộc pháp lý không nên phụ thuộc vào việc mọi đường ghi đều nhớ gọi một hàm |
| Enum Postgres cho `license_type` thay vì `CHECK` trên cặp | Enum chặn được giá trị lẻ nhưng không chặn được *cặp* sai: 仲卸 mang `chấp thuận` là hai giá trị đều hợp lệ ghép sai nhau. Cần ràng buộc trên cặp |
| Bảng tham chiếu `category_license_rule` + FK tổ hợp | Chuẩn hoá hơn và đổi rule không cần migration, nhưng đây là 4 dòng cố định theo luật. Một `CHECK` đọc được ngay trong schema có giá trị làm tài liệu cao hơn; thêm bảng cho 4 dòng bất biến là YAGNI |
| Ghi điều kiện của nhánh "Có điều kiện" vào `participant_status_history.reason` dạng text tự do | `reason` là văn bản: không truy vấn được theo mốc kiểm lại, không cảnh báo được khi điều kiện hết hạn. Nhánh này cần biết điều kiện là gì và hết hiệu lực khi nào |

## Hệ quả

**Chấp nhận được:** prototype thôi vi phạm §02-08 ở đúng chỗ đang vi phạm. `CHECK`
ở tầng DB làm ràng buộc chỉ tồn tại một chỗ và áp cho mọi caller như nhau — cùng
nguyên tắc ADR-004. FIG-004 trở thành thứ đọc được từ schema cộng bảng transition,
không còn là kiến thức nằm trong đầu người viết code.

**Phải chịu:**

- **Migration đổi schema trên bảng đang có dữ liệu.** Dữ liệu `license_type` cũ
  (seed) phải kiểm và chuẩn hoá **trước** khi thêm `CHECK` — thêm `CHECK` vào bảng
  còn dòng sai là migration fail giữa đường.
- **Sửa `state-machine.ts` và mọi nơi gọi nó.** `resolveTarget()` và
  `allowedEvents()` đổi chữ ký, kéo theo route transition và component render
  button. Comment "Exactly 5 edges -- SM-001 allows no others" không còn đúng, và
  mọi tài liệu dẫn "5 transition" phải sửa theo.
- **Phải thêm luồng và màn cho nhánh "Có điều kiện" của 仲卸 — hiện không tồn tại.**
  Không trạng thái, không cột điều kiện, không mốc kiểm lại, không màn nào. Đây là
  việc mới, không phải sửa việc cũ, và nó là phần nặng nhất của ADR này.
- **売買参加者 gỡ tạm ngừng không còn là một cú bấm** mà phải qua `xét lại` rồi mới
  `chap_thuan` — thêm một bước phê duyệt, thêm thời gian chờ cho người tham gia.
- **ADR này là Đề xuất, chưa thi công.** Cho tới khi làm xong, bộ nộp LAB-4 vẫn có
  một chỗ prototype không khớp RFP — và đây là chỗ duy nhất trong cả bộ nộp nói ra
  điều đó.

## Dẫn chứng

- RFP `§02-08` dòng 309 — "Không được gộp hai căn cứ tham gia này thành một quy tắc chung duy nhất"
- RFP `FIG-004` dòng 288–294 — ma trận, cột "Gỡ tạm ngừng": Chấp thuận / Có điều kiện / Xét lại
- RFP dòng 295 — dòng thứ tư của FIG-004 là "Đơn vị vận hành chợ", không phải một category của `FR-PARTY-01`; 買出人 không có dòng nào
- `src/lib/participants/category-rules.ts:21,24` — 買出人 và 卸売業者 cùng mang `đăng ký`, cơ sở cho suy luận nhưng không phải căn cứ văn bản
- `src/lib/participants/state-machine.ts:37` — **một** transition `tạm ngừng --go--> có hiệu lực` cho cả 4 loại
- `src/lib/participants/state-machine.ts:31-41,65-71` — bảng "đúng 5 edge", không edge nào tham chiếu `category`; `resolveTarget(from, event)` không nhận `category`
- `src/app/api/participants/[id]/transition/route.ts:58` — route gọi đúng hàm đó
- `src/components/participants/transition-actions.tsx:26` — UI render button từ `allowedEvents(currentStatus)`
- `supabase/migrations/20260904090100_participant.sql:6,14-16` — `license_type text not null` **không CHECK**; "category is immutable after create (enforced by the app layer, not a DB constraint)"
- `src/lib/participants/category-rules.ts:20-24` — phần làm đúng: map 4 loại → 許可/承認/đăng ký
- `src/lib/participants/category-rules.ts:32-34` — `isValidCategoryLicensePair()`, ràng buộc chỉ ở tầng app
- `src/app/api/participants/route.ts:85` và `src/app/api/participants/[id]/route.ts:66` — hai chỗ duy nhất gọi hàm kiểm cặp
