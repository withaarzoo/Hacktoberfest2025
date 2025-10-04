<div id="app"></div>

<style>
  .card {
    max-width: 300px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    margin: 20px;
    overflow: hidden;
    transition: transform 0.2s;
  }
  .card:hover {
    transform: scale(1.05);
  }
  .card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .card-body {
    padding: 15px;
  }
  .card-body h3 {
    margin: 0;
    font-size: 1.3rem;
  }
  .card-body p {
    font-size: 0.9rem;
    color: #555;
  }
  .btn {
    display: inline-block;
    padding: 8px 12px;
    margin-top: 10px;
    background: #ff9800;
    color: white;
    text-decoration: none;
    border-radius: 6px;
  }
  .btn:hover {
    background: #e68900;
  }
</style>

<script>
  function createCard({ title, description, image, link }) {
    return `
      <div class="card">
        <img src="${image}" alt="${title}">
        <div class="card-body">
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="${link}" target="_blank" class="btn">View</a>
        </div>
      </div>
    `;
  }

  const projects = [
    {
      title: "Form Flux",
      description: "Speedrun-focused platformer game built with Godot.",
      image: "https://via.placeholder.com/300x180?text=Form+Flux",
      link: "#"
    },
    {
      title: "Sentry",
      description: "Encrypted password manager built with PyQt6.",
      image: "https://via.placeholder.com/300x180?text=Sentry",
      link: "#"
    }
  ];

  document.getElementById("app").innerHTML =
    projects.map(p => createCard(p)).join("");
</script>
