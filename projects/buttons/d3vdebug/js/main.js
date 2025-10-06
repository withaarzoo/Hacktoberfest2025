const messageBox = document.getElementById('messageBox');
const saasButton = document.getElementById('saasButton');

// Function to show the success message box
function showMessage(text) {
    console.log("Modern SaaS button clicked!");
    
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');
    
    // Use opacity transition for a smooth fade-in
    setTimeout(() => {
        messageBox.classList.add('opacity-100');
    }, 10); // Small delay to ensure the browser registers the 'hidden' removal first

    // Hide the message box after a short delay
    setTimeout(() => {
        messageBox.classList.remove('opacity-100');
        // Wait for the CSS transition (300ms) before hiding completely
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 300); 
    }, 2000); // Message visible for 2 seconds
}

// Attach the click handler to the button
saasButton.addEventListener('click', () => {
    showMessage('Action Successful!');
});

// Add a nice ripple effect on mousedown (touchstart for mobile)
saasButton.addEventListener('mousedown', function(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calculate ripple start position relative to the button
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.top = y + 'px';
    ripple.style.left = x + 'px';

    button.appendChild(ripple);

    // Remove the ripple element once the animation is complete
    ripple.addEventListener('animationend', function() {
        ripple.remove();
    });
});
