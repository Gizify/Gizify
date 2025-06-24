import React, { useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStackNavigator";

const { height } = Dimensions.get("window");

const StartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 30;

      opacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
      translateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      });
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentWrapper, animatedStyle]}>
        <Text style={styles.title}>Selamat Datang!</Text>
        <Image source={require("../../assets/logo/Logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logotext}>Smart Nutrition & Meal Planning App</Text>
      </Animated.View>

      <View style={styles.bottomWrapper}>
        <Text style={styles.subtitle}>Untuk menawarkan layanan terbaik,{"\n"}kami membutuhkan informasi lebih lanjut dari Anda.</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("VerifyDataScreen")}>
          <Text style={styles.buttonText}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "space-between",
  },
  contentWrapper: {
    alignItems: "center",
    marginTop: height * 0.1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textAlign: "center",
  },
  logo: {
    height: 250,
    width: 250,
    marginBottom: 0,
  },
  logotext: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    marginBottom: 24,
    marginTop: -50,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  bottomWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2C7A7B",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
