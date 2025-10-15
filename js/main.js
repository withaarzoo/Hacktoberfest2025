document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const container = document.getElementById("contributors-container"); //
  const loader = document.getElementById("loader"); //
  const loadMoreContainer = document.getElementById("load-more-container"); //
  const loadMoreButton = document.getElementById("load-more-button"); //
  const searchForm = document.getElementById("search-form"); //
  const searchInput = document.getElementById("search-input"); //
  const navbar = document.querySelector(".navbar-glass"); //
  const backToTopButton = document.getElementById("back-to-top"); //

  // --- State Variables ---
  let allContributors = [];
  let displayedCount = 0;
  const batchSize = 50;
  let cardObserver;

  /**
   * Main function to fetch the initial JSON and display the first batch.
   */
  async function initialize() {
    loader.style.display = "block";
    setupIntersectionObserver();
    try {
      const response = await fetch("contributors.json");
      if (!response.ok) throw new Error("contributors.json not found");
      let jsonData = await response.json();

      // --- HANDLE DUPLICATES ---
      // This section reorders the contributors to show unique ones first.
      const seenUrls = new Set();
      const uniqueContributors = [];
      const duplicateContributors = [];

      jsonData.forEach((contributor) => {
        const url = contributor.github_profile_url;
        if (!seenUrls.has(url)) {
          seenUrls.add(url);
          uniqueContributors.push(contributor);
        } else {
          duplicateContributors.push(contributor);
        }
      });

      // Re-assemble the allContributors array with unique ones first
      allContributors = [...uniqueContributors, ...duplicateContributors];

      // Display the first batch of contributors
      displayNextBatch();
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p style="text-align: center; color: var(--text-light);">${error.message}</p>`;
    } finally {
      loader.style.display = "none";
    }
  }

  /**
   * Displays the next batch of contributors as placeholder cards.
   */
  function displayNextBatch() {
    const batch = allContributors.slice(
      displayedCount,
      displayedCount + batchSize
    );

    batch.forEach((contributor, index) => {
      const card = createPlaceholderCard(contributor, displayedCount + index);
      container.appendChild(card);
      cardObserver.observe(card);
    });

    displayedCount += batch.length;

    // Show/hide "Load More" button
    if (displayedCount < allContributors.length) {
      loadMoreContainer.style.display = "block";
    } else {
      loadMoreContainer.style.display = "none";
    }
  }

  /**
   * Creates a placeholder card with data from the JSON file.
   */
  function createPlaceholderCard(contributor, index) {
    const { name, bio, github_profile_url, project_netlify_link } = contributor;
    const username = github_profile_url.split("/").pop();

    const card = document.createElement("div");
    card.className = "contributor-card";
    card.style.animationDelay = `${index * 50}ms`;
    card.dataset.username = username;

    // Use the name from the JSON file as an initial placeholder
    card.innerHTML = `
            <img src="" alt="Profile picture of ${name}" class="profile-image">
            <div class="card-content">
                <div>
                    <h3>${name}</h3>
                    <p class="username">@${username}</p>
                    <p class="bio">${bio}</p>
                </div>
                <div class="stats">
                    <div class="stat-item"><span class="stat-value">--</span><span class="stat-label">followers</span></div>
                    <div class="stat-item"><span class="stat-value">--</span><span class="stat-label">following</span></div>
                    <div class="stat-item"><span class="stat-value">--</span><span class="stat-label">repositories</span></div>
                </div>
                <div class="card-buttons">
                    <a href="${github_profile_url}" target="_blank" class="card-button">View Profile</a>
                    <a href="${project_netlify_link}" target="_blank" class="card-button view-project">View Project</a>
                </div>
            </div>`;
    return card;
  }

  /**
   * Fetches live GitHub data and updates the card.
   */
  async function updateCardWithGithubData(card) {
    const username = card.dataset.username;
    if (!username || card.dataset.loaded) return;

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();

      card.dataset.loaded = "true"; // Mark as loaded

      const nameElement = card.querySelector("h3");
      // Use the GitHub name, but fall back to the username if the name isn't set
      nameElement.textContent = data.name || data.login;

      // Update image with a smooth fade-in effect
      const profileImage = card.querySelector(".profile-image");
      profileImage.style.opacity = 0;
      profileImage.onload = () => {
        profileImage.style.opacity = 1;
      };
      profileImage.src = data.avatar_url;

      // Update stats
      const stats = card.querySelectorAll(".stat-value");
      stats[0].textContent = data.followers || 0;
      stats[1].textContent = data.following || 0;
      stats[2].textContent = data.public_repos || 0;
    } catch (error) {
      console.error(`Failed to fetch data for ${username}:`, error);
      card.querySelector(".bio").textContent = "Could not load GitHub data.";
    }
  }

  /**
   * Sets up the Intersection Observer to lazy-load card data.
   */
  function setupIntersectionObserver() {
    const options = { rootMargin: "100px" };
    cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCardWithGithubData(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);
  }

  /**
   * Filters currently visible cards based on search input.
   */
  function filterContributors() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = container.querySelectorAll(".contributor-card");
    cards.forEach((card) => {
      const username = card.dataset.username.toLowerCase();
      if (username.includes(searchTerm)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    if (searchTerm) {
      loadMoreContainer.style.display = "none";
    } else if (displayedCount < allContributors.length) {
      loadMoreContainer.style.display = "block";
    }
  }

  /**
   * Handles navbar style change and back-to-top button visibility on scroll.
   */
  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar style change
    if (scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
    
    // Back to top button visibility
    if (scrollY > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  }

  /**
   * Smooth scroll to top function.
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // --- Event Listeners ---
  loadMoreButton.addEventListener("click", displayNextBatch);
  searchForm.addEventListener("submit", (e) => e.preventDefault());
  searchInput.addEventListener("input", filterContributors);
  window.addEventListener("scroll", handleScroll);
  backToTopButton.addEventListener("click", scrollToTop);

  // --- Initial Load ---
  initialize();
});
