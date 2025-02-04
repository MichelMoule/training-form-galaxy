
import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface PricingSectionProps {
  program: TrainingProgram;
  handleChange: (field: keyof TrainingProgram, value: any) => void;
}

const PricingSection = ({ program, handleChange }: PricingSectionProps) => {
  return (
    <Card className="p-4 bg-gray-50">
      <h3 className="font-medium text-lg mb-4">Informations tarifaires</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pricePerClient">Prix par client (€)</Label>
          <Input
            id="pricePerClient"
            type="number"
            min="0"
            value={program.pricePerClient || ''}
            onChange={(e) => handleChange('pricePerClient', parseFloat(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pricePerStudent">Prix par stagiaire (€)</Label>
          <Input
            id="pricePerStudent"
            type="number"
            min="0"
            value={program.pricePerStudent || ''}
            onChange={(e) => handleChange('pricePerStudent', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </Card>
  );
};

export default PricingSection;
