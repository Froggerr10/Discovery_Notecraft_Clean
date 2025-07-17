// lib/questions.ts - DISCOVERY NOTECRAFT™ - ARQUIVO CONSOLIDADO COMPLETO
// Inteligência Consultiva IA-Aware - Questionário Estratégico

// ========================================
// INTERFACES E TIPOS
// ========================================

export interface SectionMetadata {
  id: number;
  title: string;
  suggested_role: string;
  department: string;
  priority: 'CRÍTICA' | 'ALTA' | 'MÉDIA' | 'BAIXA';
  value_proposition: string;
  expected_outcome: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'slider' | 'text' | 'textarea' | 'slider_percentage' | 'ranking';
  options?: string[];
  required: boolean;
  has_observations: boolean;
  section_id: number;
  placeholder?: string;
}

export interface QuestionResponse {
  question_id: number;
  response: string | string[] | number | Record<string, number>;
  observations?: string;
  ai_aware_notes?: string;
}

export interface DiscoverySession {
  id: string;
  company_name: string;
  respondent_name: string;
  respondent_email: string;
  started_at: string;
  completed_at?: string;
  current_section: number;
  responses: QuestionResponse[];
  metadata: {
    ip_address?: string;
    user_agent?: string;
    completion_percentage: number;
  };
}

// ========================================
// METADADOS DAS SEÇÕES
// ========================================

export const SECTION_RESPONSIBILITIES: SectionMetadata[] = [
  {
    id: 1, 
    title: "💰 Mapeamento de ROI por Serviço", 
    suggested_role: "Diretoria/Sócios", 
    department: "Estratégico", 
    priority: "CRÍTICA",
    value_proposition: "Identifica onde IA gera maior retorno financeiro",
    expected_outcome: "ROI 300% em 6 meses nos serviços priorizados"
  },
  {
    id: 2, 
    title: "📚 Auditoria de Assets Intelectuais", 
    suggested_role: "Diretor Técnico/CTO", 
    department: "Tecnologia/Processos", 
    priority: "ALTA",
    value_proposition: "Transforma conhecimento disperso em vantagem competitiva",
    expected_outcome: "Base de conhecimento 90% mais acessível e utilizável"
  },
  {
    id: 3, 
    title: "🤖 Diagnóstico de Maturidade IA", 
    suggested_role: "Diretoria + Gerente Técnico", 
    department: "Estratégico/Tecnologia", 
    priority: "CRÍTICA",
    value_proposition: "Avalia prontidão para automação inteligente",
    expected_outcome: "Roadmap de IA com ganhos de 40% em produtividade"
  },
  {
    id: 4, 
    title: "💎 Análise de Percepção de Valor", 
    suggested_role: "Diretoria/Sócios", 
    department: "Estratégico", 
    priority: "ALTA",
    value_proposition: "Otimiza precificação e posicionamento de mercado",
    expected_outcome: "Aumento de 25% no ticket médio por cliente"
  },
  {
    id: 5, 
    title: "🚀 Projeção de Crescimento Estratégico", 
    suggested_role: "Diretor Comercial", 
    department: "Comercial/Estratégico", 
    priority: "ALTA",
    value_proposition: "Planeja crescimento acelerado com IA",
    expected_outcome: "Crescimento 200% mais rápido que concorrência"
  },
  {
    id: 6, 
    title: "⚙️ Diagnóstico de Infraestrutura Tech", 
    suggested_role: "Responsável TI/CTO", 
    department: "Tecnologia", 
    priority: "MÉDIA",
    value_proposition: "Elimina gargalos tecnológicos críticos",
    expected_outcome: "Redução de 60% em tempo perdido com sistemas"
  },
  {
    id: 7, 
    title: "👥 Mapeamento de Capital Humano", 
    suggested_role: "RH/Diretor Administrativo", 
    department: "Recursos Humanos", 
    priority: "MÉDIA",
    value_proposition: "Otimiza talentos para máxima produtividade",
    expected_outcome: "Time 50% mais produtivo com mesmo headcount"
  },
  {
    id: 8, 
    title: "📊 Intelligence de Performance", 
    suggested_role: "Gerente/Controller", 
    department: "Financeiro/Controladoria", 
    priority: "ALTA",
    value_proposition: "Cria dashboards preditivos de performance",
    expected_outcome: "Forecast 95% preciso e tomada de decisão em tempo real"
  },
  {
    id: 9, 
    title: "🎯 Engine de Aquisição de Clientes", 
    suggested_role: "Diretor Comercial", 
    department: "Comercial/Marketing", 
    priority: "ALTA",
    value_proposition: "Automatiza e otimiza todo o funil comercial",
    expected_outcome: "Pipeline 5x mais eficiente e CAC 70% menor"
  },
  {
    id: 10, 
    title: "⚖️ Sistema de Inteligência Jurídica", 
    suggested_role: "Coordenador Jurídico", 
    department: "Jurídico/Técnico", 
    priority: "MÉDIA",
    value_proposition: "Acelera pesquisas e aumenta precisão jurídica",
    expected_outcome: "80% menos tempo em pesquisa, 40% mais casos"
  },
  {
    id: 11, 
    title: "🔄 Índice de Transformação Digital", 
    suggested_role: "CTO/Responsável TI", 
    department: "Tecnologia", 
    priority: "MÉDIA",
    value_proposition: "Mede e acelera evolução tecnológica",
    expected_outcome: "Empresa 3 anos à frente da concorrência em tech"
  },
  {
    id: 12, 
    title: "🎙️ Sistema de Captura de Conhecimento", 
    suggested_role: "Gerente de Projetos", 
    department: "Operacional", 
    priority: "BAIXA",
    value_proposition: "Converte conversas em insights acionáveis",
    expected_outcome: "Zero conhecimento perdido, 100% insights capturados"
  },
  {
    id: 13, 
    title: "🛡️ Central de Suporte Inteligente", 
    suggested_role: "Gerente de Relacionamento", 
    department: "Atendimento/CS", 
    priority: "MÉDIA",
    value_proposition: "Antecipa problemas e otimiza satisfação",
    expected_outcome: "NPS +30 pontos e tempo de resposta 80% menor"
  },
  {
    id: 14, 
    title: "📡 Comunicação Preditiva ao Cliente", 
    suggested_role: "Customer Success", 
    department: "Relacionamento", 
    priority: "BAIXA",
    value_proposition: "Comunica valor antes do cliente perceber necessidade",
    expected_outcome: "Retenção 90% e expansão de conta 40% maior"
  },
  {
    id: 15, 
    title: "🌐 Estratégia de Escala e Plataforma", 
    suggested_role: "Diretoria/Sócios", 
    department: "Estratégico", 
    priority: "BAIXA",
    value_proposition: "Prepara negócio para crescimento exponencial",
    expected_outcome: "Escalabilidade 10x sem perda de qualidade"
  },
  {
    id: 16, 
    title: "⚡ Agentes Comerciais Autônomos", 
    suggested_role: "Diretor Comercial", 
    department: "Comercial", 
    priority: "CRÍTICA",
    value_proposition: "Automatiza 80% da prospecção e vendas",
    expected_outcome: "Pipeline funcionando 24/7 com conversão 3x maior"
  },
  {
    id: 17, 
    title: "🧠 Agentes IA Especializados", 
    suggested_role: "CTO/Diretor Técnico", 
    department: "Tecnologia", 
    priority: "BAIXA",
    value_proposition: "Cria assistentes IA para tarefas específicas",
    expected_outcome: "Produtividade técnica 5x maior em atividades especializadas"
  }
];

// ========================================
// QUESTIONÁRIO COMPLETO - 109 QUESTÕES
// ========================================

export const QUESTIONS: Question[] = [
  // SEÇÃO 1: Escolha e Priorização de Serviços (6 questões)
  {id: 1, section_id: 1, text: "Qual é a distribuição aproximada do volume de trabalho por serviço prestado?", type: "slider_percentage", options: ["Recuperação de Créditos Fiscais", "Planejamento Tributário", "Auditoria", "Assessoria Tributária", "Revisão Fiscal (Simples Nacional)", "Revisão Fiscal (Lucro Real/Presumido)", "Gestão de Ativos", "Gestão de Passivos", "Desembaraço Aduaneiro", "International Support", "Conciliação de Débitos", "Plano de Viabilidade Econômica"], required: true, has_observations: true},
  {id: 2, section_id: 1, text: "Qual o percentual aproximado de faturamento que cada serviço representa?", type: "slider_percentage", options: ["RCT", "Planejamento", "Auditoria", "Consultoria", "Outros"], required: true, has_observations: true},
  {id: 3, section_id: 1, text: "Em qual especialidade tributária vocês se consideram mais competitivos?", type: "radio", options: ["ICMS - diferencial específico", "PIS/COFINS - diferencial específico", "Imposto de Renda - diferencial específico", "ISS - diferencial específico", "Somos generalistas equilibrados", "Folha/trabalhista - diferencial específico"], required: true, has_observations: true},
  {id: 4, section_id: 1, text: "Quais serviços são mais padronizáveis (seguem roteiros similares)?", type: "checkbox", options: ["RCT - processos bem definidos", "Auditoria - checklists padrão", "Planejamento - metodologia estruturada", "Due Diligence - roteiro fixo", "Nenhum é padronizável", "Todos são muito customizados"], required: true, has_observations: true},
  {id: 5, section_id: 1, text: "Há serviços com maior risco jurídico/compliance?", type: "checkbox", options: ["Planejamento Tributário (Alto risco)", "Consultoria para Disputas (Alto risco)", "Auditoria (Médio risco)", "RCT (Baixo risco)", "Due Diligence (Médio risco)", "Não vejo diferença significativa"], required: true, has_observations: true},
  {id: 6, section_id: 1, text: "Qual serviço/especialidade vocês gostariam de expandir mais nos próximos 2 anos?", type: "radio", options: ["Recuperação de Créditos (aumentar volume)", "Planejamento (maior margem)", "ICMS especialização (nicho específico)", "PIS/COFINS (mercado aquecido)", "Consultoria Digital/IA (diferenciação)", "Não temos planos de expansão específica"], required: true, has_observations: true},
  
  // SEÇÃO 2: Base de Conhecimento Existente (8 questões)
  {id: 7, section_id: 2, text: "Onde está armazenada a base de conhecimento técnico da empresa?", type: "checkbox", options: ["Servidor local da empresa", "Nuvem (Google Drive, OneDrive, Dropbox)", "Sistema específico (SharePoint, Confluence)", "Arquivos físicos/papel", "Na experiência das pessoas (não documentado)", "Múltiplos locais dispersos"], required: true, has_observations: true},
  {id: 8, section_id: 2, text: "Que tipos de documentos vocês utilizam na base de conhecimento?", type: "checkbox", options: ["PDFs de legislação", "Documentos Word/DOCX", "Planilhas Excel", "Apresentações PowerPoint", "Jurisprudência/decisões", "Pareceres técnicos próprios"], required: true, has_observations: true},
  {id: 9, section_id: 2, text: "Quantos documentos aproximadamente existem na base?", type: "radio", options: ["Menos de 1.000 documentos", "1.000 a 10.000 documentos", "Mais de 10.000 documentos", "Não sei estimar"], required: true, has_observations: true},
  {id: 10, section_id: 2, text: "Existe sistema de organização/busca dos documentos?", type: "radio", options: ["Sim, sistema robusto de busca e indexação", "Organização básica por pastas temáticas", "Organização mínima, busca manual", "Sem organização sistemática", "Cada pessoa organiza do seu jeito"], required: true, has_observations: true},
  {id: 11, section_id: 2, text: "Há categorização por tributos, setores ou temas específicos?", type: "checkbox", options: ["Por tributo (ICMS, PIS/COFINS, IR, etc.)", "Por setor econômico (indústria, comércio, etc.)", "Por tipo de tese/estratégia", "Por região/estado", "Por complexidade do caso", "Não há categorização estruturada"], required: true, has_observations: true},
  {id: 12, section_id: 2, text: "Quem é responsável por manter e atualizar a base? Com que frequência?", type: "radio", options: ["Pessoa dedicada exclusivamente", "Equipe técnica contribui coletivamente", "Apenas os sócios/diretores", "Estagiário ou junior designado", "Não há responsável definido", "Cada um atualiza quando lembra"], required: true, has_observations: true},
  {id: 13, section_id: 2, text: "Existe controle de acesso (quem pode ver quais documentos)?", type: "radio", options: ["Sim, controle rigoroso por níveis/funções", "Controle básico (senior vs junior)", "Apenas sócios têm acesso a tudo", "Toda equipe acessa tudo", "Não há controle formal"], required: true, has_observations: true},
  {id: 14, section_id: 2, text: "Há orçamento dedicado para manutenção/atualização da base?", type: "radio", options: ["Sim, orçamento específico anual", "Orçamento caso a caso conforme necessidade", "Sem orçamento dedicado", "Não sei informar"], required: true, has_observations: true},

  // SEÇÃO 3: Visão de Automação e IA (8 questões)
  {id: 15, section_id: 3, text: "Existem processos tributários já automatizados na empresa?", type: "checkbox", options: ["Planilhas com macros/fórmulas avançadas", "Sistemas que fazem cálculos automaticamente", "Geração automática de relatórios", "Controle de prazos automatizado", "Integração automática entre sistemas", "Não temos nada automatizado"], required: true, has_observations: true},
  {id: 16, section_id: 3, text: "Alguém na empresa já testou ferramentas de IA?", type: "checkbox", options: ["ChatGPT para pesquisas/textos", "Google Gemini/Bard", "Claude (Anthropic)", "Ferramentas específicas para tributário", "IA para análise de documentos (PDF, OCR)", "Assistentes virtuais/chatbots", "Nunca testamos nada"], required: true, has_observations: true},
  {id: 17, section_id: 3, text: "Quais áreas vocês veem como candidatas naturais à automação?", type: "checkbox", options: ["Triagem inicial de documentos", "Cálculos tributários repetitivos", "Pesquisa em bases legais", "Geração de relatórios padrão", "Atendimento inicial de clientes", "Controle de prazos e alertas"], required: true, has_observations: true},
  {id: 18, section_id: 3, text: "Qual é o maior receio específico em relação ao uso de IA?", type: "radio", options: ["Erro técnico que cause prejuízo financeiro ao cliente", "Substituição/demissão de pessoas da equipe", "Custo muito alto de implementação", "Complexidade técnica para operar", "Vazamento de informações confidenciais", "Perda de controle sobre os processos", "Não temos receios significativos"], required: true, has_observations: true},
  {id: 19, section_id: 3, text: "Que ganhos vocês esperam da automação/IA?", type: "checkbox", options: ["Redução de tempo por caso", "Maior precisão/menos erros", "Aumento de escala/volume de casos", "Aumento do ROI por cliente", "Aumento do número de clientes", "Redução de custos operacionais", "Diferenciação competitiva", "Melhoria na experiência do cliente", "Aumento da margem de lucro"], required: true, has_observations: true},
  {id: 20, section_id: 3, text: "Como a equipe técnica reagiria à implementação de IA?", type: "radio", options: ["Muito receptiva, já pedem automação", "Receptiva, mas com algumas preocupações", "Neutra, dependeria da implementação", "Resistente, preferem métodos tradicionais", "Muito resistente, veem como ameaça", "Não sei como reagiriam"], required: true, has_observations: true},
  {id: 21, section_id: 3, text: "Quem seria o 'sponsor' interno de um projeto de IA?", type: "radio", options: ["Sócio/Diretor seria o champion do projeto", "Gerente técnico lideraria a iniciativa", "Seria decisão coletiva da diretoria", "Dependeria de contratação externa", "Ainda não identificamos essa pessoa", "Não sei responder"], required: true, has_observations: true},
  {id: 22, section_id: 3, text: "Qual seria o critério principal para aprovar investimento em IA?", type: "radio", options: ["ROI demonstrado em 6 meses", "ROI demonstrado em 12 meses", "Diferenciação competitiva (mesmo sem ROI imediato)", "Resolução de gargalo operacional crítico", "Pressão dos clientes por modernização", "Custo baixo para testar (independente do ROI)"], required: true, has_observations: true},

  // SEÇÃO 4: Percepção de Valor (6 questões)
  {id: 23, section_id: 4, text: "Como vocês medem o sucesso de um projeto/serviço atualmente?", type: "checkbox", options: ["Faturamento gerado", "Número de casos fechados", "Satisfação do cliente (NPS/feedback)", "Margem de lucro por caso", "Tempo de entrega vs prazo", "Taxa de sucesso nas teses defendidas", "Não temos métricas formais"], required: true, has_observations: true},
  {id: 24, section_id: 4, text: "Qual seria o valor mínimo que um sistema de IA deveria gerar para justificar investimento?", type: "radio", options: ["20% de aumento na produtividade", "50% de aumento na produtividade", "100% de aumento na produtividade", "Redução de 30% no tempo por caso", "Aumento de 25% no número de clientes", "ROI de 200% em 12 meses"], required: true, has_observations: true},
  {id: 25, section_id: 4, text: "O que vocês consideram o maior diferencial competitivo da empresa hoje?", type: "radio", options: ["Conhecimento técnico especializado", "Relacionamento/confiança com clientes", "Velocidade de entrega", "Taxa de sucesso alta", "Preço competitivo", "Atendimento personalizado"], required: true, has_observations: true},
  {id: 26, section_id: 4, text: "Como vocês precificam os serviços atualmente?", type: "checkbox", options: ["% sobre valor recuperado (success fee)", "Valor fixo por projeto", "Hora técnica", "Mensalidade/retainer", "Misto (fixo + variável)", "Varia por tipo de serviço"], required: true, has_observations: true},
  {id: 27, section_id: 4, text: "Qual o principal motivo dos clientes escolherem a Valor Fiscal?", type: "radio", options: ["Especialização técnica comprovada", "Histórico de sucesso/resultados", "Indicação/reputação no mercado", "Preço competitivo", "Agilidade na entrega", "Atendimento diferenciado"], required: true, has_observations: true},
  {id: 28, section_id: 4, text: "Se pudessem automatizar uma única coisa para impressionar clientes, qual seria?", type: "radio", options: ["Geração automática de relatórios personalizados", "Análise preditiva de oportunidades fiscais", "Respostas instantâneas a dúvidas frequentes", "Monitoramento automático de mudanças legislativas", "Cálculos tributários em tempo real", "Acompanhamento automático de prazos"], required: true, has_observations: true},

  // SEÇÃO 5: Cenário Comercial Futuro (6 questões)
  {id: 29, section_id: 5, text: "Qual a meta de crescimento específica para os próximos 2 anos?", type: "radio", options: ["Crescimento de 10-25% ao ano", "Crescimento de 25-50% ao ano", "Crescimento de 50-100% ao ano", "Crescimento acima de 100% ao ano", "Manter atual faturamento", "Focar em margem, não crescimento"], required: true, has_observations: true},
  {id: 30, section_id: 5, text: "A meta de crescimento é focada em:", type: "radio", options: ["Receita (faturamento total)", "Número de clientes", "Expansão geográfica", "Diversificação de serviços", "Margem de lucro", "Todos os aspectos igualmente"], required: true, has_observations: true},
  {id: 31, section_id: 5, text: "Há planos estratégicos de longo prazo para a empresa?", type: "radio", options: ["Sim, IPO nos próximos 5-7 anos", "Sim, venda/fusão nos próximos 5 anos", "Sim, expansão nacional agressiva", "Sim, manter crescimento orgânico sustentável", "Não temos planos formais de longo prazo", "Prefiro não responder"], required: true, has_observations: true},
  {id: 32, section_id: 5, text: "Qual o maior gargalo para atingir as metas de crescimento?", type: "radio", options: ["Falta de pessoas qualificadas", "Capacidade limitada da equipe atual", "Falta de leads/prospects qualificados", "Concorrência acirrada", "Limitações tecnológicas", "Capital para investimento"], required: true, has_observations: true},
  {id: 33, section_id: 5, text: "Como vocês veem o mercado tributário evoluindo nos próximos 3 anos?", type: "checkbox", options: ["Maior digitalização dos processos", "Aumento da complexidade tributária", "Maior concorrência/commoditização", "Crescimento da demanda por RCT", "Necessidade de especialização maior", "Clientes mais exigentes em tecnologia"], required: true, has_observations: true},
  {id: 34, section_id: 5, text: "Qual seria o cenário ideal de crescimento com IA implementada?", type: "radio", options: ["Dobrar volume sem contratar", "Aumentar margem em 30-50%", "Reduzir tempo por projeto em 50%", "Melhorar precisão e qualidade", "Expandir para novos mercados", "Diferenciação total da concorrência"], required: true, has_observations: true},

  // SEÇÃO 6: Ecossistema Tecnológico (6 questões)
  {id: 35, section_id: 6, text: "Quais sistemas/softwares vocês usam no dia a dia?", type: "checkbox", options: ["Sistema tributário específico", "CRM para clientes", "ERP/sistema de gestão", "Planilhas Excel avançadas", "Sistemas de pesquisa jurídica", "E-mail como principal ferramenta"], required: true, has_observations: true},
  {id: 36, section_id: 6, text: "Os sistemas atuais 'conversam' entre si automaticamente?", type: "radio", options: ["Sim, a maioria dos sistemas se integra automaticamente", "Alguns sistemas se integram, outros não", "Não, fazemos tudo manualmente entre sistemas", "Usamos principalmente um sistema único", "Não sei responder", "Não temos sistemas integrados"], required: true, has_observations: true},
  {id: 37, section_id: 6, text: "Quem é o responsável por tecnologia na empresa?", type: "radio", options: ["Temos um CTO/Diretor de TI dedicado", "Um dos sócios cuida da tecnologia", "Gerente/coordenador técnico", "Pessoa da equipe que 'entende mais'", "Terceirizamos tudo (consultoria externa)", "Cada um resolve seus problemas"], required: true, has_observations: true},
  {id: 38, section_id: 6, text: "Como vocês lidam com atualizações e manutenção dos sistemas?", type: "radio", options: ["Temos suporte técnico interno", "Contrato de suporte com fornecedores", "Chamamos técnico quando dá problema", "Equipe se vira como pode", "Evitamos mexer para não dar problema", "Não temos procedimento formal"], required: true, has_observations: true},
  {id: 39, section_id: 6, text: "Qual o maior problema tecnológico atual?", type: "radio", options: ["Sistemas lentos/travando", "Perda de tempo com tarefas manuais", "Dificuldade para achar informações", "Sistemas que não se comunicam", "Falta de backup/segurança", "Equipe não sabe usar as ferramentas"], required: true, has_observations: true},
  {id: 40, section_id: 6, text: "Se pudessem resolver um problema tecnológico com estalar de dedos, qual seria?", type: "radio", options: ["Integração completa entre todos os sistemas", "Busca instantânea em toda base de conhecimento", "Automação de tarefas manuais repetitivas", "Backup e segurança totalmente automáticos", "Interface única para tudo", "Relatórios automáticos personalizados"], required: true, has_observations: true},

  // SEÇÃO 7: Estrutura Organizacional (8 questões)
  {id: 41, section_id: 7, text: "Qual o tamanho atual da equipe?", type: "radio", options: ["Até 10 pessoas", "11 a 25 pessoas", "26 a 50 pessoas", "51 a 100 pessoas", "101 a 200 pessoas", "Mais de 200 pessoas"], required: true, has_observations: true},
  {id: 42, section_id: 7, text: "Quantas filiais/escritórios a empresa possui?", type: "radio", options: ["Apenas matriz (1 unidade)", "2 a 3 unidades", "4 a 6 unidades", "7 a 10 unidades", "11 a 20 unidades", "Mais de 20 unidades"], required: true, has_observations: true},
  {id: 43, section_id: 7, text: "Como é o desempenho entre as unidades?", type: "radio", options: ["Todas as unidades têm performance similar", "Matriz tem performance superior", "Algumas filiais superam a matriz", "Performance varia muito por região", "Não medimos performance por unidade", "Temos apenas uma unidade"], required: true, has_observations: true},
  {id: 44, section_id: 7, text: "Qual a idade média do time técnico?", type: "radio", options: ["Maioria abaixo de 30 anos", "Maioria entre 30-40 anos", "Maioria entre 40-50 anos", "Maioria acima de 50 anos", "Bem diversificado em idades", "Não sei estimar"], required: true, has_observations: true},
  {id: 45, section_id: 7, text: "Como é a rotatividade (turnover) da equipe?", type: "radio", options: ["Muito baixa (pessoas ficam anos)", "Baixa (eventual saída)", "Média (algumas saídas por ano)", "Alta (rotatividade constante)", "Muito alta (difícil manter pessoas)", "Não acompanhamos esse indicador"], required: true, has_observations: true},
  {id: 46, section_id: 7, text: "Existe plano de cargos e salários estruturado?", type: "radio", options: ["Sim, plano formal com níveis definidos", "Estrutura básica informal", "Definimos caso a caso", "Não temos estrutura formal", "Estamos desenvolvendo", "Não vejo necessidade"], required: true, has_observations: true},
  {id: 47, section_id: 7, text: "Como é feito o treinamento/capacitação da equipe?", type: "checkbox", options: ["Treinamentos formais externos", "Capacitação interna (mentoria)", "Cursos online/EAD", "Congressos e eventos", "Certificações profissionais", "Aprendizado na prática (tentativa e erro)", "Não temos programa formal"], required: true, has_observations: true},
  {id: 48, section_id: 7, text: "Qual o maior desafio de gestão de pessoas?", type: "radio", options: ["Encontrar pessoas qualificadas", "Reter talentos (competição salarial)", "Manter equipe atualizada tecnicamente", "Motivar e engajar a equipe", "Definir processos e padrões", "Padronizar processos entre filiais", "Não temos desafios significativos"], required: true, has_observations: true},

  // SEÇÃO 8: Performance e KPIs (8 questões)
  {id: 49, section_id: 8, text: "Quais números vocês acompanham semanalmente?", type: "checkbox", options: ["Vendas/faturamento da semana", "Pipeline de novos prospects", "Cases fechados vs meta", "Produtividade por consultor", "Satisfação dos clientes", "Indicadores financeiros", "Não acompanhamos nada semanalmente"], required: true, has_observations: true},
  {id: 50, section_id: 8, text: "Como vocês acompanham esses números?", type: "radio", options: ["Dashboard automatizado/sistema integrado", "Planilhas Excel atualizadas manualmente", "Relatórios mensais compilados", "Reuniões com apresentação dos números", "Cada gerente controla à sua maneira", "Não temos controle formal"], required: true, has_observations: true},
  {id: 51, section_id: 8, text: "Qual o KPI mais importante para a diretoria?", type: "radio", options: ["Faturamento mensal", "Número de cases fechados", "Margem de lucro por projeto", "Taxa de conversão (prospects → clientes)", "Ticket médio por cliente", "Satisfação/retenção de clientes", "Não temos um KPI principal definido"], required: true, has_observations: true},
  {id: 52, section_id: 8, text: "Vocês medem produtividade individual dos consultores?", type: "radio", options: ["Sim, por horas trabalhadas", "Sim, por cases fechados", "Sim, por faturamento gerado", "Sim, por múltiplas métricas", "Medimos informalmente", "Não medimos produtividade individual"], required: true, has_observations: true},
  {id: 53, section_id: 8, text: "Como é medida a satisfação dos clientes?", type: "checkbox", options: ["Pesquisa NPS formal", "Feedback informal durante projetos", "Taxa de recontratação", "Indicações recebidas", "Reclamações/elogios espontâneos", "Não medimos formalmente"], required: true, has_observations: true},
  {id: 54, section_id: 8, text: "Qual a taxa de conversão atual (diagnósticos → contratos)?", type: "radio", options: ["Acima de 80%", "Entre 60-80%", "Entre 40-60%", "Entre 20-40%", "Abaixo de 20%", "Não medimos/não sei"], required: true, has_observations: true},
  {id: 55, section_id: 8, text: "Vocês acompanham o tempo gasto por etapa dos projetos?", type: "radio", options: ["Sim, controle rigoroso por atividade", "Controle básico (início/fim do projeto)", "Estimativa aproximada", "Não controlamos tempo", "Cada consultor controla diferente", "Gostaríamos de controlar mas é difícil"], required: true, has_observations: true},
  {id: 56, section_id: 8, text: "Se pudessem melhorar um indicador com IA, qual seria?", type: "radio", options: ["Aumentar taxa de conversão", "Reduzir tempo por projeto", "Aumentar produtividade individual", "Melhorar satisfação do cliente", "Aumentar margem de lucro", "Reduzir retrabalho/erros"], required: true, has_observations: true},

  // SEÇÃO 9: Marketing e Prospecção (7 questões)
  {id: 57, section_id: 9, text: "Quais são os principais canais de aquisição de clientes?", type: "slider_percentage", options: ["Indicações de clientes atuais", "Networking/relacionamento", "Marketing digital (site, redes sociais)", "Eventos e congressos", "Parcerias (contadores, advogados)", "Prospecção ativa (cold call/email)"], required: true, has_observations: true},
  {id: 58, section_id: 9, text: "Como está estruturado o time de vendas/comercial?", type: "radio", options: ["Sócios fazem toda a venda", "Mix: sócios + vendedores dedicados", "Time de vendas estruturado (SDR/Closer)", "Vendas terceirizadas/parceiros", "Cada consultor vende seus serviços", "Não temos estrutura de vendas formal"], required: true, has_observations: true},
  {id: 59, section_id: 9, text: "Como é a remuneração do time de vendas?", type: "checkbox", options: ["Salário fixo apenas", "Fixo + comissão por venda", "Fixo + comissão + bônus por meta", "Comissão pura (% sobre vendas)", "Participação nos lucros", "Diferentes modelos por pessoa"], required: true, has_observations: true},
  {id: 60, section_id: 9, text: "Qual canal traz clientes com maior valor (LTV)?", type: "radio", options: ["Indicações de clientes satisfeitos", "Networking em eventos", "Parcerias estratégicas", "Marketing digital qualificado", "Prospecção direta", "Não medimos LTV por canal"], required: true, has_observations: true},
  {id: 61, section_id: 9, text: "Qual o custo aproximado para adquirir um cliente (CAC)?", type: "radio", options: ["Menos de R$ 1.000", "R$ 1.000 a R$ 5.000", "R$ 5.000 a R$ 10.000", "R$ 10.000 a R$ 20.000", "Mais de R$ 20.000", "Não calculamos CAC"], required: true, has_observations: true},
  {id: 62, section_id: 9, text: "Quanto tempo gasta entre primeiro contato e fechamento?", type: "radio", options: ["Menos de 1 semana", "1 a 2 semanas", "2 a 4 semanas", "1 a 2 meses", "2 a 6 meses", "Mais de 6 meses", "Varia muito por caso"], required: true, has_observations: true},
  {id: 63, section_id: 9, text: "Qual o principal gargalo no processo comercial?", type: "radio", options: ["Gerar leads qualificados", "Tempo para fazer diagnósticos", "Concorrência no preço", "Processo de decisão longo do cliente", "Falta de diferenciação clara", "Capacidade limitada para atender"], required: true, has_observations: true},

  // SEÇÃO 10: Fontes Jurídicas e Pesquisa (6 questões)
  {id: 64, section_id: 10, text: "Quais sites/sistemas vocês usam para pesquisar leis e decisões?", type: "checkbox", options: ["Sites oficiais (Receita Federal, governos estaduais)", "Plataformas pagas (Thomson Reuters, IOB, Fiscosoft)", "Consultor Jurídico, Jota, portais gratuitos", "STF, STJ, TRFs (sites dos tribunais)", "Google mesmo (busca geral)", "Base própria de jurisprudência"], required: true, has_observations: true},
  {id: 65, section_id: 10, text: "Como vocês acompanham mudanças na legislação?", type: "checkbox", options: ["Assinatura de newsletters especializadas", "Monitoramento ativo de DOU", "Alertas automáticos de plataformas", "Participação em grupos/fóruns", "Congressos e eventos", "Cada consultor acompanha sua área", "Não temos processo sistemático"], required: true, has_observations: true},
  {id: 66, section_id: 10, text: "Quanto tempo é gasto em pesquisa jurídica por projeto?", type: "radio", options: ["Menos de 2 horas", "2 a 5 horas", "5 a 10 horas", "10 a 20 horas", "Mais de 20 horas", "Varia muito por complexidade"], required: true, has_observations: true},
  {id: 67, section_id: 10, text: "A pesquisa jurídica é feita por:", type: "radio", options: ["Consultores seniores especializados", "Cada consultor pesquisa para seus casos", "Estagiários/juniores fazem pesquisa inicial", "Equipe dedicada exclusivamente à pesquisa", "Terceirizamos para especialistas", "Depende da complexidade do caso"], required: true, has_observations: true},
  {id: 68, section_id: 10, text: "Qual a maior dificuldade na pesquisa jurídica?", type: "radio", options: ["Encontrar jurisprudência específica/recente", "Tempo gasto para achar informação relevante", "Muita informação dispersa em fontes diferentes", "Interpretar se a decisão se aplica ao caso", "Acompanhar mudanças constantes na legislação", "Não temos dificuldades significativas"], required: true, has_observations: true},
  {id: 69, section_id: 10, text: "Se uma IA pudesse acelerar a pesquisa jurídica, qual seria o maior benefício?", type: "radio", options: ["Encontrar precedentes relevantes mais rápido", "Resumir automaticamente mudanças legislativas", "Sugerir teses jurídicas aplicáveis", "Monitorar decisões em tempo real", "Criar relatórios de fundamentação automáticos", "Liberar consultores para atividades mais estratégicas"], required: true, has_observations: true},

  // SEÇÃO 11: Maturidade Digital (6 questões)
  {id: 70, section_id: 11, text: "Como vocês classificam o nível tecnológico da empresa?", type: "radio", options: ["Muito avançado (usamos tecnologia como diferencial)", "Avançado (acompanhamos as novidades)", "Médio (tecnologia básica funcionando)", "Básico (tecnologia essencial apenas)", "Defasado (precisamos nos modernizar)", "Não sei avaliar"], required: true, has_observations: true},
  {id: 71, section_id: 11, text: "A equipe é resistente ou receptiva a novas tecnologias?", type: "radio", options: ["Muito receptiva, sempre pede novidades", "Receptiva após demonstrar benefícios", "Neutra, aceita se for necessário", "Resistente, preferem métodos tradicionais", "Muito resistente, veem como ameaça", "Varia muito por pessoa/idade"], required: true, has_observations: true},
  {id: 72, section_id: 11, text: "Como vocês tomam decisões sobre investimentos em tecnologia?", type: "radio", options: ["Decisão técnica baseada em ROI claro", "Decisão estratégica da diretoria", "Pressão da equipe por melhorias", "Seguimos o que o mercado está fazendo", "Apenas quando o atual para de funcionar", "Não temos critério formal"], required: true, has_observations: true},
  {id: 73, section_id: 11, text: "Qual o orçamento anual aproximado para tecnologia?", type: "radio", options: ["Menos de R$ 10.000", "R$ 10.000 a R$ 50.000", "R$ 50.000 a R$ 100.000", "R$ 100.000 a R$ 200.000", "Mais de R$ 200.000", "Não temos orçamento específico/não sei"], required: true, has_observations: true},
  {id: 74, section_id: 11, text: "Vocês têm backup e segurança de dados estruturados?", type: "radio", options: ["Sim, backup automático e segurança robusta", "Backup básico, segurança adequada", "Backup manual esporádico", "Confiamos na nuvem (Google, Microsoft)", "Não temos backup formal", "Não sei como funciona"], required: true, has_observations: true},
  {id: 75, section_id: 11, text: "Se pudessem implementar uma tecnologia amanhã, qual seria?", type: "radio", options: ["Sistema de IA para análise tributária", "Automação completa de processos", "Dashboard inteligente de performance", "Chatbot para atendimento 24/7", "Sistema de CRM integrado", "Plataforma de gestão de conhecimento"], required: true, has_observations: true},

  // SEÇÃO 12: Captura de Conversas e Documentação (6 questões)
  {id: 76, section_id: 12, text: "Vocês gravam as reuniões comerciais/técnicas?", type: "radio", options: ["Sim, sempre gravamos (com autorização)", "Gravamos apenas reuniões importantes", "Gravamos esporadicamente", "Não gravamos por política da empresa", "Não gravamos por questões técnicas", "Nunca pensamos nisso"], required: true, has_observations: true},
  {id: 77, section_id: 12, text: "Em que plataforma fazem as reuniões remotas?", type: "checkbox", options: ["Zoom", "Microsoft Teams", "Google Meet", "WhatsApp/Telegram", "Presencial principalmente"], required: true, has_observations: true},
  {id: 78, section_id: 12, text: "Fazem transcrição das reuniões?", type: "radio", options: ["Sim, transcrição automática da plataforma", "Sim, fazemos manualmente", "Apenas anotações principais", "Só gravamos áudio/vídeo", "Não registramos conversas", "Depende da importância da reunião"], required: true, has_observations: true},
  {id: 79, section_id: 12, text: "Como documentam as decisões tomadas em reuniões?", type: "checkbox", options: ["Ata formal de reunião", "E-mail de follow-up", "Anotações no CRM", "WhatsApp grupo/individual", "Documento compartilhado", "Cada um anota para si", "Não documentamos formalmente"], required: true, has_observations: true},
  {id: 80, section_id: 12, text: "Quem é responsável por documentar os acordos com clientes?", type: "radio", options: ["Pessoa específica designada", "Quem conduziu a reunião", "Assistente/secretária", "Cada consultor para seus casos", "Não há responsável fixo", "Documentamos muito pouco"], required: true, has_observations: true},
  {id: 81, section_id: 12, text: "Uma IA que transcrevesse e resumisse reuniões automaticamente seria útil?", type: "radio", options: ["Muito útil, economizaria muito tempo", "Útil, mas teria que ter muita precisão", "Interessante, mas com receios de privacidade", "Pouco útil, preferimos método atual", "Não vejo utilidade", "Dependeria do custo"], required: true, has_observations: true},

  // SEÇÃO 13: Suporte ao Cliente (6 questões)
  {id: 82, section_id: 13, text: "Como os clientes entram em contato para dúvidas/suporte?", type: "checkbox", options: ["WhatsApp direto com consultor", "E-mail específico de suporte", "Telefone da empresa", "Portal/sistema do cliente", "Através do comercial que vendeu", "Ligam direto para sócios"], required: true, has_observations: true},
  {id: 83, section_id: 13, text: "Qual o tempo médio de resposta atual?", type: "radio", options: ["Menos de 1 hora", "1 a 4 horas", "4 a 24 horas", "1 a 3 dias", "3 a 7 dias", "Mais de 1 semana", "Varia muito por caso"], required: true, has_observations: true},
  {id: 84, section_id: 13, text: "Vocês usam sistema de tickets/chamados?", type: "radio", options: ["Sim, sistema formal de tickets", "Controle básico em planilha/e-mail", "Cada consultor controla seus clientes", "WhatsApp como 'sistema'", "Não temos controle formal", "Estamos pensando em implementar"], required: true, has_observations: true},
  {id: 85, section_id: 13, text: "Quem responde as dúvidas dos clientes?", type: "checkbox", options: ["Consultor responsável pelo projeto", "Qualquer consultor disponível", "Pessoa específica de suporte", "Sócios/diretores", "Estagiário/junior para dúvidas simples", "Depende da complexidade"], required: true, has_observations: true},
  {id: 86, section_id: 13, text: "Que tipo de dúvida é mais comum dos clientes?", type: "radio", options: ["Status do projeto/andamento", "Esclarecimentos técnicos", "Documentação necessária", "Prazos e cronograma", "Valores e cobrança", "Como implementar recomendações"], required: true, has_observations: true},
  {id: 87, section_id: 13, text: "Uma IA que respondesse dúvidas básicas automaticamente seria útil?", type: "radio", options: ["Muito útil, liberaria tempo da equipe", "Útil para dúvidas simples apenas", "Interessante, mas clientes preferem humanos", "Perigoso, pode dar informação errada", "Não vejo utilidade", "Dependeria da qualidade das respostas"], required: true, has_observations: true},

  // SEÇÃO 14: Comunicação Proativa (6 questões)
  {id: 88, section_id: 14, text: "Vocês fazem acompanhamento proativo dos clientes?", type: "radio", options: ["Sim, cronograma estruturado de follow-up", "Follow-up informal conforme necessário", "Apenas quando cliente solicita", "Comunicação pontual por projeto", "Muito pouco contato proativo", "Não fazemos acompanhamento"], required: true, has_observations: true},
  {id: 89, section_id: 14, text: "Como comunicam mudanças na legislação para clientes?", type: "checkbox", options: ["Newsletter periódica", "E-mails específicos por tema", "WhatsApp para clientes relevantes", "Reuniões/apresentações", "Portal com atualizações", "Apenas quando cliente pergunta", "Não comunicamos proativamente"], required: true, has_observations: true},
  {id: 90, section_id: 14, text: "Fazem relatórios periódicos de acompanhamento?", type: "radio", options: ["Sim, relatórios mensais automáticos", "Relatórios trimestrais", "Apenas relatórios finais de projeto", "Relatórios sob demanda", "Comunicação informal sem relatórios", "Não fazemos relatórios de acompanhamento"], required: true, has_observations: true},
  {id: 91, section_id: 14, text: "Como medem satisfação durante o projeto (não só no final)?", type: "checkbox", options: ["Check-ins regulares agendados", "Feedback informal nas interações", "Pesquisas de satisfação periódicas", "Reuniões de milestone/etapas", "Apenas conversas casuais", "Não medimos durante o projeto"], required: true, has_observations: true},
  {id: 92, section_id: 14, text: "Qual a frequência ideal de contato com cliente durante projeto?", type: "radio", options: ["Semanal", "Quinzenal", "Mensal", "Apenas em marcos importantes", "Apenas quando há novidades", "Depende do tipo de projeto"], required: true, has_observations: true},
  {id: 93, section_id: 14, text: "Uma IA que criasse relatórios automáticos de progresso seria útil?", type: "radio", options: ["Muito útil, melhoraria comunicação", "Útil se fosse personalizável", "Interessante, mas prefiro contato pessoal", "Pouco útil, cada projeto é único", "Não vejo necessidade", "Dependeria da qualidade do relatório"], required: true, has_observations: true},

  // SEÇÃO 15: Expansão e Plataformização (6 questões)
  {id: 94, section_id: 15, text: "Vocês têm planos de franquear/licenciar a metodologia?", type: "radio", options: ["Sim, já estamos estruturando", "Sim, é um plano futuro", "Talvez, dependendo da demanda", "Não, preferimos crescimento próprio", "Não, metodologia é nosso diferencial", "Nunca pensamos nisso"], required: true, has_observations: true},
  {id: 95, section_id: 15, text: "Seria interessante transformar parte dos serviços em produto digital?", type: "radio", options: ["Sim, já pensamos nisso", "Sim, mas não sabemos como", "Talvez para serviços mais simples", "Não, nosso negócio é consultoria personalizada", "Não vejo como seria possível", "Nunca consideramos"], required: true, has_observations: true},
  {id: 96, section_id: 15, text: "Que serviços poderiam ser 'produtizados' (padronizados)?", type: "checkbox", options: ["Diagnósticos iniciais automatizados", "Calculadoras de potencial de recuperação", "Templates de documentos padrão", "Cursos/treinamentos online", "Software de acompanhamento para clientes", "Nenhum, tudo é muito customizado"], required: true, has_observations: true},
  {id: 97, section_id: 15, text: "Como vocês veem a evolução do mercado tributário?", type: "checkbox", options: ["Maior digitalização/automação", "Commoditização de serviços básicos", "Necessidade de maior especialização", "Consolidação (grandes comprando pequenos)", "Novos players com tecnologia", "Mercado permanecerá como está"], required: true, has_observations: true},
  {id: 98, section_id: 15, text: "Uma plataforma que permitisse licenciados usarem IA seria interessante?", type: "radio", options: ["Muito interessante, seria diferencial competitivo", "Interessante, mas dependeria do custo", "Talvez, precisaria entender melhor", "Pouco interessante, cada um tem seu método", "Não vejo valor", "Seria muito complexo de implementar"], required: true, has_observations: true},
  {id: 99, section_id: 15, text: "Qual seria o maior benefício de uma plataforma tecnológica unificada?", type: "radio", options: ["Padronização de processos entre licenciados", "Escala sem perder qualidade", "Maior controle sobre a rede", "Diferenciação competitiva", "Geração de receita recorrente", "Não vejo benefícios significativos"], required: true, has_observations: true},

  // SEÇÃO 16: Agentes Comerciais Principais (5 questões)
  {id: 100, section_id: 16, text: "BDR Virtual Especializado - Agente que identifica e aborda clientes grandes com potencial tributário diferenciado seria útil?", type: "radio", options: ["Revolucionário, resolveria nosso maior gargalo", "Muito útil para alcançar grandes empresas", "Útil como complemento ao BDR humano", "Pouco útil, grandes clientes precisam abordagem pessoal", "Não seria efetivo para nosso perfil de cliente"], required: true, has_observations: true},
  {id: 101, section_id: 16, text: "SDR Virtual - Agente que faz primeira qualificação e agenda reuniões 24/7?", type: "radio", options: ["Game-changer para nossa operação", "Muito útil para horários alternativos", "Útil para triagem inicial", "Clientes preferem falar com pessoas", "Não confiaria vendas para IA"], required: true, has_observations: true},
  {id: 102, section_id: 16, text: "Closer Virtual - Agente que conduz diagnósticos e apresenta propostas?", type: "radio", options: ["Seria perfeito se funcionasse bem", "Útil para casos mais simples", "Apenas como apoio ao closer humano", "Muito arriscado, vendas são relacionamento", "Impossível, cada caso é muito específico", "Não substituiria expertise humana"], required: true, has_observations: true},
  {id: 103, section_id: 16, text: "Customer Success Virtual - Agente que faz follow-up e acompanhamento automático?", type: "radio", options: ["Melhoraria muito satisfação dos clientes", "Útil para comunicações de rotina", "Bom para alertas e lembretes", "Clientes preferem contato humano", "Muito impessoal para nosso negócio", "Dependeria da personalização"], required: true, has_observations: true},
  {id: 104, section_id: 16, text: "Qual seria a sequência ideal de implementação desses agentes?", type: "ranking", options: ["BDR Virtual Especializado", "SDR Virtual", "Closer Virtual", "Customer Success Virtual"], required: true, has_observations: true},

  // SEÇÃO 17: Agentes Avançados (5 questões)
  {id: 105, section_id: 17, text: "Analisador de Documentos Fiscais - Agente que analisa NFe, XMLs, relatórios automaticamente?", type: "radio", options: ["Prioridade alta, economizaria muito tempo", "Interessante para implementar no futuro", "Útil apenas como complemento humano", "Não seria necessário", "Muito arriscado para nossa operação"], required: true, has_observations: true},
  {id: 106, section_id: 17, text: "Gerador de Relatórios Técnicos - Agente que cria relatórios de RCT automaticamente?", type: "radio", options: ["Prioridade alta, agilizaria entregas", "Interessante para implementar no futuro", "Útil como base para personalizar", "Não seria necessário", "Relatórios são muito específicos para IA"], required: true, has_observations: true},
  {id: 107, section_id: 17, text: "Monitor Legislativo - Agente que acompanha mudanças em tempo real e alerta oportunidades?", type: "radio", options: ["Prioridade alta, não podemos perder nada", "Interessante para implementar no futuro", "Útil como complemento às fontes atuais", "Não seria necessário", "Já temos fontes adequadas"], required: true, has_observations: true},
  {id: 108, section_id: 17, text: "Se implementassem agentes avançados, qual seria a prioridade?", type: "ranking", options: ["Analisador de Documentos", "Gerador de Relatórios", "Monitor Legislativo"], required: true, has_observations: true},
  {id: 109, section_id: 17, text: "Orçamento adicional para agentes avançados (após implementar principais)?", type: "radio", options: ["Até R$ 25.000 por agente", "R$ 25.000 a R$ 50.000 por agente", "R$ 50.000 a R$ 100.000 por agente", "Mais de R$ 100.000 por agente", "Dependeria do ROI dos agentes principais", "Não investiria em agentes avançados"], required: true, has_observations: true}
];

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

export const getQuestionsBySection = (sectionId: number): Question[] => {
  return QUESTIONS.filter(q => q.section_id === sectionId);
};

export const getSectionById = (sectionId: number): SectionMetadata | undefined => {
  return SECTION_RESPONSIBILITIES.find(s => s.id === sectionId);
};

export const getQuestionById = (questionId: number): Question | undefined => {
  return QUESTIONS.find(q => q.id === questionId);
};

export const getTotalQuestions = (): number => {
  return QUESTIONS.length;
};

export const getQuestionsBySectionWithMetadata = (sectionId: number) => {
  const section = getSectionById(sectionId);
  const questions = getQuestionsBySection(sectionId);
  return {
    section,
    questions,
    count: questions.length
  };
};

export const getSectionsPriority = () => {
  const critical = SECTION_RESPONSIBILITIES.filter(s => s.priority === 'CRÍTICA');
  const high = SECTION_RESPONSIBILITIES.filter(s => s.priority === 'ALTA');
  const medium = SECTION_RESPONSIBILITIES.filter(s => s.priority === 'MÉDIA');
  const low = SECTION_RESPONSIBILITIES.filter(s => s.priority === 'BAIXA');
  
  return { critical, high, medium, low };
};

export const calculateProgress = (responses: QuestionResponse[]): number => {
  const totalQuestions = getTotalQuestions();
  const answeredQuestions = responses.length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
};

// ========================================
// CONSTANTES DE CONFIGURAÇÃO
// ========================================

export const DISCOVERY_CONFIG = {
  TOTAL_SECTIONS: 17,
  TOTAL_QUESTIONS: 109,
  CRITICAL_SECTIONS: [1, 3, 16],
  HIGH_PRIORITY_SECTIONS: [2, 4, 5, 8, 9],
  MEDIUM_PRIORITY_SECTIONS: [6, 7, 10, 11, 13],
  LOW_PRIORITY_SECTIONS: [12, 14, 15, 17],
  COMPANY_NAME: "Discovery Notecraft™",
  SUBTITLE: "Inteligência Consultiva IA-Aware"
};

// Adaptador para compatibilidade com código existente
export const DISCOVERY_QUESTIONS = QUESTIONS.map(q => ({
  id: q.id.toString(),
  sectionNumber: q.section_id,
  sectionName: getSectionById(q.section_id)?.title || `Seção ${q.section_id}`,
  questionText: q.text,
  responseType: q.type as any,
  options: q.options,
  required: q.required,
  placeholder: q.placeholder,
  additionalField: q.has_observations ? 'observations' : undefined
}));

export default {
  SECTION_RESPONSIBILITIES,
  QUESTIONS,
  getQuestionsBySection,
  getSectionById,
  getQuestionById,
  getTotalQuestions,
  getQuestionsBySectionWithMetadata,
  getSectionsPriority,
  calculateProgress,
  DISCOVERY_CONFIG
};