// Interactive JavaScript for Modern Profile Card

document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const buttons = document.querySelectorAll('.btn');
    const skillTags = document.querySelectorAll('.skill-tag');
    const profileImage = document.querySelector('.profile-image img');
    
    // Add mouse tracking effect to card
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effects to skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add click animation to profile image
    profileImage.addEventListener('click', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
    
    // Add dynamic stats animation
    animateStats();
    
    // Add typing effect to bio
    typeWriter();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add touch gestures for mobile
    addTouchGestures();
});

// Animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                if (numericValue) {
                    animateNumber(target, 0, numericValue, 2000, finalValue);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate number counting
function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    const isK = suffix.includes('K');
    const finalEnd = isK ? end * 1000 : end;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (finalEnd - start) * easeOutCubic(progress);
        const displayValue = isK ? (current / 1000).toFixed(1) + 'K' : Math.floor(current);
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = suffix;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Typewriter effect for bio
function typeWriter() {
    const bioElement = document.querySelector('.bio p');
    const originalText = bioElement.textContent;
    bioElement.textContent = '';
    
    let i = 0;
    
    function type() {
        if (i < originalText.length) {
            bioElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Add keyboard navigation
function addKeyboardNavigation() {
    const interactiveElements = document.querySelectorAll('.btn, .skill-tag');
    
    interactiveElements.forEach((element, index) => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' && index < interactiveElements.length - 1) {
                interactiveElements[index + 1].focus();
            }
            if (e.key === 'ArrowLeft' && index > 0) {
                interactiveElements[index - 1].focus();
            }
        });
    });
}

// Add touch gestures for mobile
function addTouchGestures() {
    let startY = 0;
    let startX = 0;
    
    card.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });
    
    card.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const diffY = startY - currentY;
        const diffX = startX - currentX;
        
        // Swipe up to expand
        if (diffY > 50 && Math.abs(diffX) < 100) {
            card.style.transform = 'scale(1.05)';
        }
        // Swipe down to reset
        else if (diffY < -50 && Math.abs(diffX) < 100) {
            card.style.transform = 'scale(1)';
        }
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}

// Add dynamic color changing
function addDynamicColors() {
    const colorSchemes = [
        { primary: '#667eea', secondary: '#764ba2' },
        { primary: '#ff6b6b', secondary: '#4ecdc4' },
        { primary: '#ff9a9e', secondary: '#fecfef' },
        { primary: '#a8edea', secondary: '#fed6e3' }
    ];
    
    let currentScheme = 0;
    
    // Change colors every 15 seconds
    setInterval(() => {
        currentScheme = (currentScheme + 1) % colorSchemes.length;
        updateColors(colorSchemes[currentScheme]);
    }, 15000);
}

// Update color scheme
function updateColors(scheme) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', scheme.primary);
    root.style.setProperty('--secondary-color', scheme.secondary);
    
    // Update gradient backgrounds
    const gradientElements = document.querySelectorAll('.card-header, .btn-primary, .skill-tag');
    gradientElements.forEach(element => {
        element.style.background = `linear-gradient(135deg, ${scheme.primary}, ${scheme.secondary})`;
    });
}

// Initialize dynamic colors
addDynamicColors();

// Add performance monitoring
function addPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'measure') {
                    console.log(`${entry.name}: ${entry.duration}ms`);
                }
            });
        });
        
        observer.observe({ entryTypes: ['measure'] });
    }
}

// Add error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateStats,
        typeWriter,
        updateColors
    };
}
