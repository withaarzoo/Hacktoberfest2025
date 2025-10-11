const msgBox = document.getElementById('bootMessages');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
msgBox.textContent = "Please wait...";
let progress = 0;
const totalTime = 5000;
const interval = 50; 
const increment = 100 / (totalTime / interval);

const progressInterval = setInterval(() => {
  progress += increment;
  if (progress >= 100) progress = 100;
  progressFill.style.width = progress + '%';
  progressPercent.textContent = Math.floor(progress) + '%';
}, interval);

setTimeout(() => {
  clearInterval(progressInterval); 
  progressFill.style.width = '100%';
  progressPercent.textContent = '100%';
  msgBox.textContent = "Loaded successfully";
}, totalTime);
