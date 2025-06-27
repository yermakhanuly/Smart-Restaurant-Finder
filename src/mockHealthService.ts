import { HealthAssessment } from './types';

export function getMockHealthAssessment(patientId: string): HealthAssessment {
  console.log(`Fetching mock data for patientId: ${patientId}`);
  return {
    lifestyle: {
      primaryGoal: "weight_loss",
    },
    nutrition: {
      restrictions: ["vegetarian"],
      allergies: ["nuts"],
      cuisines: ["italian", "indian"],
    },
  };
}
