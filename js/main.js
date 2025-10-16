document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const container = document.getElementById("contributors-container"); //
  const loader = document.getElementById("loader"); //
  const loadMoreContainer = document.getElementById("load-more-container"); //
  const loadMoreButton = document.getElementById("load-more-button"); //
  const searchForm = document.getElementById("search-form"); //
  const searchInput = document.getElementById("search-input"); //
  const navbar = document.querySelector(".navbar-glass"); //

  // --- State Variables ---
  let allContributors = [];
  let displayedCount = 0;
  const batchSize = 50;
  let cardObserver;
  const displayedUsernames = new Set();

  const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/583231?v=4"; // fallback avatar (Octocat)

  /**
   * Normalizes a github_profile_url or raw username to a username string.
   * Returns null when not parseable.
   */
  function normalizeGithubUsername(urlOrValue) {
    if (!urlOrValue || typeof urlOrValue !== "string") return null;
    let str = urlOrValue.trim();
    if (!str) return null;
    if (!str.includes("github.com")) {
      return str.replace(/^@/, "").replace(/\/+$/, "").toLowerCase();
    }
    try {
      const u = new URL(str, "https://github.com");
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length === 0) return null;
      return parts[parts.length - 1].toLowerCase();
    } catch (e) {
      const parts = str.split("/").filter(Boolean);
      return parts.length ? parts[parts.length - 1].toLowerCase() : null;
    }
  }

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

      // --- HANDLE DUPLICATES (DEDUPE AT LOAD) ---
      // Normalize github usernames and keep a single entry per username.
      // If multiple entries exist we preserve the first and collect project links in `projects`.
      const map = new Map();
      let fallbackCounter = 0;
      jsonData.forEach((contributor) => {
        const rawUrl = contributor.github_profile_url || contributor.github || contributor.github_profile || "";
        const username = normalizeGithubUsername(rawUrl);
        const key = username || `__fallback_${++fallbackCounter}`;
        if (!map.has(key)) {
          // clone to avoid mutating original and attach projects array
          const clone = Object.assign({}, contributor);
          clone.__normalized_username = username;
          clone.projects = clone.projects || [];
          if (clone.project_netlify_link) clone.projects.push(clone.project_netlify_link);
          map.set(key, clone);
        } else {
          // aggregate project links into existing entry (no duplicate card will be created)
          const existing = map.get(key);
          if (contributor.project_netlify_link) existing.projects.push(contributor.project_netlify_link);
        }
      });

      allContributors = Array.from(map.values());

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
      // render-time guard: skip if this normalized username is already displayed
      const normalized = contributor.__normalized_username || normalizeGithubUsername(contributor.github_profile_url || "");
      if (normalized && displayedUsernames.has(normalized)) return;
      const card = createPlaceholderCard(contributor, displayedCount + index);
      container.appendChild(card);
      // mark as rendered to prevent duplicates in subsequent batches
      if (normalized) displayedUsernames.add(normalized);
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
    const username = normalizeGithubUsername(github_profile_url) || (github_profile_url && github_profile_url.split("/").pop()) || `user-${index}`;

    const card = document.createElement("div");
    card.className = "contributor-card";
    card.style.animationDelay = `${index * 50}ms`;
    card.dataset.username = username;
    // attach projects if aggregated
    if (contributor.projects && Array.isArray(contributor.projects)) {
      // store as JSON string for possible later use
      card.dataset.projects = JSON.stringify(contributor.projects);
    }

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

    const data = await safeFetchGithubUser(username);
    card.dataset.loaded = "true";

    // Name element
    const nameElement = card.querySelector("h3");
    if (nameElement) nameElement.textContent = (data && (data.name || data.login)) || nameElement.textContent || `@${username}`;

    // Profile image (guarded)
    const profileImage = card.querySelector(".profile-image");
    if (profileImage) {
      if (data && data.avatar_url) {
        const imgEl = profileImage;
        imgEl.style.opacity = 0;
        imgEl.onload = () => (imgEl.style.opacity = 1);
        imgEl.onerror = () => (imgEl.src = DEFAULT_AVATAR);
        imgEl.src = data.avatar_url;
      } else {
        profileImage.src = DEFAULT_AVATAR;
      }
    }

    // Stats (guarded)
    const stats = card.querySelectorAll(".stat-value");
    if (stats && data) {
      if (stats[0]) stats[0].textContent = data.followers != null ? data.followers : "--";
      if (stats[1]) stats[1].textContent = data.following != null ? data.following : "--";
      if (stats[2]) stats[2].textContent = data.public_repos != null ? data.public_repos : "--";
    } else if (stats) {
      stats.forEach(s => (s.textContent = "--"));
    }

    // If fetch failed, show a short message in bio
    const bioEl = card.querySelector(".bio");
    if (bioEl && !data) {
      bioEl.textContent = "GitHub data unavailable (rate limit or network error).";
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
