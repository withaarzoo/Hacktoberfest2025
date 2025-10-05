// Demo script: replace skeletons with real content after a simulated delay.
// In your real app you would toggle these states based on network responses.

document.addEventListener("DOMContentLoaded", () => {
  const DELAY = 2200; // ms - simulate fetch time

  const skeletonSection = document.getElementById("cards");
  const realSection = document.getElementById("real-cards");

  // Simulate network / loading
  setTimeout(() => {
    // hide skeletons, show real content
    skeletonSection.classList.add("hidden");
    realSection.classList.remove("hidden");
  }, DELAY);
});
