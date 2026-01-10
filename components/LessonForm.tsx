
import React from 'react';
import { FormInputs } from '../types';

interface LessonFormProps {
  onGenerate: (inputs: FormInputs) => void;
  isLoading: boolean;
}

const LessonForm: React.FC<LessonFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = React.useState<FormInputs>({
    grade: '',
    subject: '',
    topic: '',
    duration: '60 minutos',
    additionalContext: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Grado / Nivel
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="Ej: 5to Primaria"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Materia / Asignatura
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Ej: Matemáticas"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Tema de la Clase
        </label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Ej: Fracciones equivalentes"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Duración
        </label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
        >
          <option value="45 minutos">45 minutos</option>
          <option value="60 minutos">60 minutos</option>
          <option value="90 minutos">90 minutos</option>
          <option value="120 minutos">120 minutos</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Contexto o necesidades específicas (Opcional)
        </label>
        <textarea
          name="additionalContext"
          value={formData.additionalContext}
          onChange={handleChange}
          placeholder="Ej: Estudiantes con diferentes ritmos de aprendizaje, enfoque en trabajo colaborativo..."
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
          isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md hover:shadow-lg'
        }`}
      >
        {isLoading ? (
          <>
            <i className="fas fa-circle-notch animate-spin"></i>
            Generando plan...
          </>
        ) : (
          <>
            <i className="fas fa-magic"></i>
            Generar Plan de Clase
          </>
        )}
      </button>
    </form>
  );
};

export default LessonForm;
