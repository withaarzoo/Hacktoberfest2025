const btn = document.querySelector('.follow-btn');

btn.addEventListener('click', () => {
    if(btn.textContent === 'Follow') {
        btn.textContent = 'Following';
        btn.style.background = '#555';
    } else {
        btn.textContent = 'Follow';
        btn.style.background = '#4CAF50';
    }
});
