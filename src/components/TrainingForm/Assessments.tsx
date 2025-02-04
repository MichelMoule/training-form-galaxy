
import { TrainingProgram } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from 'react';

interface AssessmentsProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const DEFAULT_ASSESSMENTS = [
  { text: "Feuilles de présence" },
  { text: "Auto-positionnement du bénéficiaire sur les objectifs pédagogiques avant la formation afin de personnaliser le contenu pédagogique" },
  { text: "Auto-positionnement du bénéficiaire sur les objectifs pédagogiques de la formation en fin de formation pour évaluer sa progression" },
  { text: "Évaluation de l'atteinte des objectifs du bénéficiaire par le formateur en fin de formation" },
  { text: "Certificat de réalisation de la formation remis en fin de parcours" }
];

const HANDICAPPED_ACCESSIBILITY = "Les situations de handicap seront étudiées au cas par cas.";
const DEFAULT_SATISFACTION = "Satisfaction stagiaires / nombre de stagiaires";

const Assessments = ({ program, setProgram }: AssessmentsProps) => {
  useEffect(() => {
    if (program.assessments.length === 0) {
      setProgram({
        ...program,
        assessments: DEFAULT_ASSESSMENTS,
        handicappedAccessibility: HANDICAPPED_ACCESSIBILITY,
        satisfactionDescription: DEFAULT_SATISFACTION
      });
    } else {
      // S'assurer que handicappedAccessibility et satisfactionDescription sont toujours définis
      setProgram(prev => ({
        ...prev,
        handicappedAccessibility: HANDICAPPED_ACCESSIBILITY,
        satisfactionDescription: DEFAULT_SATISFACTION
      }));
    }
  }, []);

  const addItem = (field: 'assessments' | 'pedagogicalResources') => {
    setProgram({
      ...program,
      [field]: [...program[field], { text: '' }]
    });
  };

  const removeItem = (field: 'assessments' | 'pedagogicalResources', index: number) => {
    // Ne permettre la suppression que des éléments ajoutés manuellement
    if (field === 'assessments' && index < DEFAULT_ASSESSMENTS.length) {
      return;
    }
    const newItems = program[field].filter((_, i) => i !== index);
    setProgram({
      ...program,
      [field]: newItems
    });
  };

  const updateItem = (field: 'assessments' | 'pedagogicalResources', index: number, text: string) => {
    // Ne permettre la modification que des éléments ajoutés manuellement
    if (field === 'assessments' && index < DEFAULT_ASSESSMENTS.length) {
      return;
    }
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
            readOnly={field === 'assessments' && index < DEFAULT_ASSESSMENTS.length}
            className={field === 'assessments' && index < DEFAULT_ASSESSMENTS.length ? 'bg-gray-100' : ''}
          />
          {!(field === 'assessments' && index < DEFAULT_ASSESSMENTS.length) && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(field, index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {renderSection("Évaluations", "assessments")}
      {renderSection("Ressources pédagogiques", "pedagogicalResources")}
    </div>
  );
};

export default Assessments;
