import axios from 'axios';
import type { RestaurantSuggestion } from '../types';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSuggestions = async (
  location: { latitude: number; longitude: number }
): Promise<RestaurantSuggestion[]> => {
  const response = await apiClient.post('/suggestions', location, {
    headers: {
      Authorization: 'Bearer test-patient-123',
    },
  });
  return response.data;
};
