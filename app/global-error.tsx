'use client'

import { WarningCircle } from 'phosphor-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex items-center justify-center p-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <WarningCircle size={48} color="#fff" weight="regular" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Erro Global
          </h2>
          
          <p className="text-slate-300 mb-6">
            Erro crítico no sistema. Recarregue a página.
          </p>
          
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900 font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  )
}
