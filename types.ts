export enum MoodType {
  COMFORT = 'Comfort',
  ENERGY = 'Energy',
  GRATITUDE = 'Gratitude',
  POETIC = 'Poetic'
}

export interface BrewResult {
  drinkName: string;
  message: string;
  ingredients: string[]; // e.g., "A spoonful of patience", "Warm sunlight"
}

export interface CoffeeOption {
  id: MoodType;
  label: string;
  description: string;
  icon: string;
}
