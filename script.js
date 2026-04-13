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