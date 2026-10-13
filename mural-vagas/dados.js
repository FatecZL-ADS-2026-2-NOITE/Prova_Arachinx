const VAGAS = [
  {
    id: 1,
    empresa: "TecnoSoft",
    cargo: "Estágio em Desenvolvimento Web",
    modalidade: "Presencial",
    bolsa: 1200,
    requisitos: "HTML, CSS e lógica de programação",
    ativa: true,
    publicada: "28/09/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "13h às 19h, de segunda a sexta",
    duracao: "6 meses, renovável",
    atividades: [
      "Criar e ajustar páginas com HTML, CSS e JavaScript",
      "Corrigir bugs apontados pela equipe",
      "Participar das reuniões diárias de acompanhamento",
      "Aprender boas práticas de código com um desenvolvedor sênior"
    ],
    beneficios: [
      "Vale-transporte",
      "Vale-refeição",
      "Seguro de vida",
      "Recesso remunerado"
    ],
    link: "https://www.linkedin.com/company/tecnosoft/jobs"
  },
  {
    id: 2,
    empresa: "DataNova",
    cargo: "Estágio em Análise de Dados",
    modalidade: "Remoto",
    bolsa: 1500,
    requisitos: "Excel, SQL básico e raciocínio lógico",
    ativa: true,
    publicada: "30/09/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "9h às 15h, de segunda a sexta",
    duracao: "6 meses, renovável",
    atividades: [
      "Organizar e limpar planilhas de dados",
      "Criar consultas SQL simples",
      "Montar gráficos e relatórios semanais",
      "Apresentar os resultados para o time"
    ],
    beneficios: [
      "Auxílio home office",
      "Plano de saúde",
      "Recesso remunerado",
      "Cursos online de dados"
    ],
    link: "https://www.linkedin.com/company/datanova/jobs"
  },
  {
    id: 3,
    empresa: "CloudBridge",
    cargo: "Estágio em Suporte Técnico",
    modalidade: "Híbrido",
    bolsa: 1100,
    requisitos: "Redes, sistemas operacionais e boa comunicação",
    ativa: true,
    publicada: "01/10/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "8h às 14h, com 2 dias presenciais por semana",
    duracao: "12 meses, renovável",
    atividades: [
      "Atender chamados de suporte dos colaboradores",
      "Instalar e configurar computadores e programas",
      "Registrar as soluções na base de conhecimento",
      "Acompanhar a equipe de redes nas manutenções"
    ],
    beneficios: [
      "Vale-transporte",
      "Vale-refeição",
      "Seguro de vida",
      "Folga no aniversário"
    ],
    link: "https://www.linkedin.com/company/cloudbridge/jobs"
  },
  {
    id: 4,
    empresa: "PixelForge",
    cargo: "Estágio em Front-end",
    modalidade: "Remoto",
    bolsa: 1800,
    requisitos: "HTML, CSS, JavaScript e noções de Git",
    ativa: true,
    publicada: "02/10/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "10h às 16h, de segunda a sexta",
    duracao: "6 meses, renovável",
    atividades: [
      "Construir telas responsivas a partir de protótipos",
      "Praticar JavaScript em tarefas reais do produto",
      "Revisar código em dupla com outro desenvolvedor",
      "Usar Git no dia a dia do time"
    ],
    beneficios: [
      "Auxílio home office",
      "Vale-alimentação",
      "Plano odontológico",
      "Notebook fornecido pela empresa"
    ],
    link: "https://www.linkedin.com/company/pixelforge/jobs"
  },
  {
    id: 5,
    empresa: "SecureNet",
    cargo: "Estágio em Segurança da Informação",
    modalidade: "Presencial",
    bolsa: 1400,
    requisitos: "Redes, noções de criptografia e curiosidade por segurança",
    ativa: false,
    publicada: "15/09/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "12h às 18h, de segunda a sexta",
    duracao: "12 meses, renovável",
    atividades: [
      "Monitorar alertas de segurança",
      "Ajudar nos testes de vulnerabilidade",
      "Documentar incidentes e correções",
      "Estudar normas de segurança junto com o time"
    ],
    beneficios: [
      "Vale-transporte",
      "Vale-refeição",
      "Seguro de vida",
      "Bolsa para certificações"
    ],
    link: "https://www.linkedin.com/company/securenet/jobs"
  },
  {
    id: 6,
    empresa: "Logiq Sistemas",
    cargo: "Estágio em Testes de Software",
    modalidade: "Híbrido",
    bolsa: 1200,
    requisitos: "Lógica de programação, atenção a detalhes e noções de testes",
    ativa: true,
    publicada: "03/10/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "14h às 20h, com 3 dias presenciais por semana",
    duracao: "6 meses, renovável",
    atividades: [
      "Executar casos de teste manuais",
      "Registrar bugs com o passo a passo para reproduzir",
      "Ajudar a montar testes automatizados simples",
      "Validar as correções antes de cada entrega"
    ],
    beneficios: [
      "Vale-transporte",
      "Vale-refeição",
      "Plano de saúde",
      "Recesso remunerado"
    ],
    link: "https://www.linkedin.com/company/logiq-sistemas/jobs"
  },
  {
    id: 7,
    empresa: "Banco Horizonte",
    cargo: "Estágio em Desenvolvimento Back-end",
    modalidade: "Presencial",
    bolsa: 2000,
    requisitos: "Algoritmos, banco de dados e uma linguagem de programação",
    ativa: true,
    publicada: "05/10/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "9h às 15h, de segunda a sexta",
    duracao: "12 meses, renovável",
    atividades: [
      "Desenvolver rotinas de back-end junto com a equipe",
      "Escrever consultas ao banco de dados",
      "Criar testes para o que for desenvolvido",
      "Documentar as funcionalidades criadas"
    ],
    beneficios: [
      "Vale-transporte",
      "Vale-refeição",
      "Plano de saúde",
      "Seguro de vida",
      "Auxílio-educação"
    ],
    link: "https://www.linkedin.com/company/banco-horizonte/jobs"
  },
  {
    id: 8,
    empresa: "Startup Aurora",
    cargo: "Estágio em UX/UI Design",
    modalidade: "Remoto",
    bolsa: 900,
    requisitos: "Figma, noções de usabilidade e portfólio simples",
    ativa: true,
    publicada: "06/10/2026",
    cargaHoraria: "6 horas por dia (30 horas semanais)",
    horario: "13h às 19h, com flexibilidade de entrada e saída",
    duracao: "6 meses, renovável",
    atividades: [
      "Criar telas e protótipos no Figma",
      "Testar a usabilidade com usuários reais",
      "Montar a biblioteca de componentes visuais",
      "Apresentar ideias nas reuniões de design"
    ],
    beneficios: [
      "Horário flexível",
      "Auxílio internet",
      "Vale-alimentação",
      "Eventos e ações de equipe"
    ],
    link: "https://www.linkedin.com/company/startup-aurora/jobs"
  }
];
