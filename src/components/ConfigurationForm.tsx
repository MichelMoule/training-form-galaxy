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
      description: "Les paramètres Digiforma ont été mis à jour."
    });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="endpoint">Endpoint Digiforma</Label>
          <Input
            id="endpoint"
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.digiforma.com/graphql"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">Clé API</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Votre clé API Digiforma"
            required
          />
        </div>

        <Button type="submit">
          Sauvegarder la configuration
        </Button>
      </form>
    </Card>
  );
};

export default ConfigurationForm;