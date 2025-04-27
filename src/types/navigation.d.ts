import { RouteProp } from "@react-navigation/native";
import { Recipe } from "./recipe";

// Auth Stack
export type AuthStackParamList = {
  LoginRegisterScreen: undefined;
  StartScreen: undefined;
  VerifyDataScreen: undefined;
  HomeScreen: undefined;
};

// Bottom Tabs
export type BottomTabParamList = {
  Beranda: undefined;
  Resep: undefined;
  Scan: undefined;
  Favorit: undefined;
  Profile: undefined;
};

// Recipe Stack
export type RecipeStackParamList = {
  RecipeList: undefined;
  RecipeDetail: { recipe: Recipe };
  CreateResepAi: undefined;
  ResultResepAi: {
    resepRequest: {
      ingredients: string[];
      difficulty: string;
      cuisine: string;
    };
  };
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  DetailProfileScreen: undefined;
  EditProfileScreen: undefined;
};


export type RecipeDetailScreenRouteProp = RouteProp<RecipeStackParamList, "RecipeDetail">;
