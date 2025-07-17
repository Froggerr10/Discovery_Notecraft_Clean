// components/SectionSelectionModal.tsx
import React, { useState } from 'react';
import { X, CheckCircle2, Circle, Zap, TrendingUp, BarChart3, Archive } from 'lucide-react';
import { SECTION_RESPONSIBILITIES } from '@/lib/questions';

interface SectionSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSections: number[];
  onSectionsChange: (sections: number[]) => void;
}

export default function SectionSelectionModal({
  isOpen,
  onClose,
  selectedSections,
  onSectionsChange
}: SectionSelectionModalProps) {
  const [localSelection, setLocalSelection] = useState<number[]>(selectedSections);

  if (!isOpen) return null;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'CRÍTICA':
        return <Zap className="w-4 h-4 text-red-400" />;
      case 'ALTA':
        return <TrendingUp className="w-4 h-4 text-orange-400" />;
      case 'MÉDIA':
        return <BarChart3 className="w-4 h-4 text-yellow-400" />;
      case 'BAIXA':
        return <Archive className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRÍTICA':
        return 'border-red-400/30 bg-red-400/10';
      case 'ALTA':
        return 'border-orange-400/30 bg-orange-400/10';
      case 'MÉDIA':
        return 'border-yellow-400/30 bg-yellow-400/10';
      case 'BAIXA':
        return 'border-gray-400/30 bg-gray-400/10';
      default:
        return 'border-white/20 bg-white/5';
    }
  };

  const toggleSection = (sectionId: number) => {
    setLocalSelection(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const selectCritical = () => {
    const criticalSections = SECTION_RESPONSIBILITIES
      .filter(s => s.priority === 'CRÍTICA')
      .map(s => s.id);
    setLocalSelection(criticalSections);
  };

  const selectAll = () => {
    const allSections = SECTION_RESPONSIBILITIES.map(s => s.id);
    setLocalSelection(allSections);
  };

  const clearAll = () => {
    setLocalSelection([]);
  };

  const handleSave = () => {
    onSectionsChange(localSelection);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/90 via-teal-900/90 to-slate-900/90 backdrop-blur-md border border-white/20 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Selecionar Seções do Discovery</h3>
              <p className="text-teal-300 mt-1">Escolha quais seções incluir no questionário</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={selectCritical}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
              Apenas Críticas
            </button>
            <button
              onClick={selectAll}
              className="px-4 py-2 bg-teal-500/20 text-teal-300 rounded-lg hover:bg-teal-500/30 transition-colors text-sm font-medium"
            >
              Selecionar Todas
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors text-sm font-medium"
            >
              Limpar Seleção
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid gap-3">
            {SECTION_RESPONSIBILITIES.map((section) => {
              const isSelected = localSelection.includes(section.id);
              
              return (
                <div
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-white/5 ${
                    isSelected 
                      ? getPriorityColor(section.priority) + ' ring-2 ring-teal-400/30'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-400">
                          Seção {section.id}
                        </span>
                        {getPriorityIcon(section.priority)}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          section.priority === 'CRÍTICA' ? 'bg-red-500/20 text-red-300' :
                          section.priority === 'ALTA' ? 'bg-orange-500/20 text-orange-300' :
                          section.priority === 'MÉDIA' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {section.priority}
                        </span>
                      </div>
                      
                      <h4 className="font-medium text-white mb-1">
                        {section.title}
                      </h4>
                      
                      <div className="text-sm text-gray-300">
                        <span className="text-teal-300">{section.suggested_role}</span>
                        <span className="mx-2">•</span>
                        <span>{section.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              <span className="font-medium text-teal-300">{localSelection.length}</span> de{' '}
              <span className="text-white">{SECTION_RESPONSIBILITIES.length}</span> seções selecionadas
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all font-medium"
              >
                Aplicar Seleção
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}