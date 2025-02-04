
import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronDown, ChevronUp, Text, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface StepsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const Steps = ({ program, setProgram }: StepsProps) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [showDescriptions, setShowDescriptions] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepIndex)
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const toggleDescription = (stepIndex: number) => {
    setShowDescriptions(prev => 
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Modules de formation</h3>
        <Button 
          onClick={addStep} 
          variant="outline"
          className="shadow-sm hover:shadow-md transition-shadow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un module
        </Button>
      </div>

      {program.steps.map((step, stepIndex) => (
        <Card key={stepIndex} className="p-6 space-y-4 relative border-l-4 border-l-primary hover:shadow-md transition-shadow">
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
                  <div className="flex items-center gap-2 mt-4">
                    <Checkbox
                      id={`description-${stepIndex}`}
                      checked={showDescriptions.includes(stepIndex)}
                      onCheckedChange={() => toggleDescription(stepIndex)}
                    />
                    <Label 
                      htmlFor={`description-${stepIndex}`}
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      Ajouter une description au module
                    </Label>
                  </div>

                  {showDescriptions.includes(stepIndex) && (
                    <div className="space-y-2 mt-4 animate-in fade-in-50">
                      <div className="flex items-center gap-2">
                        <Text className="w-4 h-4 text-muted-foreground" />
                        <Label className="text-muted-foreground">Description du module</Label>
                      </div>
                      <Textarea
                        value={step.text}
                        onChange={(e) => updateStep(stepIndex, 'text', e.target.value)}
                        placeholder="Description détaillée du module..."
                        className="h-32"
                      />
                    </div>
                  )}

                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                      <Label>Sous-modules</Label>
                      <Button 
                        onClick={() => addSubstep(stepIndex)} 
                        size="sm" 
                        variant="outline"
                        className="shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un sous-module
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {step.substeps.map((substep, substepIndex) => (
                        <div 
                          key={substepIndex} 
                          className="relative pl-6 border-l-2 border-muted ml-4"
                        >
                          <div className="absolute left-[-5px] top-3">
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="relative">
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
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}

      {program.steps.length === 0 && (
        <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
          Aucun module défini. Cliquez sur "Ajouter un module" pour commencer.
        </div>
      )}
    </div>
  );
};

export default Steps;
