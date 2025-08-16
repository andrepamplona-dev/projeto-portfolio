// ========================================
// DADOS DO PORTFÓLIO
// ========================================

let projetos = []; 

// Função para carregar projetos da API
async function carregarProjetos() {
    try {
        // Mostrar estado de carregamento
        containerProjetos.innerHTML = `
            <div class="carregando">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando projetos...</p>
            </div>
        `;
        
        const response = await fetch('http://localhost:3000/projetos');
        if (!response.ok) throw new Error('Erro na resposta da API');
        
        projetos = await response.json();
        projetosFiltrados = [...projetos];
        aplicarFiltros();
        
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        containerProjetos.innerHTML = `
            <div class="erro-carregamento">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erro ao carregar projetos</h3>
                <p>Verifique se o servidor está rodando (http://localhost:3000)</p>
                <button onclick="carregarProjetos()">Tentar novamente</button>
            </div>
        `;
    }
}

// Categorias dos filtros
const categorias = {
    'design': ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Id. Visual'],
    'desenvolvimento': ['HTML', 'CSS', 'JavaScript', 'Hardware', 'Software', 'Analise de Dados'],
    'social': ['Projeto Social', 'Midias Sociais', 'Mídias Sociais', 'Empreendedorismo', 'Marketing', 'Artistico Cultural', 'Literatura']
};

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

let projetosFiltrados = [];
let filtroAtual = 'todos';

// Elementos da página
const barraPesquisa = document.querySelector('.barra-pesquisa input');
const containerProjetos = document.querySelector('.portfolio-de-projetos');
const botoesFiltro = document.querySelectorAll('.tag');

// ========================================
// FUNÇÕES BÁSICAS
// ========================================

// Criar HTML de um projeto
function criarProjetoHTML(projeto) {
    return `
        <div class="Projeto fade-element" alt="${projeto.alt}" data-id="${projeto.id}">
            <div class="info-projetos">
                <div class="projeto-imagem">
                    <img src="${projeto.imagem}" alt="Imagem do projeto" loading="lazy">
                    <div class="overlay-hover">
                        <i class="fas fa-eye"></i>
                    </div>
                </div>
                
                <div class="projeto-conteudo">
                    <h3>${projeto.titulo}</h3>

                    <div class="tags-projeto">
                        ${projeto.tags.map(tag => `<span class="tags-geral">${tag}</span>`).join('')}
                    </div>
                    
                    <a href="${projeto.link}" class="saiba-mais">
                        <span>Saiba mais</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Mostrar projetos na tela
function mostrarProjetos(listaProjetos) {
    // Se não tem projetos, mostrar mensagem
    if (listaProjetos.length === 0) {
        containerProjetos.innerHTML = `
            <div class="nenhum-resultado">
                <h3>Nenhum projeto encontrado</h3>
                <p>Tente pesquisar com outros termos ou limpe o filtro.</p>
            </div>
        `;
        return;
    }
    
    // Criar HTML de todos os projetos
    let html = '';
    listaProjetos.forEach(projeto => {
        html += criarProjetoHTML(projeto);
    });
    
    // Colocar na página
    containerProjetos.innerHTML = html;
}

// Filtrar por categoria
function filtrarCategoria(categoria) {
    if (categoria === 'todos') {
        return [...projetos];
    }
    
    const tagsCategoria = categorias[categoria];
    if (!tagsCategoria) {
        return [];
    }
    
    const projetosFiltrados = [];
    
    projetos.forEach(projeto => {
        let temTag = false;
        
        projeto.tags.forEach(tagProjeto => {
            tagsCategoria.forEach(tagCategoria => {
                if (tagProjeto.toLowerCase().includes(tagCategoria.toLowerCase())) {
                    temTag = true;
                }
            });
        });
        
        if (temTag) {
            projetosFiltrados.push(projeto);
        }
    });
    
    return projetosFiltrados;
}

// Filtrar por pesquisa
function filtrarPesquisa(listaProjetos, texto) {
    if (!texto.trim()) {
        return listaProjetos;
    }
    
    const textoPesquisa = texto.toLowerCase();
    const projetosFiltrados = [];
    
    listaProjetos.forEach(projeto => {
        // Procurar no título
        const achouTitulo = projeto.titulo.toLowerCase().includes(textoPesquisa);
        
        // Procurar nas tags
        let achouTag = false;
        projeto.tags.forEach(tag => {
            if (tag.toLowerCase().includes(textoPesquisa)) {
                achouTag = true;
            }
        });
        
        // Procurar na descrição
        const achouAlt = projeto.alt.toLowerCase().includes(textoPesquisa);
        
        if (achouTitulo || achouTag || achouAlt) {
            projetosFiltrados.push(projeto);
        }
    });
    
    return projetosFiltrados;
}

// Aplicar todos os filtros
function aplicarFiltros() {
    // Primeiro filtrar por categoria
    let projetosDaCategoria = filtrarCategoria(filtroAtual);
    
    // Depois filtrar por pesquisa
    const textoPesquisa = barraPesquisa.value;
    projetosFiltrados = filtrarPesquisa(projetosDaCategoria, textoPesquisa);
    
    // Mostrar na tela
    mostrarProjetos(projetosFiltrados);
}

// Limpar pesquisa
function limparPesquisa() {
    barraPesquisa.value = '';
    aplicarFiltros();
}

// ========================================
// EVENTOS
// ========================================

// Quando digitar na pesquisa
barraPesquisa.addEventListener('input', function() {
    aplicarFiltros();
});

// Quando apertar Enter na pesquisa
barraPesquisa.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        aplicarFiltros();
    }
});

// Quando clicar nos botões de filtro
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', function() {
        // Remover classe ativa de todos
        botoesFiltro.forEach(btn => btn.classList.remove('filtro-ativo'));
        
        // Adicionar classe ativa no clicado
        this.classList.add('filtro-ativo');
        
        // Pegar qual filtro foi clicado
        filtroAtual = this.getAttribute('id-filtro');
        
        // Aplicar filtros
        aplicarFiltros();
    });
});

// ========================================
// INICIALIZAÇÃO
// ========================================

// Quando a página carregar
document.addEventListener('DOMContentLoaded', carregarProjetos);
