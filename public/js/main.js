document.addEventListener("DOMContentLoaded", function () {
  // Get menu elements
  const loggedOutMenu = document.getElementById("logged-out-menu");
  const loggedInMenu = document.getElementById("logged-in-menu");
  
  // Tab switching functionality
  function setupTabButtons(parent) {
    const tabButtons = parent.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName = button.getAttribute("data-tab");
        
        // Skip if this is the logout button or dashboard (handled separately)
        if (!tabName) return;
        
        // Don't switch to dashboard from buttons - only programmatically
        if (tabName === "dashboard" && !button.classList.contains("active")) return;
        
        // Deactivate all tabs
        parent.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        
        // Activate the selected tab
        button.classList.add("active");
        document.getElementById(tabName).classList.add("active");
      });
    });
  }
  
  // Set up tab switching for both menus
  setupTabButtons(loggedOutMenu);
  setupTabButtons(loggedInMenu);
  
  // Check if user is already logged in (from localStorage)
  const userData = JSON.parse(localStorage.getItem("foundryApiUser"));
  if (userData) {
    // First show dashboard with cached data and switch to logged-in menu
    showDashboard(userData);
    switchToLoggedInMenu();
    
    // Then fetch fresh data
    fetchUserData(userData.apiKey);
  }
  
  // Function to switch to logged-in menu
  function switchToLoggedInMenu() {
    loggedOutMenu.style.display = "none";
    loggedInMenu.style.display = "inherit";
  }
  
  // Function to switch to logged-out menu
  function switchToLoggedOutMenu() {
    loggedInMenu.style.display = "none";
    loggedOutMenu.style.display = "inherit";
  }
  
  // Function to fetch fresh user data
  async function fetchUserData(apiKey) {
    try {
      const response = await fetch("/user-data", {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.ok) {
        const freshData = await response.json();

        // Update localStorage with fresh data
        localStorage.setItem("foundryApiUser", JSON.stringify(freshData));

        // Update dashboard with fresh data
        document.getElementById("user-email").textContent = freshData.email;
        document.getElementById("user-api-key").textContent = freshData.apiKey;
        document.getElementById("user-subscription-status").textContent = freshData.subscriptionStatus || '🔸 Free';
        if (freshData.subscriptionStatus === 'free') {
          document.getElementById("user-requests").textContent =
            `${freshData.requestsThisMonth || 0} / ${freshData.freeApiRequestsLimit}`;
        } else {
          document.getElementById("user-requests").textContent = freshData.requestsThisMonth || 0;
        }
        
        // Fetch subscription status
        await fetchSubscriptionStatus(apiKey);
      }
    } catch (error) {
      console.error("Failed to fetch fresh user data:", error);
    }
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

        // Save user data, show dashboard, and switch to logged-in menu
        localStorage.setItem("foundryApiUser", JSON.stringify(data));
        showDashboard(data);
        switchToLoggedInMenu();
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

        // Save user data, show dashboard, and switch to logged-in menu
        localStorage.setItem("foundryApiUser", JSON.stringify(data));
        showDashboard(data);
        switchToLoggedInMenu();
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
    
    // Switch to logged-out menu
    switchToLoggedOutMenu();

    // Show signup tab
    const signupButton = document.querySelector('[data-tab="signup"]');
    signupButton.classList.add("active");
    document.getElementById("signup").classList.add("active");
    
    // Hide dashboard tab
    document.getElementById("dashboard").classList.remove("active");

    // Clear forms
    document.getElementById("signup-form").reset();
    document.getElementById("login-form").reset();
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
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((content) => content.classList.remove("active"));
    document.getElementById("dashboard").classList.add("active");
    
    // If we're showing the dashboard, also make sure dashboard tab is active in the logged-in menu
    const dashboardTab = loggedInMenu.querySelector('[data-tab="dashboard"]');
    if (dashboardTab) {
      loggedInMenu.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
      dashboardTab.classList.add("active");
    }

    // Populate user data
    document.getElementById("user-email").textContent = userData.email;
    document.getElementById("user-api-key").textContent = userData.apiKey;
    document.getElementById("user-requests").textContent =
      userData.requestsThisMonth || 0;
  }
  
  // Event handler for subscription button
  const subscribeBtn = document.getElementById("subscribe-btn");
  const manageSubscriptionBtn = document.getElementById("manage-subscription-btn");
  
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", async () => {
      try {
        console.log("Subscribe button clicked");
        const userData = JSON.parse(localStorage.getItem("foundryApiUser"));
        console.log("User data from localStorage:", userData);
        
        if (!userData || !userData.apiKey) {
          alert("Please log in first");
          return;
        }
        
        const response = await fetch("/api/subscriptions/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": userData.apiKey
          }
        });
        
        console.log("Response status:", response.status);
        
        const responseData = await response.json().catch(e => ({ error: "Failed to parse JSON" }));
        console.log("Response data:", responseData);
        
        if (response.ok) {
          window.location = responseData.url;
        } else {
          alert(responseData.error || "Failed to create checkout session");
        }
      } catch (error) {
        console.error("Detailed error:", error);
        alert("An error occurred. Please check console for details.");
      }
    });
  }
  
  if (manageSubscriptionBtn) {
    manageSubscriptionBtn.addEventListener("click", async () => {
      const userData = JSON.parse(localStorage.getItem("foundryApiUser"));
      if (!userData || !userData.apiKey) {
        alert("Please log in first");
        return;
      }
      
      try {
        const response = await fetch("/api/subscriptions/create-portal-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": userData.apiKey
          }
        });
        
        if (response.ok) {
          const { url } = await response.json();
          window.location = url;
        } else {
          alert("Failed to access subscription management");
        }
      } catch (error) {
        console.error("Error creating portal session:", error);
        alert("An error occurred. Please try again.");
      }
    });
  }
  
  // Show subscription UI based on status
  function updateSubscriptionUI(status) {
    const statusElement = document.getElementById("user-subscription-status");
    const subscribeBtn = document.getElementById("subscribe-btn");
    const manageSubscriptionBtn = document.getElementById("manage-subscription-btn");
    
    // Update status display
    statusElement.textContent = status === 'active' 
      ? '✅ Active' 
      : status === 'past_due'
        ? '⚠️ Past Due'
        : '🔸 Free';
    
    // Show/hide subscription buttons
    if (status === 'active' || status === 'past_due') {
      subscribeBtn.style.display = 'none';
      manageSubscriptionBtn.style.display = 'inline-block';
    } else {
      subscribeBtn.style.display = 'inline-block';
      manageSubscriptionBtn.style.display = 'none';
    }
  }

  // Function to fetch subscription status
  async function fetchSubscriptionStatus(apiKey) {
    try {
      const response = await fetch("/api/subscriptions/status", {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        updateSubscriptionUI(data.subscriptionStatus);
        return data.subscriptionStatus;
      } else {
        console.error("Failed to fetch subscription status");
        updateSubscriptionUI('free');
        return 'free';
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      updateSubscriptionUI('free');
      return 'free';
    }
  }
});
