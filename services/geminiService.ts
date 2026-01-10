
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan, FormInputs } from "../types";

export const generateLessonPlan = async (inputs: FormInputs): Promise<LessonPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Actúa como un experto en diseño curricular pedagógico.
  Genera un plan de clase detallado para la siguiente información:
  Grado: ${inputs.grade}
  Materia: ${inputs.subject}
  Tema: ${inputs.topic}
  Duración: ${inputs.duration}
  Contexto adicional: ${inputs.additionalContext}

  El plan debe seguir el modelo ABCD (Audiencia, Comportamiento, Condición y Grado).
  Proporciona objetivos generales, específicos, actividades divididas en Inicio, Desarrollo y Cierre, y una rúbrica de evaluación clara.
  Responde estrictamente en formato JSON siguiendo el esquema proporcionado.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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

  try {
    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response from AI");
    return JSON.parse(jsonStr) as LessonPlan;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("No se pudo generar el plan de clase. Inténtalo de nuevo.");
  }
};
