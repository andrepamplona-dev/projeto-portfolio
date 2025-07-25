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


// Sistema de filtros - configurar botões
        function filtrarItens() {
            const botoes = document.querySelectorAll('.tag');
            const itens = document.querySelectorAll('.item');
            
            // Adicionar click em cada botão
            botoes.forEach(botao => {
                botao.addEventListener('click', function() {
                    // Remove classe ativa de todos os botões
                    botoes.forEach(btn => btn.classList.remove('filtro-ativo'));
                    
                    // Adiciona classe 'ativa' no botão clicado
                    this.classList.add('filtro-ativo');
                    
                    // Pega categoria e aplica filtro
                    const categoria = this.getAttribute('id-filtro');
                    aplicarFiltro(categoria);
                });
            });
        }

        // Aplicar filtro nos itens
        function aplicarFiltro(categoria) {
            const itens = document.querySelectorAll('.item');
            
            itens.forEach(item => {
                const categoriaItem = item.getAttribute('id-categoria');
                
                if (categoria === categoriaItem) {
                    // Mostrar item
                    item.classList.remove('oculto');
                    item.classList.add('visivel');
                } else {
                    // Esconder item
                    item.classList.remove('visivel');
                    item.classList.add('oculto');
                }
            });
        }

        // Inicializar filtros ao carregar página
        document.addEventListener('DOMContentLoaded', function() {
            filtrarItens(); // Configurar eventos dos botões
            
            // Aplicar filtro inicial para linguagens (que já está ativo)
            aplicarFiltro('linguagem');
            
            // Garantir que o botão linguagem está ativo
            const botaoLinguagem = document.querySelector('[id-filtro="linguagem"]');
            if (botaoLinguagem) {
                document.querySelectorAll('.tag').forEach(btn => btn.classList.remove('filtro-ativo'));
                botaoLinguagem.classList.add('filtro-ativo');
            }
        });

        