const toggle = document.getElementById("themeToggle");
const body = document.body;
const clickSound = document.getElementById("clickSound");

// Default theme
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}
body.classList.add(localStorage.getItem("theme"));

// Update toggle position
if (localStorage.getItem("theme") === "dark") {
  toggle.classList.add("active");
}

toggle.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  body.classList.toggle("dark");
  body.classList.toggle("light");
  toggle.classList.toggle("active");

  const currentTheme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
});
