const listaVagas = document.querySelector("#lista-vagas");
const campoPesquisa = document.querySelector("#campo-pesquisa");
const filtroModalidade = document.querySelector("#filtro-modalidade");
const btnOrdenar = document.querySelector("#btn-ordenar-bolsa");
const btnRestaurar = document.querySelector("#btn-restaurar-ordem");
const contadorVagas = document.querySelector("#contador-vagas");
const mensagemVazia = document.querySelector("#mensagem-vazia");
const areaLista = document.querySelector("#area-lista");
const areaDetalhes = document.querySelector("#detalhes-vaga");
const btnVoltar = document.querySelector("#btn-voltar");
const slideVagas = document.querySelector("#sec-vagas");

let ordenarPorBolsa = false;

const MAIOR_BOLSA_ABERTA = Math.max.apply(null, VAGAS.filter(function (vaga) {
  return vaga.ativa;
}).map(function (vaga) {
  return vaga.bolsa;
}));

const CLASSE_MODALIDADE = {
  "Presencial": "presencial",
  "Híbrido": "hibrido",
  "Remoto": "remoto"
};

function formatarBolsa(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function semAcento(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function obterVagasFiltradas() {
  const texto = semAcento(campoPesquisa.value.trim());
  const modalidade = filtroModalidade.value;

  let resultado = VAGAS.filter(function (vaga) {
    const bateTexto =
      semAcento(vaga.empresa).includes(texto) ||
      semAcento(vaga.cargo).includes(texto);
    const bateModalidade = modalidade === "todas" || vaga.modalidade === modalidade;
    return bateTexto && bateModalidade;
  });

  if (ordenarPorBolsa) {
    resultado = [...resultado].sort(function (a, b) {
      return b.bolsa - a.bolsa;
    });
  }

  return resultado;
}

function criarCartao(vaga) {
  const classe = CLASSE_MODALIDADE[vaga.modalidade];

  const cartao = document.createElement("article");
  cartao.className = "cartao-vaga modalidade-" + classe;
  cartao.dataset.id = vaga.id;
  if (!vaga.ativa) {
    cartao.classList.add("cartao-encerrada");
  }

  const selosStatus = vaga.ativa ? "" : '<span class="selo-status">Encerrada</span>';

  const ehDestaque = vaga.ativa && vaga.bolsa === MAIOR_BOLSA_ABERTA;
  if (ehDestaque) {
    cartao.classList.add("cartao-destaque");
  }
  const seloDestaque = ehDestaque ? '<span class="selo-destaque">★ Maior bolsa</span>' : "";

  cartao.innerHTML =
    '<div class="cartao-topo">' +
      '<span class="selo selo-' + classe + '">' + vaga.modalidade + "</span>" +
      seloDestaque +
      selosStatus +
    "</div>" +
    '<h4 class="cartao-cargo">' + vaga.cargo + "</h4>" +
    '<p class="cartao-empresa">' + vaga.empresa + "</p>" +
    '<p class="cartao-bolsa"><span>Bolsa</span> ' + formatarBolsa(vaga.bolsa) + "</p>" +
    '<button type="button" class="btn-detalhes">Ver detalhes</button>';

  cartao.querySelector(".btn-detalhes").addEventListener("click", function () {
    mostrarDetalhes(vaga.id, cartao);
  });

  return cartao;
}

function adicionarGrupo(titulo, classeExtra, lista) {
  if (lista.length === 0) {
    return;
  }

  const cabecalho = document.createElement("div");
  cabecalho.className = "grupo-titulo " + classeExtra;
  cabecalho.innerHTML = "<h3>" + titulo + "</h3><span>" + lista.length + "</span>";
  listaVagas.appendChild(cabecalho);

  lista.forEach(function (vaga) {
    listaVagas.appendChild(criarCartao(vaga));
  });
}

function renderizar() {
  const vagas = obterVagasFiltradas();

  const abertas = vagas.filter(function (vaga) {
    return vaga.ativa;
  });
  const encerradas = vagas.filter(function (vaga) {
    return !vaga.ativa;
  });

  listaVagas.innerHTML = "";
  adicionarGrupo("Vagas abertas", "grupo-abertas", abertas);
  adicionarGrupo("Vagas encerradas", "grupo-encerradas", encerradas);

  contadorVagas.textContent = vagas.length;

  if (vagas.length === 0) {
    mensagemVazia.classList.remove("escondido");
  } else {
    mensagemVazia.classList.add("escondido");
  }
}

const painelDetalhes = document.querySelector(".painel-detalhes");
const NOME_TRANSICAO = "vaga-ativa";
let ultimaVagaId = null;

function podeAnimar() {
  return typeof document.startViewTransition === "function";
}

function marcar(elemento, ligado) {
  if (ligado) {
    elemento.style.setProperty("view-transition-name", NOME_TRANSICAO);
  } else {
    elemento.style.removeProperty("view-transition-name");
  }
}

function preencherLista(seletor, itens) {
  const lista = document.querySelector(seletor);
  lista.innerHTML = "";
  itens.forEach(function (texto) {
    const item = document.createElement("li");
    item.textContent = texto;
    lista.appendChild(item);
  });
}

function mostrarDetalhes(id, cartao) {
  const vaga = VAGAS.find(function (v) {
    return v.id === id;
  });

  document.querySelector("#detalhe-empresa").textContent = vaga.empresa;
  document.querySelector("#detalhe-cargo").textContent = vaga.cargo;
  document.querySelector("#detalhe-modalidade").textContent = vaga.modalidade;
  document.querySelector("#detalhe-bolsa").textContent = formatarBolsa(vaga.bolsa);
  document.querySelector("#detalhe-data").textContent = vaga.publicada;
  document.querySelector("#detalhe-status").textContent = vaga.ativa ? "Vaga aberta" : "Vaga encerrada";
  document.querySelector("#detalhe-requisitos").textContent = vaga.requisitos;

  document.querySelector("#detalhe-carga").textContent = vaga.cargaHoraria;
  document.querySelector("#detalhe-horario").textContent = vaga.horario;
  document.querySelector("#detalhe-duracao").textContent = vaga.duracao;

  preencherLista("#detalhe-atividades", vaga.atividades);
  preencherLista("#detalhe-beneficios", vaga.beneficios);

  document.querySelector("#detalhe-link").href = vaga.link;

  ultimaVagaId = id;
  const animar = Boolean(cartao) && podeAnimar();

  function trocar() {
    areaLista.classList.add("escondido");
    areaDetalhes.classList.remove("escondido");
    slideVagas.scrollTo(0, 0);
    if (animar) {
      marcar(cartao, false);
      marcar(painelDetalhes, true);
    }
  }

  if (!animar) {
    trocar();
    return;
  }

  marcar(cartao, true);
  const transicao = document.startViewTransition(trocar);
  const limpar = function () {
    marcar(painelDetalhes, false);
  };
  transicao.finished.then(limpar, limpar);
}

function voltarParaLista(comAnimacao) {
  const detalhesAbertos = !areaDetalhes.classList.contains("escondido");
  const cartao = listaVagas.querySelector('[data-id="' + ultimaVagaId + '"]');

  if (comAnimacao && detalhesAbertos && cartao && podeAnimar()) {
    marcar(painelDetalhes, true);
    const transicao = document.startViewTransition(function () {
      areaDetalhes.classList.add("escondido");
      areaLista.classList.remove("escondido");
      marcar(painelDetalhes, false);
      marcar(cartao, true);
      cartao.scrollIntoView({ block: "center" });
    });
    const limpar = function () {
      marcar(cartao, false);
    };
    transicao.finished.then(limpar, limpar);
    return;
  }

  areaDetalhes.classList.add("escondido");
  areaLista.classList.remove("escondido");
  slideVagas.scrollTo(0, 0);
}

campoPesquisa.addEventListener("input", renderizar);
filtroModalidade.addEventListener("change", renderizar);

btnOrdenar.addEventListener("click", function () {
  ordenarPorBolsa = true;
  renderizar();
});

btnRestaurar.addEventListener("click", function () {
  ordenarPorBolsa = false;
  renderizar();
});

btnVoltar.addEventListener("click", function () {
  voltarParaLista(true);
});

const formRapido = document.querySelector("#form-rapido");
const buscaRapida = document.querySelector("#busca-rapida");
const chips = document.querySelectorAll(".chip");

function irParaVagas() {
  voltarParaLista();
  irParaSlide(indiceDoSlide("sec-vagas")); 
}

formRapido.addEventListener("submit", function (evento) {
  evento.preventDefault();
  campoPesquisa.value = buscaRapida.value;
  filtroModalidade.value = "todas";
  renderizar();
  irParaVagas();
});

chips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    campoPesquisa.value = "";
    filtroModalidade.value = chip.dataset.modalidade;
    renderizar();
    irParaVagas();
  });
});

function preencherEstatisticas() {
  const abertas = VAGAS.filter(function (vaga) {
    return vaga.ativa;
  });

  const remotas = abertas.filter(function (vaga) {
    return vaga.modalidade === "Remoto";
  });

  const empresas = VAGAS.map(function (vaga) {
    return vaga.empresa;
  }).filter(function (nome, posicao, lista) {
    return lista.indexOf(nome) === posicao;
  });

  document.querySelector('[data-stat="abertas"]').textContent = abertas.length;
  document.querySelector('[data-stat="empresas"]').textContent = empresas.length;
  document.querySelector('[data-stat="remotas"]').textContent = remotas.length;
}

renderizar();
preencherEstatisticas();

const containerHorizontal = document.querySelector("#horizontal-container");
const slides = Array.from(document.querySelectorAll(".slide"));
const btnAnterior = document.querySelector("#btn-prev");
const btnProximo = document.querySelector("#btn-next");
const linksBarra = document.querySelectorAll(".barra-links a");

let slideAtual = 0;
let animacaoRolagem = null;
let larguraTela = containerHorizontal.clientWidth;
let ultimoRedimensionamento = 0;

function atualizarNavegacao() {
  btnAnterior.style.display = slideAtual === 0 ? "none" : "flex";
  btnProximo.style.display = slideAtual === slides.length - 1 ? "none" : "flex";

  linksBarra.forEach(function (link) {
    const ehAtual = link.getAttribute("href") === "#" + slides[slideAtual].id;
    link.classList.toggle("ativo", ehAtual);
  });
}

function finalizarRolagem() {
  if (animacaoRolagem) {
    cancelAnimationFrame(animacaoRolagem);
    animacaoRolagem = null;
  }
  containerHorizontal.style.scrollSnapType = "";
  containerHorizontal.style.scrollBehavior = "";
}

function indiceDoSlide(id) {
  return slides.findIndex(function (slide) {
    return slide.id === id;
  });
}

function irParaSlide(indice) {
  indice = Math.max(0, Math.min(slides.length - 1, indice));
  slideAtual = indice;
  atualizarNavegacao();

  const destino = indice * containerHorizontal.clientWidth;
  const inicio = containerHorizontal.scrollLeft;
  const distancia = destino - inicio;

  finalizarRolagem();

  if (Math.abs(distancia) < 2) {
    containerHorizontal.scrollLeft = destino;
    return;
  }

  containerHorizontal.style.scrollSnapType = "none";
  containerHorizontal.style.scrollBehavior = "auto";

  const duracao = 600 + 150 * Math.min(2, Math.abs(distancia) / containerHorizontal.clientWidth);
  const comeco = performance.now();

  function passo(agora) {
    const t = Math.min((agora - comeco) / duracao, 1);
    const suave = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    containerHorizontal.scrollLeft = inicio + distancia * suave;

    if (t < 1) {
      animacaoRolagem = requestAnimationFrame(passo);
    } else {
      containerHorizontal.scrollLeft = destino;
      finalizarRolagem();
    }
  }

  animacaoRolagem = requestAnimationFrame(passo);
}

btnProximo.addEventListener("click", function () {
  irParaSlide(slideAtual + 1);
});

btnAnterior.addEventListener("click", function () {
  irParaSlide(slideAtual - 1);
});

linksBarra.forEach(function (link) {
  link.addEventListener("click", function (evento) {
    evento.preventDefault();
    const indice = slides.findIndex(function (slide) {
      return "#" + slide.id === link.getAttribute("href");
    });
    voltarParaLista();
    irParaSlide(indice);
  });
});

document.addEventListener("keydown", function (evento) {
  const alvo = evento.target.tagName;
  if (alvo === "INPUT" || alvo === "SELECT" || alvo === "TEXTAREA") {
    return;
  }
  if (evento.key === "ArrowRight") irParaSlide(slideAtual + 1);
  if (evento.key === "ArrowLeft") irParaSlide(slideAtual - 1);
});

containerHorizontal.addEventListener("wheel", finalizarRolagem, { passive: true });
containerHorizontal.addEventListener("touchstart", finalizarRolagem, { passive: true });

containerHorizontal.addEventListener("scroll", function () {
  if (animacaoRolagem || containerHorizontal.clientWidth !== larguraTela) {
    return;
  }
  const indice = Math.round(containerHorizontal.scrollLeft / larguraTela);
  if (indice !== slideAtual) {
    slideAtual = indice;
    atualizarNavegacao();
  }
});

window.addEventListener("resize", function () {
  ultimoRedimensionamento = Date.now();
  larguraTela = containerHorizontal.clientWidth;
  finalizarRolagem();
  containerHorizontal.scrollTo({ left: slideAtual * larguraTela, behavior: "instant" });
});

function limparFiltros() {
  campoPesquisa.value = "";
  buscaRapida.value = "";
  filtroModalidade.value = "todas";
  renderizar();
}

const observadorVagas = new IntersectionObserver(function (entradas) {
  const saiuDaTela = entradas[entradas.length - 1].intersectionRatio < 0.01;
  const foiRedimensionamento = Date.now() - ultimoRedimensionamento < 500;
  if (saiuDaTela && !foiRedimensionamento) {
    limparFiltros();
  }
}, { threshold: 0.01 });

observadorVagas.observe(slideVagas);

atualizarNavegacao();

const passos = document.querySelectorAll(".passo");

passos.forEach(function (passo) {
  const botao = passo.querySelector(".passo-cabeca");

  botao.addEventListener("click", function () {
    const vaiAbrir = !passo.classList.contains("aberto");

    passos.forEach(function (outro) {
      outro.classList.remove("aberto");
      outro.querySelector(".passo-cabeca").setAttribute("aria-expanded", "false");
    });

    if (vaiAbrir) {
      passo.classList.add("aberto");
      botao.setAttribute("aria-expanded", "true");
    }
  });
});

const aranha = document.querySelector("#aranha");

let aranhaX = null;
let anguloAranha = 0;
let direcaoAranha = 1;
let ultimoMovimentoAranha = 0;

function animarAranha(agora) {
  const maximo = containerHorizontal.scrollWidth - containerHorizontal.clientWidth;
  const progresso = maximo > 0 ? containerHorizontal.scrollLeft / maximo : 0;

  const largura = aranha.offsetWidth;
  const margem = 24;
  const alvoX = margem + progresso * (window.innerWidth - 2 * margem - largura);

  if (aranhaX === null) {
    aranhaX = alvoX;
  }

  const anterior = aranhaX;
  aranhaX += (alvoX - aranhaX) * 0.14;
  const velocidade = aranhaX - anterior;
  const andando = Math.abs(velocidade) > 0.25;

  if (andando) {
    direcaoAranha = Math.sign(velocidade);
    ultimoMovimentoAranha = agora;
  }

  const anguloAlvo = agora - ultimoMovimentoAranha < 450 ? direcaoAranha * 90 : 0;
  anguloAranha += (anguloAlvo - anguloAranha) * 0.12;

  const ritmo = Math.sin(agora / 35);
  const balanco = andando ? ritmo * 5 : 0;
  const esticar = andando ? ritmo * 0.035 : 0;

  aranha.style.transform =
    "translate3d(" + aranhaX + "px, 0, 0) " +
    "rotate(" + (anguloAranha + balanco) + "deg) " +
    "scale(" + (1 + esticar) + ", " + (1 - esticar) + ")";

  requestAnimationFrame(animarAranha);
}

requestAnimationFrame(animarAranha);

const DEPOIMENTOS = [
  { nome: "Ana Beatriz", curso: "ADS, 3º semestre", texto: "Achei uma vaga remota em menos de um minuto. O filtro por modalidade ajuda muito." },
  { nome: "Lucas Ferreira", curso: "Sistemas, 4º semestre", texto: "Gostei de ver a bolsa direto no cartão. Dá para comparar tudo sem abrir nada." },
  { nome: "Marina Souza", curso: "ADS, 2º semestre", texto: "Os requisitos são claros. Soube na hora se já estava preparada para a vaga." },
  { nome: "Rafael Lima", curso: "Redes, 3º semestre", texto: "A página é rápida e simples. Em poucos cliques eu já estava nos detalhes." },
  { nome: "Camila Rocha", curso: "ADS, 4º semestre", texto: "Ordenar pela maior bolsa me economizou bastante tempo na hora de decidir." },
  { nome: "Pedro Almeida", curso: "Segurança, 2º semestre", texto: "Dá para ver quais vagas já encerraram, então não perco tempo com elas." },
  { nome: "Juliana Martins", curso: "ADS, 3º semestre", texto: "O visual é bonito e a busca encontra mesmo sem eu digitar o acento." },
  { nome: "Thiago Nunes", curso: "Sistemas, 5º semestre", texto: "Consegui separar as vagas híbridas rapidinho. Recomendo para quem está começando." }
];

function criarDepoimento(dados) {
  const cartao = document.createElement("article");
  cartao.className = "depoimento";
  cartao.innerHTML =
    '<div class="depoimento-estrelas">★★★★★</div>' +
    '<p class="depoimento-texto">' + dados.texto + "</p>" +
    '<div class="depoimento-autor">' +
      '<span class="depoimento-avatar">' + dados.nome.charAt(0) + "</span>" +
      "<div><strong>" + dados.nome + "</strong><span>" + dados.curso + "</span></div>" +
    "</div>";
  return cartao;
}

function preencherTrilho(seletor, lista) {
  const trilho = document.querySelector(seletor);
  const lote = document.createElement("div");
  lote.className = "lote";

  lista.forEach(function (dados) {
    lote.appendChild(criarDepoimento(dados));
  });

  trilho.appendChild(lote);
}

const animacoesTrilho = {};

function ajustarTrilho(seletor, pixelsPorSegundo) {
  const trilho = document.querySelector(seletor);
  const janela = trilho.parentElement;
  const distancia = Math.max(0, trilho.offsetHeight - janela.clientHeight);

  const antiga = animacoesTrilho[seletor];
  const estavaPausada = antiga && antiga.playState === "paused";
  if (antiga) {
    antiga.cancel();
  }

  if (distancia === 0) {
    return; 
  }

  const animacao = trilho.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-" + distancia + "px)" }
    ],
    {
      duration: (distancia / pixelsPorSegundo) * 1000,
      direction: "alternate", 
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );

  if (estavaPausada) {
    animacao.pause();
  }
  animacoesTrilho[seletor] = animacao;
}

function ajustarTrilhos() {
  ajustarTrilho("#trilho-esquerdo", 28);
  ajustarTrilho("#trilho-direito", 34); 
}

document.querySelectorAll(".lateral").forEach(function (lateral) {
  const seletor = "#" + lateral.querySelector(".lateral-trilho").id;

  lateral.addEventListener("mouseenter", function () {
    if (animacoesTrilho[seletor]) animacoesTrilho[seletor].pause();
  });

  lateral.addEventListener("mouseleave", function () {
    if (animacoesTrilho[seletor]) animacoesTrilho[seletor].play();
  });
});

preencherTrilho("#trilho-esquerdo", DEPOIMENTOS);
preencherTrilho("#trilho-direito", [...DEPOIMENTOS].reverse());

ajustarTrilhos();
window.addEventListener("load", ajustarTrilhos);
window.addEventListener("resize", ajustarTrilhos);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(ajustarTrilhos); 
}

const TEMAS = [
  { nome: "Azul", cor: "#38bdf8", escuro: "#0ea5e9", rgb: "56, 189, 248" },
  { nome: "Verde", cor: "#4ade80", escuro: "#22c55e", rgb: "74, 222, 128" },
  { nome: "Rosa", cor: "#fb7185", escuro: "#f43f5e", rgb: "251, 113, 133" },
  { nome: "Amarelo", cor: "#facc15", escuro: "#eab308", rgb: "250, 204, 21" },
  { nome: "Vermelho", cor: "#d0404f", escuro: "#b73843", rgb: "208, 64, 79" } 
];

const btnTema = document.querySelector("#btn-tema");
let temaAtual = 0;

function aplicarTema(indice) {
  const tema = TEMAS[indice];
  const raiz = document.documentElement.style;
  raiz.setProperty("--destaque", tema.cor);
  raiz.setProperty("--destaque-escuro", tema.escuro);
  raiz.setProperty("--destaque-rgb", tema.rgb);
  btnTema.title = "Cor de destaque: " + tema.nome + " (clique para trocar)";
  btnTema.setAttribute("aria-label", btnTema.title);
}

try {
  temaAtual = Number(localStorage.getItem("arachnix-tema")) || 0;
} catch (erro) {
  temaAtual = 0;
}
aplicarTema(temaAtual);

btnTema.addEventListener("click", function () {
  temaAtual = (temaAtual + 1) % TEMAS.length;
  aplicarTema(temaAtual);
  try {
    localStorage.setItem("arachnix-tema", temaAtual);
  } catch (erro) {
  }
});
