document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const mainContent = document.getElementById("mainContent");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const menuLinks = document.querySelectorAll(".menu-link[data-page]");

  // Toggle sidebar collapse
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
      if (mainContent) mainContent.classList.toggle("expanded");

      // Rotate the toggle icon
      const icon = this.querySelector("i");
      if (sidebar.classList.contains("collapsed")) {
        icon.classList.remove("fa-chevron-left");
        icon.classList.add("fa-chevron-right");
      } else {
        icon.classList.remove("fa-chevron-right");
        icon.classList.add("fa-chevron-left");
      }
    });
  }

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768 && sidebar && mobileMenuBtn) {
      if (
        !sidebar.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
      ) {
        sidebar.classList.remove("active");
      }
    }
  });

  // Handle dropdown menus
  const productsToggle = document.getElementById("productsToggle");
  const productsSubmenu = document.getElementById("productsSubmenu");
  const ordersToggle = document.getElementById("ordersToggle");
  const ordersSubmenu = document.getElementById("ordersSubmenu");

  if (productsToggle && productsSubmenu) {
    productsToggle.addEventListener("click", function (e) {
      e.preventDefault();
      productsSubmenu.classList.toggle("open");
      const icon = this.querySelector(".dropdown-icon");
      if (icon) icon.classList.toggle("rotate");
    });
  }

  if (ordersToggle && ordersSubmenu) {
    ordersToggle.addEventListener("click", function (e) {
      e.preventDefault();
      ordersSubmenu.classList.toggle("open");
      const icon = this.querySelector(".dropdown-icon");
      if (icon) icon.classList.toggle("rotate");
    });
  }

  // Handle menu link clicks
  if (menuLinks && menuLinks.length) {
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Remove active class from all links
        menuLinks.forEach((item) => item.classList.remove("active"));

        // Add active class to clicked link
        this.classList.add("active");

        // Update content based on clicked link
        const page = this.getAttribute("data-page");
        updateContent(page);

        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768 && sidebar) {
          sidebar.classList.remove("active");
        }
      });
    });
  }

  // Function to update content based on selected page
  function updateContent(page) {
    const contentHeader = document.querySelector(".content-header h1");
    const contentDescription = document.querySelector(".content-header p");
    const cards = document.querySelectorAll(".card");

    if (!contentHeader || !contentDescription) return;

    // Update header based on page
    switch (page) {
      case "home":
        contentHeader.textContent = "Welcome to Dashboard";
        contentDescription.textContent =
          "Here's what's happening with your store today.";
        break;
      case "dashboard":
        contentHeader.textContent = "Dashboard";
        contentDescription.textContent =
          "Monitor your business metrics and performance.";
        break;
      case "all-products":
        contentHeader.textContent = "All Products";
        contentDescription.textContent = "Manage your product inventory.";
        break;
      case "add-product":
        contentHeader.textContent = "Add Product";
        contentDescription.textContent = "Add a new product to your inventory.";
        break;
      case "categories":
        contentHeader.textContent = "Categories";
        contentDescription.textContent =
          "Organize your products with categories.";
        break;
      case "all-orders":
        contentHeader.textContent = "All Orders";
        contentDescription.textContent = "View and manage all customer orders.";
        break;
      case "pending":
        contentHeader.textContent = "Pending Orders";
        contentDescription.textContent =
          "Orders that are waiting to be processed.";
        break;
      case "completed":
        contentHeader.textContent = "Completed Orders";
        contentDescription.textContent =
          "Orders that have been successfully delivered.";
        break;
      case "customers":
        contentHeader.textContent = "Customers";
        contentDescription.textContent = "Manage your customer database.";
        break;
      case "analytics":
        contentHeader.textContent = "Analytics";
        contentDescription.textContent =
          "Gain insights from your business data.";
        break;
      case "messages":
        contentHeader.textContent = "Messages";
        contentDescription.textContent = "Communicate with your customers.";
        break;
      case "settings":
        contentHeader.textContent = "Settings";
        contentDescription.textContent =
          "Configure your dashboard preferences.";
        break;
      default:
        contentHeader.textContent = "Page Not Found";
        contentDescription.textContent =
          "The requested page could not be found.";
    }
  }
});
