// components/Section0CNPJ.tsx
"use client";

import { useState } from 'react';
import { lookupCNPJ, CNPJData, formatCNPJ } from '@/lib/cnpj-api';

interface Section0CNPJProps {
  onNext: (data: CNPJData) => void;
}

export default function Section0CNPJ({ onNext }: Section0CNPJProps) {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [cnpjData, setCnpjData] = useState<CNPJData | null>(null);
  const [error, setError] = useState<string>('');

  const formatCNPJInput = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJInput(e.target.value);
    setCnpj(formatted);
    setError('');
  };

  const handleLookup = async () => {
    console.log('Botão Consultar clicado! loading:', loading, 'cnpj:', cnpj);
    if (!cnpj) {
      setError('Por favor, preencha o CNPJ antes de consultar.');
      return;
    }

    setLoading(true);
    setError('');
    setCnpjData(null); // Limpa o estado antes de buscar novo CNPJ
    let timeoutId: any = null;
    try {
      // Timeout de segurança: nunca deixa loading travado
      timeoutId = setTimeout(() => {
        setLoading(false);
        setError('Tempo de consulta excedido. Tente novamente.');
      }, 10000); // 10 segundos

      // Consulta real usando a API
      const data = await lookupCNPJ(cnpj);
      setCnpjData(data);
    } catch (err) {
      setError('Erro ao consultar CNPJ. Tente novamente.');
      setCnpjData(null);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (cnpjData) {
      onNext(cnpjData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-teal-900/30 to-slate-900/50 border border-teal-400/20 rounded-2xl p-4 shadow-[0_0_30px_rgba(20,184,166,0.3)]">
            <img src="/logo notecraft.jpg" alt="Notecraft Logo" className="w-full h-full object-contain rounded-xl" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Discovery Notecraft™
          </h1>
          <p className="text-slate-300 mb-2">Inteligência Consultiva IA-Aware</p>
          <div className="bg-slate-800/30 rounded-lg p-4 mb-6 border border-teal-500/20">
            <p className="text-slate-300 text-sm leading-relaxed mb-3 tracking-normal">
              📋 <strong className="text-white tracking-normal">Questionário Estratégico Colaborativo</strong>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-3 tracking-normal">
              Para obter insights mais precisos, <strong className="text-teal-300">recomendamos que cada responsável de seção</strong>{' '}
              preencha suas próprias questões durante o questionário. Isso garante respostas mais detalhadas e estratégicas.
            </p>
            <div className="bg-slate-900/40 rounded-lg p-3 mb-3">
              <p className="text-slate-300 text-xs font-medium mb-2 tracking-normal text-center">🔄 Fluxo do Discovery:</p>
              <p className="text-slate-400 text-xs mb-3 tracking-normal text-center">
                1️⃣ Dados da Empresa → 2️⃣ Questionário Estratégico → 3️⃣ Relatório com Insights IA
              </p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  <span className="text-slate-400 tracking-normal">Pendente</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-slate-400 tracking-normal">Em Andamento</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span className="text-slate-400 tracking-normal">Concluída</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-xs tracking-normal text-center">
              💡 <strong className="text-teal-300">Dica:</strong> Identifique o responsável ideal para cada seção durante o preenchimento.
            </p>
          </div>
        </div>

        {/* CNPJ Input - só mostra se não tem dados ainda */}
        {!cnpjData && (
          <div className="mb-6">
            <label htmlFor="cnpj-input" className="block text-slate-300 text-sm font-medium mb-2">
              CNPJ da Empresa
            </label>
            <div className="flex gap-3">
              <input
                id="cnpj-input"
                name="cnpj"
                type="text"
                value={cnpj}
                onChange={handleCNPJChange}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLookup();
                }}
                disabled={loading === true}
                type="button"
                className={`px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Consultando...' : 'Consultar'}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>
        )}

        {/* Company Data */}
        {cnpjData && (
          <div className="bg-slate-800/30 rounded-xl p-6 mb-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-4">📊 Dados da Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 text-sm">Razão Social:</span>
                <p className="text-white font-medium">{cnpjData.nome}</p>
              </div>
              {cnpjData.fantasia && (
                <div>
                  <span className="text-slate-400 text-sm">Nome Fantasia:</span>
                  <p className="text-white font-medium">{cnpjData.fantasia}</p>
                </div>
              )}
              <div>
                <span className="text-slate-400 text-sm">CNPJ:</span>
                <p className="text-white font-medium">{formatCNPJ(cnpjData.cnpj)}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Status:</span>
                <p className="text-green-400 font-medium">{cnpjData.status || 'ATIVA'}</p>
              </div>
              {cnpjData.porte && (
                <div>
                  <span className="text-slate-400 text-sm">Porte:</span>
                  <p className="text-white font-medium">{cnpjData.porte}</p>
                </div>
              )}
              {cnpjData.atividade_principal?.[0]?.text && (
                <div className="md:col-span-2">
                  <span className="text-slate-400 text-sm">Atividade Principal:</span>
                  <p className="text-white font-medium">{cnpjData.atividade_principal[0].text}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {cnpjData && (
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
          >
            Continuar com Discovery →
          </button>
        )}
      </div>
    </div>
  );
}
