# SC-08 — Tiếp nhận lô hàng

| | |
|---|---|
| Mã thi công | SCR007_LotIntake |
| Route | `/lots/new` |
| Loại | Form |
| Actor chính | Nhân viên tiếp nhận — ROLE-INTAKE |
| FE- / FR- | FE-009, FE-013 / FR-LOT-01, NFR-USE-01, QĐ-3, QĐ-6 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Ghi lô hàng vào hệ thống lúc xe về chợ — **thao tác của 02:00–03:00 sáng**, tại quầy, thường một
tay giữ chứng từ. Form sinh `lot_code` để dán lên lô và mở đường sang SC-09 (目利き). Kèm được ảnh
hoặc PDF chứng từ tiếp nhận. NFR-USE-01 đòi làm hết bằng bàn phím, không chuột — xem ghi chú dưới
mục 4.

## 2. Điều kiện vào màn

- **Đăng nhập**: bắt buộc
- **Vai trò được vào**: **chỉ ROLE-INTAKE** — `requireRole(["ROLE-INTAKE"])` ngay dòng đầu trang (`src/app/(app)/lots/new/page.tsx:10`)
- **Mã lỗi khi thiếu quyền**: **404** (`notFound()` trong `requireRole`, `src/lib/auth/require-role.ts:72-77`) — có chủ đích, không phải 403, để không lộ sự tồn tại tài nguyên. `POST /api/lots` gate lại lần nữa cùng vai trò (`src/app/api/lots/route.ts:95`), nên chặn UI không phải chặn duy nhất
- **Tiền đề dữ liệu**: không cần gì. Nút mở màn này ở `/lots` cũng chỉ hiện cho ROLE-INTAKE (`docs/generated/permissions-matrix.md:176`)
- **Ngày nghiệp vụ đã lock vẫn tiếp nhận được** — xem mục 4 và mục 7

## 3. Bảng field

Bốn field nhập, bốn field dẫn xuất server sinh ra.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `item` | Mặt hàng | 品目 | text (`tabIndex=1`) | Có | `lot.item` — `text not null` (`supabase/migrations/20260904090200_lot.sql:8`) | `required` (`src/components/lots/lot-intake-form.tsx:122-132`) | `typeof === "string"` rồi `.trim()`, rỗng → cả body bị coi là không hợp lệ (`src/app/api/lots/route.ts:18-20,45-48`) | `lots.intake.error.invalidRequest` — "Dữ liệu không hợp lệ, vui lòng kiểm tra lại các trường." / 入力内容を確認してください。 (`vi/lots.json:34`, `ja/lots.json:34`) · HTTP **422** |
| 2 | `packageCount` | Số kiện | 梱数 | number (`min=1 step=1`, `tabIndex=2`) | Có | `lot.package_count` — `integer not null check (package_count > 0)` (`lot.sql:9`) | `type="number" min={1} step={1} required` (`lot-intake-form.tsx:138-150`) | `Number.isInteger(packageCount) && packageCount > 0` (`route.ts:22-24`) + CHECK ở DB | Như trên · **422** |
| 3 | `initialQty` | Số lượng ban đầu | 初期数量 | number (`min=0.01 step=0.01`, `tabIndex=3`) | Có | `lot.initial_qty` — `numeric(12,2) not null check (initial_qty > 0)` (`lot.sql:10`) | `type="number" min={0.01} step={0.01} required` (`lot-intake-form.tsx:156-168`) | `Number.isFinite(initialQty) && initialQty > 0` (`route.ts:26-28`) + CHECK ở DB. **Ba tầng lệch nhau — xem mục 7** | Như trên · **422** |
| 4 | `intakeDocs` | Chứng từ tiếp nhận | 受付証憑 | file, `multiple` (`tabIndex=4`) | **Không** | `lot_attachment` (một hàng mỗi file) — `file_path`/`file_name`/`mime_type`/`file_size` đều `not null`, `file_size` có `check (file_size > 0)` (`supabase/migrations/20260907090000_lot_attachment.sql:14-23`) | `accept="image/jpeg,image/png,image/webp,application/pdf"` — **chỉ là gợi ý UX, không phải chặn** (`src/components/lots/intake-doc-field.tsx:6,33`; ghi rõ ở `src/lib/lots/intake-doc-upload.ts:29-36`) | `checkIntakeDocFile()`: MIME phải thuộc 4 loại `image/jpeg` `image/png` `image/webp` `application/pdf`, size ≤ **5MB**; kiểm **mọi file trước khi tạo lot** để một file xấu không để lại lot mồ côi (`intake-doc-upload.ts:4-10,21-26`; `route.ts:51-58`). Số lượng file tối đa: **chưa có — đề xuất** | `INVALID_TYPE` → `lots.intake.error.invalidDocType` "File chứng từ phải là JPEG, PNG, WEBP hoặc PDF." · `TOO_LARGE` → `lots.intake.error.docTooLarge` "File chứng từ vượt quá 5MB." (`vi/lots.json:35-36`; map ở `src/lib/lots/intake-doc-reject-reasons.ts:7-10`) · HTTP **422** |
| 5 | `lot_code` | Mã lô hàng | ロット番号 | text, **dẫn xuất** | — | `lot.lot_code` — `text not null unique` (`lot.sql:7`). Công thức `LOT-YYYYMMDD-NNN`, `NNN` = số lô đã tạo trong ngày JST đó + 1, pad 3 chữ số (`src/lib/lots/lot-code.ts:10-13,16-29`) | Không nhập được — chỉ hiển thị sau khi lưu, ô `readOnly` (`lot-intake-form.tsx:82-88`) | Server sinh; trùng thì retry đúng **1 lần** trên mã lỗi `23505` (`src/lib/lots/create-lot.ts:7,29,56-59`) | Retry thất bại → `throw` → **500** `internal_error` (`route.ts:98-101`) |
| 6 | `business_date` | Ngày nghiệp vụ | 業務日 | date, **dẫn xuất** | — | `lot.business_date` — `date not null`, phi chuẩn hoá theo QĐ-2 (`lot.sql:14`) | Không có field trên form — **không backdate được** | `todayJst()`, luôn theo Asia/Tokyo, không bao giờ `new Date()` local (`create-lot.ts:26`; `src/lib/db/business-date.ts:6,11-16,28-30`) | — |
| 7 | `available_qty` | SL khả dụng | 利用可能数量 | numeric, **dẫn xuất** | — | `lot.available_qty` — `numeric(12,2) not null check (available_qty >= 0)` (`lot.sql:11`) | Không nhập được | Gán `= initial_qty` lúc tạo (`create-lot.ts:37`). Sau đó **chỉ** đổi qua `reserveLotQty`/`releaseLotQty`, không bao giờ qua PATCH tự do (`src/app/api/lots/[id]/route.ts:9-13`) | — |
| 8 | `status` | Trạng thái | 状態 | text, **dẫn xuất** | — | `lot.status` — `default 'received'`, `check (status in ('received','published','traded','delivered'))` (`lot.sql:12-13`) | Không nhập được | Gán `'received'` lúc tạo (`create-lot.ts:39`) | Nhãn `lots.status.received` — "Đã tiếp nhận" / 受付済み (`vi/lots.json:15`) |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (mặc định) | Vào màn | 4 field trống; **con trỏ tự nhảy vào field đầu** (`src/components/lots/keyboard-operable-form.tsx:27-30`); mô tả nhắc "Tab để chuyển trường, Enter để lưu" (`vi/lots.json:20`) | Nhập, submit |
| đang tải | Không áp dụng — trang không query bảng nào, chỉ `requireRole` + dictionary | — | — |
| lỗi tải | `requireRole` → `getCurrentUser` throw khi query `app_user` lỗi (`require-role.ts:44-46`) | Error boundary Next; **chưa có UI riêng, đề xuất** | Tải lại |
| không có quyền | `role !== "ROLE-INTAKE"` | Trang **404** — không có bản chỉ đọc, không có `HandoffCaption` (`lots/new/page.tsx:10`) | — |
| đang gửi | `submitting === true` | 4 input `disabled`, nút `aria-busy` + "Đang lưu..." (`lot-intake-form.tsx:130,148,166,170,176-184`) | Không — chặn ở `if (submitting) return` (`:45`) |
| gửi lỗi | `!response.ok` | `<p role="alert">` với câu lỗi tương ứng; **form giữ nguyên dữ liệu đã nhập** (`lot-intake-form.tsx:54-63,171-175`) | Sửa và gửi lại |
| thành công | `created !== null` | Đổi hẳn sang card kết quả: `lot_code` cỡ **24px bold**, `readOnly`, `autoFocus`, đọc được từ xa ở quầy; link "Ghi 目利き" và nút "Tiếp nhận lô khác" (`lot-intake-form.tsx:76-113`) | Sang SC-09 · tiếp nhận lô mới |
| thành công nhưng chứng từ lỗi | `attachmentsFailed > 0` | Thêm `<p role="alert">` `lots.intake.attachmentsFailedWarning` — "Đã tạo lô hàng nhưng một số chứng từ đính kèm lưu không thành công — vào chi tiết lô để thử đính kèm lại." (`vi/lots.json:33`; `lot-intake-form.tsx:90-94`). **Câu này chỉ sang một màn chưa có chỗ đính kèm — xem mục 7** | Sang SC-09 · tiếp nhận lô mới |
| read-only vì ngày đã lock | **Không áp dụng, và đó là chủ đích.** `lot` và `lot_attachment` **không** có `trg_block_after_lock` — QĐ-3: lô nhận trong ngày đã lock vẫn bán ngày sau, nên bảng phải ghi được xuyên ngày nghiệp vụ (`lot.sql:18-20`; `lot_attachment.sql:9-13`; `supabase/migrations/20260904090500_business_day_lock.sql:56-59`). `POST /api/lots` **không** gọi `isBusinessDateLocked` — tiếp nhận trên ngày đã lock vẫn trả 201 | Bình thường |

**Bàn phím — NFR-USE-01.** Đây là ràng buộc chức năng, không phải trang trí: form bọc trong
`KeyboardOperableForm`, tự focus field đầu khi mount, và Enter ở bất kỳ phần tử con nào cũng gọi
`requestSubmit()` — **trừ** `<textarea>` (Enter là newline), `<button>` (tự xử lý), và
`<input type="file">` (Enter/Space ở đó phải mở hộp chọn file, cướp Enter là chính field cần bàn
phím nhất lại không dùng được) (`keyboard-operable-form.tsx:11-22,32-39`). `tabIndex` khai tường
minh 1→5 trên cả 4 field và nút submit, và 1→3 trên card thành công, nên thứ tự Tab không phụ thuộc
thứ tự DOM (`lot-intake-form.tsx:87,98,105,127,145,163,170,178`).

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-INTAKE | ✓ | Toàn bộ 4 field nhập | Tạo lô · đính kèm chứng từ | 422 theo từng field (mục 3) |
| 6 vai trò còn lại | **✗ 404** | — | — | Vào trang → **404** (`lots/new/page.tsx:10`) · gọi `POST /api/lots` → **404** (`route.ts:95`) |

**Lưu ý về đọc:** RLS `read_all_active_users` cho **mọi vai trò active đọc được** `lot` và
`lot_attachment` (`supabase/migrations/20260904090900_rls_core.sql:39-40`;
`lot_attachment.sql:35-36`) — có chủ đích theo FR-601. Chặn là ở **ghi**: `write_intake` trên `lot`
(`rls_core.sql:82-83`), `write_intake` trên `lot_attachment` (`lot_attachment.sql:40-41`), và
`lot_attachment_insert` trên `storage.objects` của bucket `lot-attachment`
(`lot_attachment.sql:50-51`) — cả ba đều `ROLE-INTAKE`. Và chặn ở **vào trang** như bảng trên.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Tạo lô hàng | `POST /api/lots`, `multipart/form-data` (`route.ts:92`; body gửi bằng `new FormData(form)`, `lot-intake-form.tsx:50-51`) | `lot` (insert, `create-lot.ts:42`) | `create` trên entity `lot`, `after` = **hàng vừa insert nguyên bản** (`create-lot.ts:45-52`) | **404** sai vai trò · **400** `invalid_request` (formData không parse được) · **422** `invalid_request` (item/packageCount/initialQty) hoặc `{reason: INVALID_TYPE|TOO_LARGE}` · **201** kèm `{id, lotCode, attachmentsFailed}` · **500** `internal_error` |
| Đính kèm chứng từ (cùng request) | Cùng `POST /api/lots` — chạy sau khi lot đã tạo (`route.ts:68-71`) | `storage.objects` bucket **private** `lot-attachment` (`intake-doc-upload.ts:46-49`) rồi `lot_attachment` (insert) | `attach_document` trên entity `lot_attachment`, một hàng audit **riêng** cho mỗi file (`src/lib/lots/attach-intake-doc.ts:65-72`) | Không có mã HTTP riêng — thất bại ở đây **không** làm hỏng 201, chỉ tăng `attachmentsFailed` (`route.ts:63-75`). Upload xong mà insert lỗi thì file được xoá bù trừ (`attach-intake-doc.ts:44-63`) |
| Sang SC-09 | Điều hướng `/lots/{id}/mekiki` (`lot-intake-form.tsx:96-102`) | — | — | 404 nếu lot không tồn tại |

## 7. Edge case

- **Ba tầng kiểm `initialQty` lệch nhau, và khe hở rơi ra 500.** Client `min=0.01`, server chỉ
  `> 0` (`route.ts:28`), DB là `numeric(12,2) check (initial_qty > 0)` (`lot.sql:10`). Gọi API trực
  tiếp với `initialQty = 0.001` thì server cho qua, Postgres làm tròn về `0.00`, CHECK gãy,
  `createLot` throw → **500** thay vì 422 có thông báo. Cùng lỗi đó với số quá `9999999999.99`
  (vượt precision của `numeric(12,2)`) — cũng 500, cũng không có kiểm ở app. **Đề xuất**: đưa
  ngưỡng `0.01` và trần precision vào server, trả 422.
- **Câu cảnh báo đính kèm chỉ sang một màn không có chỗ đính kèm.** `attachmentsFailed > 0` bảo
  người dùng "vào chi tiết lô để thử đính kèm lại" (`vi/lots.json:33`), nhưng SC-10
  (`/lots/[id]`) **chỉ đọc** `lot_attachment` — `LotAttachmentsCard` là bảng hiển thị, không có
  input file nào, và trang không import component upload nào (`src/app/(app)/lots/[id]/page.tsx:48-86`;
  `src/components/lots/lot-attachments-card.tsx:12-52`). Nghĩa là chứng từ lỗi lúc tiếp nhận thì
  **mất luôn**, đường duy nhất là tạo lại lô. Task LAB-5: thêm upload vào SC-10, hoặc sửa câu
  thông báo cho đúng thực tế.
- **MIME tin lời khai của trình duyệt.** `checkIntakeDocFile` đọc `file.type`
  (`intake-doc-upload.ts:22`) — không sniff magic byte. Đổi tên `.exe` thành `.pdf` và giả header
  `Content-Type` là lọt qua kiểm và nằm trong bucket. Bucket là private và chỉ đọc qua signed URL
  ngắn hạn (`lot_attachment.sql:47`, `src/lib/lots/lot-attachment-queries.ts:4,34-36`) nên tác động
  hạn chế, nhưng vẫn là **chưa có — đề xuất** sniff nội dung.
- **Không giới hạn số file mỗi lô.** `form.getAll("intakeDocs")` nhận bao nhiêu cũng lấy
  (`route.ts:33-35`) và mỗi file là một lượt upload tuần tự (`route.ts:68-71`). 200 file × 5MB là
  một request treo rất lâu. **Chưa có — đề xuất** cả trần số file và trần tổng dung lượng.
- **Đua `lot_code` chỉ retry một lần.** `nextLotSeq` đếm rồi `formatLotCode` — hai clerk tiếp nhận
  cùng giây sẽ ra cùng `NNN`, kẻ thua nhận `23505` và thử lại một lần
  (`lot-code.ts:16-29`; `create-lot.ts:7,29,56-59`). Ba người cùng lúc thì người thứ ba vẫn có thể
  gãy → **500**. Ở quầy 02:00 với nhiều xe về một lúc thì đây không phải giả thuyết. `MAX_LOT_CODE_ATTEMPTS`
  là hằng số duy nhất cần đổi, hoặc chuyển sang sequence trong DB.
  Ngoài ra công thức `LOT-YYYYMMDD-NNN` chỉ là **giả định đang chờ chốt** — RFP chưa ratify quy ước
  mã lô thật của chợ Sakura (`lot-code.ts:4-9`).
- **Tiếp nhận trên ngày đã lock vẫn thành công.** Có chủ đích (QĐ-3, `lot.sql:18-20`) nhưng cần khai
  rõ để LAB-5 không sinh task "chặn tiếp nhận sau lock": lô nhận trong ngày đã lock vẫn bán ngày
  sau. Cái bị chặn là **sửa thuộc tính lô** ở SC-10 (**423**, `api/lots/[id]/route.ts:66-77`),
  không phải tiếp nhận.
- **Không backdate được.** `business_date` luôn là `todayJst()` (`create-lot.ts:26`), không có field
  ngày trên form. Xe về 23:50 JST và clerk nhập 00:10 thì lô rơi sang ngày nghiệp vụ sau. Nếu chợ
  cần ngày nghiệp vụ bắt đầu ở 02:00 thay vì 00:00, đây là chỗ phải sửa — hiện tại là ngày dương
  lịch JST, không phải ca nghiệp vụ. **Giả định cần chốt.**
- **Quyền bị thu hồi giữa phiên**: form đang mở, `is_active` chuyển false → `POST /api/lots` gọi
  `requireRole` → redirect/404, không có nhánh nào ghi được (`route.ts:93-95`).
- **`lot_attachment` chỉ ghi thêm, không sửa không xoá** — không có policy update/delete nào
  (`lot_attachment.sql:26-27`). Đính kèm sai file thì không rút lại được từ trong ứng dụng.

## 8. Dẫn chứng

- `src/app/(app)/lots/new/page.tsx:8-25` — `requireRole(["ROLE-INTAKE"])`, tiêu đề + mô tả
- `src/components/lots/lot-intake-form.tsx:12-22,35-41,43-74,76-113,116-186` — ghi chú NFR-USE-01, reset, submit, card thành công, 4 field + tabIndex
- `src/components/lots/keyboard-operable-form.tsx:11-22,27-30,32-39` — autofocus, Enter submit, ba ngoại lệ (textarea / button / file)
- `src/components/lots/intake-doc-field.tsx:6,8-18,20-44` — `accept` chỉ là gợi ý, `multiple`, hint số file đã chọn
- `src/app/api/lots/route.ts:10-16,17-35,37-77,92-102` — vì sao chứng từ không bắt buộc, parse field, kiểm file trước khi tạo lot, gate vai trò
- `src/lib/lots/create-lot.ts:7,21-63` — retry `23505`, gán `available_qty`/`status`/`business_date`, audit `create`
- `src/lib/lots/lot-code.ts:4-13,16-29` — công thức mã lô (giả định chờ chốt) và cách đếm seq
- `src/lib/lots/intake-doc-upload.ts:4-10,21-26,28-53` — 4 MIME, 5MB, bucket private, đường dẫn `{lotId}/...`
- `src/lib/lots/attach-intake-doc.ts:11-22,34-63,65-72` — không có transaction xuyên bảng, xoá bù trừ, audit riêng mỗi file
- `src/lib/lots/intake-doc-reject-reasons.ts:1-13` — mã lỗi trả về là code, không phải câu tiếng Việt hardcode
- `src/lib/db/business-date.ts:6,11-16,28-30` — mọi `business_date` neo vào Asia/Tokyo
- `supabase/migrations/20260904090200_lot.sql:1-20` — DDL `lot` + comment QĐ-3 (không có trigger lock)
- `supabase/migrations/20260907090000_lot_attachment.sql:9-13,14-23,26-27,35-54` — vì sao không có `business_date`, DDL, chỉ ghi thêm, RLS + bucket private
- `supabase/migrations/20260904090500_business_day_lock.sql:56-59` — khai rõ "NEVER lot or delivery"
- `src/lib/i18n/dictionaries/vi/lots.json:15,19-37` · `ja/lots.json:15,19-37` — nhãn VI/JA
- `docs/generated/permissions-matrix.md:174-184` — PERM tạo lô, khớp code
- `docs/generated/screen-list.md:261-288` — SCR007_LotIntake

**Ghi chú lệch mã màn:** comment trong file page ghi `SCR004_LotIntake`
(`src/app/(app)/lots/new/page.tsx:8`) — hệ mã cũ 20 SCR. Roster LAB-4 và
`docs/generated/screen-list.md:261-263` dùng hệ 26 mã: `SCR007_LotIntake`, legacy ref
`SCR004_LotIntake`. Xem `../00-roster-va-gap.md` § 3.3.
