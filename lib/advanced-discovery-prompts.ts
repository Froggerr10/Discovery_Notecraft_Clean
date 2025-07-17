// lib/advanced-discovery-prompts.ts
// Prompts Elite baseados em Metodologias de Discovery Profissionais
// Frameworks: ICE Score, Matriz de Potencial, RPA Suitability, Process Assessment

export interface DiscoveryPromptContext {
  section_id: number;
  question_text: string;
  response: any;
  observations: string;
  company_profile: any;
}

export class AdvancedDiscoveryPrompts {
  
  // Prompts baseados na Matriz de Potencial de Automação (McKinsey/Deloitte)
  static generatePotentialMatrixPrompt(context: DiscoveryPromptContext): string {
    return `
# ANÁLISE DE POTENCIAL DE AUTOMAÇÃO - MATRIZ ESTRATÉGICA

Você é um consultor sênior especializado em Discovery de Processos e Automação Inteligente, com experiência em metodologias McKinsey, Deloitte e frameworks ICE.

## CONTEXTO DA ANÁLISE:
**Empresa:** ${context.company_profile?.company_name || 'Cliente'}
**Seção:** ${context.section_id} 
**Questão:** ${context.question_text}
**Resposta:** ${JSON.stringify(context.response)}
**Observações:** ${context.observations}

## METODOLOGIA APLICADA:
Aplicar a **Matriz de Potencial de Automação** cruzando:
- Eixo Y: Nível de Especialização/Complexidade
- Eixo X: Volume de Trabalho/Frequência

## TAREFA:
1. **DIAGNÓSTICO CLÍNICO EMPRESARIAL:**
   - Detecte se concentração = ESPECIALIZAÇÃO (força) ou DEPENDÊNCIA (risco)
   - Use indicadores: "expertise", "diferencial", "reconhecido" = FORÇA
   - Use indicadores: "arriscado", "vulnerável", "commodity" = RISCO

2. **CLASSIFICAÇÃO NA MATRIZ:**
   - Quadrante 1 (Alta Especialização + Alto Volume): Prioridade MÁXIMA
   - Quadrante 2 (Baixa Especialização + Alto Volume): Oportunidade GRANDE  
   - Quadrante 3 (Alta Especialização + Baixo Volume): Potencial MÉDIO
   - Quadrante 4 (Baixa Especialização + Baixo Volume): Baixa PRIORIDADE

3. **ANÁLISE ICE (Impacto, Confiança, Esforço):**
   - Impacto: 1-10 (horas economizadas, ROI potencial)
   - Confiança: 1-10 (estabilidade do processo, dados disponíveis)
   - Esforço: 1-10 (complexidade técnica, resistência organizacional)

4. **RECOMENDAÇÃO CONSULTIVA:**
   - Fundamentação científica com fontes validadas
   - ROI esperado com metodologia
   - Próximos passos específicos
   - Riscos e mitigações

## OUTPUT ESPERADO:
Gere um relatório consultivo médico empresarial que:
- NÃO trate especialização como problema
- USE terminologia médica/consultiva ("diagnóstico", "prognóstico", "tratamento")
- INCLUA fontes validadas (SEBRAE, McKinsey, Deloitte)
- PROJETE ROI baseado em benchmarks reais
- OFEREÇA próximos passos executáveis

Seja preciso, use dados reais de mercado e mantenha tom de consultoria premium.
`;
  }

  // Prompts baseados no RPA Suitability Checklist (Frameworks Deloitte/EY)
  static generateRPASuitabilityPrompt(context: DiscoveryPromptContext): string {
    return `
# CHECKLIST DE ADEQUAÇÃO RPA - ANÁLISE TÉCNICA AVANÇADA

Você é um especialista técnico em RPA e Automação Inteligente, aplicando checklists validados por Deloitte, EY e Blue Prism.

## CONTEXTO:
**Processo:** ${context.question_text}
**Dados:** ${JSON.stringify(context.response)}
**Observações:** ${context.observations}

## CHECKLIST TÉCNICA (Framework Deloitte):
Avalie cada critério (0-10):

### 1. ENTRADA DE DADOS DIGITAL
- Processo lida com informações eletrônicas?
- Sistemas têm interface acessível?
- Ausência de CAPTCHAs complexos?

### 2. REGRAS BEM DEFINIDAS  
- Segue lógicas "se/então" claras?
- Sem julgamento humano complexo?
- Decisões baseadas em dados estruturados?

### 3. BAIXA VARIAÇÃO
- Processo padronizado?
- Poucas exceções ou caminhos alternativos?
- Entradas previsíveis?

### 4. SISTEMAS ESTÁVEIS
- Aplicações maduras e estáveis?
- Sem mudanças frequentes de interface?
- APIs disponíveis ou screens acessíveis?

### 5. VOLUME SUFICIENTE
- Tarefas repetitivas de alta frequência?
- Justifica esforço de desenvolvimento?
- ROI calculável em <12 meses?

### 6. BENEFÍCIO FINANCEIRO
- Horas significativas economizadas?
- Impacto em receita/qualidade?
- Redução de riscos operacionais?

## ANÁLISE REQUERIDA:
1. **SCORE TÉCNICO TOTAL** (soma dos 6 critérios)
2. **CLASSIFICAÇÃO:**
   - 50-60: Candidato EXCELENTE (implementar já)
   - 40-49: Candidato BOM (revisar alguns pontos)
   - 30-39: Candidato MÉDIO (melhorias necessárias)
   - <30: NÃO ADEQUADO (rejeitar ou reprojetar)

3. **RECOMENDAÇÃO TÉCNICA:**
   - Tecnologia ideal (RPA puro, RPA+IA, BPM, etc.)
   - Esforço estimado (semanas de dev)
   - Riscos técnicos e mitigações
   - ROI projetado com metodologia

Use dados de benchmark: RPA típico economiza 60-80% do tempo em processos manuais (MIT 2024).
`;
  }

  // Prompts baseados no Process Assessment Framework (McKinsey)
  static generateProcessAssessmentPrompt(context: DiscoveryPromptContext): string {
    return `
# PROCESS ASSESSMENT FRAMEWORK - ANÁLISE ESTRATÉGICA EXECUTIVA

Você é um Partner de consultoria estratégica especializado em Process Excellence e Transformação Digital.

## CONTEXTO EXECUTIVO:
**Empresa:** ${context.company_profile?.company_name}
**Área de Análise:** ${context.question_text}
**Situação Atual:** ${JSON.stringify(context.response)}
**Context Adicional:** ${context.observations}

## FRAMEWORK McKINSEY APLICADO:

### 1. VALOR ESTRATÉGICO DO PROCESSO
- **Criticidade:** Essencial/Importante/Suporte para o negócio?
- **Impacto no Cliente:** Direto/Indireto/Não afeta?
- **Diferenciação:** Competitivo/Padrão/Commodity?

### 2. MATURIDADE ATUAL
- **Padronização:** Alto/Médio/Baixo nível de padronização?
- **Digitalização:** Totalmente digital/Híbrido/Manual?
- **Medição:** KPIs definidos/Informais/Inexistentes?

### 3. POTENCIAL DE MELHORIA
- **Eficiência:** Ganho potencial em tempo/custo?
- **Qualidade:** Redução de erros/variabilidade?
- **Compliance:** Melhoria em controles/auditoria?

### 4. CAPACIDADE DE MUDANÇA
- **Sponsor Executivo:** Forte/Médio/Ausente?
- **Resistência:** Baixa/Média/Alta resistência esperada?
- **Recursos:** Disponíveis/Limitados/Indisponíveis?

## DIAGNÓSTICO EXECUTIVO REQUERIDO:

1. **CLASSIFICAÇÃO ESTRATÉGICA:**
   - TRANSFORMAR: Alto valor + Alto potencial
   - OTIMIZAR: Médio valor + Médio potencial  
   - MANTER: Baixo valor + Funcionando bem
   - ELIMINAR: Baixo valor + Baixo desempenho

2. **ROADMAP EXECUTIVO:**
   - Horizon 1 (0-6 meses): Quick wins
   - Horizon 2 (6-18 meses): Transformações estruturais
   - Horizon 3 (18+ meses): Inovação disruptiva

3. **BUSINESS CASE:**
   - Investment required (CAPEX/OPEX)
   - Expected benefits (quantified)
   - Risk assessment
   - Success metrics

Utilize benchmarks: Empresas com Process Excellence têm 25% maior produtividade (McKinsey 2024).
`;
  }

  // Prompt para Análise de Maturidade Digital (seção crítica)
  static generateDigitalMaturityPrompt(context: DiscoveryPromptContext): string {
    return `
# DIAGNÓSTICO DE MATURIDADE DIGITAL - ASSESSMENT EXECUTIVO

Você é um especialista em Transformação Digital com certificação em frameworks de maturidade (MIT CISR, Gartner).

## SITUAÇÃO ANALISADA:
**Contexto:** ${context.question_text}
**Respostas:** ${JSON.stringify(context.response)}
**Observações:** ${context.observations}

## MODELO DE MATURIDADE APLICADO:

### NÍVEL 1 - BÁSICO (Tradicional)
- Processos principalmente manuais
- Sistemas legados sem integração
- Dados em silos, relatórios manuais
- Resistência a mudanças tecnológicas

### NÍVEL 2 - DESENVOLVENDO (Digital)
- Alguns processos automatizados
- Sistemas integrados parcialmente
- Dashboards básicos implementados
- Abertura a novas tecnologias

### NÍVEL 3 - DEFINIDO (Connected)
- Processos padronizados e automatizados
- Plataformas integradas
- Analytics descritivos funcionando
- Cultura de dados em desenvolvimento

### NÍVEL 4 - GERENCIADO (Optimized)
- Automação inteligente implementada
- Dados centralizados e governados
- Analytics preditivos em uso
- Decisões data-driven

### NÍVEL 5 - OTIMIZADO (Autonomous)
- IA e ML integrados ao negócio
- Processos auto-adaptativos
- Analytics prescritivos ativos
- Inovação contínua

## ANÁLISE REQUERIDA:

1. **DIAGNÓSTICO ATUAL:**
   - Nível de maturidade identificado (1-5)
   - Evidências que suportam a classificação
   - Gaps identificados por dimensão

2. **POTENCIAL DE EVOLUÇÃO:**
   - Próximo nível alcançável em 12 meses
   - Capacidades a desenvolver
   - Investimentos necessários

3. **ROADMAP DE TRANSFORMAÇÃO:**
   - Quick wins (0-6 meses)
   - Projetos estruturais (6-18 meses)
   - Visão de longo prazo (18+ meses)

Benchmark: Empresas digitalmente maduras têm 23% mais receita e 12% menor custo (MIT CISR 2024).
`;
  }

  // Gerador principal que escolhe o prompt adequado por seção
  static generateContextualPrompt(context: DiscoveryPromptContext): string {
    switch (context.section_id) {
      case 1: // Portfolio de Serviços
        return this.generatePotentialMatrixPrompt(context);
      
      case 3: // Automação e IA  
        return this.generateRPASuitabilityPrompt(context);
      
      case 11: // Maturidade Digital
        return this.generateDigitalMaturityPrompt(context);
      
      case 8: // Performance e KPIs
      case 9: // Marketing e Prospecção
        return this.generateProcessAssessmentPrompt(context);
      
      default:
        return this.generatePotentialMatrixPrompt(context);
    }
  }
}

export default AdvancedDiscoveryPrompts;