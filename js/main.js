const AppState = {
    menuOpen: false
};

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMenu();
    initSmoothScroll();
    initScrollAnimation();
    highlightMenu();
    createParticles();
    initMouseGlow();
    initTerminal();
});

// ==================== HEADER ====================
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ==================== MENU MOBILE ====================
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

// ==================== SCROLL SUAVE ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            const header = document.querySelector('.header');
            const offset = header ? header.offsetHeight : 80;

            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });

            // Fecha menu mobile ao clicar em um link
            if (AppState.menuOpen) {
                const nav = document.getElementById('navMenu');
                const menuBtn = document.getElementById('menuToggle');
                
                nav?.classList.remove('active');
                menuBtn?.classList.remove('active');
                AppState.menuOpen = false;
            }
        });
    });
}

// ==================== MENU ATIVO NO SCROLL ====================
function highlightMenu() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) {
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

// ==================== ANIMAÇÕES DE SCROLL ====================
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

// ==================== MOUSE GLOW ====================
function initMouseGlow() {
    const glow = document.querySelector('.mouse-glow');
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// ==================== TERMINAL TYPING ====================
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

// ==================== PARTICLES ====================
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