import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import LoginRegisterScreen from "../screens/LoginRegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import VerifyDataScreen from "../screens/VerifyDataScreen";
import StartScreen from "../screens/StartScreen";

export type AuthStackParamList = {
  LoginRegisterScreen: undefined;
  VerifyDataScreen: undefined;
  StartScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = ({ route }: { route: RouteProp<any, any> }) => {
  const initialScreen = route?.params?.initialScreen || "LoginRegisterScreen";

  return (
    <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
      <Stack.Screen name="VerifyDataScreen" component={VerifyDataScreen} />
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
