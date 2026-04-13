const AppState = {
    menuOpen: false
};

// init

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initSmoothScroll();
    initScrollAnimation();
    highlightMenu();
    createParticles();
    initMouseGlow();
    initTerminal();
});

// mouse glow

function initMouseGlow() {
    const glow = document.querySelector('.mouse-glow');
    if (!glow) return;

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// terminal

function initTerminal() {
    const element = document.getElementById("typing");
    if (!element) return;

    const lines = [
        "Inicializando sistema...",
        "Carregando módulos...",
        "Aplicando interface...",
        "Portfólio pronto."
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function type() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                element.textContent += lines[lineIndex][charIndex];
                charIndex++;
                setTimeout(type, 30);
            } else {
                element.textContent += "\n";
                lineIndex++;
                charIndex = 0;
                setTimeout(type, 400);
            }
        }
    }

    type();
}

// particles

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

// menu

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

// scroll suave

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

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
        });
    });
}

// menu ativo

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

// animação do scroll

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