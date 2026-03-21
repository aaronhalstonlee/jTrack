let count = localStorage.getItem('jTrackCount') ? parseInt(localStorage.getItem('jTrackCount')) : 0;
const display = document.getElementById('display');
const successSound = new Audio('success.mp3');
const clickSound = new Audio('click.mp3');

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('jTrackTheme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerText = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.innerText = isDark ? '☀️' : '🌙';
    localStorage.setItem('jTrackTheme', isDark ? 'dark' : 'light');
});

// Haptic & Audio Feedback
function triggerFeedback() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {}); // Catch prevents errors if sound hasn't loaded
    if (navigator.vibrate) navigator.vibrate(50);
}

function updateCounter(newValue) {
    const prev = count;
    count = newValue;
    display.innerText = count;
    localStorage.setItem('jTrackCount', count);

    if (count >= 20) {
        document.body.classList.add('milestone-reached');
        if (prev === 19 && count === 20) {
            successSound.play().catch(() => {});
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    } else {
        document.body.classList.remove('milestone-reached');
    }
}

document.getElementById('plus').addEventListener('click', () => { triggerFeedback(); updateCounter(count + 1); });
document.getElementById('minus').addEventListener('click', () => { triggerFeedback(); updateCounter(count - 1); });
document.getElementById('reset').addEventListener('click', () => { updateCounter(0); });

// Initial Load
updateCounter(count);

// Service Worker for Offline Use
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.
                                     js');
}
