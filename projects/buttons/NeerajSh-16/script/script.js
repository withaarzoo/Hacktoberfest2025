// Star container inside button
const buttonStarContainer = document.getElementById("buttonStars");

// Create stars only inside the button
const createStars = (container, count) => {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(star);
  }
};

// Generate 40 twinkling stars inside the button
createStars(buttonStarContainer, 40);

// LinkedIn redirect
function goToLinkedIn() {
  window.open("https://www.linkedin.com/in/challenger-neeraj/", "_blank");
}
