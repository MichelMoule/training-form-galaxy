
import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from 'react';

interface AssessmentsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const DEFAULT_ASSESSMENTS = [
  { text: "SUIVI DE L'EXÉCUTION ET ÉVALUATION DES RÉSULTATS" },
  { text: "Feuilles de présence" },
  { text: "Auto-positionnement du bénéficiaire sur les objectifs pédagogiques avant la formation afin de personnaliser le contenu pédagogique" },
  { text: "Auto-positionnement du bénéficiaire sur les objectifs pédagogiques de la formation en fin de formation pour évaluer sa progression" },
  { text: "Évaluation de l'atteinte des objectifs du bénéficiaire par le formateur en fin de formation" },
  { text: "Certificat de réalisation de la formation remis en fin de parcours" }
];

const Assessments = ({ program, setProgram }: AssessmentsProps) => {
  useEffect(() => {
    // N'ajoute les évaluations par défaut que si la liste est vide
    if (program.assessments.length === 0) {
      setProgram({
        ...program,
        assessments: DEFAULT_ASSESSMENTS
      });
    }
  }, []);

  const addItem = (field: 'assessments' | 'pedagogicalResources') => {
    setProgram({
      ...program,
      [field]: [...program[field], { text: '' }]
    });
  };

  const removeItem = (field: 'assessments' | 'pedagogicalResources', index: number) => {
    const newItems = program[field].filter((_, i) => i !== index);
    setProgram({
      ...program,
      [field]: newItems
    });
  };

  const updateItem = (field: 'assessments' | 'pedagogicalResources', index: number, text: string) => {
    const newItems = program[field].map((item, i) => 
      i === index ? { text } : item
    );
    setProgram({
      ...program,
      [field]: newItems
    });
  };

  const renderSection = (title: string, field: 'assessments' | 'pedagogicalResources') => (
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
      {renderSection("Évaluations", "assessments")}
      {renderSection("Ressources pédagogiques", "pedagogicalResources")}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="handicappedAccessibility">Accessibilité handicap</Label>
          <Textarea
            id="handicappedAccessibility"
            value={program.handicappedAccessibility}
            onChange={(e) => setProgram({ ...program, handicappedAccessibility: e.target.value })}
            placeholder="Informations sur l'accessibilité..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="satisfactionDescription">Satisfaction</Label>
          <Textarea
            id="satisfactionDescription"
            value={program.satisfactionDescription}
            onChange={(e) => setProgram({ ...program, satisfactionDescription: e.target.value })}
            placeholder="Description de la satisfaction..."
          />
        </div>
      </div>
    </div>
  );
};

export default Assessments;
