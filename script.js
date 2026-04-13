const cursor = document.querySelector('.cursor');
const lightLayer = document.querySelector('.light-layer');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;

// Cursor suave + luz
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
});

function animateCursor() {
    mouseX = mouseX * 0.92 + targetX * 0.08;
    mouseY = mouseY * 0.92 + targetY * 0.08;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    requestAnimationFrame(animateCursor);
}

// Efeito magnético nos cards
function magneticCards() {
    const cards = document.querySelectorAll('.stack-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rotateX = (e.clientY - centerY) / 14;
            const rotateY = (centerX - e.clientX) / 14;

            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-8px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Tema claro/escuro
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
}

// Scroll Reveal
function scrollReveal() {
    const reveals = document.querySelectorAll('section, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

// Inicialização
window.onload = () => {
    animateCursor();
    magneticCards();
    initTheme();
    scrollReveal();
};