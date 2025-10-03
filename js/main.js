// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const container = document.getElementById("contributors-container");
  const loader = document.getElementById("loader");
  const loadMoreContainer = document.getElementById("load-more-container");
  const loadMoreButton = document.getElementById("load-more-button");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const navbar = document.querySelector(".navbar-glass");

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
      const rawContributors = await response.json();
      
      // Filter out duplicates and invalid entries
      allContributors = filterAndValidateContributors(rawContributors);

      // Display the first batch of placeholder contributors
      displayNextBatch();
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p style="text-align: center; color: var(--text-light);">${error.message}</p>`;
    } finally {
      loader.style.display = "none";
    }
  }

  /**
   * Filters out duplicate contributors and validates data integrity.
   */
  function filterAndValidateContributors(contributors) {
    const seen = new Set();
    const valid = [];

    contributors.forEach(contributor => {
      // Extract username from GitHub URL
      if (!contributor.github_profile_url) return;
      
      const username = contributor.github_profile_url.split("/").pop();
      
      // Skip if we've already seen this username or if required fields are missing
      if (seen.has(username) || !contributor.name || !contributor.bio) {
        console.warn(`Skipping duplicate or invalid contributor: ${username}`);
        return;
      }
      
      seen.add(username);
      valid.push({
        ...contributor,
        // Ensure consistent data format
        name: contributor.name.trim(),
        bio: contributor.bio.trim(),
        occupation: contributor.occupation?.trim() || '',
        place: contributor.place?.trim() || ''
      });
    });

    console.log(`Loaded ${valid.length} unique contributors from ${contributors.length} entries`);
    return valid;
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
    const { name, bio, github_profile_url, project_netlify_link, occupation, place } = contributor;
    const username = github_profile_url.split("/").pop();

    const card = document.createElement("div");
    card.className = "contributor-card";
    card.style.animationDelay = `${index * 50}ms`;
    card.dataset.username = username;
    
    // Store original contributor data to prevent overwriting
    card.dataset.originalName = name;
    card.dataset.originalBio = bio;

    // Enhanced bio that includes occupation and place if available
    const enhancedBio = [bio, occupation, place].filter(Boolean).join(" • ");

    // Use the exact name and bio from the JSON file
    card.innerHTML = `
            <img src="" alt="Profile picture of ${name}" class="profile-image">
            <div class="card-content">
                <div>
                    <h3>${name}</h3>
                    <p class="username">@${username}</p>
                    <p class="bio">${enhancedBio}</p>
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

      // DO NOT override the name - keep the original name from JSON
      // The original name from contributors.json should be preserved
      // as it represents the actual contributor's preferred name

      // Update profile image with a smooth fade-in effect
      const profileImage = card.querySelector(".profile-image");
      profileImage.style.opacity = 0;
      profileImage.onload = () => {
        profileImage.style.opacity = 1;
      };
      profileImage.src = data.avatar_url;

      // Update stats only (preserve original bio and name)
      const stats = card.querySelectorAll(".stat-value");
      stats[0].textContent = data.followers || 0;
      stats[1].textContent = data.following || 0;
      stats[2].textContent = data.public_repos || 0;
    } catch (error) {
      console.error(`Failed to fetch data for ${username}:`, error);
      // Don't override the bio on error - keep the original bio
      // Add a subtle indicator that GitHub data couldn't be loaded
      const stats = card.querySelectorAll(".stat-value");
      stats.forEach(stat => stat.textContent = "N/A");
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
      const name = card.dataset.originalName?.toLowerCase() || '';
      const bio = card.dataset.originalBio?.toLowerCase() || '';
      
      // Search in username, name, and bio for better results
      const matchesSearch = username.includes(searchTerm) || 
                           name.includes(searchTerm) || 
                           bio.includes(searchTerm);
      
      if (matchesSearch) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    // Update load more button visibility
    if (searchTerm) {
      loadMoreContainer.style.display = "none";
    } else if (displayedCount < allContributors.length) {
      loadMoreContainer.style.display = "block";
    }
  }

  /**
   * Handles navbar style change on scroll.
   */
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  // --- Event Listeners ---
  loadMoreButton.addEventListener("click", displayNextBatch);
  searchForm.addEventListener("submit", (e) => e.preventDefault());
  searchInput.addEventListener("input", filterContributors);
  window.addEventListener("scroll", handleScroll);

  // --- Initial Load ---
  initialize();
});
