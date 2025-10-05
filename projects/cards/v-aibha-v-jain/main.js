(function(){
    const defaultCards = [
        {title:'Card 1', desc:'A beautiful sunrise to begin the cycle.'},
        {title:'Card 2', desc:'Clear bright sun — full of energy.'},
        {title:'Card 3', desc:'Warm orange hues as the sun sets.'},
        {title:'Card 4', desc:'Calm night with a starry feel.'}
    ];

    fetch('data.json')
        .then( r=> { 
            if(!r.ok) 
                throw new Error('no data.json'); 
            return r.json(); 
        })
        .then(data => { 
            initCarousel(Array.isArray(data) && data.length ? data : defaultCards); 
        })
        .catch(()=>{ initCarousel(defaultCards); });

    function initCarousel(cards){
        const stage = document.getElementById('stage');
        const bgElems = Array.from(stage.querySelectorAll('.bg'));
        const titleEl = document.getElementById('cardTitle');
        const descEl = document.getElementById('cardDesc');
        const metaEl = document.getElementById('cardMeta');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        const pager = document.getElementById('pager');
        const cardInner = document.getElementById('cardInner');
        const starsEl = document.getElementById('stars');

        let index = 0;
        const total = cards.length;
        let animating = false;

        pager.innerHTML = '';
        for(let i=0;i<total;i++){
            const d = document.createElement('span');
            d.className = 'dot';
            (function(target){ 
                d.addEventListener('click', ()=>{ 
                    if(!animating) 
                        animateCardSwap(target, target>index?1:-1); 
                }); 
            })(i);
            pager.appendChild(d);
        }

        function animateCardSwap(newIndex, dir){
        if(animating) return;
        animating = true;
        index = (newIndex % total + total) % total;
        const c = cards[index];

        cardInner.style.transition = 'transform .8s cubic-bezier(.2,.9,.2,1), opacity .6s ease';
        cardInner.style.transform = `translateX(${dir===1?80:-80}px) scale(.98)`;
        cardInner.style.opacity = '0';

        setTimeout(()=>{
            titleEl.textContent = c.title;
            descEl.textContent = c.desc;

            const stateOrder = ['sunrise','bright','sunset','night'];
            const state = stateOrder[index % 4];
            metaEl.textContent = capitalize(state);

            stage.dataset.state = state;

            cardInner.style.transform = `translateX(${dir===1?-12:12}px) scale(1)`;
            cardInner.style.opacity = '1';

            setTimeout(()=>{ cardInner.style.transform = ''; }, 520);
            setTimeout(()=>{ animating = false; }, 760);
        }, 260);

        const stateOrder = ['sunrise','bright','sunset','night'];
        const state = stateOrder[index % 4];
        bgElems.forEach(b=>{b.classList.toggle('active', b.dataset.state===state)});

        const dots = pager.querySelectorAll('.dot');
        dots.forEach((d,i)=>d.classList.toggle('active', i===index));

        if(state === 'night') starsEl.classList.add('twinkle');
        else starsEl.classList.remove('twinkle');
        }

        function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}

        animateCardSwap(0, 1);

        function goNext(){ animateCardSwap(index+1, 1); }
        function goPrev(){ animateCardSwap(index-1, -1); }

        nextBtn.addEventListener('click', ()=>{ if(!animating) goNext(); });
        prevBtn.addEventListener('click', ()=>{ if(!animating) goPrev(); });

        window.addEventListener('keydown', (e)=>{ 
            if(e.key === 'ArrowRight') 
                goNext(); 
            else if(e.key === 'ArrowLeft') 
                goPrev(); 
        });

        prevBtn.tabIndex=0; nextBtn.tabIndex=0;

        window._cardCarousel = { goNext, goPrev, animateCardSwap };
    }
})();
