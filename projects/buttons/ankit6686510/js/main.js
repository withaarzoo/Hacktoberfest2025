// Glassmorphism Button Collection JavaScript
// Author: ankit6686510
// Created for Hacktoberfest 2025

document.addEventListener('DOMContentLoaded', function() {
    // Initialize click counter
    let clickCount = 0;
    const clickCountElement = document.getElementById('clickCount');
    
    // Get all glass buttons
    const glassButtons = document.querySelectorAll('.glass-btn');
    
    // Add event listeners to all buttons
    glassButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
    });
    
    // Handle button click events
    function handleButtonClick(e) {
        const button = e.currentTarget;
        const buttonText = button.getAttribute('data-text');
        
        // Create ripple effect
        createRippleEffect(e, button);
        
        // Increment click counter
        clickCount++;
        updateClickCounter();
        
        // Add click animation
        button.style.transform = 'translateY(2px) scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Show feedback message
        showClickFeedback(buttonText, button);
        
        // Add successful click class for additional styling
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 300);
        
        console.log(`${buttonText} button clicked! Total clicks: ${clickCount}`);
    }
    
    // Create ripple effect on button click
    function createRippleEffect(e, button) {
        const ripple = button.querySelector('.ripple-effect');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Reset ripple
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '1';
        
        // Trigger ripple animation
        requestAnimationFrame(() => {
            ripple.style.transform = 'scale(4)';
            ripple.style.opacity = '0';
        });
    }
    
    // Handle button hover events
    function handleButtonHover(e) {
        const button = e.currentTarget;
        
        // Add subtle glow effect
        button.style.boxShadow = '0 20px 50px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.1)';
        
        // Slightly increase the backdrop blur
        button.style.backdropFilter = 'blur(25px)';
        button.style.webkitBackdropFilter = 'blur(25px)';
    }
    
    // Handle button leave events
    function handleButtonLeave(e) {
        const button = e.currentTarget;
        
        // Reset styles
        button.style.backdropFilter = 'blur(20px)';
        button.style.webkitBackdropFilter = 'blur(20px)';
    }
    
    // Update click counter display
    function updateClickCounter() {
        clickCountElement.textContent = clickCount;
        
        // Add animation to counter
        clickCountElement.style.transform = 'scale(1.2)';
        clickCountElement.style.color = '#00ff88';
        
        setTimeout(() => {
            clickCountElement.style.transform = 'scale(1)';
            clickCountElement.style.color = '#ffd700';
        }, 200);
    }
    
    // Show click feedback
    function showClickFeedback(buttonText, button) {
        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = 'click-feedback';
        feedback.textContent = `${buttonText} clicked!`;
        feedback.style.cssText = `
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        `;
        
        // Add to button wrapper
        const buttonWrapper = button.closest('.button-wrapper');
        buttonWrapper.style.position = 'relative';
        buttonWrapper.appendChild(feedback);
        
        // Animate feedback
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.top = '-60px';
        });
        
        // Remove feedback after animation
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.top = '-40px';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 1500);
    }
    
    // Initialize particle animation
    initializeParticles();
    
    // Initialize particles with random movement
    function initializeParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            // Set random initial positions
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
            
            // Add random movement animation
            animateParticle(particle, index);
        });
    }
    
    // Animate individual particles
    function animateParticle(particle, index) {
        const duration = 4000 + Math.random() * 4000; // 4-8 seconds
        const delay = index * 1000; // Stagger animations
        
        setInterval(() => {
            const newX = Math.random() * 100;
            const newY = Math.random() * 100;
            
            particle.style.transition = `all ${duration}ms ease-in-out`;
            particle.style.left = newX + '%';
            particle.style.top = newY + '%';
            particle.style.opacity = Math.random() * 0.7 + 0.3;
        }, duration + delay);
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Handle Enter key on focused buttons
        if (e.key === 'Enter' && e.target.classList.contains('glass-btn')) {
            e.target.click();
        }
        
        // Handle Space key on focused buttons
        if (e.key === ' ' && e.target.classList.contains('glass-btn')) {
            e.preventDefault();
            e.target.click();
        }
    });
    
    // Add accessibility attributes
    glassButtons.forEach((button, index) => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        button.setAttribute('aria-label', `${button.getAttribute('data-text')} glassmorphism button`);
        button.setAttribute('aria-describedby', 'demo-description');
    });
    
    // Add demo description for screen readers
    const demoSection = document.querySelector('.demo-section');
    if (demoSection) {
        demoSection.setAttribute('id', 'demo-description');
        demoSection.setAttribute('aria-live', 'polite');
    }
    
    // Performance optimization: Use passive event listeners where appropriate
    const passiveOptions = { passive: true };
    
    // Add scroll-based animations
    window.addEventListener('scroll', handleScroll, passiveOptions);
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const particles = document.querySelectorAll('.particle');
        
        // Parallax effect for particles
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    // Add window resize handler for responsive adjustments
    window.addEventListener('resize', handleResize, passiveOptions);
    
    function handleResize() {
        // Recalculate particle positions on resize
        initializeParticles();
        
        // Log resize for debugging
        console.log('Window resized, particles repositioned');
    }
    
    // Initialize component
    console.log('Glassmorphism Button Collection initialized successfully!');
    console.log(`Total buttons: ${glassButtons.length}`);
    
    // Add welcome message
    setTimeout(() => {
        console.log('🎉 Welcome to the Glassmorphism Button Collection!');
        console.log('💡 Try clicking the buttons to see the interactive effects!');
        console.log('🚀 Created for Hacktoberfest 2025 by ankit6686510');
    }, 1000);
});
