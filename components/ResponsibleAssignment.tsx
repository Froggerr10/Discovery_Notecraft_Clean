// components/ResponsibleAssignment.tsx
"use client";

import { useState } from 'react';
import { CheckCircle } from 'phosphor-react';

interface DepartmentResponsible {
  department: string;
  email: string;
  sections: number[];
}

interface ResponsibleAssignmentProps {
  companyName: string;
  onNext: (assignments: DepartmentResponsible[]) => void;
  onBack?: () => void;
}

export default function ResponsibleAssignment({ 
  companyName, 
  onNext,
  onBack 
}: ResponsibleAssignmentProps) {
  const [mode, setMode] = useState<'solo' | 'team' | null>(null);
  const [departmentEmails, setDepartmentEmails] = useState<Record<string, string>>({});

  // Mapeamento de departamentos e suas seções
  const departmentMapping = {
    'Estratégico': { 
      sections: [1, 3, 4, 15], 
      color: 'from-purple-500 to-purple-600',
      description: 'Estratégia, IA, Valor, Expansão'
    },
    'Técnico': { 
      sections: [2, 6, 11, 17], 
      color: 'from-blue-500 to-blue-600',
      description: 'Base Conhecimento, Tecnologia, Maturidade Digital'
    },
    'Comercial': { 
      sections: [5, 9, 16], 
      color: 'from-green-500 to-green-600',
      description: 'Cenário Comercial, Marketing, Agentes'
    },
    'Financeiro': { 
      sections: [8], 
      color: 'from-yellow-500 to-yellow-600',
      description: 'Performance e KPIs'
    },
    'Recursos Humanos': { 
      sections: [7], 
      color: 'from-pink-500 to-pink-600',
      description: 'Estrutura Organizacional'
    },
    'Jurídico': { 
      sections: [10], 
      color: 'from-red-500 to-red-600',
      description: 'Fontes Jurídicas e Pesquisa'
    },
    'Operacional': { 
      sections: [12, 14], 
      color: 'from-gray-500 to-gray-600',
      description: 'Documentação, Comunicação'
    },
    'Atendimento': { 
      sections: [13], 
      color: 'from-teal-500 to-teal-600',
      description: 'Suporte ao Cliente'
    }
  };

  const handleComplete = () => {
    if (mode === 'solo') {
      onNext([]);
    } else {
      const assignments: DepartmentResponsible[] = Object.entries(departmentEmails)
        .filter(([_, email]) => email.trim())
        .map(([department, email]) => ({
          department,
          email: email.trim(),
          sections: departmentMapping[department as keyof typeof departmentMapping].sections
        }));
      onNext(assignments);
    }
  };

  const updateDepartmentEmail = (department: string, email: string) => {
    setDepartmentEmails(prev => ({
      ...prev,
      [department]: email
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-900">∞</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Discovery Notecraft™
              </h1>
              <p className="text-slate-300">Como você prefere responder?</p>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              {companyName}
            </h2>
            <p className="text-slate-300">
              Escolha a melhor forma de organizar as respostas do questionário
            </p>
          </div>
        </div>

        {!mode && (
          <div className="space-y-6">
            {/* Opção Solo */}
            <div 
              onClick={() => setMode('solo')}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 cursor-pointer hover:bg-white/15 transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Vou responder tudo sozinho</h3>
                  <p className="text-slate-300">Responder todas as 17 seções do questionário em uma única sessão</p>
                  <p className="text-teal-400 text-sm mt-2">⚡ Mais rápido - vai direto para o questionário</p>
                </div>
              </div>
            </div>

            {/* Opção Equipe */}
            <div 
              onClick={() => setMode('team')}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 cursor-pointer hover:bg-white/15 transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Vou responder com minha equipe</h3>
                  <p className="text-slate-300">Distribuir seções por departamento para respostas especializadas</p>
                  <p className="text-teal-400 text-sm mt-2">🎯 Mais preciso - cada especialista responde sua área</p>
                </div>
              </div>
            </div>

            {/* Opção Pular */}
            <div 
              onClick={handleComplete}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 cursor-pointer hover:bg-white/15 transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⏭️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Pular por agora</h3>
                  <p className="text-slate-300">Ir direto para o questionário e organizar depois se necessário</p>
                  <p className="text-teal-400 text-sm mt-2">🚀 Sem fricção - começar imediatamente</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => setMode(null)}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                ← Voltar
              </button>
              <h3 className="text-xl font-bold text-white">Designar responsáveis por departamento</h3>
            </div>

            {Object.entries(departmentMapping).map(([department, data]) => (
              <div key={department} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${data.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-xl font-bold text-white">{department[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white">{department}</h4>
                    <p className="text-slate-300 text-sm">{data.description}</p>
                    <p className="text-teal-400 text-xs mt-1">
                      Seções: {data.sections.join(', ')}
                    </p>
                  </div>
                </div>
                
                <input
                  type="email"
                  placeholder={`Email do responsável por ${department}`}
                  value={departmentEmails[department] || ''}
                  onChange={(e) => updateDepartmentEmail(department, e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all"
                />
              </div>
            ))}

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleComplete}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200"
              >
                Continuar com Designações
              </button>
            </div>
          </div>
        )}

        {mode === 'solo' && (
          <div className="text-center space-y-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} color="#fff" weight="regular" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Perfeito!</h3>
              <p className="text-slate-300 mb-6">Você vai responder todas as seções. Vamos começar!</p>
              
              <button
                onClick={handleComplete}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200"
              >
                Iniciar Questionário
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
