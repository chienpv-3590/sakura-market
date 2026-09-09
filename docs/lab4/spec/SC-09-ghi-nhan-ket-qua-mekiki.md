# SC-09 — Ghi nhận kết quả 目利き

| | |
|---|---|
| Mã thi công | SCR008_MekikiEntry |
| Route | `/lots/[id]/mekiki` |
| Loại | Form |
| Actor chính | Người đánh giá — ROLE-JUDGE |
| FE- / FR- | FE-010 / FR-LOT-02, SM-001, SCOPE-OUT-01, NFR-USE-01 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Người đánh giá ghi nhận định 目利き cho một lô đã tiếp nhận. Đây là cửa duy nhất đưa lô từ
`received` sang `published` — không có 目利き thì lô không vào được giao dịch. Kết quả là **văn bản
tự do**, không phải enum, không có chấm điểm tự động: SCOPE-OUT-01 loại hẳn phần auto-grading khỏi
phạm vi (`src/app/api/lots/[id]/mekiki/route.ts:8-9`).

## 2. Điều kiện vào màn

- **Đăng nhập**: bắt buộc — `requireUser()` gọi tường minh ngay đầu trang (`src/app/(app)/lots/[id]/mekiki/page.tsx:17`)
- **Vai trò được vào**: **cả 7 vai trò**. Trang cố tình chỉ `requireUser()`; quyền ghi giữ ở tầng API (`page.tsx:12-15`). Vai trò khác vào được, chỉ thấy dòng giải thích thay vì form
- **Mã lỗi khi thiếu quyền**: vào trang không 404 theo vai trò. Gọi `POST /api/lots/[id]/mekiki` khi không phải ROLE-JUDGE → **404** (`requireRole`, `route.ts:93`; `src/lib/auth/require-role.ts:72-77`) — có chủ đích, không phải 403. Riêng `id` không tồn tại → **404** ở trang (`page.tsx:30`)
- **Tiền đề dữ liệu**: hàng `lot` tồn tại. Form chỉ hiện khi `lot.status === "received"` **và** vai trò là ROLE-JUDGE (`page.tsx:46`)

## 3. Bảng field

Một field nhập, bốn field dẫn xuất, hai field ngữ cảnh chỉ đọc.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade` | Kết quả thẩm định (目利き) | 目利き結果 | text tự do (`tabIndex=1`) | Có | `mekiki_record.grade` — `text not null` (`supabase/migrations/20260904090200_lot.sql:24`) | `required` (`src/components/lots/mekiki-form.tsx:63-74`); placeholder gợi cách viết: "Nhập nhận định của bạn, ví dụ: trên A, thân dày, mắt trong" (`vi/lots.json:42`) | `typeof === "string"`, `.trim()`, rỗng → null → **422** (`route.ts:10-16,25-26`). **Không giới hạn độ dài, không enum, không sniff nội dung — chưa có, đề xuất trần độ dài** | `lots.mekiki.error.invalidRequest` — "Vui lòng nhập kết quả thẩm định." / 目利き結果を入力してください。 (`vi/lots.json:47`, `ja/lots.json:47`) |
| 2 | `assessor_id` | Người xác nhận | 評価担当者 | uuid, **dẫn xuất** | — | `mekiki_record.assessor_id` — `uuid references app_user(id)`, **nullable ở DB** (`lot.sql:26`) | Không có input — **key i18n `lots.mekiki.assessorLabel` tồn tại nhưng form chưa render field này** (`vi/lots.json:43`; không xuất hiện trong `mekiki-form.tsx`) | Lấy từ session: `requireRole(...)` trả `user.id`, truyền vào làm `assessorId` (`route.ts:93,96,60`) — client không gửi được giá trị này | — |
| 3 | `assessed_at` | — (chưa có key i18n) | — (chưa có key JA) | timestamptz, **dẫn xuất** | — | `mekiki_record.assessed_at` — `not null default now()` (`lot.sql:27`) | Không có input | Do Postgres đặt, route không gửi (`route.ts:57-62`) | — |
| 4 | `business_date` | Ngày nghiệp vụ | 業務日 | date, **dẫn xuất** | — | `mekiki_record.business_date` — `date not null`, QĐ-2: trigger đọc thẳng cột này, không JOIN (`lot.sql:28`) | Không có input | **Copy từ `lot.business_date`, KHÔNG phải `todayJst()`** (`route.ts:32,61`) — lô nhận hôm qua mà đánh giá hôm nay thì bản ghi mang ngày nghiệp vụ **hôm qua**. Xem mục 7 | — |
| 5 | `lot.status` | Trạng thái | 状態 | text, **dẫn xuất** | — | `lot.status`, `check (status in ('received','published','traded','delivered'))` (`lot.sql:12-13`) | Không có input | CAS `UPDATE lot SET status='published' WHERE id=? AND status='received'` — chỉ request nào lật được trạng thái mới đi tiếp (`route.ts:38-55`) | Mất CAS → **409** `lot_not_receivable` → `lots.mekiki.error.notReceivable` — "Lô hàng không ở trạng thái chờ 目利き (đã ghi trước đó hoặc đã vào giao dịch)." (`vi/lots.json:48`) |
| 6 | `lot_code` | Mã lô | ロット番号 | text, chỉ đọc | — | `lot.lot_code` (`lot.sql:7`) | Hiển thị ở phần mô tả trang, font mono (`page.tsx:38`) | Không áp dụng | — |
| 7 | `item` | Mặt hàng | 品目 | text, chỉ đọc | — | `lot.item` (`lot.sql:8`) | Hiển thị ở phần mô tả trang (`page.tsx:40-41`) | Không áp dụng | — |

Nhãn nút: `lots.mekiki.submit` "Lưu kết quả" / 結果を保存 · `lots.mekiki.submitting` "Đang lưu..." /
保存中... (`vi/lots.json:44-45`, `ja/lots.json:44-45`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (sẵn sàng nhập) | ROLE-JUDGE **và** `lot.status === "received"` | Form một field, con trỏ tự vào field đầu (`src/components/lots/keyboard-operable-form.tsx:27-30`) | Nhập, submit |
| đang tải | Điều hướng vào trang | Không có `loading.tsx` cho route này — **chưa có skeleton, đề xuất** | — |
| lỗi tải | Query `lot` trả error | `throw new Error(...)` → error boundary Next; **chưa có UI riêng, đề xuất** (`page.tsx:29`) | Tải lại |
| không tìm thấy lô | `!lot` | `notFound()` → trang 404 (`page.tsx:30`) | — |
| sai vai trò | `user.role !== "ROLE-JUDGE"` | **Vẫn vào được trang**, thấy mã lô + mặt hàng, form thay bằng một dòng: `lots.mekiki.wrongRole` — "Chỉ Người đánh giá (ROLE-JUDGE) mới ghi được 目利き cho lô hàng này." (`page.tsx:48-49`; `vi/lots.json:52`) | Chỉ đọc · quay lại SC-10 |
| đã 目利き rồi | ROLE-JUDGE nhưng `lot.status !== "received"` | `lots.mekiki.alreadyDone` — "Lô hàng này đã qua bước 目利き." (`page.tsx:50-51`; `vi/lots.json:53`) | Quay lại SC-10 |
| đang gửi | `submitting === true` | Input `disabled`, nút `aria-busy` + "Đang lưu..." (`mekiki-form.tsx:72,81-89`) | Không — chặn ở `if (submitting) return` (`:27`) |
| gửi lỗi | `!response.ok` | `<p role="alert">` với câu theo `body.error`; ba mã có câu riêng, còn lại rơi về `lots.mekiki.error.network` (`mekiki-form.tsx:8-12,39-43,76-80`) | Sửa và gửi lại |
| thành công | `done === true` | Thay form bằng `lots.mekiki.success` — "Đã lưu kết quả 目利き, lô hàng chuyển sang Đã 目利き / Công bố." rồi `router.refresh()` (`mekiki-form.tsx:44-46,53-55`) | Quay lại SC-10 |
| **read-only vì ngày đã lock** | `business_day_lock` đã có hàng cho `mekiki_record.business_date` (= `lot.business_date`) | **CHƯA CÓ — màn không kiểm lock.** Form vẫn hiện, submit vẫn trả **201**: `mekiki_record` bị `trg_block_after_lock` chặn **BEFORE UPDATE OR DELETE**, không chặn INSERT (`supabase/migrations/20260904090500_business_day_lock.sql:69-71`), và policy `write_judge` cho insert không có điều kiện lock (`supabase/migrations/20260904090900_rls_core.sql:91-92`). Route cũng không gọi `isBusinessDateLocked` | Ghi được — xem mục 7, đây là lỗ hổng phải khai |
| read-only vì ngày đã lock — mã lỗi | Nếu có UPDATE/DELETE trên `mekiki_record` | Trigger raise `ERR_LOCKED_BUSINESS_DAY`, SQLSTATE **`P0001`** (`business_day_lock.sql:37-49`) → hợp đồng chung của hệ thống là map sang HTTP **423** (mẫu đã có ở `src/app/api/seri-results/[id]/route.ts:101`, `src/app/api/lots/[id]/route.ts:76`, `src/lib/reconciliation/handle-locked-write.ts:41`) | **Chưa có mapping ở route này — đề xuất.** Hiện không route nào UPDATE/DELETE `mekiki_record`, nên `P0001` chưa với tới được từ trong ứng dụng; policy update/delete có sẵn chỉ là phòng xa (`rls_core.sql:88-90`) |

**Bàn phím — NFR-USE-01.** Cùng ràng buộc như SC-08: form bọc `KeyboardOperableForm`, tự focus
field đầu, Enter ở field text gọi `requestSubmit()` (`keyboard-operable-form.tsx:11-22,27-39`),
`tabIndex` khai tường minh 1 cho input và 2 cho nút (`mekiki-form.tsx:68,82`).

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-JUDGE | ✓ | `lot_code`, `item`, form `grade` (khi `status === "received"`) | Ghi 目利き → lật lô sang `published` | 400 / 409 / 422 / 500 — xem mục 6 |
| 6 vai trò còn lại | ✓ (đọc) | `lot_code`, `item` + dòng `lots.mekiki.wrongRole` | Không | Gọi `POST /api/lots/[id]/mekiki` → **404** (`route.ts:93`) |

**Lưu ý về đọc:** RLS `read_all_active_users` cho **mọi vai trò active đọc được** `lot` và
`mekiki_record` (`rls_core.sql:39-42`) — có chủ đích theo FR-601. Chặn là ở **ghi**: `write_judge`
insert trên `mekiki_record` (`rls_core.sql:91-92`) và `write_lot_operational` update trên `lot`, cho
4 vai trò INTAKE/JUDGE/TRADE/SETTLEMENT (`rls_core.sql:84-86`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Ghi kết quả 目利き | `POST /api/lots/[id]/mekiki` (`route.ts:89`) | **Thứ tự có ý nghĩa**: (1) `lot.status` update bằng CAS `received → published` (`route.ts:45-51`), (2) `mekiki_record` insert (`route.ts:57-67`). CAS đi trước để làm điểm serialize — PostgREST không có BEGIN/COMMIT xuyên bảng (`route.ts:38-44`) | `publish` trên entity **`lot`** (không phải `mekiki_record`), `before = {status:"received"}`, `after = {status:"published", grade}` (`route.ts:77-84`). Vì entity là `lot`, hàng audit này hiện ở lịch sử của SC-10, không có hàng audit riêng cho `mekiki_record` | **404** sai vai trò (`:93`) hoặc `lot_not_found` (`:36`) · **400** `invalid_json` (`:23`) · **422** `invalid_request` (`:26`) · **409** `lot_not_receivable` (`:54`) · **201** kèm `{mekiki, status:"published"}` · **500** `internal_error` (`:99`). **Không có 423** — xem mục 4 và mục 7 |
| Quay lại SC-10 | Điều hướng `/lots/{id}` (`page.tsx:43-44`) | — | — | 404 nếu lô không tồn tại |

## 7. Edge case

- **目利き ghi được vào ngày đã lock — lỗ hổng phải khai.** `mekiki_record` được khai là bảng bị lock
  (`lot.sql:32-33`) nhưng trigger chỉ `before update or delete` (`business_day_lock.sql:69-71`), và
  policy insert `write_judge` không mang điều kiện lock (`rls_core.sql:91-92`). `POST` cũng không
  gọi `isBusinessDateLocked` (đối chiếu: `src/app/api/lots/[id]/route.ts:66-77` thì có gọi). Hệ quả:
  sau khi ngày đã chốt, ROLE-JUDGE vẫn thêm được bản ghi 目利き mang `business_date` của ngày đó, và
  lô vẫn lật `received → published`. Số liệu của một ngày đã lock vẫn đổi được bằng cách **thêm**
  hàng, dù không đổi được bằng cách **sửa** hàng. Task LAB-5: thêm chốt lock vào `POST`, trả **423**
  `locked_business_date` theo đúng mẫu `handle-locked-write.ts:41`.
- **`business_date` copy từ lô, không phải hôm nay.** `route.ts:32,61` lấy `lot.business_date`. Lô
  nhận ngày N, đánh giá ngày N+1 → bản ghi mang ngày N. Đúng ý QĐ-2 (trigger đọc thẳng cột, không
  JOIN, `lot.sql:28`), nhưng kéo theo hai điều: (a) bản ghi vừa insert có thể **đã nằm trong ngày
  đã lock** và bị đóng băng ngay lập tức với mọi UPDATE/DELETE về sau; (b) báo cáo tính theo
  `mekiki_record.business_date` sẽ quy công việc của ngày N+1 về ngày N.
- **Hai ROLE-JUDGE cùng bấm: người thứ hai nhận 409, không phải bản ghi trùng.** CAS trên
  `status='received'` là điểm serialize thật (`route.ts:45-55`) — đúng cách. Nhưng ở tầng DB
  **không có unique constraint nào trên `mekiki_record.lot_id`** (`lot.sql:22-29`, chỉ có index
  không unique ở `:35`). Nếu ai đó đưa `lot.status` về `received` bằng đường khác, lô sẽ có hai bản
  ghi 目利き. **Chưa có ràng buộc DB — đề xuất** `unique (lot_id)` hoặc partial unique.
- **Bù trừ khi insert thất bại là best-effort.** Insert `mekiki_record` lỗi → route đưa
  `lot.status` về `received` rồi throw 500 (`route.ts:69-75`). Nếu chính lệnh bù trừ đó cũng lỗi,
  lô nằm ở `published` mà **không có bản ghi 目利き nào** — trạng thái vô nghĩa về nghiệp vụ, và
  không có cơ chế nào phát hiện lại. Không có transaction thật vì PostgREST, muốn nguyên tử phải
  viết RPC trong migration.
- **`grade` không có trần độ dài.** `text not null` ở DB, `trim().length > 0` ở server. Dán 2MB văn
  bản vào là lưu được. **Chưa có — đề xuất** trần ký tự ở cả client và server.
- **`assessor_id` nullable ở DB nhưng route luôn đặt.** `lot.sql:26` cho phép null; đường ghi duy
  nhất hiện có luôn truyền `user.id` (`route.ts:60,96`). Nếu sau này có đường ghi khác (RPC, seed,
  service_role) thì bản ghi có thể mất người xác nhận mà DB không cản. **Đề xuất** `not null`.
- **Nhãn "Người xác nhận" có key nhưng không hiển thị.** `lots.mekiki.assessorLabel` tồn tại cả VI
  và JA (`vi/lots.json:43`, `ja/lots.json:43`) nhưng `mekiki-form.tsx` không dùng — người đánh giá
  không thấy tên mình được ghi vào đâu. Task LAB-5 nhỏ: render field chỉ đọc, hoặc bỏ key.
- **Quyền bị thu hồi giữa phiên**: form đang mở, `is_active` chuyển false hoặc vai trò đổi → `POST`
  gọi `requireRole` → 404, không có nhánh nào ghi được (`route.ts:93`).
- **Lô đã vào giao dịch** (`traded`/`delivered`): CAS không khớp → **409** với câu nói đúng bản chất
  ("đã ghi trước đó hoặc đã vào giao dịch"). Không có đường ghi lại 目利き cho lô đã qua bước này —
  đúng ý F003, vì bảng không có action sửa nào (`rls_core.sql:88-90`).

## 8. Dẫn chứng

- `src/app/(app)/lots/[id]/mekiki/page.tsx:12-15,17-30,32-53` — chỉ `requireUser()`, quyền ghi ở API; 3 nhánh hiển thị
- `src/components/lots/mekiki-form.tsx:8-12,14-16,25-51,53-55,57-90` — map mã lỗi → i18n, `grade` tự do, 3 trạng thái submit
- `src/components/lots/keyboard-operable-form.tsx:11-22,27-39` — NFR-USE-01: autofocus + Enter submit
- `src/app/api/lots/[id]/mekiki/route.ts:8-9,10-16,25-26,30-36,38-55,57-67,69-75,77-84,89-101` — SCOPE-OUT-01, parse `grade`, CAS, insert, bù trừ, audit `publish`, gate `requireRole(["ROLE-JUDGE"])`
- `supabase/migrations/20260904090200_lot.sql:22-35` — DDL `mekiki_record` + comment "Locked by trg_block_after_lock"; index `lot_id` **không unique**
- `supabase/migrations/20260904090500_business_day_lock.sql:22-35,37-49,51-54,69-71` — `is_business_day_locked`, `P0001`, trigger **chỉ** `before update or delete` trên `mekiki_record`
- `supabase/migrations/20260904090900_rls_core.sql:39-42,84-86,88-97` — read mọi vai trò; `write_judge` insert **không** có điều kiện lock; policy update/delete là phòng xa
- `supabase/migrations/20260904091100_lock_enforcement_fix.sql:12-31` — vì sao điều kiện lock bị **bỏ khỏi RLS** và để trigger làm việc đó một mình (RLS lọc hàng trước khi trigger chạy, gây "200 / []" thay vì lỗi)
- `src/app/api/lots/[id]/route.ts:66-77` · `src/app/api/seri-results/[id]/route.ts:101` · `src/lib/reconciliation/handle-locked-write.ts:41` — ba chỗ đã map lock → **423**, là mẫu để SC-09 làm theo
- `src/lib/db/business-date.ts:28-30` — `todayJst()`, cái mà route này **không** dùng
- `src/lib/i18n/dictionaries/vi/lots.json:38-53` · `ja/lots.json:38-53` — nhãn VI/JA
- `docs/generated/permissions-matrix.md:214-224` — PERM ghi 目利き; `:215` khai rõ nhánh trên trang là "view-only decision, not enforcement", khớp code
- `docs/generated/screen-list.md:292-318` — SCR008_MekikiEntry

**Ghi chú lệch mã màn:** comment trong file page ghi `SCR005_MekikiEntry`
(`src/app/(app)/lots/[id]/mekiki/page.tsx:12`) — hệ mã cũ 20 SCR. Roster LAB-4 và
`docs/generated/screen-list.md:292-294` dùng hệ 26 mã: `SCR008_MekikiEntry`, legacy ref
`SCR005_MekikiEntry`. Xem `../00-roster-va-gap.md` § 3.3.
