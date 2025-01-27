import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface GoalsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const Goals = ({ program, setProgram }: GoalsProps) => {
  const addItem = (field: 'goals' | 'prerequisites' | 'targets') => {
    setProgram({
      ...program,
      [field]: [...program[field], { text: '' }]
    });
  };

  const removeItem = (field: 'goals' | 'prerequisites' | 'targets', index: number) => {
    const newItems = program[field].filter((_, i) => i !== index);
    setProgram({
      ...program,
      [field]: newItems
    });
  };

  const updateItem = (field: 'goals' | 'prerequisites' | 'targets', index: number, text: string) => {
    const newItems = program[field].map((item, i) => 
      i === index ? { text } : item
    );
    setProgram({
      ...program,
      [field]: newItems
    });
  };

  const renderSection = (title: string, field: 'goals' | 'prerequisites' | 'targets') => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>{title}</Label>
        <Button onClick={() => addItem(field)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {program[field].map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item.text}
            onChange={(e) => updateItem(field, index, e.target.value)}
            placeholder={`${title}...`}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeItem(field, index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {renderSection("Objectifs", "goals")}
      {renderSection("Prérequis", "prerequisites")}
      {renderSection("Public cible", "targets")}
    </div>
  );
};

export default Goals;