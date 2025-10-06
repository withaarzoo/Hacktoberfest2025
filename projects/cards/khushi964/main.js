
document.querySelectorAll('.card').forEach((card, index) => {
  card.style.opacity = 0;
  setTimeout(() => {
    card.style.transition = "opacity 0.8s ease";
    card.style.opacity = 1;
  }, index * 200);
});
