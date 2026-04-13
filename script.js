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
}

function initMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const nav = document.getElementById('navMenu');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        AppState.menuOpen = !AppState.menuOpen;

        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}