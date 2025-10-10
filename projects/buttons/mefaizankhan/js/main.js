// Simple ripple click effect — accessible and small
document.addEventListener('click', function(e){
  const btn = e.target.closest('.elevate');
  if(!btn) return;

  // If click came from keyboard (no mouse coords), center ripple
  const rect = btn.getBoundingClientRect();
  let x = (e.clientX === 0 && e.clientY === 0) ? rect.width/2 : e.clientX - rect.left;
  let y = (e.clientX === 0 && e.clientY === 0) ? rect.height/2 : e.clientY - rect.top;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
  btn.appendChild(ripple);

  ripple.addEventListener('animationend', ()=> ripple.remove());
});
