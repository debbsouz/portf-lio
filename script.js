const AppState = {
    theme: 'dark',
    menuOpen: false
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMenu();
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