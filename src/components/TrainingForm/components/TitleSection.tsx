
import { TrainingProgram } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface TitleSectionProps {
  program: TrainingProgram;
  handleChange: (field: keyof TrainingProgram, value: any) => void;
}

const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
    <div className="flex items-start">
      <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
      <div className="text-sm text-blue-700">{children}</div>
    </div>
  </div>
);

const TitleSection = ({ program, handleChange }: TitleSectionProps) => {
  return (
    <>
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
    </>
  );
};

export default TitleSection;
