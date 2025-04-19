import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeScreen from "../screens/RecipeScreen";

import { RecipeStackParamList } from "../types/navigation";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import CreateResepAiScreen from "../screens/CreateResepAiScreen";
import ResultResepAiScreen from "../screens/ResultResepAiScreen";

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
      <Stack.Screen name="CreateResepAi" component={CreateResepAiScreen} />
      <Stack.Screen name="ResultResepAi" component={ResultResepAiScreen} />
    </Stack.Navigator>
  );
};

export default RecipeStackNavigator;
