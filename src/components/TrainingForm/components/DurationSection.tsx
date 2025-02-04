
import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface DurationSectionProps {
  program: TrainingProgram;
  handleChange: (field: keyof TrainingProgram, value: any) => void;
  handleHoursChange: (hours: number) => void;
  handleStartDateChange: (date: Date | undefined) => void;
}

const DurationSection = ({ 
  program, 
  handleChange,
  handleHoursChange,
  handleStartDateChange
}: DurationSectionProps) => {
  const showWarning = program.durationInHours > program.durationInDays * 7;

  return (
    <Card className="p-4 bg-gray-50">
      <h3 className="font-medium text-lg mb-4">Durée et planification</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="durationInHours">Durée (heures)</Label>
            <Input
              id="durationInHours"
              type="number"
              value={program.durationInHours}
              onChange={(e) => handleHoursChange(parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="durationInDays">Durée (jours)</Label>
            <Input
              id="durationInDays"
              type="number"
              value={program.durationInDays}
              onChange={(e) => handleChange('durationInDays', parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
        </div>

        {showWarning && (
          <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Attention : La durée moyenne dépasse 7 heures par jour
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={program.startDate?.isPlanned || false}
              onCheckedChange={(checked) => handleChange('startDate', { isPlanned: checked, date: program.startDate?.date })}
            />
            <Label>Une date de démarrage est-elle prévue ?</Label>
          </div>

          {program.startDate?.isPlanned && (
            <div className="space-y-2">
              <Label>Date de démarrage</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !program.startDate?.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {program.startDate?.date ? (
                      format(program.startDate.date, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={program.startDate?.date}
                    onSelect={handleStartDateChange}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DurationSection;
