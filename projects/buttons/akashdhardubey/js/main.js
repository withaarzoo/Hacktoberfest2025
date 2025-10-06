// Simple JavaScript for buttons - Easy to understand!
// Author: akashdhardubey

// This function shows a message when buttons are clicked
function showMessage(message) {
    // Find the message area on the page
    var messageArea = document.getElementById('message-area');
    
    // Change the text in the message area
    messageArea.textContent = message;
    
    // Add a nice color change effect
    messageArea.style.backgroundColor = '#d5f4e6';
    messageArea.style.borderLeftColor = '#2ecc71';
    
    // After 2 seconds, change it back to normal
    setTimeout(function() {
        messageArea.style.backgroundColor = '#ecf0f1';
        messageArea.style.borderLeftColor = '#3498db';
    }, 2000);
    
    // Also show the message in the browser console (for developers)
    console.log('Button clicked: ' + message);
}

// This runs when the page finishes loading
document.addEventListener('DOMContentLoaded', function() {
    // Say hello in the console
    console.log('Page loaded successfully!');
    
    // Find all buttons on the page
    var allButtons = document.querySelectorAll('button');
    
    // Add a click counter
    var clickCount = 0;
    
    // Add special effects to each button
    allButtons.forEach(function(button, index) {
        // Add a number to each button (just for fun)
        button.setAttribute('data-button-number', index + 1);
        
        // Add a special click effect
        button.addEventListener('click', function() {
            // Count how many times buttons have been clicked
            clickCount++;
            
            // Add a special class for animation
            this.classList.add('clicked');
            
            // Remove the class after a short time
            setTimeout(function() {
                button.classList.remove('clicked');
            }, 300);
            
            // Show total clicks
            console.log('Total button clicks: ' + clickCount);
        });
        
        // Add hover sound effect (just visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add a welcome message
    setTimeout(function() {
        showMessage('Welcome! Try clicking the buttons above.');
    }, 1000);
});

// Add some extra CSS for the click animation
var style = document.createElement('style');
style.textContent = `
    .clicked {
        transform: scale(0.95) !important;
        background-color: #95a5a6 !important;
    }
    
    button {
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);

// Simple function to change page background color (bonus feature)
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    showMessage('Background color changed to ' + color + '!');
}

// Function to reset everything
function resetPage() {
    document.body.style.backgroundColor = '#f0f0f0';
    document.getElementById('message-area').textContent = 'Click any button above to see a message here!';
    showMessage('Page reset!');
}