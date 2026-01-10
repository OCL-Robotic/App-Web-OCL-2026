
export interface ABCDObjective {
  audience: string;
  behavior: string;
  condition: string;
  degree: string;
  fullStatement: string;
}

export interface Activity {
  phase: 'Inicio' | 'Desarrollo' | 'Cierre';
  description: string;
  duration: string;
}

export interface RubricLevel {
  level: string;
  description: string;
}

export interface RubricItem {
  criterion: string;
  levels: {
    excellent: string;
    good: string;
    fair: string;
    poor: string;
  };
}

export interface LessonPlan {
  title: string;
  grade: string;
  subject: string;
  duration: string;
  abcdObjective: ABCDObjective;
  generalObjective: string;
  specificObjectives: string[];
  activities: Activity[];
  rubric: RubricItem[];
}

export interface FormInputs {
  grade: string;
  subject: string;
  topic: string;
  duration: string;
  additionalContext: string;
}
