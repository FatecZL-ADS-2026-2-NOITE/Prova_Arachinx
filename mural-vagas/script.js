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

const CLASSE_MODALIDADE = {
  "Presencial": "presencial",
  "Híbrido": "hibrido",
  "Remoto": "remoto"
};

function formatarBolsa(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function obterVagasFiltradas() {
  const texto = campoPesquisa.value.trim().toLowerCase();
  const modalidade = filtroModalidade.value;

  let resultado = VAGAS.filter(function (vaga) {
    const bateTexto =
      vaga.empresa.toLowerCase().includes(texto) ||
      vaga.cargo.toLowerCase().includes(texto);
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
  if (!vaga.ativa) {
    cartao.classList.add("cartao-encerrada");
  }

  const selosStatus = vaga.ativa ? "" : '<span class="selo-status">Encerrada</span>';

  cartao.innerHTML =
    '<div class="cartao-topo">' +
      '<span class="selo selo-' + classe + '">' + vaga.modalidade + "</span>" +
      selosStatus +
    "</div>" +
    '<h3 class="cartao-cargo">' + vaga.cargo + "</h3>" +
    '<p class="cartao-empresa">' + vaga.empresa + "</p>" +
    '<p class="cartao-bolsa"><span>Bolsa</span> ' + formatarBolsa(vaga.bolsa) + "</p>" +
    '<button type="button" class="btn-detalhes">Ver detalhes</button>';

  cartao.querySelector(".btn-detalhes").addEventListener("click", function () {
    mostrarDetalhes(vaga.id);
  });

  return cartao;
}

function renderizar() {
  const vagas = obterVagasFiltradas();

  listaVagas.innerHTML = "";
  vagas.forEach(function (vaga) {
    listaVagas.appendChild(criarCartao(vaga));
  });

  contadorVagas.textContent = vagas.length;

  if (vagas.length === 0) {
    mensagemVazia.classList.remove("escondido");
  } else {
    mensagemVazia.classList.add("escondido");
  }
}

function mostrarDetalhes(id) {
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

  areaLista.classList.add("escondido");
  areaDetalhes.classList.remove("escondido");
  slideVagas.scrollTo(0, 0);
}

function voltarParaLista() {
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

btnVoltar.addEventListener("click", voltarParaLista);

const linksBarra = document.querySelectorAll(".barra-links a");

linksBarra.forEach(function (link) {
  link.addEventListener("click", voltarParaLista);
});

const formRapido = document.querySelector("#form-rapido");
const buscaRapida = document.querySelector("#busca-rapida");
const chips = document.querySelectorAll(".chip");

function irParaVagas() {
  voltarParaLista();
  slideVagas.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
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
let slideAtual = 0;
let larguraTela = containerHorizontal.clientWidth;
let ultimoRedimensionamento = 0;

containerHorizontal.addEventListener("scroll", function () {
  if (containerHorizontal.clientWidth !== larguraTela) {
    return;
  }
  slideAtual = Math.round(containerHorizontal.scrollLeft / larguraTela);
});

window.addEventListener("resize", function () {
  ultimoRedimensionamento = Date.now();
  larguraTela = containerHorizontal.clientWidth;
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
