document.addEventListener('DOMContentLoaded', () => {
    const repCounter = document.getElementById('repCounter');
    const repCount = document.getElementById('repCount');
    const resetBtn = document.getElementById('resetReps');
    let reps = 0;

    if (repCounter && repCount) {
        repCounter.addEventListener('change', (e) => {
            if (e.target.checked) {
                reps++;
                repCount.textContent = reps;

                repCount.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    repCount.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            reps = 0;
            repCount.textContent = reps;
            repCounter.checked = false;

            resetBtn.style.transform = 'rotate(360deg) scale(0.8)';
            setTimeout(() => {
                resetBtn.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        });
    }

    const allDumbbells = document.querySelectorAll('.dumbbell-input');
    allDumbbells.forEach(dumbbell => {
        dumbbell.addEventListener('change', (e) => {
            const weight = e.target.parentElement.querySelector('.dumbbell-weight');

            if (e.target.checked) {
                weight.style.transform = 'translateX(-50%) rotate(5deg) scale(1.05)';
                setTimeout(() => {
                    weight.style.transform = 'translateX(-50%) rotate(5deg) scale(1)';
                }, 300);
            } else {
                weight.style.transform = 'translateX(-50%) scale(1.05)';
                setTimeout(() => {
                    weight.style.transform = 'translateX(-50%) scale(1)';
                }, 300);
            }
        });

        dumbbell.parentElement.addEventListener('mouseenter', () => {
            const track = dumbbell.parentElement.querySelector('.dumbbell-track');
            track.style.transform = 'scale(1.02)';
        });

        dumbbell.parentElement.addEventListener('mouseleave', () => {
            const track = dumbbell.parentElement.querySelector('.dumbbell-track');
            track.style.transform = 'scale(1)';
        });
    });

    const cards = document.querySelectorAll('.dumbbell-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
