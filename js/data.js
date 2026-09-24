// Dữ liệu Thu - Chi của lớp
// type: "thu" (Khoản Thu) hoặc "chi" (Khoản Chi)
// datetime: định dạng "YYYY-MM-DDTHH:mm:ss" để tự động sắp xếp mới nhất lên đầu
const transactionsData = [
  // --- CÁC KHOẢN THU ---
  {
    id: "thu-01",
    type: "thu",
    datetime: "2026-09-05T08:00:00",
    title: "Thu quỹ lớp Học kỳ 1 (Đợt 1)",
    content:
      "Thu quỹ đầu năm của 40/40 học sinh trong lớp (mỗi học sinh 300.000 VNĐ).",
    amount: "12.000.000 VNĐ",
    pdfUrl: "assets/2026-09/ke-hoach-thu-quy.jpg",
    receiptUrl: "assets/2026-09/xac-nhan-chuyen-khoan-quy.jpg",
  },
  {
    id: "thu-02",
    type: "thu",
    datetime: "2026-09-15T10:30:00",
    title: "Tiền ủng hộ từ Quỹ Phụ huynh lớp",
    content: "Quỹ Phụ huynh hỗ trợ hoạt động Trung thu và văn nghệ đầu năm.",
    amount: "2.000.000 VNĐ",
    pdfUrl: "",
    receiptUrl: "assets/2026-09/bien-lai-ho-tro.jpg",
  },

  // --- CÁC KHOẢN CHI ---
  {
    id: "chi-01",
    type: "chi",
    datetime: "2026-09-24T14:30:00",
    title: "Mua phấn viết bảng và văn phòng phẩm",
    content:
      "Chi mua 5 hộp phấn trắng không bụi, 2 giẻ lau bảng và 10 bút dạ bảng cho lớp.",
    amount: "180.000 VNĐ",
    pdfUrl: "assets/2026-09/van-ban-01.pdf",
    receiptUrl: "assets/2026-09/bien-lai-01.jpg",
  },
  {
    id: "chi-02",
    type: "chi",
    datetime: "2026-09-24T09:15:00",
    title: "In ấn tài liệu ôn tập học kỳ",
    content: "Chi phí in tài liệu môn Toán và Văn cho 40 học sinh trong lớp.",
    amount: "450.000 VNĐ",
    pdfUrl: "assets/2026-09/van-ban-02.pdf",
    receiptUrl: "assets/2026-09/bien-lai-02.jpg",
  },
  {
    id: "chi-03",
    type: "chi",
    datetime: "2026-09-10T08:00:00",
    title: "Tổ chức Trung Thu cho lớp",
    content: "Chi mua bánh kẹo, hoa quả và trang trí mâm cỗ Trung Thu.",
    amount: "1.200.000 VNĐ",
    pdfUrl: "assets/2026-09/van-ban-03.pdf",
    receiptUrl: "assets/2026-09/bien-lai-03.jpg",
  },
];
