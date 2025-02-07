
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
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
  satisfactionDescription: '',
  startDate: {
    isPlanned: false
  }
};

const TrainingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [program, setProgram] = useState<TrainingProgram>(initialProgram);
  const { toast } = useToast();

  const validateBasicInfo = () => {
    const requiredFields = {
      name: 'Nom du programme',
      description: 'Description',
      trainer: 'Informations du formateur',
      trainingPedagogicalModality: 'Type de formation',
      durationInHours: 'Durée en heures',
      durationInDays: 'Durée en jours'
    };

    const missingFields = [];

    if (!program.name) missingFields.push(requiredFields.name);
    if (!program.description) missingFields.push(requiredFields.description);
    if (!program.trainer?.firstName || !program.trainer?.lastName || !program.trainer?.email) {
      missingFields.push(requiredFields.trainer);
    }
    if (!program.trainingPedagogicalModality) missingFields.push(requiredFields.trainingPedagogicalModality);
    if (!program.durationInHours) missingFields.push(requiredFields.durationInHours);
    if (!program.durationInDays) missingFields.push(requiredFields.durationInDays);
    if (!program.specialty) missingFields.push('Spécialité');

    return missingFields;
  };

  const validateSteps = () => {
    if (program.steps.length === 0) return ['Au moins une étape'];
    
    const invalidSteps = program.steps.filter(step => !step.title || !step.text);
    if (invalidSteps.length > 0) return ['Toutes les étapes doivent avoir un titre et une description'];
    
    return [];
  };

  const validateGoals = () => {
    if (program.goals.length === 0) return ['Au moins un objectif'];
    if (program.prerequisites.length === 0) return ['Au moins un prérequis'];
    if (program.targets.length === 0) return ['Au moins un public cible'];
    
    return [];
  };

  const validateAssessments = () => {
    if (program.assessments.length === 0) return ['Au moins une évaluation'];
    return [];
  };

  const formSteps: FormStep[] = [
    { 
      title: "Informations de base", 
      validate: validateBasicInfo 
    },
    { 
      title: "Étapes de formation", 
      validate: validateSteps 
    },
    { 
      title: "Objectifs et prérequis", 
      validate: validateGoals 
    },
    { 
      title: "Évaluations et ressources", 
      validate: validateAssessments 
    },
    { 
      title: "Prévisualisation", 
      validate: () => [] 
    }
  ];

  const progress = ((currentStep + 1) / formSteps.length) * 100;

  const handleSubmit = async () => {
    try {
      const { comment, ...programForApi } = program;
      
      const response = await createTrainingProgram(programForApi);
      
      if (comment) {
        console.log("Commentaire à envoyer par email:", comment);
      }

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

  const handleNext = () => {
    const currentValidation = formSteps[currentStep].validate();
    if (currentValidation.length > 0) {
      toast({
        variant: "destructive",
        title: "Champs requis",
        description: `Veuillez remplir les champs suivants : ${currentValidation.join(', ')}`
      });
      return;
    }
    setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1));
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
          <Progress value={progress} className="mb-4" />
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
            <Button onClick={handleNext}>
              Suivant
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TrainingForm;

