document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.glass-card');
  const buttons = document.querySelectorAll('.btn');
  
  // Enhanced card animation on load
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show');
        }, 100);
      }
    });
  }, observerOptions);
  
  if (card) {
    cardObserver.observe(card);
  }
  
  // Enhanced mouse tracking for 3D effect
  card?.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
      translateY(-8px) 
      scale(1.02) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      perspective(1000px)
    `;
  });
  
  card?.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
  });
  
  // Button click effects with ripple animation
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      // Add ripple keyframes if not already added
      if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      this.appendChild(ripple);
      
      // Handle button actions
      if (this.textContent.trim() === 'Preview') {
        console.log('Opening preview...');
        // Add your preview logic here
      } else if (this.textContent.trim() === 'Get Code') {
        console.log('Copying code...');
        // Add your code copy logic here
      }
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Keyboard navigation support
  card?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
  
  // Performance optimization: Reduce motion for users who prefer it
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    card?.style.setProperty('--animation-duration', '0.1s');
  }
});
