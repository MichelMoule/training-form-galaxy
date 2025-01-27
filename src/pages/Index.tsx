import TrainingForm from "@/components/TrainingForm/TrainingForm";

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
      <TrainingForm />
    </div>
  );
};

export default Index;