export interface HealthAssessment {
    lifestyle: {
      primaryGoal?: "weight_loss" | "muscle_gain" | "general_health";
    };
    nutrition?: {
      restrictions: Array<"vegetarian" | "vegan" | "gluten_free" | "dairy_free">;
      allergies: Array<"nuts" | "dairy" | "eggs" | "soy" | "fish">;
      cuisines: Array<"italian" | "mexican" | "chinese" | "indian">;
    };
  }
  
  export interface RestaurantSuggestion {
    name: string;
    address: string;
    cuisine: string;
    justification: string;
    suggestedDish: string;
  }
  