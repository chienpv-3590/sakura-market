# SC-19 — Quản lý tranh chấp

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/disputes` cho danh sách, `/disputes/[id]` cho chi tiết) |
| Loại | List/Detail |
| Actor chính | Bộ phận đối chiếu |
| FE- / FR- | FE-027 · `FR-SETTLE-03` · `RPT-09` · `CAP-HUMAN-01` · RFP §07-03, §06-03 |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Cho bộ phận đối chiếu mở, theo dõi và đóng tranh chấp phát sinh khi rà số cuối ngày — nhánh riêng
của F007, tách khỏi đường điều chỉnh hậu-lock F008. `FR-SETTLE-03` (RFP dòng 661) đòi bốn thứ:
**trạng thái**, **nguyên nhân**, **người phụ trách xử lý**, **kết quả cuối cùng**; và nghiệm thu đòi
thêm **ngày dự kiến xử lý** cùng **lịch sử cập nhật**.

**Khoảng trống rộng nhất trong sáu màn của bộ này:** không bảng tranh chấp, không trạng thái tranh
chấp, không mốc SLA nào tồn tại trong `supabase/migrations/` — không có gì để đếm, nên `RPT-09`
("Tổng hợp tranh chấp và SLA xử lý", RFP dòng 752) phải để `isMock: true`, `filterFields`/`columns`
rỗng (`registry.ts:133-141`). Màn này là điều kiện để RPT-09 chạy thật.

**Người phải ở trong vòng lặp:** `CAP-HUMAN-01` (§06-03, RFP dòng 557) liệt "xác nhận hoàn tất giao
nhận hàng khi có tranh chấp" là điểm bắt buộc giữ con người — không tự động đóng tranh chấp theo bất
kỳ điều kiện dữ liệu nào.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc
- Vai trò được vào: đề xuất **ROLE-SETTLEMENT** — actor `FE-027`, và là vai trò đang sở hữu F007
  (lock ngày) cùng F008 (phê duyệt điều chỉnh); `/corrections` và `/incentive` đã gác đúng vai trò
  này (`src/lib/nav-items.ts:49-53`)
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: không cần — màn mở được khi chưa có tranh chấp nào

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Trạng thái | Trạng thái | 状態 (`reports.column.status`) | select | Không (lọc) / Có (tạo) | **cột chưa có — đề xuất** `dispute.status` | chưa có — đề xuất: chỉ giá trị trong tập chốt ở mục 9 | chưa có — đề xuất: CHECK, ngoài tập → 422 | chưa có — đề xuất |
| 2 | Ngày nghiệp vụ | Ngày nghiệp vụ | 営業日 (`reports.filter.businessDate`) | date | Có | **cột chưa có — đề xuất** `.business_date` | chưa có — đề xuất: `YYYY-MM-DD` | chưa có — đề xuất: dùng lại `isValidReportDate` | `reports.rpt06.createBatchError.invalidDate` là key cùng nghĩa đã có |
| 3 | Đối tượng tranh chấp | Nguồn | chưa có key JA | select | Có | **cột chưa có — đề xuất** `.source_type` + `.source_id`, khớp `reconciliation_line` (`aitai` / `seri` / `delivery`) | chưa có — đề xuất: 3 giá trị của view | chưa có — đề xuất: cặp (`source_type`, `source_id`) phải tồn tại trong view → 422 | chưa có — đề xuất |
| 4 | Người tham gia | Người tham gia | 参加者 (`nav.participants`) | select | Không | **cột chưa có — đề xuất** `.participant_id` → `participant` | chưa có — đề xuất | chưa có — đề xuất: id không tồn tại → 422 | chưa có — đề xuất |
| 5 | Nguyên nhân | Nguyên nhân | 理由 (`participants.detail.historyHeaderReason`) | textarea | Có | **cột chưa có — đề xuất** `.cause` | chưa có — đề xuất: trim, không rỗng | chưa có — đề xuất: rỗng sau trim → 422 | `participants.detail.transitionReasonRequired` là key cùng nghĩa đã có |
| 6 | Người phụ trách xử lý | Người phụ trách | 実施者 (`participants.detail.historyHeaderChangedBy`) | select | Có | **cột chưa có — đề xuất** `.assignee_id` → `app_user` | chưa có — đề xuất: chỉ tài khoản đang hoạt động | chưa có — đề xuất: `is_active = false` → 422 | chưa có — đề xuất |
| 7 | Ngày dự kiến xử lý | Ngày dự kiến xử lý | chưa có key JA | date | Có | **cột chưa có — đề xuất** `.due_date` | chưa có — đề xuất: `>=` ngày nghiệp vụ | chưa có — đề xuất: trước ngày nghiệp vụ → 422 | chưa có — đề xuất |
| 8 | Kết quả cuối cùng | Kết quả | chưa có key JA | textarea | Chỉ khi đóng | **cột chưa có — đề xuất** `.resolution` | chưa có — đề xuất: bắt buộc khi chuyển sang trạng thái đóng | chưa có — đề xuất: đóng mà rỗng → 422 | chưa có — đề xuất |
| 9 | Chứng từ đính kèm | Ảnh/chứng từ | chưa có key JA | file | Không | Bucket đính kèm (xem SC-31); `DR-IMAGE-01` | chưa có — đề xuất: 5MB, 4 loại MIME như `intake-doc-upload.ts:4-10` | chưa có — đề xuất: kiểm ở **server**, `accept` của client chỉ là gợi ý | `INVALID_TYPE` / `TOO_LARGE` (`intake-doc-upload.ts:12`) |
| 10 | Số ngày tồn đọng | Tồn đọng (ngày) | chưa có key JA | dẫn xuất | — | `hôm nay (JST) − .created_at`, cùng phép tính `daysBetween` của RPT-03 | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 11 | Quá hạn dự kiến | Quá hạn | chưa có key JA | dẫn xuất | — | `.due_date < hôm nay (JST)` và chưa đóng | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 12 | Lịch sử cập nhật | Lịch sử cập nhật | 状態変更履歴 (`participants.detail.historySection`) | bảng con | — | **bảng chưa có — đề xuất** `dispute_update` (từ → đến, ghi chú, người ghi, thời điểm) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |

- Mục 12 là bảng con riêng theo đúng khuôn `participant_status_history`
  (`20260904090100_participant.sql:18-32`) — nghiệm thu `FR-SETTLE-03` đòi "lịch sử cập nhật", nên nó
  là bảng, không phải một cột jsonb.
- **Không** hiện email của người phụ trách hay người ghi; chỉ `display_name`
  (`registry-columns.ts:103-105`). Đường dẫn file đính kèm **không bao giờ** ra CSV, và mọi link xem
  đi qua signed URL ngắn hạn do server sinh — quy tắc của SC-31, giữ y nguyên.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Không có tranh chấp khớp filter | "Không có tranh chấp nào khớp điều kiện" | Đổi filter, mở tranh chấp mới |
| đang tải | Query đang chạy | Skeleton bảng | Không |
| lỗi tải | Query lỗi | Khối lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò khác ROLE-SETTLEMENT | Trang **404** | Không |
| đang gửi | Đã bấm lưu, chưa có response | Nút bị vô hiệu (`participants.form.submitting`) | Không |
| gửi lỗi | Response lỗi | Thông báo lỗi trên form, giữ dữ liệu đã nhập | Sửa và gửi lại |
| đã đóng | `status` ở giá trị đóng | Chi tiết ở chế độ đọc, hiện `resolution` và toàn bộ lịch sử | Mở lại (nếu chốt là cho phép) |
| quá hạn dự kiến | `due_date` đã qua, chưa đóng | Nhãn cảnh báo trên dòng | Cập nhật tiến độ |

Không có dòng `read-only vì ngày đã lock`: bảng đề xuất là bản ghi **về** một ngày nghiệp vụ (đúng
lối `correction_request`, `20260904090600_correction.sql:2-3`), nên **không** mang
`trg_block_after_lock`. Tranh chấp gần như luôn nổi lên **sau** khi đối chiếu và lock, nên khoá nó
theo ngày nghiệp vụ sẽ làm nó không ghi được đúng lúc cần nhất. Màn này không trả **423**.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | Có (đề xuất) | Toàn bộ | Mở, cập nhật, đóng tranh chấp | — |
| ROLE-DELIVERY, ROLE-TRADE | Cần quyết định — là vai trò bị chỉ định làm người phụ trách xử lý (field #6) | Chỉ đọc và cập nhật tiến độ tranh chấp được gán, nếu được cấp | Không đóng | **404** nếu không được cấp |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | Không (đề xuất) | — | — | **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) và
bảng mới nên giữ nguyên khuôn `read_all_active_users`. Chặn ở đây là chặn **vào trang** và chặn
**ghi**.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Xem danh sách | `GET /api/disputes` — **chưa có, đề xuất** | Không | Không | 404, 422, 500 |
| Mở tranh chấp mới | `POST /api/disputes` — **chưa có, đề xuất** | `dispute` + `dispute_update` (bảng chưa có) | Đề xuất `action: "dispute_open"`, `entity: "dispute"` | 404, 422, 409 (đã có tranh chấp mở cho cùng nguồn — nếu chốt là chặn), 500 |
| Cập nhật tiến độ / đổi người phụ trách / đổi ngày dự kiến | `PATCH /api/disputes/{id}` — **chưa có, đề xuất** | `dispute` + một dòng `dispute_update` | Đề xuất `action: "dispute_update"` | 404, 409 (đã đóng), 422 (thiếu ghi chú), 500 |
| Đóng tranh chấp | `POST /api/disputes/{id}/close` — **chưa có, đề xuất** | như trên | Đề xuất `action: "dispute_close"` | 404, 409 (đã đóng), 422 (`resolution` rỗng), 500 |
| Mở lại tranh chấp đã đóng | **chưa có, đề xuất** — phụ thuộc giả định #2 | như trên | Đề xuất `action: "dispute_reopen"` | 404, 409, 422 |
| Đính kèm chứng từ | Cùng endpoint, multipart | Bucket đính kèm | Đề xuất `attach_document` như `attach-intake-doc.ts:67` | 422 `INVALID_TYPE` / `TOO_LARGE` |
| Tạo yêu cầu điều chỉnh từ tranh chấp | Điều hướng SC-20 — **đã có** | `correction_request` | `correction_request_create` (`create-correction.ts:61`) | — |
| Xoá tranh chấp | **Không đề xuất** | — | — | — |

Không đề xuất xoá, và mọi lần đổi trạng thái đều sinh một dòng `dispute_update`: nghiệm thu
`FR-SETTLE-03` đòi "lịch sử cập nhật", và §02-08 (RFP dòng 310) liệt các thao tác nhạy cảm phải có
dấu vết kiểm toán.

## 7. Edge case

- **Không có transaction xuyên bảng (PostgREST)** — mở/đổi trạng thái là hai lần ghi (`dispute` +
  `dispute_update`). Thứ tự đề xuất: CAS trên `dispute.status` trước, rồi ghi dòng lịch sử; CAS thất
  bại thì không có dòng lịch sử mồ côi. Đúng khuôn `participant`/`participant_status_history` đang
  chạy (`api/participants/[id]/transition/route.ts`). Hai người đóng cùng một tranh chấp: CAS cho
  người thua **409**, không ghi đè `resolution` của người thắng.
- **Nguồn tranh chấp là một dòng của view, không phải bảng** — `reconciliation_line` là view
  (`20260904090800_reconciliation_view.sql:6-7`), nên **không đặt được FK** vào nó. Cặp
  (`source_type`, `source_id`) phải kiểm ở tầng ứng dụng; `source_id` trỏ tới `transaction.id` /
  `seri_result.id` / `delivery_shipment.id` tuỳ `source_type`.
- **`variance` chỉ có nghĩa với `source_type='aitai'`** — comment của view nói rõ (`:48-50`;
  `variance` là `null` cho `seri` và `delivery`, `:33, :45`). Màn không được hiện "chênh lệch = 0"
  cho hai loại kia; phải hiện "không áp dụng".
- **Tranh chấp và điều chỉnh hậu-lock là hai việc khác nhau** — `correction_request` chỉ gắn vào
  `transaction` (`20260904090600_correction.sql:6`), còn tranh chấp có thể về một lần giao hoặc một
  bản ghi せり. Không gộp hai luồng; tranh chấp có thể **dẫn tới** một `correction_request` nhưng
  không thay thế nó.
- **Người phụ trách bị vô hiệu hoá giữa lúc tranh chấp đang mở** — dòng vẫn hiện và phải gán lại
  được người khác; không ẩn tranh chấp vì người phụ trách đã rời.
- **Quyền bị thu hồi giữa phiên** — `getCurrentUser` trả `null` khi `is_active = false`
  (`require-role.ts:47`) → **404** ở lần điều hướng sau.

## 8. Dẫn chứng

- `src/lib/reports/registry.ts:133-141` — `RPT-09` `isMock: true`, `filterFields`/`columns` rỗng
- `supabase/migrations/20260904090800_reconciliation_view.sql:6-7` (view, `security_invoker`),
  `:15-20` (`variance` cho `aitai`), `:33, :45` (`variance` null cho `seri`/`delivery`), `:48-50`
  (comment: `variance` chỉ có nghĩa với `aitai`) — nguồn duy nhất hiện có để phát hiện chênh lệch
- `supabase/migrations/20260904090600_correction.sql:2-3` — `correction_request`/
  `transaction_adjustment` **không** bị `trg_block_after_lock`: tiền lệ cho quyết định lock ở mục 4;
  `:4-13` — `correction_request` chỉ gắn vào `transaction`
- `supabase/migrations/20260904090100_participant.sql:18-32` — khuôn bảng lịch sử cho `dispute_update`
- `src/lib/corrections/create-correction.ts:61-62` — audit `correction_request_create`, khuôn dùng lại
- `src/lib/nav-items.ts:49-53` — `/corrections` và `/incentive` gác `ROLE-SETTLEMENT`;
  `src/lib/reports/registry-columns.ts:103-105` — không đưa email actor ra output
- `src/lib/lots/intake-doc-upload.ts:4-12` — giới hạn upload dùng lại được cho field #9
- `../../pham-vi-va-phan-mock.md` § 2b (`RPT-09`/`FR-SETTLE-03` = **KHÔNG DỰNG ĐƯỢC**) và § 3 (không
  bảng tranh chấp, không SLA, không gì để đếm)
- RFP `../../../../RFP_He-thong-ho-tro-nghiep-vu-cho-ban-buon-thuy-san_VI_v1.0.md`: dòng 661
  (`FR-SETTLE-03` + nghiệm thu), 752 (`RPT-09`, filter "Trạng thái tranh chấp"), 557 (`CAP-HUMAN-01`
  giữ con người trong vòng lặp), 659 (`FR-SETTLE-01` bảng đối chiếu tổng hợp cả ngoại lệ), 310
  (§02-08 thao tác nhạy cảm cần dấu vết), 686 (`FR-NOTIFY-01` liệt event "tranh chấp đang mở"), 774
  (§08-04 chứng từ tranh chấp lưu 3 năm), 794 (§08-07 `DR-IMAGE-01`)

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | Bảng mới `dispute`: `id`, `business_date`, `source_type` (CHECK 3 giá trị của view), `source_id`, `participant_id` (nullable FK), `cause` (NOT NULL), `status` (CHECK, tập ở giả định #1), `assignee_id` (FK `app_user`), `due_date`, `resolution` (nullable), `opened_by`, `created_at`, `closed_at` (nullable) | Không có bảng nào lưu được tranh chấp. Ghi vào `../10-database-diagram.md` § bảng cần thêm |
| Bảng/cột | Bảng mới `dispute_update`: `id`, `dispute_id` (FK), `from_status`, `to_status`, `note` (NOT NULL), `changed_by`, `changed_at` — append-only | Nghiệm thu `FR-SETTLE-03` đòi "lịch sử cập nhật". Khuôn theo `participant_status_history` |
| Bảng/cột | **Không** mang `trg_block_after_lock` cho cả hai bảng; policy RLS read mở như các bảng còn lại, insert/update theo vai trò chốt ở giả định #4 | Bản ghi **về** một ngày nghiệp vụ, đúng lối `correction_request` (xem mục 4). `dispute` cần update (đổi trạng thái) nên khác `correction_request` ở chỗ có policy update — phải hẹp theo vai trò |
| Hạ tầng | Bucket đính kèm chứng từ tranh chấp; email/queue **chỉ** nếu muốn cảnh báo "tranh chấp đang mở" ngoài màn | Dùng lại khuôn bucket private + signed URL của SC-31; `DR-RET-01` xếp nhóm này vào diện **3 năm** rồi cold (RFP dòng 774). `FR-NOTIFY-01` liệt event này, hạ tầng thuộc SC-28/SC-29 đang ngoài phạm vi |
| Màn/API phụ thuộc | `GET/POST /api/disputes`, `PATCH /api/disputes/{id}`, `POST .../close` (chưa có) | Không endpoint nào hiện tồn tại |
| Màn/API phụ thuộc | SC-18 (đối chiếu — nơi phát hiện chênh lệch và mở tranh chấp), SC-20 (điều chỉnh — hệ quả có thể có), `RPT-09` (nơi tiêu thụ) | `RPT-09` chỉ bỏ được `isMock` sau khi hai bảng này có dữ liệu thật |

### Giả định cần chốt

1. **Tập giá trị `status` của tranh chấp.** `FR-SETTLE-03` đòi có "trạng thái" và nghiệm thu đòi
   "danh sách tranh chấp **đang mở**", nhưng RFP **không liệt tập giá trị** ở đâu. `RPT-09` cũng chỉ
   ghi filter là "Trạng thái tranh chấp".
   *Ảnh hưởng nếu sai:* CHECK constraint, filter của màn và cột của `RPT-09` đều phải đổi; dữ liệu đã
   ghi cần backfill.
   *Nơi sửa:* CHECK của bảng mới, field #1 mục 3, `../10-database-diagram.md`.
2. **Tranh chấp đã đóng có mở lại được không.** RFP nói "kết quả cuối cùng" nhưng không nói việc mở
   lại. `FR-CORR-02` (dòng 657) chọn nguyên tắc không ghi đè lịch sử cho điều chỉnh — áp cùng
   nguyên tắc thì mở lại là **một dòng `dispute_update` mới**, không phải xoá `resolution` cũ.
   *Ảnh hưởng nếu sai:* cho phép mở lại mà ghi đè `resolution` là mất kết quả đã chốt; cấm hoàn toàn
   thì một tranh chấp đóng sai buộc phải mở một tranh chấp thứ hai và số liệu `RPT-09` bị đếm đôi.
   *Nơi sửa:* route `close`/`reopen`, mục 4 (trạng thái "đã đóng") và mục 6 của file này.
3. **SLA xử lý là bao nhiêu.** `RPT-09` mang đúng chữ "SLA xử lý" trong tiêu đề (dòng 752) nhưng RFP
   **không cho một con số nào** — không mốc theo giờ, không mốc theo ngày, không phân cấp theo mức
   độ. Spec này vì thế **không** đặt con số nào; field #7 lấy `due_date` do người mở nhập tay, và
   field #11 chỉ so `due_date` với hôm nay.
   *Ảnh hưởng nếu sai:* mọi cột "trong hạn / quá hạn" của `RPT-09` thành số của một ngưỡng bịa; và
   nếu khách có SLA phân cấp theo mức độ thì `due_date` nhập tay không đủ, cần thêm cột mức độ và
   bảng tra ngưỡng. *Nơi sửa:* cột mức độ (nếu có) trên bảng mới, field #7/#11 mục 3, cột `RPT-09`.
4. **Ai mở, ai xử lý, ai đóng.** `FE-027` nêu bộ phận đối chiếu, nhưng người **phụ trách xử lý**
   (field #6, `FR-SETTLE-03` gọi tên) thường thuộc bộ phận khác — vận chuyển hoặc giao dịch — nên họ
   cần cập nhật được tiến độ. `CAP-HUMAN-01` (dòng 557) đòi con người xác nhận, không nói vai trò nào.
   *Ảnh hưởng nếu sai:* chỉ ROLE-SETTLEMENT ghi được thì người phụ trách thật phải báo qua điện thoại
   — đúng vấn đề TBL-CHANNEL-01 (dòng 282) mô tả; mở cho nhiều vai trò cả quyền **đóng** thì mất tách
   trách nhiệm §02-08 (dòng 311). *Đề xuất của spec này:* mở và đóng thuộc ROLE-SETTLEMENT, cập nhật
   tiến độ mở cho vai trò được gán — vẫn là đề xuất, chưa phải quyết định. *Nơi sửa:* `requireRole`
   của các route mới, policy insert/update của bảng mới, mục 5.
5. **Một nguồn có được mở nhiều tranh chấp cùng lúc không.** RFP không nói.
   *Ảnh hưởng nếu sai:* cho phép trùng thì `RPT-09` đếm đôi cùng một vụ; chặn cứng bằng unique thì
   hai vấn đề khác nhau trên cùng một giao dịch không ghi tách được. *Nơi sửa:* ràng buộc unique
   (hoặc không) trên bảng mới, và mã 409 ở mục 6.
