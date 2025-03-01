
import { TrainingProgram } from './types';

const getDigiformaConfig = () => {
  const endpoint = localStorage.getItem('DIGIFORMA_ENDPOINT');
  const apiKey = localStorage.getItem('DIGIFORMA_API_KEY');
  
  if (!endpoint || !apiKey) {
    throw new Error('Configuration Digiforma manquante. Veuillez configurer l\'endpoint et la clé API.');
  }
  
  return { endpoint, apiKey };
};

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/qxkqwvwpe5hgkbfd39k2c298mjonpgtb';

export const createTrainingProgram = async (program: TrainingProgram) => {
  try {
    const { endpoint, apiKey } = getDigiformaConfig();
    
    // Transformer les steps pour correspondre au format attendu par l'API
    const formattedSteps = program.steps.map(step => ({
      text: `${step.title}\n\n${step.text}`, // On combine le titre et le texte
      substeps: step.substeps
    }));

    // On crée une copie du programme sans les champs qu'on ne veut pas envoyer à l'API
    const { pricePerClient, pricePerStudent, startDate, trainer, ...programWithoutExtraFields } = program;

    // Si aucun prérequis n'est défini, on ajoute la valeur par défaut "AUCUN"
    const prerequisites = program.prerequisites.length === 0 
      ? [{ text: "AUCUN" }]
      : program.prerequisites;

    // Appel à l'API Digiforma
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        query: `
          mutation CreateTrainingProgram($programInput: ProgramInput!) {
            createProgram(programInput: $programInput) {
              id
              name
              description
              durationInHours
              durationInDays
              specialty
              specialtyName
              category {
                id
                name
              }
              steps {
                text
                substeps {
                  text
                }
              }
            }
          }
        `,
        variables: {
          programInput: {
            ...programWithoutExtraFields,
            prerequisites,
            steps: formattedSteps
          }
        }
      }),
    });
    
    const data = await response.json();

    // Envoi des données complètes au webhook Make.com
    await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...program,
        formattedSteps,
        prerequisites,
        digiformaResponse: data
      }),
    });

    return data;
  } catch (error) {
    console.error('Error creating training program:', error);
    throw error;
  }
};
