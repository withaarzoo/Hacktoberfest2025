/*
 * main.js — Pointer-based parallax for Cyber Card
 * -----------------------------------------------------------------------------
 * Features:
 *  - Smooth pointer / touch parallax (rotateX / rotateY) using requestAnimationFrame
 *  - Pointer enter/leave handling to reset the card
 *  - Basic keyboard support (Arrow keys to nudge tilt)
 *  - Adds tabindex and aria-label to the container for keyboard/accessibility
 *
 * How it works (high level):
 *  - We listen to pointermove events inside the .container element and compute a
 *    normalized point relative to the center of the element (-1..1).
 *  - The normalized values are scaled by `maxTilt` and applied as CSS transform
 *    to the `#card` element using rotateX / rotateY. Updates are applied in an
 *    rAF loop for smoothness and to avoid layout thrash.
 *
 * Notes:
 *  - This script is intentionally lightweight and dependency-free.
 *  - If you prefer the original discrete-grid hover behavior, remove or
 *    comment out this file and the CSS `.tr-*` rules will still work.
 */

(function () {
  'use strict';

  const container = document.querySelector('.container');
  const card = document.getElementById('card');
  if (!container || !card) return; // nothing to do

  // Configuration
  const maxTilt = 15; // degrees
  const easing = 0.12; // 0..1 lerp factor for smoothness (higher = snappier)
  const zOffset = 18; // translateZ when pointer is near center

  // Accessibility: make container focusable and describe it for assistive tech
  if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '0');
  if (!container.hasAttribute('role')) container.setAttribute('role', 'group');
  if (!container.hasAttribute('aria-label'))
    container.setAttribute('aria-label', 'Interactive cyber card. Use pointer or arrow keys to tilt.');

  // Internal state
  let targetX = 0; // target rotationY
  let targetY = 0; // target rotationX
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function onPointerMove(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] && e.touches[0].clientX);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] && e.touches[0].clientY);
    if (clientX == null || clientY == null) return;

    const x = (clientX - rect.left) / rect.width; // 0..1
    const y = (clientY - rect.top) / rect.height; // 0..1

    // normalize to -1 .. 1 with center at 0
    const nx = (x - 0.5) * 2;
    const ny = (y - 0.5) * 2;

    targetY = clamp(-ny * maxTilt, -maxTilt, maxTilt); // rotateX (inverted)
    targetX = clamp(nx * maxTilt, -maxTilt, maxTilt); // rotateY

    // small Z translation based on closeness to center
    const distanceFromCenter = Math.hypot(nx, ny); // 0..~1.414
    card.style.setProperty('--card-translate-z', `${zOffset * (1 - Math.min(1, distanceFromCenter))}px`);
  }

  function onPointerEnter() {
    // remove any slow transition so motion feels immediate
    card.style.transition = 'transform 0s';
    startRAF();
  }

  function onPointerLeave() {
    // reset targets
    targetX = 0;
    targetY = 0;
    // restore a gentle transition for the snap-back
    card.style.transition = 'transform 400ms cubic-bezier(.2,.9,.2,1)';
    stopRAFAfterReset();
  }

  // Keyboard support: nudge rotation with arrow keys
  function onKeyDown(e) {
    const step = 3; // degrees per keypress
    switch (e.key) {
      case 'ArrowUp':
        targetY = clamp(targetY + step, -maxTilt, maxTilt);
        e.preventDefault();
        startRAF();
        break;
      case 'ArrowDown':
        targetY = clamp(targetY - step, -maxTilt, maxTilt);
        e.preventDefault();
        startRAF();
        break;
      case 'ArrowLeft':
        targetX = clamp(targetX - step, -maxTilt, maxTilt);
        e.preventDefault();
        startRAF();
        break;
      case 'ArrowRight':
        targetX = clamp(targetX + step, -maxTilt, maxTilt);
        e.preventDefault();
        startRAF();
        break;
      case 'Escape':
        targetX = 0; targetY = 0; e.preventDefault();
        break;
    }
  }

  function update() {
    // lerp toward target
    currentX += (targetX - currentX) * easing;
    currentY += (targetY - currentY) * easing;

    // apply transform
    const tz = card.style.getPropertyValue('--card-translate-z') || `${zOffset}px`;
    card.style.transform = `rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg) translateZ(${tz})`;

    rafId = requestAnimationFrame(update);
  }

  function startRAF() {
    if (!rafId) rafId = requestAnimationFrame(update);
  }

  function stopRAFAfterReset() {
    // allow a short period for the snap-back to be visible, then cancel rAF
    setTimeout(() => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, 420);
  }

  // Add event listeners
  container.addEventListener('pointermove', onPointerMove, { passive: true });
  container.addEventListener('pointerenter', onPointerEnter);
  container.addEventListener('pointerleave', onPointerLeave);
  container.addEventListener('focus', onPointerEnter);
  container.addEventListener('blur', onPointerLeave);
  container.addEventListener('keydown', onKeyDown);

  // Initialize CSS variable for translateZ
  card.style.setProperty('--card-translate-z', `${zOffset}px`);

  // small performance hint: hint the browser which properties will change
  card.style.willChange = 'transform';

  // start idle RAF for a tiny subtle breathing animation (optional)
  // not required; commented out by default
  // rafId = requestAnimationFrame(update);

})();
