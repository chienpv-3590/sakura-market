# Design Context - SC-02 Xác thực MFA và thiết lập bảo mật

- Nguồn: ảnh `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat.png` (1280x2061; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-02-xac-thuc-mfa-va-thiet-lap-bao-mat-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 1/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Khối tiêu đề màn | SC-02 · Xác thực MFA và thiết lập bảo mật / FE-002 · FE-004 · nhóm FN-01 · ưu tiên P0 |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 103 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-02 · Xác thực MFA và thiết lập bảo mật |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-002 · FE-004 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách NFR-SEC-01; NFR-SEC-03 · Form · actor: tài khoản quản trị và các vai trò có quyền phê duyệt nội bộ |  | false |  | 26 | 60 | 1026 | 79 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Chưa thi công |  | false |  | 836 | 60 | 912 | 79 |
| 2 |  | img-005 | Khối chú dẫn nền thiết kế và ranh giới tài liệu | Wireframe vẽ theo NFR-SEC-01 và NFR-SEC-03 — cả hai đều là yêu cầu P0 còn hiệu lực. Là màn bảo mật nên chỉ vẽ khung và nhãn. |  | false |  | 26 | 119 | 1026 | 190 |
| 3 |  | img-006 | Khối diện bắt buộc MFA | 1 · Diện bắt buộc MFA — NFR-SEC-01 |  | true | img-007; img-008; img-010 | 26 | 206 | 1026 | 456 |
| 3.1 | 3 | img-007 | Tiêu đề khối diện bắt buộc MFA | 1 · Diện bắt buộc MFA — NFR-SEC-01 |  | false |  | 42 | 222 | 1010 | 239 |
| 3.2 | 3 | img-008 | Bảng diện bắt buộc MFA theo vai trò | Vai trò / Có quyền phê duyệt nội bộ / Thuộc diện bắt buộc MFA |  | true | img-009 | 42 | 250 | 1010 | 394 |
| 3.2.1 | 3.2 | img-009 | Dòng vai trò trong diện bắt buộc (đại diện) | ROLE-SYS-ADMIN / Quản trị tài khoản và phân quyền / Bắt buộc |  | false |  | 43 | 278 | 1010 | 307 |
| 3.3 | 3 | img-010 | Ghi chú diện bắt buộc là suy luận | NFR-SEC-01 nói "tài khoản quản trị và các role phê duyệt nội bộ" nhưng không liệt vai trò. |  | false |  | 42 | 397 | 1010 | 429 |
| 4 |  | img-011 | Khối nâng mức phiên | 2 · Nâng mức phiên — sau khi bí mật xác thực đã đúng ở SC-01 |  | true | img-012; img-013; img-014; img-015; img-016; img-017; img-018 | 26 | 469 | 1026 | 813 |
| 4.1 | 4 | img-012 | Tiêu đề khối nâng mức phiên | 2 · Nâng mức phiên — sau khi bí mật xác thực đã đúng ở SC-01 |  | false |  | 42 | 485 | 1010 | 502 |
| 4.2 | 4 | img-013 | Trường Yếu tố xác thực | Yếu tố xác thực * / Yếu tố đã đăng ký của tài khoản ▾ / Chỉ liệt yếu tố của chính tài khoản đang đăng nhập. |  | false |  | 42 | 513 | 521 | 581 |
| 4.3 | 4 | img-014 | Trường Mã xác thực một lần | Mã xác thực một lần * / ••• ••• / Chỉ chữ số. Việc đối chiếu mã thuộc nhà cung cấp xác thực; không so sánh ở tầng ứng dụng. |  | false |  | 42 | 592 | 521 | 660 |
| 4.4 | 4 | img-015 | Ô Ghi nhớ thiết bị này | Ghi nhớ thiết bị này / ☐ Ghi nhớ thiết bị này / Thời hạn ghi nhớ lấy từ cấu hình server; không nhận từ client. |  | false |  | 42 | 671 | 521 | 755 |
