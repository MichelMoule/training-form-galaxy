
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ConfigurationForm = () => {
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedEndpoint = localStorage.getItem('DIGIFORMA_ENDPOINT');
    const savedApiKey = localStorage.getItem('DIGIFORMA_API_KEY');
    if (savedEndpoint) setEndpoint(savedEndpoint);
    if (savedApiKey) setApiKey(savedApiKey);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('DIGIFORMA_ENDPOINT', endpoint);
    localStorage.setItem('DIGIFORMA_API_KEY', apiKey);
    toast({
      title: "Configuration sauvegardée",
      description: "Les paramètres Digiforma ont été mis à jour.",
      className: "bg-brand-green text-white"
    });
  };

  return (
    <Card className="p-6 shadow-lg border-brand-secondary/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endpoint" className="text-brand-primary">Endpoint Digiforma</Label>
          <Input
            id="endpoint"
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.digiforma.com/graphql"
            required
            className="border-brand-secondary/20 focus-visible:ring-brand-secondary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey" className="text-brand-primary">Clé API</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Votre clé API Digiforma"
            required
            className="border-brand-secondary/20 focus-visible:ring-brand-secondary"
          />
        </div>

        <Button 
          type="submit"
          className="bg-brand-primary hover:bg-brand-primary/90 text-white w-full"
        >
          Sauvegarder la configuration
        </Button>
      </form>
    </Card>
  );
};

export default ConfigurationForm;
