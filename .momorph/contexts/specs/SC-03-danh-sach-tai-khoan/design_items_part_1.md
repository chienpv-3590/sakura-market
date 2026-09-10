# Design Context - SC-03 Danh sách tài khoản

- Nguồn: ảnh `.momorph/shots/SC-03-danh-sach-tai-khoan.png` (1280x1805; deviceScaleFactor=1)
- Toạ độ: `getBoundingClientRect()` thật từ `.momorph/shots/SC-03-danh-sach-tai-khoan-dom-boxes.json`
- Nền thiết kế: Function List + Feature List + RFP. Cơ chế prototype chỉ ở khối đối chiếu.
- targetLanguage: tiếng Việt · `nameJP` tiếng Nhật · `nameTrans` tiếng Anh

- Batch 1/3 (15 item/batch)

| No | parentNo | itemId | itemName | textInItem | iconNameInItem | hasChildren | childIds | startX | startY | endX | endY |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | img-001 | Khối tiêu đề màn | SC-03 · Danh sách tài khoản / FE-003 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách FR-IAM-02 |  | true | img-002; img-003; img-004 | 26 | 22 | 1026 | 103 |
| 1.1 | 1 | img-002 | Tiêu đề màn | SC-03 · Danh sách tài khoản |  | false |  | 26 | 22 | 1026 | 48 |
| 1.2 | 1 | img-003 | Dòng meta truy vết yêu cầu | FE-003 · nhóm FN-01 · ưu tiên P0 · yêu cầu khách FR-IAM-02 · List · actor: quản trị hệ thống (ROLE-SYS-ADMIN) |  | false |  | 26 | 60 | 1026 | 79 |
| 1.3 | 1 | img-004 | Thẻ trạng thái thi công | Chưa thi công |  | false |  | 600 | 60 | 676 | 79 |
| 2 |  | img-005 | Khối chú dẫn nền thiết kế và ranh giới tài liệu | Wireframe vẽ theo FR-IAM-02: cấp; tạm ngừng; mở lại quyền tài khoản và ghi nhận lịch sử thay đổi — yêu cầu P0 còn hiệu lực. Là màn bảo mật nên chỉ vẽ khung và nhãn. |  | false |  | 26 | 119 | 1026 | 172 |
| 3 |  | img-006 | Khối vòng đời quyền tài khoản | 1 · Vòng đời quyền tài khoản — ba chuyển tiếp FR-IAM-02 đòi |  | true | img-007; img-008; img-010 | 26 | 188 | 1026 | 409 |
| 3.1 | 3 | img-007 | Tiêu đề khối vòng đời quyền tài khoản | 1 · Vòng đời quyền tài khoản — ba chuyển tiếp FR-IAM-02 đòi |  | false |  | 42 | 204 | 1010 | 222 |
| 3.2 | 3 | img-008 | Bảng ba chuyển tiếp vòng đời quyền | Chuyển tiếp / Từ / Sang / Bắt buộc kèm |  | true | img-009 | 42 | 233 | 1010 | 347 |
| 3.2.1 | 3.2 | img-009 | Dòng chuyển tiếp vòng đời (đại diện) | Cấp quyền / Chưa có tài khoản / Đang hoạt động / Vai trò · lý do · chủ thể · thời điểm |  | false |  | 43 | 260 | 1010 | 289 |
| 3.3 | 3 | img-010 | Ghi chú khoá tạm là trục độc lập | Khoá tạm là điều kiện độc lập; không phải một trạng thái của vòng đời trên. Đổi vai trò không nằm ở màn này. |  | false |  | 42 | 350 | 1010 | 383 |
| 4 |  | img-011 | Khối bộ lọc | 2 · Bộ lọc — nằm trên bảng |  | true | img-012; img-013; img-014; img-015; img-016 | 26 | 422 | 1026 | 587 |
| 4.1 | 4 | img-012 | Tiêu đề khối bộ lọc | 2 · Bộ lọc — nằm trên bảng |  | false |  | 42 | 438 | 1010 | 455 |
| 4.2 | 4 | img-013 | Bộ lọc Vai trò | Vai trò / Tất cả ▾ / Đúng 7 vai trò nội bộ. Giá trị lạ thì bỏ qua bộ lọc; không báo lỗi hệ thống. |  | false |  | 42 | 466 | 276 | 561 |
| 4.3 | 4 | img-014 | Bộ lọc Quyền tài khoản | Quyền tài khoản / Tất cả ▾ / Tất cả · đang hoạt động · đã tạm ngừng. |  | false |  | 287 | 466 | 521 | 561 |
| 4.4 | 4 | img-015 | Bộ lọc Đang bị khoá tạm | Đang bị khoá tạm / Tất cả ▾ / Trục thứ hai; lọc độc lập với quyền tài khoản. |  | false |  | 532 | 466 | 765 | 561 |
