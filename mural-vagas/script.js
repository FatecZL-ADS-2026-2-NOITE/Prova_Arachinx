
const campoPesquisa = document.getElementById("campo-pesquisa");
const filtroModalidade = document.getElementById("filtro-modalidade");
const btnOrdenarBolsa = document.getElementById("btn-ordenar-bolsa");
const btnRestaurarOrdem = document.getElementById("btn-restaurar-ordem");
const contadorVagas = document.getElementById("contador-vagas");
const mensagemVazia = document.getElementById("mensagem-vazia");
const listaVagas = document.getElementById("lista-vagas");

const areaLista = document.getElementById("area-lista");
const detalhesVaga = document.getElementById("detalhes-vaga");
const btnVoltar = document.getElementById("btn-voltar");


const vagasAtivas = VAGAS.filter(function (vaga) {
  return vaga.ativa;
});

let ordenadoPorBolsa = false;


function formatarBolsa(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function obterVagasFiltradas() {
  const texto = campoPesquisa.value.toLowerCase().trim();
  const modalidade = filtroModalidade.value;

  let resultado = vagasAtivas.filter(function (vaga) {
    const bateTexto =
      vaga.empresa.toLowerCase().includes(texto) ||
      vaga.cargo.toLowerCase().includes(texto);

    const bateModalidade =
      modalidade === "todas" || vaga.modalidade === modalidade;

    return bateTexto && bateModalidade;
  });


  if (ordenadoPorBolsa) {
    resultado.sort(function (a, b) {
      return b.bolsa - a.bolsa;
    });
  }

  return resultado;
}

function mostrarVagas() {
  const vagas = obterVagasFiltradas();

  listaVagas.innerHTML = "";

  vagas.forEach(function (vaga) {
    listaVagas.innerHTML += `
      <article class="card-vaga">
        <h3>${vaga.cargo}</h3>
        <p class="card-empresa">${vaga.empresa}</p>
        <p class="card-modalidade">${vaga.modalidade}</p>
        <p class="card-bolsa">${formatarBolsa(vaga.bolsa)}</p>
        <button type="button" class="btn-detalhes" data-id="${vaga.id}">
          Ver detalhes
        </button>
      </article>
    `;
  });

  contadorVagas.textContent = vagas.length;

  if (vagas.length === 0) {
    mensagemVazia.classList.remove("escondido");
  } else {
    mensagemVazia.classList.add("escondido");
  }
}

function abrirDetalhes(id) {
  const vaga = VAGAS.find(function (v) {
    return v.id === id;
  });

  document.getElementById("detalhe-empresa").textContent = vaga.empresa;
  document.getElementById("detalhe-cargo").textContent = vaga.cargo;
  document.getElementById("detalhe-modalidade").textContent = vaga.modalidade;
  document.getElementById("detalhe-bolsa").textContent = formatarBolsa(vaga.bolsa);
  document.getElementById("detalhe-data").textContent = vaga.publicada;
  document.getElementById("detalhe-requisitos").textContent = vaga.requisitos;

  areaLista.classList.add("escondido");
  detalhesVaga.classList.remove("escondido");
}

function voltarParaLista() {
  detalhesVaga.classList.add("escondido");
  areaLista.classList.remove("escondido");
}


campoPesquisa.addEventListener("input", mostrarVagas);

filtroModalidade.addEventListener("change", mostrarVagas);

btnOrdenarBolsa.addEventListener("click", function () {
  ordenadoPorBolsa = true;
  mostrarVagas();
});

btnRestaurarOrdem.addEventListener("click", function () {
  ordenadoPorBolsa = false;
  mostrarVagas();
});

listaVagas.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("btn-detalhes")) {
    const id = Number(evento.target.dataset.id);
    abrirDetalhes(id);
  }
});

btnVoltar.addEventListener("click", voltarParaLista);

mostrarVagas();
