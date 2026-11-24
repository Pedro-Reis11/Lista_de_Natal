// Neve — só roda se o <body> tiver a classe "anim-neve".
// Para mudar a quantidade de flocos, altere os números em "qtd".
(function () {
  if (!document.body.classList.contains('anim-neve')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const neve = document.createElement('div');
  neve.className = 'neve';
  neve.setAttribute('aria-hidden', 'true');
  const qtd = innerWidth < 600 ? 22 : 40;
  for (let i = 0; i < qtd; i++) {
    const f = document.createElement('span');
    const tam = 2 + Math.random() * 4;
    f.className = 'flake';
    f.style.cssText =
      `left:${Math.random() * 100}%;width:${tam}px;height:${tam}px;` +
      `opacity:${0.4 + Math.random() * 0.5};` +
      `animation-duration:${8 + Math.random() * 10}s;` +
      `animation-delay:${-Math.random() * 18}s;` +
      `--sway:${Math.random() * 80 - 40}px`;
    neve.append(f);
  }
  document.body.prepend(neve);
})();

// ===== SCROLL: fundo parallax, faixas, revelar e progresso =====
// Cada parte só roda se o <body> tiver a classe dela (anim-parallax, anim-marquee, anim-revelar, anim-progresso).
(function () {
  const cl = document.body.classList;
  const usaParallax = cl.contains('anim-parallax');
  const usaFaixas = cl.contains('anim-marquee');
  const usaRevelar = cl.contains('anim-revelar');
  const usaProgresso = cl.contains('anim-progresso');
  const usaCartoes = cl.contains('anim-cartoes');
  if (!(usaParallax || usaFaixas || usaRevelar || usaProgresso || usaCartoes)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const raiz = document.documentElement;
  const criar = (tag, classe, texto) => {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  };

  // Faixa com texto repetido (dois grupos iguais para o loop ser contínuo)
  const faixas = [];
  function criarFaixa(texto, repeticoes, classe, modo, dir, base) {
    const faixa = criar('div', 'faixa ' + classe);
    faixa.setAttribute('aria-hidden', 'true');
    const trilho = criar('div', 'faixa-trilho');
    for (let g = 0; g < 2; g++) {
      const grupo = criar('div', 'faixa-grupo');
      for (let i = 0; i < repeticoes; i++) grupo.append(criar('span', '', texto));
      trilho.append(grupo);
    }
    faixa.append(trilho);
    const f = {faixa, trilho, modo, dir, base, ciclo: 0, pos: 0};
    faixas.push(f);
    return f;
  }

  // ---- Fundo parallax: emojis flutuando em velocidades diferentes ----
  // t = emoji, s = tamanho (rem), x = posição horizontal (%), y = altura inicial (%),
  // v = velocidade com o scroll, r = rotação com o scroll, o = opacidade, b = desfoque (px)
  const formas = [];
  if (usaParallax) {
    const fundo = criar('div', 'fundo');
    fundo.setAttribute('aria-hidden', 'true');
    [
      {t:'🎄', s:8,   x:5,  y:15, v:.30, r:.04,  o:.22, b:2},
      {t:'⭐', s:5,   x:88, y:30, v:.65, r:.12,  o:.30, b:0},
      {t:'🎁', s:7,   x:78, y:75, v:.25, r:-.05, o:.20, b:3},
      {t:'🔔', s:4.5, x:14, y:70, v:.50, r:.10,  o:.28, b:0},
      {t:'❄️', s:6,   x:50, y:5,  v:.80, r:.08,  o:.25, b:1},
      {t:'🧦', s:5,   x:33, y:92, v:.40, r:-.10, o:.22, b:1}
    ].forEach(d => {
      const el = criar('span', 'forma', d.t);
      el.style.cssText = `left:${d.x}%;font-size:${d.s}rem;opacity:${d.o};filter:blur(${d.b}px)`;
      fundo.append(el);
      formas.push({...d, el});
    });
    // Letras gigantes só de contorno: andam para os lados conforme você rola
    const f1 = criarFaixa('NATAL 2026 ✦', 2, 'faixa-fundo f1', 'scroll', 1, 0);
    const f2 = criarFaixa('FELIZ NATAL ✦', 2, 'faixa-fundo f2', 'scroll', -1, 0);
    fundo.append(f1.faixa, f2.faixa);
    document.body.prepend(fundo);
  }

  // ---- Faixas inclinadas que aceleram quando você rola ----
  if (usaFaixas) {
    const a = criarFaixa('FELIZ NATAL ✦', 6, 'a', 'tempo', 1, 0.8);
    const b = criarFaixa('LISTA DOS PRESENTES ✦', 4, 'b', 'tempo', -1, 0.8);
    document.querySelector('header').after(a.faixa);
    document.querySelector('footer').before(b.faixa);
  }

  // ---- Barra de progresso ----
  let barra = null;
  if (usaProgresso) {
    barra = criar('div', 'progresso');
    barra.setAttribute('aria-hidden', 'true');
    document.body.prepend(barra);
  }

  // ---- Revelar ao rolar + "FELIZ NATAL" gigante no final ----
  if (usaRevelar && 'IntersectionObserver' in window) {
    const final = criar('section', 'final');
    final.setAttribute('aria-hidden', 'true');
    const texto = criar('div', 'final-texto');
    let n = 0;
    ['FELIZ', 'NATAL'].forEach(palavra => {
      const linha = criar('span', 'linha');
      [...palavra].forEach(l => {
        const letra = criar('span', 'letra', l);
        letra.style.setProperty('--i', n++);
        linha.append(letra);
      });
      texto.append(linha);
    });
    final.append(texto, criar('div', 'adesivo', '🎁'));
    document.querySelector('footer').before(final);

    const alvos = [...document.querySelectorAll('main > nav, #pager, footer')];
    alvos.forEach(el => el.classList.add('revelar'));
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => e.target.classList.toggle('visivel', e.isIntersecting));
    }, {threshold: 0.2});
    [...alvos, final].forEach(el => io.observe(el));
  }

  // ---- Medidas e loop principal ----
  let vh = innerHeight;
  function medir() {
    vh = innerHeight;
    faixas.forEach(f => { f.ciclo = f.trilho.firstElementChild.getBoundingClientRect().width; });
  }
  addEventListener('resize', medir);
  addEventListener('load', medir);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  medir();

  let yAnt = scrollY, yUlt = -1, vel = 0, yCartoes = -1, primeiroCartao = null;
  function quadro() {
    const y = scrollY;
    vel += (y - yAnt - vel) * 0.12; // velocidade do scroll, suavizada
    yAnt = y;

    if (y !== yUlt) {
      yUlt = y;
      raiz.style.setProperty('--y', Math.round(y));
      if (barra) {
        const max = raiz.scrollHeight - innerHeight;
        barra.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    }

    // Cards: gravam --p (posição na tela) e --d (lado) para o CSS usar
    if (usaCartoes) {
      const cartoes = document.querySelectorAll('#gifts article');
      if (y !== yCartoes || cartoes[0] !== primeiroCartao) {
        yCartoes = y;
        primeiroCartao = cartoes[0];
        cartoes.forEach((c, i) => {
          // offsetTop ignora as transformações do próprio card (evita efeito em loop)
          const base = c.offsetParent ? c.offsetParent.getBoundingClientRect().top : 0;
          const centro = base + c.offsetTop + c.offsetHeight / 2;
          const p = Math.max(-1.5, Math.min(1.5, (centro - vh / 2) / vh));
          c.style.setProperty('--p', p.toFixed(3));
          c.style.setProperty('--d', i % 2 ? -1 : 1);
        });
      }
    }

    const alto = vh + 400;
    for (const f of formas) {
      const py = (((f.y / 100 * vh - y * f.v) % alto) + alto) % alto - 200;
      f.el.style.transform = `translate3d(0,${py}px,0) rotate(${y * f.r}deg)`;
    }

    for (const f of faixas) {
      if (!f.ciclo) continue;
      if (f.modo === 'scroll') f.pos = y * f.dir * 1.2;
      else f.pos += f.dir * (f.base + vel * 0.6);
      const p = ((f.pos % f.ciclo) + f.ciclo) % f.ciclo;
      f.trilho.style.transform = `translate3d(${-p}px,0,0)`;
    }
    requestAnimationFrame(quadro);
  }
  requestAnimationFrame(quadro);
})();
