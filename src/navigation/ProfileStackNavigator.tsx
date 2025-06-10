import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import DetailProfileScreen from "../screens/DetailProfileScreen";
// import EditProfileScreen from "../screens/EditProfileScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
// import AccountSettingsScreen from "../screens/AccountSettingsScreen";
// import PrivacySettingsScreen from "../screens/PrivacySettingsScreen";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfileScreen: undefined;
  DetailProfileScreen: undefined;
  AccountSettingsScreen: undefined;
  PrivacySettingsScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      {/* <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} /> */}
      <Stack.Screen name="DetailProfileScreen" component={DetailProfileScreen} />
      {/* <Stack.Screen name="AccountSettingsScreen" component={AccountSettingsScreen} />
      <Stack.Screen name="PrivacySettingsScreen" component={PrivacySettingsScreen} /> */}
      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
}
