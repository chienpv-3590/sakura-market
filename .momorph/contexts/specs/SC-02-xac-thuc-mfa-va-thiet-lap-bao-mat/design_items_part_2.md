# Design Context - SC-02 Xác thực MFA và thiết lập bảo mật

- Nguồn: ảnh `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.png` (1280x2061; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 2/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 4.5 | 4 | img-016 | Nút Xác thực | Xác thực |  | false |  | 42 | 768 | 114 | 797 |
| 4.6 | 4 | img-017 | Nút Đăng xuất | Đăng xuất |  | false |  | 117 | 768 | 197 | 797 |
| 4.7 | 4 | img-018 | Vùng cố ý để trống | Vùng cố ý để trống — không vẽ QR; không vẽ chuỗi khởi tạo yếu tố; không vẽ danh sách mã dự phòng. |  | false |  | 532 | 513 | 1010 | 797 |
| 5 |  | img-019 | Khối thiết lập bảo mật của chính tài khoản | 3 · Thiết lập bảo mật của chính tài khoản — FE-002 và FE-004 |  | true | img-020; img-021; img-022; img-023; img-024; img-025; img-026; img-027; img-028; img-029 | 26 | 826 | 1026 | 1201 |
| 5.1 | 5 | img-020 | Tiêu đề khối thiết lập bảo mật | 3 · Thiết lập bảo mật của chính tài khoản — FE-002 và FE-004 |  | false |  | 42 | 842 | 1010 | 859 |
| 5.2 | 5 | img-021 | Trường Trạng thái yếu tố xác thực (chỉ đọc) | Trạng thái yếu tố xác thực / Đã đăng ký · 1 yếu tố / Thuộc diện bắt buộc mà chưa đăng ký thì phải hiện rõ là chưa thoả NFR-SEC-01. |  | false |  | 42 | 870 | 521 | 938 |
| 5.3 | 5 | img-022 | Trường Bí mật xác thực hiện tại | Bí mật xác thực hiện tại * / •••••••• / Xác thực lại trước mọi thay đổi yếu tố; kể cả khi phiên đang còn hiệu lực. |  | false |  | 42 | 949 | 521 | 1017 |
| 5.4 | 5 | img-023 | Trường Đăng ký yếu tố mới | Đăng ký yếu tố mới * / Phương thức đang được cho phép ▾ / Phương thức ngoài danh sách cho phép thì từ chối ở server; không chỉ ẩn ở màn. |  | false |  | 42 | 1028 | 521 | 1096 |
| 5.5 | 5 | img-024 | Trường Mã dự phòng (chỉ đọc) | Mã dự phòng / Còn hiệu lực / Chỉ hiện còn hay hết — không bao giờ hiện nội dung mã; kể cả cho chính chủ. |  | false |  | 42 | 1107 | 521 | 1175 |
| 5.6 | 5 | img-025 | Trường Timeout phiên (chỉ đọc) | Timeout phiên / Theo cấu hình: giới hạn tổng và giới hạn không hoạt động / NFR-SEC-03 đòi phải có timeout; thời lượng do khách chốt. |  | false |  | 532 | 870 | 1010 | 955 |
| 5.7 | 5 | img-026 | Trường Trạng thái khoá tạm (chỉ đọc) | Trạng thái khoá tạm / Không bị khoá / Sai quá ngưỡng cấu hình thì khoá tạm; ngưỡng và thời lượng là giá trị cấu hình. |  | false |  | 532 | 965 | 1010 | 1034 |
| 5.8 | 5 | img-027 | Trường Hành vi bất thường phải ghi log (chỉ đọc) | Hành vi bất thường phải ghi log / Chỉ đọc — tra cứu ở SC-30 / Sai mã quá ngưỡng · đăng ký hoặc huỷ yếu tố · dùng mã dự phòng · xác thực từ nguồn lạ · phiên kết thúc do timeout · tài khoản bị khoá hoặc được mở khoá. |  | false |  | 532 | 1044 | 1010 | 1129 |
| 5.9 | 5 | img-028 | Nút Lưu thiết lập | Lưu thiết lập |  | false |  | 532 | 1142 | 623 | 1171 |
| 5.10 | 5 | img-029 | Nút Huỷ một yếu tố | Huỷ một yếu tố |  | false |  | 627 | 1142 | 734 | 1171 |
| 6 |  | img-030 | Khối trạng thái màn | Trạng thái |  | true | img-031; img-032 | 26 | 1214 | 1026 | 1485 |
