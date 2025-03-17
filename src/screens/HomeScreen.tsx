import React from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import colors from "../styles/colors";

type Props = StackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
      <Text>Home Screen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
      <Button title="Go to Settings" onPress={() => navigation.navigate("Settings")} />
    </View>
  );
}
