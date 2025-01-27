import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BasicInfo from './BasicInfo';
import Steps from './Steps';
import Goals from './Goals';
import Assessments from './Assessments';
import Preview from './Preview';
import { TrainingProgram, FormStep } from '@/lib/types';
import { createTrainingProgram } from '@/lib/api';

const initialProgram: TrainingProgram = {
  name: '',
  subtitle: '',
  description: '',
  durationInHours: 0,
  durationInDays: 0,
  trainingPedagogicalModality: 1,
  trainingModality: 1,
  categoryId: '346',
  specialty: '413',
  capacity: {
    active: true,
    min: 4,
    max: 12
  },
  steps: [],
  goals: [],
  prerequisites: [],
  assessments: [],
  pedagogicalResources: [],
  targets: [],
  handicappedAccessibility: '',
  satisfactionDescription: ''
};

const TrainingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [program, setProgram] = useState<TrainingProgram>(initialProgram);
  const { toast } = useToast();

  const formSteps: FormStep[] = [
    { title: "Informations de base", isValid: true },
    { title: "Étapes de formation", isValid: true },
    { title: "Objectifs et prérequis", isValid: true },
    { title: "Évaluations et ressources", isValid: true },
    { title: "Prévisualisation", isValid: true }
  ];

  const handleSubmit = async () => {
    try {
      const response = await createTrainingProgram(program);
      toast({
        title: "Programme créé avec succès",
        description: `Le programme "${program.name}" a été créé.`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du programme."
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo program={program} setProgram={setProgram} />;
      case 1:
        return <Steps program={program} setProgram={setProgram} />;
      case 2:
        return <Goals program={program} setProgram={setProgram} />;
      case 3:
        return <Assessments program={program} setProgram={setProgram} />;
      case 4:
        return <Preview program={program} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {formSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index === currentStep ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${index === currentStep ? 'border-primary' : 'border-gray-300'}`}>
                  {index + 1}
                </div>
                <span className="ml-2 hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          
          {currentStep === formSteps.length - 1 ? (
            <Button onClick={handleSubmit}>
              Créer le programme
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1))}
            >
              Suivant
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TrainingForm;