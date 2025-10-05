// Boot sequence data
const bootMessages = [
  { text: "Initializing BIOS...", type: "success", delay: 0 },
  { text: "Checking hardware configuration", type: "success", delay: 500 },
  { text: "CPU: Quantum Processor X1 detected", type: "success", delay: 1000 },
  { text: "Memory: 32GB Quantum RAM", type: "success", delay: 1500 },
  { text: "Loading kernel modules", type: "loading", delay: 2000 },
  { text: "Initializing network interfaces", type: "success", delay: 3000 },
  { text: "Mounting file systems", type: "success", delay: 3500 },
  { text: "Starting system services", type: "warning", delay: 4000 },
  { text: "Security protocols activated", type: "success", delay: 4500 },
  { text: "Quantum encryption enabled", type: "success", delay: 5000 },
  { text: "Neural network initialized", type: "success", delay: 5500 },
  { text: "System ready for operation", type: "success", delay: 6000 },
];

let currentProgress = 0;
let bootInterval;

// Initialize boot sequence
function initBoot() {
  // Clear previous state
  document.getElementById("bootMessages").innerHTML = "";
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("progressPercent").textContent = "0%";
  currentProgress = 0;

  // Start boot messages
  bootMessages.forEach((msg, index) => {
    setTimeout(() => {
      addBootMessage(msg.text, msg.type);
      if (index === bootMessages.length - 1) {
        completeBoot();
      }
    }, msg.delay);
  });

  // Start progress bar
  startProgress();
}

function addBootMessage(text, type) {
  const messagesContainer = document.getElementById("bootMessages");
  const line = document.createElement("div");
  line.className = `boot-line ${type}`;
  line.textContent = text;
  line.style.animationDelay = "0s";
  messagesContainer.appendChild(line);

  // Remove loading animation after a delay
  if (type === "loading") {
    setTimeout(() => {
      line.classList.remove("loading");
      line.classList.add("success");
    }, 1000);
  }
}

function startProgress() {
  bootInterval = setInterval(() => {
    if (currentProgress < 100) {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) currentProgress = 100;
      updateProgress(currentProgress);
    } else {
      clearInterval(bootInterval);
    }
  }, 500);
}

function updateProgress(percent) {
  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressPercent").textContent =
    Math.floor(percent) + "%";
}

function completeBoot() {
  clearInterval(bootInterval);
  updateProgress(100);
}

// Initialize on load
window.addEventListener("load", () => {
  initBoot();
});
