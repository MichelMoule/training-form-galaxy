
import { TrainingProgram } from '@/lib/types';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TitleSection from './components/TitleSection';
import PricingSection from './components/PricingSection';
import TrainerSection from './components/TrainerSection';
import DurationSection from './components/DurationSection';
import CapacitySection from './components/CapacitySection';

interface BasicInfoProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

const BasicInfo = ({ program, setProgram }: BasicInfoProps) => {
  const handleChange = (field: keyof TrainingProgram, value: any) => {
    setProgram({ ...program, [field]: value });
  };

  const handleTrainerChange = (field: keyof typeof program.trainer, value: string) => {
    setProgram({
      ...program,
      trainer: {
        ...program.trainer,
        [field]: value
      }
    });
  };

  const handleHoursChange = (hours: number) => {
    setProgram({
      ...program,
      durationInHours: hours
    });
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setProgram({
      ...program,
      startDate: {
        ...program.startDate,
        date
      }
    });
  };

  return (
    <div className="space-y-6">
      <TitleSection program={program} handleChange={handleChange} />
      <PricingSection program={program} handleChange={handleChange} />
      <TrainerSection program={program} handleTrainerChange={handleTrainerChange} />
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
      <DurationSection 
        program={program}
        handleChange={handleChange}
        handleHoursChange={handleHoursChange}
        handleStartDateChange={handleStartDateChange}
      />
      <CapacitySection program={program} handleChange={handleChange} />
    </div>
  );
};

export default BasicInfo;
