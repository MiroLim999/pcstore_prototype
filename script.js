/* ===================================================
   NEXUS PC — Premium PC Store
   Vanilla JavaScript — Interactions & Animations
=================================================== */

(function () {
    'use strict';

    // === NAVBAR SCROLL BEHAVIOR ===
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // === SCROLL REVEAL ANIMATION ===
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation by index within parent
                    const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-reveal]'));
                    const i = siblings.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, i * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // === HERO PARALLAX MOUSE EFFECT ===
    const heroPC = document.getElementById('heroPC');

    if (heroPC) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            heroPC.style.transform = `translate(${moveX * 15}px, ${moveY * 10}px)`;
        });
    }

    // === DARK MODE TOGGLE ===
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved preference
    const savedTheme = localStorage.getItem('nexus-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('nexus-theme', next);
        updateToggleIcon(next);
    });

    function updateToggleIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'ri-sun-line';
        } else {
            icon.className = 'ri-moon-line';
        }
    }


    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === BUTTON RIPPLE EFFECT ===
    document.querySelectorAll('.btn-primary, .product-btn').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-anim 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-anim {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // === CATEGORY CARDS — TILT EFFECT ===
    document.querySelectorAll('.category-card').forEach((card) => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            this.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === COUNTER ANIMATION FOR HERO STATS ===
    const statNumbers = document.querySelectorAll('.hero-stat-number');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    // Simple reveal — stats already display; just add class
                    el.style.opacity = '1';
                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));

})();
