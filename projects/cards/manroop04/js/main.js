const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const scratchCard = document.getElementById('scratchCard');
const confettiContainer = document.getElementById('confettiContainer');
let isDrawing = false;
let isRevealed = false;

function setupCanvas() {
  ctx.globalCompositeOperation = 'source-over';
  
  ctx.fillStyle = '#f8a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);
  
  ctx.globalCompositeOperation = 'destination-out';
  
  isRevealed = false;
  scratchCard.classList.remove('revealed');
}

setupCanvas();

function checkScratchProgress() {
  if (isRevealed) return;
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let transparentPixels = 0;
  
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 128) {
      transparentPixels++;
    }
  }
  
  const totalPixels = canvas.width * canvas.height;
  const scratchedPercentage = (transparentPixels / totalPixels) * 100;
  
  if (scratchedPercentage > 70) {
    isRevealed = true;
    celebrateWin();
  }
}

function celebrateWin() {
  scratchCard.classList.add('revealed');
  
  createConfetti();
  
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 500);
}

function createConfetti() {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
  const confettiCount = 150;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 10 + 5) + 'px';
      confetti.style.height = (Math.random() * 10 + 5) + 'px';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 0.5) + 's';
      
      confettiContainer.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }, i * 10);
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  scratch(e);
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  checkScratchProgress();
});

canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isDrawing = true;
  scratch(e);
});

canvas.addEventListener('touchend', () => {
  isDrawing = false;
  checkScratchProgress();
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  scratch(e);
});

function scratch(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  let x, y;

  if (e.type.includes('touch')) {
    const touch = e.touches[0];
    x = touch.clientX - rect.left;
    y = touch.clientY - rect.top;
  } else {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }

  x = (x / rect.width) * canvas.width;
  y = (y / rect.height) * canvas.height;

  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();
}

document.getElementById('resetBtn').addEventListener('click', () => {
  setupCanvas();
  confettiContainer.innerHTML = '';
});