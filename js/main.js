document.addEventListener("DOMContentLoaded", () => {
  const selectYear = document.getElementById("select-year");
  const selectMonth = document.getElementById("select-month");
  const transactionList = document.getElementById("transaction-list");
  const tabButtons = document.querySelectorAll(".tab-btn");

  // Đăng ký các phần tử bảng thống kê
  const totalBalanceEl = document.getElementById("total-balance");
  const monthlyCardEl = document.getElementById("monthly-card");
  const monthlyLabelEl = document.getElementById("monthly-label");
  const monthlyTotalEl = document.getElementById("monthly-total");

  let currentTab = "thu"; // Tab mặc định

  // 1. Tự động chọn Tháng/Năm hiện tại
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (currentYear >= 2026 && currentYear <= 2027) {
    selectYear.value = currentYear.toString();
  } else {
    selectYear.value = "2026";
  }
  selectMonth.value = currentMonth.toString();

  // 2. Định dạng ngày giờ
  function formatDateTime(isoString) {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return {
      dateStr: `Ngày ${day}/${month}/${year}`,
      timeStr: `${hours}:${minutes}`,
    };
  }

  // 3. TÍNH QUỸ LỚP HIỆN TẠI (TỔNG THU TOÀN BỘ - TỔNG CHI TOÀN BỘ)
  function calculateCurrentBalance() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactionsData.forEach((item) => {
      const num = parseInt(item.amount.replace(/[^0-9]/g, ""));
      if (!isNaN(num)) {
        if (item.type === "thu") {
          totalIncome += num;
        } else if (item.type === "chi") {
          totalExpense += num;
        }
      }
    });

    const currentBalance = totalIncome - totalExpense;
    totalBalanceEl.textContent =
      currentBalance.toLocaleString("vi-VN") + " VNĐ";

    // Đổi màu chữ nếu quỹ âm
    if (currentBalance < 0) {
      totalBalanceEl.style.color = "#dc2626";
    } else {
      totalBalanceEl.style.color = "#0369a1";
    }
  }

  // 4. RENDER DANH SÁCH & TỔNG PHÁT SINH TRONG THÁNG
  function renderTransactions() {
    const selectedY = parseInt(selectYear.value);
    const selectedM = parseInt(selectMonth.value);

    // Cập nhật số dư Quỹ toàn thời gian
    calculateCurrentBalance();

    // Lọc theo Tab (Thu/Chi) và Tháng/Năm chọn
    let filtered = transactionsData.filter((item) => {
      const itemDate = new Date(item.datetime);
      return (
        item.type === currentTab &&
        itemDate.getFullYear() === selectedY &&
        itemDate.getMonth() + 1 === selectedM
      );
    });

    // Sắp xếp MỚI NHẤT LÊN ĐẦU
    filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    // Cập nhật thẻ thống kê Tháng
    if (currentTab === "thu") {
      monthlyCardEl.className = "summary-card monthly-card thu-mode";
      monthlyLabelEl.textContent = `Tổng thu Tháng ${selectedM}/${selectedY}`;
    } else {
      monthlyCardEl.className = "summary-card monthly-card chi-mode";
      monthlyLabelEl.textContent = `Tổng chi Tháng ${selectedM}/${selectedY}`;
    }

    // Tính tổng tiền trong tháng đang chọn
    let monthlyTotal = 0;
    filtered.forEach((item) => {
      const num = parseInt(item.amount.replace(/[^0-9]/g, ""));
      if (!isNaN(num)) monthlyTotal += num;
    });
    monthlyTotalEl.textContent = monthlyTotal.toLocaleString("vi-VN") + " VNĐ";

    // Clear danh sách cũ
    transactionList.innerHTML = "";

    if (filtered.length === 0) {
      transactionList.innerHTML = `
                <div class="no-data">
                    <i class="fa-regular fa-folder-open fa-2x"></i><br><br>
                    Không có khoản ${currentTab === "thu" ? "thu" : "chi"} nào trong Tháng ${selectedM}/${selectedY}
                </div>`;
      return;
    }

    // Tạo danh sách thẻ Accordion
    filtered.forEach((item) => {
      const { dateStr, timeStr } = formatDateTime(item.datetime);

      const card = document.createElement("div");
      card.className = "transaction-item";

      card.innerHTML = `
                <div class="transaction-header">
                    <div class="date-info">
                        <span class="date-str">${dateStr}</span>
                        <span class="time-str"><i class="fa-regular fa-clock"></i> ${timeStr}</span>
                        <span class="title-preview">${item.title}</span>
                    </div>
                    <i class="fa-solid fa-chevron-down toggle-icon"></i>
                </div>
                <div class="transaction-body">
                    <div class="amount-badge ${item.type}">
                        ${item.type === "thu" ? "+" : "-"} ${item.amount}
                    </div>
                    
                    <div class="content-box">
                        <h4>Nội dung chi tiết:</h4>
                        <p>${item.content}</p>
                    </div>

                    ${
                      item.pdfUrl
                        ? `
                        <a href="doc-viewer.html?file=${encodeURIComponent(item.pdfUrl)}" target="_blank" class="btn-pdf">
                            <i class="fa-solid ${item.pdfUrl.toLowerCase().endsWith(".pdf") ? "fa-file-pdf" : "fa-file-image"}"></i> Văn bản chỉ đạo
                        </a>
                    `
                        : ""
                    }

                    ${
                      item.receiptUrl
                        ? `
                        <div class="receipt-box">
                            <h4>Biên lai / Chứng từ:</h4>
                            <img src="${item.receiptUrl}" alt="Biên lai chứng từ" class="receipt-img" loading="lazy">
                        </div>
                    `
                        : ""
                    }
                </div>
            `;

      // Bắt sự kiện Click thu gọn/mở rộng
      const header = card.querySelector(".transaction-header");
      header.addEventListener("click", () => {
        card.classList.toggle("active");
      });

      transactionList.appendChild(card);
    });
  }

  // 5. Lắng nghe chuyển Tab & Bộ lọc
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.getAttribute("data-tab");
      renderTransactions();
    });
  });

  selectYear.addEventListener("change", renderTransactions);
  selectMonth.addEventListener("change", renderTransactions);

  // Render ban đầu
  renderTransactions();
});
