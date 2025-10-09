document.addEventListener("DOMContentLoaded", () => {
  // --- Cached DOM Elements ---
  const container = document.getElementById("contributors-container");
  const loader = document.getElementById("loader");
  const loadMoreContainer = document.getElementById("load-more-container");
  const loadMoreButton = document.getElementById("load-more-button");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const navbar = document.querySelector(".navbar-glass");

  // --- State ---
  let allContributors = [];
  let displayedCount = 0;
  const batchSize = 50;
  let cardObserver;

  // --- Utils ---
  const debounce = (fn, delay = 200) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  // --- Main Initialization ---
  async function initialize() {
    loader.style.display = "block";
    setupIntersectionObserver();

    try {
      const response = await fetch("contributors.json");
      if (!response.ok) throw new Error("contributors.json not found");

      const jsonData = await response.json();

      // --- Remove duplicates efficiently using a Map ---
      const contributorMap = new Map();
      for (const contributor of jsonData) {
        contributorMap.set(contributor.github_profile_url, contributor);
      }
      allContributors = Array.from(contributorMap.values());

      displayNextBatch();
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p class="error-text">${error.message}</p>`;
    } finally {
      loader.style.display = "none";
    }
  }

  // --- Create Placeholder Cards and Render in Batches ---
  function displayNextBatch() {
    const batch = allContributors.slice(displayedCount, displayedCount + batchSize);
    if (!batch.length) return;

    const fragment = document.createDocumentFragment();

    batch.forEach((contributor, index) => {
      const card = createPlaceholderCard(contributor, displayedCount + index);
      fragment.appendChild(card);
      cardObserver.observe(card);
    });

    container.appendChild(fragment);
    displayedCount += batch.length;

    loadMoreContainer.style.display =
      displayedCount < allContributors.length ? "block" : "none";
  }

  // --- Generate Each Card ---
  function createPlaceholderCard(contributor, index) {
    const { name, bio, github_profile_url, project_netlify_link } = contributor;
    const username = github_profile_url.split("/").pop();

    const card = document.createElement("div");
    card.className = "contributor-card";
    card.dataset.username = username;
    card.style.animationDelay = `${index * 30}ms`;

    card.innerHTML = `
      <img class="profile-image" alt="${name}" />
      <div class="card-content">
        <div>
          <h3>${name}</h3>
          <p class="username">@${username}</p>
          <p class="bio">${bio}</p>
        </div>
        <div class="stats">
          <div class="stat-item"><span class="stat-value">--</span><span>followers</span></div>
          <div class="stat-item"><span class="stat-value">--</span><span>following</span></div>
          <div class="stat-item"><span class="stat-value">--</span><span>repos</span></div>
        </div>
        <div class="card-buttons">
          <a href="${github_profile_url}" target="_blank" class="card-button">Profile</a>
          <a href="${project_netlify_link}" target="_blank" class="card-button view-project">Project</a>
        </div>
      </div>`;
    return card;
  }

  // --- Fetch and Update GitHub Info ---
  async function updateCardWithGithubData(card) {
    const username = card.dataset.username;
    if (!username || card.dataset.loaded) return;

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();

      card.dataset.loaded = "true";
      const profileImage = card.querySelector(".profile-image");
      const nameElement = card.querySelector("h3");
      const stats = card.querySelectorAll(".stat-value");

      profileImage.src = data.avatar_url;
      profileImage.style.opacity = 0;
      profileImage.onload = () => (profileImage.style.opacity = 1);

      nameElement.textContent = data.name || data.login;
      stats[0].textContent = data.followers ?? 0;
      stats[1].textContent = data.following ?? 0;
      stats[2].textContent = data.public_repos ?? 0;
    } catch (err) {
      console.warn(`Error fetching ${username}:`, err.message);
      card.querySelector(".bio").textContent = "GitHub data unavailable.";
    }
  }

  // --- Lazy Load Cards via Intersection Observer ---
  function setupIntersectionObserver() {
    cardObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCardWithGithubData(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "150px" }
    );
  }

  // --- Search Filtering ---
  const filterContributors = debounce(() => {
    const term = searchInput.value.toLowerCase().trim();
    const cards = container.querySelectorAll(".contributor-card");

    cards.forEach((card) => {
      const username = card.dataset.username.toLowerCase();
      card.classList.toggle("hidden", !username.includes(term));
    });

    loadMoreContainer.style.display =
      term || displayedCount >= allContributors.length ? "none" : "block";
  }, 250);

  // --- Navbar Scroll Effect ---
  function handleScroll() {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
  }

  // --- Event Bindings ---
  loadMoreButton.addEventListener("click", displayNextBatch);
  searchForm.addEventListener("submit", (e) => e.preventDefault());
  searchInput.addEventListener("input", filterContributors);
  window.addEventListener("scroll", handleScroll);

  // --- Initialize ---
  initialize();
});

