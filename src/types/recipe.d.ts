export type Recipe = {
  _id: string;
  title: string;
  image: string;
  isFavorite: boolean;
  ingredients: string[];
  steps: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
};
