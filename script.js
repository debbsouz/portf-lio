// reveal scroll
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});

// cursor
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";

  // LIGHT EFFECT (faltava isso)
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

const cards = document.querySelectorAll(".stack-card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 15;
    const moveY = (y - rect.height / 2) / 15;

    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0,0) scale(1)";
  });
});