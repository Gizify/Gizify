import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainNavigator";

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();
  }, []);

  if (isLoggedIn === null) return null;

  return <NavigationContainer>{isLoggedIn ? <MainTabNavigator /> : <AuthStackNavigator />}</NavigationContainer>;
}
