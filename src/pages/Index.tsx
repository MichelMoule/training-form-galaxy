
import TrainingForm from "@/components/TrainingForm/TrainingForm";
import ConfigurationForm from "@/components/ConfigurationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-primary/5">
      <header className="bg-brand-primary text-white shadow-lg py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Création de programme de formation
          </h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-brand-primary mb-4">Configuration Digiforma</h2>
          <ConfigurationForm />
        </div>
        <TrainingForm />
      </div>
    </div>
  );
};

export default Index;
