document.addEventListener("DOMContentLoaded", function () {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      // Don't switch to dashboard from buttons - only programmatically
      if (tabName === "dashboard") return;

      // Deactivate all tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Activate the selected tab
      button.classList.add("active");
      document.getElementById(tabName).classList.add("active");
    });
  });

  // Check if user is already logged in (from localStorage)
  const userData = JSON.parse(localStorage.getItem("foundryApiUser"));
  if (userData) {
    showDashboard(userData);
  }

  // Handle signup form submission
  const signupForm = document.getElementById("signup-form");
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const messageEl = document.getElementById("signup-message");

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        messageEl.textContent = "Account created successfully!";
        messageEl.className = "message success";

        // Save user data and show dashboard
        localStorage.setItem("foundryApiUser", JSON.stringify(data));
        showDashboard(data);
      } else {
        messageEl.textContent = data.error || "Failed to create account.";
        messageEl.className = "message error";
      }
    } catch (error) {
      messageEl.textContent = "An error occurred. Please try again.";
      messageEl.className = "message error";
      console.error(error);
    }
  });

  // Handle login form submission
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const messageEl = document.getElementById("login-message");

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        messageEl.textContent = "Login successful!";
        messageEl.className = "message success";

        // Save user data and show dashboard
        localStorage.setItem("foundryApiUser", JSON.stringify(data));
        showDashboard(data);
      } else {
        messageEl.textContent = data.error || "Invalid credentials.";
        messageEl.className = "message error";
      }
    } catch (error) {
      messageEl.textContent = "An error occurred. Please try again.";
      messageEl.className = "message error";
      console.error(error);
    }
  });

  // Handle logout
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("foundryApiUser");

    // Show signup tab
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    document.querySelector('[data-tab="signup"]').classList.add("active");
    document.getElementById("signup").classList.add("active");

    // Clear forms
    signupForm.reset();
    loginForm.reset();
    document.getElementById("signup-message").textContent = "";
    document.getElementById("login-message").textContent = "";
  });

  // Copy API key to clipboard
  const copyApiKeyBtn = document.getElementById("copy-api-key");
  copyApiKeyBtn.addEventListener("click", () => {
    const apiKey = document.getElementById("user-api-key").textContent;
    navigator.clipboard.writeText(apiKey).then(() => {
      const originalText = copyApiKeyBtn.textContent;
      copyApiKeyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyApiKeyBtn.textContent = originalText;
      }, 1500);
    });
  });

  // Function to show dashboard
  function showDashboard(userData) {
    // Hide all tabs and show dashboard
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
    document.getElementById("dashboard").classList.add("active");

    // Populate user data
    document.getElementById("user-email").textContent = userData.email;
    document.getElementById("user-api-key").textContent = userData.apiKey;
    document.getElementById("user-requests").textContent =
      userData.requestsThisMonth || 0;
  }
});
