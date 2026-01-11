
import React, { useState } from 'react';
import LessonForm from './components/LessonForm';
import LessonPreview from './components/LessonPreview';
import { FormInputs, LessonPlan } from './types';
import { generateLessonPlan } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<LessonPlan | null>(null);

  const handleGenerate = async (inputs: FormInputs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateLessonPlan(inputs);
      setPlan(result);
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error("Error capturado en App:", err);
      // Mostramos el mensaje de error real para diagnosticar problemas de API Key o cuota
      setError(err.message || 'Error inesperado al conectar con OMEGA AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <i className="fas fa-microchip text-xl"></i>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              OMEGA <span className="text-indigo-600">COMPUTER LAB 2026</span>
            </h1>
          </div>
          <div className="hidden md:flex gap-4">
            {plan && (
              <button
                onClick={handleQuickDownload}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
              >
                <i className="fas fa-file-pdf"></i>
                Descargar PDF
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
        <header className="text-center space-y-4 print:hidden">
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
            Potencia tu enseñanza con <span className="text-indigo-600">OMEGA AI</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Crea planeaciones didácticas avanzadas en segundos para el laboratorio de informática y más allá.
          </p>
        </header>

        <section className="print:hidden">
          <LessonForm onGenerate={handleGenerate} isLoading={loading} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3 shadow-sm">
              <i className="fas fa-exclamation-triangle mt-1"></i>
              <div>
                <p className="font-bold">Error de Generación</p>
                <p className="text-sm opacity-90">{error}</p>
                <p className="text-xs mt-2 text-red-500">Asegúrate de que la API_KEY esté configurada correctamente en Vercel.</p>
              </div>
            </div>
          )}
        </section>

        {(plan || loading) && (
          <div id="result-section" className="pt-8">
            {loading ? (
              <div className="space-y-8 animate-pulse">
                <div className="h-40 bg-slate-200 rounded-2xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-32 bg-slate-100 rounded-xl"></div>
                  <div className="h-32 bg-slate-100 rounded-xl"></div>
                </div>
                <div className="h-64 bg-slate-100 rounded-xl"></div>
              </div>
            ) : (
              plan && <LessonPreview plan={plan} />
            )}
          </div>
        )}
      </main>

      {plan && !loading && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 print:hidden">
          <button
            onClick={handleQuickDownload}
            className="p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 hover:bg-indigo-700 transition-all flex items-center justify-center group"
            title="Descargar PDF"
          >
            <i className="fas fa-file-pdf text-xl"></i>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
              Descargar PDF
            </span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
            title="Subir"
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
