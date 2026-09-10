# SC-07 — Cảnh báo hiệu lực sắp hết hạn

| | |
|---|---|
| Mã thi công | — (chưa dựng) |
| Route | — (đề xuất `/participants/expiring`) |
| Loại | List |
| Actor chính | Nhân viên vận hành chợ |
| FE- / FR- | FE-008 · `FR-PARTY-03` · `BR-PERM-01` · RFP §02-08 (FIG-004), §07-02 (FIG-010) |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Cho nhân viên vận hành chợ thấy trước những người tham gia sắp hết hiệu lực để kịp khởi động thủ
tục, thay vì phát hiện lúc giao dịch bị từ chối tại hiện trường (`FR-PARTY-02` chặn ở thời điểm chốt
— `src/lib/participants/eligibility.ts:19-22`).

**Màn này KHÔNG phải một danh sách phẳng.** RFP §02-08 (dòng 309) cấm gộp hai căn cứ tham gia
**許可 (giấy phép)** và **承認 (chấp thuận)** thành một quy tắc chung. Thủ tục gia hạn của chúng
khác nhau, nên cảnh báo phải tách **hai đường xử lý riêng** — cùng một màn, hai khối, hai bộ hành
động, hai ngưỡng cảnh báo cấu hình độc lập.

| Căn cứ | Loại người tham gia | `participant.license_type` | Thủ tục khi sắp hết hạn | Gỡ tạm ngừng (FIG-004) |
|---|---|---|---|---|
| **許可 — giấy phép** | 仲卸 | `giấy phép` | Gia hạn **giấy phép** — thủ tục cấp phép, ngoài hệ thống, có cơ quan cấp | **Có điều kiện** |
| **承認 — chấp thuận** | 売買参加者 | `chấp thuận` | Xin **chấp thuận** lại — quyết định của đơn vị vận hành chợ | **Xét lại** |
| Đăng ký (tham chiếu) | 卸売業者, 買出人 | `đăng ký` | Đăng ký chợ | 卸売業者 → **Chấp thuận**; 買出人 không có trong FIG-004 |

Cột "Gỡ tạm ngừng" ở bảng trên chép đúng FIG-004 (RFP dòng 288-294). Đó là **ba thủ tục khác nhau
trên cùng một cạnh trạng thái**, không phải ba cạnh: `FIG-010` (RFP:609) chỉ có một cạnh
`Tạm ngừng → Có hiệu lực`. Nên cái phải mã hoá là **cổng kiểm theo phân loại** trên cạnh đó, chứ
không phải thêm transition. Ánh xạ loại ↔ căn cứ đã có thật trong code:
`src/lib/participants/category-rules.ts:20-25`.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc
- Vai trò được vào: đề xuất **ROLE-SYS-ADMIN** — đúng vai trò đang được phép ghi `participant` và
  `participant_status_history` (`20260904090900_rls_core.sql:71-77`). Nếu khách muốn một vai trò vận
  hành chợ riêng thì đó là vai trò thứ 8, xem giả định #4
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: cần `participant` có `valid_to` khác NULL — người vô hạn hạn (`valid_to IS NULL`,
  cột nullable ở `20260904090100_participant.sql:10`) không bao giờ vào màn này

## 3. Bảng field

Cột **Đường**: `Chung` · `許可` (仲卸) · `承認` (売買参加者).

| # | Đường | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Chung | Căn cứ tham gia | Căn cứ tham gia | 参加根拠 (`participants.list.tableHeaderLicenseType`) | tab/select | Không | `participant.license_type` | chưa có — đề xuất: chỉ 3 giá trị của `CATEGORY_LICENSE_TYPE` | chưa có — đề xuất: ngoài tập → 422 | chưa có — đề xuất |
| 2 | Chung | Loại người tham gia | Loại | 区分 (`participants.list.filterCategoryLabel`) | select | Không | `.category` (CHECK 4 giá trị) | chưa có — đề xuất: chỉ loại thuộc căn cứ đang chọn | chưa có — đề xuất: cặp (loại, căn cứ) sai → 422, dùng lại `isValidCategoryLicensePair` | chưa có — đề xuất |
| 3 | Chung | Trạng thái hiệu lực | Trạng thái | 有効状態 (`participants.list.filterStatusLabel`) | select | Không | `.status` (CHECK 4 giá trị) | chưa có — đề xuất: dùng lại `PARTICIPANT_STATUSES` | chưa có — đề xuất: dùng lại `isParticipantStatus` | chưa có — đề xuất |
| 4 | Chung | Số ngày còn lại | Còn lại (ngày) | chưa có key JA | dẫn xuất | — | `.valid_to − hôm nay (JST)`, cùng phép tính `daysBetween` của RPT-03 | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 5 | Chung | Tên | Tên | 名称 (`participants.list.tableHeaderName`) | text | — | `.name` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 6 | Chung | Ngày hết hiệu lực | Ngày hết hiệu lực | 有効終了日 (`participants.list.tableHeaderValidTo`) | date | — | `.valid_to` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 7 | Chung | Lần đổi trạng thái gần nhất | Thay đổi gần nhất | 状態変更履歴 (`participants.detail.historySection`) | dẫn xuất | — | `participant_status_history` mới nhất theo `participant_id` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 8 | 許可 | Ngưỡng cảnh báo 許可 | Ngưỡng cảnh báo (giấy phép) | chưa có key JA | int (ngày) | Không | **cột/bảng chưa có — đề xuất**; hiện là hằng số `EXPIRY_WARNING_DAYS = 30` dùng chung cho mọi loại | chưa có — đề xuất: nguyên, `> 0` | chưa có — đề xuất: ngoài khoảng → 422 | chưa có — đề xuất |
| 9 | 許可 | Đã khởi động gia hạn giấy phép | Đã nộp hồ sơ gia hạn | chưa có key JA | bool | Không | **cột/bảng chưa có — đề xuất**, xem mục 9 | chưa có — đề xuất | chưa có — đề xuất | chưa có — đề xuất |
| 10 | 承認 | Ngưỡng cảnh báo 承認 | Ngưỡng cảnh báo (chấp thuận) | chưa có key JA | int (ngày) | Không | **cột/bảng chưa có — đề xuất**; cùng hằng số như trên | chưa có — đề xuất: nguyên, `> 0` | chưa có — đề xuất: ngoài khoảng → 422 | chưa có — đề xuất |
| 11 | 承認 | Đã nộp đơn xét lại | Đã nộp đơn xét lại | 再審査申請 → 再審査中 (`event.nop_don`) | bool | Không | **dẫn xuất**: có bản ghi `participant_status_history` với `to_status = 'xét lại'` | chưa có — đề xuất | chưa có — đề xuất | chưa có — đề xuất |

- Key JA cho 3 giá trị căn cứ đã có thật (`ja/participants.json`): `licenseType.giấy phép` = 許可,
  `licenseType.chấp thuận` = 承認, `licenseType.đăng ký` = 登録. Nhãn loại cũng đã mang sẵn căn cứ:
  `category.仲卸` = 仲卸（許可制）, `category.売買参加者` = 売買参加者（承認制）.
- **Không** hiện email; chỉ `display_name` — cùng quy tắc `registry-columns.ts:103-105`.

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Không ai vào khoảng cảnh báo | "Không có người tham gia nào sắp hết hiệu lực" — hiện riêng cho từng đường | Đổi filter |
| rỗng một đường | 許可 rỗng nhưng 承認 có dòng (hoặc ngược lại) | Khối rỗng vẫn hiện tiêu đề và ngưỡng của nó, **không ẩn cả khối** | Đổi filter |
| đang tải | Query đang chạy | Skeleton cho cả hai khối | Không |
| lỗi tải | Query lỗi | Khối lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò không được vào | Trang **404** | Không |
| đang gửi | Đang chuyển trạng thái một người tham gia | Nút của đúng dòng đó bị vô hiệu | Không |
| gửi lỗi | Chuyển trạng thái thất bại | Thông báo lỗi trên đúng dòng, giữ trạng thái cũ (`participants.detail.transitionError` là key đã có) | Thử lại |
| quá hạn mà trạng thái chưa đổi | `valid_to < hôm nay` nhưng `.status` vẫn `có hiệu lực` | Nhãn cảnh báo nặng hơn — đây là trạng thái **thật đang tồn tại**, xem mục 7 | Chuyển `het_han` |

Không có dòng `read-only vì ngày đã lock`: `participant` không nằm trong 4 bảng bị lock
(`transaction`, `seri_result`, `mekiki_record`, `delivery_shipment`). Màn này không bao giờ trả
**423**.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SYS-ADMIN | Có (đề xuất) | Toàn bộ hai đường | Xem, lọc, chuyển trạng thái FIG-010, đổi ngưỡng cảnh báo | — |
| ROLE-TRADE | Cần quyết định — là vai trò bị ảnh hưởng trực tiếp khi giao dịch bị từ chối | Chỉ đọc (nếu được cấp) | Không chuyển trạng thái | **404** nếu không được cấp |
| ROLE-INTAKE, ROLE-JUDGE, ROLE-DELIVERY, ROLE-SETTLEMENT, ROLE-RULE-ADMIN | Không (đề xuất) | — | — | **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) —
`participant`/`participant_status_history` cũng vậy (`rls_core.sql:35-38`). Chặn ở đây là chặn **vào
trang** và chặn **ghi**; ghi đã chỉ ROLE-SYS-ADMIN ở tầng RLS (`:71-77`).

## 6. Hành động và hậu quả

Hai đường có hành động khác nhau — đây là chỗ ràng buộc §02-08 thể hiện ra thành UI:

| Đường | Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|---|
| Chung | Xem danh sách | `GET /api/participants/expiring` — **chưa có, đề xuất** | Không | Không | 404, 422, 500 |
| Chung | Mở chi tiết người tham gia | Điều hướng `/participants/[id]` — **đã có** | Không | Không | 404 |
| Chung | Đánh dấu hết hạn (`het_han`: có hiệu lực → mất hiệu lực) | `POST /api/participants/{id}/transition` — **đã có** | `participant`, `participant_status_history` | `status_change` (`participants/[id]/transition/route.ts:87-88`) | 404, 422 (chuyển sai cạnh FIG-010) |
| **許可** | Ghi nhận đã nộp hồ sơ gia hạn giấy phép | **chưa có, đề xuất** | Bảng theo dõi gia hạn (chưa có) | Đề xuất `action` riêng | 404, 409, 500 |
| **許可** | Gỡ tạm ngừng — **có điều kiện** (FIG-004) | `POST /api/participants/{id}/transition` với `go`, **kèm điều kiện chưa được mô hình hoá** | `participant`, `participant_status_history` | `status_change` | 404, 422 |
| **承認** | Ghi nhận đã nộp đơn xét lại (`nop_don`: mất hiệu lực → xét lại) | `POST /api/participants/{id}/transition` — **đã có** | như trên | `status_change` | 404, 422 |
| **承認** | Chấp thuận lại (`chap_thuan`: xét lại → có hiệu lực) | `POST /api/participants/{id}/transition` — **đã có** | như trên | `status_change` | 404, 422 |
| **承認** | Gỡ tạm ngừng — **xét lại** (FIG-004) | Không phải một cạnh `go` đơn thuần: FIG-004 đòi đi qua xét lại | như trên | `status_change` | 404, 422 |
| Chung | Gửi thông báo cho người tham gia | **Không thuộc màn này** — `FR-NOTIFY-01` (dòng 686) liệt "profile sắp hết hiệu lực" là event thông báo, thuộc SC-28/SC-29, cần hạ tầng email/queue | — | — | — |

**Điểm nứt phải khai thẳng:** máy trạng thái có **đúng 5 cạnh** (`state-machine.ts:35-41`) và
**số cạnh đó đúng theo `FIG-010`** — đừng thêm cạnh. Cái thiếu là cạnh `go` không mang **cổng
kiểm theo phân loại**, nên không phân biệt 卸売業者 (chấp thuận) / 仲卸 (có điều kiện) /
売買参加者 (xét lại) như `FIG-004` đòi. Ràng buộc đó hiện **chưa được mã hoá** — và không thể mã
hoá ở tầng màn, vì `resolveTarget(from, event)` không nhận `category`. Đây là điều kiện tiền đề,
không phải việc màn này tự bù bằng UI.

## 7. Edge case

- **`valid_to` đã qua mà `status` vẫn `có hiệu lực`** — trạng thái này **đang tồn tại thật**: không
  có cron nào đổi trạng thái tại `valid_to` (`src/lib/participants/eligibility.ts:19-22`). Màn phải
  hiện nhóm này nổi bật — đây chính là nhóm sẽ bị từ chối giao dịch tại hiện trường.
- **`valid_to IS NULL`** — vô hạn hạn, không bao giờ vào màn này. Đừng coi NULL là "hết hạn hôm nay".
- **Đổi trạng thái giữa lúc đang xem** — nút của danh sách cũ có thể trỏ vào một cạnh đã không còn
  hợp lệ; API `transition` phải từ chối theo `TRANSITIONS` (422) chứ không tin nút. Không có
  transaction xuyên bảng (PostgREST) nên hai bảng là hai lần ghi riêng — CAS trên trạng thái hiện có.
- **Đổi ngưỡng cảnh báo giữa phiên** — danh sách phải nạp lại; không cache kết quả cũ.
- **Ranh giới ngày theo JST** — mọi phép tính đi qua `todayJst()`/`toJstDate()`
  (`src/lib/db/business-date.ts`), không `new Date()` trần. Ngày nghiệp vụ bắt đầu 02:00 JST (RFP
  §02-07, dòng 301), nên "còn 0 ngày" hiểu theo JST, không theo giờ máy người dùng.
- **Sai cặp (loại, căn cứ)** — API đã chặn bằng `isValidCategoryLicensePair`
  (`api/participants/route.ts:82`), nhưng dữ liệu cũ hoặc seed tay có thể lệch. Dòng lệch phải rơi
  vào khối "không xác định được căn cứ", không bị nhét vào một trong hai đường.
- **Quyền bị thu hồi giữa phiên** — `getCurrentUser` trả `null` khi `is_active = false`
  (`require-role.ts:47`) → **404** ở lần điều hướng sau.

## 8. Dẫn chứng

- `src/lib/reports/queries/rpt-03-participant-eligibility.ts:11` — `EXPIRY_WARNING_DAYS = 30`, hằng
  số **duy nhất** trong repo cho ngưỡng cảnh báo; comment `:6-10` khai thẳng đó là giả định của
  RPT-03 vì RFP không cho ngưỡng và SC-07 khi đó ngoài phạm vi. Phép tính ngày và điều kiện "sắp mất
  hiệu lực" ở `:34-47, 71-76` dùng lại được, nhưng nó gộp **mọi loại** vào một danh sách
- `src/lib/participants/category-rules.ts:20-25` — ánh xạ loại ↔ căn cứ: 仲卸 → `giấy phép` (許可),
  売買参加者 → `chấp thuận` (承認), 卸売業者/買出人 → `đăng ký`
- `src/lib/participants/state-machine.ts:35-41` — 5 cạnh FIG-010 dùng chung cho cả 4 loại; `go` là
  một cạnh duy nhất
- `src/lib/participants/eligibility.ts:19-22` — **không có cron** đổi trạng thái tại `valid_to`
- `supabase/migrations/20260904090100_participant.sql:2-12` — DDL: `license_type` text tự do (không
  CHECK), `valid_to` nullable
- `supabase/migrations/20260904090900_rls_core.sql:35-38` (đọc mở mọi vai trò), `:71-77` (ghi
  `participant`/`participant_status_history` chỉ ROLE-SYS-ADMIN)
- `src/app/api/participants/[id]/transition/route.ts:87-88` — audit `status_change`;
  `src/lib/i18n/dictionaries/ja/participants.json` — key JA cho căn cứ, loại, trạng thái, 5 cạnh
- RFP `../../../../RFP_He-thong-ho-tro-nghiep-vu-cho-ban-buon-thuy-san_VI_v1.0.md`: dòng 631
  (`FR-PARTY-03`, "khoảng cảnh báo **cấu hình được**"), 309 (§02-08 **cấm gộp 許可 và 承認**), 288-294
  (FIG-004), 609-614 (FIG-010), 630 (`FR-PARTY-02`/`BR-PERM-01`), 686 (`FR-NOTIFY-01`)

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | Bảng cấu hình ngưỡng cảnh báo — đề xuất `participant_expiry_warning_config` (khoá theo `license_type` hoặc `category`, giá trị số ngày, người sửa, thời điểm sửa) | `FR-PARTY-03` (dòng 631) đòi "khoảng cảnh báo **cấu hình được**". Hiện chỉ có một hằng số cứng trong code, dùng chung mọi loại — **không** đạt yêu cầu này. Ghi vào `../10-database-diagram.md` § bảng cần thêm |
| Bảng/cột | Mã hoá **cổng kiểm theo phân loại** của FIG-004 lên cạnh `go` | `TRANSITIONS` giữ đúng 5 cạnh theo FIG-010; cần thêm điều kiện tiền đề + thẩm quyền gắn vào cạnh `go`, **không** thêm cạnh mới. Thay đổi ở `state-machine.ts` và ở chỗ route phải `select` thêm `category`, không phải ở màn |
| Bảng/cột | (Tuỳ phạm vi) Bảng theo dõi thủ tục gia hạn — đề xuất `participant_renewal` (loại căn cứ, ngày nộp, trạng thái hồ sơ, người phụ trách) | Chỉ cần nếu khách muốn theo dõi tiến độ hồ sơ. `FR-PARTY-03` **chỉ đòi cảnh báo**, không đòi theo dõi hồ sơ — đừng dựng nếu khách không xác nhận. Xem giả định #3 |
| Hạ tầng | Không cần gì cho bản đọc trong màn. Email/queue **chỉ** cần nếu muốn cảnh báo chủ động ngoài màn | `FR-NOTIFY-01` liệt event "profile sắp hết hiệu lực"; hạ tầng đó thuộc SC-28/SC-29, đang ngoài phạm vi |
| Màn/API phụ thuộc | `GET /api/participants/expiring` (chưa có); SC-05/SC-06 đã dựng cho điều hướng và chuyển trạng thái | Logic lọc đã có ở RPT-03 nhưng gộp mọi loại vào một danh sách — không dùng lại nguyên trạng được. `POST /api/participants/{id}/transition` dùng lại được |

### Giả định cần chốt

1. **Ngưỡng cảnh báo là bao nhiêu ngày.** RFP dòng 631 đòi khoảng cảnh báo **cấu hình được** nhưng
   **không cho giá trị nào**. Con số **30** trong repo là giả định do RPT-03 tự đặt
   (`rpt-03-participant-eligibility.ts:11`, comment `:6-10` khai rõ như vậy) — spec này **không**
   nâng nó thành sự thật nghiệp vụ.
   *Ảnh hưởng nếu sai:* quá ngắn thì cảnh báo tới khi thủ tục không còn kịp; quá dài thì danh sách
   lúc nào cũng đầy và mất tác dụng. *Nơi sửa:* bảng cấu hình đề xuất ở trên, hoặc
   `rpt-03-participant-eligibility.ts:11` nếu vẫn giữ hằng số.
2. **Hai đường dùng chung một ngưỡng hay hai ngưỡng khác nhau.** Câu hỏi quan trọng nhất của màn
   này. Gia hạn 許可 là thủ tục cấp phép có cơ quan bên ngoài; 承認 là quyết định nội bộ của đơn vị
   vận hành chợ — thời gian chuẩn bị rất có thể khác nhau, nhưng RFP **không nói**.
   *Ảnh hưởng nếu sai:* một ngưỡng cho cả hai là đúng việc §02-08 (dòng 309) cấm; 仲卸 sẽ nhận cảnh
   báo muộn hơn thời gian thực tế cần để gia hạn giấy phép và mất hiệu lực giữa lúc đang giao dịch.
   *Nơi sửa:* khoá của bảng cấu hình (theo `license_type` thì tách được, theo hằng số toàn cục thì
   không), field #8/#10 mục 3.
3. **Có theo dõi tiến độ hồ sơ gia hạn hay không.** `FR-PARTY-03` chỉ đòi cảnh báo; field #9 và bảng
   `participant_renewal` là **mở rộng đề xuất**, không phải yêu cầu RFP.
   *Ảnh hưởng nếu sai:* dựng thừa một bảng không ai dùng; hoặc thiếu, và vận hành lại theo dõi hồ sơ
   bằng bảng tính bên ngoài — đúng vấn đề TBL-CHANNEL-01 (dòng 284) mô tả. *Nơi sửa:* phạm vi
   `GET /api/participants/expiring` và `../10-database-diagram.md`.
4. **Ai được vào màn này.** Actor `FE-008` là "nhân viên vận hành chợ" — không khớp trực tiếp vai trò
   nào trong 7 vai trò `TBL-ROLE-01`; gần nhất về quyền ghi là ROLE-SYS-ADMIN.
   *Ảnh hưởng nếu sai:* gán ROLE-SYS-ADMIN thì vận hành hằng ngày phải nhờ quản trị hệ thống; mở cho
   nhiều vai trò thì chuyển trạng thái hiệu lực — thao tác nhạy cảm theo §02-08 (dòng 310) — bị phân
   tán. *Nơi sửa:* `requireRole` của route mới, `src/lib/nav-items.ts`, policy ghi `participant`.
5. **"Có điều kiện" của FIG-004 nghĩa là điều kiện gì.** RFP chỉ ghi đúng hai chữ đó cho ô
   仲卸 × Gỡ tạm ngừng (dòng 293), không định nghĩa.
   *Ảnh hưởng nếu sai:* nút gỡ tạm ngừng cho 仲卸 hoặc chặn oan, hoặc mở đúng bằng đường của
   卸売業者 — tức là lại gộp hai căn cứ, đúng điều §02-08 cấm. *Nơi sửa:*
   `src/lib/participants/state-machine.ts` (cạnh `go`) và mục 6.
