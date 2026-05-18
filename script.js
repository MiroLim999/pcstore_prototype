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

    // === GALLERY MODAL ===
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalCounter = document.getElementById('modalCounter');
    const cells = Array.from(document.querySelectorAll('.bento-cell[data-img]'));
    const images = cells.map(c => c.getAttribute('data-img'));
    let currentIdx = 0;

    function openGallery(idx) {
        currentIdx = idx;
        updateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateModal() {
        modalImg.src = images[currentIdx];
        modalCounter.textContent = (currentIdx + 1) + ' / ' + images.length;
    }

    function nextImg() {
        currentIdx = (currentIdx + 1) % images.length;
        updateModal();
    }

    function prevImg() {
        currentIdx = (currentIdx - 1 + images.length) % images.length;
        updateModal();
    }

    cells.forEach((cell, i) => {
        cell.addEventListener('click', () => openGallery(i));
    });

    document.querySelector('.modal-close').addEventListener('click', closeGallery);
    document.querySelector('.modal-next').addEventListener('click', nextImg);
    document.querySelector('.modal-prev').addEventListener('click', prevImg);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') nextImg();
        if (e.key === 'ArrowLeft') prevImg();
    });
})();
