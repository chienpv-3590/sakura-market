# Design Context - SC-02 Xác thực MFA và thiết lập bảo mật

- Nguồn: ảnh `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.png` (1280x2061; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 3/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6.1 | 6 | img-031 | Tiêu đề khối trạng thái màn | Trạng thái |  | false |  | 42 | 1230 | 1010 | 1247 |
| 6.2 | 6 | img-032 | Lưới thẻ trạng thái màn | Thuộc diện chưa có yếu tố / Chờ nâng mức phiên / Mã không hợp lệ / Bị khoá tạm / Phiên hết hiệu lực / Vai trò đổi giữa phiên / Huỷ yếu tố cuối bị từ chối / Ngoài diện bắt buộc |  | true | img-033 | 42 | 1258 | 1010 | 1469 |
| 6.2.1 | 6.2 | img-033 | Thẻ trạng thái màn (đại diện) | Thuộc diện; chưa có yếu tố — Chặn ở bước nâng mức phiên: chỉ cho đăng ký yếu tố hoặc đăng xuất; không có ô nhập mã. |  | false |  | 42 | 1258 | 277 | 1368 |
| 7 |  | img-034 | Khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | true | img-035; img-036 | 26 | 1498 | 1026 | 1905 |
| 7.1 | 7 | img-035 | Tiêu đề khối đối chiếu prototype | ĐỐI CHIẾU PROTOTYPE |  | false |  | 42 | 1514 | 1010 | 1531 |
| 7.2 | 7 | img-036 | Bảng đối chiếu thiết kế và prototype | Thiết kế đòi / Prototype làm / Mức |  | true | img-037 | 42 | 1542 | 1010 | 1889 |
| 7.2.1 | 7.2 | img-037 | Dòng đối chiếu kèm thẻ mức lệch (đại diện) | MFA bắt buộc cho tài khoản quản trị và role phê duyệt (NFR-SEC-01) / Không có màn; không có bước nâng mức phiên / khác có chủ đích — hoãn vì lý do phạm vi prototype |  | false |  | 43 | 1570 | 1010 | 1636 |
| 8 |  | img-038 | Khối ghi chú phân quyền và yêu cầu khách | Phân quyền: chỉ vai trò thuộc diện bắt buộc MFA vào được; vai trò ngoài diện nhận 404. |  | false |  | 26 | 1920 | 1026 | 2039 |
