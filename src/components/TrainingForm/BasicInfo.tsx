
import { TrainingProgram } from '@/lib/types';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TitleSection from './components/TitleSection';
import PricingSection from './components/PricingSection';
import TrainerSection from './components/TrainerSection';
import DurationSection from './components/DurationSection';
import CapacitySection from './components/CapacitySection';
import CommentSection from './components/CommentSection';

interface BasicInfoProps {
  program: TrainingProgram;
  setProgram: (program: TrainingProgram) => void;
}

type TrainingType = {
  id: number;
  label: string;
};

const trainingTypes: TrainingType[] = [
  { id: 0, label: "Présentiel" },
  { id: 1, label: "Mixte" },
  { id: 2, label: "Distanciel" }
];

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
        <Label htmlFor="trainingType" className="after:content-['*'] after:ml-0.5 after:text-red-500">Type de formation</Label>
        <Select 
          value={program.trainingPedagogicalModality.toString()} 
          onValueChange={(value) => handleChange('trainingPedagogicalModality', parseInt(value))}
          required
        >
          <SelectTrigger id="trainingType" className="w-full">
            <SelectValue placeholder="Sélectionnez le type de formation" />
          </SelectTrigger>
          <SelectContent>
            {trainingTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="after:content-['*'] after:ml-0.5 after:text-red-500">Description</Label>
        <Textarea
          id="description"
          value={program.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Description détaillée du programme..."
          className="h-32"
          required
        />
      </div>
      
      <DurationSection 
        program={program}
        handleChange={handleChange}
        handleHoursChange={handleHoursChange}
        handleStartDateChange={handleStartDateChange}
      />
      <CapacitySection program={program} handleChange={handleChange} />
      <CommentSection program={program} handleChange={handleChange} />
    </div>
  );
};

export default BasicInfo;
