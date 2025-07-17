"use client";
import { useState, useEffect } from 'react';

interface AIInsightsPanelProps {
  sessionId: string;
  responses: any[];
  companyData?: any;
  onInsightsGenerated?: (insights: any[]) => void;
}

export default function AIInsightsPanel({ 
  sessionId, 
  responses, 
  companyData,
  onInsightsGenerated 
}: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (responses.length > 3) {
      generateInsights();
    }
  }, [responses]);

  const generateInsights = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simula análise IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockInsights = [
        {
          id: 1,
          type: 'automation_opportunity',
          title: 'Alta concentração em RCT detectada',
          description: 'Baseado nas respostas, identificamos dependência excessiva de Recuperação de Créditos',
          confidence: 85,
          impact: 'HIGH',
          evidence: 'Resposta seção 1: distribuição de serviços',
          recommendation: 'Diversificar portfolio para planejamento tributário'
        },
        {
          id: 2,
          type: 'digital_maturity',
          title: 'Processos manuais predominantes',
          description: 'Baixa maturidade digital identificada nas respostas sobre tecnologia',
          confidence: 78,
          impact: 'MEDIUM',
          evidence: 'Seção 3: automação e IA',
          recommendation: 'Implementar RPA em processos repetitivos'
        }
      ];
      
      setInsights(mockInsights);
      onInsightsGenerated?.(mockInsights);
      
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Insights Inteligentes</h3>
      </div>

      {isAnalyzing && (
        <div className="flex items-center gap-3 p-4 bg-purple-900/30 rounded-lg mb-4">
          <div className="animate-spin w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"></div>
          <span className="text-purple-300">Analisando respostas com IA...</span>
        </div>
      )}

      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-slate-900/50 rounded-lg p-4 border border-white/10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  insight.impact === 'HIGH' ? 'bg-red-900/50 text-red-300' :
                  insight.impact === 'MEDIUM' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-green-900/50 text-green-300'
                }`}>
                  {insight.impact}
                </span>
                <span className="text-slate-400 text-sm">
                  Confiança: {insight.confidence}%
                </span>
              </div>
            </div>
            
            <h4 className="text-white font-medium mb-2">{insight.title}</h4>
            <p className="text-slate-300 text-sm mb-3">{insight.description}</p>
            
            <div className="border-t border-white/10 pt-3">
              <p className="text-slate-400 text-xs mb-1">
                Evidência: {insight.evidence}
              </p>
              <p className="text-emerald-300 text-sm">
                💡 {insight.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {insights.length === 0 && !isAnalyzing && (
        <div className="text-center text-slate-400 py-8">
          Responda mais questões para gerar insights personalizados
        </div>
      )}
    </div>
  );
}