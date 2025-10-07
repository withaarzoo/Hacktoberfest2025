(function(){
      const tiltEls = document.querySelectorAll('[data-tilt]');
      tiltEls.forEach(el => {
        const maxRot = 12; 
        function onMove(e){
          const rect = el.getBoundingClientRect();
          const width = rect.width, height = rect.height;
          const x = ((e.clientX ?? (e.touches && e.touches[0].clientX)) - rect.left) / width;
          const y = ((e.clientY ?? (e.touches && e.touches[0].clientY)) - rect.top) / height;
          const rotY = (x - 0.5) * maxRot * 2; // left/right
          const rotX = (0.5 - y) * maxRot * 2; // up/down
          el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
          el.style.boxShadow = `${-rotY}px ${rotX}px 30px rgba(2,6,23,0.55)`;
        }
        function onLeave(){ el.style.transform=''; el.style.boxShadow=''; }
        el.addEventListener('mousemove', onMove);
        el.addEventListener('touchmove', onMove, {passive:true});
        el.addEventListener('mouseleave', onLeave);
        el.addEventListener('touchend', onLeave);
        el.addEventListener('blur', onLeave);
      });
    })();

    /* ----------------- JS: Flip card (click + keyboard) ----------------- */
    (function(){
      const flipCards = document.querySelectorAll('.card-flip');
      flipCards.forEach(card => {
        const inner = card.querySelector('.flip-inner');
        card.addEventListener('click', (ev) => {
          inner.classList.toggle('is-flipped');
        });
        card.addEventListener('keydown', (ev) => {
          if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); inner.classList.toggle('is-flipped'); }
        });
        const toggles = card.querySelectorAll('.flip-toggle');
        toggles.forEach(t => t.addEventListener('click', (e)=>{ e.stopPropagation(); inner.classList.toggle('is-flipped'); }));
      });
    })();

    /* ----------------- Niceties: Reduce motion preference ----------------- */
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.querySelectorAll('.flip-inner').forEach(i=>i.style.transition='none');
      document.querySelectorAll('[data-tilt]').forEach(e=>{ e.removeEventListener('mousemove', ()=>{}); });
    }