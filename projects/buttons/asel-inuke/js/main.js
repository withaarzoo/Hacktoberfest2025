document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("demoBtn");
  const msg = document.getElementById("msg");
  btn.addEventListener("click", function () {
    msg.textContent = "Thanks for trying this demo button";
    btn.setAttribute("aria-pressed", "true");
    setTimeout(() => {
      btn.setAttribute("aria-pressed", "false");
    }, 1200);
  });
});
