# SC-27 — Quản lý batch xuất dữ liệu kế toán

| | |
|---|---|
| Mã thi công | — (chưa dựng màn riêng; chức năng xuất chạy trong SCR026_ReportViewer, mã báo cáo RPT-06) |
| Route | — (đề xuất `/accounting/batches`) |
| Loại | List |
| Actor chính | Bộ phận đối chiếu |
| FE- / FR- | FE-037 · `FN-11` · `IF-ACC-01` · `FR-SETTLE-02` · RFP §08-03, §08-05 |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Cho bộ phận đối chiếu theo dõi **mọi** batch đã xuất sang hệ thống kế toán, xuyên nhiều ngày
nghiệp vụ, và biết batch nào đã thực sự tới bên nhận. Ranh giới phải đọc kỹ trước khi ước lượng
lại ở LAB-5:

| | Hiện trạng |
|---|---|
| **Đã có — đừng ước lượng lại** | Bảng `accounting_export_batch` thật; đường ghi `POST /api/accounting/export-batches`; danh sách batch **theo đúng một ngày** ngay trên màn RPT-06; xuất CSV từ snapshot `lines`; audit `create_accounting_export_batch` |
| **Còn thiếu — task riêng của LAB-5** | Danh sách batch **xuyên ngày** (lọc khoảng ngày, batch code, trạng thái); **trạng thái gửi** — `accounting_export_batch` không có cột nào cho nó, dù RFP §08-03 liệt "trạng thái" là trường tối thiểu bắt buộc |

Kiểm sống 2026-09-08: bảng tồn tại, **0 batch** — chưa ai xuất lần nào trong môi trường demo, nên
`rỗng` là trạng thái mặc định người đọc spec sẽ gặp đầu tiên.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc
- Vai trò được vào: đề xuất **ROLE-SETTLEMENT** — cùng vai trò đang sở hữu đường ghi
  (`export-batches/route.ts:35`) và cùng vai trò gác `/corrections`, `/incentive`
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: không cần — màn mở được khi chưa có batch nào

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Từ ngày | Ngày nghiệp vụ từ | 営業日 (`reports.filter.businessDate`) | date | Không | `accounting_export_batch.business_date` | chưa có — đề xuất: `YYYY-MM-DD`, `<=` đến ngày | chưa có — đề xuất: dùng lại `isValidReportDate` | `reports.rpt06.createBatchError.invalidDate` (key đã có) |
| 2 | Đến ngày | Ngày nghiệp vụ đến | 営業日 (dùng lại key trên) | date | Không | `.business_date` | chưa có — đề xuất: `>=` từ ngày | chưa có — đề xuất: cùng hàm | như trên |
| 3 | Batch code | Batch code | バッチコード (`reports.filter.batchCode`) | text | Không | `.batch_code` | chưa có — đề xuất: khớp dạng `ACC-YYYYMMDD-NN` | chưa có — đề xuất: không khớp thì trả danh sách rỗng, không 4xx | chưa có — đề xuất |
| 4 | Loại | Loại | 種別 (`reports.rpt06.batchColumn.kind`) | select | Không | `.kind` (`full` / `re-export`) | chưa có — đề xuất: chỉ 2 giá trị của CHECK | chưa có — đề xuất: ngoài CHECK → 422 | chưa có — đề xuất |
| 5 | Trạng thái gửi | Trạng thái gửi | chưa có key JA | select | Không | **cột chưa có — đề xuất** `.send_status` | chưa có — đề xuất: chỉ giá trị trong tập chốt ở mục 9 | chưa có — đề xuất: ngoài tập → 422 | chưa có — đề xuất |
| 6 | Batch code (cột) | Batch code | バッチコード (`reports.rpt06.batchColumn.code`) | text | — | `.batch_code` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 7 | Ngày nghiệp vụ | Ngày nghiệp vụ | 営業日 (`reports.column.businessDate`) | date | — | `.business_date` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 8 | Số dòng | Số dòng | 行数 (`reports.rpt06.batchColumn.rowCount`) | int | — | `.row_count` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 9 | Tổng tiền | Tổng tiền (JPY) | 合計金額(JPY) (`reports.rpt06.batchColumn.totalNet`) | bigint | — | `.total_net_amount_jpy` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 10 | Tổng thuế | Tổng thuế (JPY) | 消費税合計(JPY) (`reports.rpt06.batchColumn.totalTax`) | bigint | — | `.total_tax_jpy` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 11 | Thuế suất | Thuế suất | 税率 (`reports.rpt06.batchColumn.taxRate`) | dẫn xuất | — | `.tax_rate_bps / 100` (%) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 12 | Cơ sở thuế | Cơ sở thuế | chưa có key JA | text | — | `.tax_basis` (`exclusive` / `inclusive`) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 13 | Thời điểm tạo | Thời điểm tạo | 作成日時 (`reports.rpt06.batchColumn.exportedAt`) | timestamptz | — | `.exported_at` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 14 | Người tạo | Người tạo | 作成者 (`reports.rpt06.batchColumn.exportedBy`) | text | — | `.exported_by` → `app_user.display_name` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 15 | Trạng thái gửi (cột) | Trạng thái gửi | chưa có key JA | text | — | **cột chưa có — đề xuất** `.send_status` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 16 | Thời điểm gửi | Thời điểm gửi | chưa có key JA | timestamptz | — | **cột chưa có — đề xuất** `.sent_at` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |

- Không hiển thị `lines` (snapshot jsonb) trên danh sách — mở chi tiết batch thì đi qua RPT-06 kèm
  `batchCode`, màn đó đã render snapshot thật.
- Chỉ hiện `display_name` của người tạo, không hiện email — cùng quy tắc `RPT_08_COLUMNS` đang giữ
  (`src/lib/reports/registry-columns.ts:103-105`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Query trả 0 dòng | "Chưa có batch nào khớp điều kiện" (key gần nhất đã có: `reports.rpt06.batchListEmpty`, phạm vi theo ngày) | Đổi filter |
| đang tải | Query đang chạy | Skeleton bảng, filter bị vô hiệu | Không |
| lỗi tải | Query lỗi | Khối lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò khác ROLE-SETTLEMENT | Trang **404** | Không |
| đang gửi | Bấm "Gửi lại" và request chưa trả | Dòng đó vào trạng thái chờ, nút bị vô hiệu | Không |
| gửi lỗi | Request gửi lại trả lỗi | Thông báo lỗi trên đúng dòng, giữ nguyên `send_status` cũ | Thử lại |

**Không có dòng `read-only vì ngày đã lock`, và đó là đúng chứ không phải bỏ sót.**
`accounting_export_batch` được **miễn** trigger khoá ngày (QĐ-3 mở rộng): nó ghi *về* một ngày đã
lock, không ghi *vào* ngày đó — và lock chính là **tiền đề** để xuất
(`create-export-batch.ts:34-37` trả `DAY_NOT_LOCKED` → 409). Lý do miễn trừ nằm ngay trong DDL
(`20260908090000_accounting_export.sql:59-67`). Vì vậy màn này không bao giờ trả **423**.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | Có | Toàn bộ | Xem, lọc, gửi lại (đề xuất) | — |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-TRADE, ROLE-DELIVERY, ROLE-RULE-ADMIN, ROLE-SYS-ADMIN | Không | — | — | **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) —
policy `read_all_active_users` trên chính bảng này ở
`20260908090000_accounting_export.sql:49-50`. Chặn ở đây là chặn **vào trang**, không phải chặn đọc
bảng. Đừng viết spec như thể RLS che dữ liệu batch khỏi 6 vai trò kia.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Xem danh sách | `GET /api/accounting/export-batches` — **chưa có, đề xuất** | Không | Không | 404 (sai vai trò), 500 |
| Mở snapshot một batch | Điều hướng `/reports/RPT-06` kèm `batchCode` — đã có | Không | Không | 404 |
| Gửi lại batch tới hệ thống kế toán | `POST /api/accounting/export-batches/{id}/send` — **chưa có, đề xuất** | `.send_status` (cột chưa có) | Đề xuất `action: "send_accounting_export_batch"`, `entity: "accounting_export_batch"` | 404, 409 (đang gửi), 502 (bên nhận lỗi), 500 |
| Tạo batch mới | **Không thuộc màn này** — `POST /api/accounting/export-batches` đã có, chạy trên SC-26/RPT-06 | `accounting_export_batch` | `create_accounting_export_batch` | 409 `DAY_NOT_LOCKED`, 409 `SEQ_RACE_EXHAUSTED`, 422 |

## 7. Edge case

- **Hai người bấm gửi lại cùng một batch** — không có transaction database xuyên bảng (PostgREST),
  nên phải CAS trên `send_status`: chỉ chuyển được từ "chưa gửi"/"gửi lỗi"; người thua nhận **409**,
  không ghi đè.
- **Gửi thành công nhưng response mất** — cùng lớp lỗi `createExportBatch` đã khai và chấp nhận
  (`create-export-batch.ts:22-27`). Với gửi lại thì hậu quả nặng hơn: bên nhận có thể ghi nhận hai
  lần. Xem giả định #3.
- **Xuất lại cùng một ngày** — `seq` tăng, `kind` chuyển `full` → `re-export`
  (`create-export-batch.ts:54`). Danh sách phải hiện **cả** batch cũ, không được lọc bớt: batch cũ
  là bản đã gửi kế toán, không phải rác.
- **Đua `seq`** — 5 lần thử rồi trả `SEQ_RACE_EXHAUSTED` (`create-export-batch.ts:9, 90`). Batch do
  vòng đua sinh ra vẫn hiện trên màn này.
- **Quyền bị thu hồi giữa phiên** — `getCurrentUser` trả `null` khi `is_active = false`
  (`require-role.ts:47`) → lần điều hướng sau ra **404**, không phải 403.
- **Batch có `row_count = 0`** — CHECK cho phép `>= 0`
  (`20260908090000_accounting_export.sql:24`). Một ngày lock mà không có giao dịch nào vẫn xuất
  được; màn phải hiện batch rỗng đó thay vì ẩn đi.

## 8. Dẫn chứng

- `supabase/migrations/20260908090000_accounting_export.sql:16-31` — DDL 13 cột; **không có cột
  trạng thái gửi**
- `supabase/migrations/20260908090000_accounting_export.sql:49-57` — chỉ 2 policy: select cho mọi
  vai trò, insert cho ROLE-SETTLEMENT; **không có policy update/delete**
- `supabase/migrations/20260908090000_accounting_export.sql:59-67` — lý do miễn trigger khoá ngày
- `src/lib/accounting/export-batch-queries.ts:21-33` — `listBatchesForDate` lọc theo **đúng một**
  `business_date`; không có hàm nào liệt xuyên ngày
- `src/app/api/accounting/export-batches/route.ts:34-35` — chỉ có `POST`, gác `ROLE-SETTLEMENT`
- `src/lib/accounting/create-export-batch.ts:34-37` — lock là tiền đề của xuất
- `src/lib/i18n/dictionaries/vi/reports.json:151-161` và bản `ja/` cùng dòng — 8 key cột batch đã
  có, dùng lại được
- RFP `../../../../RFP_He-thong-ho-tro-nghiep-vu-cho-ban-buon-thuy-san_VI_v1.0.md`: dòng 765 (§08-03
  trường tối thiểu, gồm **trạng thái**), dòng 767 (phương thức kết nối chốt ở buổi làm việc về
  interface), dòng 782 (§08-05 dữ liệu xuất kèm thời điểm tạo, ngày nghiệp vụ, người khởi tạo,
  batch code)
- `../00-roster-va-gap.md` § 3.1 — cách khai SC-27 khi hai nguồn mâu thuẫn

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | `accounting_export_batch`: thêm `send_status`, `sent_at`, `send_error` | Bảng đã có nhưng thiếu đúng cột RFP §08-03 gọi tên. Ghi ngược vào `../10-database-diagram.md` § bảng cần thêm |
| Bảng/cột | **Quyết định hình dạng:** cột trên chính bảng + một policy update hẹp, **hoặc** bảng phụ `accounting_export_send_attempt` append-only | Bảng hiện append-only tuyệt đối. Thêm cột đổi được sẽ phá tính chất đó; bảng phụ giữ tính chất nhưng tốn một join. Chọn cái nào là việc của LAB-5, không quyết trong spec này |
| Hạ tầng | Kênh gửi thật tới hệ thống kế toán (`IF-ACC-01`) | RFP dòng 767: phương thức kết nối, xác thực, nghiệm thu interface **chưa chốt**. Không có kênh này thì `send_status` chỉ là ô người dùng tự đánh dấu tay |
| Hạ tầng | Giám sát lỗi xuất dữ liệu (`NFR-OPS-01`, dòng 814) | Alert khi batch nằm ở trạng thái lỗi quá lâu |
| Màn/API phụ thuộc | `GET /api/accounting/export-batches` lọc xuyên ngày | Chưa có; `POST` đã có |
| Màn/API phụ thuộc | SC-18 (lock ngày), SC-26/RPT-06 | Lock là tiền đề xuất; RPT-06 là nơi mở snapshot `lines` |

### Giả định cần chốt

1. **Tập giá trị `send_status`.** Đề xuất: chưa gửi / đang gửi / đã gửi / gửi lỗi. RFP dòng 765 đòi
   "trạng thái" nhưng **không liệt tập giá trị**.
   *Ảnh hưởng nếu sai:* CHECK constraint và filter đều phải đổi; batch cũ cần backfill.
   *Nơi sửa:* migration mới cho `accounting_export_batch`, field #5/#15 mục 3 của file này,
   `../10-database-diagram.md`.
2. **Số lần thử gửi tối đa.** RFP chốt retry 3 lần **chỉ cho email thông báo** (`FR-NOTIFY-02`,
   dòng 687) — không nói gì về gửi dữ liệu kế toán. Spec này **không vay** con số đó.
   *Ảnh hưởng nếu sai:* gửi lặp vô hạn vào một bên nhận đang lỗi, hoặc bỏ cuộc quá sớm.
   *Nơi sửa:* hằng số ở tầng gửi (chưa tồn tại) và cột đếm nếu chốt là có đếm.
3. **Bên nhận xử lý batch trùng ngày theo kiểu thay thế hay cộng dồn.** Đã khai đầy đủ ở
   `../../gia-dinh-tich-hop-ke-toan.md` § 2 — không lặp lại ở đây. Liên quan trực tiếp tới nút
   "Gửi lại": với bên nhận cộng dồn, gửi lại nghĩa là **nhân đôi số tiền** phía kế toán.
4. **Thời hạn giữ batch và snapshot `lines`.** `DR-RET-01` (dòng 813) chốt 7 năm cho dữ liệu nghiệp
   vụ tra cứu online, 3 năm cho hình ảnh/chứng từ phụ trợ; snapshot batch thuộc nhóm nào thì RFP
   không nói.
   *Ảnh hưởng nếu sai:* `lines` là jsonb toàn bộ dòng đã gửi — xếp sai nhóm thì hoặc phình dung
   lượng, hoặc xoá mất bằng chứng đã gửi kế toán.
   *Nơi sửa:* policy lưu trữ, không phải màn này; nhưng đây là nơi người dùng phát hiện batch cũ đã
   chuyển cold, nên cần một trạng thái hiển thị cho nó.
