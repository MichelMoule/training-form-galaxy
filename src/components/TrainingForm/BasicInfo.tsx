import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const BasicInfo = ({ program, setProgram }: BasicInfoProps) => {
  const handleChange = (field: keyof TrainingProgram, value: any) => {
    setProgram({ ...program, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du programme</Label>
        <Input
          id="name"
          value={program.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Ex: Formation Management d'équipe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Sous-titre</Label>
        <Input
          id="subtitle"
          value={program.subtitle}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Ex: Développez vos compétences en leadership"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={program.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description détaillée du programme..."
          className="h-32"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="durationInHours">Durée (heures)</Label>
          <Input
            id="durationInHours"
            type="number"
            value={program.durationInHours}
            onChange={(e) => handleChange('durationInHours', parseInt(e.target.value))}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="durationInDays">Durée (jours)</Label>
          <Input
            id="durationInDays"
            type="number"
            value={program.durationInDays}
            onChange={(e) => handleChange('durationInDays', parseInt(e.target.value))}
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minCapacity">Capacité minimum</Label>
          <Input
            id="minCapacity"
            type="number"
            value={program.capacity.min}
            onChange={(e) => handleChange('capacity', { ...program.capacity, min: parseInt(e.target.value) })}
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxCapacity">Capacité maximum</Label>
          <Input
            id="maxCapacity"
            type="number"
            value={program.capacity.max}
            onChange={(e) => handleChange('capacity', { ...program.capacity, max: parseInt(e.target.value) })}
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;