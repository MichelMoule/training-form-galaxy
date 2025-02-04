
import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronDown, ChevronUp, Text } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface StepsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const Steps = ({ program, setProgram }: StepsProps) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const addStep = () => {
    setProgram({
      ...program,
      steps: [...program.steps, { title: '', text: '', substeps: [] }]
    });
    // Automatically expand the new step
    setExpandedSteps(prev => [...prev, program.steps.length]);
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
      <h3 className="text-lg font-medium">Modules de formation</h3>

      {program.steps.map((step, stepIndex) => (
        <Card key={stepIndex} className="p-6 space-y-4 relative">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleStep(stepIndex)}
                  className="p-0 hover:bg-transparent"
                >
                  {expandedSteps.includes(stepIndex) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
                <div className="flex-1">
                  <Label>Titre du module {stepIndex + 1}</Label>
                  <Input
                    value={step.title}
                    onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
                    placeholder={`Titre du module ${stepIndex + 1}`}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeStep(stepIndex)}
                  className="ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {expandedSteps.includes(stepIndex) && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Text className="w-4 h-4 text-gray-500" />
                      <Label className="text-gray-500">Description du module (optionnel)</Label>
                    </div>
                    <Textarea
                      value={step.text}
                      onChange={(e) => updateStep(stepIndex, 'text', e.target.value)}
                      placeholder="Description détaillée du module..."
                      className="h-32"
                    />
                  </div>

                  <div className="space-y-4 mt-4">
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
                </>
              )}
            </div>
          </div>
        </Card>
      ))}

      <Button 
        onClick={addStep} 
        className="w-full"
        variant="outline"
      >
        <Plus className="w-4 h-4 mr-2" />
        Ajouter un module
      </Button>

      {program.steps.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Aucun module défini. Cliquez sur "Ajouter un module" pour commencer.
        </div>
      )}
    </div>
  );
};

export default Steps;
