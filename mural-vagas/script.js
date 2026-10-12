// ==========================================================
// ARACHNIX | Mural de Vagas de Estágio em TI
// Os dados vêm de dados.js (array VAGAS)
// ==========================================================

// ---------- Elementos da página ----------
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

// ---------- Estado ----------
let ordenarPorBolsa = false;

// Classe CSS de cada modalidade (sem acento, em minúsculas)
const CLASSE_MODALIDADE = {
  "Presencial": "presencial",
  "Híbrido": "hibrido",
  "Remoto": "remoto"
};

// ---------- Funções auxiliares ----------
function formatarBolsa(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Aplica busca + filtro (+ ordenação, se ativada) e devolve a lista final
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
    // [...resultado] copia a lista para não mexer no array original
    resultado = [...resultado].sort(function (a, b) {
      return b.bolsa - a.bolsa;
    });
  }

  return resultado;
}

// ---------- Renderização ----------
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

// ---------- Detalhes ----------
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
  window.scrollTo(0, 0);
}

function voltarParaLista() {
  areaDetalhes.classList.add("escondido");
  areaLista.classList.remove("escondido");
}

// ---------- Eventos ----------
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

// ---------- Navbar ----------
const btnMenu = document.querySelector("#btn-menu");
const menuPrincipal = document.querySelector("#menu-principal");
const linksMenu = document.querySelectorAll("#menu-principal a");

function definirMenu(aberto) {
  menuPrincipal.classList.toggle("aberto", aberto);
  btnMenu.setAttribute("aria-expanded", aberto);
  btnMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

btnMenu.addEventListener("click", function () {
  definirMenu(!menuPrincipal.classList.contains("aberto"));
});

// Ao clicar em qualquer link: volta para a lista (se estiver nos detalhes) e fecha o menu
linksMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    voltarParaLista();
    definirMenu(false);
  });
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    definirMenu(false);
  }
});

// ---------- Início ----------
renderizar();