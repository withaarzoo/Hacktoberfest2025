document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("back_to_top");

  function handleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  window.addEventListener("scroll", handleBackToTop);
  backToTopBtn.addEventListener("click", scrollToTop);
});
  

