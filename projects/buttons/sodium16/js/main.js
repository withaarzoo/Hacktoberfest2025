const button = document.querySelector(".fancy-btn");

// --- 1. MOUSE-TRACKING GLOW ---
button.addEventListener("mousemove", (e) => {
    // Get button's position and size
    const rect = button.getBoundingClientRect();

    // Calculate mouse position relative to the button
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the CSS variables
    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
});


// --- 2. PARTICLE EXPLOSION ON CLICK ---
button.addEventListener("click", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Array of colors for the particles
    const colors = ["#ff0077", "#ff6600", "#33ccff", "#a333ff", "#33ff57"];

    // Create and animate 30 particles
    for (let i = 0; i < 30; i++) {
        createParticle(x, y, colors);
    }
});

function createParticle(x, y, colors) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Start particle at the click position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Set a random color
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Set a random size
    const size = Math.random() * 20 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Set random destination coordinates for the explosion
    const destinationX = (Math.random() - 0.5) * 500;
    const destinationY = (Math.random() - 0.5) * 500;
    const duration = Math.random() * 1000 + 500; // 500ms to 1500ms

    // Set CSS variables for the animation
    particle.style.setProperty("--x", `${destinationX}px`);
    particle.style.setProperty("--y", `${destinationY}px`);
    particle.style.setProperty("--duration", `${duration}ms`);

    // Append to the button and remove after animation
    button.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, duration);
}