import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeScreen from "../screens/RecipeScreen";

import { RecipeStackParamList } from "../types/navigation";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";

const Stack = createStackNavigator<RecipeStackParamList>();

const RecipeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RecipeList" component={RecipeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
};

export default RecipeStackNavigator;
