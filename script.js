const AppState = {
    theme: 'dark',
    menuOpen: false
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMenu();
    initSmoothScroll();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        AppState.theme = savedTheme;
    }

    setTheme(AppState.theme);

    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.setAttribute('aria-label', 'Toggle theme');
        btn.addEventListener('click', toggleTheme);
    }
}

function typeEffect() {
    const el = document.querySelector('.hero-title');
    if (!el) return;

    const text = el.innerHTML;
    el.innerHTML = '';

    let i = 0;

    function typing() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 40);
        }
    }

    typing();
}

document.addEventListener('DOMContentLoaded', typeEffect);

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const symbols = ['{', '}', '<', '>', '/', '=', '+'];
    
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (5 + Math.random() * 10) + 's';
        el.style.fontSize = (10 + Math.random() * 10) + 'px';
        container.appendChild(el);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

function toggleTheme() {
    const newTheme = AppState.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    AppState.theme = theme;
    document.body.setAttribute('data-theme', theme);

    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

function highlightMenu() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', highlightMenu);

function initScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollAnimation);

function initMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const nav = document.getElementById('navMenu');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        AppState.menuOpen = !AppState.menuOpen;

        nav.classList.toggle('active', AppState.menuOpen);
        menuBtn.classList.toggle('active', AppState.menuOpen);

        menuBtn.setAttribute('aria-expanded', AppState.menuOpen);
    });
}

function terminalTyping() {
    const el = document.querySelector('.typing-line');
    if (!el) return;

    const text = 'Portfolio running successfully ✔';
    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }

    type();
}

document.addEventListener('DOMContentLoaded', terminalTyping);

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                const header = document.querySelector('.main-header');
                const offset = header ? header.offsetHeight : 70;

                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });

                if (AppState.menuOpen) {
                    document.getElementById('navMenu')?.classList.remove('active');
                    document.getElementById('menuToggle')?.classList.remove('active');
                    AppState.menuOpen = false;
                }
            }
        });
    });
}