 // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  // Mobile menu
  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  }

  // Form submit
  function submitForm() {
    const btn = document.querySelector('.form-submit');
    btn.textContent = '✅ Mensagem enviada! Em breve entraremos em contato.';
    btn.style.background = '#22c55e';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = 'Quero Crescer com a Estalo ✈️';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy)';
    }, 4000);
  }
//carrossel depoimentos
  const track = document.getElementById('depoiTrack');
const slides = document.querySelectorAll('.depoi-slide');
const dots = document.querySelectorAll('.depoi-dot');
let index = 0;

// 1. Clona o primeiro slide e adiciona ao final do track
const firstClone = slides[0].cloneNode(true);
track.appendChild(firstClone);

function updateDots(idx) {
    // Se o idx for igual ao total de slides (está no clone), o dot ativo é o primeiro (0)
    const activeIdx = idx >= slides.length ? 0 : idx;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
    });
}

function moveNext() {
    index++;
    track.style.transition = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    track.style.transform = `translateX(-${index * 100}%)`;

    // Quando a transição do clone termina...
    if (index >= slides.length) {
        setTimeout(() => {
            track.style.transition = "none"; // Desliga a animação
            index = 0; // Volta para o slide original
            track.style.transform = `translateX(0)`;
        }, 800); // Mesmo tempo da transição CSS
    }
    updateDots(index);
}

// Navegação pelos pontinhos (dots)
function depoiGoTo(idx) {
    index = idx;
    track.style.transition = "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots(index);
}

// Inicia o Autoplay
let interval = setInterval(moveNext, 5000);

// Pausa ao passar o mouse
const container = document.querySelector('.depoi-section');
container.addEventListener('mouseenter', () => clearInterval(interval));
container.addEventListener('mouseleave', () => interval = setInterval(moveNext, 5000));