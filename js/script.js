function handleSubmit(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = "<span>ENVIANDO...</span>";
  btn.disabled = true;
  btn.style.opacity = "0.7";
  setTimeout(() => {
    btn.innerHTML = "<span>✓ MENSAGEM ENVIADA!</span>";
    btn.style.background = "#2ecc71";
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = "";
      btn.style.opacity = "";
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

// Smooth reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(
    ".service-card, .depo-card, .diferencial-card, .founder-card, .pilar-card, .value-item, .fluxo-step",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

// Active nav highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + current ? "#F7C34F" : "";
  });
});
