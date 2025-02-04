
import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StepsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const Steps = ({ program, setProgram }: StepsProps) => {
  const addStep = () => {
    setProgram({
      ...program,
      steps: [...program.steps, { title: '', text: '', substeps: [] }]
    });
  };

  const removeStep = (index: number) => {
    const newSteps = program.steps.filter((_, i) => i !== index);
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  const updateStep = (index: number, field: 'title' | 'text', value: string) => {
    const newSteps = program.steps.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    );
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  const addSubstep = (stepIndex: number) => {
    const newSteps = program.steps.map((step, index) => {
      if (index === stepIndex) {
        return {
          ...step,
          substeps: [...step.substeps, { text: '' }]
        };
      }
      return step;
    });
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  const removeSubstep = (stepIndex: number, substepIndex: number) => {
    const newSteps = program.steps.map((step, index) => {
      if (index === stepIndex) {
        return {
          ...step,
          substeps: step.substeps.filter((_, i) => i !== substepIndex)
        };
      }
      return step;
    });
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  const updateSubstep = (stepIndex: number, substepIndex: number, text: string) => {
    const newSteps = program.steps.map((step, index) => {
      if (index === stepIndex) {
        const newSubsteps = step.substeps.map((substep, i) => 
          i === substepIndex ? { text } : substep
        );
        return {
          ...step,
          substeps: newSubsteps
        };
      }
      return step;
    });
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Modules de formation</h3>
        <Button onClick={addStep} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un module
        </Button>
      </div>

      {program.steps.map((step, stepIndex) => (
        <Card key={stepIndex} className="p-6 space-y-4 relative">
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => removeStep(stepIndex)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          <div className="space-y-2">
            <Label>Titre du module {stepIndex + 1}</Label>
            <Input
              value={step.title}
              onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
              placeholder={`Titre du module ${stepIndex + 1}`}
            />
          </div>

          <div className="space-y-2">
            <Label>Description du module</Label>
            <Textarea
              value={step.text}
              onChange={(e) => updateStep(stepIndex, 'text', e.target.value)}
              placeholder="Description détaillée du module..."
              className="h-32"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Sous-modules</Label>
              <Button 
                onClick={() => addSubstep(stepIndex)} 
                size="sm" 
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un sous-module
              </Button>
            </div>

            {step.substeps.map((substep, substepIndex) => (
              <div key={substepIndex} className="relative">
                <Textarea
                  value={substep.text}
                  onChange={(e) => updateSubstep(stepIndex, substepIndex, e.target.value)}
                  placeholder={`Contenu du sous-module ${substepIndex + 1}...`}
                  className="pr-12"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeSubstep(stepIndex, substepIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {program.steps.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucun module défini. Cliquez sur "Ajouter un module" pour commencer.
        </div>
      )}
    </div>
  );
};

export default Steps;
