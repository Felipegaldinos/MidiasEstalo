function toggleBio(id, btn) {
  const bio = document.getElementById(id);
  
  // Alterna a classe 'active' na bio
  bio.classList.toggle('active');
  
  // Alterna a classe 'active' no botão para girar a seta
  btn.classList.toggle('active');
  
  // Muda o texto do botão
  if (bio.classList.contains('active')) {
    btn.innerHTML = 'Ver menos <i class="ph ph-caret-up"></i>';
  } else {
    btn.innerHTML = 'Saiba mais <i class="ph ph-caret-down"></i>';
  }
}