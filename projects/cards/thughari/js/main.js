// 3D Tilt only for desktops (mouse only)
const card = document.querySelector('.card');

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (!isTouchDevice()) {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}
