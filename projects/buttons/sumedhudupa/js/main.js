document.addEventListener('DOMContentLoaded', () => {
    const spiritBtn = document.getElementById('spiritBtn');

    spiritBtn.addEventListener('click', (e) => {
        const rect = spiritBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create multiple spirit particles
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            createSpiritParticle(centerX, centerY, i, particleCount);
        }
    });

    function createSpiritParticle(x, y, index, total) {
        const particle = document.createElement('div');
        particle.className = 'spirit-particle';

        // Calculate random direction with some upward bias
        const angle = (index / total) * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 50; // Upward bias

        particle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;

        document.body.appendChild(particle);

        // Create trail effect
        createTrail(x, y, tx, ty);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }

    function createTrail(startX, startY, endX, endY) {
        const trailCount = 8;

        for (let i = 0; i < trailCount; i++) {
            setTimeout(() => {
                const trail = document.createElement('div');
                trail.className = 'spirit-trail';

                const progress = i / trailCount;
                const currentX = startX + (endX * progress * 0.3);
                const currentY = startY + (endY * progress * 0.3);

                trail.style.cssText = `
                    left: ${currentX}px;
                    top: ${currentY}px;
                `;

                document.body.appendChild(trail);

                setTimeout(() => {
                    trail.remove();
                }, 1000);
            }, i * 50);
        }
    }
});
