// ========================================
// DADOS DO PORTFÓLIO
// ========================================

// Lista de todos os projetos
const projetos = [
    {
        id: "projeto-1",
        titulo: "Projeto 1",
        imagem: "../../img/Projeto 1.jpg",
        alt: "Projeto 1",
        tags: ["Adobe Illustrator", "Midias Sociais", "Projeto Social", "Artistico Cultural"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "projeto-2",
        titulo: "Projeto 2",
        imagem: "../../img/Projeto 2.jpg",
        alt: "Projeto 2",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "projeto-3",
        titulo: "Projeto 3",
        imagem: "../../img/Projeto 3.jpg",
        alt: "Projeto 3",
        tags: ["Adobe Photoshop", "Adobe Illustrator", "Id. Visual"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "Projeto 4",
        titulo: "Projeto 4",
        imagem: "../../img/Projeto 4.jpg",
        alt: "Projeto 4",
        tags: ["Adobe Photoshop", "Adobe Illustrator", "Id. Visual"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "projeto-5",
        titulo: "Projeto 5",
        imagem: "../../img/Projeto 5.jpg",
        alt: "Projeto 5",
        tags: ["Projeto Social", "Empreendedorismo", "Marketing", "Midias Sociais"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "projeto-6",
        titulo: "Projeto 6",
        imagem: "../../img/Projeto 6.jpg",
        alt: "Projeto 6",
        tags: ["Hardware", "Software", "Analise de Dados"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "projeto-7",
        titulo: "Projeto 7",
        imagem: "../../img/Projeto 7.jpg",
        alt: "Projeto 7",
        tags: ["Adobe Photoshop", "Canva", "Literatura", "Artistico Cultural"],
        link: "cards/projeto-teste/projeto-teste.html"
    },
    {
        id: "projeto-8",
        titulo: "Projeto 8",
        imagem: "../../img/Projeto 8.jpg",
        alt: "Projeto 8",
        tags: ["Mídias Sociais", "Canva", "Adobe Photoshop", "Artistico Cultural"],
        link: "cards/projeto-teste/projeto-teste.html"
    }
];

// Categorias dos filtros
const categorias = {
    'design': ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Id. Visual'],
    'desenvolvimento': ['HTML', 'CSS', 'JavaScript', 'Hardware', 'Software', 'Analise de Dados'],
    'social': ['Projeto Social', 'Midias Sociais', 'Mídias Sociais', 'Empreendedorismo', 'Marketing', 'Artistico Cultural', 'Literatura']
};

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================

let projetosFiltrados = [...projetos]; 
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
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar todos os projetos
    mostrarProjetos(projetos);
});
