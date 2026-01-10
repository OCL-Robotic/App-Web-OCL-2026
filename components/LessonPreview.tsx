
import React from 'react';
import { LessonPlan } from '../types';

interface LessonPreviewProps {
  plan: LessonPlan;
}

const LessonPreview: React.FC<LessonPreviewProps> = ({ plan }) => {
  const handleDownloadPDF = () => {
    // We use the native print functionality which is the most reliable way to "Save as PDF" 
    // while preserving complex layouts and CSS styles in modern browsers.
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none print:m-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-8 print:bg-white print:text-slate-900 print:border-b-2 print:border-slate-200 print:p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2 print:text-2xl">{plan.title}</h2>
            <div className="flex flex-wrap gap-4 text-slate-300 text-sm print:text-slate-500">
              <span><i className="fas fa-user-graduate mr-2"></i>{plan.grade}</span>
              <span><i className="fas fa-book mr-2"></i>{plan.subject}</span>
              <span><i className="fas fa-clock mr-2"></i>{plan.duration}</span>
            </div>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg active:scale-95"
              title="Descargar como PDF"
            >
              <i className="fas fa-file-pdf"></i>
              <span className="hidden sm:inline">Descargar PDF</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Imprimir"
            >
              <i className="fas fa-print"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-10 print:p-4 print:space-y-6">
        {/* ABCD Model */}
        <section className="print:break-inside-avoid">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg print:hidden">
              <i className="fas fa-bullseye text-lg"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Objetivo ABCD</h3>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-4 print:bg-white print:p-2">
            <p className="italic text-slate-700 text-lg print:text-base">"{plan.abcdObjective.fullStatement}"</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'A - Audiencia', value: plan.abcdObjective.audience },
              { label: 'B - Comportamiento', value: plan.abcdObjective.behavior },
              { label: 'C - Condición', value: plan.abcdObjective.condition },
              { label: 'D - Grado', value: plan.abcdObjective.degree },
            ].map((part, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg print:p-2">
                <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">{part.label}</span>
                <span className="text-sm font-medium text-slate-700">{part.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 print:gap-4 print:grid-cols-1">
          <section className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-star text-amber-500 print:hidden"></i> Objetivo General
            </h3>
            <p className="text-slate-600 leading-relaxed print:text-sm">{plan.generalObjective}</p>
          </section>
          <section className="print:break-inside-avoid">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fas fa-list-check text-blue-500 print:hidden"></i> Objetivos Específicos
            </h3>
            <ul className="space-y-2">
              {plan.specificObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-600 print:text-sm">
                  <span className="text-indigo-500 font-bold">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Activities */}
        <section className="print:break-inside-avoid">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i className="fas fa-person-chalkboard text-emerald-500 print:hidden"></i> Secuencia Didáctica
          </h3>
          <div className="space-y-4">
            {plan.activities.map((act, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center print:hidden">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < plan.activities.length - 1 && <div className="w-0.5 h-full bg-slate-200 my-1"></div>}
                </div>
                <div className="pb-6 print:pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 uppercase text-xs tracking-wider">{act.phase}</span>
                    <span className="text-slate-400 text-xs">• {act.duration}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed print:text-sm">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rubric */}
        <section className="overflow-x-auto print:overflow-visible print:break-inside-avoid">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <i className="fas fa-table text-indigo-500 print:hidden"></i> Rúbrica de Evaluación
          </h3>
          <table className="w-full border-collapse border border-slate-200 text-sm print:text-[10px]">
            <thead>
              <tr className="bg-slate-50 print:bg-white">
                <th className="border border-slate-200 p-3 text-left font-bold text-slate-700 print:p-1">Criterio</th>
                <th className="border border-slate-200 p-3 text-left font-bold text-emerald-700 bg-emerald-50 print:p-1 print:bg-white">Excelente</th>
                <th className="border border-slate-200 p-3 text-left font-bold text-blue-700 bg-blue-50 print:p-1 print:bg-white">Bueno</th>
                <th className="border border-slate-200 p-3 text-left font-bold text-amber-700 bg-amber-50 print:p-1 print:bg-white">Regular</th>
                <th className="border border-slate-200 p-3 text-left font-bold text-red-700 bg-red-50 print:p-1 print:bg-white">Insuficiente</th>
              </tr>
            </thead>
            <tbody>
              {plan.rubric.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-200 p-3 font-semibold text-slate-800 bg-slate-50/50 print:p-1 print:bg-white">{item.criterion}</td>
                  <td className="border border-slate-200 p-3 text-slate-600 print:p-1">{item.levels.excellent}</td>
                  <td className="border border-slate-200 p-3 text-slate-600 print:p-1">{item.levels.good}</td>
                  <td className="border border-slate-200 p-3 text-slate-600 print:p-1">{item.levels.fair}</td>
                  <td className="border border-slate-200 p-3 text-slate-600 print:p-1">{item.levels.poor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 p-6 border-t border-slate-200 text-center text-slate-400 text-xs italic print:bg-white print:text-[8px] print:p-2">
        Generado con OMEGA COMPUTER LAB 2026 - Herramienta de productividad docente
      </div>
    </div>
  );
};

export default LessonPreview;
