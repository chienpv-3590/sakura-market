# SC-32 — Trạng thái vận hành suy giảm

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | **Không có route riêng** — thành phần cắt ngang, không phải trang |
| Loại | **Component** |
| Actor chính | Người dùng tại hiện trường (ROLE-INTAKE, ROLE-JUDGE, ROLE-TRADE, ROLE-DELIVERY) |
| FE- / FR- | FE-045 / `NFR-AVL-02` |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

**Lý do ngoài phạm vi — chép từ `../../pham-vi-va-phan-mock.md:84`:** `NFR-AVL-02` (vận hành suy
giảm) — **NGOÀI PHẠM VI**: "Cần offline queue — không khả thi trong prototype."

**Đây là Component, không phải trang.** Screen List LAB-1 ghi `Loại = Component` với ghi chú "chỉ
báo trạng thái offline và hàng đợi chờ đồng bộ" (`../00-roster-va-gap.md:47`). Nó **không có route
riêng**, không có URL để mở, và mục 2 dưới đây không phải "điều kiện vào màn" theo nghĩa thường —
mà là điều kiện **hiển thị chồng lên màn khác**.

## 1. Mục đích

Cho người đang làm việc tại hiện trường biết ngay hai điều: kết nối còn hay đã mất, và có bao nhiêu
thao tác của họ **chưa** tới được server. `NFR-AVL-02` đòi "tối thiểu tiếp tục thực hiện tác vụ khi
kết nối tại hiện trường bị ngắt trong thời gian ngắn, và cách đồng bộ lại khi dịch vụ trở lại" —
thành phần này là phần người dùng nhìn thấy của cơ chế đó. Cái nó chống là ca tệ nhất: người dùng
nhập xong, tưởng đã lưu, đi làm việc khác, và số liệu ngày nghiệp vụ thiếu một dòng.

## 2. Điều kiện hiển thị — thay cho "điều kiện vào màn"

Không có route. Thành phần này hiển thị chồng lên màn khác theo hai lớp:

| Lớp | Vị trí | Xuất hiện khi | Ngữ cảnh |
|---|---|---|---|
| Chỉ báo toàn cục | Top header, cạnh `BusinessDayIndicator` (`src/components/layout/top-header.tsx:71`) | Luôn có mặt sau khi đăng nhập; chỉ đổi hình thái khi mất kết nối hoặc còn thao tác chờ | Mọi màn trong `(app)` layout |
| Banner trong màn | Đầu vùng nội dung, trên form | Màn có ghi dữ liệu **và** đang mất kết nối hoặc còn thao tác chờ của chính màn đó | Xem bảng dưới |

**Các màn có banner trong màn:**

| SC- | Màn | Route | Vì sao là màn hiện trường |
|---|---|---|---|
| SC-08 | Tiếp nhận lô hàng | `/lots/new` | Lô hàng đến trong khung 02:00–10:00 JST, nhập tại bến |
| SC-09 | Ghi nhận kết quả 目利き | `/lots/[id]/mekiki` | Đánh giá tại chỗ, trên tablet (`NFR-COMP-01`) |
| SC-11 | Tạo giao dịch 相対取引 | `/transactions/new` | Chốt giá tại sàn |
| SC-13 | Nhập kết quả せり | `/seri/new` | Nhập ngay sau phiên đấu giá |
| SC-16 | Chi tiết giao hàng và các lần giao | `/deliveries/[id]` | Ghi nhận từng lần giao ngoài hiện trường |
| SC-17 | Ghi nhận ngoại lệ giao hàng | — (chưa dựng) | Cùng bối cảnh SC-16 |

- Đăng nhập: **bắt buộc** — thành phần nằm trong `(app)` layout, sau `requireUser()`.
- Vai trò được vào: **không lọc theo vai trò**. Mất kết nối là sự kiện của thiết bị, không của quyền.
- Mã lỗi khi thiếu quyền: **không áp dụng** — thành phần không phải tài nguyên có route, nên không
  có 404 riêng. Màn chứa nó vẫn giữ nguyên cơ chế 404 của mình.
- Tiền đề dữ liệu: hàng đợi cục bộ trên thiết bị (xem mục 9).

## 3. Bảng field

Không có field nhập. Toàn bộ là dẫn xuất, đọc từ hàng đợi cục bộ và trạng thái mạng của trình duyệt.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `connectionState` | Trạng thái kết nối | chưa có key JA | badge | — | dẫn xuất — `navigator.onLine` + một lần ping thật tới server | chưa có — đề xuất: **không tin `navigator.onLine` một mình** (có mạng LAN vẫn báo online khi server không tới được) | không áp dụng | — |
| 2 | `pendingCount` | Số thao tác chờ đồng bộ | chưa có key JA | number | — | dẫn xuất — đếm bản ghi trong hàng đợi cục bộ | chưa có — đề xuất: hiển thị 0 thì ẩn chỉ báo | không áp dụng | — |
| 3 | `oldestPendingAt` | Thao tác chờ lâu nhất | chưa có key JA | datetime | — | dẫn xuất — hàng đợi cục bộ | chưa có — đề xuất: cảnh báo mạnh hơn khi vượt ngưỡng (giả định #2) | không áp dụng | — |
| 4 | `syncState` | Trạng thái đồng bộ | chưa có key JA | badge | — | dẫn xuất — tiến trình replay hàng đợi | chưa có — đề xuất | không áp dụng | — |
| 5 | `conflictCount` | Thao tác đồng bộ thất bại | chưa có key JA | number | — | dẫn xuất — bản ghi bị server từ chối khi replay | chưa có — đề xuất: **không tự xoá**, phải người dùng xử lý | chưa có — đề xuất: server trả mã lỗi đủ rõ để phân loại (409 / 423 / 422) | — |
| 6 | `conflictDetail` | Lý do thất bại | chưa có key JA | text | — | dẫn xuất — mã lỗi + thông điệp server của lần replay | — | chưa có — đề xuất: giữ nguyên mã lỗi gốc, không quy về "lỗi không xác định" | — |
| 7 | `businessDateAtCapture` | Ngày nghiệp vụ lúc nhập | chưa có key JA | date | — | dẫn xuất — ngày nghiệp vụ JST tại thời điểm xếp vào hàng đợi | — | chưa có — đề xuất: server so lại với ngày nghiệp vụ hiện tại và trạng thái lock | — |

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng (mặc định) | Online, hàng đợi rỗng | Ẩn hoàn toàn, hoặc một dấu hiệu tối giản | — |
| đang tải | Đang đọc hàng đợi cục bộ khi khởi động | Chỉ báo trung tính, **không** báo online sớm | — |
| lỗi tải | Không đọc được hàng đợi cục bộ (storage bị chặn hoặc đầy) | Cảnh báo: chế độ suy giảm **không khả dụng** | Chặn ghi khi offline |
| không có quyền | không áp dụng — thành phần không có route riêng | — | — |
| mất kết nối | Ping server thất bại | Badge "Mất kết nối" + banner trên màn có ghi dữ liệu | Tuỳ phương án ở mục 9 |
| đang gửi | Đang replay hàng đợi | Badge "Đang đồng bộ" + tiến độ | — |
| gửi lỗi | Replay bị server từ chối | Badge đỏ + danh sách thao tác thất bại | Xem lý do, nhập lại tay, bỏ thao tác |
| **~~read-only vì ngày đã lock~~ — KHAI SAI, đã đính chính** | Replay chạm `transaction` / `seri_result` / `mekiki_record` / `delivery_shipment` của một ngày đã lock | **Bản trước của dòng này khai rằng thao tác "không vào được" và trả mã 423. SAI — và sai theo hướng nguy hiểm: nó khai một lớp bảo vệ KHÔNG tồn tại.** Trigger `trg_block_after_lock` là `before update **or delete**` (`20260904090500_business_day_lock.sql:61-75`) — **không phủ INSERT** — và policy `insert` của cả bốn bảng không kiểm khoá ngày (`20260904091000_rls_ops.sql:7-8,15-16,36-38`). Replay một thao tác nhập offline **là một INSERT**, nên nó **ghi vào thành công, im lặng**: không 423, không xung đột, không dấu hiệu nào | Không có hành động nào được kích hoạt, vì không có lỗi nào phát sinh. **Cổng chặn phải được dựng mới** — đừng dựa vào DB |

> **Ca xấu nhất của màn này, ghép từ hai sự thật trên:** một thao tác nhập lúc 09:55 hôm trước,
> đồng bộ lại hôm sau, sẽ ghi thành công vào **ngày hôm sau** — vì `business_date` được đóng dấu
> bằng `todayJst()` **lúc ghi**, và hợp đồng route hiện **cấm client truyền ngày**
> (`src/app/api/transactions/route.ts:63-65`). Kết quả: bảng đối chiếu của **cả hai ngày** đều
> sai, mà mỗi ngày đọc lên đều tự nhất quán nên không ai phát hiện.
> Nên field "ngày nghiệp vụ lúc nhập" của SC-32 **không phải thêm một tham số** — nó là **đổi hợp
> đồng** của cả ba đường ghi ở màn gốc. Xem `../92-cau-hoi-cho-chu-dau-tu.md` § B1.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| Cả 7 vai trò | Có (chỉ báo toàn cục) | 1–4 | Xem, kích hoạt đồng bộ lại | — |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-TRADE, ROLE-DELIVERY | Có (thêm banner trong màn) | 1–7 | Thêm: xử lý thao tác thất bại của chính mình | 423 khi replay vào ngày đã lock |
| ROLE-SETTLEMENT, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | Có (chỉ báo toàn cục) | 1–4 | Xem | — |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (`FR-601`, có chủ đích —
`supabase/migrations/20260904090900_rls_core.sql:28-32`). Không liên quan trực tiếp ở đây: hàng đợi
nằm **trên thiết bị**, không phải trong Postgres. Nhưng đó chính là một rủi ro riêng — dữ liệu
nghiệp vụ chưa gửi nằm ngoài mọi lớp RLS và audit của hệ, trên một tablet dùng chung ở hiện trường.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Phát hiện mất kết nối | đề xuất `GET /api/health` (ping nhẹ) | — | — | — |
| Xếp thao tác vào hàng đợi | không có API — ghi vào storage cục bộ | — (chưa tới server) | **không ghi được `audit_log`** — xem mục 7 | — |
| Replay một thao tác | chính API nghiệp vụ của màn gốc, không API riêng | Bảng của màn gốc | Audit của màn gốc, `created_at` là **lúc replay**, không phải lúc nhập | 409 CAS thất bại · 423 ngày đã lock · 422 dữ liệu mất hiệu lực |
| Bỏ một thao tác thất bại | đề xuất `POST /api/offline/discard` (chỉ để ghi vết) | đề xuất bảng log thử đồng bộ (mục 9) | đề xuất `offline_operation_discarded`, kèm `reason` | 403 |

## 7. Edge case

- **Replay không thể vô điều kiện — đây là ràng buộc nặng nhất.** Bốn bảng bị trigger khóa ngày
  (`transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`) sẽ từ chối một thao tác nhập
  lúc 09:50 mà chỉ đồng bộ được sau khi ngày đã lock. Đường duy nhất còn lại là yêu cầu điều chỉnh
  (SC-20) — tức người dùng phải nhập lại tay, không có đường tự động.
- **CAS chặn oversell.** Một giao dịch nhập offline có thể hợp lệ lúc nhập và vô hiệu lúc replay
  (lô hàng đã bán hết cho người khác) → 409, và không có cách nào "đúng" để tự giải quyết. Hệ này
  **không có transaction database xuyên bảng** (`../../pham-vi-va-phan-mock.md:152-159`) nên replay
  cũng không được bọc trong một đơn vị nguyên tử.
- **Thao tác nằm trong hàng đợi không có vết audit.** `audit_log` chỉ ghi khi request tới được
  server. Một thao tác nhập offline rồi bị bỏ đi **không để lại dấu gì** trong hệ — trái tinh thần
  `FR-AUDIT-01`. Cần bảng log thử đồng bộ ở phía server (mục 9).
- **Thiết bị dùng chung ở hiện trường.** Hàng đợi của người A còn trên tablet khi người B đăng nhập
  → phải khoá hàng đợi theo người dùng, và không cho replay dưới danh nghĩa người khác.
- **Ngày nghiệp vụ trôi qua trong lúc offline.** Khung giờ dịch vụ là 02:00–10:00 JST
  (`NFR-AVL-01`); một thao tác nhập lúc 09:55 và đồng bộ lúc 10:30 thuộc ngày nghiệp vụ nào là câu
  hỏi nghiệp vụ, không phải câu hỏi kỹ thuật. Field #7 giữ ngày lúc nhập chính là để trả lời được.
- **`navigator.onLine` không đáng tin.** Tablet nối wifi của chợ nhưng đường ra internet chết vẫn
  báo online. Phải ping thật.
- **Storage cục bộ đầy hoặc bị chặn** → chế độ suy giảm im lặng không hoạt động. Phải báo, và khi
  đó tốt nhất là **chặn ghi** thay vì để người dùng nhập vào chỗ không lưu được.
- **Quyền bị thu hồi giữa phiên** (SC-04 vô hiệu tài khoản) trong lúc hàng đợi còn thao tác → replay
  bị `requireUser()` đẩy về `/login`; hàng đợi phải giữ nguyên, không mất.

## 8. Dẫn chứng

- RFP `NFR-AVL-02` (§09-01) — nguyên văn yêu cầu: "cơ chế cho phép **tối thiểu tiếp tục thực hiện
  tác vụ** khi kết nối tại hiện trường bị ngắt trong thời gian ngắn, và cách đồng bộ lại khi dịch vụ
  trở lại"; nghiệm thu bằng kịch bản diễn tập business continuity cho từng tác vụ quan trọng.
- RFP `NFR-AVL-01` / FIG-020 (§09-01) — khung giờ dịch vụ 02:00–10:00 JST, khả dụng 99,5%/tháng.
- RFP `NFR-COMP-01` (§09-01) — phải hỗ trợ thao tác trên tablet tại hiện trường.
- `../00-roster-va-gap.md:47` — Screen List LAB-1 khai `Loại = Component`, không route.
- `../../pham-vi-va-phan-mock.md:84` — lý do ngoài phạm vi.
- `../../pham-vi-va-phan-mock.md:152-159` — không có transaction xuyên bảng; CAS + ghi bù.
- `../../pham-vi-va-phan-mock.md:148-151` — không có hạ tầng queue trong stack Vercel + Supabase.
- `../../pham-vi-va-phan-mock.md:172-180` — `NFR-AVL-01/02/03` không test, không ngưỡng cấu hình,
  không log giám sát nào trong prototype.
- `src/components/layout/top-header.tsx:11-23,71` — tiền lệ đúng khuôn: `BusinessDayIndicator` là
  một chỉ báo cắt ngang đặt ở top header **vì** gần như mọi màn ghi đều từ chối input khi ngày đã
  lock; chỗ đặt và lý do đặt của SC-32 giống hệt.
- `src/app/(app)/layout.tsx:8-19` — `(app)` layout là điểm treo duy nhất cho một thành phần toàn cục.
- `package.json:14-21` — 6 dependency; **không** có service worker, không PWA, không thư viện đồng
  bộ offline. `public/` chỉ có 5 file svg, không manifest.
- `src/lib/i18n/dictionaries/ja/` — không có namespace cho trạng thái kết nối → nhãn JA chưa có.

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Hạ tầng | **Offline queue trên client** — service worker + IndexedDB, hoặc một thư viện đồng bộ. Repo hiện **không có gì** trong hướng này (`package.json:14-21`, `public/` không có manifest) | Đây là hạng mục lớn nhất của SC-32, không phải một component UI |
| Hạ tầng | **Cache đọc** cho dữ liệu tham chiếu (danh sách lô hàng, người tham gia) — nhập offline mà không có dữ liệu tham chiếu thì không nhập được gì | Kéo theo câu hỏi dữ liệu tham chiếu cũ bao lâu thì không dùng nữa |
| Hạ tầng | Endpoint `GET /api/health` nhẹ để ping thật, thay cho `navigator.onLine` | Chưa có |
| Bảng/cột | **Bảng log thử đồng bộ — chưa có.** Đề xuất `offline_sync_attempt`: `id` uuid pk · `actor_id` uuid → `app_user(id)` · `operation_type` text · `target_entity` text · `target_id` text · `captured_at` timestamptz not null · `business_date_at_capture` date not null · `replayed_at` timestamptz · `result` text CHECK (`thành công`, `xung đột`, `đã lock`, `bị bỏ`) · `error_code` text · `reason` text | Append-only, không policy update/delete — cùng khuôn `audit_log` (`20260904090000_core_identity.sql:38-40`). Cần vì thao tác trong hàng đợi hiện không có vết audit nào |
| Màn/API phụ thuộc | Mọi màn ở bảng mục 2 phải chịu được chế độ suy giảm; SC-20 là đường thoát khi replay gặp ngày đã lock; SC-28 nếu muốn thông báo cho quản trị khi có thao tác treo | |
| Nghiệm thu | `NFR-AVL-02` nghiệm thu bằng **kịch bản diễn tập business continuity cho từng tác vụ quan trọng** — cần chốt danh sách tác vụ quan trọng trước khi ước lượng | Xem giả định #1 |

### Hai phương án — cần ADR, spec này không tự quyết

| | (a) Suy giảm chỉ-đọc | (b) Hàng đợi ghi + replay |
|---|---|---|
| Cách làm | Cache dữ liệu đọc, **chặn mọi ghi** khi offline, hiện rõ "không ghi được lúc này" | Ghi vào hàng đợi cục bộ, replay khi có kết nối |
| Thoả `NFR-AVL-02` | **Một phần** — người dùng vẫn tra cứu được nhưng **không "tiếp tục thực hiện tác vụ"** như RFP đòi | Đúng chữ của yêu cầu |
| Xung đột với lock ngày và CAS | Không có — không có gì để replay | Có, và không giải được tự động: xem mục 7 |
| Vết audit | Nguyên vẹn — mọi ghi đều qua server | Hở: cần bảng log thử đồng bộ, và thao tác bị bỏ vẫn khó truy |
| Chi phí | Thấp | Cao — phần lớn ngân sách của SC-32 nằm ở đây |
| Rủi ro | Khách coi là chưa thoả `NFR-AVL-02` | Người dùng tin đã lưu, rồi mất khi replay thất bại — tệ hơn cả không có gì |

**Quyết định này thuộc ADR.** Nó đổi bản chất câu trả lời cho `NFR-AVL-02` và kéo theo cả kiến trúc
client (có service worker hay không).

### Giả định cần chốt

| # | Giả định | Ảnh hưởng nếu sai | Nơi phải sửa |
|---|---|---|---|
| 1 | Tác vụ "quan trọng" cần chạy được khi offline = 5 màn ghi ở bảng mục 2. `NFR-AVL-02` nghiệm thu "cho từng tác vụ quan trọng" nhưng **không liệt tác vụ nào** | Thiếu tác vụ thì diễn tập business continuity không đạt; thừa thì chi phí client phình ra vô ích | Bảng mục 2, phạm vi phương án ở mục 9 |
| 2 | "Ngắt trong thời gian ngắn" là bao lâu, và hàng đợi giữ tối đa bao nhiêu thao tác / bao lâu — **RFP không định lượng**. `NFR-AVL-03` chỉ cho RPO ≤ 15 phút, là chỉ tiêu của DR phía server, không phải của hàng đợi client | Giữ quá lâu thì gần chắc chắn đụng lock ngày lúc replay; quá ngắn thì mất dữ liệu người dùng đã nhập | Field #3, cấu hình hàng đợi |
| 3 | Thao tác nhập offline thuộc **ngày nghiệp vụ lúc nhập** (field #7), không phải lúc replay | Nếu khách coi là ngày lúc replay thì mọi thao tác vắt qua 10:00 JST rơi sang ngày sau và bảng đối chiếu ngày sai | Field #7, mục 6, quy tắc nghiệp vụ |
| 4 | Thao tác replay thất bại **không bị tự xoá** — người dùng phải xử lý tay | Tự xoá thì mất dữ liệu im lặng; không tự xoá thì hàng đợi có thể ứ lại và cần người dọn | Field #5, mục 6 |
| 5 | Hàng đợi khoá theo người dùng trên thiết bị dùng chung | Nếu không thì thao tác của người A đồng bộ dưới danh nghĩa người B — sai `actor_id` trong `audit_log` | Mục 7, thiết kế hàng đợi |
