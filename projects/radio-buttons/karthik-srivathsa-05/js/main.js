const body = document.body;
const radios = document.querySelectorAll('input[name="option"]');

const backgrounds = [
  'linear-gradient(120deg, #f6d365, #fda085)',
  'radial-gradient(circle at top left, #ffafbd, #ffc3a0)',
  'linear-gradient(45deg, #43cea2, #185a9d)',
  'radial-gradient(circle at bottom right, #ff512f, #dd2476)'
];

radios.forEach((radio, index) => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      body.style.background = backgrounds[index % backgrounds.length];
    }
  });
});