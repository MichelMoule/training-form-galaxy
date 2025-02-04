
import { TrainingProgram } from './types';

const getDigiformaConfig = () => {
  const endpoint = localStorage.getItem('DIGIFORMA_ENDPOINT');
  const apiKey = localStorage.getItem('DIGIFORMA_API_KEY');
  
  if (!endpoint || !apiKey) {
    throw new Error('Configuration Digiforma manquante. Veuillez configurer l\'endpoint et la clé API.');
  }
  
  return { endpoint, apiKey };
};

export const createTrainingProgram = async (program: TrainingProgram) => {
  try {
    const { endpoint, apiKey } = getDigiformaConfig();
    
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
          programInput: program
        }
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating training program:', error);
    throw error;
  }
};
