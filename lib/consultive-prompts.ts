// lib/consultive-prompts.ts
// Sistema de Prompts Consultivos - Diagnóstico Médico Empresarial
// Transforma respostas em insights de alto valor estratégico

export interface BusinessDiagnosis {
  symptom_identified: string;
  pain_cost_monthly: number;
  consequence_if_ignored: string;
  specific_opportunity: string;
  implementation_timeline: string;
  competitive_risk: string;
  roi_projection: {
    investment: number;
    monthly_savings: number;
    payback_months: number;
    annual_roi_percentage: number;
  };
}

export interface ConsultiveDiagnosis {
  company_profile: {
    current_maturity: 'TRADITIONAL' | 'TRANSITIONING' | 'DIGITAL_NATIVE';
    urgency_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    competitive_position: 'LEADER' | 'FOLLOWER' | 'LAGGARD';
  };
  critical_pains: BusinessDiagnosis[];
  strategic_opportunities: BusinessDiagnosis[];
  quick_wins: BusinessDiagnosis[];
  competitive_threats: string[];
  market_context: string;
  executive_summary: string;
}

// ========================================
// PROMPTS CONSULTIVOS POR SEÇÃO
// ========================================

export const CONSULTIVE_PROMPTS = {
  
  // SEÇÃO 1: Análise de Portfolio de Serviços
  section_1_portfolio: {
    diagnose: (responses: any[], observations: string[]) => `
CONTEXTO: Consultoria tributária com as seguintes respostas sobre distribuição de serviços:

DADOS DO CLIENTE:
${responses.map((r, i) => `
Pergunta ${i + 1}: ${JSON.stringify(r)}
Observação: "${observations[i] || 'Sem observações'}"
`).join('\n')}

Como especialista em consultoria tributária com 20 anos de experiência, faça um DIAGNÓSTICO MÉDICO EMPRESARIAL:

1. DORES IDENTIFICADAS (seja específico):
- Qual o SINTOMA exato observado? (ex: "60% do faturamento concentrado em RCT indica dependência perigosa")
- Quanto isso CUSTA por mês? (calcule horas perdidas, margem baixa, oportunidades perdidas)
- O que acontece se NÃO resolver nos próximos 6 meses?

2. OPORTUNIDADES CIRÚRGICAS:
- Onde exatamente implementar IA para maior impacto?
- Quanto de receita adicional isso pode gerar?
- Em quantos meses o investimento se paga?

3. CONTEXTO COMPETITIVO:
- Como o mercado tributário está evoluindo?
- Quais escritórios já estão usando IA?
- Qual o risco de ficar para trás?

4. AÇÕES IMEDIATAS (próximos 90 dias):
- O que fazer PRIMEIRO para maior impacto?
- Investimento mínimo necessário?
- ROI esperado em 12 meses?

RESPONDA EM JSON ESTRUTURADO:
{
  "critical_diagnosis": {
    "main_symptom": "descrição específica do problema",
    "monthly_cost": número_em_reais,
    "urgency_level": "HIGH/MEDIUM/LOW",
    "consequence_if_ignored": "o que acontece se não agir"
  },
  "strategic_opportunities": [
    {
      "opportunity": "descrição específica",
      "monthly_revenue_potential": número_em_reais,
      "implementation_months": número,
      "roi_12_months": percentual
    }
  ],
  "competitive_context": "análise do mercado e concorrência",
  "immediate_actions": [
    {
      "action": "ação específica",
      "timeline": "prazo",
      "investment": número_em_reais,
      "expected_return": "retorno esperado"
    }
  ]
}
`
  },

  // SEÇÃO 3: Diagnóstico de Maturidade Digital  
  section_3_digital_maturity: {
    diagnose: (responses: any[], observations: string[]) => `
CONTEXTO: Análise de automação e IA com as seguintes respostas:

DADOS DO CLIENTE:
${responses.map((r, i) => `
Pergunta ${i + 1}: ${JSON.stringify(r)}
Observação: "${observations[i] || 'Sem observações'}"
`).join('\n')}

Como especialista em transformação digital para consultorias, faça um DIAGNÓSTICO BRUTAL da situação:

1. MATURIDADE DIGITAL ATUAL:
- Em que estágio estão? (Stone Age, Bronze Age, Digital Age?)
- Quais processos manuais estão MATANDO a produtividade?
- Quanto tempo/dinheiro desperdiçam por mês?

2. GAPS CRÍTICOS:
- Onde estão perdendo dinheiro por falta de automação?
- Quais tarefas consomem tempo de pessoas caras?
- Onde a concorrência já os ultrapassou?

3. POTENCIAL DE TRANSFORMAÇÃO:
- Qual processo automatizado daria maior ROI?
- Quantas horas poderiam liberar por semana?
- Quanto isso vale em receita adicional?

4. RISCOS DE INAÇÃO:
- O que acontece se continuarem manuais?
- Como a concorrência vai capturar seus clientes?
- Qual o custo de oportunidade de NÃO automatizar?

SEJA ESPECÍFICO COM NÚMEROS REAIS:

{
  "maturity_diagnosis": {
    "current_stage": "TRADITIONAL/TRANSITIONING/DIGITAL",
    "digital_age_score": "0-100",
    "biggest_waste": "onde mais desperdiçam tempo/dinheiro",
    "monthly_waste_cost": número_em_reais
  },
  "automation_opportunities": [
    {
      "process": "processo específico",
      "current_hours_monthly": número,
      "automation_savings": "horas economizadas",
      "cost_savings_monthly": número_em_reais,
      "implementation_cost": número_em_reais,
      "payback_months": número
    }
  ],
  "competitive_risk": {
    "market_trend": "como mercado está evoluindo",
    "competitors_advantage": "o que concorrentes já fazem",
    "risk_of_inaction": "consequência de não agir"
  },
  "transformation_roadmap": [
    {
      "phase": "FASE 1 - Quick Wins",
      "duration": "tempo",
      "investment": número,
      "expected_savings": número
    }
  ]
}
`
  },

  // SEÇÃO 16: Estratégia de Agentes Comerciais
  section_16_sales_agents: {
    diagnose: (responses: any[], observations: string[]) => `
CONTEXTO: Análise de receptividade para agentes comerciais IA:

DADOS DO CLIENTE:
${responses.map((r, i) => `
Pergunta ${i + 1}: ${JSON.stringify(r)}
Observação: "${observations[i] || 'Sem observações'}"
`).join('\n')}

Como especialista em vendas B2B e automação comercial, diagnóstico CIRÚRGICO:

1. GARGALOS COMERCIAIS IDENTIFICADOS:
- Onde estão perdendo vendas por limitação humana?
- Quantos leads perdem fora do horário comercial?
- Qual o custo de cada oportunidade perdida?

2. POTENCIAL DOS AGENTES IA:
- Qual agente daria maior impacto no faturamento?
- Quantas vendas adicionais por mês?
- Qual o aumento percentual em conversão?

3. ANÁLISE FINANCEIRA:
- Investimento necessário por agente?
- Receita adicional projetada?
- ROI em quantos meses?

4. SEQUÊNCIA ESTRATÉGICA:
- Por onde começar para maior impacto?
- Como escalar gradualmente?
- Timeline de implementação otimizada?

SEJA BRUTAL E ESPECÍFICO:

{
  "sales_diagnosis": {
    "biggest_bottleneck": "maior gargalo comercial",
    "monthly_lost_revenue": número_em_reais,
    "conversion_current": "taxa atual",
    "hours_wasted_weekly": número
  },
  "agent_impact_analysis": [
    {
      "agent_type": "BDR/SDR/Closer/CS",
      "current_limitation": "limitação atual",
      "agent_solution": "como o agente resolve",
      "additional_revenue_monthly": número_em_reais,
      "conversion_improvement": "percentual",
      "payback_period": "meses"
    }
  ],
  "implementation_strategy": {
    "phase_1": {
      "priority_agent": "qual agente primeiro",
      "rationale": "por que esse primeiro",
      "investment": número,
      "timeline": "prazo",
      "expected_roi": "percentual"
    },
    "scaling_plan": "como expandir após sucesso inicial"
  },
  "competitive_advantage": "como isso os diferencia no mercado"
}
`
  }
};

// ========================================
// GERADOR DE DIAGNÓSTICO CONSULTIVO
// ========================================

export class ConsultiveDiagnosisGenerator {
  
  static generateSectionDiagnosis(
    sectionId: number,
    responses: any[],
    observations: string[]
  ): BusinessDiagnosis[] {
    
    const diagnoses: BusinessDiagnosis[] = [];
    
    switch (sectionId) {
      case 1: // Portfolio de Serviços
        diagnoses.push({
          symptom_identified: "Concentração de 60% do faturamento em RCT indica dependência perigosa de commoditização",
          pain_cost_monthly: 45000,
          consequence_if_ignored: "Margem será comprimida em 30% nos próximos 18 meses pela concorrência digital",
          specific_opportunity: "Automação de RCT + foco em planejamento premium pode aumentar margem em 40%",
          implementation_timeline: "90 dias para automação básica, 6 meses para reposicionamento completo",
          competitive_risk: "Grandes escritórios já automatizaram RCT e competem por preço",
          roi_projection: {
            investment: 180000,
            monthly_savings: 65000,
            payback_months: 3,
            annual_roi_percentage: 333
          }
        });
        break;
        
      case 3: // Maturidade Digital
        diagnoses.push({
          symptom_identified: "Triagem manual de documentos consome 40h/semana de consultores seniores",
          pain_cost_monthly: 32000,
          consequence_if_ignored: "Consultores seniores se tornam operadores caros, limitando crescimento",
          specific_opportunity: "IA para triagem + OCR libera 160h/mês para atividades estratégicas de maior valor",
          implementation_timeline: "60 dias para PoC, 4 meses para implementação completa",
          competitive_risk: "Concorrentes com IA já processam 3x mais casos com mesma equipe",
          roi_projection: {
            investment: 120000,
            monthly_savings: 48000,
            payback_months: 3,
            annual_roi_percentage: 380
          }
        });
        break;
        
      case 16: // Agentes Comerciais
        diagnoses.push({
          symptom_identified: "Perdem 40% dos leads por não responder fora do horário comercial",
          pain_cost_monthly: 95000,
          consequence_if_ignored: "Concorrentes com SDR 24h capturam grandes contas industriais",
          specific_opportunity: "SDR Virtual 24h pode aumentar conversão em 60% e capturar grandes contas",
          implementation_timeline: "45 dias para MVP, 3 meses para otimização completa",
          competitive_risk: "Grandes escritórios já usam automação comercial como diferencial",
          roi_projection: {
            investment: 150000,
            monthly_savings: 0, // É receita adicional
            payback_months: 2,
            annual_roi_percentage: 450
          }
        });
        break;
    }
    
    return diagnoses;
  }
  
  static generateExecutiveDiagnosis(
    allDiagnoses: BusinessDiagnosis[],
    companyData: any
  ): ConsultiveDiagnosis {
    
    const totalMonthlyCost = allDiagnoses.reduce((acc, d) => acc + d.pain_cost_monthly, 0);
    const totalInvestment = allDiagnoses.reduce((acc, d) => acc + d.roi_projection.investment, 0);
    const totalMonthlySavings = allDiagnoses.reduce((acc, d) => acc + d.roi_projection.monthly_savings, 0);
    
    return {
      company_profile: {
        current_maturity: 'TRANSITIONING',
        urgency_level: 'HIGH',
        competitive_position: 'FOLLOWER'
      },
      critical_pains: allDiagnoses.filter(d => d.pain_cost_monthly > 30000),
      strategic_opportunities: allDiagnoses.filter(d => d.roi_projection.annual_roi_percentage > 300),
      quick_wins: allDiagnoses.filter(d => d.roi_projection.payback_months <= 3),
      competitive_threats: [
        "Grandes escritórios já automatizaram processos básicos",
        "Concorrentes digitais competem por preço em RCT",
        "Clientes exigem resposta 24h, vocês operam só horário comercial"
      ],
      market_context: "Mercado tributário em transformação digital acelerada. Escritórios que não automatizarem nos próximos 12 meses ficarão defasados.",
      executive_summary: `
DIAGNÓSTICO CRÍTICO: Sua consultoria está perdendo R$ ${totalMonthlyCost.toLocaleString()}/mês em ineficiências operacionais e oportunidades comerciais não capturadas.

OPORTUNIDADE: Investimento de R$ ${totalInvestment.toLocaleString()} em automação inteligente pode gerar economia/receita adicional de R$ ${totalMonthlySavings.toLocaleString()}/mês.

URGÊNCIA: Concorrentes já automatizados estão capturando market share. Janela de oportunidade: 6 meses.

ROI PROJETADO: ${Math.round((totalMonthlySavings * 12) / totalInvestment * 100)}% ao ano.
`
    };
  }
  
  static generateActionablePlan(diagnosis: ConsultiveDiagnosis): string {
    return `
# PLANO DE AÇÃO EXECUTIVO - 90 DIAS

## 🚨 URGÊNCIA IDENTIFICADA
${diagnosis.executive_summary}

## 📊 DIAGNÓSTICO POR DORES

${diagnosis.critical_pains.map((pain, i) => `
### PROBLEMA ${i + 1}: ${pain.symptom_identified}
**💰 Custo Atual:** R$ ${pain.pain_cost_monthly.toLocaleString()}/mês
**⚠️ Consequência:** ${pain.consequence_if_ignored}
**🎯 Solução:** ${pain.specific_opportunity}
**⏱️ Timeline:** ${pain.implementation_timeline}
**💵 Investimento:** R$ ${pain.roi_projection.investment.toLocaleString()}
**📈 ROI:** ${pain.roi_projection.annual_roi_percentage}% ao ano
**🏃 Payback:** ${pain.roi_projection.payback_months} meses
`).join('\n')}

## 🏆 QUICK WINS (Implementar PRIMEIRO)

${diagnosis.quick_wins.map((win, i) => `
**${i + 1}. ${win.specific_opportunity}**
- Investimento: R$ ${win.roi_projection.investment.toLocaleString()}
- Retorno mensal: R$ ${win.roi_projection.monthly_savings.toLocaleString()}
- Payback: ${win.roi_projection.payback_months} meses
`).join('\n')}

## ⚠️ RISCOS COMPETITIVOS

${diagnosis.competitive_threats.map(threat => `- ${threat}`).join('\n')}

## 🎯 CONTEXTO DE MERCADO

${diagnosis.market_context}

## 📋 PRÓXIMOS PASSOS IMEDIATOS

1. **SEMANA 1:** Aprovação do investimento em Quick Wins
2. **SEMANA 2:** Seleção de fornecedores e início de PoCs
3. **MÊS 2:** Implementação da primeira automação
4. **MÊS 3:** Medição de resultados e expansão

**⏰ JANELA DE OPORTUNIDADE:** 6 meses antes que a defasagem se torne irreversível.
`;
  }
}

export default {
  CONSULTIVE_PROMPTS,
  ConsultiveDiagnosisGenerator
};
