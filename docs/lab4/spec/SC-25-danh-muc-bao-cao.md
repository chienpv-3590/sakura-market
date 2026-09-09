# SC-25 — Danh mục báo cáo

| | |
|---|---|
| Mã thi công | SCR025_ReportCatalog |
| Route | `/reports` |
| Loại | List (tĩnh, không đọc DB) |
| Actor chính | Mọi người dùng nội bộ đang hoạt động — cả 7 vai trò |
| FE- / FR- | FE-033, FE-034 / FR-RPT-01, FR-RPT-03 |
| Trạng thái | Đã dựng |

## 1. Mục đích

Liệt kê **đủ 12 mã báo cáo** RPT-01..RPT-12 với tần suất, bộ lọc và trạng thái **chạy thật hay
dữ liệu mẫu**, rồi dẫn sang màn xem/xuất (SC-26). Danh mục lấy từ registry tĩnh trong code, không
đọc DB — nghĩa là ai đăng nhập cũng thấy hệ thống *có* những báo cáo nào.

FR-RPT-03 cấm report builder tự phục vụ, nên registry này **chính là toàn bộ bề mặt báo cáo** —
không có đường nào để thêm mã thứ 13 hoặc một hình dạng bộ lọc khác (`registry.ts:46-49`).

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc — `requireUser()`, **không** `requireRole` (`reports/page.tsx:13`)
- Vai trò được vào: **cả 7 vai trò** ROLE-INTAKE · ROLE-JUDGE · ROLE-TRADE · ROLE-DELIVERY ·
  ROLE-SETTLEMENT · ROLE-RULE-ADMIN · ROLE-SYS-ADMIN
- Mã lỗi khi thiếu quyền: **không áp dụng** — màn này không chặn theo vai trò. Chưa đăng nhập
  hoặc `is_active=false` → **307** về `/login?reason=unauthenticated|inactive`
  (`require-role.ts:58-64`, `docs/generated/permissions-matrix.md:112-116`)
- Tiền đề dữ liệu: không có — danh mục là hằng trong code, luôn 12 dòng

## 3. Bảng field

Màn không có input nào. Mọi ô đều chỉ đọc, nguồn là `REPORT_REGISTRY` — **không có validation
client hay server nào để khai, vì không có dữ liệu nào đi vào**.

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Mã | Mã | コード | text — link | — | `ReportDefinition.code`, hằng `RPT-01..RPT-12` (`registry.ts:60-169`) | không có input | không có input | — |
| 2 | Tên báo cáo | Tên báo cáo | レポート名 | text | — | `dict[r.titleKey]`, khoá `reports.catalog.RPT-XX.title` (`vi/reports.json:10-45`) | không có input | không có input | — |
| 3 | Tần suất | Tần suất | 頻度 | text | — | `dict[r.frequencyKey]`, khoá `…RPT-XX.frequency` | không có input | không có input | — |
| 4 | Filter | Filter | フィルター | text mô tả | — | `dict[r.filterDescriptionKey]`, khoá `…RPT-XX.filter` — **chỉ là câu mô tả**, không phải bộ lọc thật (bộ lọc thật ở SC-26 theo `filterFields`) | không có input | không có input | — |
| 5 | Trạng thái | Chạy thật / Dữ liệu mẫu | 実データ / サンプルデータ | badge | — | `ReportDefinition.isMock` (`registry.ts:31`); `false` → badge `--ok`, `true` → `MockDataBadge` tông `--warn` (`reports/page.tsx:45-53`, `mock-data-badge.tsx:7-9`) | không có input | không có input | — |

### 3.1 Kiểm từ code — mã nào thật, mã nào mock

Đếm từ `isMock` trong `src/lib/reports/registry.ts` tại thời điểm viết spec:

| Trạng thái | Mã | `isMock` tại dòng |
|---|---|---|
| **Chạy thật — 7 mã** | RPT-01 · RPT-02 · RPT-03 · RPT-05 · RPT-06 · RPT-07 · RPT-08 | 66 · 75 · 84 · 102 · 111 · 120 · 129 |
| **Dữ liệu mẫu — 5 mã** | RPT-04 · RPT-09 · RPT-10 · RPT-11 · RPT-12 | 93 · 138 · 147 · 156 · 165 |

RPT-04 và RPT-09 mock **vĩnh viễn** — không có nguồn dữ liệu (`registry.ts:55-58`); RPT-09 phụ
thuộc SC-19 quản lý tranh chấp, chưa dựng (`docs/pham-vi-va-phan-mock.md:79`).
`docs/generated/permissions-matrix.md:1029` khai cùng con số 5 mock / 7 thật.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | **không xảy ra** — `REPORT_REGISTRY` luôn 12 phần tử, hằng trong code; không có `EmptyState` nào trong file (`reports/page.tsx:35`) | — | — |
| đang tải | Server Component đang render (`requireUser` + `getDictionary`) | streaming `PageFrame` | không |
| lỗi tải | `getDictionary` hoặc `requireUser` throw (lỗi truy vấn `app_user`, `require-role.ts:44-46`) | error boundary Next.js | Tải lại |
| không có quyền | **không áp dụng** — không chặn theo vai trò | — | — |
| chưa đăng nhập / tài khoản bị vô hiệu | không có session, hoặc `is_active=false` | **307** về `/login` kèm `reason` | Đăng nhập lại |
| đang gửi / gửi lỗi | **không áp dụng** — màn không có hành động ghi nào | — | — |
| read-only vì ngày đã lock (423) | **không áp dụng** — màn không chạm bảng nào, kể cả 4 bảng mang `trg_block_after_lock` (`business_day_lock.sql:56-75`) | — | — |

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| Cả 7 vai trò, tài khoản đang hoạt động | ✓ | toàn bộ 5 cột, đủ 12 dòng — giống nhau cho mọi vai trò | mở một mã báo cáo (SC-26) | không có |
| Không session / JWT hết hạn | ✗ | không | không | **307** `/login?reason=unauthenticated` |
| Session hợp lệ nhưng `app_user` không có hoặc `is_active=false` | ✗ | không | không | **307** `/login?reason=inactive` |

**Lưu ý về đọc:** màn này **không đọc bảng nào**, nên RLS không tham gia. RLS cho mọi vai trò
đang hoạt động đọc mọi bảng nghiệp vụ (FR-601, `rls_core.sql:29`) — chặn là ở **ghi** và ở
**vào trang**, mà màn này thì không chặn vào trang. Việc phân biệt vai trò xảy ra ở SC-26:
tạo batch xuất kế toán chỉ ROLE-SETTLEMENT làm được (`reports/[reportCode]/page.tsx:127`).

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Mở một mã báo cáo | điều hướng `/reports/{code}` (`reports/page.tsx:38`) | không ghi | không | mã không có trong registry → `notFound()` **404** ở SC-26 (`reports/[reportCode]/page.tsx:48`) |
| Đọc danh mục qua API | `GET /api/reports` — map registry, **không đọc DB** (`api/reports/route.ts:5-16`) | không ghi | không | **307** khi chưa đăng nhập |

## 7. Edge case

- **Badge "Chạy thật" không có nghĩa "có dữ liệu"**: `isMock: false` chỉ nói báo cáo có query
  thật. Query trả 0 dòng vẫn là "Chạy thật" — trạng thái rỗng nằm ở SC-26
  (`load-report-rows.ts:78-81`).
- **Cột "Filter" là câu mô tả, không phải bộ lọc thật**: mô tả lấy từ i18n
  (`registry.ts:65`), bộ lọc thật lấy từ `filterFields` (`registry.ts:67`). Hai nguồn có thể
  lệch nhau mà không ai phát hiện — báo cáo mock có `filterFields: []` nhưng mô tả vẫn ghi tên
  bộ lọc (ví dụ RPT-04: "Ngày nghiệp vụ, loại ngoại lệ" ở `vi/reports.json:21`, còn
  `filterFields` rỗng ở `registry.ts:94`). `chưa có — đề xuất`: sinh mô tả từ `filterFields`.
- **Chú thích trong code đã cũ**: `mock-data-badge.tsx:1-3` viết "9 reports not built for real"
  và "the 3 real ones" — con số của bản 10h. Registry hiện là 5 mock / 7 thật. Chỉ là comment,
  không ảnh hưởng hành vi, nhưng đọc dễ lệch. `chưa có — đề xuất`: cập nhật comment.
- **Không phân trang, không tìm kiếm, không sắp xếp**: 12 dòng cố định, đủ.
- **Thứ tự dòng là thứ tự khai trong mảng**, không sắp theo cột nào
  (`reports/page.tsx:35`) — hiện trùng với thứ tự mã tăng dần.
- **Quyền bị thu hồi giữa phiên**: `is_active=false` → lần render sau `requireUser()` redirect
  **307** `/login?reason=inactive`, không phải 404 (`require-role.ts:58-64`).
- **Thêm mã báo cáo thứ 13 là sửa code**, không phải sửa dữ liệu — FR-RPT-03 cấm report builder
  (`registry.ts:46-49`). LAB-5 phải tính đây là task code, không phải task cấu hình.

## 8. Dẫn chứng

- `src/app/(app)/reports/page.tsx:10-11,13,35,38,42-44,45-53` — chú thích SCR, `requireUser()` (không `requireRole`), map 12 dòng, link mã, badge thật/mẫu
- `src/components/reports/mock-data-badge.tsx:1-3,7-9` — comment cũ (9 mock/3 thật), badge tông `--warn`
- `src/lib/reports/registry.ts:26-34,46-58,60-169,171-173` — `ReportDefinition`, chú thích FR-RPT-03 + đếm 7 thật, 12 entry, `getReportDefinition`
- `src/lib/reports/registry.ts:66,75,84,102,111,120,129` — `isMock: false` của 7 mã thật
- `src/lib/reports/registry.ts:93,138,147,156,165` — `isMock: true` của 5 mã mẫu
- `src/app/api/reports/route.ts:5-16` — API danh mục, `requireUser()`, không đọc DB
- `src/lib/i18n/dictionaries/vi/reports.json:2-9,10-45` — nhãn cột, nhãn 12 mã
- `src/lib/i18n/dictionaries/ja/reports.json:8-9` — 実データ / サンプルデータ
- `src/lib/auth/require-role.ts:44-46,58-64` — lỗi truy vấn `app_user`, 307 khi inactive
- `supabase/migrations/20260904090900_rls_core.sql:29` — FR-601, mọi vai trò đọc được
- `supabase/migrations/20260904090500_business_day_lock.sql:56-75` — 4 bảng mang trigger lock, không liên quan màn này
- `docs/generated/permissions-matrix.md:112-116,1029,1046` — PERM001 baseline, đếm 5 mock/7 thật, SCR025 và `MockDataBadge`
- `docs/pham-vi-va-phan-mock.md:79` — RPT-09 không dựng được vì thiếu SC-19
