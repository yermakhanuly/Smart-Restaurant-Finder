import { Request, Response } from 'express';
import { createRestaurantSuggestion } from './service';
import { RestaurantSuggestion } from './types';

export const getRestaurantSuggestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { latitude, longitude } = req.body;
    const patientId = req.user?.patientId;

    if (!latitude || !longitude || !patientId) {
      res.status(400).json({ message: 'Missing required fields: latitude, longitude, or patientId' });
      return;
    }

    const suggestions: RestaurantSuggestion[] = await createRestaurantSuggestion(patientId, latitude, longitude);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error in getRestaurantSuggestions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
