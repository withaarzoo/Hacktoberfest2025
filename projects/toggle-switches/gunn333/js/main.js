const toggle = document.getElementById("toggle");
let isNight = false;

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  isNight = !isNight;

  document.body.style.background =
      isNight ? "linear-gradient(180deg, #0d1b2a, #1b263b)" : "#f4f7fa";
});
