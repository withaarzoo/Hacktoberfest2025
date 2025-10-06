// Enhanced Loader JS for abhijeetpatilrm

document.addEventListener("DOMContentLoaded", function () {
  const loaderText = document.querySelector(".loader-text");
  const circles = document.querySelectorAll(".loader-circle");

  // Dynamic loading messages
  const messages = [
    "Loading...",
    "Preparing awesomeness...",
    "Almost there...",
    "Just a moment...",
  ];

  let messageIndex = 0;
  setInterval(() => {
    loaderText.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
  }, 2000);

  // Subtle color animation for circles
  setInterval(() => {
    circles.forEach((circle, index) => {
      const colors = [
        ["#ff6b6b", "#ffb347"],
        ["#4ecdc4", "#00c3ff"],
        ["#45b7d1", "#764ba2"],
      ];
      const currentColor = colors[index][0];
      const newColor = colors[index][1];
      if (
        circle.style.borderTopColor === currentColor ||
        !circle.style.borderTopColor
      ) {
        circle.style.borderTopColor = newColor;
      } else {
        circle.style.borderTopColor = currentColor;
      }
    });
  }, 1600);

  // Hover and click effects
  const loaderWrapper = document.querySelector(".loader-wrapper");
  loaderWrapper.addEventListener("mouseenter", () => {
    circles.forEach((circle) => {
      circle.style.transform += " scale(1.08)";
      circle.style.boxShadow = "0 0 32px #fff8, 0 0 24px #00c3ff88";
    });
    loaderText.style.transform += " scale(1.08)";
  });
  loaderWrapper.addEventListener("mouseleave", () => {
    circles.forEach((circle) => {
      circle.style.transform = circle.style.transform.replace(
        " scale(1.08)",
        ""
      );
      circle.style.boxShadow = "";
    });
    loaderText.style.transform = loaderText.style.transform.replace(
      " scale(1.08)",
      ""
    );
  });

  loaderWrapper.addEventListener("click", () => {
    circles.forEach((circle) => {
      circle.style.animationDuration = "0.7s";
    });
    setTimeout(() => {
      circles.forEach((circle) => {
        // Always reset to the value in CSS, not inline
        circle.style.removeProperty("animation-duration");
      });
    }, 700);
  });

  // Smooth transitions
  const style = document.createElement("style");
  style.textContent = `
		.loader-circle,
		.loader-text {
			transition: all 0.35s cubic-bezier(.68,-0.55,.27,1.55);
		}
	`;
  document.head.appendChild(style);
});
