document.addEventListener("DOMContentLoaded", () => {
  // 1. Khai báo các phần tử DOM
  const selectYear = document.getElementById("select-year");
  const selectMonth = document.getElementById("select-month");
  const transactionList = document.getElementById("transaction-list");
  const tabButtons = document.querySelectorAll(".tab-btn");

  const totalBalanceEl = document.getElementById("total-balance");
  const monthlyCardEl = document.getElementById("monthly-card");
  const monthlyLabelEl = document.getElementById("monthly-label");
  const monthlyTotalEl = document.getElementById("monthly-total");

  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const searchBoxContainer = document.getElementById("searchBoxContainer");

  let currentTab = "thu"; // Tab mặc định ('thu' hoặc 'chi')

  // 2. Thiết lập Tháng/Năm hiện tại
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (selectYear) {
    if (currentYear >= 2026 && currentYear <= 2028) {
      selectYear.value = currentYear.toString();
    } else {
      selectYear.value = "2026";
    }
  }
  if (selectMonth) {
    selectMonth.value = currentMonth.toString();
  }

  // 3. Các hàm bổ trợ
  // Loại bỏ dấu tiếng Việt để tìm kiếm không dấu
  function removeVietnameseTones(str) {
    if (!str) return "";
    str = str.toString().toLowerCase();
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
    return str.trim();
  }

  // Định dạng ngày giờ hiển thị
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

  // Tạo chuỗi ngày giờ đa định dạng phục vụ tìm kiếm
  function getSearchableDateFormats(isoDateString) {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return isoDateString;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return [
      isoDateString,
      `${day}/${month}/${year}`,
      `${day}-${month}-${year}`,
      `${day}/${month}`,
      `${month}/${year}`,
      `${hours}:${minutes}`,
      `${hours}h${minutes}`,
      `thang ${month}`,
      `tháng ${month}`,
    ].join(" ");
  }

  // 4. Tính tổng số dư Quỹ hiện tại (Toàn thời gian)
  function calculateCurrentBalance() {
    if (!totalBalanceEl) return;
    let totalIncome = 0;
    let totalExpense = 0;

    transactionsData.forEach((item) => {
      const num = parseInt(item.amount.toString().replace(/[^0-9]/g, ""));
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

    if (currentBalance < 0) {
      totalBalanceEl.style.color = "#dc2626";
    } else {
      totalBalanceEl.style.color = "#0369a1";
    }
  }

  // 5. Hàm Render danh sách giao dịch chính
  function renderTransactions() {
    const selectedY = selectYear ? parseInt(selectYear.value) : currentYear;
    const selectedM = selectMonth ? parseInt(selectMonth.value) : currentMonth;
    const filterKeyword = searchInput ? searchInput.value : "";
    const cleanKeyword = removeVietnameseTones(filterKeyword);

    // Cập nhật số dư tổng thể
    calculateCurrentBalance();

    // Lọc dữ liệu
    let filtered = transactionsData.filter((item) => {
      const itemDate = new Date(item.datetime);

      // NẾU ĐANG TÌM KIẾM: Tìm trên TOÀN BỘ CẢ THU VÀ CHI + TOÀN BỘ THỜI GIAN
      if (cleanKeyword) {
        const searchTarget = [
          item.id || "",
          item.title || "",
          item.content || "",
          item.amount || "",
          item.type === "thu" ? "thu tiền thu" : "chi tiền chi",
          getSearchableDateFormats(item.datetime),
        ].join(" ");

        const cleanTarget = removeVietnameseTones(searchTarget);
        return cleanTarget.includes(cleanKeyword);
      } else {
        // NẾU KHÔNG TÌM KIẾM: Lọc đúng theo Tab đang chọn + Tháng/Năm chọn
        return (
          item.type === currentTab &&
          itemDate.getFullYear() === selectedY &&
          itemDate.getMonth() + 1 === selectedM
        );
      }
    });

    // Sắp xếp MỚI NHẤT LÊN ĐẦU
    filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    // Cập nhật thẻ thống kê
    if (monthlyCardEl && monthlyLabelEl && monthlyTotalEl) {
      if (cleanKeyword) {
        monthlyCardEl.className = "summary-card monthly-card thu-mode";
        monthlyLabelEl.textContent = `Kết quả tìm kiếm toàn bộ Thu & Chi (${filtered.length})`;

        // Tính tổng chênh lệch của các kết quả tìm kiếm (Thu - Chi)
        let searchBalance = 0;
        filtered.forEach((item) => {
          const num = parseInt(item.amount.toString().replace(/[^0-9]/g, ""));
          if (!isNaN(num)) {
            searchBalance += item.type === "thu" ? num : -num;
          }
        });
        monthlyTotalEl.textContent =
          (searchBalance >= 0 ? "+" : "") +
          searchBalance.toLocaleString("vi-VN") +
          " VNĐ";
      } else {
        if (currentTab === "thu") {
          monthlyCardEl.className = "summary-card monthly-card thu-mode";
          monthlyLabelEl.textContent = `Tổng thu Tháng ${selectedM}/${selectedY}`;
        } else {
          monthlyCardEl.className = "summary-card monthly-card chi-mode";
          monthlyLabelEl.textContent = `Tổng chi Tháng ${selectedM}/${selectedY}`;
        }

        let monthlyTotal = 0;
        filtered.forEach((item) => {
          const num = parseInt(item.amount.toString().replace(/[^0-9]/g, ""));
          if (!isNaN(num)) monthlyTotal += num;
        });
        monthlyTotalEl.textContent =
          monthlyTotal.toLocaleString("vi-VN") + " VNĐ";
      }
    }

    // Xóa danh sách cũ
    transactionList.innerHTML = "";

    if (filtered.length === 0) {
      transactionList.innerHTML = `
        <div class="no-data">
          <i class="fa-regular fa-folder-open fa-2x"></i><br><br>
          ${
            cleanKeyword
              ? `Không tìm thấy khoản thu/chi nào phù hợp với từ khóa "${filterKeyword}"`
              : `Không có khoản ${currentTab === "thu" ? "thu" : "chi"} nào trong Tháng ${selectedM}/${selectedY}`
          }
        </div>`;
      return;
    }

    // Tạo các thẻ Accordion
    filtered.forEach((item) => {
      const { dateStr, timeStr } = formatDateTime(item.datetime);

      const card = document.createElement("div");
      card.className = "transaction-item";

      card.innerHTML = `
        <div class="transaction-header">
          <div class="date-info">
            <span class="date-str">${dateStr}</span>
            <span class="time-str">
              <i class="fa-regular fa-clock"></i> ${timeStr} 
              ${item.id ? `<small style="color:#0284c7; font-weight:600; margin-left:6px;">(#${item.id})</small>` : ""}
            </span>
            <span class="title-preview">${item.title}</span>
          </div>
          <i class="fa-solid fa-chevron-down toggle-icon"></i>
        </div>
        <div class="transaction-body">
          <div class="amount-badge ${item.type}">
            ${item.type === "thu" ? "+ " : "- "} ${item.amount}
          </div>
          
          <div class="content-box">
            <h4>Nội dung chi tiết:</h4>
            <p>${item.content || ""}</p>
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

      // Lắng nghe sự kiện Click thu gọn/mở rộng
      const header = card.querySelector(".transaction-header");
      header.addEventListener("click", () => {
        card.classList.toggle("active");
      });

      transactionList.appendChild(card);
    });
  }

  // 6. Đăng ký sự kiện
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTab = btn.getAttribute("data-tab");

      // Nếu đang tìm kiếm mà bấm đổi Tab -> Tự động xóa từ khóa tìm kiếm
      if (searchInput && searchInput.value) {
        searchInput.value = "";
        if (clearSearchBtn) clearSearchBtn.style.display = "none";
      }

      renderTransactions();
    });
  });

  if (selectYear) selectYear.addEventListener("change", renderTransactions);
  if (selectMonth) selectMonth.addEventListener("change", renderTransactions);

  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      if (searchBoxContainer) {
        searchBoxContainer.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    searchInput.addEventListener("input", () => {
      if (clearSearchBtn)
        clearSearchBtn.style.display = searchInput.value ? "block" : "none";
      renderTransactions();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearSearchBtn.style.display = "none";
      renderTransactions();
      searchInput.focus();
    });
  }

  // Chạy ứng dụng lần đầu
  renderTransactions();
});
