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

// ==================== FORMULÁRIO DE CONTATO COMPLETO ====================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contato');

  if (form) {
    // ==================== FUNÇÕES DE UTILIDADE ====================
    
    // Limpar todos os erros
    function limparErros() {
      const campos = ['nome', 'email', 'mensagem', 'assunto'];
      campos.forEach(campo => {
        const input = document.getElementById(campo);
        const erro = document.getElementById(`erro-${campo}`);
        
        if (input) input.classList.remove('erro');
        if (erro) erro.innerText = '';
      });
    }

    // Mostrar erro específico
    function mostrarErro(campo, mensagem) {
      const input = document.getElementById(campo);
      const erro = document.getElementById(`erro-${campo}`);
      
      if (input) input.classList.add('erro');
      if (erro) erro.innerText = mensagem;
    }

    // Validar nome (pelo menos 3 letras)
    function validarNome(nome) {
      // Remove espaços e verifica se tem pelo menos 3 letras
      const nomeApenas = nome.replace(/[^a-zA-ZÀ-ÿ]/g, '');
      return nomeApenas.length >= 3;
    }

    // Validar email (deve ter @ e .)
    function validarEmail(email) {
      return email.includes('@') && email.includes('.') && email.indexOf('@') < email.lastIndexOf('.');
    }

    // Validar mensagem (mínimo 10 caracteres)
    function validarMensagem(mensagem) {
      return mensagem.trim().length >= 10;
    }

    // ==================== VALIDAÇÃO EM TEMPO REAL ====================
    
    // Remove erro quando usuário começa a digitar
    ['nome', 'email', 'mensagem', 'assunto'].forEach(campoId => {
      const campo = document.getElementById(campoId);
      if (campo) {
        campo.addEventListener('input', function() {
          if (this.value.trim()) {
            this.classList.remove('erro');
            const erro = document.getElementById(`erro-${campoId}`);
            if (erro) erro.innerText = '';
          }
        });

        // Validação em tempo real ao sair do campo
        campo.addEventListener('blur', function() {
          const valor = this.value.trim();
          if (valor) {
            let isValido = true;
            let mensagemErro = '';

            switch(campoId) {
              case 'nome':
                isValido = validarNome(valor);
                mensagemErro = 'O nome deve ter pelo menos 3 letras.';
                break;
              case 'email':
                isValido = validarEmail(valor);
                mensagemErro = 'Digite um e-mail válido (deve conter @ e .).';
                break;
              case 'mensagem':
                isValido = validarMensagem(valor);
                mensagemErro = 'A mensagem precisa ter pelo menos 10 caracteres.';
                break;
            }

            if (!isValido) {
              mostrarErro(campoId, mensagemErro);
            }
          }
        });
      }
    });

    // ==================== GESTÃO DO HISTÓRICO ====================
    
    // Salvar mensagem no localStorage
    function salvarMensagemNoHistorico(dadosFormulario) {
      try {
        // Recupera histórico existente ou cria array vazio
        let historico = JSON.parse(localStorage.getItem('historicoMensagens')) || [];
        
        // Adiciona timestamp à mensagem
        const mensagemComData = {
          ...dadosFormulario,
          id: Date.now(),
          dataEnvio: new Date().toLocaleString('pt-BR'),
          status: 'enviada'
        };
        
        // Adiciona nova mensagem no início do array
        historico.unshift(mensagemComData);
        
        // Mantém apenas as últimas 50 mensagens para não sobrecarregar
        if (historico.length > 50) {
          historico = historico.slice(0, 50);
        }
        
        // Salva de volta no localStorage
        localStorage.setItem('historicoMensagens', JSON.stringify(historico));
        
        console.log('Mensagem salva no histórico:', mensagemComData);
        return true;
      } catch (error) {
        console.error('Erro ao salvar no histórico:', error);
        return false;
      }
    }

    // Recuperar histórico de mensagens
    function obterHistoricoMensagens() {
      try {
        return JSON.parse(localStorage.getItem('historicoMensagens')) || [];
      } catch (error) {
        console.error('Erro ao recuperar histórico:', error);
        return [];
      }
    }

    // ==================== MODAL DE CONFIRMAÇÃO ====================
    
    // Criar modal dinâmico
    function criarModal(dadosFormulario) {
      // Remove modal existente se houver
      const modalExistente = document.getElementById('modal-confirmacao');
      if (modalExistente) {
        modalExistente.remove();
      }

      // Criar elementos do modal
      const modal = document.createElement('div');
      modal.id = 'modal-confirmacao';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      `;

      const conteudoModal = document.createElement('div');
      conteudoModal.style.cssText = `
        background-color: var(--cor-escura);
        border: 2px solid var(--cor-destaque);
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        animation: slideIn 0.3s ease;
      `;

      // Histórico de mensagens
      const historico = obterHistoricoMensagens();
      const totalMensagens = historico.length;

      conteudoModal.innerHTML = `
        <style>
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        </style>
        
        <button id="fechar-modal" style="
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--cor-destaque);
          cursor: pointer;
          padding: 5px;
        ">&times;</button>
        
        <h2 style="
          color: var(--cor-destaque);
          font-family: var(--fonte-principal);
          font-size: var(--fonte-para-h2);
          margin-bottom: 20px;
          text-align: center;
        ">✓ Mensagem Enviada!</h2>
        
        <div style="
          background-color: rgba(0, 232, 255, 0.1);
          border: 1px solid var(--cor-destaque);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        ">
          <h3 style="color: var(--cor-importante); margin-bottom: 15px; font-family: var(--fonte-principal);">
            📋 Dados da Mensagem:
          </h3>
          
          <p style="color: var(--cor-menos-importante); margin: 8px 0; font-family: var(--fonte-secundaria);">
            <strong style="color: var(--cor-importante);">👤 Nome:</strong> ${dadosFormulario.nome}
          </p>
          
          <p style="color: var(--cor-menos-importante); margin: 8px 0; font-family: var(--fonte-secundaria);">
            <strong style="color: var(--cor-importante);">📧 E-mail:</strong> ${dadosFormulario.email}
          </p>
          
          <p style="color: var(--cor-menos-importante); margin: 8px 0; font-family: var(--fonte-secundaria);">
            <strong style="color: var(--cor-importante);">📝 Assunto:</strong> ${dadosFormulario.assunto}
          </p>
          
          <p style="color: var(--cor-menos-importante); margin: 8px 0; font-family: var(--fonte-secundaria);">
            <strong style="color: var(--cor-importante);">💬 Mensagem:</strong>
          </p>
          <div style="
            background-color: var(--cor-escura);
            border: 1px solid var(--cor-menos-importante);
            border-radius: 5px;
            padding: 10px;
            margin-top: 5px;
            color: var(--cor-menos-importante);
            font-family: var(--fonte-secundaria);
            max-height: 100px;
            overflow-y: auto;
          ">${dadosFormulario.mensagem}</div>
        </div>
        
        <div style="
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          text-align: center;
        ">
          <p style="color: var(--cor-menos-importante); font-family: var(--fonte-secundaria); margin: 5px 0;">
            📊 <strong style="color: var(--cor-importante);">Total de mensagens enviadas:</strong> ${totalMensagens}
          </p>
          <p style="color: var(--cor-menos-importante); font-family: var(--fonte-secundaria); margin: 5px 0; font-size: 0.9em;">
            🕒 Enviado em: ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button id="ver-historico" style="
            background-color: transparent;
            border: 2px solid var(--cor-destaque);
            color: var(--cor-destaque);
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-family: var(--fonte-secundaria);
            font-weight: var(--peso-medium);
            transition: all 0.3s ease;
          ">📜 Ver Histórico</button>
          
          <button id="nova-mensagem" style="
            background-color: var(--cor-destaque);
            border: 2px solid var(--cor-destaque);
            color: var(--cor-escura);
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-family: var(--fonte-secundaria);
            font-weight: var(--peso-medium);
            transition: all 0.3s ease;
          ">✉️ Nova Mensagem</button>
        </div>
      `;

      modal.appendChild(conteudoModal);
      document.body.appendChild(modal);

      // Event listeners do modal
      document.getElementById('fechar-modal').addEventListener('click', fecharModal);
      document.getElementById('nova-mensagem').addEventListener('click', () => {
        fecharModal();
        form.reset();
        limparErros();
      });
      document.getElementById('ver-historico').addEventListener('click', mostrarHistorico);

      // Fechar modal clicando fora
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          fecharModal();
        }
      });

      // Fechar com ESC
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          fecharModal();
        }
      });

      // Hover effects
      const botoes = conteudoModal.querySelectorAll('button');
      botoes.forEach(botao => {
        botao.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
          this.style.boxShadow = '0 4px 12px rgba(0, 232, 255, 0.3)';
        });
        botao.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = 'none';
        });
      });
    }

    // Fechar modal
    function fecharModal() {
      const modal = document.getElementById('modal-confirmacao');
      if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
      }
    }

    // Mostrar histórico de mensagens
    function mostrarHistorico() {
      const historico = obterHistoricoMensagens();
      
      if (historico.length === 0) {
        alert('📭 Nenhuma mensagem no histórico ainda.');
        return;
      }

      const modalHistorico = document.createElement('div');
      modalHistorico.id = 'modal-historico';
      modalHistorico.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease;
      `;

      const conteudoHistorico = document.createElement('div');
      conteudoHistorico.style.cssText = `
        background-color: var(--cor-escura);
        border: 2px solid var(--cor-destaque);
        border-radius: 10px;
        padding: 30px;
        max-width: 700px;
        width: 95%;
        max-height: 85vh;
        overflow-y: auto;
        position: relative;
      `;

      let historicoHTML = `
        <button onclick="this.parentElement.parentElement.remove()" style="
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--cor-destaque);
          cursor: pointer;
          padding: 5px;
        ">&times;</button>
        
        <h2 style="
          color: var(--cor-destaque);
          font-family: var(--fonte-principal);
          text-align: center;
          margin-bottom: 25px;
        ">📜 Histórico de Mensagens (${historico.length})</h2>
      `;

      historico.forEach((msg, index) => {
        historicoHTML += `
          <div style="
            background-color: rgba(0, 232, 255, 0.05);
            border: 1px solid var(--cor-menos-importante);
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            position: relative;
          ">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            ">
              <h4 style="color: var(--cor-importante); margin: 0; font-family: var(--fonte-principal);">
                #${historico.length - index} - ${msg.assunto}
              </h4>
              <span style="
                color: var(--cor-menos-importante);
                font-size: 0.8em;
                font-family: var(--fonte-secundaria);
              ">${msg.dataEnvio}</span>
            </div>
            
            <p style="color: var(--cor-menos-importante); margin: 5px 0; font-family: var(--fonte-secundaria);">
              <strong>👤 De:</strong> ${msg.nome} (${msg.email})
            </p>
            
            <p style="color: var(--cor-menos-importante); margin: 5px 0; font-family: var(--fonte-secundaria);">
              <strong>💬 Mensagem:</strong>
            </p>
            <div style="
              background-color: var(--cor-escura);
              border: 1px solid var(--cor-menos-importante);
              border-radius: 5px;
              padding: 8px;
              margin-top: 5px;
              color: var(--cor-menos-importante);
              font-family: var(--fonte-secundaria);
              font-size: 0.9em;
              max-height: 60px;
              overflow-y: auto;
            ">${msg.mensagem}</div>
          </div>
        `;
      });

      historicoHTML += `
        <div style="text-align: center; margin-top: 20px;">
          <button onclick="limparHistoricoConfirm()" style="
            background-color: transparent;
            border: 2px solid #ff4444;
            color: #ff4444;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-family: var(--fonte-secundaria);
            margin-right: 10px;
          ">🗑️ Limpar Histórico</button>
          
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
            background-color: var(--cor-destaque);
            border: 2px solid var(--cor-destaque);
            color: var(--cor-escura);
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-family: var(--fonte-secundaria);
          ">Fechar</button>
        </div>
      `;

      conteudoHistorico.innerHTML = historicoHTML;
      modalHistorico.appendChild(conteudoHistorico);
      document.body.appendChild(modalHistorico);

      // Função global para limpar histórico
      window.limparHistoricoConfirm = function() {
        if (confirm('🗑️ Tem certeza que deseja limpar todo o histórico de mensagens?')) {
          localStorage.removeItem('historicoMensagens');
          alert('✅ Histórico limpo com sucesso!');
          document.getElementById('modal-historico').remove();
        }
      };
    }

    // ==================== ENVIO DO FORMULÁRIO ====================
    
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Previne envio padrão do formulário

      // Limpar erros anteriores
      limparErros();

      // Capturar dados do formulário
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const assunto = document.getElementById('assunto').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      let valido = true;

      // Validações
      if (!nome) {
        mostrarErro('nome', 'O nome é obrigatório.');
        valido = false;
      } else if (!validarNome(nome)) {
        mostrarErro('nome', 'O nome deve ter pelo menos 3 letras.');
        valido = false;
      }

      if (!email) {
        mostrarErro('email', 'O e-mail é obrigatório.');
        valido = false;
      } else if (!validarEmail(email)) {
        mostrarErro('email', 'Digite um e-mail válido (deve conter @ e .).');
        valido = false;
      }

      if (!assunto) {
        mostrarErro('assunto', 'O assunto é obrigatório.');
        valido = false;
      }

      if (!mensagem) {
        mostrarErro('mensagem', 'A mensagem é obrigatória.');
        valido = false;
      } else if (!validarMensagem(mensagem)) {
        mostrarErro('mensagem', 'A mensagem precisa ter pelo menos 10 caracteres.');
        valido = false;
      }

      // Se todas as validações passaram
      if (valido) {
        // Criar objeto com os dados do formulário
        const dadosFormulario = {
          nome: nome,
          email: email,
          assunto: assunto,
          mensagem: mensagem
        };

        // Salvar no histórico
        salvarMensagemNoHistorico(dadosFormulario);

        // Exibir modal de confirmação
        criarModal(dadosFormulario);

        // Opcional: Simulação de envio com delay
        console.log('Dados do formulário capturados:', dadosFormulario);
      } else {
        // Se houver erros, foca no primeiro campo com erro
        const primeiroErro = document.querySelector('.erro');
        if (primeiroErro) {
          primeiroErro.focus();
          primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }
}); 