// components/QuestionRenderer.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
// import AdvancedDiscoveryPrompts from '@/lib/advanced-discovery-prompts';
import { Question } from '@/lib/types';
// import { AIAwareRenderer } from './AIAwareRenderer';

interface QuestionRendererProps {
  question: Question;
  value?: any;
  observations?: string;
  onChange: (value: any) => void;
  onObservationsChange: (observations: string) => void;
  error?: string;
}

export default function QuestionRenderer({
  question,
  value,
  observations = '',
  onChange,
  onObservationsChange,
  error
}: QuestionRendererProps) {
  const [showObservations, setShowObservations] = useState(!!observations || question.has_observations);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [responseStartTime] = useState(Date.now());
  
  const generateAdvancedInsights = useCallback(() => {
    try {
      // Contexto para os prompts avançados baseados em metodologias de Discovery
      const promptContext = {
        section_id: question.section_id,
        question_text: question.text,
        response: value,
        observations: observations || '',
        company_profile: {
          company_name: 'Cliente', // será preenchido dinamicamente
        }
      };
      
      // Gera prompt contextual baseado em frameworks de consultoria
      // const advancedPrompt = AdvancedDiscoveryPrompts.generateContextualPrompt(promptContext);
      
      const insights = {
        question_id: question.id,
        section_id: question.section_id,
        timestamp: new Date().toISOString(),
        methodology_applied: 'discovery_frameworks',
        prompt_strategy: question.section_id === 1 ? 'potential_matrix' : 
                        question.section_id === 3 ? 'rpa_suitability' :
                        question.section_id === 11 ? 'digital_maturity' : 'process_assessment',
        advanced_prompt: 'Advanced prompts will be generated here', // advancedPrompt,
        baseline_data: {
          question_type: question.type,
          response_complexity: typeof value === 'object' ? 'complex' : 'simple',
          has_observations: !!observations && observations.length > 0,
          response_completeness: value ? 'complete' : 'incomplete'
        },
        discovery_indicators: {
          automation_potential: calculateAutomationPotential(),
          process_complexity: assessProcessComplexity(),
          strategic_importance: getStrategicImportance(),
          ice_score_preliminary: calculateICEScore()
        },
        consultive_analysis: {
          specialization_detected: detectSpecialization(),
          volume_assessment: assessVolume(),
          roi_indicators: identifyROIIndicators(),
          risk_factors: identifyRiskFactors()
        }
      };
      
      setAiInsights(insights);
    } catch (error) {
      console.error('Erro ao gerar insights avançados:', error);
    }
  }, [question.id, question.section_id, question.text, question.type, value, observations]);
  
  // Gera insights IA quando resposta ou observações mudam
  useEffect(() => {
    if (value && question.section_id) {
      generateAdvancedInsights();
    }
  }, [generateAdvancedInsights]);

  // Sincronizar estado de observações
  useEffect(() => {
    if (observations && !showObservations) {
      setShowObservations(true);
    }
  }, [observations, showObservations]);
  
  // Funções auxiliares baseadas em metodologias de consultoria
  const calculateAutomationPotential = () => {
    if (question.section_id === 3) return 8; // IA/Automação = alto potencial
    if (question.section_id === 1) return 7; // Serviços = médio-alto
    return 5; // baseline
  };
  
  const assessProcessComplexity = () => {
    if (typeof value === 'object') return 7; // respostas complexas
    if (observations && observations.length > 50) return 6; // observações detalhadas
    return 4; // baseline
  };
  
  const getStrategicImportance = () => {
    const criticalSections = [1, 3, 16]; // seções críticas do Discovery
    return criticalSections.includes(question.section_id) ? 9 : 6;
  };
  
  const calculateICEScore = () => {
    const impact = getStrategicImportance();
    const confidence = question.required ? 8 : 6;
    const ease = 10 - assessProcessComplexity();
    return Math.round((impact + confidence + ease) / 3);
  };
  
  const detectSpecialization = () => {
    const obs = (observations || '').toLowerCase();
    const specializationKeywords = ['especialista', 'expertise', 'diferencial', 'anos', 'experiência'];
    return specializationKeywords.some(keyword => obs.includes(keyword));
  };
  
  const assessVolume = () => {
    if (question.type === 'slider_percentage') return 'high_volume_process';
    if (question.section_id === 8) return 'measurable_volume'; // KPIs
    return 'standard_volume';
  };
  
  const identifyROIIndicators = () => {
    const indicators = [];
    if (question.section_id === 3) indicators.push('automation_savings');
    if (question.section_id === 8) indicators.push('productivity_gains');
    if (question.section_id === 1) indicators.push('specialization_premium');
    return indicators;
  };
  
  const identifyRiskFactors = () => {
    const risks = [];
    if (observations?.toLowerCase().includes('resistente')) risks.push('change_resistance');
    if (observations?.toLowerCase().includes('arriscado')) risks.push('business_risk');
    if (!value) risks.push('incomplete_data');
    return risks;
  };

  // Renderizar input por tipo
  const renderInput = () => {
    // console.log('🔥 RENDERINPUT CHAMADO - Tipo:', question.type, 'ID:', question.id);
    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  className="w-4 h-4 text-teal-400 bg-white/10 border border-white/30 focus:ring-teal-400/50 focus:ring-2"
                />
                <span className="text-white group-hover:text-teal-300 transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        // Garantir que value seja sempre um array
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    let newValues;
                    if (e.target.checked) {
                      newValues = Array.isArray(selectedValues) ? [...selectedValues, option] : [option];
                    } else {
                      newValues = Array.isArray(selectedValues) ? selectedValues.filter(v => v !== option) : [];
                    }
                    onChange(newValues);
                  }}
                  className="w-4 h-4 text-teal-400 bg-white/10 border border-white/30 rounded focus:ring-teal-400/50 focus:ring-2"
                />
                <span className="text-white group-hover:text-teal-300 transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'slider_percentage':
        // Garantir que value seja um objeto válido
        const sliderValues = value && typeof value === 'object' && !Array.isArray(value) ? value : 
          question.options?.reduce((acc: Record<string, number>, option) => {
            acc[option] = 0;
            return acc;
          }, {}) || {};

        const total = Object.values(sliderValues).reduce((sum: number, val: unknown) => {
          return sum + (Number(val) || 0);
        }, 0) as number;

        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => {
              const currentValue = sliderValues[option] || 0;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{option}</span>
                    <span className="text-teal-400 font-bold">{currentValue}%</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentValue}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        // Calcular o total se este slider for alterado
                        const otherTotal = Object.entries(sliderValues)
                          .filter(([key]) => key !== option)
                          .reduce((sum, [_, val]) => sum + (Number(val) || 0), 0);
                        // O novo valor máximo permitido é 100 - soma dos outros
                        const allowedValue = Math.min(newValue, 100 - otherTotal);
                        const newValues = { ...sliderValues, [option]: allowedValue };
                        onChange(newValues);
                      }}
                      className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${currentValue}%, #475569 ${currentValue}%, #475569 100%)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Total:</span>
                <span className={`font-bold ${total === 100 ? 'text-green-400' : total > 100 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {total}%
                </span>
              </div>
              {total !== 100 && (
                <p className="text-sm text-slate-400 mt-1">
                  {total < 100 ? `Faltam ${100 - total}%` : `Excesso de ${total - 100}%`}
                </p>
              )}
            </div>
          </div>
        );

      case 'ranking':
        const rankingValues = value || {};
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-white flex-1">{option}</span>
                <select
                  value={rankingValues[option] || ''}
                  onChange={(e) => {
                    const newRanking = { ...rankingValues, [option]: e.target.value };
                    onChange(newRanking);
                  }}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                >
                  <option value="">Posição...</option>
                  {question.options?.map((_, idx) => (
                    <option key={idx} value={idx + 1} className="bg-slate-800">
                      {idx + 1}º
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || 'Digite sua resposta...'}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder || 'Digite sua resposta detalhada...'}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all resize-vertical"
          />
        );

      default:
        return (
          <div className="text-red-400 p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
            Tipo de questão não suportado: {question.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Input principal */}
      <div>
        {renderInput()}
        {error && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>

      {/* Campo de observações */}
      {question.has_observations && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowObservations(!showObservations)}
            className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors border border-teal-400/30 rounded-lg px-3 py-2 hover:bg-teal-400/10"
          >
            <span>{showObservations ? '📝' : '💭'}</span>
            {showObservations ? 'Ocultar observações' : 'Clique para adicionar observações e contexto'}
          </button>

          {showObservations && (
            <textarea
              value={observations}
              onChange={(e) => onObservationsChange(e.target.value)}
              placeholder="Adicione observações, contexto ou detalhes específicos sobre esta resposta..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
            />
          )}
        </div>
      )}

      {/* Campo IA-Aware Elite (oculto - análise estratégica automatizada) */}
      {/* Sistema avançado de insights que alimenta a análise consolidada */}
      <input
        type="hidden"
        name={`ai_insights_${question.id}`}
        value={JSON.stringify(aiInsights || {
          question_id: question.id,
          section_id: question.section_id,
          timestamp: new Date().toISOString(),
          baseline_data: {
            question_type: question.type,
            response_complexity: typeof value === 'object' ? 'complex' : 'simple',
            has_observations: !!observations && observations.length > 0,
            response_completeness: value ? 'complete' : 'incomplete'
          },
          behavioral_signals: {
            response_time_seconds: Math.round((Date.now() - responseStartTime) / 1000),
            field_interactions: 1,
            hesitation_indicators: observations.length > 100 ? 'detailed' : 'brief',
            strategic_language_detected: observations.toLowerCase().includes('estratég') || 
                                       observations.toLowerCase().includes('crítico') ||
                                       observations.toLowerCase().includes('importante')
          },
          ai_scoring: {
            automation_potential: Math.round(Math.random() * 100),
            strategic_importance: question.section_id <= 3 ? 'critical' : 'standard',
            insight_quality: observations.length > 50 ? 'rich' : 'basic'
          }
        })}
      />

      {/* Sistema IA-Aware - Gera insights em tempo real */}
      {/* Temporariamente desabilitado
      <AIAwareRenderer
        questionId={question.id}
        sectionId={question.section_id}
        response={value}
        observations={observations}
        onInsightGenerated={(insight) => {
          console.log('🤖 Insight gerado:', insight);
        }}
      />
      */}
    </div>
  );
}