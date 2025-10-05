// No JS needed for this component, but you can extend it.
// Example: log when a card is clicked.

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".info-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      console.log("Card clicked:", card.querySelector("h2").innerText);
    });
  });
});
