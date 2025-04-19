import { RouteProp } from "@react-navigation/native";
import { Recipe } from "./recipe";

export type AuthStackParamList = {
  LoginRegisterScreen: undefined;
  StartScreen: undefined;
  VerifyDataScreen: undefined;
  HomeScreen: undefined;
};

export type BottomTabParamList = {
  Beranda: undefined;
  Resep: undefined;
  Scan: undefined;
  Favorit: undefined;
  Profile: undefined;
};

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

export type RecipeDetailScreenRouteProp = RouteProp<RecipeStackParamList, "RecipeDetail">;
