import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RecipeScreen from "../screens/RecipeScreen";
import ScanScreen from "../screens/ScanScreen";
import colors from "../styles/colors";
import { BottomTabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Beranda"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <AntDesign name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Resep"
          component={RecipeScreen}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <MaterialIcons name="restaurant-menu" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <Feather name="camera" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Favorit"
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <AntDesign name="hearto" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => <AntDesign name="user" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
