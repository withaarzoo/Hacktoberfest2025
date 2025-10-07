const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const msg = document.getElementById('msg');

// Load theme from localStorage if available
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.className = savedTheme;

themeBtn.addEventListener('click', () => {
  const isLight = body.classList.contains('light-theme');

  if (isLight) {
    body.classList.replace('light-theme', 'dark-theme');
    themeBtn.textContent = '🌙';
    msg.textContent = 'Dark mode activated!';
    localStorage.setItem('theme', 'dark-theme');
  } else {
    body.classList.replace('dark-theme', 'light-theme');
    themeBtn.textContent = '🌞';
    msg.textContent = 'Light mode activated!';
    localStorage.setItem('theme', 'light-theme');
  }
});
