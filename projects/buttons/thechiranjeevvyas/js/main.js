const button = document.getElementById('ripple-btn');
const githubUrl = "https://github.com/thechiranjeevvyas";

button.addEventListener('click', function (e) {
  const circle = document.createElement('span');
  circle.classList.add('ripple');
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = size + 'px';
  
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';

  this.appendChild(circle);
  circle.addEventListener('animationend', () => {
    circle.remove();
  });

  window.open(githubUrl, "_blank");
});
