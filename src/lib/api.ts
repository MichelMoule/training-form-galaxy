import { TrainingProgram } from './types';

export const createTrainingProgram = async (program: TrainingProgram) => {
  try {
    const response = await fetch('YOUR_DIGIFORMA_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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