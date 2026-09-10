# Design Context - SC-04 Chi tiết tài khoản và lịch sử quyền

- Nguồn: ảnh `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen.png` (1280x1823; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-04-chi-tiet-tai-khoan-va-lich-su-quyen-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 1/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Khối tiêu đề màn | SC-04 · Chi tiết tài khoản và lịch sử quyền / FE-003 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách FR-IAM-02 |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 103 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-04 · Chi tiết tài khoản và lịch sử quyền |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-003 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách FR-IAM-02 · Detail · actor: quản trị hệ thống (ROLE-SYS-ADMIN) |  | false |  | 26 | 60 | 1026 | 79 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Chưa thi công |  | false |  | 613 | 60 | 688 | 79 |
| 2 |  | img-005 | Khối chú dẫn ràng buộc hiển thị before/after | Nghiệm thu nguyên văn: "mọi thay đổi quyền đều có before/after; chủ thể thực hiện và timestamp". Đây là yêu cầu hiển thị; không phải yêu cầu lưu trữ ngầm. |  | false |  | 26 | 119 | 1026 | 190 |
| 3 |  | img-006 | Khối thông tin tài khoản và thay đổi quyền | 1 · Thông tin tài khoản và thay đổi quyền |  | true | img-007; img-008; img-009; img-010; img-011; img-012; img-013; img-014; img-015; img-016; img-017; img-018; img-019 | 26 | 206 | 1026 | 736 |
| 3.1 | 3 | img-007 | Tiêu đề khối thông tin tài khoản | 1 · Thông tin tài khoản và thay đổi quyền |  | false |  | 42 | 222 | 1010 | 239 |
| 3.2 | 3 | img-008 | Trường Định danh người dùng nội bộ (chỉ đọc) | Định danh người dùng nội bộ / nhanvien-b@vi-du.local / Chỉ đọc. Đổi định danh là luồng của nhà cung cấp xác thực; không phải thay đổi quyền. |  | false |  | 42 | 250 | 521 | 335 |
| 3.3 | 3 | img-009 | Trường Tên hiển thị | Tên hiển thị / Nhân viên B / Không bắt buộc. Sửa tên hiển thị không phải thay đổi quyền → không sinh dòng lịch sử quyền; chỉ vào audit chung (FR-AUDIT-01). |  | false |  | 42 | 345 | 521 | 430 |
| 3.4 | 3 | img-010 | Trường Vai trò | Vai trò * / ROLE-INTAKE ▾ / Đúng 7 vai trò nội bộ. Đổi vai trò là thay đổi quyền → bắt buộc sinh dòng before/after. |  | false |  | 42 | 440 | 521 | 509 |
| 3.5 | 3 | img-011 | Trường Quyền tài khoản | Quyền tài khoản * / ◉ Đang hoạt động · ○ Đã tạm ngừng / Hai chuyển tiếp còn lại của FR-IAM-02 (tạm ngừng · mở lại) nằm ở đây. |  | false |  | 42 | 519 | 521 | 604 |
| 3.6 | 3 | img-012 | Trường Lý do thay đổi | Lý do thay đổi * / Bắt buộc — không có lý do thì không ghi thay đổi / Vào dòng lịch sử quyền; không vào bản ghi tài khoản. FR-AUDIT-01 đòi reason cho mọi thay đổi quyền. |  | false |  | 42 | 614 | 521 | 710 |
| 3.7 | 3 | img-013 | Trường Ngày cấp quyền (chỉ đọc) | Ngày cấp quyền / 2026-02-11 / Chỉ đọc. Mốc đầu của lịch sử ở khối 2. |  | false |  | 532 | 250 | 1010 | 319 |
| 3.8 | 3 | img-014 | Trường Khoá tạm (chỉ đọc) | Khoá tạm / Đang khoá · hết khoá lúc 09:29 / Chỉ đọc; trục độc lập với quyền tài khoản (NFR-SEC-03). Mở khoá tạm không phải thay đổi quyền nhưng vẫn để lại dấu vết. |  | false |  | 532 | 329 | 1010 | 414 |
| 3.9 | 3 | img-015 | Trường Yếu tố xác thực (chỉ đọc) | Yếu tố xác thực / Không thuộc diện bắt buộc / Chỉ đọc; ba giá trị: không thuộc diện · bắt buộc và đã đăng ký · bắt buộc mà chưa đăng ký (NFR-SEC-01; nguồn ở SC-02). |  | false |  | 532 | 424 | 1010 | 509 |
