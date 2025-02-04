
import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

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
    const days = Math.ceil(hours / 7);
    setProgram({
      ...program,
      durationInHours: hours,
      durationInDays: days
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

  const TipBox = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
        <div className="text-sm text-blue-700">{children}</div>
      </div>
    </div>
  );

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
        <TipBox>
          <h4 className="font-semibold mb-2">Les conseils pour votre Titre</h4>
          <ul className="list-disc pl-4 space-y-1">
            <li><span className="font-medium">Clarté et Pertinence :</span> Reflétez clairement le contenu de la formation avec des mots-clés pertinents.</li>
            <li><span className="font-medium">Bénéfices Clairs :</span> Mettez en avant les avantages pour les participants.</li>
            <li><span className="font-medium">Langage Positif :</span> Utilisez des mots comme "transformer", "améliorer", "maîtriser".</li>
            <li><span className="font-medium">Originalité :</span> Ajoutez une touche unique pour vous démarquer.</li>
            <li><span className="font-medium">Taille Appropriée :</span> Soyez concis mais descriptif.</li>
          </ul>
        </TipBox>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Sous-titre</Label>
        <Input
          id="subtitle"
          value={program.subtitle}
          maxLength={100}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Ex: Développez vos compétences en leadership"
        />
        <div className="text-sm text-gray-500">
          {program.subtitle.length}/100 caractères
        </div>
        <TipBox>
          <h4 className="font-semibold mb-2">Conseils pour votre Sous-titre</h4>
          <ul className="list-disc pl-4 space-y-1">
            <li><span className="font-medium">Précision Complémentaire :</span> Détaillez le contenu et les compétences visées.</li>
            <li><span className="font-medium">Public Cible :</span> Précisez à qui s'adresse la formation.</li>
            <li><span className="font-medium">Format ou Durée :</span> Mentionnez le type de formation et sa durée.</li>
            <li><span className="font-medium">Valorisation :</span> Indiquez les certifications ou reconnaissances.</li>
          </ul>
        </TipBox>
      </div>

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
                onChange={(e) => handleHoursChange(parseInt(e.target.value))}
                min="0"
              />
              <p className="text-sm text-gray-500">La durée en jours est calculée sur une base de 7h/jour</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationInDays">Durée (jours)</Label>
              <Input
                id="durationInDays"
                type="number"
                value={program.durationInDays}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>

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
