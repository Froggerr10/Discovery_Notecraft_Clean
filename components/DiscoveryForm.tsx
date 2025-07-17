// components/DiscoveryForm.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS, getQuestionsBySection, getSectionById } from '@/lib/questions';
import { CNPJData } from '@/lib/cnpj-api';
import { SectionResponsible, QuestionResponse, AIInsights } from '@/lib/types';
import { QuestionResponseService, DiscoverySessionService, generateResponseId } from '@/lib/supabase';
import QuestionRenderer from './QuestionRenderer';
import QuestionStatus from './QuestionStatus';
import {
  CurrencyDollar,
  Handshake,
  Users,
  Scales,
  Cpu,
  Target,
  Headset,
  Briefcase
} from 'phosphor-react';


interface DiscoveryFormProps {
  sessionId: string;
  companyData: CNPJData;
  assignments: SectionResponsible[];
  onComplete: () => void;
}

export default function DiscoveryForm({
  sessionId,
  companyData,
  assignments,
  onComplete
}: DiscoveryFormProps) {
  // Gera o session_id uma única vez por ciclo de vida do componente
  const sessionIdRef = useRef<string>(sessionId && sessionId.includes('-') ? sessionId : crypto.randomUUID());
  const fixedSessionId = sessionIdRef.current;

  const [currentSection, setCurrentSection] = useState(1);
  const [responses, setResponses] = useState<Record<number, QuestionResponse>>({});
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');
  const [sectionProgress, setSectionProgress] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionCreated, setSessionCreated] = useState(false); // Novo estado para controlar criação da sessão
  const [responsesLoaded, setResponsesLoaded] = useState(false); // Flag para evitar sobrescrever respostas

  // Carregar respostas existentes
  useEffect(() => {
    if (!responsesLoaded) {
      loadExistingResponses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixedSessionId, responsesLoaded]);

  // Auto-save após mudanças no estado responses (OTIMIZADO)
  useEffect(() => {
    // Só salva se há respostas, a sessão foi criada, e o session_id é o correto
    if (Object.keys(responses).length === 0 || !sessionCreated || !fixedSessionId) {
      return;
    }
    // Debounce para evitar múltiplas chamadas
    const timeoutId = setTimeout(() => {
      // Log para depuração
      console.log('[AutoSave] Tentando salvar respostas. sessionCreated:', sessionCreated, 'sessionId:', fixedSessionId);
      saveCurrentResponses();
    }, 1000); // 1 segundo de debounce

    return () => {
      clearTimeout(timeoutId);
    };
  }, [JSON.stringify(responses), sessionCreated, fixedSessionId]);

  // Garantir que a sessão existe antes de salvar respostas (APENAS UMA VEZ)
  useEffect(() => {
    if (sessionCreated) {
      return; // Evita múltiplas criações
    }
    
    const createSessionIfNeeded = async () => {
      try {
        const sessionData = {
          id: fixedSessionId,
          cnpj: companyData.cnpj,
          company_name: companyData.nome,
          company_fantasy_name: companyData.fantasia || companyData.nome,
          company_size: companyData.porte,
          company_main_activity: companyData.atividade_principal?.[0]?.text,
          company_location: companyData.endereco ? `${companyData.endereco.municipio}/${companyData.endereco.uf}` : '',
          company_status: companyData.status,
          current_section: 1,
          completion_percentage: 0,
          section_responsibilities: {},
          session_metadata: companyData,
          user_agent: typeof window !== 'undefined' ? navigator.userAgent : ''
        };
        // Log para depuração
        console.log('[Sessão] Criando sessão no Supabase:', sessionData);
        await DiscoverySessionService.createSession(sessionData);
        console.log('[Sessão] Sessão criada com sucesso:', fixedSessionId);
        setSessionCreated(true); // Marca como criada
      } catch (error) {
        console.error('❌ Erro ao criar sessão:', error);
        setSessionCreated(true); // Marca como criada mesmo em erro para não tentar novamente
      }
    };

    createSessionIfNeeded();
  }, [fixedSessionId, companyData.cnpj, companyData.nome, sessionCreated]);

  // Carregar respostas já salvas
  const loadExistingResponses = async () => {
    try {
      const existingResponses = await QuestionResponseService.getSessionResponses(fixedSessionId);
      const responseMap: Record<number, QuestionResponse> = {};
      existingResponses.forEach(response => {
        responseMap[response.question_id] = {
          question_id: response.question_id,
          response: response.response_data,
          observations: response.observations,
          ai_aware_notes: response.ai_aware_notes
        };
      });
      setResponses(prev => {
        // Só sobrescreve se não houver respostas locais
        if (Object.keys(prev).length === 0) {
          return responseMap;
        }
        return prev;
      });
      calculateSectionProgress(responseMap);
      setResponsesLoaded(true);
    } catch (error) {
      console.error('Erro ao carregar respostas:', error);
      setResponsesLoaded(true);
    }
  };

  // Calcular progresso das seções
  const calculateSectionProgress = (responseMap: Record<number, QuestionResponse>) => {
    const progress: Record<number, number> = {};
    
    for (let sectionId = 1; sectionId <= 17; sectionId++) {
      const sectionQuestions = getQuestionsBySection(sectionId);
      const answeredQuestions = sectionQuestions.filter(q => responseMap[q.id]?.response);
      progress[sectionId] = Math.round((answeredQuestions.length / sectionQuestions.length) * 100);
    }
    
    setSectionProgress(progress);
    
    // Atualizar progresso total na sessão
    const totalQuestions = QUESTIONS.length;
    const totalAnswered = Object.keys(responseMap).filter(id => responseMap[parseInt(id)]?.response).length;
    const totalProgress = Math.round((totalAnswered / totalQuestions) * 100);
    
    DiscoverySessionService.updateProgress(fixedSessionId, currentSection, totalProgress);
  };

  // Salvar respostas automaticamente
  const saveCurrentResponses = async () => {
    // Verificar se há respostas e se a sessão foi criada
    if (Object.keys(responses).length === 0 || !sessionCreated) {
      return;
    }

    setAutoSaving(true);
    try {
      const unsavedResponses = Object.values(responses).filter(response => {
        const hasValue = response.response !== null && 
                        response.response !== undefined && 
                        response.response !== '' &&
                        (Array.isArray(response.response) ? response.response.length > 0 : true);
        return hasValue;
      });

      // Verificar se há respostas válidas para salvar
      if (unsavedResponses.length === 0) {
        return;
      }

      for (const response of unsavedResponses) {
        const question = QUESTIONS.find(q => q.id === response.question_id);
        const aiInsights = generateAIInsights(response, question);
        
        const dataToSave = {
          session_id: fixedSessionId,
          question_id: response.question_id,
          response_data: response.response,
          observations: response.observations || '',
          ai_aware_notes: JSON.stringify(aiInsights),
          section_id: question?.section_id || 1,
          response_time_seconds: null,
          is_required: question?.required || null
        };
        
        try {
          await QuestionResponseService.saveResponse(dataToSave);
          console.log('✅ Resposta salva:', `Q${response.question_id}`);
        } catch (error) {
          console.error('❌ Erro ao salvar resposta:', error);
        }
      }

      setLastSaved(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Erro ao salvar respostas:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  // Gerar insights IA para campo oculto
  const generateAIInsights = (response: QuestionResponse, question: any): AIInsights => {
    const responseText = typeof response.response === 'string' ? response.response : 
                        Array.isArray(response.response) ? response.response.join(', ') :
                        JSON.stringify(response.response);
    
    const observationsText = response.observations || '';
    const fullText = `${responseText} ${observationsText}`.toLowerCase();

    // Análise de sentimento básica
    const positiveWords = ['sim', 'bom', 'excelente', 'ótimo', 'satisfeito', 'eficiente'];
    const negativeWords = ['não', 'ruim', 'péssimo', 'insatisfeito', 'lento', 'problema'];
    
    const positiveCount = positiveWords.filter(word => fullText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => fullText.includes(word)).length;
    const sentimentScore = (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1);

    // Análise de complexidade
    const complexityIndicators = ['complexo', 'difícil', 'múltiplos', 'vários', 'customizado'];
    const complexityLevel = complexityIndicators.some(word => fullText.includes(word)) ? 'high' : 
                           fullText.length > 100 ? 'medium' : 'low';

    // Potencial de automação
    const automationKeywords = ['manual', 'repetitivo', 'padronizado', 'rotina', 'sempre igual'];
    const automationPotential = automationKeywords.filter(word => fullText.includes(word)).length * 0.2;

    // Importância estratégica
    const strategicKeywords = ['estratégico', 'crítico', 'importante', 'prioridade', 'diferencial'];
    const strategicImportance = strategicKeywords.filter(word => fullText.includes(word)).length * 0.25;

    return {
      sentiment_score: Math.max(-1, Math.min(1, sentimentScore)),
      complexity_level: complexityLevel as 'low' | 'medium' | 'high',
      strategic_importance: Math.min(1, strategicImportance),
      automation_potential: Math.min(1, automationPotential),
      key_topics: extractKeyTopics(fullText),
      recommendations: generateRecommendations(question, response),
      risk_factors: identifyRiskFactors(fullText),
      generated_at: new Date().toISOString()
    };
  };
  // Extrair tópicos principais
  const extractKeyTopics = (text: string): string[] => {
    const topics = ['automação', 'ia', 'digital', 'tecnologia', 'processo', 'cliente', 'vendas', 'marketing'];
    return topics.filter(topic => text.includes(topic));
  };

  // Gerar recomendações
  const generateRecommendations = (question: any, response: QuestionResponse): string[] => {
    const recommendations: string[] = [];
    
    if (question.section_id === 3) { // Seção de IA
      recommendations.push('Considerar implementação gradual de IA');
    }
    
    if (question.section_id === 1) { // Serviços
      recommendations.push('Avaliar potencial de automação dos serviços');
    }
    
    return recommendations;
  };

  // Identificar fatores de risco
  const identifyRiskFactors = (text: string): string[] => {
    const risks: string[] = [];
    
    if (text.includes('manual') || text.includes('papel')) {
      risks.push('Processo manual suscetível a erros');
    }
    
    if (text.includes('não temos') || text.includes('não existe')) {
      risks.push('Falta de padronização identificada');
    }
    
    return risks;
  };

  // Atualizar resposta
  const updateResponse = useCallback((questionId: number, value: any) => {
    setResponses(prev => {
      const question = QUESTIONS.find(q => q.id === questionId);
      let normalizedValue = value;
      if (question && question.type === 'checkbox') {
        // Sempre garantir array
        if (!Array.isArray(value)) {
          normalizedValue = value ? [value] : [];
        }
      }
      const newResponses = {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          question_id: questionId,
          response: normalizedValue
        }
      };
      return newResponses;
    });
  }, []);

  // Atualizar observações
  const updateObservations = useCallback((questionId: number, observations: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        question_id: questionId,
        observations: observations
      }
    }));
  }, []);

  // Atualizar progresso das seções em tempo real
  useEffect(() => {
    calculateSectionProgress(responses);
    // eslint-disable-next-line
  }, [responses]);

  // Navegar para seção anterior
  const goToPreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Navegar para próxima seção
  const goToNextSection = () => {
    if (currentSection < 17) {
      setCurrentSection(currentSection + 1);
    } else {
      // Finalizar questionário
      handleCompletion();
    }
  };

  // Finalizar Discovery
  const handleCompletion = async () => {
    try {
      await DiscoverySessionService.completeSession(fixedSessionId);
      setIsCompleted(true);
    } catch (error) {
      console.error('Erro ao finalizar discovery:', error);
    }
  };

  // Navegar diretamente para uma seção
  const goToSection = (sectionId: number) => {
    setCurrentSection(sectionId);
  };

  // Verificar se seção atual está completa
  const isCurrentSectionComplete = () => {
    const sectionQuestions = getQuestionsBySection(currentSection);
    const requiredQuestions = sectionQuestions.filter(q => q.required);
    
    return requiredQuestions.every(question => {
      const response = responses[question.id]?.response;
      return response && response !== '' && response !== null && response !== undefined;
    });
  };

  // Obter questões da seção atual
  const currentSectionQuestions = getQuestionsBySection(currentSection);
  const currentSectionMeta = getSectionById(currentSection);

  // Adicione o mapeamento de ícones SVG modernos para cada departamento antes do componente
  const departmentIcons = {
    'Estratégico': (
      <svg className="w-5 h-5 text-blue-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
        <path d="M7 13l3 3 7-7" />
      </svg>
    ),
    'Tecnologia': (
      <svg className="w-5 h-5 text-indigo-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M2 8h20" />
      </svg>
    ),
    'Comercial': (
      <svg className="w-5 h-5 text-green-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M16 12a4 4 0 01-8 0" />
        <path d="M12 16v6" />
        <path d="M8 20h8" />
      </svg>
    ),
    'Financeiro': (
      <svg className="w-5 h-5 text-yellow-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 8v8m0 0l-3-3m3 3l3-3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    'Recursos Humanos': (
      <svg className="w-5 h-5 text-pink-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0113 0" />
      </svg>
    ),
    'Jurídico': (
      <svg className="w-5 h-5 text-red-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 3v18" />
        <path d="M5 12h14" />
        <path d="M7 7h10M7 17h10" />
      </svg>
    ),
    'Operacional': (
      <svg className="w-5 h-5 text-gray-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    'Atendimento': (
      <svg className="w-5 h-5 text-teal-700 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V6a8 8 0 10-16 0v6c0 6 8 10 8 10z" />
      </svg>
    ),
  };

  // Função utilitária para remover emojis de strings
  function removeEmojis(str: string) {
    return str ? str.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83D[\uDC00-\uDE4F])/g, '').trim() : '';
  }

  // Renderizar sidebar de navegação
  const renderSidebar = () => (
    <aside className="w-[30rem] h-screen flex flex-col justify-between bg-gradient-to-b from-[#0a0f0d] to-[#1e293b] border-r border-white/10 p-6 overflow-y-auto shadow-2xl">
      <div>
        <h3 className="text-2xl font-bold text-[#4ade80] mb-6 tracking-tight drop-shadow-lg">Progresso Geral</h3>
        <div className="space-y-4">
          {Object.entries(sectionProgress).map(([sectionId, progress]) => {
            const meta = getSectionById(parseInt(sectionId));
            const isCurrent = parseInt(sectionId) === currentSection;
            // Ícones Phosphor modernos por departamento
            const departmentIconMap = {
              'Financeiro': <CurrencyDollar size={32} color="#4ade80" weight="regular" />,
              'Comercial': <Handshake size={32} color="#4ade80" weight="regular" />,
              'RH': <Users size={32} color="#4ade80" weight="regular" />,
              'Jurídico': <Scales size={32} color="#4ade80" weight="regular" />,
              'Tecnologia': <Cpu size={32} color="#4ade80" weight="regular" />,
              'Estratégico': <Target size={32} color="#4ade80" weight="regular" />,
              'Suporte': <Headset size={32} color="#4ade80" weight="regular" />,
              'default': <Briefcase size={32} color="#4ade80" weight="regular" />
            };
            const icon = (
              <span className="mr-3 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-[#14532d]/40 shadow-lg">
                {departmentIconMap[meta?.department] || departmentIconMap['default']}
              </span>
            );
            return (
              <button
                key={sectionId}
                onClick={() => goToSection(parseInt(sectionId))}
                className={`
                  w-full text-left rounded-2xl transition-all px-4 py-4 flex items-center gap-4 shadow-lg border-2
                  ${progress === 0 ? 'bg-[#1e293b]/80 text-slate-400 border-transparent' : ''}
                  ${progress > 0 && progress < 100 ? 'bg-yellow-50/10 text-yellow-200 border-yellow-400/20' : ''}
                  ${progress === 100 ? 'bg-emerald-900/30 text-emerald-300 border-emerald-400/40' : ''}
                  ${isCurrent ? 'ring-2 ring-[#4ade80] border-[#4ade80]' : ''}
                  hover:scale-[1.03] hover:shadow-2xl hover:border-[#4ade80]/60
                `}
              >
                {icon}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-semibold truncate text-white/90 drop-shadow-sm" style={{maxWidth:'28rem'}}>{removeEmojis(meta?.title)}</span>
                    <span className="flex items-center gap-1 ml-2">
                      <span className={`text-xl font-bold ${progress === 100 ? 'text-emerald-400' : progress > 0 ? 'text-yellow-300' : 'text-slate-400'}`}>{progress}%</span>
                      {progress === 100 && (
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-[#14532d]/30 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${progress === 100 ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-400/30' : progress > 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-200' : 'bg-slate-700'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Status de salvamento sempre no rodapé da sidebar */}
      <div className="border-t border-white/10 pt-4 mt-4">
        <div className="flex items-center gap-2 text-sm">
          {autoSaving ? (
            <>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400">Salvando...</span>
            </>
          ) : lastSaved ? (
            <>
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-emerald-400">Salvo {lastSaved}</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-slate-400 rounded-full" />
              <span className="text-slate-400">Não salvo</span>
            </>
          )}
        </div>
      </div>
    </aside>
  );

  // Função utilitária para checar se a questão está respondida corretamente
  function isQuestionAnswered(question, value) {
    if (!question || value === undefined || value === null) return false;

    if (question.type === 'slider_percentage') {
      // Deve ser objeto com todas as opções preenchidas (>0) e total 100%
      if (typeof value !== 'object' || Array.isArray(value)) return false;
      const options = question.options || [];
      const allFilled = options.every(opt => typeof value[opt] === 'number' && value[opt] > 0);
      const total = options.reduce((sum, opt) => sum + (typeof value[opt] === 'number' ? value[opt] : 0), 0);
      return allFilled && total === 100;
    }
    if (question.type === 'slider') {
      // Slider simples: só precisa ter valor numérico
      return typeof value === 'number';
    }
    if (question.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0;
    }
    if (question.type === 'radio') {
      return typeof value === 'string' && value !== '';
    }
    if (question.type === 'text' || question.type === 'textarea') {
      return typeof value === 'string' && value.trim() !== '';
    }
    if (question.type === 'ranking') {
      // Ranking: todos os campos devem estar preenchidos
      if (typeof value !== 'object' || Array.isArray(value)) return false;
      const options = question.options || [];
      return options.every(opt => value[opt]);
    }
    return false;
  }

  // Função utilitária para checar se a questão está parcialmente respondida (em andamento)
  function isQuestionPartial(question, value) {
    if (!question || value === undefined || value === null) return false;
    if (isQuestionAnswered(question, value)) return false; // Se já está completa, não é parcial

    if (question.type === 'slider_percentage') {
      if (typeof value !== 'object' || Array.isArray(value)) return false;
      const options = question.options || [];
      const filledCount = options.filter(opt => typeof value[opt] === 'number' && value[opt] > 0).length;
      const total = options.reduce((sum, opt) => sum + (typeof value[opt] === 'number' ? value[opt] : 0), 0);
      return filledCount > 0 && (filledCount < options.length || total < 100);
    }
    if (question.type === 'slider') {
      return typeof value === 'number' && value !== null && value !== undefined;
    }
    if (question.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0 && !isQuestionAnswered(question, value);
    }
    if (question.type === 'radio') {
      return typeof value === 'string' && value !== '' && !isQuestionAnswered(question, value);
    }
    if (question.type === 'text' || question.type === 'textarea') {
      return typeof value === 'string' && value.trim() !== '' && !isQuestionAnswered(question, value);
    }
    if (question.type === 'ranking') {
      if (typeof value !== 'object' || Array.isArray(value)) return false;
      const options = question.options || [];
      const filledCount = options.filter(opt => value[opt]).length;
      return filledCount > 0 && filledCount < options.length;
    }
    return false;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex">
      {/* Tela de Conclusão */}
      {isCompleted ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 shadow-2xl text-center">
            
            {/* Logo */}
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-teal-900/30 to-slate-900/50 border border-teal-400/20 rounded-2xl p-3 shadow-[0_0_20px_rgba(20,184,166,0.25)]">
              <img src="/logo notecraft.jpg" alt="Notecraft Logo" className="w-full h-full object-contain rounded-xl" />
            </div>

            {/* Título */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              ✅ Discovery Concluído!
            </h1>

            {/* Subtítulo */}
            <p className="text-xl text-slate-300 mb-8">
              Obrigado por dedicar seu tempo para fornecer insights valiosos sobre sua empresa.
            </p>

            {/* Informações */}
            <div className="bg-slate-800/30 rounded-xl p-6 mb-8 border border-teal-500/20">
              <h3 className="text-lg font-semibold text-white mb-4">📧 Próximos Passos</h3>
              <div className="space-y-3 text-slate-300">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  Nossa equipe analisará suas respostas em detalhes
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  Criaremos um relatório personalizado com insights IA
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                  <strong className="text-teal-300">Entraremos em contato em até 48 horas</strong>
                </p>
              </div>
            </div>

            {/* Informações de contato */}
            <div className="bg-slate-900/40 rounded-lg p-4 mb-6">
              <p className="text-slate-400 text-sm">
                💡 Dúvidas? Entre em contato: <strong className="text-teal-300">contato@notecraft.com.br</strong>
              </p>
            </div>

            {/* Botão de fechamento (opcional) */}
            <button 
              onClick={() => window.close()}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
            >
              Fechar Janela
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          {renderSidebar()}

          {/* Conteúdo principal */}
          <div className="flex-1 h-screen overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header da seção */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">{currentSection}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentSectionMeta?.title}</h2>
                <p className="text-slate-300">
                  Responsável sugerido: {currentSectionMeta?.suggested_role} • {currentSectionMeta?.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full transition-all"
                  style={{ width: `${sectionProgress[currentSection] || 0}%` }}
                />
              </div>
              <span className="text-sm text-slate-300">
                {sectionProgress[currentSection] || 0}% completo
              </span>
            </div>
          </div>

          {/* Questões */}
          <div className="space-y-8">
            {currentSectionQuestions.map((question, index) => (
              <div key={question.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="mb-4">
                  <div className="flex items-start gap-4">
                    {/* Status visual da questão */}
                    <QuestionStatus 
                      questionId={question.id}
                      isAnswered={isQuestionAnswered(question, responses[question.id]?.response)}
                      isPartial={isQuestionPartial(question, responses[question.id]?.response)}
                      isCurrentSection={true}
                    />
                    {/* Bolinha de checkpoint */}
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 flex items-center justify-center transition-all duration-300 ${
                      isQuestionAnswered(question, responses[question.id]?.response)
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/50 scale-110'
                        : 'bg-slate-600/50 border-2 border-slate-400/50 hover:border-teal-400/50'
                    }`}>
                      {isQuestionAnswered(question, responses[question.id]?.response) ? (
                        <span className="text-white text-sm font-bold">✓</span>
                      ) : (
                        <span className="text-slate-400 text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-2">
                        {question.text}
                        {question.required && <span className="text-red-400 ml-1">*</span>}
                      </h3>
                    </div>
                  </div>
                </div>
                <QuestionRenderer
                  question={question}
                  value={responses[question.id]?.response}
                  observations={responses[question.id]?.observations || ''}
                  onChange={(value) => {
                    updateResponse(question.id, value);
                  }}
                  onObservationsChange={(observations) => updateObservations(question.id, observations)}
                />
              </div>
            ))}
          </div>

          {/* Navegação */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
            <button
              onClick={goToPreviousSection}
              disabled={currentSection === 1}
              className="px-6 py-3 bg-slate-600 text-white rounded-xl font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Seção Anterior
            </button>

            <span className="text-slate-300">
              Seção {currentSection} de 17
            </span>

            <button
              onClick={goToNextSection}
              disabled={!isCurrentSectionComplete()}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSection === 17 ? 'Finalizar Discovery' : 'Próxima Seção →'}
            </button>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}