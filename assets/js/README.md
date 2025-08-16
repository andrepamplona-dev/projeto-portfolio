# 📂 API de Projetos - Documentação

Este diretório contém o arquivo `projetos.json` que serve como banco de dados local para a API REST.

## 🚀 Início Rápido

### Instalação
```bash
npm install -g json-server
```

### Executar
```bash
# Na raiz do projeto
json-server --watch assets/data/projetos.json --port 3000
```

## 📡 Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| `GET` | `/projetos` | Lista todos os projetos |
| `GET` | `/projetos/:id` | Busca projeto por ID |
| `GET` | `/projetos?tags_like=HTML` | Filtra por tag |
| `GET` | `/projetos?q=portfolio` | Busca por texto |

**Base URL**: `http://localhost:3000`

## 📋 Estrutura dos Dados

```json
{
  "projetos": [
    {
      "id": "projeto-01",
      "titulo": "Meu Portfolio",
      "imagem": "assets/images/projeto1.jpg",
      "tags": ["HTML", "CSS", "JavaScript"],
      "link": "projetos/projeto1.html"
    }
  ]
}
```

## 💡 Dicas de Uso

- **Auto-reload**: O servidor atualiza automaticamente ao editar o JSON
- **Validação**: Sempre valide o JSON em [JSONLint](https://jsonlint.com/) após edições
- **Porta alternativa**: Use `--port 3001` se a porta 3000 estiver ocupada

## 🔧 Exemplo de Integração

```javascript
// Buscar todos os projetos
fetch('http://localhost:3000/projetos')
  .then(response => response.json())
  .then(projetos => console.log(projetos));

// Filtrar por tag
fetch('http://localhost:3000/projetos?tags_like=JavaScript')
  .then(response => response.json())
  .then(projetos => console.log(projetos));
```

## ⚠️ Problemas Comuns

- **Porta ocupada**: Mude para outra porta com `--port 3001`
- **JSON inválido**: Verifique sintaxe no JSONLint
- **Servidor não responde**: Reinicie com `Ctrl+C` e execute novamente

---

**💡 Mantenha o servidor rodando durante o desenvolvimento!**

