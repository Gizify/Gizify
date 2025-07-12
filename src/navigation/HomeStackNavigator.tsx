// HomeStackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ReminderScreen from "../screens/ReminderScreen";
import UpdateTrimesterScreen from "../screens/UpdateTrimesterScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Notif" component={ReminderScreen} />
      <Stack.Screen name="Update" component={UpdateTrimesterScreen} />
    </Stack.Navigator>
  );
}
