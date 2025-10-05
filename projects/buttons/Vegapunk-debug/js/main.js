const mergeButton = document.querySelector('button');

// Add a click event listener
mergeButton.addEventListener('click', () => {
    // Animate the button
    mergeButton.style.transform = 'scale(0.95)';
    
    // Reset scale after 150ms for a "press" effect
    setTimeout(() => {
        mergeButton.style.transform = 'scale(1)';
    }, 150);

    // Show a fun alert
    alert('🎉 Button clicked! Ready to merge!');
});