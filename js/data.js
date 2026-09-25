const transactionsData = [
  {
    "id": "260925-125600",
    "type": "thu",
    "datetime": "2026-09-25T12:56:00",
    "title": "Test",
    "content": "Test",
    "amount": "20.000.000.000 VNĐ"
  },
  {
    "id": "260925-000943658",
    "type": "chi",
    "datetime": "2026-09-25T08:21:00",
    "title": "Thanh toán liên hoan Trung Thu (1/2)",
    "content": "Thanh toán tiền trà chanh (10k/cốc)",
    "amount": "420.000 VNĐ",
    "receiptUrl": "assets/2026-09/proof/hfiv04.png"
  },
  {
    "id": "260925-000564454",
    "type": "thu",
    "datetime": "2026-09-25T06:49:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh Nguyenthidoanh gửi tiền mặt vào quỹ lớp",
    "amount": "200.000 VNĐ",
    "receiptUrl": "assets/2026-09/proof/260925-00056445.png"
  },
  {
    "id": "260925-000549657",
    "type": "thu",
    "datetime": "2026-09-25T06:48:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh Hai Nguyen đã gửi tiền mặt vào quỹ lớp",
    "amount": "100.000 VNĐ",
    "receiptUrl": "assets/2026-09/proof/260925-000549657.png"
  },
  {
    "id": "260925-000508961",
    "type": "thu",
    "datetime": "2026-09-25T06:40:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh Trần Thị Hòa đã gửi tiền mặt vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "receiptUrl": "assets/2026-09/proof/260925-000508961.png"
  },
  {
    "id": "260924-005130341",
    "type": "thu",
    "datetime": "2026-09-24T22:32:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NGUYEN THI NGUYET đã gửi tiền quỹ lớp",
    "amount": "100.000 VNĐ",
    "receiptUrl": "assets/2026-09/proof/260924-005130341.png"
  },
  {
    "id": "260924-005062661",
    "type": "thu",
    "datetime": "2026-09-24T22:18:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh MAI THI NINH đã gửi tiền quỹ lớp",
    "amount": "100.000 VNĐ",
    "receiptUrl": "assets/2026-09/proof/260924-005062661.png"
  },
  {
    "id": "260912-004497604",
    "type": "thu",
    "datetime": "2026-09-12T21:18:00",
    "title": "Quỹ lớp đầu tiên",
    "content": "Quỹ lớp đầu tiên",
    "amount": "2.000.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_184925_Zalopay.png"
  },
  {
    "id": "260918-000916667",
    "type": "chi",
    "datetime": "2026-09-18T08:37:00",
    "title": "Đóng tiền tăm ủng hộ người mù",
    "content": "Mỗi học sinh là 20k với 5 gói tăm (Không vận động đối với các học sinh hoàn cảnh khó khăn, gia đình hộ nghèo – cận nghèo…)",
    "amount": "780.000 VNĐ",
    "pdfUrl": "assets/2026-09/doc/Tăm tre 2026.pdf",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_184955_Zalopay.png"
  },
  {
    "id": "260921-002717469",
    "type": "chi",
    "datetime": "2026-09-21T15:58:00",
    "title": "Thay máy đồng hồ",
    "content": "Một máy đồng hồ kim trôi 60k, pin AA Panasonic 4k.",
    "amount": "64.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185052_Zalopay.png"
  },
  {
    "id": "260922-002696501",
    "type": "chi",
    "datetime": "2026-09-22T16:04:00",
    "title": "Mua cốc cho lớp",
    "content": "Mỗi chiếc cốc là 10k",
    "amount": "20.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185123_Zalopay.png"
  },
  {
    "id": "260923-000918833",
    "type": "chi",
    "datetime": "2026-09-23T08:51:00",
    "title": "Đóng tiền điều hòa tháng 9/2026",
    "content": "Chi tiết trong phần \"Văn bản chỉ đạo\" ",
    "amount": "248.300 VNĐ",
    "pdfUrl": "assets/2026-09/doc/tien-dieu-hoa-t9.jpg",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185158_Zalopay.png"
  },
  {
    "id": "260924-002985441",
    "type": "thu",
    "datetime": "2026-09-24T16:23:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh PHAM DUC HANH đã gửi tiền quỹ lớp.",
    "amount": "300.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185226_Zalopay.png"
  },
  {
    "id": "260924-003030988",
    "type": "thu",
    "datetime": "2026-09-24T16:30:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NGUYEN QUOC TRUONG đã gửi tiền quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185344_Zalopay.png"
  },
  {
    "id": "260924-003025812",
    "type": "thu",
    "datetime": "2026-09-24T16:33:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh DINH THI HUONG đã gửi tiền quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185429_Zalopay.png"
  },
  {
    "id": "260924-003126841",
    "type": "thu",
    "datetime": "2026-09-24T16:44:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh Nguyenthidoanh đã gửi tiền mặt vào quỹ lớp.",
    "amount": "200.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185455_Zalopay.png"
  },
  {
    "id": "260924-003099405",
    "type": "thu",
    "datetime": "2026-09-24T16:45:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh VU THI LE đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185518_Zalopay.png"
  },
  {
    "id": "260924-003146004",
    "type": "thu",
    "datetime": "2026-09-24T16:48:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh DAO THI NHINH đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185549_Zalopay.png"
  },
  {
    "id": "260924-003187184",
    "type": "thu",
    "datetime": "2026-09-24T16:59:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh TRIEU THI LIEN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185616_Zalopay.png"
  },
  {
    "id": "260924-003317635",
    "type": "thu",
    "datetime": "2026-09-24T17:22:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NGUYEN DUC TRA đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185640_Zalopay.png"
  },
  {
    "id": "260924-003337172",
    "type": "thu",
    "datetime": "2026-09-24T17:24:00",
    "title": "Học sinh gửi tiền quỹ lớp",
    "content": "Bạn Nguyễn Văn Đạt đã gửi tiền vào quỹ lớp.",
    "amount": "10.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185739_Zalopay.png"
  },
  {
    "id": "260924-003366088",
    "type": "thu",
    "datetime": "2026-09-24T17:25:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh VU THI THU đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185640_Zalopay.png"
  },
  {
    "id": "260924-003490368",
    "type": "thu",
    "datetime": "2026-09-24T17:45:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh LE VAN QUY đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185845_Zalopay.png"
  },
  {
    "id": "260924-003564791",
    "type": "thu",
    "datetime": "2026-09-24T17:59:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh Nguyen Khac Chinh đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_185933_Zalopay.png"
  },
  {
    "id": "260924-003573650",
    "type": "thu",
    "datetime": "2026-09-24T18:03:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh TONG THI KHUYEN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_190047_Zalopay.png"
  },
  {
    "id": "260924-003620309",
    "type": "thu",
    "datetime": "2026-09-24T18:06:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh LE VAN CUONG đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_190113_Zalopay.png"
  },
  {
    "id": "260924-003690182",
    "type": "thu",
    "datetime": "2026-09-24T18:18:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh BUI THI THUY đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_190134_Zalopay.png"
  },
  {
    "id": "260924-003905091",
    "type": "thu",
    "datetime": "2026-09-24T18:56:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh LE THI PHAN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_190255_Zalopay.png"
  },
  {
    "id": "260924-003932648",
    "type": "thu",
    "datetime": "2026-09-24T18:59:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NGUYEN THI DIU đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_190323_Zalopay.png"
  },
  {
    "id": "260924-004022528",
    "type": "thu",
    "datetime": "2026-09-24T19:14:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NGUYEN THI VAN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_191440_Zalopay.png"
  },
  {
    "id": "260924-004342192",
    "type": "thu",
    "datetime": "2026-09-24T20:02:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NINH THI KHOAN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_200324_Zalopay.png"
  },
  {
    "id": "260924-004539433",
    "type": "thu",
    "datetime": "2026-09-24T20:40:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh NGUYEN THI VAN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_204134_Zalopay.png"
  },
  {
    "id": "260924-004660269",
    "type": "thu",
    "datetime": "2026-09-24T20:57:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh PHAM THI DOAN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_210043_Zalopay.png"
  },
  {
    "id": "260924-004687039",
    "type": "thu",
    "datetime": "2026-09-24T21:04:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh TRAN THI DIU đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_210537_Zalopay.png"
  },
  {
    "id": "260924-004864412",
    "type": "thu",
    "datetime": "2026-09-24T21:35:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh LE THI HA đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_213739_Zalopay.png"
  },
  {
    "id": "260924-004851991",
    "type": "thu",
    "datetime": "2026-09-24T21:38:00",
    "title": "Phụ huynh gửi tiền quỹ lớp",
    "content": "Phụ huynh PHAM THI THUAN đã gửi tiền vào quỹ lớp.",
    "amount": "100.000 VNĐ",
    "pdfUrl": "",
    "receiptUrl": "assets/2026-09/proof/Screenshot_20260924_214116_Zalopay.png"
  }
];
