const icons = {
	success: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`,
	error: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>`,
	info: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
	warning: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.29 3.86l-8.19 14A1 1 0 003 20h18a1 1 0 00.87-1.5l-8.19-14a1 1 0 00-1.74 0z"/></svg>`,
};

function showToast(type, message) {
	const container = document.getElementById("toast-container");

	const toast = document.createElement("div");
	toast.classList.add("toast", type);

	toast.innerHTML = `
    <div class="toast-content">
      ${icons[type]}
      <span>${message}</span>
    </div>
    <button class="close-btn" onclick="closeToast(this)">&times;</button>
  `;

	container.appendChild(toast);

	// Auto remove after 4 seconds
	setTimeout(() => {
		toast.style.animation = "slideOut 0.4s forwards";
		toast.addEventListener("animationend", () => toast.remove());
	}, 4000);
}

function closeToast(button) {
	const toast = button.parentElement;
	toast.style.animation = "slideOut 0.4s forwards";
	toast.addEventListener("animationend", () => toast.remove());
}

// Dark mode toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	toggleBtn.textContent = document.body.classList.contains("dark")
		? "☀️"
		: "🌙";
});
