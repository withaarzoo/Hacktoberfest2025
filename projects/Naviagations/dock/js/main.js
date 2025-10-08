// Dock magnification effect
const dock = document.getElementById("dock");
const dockItems = document.querySelectorAll(".dock-item");

if (dockItems) {
  dockItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      // Add magnification effect to all items based on distance
      const rect = this.getBoundingClientRect();

      dockItems.forEach((otherItem) => {
        const icon = otherItem.querySelector(".icon");
        const otherRect = otherItem.getBoundingClientRect();
        const distance = Math.abs(
          rect.left + rect.width / 2 - (otherRect.left + otherRect.width / 2)
        );
        const maxDistance = 200;
        const scale =
          distance < maxDistance ? 1 + (1 - distance / maxDistance) * 0.6 : 1;
        const translateY = scale > 1 ? -10 * (scale - 1) * 1.5 : 0;

        // Apply transform to the icon only to avoid shifting layout/margins
        if (icon) {
          icon.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          icon.style.zIndex = scale > 1 ? 3 : 1;
          // add a stronger shadow when scaled
          icon.style.boxShadow =
            scale > 1
              ? "0 8px 25px rgba(0,0,0,0.2)"
              : "0 4px 15px rgba(0, 0, 0, 0.1)";
        }
        // raise the dock-item stacking context slightly for the hovered area
        otherItem.style.zIndex = scale > 1 ? 200 : "";
      });
    });

    item.addEventListener("mouseleave", function () {
      // Reset all icons and z-indexes
      dockItems.forEach((otherItem) => {
        const icon = otherItem.querySelector(".icon");
        if (icon) {
          icon.style.transform = "";
          icon.style.zIndex = "";
          icon.style.boxShadow = "";
        }
        otherItem.style.zIndex = "";
      });
    });

    // Click event to activate item
    item.addEventListener("click", function () {
      // Remove active class from all items
      dockItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Handle special actions for certain items
      const app = this.dataset.app;
      if (app === "notifications") {
        toggleNotificationPanel();
      } else if (app === "settings") {
        toggleSettingsPanel();
      } else if (app === "messages") {
        // Remove badge when clicked
        const badge = this.querySelector(".badge");
        if (badge) {
          badge.style.display = "none";
        }
      }
    });
  });
}

// Clock functionality
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timeEl = document.getElementById("clockTime");
  const dateEl = document.getElementById("clockDate");
  if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
  if (dateEl)
    dateEl.textContent = `${days[now.getDay()]}, ${
      months[now.getMonth()]
    } ${now.getDate()}`;
}

updateClock();
setInterval(updateClock, 1000);

// Notification panel
function toggleNotificationPanel() {
  const panel = document.getElementById("notificationPanel");
  if (panel) panel.classList.toggle("active");

  // Close settings panel if open
  const settingsPanel = document.getElementById("settingsPanel");
  if (settingsPanel) settingsPanel.classList.remove("active");
}

// Settings panel
function toggleSettingsPanel() {
  const panel = document.getElementById("settingsPanel");
  if (panel) panel.classList.toggle("active");

  // Close notification panel if open
  const notificationPanel = document.getElementById("notificationPanel");
  if (notificationPanel) notificationPanel.classList.remove("active");
}

// Settings toggles
const animationToggle = document.getElementById("animationToggle");
if (animationToggle) {
  animationToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    const isActive = this.classList.contains("active");

    // Toggle animations
    if (!isActive) {
      document.querySelectorAll("*").forEach((el) => {
        el.style.transition = "none";
      });
    } else {
      document.querySelectorAll("*").forEach((el) => {
        el.style.transition = "";
      });
    }
  });
}

const notificationToggle = document.getElementById("notificationToggle");
if (notificationToggle) {
  notificationToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    const isActive = this.classList.contains("active");

    // Show/hide notification badge
    const notificationItem = document.querySelector(
      '[data-app="notifications"]'
    );
    if (notificationItem) {
      if (isActive) {
        notificationItem.classList.add("has-badge");
      } else {
        notificationItem.classList.remove("has-badge");
      }
    }
  });
}

const soundToggle = document.getElementById("soundToggle");
if (soundToggle) {
  soundToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    // Sound toggle logic would go here
  });
}

// Close panels when clicking outside
document.addEventListener("click", function (e) {
  const notificationPanel = document.getElementById("notificationPanel");
  const settingsPanel = document.getElementById("settingsPanel");
  const notificationItem = document.querySelector('[data-app="notifications"]');
  const settingsItem = document.querySelector('[data-app="settings"]');

  if (notificationPanel && notificationItem) {
    if (
      !notificationPanel.contains(e.target) &&
      !notificationItem.contains(e.target)
    ) {
      notificationPanel.classList.remove("active");
    }
  }

  if (settingsPanel && settingsItem) {
    if (!settingsPanel.contains(e.target) && !settingsItem.contains(e.target)) {
      settingsPanel.classList.remove("active");
    }
  }
});

// Add some interactive elements to the main content
const content = document.querySelector(".content");
if (content) {
  content.addEventListener("click", function (e) {
    // Create a ripple effect
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.background = "rgba(255, 255, 255, 0.5)";
    ripple.style.borderRadius = "50%";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple 1s ease-out";

    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    this.style.position = "relative";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
}

// Add ripple animation
const __rippleStyle = document.createElement("style");
__rippleStyle.textContent = `
@keyframes ripple {
  to {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}
`;
document.head.appendChild(__rippleStyle);
