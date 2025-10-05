const mergeButton = document.querySelector('button');

mergeButton.addEventListener('click', () => {
    mergeButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        mergeButton.style.transform = 'scale(1)';
    }, 150);
    alert('🎉 Button clicked! Ready to merge!');
});