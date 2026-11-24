// Edite os presentes neste objeto.
// Campos: categoria, nome, detalhes, link
//   fx, cor → efeito exclusivo e cor de destaque definidos em cartoes.css
//   icone   → emoji que aparece no card
//   loop    → animação do emoji: balancar, pular, girar, pulsar, brilhar, flutuar,
//             tremer, respirar, ondular, piscar, flip, saltitar
//   entrada → (opcional) animação do card: subir, esquerda, direita, zoom, girar, cair, flip, elastico
//             Se não colocar, o site escolhe uma diferente para cada presente.
const listas = {
  ticao: [
    {categoria:'Bolsas',nome:'Bolsa',detalhes:'Branca ou marrom',link:'https://vt.tiktok.com/ZS9P5jJogbpt4-5PHJ5/',icone:'👜',loop:'balancar',fx:'couro',cor:'#e5b68a'},
    {categoria:'Bolsas',nome:'Bolsa corrente',detalhes:'Preta • M',link:'https://vt.tiktok.com/ZS9P5Uvm4PfuQ-xG0Q3/',icone:'👛',loop:'pular',fx:'corrente',cor:'#d1c7f2'},
    {categoria:'Maquiagem',nome:'Blush Oceane',link:'https://vt.tiktok.com/ZS9P5UQ8aGfTy-594Bk/',icone:'🌸',loop:'pulsar',fx:'bolhas',cor:'#ffa8bf'},
    {categoria:'Maquiagem',nome:'Paleta bypam',link:'https://vt.tiktok.com/ZS9P5j49Pxwt7-aJnUA/',icone:'🎨',loop:'ondular',fx:'paleta',cor:'#f3a5ea'},
    {categoria:'Acessórios',nome:'Colar olho grego',link:'https://vt.tiktok.com/ZS9P56PURUxLe-SCIto/',icone:'🧿',loop:'brilhar',fx:'olho',cor:'#73cdf0'},
    {categoria:'Acessórios',nome:'Anel infinito Vivara',detalhes:'Life Enigma Infinito Duplo • Prata 925',link:'https://www.vivara.com.br/anel-life-enigma-infinito-duplo-em-prata-925-al00080900/p',icone:'💍',loop:'flip',fx:'infinito',cor:'#d6e5ff'},
    {categoria:'Biquíni',nome:'Versiani',detalhes:'Light Pink, Vinho Romã ou Cinza Basalto',link:'https://vt.tiktok.com/ZS9P5MCD9rB8H-exnjw/',icone:'👙',loop:'respirar',fx:'ondas',cor:'#ff9ec4'},
    {categoria:'Calças',nome:'Wide Leg',detalhes:'Sobretinto Médio • 38',link:'https://vt.tiktok.com/ZS9P5r84g2PSe-9RYmq/',icone:'👖',loop:'saltitar',fx:'jeans',cor:'#87adf0'},
    {categoria:'Calças',nome:'Pantalona',detalhes:'36',link:'https://vt.tiktok.com/ZS9P5rMdNF74j-aqXcB/',icone:'💃',loop:'flutuar',fx:'fluido',cor:'#c1acf3'},
    {categoria:'Blusinhas',nome:'Regata compressão',detalhes:'Off, rosa bebê, amarelo manteiga ou marrom',link:'https://vt.tiktok.com/ZS9P5kto9qvAt-KXZFZ/',icone:'🎽',loop:'tremer',fx:'pulso',cor:'#ff9fbd'},
    {categoria:'Blusinhas',nome:'Blusinha babado',detalhes:'Preta',link:'https://vt.tiktok.com/ZS9P5UPyuYKFq-SkOLI/',icone:'👚',loop:'piscar',fx:'babado',cor:'#dfc0e8'},
    {categoria:'Blusinhas',nome:'Top cruzado',detalhes:'Off, preto, azul ou marsala',link:'https://vt.tiktok.com/ZS9P5jakWr1Pt-5xLqT/',icone:'🎀',loop:'girar',fx:'cruzado',cor:'#ef94ad'}
  ],
  '2p': [
    {categoria:'Setup e tecnologia',nome:'Suporte articulado',link:'https://vt.tiktok.com/ZS9Puo18AfRxc-q67fW/',icone:'🖥️',loop:'flutuar',fx:'braco',cor:'#86d8c9'},
    {categoria:'Setup e tecnologia',nome:'Controle para jogar de 2',detalhes:'Branco ou preto',link:'https://vt.tiktok.com/ZS9Puoe5SNdNR-ZehKx/',icone:'🎮',loop:'tremer',fx:'neon',cor:'#92a6ff'},
    {categoria:'Setup e tecnologia',nome:'Cadeira',detalhes:'Cinza ou preta',link:'https://vt.tiktok.com/ZS9PuoLt1rcEc-pBDJ5/',icone:'🪑',loop:'girar',fx:'levitar',cor:'#bdc9dc'},
    {categoria:'Setup e tecnologia',nome:'Fone com microfone',detalhes:'Para falar com os colegas',link:'https://vt.tiktok.com/ZS9PH11GKMs9E-6AcdZ/',icone:'🎧',loop:'pulsar',fx:'equalizador',cor:'#9ef0b2'},
    {categoria:'Roupas',nome:'Camisa estampada',detalhes:'Pode escolher • link só de referência',link:'https://vt.tiktok.com/ZS9PH19DAWs5U-Pg8Ei/',icone:'👕',loop:'balancar',fx:'estampa',cor:'#face8e'},
    {categoria:'Roupas',nome:'Moletom',detalhes:'Pode escolher • link só de referência',link:'https://vt.tiktok.com/ZS9PH1GAnpbdf-wBDWt/',icone:'🧥',loop:'respirar',fx:'fofo',cor:'#d7e9f8'}
  ]
};

const entradas = ['subir','esquerda','direita','zoom','girar','cair','flip','elastico'];
const container = document.querySelector('#gifts');
const botoes = document.querySelectorAll('[data-list]');
const abas = document.querySelector('#categorias');
const btnAnterior = document.querySelector('#anterior');
const btnProxima = document.querySelector('#proxima');
const indicador = document.querySelector('#indicador');
let paginas = [];
let pagina = 0;
let listaAtual;
let transicaoAtiva;
const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)');

const desenhos = {
  infinito: {
    viewBox: '0 0 96 48',
    comprimento: 200,
    d: 'M48 24 C35 7 12 6 12 24 S35 41 48 24 S84 6 84 24 S61 41 48 24 Z'
  },
  pulso: {
    viewBox: '0 0 240 36',
    comprimento: 100,
    d: 'M0 20 H84 L94 14 L102 20 H112 L122 4 L132 32 L143 20 H240'
  }
};

function elemento(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}

// Agrupa por categoria; cada categoria vira uma página.
function agrupar(lista) {
  const categorias = new Map();
  listas[lista].forEach((presente, i) => {
    if (!categorias.has(presente.categoria)) categorias.set(presente.categoria, []);
    categorias.get(presente.categoria).push({...presente, entrada: presente.entrada || entradas[i % entradas.length]});
  });
  return [...categorias];
}

function criarEfeito(tipo) {
  const efeito = elemento('div', '', 'fx');
  efeito.setAttribute('aria-hidden', 'true');
  const desenho = desenhos[tipo];

  if (desenho) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', desenho.viewBox);
    if (tipo === 'pulso') svg.setAttribute('preserveAspectRatio', 'none');
    for (const classe of ['base', 'tracar']) {
      const caminho = document.createElementNS(ns, 'path');
      caminho.setAttribute('class', classe);
      caminho.setAttribute('d', desenho.d);
      caminho.setAttribute('pathLength', desenho.comprimento);
      svg.append(caminho);
    }
    efeito.append(svg);
  } else {
    for (let i = 0; i < 5; i++) efeito.append(elemento('i'));
  }

  return efeito;
}

function ativarInclinacao(card) {
  let quadro = null;
  let cursorX;
  let cursorY;

  card.addEventListener('pointermove', evento => {
    if (evento.pointerType === 'touch' || movimentoReduzido.matches) return;
    cursorX = evento.clientX;
    cursorY = evento.clientY;
    if (quadro !== null) return;

    quadro = requestAnimationFrame(() => {
      quadro = null;
      if (!card.isConnected) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (cursorX - left) / width));
      const y = Math.max(0, Math.min(1, (cursorY - top) / height));
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.setProperty('--rx', `${(0.5 - y) * 14}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
    });
  });

  card.addEventListener('pointerleave', () => {
    if (quadro !== null) cancelAnimationFrame(quadro);
    quadro = null;
    for (const propriedade of ['--mx', '--my', '--rx', '--ry']) {
      card.style.removeProperty(propriedade);
    }
  });
}

function criarCard(presente) {
  const card = elemento('article');
  card.dataset.entrada = presente.entrada;
  if (presente.cor) card.style.setProperty('--acc', presente.cor);
  if (presente.fx && document.body.classList.contains('anim-fx')) {
    card.dataset.fx = presente.fx;
    card.append(criarEfeito(presente.fx));
  }
  if (document.body.classList.contains('anim-3d')) ativarInclinacao(card);
  const midia = elemento('div', '', 'midia');
  const icone = elemento('span', presente.icone || '🎁', 'icone');
  icone.dataset.loop = presente.loop || 'pulsar';
  icone.setAttribute('aria-hidden', 'true');
  midia.append(icone);
  card.append(midia, elemento('h3', presente.nome));
  if (presente.detalhes) card.append(elemento('p', presente.detalhes));
  if (presente.link) {
    const link = elemento('a', 'Ver presente ↗');
    link.href = presente.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    card.append(link);
  } else card.append(elemento('span', 'Link a adicionar', 'pending'));
  return card;
}

function mostrarPagina(n) {
  pagina = Math.max(0, Math.min(n, paginas.length - 1));
  const [categoria, presentes] = paginas[pagina];
  const secao = elemento('section');
  secao.append(elemento('h2', categoria));
  const grid = elemento('div', '', 'grid');
  presentes.forEach(p => grid.append(criarCard(p)));
  secao.append(grid);
  container.replaceChildren(secao);
  [...abas.children].forEach((aba, i) => aba.setAttribute('aria-pressed', String(i === pagina)));
  indicador.textContent = `${pagina + 1} de ${paginas.length}`;
  btnAnterior.disabled = pagina === 0;
  btnProxima.disabled = pagina === paginas.length - 1;
}

function trocarLista(lista) {
  listaAtual = lista;
  paginas = agrupar(lista);
  abas.replaceChildren(...paginas.map(([categoria, presentes], i) => {
    const aba = elemento('button', `${presentes[0].icone || '🎁'} ${categoria}`);
    aba.type = 'button';
    aba.setAttribute('aria-pressed', 'false');
    aba.addEventListener('click', () => navegar(i));
    return aba;
  }));
  botoes.forEach(botao => botao.setAttribute('aria-pressed', String(botao.dataset.list === lista)));
  mostrarPagina(0);
}

function concluirTransicao() {
  // Aplica a atualização pendente antes de começar uma nova navegação.
  if (transicaoAtiva) {
    transicaoAtiva.transicao.skipTransition();
    transicaoAtiva.aplicar();
    transicaoAtiva = undefined;
  }
}

function comTransicao(atualizar, direcao = 'next') {
  if (!document.body.classList.contains('anim-transicao') ||
      !document.startViewTransition || movimentoReduzido.matches) {
    atualizar();
    return;
  }

  document.documentElement.dataset.vt = direcao;
  let aplicada = false;
  const aplicar = () => {
    if (aplicada) return;
    aplicada = true;
    atualizar();
  };
  const transicao = document.startViewTransition(aplicar);
  transicaoAtiva = { transicao, aplicar };
  transicao.finished.then(() => {
    if (transicaoAtiva?.transicao === transicao) transicaoAtiva = undefined;
  }, erro => {
    if (transicaoAtiva?.transicao === transicao) transicaoAtiva = undefined;
    console.error(erro);
  });
}

function navegar(n, relativo = false) {
  concluirTransicao();
  if (relativo) n += pagina;
  if (n < 0 || n >= paginas.length || n === pagina) return;
  comTransicao(() => mostrarPagina(n), n < pagina ? 'prev' : 'next');
}

botoes.forEach(botao => botao.addEventListener('click', () => {
  concluirTransicao();
  const lista = botao.dataset.list;
  if (lista !== listaAtual || pagina !== 0) comTransicao(() => trocarLista(lista));
}));
btnAnterior.addEventListener('click', () => navegar(-1, true));
btnProxima.addEventListener('click', () => navegar(1, true));

// Setas do teclado e deslizar o dedo no celular
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') navegar(1, true);
  if (e.key === 'ArrowLeft') navegar(-1, true);
});
let x0 = null;
container.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, {passive: true});
container.addEventListener('touchend', e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  x0 = null;
  if (Math.abs(dx) > 60) navegar(dx < 0 ? 1 : -1, true);
});

trocarLista('ticao');
