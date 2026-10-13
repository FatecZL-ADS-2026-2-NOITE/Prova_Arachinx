const listaVagas = document.querySelector("#lista-vagas");
const campoPesquisa = document.querySelector("#campo-pesquisa");
const filtroModalidade = document.querySelector("#filtro-modalidade");
const btnOrdenar = document.querySelector("#btn-ordenar-bolsa");
const btnRestaurar = document.querySelector("#btn-restaurar-ordem");
const contadorVagas = document.querySelector("#contador-vagas");
const mensagemVazia = document.querySelector("#mensagem-vazia");
const areaLista = document.querySelector("#area-lista");
const areaDetalhes = document.querySelector("#detalhes-vaga");
const conteudoDetalhes = document.querySelector("#conteudo-detalhes");
const btnVoltar = document.querySelector("#btn-voltar");
const botoesPagina = document.querySelectorAll("[data-pagina]");
const botoesMenu = document.querySelectorAll(".botao-menu");
const paginas = ["inicio", "como-funciona", "vagas", "time"];

let ordenado = false;

function formatarBolsa(valor) {
  return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function filtrarVagas() {
  const texto = campoPesquisa.value.trim().toLowerCase();
  const modalidade = filtroModalidade.value;
  const resultado = [];

  for (let i = 0; i < VAGAS.length; i++) {
    const vaga = VAGAS[i];

    const achouEmpresa = vaga.empresa.toLowerCase().includes(texto);
    const achouCargo = vaga.cargo.toLowerCase().includes(texto);
    const modalidadeOk = modalidade === "todas" || vaga.modalidade === modalidade;

    if ((achouEmpresa || achouCargo) && modalidadeOk) {
      resultado.push(vaga);
    }
  }

  if (ordenado) {
    resultado.sort(function (a, b) {
      return b.bolsa - a.bolsa;
    });
  }

  return resultado;
}

function criarCartao(vaga) {
  const cartao = document.createElement("article");
  cartao.className = "cartao-vaga";

  let etiquetaStatus = "";
  if (vaga.ativa === false) {
    cartao.classList.add("encerrada");
    etiquetaStatus = '<span class="etiqueta encerrada-etiqueta">Encerrada</span>';
  }

  cartao.innerHTML =
    '<div class="etiquetas">' +
      '<span class="etiqueta">' + vaga.modalidade + "</span>" +
      etiquetaStatus +
    "</div>" +
    "<h3>" + vaga.cargo + "</h3>" +
    "<p>" + vaga.empresa + "</p>" +
    '<p class="bolsa">Bolsa: ' + formatarBolsa(vaga.bolsa) + "</p>" +
    '<button type="button">Ver detalhes</button>';

  const botao = cartao.querySelector("button");
  botao.addEventListener("click", function () {
    mostrarDetalhes(vaga);
  });

  return cartao;
}

function mostrarVagas() {
  const vagas = filtrarVagas();

  listaVagas.innerHTML = "";
  for (let i = 0; i < vagas.length; i++) {
    listaVagas.appendChild(criarCartao(vagas[i]));
  }

  contadorVagas.textContent = vagas.length;

  if (vagas.length === 0) {
    mensagemVazia.classList.remove("escondido");
  } else {
    mensagemVazia.classList.add("escondido");
  }
}

function criarLista(itens) {
  let html = "<ul>";
  for (let i = 0; i < itens.length; i++) {
    html += "<li>" + itens[i] + "</li>";
  }
  html += "</ul>";
  return html;
}

function mostrarDetalhes(vaga) {
  let situacao = "Vaga encerrada";
  if (vaga.ativa) {
    situacao = "Vaga aberta";
  }

  conteudoDetalhes.innerHTML =
    "<h2>" + vaga.cargo + "</h2>" +
    "<p><strong>Empresa:</strong> " + vaga.empresa + "</p>" +
    "<p><strong>Modalidade:</strong> " + vaga.modalidade + "</p>" +
    "<p><strong>Bolsa:</strong> " + formatarBolsa(vaga.bolsa) + "</p>" +
    "<p><strong>Publicada em:</strong> " + vaga.publicada + "</p>" +
    "<p><strong>Situação:</strong> " + situacao + "</p>" +
    "<h3>Requisitos</h3>" +
    "<p>" + vaga.requisitos + "</p>" +
    "<h3>Como é a vaga</h3>" +
    "<p><strong>Carga horária:</strong> " + vaga.cargaHoraria + "</p>" +
    "<p><strong>Horário:</strong> " + vaga.horario + "</p>" +
    "<p><strong>Duração do estágio:</strong> " + vaga.duracao + "</p>" +
    "<h3>O que você vai fazer</h3>" +
    criarLista(vaga.atividades) +
    "<h3>Benefícios</h3>" +
    criarLista(vaga.beneficios) +
    '<p><a href="' + vaga.link + '" target="_blank">Acessar link da vaga</a></p>';

  areaLista.classList.add("escondido");
  areaDetalhes.classList.remove("escondido");
  areaDetalhes.scrollIntoView();
}

function voltarParaLista() {
  areaDetalhes.classList.add("escondido");
  areaLista.classList.remove("escondido");
  areaLista.scrollIntoView();
}

campoPesquisa.addEventListener("input", mostrarVagas);
filtroModalidade.addEventListener("change", mostrarVagas);

btnOrdenar.addEventListener("click", function () {
  ordenado = true;
  mostrarVagas();
});

btnRestaurar.addEventListener("click", function () {
  ordenado = false;
  mostrarVagas();
});

btnVoltar.addEventListener("click", voltarParaLista);

function mostrarPagina(nome) {
  for (let i = 0; i < paginas.length; i++) {
    const pagina = document.querySelector("#" + paginas[i]);
    if (paginas[i] === nome) {
      pagina.classList.remove("escondido");
    } else {
      pagina.classList.add("escondido");
    }
  }

  for (let i = 0; i < botoesMenu.length; i++) {
    if (botoesMenu[i].dataset.pagina === nome) {
      botoesMenu[i].classList.add("ativo");
    } else {
      botoesMenu[i].classList.remove("ativo");
    }
  }

  window.scrollTo(0, 0);
}

for (let i = 0; i < botoesPagina.length; i++) {
  const botao = botoesPagina[i];
  botao.addEventListener("click", function () {
    mostrarPagina(botao.dataset.pagina);
  });
}

mostrarVagas();
