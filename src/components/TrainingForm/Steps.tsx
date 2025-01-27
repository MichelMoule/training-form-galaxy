import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface StepsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const Steps = ({ program, setProgram }: StepsProps) => {
  const addStep = () => {
    setProgram({
      ...program,
      steps: [...program.steps, { text: '' }]
    });
  };

  const removeStep = (index: number) => {
    const newSteps = program.steps.filter((_, i) => i !== index);
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  const updateStep = (index: number, text: string) => {
    const newSteps = program.steps.map((step, i) => 
      i === index ? { text } : step
    );
    setProgram({
      ...program,
      steps: newSteps
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Étapes de la formation</h3>
        <Button onClick={addStep} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une étape
        </Button>
      </div>

      {program.steps.map((step, index) => (
        <div key={index} className="space-y-2 relative">
          <Label>Module {index + 1}</Label>
          <Textarea
            value={step.text}
            onChange={(e) => updateStep(index, e.target.value)}
            placeholder={`Contenu détaillé du module ${index + 1}...`}
            className="h-32"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-0 right-0"
            onClick={() => removeStep(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      {program.steps.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucune étape définie. Cliquez sur "Ajouter une étape" pour commencer.
        </div>
      )}
    </div>
  );
};

export default Steps;