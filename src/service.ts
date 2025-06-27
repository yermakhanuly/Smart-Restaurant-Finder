import OpenAI from 'openai';
import { getMockHealthAssessment } from './mockHealthService';
import { RestaurantSuggestion } from './types';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createRestaurantSuggestion = async (
  patientId: string,
  latitude: number,
  longitude: number
): Promise<RestaurantSuggestion[]> => {
  const healthProfile = getMockHealthAssessment(patientId);

  const prompt = `
You are a nutrition-savvy assistant. A user needs restaurant recommendations near the location:
Latitude: ${latitude}
Longitude: ${longitude}

Their health and food preferences are:
- Primary Goal: ${healthProfile.lifestyle.primaryGoal}
- Dietary Restrictions: ${healthProfile.nutrition?.restrictions.join(', ') || 'None'}
- Allergies: ${healthProfile.nutrition?.allergies.join(', ') || 'None'}
- Preferred Cuisines: ${healthProfile.nutrition?.cuisines.join(', ') || 'Any'}

Search the web (simulate this) for restaurants in that area that fit their needs.
For each suggested restaurant:
- Recommend one suitable dish.
- Justify why this restaurant is a good match.
- Use the health profile strictly to filter recommendations.

Return 3 to 5 restaurant suggestions in the following JSON format:
[
  {
    "name": "Restaurant Name",
    "address": "Full Address",
    "cuisine": "Cuisine Type",
    "justification": "Why it's a good match",
    "suggestedDish": "Dish Name"
  }
]
Ensure the response is valid JSON and matches the format.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  try {
    const content = response.choices[0].message.content || '';
    
    // Find the start and end of the JSON array
    const jsonStart = content.indexOf('[');
    const jsonEnd = content.lastIndexOf(']');
    
    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
      console.error('No valid JSON array found in response');
      return [];
    }
    
    // Extract only the JSON array portion
    const jsonString = content.substring(jsonStart, jsonEnd + 1);
    const suggestions = JSON.parse(jsonString);
    return suggestions;
  } catch (err) {
    console.error('Failed to parse OpenAI response:', err);
    console.error('Response content:', response.choices[0].message.content);
    return [];
  }
};
