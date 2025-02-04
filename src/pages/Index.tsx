import TrainingForm from "@/components/TrainingForm/TrainingForm";
import ConfigurationForm from "@/components/ConfigurationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Création de programme de formation
          </h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 space-y-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Configuration Digiforma</h2>
          <ConfigurationForm />
        </div>
        <TrainingForm />
      </div>
    </div>
  );
};

export default Index;