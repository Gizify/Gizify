import React, { useEffect } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainNavigator";

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  const isUserComplete = !!(user?.daily_nutrition_target && user?.height && user?.weight && user?.gender && user?.goal && user?.activity_level && user?.birthdate);

  useEffect(() => {
    if (!navigationRef.isReady() || !user) return;

    if (!token) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        })
      );
    } else if (!isUserComplete) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "StartFlow" }],
        })
      );
    } else {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        })
      );
    }
  }, [token, isUserComplete, navigationRef, user]);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        <RootStack.Screen name="StartFlow" component={AuthStackNavigator} initialParams={{ initialScreen: "StartScreen" }} />
        <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
