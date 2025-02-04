
import { TrainingProgram } from '@/lib/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PreviewProps {
  program: TrainingProgram;
}

const Preview = ({ program }: PreviewProps) => {
  const renderList = (items: { text: string }[], title: string) => (
    <div className="mb-6">
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );

  const renderSteps = () => (
    <div className="mb-6">
      <h3 className="font-medium text-lg mb-2">Modules de formation</h3>
      {program.steps.map((step, index) => (
        <div key={index} className="mb-4">
          <h4 className="font-medium mb-2">{step.title}</h4>
          <p className="mb-2 whitespace-pre-wrap">{step.text}</p>
          {step.substeps && step.substeps.length > 0 && (
            <ul className="list-disc pl-5 space-y-1">
              {step.substeps.map((substep, subIndex) => (
                <li key={subIndex}>{substep.text}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{program.name}</h2>
        <p className="text-lg text-gray-600">{program.subtitle}</p>
      </div>

      {program.trainer && (
        <div className="bg-blue-50 p-4 rounded mb-6">
          <h3 className="font-medium text-lg mb-2">Formateur</h3>
          <p>{program.trainer.firstName} {program.trainer.lastName}</p>
          <p className="text-gray-600">{program.trainer.email}</p>
        </div>
      )}

      {(program.pricePerClient || program.pricePerStudent) && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {program.pricePerClient && (
            <div className="p-4 bg-green-50 rounded">
              <p className="font-medium">Prix par client</p>
              <p>{program.pricePerClient} €</p>
            </div>
          )}
          {program.pricePerStudent && (
            <div className="p-4 bg-green-50 rounded">
              <p className="font-medium">Prix par stagiaire</p>
              <p>{program.pricePerStudent} €</p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded">
          <p className="font-medium">Durée</p>
          <p>{program.durationInHours}h / {program.durationInDays} jours</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <p className="font-medium">Capacité</p>
          <p>{program.capacity.min} à {program.capacity.max} participants</p>
        </div>
      </div>

      {program.startDate?.isPlanned && program.startDate.date && (
        <div className="p-4 bg-yellow-50 rounded mb-6">
          <p className="font-medium">Date de démarrage prévue</p>
          <p>{format(program.startDate.date, 'PPP', { locale: fr })}</p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-medium text-lg mb-2">Description</h3>
        <p className="whitespace-pre-wrap">{program.description}</p>
      </div>

      {renderSteps()}
      {renderList(program.goals, "Objectifs")}
      {renderList(program.prerequisites, "Prérequis")}
      {renderList(program.targets, "Public cible")}
      {renderList(program.assessments, "Évaluations")}
      {renderList(program.pedagogicalResources, "Ressources pédagogiques")}

      <div className="space-y-4 mt-8">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Accessibilité handicap</h3>
          <p>{program.handicappedAccessibility}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Satisfaction</h3>
          <p>{program.satisfactionDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
