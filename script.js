(function () {
    'use strict';

    // === DARK MODE TOGGLE ===
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('nexus-theme') || 'light';
    root.setAttribute('data-theme', saved);
    setIcon(saved);

    toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('nexus-theme', next);
        setIcon(next);
    });

    function setIcon(theme) {
        const i = toggle.querySelector('i');
        i.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    }

    // === SCROLL REVEAL ===
    const reveals = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-reveal]'));
                const i = siblings.indexOf(entry.target);
                setTimeout(() => entry.target.classList.add('revealed'), i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));

    // === SMOOTH NAV LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
})();
