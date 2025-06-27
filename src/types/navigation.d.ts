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
  ResultResepAi: any;
  UploadResep: any;
  ResultRecipe: any;
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  DetailProfileScreen: undefined;
  AccountSettingsScreen: undefined;
  PrivacySettingsScreen: undefined;
};

export type RecipeDetailScreenRouteProp = RouteProp<RecipeStackParamList, "RecipeDetail">;
