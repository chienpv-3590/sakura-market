# SC-02 — Xác thực MFA và thiết lập bảo mật · Spec BE

| | |
|---|---|
| FE liên quan | FE-002 (MFA cho tài khoản quản trị và role phê duyệt), FE-004 (Kiểm soát phiên đăng nhập) |
| FN | FN-01 (Quản lý danh tính và phân quyền nội bộ) |
| Ưu tiên | P0 |
| Yêu cầu khách | NFR-SEC-01, NFR-SEC-03, SEC-IAM-02, FR-AUDIT-01, NFR-OPS-01, TBL-ROLE-01 |
| Miền dữ liệu | D-PARTY |
| State machine | không có `FIG-*` cho vòng đời phiên — dùng §4 của SC-01, nhánh *Chờ nâng mức* |
| Đã thi công | Không |

## 1. Phạm vi backend của màn này

Nâng mức phiên bằng yếu tố xác thực thứ hai cho các vai thuộc **diện bắt buộc MFA** (`NFR-SEC-01`);
cho chủ tài khoản tự đăng ký / huỷ yếu tố của mình và xem chính sách phiên đang áp (`FE-004` →
`NFR-SEC-03`); và **khai được diện bắt buộc theo vai trò**, đổi bằng cấu hình chứ không sửa mã.

**Không** làm: bước mật khẩu (→ SC-01); đọc hoặc sửa thiết lập bảo mật của **người khác** (→ SC-03,
SC-04); tra cứu log (→ SC-30); chính sách MFA cho người tham gia **bên ngoài** (`SEC-IAM-02`,
RFP:810 — chưa có `SC-` nào, §9 Q5). Là màn bảo mật trong repo công khai nên bản này chỉ đặc tả
**yêu cầu và luồng**: cấu hình khoá, cách sinh và lưu yếu tố, nội dung mã dự phòng và luồng khôi
phục thiết bị nằm ở tài liệu bảo mật nội bộ (§9 Q6).

## 2. Hợp đồng API

### `GET /api/auth/security-settings`

| | |
|---|---|
| Thoả yêu cầu | FE-002 · FE-004 · NFR-SEC-01 (RFP:809) · NFR-SEC-03 (RFP:811) |
| Xác thực | bắt buộc, chấp nhận cả phiên **chưa đủ mức** · Vai trò: chủ tài khoản của phiên, **chỉ dữ liệu của chính mình** |
| Idempotent | có — chỉ đọc |

**Request:** không có tham số. Chủ thể lấy từ phiên; **không** nhận `accountId` từ client — nhận
tham số đó là mở đường đọc thiết lập bảo mật của người khác.

**Response 200:** `inMfaScope` (boolean) · `factorCount` (integer) · `factorStatus` (enum: `ngoài
diện` / `bắt buộc · đã đăng ký` / `bắt buộc · chưa đăng ký`) · `recoveryAvailable` (boolean — chỉ
còn hay hết, **không** trả nội dung mã) · `sessionPolicy` (**nhãn chính sách** cho giới hạn tổng và
giới hạn không hoạt động; §9 Q2) · `lockState` · `allowedMethods`.

**Mã lỗi:** `401 no_session` — không có phiên (`NFR-SEC-03`) · `404 not_found` — chủ thể **ngoài**
diện bắt buộc MFA, 404 chứ không 403 (`NFR-SEC-01`) · `503 factor_provider_unavailable` — nhà cung
cấp xác thực không trả lời khi đọc danh sách yếu tố (`NFR-AVL-01`).

**Tác dụng phụ:** không ghi gì. Ca 404 có ngoại lệ: chủ thể **thuộc** diện mà **chưa** có yếu tố nào
vẫn phải đọc được endpoint này, nếu không thì không có đường đăng ký — §9 Q4.

### `POST /api/auth/mfa/verify`

| | |
|---|---|
| Thoả yêu cầu | FE-002 · NFR-SEC-01 (RFP:809) |
| Xác thực | bắt buộc — phiên đã qua bước mật khẩu, chưa đủ mức · Vai trò: chủ tài khoản thuộc diện bắt buộc MFA |
| Idempotent | không — mỗi lần gọi là một lần thử và phải được đếm (§9 Q3) |

**Request**

| Tham số | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Nguồn |
|---|---|---|---|---|---|
| `factorId` | body | string | có | phải là yếu tố **của chính chủ thể phiên** | NFR-SEC-01 |
| `code` | body | string | có | chỉ chữ số; **đối chiếu ở nhà cung cấp xác thực**, không so ở tầng ứng dụng | NFR-SEC-01 |
| `rememberDevice` | body | boolean | không | chỉ cờ bật/tắt; **thời hạn do server quyết** | NFR-SEC-03 |
**Server tự quyết — không nhận từ client:** thời hạn ghi nhớ thiết bị, mức phiên sau khi xác thực,
mọi giá trị đếm sai và mốc hết khoá, thời điểm sự kiện log.
**Response 200:** `sessionLevel` = `đủ mức` · `landingArea` (khu vực của vai trò được gán ở SC-01).

**Mã lỗi**

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu |
|---|---|---|---|
| 400 | `invalid_request` | thiếu `factorId` hoặc thiếu `code` | NFR-SEC-01 |
| 401 | `code_rejected` | mã sai **hoặc** hết hiệu lực **hoặc** đã dùng — một mã cho ba nhánh, có chủ đích: không nói mã sai ở chỗ nào | NFR-SEC-01 |
| 403 | `factor_not_owned` | `factorId` không thuộc chủ thể của phiên | NFR-SEC-01 |
| 404 | `not_found` | chủ thể ngoài diện bắt buộc MFA | NFR-SEC-01 |
| 423 | `account_locked` | tài khoản đang trong thời gian khoá tạm | NFR-SEC-03 (RFP:811) |
| 503 | `factor_provider_unavailable` | nhà cung cấp xác thực không đối chiếu được mã | NFR-AVL-01 |

**Tác dụng phụ:** nâng mức phiên khi đúng; cập nhật giá trị đếm sai (đặt lại khi đúng, tăng khi
sai) và có thể đặt mốc khoá tạm; ghi 1 bản ghi log theo §7.

### `POST /api/auth/mfa/factors` · `DELETE /api/auth/mfa/factors/{factorId}`

| | |
|---|---|
| Thoả yêu cầu | FE-002 · NFR-SEC-01 |
| Xác thực | bắt buộc + **xác thực lại bằng bí mật hiện tại trước mọi thay đổi yếu tố**, kể cả khi phiên còn hiệu lực · Vai trò: chủ tài khoản, chỉ yếu tố của chính mình |
| Idempotent | `POST` không (mỗi lần tạo một yếu tố mới) · `DELETE` có (huỷ lại yếu tố đã huỷ trả 200) |

**Request `POST`:** `method` (enum, phải thuộc `allowedMethods`) · `currentSecret` (string, bắt
buộc). **Request `DELETE`:** `factorId` (path) · `currentSecret` (body, bắt buộc).
**Response 2xx:** `factorId` · `factorStatus` mới · `factorCount` mới. **Không** trả bất kỳ giá trị
khởi tạo yếu tố nào trong tài liệu này — §9 Q6.

| HTTP | Mã nghiệp vụ | Điều kiện phát sinh | Yêu cầu |
|---|---|---|---|
| 401 | `reauth_failed` | `currentSecret` không đúng | NFR-SEC-01 |
| 403 | `factor_not_owned` | `factorId` không thuộc chủ thể của phiên | NFR-SEC-01 |
| 404 | `not_found` | chủ thể ngoài diện bắt buộc MFA | NFR-SEC-01 |
| 409 | `method_not_allowed` | `method` không thuộc `allowedMethods` — chặn **ở server**, không chỉ ẩn ở màn | NFR-SEC-01 |
| 409 | `last_factor_protected` | `DELETE` yếu tố cuối cùng khi chủ thể vẫn thuộc diện bắt buộc — không cho tự hạ mức | NFR-SEC-01 (RFP:809) |
| 423 | `account_locked` | tài khoản đang trong thời gian khoá tạm | NFR-SEC-03 |

**Tác dụng phụ:** yếu tố do nhà cung cấp xác thực giữ; hệ thống chỉ ghi 1 bản ghi log theo §7. Mỗi
lần đăng ký hoặc huỷ yếu tố là một trong 6 loại **hành vi bất thường phải ghi log** của `NFR-SEC-03`.

## 3. Mô hình dữ liệu màn này chạm

| Thực thể | Cột dùng | Ràng buộc thiết kế đòi | Tầng thực thi | Đã có? |
|---|---|---|---|---|
| Tài khoản nội bộ (D-PARTY, RFP:602) | vai trò, trạng thái quyền | vai trò đúng 7 giá trị `TBL-ROLE-01` (RFP:245); chỉ tài khoản đang hoạt động nâng mức được | 1 (CHECK) + 3 | có |
| Tài khoản nội bộ | số lần sai, mốc hết khoá tạm | khoá tạm theo ngưỡng **cấu hình** — NFR-SEC-03 | 3 | có |
| Diện bắt buộc MFA | ánh xạ vai trò → mức bảo mật | khai được theo vai trò; **đổi bằng cấu hình, không sửa mã** | 1 (bảng hoặc cột mới) | **chưa** — §9 Q1 |
| Tài khoản nội bộ | bộ đếm sai riêng cho bước mã | tách khỏi bộ đếm sai bí mật, nếu chốt tách | 1 (cột mới) | **chưa** — §9 Q3 |
| Cấu hình phiên | giới hạn tổng, giới hạn không hoạt động | `NFR-SEC-03` đòi **phải có** timeout | cấu hình hạ tầng | **chưa bật** — §10 |
| Vết thao tác (D-PARTY) | chủ thể, loại thao tác, thời điểm, lý do | chỉ ghi thêm — FR-AUDIT-01 (RFP:710) | 1 + 3 | có |
| Yếu tố xác thực · mã dự phòng | — | **không** lưu ở D-PARTY; nhà cung cấp xác thực giữ | — | có (chưa bật) |

Ràng buộc P0 **"diện bắt buộc MFA khai được theo vai trò"** hiện không có chỗ nào để khai — hạng
mục dữ liệu phải có trước khi thi công, hình dạng phụ thuộc §9 Q1.

## 4. Vòng đời trạng thái

RFP **không** có `FIG-*` cho vòng đời phiên. Màn này chiếm đúng **một nhánh** của sơ đồ phiên ở §4
của `SC-01-dang-nhap.md` — cạnh `Chờ nâng mức → Phiên đủ mức`, cộng một chặng con *Thuộc diện · chưa
có yếu tố* nằm trước nó. Sơ đồ xem ở SC-01; bảng dưới là hợp đồng chuẩn của nhánh, dựng theo
RFP §02-08 (RFP:311).

| Từ | Sự kiện | Đến | Guard | Ai được phép | Mã lỗi khi vi phạm |
|---|---|---|---|---|---|
| Chờ nâng mức | xác thực mã | Phiên đủ mức | yếu tố thuộc chính chủ thể · không đang khoá tạm · chủ thể thuộc diện bắt buộc | chủ tài khoản | 401 `code_rejected` · 403 `factor_not_owned` · 423 `account_locked` |
| Chờ nâng mức | (không có yếu tố) | Thuộc diện · chưa có yếu tố | `factorCount` = 0 — **chặn ở bước nâng mức**, không hiện ô nhập mã | chủ tài khoản | — |
| Thuộc diện · chưa có yếu tố | đăng ký yếu tố | Chờ nâng mức | xác thực lại bằng bí mật hiện tại · `method` thuộc `allowedMethods` | chủ tài khoản | 401 `reauth_failed` · 409 `method_not_allowed` |
| — | huỷ yếu tố cuối | (bị từ chối) | chủ thể còn thuộc diện bắt buộc | chủ tài khoản | 409 `last_factor_protected` |
| Chờ nâng mức | sai mã quá ngưỡng | Đang khoá tạm | số lần sai đạt ngưỡng cấu hình (§9 Q2, Q3) | chủ tài khoản | 423 `account_locked` |
| Phiên đủ mức | vai trò bị đổi | Chờ nâng mức | vai mới thuộc diện bắt buộc — hiệu lực ở **lần điều hướng kế tiếp** của người bị đổi | ROLE-SYS-ADMIN (SC-04) | — |

Guard dễ mất nhất: **cạnh "chưa có yếu tố" phải chặn ở bước nâng mức, không phải nhắc rồi cho đi
tiếp** — bỏ chỗ này thì `NFR-SEC-01` chỉ còn là hình thức vì mọi tài khoản thuộc diện vẫn vào được
bằng một yếu tố duy nhất.

## 5. Quy tắc nghiệp vụ

| Mã | Quy tắc (nguyên văn nguồn) | Thực thi ở đâu | Kiểm bằng gì |
|---|---|---|---|
| `NFR-SEC-01` (RFP:809) | "Bắt buộc **MFA** cho tài khoản quản trị và các role phê duyệt nội bộ." | diện bắt buộc là **dữ liệu cấu hình**, không phải điều kiện cứng trong mã; guard nâng mức đọc diện đó mỗi lần | test: thêm một vai vào diện bằng cấu hình → vai đó bị chặn ở bước nâng mức mà không sửa mã |
| `NFR-SEC-01` nghiệm thu | "Kiểm tra **cấu hình** và kịch bản xác thực" | diện bắt buộc và chính sách phiên phải **đọc được** qua `GET security-settings` — nếu không thì không có gì để kiểm | test: tài khoản thuộc diện chưa đăng ký → `factorStatus` = `bắt buộc · chưa đăng ký` |
| `NFR-SEC-03` (RFP:811) | "Session đăng nhập phải có **timeout**, khóa tạm khi nhập sai nhiều lần, và log các hành vi bất thường." | timeout là cấu hình phiên ở tầng hạ tầng; thời hạn ghi nhớ thiết bị **do server quyết** — nhận từ client là để người dùng tự vô hiệu hoá timeout | test: cờ `rememberDevice` không kèm thời hạn nào từ client; phiên vẫn hết theo cấu hình |
| `NFR-SEC-03` (log) | "log các hành vi bất thường" | 6 loại sự kiện của §7 ghi vào cùng vết thao tác với SC-01 | test: mỗi trong 6 loại sinh đúng 1 bản ghi có `reason` |
| `FR-AUDIT-01` (RFP:710) · RFP §02-08 (RFP:310) | "ghi logical audit cho các hành vi: tạo, sửa, phê duyệt, **lock** và thay đổi quyền" · "lock/unlock tài khoản … đều cần dấu vết kiểm toán" | đăng ký và huỷ yếu tố là *sửa*, khoá tạm là *lock* → cả hai bắt buộc ghi, không phải tuỳ chọn | test: chặn đường ghi log → thao tác trả lỗi và không đổi yếu tố; sai mã đạt ngưỡng → có bản ghi riêng cho lần khoá |

Không có con số nghiệp vụ nào của màn này có nguồn trong RFP — ngưỡng khoá tạm, thời lượng timeout,
thời hạn ghi nhớ thiết bị, số yếu tố tối đa, số mã dự phòng đều → §9.

## 6. Ma trận phân quyền theo thao tác

| Vai trò | `GET security-settings` | `POST mfa/verify` | `POST/DELETE factors` | Đọc thiết lập bảo mật của **người khác** |
|---|---|---|---|---|
| Vai **trong** diện bắt buộc MFA (§9 Q1) | cho phép — chỉ của mình | cho phép | cho phép — chỉ của mình | từ chối |
| Vai **ngoài** diện | 404 `not_found` | 404 `not_found` | 404 `not_found` | từ chối |

- **ROLE-SYS-ADMIN không là ngoại lệ:** vai đó đọc được **trạng thái yếu tố** của tài khoản khác qua
  SC-03/SC-04, nhưng không đọc và không sửa yếu tố của ai — kể cả để gỡ ca mất thiết bị (§9 Q6).
- **Đọc và ghi khác nhau.** Mọi endpoint của màn này **chỉ** phục vụ chủ thể của phiên nên không có
  khái niệm "đọc rộng" ở đây. Phạm vi đọc bảng tài khoản nội bộ (thông tin cá nhân theo RFP §09-06,
  RFP:883) là **đề xuất thiết kế** của bên dự thầu theo RFP §02-08 (RFP:311) và còn `[CHƯA CHỐT]` —
  §9 của SC-03/SC-04. Bản này **không** dựa vào giả định phạm vi đọc che được dữ liệu.
- **Chặn vào trang trả 404, không phải 403** — có chủ đích. Ngoại lệ duy nhất là `factor_not_owned`
  trả 403: chủ thể đã ở trong diện nên sự tồn tại của màn không còn cần che, và 403 ở đây là tín hiệu
  cho vận hành rằng có người thử yếu tố của người khác.
- Không cần maker-checker. `GOV-RULE-01` (RFP:601) chỉ áp cho thay đổi quy tắc/biểu suất.

## 7. Audit và truy vết

| Thao tác | `action` | Ghi gì (before/after/reason) | Yêu cầu RFP |
|---|---|---|---|
| Xác thực yếu tố thành công | `mfa_verified` | chủ thể · thời điểm · yếu tố đã dùng (định danh yếu tố, **không** nội dung) | FR-AUDIT-01 (RFP:710) |
| Sai mã quá ngưỡng | `mfa_code_rejected` | chủ thể · thời điểm · nguồn truy cập · `reason` = nhánh sai cụ thể | NFR-SEC-03 (RFP:811) |
| Đăng ký / huỷ yếu tố | `mfa_enrolled` / `mfa_unenrolled` | chủ thể · thời điểm · `before`/`after` = số yếu tố; `reason` nếu người dùng nhập | FR-AUDIT-01 |
| Dùng mã dự phòng | `mfa_recovery_used` | chủ thể · thời điểm — **không** ghi nội dung mã | NFR-SEC-03 |
| Xác thực từ nguồn lạ | `mfa_unknown_source` | chủ thể · thời điểm · nguồn truy cập | NFR-SEC-03 |
| Phiên kết thúc do timeout | `logout` | chủ thể · thời điểm · `reason` = timeout — cùng `action` với SC-01 | NFR-SEC-03 |
| Tài khoản bị khoá / được mở khoá | `login_locked` / `account_unlocked` | chủ thể · thời điểm · mốc hết khoá | RFP §02-08 (RFP:310) |

Bảy dòng trên là **6 loại hành vi bất thường** mà thiết kế liệt, sau khi gộp các cặp cùng nguồn. Vết
thao tác là chỉ ghi thêm và **không bao giờ** chứa mã, nội dung yếu tố hay giá trị khởi tạo.

## 8. Phi chức năng áp cho màn này

| Mã | Yêu cầu | Ảnh hưởng thiết kế BE |
|---|---|---|
| `NFR-SEC-01` (RFP:809) | MFA cho tài khoản quản trị và role phê duyệt nội bộ | toàn bộ màn tồn tại vì điều khoản này; diện bắt buộc là hạng mục **dữ liệu** phải thêm (§3) |
| `NFR-SEC-03` (RFP:811) | timeout · khoá tạm · log hành vi bất thường | timeout là cấu hình hạ tầng phải bật; 8 `action` của §7; thời hạn ghi nhớ thiết bị không nhận từ client |
| `SEC-IAM-02` (RFP:810) | nêu chính sách MFA cho **người tham gia bên ngoài**, phạm vi và ảnh hưởng thiết bị dùng chung | ngoài phạm vi màn này — nhưng cùng cơ chế nền, nên diện bắt buộc phải khai được cho cả chủ thể ngoài (§9 Q5) |
| `NFR-AVL-01` (RFP:804) | 99,5%/tháng trong khung giờ 02:00–10:00 JST | nhà cung cấp xác thực thành điểm chết mới trên đường vào; cần mã lỗi riêng `factor_provider_unavailable` để phân biệt với mã sai |
| `NFR-OPS-01` (RFP:814) · `NFR-COMP-01` (RFP:817) | giám sát được **sự kiện bảo mật** · hỗ trợ thao tác trên **tablet** tại hiện trường | 6 loại hành vi bất thường phải phát được alert, không chỉ nằm trong log (§9 Q7); phương thức yếu tố được phép phải dùng được trên tablet dùng chung |

## 9. Câu hỏi cho chủ đầu tư

- **Q1 — Vai nào thuộc diện bắt buộc MFA? `[CHƯA CHỐT]`** `NFR-SEC-01` (RFP:809) nói "tài khoản quản
  trị và các role phê duyệt nội bộ", nhưng **RFP không định nghĩa vai nào "có quyền phê duyệt"** —
  `TBL-ROLE-01` (RFP:245) chỉ giao trách nhiệm và thao tác độ nhạy cao. Diện ở khối 1 wireframe
  (ROLE-SYS-ADMIN, ROLE-RULE-ADMIN, ROLE-SETTLEMENT) là **suy luận** từ `GOV-RULE-01` (RFP:601) và
  từ việc lock kỳ — **không phải điều RFP nói**. Cần trước khi code vì diện quyết định hình dạng dữ
  liệu §3 và cả ma trận §6: chọn hẹp thì `NFR-SEC-01` không thoả, chọn rộng thì bốn vai hiện trường
  gánh thêm một bước trong khung giờ 02:00–10:00 JST.
- **Q2 — Thời lượng timeout phiên và thời hạn ghi nhớ thiết bị?** `NFR-SEC-03` (RFP:811) đòi "phải có
  timeout" nhưng **không định lượng**, cả giới hạn tổng và giới hạn không hoạt động. Quá dài thì hở;
  quá ngắn thì bị đăng xuất giữa khung giờ nghiệp vụ mà `NFR-AVL-01` (RFP:804) đặt mục tiêu khả dụng.
- **Q3 — Bộ đếm sai của bước mã dùng chung hay tách khỏi bộ đếm sai bí mật?** `NFR-SEC-03` không tách
  hai loại sai. Dùng chung thì **người đã biết bí mật vẫn khoá được tài khoản nạn nhân bằng mã sai**;
  tách thì cần một cột đếm mới (§3) và một ngưỡng thứ hai. Ngưỡng cả hai loại và số yếu tố tối đa
  cho một tài khoản đều chưa có nguồn.
- **Q4 — Tài khoản thuộc diện mà chưa đăng ký yếu tố nào vào màn này bằng đường nào?** Cửa 404 cho
  "ngoài diện" phải chừa ca này, nếu không thì tài khoản mới cấp không có đường tự đăng ký — chốt
  cùng quy trình cấp tài khoản của SC-03.
- **Q5 — Chính sách MFA cho người tham gia bên ngoài thuộc màn nào?** `SEC-IAM-02` (RFP:810) đòi nêu
  phạm vi áp dụng, ảnh hưởng tới **thiết bị dùng chung** và kế hoạch chuyển đổi; **không có `SC-`
  nào** phủ diện bên ngoài — thiếu phạm vi, không chỉ thiếu một cột.
- **Q6 — Ai chốt tài liệu bảo mật nội bộ, và khi nào?** Bản này cố ý không mô tả cấu hình khoá, cách
  sinh và lưu yếu tố, số lượng và cách phát mã dự phòng, luồng khôi phục khi mất thiết bị — không có
  tài liệu đó thì màn **không dựng được** dù §1–§8 đã đủ, và người mất thiết bị là mất truy cập.
- **Q7 — 6 loại hành vi bất thường có phải phát alert không?** `NFR-SEC-03` chỉ đòi log; `NFR-OPS-01`
  (RFP:814) đòi giám sát được sự kiện bảo mật. Nếu phải alert thì cần kênh và ngưỡng — trùng khoảng
  trống hạ tầng thông báo của SC-28/SC-29.

## 10. Prototype hiện làm khác gì

| Hạng mục | Thiết kế đòi | Prototype làm | Dẫn chứng | Mức |
|---|---|---|---|---|
| Toàn bộ màn | MFA bắt buộc cho diện ở §9 Q1 — NFR-SEC-01 (RFP:809) | không có màn, không có bước nâng mức phiên; MFA của nhà cung cấp xác thực đang tắt | `supabase/config.toml:295-303`; `src/lib/auth/require-role.ts:29-64` | khác có chủ đích — hoãn vì **phạm vi prototype**: các tài khoản demo dùng chung một bí mật thì bật MFA không trình bày được. Đây **không** phải lý do thiết kế; `NFR-SEC-01` vẫn còn hiệu lực |
| Timeout phiên | `NFR-SEC-03` (RFP:811) đòi phiên phải có timeout | cấu hình phiên chưa bật — phiên không tự hết hiệu lực | `supabase/config.toml:271-275` | khác không chủ đích — **P0** |
| Ngưỡng khoá tạm | ngưỡng và thời lượng là **giá trị cấu hình** (§9 Q2) | có khoá tạm nhưng đếm số lần sai liên tiếp; hai hằng số cố định trong mã | `src/lib/auth/lockout.ts:5-19` | cần khách chốt — NFR-SEC-03 không định lượng |
| Bộ đếm sai riêng cho bước mã · nơi khai diện bắt buộc | §9 Q3 · dữ liệu cấu hình đổi không sửa mã (§3) | chỉ có một bộ đếm cho bước bí mật; chưa có cột hay bảng nào để khai diện | `src/lib/auth/lockout.ts:26-42`; `supabase/migrations/20260904090000_core_identity.sql:7-21` | cần khách chốt — NFR-SEC-01 không liệt vai |
| Log hành vi bất thường | 8 `action` của §7 | chỉ có xác thực thất bại và tài khoản bị khoá | `src/app/api/auth/sign-in/route.ts:63,86,126` | khác không chủ đích |
| Phạm vi đọc bảng tài khoản | RBAC cho thông tin cá nhân — RFP §09-06 (RFP:886) | đọc rộng cho mọi vai đang hoạt động; lý do ghi trong migration là `FR-601` — **mã nội bộ của LAB-3, không phải mã yêu cầu của khách** (grep RFP: 0 hit) | `supabase/migrations/20260904090900_rls_core.sql:28-32` | cần khách chốt — ADR-014, trạng thái Đề xuất |

## 11. Dẫn chứng

- RFP:245 — `TBL-ROLE-01`, 7 vai trò và trách nhiệm (**không** giao quyền phê duyệt cho vai nào)
- RFP:310, 311 — §02-08: lock/unlock cần dấu vết; **bên dự thầu đề xuất cơ chế phân tách quyền**
- RFP:601 — `GOV-RULE-01` maker-checker cho biểu suất · RFP:602 — `D-PARTY` · RFP:710 — `FR-AUDIT-01`
- RFP:804, 807, 809, 810, 811, 812, 814, 817 — `NFR-AVL-01`, `NFR-PERF-01`, `NFR-SEC-01`, `SEC-IAM-02`, `NFR-SEC-03`, `NFR-SEC-04`, `NFR-OPS-01`, `NFR-COMP-01`
- RFP:881-888 — §09-06 APPI; **RFP:883** phạm vi thông tin cá nhân; **RFP:886** đòi RBAC bằng chữ
- Feature List `FE-002`, `FE-004` · `docs/lab4/wireframes/screens/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.html`
- `.momorph/specs/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-security-mfa.csv` — đặc tả UI/FE cặp với bản này
- `docs/lab4/spec-be/SC-01-dang-nhap.md` §4 (sơ đồ phiên) · `docs/lab4/spec/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.md` — as-built dùng cho §10
