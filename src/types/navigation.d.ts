import { RouteProp } from "@react-navigation/native";
import { Recipe } from "./recipe";

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
};

export type RecipeDetailScreenRouteProp = RouteProp<RecipeStackParamList, "RecipeDetail">;
