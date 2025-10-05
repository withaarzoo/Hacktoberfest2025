const STORAGE_KEY = 'keikurono7:themeColor';

function setBodyInnerHeight() {
    const c = getComputedStyle(document.body);
    const box = c.boxSizing || c.getPropertyValue('box-sizing');
    const padTop = parseFloat(c.paddingTop) || 0;
    const padBottom = parseFloat(c.paddingBottom) || 0;

    if (box === 'border-box') {
        document.body.style.height = window.innerHeight + 'px';
    } else {
        const target = Math.max(0, window.innerHeight - padTop - padBottom);
        document.body.style.height = target + 'px';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setBodyInnerHeight);
} else {
    setBodyInnerHeight();
}

let _resizeTimer = null;
window.addEventListener('resize', () => {
    if (_resizeTimer) clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(setBodyInnerHeight, 100);
});
window.addEventListener('orientationchange', () => setTimeout(setBodyInnerHeight, 200));

function hexToRgb(hex) {
    const s = hex.replace('#', '');
    if (s.length === 3) return s.split('').map(c => parseInt(c + c, 16));
    const m = s.match(/.{2}/g);
    return m ? m.map(x => parseInt(x, 16)) : null;
}

function luminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v = v / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(hexA, hexB = '#ffffff') {
    const rgbA = hexToRgb(hexA);
    const rgbB = hexToRgb(hexB);
    if (!rgbA || !rgbB) return 1;
    const L1 = luminance(rgbA[0], rgbA[1], rgbA[2]);
    const L2 = luminance(rgbB[0], rgbB[1], rgbB[2]);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

function applyThemeColor(hex) {
    document.documentElement.style.setProperty('--bg', hex);

    const stop1 = hex + '33';
    const stop2 = hex + '12';
    document.body.style.background = `repeating-linear-gradient(135deg, ${stop1} 0 16px, ${stop2} 16px 32px), linear-gradient(135deg, ${hex}22 0%, ${hex}11 60%)`;

    const whiteContrast = contrastRatio(hex, '#ffffff');
    if (whiteContrast > 2.2) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');

    localStorage.setItem(STORAGE_KEY, hex);
}

function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const radios = Array.from(document.querySelectorAll('.color-radio'));
    radios.forEach(r => r.addEventListener('change', e => { if (e.target.checked) applyThemeColor(e.target.value); }));

    if (saved) {
        const match = radios.find(r => r.value.toLowerCase() === saved.toLowerCase());
        if (match) { match.checked = true; match.dispatchEvent(new Event('change')); }
        else applyThemeColor(saved);
    } else {
        if (radios[0]) { radios[0].checked = true; radios[0].dispatchEvent(new Event('change')); }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    setTimeout(setBodyInnerHeight, 20);
});

window.applyThemeColor = applyThemeColor;
