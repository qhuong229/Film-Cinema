// Add event listeners to navbar links
document.addEventListener("DOMContentLoaded", function () {
  // Login link
  const loginLink = Array.from(document.querySelectorAll(".nav-link")).find(
    (link) => link.textContent.trim() === "Đăng nhập"
  );
  if (loginLink) {
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();
    });
  }

  // Register link
  const registerLink = Array.from(document.querySelectorAll(".nav-link")).find(
    (link) => link.textContent.trim() === "Đăng ký"
  );
  if (registerLink) {
    registerLink.addEventListener("click", function (e) {
      e.preventDefault();
      const registerModal = new bootstrap.Modal(
        document.getElementById("registerModal")
      );
      registerModal.show();
    });
  }
});

// Functions to switch between modals
function switchToRegister() {
  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal")
  );
  if (loginModal) {
    loginModal.hide();
    setTimeout(() => {
      const registerModal = new bootstrap.Modal(
        document.getElementById("registerModal")
      );
      registerModal.show();
    }, 300);
  }
}

function switchToLogin() {
  const registerModal = bootstrap.Modal.getInstance(
    document.getElementById("registerModal")
  );
  if (registerModal) {
    registerModal.hide();
    setTimeout(() => {
      const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();
    }, 300);
  }
}

function switchToQuenMK() {
  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal")
  );
  if (loginModal) {
    loginModal.hide();
    setTimeout(() => {
      const registerModal = new bootstrap.Modal(
        document.getElementById("quenmk")
      );
      registerModal.show();
    }, 300);
  }
}

function switchToMaxn() {
  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("quenmk")
  );
  if (loginModal) {
    loginModal.hide();
    setTimeout(() => {
      const registerModal = new bootstrap.Modal(
        document.getElementById("maxn")
      );
      registerModal.show();
    }, 300);
  }
}

function switchToPassNew() {
  const loginModal = bootstrap.Modal.getInstance(
    document.getElementById("maxn")
  );
  if (loginModal) {
    loginModal.hide();
    setTimeout(() => {
      const registerModal = new bootstrap.Modal(
        document.getElementById("passwordNew")
      );
      registerModal.show();
    }, 300);
  }
}


// Hàm lưu thông tin vào localStorage khi đăng nhập thành công
function handleLogin(event) {
  event.preventDefault(); // Ngăn reload trang khi submit form
  
  // Lấy giá trị từ form
  const email = document.getElementById("loginEmail").value;
  
  // Giả sử đăng nhập thành công, lưu thông tin vào localStorage
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userEmail", email);
  // Đóng modal
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.hide();
  location.reload();

  // Cập nhật giao diện
  updateUI();
  
  
}

// Hàm kiểm tra trạng thái đăng nhập
function updateUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  // Nếu đã đăng nhập
  if (isLoggedIn) {
    document.querySelector(".user-controls").innerHTML = `
      <div class="user-icon me-4 positive-relative" id="openLogoutModalLogout">
        <img src="./images/image 60.png" alt="User">
      </div>
      <div class="menu-icon">
          <a href="lichsudatve.html">
            <img src="./images/image 61.png" alt="Menu">
          </a>
      </div>
    `;



    // Kích hoạt modal khi bấm nút
    document.getElementById("openLogoutModalLogout").addEventListener("click", () => {
      const logoutModal = new bootstrap.Modal(document.getElementById("logoutModal"));
      logoutModal.show();
    });

    // Xử lý đăng xuất khi nhấn nút trong modal
    document.getElementById("confirmLogout").addEventListener("click", () => {
      // Xử lý đăng xuất
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");

      // Cập nhật giao diện
      document.querySelector(".user-controls").innerHTML = `
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</a>
          </li>
        </ul>
      `;

      // Đóng modal
      const logoutModal = bootstrap.Modal.getInstance(document.getElementById("logoutModal"));
      logoutModal.hide();
});
  } else {
    // Nếu chưa đăng nhập
    document.querySelector(".user-controls").innerHTML = `
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</a>
        </li>
      </ul>
    `;
    // Đóng modal
    const logoutModal = bootstrap.Modal.getInstance(document.getElementById("logoutModal"));
    logoutModal.hide();
    location.reload();
  }

}

// Gán sự kiện cho form đăng nhập
document.querySelector("#loginModal form").addEventListener("submit", handleLogin);

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", updateUI);


function handleLogout() {
  // Xóa thông tin trong localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");

  // Cập nhật giao diện
  updateUI();
  
  location.reload();
}

// Ví dụ thêm nút đăng xuất trong giao diện đã đăng nhập
if (localStorage.getItem("isLoggedIn") === "true") {
  document.querySelector(".menu-icon").innerHTML += `
    <button class="btn btn-link" onclick="handleLogout()">Đăng xuất</button>
  `;
}
