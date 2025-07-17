// components/QuestionStatus.tsx
// Indicador visual de status das questões

import React from 'react';

interface QuestionStatusProps {
  questionId: number;
  isAnswered: boolean;
  isPartial?: boolean;
  isCurrentSection?: boolean;
}

export default function QuestionStatus({ 
  questionId, 
  isAnswered, 
  isPartial = false,
  isCurrentSection = false 
}: QuestionStatusProps) {
  
  const getStatusIcon = () => {
    if (isAnswered) {
      return "✓";
    } else if (isPartial) {
      return "…"; // Ou pode ser "•" para um ponto
    } else {
      return "";
    }
  };

  const getStatusColor = () => {
    if (isAnswered) {
      return "text-green-400 bg-green-500/10 border-green-500/20";
    } else if (isPartial) {
      return "text-yellow-400 bg-yellow-400/20 border-yellow-400/20";
    } else {
      return "text-slate-400 bg-slate-400/20 border-slate-400/20";
    }
  };

  const getStatusText = () => {
    if (isAnswered) {
      return "Completa";
    } else if (isPartial) {
      return "Parcial";
    } else {
      return "Pendente";
    }
  };

  return (
    <div className={`
      inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-medium
      ${getStatusColor()}
      ${isCurrentSection ? 'ring-2 ring-teal-400/50' : ''}
    `}>
      <span>{getStatusIcon()}</span>
    </div>
  );
}
