# Cyber Card — Component

This folder contains a self-contained interactive "Cyber Card" UI component.

Files
- `index.html` — Component demo markup.
- `css/style.css` — Component styles (glows, particles, tilt rules).
- `js/main.js` — Pointer-based parallax + keyboard support (requestAnimationFrame).
- `assets/images/` — Place images here if needed.

Features
- Smooth pointer/touch parallax (rotateX / rotateY) implemented in `js/main.js`.
- 5×5 invisible tracker grid fallback is preserved in CSS for discrete hover rules.
- Keyboard support (Arrow keys) and semantic roles for accessibility.

Quick local test

1. Open a terminal inside this folder and run a simple static server. If you have Python installed:

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

2. Move your pointer over the card, or use the arrow keys when the card is focused.

Netlify deploy instructions

1. Zip or drag-and-drop *only this folder* (`PiyushGrover435`) to Netlify's site deploy area.
2. Change the site name in Netlify settings and copy the generated URL.
3. Add your contributor entry to the project's root `contributors.json` and include the Netlify URL.

Accessibility notes

- The component's container has `tabindex="0"` and `role="group"` so it can be focused.
- If this component is purely decorative on a page, add `aria-hidden="true"` to the container to hide it from assistive tech.
- If interactive, keyboard arrow keys nudge the tilt; `Escape` resets it.

Performance & mobile

- The script uses `requestAnimationFrame` to apply transforms which are GPU-accelerated on modern browsers.
- On very low-end devices, consider reducing blur and glow in `css/style.css` or disabling the script.

Credits

- Original visual design inspired by cyber/neon card UI patterns; CSS rules were adapted from a Uiverse.io sample.
