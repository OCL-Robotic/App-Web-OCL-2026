
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, FormInputs } from "../types";

export const generateLessonPlan = async (inputs: FormInputs): Promise<LessonPlan> => {
  // Obtenemos la API_KEY directamente del entorno. 
  // En Vercel, debe estar configurada en Project Settings > Environment Variables
  const apiKey: import.meta.env.VITE_API_KEY;
  
  if (!apiKey) {
    throw new Error("La API_KEY no está configurada en el entorno. Verifica la configuración en Vercel.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Actúa como un experto en diseño curricular pedagógico de vanguardia.
  Genera un plan de clase detallado y creativo en ESPAÑOL para la siguiente información:
  Grado: ${inputs.grade}
  Materia: ${inputs.subject}
  Tema: ${inputs.topic}
  Duración: ${inputs.duration}
  Contexto adicional: ${inputs.additionalContext}

  El plan debe seguir rigurosamente el modelo ABCD (Audiencia, Comportamiento, Condición y Grado).
  Proporciona objetivos generales, específicos, actividades divididas en Inicio, Desarrollo y Cierre, y una rúbrica de evaluación con criterios claros.
  Responde estrictamente en formato JSON siguiendo el esquema proporcionado. Todo el contenido debe ser en español.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Usamos Pro para mayor capacidad de razonamiento educativo
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            grade: { type: Type.STRING },
            subject: { type: Type.STRING },
            duration: { type: Type.STRING },
            abcdObjective: {
              type: Type.OBJECT,
              properties: {
                audience: { type: Type.STRING },
                behavior: { type: Type.STRING },
                condition: { type: Type.STRING },
                degree: { type: Type.STRING },
                fullStatement: { type: Type.STRING }
              },
              required: ["audience", "behavior", "condition", "degree", "fullStatement"]
            },
            generalObjective: { type: Type.STRING },
            specificObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING }
                },
                required: ["phase", "description", "duration"]
              }
            },
            rubric: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  criterion: { type: Type.STRING },
                  levels: {
                    type: Type.OBJECT,
                    properties: {
                      excellent: { type: Type.STRING },
                      good: { type: Type.STRING },
                      fair: { type: Type.STRING },
                      poor: { type: Type.STRING }
                    },
                    required: ["excellent", "good", "fair", "poor"]
                  }
                },
                required: ["criterion", "levels"]
              }
            }
          },
          required: ["title", "abcdObjective", "generalObjective", "specificObjectives", "activities", "rubric"]
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("La IA devolvió una respuesta vacía.");
    return JSON.parse(jsonStr) as LessonPlan;
  } catch (error: any) {
    console.error("Error en geminiService:", error);
    // Si es un error de la API de Google, suele traer un mensaje descriptivo
    const message = error.message || "Error desconocido al procesar la solicitud.";
    throw new Error(`Error de OMEGA AI: ${message}`);
  }
};
