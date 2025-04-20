export type MealSource = "recipe" | "barcode" | "manual";
export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "maintain" | "gain";

export interface NutritionInfo {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugar: number;
  sodium: number;
  fiber: number;
}

export interface Meal {
  source: MealSource;
  source_id: string; // ObjectId as string
  name: string;
  portion_size: number;
  nutrition_info: NutritionInfo;
  consumed_at: string; // ISO date string
}

export interface MealLog {
  date: string;
  meals: Meal[];
}

export interface DailyNutritionTarget {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface NutritionStats {
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  total_fiber: number;
  total_sugar: number;
  total_sodium: number;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  gender: Gender;
  birthdate: string;
  height: number;
  weight: number;
  activity_level: ActivityLevel;
  goal: Goal;
  daily_nutrition_target: DailyNutritionTarget;
  meal_logs: MealLog[];
  nutrition_stats: NutritionStats[];
  favorites: string[]; // array of Recipe ObjectId
}

export interface AuthData {
  token: string;
  user?: User;
}
