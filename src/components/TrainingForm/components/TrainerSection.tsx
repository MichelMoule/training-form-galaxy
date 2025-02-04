
import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface TrainerSectionProps {
  program: TrainingProgram;
  handleTrainerChange: (field: keyof typeof program.trainer, value: string) => void;
}

const TrainerSection = ({ program, handleTrainerChange }: TrainerSectionProps) => {
  return (
    <Card className="p-4 bg-gray-50">
      <h3 className="font-medium text-lg mb-4">Informations du formateur</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="trainerFirstName">Prénom</Label>
            <Input
              id="trainerFirstName"
              value={program.trainer?.firstName || ''}
              onChange={(e) => handleTrainerChange('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trainerLastName">Nom</Label>
            <Input
              id="trainerLastName"
              value={program.trainer?.lastName || ''}
              onChange={(e) => handleTrainerChange('lastName', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainerEmail">Email</Label>
          <Input
            id="trainerEmail"
            type="email"
            value={program.trainer?.email || ''}
            onChange={(e) => handleTrainerChange('email', e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default TrainerSection;
