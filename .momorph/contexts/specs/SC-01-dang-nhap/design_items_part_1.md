# Design Context - SC-01 Đăng nhập

- Nguồn: ảnh `.momorph/shots/SC-01-dang-nhap.png` (1280x1892; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-01-dang-nhap-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 1/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Khối tiêu đề màn | SC-01 · Đăng nhập / FE-001 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách FR-IAM-01 |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 103 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-01 · Đăng nhập |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-001 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách FR-IAM-01 · Form · actor: toàn bộ người dùng nội bộ |  | false |  | 26 | 60 | 1026 | 79 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Đã thi công |  | false |  | 553 | 60 | 618 | 79 |
| 2 |  | img-005 | Khối xác thực người dùng nội bộ | 1 · Xác thực người dùng nội bộ — FR-IAM-01 |  | true | img-006; img-007; img-008; img-009; img-010; img-011; img-012 | 26 | 119 | 1026 | 526 |
| 2.1 | 2 | img-006 | Tiêu đề khối xác thực | 1 · Xác thực người dùng nội bộ — FR-IAM-01 |  | false |  | 42 | 135 | 1010 | 152 |
| 2.2 | 2 | img-007 | Vùng nhận diện | Vùng nhận diện — vùng tĩnh, chỉ mang dấu hiệu nhận diện của chợ |  | false |  | 42 | 163 | 449 | 510 |
| 2.3 | 2 | img-008 | Trường Định danh người dùng nội bộ | Định danh người dùng nội bộ * / ten@vi-du.local / Định danh duy nhất trong danh bạ người dùng nội bộ. |  | false |  | 460 | 163 | 1010 | 231 |
| 2.4 | 2 | img-009 | Trường Bí mật xác thực | Bí mật xác thực * / •••••••• / Không hiển thị lại; không ghi vào log; không đi qua URL. |  | false |  | 460 | 242 | 1010 | 310 |
| 2.5 | 2 | img-010 | Trường Ngôn ngữ hiển thị | Ngôn ngữ hiển thị / Tiếng Việt ▾ / VI / JA. Đổi được trước khi đăng nhập; vì đây là cổng vào duy nhất. |  | false |  | 460 | 321 | 1010 | 389 |
| 2.6 | 2 | img-011 | Vùng thông báo lý do | Vùng thông báo lý do / Lý do bị đưa về màn đăng nhập / Chỉ đọc. |  | false |  | 460 | 399 | 1010 | 468 |
| 2.7 | 2 | img-012 | Nút Đăng nhập | Đăng nhập |  | false |  | 460 | 481 | 544 | 510 |
| 3 |  | img-013 | Khối gán vai trò tại thời điểm đăng nhập | 2 · Gán vai trò tại thời điểm đăng nhập — 7 vai trò nội bộ |  | true | img-014; img-015; img-017 | 26 | 539 | 1026 | 875 |
| 3.1 | 3 | img-014 | Tiêu đề khối gán vai trò | 2 · Gán vai trò tại thời điểm đăng nhập — 7 vai trò nội bộ |  | false |  | 42 | 555 | 1010 | 572 |
| 3.2 | 3 | img-015 | Bảng ánh xạ vai trò và khu vực làm việc | Vai trò / Khu vực làm việc được đưa tới ngay sau khi xác thực |  | true | img-016 | 42 | 583 | 1010 | 813 |
