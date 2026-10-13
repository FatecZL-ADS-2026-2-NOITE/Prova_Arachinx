# 🕷️ Arachnix — Mural de Vagas de Estágio em TI

Projeto Desafio 01 desenvolvido para a disciplina de Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (Fatec Zona Leste).

> 📊 **Acompanhamento e Gestão:** [Acessar o Quadro Kanban do Projeto](https://github.com/orgs/FatecZL-ADS-2026-2-NOITE/projects/35/views/1)

## 🎯 O Projeto

O projeto sorteado foi o **Mural de Vagas de Estágio em TI** para o cliente *Núcleo de Estágios da Fatec*. O objetivo principal é resolver o problema da perda de oportunidades de estágio que chegam de forma desorganizada por e-mail, centralizando as vagas em uma única página web dinâmica e interativa.

**Principais funcionalidades desenvolvidas:**
- 🔍 Busca instantânea por texto (empresa ou cargo).
- 🏷️ Filtro de vagas por modalidade (Remoto, Híbrido, Presencial).
- 💰 Ordenação inteligente pelo valor da bolsa.
- 🔢 Contador de vagas encontradas e mensagem quando nada é encontrado.
- 📄 Detalhes da vaga ao clicar no cartão, com botão para voltar à lista.
- 📱 Interface responsiva, adaptada para celulares (telas de 400px).

## 🛠️ Tecnologias e Restrições
O projeto foi desenvolvido cumprindo rigorosamente as restrições impostas pela disciplina (sem a utilização de banco de dados externo, *frameworks* ou bibliotecas):
- **HTML5:** Estruturação semântica e acessível.
- **CSS3:** Estilização nativa com Flexbox e Grid.
- **JavaScript (Vanilla):** Manipulação dinâmica do DOM, lógica de busca, filtro e ordenação.

## 👥 Equipe Arachnix: Divisão de Tarefas

Abaixo está a lista dos membros e a responsabilidade de cada um durante o desenvolvimento do projeto, garantindo o registro do que cada um fez:

- **Felipe Viana (HTML):** Estrutura semântica da página, cabeçalho, rodapé e marcação dos campos de busca e filtros.
- **Miguel Willians (CSS):** Identidade visual, layout dos cartões de vagas e responsividade para garantir a leitura perfeita em celulares (telas de 400px).
- **Gabriel Oliveira (Dados e Documentação):** Levantamento de requisitos, modelagem das entidades (MER) e construção do banco de dados estático no arquivo `dados.js`.
- **João Santana (JavaScript):** Lógica de programação, renderização dinâmica dos dados na tela, funcionamento das pesquisas e implementação do botão de ordenar pela maior bolsa.

## 🚀 Como executar o projeto

Como o projeto não exige a instalação de um servidor local ou banco de dados, a sua execução é extremamente simples:
1. Faça o clone deste repositório ou o download dos arquivos.
2. Abra a pasta `mural-vagas`.
3. Dê dois cliques no arquivo `index.html` para abrir em qualquer navegador web moderno.

## 📁 Arquivos principais (pasta `mural-vagas`)
- `index.html`: estrutura da página.
- `style.css`: estilo e responsividade.
- `dados.js`: array `VAGAS` com as vagas cadastradas.
- `script.js`: busca, filtro, contador, ordenação e detalhes das vagas.
- `docs/`: Levantamento de Requisitos e Modelagem de Dados e Entidades (PDF).
