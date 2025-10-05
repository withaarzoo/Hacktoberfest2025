const toggle = document.getElementById('darkToggle');

toggle.addEventListener('change',
                        () => { document.body.classList.toggle('dark'); });
