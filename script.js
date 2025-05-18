// Función para manejar los acordeones
document.addEventListener('DOMContentLoaded', function() {
  // Modo oscuro
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const html = document.documentElement;
  
  // Comprobar si el usuario ya tiene una preferencia guardada
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference === 'enabled') {
    enableDarkMode();
  }
  
  // Función para activar el modo oscuro
  function enableDarkMode() {
    body.classList.add('dark-mode');
    html.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  }
  
  // Función para desactivar el modo oscuro
  function disableDarkMode() {
    body.classList.remove('dark-mode');
    html.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
  
  // Toggle modo oscuro al hacer clic en el botón
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }

  // Función para manejar los acordeones
  const accordions = document.getElementsByClassName("accordion");
  
  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
      // Toggle clase active en el elemento clickeado
      this.classList.toggle("active");
      
      // Obtener el panel asociado a este acordeón
      const panel = this.nextElementSibling;
      
      // Alternar estado del panel
      if (panel.classList.contains('active')) {
        panel.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        panel.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // Animación para las barras de habilidades
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      // Guarda el ancho final
      const targetWidth = bar.style.width;
      // Inicia en 0
      bar.style.width = '0%';
      
      // Anima hasta el ancho final después de un pequeño retraso
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 300);
    });
  }

  // Animación para las barras de idiomas
  function animateLanguageBars() {
    const bars = document.querySelectorAll('.progress-fill');
    bars.forEach(bar => {
      const targetWidth = bar.getAttribute('style').match(/width:\s*([\d.]+%)/);
      bar.style.width = '0%';
      setTimeout(() => {
        if (targetWidth) {
          bar.style.width = targetWidth[1];
          bar.classList.add('animated');
        }
      }, 500); // Mayor retraso para una animación más visible
    });
  }

  // Función para animar elementos cuando son visibles al hacer scroll
  function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .profile-image, h1, h2, .project-card, .skills-category');
    let animateSkills = false;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        
        // Si una categoría de habilidades entra en el viewport, activa la animación
        if (element.classList.contains('skills-category') && !element.classList.contains('animated')) {
          element.classList.add('animated');
          animateSkills = true;
        }
      }
    });
    
    // Si encontramos categorías de habilidades visibles, anima las barras
    if (animateSkills) {
      animateSkillBars();
    }
  }

  // Aplicar estilos iniciales para animación
  const animatedElements = document.querySelectorAll('.card, .project-card, .skills-category');
  animatedElements.forEach(element => {
    if (!element.style.transition) {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
    }
  });

  // Ejecutar al cargar la página y al hacer scroll
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
  
  // Llamar a la función inmediatamente para los elementos visibles en carga
  setTimeout(revealOnScroll, 300);

  // Ejecutar animación de barras de idiomas al cargar la página
  setTimeout(animateLanguageBars, 300);
});