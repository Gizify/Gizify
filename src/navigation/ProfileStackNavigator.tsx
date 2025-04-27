import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import DetailProfileScreen from "../screens/DetailProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  DetailProfileScreen: undefined;
  EditProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DetailProfileScreen" component={DetailProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}