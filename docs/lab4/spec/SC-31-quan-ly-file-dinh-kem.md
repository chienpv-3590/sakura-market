# SC-31 — Quản lý file đính kèm

| | |
|---|---|
| Mã thi công | — (chưa dựng; bảng `lot_attachment` đã có, upload và đọc lại **đã thật** theo QĐ-6) |
| Route | — (đề xuất `/attachments` cho danh sách, `/attachments/[id]` cho chi tiết) |
| Loại | List/Detail |
| Actor chính | Bộ phận đối chiếu |
| FE- / FR- | FE-044 · `TBL-ATTACH-01` · `DR-RET-01` · `FR-LOT-01` · `DR-IMAGE-01` · RFP §08-04, §09-06 |
| Trạng thái | Chưa dựng |

> **Màn chưa thi công.** Toàn bộ field, validation và trạng thái dưới đây là **đề xuất thiết kế**,
> chưa tồn tại trong code. Xem mục 9 để biết điều kiện tiền đề.

## 1. Mục đích

Cho bộ phận đối chiếu duyệt và quản lý toàn bộ chứng từ đính kèm theo **policy lưu trữ**, thay vì
chỉ xem được các file của đúng một lô hàng khi đang mở lô đó. Ranh giới:

| | Hiện trạng |
|---|---|
| **Đã có** | Upload thật (5MB, 4 loại MIME, kiểm ở server), bảng `lot_attachment`, bucket private `lot-attachment`, đọc lại qua signed URL ngắn hạn; đường thứ hai `correction_request.evidence_path` với bucket `correction-evidence` riêng. Cả hai append-only |
| **Còn thiếu** | Danh sách **xuyên lô hàng và xuyên loại chứng từ**; **phân loại tài liệu** để biết file nào thuộc nhóm lưu 7 năm, nhóm nào 3 năm rồi chuyển cold (`DR-RET-01`); vòng đời lưu trữ (không có cột nào, không có policy update/delete) |

Hai kho đính kèm hiện tách rời, không bảng nào nhìn được cả hai. `FE-044` là màn quản lý chung, nên
spec phải nói rõ nó gom hai kho hay chỉ nhận `lot_attachment` — xem mục 9.

## 2. Điều kiện vào màn

- Đăng nhập: bắt buộc
- Vai trò được vào: đề xuất **ROLE-SETTLEMENT** (actor chính) và **ROLE-SYS-ADMIN** (vận hành policy
  lưu trữ). ROLE-INTAKE là vai trò **ghi** đính kèm lô hàng
  (`20260907090000_lot_attachment.sql:40-41`), không phải vai trò quản lý lưu trữ
- Mã lỗi khi thiếu quyền: **404** (không phải 403 — có chủ đích, không lộ sự tồn tại tài nguyên)
- Tiền đề dữ liệu: không cần

## 3. Bảng field

| # | Field | Nhãn VI | Nhãn JA | Kiểu | Bắt buộc | Nguồn | Validation client | Validation server | Thông báo lỗi |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Từ ngày | Ngày tải lên từ | chưa có key JA | date | Không | `lot_attachment.created_at` | chưa có — đề xuất: `YYYY-MM-DD`, `<=` đến ngày | chưa có — đề xuất: dùng lại `isValidReportDate` | chưa có — đề xuất |
| 2 | Đến ngày | Ngày tải lên đến | chưa có key JA | date | Không | `.created_at` | chưa có — đề xuất: `>=` từ ngày | chưa có — đề xuất: cùng hàm | chưa có — đề xuất |
| 3 | Loại tài liệu | Loại tài liệu | chưa có key JA | select | Không | **cột chưa có — đề xuất** `.doc_type` | chưa có — đề xuất: chỉ giá trị trong tập chốt ở mục 9 | chưa có — đề xuất: ngoài tập → 422 | chưa có — đề xuất |
| 4 | Nhóm lưu trữ | Nhóm lưu trữ | chưa có key JA | select | Không | **dẫn xuất** từ `.doc_type` theo bảng `DR-RET-01` | chưa có — đề xuất | chưa có — đề xuất | chưa có — đề xuất |
| 5 | Lô hàng | Lô hàng | ロット (`nav.lots`) | select | Không | `.lot_id` → `lot` | chưa có — đề xuất | chưa có — đề xuất: id không tồn tại → danh sách rỗng | chưa có — đề xuất |
| 6 | Người tải lên | Người tải lên | 実施者 (`participants.detail.historyHeaderChangedBy`) | select | Không | `.uploaded_by` → `app_user.display_name` | chưa có — đề xuất | chưa có — đề xuất | chưa có — đề xuất |
| 7 | Tên file | Tên file | chưa có key JA | text | — | `.file_name` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 8 | Loại MIME | Loại MIME | chưa có key JA | text | — | `.mime_type` (4 giá trị được phép ở tầng upload) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 9 | Dung lượng | Dung lượng | chưa có key JA | int | — | `.file_size` (byte, CHECK `> 0`) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 10 | Ngày tải lên | Ngày tải lên | 日時 (`participants.detail.historyHeaderChangedAt`) | timestamptz | — | `.created_at` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 11 | Hết hạn online | Hết hạn lưu online | chưa có key JA | dẫn xuất | — | `.created_at` + hạn của nhóm lưu trữ theo `DR-RET-01` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 12 | Tầng lưu trữ | Tầng lưu trữ | chưa có key JA | text | — | **cột chưa có — đề xuất** `.storage_tier` (online / cold) | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |
| 13 | Xem file | Xem file | chưa có key JA | link | — | **dẫn xuất tại server**: signed URL ngắn hạn từ `.file_path` | không áp dụng — chỉ đọc | không áp dụng — chỉ đọc | — |

**Ba quy tắc cứng về đường dẫn file, không thương lượng:**

1. **`file_path` / `evidence_path` không bao giờ hiện lên UI và không bao giờ ra CSV** — quy tắc đã
   có ở RPT-08 (`registry-columns.ts:103-105`, `adjustment-queries.ts:59`), giữ y nguyên.
2. **Mọi đường xem file đi qua signed URL do server sinh, TTL ngắn** — tiền lệ
   `lot-attachment-queries.ts:4, 32-44` và `app/(app)/corrections/page.tsx:13, 35-43`. Không bao giờ
   URL công khai; bucket là private (`20260907090000_lot_attachment.sql:46-48`).
3. **Một signed URL hỏng không được làm sập cả trang** — dòng đó vẫn hiện tên/dung lượng/ngày, chỉ
   mất link (tiền lệ `lot-attachment-queries.ts:11-17`).

## 4. Trạng thái màn

| Trạng thái | Điều kiện | Hiển thị | Hành động khả dụng |
|---|---|---|---|
| rỗng | Query trả 0 dòng | "Không có file đính kèm nào khớp điều kiện" | Đổi filter |
| đang tải | Query đang chạy | Skeleton bảng | Không |
| lỗi tải | Query lỗi | Khối lỗi + nút thử lại | Thử lại |
| không có quyền | Vai trò không được vào | Trang **404** | Không |
| đang gửi | Bấm hành động vòng đời (đánh dấu cold) và request chưa trả | Dòng đó vào trạng thái chờ | Không |
| gửi lỗi | Request đó trả lỗi | Thông báo lỗi trên đúng dòng, không đổi trạng thái | Thử lại |
| link hết hạn | Signed URL quá TTL hoặc sinh lỗi | Dòng vẫn hiện, link thay bằng nút "tạo lại link" | Tạo lại link |
| đã chuyển cold | `storage_tier = cold` (cột chưa có) | Nhãn "đã chuyển lưu trữ nguội", không link xem trực tiếp | Yêu cầu phục hồi |

Không có dòng `read-only vì ngày đã lock`: `lot_attachment` **không** nằm trong 4 bảng bị lock và
được miễn trigger khoá ngày có chủ đích — lý do ghi ngay trong DDL
(`20260907090000_lot_attachment.sql:9-13`): một lô nhận vào ngày đã lock vẫn bán ngày sau, và bảng
này là chứng từ tiếp nhận của chính lô đó. Màn này không bao giờ trả **423**.

## 5. Phân quyền hiển thị

| Vai trò | Vào màn | Field thấy được | Hành động | Mã lỗi khi vi phạm |
|---|---|---|---|---|
| ROLE-SETTLEMENT | Có (đề xuất) | Toàn bộ | Xem, lọc, xem file qua signed URL | — |
| ROLE-SYS-ADMIN | Có (đề xuất) | Toàn bộ | Thêm: hành động vòng đời lưu trữ | — |
| ROLE-INTAKE | Không (đề xuất) | — | Vẫn upload được qua SC-08, không quản lý được ở đây | **404** |
| ROLE-JUDGE, ROLE-TRADE, ROLE-DELIVERY, ROLE-RULE-ADMIN | Không (đề xuất) | — | — | **404** |

**Lưu ý về đọc:** RLS cho **mọi vai trò đang hoạt động đọc được mọi bảng** (FR-601, có chủ đích) —
`lot_attachment` cũng vậy (`20260907090000_lot_attachment.sql:33-36`), và policy đọc trên
`storage.objects` của bucket cũng mở cho mọi vai trò đang hoạt động (`:53-54`). Nghĩa là **metadata
và nội dung file** đã đọc được ở tầng dữ liệu bởi mọi vai trò; gác màn này chỉ bỏ đi giao diện duyệt
hàng loạt. Đánh đổi này cùng loại với SC-30 và cũng chạm §09-06 (APPI) — xem mục 9.

## 6. Hành động và hậu quả

| Hành động | API | Bảng bị ghi | Audit | Mã lỗi có thể trả |
|---|---|---|---|---|
| Xem danh sách | `GET /api/attachments` — **chưa có, đề xuất** | Không | Không | 404 (sai vai trò), 422, 500 |
| Tạo lại link xem file | `POST /api/attachments/{id}/signed-url` — **chưa có, đề xuất** | Không | Cân nhắc ghi: đây là truy cập chứng từ, xem giả định #4 | 404, 410 (file đã chuyển cold), 500 |
| Đánh dấu chuyển cold · yêu cầu phục hồi từ cold | `POST /api/attachments/{id}/archive` và `.../restore` — **chưa có, đề xuất** | `.storage_tier`, `.archived_at` (cột chưa có); bảng yêu cầu phục hồi (chưa có) | Đề xuất `archive_attachment` / `request_attachment_restore` trên `entity: "lot_attachment"` | 404, 409 (chưa tới hạn), 500 |
| Upload file mới | **Không thuộc màn này** — chạy ở SC-08 (tiếp nhận lô) và SC-20 (yêu cầu điều chỉnh) | `lot_attachment` / `correction_request` | `attach_document` (`attach-intake-doc.ts:67`) | 422 `INVALID_TYPE` / `TOO_LARGE` |
| Xoá file | **Không đề xuất** | — | — | — |

Không đề xuất xoá: cả hai kho đều append-only, **không có policy update/delete ở bất kỳ đâu**
(`20260907090000_lot_attachment.sql:26-27`). Chứng từ là bằng chứng nghiệp vụ; hết hạn online thì
**chuyển tầng lưu trữ**, không xoá. "Đánh dấu chuyển cold" là lý do duy nhất cần một policy update
hẹp — xem mục 9.

## 7. Edge case

- **File tồn tại trong storage nhưng không có dòng DB** — đường ghi đã có bước ghi bù xoá file khi
  insert thất bại (`attach-intake-doc.ts:44-63`), nhưng ghi bù có thể thất bại tiếp và code chỉ log
  lại. Màn quản lý là nơi duy nhất phát hiện được file mồ côi; đối chiếu storage với DB nên là một
  chức năng của màn.
- **Dòng DB tồn tại nhưng file đã mất** — signed URL sinh ra vẫn 404 khi mở. Phải phân biệt "chưa
  sinh được link" với "file không còn".
- **Signed URL bị chia sẻ lại** — TTL ngắn (`lot-attachment-queries.ts:4`) là biện pháp duy nhất
  đang có. Không nới TTL cho tiện; đó là đánh đổi bảo mật, không phải UX.
- **`uploaded_by` là NULL** — cột nullable (`20260907090000_lot_attachment.sql:21`). Hiện "không rõ",
  không ẩn dòng.
- **File tới hạn 3 năm nhưng chưa ai đánh dấu cold** — không có job nào làm việc này. Màn phải hiện
  được nhóm "quá hạn online mà chưa chuyển", nếu không `DR-RET-01` chỉ là chữ trên giấy.
- **Quyền bị thu hồi giữa phiên** — `getCurrentUser` trả `null` khi `is_active = false`
  (`require-role.ts:47`) → **404** ở lần điều hướng sau. **Không phân trang** thì vỡ: số file tăng
  theo số lô nhân số chứng từ mỗi lô.

## 8. Dẫn chứng

- `supabase/migrations/20260907090000_lot_attachment.sql:14-23` — DDL 8 cột: **không** `doc_type`,
  **không** `storage_tier`, **không** `archived_at`
- `supabase/migrations/20260907090000_lot_attachment.sql:9-13` — lý do miễn trigger khoá ngày
- `supabase/migrations/20260907090000_lot_attachment.sql:26-27` — append-only, không policy
  update/delete
- `supabase/migrations/20260907090000_lot_attachment.sql:33-41` — read mở cho mọi vai trò đang hoạt
  động, insert chỉ ROLE-INTAKE
- `supabase/migrations/20260907090000_lot_attachment.sql:46-54` — bucket private + 2 policy storage
- `src/lib/lots/intake-doc-upload.ts:4-10, 21-26` — 5MB, 4 loại MIME, kiểm ở **server**; `accept` của
  client chỉ là gợi ý UX
- `src/lib/lots/lot-attachment-queries.ts:4, 11-17, 32-44` — TTL signed URL, hành vi khi sinh link
  lỗi, đọc theo **đúng một** `lot_id`
- `src/lib/lots/attach-intake-doc.ts:44-63` — ghi bù xoá file khi insert thất bại
- `src/lib/corrections/evidence-upload.ts:4-10, 18-20` — kho đính kèm **thứ hai**, bucket
  `correction-evidence`, cùng giới hạn; `src/app/(app)/corrections/page.tsx:13, 35-43` — signed URL
- `src/lib/reports/registry-columns.ts:103-105`, `src/lib/corrections/adjustment-queries.ts:59` —
  `evidence_path` **không bao giờ** ra CSV
- `../../pham-vi-va-phan-mock.md` § 2b — `TBL-ATTACH-01`/`DR-RET-01` khai NGOÀI PHẠM VI; upload và
  đọc lại đã thật (QĐ-6)
- RFP `../../../../RFP_He-thong-ho-tro-nghiep-vu-cho-ban-buon-thuy-san_VI_v1.0.md`: dòng 771-775
  (§08-04 `TBL-ATTACH-01`, 3 nhóm tài liệu và thời hạn), 813 (`DR-RET-01` 7 năm / 3 năm rồi cold),
  794 (§08-07 `DR-IMAGE-01`, giữ người xác nhận), 881-888 (§09-06 APPI)

## 9. Điều kiện tiền đề — CHỈ màn chưa dựng

| Loại | Cần gì | Ghi chú |
|---|---|---|
| Bảng/cột | `lot_attachment`: thêm `doc_type`, `storage_tier`, `archived_at` | Không có `doc_type` thì **không phân biệt được** nhóm 7 năm với nhóm 3 năm mà RFP §08-04 chia — tức không thi hành được `DR-RET-01`; hai cột còn lại cần cho vòng đời online → cold. Ghi vào `../10-database-diagram.md` § bảng cần thêm |
| Bảng/cột | Một policy **update hẹp** chỉ cho phép đổi `storage_tier`/`archived_at` | Bảng hiện append-only tuyệt đối. Đây là ngoại lệ duy nhất màn này cần, và phải hẹp đúng 2 cột — không mở update toàn bảng |
| Bảng/cột | Quyết định phạm vi: chỉ `lot_attachment`, hay gom cả `correction_request.evidence_path` | Hai kho, hai bucket, hai vai trò ghi khác nhau. Gom lại cần một view hợp nhất hoặc một bảng đính kèm chung — thay đổi lớn hơn nhiều so với thêm 3 cột. Xem giả định #2 |
| Hạ tầng | Tầng lưu trữ nguội và đường phục hồi; job định kỳ đánh dấu file tới hạn | RFP dòng 774 đòi phục hồi trong **tối đa 2 ngày làm việc**; chưa có tầng lưu trữ nào ngoài bucket hiện tại. Không có job/cron nào trong repo — không có job thì hạn lưu trữ phải bấm tay, và màn này phải hiện danh sách quá hạn |
| Màn/API phụ thuộc | `GET /api/attachments` (chưa có); SC-08 (upload lô), SC-10 (xem theo lô), SC-20/SC-21 (evidence điều chỉnh) | Truy vấn hiện chỉ đọc theo đúng một `lot_id`. Các màn kia là nguồn ghi của mọi dòng màn này hiển thị |

### Giả định cần chốt

1. **Tập giá trị `doc_type` và cách ánh xạ sang nhóm lưu trữ.** RFP §08-04 (dòng 771-775) chia 3
   nhóm — "phiếu tiếp nhận / phiếu giao dịch / bảng đối chiếu" (7 năm), "hình ảnh/chứng từ phụ trợ
   về tranh chấp hoặc giao hàng" (3 năm rồi cold), "tài liệu rehearsal migration và hồ sơ nghiệm
   thu" (theo vòng đời dự án) — nhưng **không** cho tập giá trị dữ liệu, và nhóm thứ ba không phải
   dữ liệu nghiệp vụ chạy trong hệ thống này.
   *Ảnh hưởng nếu sai:* file xếp sai nhóm là hoặc chuyển cold sớm 4 năm, hoặc giữ online quá hạn —
   cả hai vi phạm policy lưu trữ, và cái thứ nhất mất bằng chứng không lấy lại được. *Nơi sửa:*
   migration thêm `doc_type`, field #3/#4 mục 3, `../10-database-diagram.md`.
2. **Màn này quản lý một kho hay hai.** `FE-044` nói "quản lý file đính kèm" chung; code có hai kho
   tách biệt (`lot_attachment` + bucket `lot-attachment` ghi bởi ROLE-INTAKE;
   `correction_request.evidence_path` + bucket `correction-evidence` ghi bởi đường F008).
   *Ảnh hưởng nếu sai:* chọn một kho thì policy lưu trữ chỉ phủ một nửa chứng từ, và evidence tranh
   chấp — đúng nhóm 3 năm RFP gọi tên — lại nằm ở nửa không được quản lý. *Nơi sửa:* phạm vi
   `GET /api/attachments`; nếu gom thì cần view hợp nhất hoặc bảng đính kèm chung ở
   `../10-database-diagram.md`.
3. **Ai được duyệt toàn bộ chứng từ, và có siết đọc `lot_attachment` hay không.** Cùng loại đánh đổi
   với SC-30: RLS đọc rộng theo FR-601 (có chủ đích) đá với §09-06 (APPI) đòi kiểm soát truy cập theo
   vai trò cho thông tin cá nhân — chứng từ tiếp nhận và evidence tranh chấp có thể chứa thông tin
   cá nhân của người tham gia.
   *Ảnh hưởng nếu chọn sai:* siết quá thì phá FR-601; mở quá thì mọi vai trò duyệt được toàn bộ
   chứng từ của chợ. *Nơi sửa:* policy trên `lot_attachment` và trên `storage.objects` của bucket,
   `requireRole` của route mới. **Cần chung một ADR với SC-30 — spec này không tự quyết.**
4. **Có ghi audit cho hành vi mở/tạo lại link xem chứng từ hay không.** RFP §09-06 (dòng 886) đòi
   "log truy cập" cho thông tin cá nhân. Hiện chỉ upload được ghi audit (`attach_document`); việc
   **đọc** không được ghi ở đâu.
   *Ảnh hưởng nếu sai:* thiếu bằng chứng tuân thủ khi bị kiểm tra, hoặc `audit_log` phình vì mỗi lần
   render danh sách lại sinh N dòng. *Nơi sửa:* route tạo signed URL (chưa có).
5. **TTL của signed URL trên màn quản lý.** Code dùng TTL ngắn cho màn chi tiết một lô
   (`lot-attachment-queries.ts:4`); RFP không nói gì về TTL.
   *Ảnh hưởng nếu sai:* TTL dài thì một link lọt ra ngoài còn mở được lâu; quá ngắn thì người duyệt
   hàng loạt phải bấm tạo lại link liên tục. *Nơi sửa:* hằng số của route tạo signed URL — **không**
   nới TTL hiện có của SC-10 để tiện cho màn này.
