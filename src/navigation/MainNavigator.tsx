import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";

// Import screen components
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ScanScreen from "../screens/ScanScreen";
import VerifyDataScreen from "../screens/VerifyDataScreen";
import HomeStackNavigator from "./HomeStackNavigator";

// Import navigators dan style
import RecipeStackNavigator from "./RecipeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import colors from "../styles/colors";

// Tipe untuk navigator
import { BottomTabParamList } from "../types/navigation";
import HistoryScreen from "../screens/HistoryScreen";

// Inisialisasi navigator tab bawah
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      {/* Tab Beranda */}
      <Tab.Screen
        name="Beranda"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
        }}
      />

      {/* Tab Resep (menggunakan stack navigator) */}
      <Tab.Screen
        name="Resep"
        component={RecipeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="restaurant-menu" size={size} color={color} />,
        }}
      />

      {/* Tab Scan */}
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="camera" size={size} color={color} />,
        }}
      />

      {/* Tab Favorit */}
      <Tab.Screen
        name="Favorit"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="history" size={size} color={color} />,
        }}
      />

      {/* Tab Profil*/}
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
