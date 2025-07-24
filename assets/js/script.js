document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const themeSwitch = document.getElementById('theme-switch');

  // Menu toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
    });
  }

  // Verifica o tema salvo no localStorage
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.documentElement.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    if (themeSwitch) themeSwitch.checked = true;
  } else {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    document.documentElement.classList.remove('light-mode');
    if (themeSwitch) themeSwitch.checked = false;
  }

  // Troca de tema ao clicar no switch
  if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
      if (themeSwitch.checked) {
        // Ativar modo claro
        document.body.classList.add('light-mode');
        document.documentElement.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      } else {
        // Voltar para modo escuro
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
