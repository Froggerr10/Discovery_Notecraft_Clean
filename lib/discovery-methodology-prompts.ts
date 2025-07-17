// lib/discovery-methodology-prompts.ts
// Prompts baseados em metodologias comprovadas de Discovery para Automação
// Implementa frameworks de consultorias líderes (McKinsey, Deloitte, EY)

export interface ProcessAnalysisFramework {
  impact_assessment: string;
  complexity_evaluation: string;
  technical_viability: string;
  roi_calculation: string;
  strategic_alignment: string;
}

export interface DiscoveryInsight {
  process_category: 'HIGH_AUTOMATION_POTENTIAL' | 'MEDIUM_POTENTIAL' | 'LOW_POTENTIAL' | 'REQUIRES_REDESIGN';
  automation_complexity: 'LOW' | 'MEDIUM' | 'HIGH';
  estimated_roi_months: number;
  implementation_priority: 1 | 2 | 3 | 4 | 5;
  technology_recommendation: 'RPA' | 'AI_ML' | 'BPM' | 'HYBRID' | 'MANUAL_OPTIMIZATION';
  business_case_summary: string;
  risk_factors: string[];
  success_factors: string[];
}

// ========================================
// PROMPTS BASEADOS EM METODOLOGIAS COMPROVADAS
// ========================================

export const DISCOVERY_METHODOLOGY_PROMPTS = {

  // Análise baseada no Framework ICE (Impacto, Confiança, Esforço)
  ice_framework_analysis: (responses: any[], observations: string[]) => `
Você é um consultor sênior especializado em Discovery de Automação, aplicando o framework ICE (Impacto, Confiança, Esforço) usado por consultorias como McKinsey e Deloitte.

METODOLOGIA ICE:
- IMPACTO: Potencial de benefícios (economia de horas, redução de erros, ROI)
- CONFIANÇA: Nível de certeza nas estimativas e estabilidade do processo
- ESFORÇO: Complexidade técnica e organizacional para implementar

DADOS DO CLIENTE:
${responses.map((r, i) => `
Resposta ${i + 1}: ${JSON.stringify(r)}
Observação: "${observations[i] || 'Sem observações'}"
`).join('\n')}

ANÁLISE SOLICITADA:
Para cada processo identificado nas respostas, aplique o framework ICE:

1. IMPACTO (1-10):
   - Quantas horas/dia são gastas neste processo?
   - Qual o custo atual em salários para executá-lo?
   - Que erros ou retrabalhos ele gera?
   - Impacto na satisfação do cliente/funcionário?

2. CONFIANÇA (1-10):
   - O processo está bem documentado e padronizado?
   - Há variações ou exceções frequentes?
   - Os sistemas envolvidos são estáveis?
   - A área apoia a automação?

3. ESFORÇO (1-10, onde 1 = fácil):
   - Quantos sistemas precisam ser integrados?
   - Há dados não estruturados?
   - Mudança organizacional necessária?
   - Complexidade técnica geral?

FORMATO DE RESPOSTA JSON:
{
  "processes_analyzed": [
    {
      "process_name": "nome do processo identificado",
      "ice_score": {
        "impact": 8,
        "confidence": 7,
        "effort": 3,
        "total_score": 12.67
      },
      "analysis": {
        "impact_details": "economia estimada, benefícios específicos",
        "confidence_reasoning": "por que temos certeza/incerteza",
        "effort_breakdown": "complexidades técnicas e organizacionais"
      },
      "recommendation": "automatizar/não automatizar/redesenhar primeiro"
    }
  ],
  "prioritization": ["processo 1", "processo 2", "processo 3"],
  "quick_wins": ["processos de alto impacto e baixo esforço"],
  "strategic_bets": ["processos de alto impacto que valem investimento maior"]
}
`,

  // Análise de Adequação para RPA (RPA Suitability Checklist)
  rpa_suitability_analysis: (responses: any[], observations: string[]) => `
Você é um especialista em RPA aplicando a checklist de adequação usada por consultorias líderes.

CHECKLIST DE ADEQUAÇÃO RPA:
✅ Entrada digital: Processo usa dados eletrônicos (não papel)
✅ Regras definidas: Lógica "se/então" clara, sem julgamento complexo
✅ Baixa variação: Processo padronizado, poucas exceções
✅ Sistemas estáveis: Aplicações maduras, não em mudança
✅ Volume suficiente: Repetitivo, alta frequência
✅ Benefício financeiro: Horas significativas ou impacto em receita

DADOS PARA ANÁLISE:
${responses.map((r, i) => `
Resposta ${i + 1}: ${JSON.stringify(r)}
Contexto: "${observations[i] || 'Sem observações'}"
`).join('\n')}

AVALIAÇÃO SOLICITADA:
Para cada processo manual identificado, aplique a checklist:

RESPOSTA EM JSON:
{
  "rpa_candidates": [
    {
      "process": "nome do processo",
      "suitability_score": "85%",
      "checklist_results": {
        "digital_input": true,
        "defined_rules": true,
        "low_variation": false,
        "stable_systems": true,
        "sufficient_volume": true,
        "financial_benefit": true
      },
      "blocking_factors": ["alta variação no processo"],
      "enablers": ["sistemas estáveis", "alto volume"],
      "rpa_readiness": "READY" | "NEEDS_PREPARATION" | "NOT_SUITABLE",
      "preparation_steps": ["padronizar exceções", "mapear variações"]
    }
  ],
  "summary": {
    "total_processes": 5,
    "rpa_ready": 2,
    "needs_prep": 2,
    "not_suitable": 1
  }
}
`,

  // Matriz de Potencial de Automação (Especialização vs Volume)
  automation_potential_matrix: (responses: any[], observations: string[]) => `
Você é consultor em automação aplicando a Matriz de Potencial usada pela iProcess e outras consultorias.

MATRIZ DE POTENCIAL:
- EIXO X: Volume de trabalho repetitivo (Baixo → Alto)
- EIXO Y: Nível de especialização do executor (Baixo → Alto)

QUADRANTES:
1. Alta especialização + Alto volume = PRIORIDADE MÁXIMA (libera especialistas caros)
2. Baixa especialização + Alto volume = BOA OPORTUNIDADE (economia de escala)
3. Alta especialização + Baixo volume = OPORTUNIDADE MÉDIA (libera especialista para estratégia)
4. Baixa especialização + Baixo volume = BAIXA PRIORIDADE (ROI questionável)

DADOS DO CLIENTE:
${responses.map((r, i) => `
Resposta ${i + 1}: ${JSON.stringify(r)}
Observação: "${observations[i] || 'Sem observações'}"
`).join('\n')}

ANÁLISE SOLICITADA:
Posicione cada processo identificado na matriz:

RESPOSTA JSON:
{
  "matrix_analysis": [
    {
      "process": "nome do processo",
      "specialization_level": "HIGH" | "MEDIUM" | "LOW",
      "work_volume": "HIGH" | "MEDIUM" | "LOW",
      "quadrant": 1,
      "priority_rank": "MAXIMUM" | "HIGH" | "MEDIUM" | "LOW",
      "reasoning": {
        "specialization_evidence": "por que consideramos alta/baixa especialização",
        "volume_evidence": "evidências de alto/baixo volume",
        "matrix_position": "justificativa do quadrante"
      },
      "roi_potential": "estimativa baseada no quadrante",
      "automation_approach": "RPA/AI/BPM recomendado"
    }
  ],
  "prioritized_roadmap": {
    "phase_1_quick_wins": ["processos quadrante 1 e 2"],
    "phase_2_strategic": ["processos quadrante 3"],
    "phase_3_future": ["processos que precisam redesign"]
  }
}
`,

  // Análise de Viabilidade Técnica e Gerencial
  technical_viability_assessment: (responses: any[], observations: string[]) => `
Você é um arquiteto de soluções avaliando viabilidade técnica e gerencial conforme framework das consultorias líderes.

CRITÉRIOS DE VIABILIDADE:

TÉCNICA:
- Sistemas acessíveis (sem CAPTCHA complexo, interfaces estáveis)
- Qualidade de inputs (documentos legíveis, dados estruturados)
- Trigger digital (evento eletrônico inicia processo)
- Formatos conhecidos (pouca variação de documentos/telas)
- Estabilidade (processo e sistemas não mudam frequentemente)

GERENCIAL:
- Processo mapeado e entendido completamente
- Automação não quebra fluxo downstream
- Planos de contingência para falhas
- Implicações de segurança consideradas
- Apoio executivo e ownership definido

DADOS PARA ANÁLISE:
${responses.map((r, i) => `
Resposta ${i + 1}: ${JSON.stringify(r)}
Contexto: "${observations[i] || 'Sem observações'}"
`).join('\n')}

FORMATO RESPOSTA:
{
  "viability_assessment": [
    {
      "process": "nome do processo",
      "technical_viability": {
        "score": "85%",
        "accessible_systems": true,
        "input_quality": true,
        "digital_trigger": false,
        "known_formats": true,
        "stability": true,
        "blocking_factors": ["falta trigger automático"],
        "enablers": ["sistemas estáveis", "inputs de qualidade"]
      },
      "managerial_viability": {
        "score": "70%",
        "process_mapped": true,
        "no_downstream_impact": true,
        "contingency_plans": false,
        "security_cleared": true,
        "executive_support": true,
        "concerns": ["falta plano de contingência"],
        "strengths": ["apoio executivo forte"]
      },
      "overall_readiness": "READY" | "NEEDS_PREPARATION" | "NOT_VIABLE",
      "preparation_actions": ["definir contingência", "mapear triggers"],
      "go_live_timeline": "estimativa em semanas/meses"
    }
  ]
}
`

};

// ========================================
// GERADOR DE BUSINESS CASE ESTRUTURADO
// ========================================

export class DiscoveryBusinessCaseGenerator {
  
  static async generateDiscoveryInsights(
    sectionResponses: any[],
    sectionObservations: string[],
    sectionId: number
  ): Promise<DiscoveryInsight[]> {
    
    const insights: DiscoveryInsight[] = [];
    
    // Aplica múltiplos frameworks para análise robusta
    const iceAnalysis = await this.conductICEAnalysis(sectionResponses, sectionObservations);
    const rpaAnalysis = await this.conductRPAAnalysis(sectionResponses, sectionObservations);
    const matrixAnalysis = await this.conductMatrixAnalysis(sectionResponses, sectionObservations);
    
    // Consolida insights dos diferentes frameworks
    for (let i = 0; i < sectionResponses.length; i++) {
      const insight: DiscoveryInsight = {
        process_category: this.determineProcessCategory(iceAnalysis, rpaAnalysis, matrixAnalysis, i),
        automation_complexity: this.assessComplexity(rpaAnalysis, i),
        estimated_roi_months: this.calculateROI(iceAnalysis, matrixAnalysis, i),
        implementation_priority: this.determinePriority(iceAnalysis, matrixAnalysis, i),
        technology_recommendation: this.recommendTechnology(rpaAnalysis, matrixAnalysis, i),
        business_case_summary: this.generateSummary(iceAnalysis, rpaAnalysis, matrixAnalysis, i),
        risk_factors: this.identifyRisks(rpaAnalysis, i),
        success_factors: this.identifySuccessFactors(iceAnalysis, matrixAnalysis, i)
      };
      
      insights.push(insight);
    }
    
    return insights;
  }
  
  private static async conductICEAnalysis(responses: any[], observations: string[]): Promise<any> {
    // Simula análise ICE (em produção, usaria LLM real)
    return {
      processes: responses.map((r, i) => ({
        name: `Processo ${i + 1}`,
        ice_score: { impact: 8, confidence: 7, effort: 4, total: 11.67 },
        recommendation: 'automatizar'
      }))
    };
  }
  
  private static async conductRPAAnalysis(responses: any[], observations: string[]): Promise<any> {
    return {
      candidates: responses.map((r, i) => ({
        process: `Processo ${i + 1}`,
        suitability_score: '75%',
        rpa_readiness: 'READY'
      }))
    };
  }
  
  private static async conductMatrixAnalysis(responses: any[], observations: string[]): Promise<any> {
    return {
      matrix: responses.map((r, i) => ({
        process: `Processo ${i + 1}`,
        quadrant: 1,
        priority: 'HIGH'
      }))
    };
  }
  
  private static determineProcessCategory(ice: any, rpa: any, matrix: any, index: number): DiscoveryInsight['process_category'] {
    const iceScore = ice.processes[index]?.ice_score?.total || 0;
    if (iceScore > 10) return 'HIGH_AUTOMATION_POTENTIAL';
    if (iceScore > 7) return 'MEDIUM_POTENTIAL';
    return 'LOW_POTENTIAL';
  }
  
  private static assessComplexity(rpa: any, index: number): DiscoveryInsight['automation_complexity'] {
    const readiness = rpa.candidates[index]?.rpa_readiness;
    if (readiness === 'READY') return 'LOW';
    if (readiness === 'NEEDS_PREPARATION') return 'MEDIUM';
    return 'HIGH';
  }
  
  private static calculateROI(ice: any, matrix: any, index: number): number {
    const impact = ice.processes[index]?.ice_score?.impact || 5;
    return Math.round(12 / (impact / 5)); // Maior impacto = ROI mais rápido
  }
  
  private static determinePriority(ice: any, matrix: any, index: number): DiscoveryInsight['implementation_priority'] {
    const quadrant = matrix.matrix[index]?.quadrant || 4;
    if (quadrant === 1) return 1;
    if (quadrant === 2) return 2;
    if (quadrant === 3) return 3;
    return 4;
  }
  
  private static recommendTechnology(rpa: any, matrix: any, index: number): DiscoveryInsight['technology_recommendation'] {
    const readiness = rpa.candidates[index]?.rpa_readiness;
    if (readiness === 'READY') return 'RPA';
    return 'BPM';
  }
  
  private static generateSummary(ice: any, rpa: any, matrix: any, index: number): string {
    return `Processo com alto potencial de automação baseado em análise ICE, adequação RPA e posicionamento na matriz de especialização vs volume.`;
  }
  
  private static generateBusinessCase(ice: any, rpa: any, matrix: any, index: number): string {
    return `Processo com alto potencial de automação baseado em análise ICE, adequação RPA e posicionamento na matriz de especialização vs volume.`;
  }
  
  private static identifyRisks(rpa: any, index: number): string[] {
    return ['Mudanças em sistemas', 'Resistência da equipe', 'Complexidade técnica'];
  }
  
  private static identifySuccessFactors(ice: any, matrix: any, index: number): string[] {
    return ['Apoio da liderança', 'Processo bem documentado', 'Equipe técnica qualificada'];
  }
}

export default {
  DISCOVERY_METHODOLOGY_PROMPTS,
  DiscoveryBusinessCaseGenerator
};
