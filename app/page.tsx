"use client";

import { useState } from 'react';
import Section0CNPJ from '../components/Section0CNPJ';
import DiscoveryForm from '../components/DiscoveryForm';
import { SectionResponsible } from '@/lib/types';
import { CNPJData } from '@/lib/cnpj-api';
import { CheckCircle } from 'phosphor-react';

export default function Page() {
  const [step, setStep] = useState(1); // 1: CNPJ, 2: Formulário, 3: Finalizado
  const [sessionId] = useState(() => `discovery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [companyData, setCompanyData] = useState<CNPJData | null>(null);
  const [completed, setCompleted] = useState(false);

  // Etapa 1: CNPJ
  if (step === 1) {
    return (
      <Section0CNPJ
        onNext={(data) => {
          setCompanyData(data);
          setStep(2);
        }}
      />
    );
  }

  // Etapa 2: Formulário principal
  if (step === 2 && companyData) {
    return (
      <DiscoveryForm
        sessionId={sessionId}
        companyData={companyData}
        assignments={[]} // Array vazio - sem responsáveis específicos
        onComplete={() => setCompleted(true)}
      />
    );
  }

  // Etapa 3: Finalizado
  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 shadow-2xl text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} color="#fff" weight="regular" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Discovery Completo!</h1>
          <p className="text-xl text-slate-300 mb-6">
            Obrigado por responder ao Discovery Notecraft™.
          </p>
          <p className="text-slate-400">
            Suas respostas foram registradas e serão analisadas pela nossa IA.
          </p>
        </div>
      </div>
    );
  }

  return null;
}