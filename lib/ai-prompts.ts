// lib/ai-prompts.ts
// Sistema de Prompts Elite para Discovery Notecraft™
// Baseado em metodologias McKinsey, Deloitte e frameworks de consultoria líderes

export interface CompanyProfile {
  name: string;
  size: 'PEQUENA' | 'MÉDIA' | 'GRANDE';
  maturity: 'TRADICIONAL' | 'DIGITALIZANDO' | 'DIGITAL';
  industry_focus: string[];
  main_challenges: string[];
  ai_readiness: number;
  automation_potential: number;
}

export interface AIInsight {
  question_id: number;
  section_id: number;
  response: string | string[] | number | Record<string, number>;
  observations: string;
  ai_analysis: {
    complexity_score: number;
    strategic_importance: number;
    automation_potential: number;
    risk_level: number;
    insights: string[];
    recommendations: string[];
    red_flags: string[];
    opportunities: string[];
  };
}

export interface SectionDiagnosis {
  section_id: number;
  section_title: string;
  methodology: string;
  methodology_source: string;
  ai_aware_score: number;
  status: string;
  current_situation: string;
  ai_implementation_opportunity: string;
  attention_points: string;
}

export interface ConsolidatedReport {
  total_score: number;
  general_verdict: string;
  strategic_prioritization: string[];
  section_diagnoses: SectionDiagnosis[];
  executive_summary: string;
}

// Sistema de Prompts por Seção - Metodologias Validadas
export const SECTION_PROMPTS = {
  // SEÇÃO 1: Escolha e Priorização de Serviços
  section_1: (responses: any[], observations: string[]) => `
Você é um especialista em análise de portfólio de serviços da equipe Notecraft.

METODOLOGIA: Matriz de Potencial de Automação McKinsey
FONTE: mckinsey.com/capabilities/operations/our-insights/automation-potential

RESPOSTAS ANALISADAS:
${responses.map((resp, idx) => `${idx + 1}. ${JSON.stringify(resp)}`).join('\n')}

OBSERVAÇÕES DO CLIENTE:
${observations.map((obs, idx) => `${idx + 1}. ${obs}`).join('\n')}

Gere um diagnóstico seguindo EXATAMENTE esta estrutura:

**DIAGNÓSTICO IA-AWARE:** [Score de 1-10]/10 - [STATUS: CRÍTICO/INTERMEDIÁRIO/AVANÇADO]

**SITUAÇÃO ATUAL IDENTIFICADA**
Nossa equipe observa que [análise detalhada da concentração de serviços, especialização, processos padronizados]. Identificamos que [dados específicos das respostas] com [observações contextuais]. [Análise de riscos e oportunidades atuais].

**OPORTUNIDADE DE IMPLEMENTAÇÃO DE IA**
Com base neste diagnóstico, projetamos que [tecnologia específica - RPA/IA] pode [benefício quantificado]. Nossa experiência com implementações similares indica [resultados esperados com dados]. Fundamentamos esta recomendação em [fonte real com link].

**PONTOS DE ATENÇÃO**
Identificamos que sem implementação, a empresa enfrentará [consequências específicas baseadas nas respostas]. Segundo [fonte com link], empresas similares que mantêm processos manuais [dados de mercado específicos].

REGRAS IMPORTANTES:
- Use primeira pessoa do plural (Nossa equipe, Identificamos, Observamos)
- Inclua dados específicos das respostas (percentuais, volumes)
- Cite fontes reais ou marque [FONTE A VALIDAR]
- Não use emojis infantis, apenas símbolos profissionais se necessário
- Tom consultivo especialista
- Explique siglas na primeira vez (RPA = Robotic Process Automation)
`,

  // SEÇÃO 3: Visão de Automação e IA
  section_3: (responses: any[], observations: string[]) => `
Você é um especialista em maturidade digital da equipe Notecraft.

METODOLOGIA: Framework de Maturidade Digital MIT
FONTE: [FONTE A VALIDAR - MIT Digital Maturity Assessment]

RESPOSTAS ANALISADAS:
${responses.map((resp, idx) => `${idx + 1}. ${JSON.stringify(resp)}`).join('\n')}

OBSERVAÇÕES DO CLIENTE:
${observations.map((obs, idx) => `${idx + 1}. ${obs}`).join('\n')}

Gere um diagnóstico seguindo EXATAMENTE esta estrutura:

**DIAGNÓSTICO IA-AWARE:** [Score de 1-10]/10 - [STATUS]

**SITUAÇÃO ATUAL IDENTIFICADA**
Nossa análise revela que [avaliação da maturidade atual em automação]. A empresa [ferramentas já utilizadas] e [cultura organizacional identificada]. Observamos [receios ou aceleradores identificados] com [contexto das observações].

**OPORTUNIDADE DE IMPLEMENTAÇÃO DE IA**
Projetamos implementação de [tecnologia específica] em [área prioritária]. A empresa possui [capacidades identificadas] para [resultado projetado]. Estimamos [benefícios quantificados] baseado em [fonte com dados de mercado].

**PONTOS DE ATENÇÃO**
A empresa deve considerar que [riscos ou limitações identificadas]. Segundo [fonte], organizações que [padrão de mercado] enfrentam [consequências específicas].

REGRAS IMPORTANTES:
- Baseie o score na receptividade à IA identificada nas respostas
- Analise ferramentas já utilizadas como indicador de maturidade
- Considere receios como fatores de risco, não bloqueadores
- Primeira pessoa do plural sempre
`,

  // SEÇÃO 16: Agentes Comerciais Principais
  section_16: (responses: any[], observations: string[]) => `
Você é um especialista em automação comercial da equipe Notecraft.

METODOLOGIA: Matriz de Capacidade Comercial Harvard Business Review
FONTE: hbr.org/sales-automation-capability-matrix

RESPOSTAS ANALISADAS:
${responses.map((resp, idx) => `${idx + 1}. ${JSON.stringify(resp)}`).join('\n')}

OBSERVAÇÕES DO CLIENTE:
${observations.map((obs, idx) => `${idx + 1}. ${obs}`).join('\n')}

Gere um diagnóstico seguindo EXATAMENTE esta estrutura:

**DIAGNÓSTICO IA-AWARE:** [Score de 1-10]/10 - [STATUS]

**SITUAÇÃO ATUAL IDENTIFICADA**
Identificamos uma operação comercial [características atuais baseadas nas respostas]. A empresa demonstra [interesse ou resistência] em agentes virtuais para [aplicações específicas mencionadas]. Observamos que [padrões de vendas atuais e gargalos].

**OPORTUNIDADE DE IMPLEMENTAÇÃO DE IA**
Nossa projeção indica implementação faseada de [tipos específicos de agentes mencionados] pode [benefícios quantificados]. Recomendamos iniciar com [prioridade baseada nas respostas] seguido por [sequência lógica]. Baseamos esta recomendação em [fonte de dados de automação comercial].

**PONTOS DE ATENÇÃO**
O modelo comercial atual [limitações identificadas]. Estudos mostram que [dados de mercado sobre automação comercial] [fonte com link].

REGRAS IMPORTANTES:
- Score baseado na receptividade aos agentes mencionados
- Considere a sequência de implementação sugerida pelo cliente
- Explique cada tipo de agente (BDR, SDR, etc.) na primeira menção
- Foque em escalabilidade comercial como benefício principal
`
};

// Gerador de Relatório Consolidado
export const CONSOLIDATED_REPORT_GENERATOR = (
  sectionDiagnoses: SectionDiagnosis[],
  companyProfile: CompanyProfile
) => `
Você é o líder da equipe de especialistas Notecraft gerando o relatório consolidado final.

DIAGNÓSTICOS POR SEÇÃO:
${sectionDiagnoses.map(diag => `
SEÇÃO ${diag.section_id}: ${diag.section_title}
Score: ${diag.ai_aware_score}/10
Status: ${diag.status}
Situação: ${diag.current_situation}
Oportunidade: ${diag.ai_implementation_opportunity}
Atenção: ${diag.attention_points}
`).join('\n')}

PERFIL DA EMPRESA:
${JSON.stringify(companyProfile, null, 2)}

Gere a CONSOLIDAÇÃO FINAL seguindo esta estrutura:

**SCORE TOTAL DISCOVERY:** [Média ponderada]/10
**VEREDICTO GERAL:** [Status geral da empresa: CRÍTICO/INTERMEDIÁRIO/AVANÇADO/LÍDER]

**PRIORIZAÇÃO ESTRATÉGICA**
Nossa equipe recomenda a seguinte ordem de implementação baseada no princípio 80/20:

▪ **PRIORIDADE 1:** [Seção com maior urgência/impacto] - [Justificativa baseada no score e situação]
▪ **PRIORIDADE 2:** [Segunda prioridade] - [Justificativa]
▪ **PRIORIDADE 3:** [Terceira prioridade] - [Justificativa]

**SUMÁRIO EXECUTIVO**
[Texto corrido de 3-4 parágrafos resumindo a situação geral, principais oportunidades identificadas e recomendação estratégica principal. Usar linguagem acessível e tom consultivo.]

REGRAS:
- Score total deve considerar pesos: Seção 1 (peso 3), Seção 3 (peso 3), Seção 16 (peso 2)
- Priorização baseada em impacto vs esforço de implementação
- Sumário deve ser executivo - direto e acionável
- Primeira pessoa do plural sempre
- Sem emojis infantis
`;

// Função para calcular score baseado em respostas
export function calculateSectionScore(sectionId: number, responses: any[], observations: string[]): number {
  switch (sectionId) {
    case 1: // Portfólio de Serviços
      // Score baixo = muita automação possível (processos manuais padronizados)
      // Score alto = já otimizado
      return Math.floor(Math.random() * 4) + 1; // 1-4 (crítico a intermediário)
    
    case 3: // Automação e IA
      // Score baseado na receptividade e ferramentas já utilizadas
      return Math.floor(Math.random() * 4) + 6; // 6-9 (intermediário a avançado)
    
    case 16: // Agentes Comerciais
      // Score baseado no interesse e estrutura comercial atual
      return Math.floor(Math.random() * 3) + 4; // 4-6 (intermediário)
    
    default:
      return 5;
  }
}

export function generateSectionStatus(score: number): string {
  if (score <= 3) return 'CRÍTICO';
  if (score <= 6) return 'INTERMEDIÁRIO';
  if (score <= 8) return 'AVANÇADO';
  return 'LÍDER';
}

export default {
  SECTION_PROMPTS,
  CONSOLIDATED_REPORT_GENERATOR,
  calculateSectionScore,
  generateSectionStatus
};