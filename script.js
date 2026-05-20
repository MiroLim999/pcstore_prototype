(function () {
    'use strict';

    // === SCROLL NAVBAR ===
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

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

    // === BENTO GRID LOAD ANIMATION ===
    const bentoCards = document.querySelectorAll('.sc-card');
    const bentoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = Array.from(entry.target.parentElement.querySelectorAll('.sc-card'));
                const i = cards.indexOf(entry.target);
                setTimeout(() => entry.target.classList.add('sc-visible'), i * 30);
                bentoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
    bentoCards.forEach(el => bentoObserver.observe(el));

    // === SMOOTH NAV LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // === SEARCH FUNCTIONALITY ===
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClose = document.getElementById('searchClose');
    const searchBtn = document.querySelector('[aria-label="Search"]');

    const searchData = [
        { name: 'GeForce RTX 4090', cat: 'GPU', img: 'assets/categories/gpu.jpg' },
        { name: 'RTX 4080 Super', cat: 'GPU', img: 'assets/categories/gpu.jpg' },
        { name: 'Ryzen 9 7950X3D', cat: 'CPU', img: 'assets/categories/cpu.jpg' },
        { name: 'Intel Core i9-14900K', cat: 'CPU', img: 'assets/categories/cpu.jpg' },
        { name: 'ROG Crosshair X670E', cat: 'Motherboard', img: 'assets/categories/mobo.jpg' },
        { name: 'G.Skill Trident Z5 RGB', cat: 'RAM', img: 'assets/categories/ram.jpg' },
        { name: 'Samsung 990 Pro', cat: 'SSD', img: 'assets/categories/ssd.jpg' },
        { name: 'Corsair RM1000x', cat: 'PSU', img: 'assets/categories/psu.jpg' },
        { name: 'Lian Li O11 Dynamic', cat: 'Case', img: 'assets/categories/case.jpg' },
        { name: 'Corsair H150i Elite', cat: 'Cooler', img: 'assets/categories/cooler.jpg' },
    ];

    function openSearch() {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.body.style.overflow = '';
    }

    searchBtn.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        if (!q) { searchResults.innerHTML = ''; return; }
        const matches = searchData.filter(item =>
            item.name.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q)
        );
        searchResults.innerHTML = matches.length
            ? matches.map(item => `
                <div class="search-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="search-item-info">
                        <h4>${item.name}</h4>
                        <span>${item.cat}</span>
                    </div>
                </div>
            `).join('')
            : '<div style="padding:1rem;text-align:center;color:var(--fg-faint);font-size:0.85rem;">No results found</div>';
    });

    // === GALLERY MODAL ===
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalCounter = document.getElementById('modalCounter');
    const cells = Array.from(document.querySelectorAll('[data-img]'));
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
