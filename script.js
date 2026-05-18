/* ===================================================
   NEXUS PC — Interactions
=================================================== */

(function () {
    'use strict';

    // === SCROLL REVEAL ===
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const siblings = Array.from(
                        entry.target.parentElement.querySelectorAll('[data-reveal]')
                    );
                    const i = siblings.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, i * 60);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // === DARK MODE TOGGLE ===
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('nexus-theme') || 'light';

    html.setAttribute('data-theme', saved);
    setIcon(saved);

    themeToggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('nexus-theme', next);
        setIcon(next);
    });

    function setIcon(theme) {
        const i = themeToggle.querySelector('i');
        i.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    }

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
