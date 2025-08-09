import React, { useEffect, useState } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainNavigator";
import SplashScreen from "../screens/SplashScreen";

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  // State untuk mengontrol splash screen
  const [isLoading, setIsLoading] = useState(true);

  const isUserComplete = !!(user?.daily_nutrition_target && user?.height && user?.weight);

  // Effect untuk splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Splash screen ditampilkan selama 2 detik

    return () => clearTimeout(timer);
  }, []);

  // Logic navigasi yang sudah ada, hanya akan berjalan setelah splash screen selesai
  useEffect(() => {
    if (!navigationRef.isReady() || !user || isLoading) return;

    if (!token) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
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
  }, [token, isUserComplete, navigationRef, user, isLoading]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash Screen akan ditampilkan pertama kali */}
        {isLoading ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
            <RootStack.Screen name="StartFlow" component={AuthStackNavigator} initialParams={{ initialScreen: "StartScreen" }} />
            <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
