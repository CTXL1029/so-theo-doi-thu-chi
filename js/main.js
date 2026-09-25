function initApp() {
  // --------------------------------------------------------
  // 1. Xử lý Pop-up Thông báo
  // --------------------------------------------------------
  const noticeModal = document.getElementById("noticeModal");
  const closeNoticeBtn = document.getElementById("closeNoticeBtn");
  const dontShowAgain = document.getElementById("dontShowAgain");

  if (noticeModal && closeNoticeBtn && dontShowAgain) {
    const isHidden = localStorage.getItem("hide_realtime_notice");
    if (!isHidden) {
      setTimeout(() => {
        noticeModal.classList.add("active");
      }, 300);
    }
    closeNoticeBtn.addEventListener("click", () => {
      if (dontShowAgain.checked) {
        localStorage.setItem("hide_realtime_notice", "true");
      }
      noticeModal.classList.remove("active");
    });
  }

  // --------------------------------------------------------
  // 2. Khai báo các phần tử DOM cho tính năng chính
  // --------------------------------------------------------
  const selectType = document.getElementById("select-type");
  const selectYear = document.getElementById("select-year");
  const selectMonth = document.getElementById("select-month");
  const transactionList = document.getElementById("transaction-list");

  const totalBalanceEl = document.getElementById("total-balance");
  const monthlyCardEl = document.getElementById("monthly-card");
  const monthlyLabelEl = document.getElementById("monthly-label");
  const monthlyTotalEl = document.getElementById("monthly-total");

  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const searchBoxContainer = document.getElementById("searchBoxContainer");

  // --------------------------------------------------------
  // 3. Thiết lập Tháng/Năm hiện tại
  // --------------------------------------------------------
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

  // --------------------------------------------------------
  // 4. Các hàm bổ trợ
  // --------------------------------------------------------
  function removeVietnameseTones(str) {
    if (!str) return "";
    str = str.toString().toLowerCase();
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
    return str.trim();
  }

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

  // --------------------------------------------------------
  // 5. Tính tổng số dư Quỹ hiện tại (Toàn thời gian)
  // --------------------------------------------------------
  function calculateCurrentBalance() {
    if (!totalBalanceEl) return;
    let totalIncome = 0;
    let totalExpense = 0;

    if (typeof transactionsData !== "undefined") {
      transactionsData.forEach((item) => {
        const num = parseInt(item.amount.toString().replace(/[^0-9]/g, ""));
        if (!isNaN(num)) {
          if (item.type === "thu") totalIncome += num;
          else if (item.type === "chi") totalExpense += num;
        }
      });
    }

    const currentBalance = totalIncome - totalExpense;
    totalBalanceEl.textContent =
      currentBalance.toLocaleString("vi-VN") + " VNĐ";
    totalBalanceEl.style.color = currentBalance < 0 ? "#dc2626" : "#0369a1";
  }

  // --------------------------------------------------------
  // 6. Hàm Render danh sách giao dịch chính
  // --------------------------------------------------------
  function renderTransactions() {
    if (typeof transactionsData === "undefined") return;

    const selectedY = selectYear ? parseInt(selectYear.value) : currentYear;
    const selectedM = selectMonth ? parseInt(selectMonth.value) : currentMonth;
    const typeFilter = selectType ? selectType.value : "all"; // all, thu, chi
    const filterKeyword = searchInput ? searchInput.value : "";
    const cleanKeyword = removeVietnameseTones(filterKeyword);

    // Cập nhật số dư tổng thể
    calculateCurrentBalance();

    // Lọc dữ liệu
    let filtered = transactionsData.filter((item) => {
      const itemDate = new Date(item.datetime);

      // NẾU ĐANG TÌM KIẾM:
      if (cleanKeyword) {
        const searchTarget = [
          item.id || "",
          item.title || "",
          item.content || "",
          item.amount || "",
          item.type === "thu" ? "thu tiền thu" : "chi tiền chi",
          getSearchableDateFormats(item.datetime),
        ].join(" ");

        return removeVietnameseTones(searchTarget).includes(cleanKeyword);
      } else {
        // NẾU KHÔNG TÌM KIẾM: Lọc theo Bộ Lọc Mới
        const typeMatch = typeFilter === "all" || item.type === typeFilter;
        return (
          typeMatch &&
          itemDate.getFullYear() === selectedY &&
          itemDate.getMonth() + 1 === selectedM
        );
      }
    });

    // Sắp xếp MỚI NHẤT LÊN ĐẦU
    filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    // Cập nhật thẻ thống kê Tháng (hoặc theo kết quả tìm kiếm)
    if (monthlyCardEl && monthlyLabelEl && monthlyTotalEl) {
      if (cleanKeyword) {
        monthlyCardEl.className = "summary-card monthly-card thu-mode";
        monthlyLabelEl.textContent = `Kết quả tìm kiếm (${filtered.length})`;

        let searchBalance = 0;
        filtered.forEach((item) => {
          const num = parseInt(item.amount.toString().replace(/[^0-9]/g, ""));
          if (!isNaN(num)) {
            searchBalance += item.type === "thu" ? num : -num;
          }
        });
        monthlyTotalEl.textContent =
          (searchBalance > 0 ? "+" : "") +
          searchBalance.toLocaleString("vi-VN") +
          " VNĐ";
      } else {
        let monthlyTotal = 0;

        if (typeFilter === "thu") {
          monthlyCardEl.className = "summary-card monthly-card thu-mode";
          monthlyLabelEl.textContent = `Tổng thu Tháng ${selectedM}/${selectedY}`;
          filtered.forEach((i) => {
            const num = parseInt(i.amount.toString().replace(/[^0-9]/g, ""));
            if (!isNaN(num)) monthlyTotal += num;
          });
          monthlyTotalEl.textContent =
            "+" + monthlyTotal.toLocaleString("vi-VN") + " VNĐ";
        } else if (typeFilter === "chi") {
          monthlyCardEl.className = "summary-card monthly-card chi-mode";
          monthlyLabelEl.textContent = `Tổng chi Tháng ${selectedM}/${selectedY}`;
          filtered.forEach((i) => {
            const num = parseInt(i.amount.toString().replace(/[^0-9]/g, ""));
            if (!isNaN(num)) monthlyTotal += num;
          });
          monthlyTotalEl.textContent =
            "-" + monthlyTotal.toLocaleString("vi-VN") + " VNĐ";
        } else {
          // TH Loại: "Tất cả" -> Tính Biến động
          monthlyLabelEl.textContent = `Biến động Tháng ${selectedM}/${selectedY}`;
          filtered.forEach((i) => {
            const num = parseInt(i.amount.toString().replace(/[^0-9]/g, ""));
            if (!isNaN(num)) monthlyTotal += i.type === "thu" ? num : -num;
          });

          monthlyCardEl.className =
            monthlyTotal >= 0
              ? "summary-card monthly-card thu-mode"
              : "summary-card monthly-card chi-mode";
          monthlyTotalEl.textContent =
            (monthlyTotal > 0 ? "+" : "") +
            monthlyTotal.toLocaleString("vi-VN") +
            " VNĐ";
        }
      }
    }

    if (!transactionList) return;

    // Xóa danh sách cũ
    transactionList.innerHTML = "";

    if (filtered.length === 0) {
      transactionList.innerHTML = `
        <div class="no-data">
          <i class="fa-regular fa-folder-open fa-2x"></i><br><br>
          ${
            cleanKeyword
              ? `Không tìm thấy khoản thu/chi nào phù hợp với từ khóa "${filterKeyword}"`
              : `Không có giao dịch nào phù hợp trong Tháng ${selectedM}/${selectedY}`
          }
        </div>`;
      return;
    }

    // Tạo các thẻ Accordion (Đã phân màu viền theo item.type)
    filtered.forEach((item) => {
      const { dateStr, timeStr } = formatDateTime(item.datetime);

      const card = document.createElement("div");
      // Add class "thu" or "chi" to get the green/red left border
      card.className = `transaction-item ${item.type}`;

      card.innerHTML = `
        <div class="transaction-header">
          <div class="date-info">
            <span class="date-str">${dateStr}</span>
            <span class="time-str">
              <i class="fa-regular fa-clock"></i> ${timeStr} 
              ${item.id ? `<small style="color:#0284c7; font-weight:600; margin-left:6px;">(#${item.id})</small>` : ""}
            </span>
            <span class="amount-preview ${item.type}">
              ${item.type === "thu" ? "+ " : "- "} ${item.amount}
            </span>
            <span class="title-preview">${item.title}</span>
          </div>
          <i class="fa-solid fa-chevron-down toggle-icon"></i>
        </div>
        <div class="transaction-body">
          
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

      const header = card.querySelector(".transaction-header");
      header.addEventListener("click", () => {
        card.classList.toggle("active");
      });

      transactionList.appendChild(card);
    });
  }

  // --------------------------------------------------------
  // 7. Đăng ký sự kiện (Lắng nghe Click, Change, Input)
  // --------------------------------------------------------
  if (selectType) {
    selectType.addEventListener("change", () => {
      // Tự động xóa từ khóa tìm kiếm khi đổi loại hiển thị
      if (searchInput && searchInput.value) {
        searchInput.value = "";
        if (clearSearchBtn) clearSearchBtn.style.display = "none";
      }
      renderTransactions();
    });
  }

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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
