export interface Alternativa {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  texto: string;
}

export interface Explicacao {
  resumo: string;
  porQueCorreta: string;
  analiseDistratores: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  dicaPedagogica?: string;
  conceitoChave?: string;
}

export interface Questao {
  id: string;
  numeroExibicao?: number;
  exame: 'ENEM' | 'SAEB' | 'Prova Paulista' | 'OBA' | 'FUVEST' | 'UNICAMP' | 'UERJ';
  nivel: 'Fundamental' | 'Médio';
  anoFase: string;
  cadernoInfo?: string;
  materia: string;
  disciplinaGeral: 'Matemática' | 'Ciências da Natureza' | 'Linguagens e Códigos' | 'Ciências Humanas' | 'Astronomia';
  habilidade: string;
  textoMotivador?: string;
  referenciaTexto?: string;
  temGrafico?: boolean;
  tipoGrafico?: 'demografia' | 'astronomia_eclipses' | 'geometria_rampa' | 'termodinamica' | 'oba_kepler' | 'cadeia_trofica';
  enunciado: string;
  opcoes: Alternativa[];
  respostaCorreta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacaoDetalhada: Explicacao;
}

// 1. Curated Master Questions (with rich diagrams & specific references)
export const QUESTOES_CURADAS: Questao[] = [
  {
    id: 'enem-geo-14',
    numeroExibicao: 14,
    exame: 'ENEM',
    nivel: 'Médio',
    anoFase: '1º Dia - Edição 2024',
    cadernoInfo: 'Exame Nacional do Ensino Médio • Caderno 1 Azul',
    materia: 'Geografia Urbana',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H18 • Geografia Urbana',
    textoMotivador: `“A partir da década de 1960, a dinâmica territorial brasileira assistiu a uma reconfiguração sem precedentes: a passagem acelerada de um arquipélago regional agrário para uma rede urbana integrada de metrópoles nacionais e polos regionais dinâmicos. A industrialização dependente e a concentração de capitais ditaram um fluxo centrípeto populacional ininterrupto.”`,
    referenciaTexto: 'SANTOS, Milton; SILVEIRA, María Laura. O Brasil: território e sociedade no início do século XXI. Rio de Janeiro: Record, 2001 (adaptado).',
    temGrafico: true,
    tipoGrafico: 'demografia',
    enunciado: 'Considerando a transição demográfica brasileira e os processos de urbanização a partir da segunda metade do século XX, o fenômeno retratado provocou prioritariamente:',
    opcoes: [
      { id: 'A', texto: 'a desaceleração do êxodo rural decorrente da mecanização imediata do campo.' },
      { id: 'B', texto: 'o aumento da demanda por infraestrutura urbana básica e metropolização acelerada.' },
      { id: 'C', texto: 'a homogeneização regional da renda per capita entre o Nordeste e o Sudeste.' },
      { id: 'D', texto: 'a contenção espontânea do crescimento populacional nas periferias metropolitanas.' },
      { id: 'E', texto: 'a retração das atividades do setor terciário nas capitais estaduais.' },
    ],
    respostaCorreta: 'B',
    explicacaoDetalhada: {
      resumo: 'O êxodo rural maciço pós-1960 superlotou as metrópoles sem planejamento urbano prévio.',
      porQueCorreta: 'A alternativa B está correta porque a rápida migração campo-cidade (êxodo rural) concentrou milhões de pessoas nas metrópoles, gerando pressão sobre moradia, água tratada, transporte público e saúde (metropolização acelerada e macrocefalia urbana).',
      analiseDistratores: {
        A: 'Incorreta: A mecanização agrícola intensificou a saída de trabalhadores do campo para a cidade.',
        B: 'Correta: Sobrecarga estrutural nas grandes capitais e expansão acelerada das periferias.',
        C: 'Incorreta: As disparidades socioespaciais e de renda regional continuaram acentuadas.',
        D: 'Incorreta: O crescimento das periferias foi exponencial e desprovido de contenção espontânea.',
        E: 'Incorreta: O setor terciário expandiu-se com intensidade para absorver a força de trabalho.',
      },
      dicaPedagogica: 'No ENEM Humanas, questões de Milton Santos abordam frequentemente macrocefalia urbana e periferização.',
      conceitoChave: 'Metropolização e Demografia Urbana',
    },
  },
  {
    id: 'enem-fis-termo',
    numeroExibicao: 15,
    exame: 'ENEM',
    nivel: 'Médio',
    anoFase: '2º Dia - Ciências da Natureza',
    cadernoInfo: 'Exame Nacional do Ensino Médio • Caderno 5 Amarelo',
    materia: 'Termodinâmica',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H05 • Transformações de Energia e Rendimento',
    textoMotivador: `Um grupo de estudantes projeta um motor térmico experimental operando entre uma caldeira a 600 K (327 ºC) e um condensador a 300 K (27 ºC). O fabricante da peça alega em seu folheto publicitário que o protótipo atinge rendimento térmico real de 55%.`,
    referenciaTexto: 'Caderno de Física Aplicada às Tecnologias Verdes, 2024.',
    temGrafico: true,
    tipoGrafico: 'termodinamica',
    enunciado: 'Com base nas leis fundamentais da Termodinâmica, a alegação de rendimento apresentada pelo fabricante é:',
    opcoes: [
      { id: 'A', texto: 'fisicamente impossível, pois o rendimento teórico máximo (Ciclo de Carnot) para essas temperaturas é de 50%.' },
      { id: 'B', texto: 'plausível, desde que o fluido de trabalho utilizado seja um gás monoatômico em expansão isotérmica.' },
      { id: 'C', texto: 'verdadeira, pois qualquer motor que trabalhe com diferença de 300 K supera 50% de eficiência.' },
      { id: 'D', texto: 'incorreta, porque segundo a 1ª Lei da Termodinâmica o rendimento de qualquer máquina térmica é sempre 100%.' },
      { id: 'E', texto: 'possível somente se não houver atrito mecânico nas engrenagens e êmbolos.' },
    ],
    respostaCorreta: 'A',
    explicacaoDetalhada: {
      resumo: 'O Teorema de Carnot define o teto máximo teórico de rendimento para duas fontes térmicas: η = 1 - (Tfria / Tquente).',
      porQueCorreta: 'η_máx = 1 - (300 K / 600 K) = 0,50 (50%). Como nenhuma máquina térmica real pode superar o ciclo ideal de Carnot operando entre as mesmas temperaturas, 55% viola a Segunda Lei da Termodinâmica.',
      analiseDistratores: {
        A: 'Correta: η_máx = 50%. A alegação de 55% contraria o Segundo Princípio da Termodinâmica.',
        B: 'Incorreta: O tipo de gás não altera o limite intrínseco fixado pelas temperaturas absolutas.',
        C: 'Incorreta: O rendimento depende da razão entre as temperaturas em Kelvin, não apenas da diferença.',
        D: 'Incorreta: A 2ª Lei impede rendimento de 100%; é impossível converter integralmente calor em trabalho.',
        E: 'Incorreta: Mesmo sem atrito (máquina ideal), o teto máximo seria 50%, nunca 55%.',
      },
      dicaPedagogica: 'Lembre-se sempre de conferir as temperaturas em Kelvin (T = ºC + 273).',
      conceitoChave: 'Segunda Lei da Termodinâmica e Ciclo de Carnot',
    },
  },
  {
    id: 'enem-bio-eco',
    numeroExibicao: 16,
    exame: 'ENEM',
    nivel: 'Médio',
    anoFase: '2º Dia - Ciências da Natureza',
    cadernoInfo: 'Exame Nacional do Ensino Médio • Caderno 5 Amarelo',
    materia: 'Ecologia e Meio Ambiente',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H12 • Dinâmica de Populações e Poluição',
    textoMotivador: `Em uma bacia hidrográfica próxima a uma zona de garimpo e polo industrial, foi detectada contaminação de águas por metilmercúrio e agrotóxicos organoclorados. Análises ecotoxicológicas mediram a concentração nos diversos níveis da cadeia alimentar.`,
    referenciaTexto: 'Revista Brasileira de Gestão Ambiental e Ecossistemas Aquáticos, 2023.',
    temGrafico: true,
    tipoGrafico: 'cadeia_trofica',
    enunciado: 'Em decorrência do fenômeno de magnificação trófica (bioacumulação), a maior concentração do poluente por unidade de biomassa será observada nos:',
    opcoes: [
      { id: 'A', texto: 'fitoplânctons, por realizarem fotossíntese contínua em contato direto com a lâmina d\'água.' },
      { id: 'B', texto: 'zooplânctons e moluscos filtradores, por reterem sedimentos no fundo do rio.' },
      { id: 'C', texto: 'peixes herbívoros, devido ao alto consumo diário de macrófitas aquáticas.' },
      { id: 'D', texto: 'peixes carnívoros de topo de cadeia e aves piscívoras da região.' },
      { id: 'E', texto: 'decompositores microscópicos, que metabolizam todos os restos orgânicos dissolvidos.' },
    ],
    respostaCorreta: 'D',
    explicacaoDetalhada: {
      resumo: 'Substâncias lipossolúveis e não biodegradáveis se acumulam progressivamente ao longo dos níveis tróficos.',
      porQueCorreta: 'A biomagnificação trófica é o acúmulo crescente de poluentes não biodegradáveis (como mercúrio). Cada predador consome múltiplos indivíduos do nível trófico inferior, concentrando o poluente no topo da teia alimentar.',
      analiseDistratores: {
        A: 'Incorreta: Produtores possuem a menor concentração por indivíduo na cadeia.',
        B: 'Incorreta: Consumidores primários têm concentração intermediária-baixa.',
        C: 'Incorreta: Consumidores secundários concentram menos que os de topo.',
        D: 'Correta: Os predadores de ápice acumulam as maiores taxas de contaminação.',
        E: 'Incorreta: Tecidos de predadores carnívoros vivos concentram a maior carga tóxica.',
      },
      dicaPedagogica: 'Biomagnificação aumenta em direção ao topo da cadeia trófica.',
      conceitoChave: 'Biomagnificação Trófica e Poluição Aquática',
    },
  },
  {
    id: 'saeb-9ef-mat',
    numeroExibicao: 2,
    exame: 'SAEB',
    nivel: 'Fundamental',
    anoFase: '9º Ano E.F. - Diagnóstica',
    cadernoInfo: 'Sistema de Avaliação da Educação Básica • Matemática 9º Ano',
    materia: 'Geometria e Medidas',
    disciplinaGeral: 'Matemática',
    habilidade: 'Descritor D10 • Relações métricas no triângulo retângulo (Teorema de Pitágoras)',
    textoMotivador: `Para garantir a acessibilidade de cadeirantes a uma biblioteca escolar, foi construída uma rampa retilínea de concreto que vence um desnível vertical de 1,2 metro em relação ao solo e sua projeção horizontal no chão mede 1,6 metro.`,
    referenciaTexto: 'Avaliação Diagnóstica de Habilidades Matemáticas - 9º Ano.',
    temGrafico: true,
    tipoGrafico: 'geometria_rampa',
    enunciado: 'Qual é o comprimento total (em metros) da superfície inclinada por onde o cadeirante transita?',
    opcoes: [
      { id: 'A', texto: '1,8 metro.' },
      { id: 'B', texto: '2,0 metros.' },
      { id: 'C', texto: '2,4 metros.' },
      { id: 'D', texto: '2,8 metros.' },
      { id: 'E', texto: '3,2 metros.' },
    ],
    respostaCorreta: 'B',
    explicacaoDetalhada: {
      resumo: 'Teorema de Pitágoras: h² = 1,2² + 1,6² = 1,44 + 2,56 = 4,00 => h = 2,0 m.',
      porQueCorreta: 'h² = 1,2² + 1,6² = 1,44 + 2,56 = 4,00 => h = √4,00 = 2,0 m (proporção do triângulo 3-4-5 multiplicada por 0,4).',
      analiseDistratores: {
        A: 'Incorreta: Soma arbitrária de decimais sem elevar ao quadrado.',
        B: 'Correta: h = √(1,44 + 2,56) = √4 = 2,0 metros.',
        C: 'Incorreta: Erro de cálculo na raiz.',
        D: 'Incorreta: Soma direta simples dos catetos (1,2 + 1,6 = 2,8).',
        E: 'Incorreta: Produto dos catetos com arredondamento arbitrário.',
      },
      dicaPedagogica: 'Reconhecer o triângulo pitagórico 3-4-5 poupa tempo no SAEB!',
      conceitoChave: 'Teorema de Pitágoras',
    },
  },
  {
    id: 'oba-ef-eclipses',
    numeroExibicao: 4,
    exame: 'OBA',
    nivel: 'Fundamental',
    anoFase: 'Nível 3 (Fundamental II)',
    cadernoInfo: 'Olimpíada Brasileira de Astronomia e Astronáutica • Prova Oficial',
    materia: 'Astronomia - Sistema Solar e Mecânica Celeste',
    disciplinaGeral: 'Astronomia',
    habilidade: 'OBA Nível 3 • Fases da Lua e Eclipses',
    textoMotivador: `Alunos de um clube de ciências registraram as fases da Lua e os alinhamentos celestes que causam eclipses solares e lunares ao longo do ano.`,
    referenciaTexto: 'Comitê Organizador da OBA / SAB.',
    temGrafico: true,
    tipoGrafico: 'astronomia_eclipses',
    enunciado: 'Para que ocorra um ECLIPSE SOLAR visível a partir da Terra, é indispensável que a Lua esteja na fase:',
    opcoes: [
      { id: 'A', texto: 'Cheia, posicionando a Terra exatamente entre o Sol e a Lua.' },
      { id: 'B', texto: 'Nova, posicionando a Lua entre o Sol e a Terra.' },
      { id: 'C', texto: 'Quarto Crescente, quando a Lua forma um ângulo reto de 90º com a linha Sol-Terra.' },
      { id: 'D', texto: 'Quarto Minguante, iluminada em sua metade ocidental.' },
      { id: 'E', texto: 'Gibosa iluminada, independente da posição orbital dos astros.' },
    ],
    respostaCorreta: 'B',
    explicacaoDetalhada: {
      resumo: 'No eclipse solar, a Lua projeta sua sombra sobre a Terra (alinhamento Sol - Lua - Terra = Lua Nova).',
      porQueCorreta: 'O eclipse solar só ocorre na fase de Lua Nova, quando a Lua se interpõe diretamente entre o Sol e a Terra.',
      analiseDistratores: {
        A: 'Incorreta: Na Lua Cheia ocorre o eclipse lunar.',
        B: 'Correta: Alinhamento Sol-Lua-Terra (Lua Nova).',
        C: 'Incorreta: Em quadratura de 90º ocorrem marés de quadratura, nunca eclipses.',
        D: 'Incorreta: Fases de quarto minguante não permitem alinhamento em linha reta.',
        E: 'Incorreta: Não há alinhamento direto em fases gibosas.',
      },
      dicaPedagogica: 'Sol-Lua-Terra = Solar (Lua Nova). Sol-Terra-Lua = Lunar (Lua Cheia).',
      conceitoChave: 'Geometria dos Eclipses',
    },
  },
  {
    id: 'oba-em-kepler',
    numeroExibicao: 5,
    exame: 'OBA',
    nivel: 'Médio',
    anoFase: 'Nível 4 (Ensino Médio)',
    cadernoInfo: 'Olimpíada Brasileira de Astronomia e Astronáutica • Nível 4',
    materia: 'Astrofísica e Gravitação',
    disciplinaGeral: 'Astronomia',
    habilidade: 'OBA Nível 4 • Leis de Kepler e Órbitas Planetárias',
    textoMotivador: `Astrônomos descobriram um exoplaneta rochoso cujo semieixo maior da órbita ao redor de uma estrela tipo solar é 4 vezes a distância da Terra ao Sol (a = 4 UA).`,
    referenciaTexto: 'Boletim da Sociedade Astronômica Brasileira.',
    temGrafico: true,
    tipoGrafico: 'oba_kepler',
    enunciado: 'Adotando a Terceira Lei de Kepler (T² = a³ em unidades astronômicas), o período de translação (ano) desse exoplaneta em anos terrestres é:',
    opcoes: [
      { id: 'A', texto: '2 anos terrestres.' },
      { id: 'B', texto: '4 anos terrestres.' },
      { id: 'C', texto: '8 anos terrestres.' },
      { id: 'D', texto: '16 anos terrestres.' },
      { id: 'E', texto: '64 anos terrestres.' },
    ],
    respostaCorreta: 'C',
    explicacaoDetalhada: {
      resumo: 'T² = a³ => T² = 4³ = 64 => T = √64 = 8 anos terrestres.',
      porQueCorreta: 'Aplicando T² = a³ com a = 4 UA: T² = 4*4*4 = 64 => T = 8 anos.',
      analiseDistratores: {
        A: 'Incorreta: Cálculo errôneo.',
        B: 'Incorreta: Suposição linear falsa.',
        C: 'Correta: T = √64 = 8 anos terrestres.',
        D: 'Incorreta: Erro ao calcular 4².',
        E: 'Incorreta: 64 é T², faltou extrair a raiz.',
      },
      dicaPedagogica: 'T² proporcional a a³ é item garantido na OBA Nível 4.',
      conceitoChave: 'Terceira Lei de Kepler',
    },
  },
  {
    id: 'fuvest-lit-hist',
    numeroExibicao: 6,
    exame: 'FUVEST',
    nivel: 'Médio',
    anoFase: '1ª Fase Geral - Vestibular USP',
    cadernoInfo: 'Fundação Universitária para o Vestibular • 1ª Fase Conhecimentos Gerais',
    materia: 'Literatura e História do Brasil',
    disciplinaGeral: 'Linguagens e Códigos',
    habilidade: 'Interdisciplinar • Modernismo e Identidade Nacional',
    textoMotivador: `“Só a antropofagia nos une. Socialmente. Economicamente. Filosoficamente. Tupi, or not tupi that is the question.”`,
    referenciaTexto: 'ANDRADE, Oswald de. Manifesto Antropófago, 1928.',
    temGrafico: false,
    enunciado: 'No contexto cultural brasileiro da década de 1920, a metáfora da "Antropofagia" formulada por Oswald de Andrade propunha:',
    opcoes: [
      { id: 'A', texto: 'a rejeição xenófoba absoluta a qualquer influência ou pensamento de origem europeia.' },
      { id: 'B', texto: 'a assimilação crítica e seletiva da cultura estrangeira para degluti-la e refundi-la em uma identidade artística autenticamente brasileira.' },
      { id: 'C', texto: 'o retorno purista e incondicional às práticas e línguas dos povos originários pré-cabralinos.' },
      { id: 'D', texto: 'a submissão da arte nacional aos cânones clássicos do Parnasianismo e da Academia Brasileira de Letras.' },
      { id: 'E', texto: 'a defesa do integralismo autoritário e da aliança subordinada com as vanguardas políticas europeias.' },
    ],
    respostaCorreta: 'B',
    explicacaoDetalhada: {
      resumo: 'Antropofagia modernista = devoração crítica da cultura externa para criar arte autônoma e moderna.',
      porQueCorreta: 'Deglutição cultural de influências externas para recriá-las com autenticidade, humor e brasilidade.',
      analiseDistratores: {
        A: 'Incorreta: Oswald não era xenófobo.',
        B: 'Correta: Assimilação crítica e renovação da linguagem estética.',
        C: 'Incorreta: Não propunha retrocesso anacrônico.',
        D: 'Incorreta: O modernismo combateu o formalismo parnasiano.',
        E: 'Incorreta: O modernismo de Oswald era vanguardista e libertário.',
      },
      dicaPedagogica: 'A Semana de 22 rompeu com a linguagem parnasiana e abriu portas para o modernismo.',
      conceitoChave: 'Modernismo Brasileiro e Antropofagia',
    },
  },
  {
    id: 'saeb-3em-mat',
    numeroExibicao: 1,
    exame: 'SAEB',
    nivel: 'Médio',
    anoFase: '3º Ano E.M. - Matriz Inep',
    cadernoInfo: 'Sistema de Avaliação da Educação Básica • Bloco 1 Matemática',
    materia: 'Funções e Álgebra',
    disciplinaGeral: 'Matemática',
    habilidade: 'Descritor D20 • Resolver problema com modelo de função exponencial',
    textoMotivador: `O número de pessoas informadas sobre uma campanha de saúde cresce segundo N(t) = 500 · 2^(0,5 · t), com t em dias.`,
    referenciaTexto: 'Banco de Itens Inep / SAEB Ensino Médio.',
    temGrafico: false,
    enunciado: 'Após quantos dias o total de informados atingirá exatamente 8.000 pessoas?',
    opcoes: [
      { id: 'A', texto: '4 dias.' },
      { id: 'B', texto: '6 dias.' },
      { id: 'C', texto: '8 dias.' },
      { id: 'D', texto: '10 dias.' },
      { id: 'E', texto: '16 dias.' },
    ],
    respostaCorreta: 'C',
    explicacaoDetalhada: {
      resumo: '500 * 2^(0,5*t) = 8.000 => 2^(0,5*t) = 16 = 2^4 => 0,5*t = 4 => t = 8 dias.',
      porQueCorreta: '500 · 2^(0,5t) = 8000 => 2^(0,5t) = 16 = 2^4 => 0,5t = 4 => t = 8 dias.',
      analiseDistratores: {
        A: 'Incorreta: 500 * 4 = 2.000.',
        B: 'Incorreta: 500 * 8 = 4.000.',
        C: 'Correta: N(8) = 500 * 16 = 8.000.',
        D: 'Incorreta: 500 * 32 = 16.000.',
        E: 'Incorreta: Erro ao não dividir por 0,5.',
      },
      dicaPedagogica: 'No SAEB, equações exponenciais que reduzem a bases 2, 3 ou 5 são comuns.',
      conceitoChave: 'Equação Exponencial',
    },
  },
  {
    id: 'paulista-ciencias-cidadania',
    numeroExibicao: 7,
    exame: 'Prova Paulista',
    nivel: 'Médio',
    anoFase: 'Ensino Médio - SEDUC-SP',
    cadernoInfo: 'Prova Paulista • Currículo em Ação',
    materia: 'Química Ambiental e Saneamento',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Currículo Paulista • Tratamento de Água e Coloides',
    textoMotivador: `Nas Estações de Tratamento de Água (ETA), a água bruta passa por sucessivas etapas físico-químicas: coagulação, floculação, decantação, filtração e desinfecção.`,
    referenciaTexto: 'Manual Técnico de Saneamento Básico - SEDUC-SP.',
    temGrafico: false,
    enunciado: 'A etapa da FLOCULAÇÃO tem como objetivo físico-químico imediato:',
    opcoes: [
      { id: 'A', texto: 'eliminar micro-organismos patogênicos por meio de oxidação química.' },
      { id: 'B', texto: 'promover a colisão e união das partículas coloidais para formar aglomerados maiores e mais densos.' },
      { id: 'C', texto: 'prevenir o aparecimento de cáries dentárias na população consumidora.' },
      { id: 'D', texto: 'reter partículas microscópicas em leitos porosos de areia e carvão antracito.' },
      { id: 'E', texto: 'neutralizar substâncias ácidas através de hidróxido de sódio concentrado.' },
    ],
    respostaCorreta: 'B',
    explicacaoDetalhada: {
      resumo: 'Floculação consiste na agitação suave para reunir partículas em flocos pesados decantáveis.',
      porQueCorreta: 'A agitação lenta faz com que as partículas neutralizadas colidam e formem flocos densos que afundam na decantação.',
      analiseDistratores: {
        A: 'Incorreta: Desinfecção é feita pelo cloro.',
        B: 'Correta: Aglutinação de coloides em flocos densos.',
        C: 'Incorreta: Função da fluoretação final.',
        D: 'Incorreta: Função da filtração física.',
        E: 'Incorreta: Função da correção de pH.',
      },
      dicaPedagogica: 'Coagulação -> Floculação -> Decantação -> Filtração -> Desinfecção/Fluoretação.',
      conceitoChave: 'Etapas do Tratamento de Água',
    },
  },
  {
    id: 'enem-mat-geometria',
    numeroExibicao: 18,
    exame: 'ENEM',
    nivel: 'Médio',
    anoFase: '2º Dia - Matemática',
    cadernoInfo: 'Exame Nacional do Ensino Médio • Caderno 7 Azul',
    materia: 'Geometria Espacial',
    disciplinaGeral: 'Matemática',
    habilidade: 'Habilidade H08 • Resolução de problemas de capacidade volumétrica de sólidos',
    textoMotivador: `Um produtor rural precisa estocar água de chuva em um reservatório cilíndrico reto com raio da base igual a 2 metros e altura de 3 metros. Adote a aproximação π = 3.`,
    referenciaTexto: 'Manual de Irrigação Familiar, Embrapa.',
    temGrafico: false,
    enunciado: 'Se 1 m³ equivale a 1.000 litros de água, a capacidade total máxima desse reservatório é de:',
    opcoes: [
      { id: 'A', texto: '12.000 litros.' },
      { id: 'B', texto: '18.000 litros.' },
      { id: 'C', texto: '24.000 litros.' },
      { id: 'D', texto: '36.000 litros.' },
      { id: 'E', texto: '48.000 litros.' },
    ],
    respostaCorreta: 'D',
    explicacaoDetalhada: {
      resumo: 'V = π · r² · h = 3 · (2)² · 3 = 36 m³ = 36.000 Litros.',
      porQueCorreta: 'V = 3 · 4 · 3 = 36 m³ = 36.000 L.',
      analiseDistratores: {
        A: 'Incorreta: Erro ao não elevar raio ao quadrado.',
        B: 'Incorreta: Erro aritmético intermediário.',
        C: 'Incorreta: Valor subestimado.',
        D: 'Correta: 36 m³ = 36.000 litros.',
        E: 'Incorreta: Erro utilizando o diâmetro.',
      },
      dicaPedagogica: '1 m³ = 1.000 L é conversão mandatória no ENEM.',
      conceitoChave: 'Volume de Cilindros e Litros',
    },
  },
];

// 2. Comprehensive Question Pool per area to compose full-length booklets (45 questions for ENEM, 26 for SAEB, etc.)
interface QuestionBlueprint {
  materia: string;
  disciplinaGeral: 'Matemática' | 'Ciências da Natureza' | 'Linguagens e Códigos' | 'Ciências Humanas' | 'Astronomia';
  habilidade: string;
  textoMotivador?: string;
  referenciaTexto?: string;
  enunciado: string;
  opcoes: Alternativa[];
  respostaCorreta: 'A' | 'B' | 'C' | 'D' | 'E';
  resumo: string;
  porQueCorreta: string;
}

const BLUEPRINTS_BANCO: QuestionBlueprint[] = [
  {
    materia: 'História do Brasil',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H11 • Movimentos Sociais e Cidadania',
    textoMotivador: '“A Revolta da Vacina (1904) expressou o descontentamento popular não apenas com a obrigatoriedade da imunização sanitária contra a varíola, mas com as reformas urbanas de Pereira Passos que demoliram cortiços centrais sem oferecer alternativa habitacional.”',
    referenciaTexto: 'CARVALHO, José Murilo de. Os Bestializados: o Rio de Janeiro e a República que não foi.',
    enunciado: 'O estopim da Revolta da Vacina evidencia que o protesto popular carioca esteve articulado à:',
    opcoes: [
      { id: 'A', texto: 'rejeição ao saneamento público e apoio irrestrito aos militares monarquistas.' },
      { id: 'B', texto: 'insatisfação popular com a higienização excludente e a demolição de moradias nas reformas urbanas.' },
      { id: 'C', texto: 'demanda por retorno do regime imperial de Dom Pedro II.' },
      { id: 'D', texto: 'aliança entre os operários da indústria pesada e os coronéis paulistas do café.' },
      { id: 'E', texto: 'adesão incondicional aos ideais anarquistas europeus trazidos pela imigração recente.' },
    ],
    respostaCorreta: 'B',
    resumo: 'A Revolta da Vacina refletiu a insatisfação com as desapropriações e a expulsão dos pobres do centro carioca.',
    porQueCorreta: 'O protesto decorreu da opressão das reformas higienistas e autoritárias ("Bota-abaixo") e da falta de diálogo com a população vulnerável.',
  },
  {
    materia: 'Filosofia e Ética',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H23 • Filosofia Política e Contratualismo',
    textoMotivador: '“O homem nasce livre, e por toda parte encontra-se a ferros. O que se crê senhor dos demais não deixa de ser mais escravo do que eles.”',
    referenciaTexto: 'ROUSSEAU, Jean-Jacques. Do Contrato Social, 1762.',
    enunciado: 'Para Jean-Jacques Rousseau, a legitimidade da ordem política fundamenta-se na:',
    opcoes: [
      { id: 'A', texto: 'vontade do monarca absolutista com autoridade divina originária.' },
      { id: 'B', texto: 'vontade geral expressa pelo pacto social que preserva a liberdade civil coletiva.' },
      { id: 'C', texto: 'imposição do poder bélico do soberano hobbesiano.' },
      { id: 'D', texto: 'defesa do livre mercado e da propriedade privada irrestrita de John Locke.' },
      { id: 'E', texto: 'tradição religiosa eclesiástica e submissão aos costumes feudais.' },
    ],
    respostaCorreta: 'B',
    resumo: 'Rousseau defende que a soberania emana do povo por meio da Vontade Geral.',
    porQueCorreta: 'No Contrato Social, os cidadãos alienam sua liberdade natural em favor da liberdade civil corporificada na vontade geral.',
  },
  {
    materia: 'Sociologia',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H16 • Trabalho e Sociedade',
    textoMotivador: '“A mecanização digital e a plataformização das relações de trabalho transformaram o perfil do emprego, ampliando o contingente de trabalhadores autônomos subordinados a algoritmos gestores.”',
    referenciaTexto: 'ANTUNES, Ricardo. O Privilégio da Servidão, 2018.',
    enunciado: 'O fenômeno conhecido como "uberização do trabalho" caracteriza-se prioritariamente pela:',
    opcoes: [
      { id: 'A', texto: 'garantia ampliada de direitos previdenciários e estabilidade empregatícia.' },
      { id: 'B', texto: 'transferência dos riscos e custos da atividade econômica para o trabalhador sem vínculos formais.' },
      { id: 'C', texto: 'redução drástica das jornadas semanais de trabalho para menos de 20 horas.' },
      { id: 'D', texto: 'estatização das plataformas de intermediação tecnológica de serviços.' },
      { id: 'E', texto: 'eliminação completa da concorrência entre os prestadores de serviço autônomos.' },
    ],
    respostaCorreta: 'B',
    resumo: 'A uberização transfere custos e riscos para o trabalhador sob o discurso de flexibilidade.',
    porQueCorreta: 'O trabalhador arca com combustíveis, manutenção, seguro e riscos de saúde sem proteção da CLT.',
  },
  {
    materia: 'Geografia Física e Clima',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H26 • Dinâmica da Atmosfera e Biomas',
    textoMotivador: '“O fenômeno dos Rios Voadores consiste em fluxos aéreos de vapor d’água alimentados pela evapotranspiração da Floresta Amazônica, que transportam umidade para as regiões Centro-Oeste, Sudeste e Sul do Brasil.”',
    referenciaTexto: 'NOBRE, Antonio Donato. O Futuro Climático da Amazônia, Relatório de Avaliação Científica.',
    enunciado: 'O desmatamento progressivo na Amazônia afeta a estabilidade hídrica do Centro-Sul brasileiro porque:',
    opcoes: [
      { id: 'A', texto: 'diminui a massa de vapor transferida pelos rios voadores, agravando períodos de seca e escassez.' },
      { id: 'B', texto: 'aumenta as precipitações torrenciais contínuas nas bacias do Rio Paraná.' },
      { id: 'C', texto: 'inverte a direção dos ventos alísios em direção ao Oceano Pacífico.' },
      { id: 'D', texto: 'bloqueia a atuação das frentes frias polares procedentes da Antártica.' },
      { id: 'E', texto: 'elimina a evaporação da bacia do Rio da Prata.' },
    ],
    respostaCorreta: 'A',
    resumo: 'A floresta bombeia vapor que irriga o Sudeste e Centro-Oeste; sua perda reduz as chuvas nessas regiões.',
    porQueCorreta: 'As árvores de grande porte liberam centenas de litros de vapor diariamente; sua redução diminui as chuvas no Sudeste.',
  },
  {
    materia: 'Língua Portuguesa - Variação Linguística',
    disciplinaGeral: 'Linguagens e Códigos',
    habilidade: 'Habilidade H24 • Reconhecer no texto variações da língua padrão e marcas dialetais',
    textoMotivador: '“Cumpadre, nóis vai vortá lá pras bandas do sertão antes da chuva muiá o roçado.”',
    referenciaTexto: 'Literatura de Cordel e Tradição Oral.',
    enunciado: 'Sob o ponto de vista da sociolinguística contemporânea, a fala registrada no texto deve ser compreendida como:',
    opcoes: [
      { id: 'A', texto: 'um erro grosseiro de concordância que denota incapacidade cognitiva dos falantes rurais.' },
      { id: 'B', texto: 'uma manifestação legítima da variedade regional e popular, dotada de gramática e coerência comunicativa.' },
      { id: 'C', texto: 'uma degeneração do idioma português motivada pelo isolamento geográfico do interior.' },
      { id: 'D', texto: 'uma linguagem arcaica que precisa ser compulsoriamente eliminada pelo sistema de ensino.' },
      { id: 'E', texto: 'um registro restrito aos meios digitais e gírias juvenis das grandes cidades.' },
    ],
    respostaCorreta: 'B',
    resumo: 'Variação linguística não é erro: reflete a riqueza sociocultural do português falado.',
    porQueCorreta: 'A linguística moderna compreende que as variedades regionais têm regras gramaticais internas e não constituem "erros".',
  },
  {
    materia: 'Literatura Brasileira',
    disciplinaGeral: 'Linguagens e Códigos',
    habilidade: 'Habilidade H15 • Realismo e Crítica Social',
    textoMotivador: '“Não tive filhos, não transmiti a nenhuma criatura o legado de nossa miséria.”',
    referenciaTexto: 'ASSIS, Machado de. Memórias Póstumas de Brás Cubas, 1881.',
    enunciado: 'A célebre frase final do narrador-defunto Brás Cubas sintetiza o tom machadiano marcado por:',
    opcoes: [
      { id: 'A', texto: 'otimismo romântico e crença na regeneração moral da sociedade burguesa.' },
      { id: 'B', texto: 'ironia corrosiva e desencanto niilista diante da hipocrisia e das futilidades humanas.' },
      { id: 'C', texto: 'idealização épica das conquistas republicanas do século XIX.' },
      { id: 'D', texto: 'religiosidade profunda e busca de redenção espiritual após a morte.' },
      { id: 'E', texto: 'valorização ufanista das belezas naturais e dos povos do Brasil.' },
    ],
    respostaCorreta: 'B',
    resumo: 'Machado desconstrói as ilusões românticas com ironia, pessimismo lúcido e desfaçatez da elite carioca.',
    porQueCorreta: 'Brás Cubas é o anti-herói cínico da elite senhorial que festeja o fato de não ter reproduzido o ciclo da miséria existencial.',
  },
  {
    materia: 'Física - Eletrodinâmica',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H06 • Circuitos Elétricos e Consumo de Energia',
    textoMotivador: 'Um chuveiro elétrico opera com potência nominal de 5.500 W em uma rede de 220 V. Uma família de 4 pessoas utiliza o chuveiro diariamente por 15 minutos cada.',
    referenciaTexto: 'Caderno de Eficiência Energética Residencial, Procel.',
    enunciado: 'Se o quilowatt-hora (kWh) de energia elétrica custa R$ 0,80, o gasto mensal (30 dias) desse chuveiro na fatura é de aproximadamente:',
    opcoes: [
      { id: 'A', texto: 'R$ 44,00.' },
      { id: 'B', texto: 'R$ 88,00.' },
      { id: 'C', texto: 'R$ 132,00.' },
      { id: 'D', texto: 'R$ 176,00.' },
      { id: 'E', texto: 'R$ 220,00.' },
    ],
    respostaCorreta: 'C',
    resumo: 'E = P * t = 5,5 kW * 1 h/dia * 30 dias = 165 kWh. Custo = 165 * 0,80 = R$ 132,00.',
    porQueCorreta: 'Tempo total diário = 4 * 15 min = 60 min = 1 hora/dia. Energia mensal = 5,5 kW * 1 h * 30 = 165 kWh. Custo = 165 * 0,80 = R$ 132,00.',
  },
  {
    materia: 'Química - Estequiometria',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H17 • Transformações Químicas e Proporções de Massa',
    textoMotivador: 'A combustão completa do gás metano (CH4 + 2 O2 -> CO2 + 2 H2O) é amplamente empregada na geração de calor em fogões e termoelétricas. (Massas molares: C=12, H=1, O=16 g/mol).',
    referenciaTexto: 'Química Geral e Ambiental Contemporânea.',
    enunciado: 'A queima completa de 32 gramas de metano (CH4) produzirá qual massa de gás carbônico (CO2)?',
    opcoes: [
      { id: 'A', texto: '44 gramas.' },
      { id: 'B', texto: '64 gramas.' },
      { id: 'C', texto: '88 gramas.' },
      { id: 'D', texto: '132 gramas.' },
      { id: 'E', texto: '176 gramas.' },
    ],
    respostaCorreta: 'C',
    resumo: '1 mol de CH4 (16 g) produz 1 mol de CO2 (44 g). Logo, 32 g de CH4 (2 mols) produzem 2 * 44 = 88 g de CO2.',
    porQueCorreta: 'Massa molar do CH4 = 16 g/mol. 32 g correspondem a 2 mols. Pela equação equilibrada 1:1, formam-se 2 mols de CO2 = 2 * 44 = 88 gramas.',
  },
  {
    materia: 'Biologia - Genética',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H14 • Hereditariedade e Probabilidade Genética',
    textoMotivador: 'O albinismo oculocutâneo é uma condição genética autossômica recessiva (alelo a). Indivíduos com genótipo AA ou Aa apresentam pigmentação normal de melanina, enquanto aa são albinos.',
    referenciaTexto: 'Genética Médica e Biologia Molecular.',
    enunciado: 'Se um casal com fenótipo de pigmentação normal, porém ambos heterozigotos (Aa), planeja ter um filho, a probabilidade de a criança ser albina é de:',
    opcoes: [
      { id: 'A', texto: '0% (nenhuma chance).' },
      { id: 'B', texto: '25% (1 em 4).' },
      { id: 'C', texto: '50% (1 em 2).' },
      { id: 'D', texto: '75% (3 em 4).' },
      { id: 'E', texto: '100% (todas as crianças).' },
    ],
    respostaCorreta: 'B',
    resumo: 'Cruzamento Aa x Aa gera proporção fenotípica 3 normais : 1 albino (25% aa).',
    porQueCorreta: 'Aa x Aa resulta nos genótipos: 1/4 AA, 2/4 Aa (pigmentação normal) e 1/4 aa (albino) = 25%.',
  },
  {
    materia: 'Matemática - Probabilidade',
    disciplinaGeral: 'Matemática',
    habilidade: 'Habilidade H28 • Análise Combinatória e Cálculo de Probabilidades',
    textoMotivador: 'Em uma urna de sorteio de um vestibular beneficente há 50 bolinhas idênticas numeradas de 1 a 50.',
    referenciaTexto: 'Matemática Financeira e Estatística Aplicada.',
    enunciado: 'Retirando-se ao acaso uma única bolinha, qual é a probabilidade de o número sorteado ser um múltiplo de 5?',
    opcoes: [
      { id: 'A', texto: '10% (1/10).' },
      { id: 'B', texto: '15% (3/20).' },
      { id: 'C', texto: '20% (1/5).' },
      { id: 'D', texto: '25% (1/4).' },
      { id: 'E', texto: '30% (3/10).' },
    ],
    respostaCorreta: 'C',
    resumo: 'Múltiplos de 5 entre 1 e 50: 5, 10, 15, ..., 50 (10 bolinhas). P = 10 / 50 = 1/5 = 20%.',
    porQueCorreta: 'Há exatamente 10 múltiplos de 5 em 50 elementos. P = 10/50 = 0,20 = 20%.',
  },
  {
    materia: 'Matemática - Estatística',
    disciplinaGeral: 'Matemática',
    habilidade: 'Habilidade H27 • Leitura de Gráficos e Cálculo de Medidas de Tendência Central',
    textoMotivador: 'As notas de um estudante nas 5 avaliações do primeiro bimestre foram: 6,0; 7,0; 7,0; 8,5 e 9,0.',
    referenciaTexto: 'Boletim Escolar de Acompanhamento Diagnóstico.',
    enunciado: 'A mediana e a moda dessa distribuição de notas são, respectivamente:',
    opcoes: [
      { id: 'A', texto: '7,0 e 7,0.' },
      { id: 'B', texto: '7,5 e 7,0.' },
      { id: 'C', texto: '7,5 e 8,5.' },
      { id: 'D', texto: '7,0 e 7,5.' },
      { id: 'E', texto: '8,0 e 7,0.' },
    ],
    respostaCorreta: 'A',
    resumo: 'O rol já está ordenado: [6,0; 7,0; 7,0; 8,5; 9,0]. O elemento central (mediana) é 7,0 e o mais frequente (moda) é 7,0.',
    porQueCorreta: 'Com 5 valores ordenados, o 3º valor é a mediana = 7,0. A nota 7,0 se repete duas vezes, sendo a moda.',
  },
  {
    materia: 'História Geral - Revolução Industrial',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H03 • Relações de Produção e Urbanização Fabril',
    textoMotivador: '“Nas fábricas inglesas do século XIX, homens, mulheres e crianças trabalhavam até 16 horas diárias em ambientes insalubres, sob a rígida disciplina do relógio fabril.”',
    referenciaTexto: 'THOMPSON, E. P. A Formação da Classe Operária Inglesa.',
    enunciado: 'A emergência da sociedade industrial inglesa no século XIX resultou na constituição de um novo contingente social denominado:',
    opcoes: [
      { id: 'A', texto: 'nobreza cortesã absolutista.' },
      { id: 'B', texto: 'proletariado fabril urbano assalariado.' },
      { id: 'C', texto: 'servidão da gleba feudal com base agrária.' },
      { id: 'D', texto: 'artesanato corporativo de ofício sem subordinação.' },
      { id: 'E', texto: 'latifundiários de monocultura exportadora.' },
    ],
    respostaCorreta: 'B',
    resumo: 'A separação entre os meios de produção e o trabalho originou o proletariado moderno.',
    porQueCorreta: 'O trabalhador fabril vende sua força de trabalho em troca de salário, formando o proletariado fabril.',
  },
  {
    materia: 'Geografia - Agropecuária Brasileira',
    disciplinaGeral: 'Ciências Humanas',
    habilidade: 'Habilidade H19 • Estrutura Fundiária e Fronteira Agrícola',
    textoMotivador: '“A expansão da fronteira agrícola no Cerrado e na região do Matopiba (Maranhão, Tocantins, Piauí e Bahia) transformou o Brasil em um dos maiores produtores globais de soja e milho, mas gerou desafios para a conservação da biodiversidade e recursos hídricos.”',
    referenciaTexto: 'IBGE / Censo Agropecuário.',
    enunciado: 'O modelo de agronegócio predominante no bioma Cerrado caracteriza-se por:',
    opcoes: [
      { id: 'A', texto: 'pequenas propriedades policultoras de subsistência comunitária.' },
      { id: 'B', texto: 'grandes propriedades mecanizadas, alto uso de defensivos e foco na exportação de commodities.' },
      { id: 'C', texto: 'pecuária extensiva rudimentar sem correção de acidez do solo.' },
      { id: 'D', texto: 'extrativismo vegetal tradicional não mecanizado praticado por ribeirinhos.' },
      { id: 'E', texto: 'monocultura de trigo com irrigação por alagamento contínuo.' },
    ],
    respostaCorreta: 'B',
    resumo: 'Agronegócio no Cerrado: latifúndios altamente tecnológicos voltados para exportação global.',
    porQueCorreta: 'Grandes áreas mecanizadas que utilizam calagem para corrigir a acidez do solo e biotecnologia de ponta.',
  },
  {
    materia: 'Língua Portuguesa - Figuras de Linguagem',
    disciplinaGeral: 'Linguagens e Códigos',
    habilidade: 'Habilidade H17 • Recursos Expressivos e Figuras de Estilo',
    textoMotivador: '“O tempo é um rio que corre sem nunca parar nas margens do passado.”',
    referenciaTexto: 'Antologia Poética Moderna.',
    enunciado: 'Na oração em destaque, o recurso estilístico predominante é a:',
    opcoes: [
      { id: 'A', texto: 'metáfora, ao estabelecer uma analogia implícita e direta entre o tempo e o rio.' },
      { id: 'B', texto: 'metonímia, ao substituir a causa pelo efeito imediato.' },
      { id: 'C', texto: 'hipérbole, ao exagerar de forma cômica as dimensões fluviais.' },
      { id: 'D', texto: 'ironia, ao sugerir o oposto daquilo que as palavras expressam.' },
      { id: 'E', texto: 'pleonasmo vicioso, ao repetir termos idênticos sem propósito poético.' },
    ],
    respostaCorreta: 'A',
    resumo: 'Metáfora é a comparação implícita ("o tempo é um rio") sem conectivo comparativo ("como").',
    porQueCorreta: 'Atribui-se ao tempo as características de fluxo contínuo do rio sem uso de conectivos comparativos explícitos.',
  },
  {
    materia: 'Física - Ondulatória',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H01 • Fenômenos Ondulatórios e Aplicações Tecnológicas',
    textoMotivador: 'Uma emissora de rádio comunitária em FM opera na frequência f = 100 MHz (100 * 10^6 Hz). Sabendo que a velocidade da luz no ar é v = 3,0 * 10^8 m/s, determine o comprimento da onda eletromagnética emitida.',
    referenciaTexto: 'Fundamentos de Telecomunicações e Propagação Eletromagnética.',
    enunciado: 'O comprimento de onda (λ) transmitido pela antena da emissora é igual a:',
    opcoes: [
      { id: 'A', texto: '0,33 metro.' },
      { id: 'B', texto: '3,0 metros.' },
      { id: 'C', texto: '30 metros.' },
      { id: 'D', texto: '300 metros.' },
      { id: 'E', texto: '3.000 metros.' },
    ],
    respostaCorreta: 'B',
    resumo: 'v = λ * f => λ = v / f = (3,0 * 10^8) / (1,0 * 10^8) = 3,0 metros.',
    porQueCorreta: 'Aplicando a equação fundamental da ondulatória v = λ * f: λ = (3,0 * 10^8 m/s) / (100 * 10^6 Hz) = 3,0 m.',
  },
  {
    materia: 'Química - Soluções e Concentração',
    disciplinaGeral: 'Ciências da Natureza',
    habilidade: 'Habilidade H20 • Cálculos de Concentração e Diluição',
    textoMotivador: 'Um técnico de laboratório necessita preparar 500 mL de uma solução aquosa de soro glicosado a 5% em massa/volume (50 g de glicose por litro de solução).',
    referenciaTexto: 'Farmacotécnica e Práticas Hospitalares.',
    enunciado: 'Qual a massa de glicose que deverá ser pesada para o preparo desse volume de 500 mL?',
    opcoes: [
      { id: 'A', texto: '5 gramas.' },
      { id: 'B', texto: '12,5 gramas.' },
      { id: 'C', texto: '25 gramas.' },
      { id: 'D', texto: '50 gramas.' },
      { id: 'E', texto: '100 gramas.' },
    ],
    respostaCorreta: 'C',
    resumo: '50 g em 1.000 mL => Em 500 mL necessita-se da metade: 25 g de glicose.',
    porQueCorreta: 'Se em 1 L (1.000 mL) há 50 g, em 500 mL (0,5 L) há m = 50 g/L * 0,5 L = 25 gramas.',
  },
  {
    materia: 'Matemática - Razão e Proporção',
    disciplinaGeral: 'Matemática',
    habilidade: 'Habilidade H10 • Escalas Cartográficas e Proporcionalidade',
    textoMotivador: 'Em um mapa geográfico escolar desenhado na escala 1:250.000, a distância em linha reta entre duas escolas municipais mede exatamente 4 cm.',
    referenciaTexto: 'Cartografia Básica e Orientação Espacial.',
    enunciado: 'A distância real correspondente no terreno entre as duas escolas é de:',
    opcoes: [
      { id: 'A', texto: '1 km.' },
      { id: 'B', texto: '10 km.' },
      { id: 'C', texto: '25 km.' },
      { id: 'D', texto: '100 km.' },
      { id: 'E', texto: '1.000 km.' },
    ],
    respostaCorreta: 'B',
    resumo: 'Distância real = 4 cm * 250.000 = 1.000.000 cm = 10.000 m = 10 km.',
    porQueCorreta: 'D = 4 * 250.000 = 1.000.000 cm. Convertendo: 100 cm = 1 m (10.000 m) e 1.000 m = 1 km => 10 km.',
  },
];

// Helper to generate a full exam array with EXACT target count
export function getQuestoesParaExame(exameId: string): Questao[] {
  // 1. Identify target question count and theme
  let targetCount = 45;
  let exameTipo: 'ENEM' | 'SAEB' | 'Prova Paulista' | 'OBA' | 'FUVEST' | 'UNICAMP' | 'UERJ' = 'ENEM';
  let anoFase = 'Edição Oficial 2024';
  let cadernoInfo = 'Caderno 1 Azul • Oficial';

  if (exameId === 'enem-2024-dia1') {
    targetCount = 45; // Match Image 3 ("Questão 14 de 45")
    exameTipo = 'ENEM';
    cadernoInfo = 'Exame Nacional do Ensino Médio • Caderno 1 Azul';
  } else if (exameId === 'saeb-3em') {
    targetCount = 26;
    exameTipo = 'SAEB';
    cadernoInfo = 'Sistema de Avaliação da Educação Básica • 3º Ano E.M.';
  } else if (exameId === 'saeb-9ef') {
    targetCount = 26;
    exameTipo = 'SAEB';
    cadernoInfo = 'Sistema de Avaliação da Educação Básica • 9º Ano E.F.';
  } else if (exameId === 'fuvest-2025') {
    targetCount = 30;
    exameTipo = 'FUVEST';
    cadernoInfo = 'Fundação Universitária para o Vestibular • 1ª Fase Geral';
  } else if (exameId === 'oba-olimpiada') {
    targetCount = 10;
    exameTipo = 'OBA';
    cadernoInfo = 'Olimpíada Brasileira de Astronomia e Astronáutica • Prova Oficial';
  } else if (exameId === 'prova-paulista-diagnostica') {
    targetCount = 20;
    exameTipo = 'Prova Paulista';
    cadernoInfo = 'Prova Paulista • SEDUC-SP';
  } else if (exameId === 'vestibulares-regionais') {
    targetCount = 20;
    exameTipo = 'UERJ';
    cadernoInfo = 'Vestibulares Regionais Qualificação';
  } else if (exameId.includes('rapido') || exameId.includes('15')) {
    targetCount = 15;
    cadernoInfo = 'Simulado Rápido Diário • Treino Focado';
  }

  const resultList: Questao[] = [];

  // Seed with our curated questions matching the exam theme first
  const curatedMatches = QUESTOES_CURADAS.filter((q) => {
    if (exameId === 'oba-olimpiada') return q.exame === 'OBA';
    if (exameId.includes('saeb')) return q.exame === 'SAEB' || q.nivel === 'Fundamental';
    if (exameId === 'fuvest-2025') return q.exame === 'FUVEST' || q.disciplinaGeral === 'Linguagens e Códigos';
    return true;
  });

  // Specifically ensure question 14 for ENEM 1º Dia is the Milton Santos / Urbanização item as seen in screenshot!
  for (let i = 1; i <= targetCount; i++) {
    const qid = `${exameId}-q${i}`;

    if (exameId === 'enem-2024-dia1' && i === 14) {
      // The exact question from Image 3
      const q14 = QUESTOES_CURADAS.find((q) => q.id === 'enem-geo-14')!;
      resultList.push({
        ...q14,
        id: qid,
        numeroExibicao: 14,
      });
      continue;
    }

    // Pick from curated or blueprints
    const templateIndex = (i - 1) % BLUEPRINTS_BANCO.length;
    const bp = BLUEPRINTS_BANCO[templateIndex];
    const isCuratedAvailable = curatedMatches[i % curatedMatches.length];

    if (isCuratedAvailable && i <= 8 && i !== 14) {
      resultList.push({
        ...isCuratedAvailable,
        id: qid,
        numeroExibicao: i,
        exame: exameTipo,
        cadernoInfo,
      });
    } else {
      resultList.push({
        id: qid,
        numeroExibicao: i,
        exame: exameTipo,
        nivel: exameId.includes('9ef') ? 'Fundamental' : 'Médio',
        anoFase,
        cadernoInfo,
        materia: bp.materia,
        disciplinaGeral: bp.disciplinaGeral,
        habilidade: bp.habilidade,
        textoMotivador: bp.textoMotivador,
        referenciaTexto: bp.referenciaTexto,
        temGrafico: false,
        enunciado: bp.enunciado,
        opcoes: bp.opcoes,
        respostaCorreta: bp.respostaCorreta,
        explicacaoDetalhada: {
          resumo: bp.resumo,
          porQueCorreta: bp.porQueCorreta,
          analiseDistratores: {
            A: bp.respostaCorreta === 'A' ? 'Correta: Responde plenamente ao comando da questão.' : 'Incorreta para este enunciado.',
            B: bp.respostaCorreta === 'B' ? 'Correta: Fundamentada nos princípios conceituais da disciplina.' : 'Incorreta para este enunciado.',
            C: bp.respostaCorreta === 'C' ? 'Correta: Atende aos critérios exigidos pela matriz de referência.' : 'Incorreta para este enunciado.',
            D: bp.respostaCorreta === 'D' ? 'Correta: Dedução lógica direta dos fatos analisados.' : 'Incorreta para este enunciado.',
            E: bp.respostaCorreta === 'E' ? 'Correta: Afirmativa coerente com as evidências do texto.' : 'Incorreta para este enunciado.',
          },
          dicaPedagogica: `Item típico de calibragem intermediária para ${exameTipo}.`,
          conceitoChave: bp.materia,
        },
      });
    }
  }

  return resultList;
}

export const QUESTOES_MOCK: Questao[] = QUESTOES_CURADAS;
