import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import DetailProfileScreen from "../screens/DetailProfileScreen";
// import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import PrivacySettingsScreen from "../screens/PrivacySettingsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ManageAccountScreen from "../screens/ManageAccountScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfileScreen: undefined;
  DetailProfileScreen: undefined;
  AccountSettingsScreen: undefined;
  PrivacySettingsScreen: undefined;
  PrivacyPolicyScreen: undefined;
  NotificationScreen: undefined;
  ManageAccountScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="DetailProfileScreen" component={DetailProfileScreen} />
      {/* <Stack.Screen name="AccountSettingsScreen" component={AccountSettingsScreen} /> */}
      <Stack.Screen name="PrivacySettingsScreen" component={PrivacySettingsScreen} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ManageAccountScreen" component={ManageAccountScreen} />
      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
}
