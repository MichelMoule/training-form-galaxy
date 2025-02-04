
import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CapacitySectionProps {
  program: TrainingProgram;
  handleChange: (field: keyof TrainingProgram, value: any) => void;
}

const CapacitySection = ({ program, handleChange }: CapacitySectionProps) => {
  return (
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
  );
};

export default CapacitySection;
