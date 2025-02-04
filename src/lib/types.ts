
export interface TrainingProgram {
  name: string;
  subtitle: string;
  description: string;
  durationInHours: number;
  durationInDays: number;
  trainingPedagogicalModality: number;
  trainingModality: number;
  categoryId: string;
  specialty: string;
  capacity: {
    active: boolean;
    min: number;
    max: number;
  };
  steps: {
    title: string;
    text: string;
    substeps: { text: string }[];
  }[];
  goals: { text: string }[];
  prerequisites: { text: string }[];
  assessments: { text: string }[];
  pedagogicalResources: { text: string }[];
  targets: { text: string }[];
  handicappedAccessibility: string;
  satisfactionDescription: string;
}

export interface FormStep {
  title: string;
  isValid: boolean;
}
