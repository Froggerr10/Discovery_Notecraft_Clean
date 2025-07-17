// lib/ai-processor.ts
// Processador de Insights IA para Discovery Notecraft™

import { QuestionResponseService } from './supabase';
import { Question } from './types';
import { QUESTIONS, SECTION_RESPONSIBILITIES } from './questions';

export interface AIInsightData {
  question_type: string;
  section_id: number;
  response_complexity: 'simple' | 'complex';
  has_observations: boolean;
  interaction_metadata: {
    browser_info: string;
    response_time: number;
    field_focus_count: number;
  };
}

export interface ProcessedInsights {
  strategic_importance: 'low' | 'medium' | 'high' | 'critical';
  automation_potential: number; // 0-100%
  complexity_score: number; // 1-5
  stakeholder_impact: string[];
  ai_recommendations: string[];
  sentiment_analysis: 'positive' | 'neutral' | 'negative' | 'mixed';
  priority_flag: boolean;
  follow_up_questions: string[];
  timestamp: string;
}

export class AIInsightProcessor {
  
  // Processa insights automaticamente após resposta
  static async processResponse(
    questionId: number,
    responseValue: any,
    observations: string,
    aiRawData: AIInsightData
  ): Promise<ProcessedInsights> {
    
    const question = QUESTIONS.find(q => q.id === questionId);
    if (!question) throw new Error('Questão não encontrada');

    const section = SECTION_RESPONSIBILITIES.find(s => s.id === question.section_id);
    
    const insights: ProcessedInsights = {
      strategic_importance: this.calculateStrategicImportance(question, responseValue, section?.priority),
      automation_potential: this.calculateAutomationPotential(question, responseValue, observations),
      complexity_score: this.calculateComplexityScore(responseValue, observations, aiRawData),
      stakeholder_impact: this.identifyStakeholderImpact(question, responseValue),
      ai_recommendations: this.generateAIRecommendations(question, responseValue, observations),
      sentiment_analysis: this.analyzeSentiment(observations, responseValue),
      priority_flag: this.shouldFlagForPriority(question, responseValue, observations),
      follow_up_questions: this.generateFollowUpQuestions(question, responseValue),
      timestamp: new Date().toISOString()
    };

    return insights;
  }

  // Calcula importância estratégica
  private static calculateStrategicImportance(
    question: Question, 
    response: any, 
    sectionPriority?: string
  ): 'low' | 'medium' | 'high' | 'critical' {
    
    // Seções críticas têm peso maior
    if (sectionPriority === 'CRÍTICA') return 'critical';
    if (sectionPriority === 'ALTA') return 'high';
    
    // Questões sobre IA e automação são sempre importantes
    if (question.text.toLowerCase().includes('ia') || 
        question.text.toLowerCase().includes('automação') ||
        question.text.toLowerCase().includes('inteligência artificial')) {
      return 'critical';
    }
    
    // Questões sobre ROI e valor
    if (question.text.toLowerCase().includes('roi') || 
        question.text.toLowerCase().includes('valor') ||
        question.text.toLowerCase().includes('investimento')) {
      return 'high';
    }
    
    if (sectionPriority === 'MÉDIA') return 'medium';
    return 'low';
  }

  // Calcula potencial de automação (0-100%)
  private static calculateAutomationPotential(
    question: Question,
    response: any,
    observations: string
  ): number {
    let score = 0;
    
    // Questões sobre processos manuais = alto potencial
    if (typeof response === 'string' && 
        (response.includes('manual') || response.includes('planilha') || response.includes('repetitivo'))) {
      score += 40;
    }
    
    // Observações sobre tempo gasto = potencial de otimização
    if (observations.toLowerCase().includes('tempo') || 
        observations.toLowerCase().includes('demorado') ||
        observations.toLowerCase().includes('repetitivo')) {
      score += 30;
    }
    
    // Questões sobre pesquisa e análise = candidatos a IA
    if (question.text.toLowerCase().includes('pesquisa') ||
        question.text.toLowerCase().includes('análise') ||
        question.text.toLowerCase().includes('relatório')) {
      score += 20;
    }
    
    // Se já existe automação = base para expandir
    if (typeof response === 'string' && response.includes('automático')) {
      score += 10;
    }
    
    return Math.min(score, 100);
  }

  // Calcula score de complexidade (1-5)
  private static calculateComplexityScore(
    response: any,
    observations: string,
    metadata: AIInsightData
  ): number {
    let score = 1;
    
    // Resposta complexa (arrays, objetos)
    if (metadata.response_complexity === 'complex') score += 1;
    
    // Tem observações detalhadas
    if (observations && observations.length > 100) score += 1;
    
    // Múltiplas opções selecionadas (checkbox)
    if (Array.isArray(response) && response.length > 3) score += 1;
    
    // Tempo de resposta alto (indecisão)
    if (metadata.interaction_metadata.response_time > 30000) score += 1;
    
    return Math.min(score, 5);
  }

  // Identifica stakeholders impactados
  private static identifyStakeholderImpact(question: Question, response: any): string[] {
    const stakeholders: string[] = [];
    
    // Baseado na seção
    switch (question.section_id) {
      case 1: case 4: case 5: // Estratégico
        stakeholders.push('Diretoria', 'Sócios');
        break;
      case 2: case 6: case 11: // Tecnologia
        stakeholders.push('CTO', 'TI', 'Desenvolvimento');
        break;
      case 8: case 9: // Comercial
        stakeholders.push('Vendas', 'Marketing', 'Comercial');
        break;
      case 7: // RH
        stakeholders.push('RH', 'Gestão de Pessoas');
        break;
      case 10: // Jurídico
        stakeholders.push('Jurídico', 'Compliance');
        break;
      default:
        stakeholders.push('Operacional');
    }
    
    return stakeholders;
  }

  // Gera recomendações IA
  private static generateAIRecommendations(
    question: Question,
    response: any,
    observations: string
  ): string[] {
    const recommendations: string[] = [];
    
    // Recomendações baseadas em patterns
    if (question.text.toLowerCase().includes('manual') && 
        typeof response === 'string' && response.includes('sim')) {
      recommendations.push('Candidato ideal para automação via IA');
      recommendations.push('Implementar RPA ou workflow automatizado');
    }
    
    if (question.text.toLowerCase().includes('pesquisa') ||
        question.text.toLowerCase().includes('juridica')) {
      recommendations.push('RAG (Retrieval Augmented Generation) recomendado');
      recommendations.push('Base de conhecimento IA para acelerar pesquisas');
    }
    
    if (question.text.toLowerCase().includes('relatorio') ||
        question.text.toLowerCase().includes('proposta')) {
      recommendations.push('Gerador automático de documentos com IA');
      recommendations.push('Templates inteligentes com preenchimento automático');
    }
    
    return recommendations;
  }

  // Análise de sentimento
  private static analyzeSentiment(observations: string, response: any): 'positive' | 'neutral' | 'negative' | 'mixed' {
    if (!observations) return 'neutral';
    
    const text = observations.toLowerCase();
    const positiveWords = ['bom', 'ótimo', 'excelente', 'satisfeito', 'eficiente', 'rápido'];
    const negativeWords = ['ruim', 'lento', 'difícil', 'problema', 'demora', 'complexo', 'frustrante'];
    
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;
    
    if (positiveCount > 0 && negativeCount > 0) return 'mixed';
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // Determina se deve ser flagado para prioridade
  private static shouldFlagForPriority(question: Question, response: any, observations: string): boolean {
    // Questões críticas sempre flagadas
    const section = SECTION_RESPONSIBILITIES.find(s => s.id === question.section_id);
    if (section?.priority === 'CRÍTICA') return true;
    
    // Respostas que indicam problemas graves
    if (typeof response === 'string' && 
        (response.includes('não') || response.includes('nunca') || response.includes('difícil'))) {
      return true;
    }
    
    // Observações que indicam urgência
    if (observations && 
        (observations.toLowerCase().includes('urgente') || 
         observations.toLowerCase().includes('crítico') ||
         observations.toLowerCase().includes('bloqueio'))) {
      return true;
    }
    
    return false;
  }

  // Gera perguntas de follow-up
  private static generateFollowUpQuestions(question: Question, response: any): string[] {
    const followUps: string[] = [];
    
    // Se resposta indica automação possível
    if (typeof response === 'string' && response.includes('manual')) {
      followUps.push('Quanto tempo é gasto mensalmente nesta atividade?');
      followUps.push('Quantas pessoas estão envolvidas neste processo?');
      followUps.push('Qual seria o impacto de automatizar isto?');
    }
    
    // Se resposta indica problemas
    if (typeof response === 'string' && response.includes('não')) {
      followUps.push('Qual seria o principal benefício de resolver isto?');
      followUps.push('Há planos para implementar melhorias?');
    }
    
    return followUps;
  }
}

// Função para integrar com o salvamento automático
export async function processAndSaveInsights(
  sessionId: string,
  questionId: number,
  responseValue: any,
  observations: string,
  aiRawData: string
): Promise<void> {
  try {
    // Parse dos dados brutos do campo hidden
    const parsedAIData: AIInsightData = JSON.parse(aiRawData);
    
    // Processa insights
    const insights = await AIInsightProcessor.processResponse(
      questionId,
      responseValue,
      observations,
      parsedAIData
    );
    
    // Salva no banco (busca por session_id + question_id)
    const existingResponse = await QuestionResponseService.getResponse(sessionId, questionId);
    
    if (existingResponse) {
      // Atualiza insights na resposta existente
      await QuestionResponseService.updateAIInsights((existingResponse as any).id, insights);
    }
    
    console.log(`✅ Insights IA processados para questão ${questionId}:`, insights);
  } catch (error) {
    console.error('❌ Erro ao processar insights IA:', error);
  }
}
