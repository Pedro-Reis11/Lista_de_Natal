# Lista dos Presentes Top 🎄

Site de Natal com duas listas de sugestões de presentes, **Lista Tição** e **Lista 2p**. Os presentes são organizados por categoria e cada cartão reúne o nome, os detalhes e o link do item quando disponível.

**[Acessar o site publicado no Netlify](https://sparkling-sundae-fc9210.netlify.app/)**

## Funcionalidades

- Alternar entre as duas listas e navegar pelas categorias.
- Trocar de categoria pelos botões, pelas setas do teclado ou deslizando na área dos presentes no celular.
- Ver efeitos próprios de cada presente, cartões que inclinam com o mouse e transições de categoria em navegadores compatíveis.
- Abrir os links dos presentes em uma nova aba.

## Como rodar localmente

1. Baixe ou clone o projeto.
2. Mantenha os arquivos na mesma pasta e abra o `index.html` no navegador.

Se estiver usando VS Code, você também pode abrir o `index.html` com a extensão Live Server. O projeto usa HTML, CSS e JavaScript puro e roda sem instalação de dependências ou etapa de build.

## Estrutura do projeto

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura da página, navegação e carregamento dos estilos e scripts. |
| `style.css` | Layout, cores, botões e responsividade. |
| `script.js` | Dados dos presentes, geração dos cartões, troca de listas e paginação. |
| `animacoes.css` | Estilos dos efeitos gerais da página, incluindo neve, entrada e rolagem. |
| `animacoes.js` | Lógica dos efeitos de fundo, da rolagem e da barra de progresso. |
| `cartoes.css` | Brilho, borda animada, efeitos de cada presente e transições de categoria. |

## Como personalizar

Abra o objeto `listas` no `script.js` para adicionar ou editar um presente. Use a chave `ticao` para a Lista Tição e `'2p'` para a Lista 2p.

| Campo | O que altera |
| --- | --- |
| `categoria` | Categoria em que o presente aparece. |
| `nome` e `detalhes` | Título e descrição do cartão. |
| `link` | URL aberta pelo botão **Ver presente**. |
| `icone` e `loop` | Emoji e estilo de animação do ícone. |
| `fx` e `cor` | Efeito exclusivo e cor de destaque. Por exemplo, `fx: 'neon'` e `cor: '#92a6ff'`. |

Os cartões sem URL exibem **Link a adicionar**. Para controlar as animações dos cartões, edite as classes do `<body>` no `index.html`. A classe `anim-3d` ativa a inclinação e o brilho, `anim-fx` ativa os efeitos de cada presente e `anim-transicao` ativa as transições entre categorias.
