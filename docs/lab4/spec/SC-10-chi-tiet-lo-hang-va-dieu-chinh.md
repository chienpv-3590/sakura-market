# SC-10 — Chi tiết lô hàng và điều chỉnh

| | |
|---|---|
| Mã thi công | SCR009_LotDetail (composite — 4 khối: REG001_Overview · REG002_Attachments · REG003_Edit · REG004_History) |
| Route | `/lots/[id]` |
| Loại | Detail |
| Actor chính | Nhân viên tiếp nhận, bộ phận đối chiếu (đọc) · ROLE-SETTLEMENT (điều chỉnh) |
| FE- / FR- | FE-011, FE-012, FE-013 / FR-LOT-01, FR-LOT-04, BR-CLOSE-01, QĐ-3, QĐ-6 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Một lô hàng nhìn từ đầu đến cuối: đang ở bước nào của pipeline, còn bao nhiêu khả dụng, chứng từ
tiếp nhận nào đã đính kèm, và toàn bộ dấu vết điều chỉnh. Bộ phận đối chiếu sửa được hai thuộc tính
(`item`, `package_count`) kèm lý do bắt buộc — và bị chặn cứng khi ngày nghiệp vụ đã lock.

## 2. Điều kiện vào màn

- **Đăng nhập**: bắt buộc — `requireUser()` gọi tường minh (`src/app/(app)/lots/[id]/page.tsx:23`)
- **Vai trò được vào**: **cả 7 vai trò**. Không có `requireRole` ở trang; chỉ khối REG003_Edit đổi theo vai trò (`page.tsx:69`)
- **Mã lỗi khi thiếu quyền**: vào trang không 404 theo vai trò. `PATCH /api/lots/[id]` khi không phải ROLE-SETTLEMENT → **404** (`requireRole`, `src/app/api/lots/[id]/route.ts:128`; `src/lib/auth/require-role.ts:72-77`) — có chủ đích, không phải 403. `id` không tồn tại → **404** ở trang (`page.tsx:30`)
- **Tiền đề dữ liệu**: hàng `lot` tồn tại. `lot_attachment` và `audit_log` rỗng vẫn vào được

## 3. Bảng field

### 3.1 REG001_Overview — pipeline + số lượng khả dụng (chỉ đọc, mọi vai trò)

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `lot_code` | Chi tiết lô hàng: `{mã}` | ロット詳細: `{mã}` | text mono, tiêu đề trang | — | `lot.lot_code` — `text not null unique` (`supabase/migrations/20260904090200_lot.sql:7`) | Không áp dụng (chỉ đọc) | Không áp dụng | — |
| 2 | `item` | Mặt hàng | 品目 | text, mô tả trang | — | `lot.item` — `text not null` (`lot.sql:8`) | Không áp dụng | Không áp dụng | — |
| 3 | `status` | Trạng thái | 状態 | badge + thanh tiến trình | — | `lot.status`, CHECK 4 giá trị (`lot.sql:12-13`) | `StageProgressBar` suy bước và "ai làm tiếp" từ `status`, không hardcode (`src/components/pipeline/stage-progress-bar.tsx:8-10,23-25`) | Không áp dụng | `status` lạ → `pipeline.unknownStatus` — "Trạng thái không xác định" / 不明な状態 (`stage-progress-bar.tsx:27-33`; `vi/common.json:25`) |
| 4 | `available_qty` | Số lượng khả dụng | 利用可能数量 | numeric, `variant="figure"` | — | `lot.available_qty` — `numeric(12,2) not null check (available_qty >= 0)` (`lot.sql:11`) | Không áp dụng | **Không sửa được qua màn này** — cố tình loại khỏi allowlist của PATCH; chỉ đổi qua `reserveLotQty`/`releaseLotQty` (`api/lots/[id]/route.ts:9-13`; `src/lib/lots/availability-service.ts:48-77,84-110`) | — |
| 5 | `initial_qty` | Số lượng ban đầu | 初期数量 | numeric, `variant="figure"` | — | `lot.initial_qty` — `numeric(12,2) not null check (initial_qty > 0)` (`lot.sql:10`) | Không áp dụng | Không sửa được qua màn này (không có trong allowlist) | — |
| — | `package_count` | Số kiện | 梱数 | integer | — | `lot.package_count` (`lot.sql:9`) | **KHÔNG hiển thị ở REG001.** Chỉ ROLE-SETTLEMENT thấy giá trị hiện tại, và chỉ khi chọn field đó trong REG003 (`src/components/lots/lot-edit-form.tsx:38`) | Sửa được — xem 3.3 | — |
| — | `business_date` | Ngày nghiệp vụ | 業務日 | date | — | `lot.business_date` — `date not null` (`lot.sql:14`) | **KHÔNG hiển thị ở đâu trên màn này**, dù nó là thứ quyết định 423 — xem mục 7 | Dùng để kiểm lock (`api/lots/[id]/route.ts:66`) | — |

### 3.2 REG002_Attachments — chứng từ tiếp nhận (chỉ đọc, mọi vai trò)

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `file_name` | Tệp | ファイル | text, link | — | `lot_attachment.file_name` — `text not null` (`supabase/migrations/20260907090000_lot_attachment.sql:18`) | Là `<a>` khi có signed URL, `target="_blank" rel="noreferrer"`; không có URL thì chỉ là text kèm `title` giải thích (`src/components/lots/lot-attachments-card.tsx:36-43`) | Không có form → không có validation. **Màn này KHÔNG có input upload** — xem mục 7 | Signed URL lỗi → `lots.detail.attachmentsLinkUnavailable` "Không tạo được đường dẫn xem file — thử tải lại trang." (`vi/lots.json:64`) |
| 2 | `file_size` | Dung lượng | サイズ | integer bytes → hiển thị KB 1 số thập phân | — | `lot_attachment.file_size` — `integer not null check (file_size > 0)` (`lot_attachment.sql:20`) | `formatFileSize` = `(bytes/1024).toFixed(1)` (`lot-attachments-card.tsx:8-10`) | Không áp dụng | — |
| 3 | `created_at` | Thời điểm tải lên | アップロード日時 | timestamptz | — | `lot_attachment.created_at` — `default now()` (`lot_attachment.sql:22`) | `new Date(...).toLocaleString()` — **timezone theo trình duyệt, không neo JST, đề xuất chuẩn hoá** (`lot-attachments-card.tsx:46`) | Không áp dụng | — |
| — | `file_path` | — | — | text | — | `lot_attachment.file_path` (`lot_attachment.sql:17`) | **Không bao giờ render.** Được select ra chỉ để `createSignedUrl` rồi bỏ; component nhận `LotAttachmentView` không có trường này (`src/lib/lots/lot-attachment-queries.ts:6-9,24,34-44`) | Bucket `lot-attachment` là **private** (`lot_attachment.sql:47`); đọc chỉ qua signed URL TTL **300 giây** (`lot-attachment-queries.ts:4,36`) | — |

**QĐ-6 / đường dẫn chứng từ không ra ngoài:** `file_path` (và `evidence_path` ở F008) không nằm
trong bất kỳ payload nào trả ra client và **không bao giờ đi vào CSV** — kiểu
`LotAttachmentView` chỉ có `id`/`file_name`/`mime_type`/`file_size`/`created_at`/`signedUrl`
(`lot-attachment-queries.ts:6-9`).

### 3.3 REG003_Edit — điều chỉnh thuộc tính, chỉ ROLE-SETTLEMENT

`PATCH /api/lots/[id]`, mỗi lần gửi sửa **đúng một field**.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `field` | Trường cần sửa | 修正する項目 | select 2 lựa chọn | Có | Allowlist `EDITABLE_FIELDS = ["item","package_count"]` (`api/lots/[id]/route.ts:13`) | `<select>` chỉ 2 option: "Mặt hàng" / "Số kiện" (`lot-edit-form.tsx:84-93`; `vi/lots.json:73-74`). Đổi lựa chọn thì prefill giá trị hiện tại tương ứng (`:36-40`) | `isEditableField()` — ngoài 2 giá trị → **422** `invalid_request` (`route.ts:16-18,26-27,56`) | `lots.edit.error.invalidRequest` — "Vui lòng nhập đầy đủ giá trị mới và lý do sửa." (`vi/lots.json:80`) |
| 2 | `newValue` | Giá trị mới | 新しい値 | text khi `field=item`; number `min=1` khi `field=package_count` | Có | `lot.item` hoặc `lot.package_count` | `required`; `type` và `min` đổi theo `field` (`lot-edit-form.tsx:99-108`); `package_count` gửi qua `Number(newValue)` (`:55`) | `item`: phải là string, `.trim().length > 0` (`route.ts:31-34`). `package_count`: `typeof number && Number.isInteger && > 0` (`route.ts:35-36`) + CHECK ở DB (`lot.sql:9`). Trần precision/độ dài: **chưa có — đề xuất** | Như trên · **422** |
| 3 | `reason` | Lý do sửa | 修正理由 | text | Có | Không lưu vào `lot`; đi vào `audit_log.reason` (`route.ts:97-105`) | `required` (`lot-edit-form.tsx:114-122`) | `.trim().length === 0` → `parseAdjustBody` trả null → **422** `invalid_request` (`route.ts:28-29`). Ba nguyên nhân khác nhau (field lạ / giá trị xấu / thiếu lý do) dùng **cùng một mã** — xem mục 7 | Như trên · **422** |

### 3.4 REG004_History — lịch sử điều chỉnh (chỉ đọc, mọi vai trò)

Nguồn là `audit_log` lọc `entity = 'lot'` và `entity_id = {id}`, mới nhất trước — **không** có bảng
lịch sử riêng (`src/lib/lots/lot-queries.ts:22-37`).

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `action` | Hành động | 操作 | text mono | — | `audit_log.action` — `text not null` (`supabase/migrations/20260904090000_core_identity.sql:29`) | Nhãn `lots.action.*`: "Tiếp nhận lô" · "Ghi 目利き / Công bố" · "Điều chỉnh thuộc tính" · "Bị chặn — ngày đã khóa" (`vi/lots.json:88-91`; `ja/lots.json:88-91`) | Không áp dụng — `audit_log` **chỉ ghi thêm**, không có policy update/delete ở đâu (`core_identity.sql:38-40`; `rls_core.sql:64-67`) | Action lạ → in nguyên tên (`lot-audit-history-table.tsx:37`) |
| 2 | `before` / `after` | Thay đổi | 変更内容 | jsonb → diff | — | `audit_log.before`, `audit_log.after` — `jsonb` (`core_identity.sql:31-32`) | `AuditDiff` chỉ liệt kê field **thực sự đổi**, ẩn cột nội bộ (`id`, `created_at`, `assessor_id`, `actor_id`, ...) và dịch nhãn qua `LOT_FIELD_LABELS` (`src/components/audit/audit-diff.tsx:15-23,86-102`; `src/components/audit/audit-field-maps.ts:4-13`) | Không áp dụng | Không có field nào đổi → `audit.noChange` "Không có thay đổi" / 変更なし (`vi/common.json:53`) |
| 3 | `reason` | Lý do | 理由 | text, nullable | — | `audit_log.reason` — `text` nullable (`core_identity.sql:34`) | Null hiển thị `—` (`lot-audit-history-table.tsx:47`) | Không áp dụng | — |
| 4 | `created_at` | Thời điểm | 日時 | timestamptz | — | `audit_log.created_at` — `default now()` (`core_identity.sql:35`) | `toLocaleString()` — **không neo JST, đề xuất chuẩn hoá** (`lot-audit-history-table.tsx:48`) | Không áp dụng | — |

Kết quả 目利き (`grade`) xuất hiện ở đây, qua `after.grade` của hàng audit `publish`
(`audit-field-maps.ts:11`) — **màn này không query `mekiki_record`**, xem mục 7.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (chứng từ) | `attachments.length === 0` | `EmptyState compact` — "Chưa có chứng từ nào được đính kèm." (`lot-attachments-card.tsx:19-21`) | — (không có upload) |
| rỗng (lịch sử) | `history.length === 0` | `EmptyState compact` — "Chưa có lịch sử điều chỉnh." (`lot-audit-history-table.tsx:19-21`) | — |
| đang tải | Điều hướng vào trang | Không có `loading.tsx` — **chưa có skeleton, đề xuất**. `loadLotAuditHistory` + `loadLotAttachments` chạy song song (`page.tsx:31-34`) | — |
| lỗi tải | Bất kỳ query nào trả error | `throw new Error(...)` → error boundary Next; **chưa có UI riêng, đề xuất** (`lot-queries.ts:16-18,33-35`; `lot-attachment-queries.ts:28-30`) | Tải lại |
| không tìm thấy lô | `!lot` | `notFound()` → trang 404 (`page.tsx:30`) | — |
| không có quyền ghi | `user.role !== "ROLE-SETTLEMENT"` | Giữ nguyên card "Sửa thuộc tính lô hàng", thay nội dung bằng `HandoffCaption` nói rõ hành động thuộc ROLE-SETTLEMENT (`page.tsx:66-80`) | Chỉ đọc |
| đang gửi | `submitting === true` | 3 input `disabled`, nút `aria-busy` + "Đang lưu..." (`lot-edit-form.tsx:106,120,130-137`) | Không — chặn ở `if (submitting) return` (`:43`) |
| gửi lỗi | `!response.ok` | `<p role="alert">` theo `body.error`; 3 mã có câu riêng, còn lại rơi về `lots.edit.error.network` (`lot-edit-form.tsx:9-13,61-65,124-128`) | Sửa và gửi lại |
| gửi thành công | `success === true` | `lots.edit.success` — "Đã lưu thay đổi và ghi audit log."; xoá ô lý do; `router.refresh()` (`lot-edit-form.tsx:66-69,129`) | Sửa field khác |
| **read-only vì ngày đã lock** | `business_day_lock` có hàng cho `lot.business_date` (`isBusinessDateLocked`, `src/lib/lots/lot-queries.ts:45-59`) | **Không chặn trước ở UI** — form vẫn hiện đầy đủ, chỉ báo sau khi submit: `lots.edit.error.locked` — "Ngày nghiệp vụ đã lock, không thể sửa trực tiếp — dùng luồng điều chỉnh sau chốt." / 業務日がロックされているため直接修正できません — 締め後修正フローをご利用ください。 (`vi/lots.json:81`, `ja/lots.json:81`) | Chuyển sang luồng SC-20 (tạo yêu cầu điều chỉnh) |
| **read-only vì ngày đã lock — mã lỗi** | Cùng điều kiện trên | HTTP **423** `locked_business_date` (`api/lots/[id]/route.ts:76`). **Ghi audit trước khi trả 423**: action `adjust_blocked_locked`, `after = {field, newValue}`, kèm `reason` — nỗ lực bị chặn cũng có dấu vết, và hiện ngay ở REG004 (`route.ts:66-76`; nhãn `vi/lots.json:91`) | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | ✓ | Cả 4 khối + giá trị hiện tại của `package_count` (qua form) | Sửa `item` / `package_count` kèm lý do · mở chứng từ | 400 / 422 / **423** / 500 — xem mục 6 |
| 6 vai trò còn lại (INTAKE, JUDGE, TRADE, DELIVERY, RULE-ADMIN, SYS-ADMIN) | ✓ | REG001 + REG002 + REG004 đầy đủ; REG003 thay bằng `HandoffCaption` | Mở chứng từ (signed URL) | Gọi `PATCH /api/lots/[id]` → **404** (`route.ts:128`) |

**Lưu ý về đọc:** RLS `read_all_active_users` cho **mọi vai trò active đọc được** `lot`, `audit_log`
và `lot_attachment` (`rls_core.sql:33-40`; `lot_attachment.sql:35-36`), kể cả file trong bucket
(`lot_attachment.sql:53-54`) — có chủ đích theo FR-601. Chặn là ở **ghi**: `write_lot_operational`
update trên `lot` cho 4 vai trò INTAKE/JUDGE/TRADE/SETTLEMENT (`rls_core.sql:84-86`), `write_intake`
insert trên `lot_attachment` (`lot_attachment.sql:40-41`). Route thu hẹp thêm: PATCH chỉ
ROLE-SETTLEMENT (`route.ts:128`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Điều chỉnh thuộc tính | `PATCH /api/lots/[id]` (`route.ts:124`) | `lot` (update **một** cột: `item` hoặc `package_count`, ghi bằng literal shape để type-check được) (`route.ts:83-91`) | `adjust`, `before = {field: giá trị cũ}`, `after = {field: giá trị mới}`, `reason` bắt buộc (`route.ts:81-82,97-105`) | **404** sai vai trò (`:128`) hoặc `not_found` (`:60`) · **400** `invalid_json` (`:53`) · **422** `invalid_request` (`:56`) · **423** `locked_business_date` (`:76`) · **500** `internal_error` (`:133`) |
| Nỗ lực sửa bị lock | Cùng endpoint | **Không ghi `lot`** | `adjust_blocked_locked` — ghi **trước** khi trả 423 (`route.ts:66-76`) | **423** |
| Mở chứng từ | Không gọi API app — signed URL sinh sẵn khi render trang (`lot-attachment-queries.ts:34-36`) | — | **Không có audit cho lượt xem file** — `chưa có, đề xuất` nếu cần truy vết ai đã mở chứng từ | Link hết hạn sau 300s → lỗi từ phía Supabase Storage, tải lại trang để lấy URL mới |
| Đọc chi tiết qua API | `GET /api/lots/[id]` — `requireUser()`, trả `{lot, history}` (`route.ts:39-46,110-122`) | — | — | **404** `not_found` · **500** `internal_error`. Trang **không** dùng endpoint này (đọc Supabase trực tiếp) — LAB-5 cần biết là nó tồn tại song song |

## 7. Edge case

- **423 nói "ngày nghiệp vụ đã lock" nhưng màn không hề hiện ngày nghiệp vụ nào.** `business_date`
  không có trong REG001, không có trong form, không có ở đâu (`page.tsx:53-60`;
  `src/components/lots/lot-availability-fields.tsx:20-30`). Người dùng nhận 423 mà không biết lô
  thuộc ngày nào, cũng không biết ngày đó lock lúc nào. Task LAB-5 nhỏ và giá trị cao: thêm
  `business_date` + cờ "đã lock" vào REG001, và disable form trước khi submit.
- **Lock trên `lot` chỉ là chốt tầng ứng dụng, không có bảo đảm tầng DB.** `lot` **không** có
  `trg_block_after_lock` — cố tình, vì lô nhận ngày đã lock vẫn bán ngày sau (QĐ-3, `lot.sql:18-20`;
  `supabase/migrations/20260904090500_business_day_lock.sql:56-59`). Nên chốt duy nhất là
  `isBusinessDateLocked` trong route (`route.ts:62-77`). Ghi thẳng vào `lot` bằng `service_role`,
  bằng psql, hoặc từ một route mới quên gọi hàm đó là **lọt hoàn toàn**. Đối chiếu: 4 bảng có trigger
  thì chặn được cả `service_role`/BYPASSRLS (`business_day_lock.sql:6-10,51-54`). Đây là đánh đổi có
  chủ đích, nhưng phải khai để LAB-5 không tưởng là có bảo đảm hai tầng.
- **Không có upload trên màn này, mà SC-08 lại chỉ người dùng sang đây.** Khi đính kèm thất bại lúc
  tiếp nhận, SC-08 hiện "vào chi tiết lô để thử đính kèm lại" (`vi/lots.json:33`) — nhưng REG002 chỉ
  là bảng đọc, trang không import component upload nào (`page.tsx:62-64`;
  `lot-attachments-card.tsx:12-52`). Chứng từ lỗi coi như mất. Task LAB-5: thêm upload (dùng lại
  `attachIntakeDoc`), hoặc sửa câu ở SC-08 cho đúng.
- **Lượt đính kèm không hiện trong lịch sử của lô.** `attachIntakeDoc` ghi audit với
  `entity = "lot_attachment"` (`src/lib/lots/attach-intake-doc.ts:65-72`) nhưng
  `loadLotAuditHistory` lọc `entity = "lot"` (`lot-queries.ts:29-30`). Nên REG004 **không** thấy
  hàng `attach_document` nào, dù REG002 ngay trên nó đang liệt kê file. Task LAB-5: mở rộng filter
  sang `entity in ('lot','lot_attachment')` với `entity_id` tương ứng, hoặc gộp audit vào entity `lot`.
- **Không có CAS, mất cập nhật là có thật.** `handleAdjust` đọc lô (`route.ts:59`) rồi
  `update ... .eq("id", id)` **không có điều kiện giá trị cũ** (`route.ts:83-91`). Hai
  ROLE-SETTLEMENT sửa cùng `item` gần nhau: người sau ghi đè người trước, và hàng audit của người
  sau có `before` là giá trị đọc lúc `loadLot`, có thể đã cũ → dấu vết audit **sai**. Đối chiếu:
  `availability-service.ts:62-72` và `mekiki/route.ts:45-51` đều dùng CAS đúng cách. **Chưa có ở
  đây — đề xuất** `.eq(field, giá trị cũ)`.
- **Ba nguyên nhân lỗi dùng chung một mã 422.** Field ngoài allowlist, giá trị xấu, thiếu lý do đều
  rơi về `invalid_request` (`route.ts:24-37,56`) → cùng một câu trên UI. Task LAB-5: tách mã lỗi.
- **Mỗi lần gửi sửa đúng một field.** Sửa cả `item` và `package_count` là hai request, hai hàng
  audit, hai lần nhập lý do. Có chủ đích ("điều chỉnh có kiểm soát", `route.ts:9-10`); muốn gộp thì
  phải sửa cả `parseAdjustBody` và `AuditDiff`.
- **`available_qty` không sửa được qua màn này, và đó là chủ đích** — loại khỏi allowlist
  (`route.ts:9-13`); mọi thay đổi qua `reserveLotQty`/`releaseLotQty` với CAS
  (`availability-service.ts:48-77,84-110`) để CHECK `available_qty >= 0` không bao giờ vỡ. Đừng sinh
  task "cho sửa số lượng khả dụng" — đó là bỏ hàng rào.
- **`mekiki_record` không được query.** 目利き chỉ tới màn này qua `after.grade` của hàng audit
  `publish` (`audit-field-maps.ts:11`; `api/lots/[id]/mekiki/route.ts:77-84`) — không có
  `assessed_at`, không có người xác nhận, và mất hàng audit đó là mất kết quả trên màn dù
  `mekiki_record` vẫn còn. **Đề xuất** đọc thẳng `mekiki_record` cho REG001.
- **Signed URL hết hạn sau 300 giây.** Mở trang, đi họp 10 phút, bấm link → lỗi từ Storage; không có
  cơ chế làm mới tại chỗ (`lot-attachment-queries.ts:4,34-36`). **Đề xuất** endpoint sign theo yêu cầu.
- **Timezone hiển thị không neo.** REG002 và REG004 dùng `toLocaleString()` của trình duyệt
  (`lot-attachments-card.tsx:46`; `lot-audit-history-table.tsx:48`) trong khi mọi `business_date` neo
  Asia/Tokyo (`src/lib/db/business-date.ts:6,11-16`) — máy khác timezone đọc lệch giờ so với ngày
  nghiệp vụ. **Đề xuất** format JST tường minh.
- **Key i18n chết**: `lots.diff.noChange` (`vi/lots.json:86`) không ai dùng — `AuditDiff` gọi
  `t("audit.noChange", "—")` lấy từ `common.json:53` (`audit-diff.tsx:91`). Dọn hoặc bỏ.
- **Quyền bị thu hồi giữa phiên**: `PATCH` gọi `requireRole` → 404 (`route.ts:128`); lần render kế
  tiếp form đổi thành `HandoffCaption` (`page.tsx:69`).

## 8. Dẫn chứng

- `src/app/(app)/lots/[id]/page.tsx:20-34,36-88` — `requireUser()`, 3 query song song, 5 `SectionCard`
- `src/components/lots/lot-availability-fields.tsx:4-7,20-30` — 3 field REG001 (không có `package_count`, không có `business_date`)
- `src/components/lots/lot-attachments-card.tsx:4-10,19-21,26-48` — signed URL, KB, nhánh không có link
- `src/components/lots/lot-edit-form.tsx:9-13,15-17,29-40,42-74,79-138` — map mã lỗi (gồm `locked_business_date`), prefill theo field, 3 input
- `src/components/lots/lot-audit-history-table.tsx:6-11,19-21,28-49` — 4 cột, nguồn là `audit_log`
- `src/components/audit/audit-diff.tsx:7-10,15-23,56-60,69-102` — chỉ hiện field đổi, ẩn cột nội bộ, `audit.noChange`
- `src/components/audit/audit-field-maps.ts:4-13,15-20` — nhãn cột lot, gồm `grade`; lý do bỏ `intake_docs`
- `src/app/api/lots/[id]/route.ts:9-13,16-37,39-46,48-77,81-107,110-136` — allowlist, `parseAdjustBody`, GET, chốt lock + **423** + audit `adjust_blocked_locked`, update + audit `adjust`, gate vai trò
- `src/lib/lots/lot-queries.ts:10-19,22-37,39-59` — `loadLot`, `loadLotAuditHistory` (lọc `entity='lot'`), `isBusinessDateLocked` (đọc bảng trực tiếp vì `private.*` không expose qua PostgREST)
- `src/lib/lots/lot-attachment-queries.ts:4,6-9,11-17,18-46` — TTL 300s, kiểu view không mang `file_path`, signing lỗi một hàng không làm gãy trang
- `src/lib/lots/availability-service.ts:9-31,48-77,84-110` — vì sao `available_qty` chỉ đi qua CAS
- `src/lib/audit/write-audit-log.ts:14-28,30-50` — audit là primitive chung; `reason` bắt buộc hay không là quyết định của từng feature
- `supabase/migrations/20260904090200_lot.sql:1-20` — DDL `lot` + comment QĐ-3 (không có trigger lock) · `20260907090000_lot_attachment.sql:1-13,14-29,35-54` — QĐ-6, chỉ ghi thêm, RLS + bucket private · `20260904090000_core_identity.sql:26-40` — DDL `audit_log`, chỉ ghi thêm
- `supabase/migrations/20260904090500_business_day_lock.sql:1-10,37-59` — hai tầng chặn và lý do `lot` bị miễn · `20260904090900_rls_core.sql:33-40,64-67,84-86` — read mọi vai trò, `audit_log` insert-only, write `lot`
- `src/lib/i18n/dictionaries/vi/lots.json:54-91` · `ja/lots.json:54-91` · `vi/common.json:22,25,53` — nhãn VI/JA
- `docs/generated/permissions-matrix.md:254-263` — PERM điều chỉnh lô, khớp code · `docs/generated/screen-list.md:321-360` — SCR009_LotDetail composite

**Ba chỗ lệch đã ghi ra, không im lặng chọn một bên:**

1. **Mã màn** — comment trong page ghi `SCR006_LotDetail` (`page.tsx:20`, hệ cũ 20 SCR); roster
   LAB-4 và `screen-list.md:321-323` dùng hệ 26 mã `SCR009_LotDetail`. Xem `../00-roster-va-gap.md` § 3.3.
2. **`mekiki_record`** — brief phase-04 mô tả SC-10 "đọc/sửa `lot` + `mekiki_record`", nhưng code
   **không** query bảng đó (`page.tsx:28-34`); 目利き chỉ tới qua hàng audit `publish`. Tin code.
   Hệ quả: **423 ở màn này là của `lot`** (chốt tầng app), không phải của `mekiki_record` (chốt tầng
   trigger) — hai cơ chế khác nhau, đừng gộp khi ước lượng.
3. **Số khối** — `screen-list.md:355-360` khai 3 REG; spec này khai 4, tách REG004_History vì nó có
   query riêng và là nơi LAB-5 phải sửa hai lỗi riêng biệt (filter `entity`, timezone).
