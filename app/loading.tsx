export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <span className="text-3xl font-bold text-slate-900">∞</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Discovery Notecraft™
        </h2>
        
        <p className="text-slate-300 mb-6">
          Carregando questionário...
        </p>
        
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  )
}
